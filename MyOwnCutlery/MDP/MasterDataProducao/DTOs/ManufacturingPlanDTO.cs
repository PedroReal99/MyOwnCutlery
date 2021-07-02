using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataProducao.Models;

namespace MasterDataProducao.DTOs
{
    public class ManufacturingPlanDTO
    {
        public int ManufacturingPlanId { get; set; }
        public DateTime Date { get; set; }
        public List<int> Operactions { get; set; }

        public ManufacturingPlanDTO()
        {
        }
        public ManufacturingPlanDTO(DateTime date, List<int> operations)
        {
            this.Date = date;
            this.Operactions = operations;
        }

        public ManufacturingPlanDTO(int manufacturingPlanId, DateTime date, List<int> operations)
        {
            ManufacturingPlanId = manufacturingPlanId;
            Date = date;
            Operactions = operations;
        }

        public static ManufacturingPlanDTO generateDto(ManufacturingPlan manufacturingPlan)
        {
            List<int> Operactions= new List<int>();
            ManufacturingPlanDTO m= new ManufacturingPlanDTO();
            if(manufacturingPlan.Id!=-1){
                m.ManufacturingPlanId=manufacturingPlan.Id;
            }
            if(manufacturingPlan.Date!=null){
                m.Date=manufacturingPlan.Date;
            }
            if(manufacturingPlan.Operations!=null){
                foreach(OperationsMDP i in manufacturingPlan.Operations){
                    Operactions.Add(i.Id);
                }
                m.Operactions=Operactions;
            }
            return m;
        }
    }
}