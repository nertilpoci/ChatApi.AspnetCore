using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class Connection
    {
        public int Id { get; set; }
        public string ConnectionId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
