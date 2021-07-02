using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.MachineTypeTest
{
    public class MachineTypeTest
    {
        [Fact]
        public void EnsureMachineTypeGetSetWorks()
        {
            //Arrange
            List<Operations> ops = new List<Operations>();
           Operations op1 = new Operations { designation = new Designation { designation = "Op1" }, ToolDetails = new Details { Det = "teste" }, Dur = new Duration { dur = 23 } };
            
            Operations op2 = new Operations { designation = new Designation { designation = "Op2" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            Operations op3 = new Operations { designation = new Designation { designation = "Op3" }, ToolDetails = new Details { Det = "teste233" }, Dur = new Duration { dur = 2323333 } };
            ops.Add(op1);
            ops.Add(op2);
            ops.Add(op3);
            MachineType mt = new MachineType(new Designation("Teste"), ops);
            mt.designation.designation = "TesteSet";

            List<Operations> expected = new List<Operations>(ops);

            //Act
            List<Operations> result = mt.operations;
            Operations op4 = new Operations { designation = new Designation { designation = "Op4" }, ToolDetails = new Details { Det = "teste4" }, Dur = new Duration { dur = 2323333 } };


            //Assert
            Assert.Equal("TesteSet", mt.designation.designation);
            Assert.Equal(expected, result);

            expected.Add(op4);
            mt.addOperation(op4);
            List<Operations> result1 = mt.operations;
            Assert.Equal(expected, result1);
            Assert.Equal("Op1", mt.operations[0].designation.designation);
            // Assert.Equal("teste", mt.operations[0].ToolDetails.Details.Det);
            Assert.Equal(23, mt.operations[0].Dur.dur);
        }

        [Fact]
        public void EnsureMachineTypeDTOWorks()
        {
            //Arrange
            List<Operations> ops1 = new List<Operations>();
            Operations op1 = new Operations { designation = new Designation { designation = "Op1" }, ToolDetails = new Details { Det = "teste" }, Dur = new Duration { dur = 23 } };
            
            Operations op2 = new Operations { designation = new Designation { designation = "Op2" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            Operations op3 = new Operations { designation = new Designation { designation = "Op3" }, ToolDetails = new Details { Det = "teste233" }, Dur = new Duration { dur = 2323333 } };
            ops1.Add(op1);
            ops1.Add(op2);
            ops1.Add(op3);
            List<int> ops = new List<int>();
            ops.Add(op1.Id);
            ops.Add(op2.Id);
            ops.Add(op3.Id);

            MachineType mt = new MachineType(new Designation("Teste"), ops1);
           

            MachineTypeDTO machineTypeDTO = new MachineTypeDTO(mt.designation.designation, ops);


            //Assert
            Assert.Equal(machineTypeDTO.designation, mt.designation.designation);
            Assert.Equal(ops1, mt.operations);


        }


    }
}