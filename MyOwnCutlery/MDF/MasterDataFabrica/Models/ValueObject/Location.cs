using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using GenericSharedApi.Models;

namespace MasterDataFabrica.Models
{ 
    public class Location : ValueObject
    {
        public Location(string factory, string floor, string section)
        {
            this.factory = factory;
            this.floor = floor;
            this.section = section;
        }

        public string factory { get; set; }
        public string floor { get; set; }
        public string section { get; set; }

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