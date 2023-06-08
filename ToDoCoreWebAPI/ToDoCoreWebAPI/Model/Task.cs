using System.Text.Json.Serialization;

namespace ToDoCoreWebAPI.Model
{
    public class Task
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? TaskCategory { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public Guid? UserId { get; set; }
        public bool IsCompleted { get; set; }
        [JsonIgnore]
        public List<SubTask>? SubTask { get; set; }
        public bool Bookmark { get; set; }
    }
}
