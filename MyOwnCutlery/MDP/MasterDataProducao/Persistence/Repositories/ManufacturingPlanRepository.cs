using System;
using MasterDataProducao.Models;
using System.Linq;
using GenericSharedApi.Models;
using MasterDataProducao.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MasterDataProducao.Persistence
{
    public class ManufacturingPlanRepository : IManufacturingPlanRepository
    {
        readonly MasterContext _context;

        public ManufacturingPlanRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }
        public bool Insert(ManufacturingPlan manufacturingPlan)
        {
            _context.ManufacturingPlans.Add(manufacturingPlan);
            _context.SaveChanges();
            return true;
        }
        public bool Update(ManufacturingPlan manufacturingPlan)
        {
            _context.Entry(manufacturingPlan).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (manufacturingPlan.Id.Equals(-1))
                {
                    throw new Exception("No ManufacturingPlan with that id");
                }
                else
                {
                    throw;
                }
            }
        }
        public bool Delete(int Id)
        {
            var manufacturingPlan = _context.ManufacturingPlans.Find(Id);
            if (manufacturingPlan == null)
            {
                throw new Exception("No ManufacturingPlan with that id");
            }
            _context.ManufacturingPlans.Remove(manufacturingPlan);
            _context.SaveChanges();
            return true;
        }
        public ManufacturingPlan Select(int id)
        {
            return _context.ManufacturingPlans.Include(m => m.Operations).SingleOrDefault(m => m.Id == id);
        }
        public IList<ManufacturingPlan> SelectAll()
        {
            return _context.ManufacturingPlans.Include(m => m.Operations).ToList();
        }
    }
}