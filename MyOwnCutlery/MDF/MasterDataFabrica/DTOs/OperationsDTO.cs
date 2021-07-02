using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;

namespace MasterDataFabrica.DTOs
{
    public class OperationsDTO
    {
        public int OperationsDTOId{ get; set; }

        public string ToolDesc { get; set; }

        public string Name {get;set;}

        public int Duration {get;set;}
         public int OperationsTypeId{ get; set; }

        public OperationsDTO()
        {
            
        }

        public OperationsDTO(int id,string ToolDesc,string Name,int Duration, int operationsTypeId)
        {
            this.Duration=Duration;
            this.Name=Name;
            this.ToolDesc=ToolDesc;
            this.OperationsDTOId=id;
            this.OperationsTypeId=operationsTypeId;
        }

        public static OperationsDTO generateDto(Operations operations)
        {
            OperationsDTO p = new OperationsDTO(operations.Id, operations.ToolDetails.Det,operations.designation.designation,operations.Dur.dur,operations.operationsType.Id);
            return p;
        }
    }

}
