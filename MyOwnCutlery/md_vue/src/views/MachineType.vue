<template>
  <div class="machineType">
    <div clas="search">
      <h3>Machine Type</h3>
      <input v-model="id" type="text" name="id" />
      <button id="searchBt" @click="getMachineType(id)">Search</button>
    </div>
    <div class="limiter">
      <div class="wrap-table100">
        <div class="table100 ver5 m-b-110">
          <table>
            <thead>
              <tr class="row100 head">
                <th id="des" class="cell100 column3">Designation</th>
                <th id="ops" class="cell100 column3">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in machineType" v-bind:key="p">
                <td class="column3">{{p.designation}}</td>
                <td class="column3">{{p.opDesignation}}</td>
              </tr>
              <br />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <h3 id="crMT">Create Machine Type</h3>
      <div>
        <h4 id="pDes">Description</h4>
        <input @click="getOperations()" v-model="na" type="text" name="name" />
        <h4 id="pOps">Select Operations</h4>
        <b v-for="p in operationsList" v-bind:key="p.operationsDTOId">
          <input type="checkbox" name="ope" :value="p.operationsDTOId" v-model="operationsDTOId" />
          <label for="p.designation">{{p.name}}</label>
        </b>
        <button id="createBt" @click="postMachineType(na)">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "machinetype",
  components: {},
  data() {
    return {
      ids: null,
      machineType: [],
      operationsList: []
    };
  },
  methods: {
    getMachineType(id) {
      this.machineType.pop();
      this.operationsList.pop();
      if (id == 0 || id == null) {
        Vue.axios
          .get("https://fabrica.azurewebsites.net/api/machinetype")
          .then(Response => {
            this.machineType = Response.data;
            
            this.machineType.forEach(maTp => {
              
              maTp.operations.forEach(op => {
                
                Vue.axios
                  .get(
                    "https://fabrica.azurewebsites.net/api/operations/" +
                      op +
                      "/operationsbyid"
                  )
                  .then(Response2 => {
                    this.operationsList.push(Response2.data.name);
                  });
                this.$set(maTp, "opDesignation", this.operationsList);
              });
            });
          });
      } else {
        this.machineType= [];
             // this.machineType.pop();
      //this.operationsList.pop();
        Vue.axios
          .get("https://fabrica.azurewebsites.net/api/machinetype/" + id+"/machineTypebyName")
                    .then(Response => {
            this.machineType.push(Response.data);
            this.machineType.forEach(maTp => {
              maTp.operations.forEach(op => {
                this.operationsList=[];
                Vue.axios
                  .get(
                    "https://fabrica.azurewebsites.net/api/operations/" +
                      op +
                      "/operationsbyid"
                  )
                  .then(Response2 => {
                    this.operationsList.push(Response2.data.name);
                  });
                this.$set(maTp, "opDesignation", this.operationsList);
              });
            });
          });
      }
    },
    getOperations() {
      this.operationsList.pop();
      Vue.axios
        .get("https://fabrica.azurewebsites.net/api/operations")
        .then(Response => {
          this.operationsList = Response.data;
        });
    },
    postMachineType(des) {
      var temp = document.getElementsByName("ope");
      var result = [];
      var i;
      for (i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
          result.push(temp[i]._value);
        }
      }
      Vue.axios.post("https://fabrica.azurewebsites.net/api/machinetype", {
        designation: des,
        operations: result
      });
    }
  }
};
</script>

<style scoped>
.column2 {
  width: 13%;
}

.column3 {
  width: 50%;
}
</style>