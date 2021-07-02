using System;
using Xunit;
using MasterDataFabrica.Models;
using MasterDataFabrica.DTOs;
using System.Collections.Generic;

namespace UnitTests.DesignationTest
{
    public class DesignationTest
    {
        [Fact]
        public void EnsureDesignationGetSetWorks()
        {
            //Arrange
            Designation d = new Designation("Test");

    
            //Assert
            Assert.Equal("Test", d.designation);
        }

    }
}