using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GenericSharedApi.Models
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }

        public override bool Equals(object obj)
        {
            if(obj==null)
                return false;
            if(obj==this)
                return true;
            if(this.GetType()!=obj.GetType())
                return false;
            
            BaseEntity b = (BaseEntity)obj;

            return Id == b.Id;
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}


