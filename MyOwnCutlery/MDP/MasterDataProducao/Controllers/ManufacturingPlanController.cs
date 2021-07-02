using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System;
using MasterDataProducao.Persistence;
using GenericSharedApi.Models;
using Microsoft.AspNetCore.Cors;

namespace MasterDataProducao.Controllers
{
    [Route("api/manufacturingplan")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class ManufacturingPlanController : Controller
    {
        private readonly IManufacturingPlanRepository _IManufacturingPlanRepository;
        private readonly IOperationRepository _IOperationRepository;

        public ManufacturingPlanController(IManufacturingPlanRepository IManufacturingPlanRepository, IOperationRepository IOperationRepository)
        {
            _IManufacturingPlanRepository = IManufacturingPlanRepository;
            _IOperationRepository=IOperationRepository;
        }

        [HttpGet]
        public List<ManufacturingPlanDTO> GetAllManufacturingPlan()
        {
            var q = _IManufacturingPlanRepository.SelectAll().ToList();
            List<ManufacturingPlanDTO> list = new List<ManufacturingPlanDTO>();
            foreach (ManufacturingPlan p in q)
            {
                list.Add(ManufacturingPlanDTO.generateDto(p));
            }
            return list;
        }

        [HttpGet("{id}")]
        public  ActionResult<ManufacturingPlanDTO> GetManufacturingPlan(int id)
        {
            var manufacturingPlan = _IManufacturingPlanRepository.Select(id);
            return Ok(ManufacturingPlanDTO.generateDto(manufacturingPlan));
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteManufacturingPlan(int id)
        {
           return Ok(_IManufacturingPlanRepository.Delete(id));
        }

        [HttpPost]
        public ActionResult PostManufacturingPlan(ManufacturingPlanDTO manufacturingPlanDTO)
        {
            List<OperationsMDP> list=new List<OperationsMDP>();
            foreach (int item in manufacturingPlanDTO.Operactions)
            {
               list.Add(_IOperationRepository.Select(item)); 
            }
            ManufacturingPlan manufacturingPlan=new ManufacturingPlan(manufacturingPlanDTO.Date,list);
            _IManufacturingPlanRepository.Insert(manufacturingPlan);
            return CreatedAtAction(nameof(GetManufacturingPlan), new { id = manufacturingPlan.Id }, manufacturingPlan);
        }

        [HttpPut]
        public ActionResult PutManufacturingPlan(ManufacturingPlanDTO manufacturingPlanDTO)
        {
            List<OperationsMDP> list=new List<OperationsMDP>();
            foreach (int item in manufacturingPlanDTO.Operactions)
            {
               list.Add(_IOperationRepository.Select(item)); 
            }
            ManufacturingPlan manufacturing=new ManufacturingPlan(manufacturingPlanDTO.Date,list);
            return Ok(_IManufacturingPlanRepository.Update(manufacturing));
        }

    }
}