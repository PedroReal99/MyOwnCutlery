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
    [Route("api/machinetype")]
     [EnableCors("MyPolicy")]
    [ApiController]
    public class MachineTypeController : Controller
    {
        private readonly IMachineTypeRepository _IMachineTypeRepository;
        private readonly IOperationsRepository _IOperationsRepository;

        public MachineTypeController(IMachineTypeRepository IMachineTypeRepository, IOperationsRepository IOperationsRepository)
        {
            _IMachineTypeRepository = IMachineTypeRepository;
            _IOperationsRepository = IOperationsRepository;

        }


        //--------------------------------- GET METHODS------------------------------------------//

        // GET: api/machinetype
        [HttpGet]
        public List<MachineTypeDTO> GetAllMachineTypes()
        {
            var q = _IMachineTypeRepository.SelectAll().ToList();
            List<MachineTypeDTO> list = new List<MachineTypeDTO>();
            foreach (MachineType p in q)
            {
                MachineTypeDTO machineType = MachineTypeDTO.generateDto(p);
                list.Add(machineType);
            }
            return list;
        }
        [HttpGet("{id}")]
        public ActionResult<MachineTypeDTO> GetMachineTypeById(int id)
        {
            var machineType = _IMachineTypeRepository.Select(id);
            MachineTypeDTO p = MachineTypeDTO.generateDto(machineType);
            return Ok(p);
        }

        [HttpGet("{id}/machineTypebyName")]
        public ActionResult<MachineTypeDTO> GetMachineTypeByName(String id)
        {
            var machineType = _IMachineTypeRepository.SelectByName(id);
            MachineTypeDTO p = MachineTypeDTO.generateDto(machineType);
            return Ok(p);
        }

        //--------------------------------- POST METHODS------------------------------------------//

        [HttpPost]
        public ActionResult PostMachineType(MachineTypeDTO machineTypeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            List<Operations> list = new List<Operations>();
            Operations novo = new Operations();
            foreach (int item in machineTypeDTO.operations)
            {
                novo = _IOperationsRepository.Select(item);
                list.Add(novo);
            }
            MachineType machineType = new MachineType(new Designation(machineTypeDTO.designation), list);
            _IMachineTypeRepository.Insert(machineType);

            return CreatedAtAction(nameof(GetMachineTypeById), new { id = machineType.Id }, machineType);

        }

        //--------------------------------- PUT METHODS------------------------------------------//


        // PUT:  api/machinetype/id
        [HttpPut("{id}")]
        public IActionResult PutMachineType([FromRoute] int id, [FromBody] MachineType machineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var machineTypeDB = _IMachineTypeRepository.Select(id);
            if (machineTypeDB != null)
            {
                machineTypeDB = machineType;
                bool update = _IMachineTypeRepository.Update(machineTypeDB);
                if (update)
                {
                    MachineTypeDTO machineTypeDTO = MachineTypeDTO.generateDto(machineTypeDB);
                    return Ok(machineTypeDTO);
                }
            }
          return NotFound();
        }
    
    //--------------------------------- DELETE METHODS------------------------------------------//

    // DELETE: api/machinetype/id
    [HttpDelete("{id}")]
    public ActionResult DeleteMachineType([FromRoute] int id)
    {
        return Ok(_IMachineTypeRepository.Delete(id));
    }
}


}