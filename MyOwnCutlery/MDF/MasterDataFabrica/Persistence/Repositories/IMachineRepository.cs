using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System;
using MasterDataFabrica.Persistence;
using System.Web.Http;
using GenericSharedApi.Models;

namespace MasterDataFabrica.Persistence
{
    public interface IMachineRepository
    {

        bool Insert(Machine obj);
        bool Update(Machine obj);
         bool Delete(int id);
        Machine Select(int id);
        IList<Machine> SelectAll();
        Machine SelectByName(String name);

        IQueryable<MachineDTO> GetAllMachineOfAType(String type);
    
    }
}