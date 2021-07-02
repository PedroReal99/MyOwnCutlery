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
    [Route("api/operations")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class OperationsController : Controller
    {

        private readonly IOperationsRepository _IOperationsRepository;
        private readonly IMachineTypeRepository _IMachineTypeRepository;
        private readonly IOperationsTypeRepository _IOperationsTypeRepository;

        public OperationsController(IOperationsRepository IOperationsRepository, IMachineTypeRepository IMachineTypeRepository,IOperationsTypeRepository IOperationsTypeRepository)
        {
            _IOperationsRepository = IOperationsRepository;
            _IMachineTypeRepository = IMachineTypeRepository; ;
            _IOperationsTypeRepository=IOperationsTypeRepository;

        }

        [HttpGet]
        public List<OperationsDTO> GetAllOperations()
        {
            var q = _IOperationsRepository.SelectAll().ToList();
            List<OperationsDTO> list = new List<OperationsDTO>();
            foreach (Operations p in q)
            {
                list.Add(OperationsDTO.generateDto(p));
            }
            return list;
        }
        [HttpGet("{id}/operationsbyid")]
        public ActionResult<OperationsDTO> GetOperationsByID(int id)
        {
            var operations = _IOperationsRepository.Select(id);
            OperationsDTO p = OperationsDTO.generateDto(operations);
            return Ok(p);
        }

        [HttpPost]
        public ActionResult<OperationsDTO> PostOperation(OperationsDTO opDTO)
        {
            var opType = _IOperationsTypeRepository.Select(opDTO.OperationsTypeId);
            Operations op = new Operations(new Designation(opDTO.Name), new Details(opDTO.ToolDesc), new Duration(opDTO.Duration), opType);
            _IOperationsRepository.Insert(op);

            return CreatedAtAction(nameof(GetAllOperations), new { id = op.Id }, op);
        }


        [HttpGet("{id}")]
        public List<OperationsDTO> GetOperationsByMachineTypeByName([FromRoute] String id)
        {
            var machineType = _IMachineTypeRepository.SelectByName(id);
            List<OperationsDTO> lista = new List<OperationsDTO>();
            foreach (Operations op in machineType.operations)
            {
                lista.Add(OperationsDTO.generateDto(_IOperationsRepository.Select(op.Id)));
            }
            return lista;
        }


        [HttpPut("{id}")]
        public ActionResult PutOperations([FromRoute] int id, [FromBody] MachineTypeDTO machineType)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            List<Operations> operations = new List<Operations>();
            foreach (int item in machineType.operations)
            {
               Operations a= _IOperationsRepository.Select(item);
                operations.Add(a);
            }
            var machineTypeDB = _IMachineTypeRepository.Select(id);
            if (machineTypeDB == null)
            {
                return NotFound();
            }
            machineTypeDB.operations = operations;
            _IMachineTypeRepository.Update(machineTypeDB);
            return Ok(machineTypeDB);



        }

        private bool existMachineType(int id)
        {
            if (_IOperationsRepository.Select(id) != null)
                return true;
            return false;
        }
        [HttpDelete("{id}")]
        public ActionResult<Operations> DeleteOperaions(int id)
        {
            return Ok(_IOperationsRepository.Delete(id));

        }

    }
}