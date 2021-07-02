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
    public class OperationsRepository : IOperationsRepository
    {
        private readonly MasterContext _context;

        public OperationsRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(Operations operations)
        {
            _context.Operations.Add(operations);
            _context.SaveChanges();
            return true;
            //_context.Entry(operations).Reference(name => machineType.Name).Load();
        }

        public bool Update(Operations operations)
        {
            _context.Entry(operations).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (operations.Id.Equals(-1))
                {
                    throw new Exception("No Operations with that id");
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Delete(int Id)
        {
            var operations = _context.Operations.Find(Id);
            if (operations == null)
            {
                throw new Exception("No Operations with that id");
            }
            _context.Operations.Remove(operations);
            _context.SaveChanges();
            return true;
        }

        public Operations Select(int Id)
        {
            return _context.Operations.Include(b=>b.designation).Include(b=>b.ToolDetails).Include(b=>b.Dur).Include(b=>b.operationsType).SingleOrDefault(b => b.Id == Id);

        }
        public IList<Operations> SelectAll()
        {
            return _context.Operations.Include(b=>b.designation).Include(b=>b.ToolDetails).Include(b=>b.Dur).Include(b=>b.operationsType).ToList();
        }
    }
}