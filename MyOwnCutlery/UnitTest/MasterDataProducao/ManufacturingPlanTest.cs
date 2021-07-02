using System;
using Xunit;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System.Collections.Generic;

namespace UnitTests.ManufacturingPlanTest
{
    public class ManufacturingPlanTest
    {
        [Fact]
        public void EnsureManufacturingPlanGetSetWorks()
        {
            //Arrange

            OperationsMDP opmdp= new OperationsMDP("Tool","name",30,1);
            DateTime dt = new DateTime();
            List<OperationsMDP> lista = new List<OperationsMDP>();
            lista.Add(opmdp);

            List<OperationsMDP> lista2 = new List<OperationsMDP>();
            lista2.Add(opmdp);

            ManufacturingPlan mp = new ManufacturingPlan(dt,lista);



    
            //Assert
            Assert.Equal("Tool", mp.Operations[0].ToolDesc);
            Assert.Equal("name", mp.Operations[0].Name);
            Assert.Equal(30, mp.Operations[0].Duration);
            Assert.Equal(1, mp.Operations[0].operationTypeId);
            Assert.Equal(lista2, mp.Operations);
        }

    }
}