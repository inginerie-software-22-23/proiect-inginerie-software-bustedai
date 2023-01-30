using MediatR;
using Microsoft.EntityFrameworkCore;
using bustedAI.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using AutoMapper;
using System.Threading;
using bustedAI.DAL;
using System.IO;

namespace bustedAI.BLL.Handlers
{
    //public class VideoImportHandler : IRequestHandler<VideoImportModelRequest, VideoImportModelResponse>
    //{
    //    private readonly IMapper _mapper;
    //    private readonly AppDbContext _dbContext;

    //    public VideoImportHandler(IMapper mapper, AppDbContext myDbContext)
    //    {
    //        _mapper = mapper;
    //        _dbContext = myDbContext;
    //    }

    //    public async Task<VideoImportModelResponse> Handle(VideoImportModelRequest file, CancellationToken cancellationToken)
    //    {
    //        //var query =  _dbContext.Course.Where(c => c.Name.Contains(filterCourse.Name) && (x.Valid == filterCourse.Valid || filterCourse.Valid == null));

    //        //var entity = _dbContext.VideoImports.
    //        var files = "x";
            
    //        return new VideoImportModelResponse{ FilePath = files};
    //        //return _mapper.Map<List<GetCourseByFilterResponse>>(entity);
    //    }
    //}
}
