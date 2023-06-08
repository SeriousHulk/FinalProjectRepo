using Microsoft.EntityFrameworkCore;
using ToDoCoreWebAPI.Model;
using Task = ToDoCoreWebAPI.Model.Task;

namespace ToDoCoreWebAPI.EF
{
    public class UserDbContext:DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<SubTask> SubTasks { get; set; }
    }
}
