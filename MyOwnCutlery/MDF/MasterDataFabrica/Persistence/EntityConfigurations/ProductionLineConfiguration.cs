/*using MasterDataFabrica.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MasterDataFabrica.Persistence.EntityConfigurations
{
    public class ProductionLineConfiguration : IEntityTypeConfiguration<ProductionLine>
    {
        public void Configure(EntityTypeBuilder<ProductionLine> entity)
        {
            entity.HasMany(c => c.machineList)
                  .WithOne(e => e.productionLine);
        }
    }
}
*/