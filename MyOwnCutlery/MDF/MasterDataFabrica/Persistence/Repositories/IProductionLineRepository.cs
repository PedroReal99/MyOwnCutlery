using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MasterDataFabrica.Persistence
{
    public interface IProductionLineRepository
    {

        bool Insert(ProductionLine obj);
        bool Update(ProductionLine obj);
        bool Delete(int id);
        IList<ProductionLine> SelectAll();
        ProductionLine Select(int id);

    }
}