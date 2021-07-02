using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataProducao.Models;
using GenericSharedApi.Models;

namespace MasterDataProducao.DTOs
{
    public class ProductsDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int ManufacturingPlanId { get; set; }
        public DateTime MPDate { get; set; }
        public ProductsDTO()
        {
        }
        public ProductsDTO(string Name, int ManufacturingPlanId, DateTime MPDate)
        {
            this.Name = Name;
            this.ManufacturingPlanId = ManufacturingPlanId;
            this.MPDate = MPDate;
        }
        public ProductsDTO(int ProductId, string Name, int ManufacturingPlanId, DateTime MPDate)
        {
            this.ProductId = ProductId;
            this.Name = Name;
            this.ManufacturingPlanId = ManufacturingPlanId;
            this.MPDate = MPDate;
        }
        public static ProductsDTO generateDto(Product product)
        {
            ProductsDTO p = new ProductsDTO();
            if (product.Id != -1)
            {
                p.ProductId = product.Id;
            }
            if (product.Name != null)
            {
                p.Name = product.Name.name;
            }
            if (product.ManufacturingPlan != null)
            {
                p.ManufacturingPlanId = product.ManufacturingPlan.Id;
                p.MPDate=product.ManufacturingPlan.Date;
            }
            return p;
        }
    }
}