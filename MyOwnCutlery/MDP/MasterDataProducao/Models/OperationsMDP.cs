using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericSharedApi.Models;

namespace MasterDataProducao.Models
{
    public class OperationsMDP : BaseEntity
    {
        public string ToolDesc { get; set; }
        public string Name {get;set;}
        public int Duration {get;set;}
        public int operationTypeId {get;set;}
        public OperationsMDP()
        {

        }
        public OperationsMDP(string ToolDesc,string Name,int Duration,int operationTypeId){
            this.ToolDesc=ToolDesc;
            this.Name=Name;
            this.Duration=Duration;
            this.operationTypeId=operationTypeId;
        }
    }

}