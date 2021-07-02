using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericSharedApi.Models;

namespace MasterDataProducao.Models
{
    public class OperationsDTO
    {
        public int OperationsDTOId{get;set;}
        public string ToolDesc { get; set; }
        public string Name {get;set;}
        public int Duration {get;set;}
        public int OperationsTypeId {get;set;}
        public OperationsDTO()
        {

        }
        public OperationsDTO(int id,string ToolDesc,string Name,int Duration,int operationTypeId)
        {
            this.OperationsDTOId=id;
            this.ToolDesc=ToolDesc;
            this.Name=Name;
            this.Duration=Duration;
            this.OperationsTypeId=operationTypeId;
        }


        public static OperationsDTO generateDto(OperationsMDP op)
        {
            return  new OperationsDTO(op.Id, op.ToolDesc, op.ToolDesc,op.Duration,op.operationTypeId);
        }
    }
}
