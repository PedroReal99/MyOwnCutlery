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
    public class MachineTypeRepository : IMachineTypeRepository
    {
        private readonly MasterContext _context;

        public MachineTypeRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(MachineType machineType)
        {
            _context.MachineType.Add(machineType);
            _context.SaveChanges();
            return true;
            //_context.Entry(machineType).Reference(name => machineType.Name).Load();
        }

        public bool Update(MachineType machineType)
        {
            _context.Entry(machineType).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (machineType.Id.Equals(-1))
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
            var machineType = _context.MachineType.Find(Id);
            if (machineType == null)
            {
                throw new Exception("No MachineType with that id");
            }
            _context.MachineType.Remove(machineType);
            _context.SaveChanges();
            return true;
        }

        public MachineType Select(int Id)
        {
             return _context.MachineType.Include(b => b.designation).Include(b => b.operations).SingleOrDefault(b => b.Id == Id);
        }

        public MachineType SelectByName(String name)
        {
             return _context.MachineType.Include(b => b.designation).Include(b => b.operations).SingleOrDefault(b => b.designation.designation == name);
        }
        public IList<MachineType> SelectAll()
        {
            return _context.MachineType.Include(b => b.operations).ToList();
        }
    }
}