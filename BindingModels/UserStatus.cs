using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.BindingModels
{
    public class UserStatus
    {
        public int UserId { get; set; }
        public bool ConnectedStatus { get; set; }
        public CustomStatus CustomStatus { get; set; }
    }
    public enum CustomStatus
    {
        Online,
        Offline,
        Busy,
        Away
    }
}
