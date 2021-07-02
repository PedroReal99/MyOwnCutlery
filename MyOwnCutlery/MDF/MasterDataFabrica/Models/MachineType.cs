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
    public class MachineType : BaseEntity
    {
        public MachineType()
        {

        }
        public MachineType(Designation designation)
        {
            this.designation = designation;

        }
        public MachineType(Designation designation, List<Operations> op)
        {
            this.designation = designation;
            this.operations = op;
        }
       

        public Designation designation { get; set; }

        public List<Operations> operations { get; set; }

        public void addOperation(Operations op)
        {
            this.operations.Add(op);
        }
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
