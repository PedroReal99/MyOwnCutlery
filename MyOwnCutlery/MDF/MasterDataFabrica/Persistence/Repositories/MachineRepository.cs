using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System;
using MasterDataFabrica.Persistence;
using System.Web.Http;
using GenericSharedApi.Models;

namespace MasterDataFabrica.Persistence
{
    public class MachineRepository : ControllerBase, IMachineRepository
    {
        private readonly MasterContext _context;

        public MachineRepository(MasterContext context)
        {
            _context = context;
            new bootstrap(context);
        }

        public bool Insert(Machine machine)
        {
            _context.Machine.Add(machine);
            _context.SaveChanges();
            return true;
        }

        public bool Update(Machine machine)
        {
            _context.Entry(machine).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (machine.Id.Equals(-1))
                {
                    throw new Exception("No Machine with that id");
                }
                else
                {
                    throw;
                }
            }
        }

        public bool Delete(int Id)
        {
            var machine = _context.Machine.Find(Id);
            if (machine == null)
            {
                throw new Exception("No Machine with that id");
            }
            _context.Machine.Remove(machine);
            _context.SaveChanges();
            return true;
        }

        public Machine Select(int Id)
        {
            return _context.Machine.Include(b => b.designation).Include(b => b.machineType)
                    .Include(b => b.model).Include(b => b.location).Include(b => b.position).Include(b => b.capacity).SingleOrDefault(b => b.Id == Id);
        }

        public Machine SelectByName(String name)
        {
            return _context.Machine.Include(b => b.designation).Include(b => b.machineType)
                    .Include(b => b.model).Include(b => b.location).Include(b => b.position).Include(b => b.capacity).SingleOrDefault(b => b.designation.designation == name);
        }

        public IList<Machine> SelectAll()
        {
            return _context.Machine.Include(b => b.designation).Include(b => b.machineType)
                    .Include(b => b.model).Include(b => b.location).Include(b => b.position).Include(b => b.capacity).ToList();
        }
        public IQueryable<MachineDTO> GetAllMachineOfAType(String type)
        {
            var machine = from b in _context.Machine
                          where b.machineType.designation.designation == type
                          select new MachineDTO()
                          {
                              machineId = b.Id,
                              designation = b.designation.designation,
                              machineTypeId = b.machineType.Id,
                              model = b.model.model,
                              location_factory = b.location.factory,
                              location_section = b.location.section,
                              location_floor = b.location.floor,
                              position = b.position.position,
                              capacity = b.capacity.capacity,
                          }
                          ;
            return machine;
        }
        /**
        public async Task<IActionResult> changeMachineTypeOfaMachine(int idMachine, int idMsachineType)
        {
            // ALTERAR TIPO DE MAQUINA DE UMA MAQUINA

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!existMachine(idMachine))
            {
                return NotFound();
            }
            Machine machineDB = Select(idMachine);
                                        
             //  _context.Machine.Include(m => m.designation).
              //  Include(m => m.machineType).
              //  Include(m => m.model).
               // Include(m => m.location).
               // Include(m => m.position).
               // Include(m => m.capacity).FirstOrDefaultAsync(m => m.Id == idMachine);
         
            if (machineDB != null)
            {
                machineDB.machineType = machineType;
            }
            else
            {
                return NotFound();
            }
            if (Update(machineDB))
            {
                return Ok(machineDB);
            }
            return NotFound();
        }

        private bool existMachine(int id)
        {
            return _context.Machine.Any(e => e.Id == id);
        }
**/
    }
}