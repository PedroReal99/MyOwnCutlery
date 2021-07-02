<template>
  <div class="order">
    <h2 id="Order">Order</h2>
    <div id="search" class="search">
      <!--input v-model="id" type="text" name="id" /-->
      <button class="myButton" name="adminbutton" id="bt" @click="getOrders(0)">Search all Orders</button>
    </div>
    <div class="limiter">
      <div class="wrap-table100">
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
                <td class="cell100 column1">{{p.ClientName}}</td>
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
    </div>
          <div name="adminbutton">
      <h2 class="text" id="changeOrders">Change Orders</h2>
      <div>
        <button id="SearchCB" class="myButton" @click="getAllOrders(0)">Search Orders</button>
        <h4 class="text" id="SelectOrder">Select order</h4>
        <b v-for="p in orderList2" v-bind:key="p.idOrder">
          <input type="radio" name="orders2" :value="p.idOrder" v-model="id" />
          {{p.date}}--{{p.ClientName}}
          <br />
        </b>
      </div>
      <div>
        <br />
        <button class="myButton" id="SearchPBB" @click="getAllProducts(0)">Search Products</button>
        <h4 class="text">Select Product</h4>
        <b v-for="p in productList" v-bind:key="p._id">
          <input type="radio" class="text" name="orders3" :value="p.productId" v-model="idProduct2" />
          {{p.name}}
          <br />
        </b>
      </div>
        <h4 class="text" id="cQuant">New Quantity</h4>
        <input  class="text" type="text" name="quantity" v-model="quantity"/>
        <br />
      <div>
        <br />
        <button class="myButton" id="cChange" @click="changeOrder(id,idProduct2,quantity)">Change</button>
      </div>
    </div>
        <div name="adminbutton">
      <h2 class="text">Cancel Orders</h2>
      <div>
        <button class="myButton" id="cancelSearch" @click="getAllOrders2(0)">Search Orders</button>
        <h4 class="text">Select order</h4>
        <b v-for="p in orderList3" v-bind:key="p.idOrder">
          <input type="radio" name="orders2" :value="p.idOrder" v-model="id" />
          {{p.date}}--{{p.ClientName}}
          <br />
        </b>
      </div>
      <div>
        <button class="myButton" id="cancelButton" @click="cancelOrder(id)">Cancel Orders</button>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "order",
  components: {},
  data() {
    return {
      //ids: null,
      orderList: [],
      orderList2: [],
      orderList3: [],
      productList: [],
      b:String,
      nomee:String,
      nif:Number,
      nome:String,
      address:String,
      pCode:String,
      nib:Number,
      descProd:String,
      role:String,
      userName:String,
      userNif:Number,
      nifC:Number,
      addressC:String,
      pCodeC:String,
      nibC:Number,
      quantityC:Number,
      descProd2:String
    };
  },
    mounted() {
    var toHide1 = document.getElementsByName("userbutton");
    var toHide2 = document.getElementsByName("adminbutton");
    var a = localStorage.getItem("user");
    //var a="Admin";
    Vue.axios.get("http://localhost:3000/users/email/"+a).then(Response => {
          localStorage.setItem("role",Response.data.role);
        });
    var b = localStorage.getItem("role");
    if (b == "Admin") {
      toHide1.forEach(h => (h.style.display = "none"));
    } else {
      toHide2.forEach(h => (h.style.display = "none"));
    }
  },
  methods: {
    getOrders(id) {
      this.orderList.pop();
      if (id == 0 || id == null) {
        Vue.axios.get("http://localhost:3000/orders").then(Response => {
          this.orderList = Response.data;
          this.orderList.forEach(element => {
            Vue.axios
              .get("http://localhost:3000/users/" + element.ClientNif)
              .then(Response1 => {
                this.$set(
                 element,
                  "ClientName",
                  Response1.data.name
                );
              });
          });
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
    getOrdersClient(){
      this.orderList.pop();
      var temp=localStorage.getItem("user");
      var name;
      Vue.axios
        .get("http://localhost:3000/users/email/" + temp)
        .then(Response => {
          this.nif = Response.data.nif;
          name = Response.data.name;
        });
        Vue.axios
          .get("http://localhost:3000/orders/client/" + this.nif )
          .then(Response => {
            this.orderList.push(Response.data);
            this.orderList.forEach(element=> {
              this.$set(
                 element,
                  name,
                  Response.data.name
                );
            })
          });


        


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
      Vue.axios.get("http://localhost:3000/orders").then(Response => {
          this.orderList2 = Response.data;
          this.orderList2.forEach(element => {
            Vue.axios
              .get("http://localhost:3000/users/" + element.ClientNif)
              .then(Response1 => {
                this.$set(
                 element,
                  "ClientName",
                  Response1.data.name
                );
              });
          });
          });
    },
    getAllOrders2() {
      this.orderList3.pop;
      Vue.axios.get("http://localhost:3000/orders").then(Response => {
          this.orderList3 = Response.data;
          this.orderList3.forEach(element => {
            Vue.axios
              .get("http://localhost:3000/users/" + element.ClientNif)
              .then(Response1 => {
                this.$set(
                 element,
                  "ClientName",
                  Response1.data.name
                );
              });
          });
          });
    },
    cancelOrder(idOrder) {
      Vue.axios
          .get("http://localhost:3000/orders/" + idOrder )
          .then(Response => {
            this.nifC=Response.data.ClientNif;
            this.addressC=Response.data.address;
            this.pCodeC=Response.data.postalCode;
            this.nibC=Response.data.NIB;
            this.quantityC=Response.data.quantity;
            this.descProd2=Response.data.ProductName;
          });

        Vue.axios.put("http://localhost:3000/orders/"+idOrder, {
        quantity: this.quantityC,
        ClientNif:this.nifC,
          address: this.addressC,
          postalCode: this.pCodeC,
        NIB: this.nibC,
        state:"Canceled",
        ProductName:this.descProd2
      });
    },
    postOrder(quantity, address, postalCode, idProd, nib) {
      var temp=localStorage.getItem("user");
      Vue.axios
        .get("http://localhost:3000/users/email/" + temp)
        .then(Response => {
          this.userNif = Response.data.nif;
          this.userName = Response.data.name;
        });
      //var a;
      Vue.axios
          .get("https://producao.azurewebsites.net/api/product/" + idProd )
          .then(Response => {
            this.b=Response.data.name;
          });
      Vue.axios.post("http://localhost:3000/orders", {
        quantity: quantity,
        product: {
          id:idProd,
          description:this.b
        },
        shippingAdress: {
          address: address,
          postalCode: postalCode
        },
        NIB: nib,
        client: {
          nif:this.userNif,
          name:this.userName
        }
      });
    },
changeOrder(id,idProduct,quantity) {
        Vue.axios
          .get("http://localhost:3000/orders/" + id )
          .then(Response => {
            this.nif=Response.data.ClientNif;
            this.address=Response.data.address;
            this.pCode=Response.data.postalCode;
            this.nib=Response.data.NIB;
          });
        Vue.axios
          .get("https://producao.azurewebsites.net/api/product/" + idProduct )
          .then(Response => {
            this.descProd=Response.data.name;
          });

        Vue.axios.put("http://localhost:3000/orders/"+id, {
        quantity: quantity,
        ClientNif:this.nif,
          address: this.address,
          postalCode: this.pCode,
        NIB: this.nib,
        state:"processing",
        ProductName:this.descProd
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
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #737373 100%);
	background-color:#ffffff;
	border-radius:6px;
	border:1px solid #000000;
	display:inline-block;
	cursor:pointer;
	color:#000000;
	font-family:Times New Roman;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
}
.myButton:hover {
	background:linear-gradient(to bottom, #737373 5%, #ffffff 100%);
	background-color:#737373;
}
.myButton:active {
	position:relative;
	top:1px;
}
.css-input {
  display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  padding: 10px 20px;
  border: 3px solid #b7b7b7;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  font: normal 16px/normal "Times New Roman", Times, serif;
  color: rgb(7, 7, 7);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: rgba(201,197,197,0.62);
  -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
}

.text{
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}

</style>