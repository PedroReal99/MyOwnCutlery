<template>
  <div class="product">
    <h2 id="prod">Product</h2>
    <div class="search">
      <input v-model="id" type="text" name="id" />
      <button id="searchPr" @click="getProduct(id)">Search</button>
    </div>
    <div class="limiter">
      <div class="wrap-table100">
        <div class="table100 ver5 m-b-110">
          <table data-vertable="ver5">
            <thead>
              <tr>
                <th id="name" class="cell100 column2">Name</th>
                <th id="mpid" class="cell100 column3">Manufacturing Plan Id</th>
                <th id="date" class="cell100 column4">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in productList" v-bind:key="p">
                <td class="cell100 column2">{{p.name}}</td>
                <td class="cell100 column3">{{p.manufacturingPlanId}}</td>
                <td class="cell100 column4">{{p.mpDate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 id="prodpost">Criar Produto</h3>
          <div>
            <h4 id="pNome">Nome</h4>
            <input @click="getManufacturingPlan(mId)" v-model="name" type="text" name="name" />
            <h4 id="pMPID">Manufacturing Plan Id</h4>
            <b v-for="p in manufacturingPlanList" v-bind:key="p.manufacturingPlanId">
              <input
                type="radio"
                name="manufacturingPlan"
                :value="p.manufacturingPlanId"
                v-model="planId"
              />
              <label for="p.manufacturingPlanId">{{p.manufacturingPlanId}}</label>
            </b>
            <div>
              <button id="createBt" @click="postProduct(name, planId)">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "product",
  components: {},
  data() {
    return {
      //ids: null,
      productList: [],
      manufacturingPlanList: []
    };
  },
  methods: {
    getProduct(id) {
      this.productList.pop();
      if (id == 0 || id == null) {
        Vue.axios
          .get("https://producao.azurewebsites.net/api/product")
          .then(Response => {
            this.productList = Response.data;
          });
      } else {
        this.productList.pop();
        Vue.axios
          .get("https://producao.azurewebsites.net/api/product/" + id+"/ProductbyName")
          .then(Response => {
            this.productList .push(Response.data);
          });
      }
    },
    getManufacturingPlan() {
      Vue.axios
        .get("https://producao.azurewebsites.net/api/manufacturingplan")
        .then(Response => {
          this.manufacturingPlanList = Response.data;
        });
    },
    postProduct(m, mId) {
      Vue.axios.post("https://producao.azurewebsites.net/api/product", {
        manufacturingPlanId: mId,
        name: m
      });
    }
  }
};
</script>

<style>
.column1 {
  width: 33%;
  padding-left: 30px;
}

.pad {
  padding-left: 240px;
}

.column2 {
  width: 40%;
}

.column3 {
  width: 30%;
}

.column4 {
  width: 30%;
  padding-left: 40px;
}

.column5 {
  width: 42%;
  padding-left: 40px;
}

.column6 {
  width: 42%;
  padding-left: 40px;
  padding-right: 100px;
}

.column7 {
  width: 42%;
}
</style>
