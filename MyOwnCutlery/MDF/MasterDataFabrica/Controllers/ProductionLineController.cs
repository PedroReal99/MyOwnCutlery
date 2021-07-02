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
    [Route("api/productionLine")]
     [EnableCors("MyPolicy")]
    [ApiController]
    public class ProductionLineController : Controller
    {
        private readonly IProductionLineRepository _IProductionLineRepository;
        private readonly IMachineRepository _IMachineRepository;

        public ProductionLineController(IProductionLineRepository IProductionLineRepository,IMachineRepository IMachineRepository)
        {
            _IProductionLineRepository= IProductionLineRepository;
            _IMachineRepository=IMachineRepository;

        }

        [HttpGet("{id}")]
        public ActionResult<ProductionLineDTO> GetProductionLine(int id)
        {
            var q = _IProductionLineRepository.Select(id);
            ProductionLineDTO p= ProductionLineDTO.generateDto(q);
            return Ok(p);
        }

        [HttpGet]
        public IEnumerable<ProductionLineDTO> GetAllProductionLine()
        {
            var q=  _IProductionLineRepository.SelectAll().ToList();
            List <ProductionLineDTO>list = new List<ProductionLineDTO>();
            foreach(ProductionLine p in q){
                ProductionLineDTO productionLine = ProductionLineDTO.generateDto(p);
                list.Add(productionLine);
            }
            return list;
 
        }
        [HttpPost]
        public ActionResult<ProductionLineDTO> PostProductionLine(ProductionLineDTO productionLineDTO)
        {
            List<Machine> machines=new List<Machine>();
            foreach (int item in productionLineDTO.machineList)
            {
                machines.Add(_IMachineRepository.Select(item));
            }
            ProductionLine productionLine=new ProductionLine(machines);
            _IProductionLineRepository.Insert(productionLine);
                        
           return CreatedAtAction(nameof(GetAllProductionLine), new { id = productionLine.Id }, productionLine);
        }

        [HttpDelete("{id}")]
        public  ActionResult<ProductionLine> DeleteProductionLine(int id)
        {
            return Ok(_IProductionLineRepository.Delete(id));
        }
    }
}