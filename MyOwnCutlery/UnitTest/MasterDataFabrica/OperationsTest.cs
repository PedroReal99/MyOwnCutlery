using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.OperationsTest
{
    public class OperationsTest
    {
        [Fact]
        public void EnsureOperationsGetSetAndDTOWorks()
        {
            List<Operations> ops = new List<Operations>();
            Operations op1 = new Operations { designation = new Designation { designation = "Op1" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            Operations op2 = new Operations { designation = new Designation { designation = "Op1" }, ToolDetails = new Details { Det = "teste2" }, Dur = new Duration { dur = 232 } };
            Operations op3 = new Operations { designation = new Designation { designation = "Op3" }, ToolDetails = new Details { Det = "teste233" }, Dur = new Duration { dur = 2323333 } };


            OperationsDTO operationsDTO = new OperationsDTO(
   
                               1,
                               op1.ToolDetails.Det,
                               op1.designation.designation, 
                               op1.Dur.dur,
                               2
            );


            Assert.Equal(op1.designation.designation, operationsDTO.Name);
            Assert.Equal(op1.Dur.dur , operationsDTO.Duration);
            Assert.Equal(op1.designation.designation , op1.designation.designation);

        }
    }
}