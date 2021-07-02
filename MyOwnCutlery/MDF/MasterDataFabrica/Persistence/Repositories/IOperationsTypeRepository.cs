using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;

namespace MasterDataFabrica.Persistence
{
    public interface IOperationsTypeRepository
    {

        bool Insert(OperationsType obj);
        bool Update(OperationsType obj);
        bool Delete(int id);
        IList<OperationsType> SelectAll();
        OperationsType Select(int id);

    }
}