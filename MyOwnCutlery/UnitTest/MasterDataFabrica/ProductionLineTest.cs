using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.ProductionLineTest
{
    public class ProductionLineTest
    {
        [Fact]
        public void EnsureProductionLineGetSetAndDTOWorks()
        {
            List<Operations> ops = new List<Operations>();
            Operations op1 = new Operations { designation = new Designation { designation = "Op2" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            
            Operations op2 = new Operations { designation = new Designation { designation = "Op2" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            Operations op3 = new Operations { designation = new Designation { designation = "Op3" }, ToolDetails = new Details { Det = "teste233" }, Dur = new Duration { dur = 2323333 } };
            ops.Add(op1);
            ops.Add(op2);
            ops.Add(op3);
            Machine machine1 = new Machine(new Designation("designation1"),new MachineType(new Designation("machineType1"), ops),new Model("model1"),new Location("factory1", "floor1", "section1"),new Position(1),new Capacity(1));

            Machine machine2 = new Machine(new Designation("designation1"),new MachineType(new Designation("machineType1"), ops),new Model("model1"),new Location("factory1", "floor1", "section1"),new Position(1),new Capacity(1));

            List<Machine> machines = new List<Machine>();
            machines.Add(machine1);
            machines.Add(machine2);

            ProductionLine pl = new ProductionLine(machines);


            Assert.Equal(pl.machineList[0].designation, machine1.designation);
            Assert.Equal(pl.machineList[0].model, machine1.model);
            Assert.Equal(pl.machineList[0].location, machine1.location);
            Assert.Equal(pl.machineList[0].position, machine1.position);
            Assert.Equal(pl.machineList[0].capacity, machine1.capacity);

            List<int> list=new List<int>();
            foreach (Machine item in machines)
            {
                list.Add(item.Id);
            }
            ProductionLineDTO pldto = new ProductionLineDTO(1, list);
            Assert.Equal(pl.machineList[0].Id, pldto.machineList[0]);



        }
    }
}