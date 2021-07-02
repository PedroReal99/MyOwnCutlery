using MasterDataProducao.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using MasterDataProducao.Persistence;


namespace MasterDataProducao.Models
{
    public class MasterContext : DbContext
    {
        public MasterContext()
        {
        }

        public MasterContext(DbContextOptions<MasterContext> options) : base(options)
        {

        }

        public MasterContext(DbSet<Product> products, DbSet<ManufacturingPlan> manufacturingPlans, DbSet<OperationsMDP> operations)
        {
            Products = products;
            ManufacturingPlans = manufacturingPlans;
            Operations=operations;
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ManufacturingPlan> ManufacturingPlans { get; set; }
        public DbSet<OperationsMDP> Operations { get; set; }


        /*  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
         {
             if (!optionsBuilder.IsConfigured)
                 optionsBuilder.UseSqlServer("Server=DESKTOP-2JQS9G4;Database=Products;Trusted_Connection=True;MultipleActiveResultSets=True;");
         }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            //modelBuilder.Entity<Product>(new Product().Configure);
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new ManufacturingPlanConfiguration());
            //modelBuilder.Entity<ManufacturingPlan>().OwnsOne(p => p.Date).Property(p => p.date).HasColumnName("Date");
            modelBuilder.Entity<Product>().OwnsOne(p => p.Name).Property(p => p.name).HasColumnName("Name");
        }
    }

}

