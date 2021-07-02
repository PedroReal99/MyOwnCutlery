using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;

namespace MasterDataFabrica.DTOs
{
    public class OperationsTypeDTO
    {
        public OperationsTypeDTO() { }
        public OperationsTypeDTO(string designation)
        {
            this.designation = designation;
        }
         public OperationsTypeDTO(int id,string designation)
        {
            this.id=id;
            this.designation = designation;
        }

        public string designation { get; set; }
        public int id { get; set; }
         public static OperationsTypeDTO generateDto(OperationsType operationsType)
        {
            OperationsTypeDTO p = new OperationsTypeDTO(operationsType.Id, operationsType.designation.designation);
            return p;
        }
}
}

