<template>
    <div class="manufacturingplan">
      <h3 id="pf">Plano Fabrico</h3>
        <div clas="search">
            <input v-model="id" type="number" name="id">
            <button id="searchBt" @click="getManufacturingPlan(id)">Search</button>
        </div>
        <div class="limiter">
          <div class="wrap-table100">
        <div class="table100 ver5 m-b-110">
            <table>
              <thead>
                <tr class="row100 head">
                  <th id="date" class="cell100 column2">Date</th>
                  <th id="opName" class="cell100 column3">Operations Name</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="p in manufacturingPlanList" v-bind:key="p">
                    <td class="cell100 column2">{{p.date}}</td>
                        <td class="cell100 column3">{{p.machineTypeDesignation}}</td>
                  </tr>
                  <br>
              </tbody>
           </table>
          </div>
        </div>
      </div>
      <div>
        <h3 id="cpf">Criar Plano Fabrico</h3>
        <div>
          <button id="postBt" @click="getOperations()">Post</button>
            <h4 id = "postOps">Select Operations</h4>
            <b v-for="p in operationsList" v-bind:key="p">
              <input type="checkbox" name="ope" :value="p.id" v-model="id">
              <label for="p.toolDesc">{{p.name}}</label>
            </b>
            <div >
              <button id="createBt" @click="postManufacturingPlan()">Create</button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>

import Vue from 'vue'
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "manufacturingplan",
  components: {},
  data() {
    return {
      //ids: null,
      manufacturingPlanList: [],
      operationsList:[]
    }
  },
  watch(newValue, oldValue) {
        if (newValue !== [] && newValue !== oldValue) {
          this.getOperations()
        }
  },
  methods: {
    getManufacturingPlan(id) {
      this.manufacturingPlanList.pop;
      if(id==0 || id ==null){
        Vue.axios.get('https://producao.azurewebsites.net/api/manufacturingplan')
          .then((Response) => {
            this.manufacturingPlanList=Response.data;
            this.manufacturingPlanList.forEach((mfp) => {
            var result = [];
            mfp.operactions.forEach((o) => {
              Vue.axios.get('https://producao.azurewebsites.net/api/operationsMDP/'+o)
                .then((Response2) => {
                  result.push(Response2.data.name);
                })
                this.$set(mfp, 'machineTypeDesignation', result);
            })
            
          })
        })
      }
      else{
        Vue.axios.get('https://producao.azurewebsites.net/api/manufacturingplan/'+id)
        .then((Response) => {this.manufacturingPlanList=Response.data;
            var result = [];
            this.manufacturingPlanList.operactions.forEach((o) => {
              Vue.axios.get('https://producao.azurewebsites.net/api/operationsMDP/'+o)
                .then((Response2) => {
                  result.push(Response2.data.name);
                })
                this.$set(this.manufacturingPlanList, 'machineTypeDesignation', result);
            })})
      }
    },
    getOperationsById(id){
        this.operationsList.pop;
        Vue.axios.get('https://producao.azurewebsites.net/api/operationsMDP/'+id)
          .then((Response) => {
            this.operationsList=Response.data
          })
    },
    getOperations(){
      this.operationsList.pop;
        Vue.axios.get('https://producao.azurewebsites.net/api/operationsMDP')
          .then((Response) => {
            this.operationsList=Response.data
          })
    },
    postManufacturingPlan() {
            var temp=document.getElementsByName("ope");
            var result = [];
            var i;
             for( i=0 ; i<temp.length ; i++){
               if(temp[i].checked){
                result.push(temp[i]._value);
             }}
             var currentDate = new Date();

          Vue.axios.post('https://producao.azurewebsites.net/api/manufacturingplan', {
            Operactions: result,
            Date : currentDate
          })
        }
    
  }
}
</script>

<style scoped>


.column1 {
  width: 40%;
  padding-left: 30px;
}

.pad {
  padding-left: 240px;
}

.column2 {
  width: 33%;
}

.column3 {
  width: 40%;
}

</style>
