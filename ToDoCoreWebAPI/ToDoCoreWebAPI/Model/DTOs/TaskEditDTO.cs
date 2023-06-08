namespace ToDoCoreWebAPI.Model.DTOs
{
    public class TaskEditDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? TaskCategory { get; set; }
        public bool IsCompleted { get; set; }
        public bool Bookmark { get; set; }
    }
}
