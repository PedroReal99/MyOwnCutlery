using System;
using Xunit;
using MasterDataProducao.Models;
using MasterDataProducao.DTOs;
using System.Collections.Generic;

namespace UnitTests.ProductsTest
{
    public class ProductTest
    {
        [Fact]
        public void EnsureProductGetSetWorks()
        {
            //Arrange

            Name na = new Name("Teste1");

            OperationsMDP opmdp = new OperationsMDP("Tool", "name", 30, 1);
            DateTime dt = new DateTime();
            List<OperationsMDP> lista = new List<OperationsMDP>();
            lista.Add(opmdp);

            List<OperationsMDP> lista2 = new List<OperationsMDP>();
            lista2.Add(opmdp);

            ManufacturingPlan mp = new ManufacturingPlan(dt, lista);
            ManufacturingPlan mp2 = new ManufacturingPlan(dt, lista);
            var mockito = new Mock<Product>();
            
            Product p = new Product(na, mp);



            //Assert
            Assert.Equal("Teste1", p.Name.name);
            Assert.Equal("Tool", p.ManufacturingPlan.Operations[0].ToolDesc);
            Assert.Equal("name", p.ManufacturingPlan.Operations[0].Name);
            Assert.Equal(30, p.ManufacturingPlan.Operations[0].Duration);
            Assert.Equal(1, p.ManufacturingPlan.Operations[0].operationTypeId);
            Assert.Equal(lista2, p.ManufacturingPlan.Operations);
            //Assert.Equal(mp2, p.ManufacturingPlan);
        }

    }

    internal class Mock<T>
    {
        public Mock()
        {
        }
    }
}