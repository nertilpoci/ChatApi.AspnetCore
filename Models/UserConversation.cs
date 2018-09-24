using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class UserConversation
    {
            public int UserId { get; set; }
            public int ConversationId { get; set; }

            //-----------------------------
            //Relationships

            public User User { get; set; }
            public Conversation Conversation { get; set; }
    }
}
