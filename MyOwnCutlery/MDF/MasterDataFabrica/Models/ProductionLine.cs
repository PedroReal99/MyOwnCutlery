using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericSharedApi.Models;

namespace MasterDataFabrica.Models
{
    public class ProductionLine : BaseEntity
    {
        public ProductionLine()
        {
        }

        public ProductionLine(List<Machine> machineList){
            this.machineList=machineList;
        }
        public List<Machine> machineList  { get; set; }
    }
}