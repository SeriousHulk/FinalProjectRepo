using System.Text.Json.Serialization;

namespace ToDoCoreWebAPI.Model.DTOs
{
    public class AddUserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
        public bool IsActive { get; set; }
        public string ProfilePicture { get; set; }
    }
}
