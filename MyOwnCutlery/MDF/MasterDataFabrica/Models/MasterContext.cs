using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore;

namespace MasterDataFabrica.Models
{
    public class MasterContext : DbContext
    {
        public MasterContext()
        {
        }

        public MasterContext(DbContextOptions<MasterContext> options) : base(options)
        {
            
        }
        public DbSet<Operations> Operations { get; set; }

        public MasterContext(DbSet<Operations> machh)
        {
            if (machh is null)
            {
                throw new ArgumentNullException(nameof(machh));
            }

            Operations= machh;
        }
        
        public DbSet<OperationsType> OperationsType { get; set; }

        public MasterContext(DbSet<OperationsType> machh)
        {
            if (machh is null)
            {
                throw new ArgumentNullException(nameof(machh));
            }

            OperationsType= machh;
        }

        public DbSet<Machine> Machine { get; set; }


        public MasterContext(DbSet<Machine> machh)
        {
            if (machh is null)
            {
                throw new ArgumentNullException(nameof(machh));
            }

            Machine= machh;
        }
        public DbSet<ProductionLine> ProductionLine { get; set; }

        public MasterContext(DbSet<ProductionLine> machh)
        {
            if (machh is null)
            {
                throw new ArgumentNullException(nameof(machh));
            }

            ProductionLine= machh;
        }
        public DbSet<MachineType> MachineType { get; set; }

        public MasterContext(DbSet<MachineType> machh)
        {
            if (machh is null)
            {
                throw new ArgumentNullException(nameof(machh));
            }

            MachineType= machh;
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Product>(new Product().Configure);

            base.OnModelCreating(modelBuilder);

            //modelBuilder.ApplyConfiguration(new ProductionLineConfiguration());
            modelBuilder.ApplyConfiguration(new MachineTypeConfiguration());
            modelBuilder.ApplyConfiguration(new OperationsConfiguration());

            //Machine
            modelBuilder.Entity<Machine>().OwnsOne(p => p.location);
            modelBuilder.Entity<Machine>().OwnsOne(p => p.position).Property(p => p.position).HasColumnName("Position");
            modelBuilder.Entity<Machine>().OwnsOne(p => p.capacity).Property(p => p.capacity).HasColumnName("Capacity");
            modelBuilder.Entity<Machine>().OwnsOne(p => p.designation).Property(p => p.designation).HasColumnName("Designation");
            modelBuilder.Entity<Machine>().OwnsOne(p => p.model).Property(p => p.model).HasColumnName("Model");

            //Operations
            modelBuilder.Entity<Operations>().OwnsOne(p => p.Dur).Property(p => p.dur).HasColumnName("Duration");
            modelBuilder.Entity<Operations>().OwnsOne(p => p.designation).Property(p => p.designation).HasColumnName("Designation");
            modelBuilder.Entity<Operations>().OwnsOne(p => p.ToolDetails).Property(p => p.Det).HasColumnName("Tools Details");



            //Tools
            //modelBuilder.Entity<Tools>().OwnsOne(p => p.Det).Property(p => p.Det).HasColumnName("Details");

            //OperationsType
            modelBuilder.Entity<OperationsType>().OwnsOne(p => p.designation).Property(p => p.designation).HasColumnName("Designation");
             //MachineType
            modelBuilder.Entity<MachineType>().OwnsOne(p => p.designation).Property(p => p.designation).HasColumnName("Designation");
        }

 


        /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
                optionsBuilder.UseSqlServer("Server=[SERVIDOR];Port=[PORTA];Database=modelo;Uid=[USUARIO];Pwd=[SENHA]");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>(new Model().Configure);

        }*/
    }

}

