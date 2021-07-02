using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.DetailsTest
{
    public class DetailsTest
    {
        [Fact]
        public void EnsureDetailsGetSetWorks()
        {
            //Arrange
            Details d = new Details("Detalhes");

    
            //Assert
            Assert.Equal("Detalhes", d.Det);
        }

    }
}