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

    public class DateV : ValueObject
    {
        public DateTime date { get; private set; }
        private DateV()
        {
        }

        public DateV(DateTime date)
        {
            this.date = date;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return date;
        }

        protected override string toString()
        {
            return "Date " + date.ToString();
        }
    }
}