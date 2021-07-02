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
    public class Model : ValueObject
    {

        public Model()
        {
        }

        public Model(string model)
        {
            this.model = model;
        }

        public String model { get; set; }

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

        protected override IEnumerable<object> GetAtomicValues()
        {
            throw new NotImplementedException();
        }

        protected override string toString()
        {
            throw new NotImplementedException();
        }
    }
}
