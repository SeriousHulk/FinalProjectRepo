namespace ToDoCoreWebAPI.Model.DTOs
{
    public class TokenApiDTO
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public bool IsActive { get; set; }
    }
}
