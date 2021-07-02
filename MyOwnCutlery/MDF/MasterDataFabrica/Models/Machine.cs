using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GenericSharedApi.Models;

namespace MasterDataFabrica.Models
{
    public class Machine : BaseEntity
    {
        public Machine()
        {
        }

        public Machine(Designation designation,MachineType machineType,Model model,Location location, Position position, Capacity capacity){
            this.designation=designation;
            this.machineType=machineType;
            this.model=model;
            this.location=location;
            this.position=position;
            this.capacity=capacity;
        }
        
        public Designation designation { get; set; }
        public MachineType machineType { get; set; }
        public Model model { get; set; }
        public Location location { get; set; }
        public Position  position { get; set; }
        public Capacity capacity { get; set; }
    }
    
}