using ChatApp.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public string FileId { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public AtachmentContentType AttachmentType { get; set; }
        public int MessageId { get; set; }
        public virtual Message Message { get; set; }

    }
}
