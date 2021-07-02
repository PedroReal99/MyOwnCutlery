using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.CapacityTest
{
    public class CapacityTest
    {
        [Fact]
        public void EnsureCapacityGetSetWorks()
        {
            //Arrange
            Capacity c = new Capacity(45);

    
            //Assert
            Assert.Equal(45, c.capacity);
        }

    }
}