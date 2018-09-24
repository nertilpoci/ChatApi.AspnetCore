using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Models;

namespace ChatApp.Services
{
    public interface IUserService
    {
        void AddToQueue(User user);
        User GetFromQueue();
        void  RemoveFromQueue(string name);




    }
}
