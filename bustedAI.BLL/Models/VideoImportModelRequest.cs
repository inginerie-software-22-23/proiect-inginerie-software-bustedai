using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using MediatR;


namespace rentalAppAPI.BLL.Models
{
    public class VideoImportModelRequest : IRequest<List<VideoImportModelResponse>>
    {
        List<IFormFile> File { get; set; }
    }
}
