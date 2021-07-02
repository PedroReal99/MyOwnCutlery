<template>
    <div class="productionline">
        <div class="search">
            <input v-model="id" type="number" name="id">
            <button id="searchBt" @click="getProductionsLine(id)">Search</button>
        </div>
        <div class="limiter">
          <div class="wrap-table100">
        <div class="table100 ver5 m-b-110">
            <table data-vertable="ver5">
              <thead>
                <tr class="row100 head">
                  <th id="pli" class="cell100 column1">Production Line Index</th>
                  <th id="md" class="cell100 column2">Machines designation</th>
                </tr>
              </thead>
                <tbody>
                  <tr v-for="p in productionLineList" v-bind:key="p.productionLineId">
                    <td>{{p.productionLineId}}</td>
                    <td class="cell100 column2">{{p.machineDesignation}}</td>
                  </tr>
                </tbody>
              </table>
            </div> 
          </div>
        </div>
      <div>
        <h3 id="cpl">Create Production Line</h3>
        <div>
          <button id="postBt" @click="getMachines()">Post</button>
            <h4 id="pMac">Select Machines</h4>
            <b v-for="p in machineLists" v-bind:key="p">
              <input type="checkbox" name="machine" :value="p.machineId" v-model="machineId">
              <label for="p.designation">{{p.designation}}</label>
            </b>
            <div >
              <button id="createBt" @click="postProductionLine()">Create</button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>

import Vue from 'vue'

export default {
    name: "productionline",
    components: {},
    data() {
        return {
            ids: null,
            productionLineList: [],
            machineLists:[],
            result:[]
        }
    },
    watch: {
      productionLineList(newValue, oldValue) {
        if (newValue !== [] && newValue !== oldValue) {
          this.getMachines()
        }
      }
    },
    methods: {
        getProductionsLine(id){
          this.productionLineList.pop();
          if(id==0 || id==null){
            Vue.axios.get('https://fabrica.azurewebsites.net/api/productionLine')
              .then((Response) => {
                this.productionLineList=Response.data;
                this.productionLineList.forEach((productionLine) => {
                  var result = [];
                  productionLine.machineList.forEach((m) => {
                    Vue.axios.get('https://fabrica.azurewebsites.net/api/machine/'+m+'/machinebyid')
                      .then((Response2) => {
                      result.push(Response2.data.designation);
                    })
                    this.$set(productionLine, 'machineDesignation', result)
                  })
                })
              })
          }
          else{
            this.productionLineList.pop();
            this.result=[];
            Vue.axios.get('https://fabrica.azurewebsites.net/api/productionLine/'+id)
              .then((Response) => {
                this.productionLineList.push(Response.data);
                this.productionLineList.forEach((productionLine) => {
                  var result = [];
                  productionLine.machineList.forEach((m) => {
                    Vue.axios.get('https://fabrica.azurewebsites.net/api/machine/'+m+'/machinebyid')
                      .then((Response2) => {
                      result.push(Response2.data.designation);
                    })
                    this.$set(productionLine, 'machineDesignation', result)
                  })
                })
              })
            }
          },
        getMachinesById(id){
          this.machineLists.pop;
          return  Vue.axios.get('https://fabrica.azurewebsites.net/api/machine/'+id+'/machinebyid')
                .then((Response) => {this.machineLists=Response.data})
        },
        getMachines(){
          this.machineLists=[];
          Vue.axios.get('https://fabrica.azurewebsites.net/api/machine')
              .then((Response) => {
                this.machineLists=Response.data
              })
        },
        postProductionLine() {
            var temp=document.getElementsByName("machine");
            var result = [];
            var i;
             for( i=0 ; i<temp.length ; i++){
               if(temp[i].checked){
                result.push(temp[i]._value);
             }}
          Vue.axios.post('https://fabrica.azurewebsites.net/api/productionLine', {
            machineList: result
          })
        }
    }
}
    
</script>

<style scoped>

.column1 {
  width: 20%;
  padding-left: 40px;
}

.column2 {
  width: 30%;
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