using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericSharedApi.Models;

namespace MasterDataProducao.Models
{

    public class Name : ValueObject
    {
        public string name { get; private set; }
        private Name()
        {
        }
        public Name(String name)
        {
            this.name = name;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return name;
        }

        protected override string toString()
        {
            return "Name " + name;
        }
    }
}