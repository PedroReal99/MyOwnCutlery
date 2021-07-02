using System;
using Xunit;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System.Collections.Generic;

namespace UnitTests.NameTest
{
    public class NameTest
    {
        [Fact]
        public void EnsureNameGetSetWorks()
        {
            //Arrange

            Name na = new Name("Teste1");

           

    
            //Assert
            Assert.Equal("Teste1", na.name);
        }

    }
}