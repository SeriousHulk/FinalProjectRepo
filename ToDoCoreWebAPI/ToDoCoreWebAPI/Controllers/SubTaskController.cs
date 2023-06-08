using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoCoreWebAPI.EF;
using ToDoCoreWebAPI.Model;
using ToDoCoreWebAPI.Model.DTOs;

namespace ToDoCoreWebAPI.Controllers
{
    [Route("api/v1/user/{userId}/tasks/{taskId}/subtasks/")]
    [ApiController]
    public class SubTaskController : ControllerBase
    {
        private readonly IRepository<SubTask> _repository;

        public SubTaskController(IRepository<SubTask> subTaskRepo)
        {
            _repository = subTaskRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubTasks(Guid userId, int taskId)
        {
            var allSubTasks = await _repository.Get().Where(s => s.UserId == userId && s.TaskId == taskId).ToListAsync();
            var subTaskGetDTOs = allSubTasks.Select(subtask => new SubTaskGetDTO
            {
                Id = subtask.Id,
                Name = subtask.Name,
                Description = subtask.Description,
                IsDone = subtask.IsDone,
                TaskPriority = subtask.TaskPriority
            }).ToList();
            return Ok(subTaskGetDTOs);
        }

        [HttpGet("{subTaskId}")]
        public IActionResult GetSubTaskById(Guid userId, int taskId, int subTaskId)
        {
            var subtask = _repository.Get().FirstOrDefault(s => s.Id == subTaskId && s.UserId == userId && s.TaskId == taskId);
            if (subtask == null)
            {
                return NotFound();
            }
            return Ok(subtask);
        }

        [HttpPost]
        public IActionResult CreateSubTask(Guid userId, int taskId, AddSubTaskDTO subtask)
        {
            var addSubTask = new SubTask
            {
                Description = subtask.Description,
                Id = subtask.Id,
                Name = subtask.Name,
                IsDone = subtask.IsDone,
                TaskPriority = subtask.TaskPriority,
                UserId = userId,
                TaskId = taskId
            };
            _repository.Add(addSubTask);
            return Ok();
        }

        [HttpPut("{subTaskId}")]
        public IActionResult UpdateSubTask(Guid userId, int taskId, int subTaskId, SubTaskEditDTO updatedSubtask)
        {
            var existingSubtask = _repository.Get().FirstOrDefault(s => s.Id == subTaskId && s.UserId == userId && s.TaskId == taskId);
            if (existingSubtask == null)
            {
                return NotFound();
            }
            existingSubtask.Name = updatedSubtask.Name;
            existingSubtask.Description = updatedSubtask.Description;
            _repository.Edit(existingSubtask);
            return Ok();
        }

        [HttpDelete("{subTaskId}")]
        public IActionResult DeleteSubTask(Guid userId, int taskId, int subTaskId)
        {
            var existingSubtask = _repository.Get().FirstOrDefault(s => s.Id == subTaskId && s.UserId == userId && s.TaskId == taskId);
            if (existingSubtask == null)
            {
                return NotFound();
            }

            _repository.Delete(existingSubtask);
            return Ok();
        }
    }
}
