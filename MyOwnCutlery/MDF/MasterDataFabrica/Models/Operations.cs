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
    public class Operations : BaseEntity
    {
        public Operations()
        {
        }
        public Operations(Designation name)
        {
            designation=name;
        }


        public Operations(Designation name, Details tool, Duration dur, OperationsType operationsType)
        {
            designation = name;
            ToolDetails = tool;
            Dur = dur;
            this.operationsType=operationsType;
        }

        public Designation designation { get; set; }

        public OperationsType operationsType {get;set;}
        public Details ToolDetails { get; set; }

        public Duration Dur {get;set;}


        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}
