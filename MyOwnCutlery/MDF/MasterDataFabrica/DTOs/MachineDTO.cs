using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataFabrica.Models;

namespace MasterDataFabrica.DTOs
{
    public class MachineDTO
    {
        public MachineDTO() { }
        public MachineDTO(String designation, String model, String location_factory, String location_section, String location_floor, int position, int capacity)
        {
            this.designation = designation;
            this.model = model;
            this.location_factory = location_factory;
            this.location_section = location_section;
            this.location_floor = location_floor;
            this.position = position;
            this.capacity = capacity;
        }
        public MachineDTO(int machineId, String designation, int machineTypeID, String model, String location_factory, String location_section, String location_floor, int position, int capacity)
        {
            this.machineId = machineId;
            this.designation = designation;
            this.machineTypeId = machineTypeID;
            this.model = model;
            this.location_factory = location_factory;
            this.location_section = location_section;
            this.location_floor = location_floor;
            this.position = position;
            this.capacity = capacity;
        }

        public int machineId { get; set; }
        public String designation { get; set; }
        public int machineTypeId { get; set; }
        public String model { get; set; }
        public String location_factory { get; set; }
        public String location_section { get; set; }
        public String location_floor { get; set; }
        public int position { get; set; }
        public int capacity { get; set; }

        public static MachineDTO generateDto(Machine machine)
        {
            MachineDTO m = new MachineDTO(machine.Id, machine.designation.designation, machine.machineType.Id, machine.model.model, machine.location.factory, machine.location.section, machine.location.floor, machine.position.position, machine.capacity.capacity);
            return m;
        }
    }
}
