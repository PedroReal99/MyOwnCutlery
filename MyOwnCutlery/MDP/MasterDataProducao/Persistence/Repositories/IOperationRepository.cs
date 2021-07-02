using System;
using System.Collections.Generic;
using GenericSharedApi.Models;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MasterDataProducao.Persistence
{
    public interface IOperationRepository
    {

        bool Insert(OperationsMDP obj);
        bool Update(OperationsMDP obj);
        bool Delete(int id);
        IList<OperationsMDP> SelectAll();
        OperationsMDP Select(int id);

    }
}