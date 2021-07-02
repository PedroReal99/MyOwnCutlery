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
    public class OperationRepository : IOperationRepository
    {
        private readonly MasterContext _context;

        public OperationRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(OperationsMDP op)
        {
            if (op != null)
            {
                _context.Operations.Add(op);
                _context.SaveChanges();
            }
            return true;
        }

        public bool Update(OperationsMDP op)
        {
            _context.Entry(op).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (op.Id.Equals(-1))
                {
                    throw new Exception("No operaction with that id");
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Delete(int Id)
        {
            var op = _context.Operations.Find(Id);
            if (op == null)
            {
                throw new Exception("No operaction with that id");
            }
            _context.Operations.Remove(op);
            _context.SaveChanges();
            return true;
        }

        public OperationsMDP Select(int Id)
        {
            return _context.Operations.SingleOrDefault(b => b.Id == Id);
        }
        public IList<OperationsMDP> SelectAll()
        {
            return  _context.Operations.ToList();
        }

    }


}