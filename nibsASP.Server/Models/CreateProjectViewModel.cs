using System.ComponentModel.DataAnnotations;

namespace nibsASP.Server.Models
{
    public class CreateProjectViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name of Project is required.")]
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? Owner { get; set; }
        [Required(ErrorMessage = "A Status is required.")]
         public required string Status { get; set; }
        [Required(ErrorMessage = "A Start Date is required.")]
        public required DateTime StartDate { get; set; }
        [Required(ErrorMessage = "A End Date is required.")]
        public required DateTime EndDate { get; set; }
    }
}
