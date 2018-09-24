using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.BindingModels
{
    public class UserModel
    {
        private const string NoImageProfilePicture = "noimage.png";

        public int Id { get; set; }
        public string Name { get; set; }
        public string ProfilePicture { get; set; }
        public bool IsOnline { get; set; }
        public CustomStatus CustomStatus { get; set; }
        public DateTime LastSeen { get; set; }
        public UserModel() { }
        public UserModel(User user) {
            Id = user.Id;
            Name = user.Name;
            IsOnline = user.IsOnline;
            CustomStatus = user.CustomStatus;
            ProfilePicture = user.ProfilePicture != "" ? user.ProfilePicture : NoImageProfilePicture;
            LastSeen = user.LastSeen;

        }
    }
}
