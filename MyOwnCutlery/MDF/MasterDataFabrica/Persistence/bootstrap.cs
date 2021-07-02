using System;
using MasterDataFabrica.Models;
using System.Linq;
using GenericSharedApi.Models;
using MasterDataFabrica.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MasterDataFabrica.Persistence
{
    public class bootstrap
    {
        private readonly MasterContext _context;

        public bootstrap(MasterContext context)
        {
            _context = context;

            if (_context.OperationsType.Count() == 0)
            {
                OperationsType opType1 = new OperationsType { designation = new Designation { designation = "operationsType1" } };
                OperationsType opType2 = new OperationsType { designation = new Designation { designation = "operationsType2" } };
                _context.OperationsType.Add(opType1);
                _context.OperationsType.Add(opType2);
                _context.SaveChanges();
            }

            if (_context.Operations.Count() == 0)
            {
                Operations op1 = new Operations { designation = new Designation { designation = "operations1" }, ToolDetails = new Details { Det = "details1" }, Dur = new Duration { dur = 1111 }, operationsType = _context.OperationsType.Find(1) };
                Operations op2 = new Operations { designation = new Designation { designation = "operations2" }, ToolDetails = new Details { Det = "details1" }, Dur = new Duration { dur = 2222 }, operationsType = _context.OperationsType.Find(2) };
                _context.Operations.Add(op1);
                _context.Operations.Add(op2);
                _context.SaveChanges();
            }

            if (_context.MachineType.Count() == 0)
            {
                List<Operations> lista1 = new List<Operations>();
                List<Operations> lista2 = new List<Operations>();
                lista1.Add(_context.Operations.Find(1));
                lista2.Add(_context.Operations.Find(2));
                _context.MachineType.Add(new MachineType(new Designation("machineType1"), lista1));
                _context.MachineType.Add(new MachineType(new Designation("machineType2"), lista2));
                _context.SaveChanges();
            }

            if (_context.Machine.Count() == 0)
            {
                _context.Machine.Add(new Machine(new Designation("machine1"), _context.MachineType.Find(1), new Model("model1"), new Location("factory1", "floor1", "section1"), new Position(1), new Capacity(10)));
                _context.Machine.Add(new Machine(new Designation("machine2"), _context.MachineType.Find(2), new Model("model2"), new Location("factory2", "floor2", "section2"), new Position(2), new Capacity(20)));
                _context.SaveChanges();
            }

            if (_context.ProductionLine.Count() == 0)
            {
                List<Machine> lista1 = new List<Machine>();
                List<Machine> lista2 = new List<Machine>();
                lista1.Add(_context.Machine.Find(1));
                lista2.Add(_context.Machine.Find(2));
                _context.ProductionLine.Add(new ProductionLine(lista1));
                _context.ProductionLine.Add(new ProductionLine(lista2));
                _context.SaveChanges();
            }
        }
    }
}