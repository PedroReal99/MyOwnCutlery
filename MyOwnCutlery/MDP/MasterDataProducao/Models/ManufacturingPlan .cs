using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericSharedApi.Models;
using MasterDataProducao.Models;
using System;

namespace MasterDataProducao.Models
{
    public class ManufacturingPlan : BaseEntity
    {

        public DateTime Date { get; set; }
        //public int ProductForeignKey{get;set;}
        //public Product Product { get; set; }
        public List<OperationsMDP> Operations { get; set; }
        public ManufacturingPlan(DateTime Date)
        {
            this.Date = Date;
        }
        public ManufacturingPlan()
        {

        }
        public ManufacturingPlan(DateTime date,List <OperationsMDP> operations){
            Date=date;
            Operations=operations;
        }
    }
}
