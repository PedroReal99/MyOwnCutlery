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
using Microsoft.AspNetCore.Cors;

namespace MasterDataFabrica.Controllers
{
    [Route("api/machine")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class MachineController : Controller
    {
        private readonly IMachineRepository _IMachineRepository;
        private readonly IMachineTypeRepository _IMachineTypeRepository;

        public MachineController(IMachineRepository IMachineRepository, IMachineTypeRepository IMachineTypeRepository)
        {
            _IMachineRepository = IMachineRepository;
            _IMachineTypeRepository = IMachineTypeRepository;
        }
        [HttpGet]
        public List<MachineDTO> GetAllMachine()
        {
            var q = _IMachineRepository.SelectAll().ToList();
            List<MachineDTO> list = new List<MachineDTO>();
            foreach (Machine p in q)
            {
                list.Add(MachineDTO.generateDto(p));
            }
            return list;
        }

        [HttpGet("{type}")]
        public IQueryable<MachineDTO> GetAllMachineOfAType(String type)
        {
            var machine = _IMachineRepository.GetAllMachineOfAType(type);
            return machine;
        }


        //api/machine/id/machinebyid
        [HttpGet("{id}/machinebyid")]
        public ActionResult<MachineDTO> GetMachineByID(int id)
        {
            var machine = _IMachineRepository.Select(id);
            MachineDTO p = MachineDTO.generateDto(machine);
            return Ok(p);
        }

        //api/machine/id/machinebyName
        [HttpGet("{id}/machinebyName")]
        public ActionResult<MachineDTO> GetMachineByName(String id)
        {
            var machine = _IMachineRepository.SelectByName(id);
            MachineDTO p = MachineDTO.generateDto(machine);
            return Ok(p);
        }


        [HttpPost]
        public ActionResult<MachineDTO> PostMachine(MachineDTO machineDTO)
        {
            MachineType machineType = _IMachineTypeRepository.Select(machineDTO.machineTypeId);
            Machine machine = new Machine(new Designation(machineDTO.designation), machineType, new Model(machineDTO.model), new Location(machineDTO.location_factory, machineDTO.location_floor, machineDTO.location_section), new Position(machineDTO.position), new Capacity(machineDTO.capacity));
            _IMachineRepository.Insert(machine);
            return CreatedAtAction(nameof(GetMachineByID), new { id = machine.Id }, machine);
        }

        [HttpDelete("{id}")]
        public ActionResult<Machine> DeleteMachine(int id)
        {
            return Ok(_IMachineRepository.Delete(id));

        }

        // PUT:  api/machine/idMachine/{machineName}/idMachineType/{machineTypeName}
        [HttpPut("machine/{machineName}/machineType/{machineTypeName}")]
        public IActionResult changeMachineTypeOfaMachine([FromRoute] String machineName, [FromRoute] String machineTypeName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var machineDB = _IMachineRepository.SelectByName(machineName);
            if (machineDB != null)
            {
                var machineTypeDB = _IMachineTypeRepository.SelectByName(machineTypeName);
                if (machineTypeDB != null)
                {
                    machineDB.machineType = machineTypeDB;
                    bool update = _IMachineRepository.Update(machineDB);
                    if (update)
                    {
                        MachineDTO machineDTO = MachineDTO.generateDto(machineDB);
                        return Ok(machineDTO);
                    }
                }
            }

            return NotFound();



        }
    }
}

