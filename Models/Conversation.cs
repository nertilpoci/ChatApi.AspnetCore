using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class Conversation
    {

        public Conversation()
        {
            Messages = new HashSet<Message>();
            UserConversations = new HashSet<UserConversation>();
        }

        public int Id { get; set; }

        public string Label { get; set; }
        public DateTime LastUpdate { get; set; }

        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<UserConversation> UserConversations { get; set; }

    }
}
