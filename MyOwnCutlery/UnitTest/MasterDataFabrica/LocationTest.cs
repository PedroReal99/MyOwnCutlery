using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.LocationTest
{
    public class LocationTest
    {
        [Fact]
        public void EnsureLocationGetSetWorks()
        {
            //Arrange
            Location d = new Location("Factory","Floor","Section");

    
            //Assert
            Assert.Equal("Factory", d.factory);
            Assert.Equal("Floor", d.floor);
            Assert.Equal("Section", d.section);
        }

    }
}