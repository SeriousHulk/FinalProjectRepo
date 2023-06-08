using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoCoreWebAPI.Model
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public bool IsActive { get; set; }
        [JsonIgnore]
        public List<User>? users { get; set; }
        public string? ProfilePicture { get; set; } //store URL
        [JsonIgnore]
        public List<Task>? Task { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
