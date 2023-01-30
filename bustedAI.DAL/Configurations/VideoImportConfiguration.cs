using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using bustedAI.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bustedAI.DAL.Configurations
{
    public class VideoImportConfiguration : IEntityTypeConfiguration<VideoImport>
    {
        public void Configure(EntityTypeBuilder<VideoImport> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.FilePath)
                .HasColumnType("nvarchar(1000)")
                .HasMaxLength(1000);

        }
    }
}
