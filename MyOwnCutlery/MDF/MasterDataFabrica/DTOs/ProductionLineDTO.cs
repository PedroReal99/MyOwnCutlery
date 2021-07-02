using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;

namespace MasterDataFabrica.DTOs
{
    public class ProductionLineDTO
    {
        public int productionLineId { get; set; }
        public List<int> machineList { get; set; }

        public ProductionLineDTO()
        {

        }
        public ProductionLineDTO(int productionLineId, List<int> machineList)
        {
            this.productionLineId = productionLineId;
            this.machineList = machineList;
        }

        public static ProductionLineDTO generateDto(ProductionLine productionLine)
        {
            List<int> list=new List<int>();
            foreach (Machine item in productionLine.machineList)
            {
             list.Add(item.Id);   
            }
            ProductionLineDTO p = new ProductionLineDTO(productionLine.Id, list);
            return p;
        }
    }
}
