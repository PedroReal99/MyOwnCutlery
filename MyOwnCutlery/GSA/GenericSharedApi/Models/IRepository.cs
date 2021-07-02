using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericSharedApi.Models;

namespace GenericSharedApi.Models
{
    public interface IRepository<T> where T: class
    {
        void Insert(T o);
        void Update(T o);
        void Delete(int id);
        T Select(int id);
        IList<T> SelectAll();
    }
}