using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;

namespace MasterDataProducao.Persistence
{
    public interface IManufacturingPlanRepository
    {

        bool Insert(ManufacturingPlan obj);
        bool Update(ManufacturingPlan obj);
        bool Delete(int id);
        IList<ManufacturingPlan> SelectAll();
        ManufacturingPlan Select(int id);

    }
}