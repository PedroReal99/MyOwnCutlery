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
    public class OperationsTypeRepository : IOperationsTypeRepository
    {
        private readonly MasterContext _context;

        public OperationsTypeRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(OperationsType operationsType)
        {
            _context.OperationsType.Add(operationsType);
            _context.SaveChanges();
            return true;
        }

        public bool Update(OperationsType operationsType)
        {
            _context.Entry(operationsType).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (operationsType.Id.Equals(-1))
                {
                    throw new Exception("No operationsType with that id");
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Delete(int Id)
        {
            var operationsType = _context.OperationsType.Find(Id);
            if (operationsType == null)
            {
                throw new Exception("No operationsType with that id");
            }
            _context.OperationsType.Remove(operationsType);
            _context.SaveChanges();
            return true;
        }

        public OperationsType Select(int Id)
        {
            return _context.OperationsType.Include(b=>b.designation).SingleOrDefault(b => b.Id == Id);

        }
        public IList<OperationsType> SelectAll()
        {
            return _context.OperationsType.Include(b=>b.designation).ToList();
        }
    }
}