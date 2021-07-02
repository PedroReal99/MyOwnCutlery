using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.PositionTest
{
    public class PositionTest
    {
        [Fact]
        public void EnsurePositionGetSetWorks()
        {
            //Arrange
            Position d = new Position(3456);

    
            //Assert
            Assert.Equal(3456, d.position);
        }

    }
}