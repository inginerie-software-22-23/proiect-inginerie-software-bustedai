using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using rentalAppAPI.DAL;
using rentalAppAPI.DAL.Entities;
using System.Diagnostics;
using System.Text.RegularExpressions;

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

            var x = new VideoImport { FilePath = filePath};
            //here we save the file path in our db
            // if the user wants to view the history of the imported videos 
            db.VideoImports.Add(x);
            await db.SaveChangesAsync();
            // here we will transfer the imported video to the python scipt that will generate the wanted pictures
            //IFormFile file1 = "C:\Users\grosu\Downloads\a.mp4";
            //using (FileStream stream = new FileStream(file1.OpenReadStream()))
            //{
            //    byte[] buffer = new byte[stream.Length];
            //    stream.Read(buffer, 0, (int)stream.Length);
            //    // Do something with the byte array
            //}

            var filesFromPythonScyrpt = new List<string>();
            var scriptPath = "C:/Users/grosu/PycharmProjects/Teste/test.py";
            var arguments = filePath; //the argument of the pyton script is the file we imported

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


            return Ok(filesFromPythonScyrpt);
        }

        //[HttpGet]
        // to do in handler a get method that gets type of pictures that we want from the algorithm
        // ex: cars, persons etc.
        // to discuss
    }
}
