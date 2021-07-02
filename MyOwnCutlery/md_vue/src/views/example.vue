<template>
<label>Machines:
        <div class="limiter">
            <div class="wrap-table100">
                <div class="table100 ver3 m-b-110">
                    <table data-vertable="ver3">
                        <thead>
                            <tr class="row100 head">
                                <th class="column100 column1" data-column="column1">Machine Name</th>
                                <th class="column100 column2" data-column="column2">Production Line Position</th>
                                <th class="column100 column3" data-column="column3">Machine Type Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let machine of machines" class="row100">
                                <td class="column100 column1" data-column="column1">{{machine.machineName}}</td>
                                <td class="column100 column2" data-column="column2">{{machine.machinePosition}}</td>
                                <td class="column100 column3" data-column="column3">{{machine.machineType.machineTypeDTOName}}</td>
                            </tr>
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
    </label>
    </template>