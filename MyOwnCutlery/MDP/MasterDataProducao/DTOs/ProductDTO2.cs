using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataProducao.Models;
using GenericSharedApi.Models;

namespace MasterDataProducao.DTOs
{
    public class ProductsDTO2
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int ManufacturingPlanId { get; set; }
        public DateTime MPDate { get; set; }
        public int sumTime{ get; set;}
        public ProductsDTO2()
        {
        }
        public ProductsDTO2(string Name, int ManufacturingPlanId, DateTime MPDate)
        {
            this.Name = Name;
            this.ManufacturingPlanId = ManufacturingPlanId;
            this.MPDate = MPDate;
        }
        public ProductsDTO2(int ProductId, string Name, int ManufacturingPlanId, DateTime MPDate,int sumTime)
        {
            this.ProductId = ProductId;
            this.Name = Name;
            this.ManufacturingPlanId = ManufacturingPlanId;
            this.MPDate = MPDate;
            this.sumTime=sumTime;
        }
        public static ProductsDTO2 generateDto(Product product,int sum)
        {
            ProductsDTO2 p = new ProductsDTO2();
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
            p.sumTime=sum;
            return p;
        }
    }
}