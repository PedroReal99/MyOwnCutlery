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
    [Route("api/product")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class ProductController : Controller
    {

        private readonly IProductRepository _IProductRepository;
        private readonly IManufacturingPlanRepository _IManufacturingPlanRepository;

        public ProductController(IProductRepository IProductRepository, IManufacturingPlanRepository IManufacturingPlanRepository)
        {
            _IProductRepository = IProductRepository;
            _IManufacturingPlanRepository = IManufacturingPlanRepository;
        }

        [HttpGet]
        public List<ProductsDTO> GetAllProducts()
        {
            var q = _IProductRepository.SelectAll().ToList();
            List<ProductsDTO> list = new List<ProductsDTO>();
            foreach (Product p in q)
            {
                list.Add(ProductsDTO.generateDto(p));
            }
            return list;
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _IProductRepository.Select(id);
            return Ok(ProductsDTO.generateDto(product));
            //return View(ProductsDTO.generateDto(product));
        }

        [HttpGet("{id}/ProductbyName")]
        public IActionResult GetProductbyName(String id)
        {
            var product = _IProductRepository.SelectByName(id);
            return Ok(ProductsDTO.generateDto(product));
        }

        [HttpGet("{id}/ProductbyName2")]
        public IActionResult GetProductbyName2(String id)
        {
            var product = _IProductRepository.SelectByName(id);
            var mp =_IManufacturingPlanRepository.Select(product.ManufacturingPlan.Id);
            var sum=0;
            foreach(OperationsMDP op in mp.Operations){
                sum+=op.Duration;
            }
            return Ok(ProductsDTO2.generateDto(product,sum));
        }



        [HttpGet("AllProductsWithSum")]
        public List<ProductsDTO2> AllProductsWithSum()
        {

            var q = _IProductRepository.SelectAll().ToList();
            List<ProductsDTO2> list = new List<ProductsDTO2>();
            foreach (Product p in q)
            {
                var mp =_IManufacturingPlanRepository.Select(p.ManufacturingPlan.Id);
                var sum=0;
                foreach(OperationsMDP op in mp.Operations){
                    sum+=op.Duration;
                }
                list.Add(ProductsDTO2.generateDto(p,sum));
            }
            return list;
        }



        //{id/planofabrico}
        [HttpGet("{id}/planofabrico")]
        public ActionResult<ManufacturingPlanDTO> GetManufacturingPlanForProduct(int id)
        {
            var product = _IProductRepository.Select(id);
            var manufacturingPlan = _IManufacturingPlanRepository.Select(product.ManufacturingPlan.Id);

            ManufacturingPlanDTO manufacturing = ManufacturingPlanDTO.generateDto(manufacturingPlan);
            return manufacturing;
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            return Ok(_IProductRepository.Delete(id));
        }

        [HttpPost]
        public ActionResult<ProductsDTO> PostProduct(ProductsDTO productDTO)
        {
            ManufacturingPlan manufacturing= _IManufacturingPlanRepository.Select(productDTO.ManufacturingPlanId);
            Product product=new Product(new Name(productDTO.Name),manufacturing);
            
            _IProductRepository.Insert(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut]
        public ActionResult PutProduct(ProductsDTO productDTO)
        {   
            ManufacturingPlan manufacturing= _IManufacturingPlanRepository.Select(productDTO.ManufacturingPlanId);
            Product product= new Product(new Name(productDTO.Name),manufacturing);
            return Ok(_IProductRepository.Update(product));
        }

    }
}