using System.Text.Json.Serialization;

namespace ToDoCoreWebAPI.Model
{
    public class SubTask
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        [JsonIgnore]
        public Task? Task { get; set; }
        public int TaskId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public Guid? UserId { get; set; }
        public bool IsDone { get; set; }
        public string? TaskPriority{ get; set; }
    }
}
