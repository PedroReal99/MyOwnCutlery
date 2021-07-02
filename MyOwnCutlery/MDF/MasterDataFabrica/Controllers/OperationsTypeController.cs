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
    [Route("api/operationsType")]
     [EnableCors("MyPolicy")]
    [ApiController]
    public class OperationsTypeController : Controller
    {
        private readonly IOperationsTypeRepository _IOperationsTypeRepository;

        public OperationsTypeController(IOperationsTypeRepository IOperationsTypeRepository)
        {
            _IOperationsTypeRepository = IOperationsTypeRepository;
        }
        [HttpGet]
        public List<OperationsTypeDTO> GetAllOperationsType()
        {
            var q = _IOperationsTypeRepository.SelectAll().ToList();
            List<OperationsTypeDTO> list = new List<OperationsTypeDTO>();
            foreach (OperationsType p in q)
            {
                list.Add(OperationsTypeDTO.generateDto(p));
            }
            return list;
        }

        //api/operationsType/id/OperationTypeId
        [HttpGet("{id}/OperationTypeId")]
        public ActionResult<OperationsTypeDTO> GetOperationsTypeByID(int id)
        {
            var opType = _IOperationsTypeRepository.Select(id);
            OperationsTypeDTO p = OperationsTypeDTO.generateDto(opType);
            return Ok(p);
        }


        [HttpPost]
        public ActionResult<OperationsTypeDTO> PostOperationsType(OperationsTypeDTO operationsTypeDTO)
        {
            OperationsType opType = new OperationsType(new Designation(operationsTypeDTO.designation));
            _IOperationsTypeRepository.Insert(opType);
            return CreatedAtAction(nameof(GetAllOperationsType), new { id = opType.Id }, opType);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteOperationsType(int id)
        {
            return Ok(_IOperationsTypeRepository.Delete(id));

        }

    }
}

