using System.Text.Json.Serialization;

namespace ToDoCoreWebAPI.Model.DTOs
{
    public class AddTaskDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string TaskCategory { get; set; }
        public Guid UserId { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool Bookmark { get; set; } = false;
    }
}
