using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ChatApp.DAL;
using ChatApp.Models;
using HtmlAgilityPack;
using Microsoft.AspNetCore.SignalR;

using System.Reflection;
using System.Net;
using System.Text;
using System.Web;
using System.Text.RegularExpressions;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ChatApp.Enums;
using ChatApp.Hubs;
using Microsoft.AspNetCore.Authorization;
using IdentityModel;

namespace ChatApp.Controllers
{
    [Produces("application/json")]
    [Route("api/chat")]
    [Authorize]
    public class UsersController : Controller
    {
        private IHostingEnvironment hostingEnvironment;
        private ChatContext _chatContext;
        IHubContext<UserHub> _hubContext;
        private const string NoImageProfilePicture = "noimage.png";
         public UsersController(ChatContext context, IHostingEnvironment env, IHubContext<UserHub> hubContext)
        {
            _chatContext = context;
            hostingEnvironment = env;
            _hubContext = hubContext;
        }


      
        [ResponseCache(Duration = 9999999)]
        [HttpPost, DisableRequestSizeLimit, Route("attachments/{conversationId}")]
        public async Task<IActionResult> UploadAttachments(int conversationId)
        {
            var user = GetCurrentUser();
            var conversation = _chatContext.Conversations.Find(conversationId);
            conversation.LastUpdate = DateTime.Now;
            var folderpath = hostingEnvironment.WebRootPath + "\\Attachments";
            var files = Request.Form.Files; // now you have them
            var message = new Message { ConversationId=conversationId, UserId=user.Id, Date=DateTime.Now };
            

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var extensions = Path.GetExtension(formFile.FileName);
                    var contentType = formFile.ContentType;
                    var fileId = Guid.NewGuid().ToString() + extensions;
                    var attachmentype = AttachmentType(contentType);
                    message.Attachments.Add(new Attachment { AttachmentType= attachmentype,  FileId=fileId, FileName= formFile.FileName,ContentType= contentType});
                    using (var stream = new FileStream($"{folderpath}/{fileId}", FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }
            _chatContext.Messages.Add(message);
            _chatContext.SaveChanges();
            await _hubContext.Clients.Group(conversationId.ToString()).SendAsync("receiveMessage", message);
            return Ok("File Uploaded");
        }
        [HttpPost, DisableRequestSizeLimit, Route("profilepicture")]
        public async Task<IActionResult> UploadProfile()
        {
            var user = GetCurrentUser();
            var folderpath = hostingEnvironment.WebRootPath + "\\Profiles";
            var files = Request.Form.Files; // now you have them
            
            if (files.Count>0)
            {
                var formFile = files[0];
                if (formFile.Length > 0)
                {

                    var extensions = Path.GetExtension(formFile.FileName.Split(".").Count()<2?formFile.Name:formFile.FileName);
                    var contentType = formFile.ContentType;
                    var fileId = Guid.NewGuid().ToString() + extensions;
                    var attachmentype = AttachmentType(contentType);
                    using (var stream = new FileStream($"{folderpath}/{fileId}", FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    if (System.IO.File.Exists($"{folderpath}/{user.ProfilePicture}")) System.IO.File.Delete($"{folderpath}/{user.ProfilePicture}");

                    user.ProfilePicture = fileId;
                    _chatContext.SaveChanges();
                    await _hubContext.Clients.All.SendAsync("profilePictureChanged", user.Id);

                }
            }
          
            return Ok("File Uploaded");
        }
        private  AtachmentContentType AttachmentType(string contentType)
        {
            var isImage = contentType.StartsWith("image");
            if (isImage) return AtachmentContentType.Image;
            var isAudio = contentType.StartsWith("audio");
            if (isAudio) return AtachmentContentType.Audio;
            var isVideo = contentType.StartsWith("video");
            if (isVideo) return AtachmentContentType.Video;
            return AtachmentContentType.Other;

        }
    
        [HttpGet("attachments/{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> GetAttachcment(int id)
        {
            var attachment = _chatContext.Attachments.Find(id);
            if (attachment == null) return NotFound();
            var file = hostingEnvironment.WebRootPath + "\\Attachments\\" + attachment.FileId;
            if (!System.IO.File.Exists(file)) return NotFound();
            var memory = new MemoryStream();
            using (var stream = new FileStream(file, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory,attachment.ContentType,attachment.FileName);
        }
        [ResponseCache(Duration = 9999999)]
        [HttpGet("profilepicture/{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> GetProfilePicture(int id)
        {
            var user = await _chatContext.Users.FindAsync(id);
            if (user == null) return NotFound();
            if (string.IsNullOrEmpty(user.ProfilePicture)) user.ProfilePicture = NoImageProfilePicture;
            var file = hostingEnvironment.WebRootPath + "\\Profiles\\" + user.ProfilePicture;
            if (!System.IO.File.Exists(file)) return NotFound();
            var memory = new MemoryStream();
            using (var stream = new FileStream(file, FileMode.Open,FileAccess.Read,FileShare.Read))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "image/png","profilepicture.png");
        }
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var user = _chatContext.Users.Find(id);
            if (null == user) return NotFound();
            return Ok(user);
        }
        [HttpGet("{clean}")]
        public IActionResult Clean()
        {
            _chatContext.Messages.RemoveRange(_chatContext.Messages);
            _chatContext.SaveChanges();
            return Ok();
        }
        [ResponseCache(  Duration = 9999999)]
        [HttpGet, Route("preview")]
        public IActionResult GetPreview([FromQuery]string url)
        {
            if (string.IsNullOrEmpty(url)) return BadRequest("Url not supplied");
            var uri = new UriBuilder(url).Uri;
            var meta = MetaScraper.GetMetaDataFromUrl(uri);
            return Ok(meta);
        }

        private User GetCurrentUser()
        {
            var userid = HttpContext.User.FindFirst(JwtClaimTypes.Subject);
            if (userid == null) throw new Exception("Could not identify user");
            var user = _chatContext.Users.SingleOrDefault(u => u.Identifier == userid.Value);
            return user;
        }
    }
  
    public static class MetaScraper
    {

      
    
        /// <summary>
        /// Uses HtmlAgilityPack to get the meta information from a url
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static MetaInformation GetMetaDataFromUrl(Uri url)
        {
            // Get the URL specified
            var webGet = new HtmlWeb();
            var document = webGet.Load(url);
            var metaTags = document.DocumentNode.SelectNodes("//meta");
            var tlist = metaTags.Select(tag=> new { tagName = tag.Attributes["name"], tagContent = tag.Attributes["content"], tagProperty = tag.Attributes["property"] });
            MetaInformation metaInfo = new MetaInformation(url.AbsoluteUri);
            if (metaTags != null)
            {
                int matchCount = 0;
                foreach (var tag in metaTags)
                {
                    var tagName = tag.Attributes["name"];
                    var tagContent = tag.Attributes["content"];
                    var tagProperty = tag.Attributes["property"];
                    if (tagName != null && tagContent != null)
                    {
                        switch (tagName.Value.ToLower())
                        {
                            case "title":
                                metaInfo.Title = tagContent.Value;
                                matchCount++;
                                break;
                            case "description":
                                metaInfo.Description = tagContent.Value;
                                matchCount++;
                                break;
 
                            case "keywords":
                                metaInfo.Keywords = tagContent.Value;
                                matchCount++;
                                break;
                            case "image":
                                metaInfo.ImageUrl=tagContent.Value;
                                matchCount++;
                                break;
                        }
                    }
                    else if (tagProperty != null && tagContent != null)
                    {
                        switch (tagProperty.Value.ToLower())
                        {
                            case "og:title":
                                metaInfo.Title = string.IsNullOrEmpty(metaInfo.Title) ? tagContent.Value : metaInfo.Title;
                                matchCount++;
                                break;
                            case "og:description":
                                metaInfo.Description = string.IsNullOrEmpty(metaInfo.Description) ? tagContent.Value : metaInfo.Description;
                                matchCount++;
                                break;
                            case "og:image":
                                metaInfo.ImageUrl = string.IsNullOrEmpty(metaInfo.ImageUrl) ? tagContent.Value : metaInfo.Description;

                                matchCount++;
                                break;
                            case "og:site_name":
                                metaInfo.SiteName = string.IsNullOrEmpty(metaInfo.SiteName) ? tagContent.Value : metaInfo.Description;
                                matchCount++;
                                break;
                        }
                    }
                }
                metaInfo.HasData = matchCount > 0;
            }
            return metaInfo;
        }
    }
    public class MetaInformation
    {
        public bool HasData { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Keywords { get; set; }
        public string ImageUrl { get; set; }

        public string SiteName { get; set; }

        public MetaInformation(string url)
        {
            Url = url;
            HasData = false;
        }

    }
}
