using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoCoreWebAPI.EF;
using ToDoCoreWebAPI.Model;
using ToDoCoreWebAPI.Model.DTOs;

namespace ToDoCoreWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> _repository;
        private readonly IWebHostEnvironment _environment;
        public UserController(IRepository<User> userRepo, IWebHostEnvironment webHostEnvironment)
        {
            _repository = userRepo;
            _environment = webHostEnvironment;
        }
        [Route("/GetUserById/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _repository.Get().FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            var userGetDTO = new UserGetDTO
            {
                Name = user.Name,
                Role = user.Role,
                IsActive = user.IsActive,
                Email = user.Email,
                Password = user.Password,
                ProfilePicture = GetImageByUser(user.Code)
            };

            return Ok(userGetDTO);
        }

        [Route("/GetAllUsers")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await _repository.Get().ToListAsync();
            var userGetDTOs = allUsers.Select(user => new UserGetDTO
            {
                Name = user.Name,
                Username = user.Username,
                Role = user.Role,
                IsActive = user.IsActive,
                Email = user.Email,
                Password = user.Password,
                ProfilePicture = GetImageByUser(user.Code)
            }).ToList();
            return Ok(userGetDTOs);
        }
        [Route("/AddUser")]
        [HttpPost]
        public IActionResult AddUser(AddUserDTO user)
        {
            var addUser = new User
            {
                Id = user.Id,
                Name = user.Name,
                IsActive = user.IsActive,
                Email = user.Email,
                Password = user.Password,
                ProfilePicture = user.ProfilePicture
            };
            _repository.Add(addUser);
            return Ok();
        }
        [Route("/UpdateUser/{id}")]
        [HttpPut]
        public IActionResult UpdateUser(UserEditDTO user)
        {
            var existingUser = _repository.Get().FirstOrDefault(u => u.Id == user.Id);
            if (existingUser == null)
            {
                return NotFound();
            }
            //existingUser.Name = user.Name;
            existingUser.IsActive = user.IsActive;
            //existingUser.Email = user.Email;
            //existingUser.Password = user.Password;
            //existingUser.ProfilePicture = user.ProfilePicture;
            _repository.Edit(existingUser);
            return Ok();
        }

        [Route("/DeleteUser/{id}")]
        [HttpDelete]
        public IActionResult DeleteUser(Guid id)
        {
            var existingUser = _repository.Get().FirstOrDefault(u => u.Id == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            _repository.Delete(existingUser);
            return Ok();
        }
        [HttpPost("UploadPicture")]
        public async Task<IActionResult> UploadPicture()
        {
            bool result = false;
            try
            {
                var uploadFiles = Request.Form.Files;
                foreach (IFormFile source in uploadFiles)
                {
                    string fileName = source.FileName;
                    string filePath = GetFilePath(fileName);
                    if (!System.IO.Directory.Exists(filePath))
                    {
                        System.IO.Directory.CreateDirectory(filePath);
                    }
                    string imgPath = filePath + "\\image.png";
                    if (!System.IO.File.Exists(imgPath))
                    {
                        System.IO.File.Delete(imgPath);
                    }
                    using (FileStream stream = System.IO.File.Create(imgPath))
                    {
                        await stream.CopyToAsync(stream);
                        result = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(result);
        }
        [NonAction]
        private string GetFilePath(string userCode)
        {
            return this._environment.WebRootPath + "\\Uploads\\Image\\" + userCode;
        }
        [NonAction]
        private string GetImageByUser(string userCode)
        {
            string imgUrl = string.Empty;
            string hostUrl = "https://localhost:7118/";
            string filePath = GetFilePath(userCode);
            string imgPath = filePath + "\\image.png";
            if (!System.IO.File.Exists(imgPath))
            {
                imgUrl = hostUrl + "/Uploads/Image/noimage.png";
            }
            else
            {
                imgUrl = hostUrl + "/Uploads/Image/" + userCode + "/image.png";
            }

            return imgUrl;
        }
        [HttpGet]
        public ResponseType RemoveImage(string code)
        {
            string filePath = GetFilePath(code);
            string imgPath = filePath + "\\image.png";
            try
            {
                if (System.IO.File.Exists(imgPath))
                {
                    System.IO.File.Delete(imgPath);
                }
                return new ResponseType { Result="pass", KeyValue= code};
            }
            catch(Exception ex) 
            {
                throw ex;
            }
        }
    }
}
