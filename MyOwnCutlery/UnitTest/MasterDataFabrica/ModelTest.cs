using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.ModelTest
{
    public class ModelTest
    {
        [Fact]
        public void EnsureModelGetSetWorks()
        {
            //Arrange
            Model d = new Model("Modelo");

    
            //Assert
            Assert.Equal("Modelo", d.model);
        }

    }
}