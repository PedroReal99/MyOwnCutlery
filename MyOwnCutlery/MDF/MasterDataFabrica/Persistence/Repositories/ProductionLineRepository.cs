using System;
using MasterDataFabrica.Models;
using System.Linq;
using GenericSharedApi.Models;
using MasterDataFabrica.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MasterDataFabrica.Persistence
{
    public class ProductionLineRepository : IProductionLineRepository
    {
        private readonly MasterContext _context;

        public ProductionLineRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(ProductionLine productionLine)
        {
            _context.ProductionLine.Add(productionLine);
            _context.SaveChanges();
            //_context.Entry(machineType).Reference(name => machineType.Name).Load();
            return true;
        }

        public bool Update(ProductionLine productionLine)
        {
            _context.Entry(productionLine).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (productionLine.Id.Equals(-1))
                {
                    throw new Exception("No MachineType with that id");
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Delete(int Id)
        {
            var productionLine = _context.ProductionLine.Find(Id);
            if (productionLine == null)
            {
                throw new Exception("No ProductionLine with that id");
            }
            _context.ProductionLine.Remove(productionLine);
            _context.SaveChanges();
            return true;
        }

        public ProductionLine Select(int Id)
        {
           return _context.ProductionLine.Include(b => b.machineList).SingleOrDefault(b => b.Id == Id);
        }
        public IList<ProductionLine> SelectAll()
        {
            return _context.ProductionLine.Include(b => b.machineList).ToList();
        }
    }
}