<template>
  <div class="order">
    <h2 id="Order">Order</h2>
    <div id="search" class="search">
      <button class="myButton" id="bt" @click="getOrdersClient()">Search Your Orders</button>
      <button class="myButton" id="bt" @click="searchProductMoreOrdered()">Product More Ordered</button>
      <button class="myButton" id="bt" @click="searchProductQuantity()">Products ordered by quantity</button>
      <button
        class="myButton"
        id="bt"
        @click="SearchProductsMP()"
      >Products ordered by Manufacturing Plan</button>
    </div>
    <div class="limiter">
      <div class="primeiro">
        <div class="table100 ver5 m-b-110">
          <table>
            <thead>
              <tr class="row100 head">
                <th id="nameClient" class="cell100 column1">Name Client</th>
                <th id="prodName" class="cell100 column2">Product name</th>
                <th id="quant" class="cell100 column3">Quantity</th>
                <th id="ordDate" class="cell100 column4">Order Date</th>
                <th id="ordDate" class="cell100 column4">Delivery Date</th>
                <th id="addr" class="cell100 column4">Address</th>
                <th id="postCode" class="cell100 column4">Postal Code</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in orderList" v-bind:key="p.idOrder">
                <td class="cell100 column1">{{p.ClientNif}}</td>
                <td class="cell100 column2">{{p.ProductName}}</td>
                <td class="cell100 column2">{{p.quantity}}</td>
                <td class="cell100 column3">{{p.date}}</td>
                <td class="cell100 column3">{{p.delivery}}</td>
                <td class="cell100 column4">{{p.address}}</td>
                <td class="cell100 column5">{{p.postalCode}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="segundo">
        <div class="table100 ver5 m-b-110">
          <table data-vertable="ver5">
            <thead>
              <tr class="row100 head">
                <th id="des" class="cell100 column1">Product</th>
                <th id="mtd" class="cell100 column2">Ordered</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in productList2" v-bind:key="p.Product" class="row100 body">
                <td class="cell100 column1">{{p._id.Product}}</td>
                <td class="cell100 column2">{{p.Ordered}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="terceiro">
        <div class="table100 ver5 m-b-110">
          <table data-vertable="ver5">
            <thead>
              <tr class="row100 head">
                <th id="des" class="cell100 column1">Product</th>
                <th id="mtd" class="cell100 column2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in productList3" v-bind:key="p.Product" class="row100 body">
                <td class="cell100 column1">{{p._id.Product}}</td>
                <td class="cell100 column2">{{p.Sum}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="quarto">
        <div class="table100 ver5 m-b-110">
          <table data-vertable="ver5">
            <thead>
              <tr class="row100 head">
                <th id="des" class="cell100 column1">Product</th>
                <th id="mtd" class="cell100 column2">Time by manufacturing plan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in productList4" v-bind:key="p.Product" class="row100 body">
                <td class="cell100 column1">{{p.Name}}</td>
                <td class="cell100 column2">{{p.Sum}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="canCreate">
      <h3 class="text" id="createOrder" name="userbutton">Create order</h3>
      <div name="userbutton">
        <h4></h4>
        <!--<input @click="getAllProducts()" v-model="designation" type="text" name="designation" /-->
        <button
          class="myButton"
          id="searchProds"
          name="userbutton"
          @click="getAllProducts()"
        >Search Products</button>
        <h4 class="text" name="userbutton" id="prodsAvail">Products Available</h4>
        <b v-for="p in productList" v-bind:key="p.productId">
          <input class="text" type="radio" name="product" :value="p.productId" v-model="idProduct" />
          {{p.name}}
          <br />
        </b>
        <h3 class="text" name="userbutton" id="pQuant">Quantity</h3>
        <input v-model="quantity" type="text" name="quantity" />
        <h4 class="text" id="pAddress">Address</h4>
        <input v-model="addresss" type="text" name="addresss" />
        <h4 class="text" id="ppc">Postal Code</h4>
        <input v-model="postalCode" type="text" name="postalCode" />
        <h4 class="text" id="pnib">Nib</h4>
        <input v-model="nibb" type="text" name="nib" />
        <br />
        <br />
      </div>
      <div name="userbutton">
        <button
          id="pCreate"
          class="myButton"
          @click="postOrder(quantity,addresss,postalCode,idProduct,nibb)"
        >Create</button>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import Vue from "vue";
import permission from "../../../GE/backend-intro/permission.json";
export default {
  name: "order",
  components: {},
  data() {
    return {
      //ids: null,
      orderList: [],
      orderList2: [],
      productList: [],
      productList2: [],
      productList3: [],
      productList4: [],
      b: String,
      nif: Number,
      nome: String,
      address: String,
      pCode: String,
      nib: Number,
      descProd: String,
      role: String,
      userName: String,
      userNif: Number
    };
  },
  mounted() {
    var toHide1 = document.getElementsByClassName("primeiro");
    var toHide2 = document.getElementsByClassName("segundo");
    var toHide3 = document.getElementsByClassName("terceiro");
    var toHide4 = document.getElementsByClassName("quarto");
    var toHide5 = document.getElementsByClassName("canCreate");

    toHide1.forEach(h => (h.style.display = "none"));
    toHide2.forEach(h => (h.style.display = "none"));
    toHide3.forEach(h => (h.style.display = "none"));
    toHide4.forEach(h => (h.style.display = "none"));
    if (permission.ClientCanCreateOrder == 'false') {
      toHide5.forEach(h => (h.style.display = "none"));
    }
  },
  methods: {
    getOrders(id) {
      this.orderList.pop();
      if (id == 0 || id == null) {
        Vue.axios.get("http://localhost:3000/orders").then(Response => {
          this.orderList = Response.data;
        });
      } else {
        this.orderList.pop();
        Vue.axios
          .get("http://localhost:3000/orders/client/" + id)
          .then(Response => {
            this.orderList.push(Response.data);
          });
      }
    },
    async getOrdersClient() {
      var toHide1 = document.getElementsByClassName("primeiro");
      var toHide2 = document.getElementsByClassName("segundo");
      var toHide3 = document.getElementsByClassName("terceiro");
      var toHide4 = document.getElementsByClassName("quarto");
      toHide1.forEach(h => (h.style.display = "block"));
      toHide2.forEach(h => (h.style.display = "none"));
      toHide3.forEach(h => (h.style.display = "none"));
      toHide4.forEach(h => (h.style.display = "none"));
      this.orderList.pop();
      var temp = localStorage.getItem("user");
      //var name;
      await Vue.axios
        .get("http://localhost:3000/users/email/" + temp)
        .then(Response => {
          this.nif = Response.data.nif;
          //this.name = Response.data.name;
        });

      await Vue.axios
        .get("http://localhost:3000/orders/client/" + this.nif)
        .then(Response => {
          this.orderList = Response.data;
        });

      /*await Vue.axios
          .get("http://localhost:3000/orders/client/" + this.nif )
          .then(Response => {
            this.orderList.push(Response.data);
            this.orderList.forEach(element=> {
              this.$set(
                 element,
                  "ClientName",
                  name
                );
            })
          });*/
    },
    getAllProducts() {
      this.productList.pop;
      return Vue.axios
        .get("https://producao.azurewebsites.net/api/product")
        .then(Response => {
          this.productList = Response.data;
        });
    },
    getAllOrders() {
      this.orderList2.pop;
      return Vue.axios.get("http://localhost:3000/orders").then(Response => {
        this.orderList2 = Response.data;
      });
    },
    cancelOrder(id) {
      return Vue.axios
        .delete("http://localhost:3000/orders/" + id)
        .then(Response => {
          Response.data.designation;
        });
    },
    postOrder(quantity, address, postalCode, idProd, nib) {
      var temp = localStorage.getItem("user");
      Vue.axios
        .get("http://localhost:3000/users/email/" + temp)
        .then(Response => {
          this.userNif = Response.data.nif;
          this.userName = Response.data.name;
        });
      //var a;
      Vue.axios
        .get("https://producao.azurewebsites.net/api/product/" + idProd)
        .then(Response => {
          this.b = Response.data.name;
        });
      if (this.b != null && this.userNif != null) {
        Vue.axios.post("http://localhost:3000/orders", {
          quantity: quantity,
          ClientNif: this.userNif,
          address: address,
          postalCode: postalCode,
          NIB: nib,
          state: "processing",
          ProductName: this.b
        });
      }
    },
    changeOrder(id, idProduct, quantity) {
      Vue.axios.get("http://localhost:3000/orders/" + id).then(Response => {
        this.nif = Response.data.client.nif;
        this.address = Response.data.shippingAdress.address;
        this.pCode = Response.data.shippingAdress.postalCode;
        this.nib = Response.data.NIB;
      });
      Vue.axios
        .get("https://producao.azurewebsites.net/api/product/" + idProduct)
        .then(Response => {
          this.descProd = Response.data.name;
        });

      Vue.axios.put("http://localhost:3000/orders/" + id, {
        quantity: quantity,
        clientNif: this.nif,
        shippingAdress: {
          address: this.address,
          postalCode: this.pCode
        },
        NIB: this.nib,
        state: "processing",
        productName: this.descProd
      });
    },
    searchProductMoreOrdered() {
      var toHide1 = document.getElementsByClassName("primeiro");
      var toHide2 = document.getElementsByClassName("segundo");
      var toHide3 = document.getElementsByClassName("terceiro");
      var toHide4 = document.getElementsByClassName("quarto");
      toHide1.forEach(h => (h.style.display = "none"));
      toHide2.forEach(h => (h.style.display = "block"));
      toHide3.forEach(h => (h.style.display = "none"));
      toHide4.forEach(h => (h.style.display = "none"));
      this.productList2.pop();
      Vue.axios
        .get("http://localhost:3000/orders/productMoreOrdered")
        .then(Response => {
          this.productList2 = Response.data;
        });
    },
    searchProductQuantity() {
      var toHide1 = document.getElementsByClassName("primeiro");
      var toHide2 = document.getElementsByClassName("segundo");
      var toHide3 = document.getElementsByClassName("terceiro");
      var toHide4 = document.getElementsByClassName("quarto");
      toHide1.forEach(h => (h.style.display = "none"));
      toHide2.forEach(h => (h.style.display = "none"));
      toHide3.forEach(h => (h.style.display = "block"));
      toHide4.forEach(h => (h.style.display = "none"));
      this.productList3.pop();
      Vue.axios
        .get("http://localhost:3000/orders/product/quantity")
        .then(Response => {
          this.productList3 = Response.data;
        });
    },
    SearchProductsMP() {
      var toHide1 = document.getElementsByClassName("primeiro");
      var toHide2 = document.getElementsByClassName("segundo");
      var toHide3 = document.getElementsByClassName("terceiro");
      var toHide4 = document.getElementsByClassName("quarto");
      toHide1.forEach(h => (h.style.display = "none"));
      toHide2.forEach(h => (h.style.display = "none"));
      toHide3.forEach(h => (h.style.display = "none"));
      toHide4.forEach(h => (h.style.display = "block"));
      Vue.axios
        .get("http://localhost:3000/orders/product/manufacturingplan")
        .then(Response => {
          this.productList4 = Response.data;
        });
    }
  }
};
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

.myButton {
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 5%, #737373 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #000000;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-family: Times New Roman;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
}
.myButton:hover {
  background: linear-gradient(to bottom, #737373 5%, #ffffff 100%);
  background-color: #737373;
}
.myButton:active {
  position: relative;
  top: 1px;
}
.css-input {
  display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  padding: 10px 10px;
  border: 3px solid #b7b7b7;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  font: normal 16px / normal "Times New Roman", Times, serif;
  color: rgb(7, 7, 7);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: rgba(201, 197, 197, 0.62);
  -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
}

.text {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
</style>