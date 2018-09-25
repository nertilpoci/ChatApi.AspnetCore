using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using ChatApp.Services;
using Microsoft.AspNetCore.SignalR;
using ChatApp.DAL;
using System.Linq;
using ChatApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using ChatApp.BindingModels;
using Microsoft.AspNetCore.Authorization;
using IdentityModel;

namespace ChatApp.Hubs
{
    [Authorize]
    public class UserHub : Hub
    {
        
        public static List<string> Rooms = new List<string>();
        private const string NoImageProfilePicture = "noimage.png";

        private ChatContext _chatContext;
        public UserHub(ChatContext context)
        {
            _chatContext = context;
        }
    

        public async Task<IEnumerable<ConversationModel>> GetConversations()
        {
            var user = GetCurrentUser();
            
            var conversations = await _chatContext.Conversations.Include(z=>z.UserConversations).ThenInclude(z=>z.User).Where(z => z.UserConversations.Any(u => u.UserId==user.Id)).ToListAsync();
            return conversations.Select(c=>new ConversationModel(c,user.Id));
        }
        public async Task<IEnumerable<UserModel>> GetUsersWithoutConversations()
        {
            var user = GetCurrentUser();
            var userConversations =await _chatContext.Conversations.Include(z => z.UserConversations).Where(z => z.UserConversations.Any(u => u.UserId == user.Id) && z.UserConversations.Count==2).Select(z=>z.Id).ToListAsync();
            var users = await _chatContext.Users.Include(z => z.UserConversations).Where(z =>z.Id!=user.Id && !z.UserConversations.Any(uc=>userConversations.Contains(uc.ConversationId))).ToListAsync();
            return users.Select(u=> new UserModel { Id = u.Id,  ProfilePicture=u.ProfilePicture!=""?u.ProfilePicture: NoImageProfilePicture,  LastSeen=u.LastSeen,  CustomStatus = u.CustomStatus, IsOnline = u.IsOnline, Name = u.Name }) ;
        }
        public async Task<IEnumerable<Message>> GetMessages(int conversationId,int? take, int? lastMessageId)
        {
            var user = GetCurrentUser();
            if (take ==null) take = 10;
            var messages = _chatContext.Messages.Include(z=>z.Attachments).Where(z => z.ConversationId == conversationId);
            if(lastMessageId!=null)
            {
                messages = messages.Where(z => z.Id < lastMessageId);
            }
            return await messages.OrderByDescending(z => z.Id).Take((int)take).OrderBy(z=>z.Id).ToListAsync();
        }
        public async Task<ConversationModel> StartConversation(int userId)
        {
            var currentUser = GetCurrentUser();
            var otherUser = _chatContext.Users.Find(userId);
            var conversation = _chatContext.Conversations.Include(z => z.UserConversations).ThenInclude(z => z.User).SingleOrDefault(c => c.UserConversations.All(uc => uc.UserId == currentUser.Id || uc.UserId == otherUser.Id));
            if(conversation==null)
            {
                conversation = new Conversation { LastUpdate = DateTime.Now, UserConversations = new HashSet<UserConversation> { new UserConversation { UserId = currentUser.Id }, new UserConversation { UserId = otherUser.Id } } };
                _chatContext.Conversations.Add(conversation);
                await _chatContext.SaveChangesAsync();
                await this.Groups.AddToGroupAsync(this.Context.ConnectionId, conversation.Id.ToString());

                conversation = _chatContext.Conversations.Include(z => z.UserConversations).ThenInclude(z => z.User).Single(z => z.Id == conversation.Id);
            }

            return new ConversationModel(conversation, currentUser.Id);
        }
        public async Task<UserModel> GetHomeUser()
        {
            var userIdentifier = GetUserId().ToString();
            var user = await _chatContext.Users.SingleOrDefaultAsync(u => u.Identifier == userIdentifier);
            return new UserModel(user);
        }
        public async Task<string> SetUserName(string name)
        {
            var user = GetCurrentUser();
            user.Name = name;
            await _chatContext.SaveChangesAsync();
            await Clients.All.SendAsync("nameChanged", user.Id,user.Name);
            return user.Name;
        }
        public async void SendMessage(string message,int conversationId)
        {
            var user = GetCurrentUser();
            var msg = new Message { Content = message, ConversationId = conversationId, Date = DateTime.Now, UserId = user.Id };
            _chatContext.Messages.Add(msg);
            _chatContext.SaveChanges();
           await Clients.Group(conversationId.ToString()).SendAsync("receiveMessage", msg);
        }
        private async Task StatusChanged(bool connectedStatus,CustomStatus customStatus)
        {
            var user = GetCurrentUser();
            await Clients.AllExcept(_chatContext.Connections.Where(z=>z.UserId==user.Id).Select(z=>z.ConnectionId).ToList()).SendAsync("statusChanged",new UserStatus { UserId=user.Id,ConnectedStatus=connectedStatus, CustomStatus= customStatus });
        }
        public async Task TypingStatus(int conversationId, bool isTyping)
        {
            await Clients.Group(conversationId.ToString()).SendAsync("isTyping", new  { ConversationId = conversationId, IsTyping = isTyping, UserId=GetCurrentUser().Id });
        }
        public async Task NotifyStatusChange(CustomStatus customStatus)
        {
            var user = GetCurrentUser();
            user.CustomStatus = customStatus;
            await _chatContext.SaveChangesAsync();
            await Clients.All.SendAsync("statusChanged", new UserStatus { UserId = user.Id, ConnectedStatus = true, CustomStatus = customStatus });
        }
        private Guid GetUserId()
        {
            var userid = Context.User.FindFirst(JwtClaimTypes.Subject);
            if (userid == null) throw new Exception("Could not identify user");
            return Guid.Parse(userid.Value);
        }
        private User GetCurrentUser()
        {
            var userid = Context.User.FindFirst(JwtClaimTypes.Subject);
            if (userid == null) throw new Exception("Could not identify user");
            var user = _chatContext.Users.SingleOrDefault(u=>u.Identifier==userid.Value);
            return user;
        }
        public override async Task OnConnectedAsync()
        {
            var identifier = GetUserId().ToString();
            string connectionId = Context.ConnectionId;
            var user = GetCurrentUser();
            if(null==user)
            {
                user = new User { Identifier = identifier, Name="User_" + _chatContext.Users.Count(), Connections = new Connection[] { new Connection { ConnectionId = connectionId } } };
                _chatContext.Users.Add(user);
                _chatContext.SaveChanges();
            }
            else
            {
                _chatContext.Connections.Add(new Connection { UserId = user.Id, ConnectionId = connectionId });
                user.IsOnline = true;
                _chatContext.SaveChanges();

            }
            var conversations =  _chatContext.Conversations.Where(z =>z.UserConversations.Any(u=>u.UserId== user.Id) ).ToList();
            foreach (var conversation in conversations)
            {
              await  this.Groups.AddToGroupAsync(connectionId, conversation.Id.ToString());
            }  
            await (StatusChanged(true,user.CustomStatus));
            await base.OnConnectedAsync();
        }
     
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Debug.WriteLine("Hub OnDisconnected {0}\n", Context.ConnectionId);
            string connectionId = Context.ConnectionId;
            var connection = _chatContext.Connections.Include(z=>z.User).SingleOrDefault(z => z.ConnectionId == connectionId);
            var user = GetCurrentUser();
            user.LastSeen = DateTime.Now;
            await _chatContext.SaveChangesAsync();
            if (connection!=null)
            {
                _chatContext.Connections.RemoveRange(connection);
                await _chatContext.SaveChangesAsync();
                if(!IsOnline(connection.UserId))
                {
                    
                    await (StatusChanged(false,CustomStatus.Offline));
                    connection.User.IsOnline = false;
                    await _chatContext.SaveChangesAsync();
                }
            }
           
            await base.OnDisconnectedAsync(exception);

        }
        private bool IsOnline(int userId)
        {
            var hasConnections = _chatContext.Connections.Any(z=>z.UserId==userId);
            return hasConnections;
        } 
         


       
    }

}
