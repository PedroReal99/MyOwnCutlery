using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;

namespace MasterDataFabrica.DTOs
{
    public class MachineTypeDTO
    {
        public MachineTypeDTO() { }
        public MachineTypeDTO(string designation, List<int> operations)
        {
            this.designation = designation;
            this.operations = operations;
        }
        public MachineTypeDTO(int idMachineType, string designation, List<int> operations)
        {
            this.idMachineType=idMachineType;
            this.designation = designation;
            this.operations = operations;
        }

        public int idMachineType { get; set; }

        public string designation { get; set; }

        public List<int> operations { get; set; }

        public static MachineTypeDTO generateDto(MachineType machineType)
        {
            List<int> list=new List<int>();
            foreach (Operations item in machineType.operations)
            {
                list.Add(item.Id);
            }
            MachineTypeDTO p = new MachineTypeDTO(machineType.Id,machineType.designation.designation, list);
            return p;
        }
    }
}
