using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MasterDataProducao.Persistence
{
    public interface IProductRepository
    {

        bool Insert(Product obj);
        bool Update(Product obj);
        bool Delete(int id);
        IList<Product> SelectAll();
        Product Select(int id);
        Product SelectByName(String Id);
    }
}