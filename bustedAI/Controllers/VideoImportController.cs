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