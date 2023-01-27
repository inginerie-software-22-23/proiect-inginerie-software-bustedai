using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.StaticFiles;
using rentalAppAPI.DAL;
using rentalAppAPI.DAL.Entities;
using System.Diagnostics;
using System.Net.Mime;
using System.Text.RegularExpressions;
using System.Web;

namespace rentalAppAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VideoImportController : ControllerBase
    {
        AppDbContext db;
        public VideoImportController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpPost]
        public async Task<IActionResult> PostFile(IFormFile file)
        {

            var filePath = Path.GetTempFileName();

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var x = new VideoImport { FilePath = filePath };
            db.VideoImports.Add(x);
            await db.SaveChangesAsync();

            var filesFromPythonScyrpt = new List<string>();
            var scriptPath = "C:/Users/grosu/PycharmProjects/Teste/test.py";
            var arguments = filePath;

            using (Process process = new Process())
            {
                process.StartInfo.FileName = "C:/Users/grosu/AppData/Local/Programs/Python/Python310/python.exe";
                process.StartInfo.Arguments = string.Format("{0} {1}", scriptPath, arguments);
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.Start();

                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    filesFromPythonScyrpt = result.Split(Environment.NewLine).ToList();
                }
            }
            string filePath1 = Path.Combine(Directory.GetCurrentDirectory(), "App_Data", "Uploads", "demofile2.txt");

            return PhysicalFile(filePath, "application/download", "demofile2.txt");
        }

    }
}