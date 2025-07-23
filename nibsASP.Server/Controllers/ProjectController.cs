using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nibsASP.Server.Data;
using nibsASP.Server.Entities;
using nibsASP.Server.Models;

namespace nibsASP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectDBContext _context;

        public ProjectController(ProjectDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get(int pageIndex = 0, int pageSize = 100)
        {
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                var projectCount = _context.Projects.Count();
                var projectList = _context.Projects.Skip(pageIndex * pageSize).Take(pageSize).Select(x => new ProjectListViewModel {Id = x.Id, Name = x.Name, Description = x.Description, EndDate = x.EndDate, StartDate = x.StartDate, Status = x.Status, Owner = x.Owner}).ToList();

                response.Status = true;
                response.StatusMessage = "Success";
                response.Data = new { Projects = projectList, ProjectCount = projectCount };

                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Something went wrong";

                return BadRequest(Response);
            }
        }

        [HttpGet("id")]
        public IActionResult GetProjectById(int id)
        {
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                var project = _context.Projects.Where(x => x.Id == id).Select(x => new ProjectListViewModel { Id = x.Id, Name = x.Name, Description = x.Description, EndDate = x.EndDate, StartDate = x.StartDate, Status = x.Status, Owner = x.Owner }).FirstOrDefault();

                if (project == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Project with this Id not found.";
                    return BadRequest(response);
                }

                response.Status = true;
                response.StatusMessage = "Success";
                response.Data = project;

                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Something went wrong";

                return BadRequest(response);
            }
        }

        [HttpPost]
        public IActionResult Post(CreateProjectViewModel model)
        {
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                if (ModelState.IsValid)
                {
                    var postedModel = new Project()
                    {
                        Name = model.Name,
                        Description = model.Description,
                        Owner = model.Owner,
                        Status = model.Status,
                        StartDate = model.StartDate,
                        EndDate = model.EndDate
                    };
                    _context.Projects.Add(postedModel);
                    _context.SaveChanges();

                    var responseData = new ProjectListViewModel
                    {
                        Name = postedModel.Name,
                        Description = postedModel.Description,
                        Owner = postedModel.Owner,
                        Status = postedModel.Status,
                        StartDate = postedModel.StartDate,
                        EndDate = postedModel.EndDate
                    };

                    response.Status = true;
                    response.StatusMessage = "Created Project Record.";
                    response.Data = responseData;

                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.StatusMessage = "Validation Failed.";
                    response.Data = ModelState;

                    return BadRequest(response);
                }
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Something went wrong";

                return BadRequest(response);
            }
        }

        [HttpPut]
        public IActionResult Put(CreateProjectViewModel model)
        {
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                if (ModelState.IsValid)
                {


                    var projectDetails = _context.Projects.Where(x => x.Id == model.Id).FirstOrDefault();

                    if (projectDetails == null)
                    {
                        response.Status = false;
                        response.StatusMessage = "Invalid Project Record.";

                        return BadRequest(response);
                    } 
                    
                    projectDetails.Name = model.Name;
                    projectDetails.Description = model.Description;
                    projectDetails.Owner = model.Owner;
                    projectDetails.Status = model.Status;
                    projectDetails.StartDate = model.StartDate;
                    projectDetails.EndDate = model.EndDate;
                    projectDetails.ModifiedDate = DateTime.Now;

                    _context.SaveChanges();

                    var responseData = new ProjectListViewModel
                    {
                        Name = projectDetails.Name,
                        Description = projectDetails.Description,
                        Owner = projectDetails.Owner,
                        Status = projectDetails.Status,
                        StartDate = projectDetails.StartDate,
                        EndDate = projectDetails.EndDate
                    };

                    response.Status = true;
                    response.StatusMessage = "Updated Project Record.";
                    response.Data = projectDetails;

                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.StatusMessage = "Validation Failed.";
                    response.Data = ModelState;

                    return BadRequest(response);
                }
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Something went wrong";

                return BadRequest(response);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                var project = _context.Projects.Where(x => x.Id == id).FirstOrDefault();
                if (project == null)
                {
                    response.Status = false;
                    response.StatusMessage = "Invalid Project Record.";

                    return BadRequest(response);
                }

                _context.Projects.Remove(project);
                _context.SaveChanges();

                response.Status = true;
                response.StatusMessage = "Deleted Successfully.";

                return Ok(response);
            }
            catch (Exception)
            {
                response.Status = false;
                response.StatusMessage = "Something went wrong";

                return BadRequest(response);
            }
        }
    }
}
