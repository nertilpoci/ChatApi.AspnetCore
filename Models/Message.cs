using ChatApp.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public int ConversationId { get; set; }
        public bool IsRead { get; set; }
        public DateTime Date { get; set; }
        public virtual User User { get; set; }
        public virtual Conversation Conversation { get; set; }
        public ICollection<Attachment> Attachments { get; set; } = new HashSet<Attachment>();
       
    }
}
