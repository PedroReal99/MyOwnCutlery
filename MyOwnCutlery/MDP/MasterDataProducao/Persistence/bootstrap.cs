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
    public class bootstrap
    {
        private readonly MasterContext _context;

        public bootstrap(MasterContext context)
        {
            _context = context;


            if (_context.Operations.Count() == 0)
            {
                OperationsMDP op = new OperationsMDP("desc1", "name1", 10, 1);
                OperationsMDP op2 = new OperationsMDP("desc2", "name2", 150, 2);
                _context.Operations.Add(op);
                _context.Operations.Add(op2);
                _context.SaveChanges();
            }
            if (_context.ManufacturingPlans.Count() == 0)
            {
                List<OperationsMDP> lista1 = new List<OperationsMDP>();
                List<OperationsMDP> lista2 = new List<OperationsMDP>();
                lista1.Add(_context.Operations.Find(1));
                lista2.Add(_context.Operations.Find(2));
                _context.ManufacturingPlans.Add(new ManufacturingPlan(DateTime.Today, lista1));
                _context.ManufacturingPlans.Add(new ManufacturingPlan(DateTime.Today, lista2));
                _context.SaveChanges();
            }

            if (_context.Products.Count() == 0)
            {
                _context.Products.Add(new Product(new Name("Product1"), _context.ManufacturingPlans.Find(1)));
                _context.Products.Add(new Product(new Name("Product2"), _context.ManufacturingPlans.Find(2)));
                _context.SaveChanges();
            }

            
        }
    }
}