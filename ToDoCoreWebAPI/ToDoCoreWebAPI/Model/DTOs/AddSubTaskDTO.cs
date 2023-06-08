using System.Text.Json.Serialization;

namespace ToDoCoreWebAPI.Model.DTOs
{
    public class AddSubTaskDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TaskId { get; set; }
        public bool IsDone { get; set; }
        public string? TaskPriority { get; set; }
    }
}
