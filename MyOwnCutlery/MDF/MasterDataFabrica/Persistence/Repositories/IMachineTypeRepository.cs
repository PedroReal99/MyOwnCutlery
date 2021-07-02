using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;

namespace MasterDataFabrica.Persistence
{
    public interface IMachineTypeRepository
    {

        bool Insert(MachineType obj);
        bool Update(MachineType obj);
        bool Delete(int id);
        IList<MachineType> SelectAll();
        MachineType Select(int id);
        MachineType SelectByName(String name);
    }
}