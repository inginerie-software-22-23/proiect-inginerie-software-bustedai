using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.StaticFiles;
using bustedAI.DAL;

using bustedAI.DAL.Entities;
using System.Diagnostics;
using System.Net.Mime;
using System.Text.RegularExpressions;
using System.Web;
using System.Text;
using IronPython.Hosting;
using CliWrap;
using CliWrap.Buffered;
using Mono.Unix.Native;

namespace bustedAI.Controllers
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

        public static string[] mediaExtensions = {
            ".mp4", ".tmp"
};
        public static bool IsMediaFIle(string path)
        {
            return mediaExtensions.Contains(Path.GetExtension(path), StringComparer.OrdinalIgnoreCase);
        }

        [HttpPost]
        public async Task<IActionResult> PostFile(IFormFile file)
        {
            var fileS = Path.GetFileName(file.FileName);
            if (IsMediaFIle(fileS) == false)
            {
                return BadRequest("Import a video of type .mp4 or .tmp");
            }


            var filePath = Path.GetTempFileName();

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }




            var scriptPath = "C:/Users/grosu/Documents/GitHub/proiect-inginerie-software-bustedai/Detection/detect.py";
            var arguments = filePath;

            var command = await Cli.Wrap("powershell")
                .WithWorkingDirectory(@"C:/Users/grosu/Documents/GitHub/proiect-inginerie-software-bustedai")
                .WithArguments(new[] { "C:/Users/grosu/AppData/Local/Programs/Python/Python310/python.exe",scriptPath, filePath })
                .ExecuteBufferedAsync();

            return PhysicalFile("C:/Users/grosu/Documents/GitHub/proiect-inginerie-software-bustedai/Output.zip", "application/octet-stream", "Output.zip");

        }

    }
}