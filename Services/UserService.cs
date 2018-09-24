using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Models;
using ChatApp.Services;

namespace ChatApp.Services
{     
    public class UserService : IUserService
    {
        public static ConcurrentQueue<User> Users = new ConcurrentQueue<User>();
        public void AddToQueue(User user)
        {
            Users.Enqueue(user);
        }

        public User GetFromQueue()
        {
            User user;
             Users.TryDequeue(out user);
            return user;
        }

        public void RemoveFromQueue(string name)
        {
          
        }
    }
}
