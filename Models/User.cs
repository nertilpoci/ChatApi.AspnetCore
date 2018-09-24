using ChatApp.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class User
    {
        public User()
        {       
            Messages = new HashSet<Message>();
            UserConversations = new HashSet<UserConversation>();
            Connections = new HashSet<Connection>();
        }
        public string Name { get; set; }
        public int Id { get; set; }
        public DateTime LastSeen { get; set; }

        public string ConnectionId { get; set; }
        public bool IsOnline { get; set; }
        public string Identifier { get; set; }
        public string ProfilePicture { get; set; }
        public CustomStatus CustomStatus { get; set; }
        
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<UserConversation> UserConversations { get; set; }
        public virtual ICollection<Connection> Connections { get; set; }
    }
}
