using ChatApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.DAL
{

    public class ChatContext : DbContext
    {
        public ChatContext(DbContextOptions<ChatContext> options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<UserConversation> UserConversations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<UserConversation>()
         .HasKey(x => new { x.UserId, x.ConversationId });
            modelBuilder.Entity<UserConversation>()
       .HasOne(bc => bc.Conversation)
       .WithMany(b => b.UserConversations)
       .HasForeignKey(bc => bc.ConversationId);

            modelBuilder.Entity<UserConversation>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.UserConversations)
                .HasForeignKey(bc => bc.UserId);
        }
    }
}
