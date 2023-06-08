namespace ToDoCoreWebAPI.Model.DTOs
{
    public class UserGetDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Username { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePicture { get; set; }
        public bool IsActive { get; set; }
        public string Role { get; set; }
    }
}
