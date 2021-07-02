using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.DurationTest
{
    public class DurationTest
    {
        [Fact]
        public void EnsureDurationGetSetWorks()
        {
            //Arrange
            Duration d = new Duration(15);

    
            //Assert
            Assert.Equal(15, d.dur);
        }

    }
}