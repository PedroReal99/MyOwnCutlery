using MasterDataProducao.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MasterDataProducao.Persistence.EntityConfigurations
{
    public class ManufacturingPlanConfiguration : IEntityTypeConfiguration<ManufacturingPlan>
    {
        public void Configure(EntityTypeBuilder<ManufacturingPlan> entity)
        {
            entity.ToTable("ManufacturingPlan");
            entity.HasKey(c => c.Id);
            entity.HasMany(c => c.Operations);
        }
       
    }
}
