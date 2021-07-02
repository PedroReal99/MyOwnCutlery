using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;

namespace MasterDataFabrica.Persistence
{
    public interface IOperationsRepository
    {

        bool Insert(Operations obj);
        bool Update(Operations obj);
        bool Delete(int id);
        IList<Operations> SelectAll();
        Operations Select(int id);

    }
}