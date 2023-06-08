namespace ToDoCoreWebAPI.Model.DTOs
{
    public class UserEditDTO
    {
        public Guid Id { get; set; }
        //public string Name { get; set; }
        //public string Email { get; set; }
        //public string Password { get; set; }
        public bool IsActive { get; set; }
        //public string ProfilePicture { get; set; } //store URL
    }
}
