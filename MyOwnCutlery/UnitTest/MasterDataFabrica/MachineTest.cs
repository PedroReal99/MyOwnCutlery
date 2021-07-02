using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.MachineTest
{
    public class MachineTest
    {
        [Fact]
        public void EnsureMachinGetSetAndDTOWorks()
        {
            List<Operations> ops = new List<Operations>();
            Operations op1 = new Operations { designation = new Designation { designation = "Op2" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            
            Operations op2 = new Operations { designation = new Designation { designation = "Op2" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            Operations op3 = new Operations { designation = new Designation { designation = "Op3" }, ToolDetails = new Details { Det = "teste233" }, Dur = new Duration { dur = 2323333 } };
            ops.Add(op1);
            ops.Add(op2);
            ops.Add(op3);
            Machine machine = new Machine(
                new Designation("designation1"),
                new MachineType(new Designation("machineType1"), ops),
                new Model("model1"),
                new Location("factory1", "floor1", "section1"),
                new Position(1),
                new Capacity(1));


            

            MachineDTO machineDTO = new MachineDTO(
                              machine.Id,
                             machine.designation.designation,
                               1,
                              machine.model.model,
                             machine.location.factory,
                              machine.location.section,
                              machine.location.floor,
                               machine.position.position,
                              machine.capacity.capacity
                              );

            Assert.Equal(machine.designation.designation, machineDTO.designation);
            Assert.Equal(machine.model.model, machineDTO.model);
            Assert.Equal(machine.location.factory, machineDTO.location_factory);
            Assert.Equal(machine.location.floor, machineDTO.location_floor);
            Assert.Equal(machine.location.section, machineDTO.location_section);

        }
    }
}