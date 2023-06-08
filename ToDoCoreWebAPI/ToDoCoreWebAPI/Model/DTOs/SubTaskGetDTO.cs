namespace ToDoCoreWebAPI.Model.DTOs
{
    public class SubTaskGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Task Task { get; set; }
        public bool IsDone { get; set; }
        public string? TaskPriority { get; set; }
    }
}
