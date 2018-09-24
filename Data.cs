//using ChatApp.DAL;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace ChatApp
//{
//    public class Data
//    {
//      public static void AddData(ChatContext db)
//        {
//            string[] names = { "James More", "Sara Jane", "Clare Monre", "Jane Jone", "Oliver Twist", "Nertil Poci", "Blair Smith" };
//            string[] messages = { "tlaskdjf;akdjasdfljasdf", "asdfasdfadfasd", "aslkdjfalsdfjkalsdfk" };
//            string[] messages2 = { "1234213412432134", "132412", "1234123421341324" };
//            foreach (var name in names)
//            {
//                db.Users.Add(new Models.User { Name = name });
//            }
//            db.SaveChanges();
//            int minutes = 1;
//            var users = db.Users.ToList();
//            for (int i=0;i<users.Count; i++)
//            {
//                for(int j=i+1;j<users.Count;j++)
//                {
//                    db.Conversations.Add(new Models.Conversation() { User1Id = users[i].Id, User2Id = users[j].Id });
//                }
//            }
//            //foreach (var message in messages)
//            //{
                
//            //    conversation.Messages.Add(new Models.Message { UserId = db.Users.First().Id, Content = message, Date = DateTime.Now.AddMinutes(minutes) });
//            //    conversation.Messages.Add(new Models.Message { UserId = db.Users.Last().Id, Content = message, Date = DateTime.Now.AddMinutes(minutes) });

//            //}
//            //foreach (var message in messages2)
//            //{
//            //    minutes++;
//            //    conversation2.Messages.Add(new Models.Message { UserId = db.Users.First().Id, Content = message, Date = DateTime.Now.AddMinutes(minutes) });
//            //    conversation2.Messages.Add(new Models.Message { UserId = 6, Content = message, Date = DateTime.Now.AddMinutes(minutes) });
//            //}
//            db.SaveChanges();
//        }
//    }
//}
