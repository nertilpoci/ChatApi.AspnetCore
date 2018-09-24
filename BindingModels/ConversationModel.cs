using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.BindingModels
{
    public class ConversationModel
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public DateTime LastUpdate { get; set; }
        public int HomeUserId { get; set; }
        public IEnumerable<UserModel> Users { get; set; } = new List<UserModel>();
        public IEnumerable<Message> Messages { get; set; } = new List<Message>();
        public ConversationModel() { }
        public ConversationModel(Conversation conversation,int homeUserId) {

            Id = conversation.Id;
            LastUpdate = conversation.LastUpdate;
            HomeUserId = homeUserId;
            Users = conversation.UserConversations.Select(uc => new UserModel { CustomStatus = uc.User.CustomStatus, ProfilePicture = uc.User.ProfilePicture, Id = uc.User.Id, IsOnline = uc.User.IsOnline, Name = uc.User.Name });
            Label =Users.Single(z=>z.Id!=homeUserId).Name;

        }

    }
}
