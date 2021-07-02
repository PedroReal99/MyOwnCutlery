using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.ToolsTest
{
    public class ToolsTest
    {
        [Fact]
        public void EnsureProductionLineGetSetAndDTOWorks()
        {

           
            Tools t4 = new Tools();
            Tools t5 = new Tools();

            Assert.Equal(t4, t5);
         

        }
    }
}