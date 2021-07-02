using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericSharedApi.Models;
using MasterDataProducao.Models;
using Microsoft.EntityFrameworkCore;

namespace MasterDataProducao.Persistence
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        private readonly MasterContext Context;
        DbSet<T> dbSet;

        public BaseRepository(MasterContext context)
        {
            this.Context = context;
            this.dbSet = this.Context.Set<T>();
        }

        public virtual void Insert(T obj)
        {
            dbSet.AddAsync(obj);
        }

        public virtual void Update(T obj)
        {
            dbSet.Attach(obj);
            this.Context.Entry(obj).State=EntityState.Modified;
        }

        public virtual void Delete(int id)
        {
            T entity = dbSet.Find(id);
            if (this.Context.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
        }

        public virtual IList<T> SelectAll()
        {
            return dbSet.ToList();
        }

        public T Select(int id)
        {
            return dbSet.Find(id);
        }

    }
}
