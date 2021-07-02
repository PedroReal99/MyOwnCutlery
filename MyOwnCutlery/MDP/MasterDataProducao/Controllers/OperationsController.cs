using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System;
using MasterDataProducao.Persistence;
using System.Web.Http;
using GenericSharedApi.Models;
using Microsoft.AspNetCore.Cors;

namespace MasterDataProducao.Controllers
{
    [Route("api/operationsMDP")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class OperationsController : Controller
    {
        private readonly IOperationRepository _IOperationsRepository;

        public OperationsController(IOperationRepository IOperationsRepository)
        {
            _IOperationsRepository = IOperationsRepository;
        }

        [HttpGet]
        public List<OperationsMDP> GetAllOperations()
        {
            var operations = _IOperationsRepository.SelectAll().ToList();
            return operations;
        }

        [HttpPost]
        public ActionResult<OperationsDTO> PostOperation(OperationsDTO opDTO)
        {
            OperationsMDP op = new OperationsMDP(opDTO.ToolDesc, opDTO.Name, opDTO.Duration, opDTO.OperationsTypeId);
            _IOperationsRepository.Insert(op);
            return CreatedAtAction(nameof(GetAllOperations), new { id = op.Id }, op);
        }

        [HttpGet("{id}")]
        public ActionResult<OperationsMDP> GetById(int id)
        {
            var op = _IOperationsRepository.Select(id);
            return Ok(op);
        }

        [HttpPut("{id}")]
        public ActionResult PutOperations(OperationsMDP op)
        {
            return Ok(_IOperationsRepository.Update(op));
        }
    }
}