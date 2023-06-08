using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoCoreWebAPI.EF;
using ToDoCoreWebAPI.Model;
using ToDoCoreWebAPI.Model.DTOs;
using Task = ToDoCoreWebAPI.Model.Task;

namespace ToDoCoreWebAPI.Controllers
{
    [Route("api/v1/user/{userId}/tasks/")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IRepository<Task> _repository;
        public TaskController(IRepository<Task> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks(Guid userId)
        {
            var allTasks = await _repository.Get().Where(t => t.UserId == userId).ToListAsync();
            var taskGetDTOs = allTasks.Select(task => new TaskGetDTO
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                UserId = task.UserId,
                TaskCategory = task.TaskCategory,
                IsCompleted = task.IsCompleted,
                Bookmark = task.Bookmark,
                SubTask = task.SubTask
            }).ToList();

            return Ok(taskGetDTOs);
        }

        [HttpGet("{taskId}")]
        public IActionResult GetTaskById(Guid userId, int taskId)
        {
            var task = _repository.Get().FirstOrDefault(t => t.UserId == userId && t.Id == taskId);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public IActionResult AddTask(Guid userId, AddTaskDTO task)
        {
            var addTask = new Task
            {
                Name = task.Name,
                Description = task.Description,
                TaskCategory = task.TaskCategory,
                IsCompleted = task.IsCompleted,
                Bookmark = task.Bookmark,
                Id = task.Id,
                UserId = userId
            };
            _repository.Add(addTask);
            return Ok();
        }

        [HttpPut("{taskId}")]
        public IActionResult UpdateTask(Guid userId, int taskId, TaskEditDTO updatedTask)
        {
            var existingTask = _repository.Get().FirstOrDefault(t => t.UserId == userId && t.Id == taskId);
            if (existingTask == null)
            {
                return NotFound();
            }
            existingTask.Name = updatedTask.Name;
            existingTask.TaskCategory = updatedTask.TaskCategory;
            existingTask.IsCompleted = updatedTask.IsCompleted;
            existingTask.Bookmark = updatedTask.Bookmark;
            existingTask.Description = updatedTask.Description;
            existingTask.IsCompleted = updatedTask.IsCompleted;
            _repository.Edit(existingTask);
            return Ok();
        }

        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(Guid userId, int taskId)
        {
            var existingTask = _repository.Get().FirstOrDefault(t => t.UserId == userId && t.Id == taskId);
            if (existingTask == null)
            {
                return NotFound();
            }
            _repository.Delete(existingTask);
            return Ok();
        }
    }
}
