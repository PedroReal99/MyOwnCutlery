<template>
  <div class="operations">
    <h2 id="ops">Operations by Machine Type</h2>
    <div class="search">
      <input v-model="id" type="text" name="id" />
      <button id="searchBt" @click="getOperations(id)">Search</button>
    </div>
    <div class="limiter">
      <div class="wrap-table100">
        <div class="table100 ver5 m-b-110">
          <table>
            <thead>
              <tr>
                <th id="name" class="cell100 column1">Name</th>
                <th id="opsTID" class="cell100 column1">Operations Type</th>
                <th id="dur" class="cell100 column1">Duration</th>
                <th id="td" class="cell100 column1">Tool description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in operationsList" v-bind:key="p">
                <td class="cell100 column2">{{p.name}}</td>
                <td class="cell100 column1">{{p.operationsTypeDesignation}}</td>
                <td class="cell100 column3">{{p.duration}}</td>
                <td class="cell100 column1">{{p.toolDesc}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 id="cOps">Create Operations</h3>
        <div>
          <h4 id="pName">Name</h4><input@click="getAllOperationsType()" v-model="na" type="text" name="name" />
          <h4 id="pOps">Select Operations Type</h4>
          <b v-for="p in operationsTypeList" v-bind:key="p.id">
            <input type="radio" name="type" :value="p.id" v-model="id" />
            <label for="p.designation">{{p.designation}}</label>
          </b>
          <h4 id="pDur">Duration</h4>
          <input v-model="du" type="number" name="du" />
          <h4 id="pDes">Tool description</h4>
          <input v-model="to" type="text" name="to" />
          <div>
            <button id="createBt" @click="postOperations(na,du,to,id)">Create</button>
          </div>
        </div>
      </div>

      <div>
        <h3>Change Operations</h3>
        <div>
          <button @click="getAllMachineTypes()">Search machine Types</button>
          <h4>Select machineType</h4>
          <b v-for="z in machineTypeList" v-bind:key="z.id">
            <input type="radio" name="machTypes" :value="z.idMachineType" v-model="mtid" />
            {{z.designation}}
            <br />
          </b>
          <button @click="getAllOperations()">Search Operations</button>
          <h4>Select operations</h4>
          <b v-for="z in operationsList2" v-bind:key="z.id">
            <input type="checkbox" name="opss" :value="z.operationsDTOId" v-model="opid" />
            {{z.name}}
            <br />
          </b>
          <br />
          <br />
          <div>
            <button id="createBt" @click="putOperations(mtid)">Change</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "operations",
  duration: 0,
  components: {},
  data() {
    return {
      ids: null,
      operationsList: [],
      operationsTypeList: [],
      machineTypeList: [],
      operationsList2: []
    };
  },
  methods: {
    getOperations(id) {
      this.operationsList.pop;
      if (id == 0 || id == null) {
        Vue.axios
          .get("https://fabrica.azurewebsites.net/api/operations/")
          .then(Response => {
            this.operationsList = Response.data;
            this.operationsList.forEach(operat => {
              Vue.axios
                .get(
                  "https://fabrica.azurewebsites.net/api/operationsType/" +
                    operat.operationsTypeId +
                    "/OperationTypeId"
                )
                .then(Response => {
                  this.$set(
                    operat,
                    "operationsTypeDesignation",
                    Response.data.designation
                  );
                });
            });
          });
      } else {
        Vue.axios
          .get("https://fabrica.azurewebsites.net/api/operations/" + id)
          .then(Response => {
            this.operationsList = Response.data;
            this.operationsList.forEach(operat => {
              Vue.axios
                .get(
                  "https://fabrica.azurewebsites.net/api/operationsType/" +
                    operat.operationsTypeId +
                    "/OperationTypeId"
                )
                .then(Response => {
                  this.$set(
                    operat,
                    "operationsTypeDesignation",
                    Response.data.designation
                  );
                });
            });
          });
      }
    },
    getOperationsType(id) {
      Vue.axios
        .get("https://fabrica.azurewebsites.net/api/operationsType/" + id)
        .then(Response => {
          this.operationsTypeDes = Response.data.designation;
        });
    },
    getAllOperationsType() {
      Vue.axios
        .get("https://fabrica.azurewebsites.net/api/operationsType")
        .then(Response => {
          this.operationsTypeList = Response.data;
        });
    },
    getAllOperations() {
      Vue.axios
        .get("https://fabrica.azurewebsites.net/api/operations")
        .then(Response => {
          this.operationsList2 = Response.data;
        });
    },
    getAllMachineTypes() {
      Vue.axios
        .get("https://fabrica.azurewebsites.net/api/machinetype")
        .then(Response => {
          this.machineTypeList = Response.data;
        });
    },
    postOperations(na, du, to, id) {
      Vue.axios.post("https://fabrica.azurewebsites.net/api/operations", {
        Name: na,
        Duration: du,
        ToolDesc: to,
        OperationsTypeId: id
      });
       Vue.axios.post("https://producao.azurewebsites.net/api/operationsMDP", {
        Name: na,
        Duration: du,
        ToolDesc: to,
        operationsTypeId: id
      });
    },
    putOperations(mtid) {
      var i;
      var c = [];
      var temp = document.getElementsByName("opss");
      for (i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
          c.push(temp[i]._value);
        }
      }
      Vue.axios.put(
        "https://fabrica.azurewebsites.net/api/operations/" + mtid,
        { operations: c }
      );
    }
  }
};
</script>

<style scoped>
.column1 {
  width: 33%;
  padding-left: 40px;
}

.column2 {
  width: 13%;
}

.column3 {
  width: 22%;
}

.column4 {
  width: 19%;
}

.column5 {
  width: 13%;
}
</style>