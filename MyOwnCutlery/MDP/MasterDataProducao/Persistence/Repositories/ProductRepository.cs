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
    public class ProductRepository : IProductRepository
    {
        private readonly MasterContext _context;

        public ProductRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return true;
        }

        public bool Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (product.Id.Equals(-1))
                {
                    throw new Exception("No product with that id");
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Delete(int Id)
        {
            var product = _context.Products.Find(Id);
            if (product == null)
            {
                throw new Exception("No product with that id");
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
            return true;
        }

        public Product Select(int Id)
        {
            return _context.Products.Include(b => b.Name).Include(b => b.ManufacturingPlan).SingleOrDefault(b => b.Id == Id);
        }

        public Product SelectByName(String Id)
        {
            return _context.Products.Include(b => b.Name).Include(b => b.ManufacturingPlan).SingleOrDefault(b => b.Name.name == Id);
        }

        public IList<Product> SelectAll()
        {
            return _context.Products.Include(b => b.Name).Include(b => b.ManufacturingPlan).ToList();
        }
    }

}