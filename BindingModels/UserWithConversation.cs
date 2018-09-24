using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.BindingModels
{
    public class UserWithConversation
    {
        public User User { get; set; }
        public Conversation Conversation { get; set; }
    }
}
