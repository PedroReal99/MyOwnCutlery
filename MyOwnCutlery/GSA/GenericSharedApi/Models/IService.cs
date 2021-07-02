using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericSharedApi.Models;

namespace GenericSharedApi.Models
{
    public interface IService<T> where T : BaseEntity
    {
        //T Post<V>(T obj) where V : AbstractValidator<T>;
        //T Put<V>(T obj) where V : AbstractValidator<T>;
        void Delete(int id);
        T Get(int id);
        IList<T> Get();
    }
}
