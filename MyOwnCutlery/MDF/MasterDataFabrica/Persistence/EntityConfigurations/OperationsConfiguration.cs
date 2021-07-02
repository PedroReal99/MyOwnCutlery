using MasterDataFabrica.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MasterDataFabrica.Persistence.EntityConfigurations
{
    public class OperationsConfiguration : IEntityTypeConfiguration<Operations>
    {
        public void Configure(EntityTypeBuilder<Operations> entity)
        {
            entity.ToTable("Operations");
            entity.HasKey(c => c.Id);
            //entity.Property(c => c.description).HasMaxLength(50).IsRequired();
            //entity.Property(c => c.Dur);

            //entity.Property(c => c.ToolDetails);
        }
    }
}