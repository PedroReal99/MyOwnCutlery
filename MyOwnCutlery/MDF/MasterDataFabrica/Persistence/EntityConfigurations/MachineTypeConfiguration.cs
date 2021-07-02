using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataFabrica.Models;

namespace MasterDataFabrica.Persistence.EntityConfigurations
{
    public class MachineTypeConfiguration : IEntityTypeConfiguration<MachineType>
    {
        public void Configure(EntityTypeBuilder<Models.MachineType> entity)
        {
            entity.ToTable("MachineType");
            entity.HasKey(c => c.Id);
            //entity.Property(c => c.Designation).HasMaxLength(50).IsRequired();
            //entity.HasMany(c => c.Operations)
              //              .WithOne(m => m.machineType);
        }
    }
}



