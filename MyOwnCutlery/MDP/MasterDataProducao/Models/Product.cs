using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericSharedApi.Models;

namespace MasterDataProducao.Models
{
    public class Product : BaseEntity
    {
        
        public Name Name { get; set; }
        public ManufacturingPlan ManufacturingPlan { get; set; }
        public Product()
        {
        }
        public Product(Name name){
            this.Name=name;
        }
        public Product(Name name,ManufacturingPlan ManufacturingPlan){
            this.Name=name;
            this.ManufacturingPlan=ManufacturingPlan;
        }
    }
}
