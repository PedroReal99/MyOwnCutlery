<template>
  <div class="machine">
    <h2>Machine</h2>
    <div class="search">
      <input v-model="id" type="text" name="id" />
      <button id="bt" @click="getMachines(id)">Search</button>
    </div>
    <div class="search">
      <input v-model="id" type="text" name="id" />
      <button id="bt" @click="getMachineOfAType(id)">Search by machine Type</button>
    </div>
    <div class="limiter">
    <div class = "wrap-table100">
    <div class="table100 ver5 m-b-110">
        <table data-vertable="ver5">
          <thead>
            <tr class="row100 head">
              <th id="des" class="cell100 column1">Designation</th>
              <th id="mtd" class="cell100 column2">Machine Type Designation</th>
              <th id="mod" class="cell100 column3">Model</th>
              <th id="fac" class="cell100 column4">Factory</th>
              <th id="flo" class="cell100 column4">Floor</th>
              <th id="sec" class="cell100 column4">Section</th>
              <th id="pos" class="cell100 column4">Position</th>
              <th id="cap" class="cell100 column4">Capacity</th>
            </tr>
          </thead>
            <tbody>
                <tr v-for="p in machineList" v-bind:key="p.machineId" class="row100 body">
                  <td class="cell100 column1">{{p.designation}}</td>
                  <td class="cell100 column2">{{p.machineTypeDesignation}}</td>
                  <td class="cell100 column2">{{p.model}}</td>
                  <td class="cell100 column3">{{p.location_factory}}</td>
                  <td class="cell100 column4">{{p.location_floor}}</td>
                  <td class="cell100 column5">{{p.location_section}}</td>
                  <td class="cell100 column5">{{p.position}}</td>
                  <td class="cell100 column5">{{p.capacity}}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
    <div>
      <h3>Create machine</h3>
      <div>
        <h4>Designation</h4>
        <input @click="getMachineType(mId)" v-model="designation" type="text" name="designation" />
        <h4 id="pMac">Machine Type</h4>
        <b v-for="p in machineTypeList" v-bind:key="p">
          <input type="radio" name="machinetype" :value="p.idMachineType" v-model="idMachineType" />
          {{p.designation}}
          <br />
        </b>
        <h4 id="pMod">Model</h4>
        <input v-model="model" type="text" name="model" />
        <h4 id="pLC">Location Factory</h4>
        <input v-model="location_factory" type="text" name="location_factory" />
        <h4 id="pLF">Location Floor</h4>
        <input v-model="location_floor" type="text" name="location_floor" />
        <h4 id="pLS">Location Section</h4>
        <input v-model="location_section" type="text" name="location_section" />
        <h4 id="pPos">Position</h4>
        <input v-model="position" type="text" name="position" />
        <h4 id="pCap">Capacity</h4>
        <input v-model="capacity" type="text" name="capacity" />
      </div>
      <div>
        <button id="pCreate" @click="postMachine()">Create</button>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div>
      <h2>Change machine type of machine</h2>
      <div>
        <h3>Machines</h3>
        <b v-for="p in machineList" v-bind:key="p">
          <input type="radio" name="machinec" :value="p.designation" v-model="designation" />
          {{p.designation}}
          <br />
        </b>
        <h3 id="pMac">Machine Type</h3>
        <b v-for="p in machineTypeList" v-bind:key="p">
          <input type="radio" name="machinetypec" :value="p.designation" v-model="designation" />
          {{p.designation}}
          <br />
        </b>
      </div>
      <div>
        <button id="pChange" @click="putMachine()">Change</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "machine",
  components: {},
  data() {
    return {
      ids: null,
      machineList: [],
      machineTypeList: []
    };
  },
  watch: {
    machineList(newValue, oldValue) {
      if (newValue !== [] && newValue !== oldValue) {
        this.getMachineType();
      }
    }
  },
  methods: {
    getMachines(id) {
      this.machineList.pop();
      if (id <= 0 || id == null) {
        Vue.axios
          .get("https://fabrica.azurewebsites.net/api/machine")
          .then(Response => {
            this.machineList = Response.data;
            this.machineList.forEach(machine => {
              Vue.axios
                .get(
                  "https://fabrica.azurewebsites.net/api/machinetype/" +
                    machine.machineTypeId
                )
                .then(Response => {
                  this.$set(
                    machine,
                    "machineTypeDesignation",
                    Response.data.designation
                  );
                });
            });
          });
      } else {
        //this.machineList.pop();
        this.machineList=[];
        Vue.axios
          .get(
            "https://fabrica.azurewebsites.net/api/machine/" +
              id +
              "/machinebyname"
          )
          .then(Response => {
            this.machineList.push( Response.data);
            this.machineList.forEach(machine => {
              Vue.axios
                .get(
                  "https://fabrica.azurewebsites.net/api/machinetype/" +
                    machine.machineTypeId
                )
                .then(Response => {
                  this.$set(
                    machine,
                    "machineTypeDesignation",
                    Response.data.designation
                  );
                });
            });
          });
      }
    },
    getMachineOfAType(id){
                 Vue.axios
          .get(
            "https://fabrica.azurewebsites.net/api/machine/"+id
          )
          .then(Response => {
            this.machineList = Response.data;
            Vue.axios
              .get(
                "https://fabrica.azurewebsites.net/api/machinetype/" +
                  Response.data.machineTypeId
              )
              .then(Response1 => {
                this.$set(
                  this.machineList,
                  "machineTypeDesignation",
                  Response1.data.designation
                );
              });
          });

    }
    ,
    getMachineType() {
      this.machineTypeList.pop;
      return Vue.axios
        .get("https://fabrica.azurewebsites.net/api/machinetype")
        .then(Response => {
          this.machineTypeList = Response.data;
        });
    },
    getMachineTypeById(id) {
      return Vue.axios
        .get("https://fabrica.azurewebsites.net/api/machinetype/" + id)
        .then(Response => {
          Response.data.designation;
        });
    },
    postMachine() {
      var i;
      var b;
      var temp = document.getElementsByName("machinetype");
      for (i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
          b = temp[i]._value;
          break;
        }
      }
      Vue.axios.post("https://fabrica.azurewebsites.net/api/machine", {
        designation: this.designation,
        machineTypeId: b,
        model: this.model,
        location_factory: this.location_factory,
        location_floor: this.location_floor,
        location_section: this.location_section,
        position: this.position,
        capacity: this.capacity
      });
      

    },
    putMachine() {
      var i;
      var b;
      var c;
      var temp = document.getElementsByName("machinec");
      for (i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
          b = temp[i]._value;
          break;
        }
      }
        var temp1 = document.getElementsByName("machinetypec");
      for (i = 0; i < temp1.length; i++) {
        if (temp1[i].checked) {
          c = temp1[i]._value;
          break;
        }
      }
      Vue.axios.put("https://fabrica.azurewebsites.net/api/machine/machine/"+b+"/machineType/"+c, {
      });
    
    }
  }
}
</script>

<style scoped>
.column1 {
  width: 15%;
  padding-left: 40px;
}

.column2 {
  width: 15%;
}

.column3 {
  width: 15%;
}

.column4 {
  width: 15%;
}

.column5 {
  width: 12%;
}
</style>