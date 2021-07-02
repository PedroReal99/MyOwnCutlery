<template>
  <div id="app">
    
    <div id="nav">
      <h3>
        <span @click="user()">User</span>
        <span class="menu-line">|</span>
        <span @click="orders()">Orders</span>
        <span class="menu-line">|</span>
        <span @click="logout()">Logout</span>
      </h3>
    </div>
    <img
      src="https://www.publicdomainpictures.net/pictures/60000/nahled/cutlery-logo-clipart.jpg"
      alt="Talheres"
      width="300"
      height="300"
    />
    <h1>My Own Cutlery</h1>
    <router-view />
  </div>
</template>
  <script>
  export default {
  name: "user",
  components: {},
  data() {
    return {
      ids: null,
      userList: []
    };
  },

  methods: {
    logout() {
     this.$router.push("/");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
    orders(){
      if(localStorage.getItem("role")=="Admin"){
        this.$router.push("/orderAdmin");
      }else{
        this.$router.push("/orderClient");
      }
    },
    user(){
      if(localStorage.getItem("role")=="Admin"){
        this.$router.push("/userAdmin");
      }else{
        this.$router.push("/userClient");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body,
html {
  height: 100%;
  font-family: Helvetica;
}

iframe {
  border: none !important;
}

.js-pscroll {
  position: relative;
  overflow: hidden;
}

.table100 .ps__rail-y {
  width: 9px;
  background-color: transparent;
  opacity: 1 !important;
  right: 5px;
}

.table100 .ps__rail-y::before {
  content: "";
  display: block;
  position: absolute;
  background-color: #ebebeb;
  border-radius: 5px;
  width: 100%;
  height: calc(100% - 30px);
  left: 0;
  top: 15px;
}

.table100 .ps__rail-y .ps__thumb-y {
  width: 100%;
  right: 0;
  background-color: transparent;
  opacity: 1 !important;
}

.table100 .ps__rail-y .ps__thumb-y::before {
  content: "";
  display: block;
  position: absolute;
  background-color: #cccccc;
  border-radius: 5px;
  width: 100%;
  height: calc(100% - 30px);
  left: 0;
  top: 15px;
}

.limiter {
  width: 1366px;
  margin: 0 auto;
}

.container-table100 {
  width: 100%;
  min-height: 100vh;
  background: #fff;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 30px;
}
.columnSpace {
  width: 33%;
  padding-left: 0px;
}

.table100 {
  background-color: #fff;
}

table {
  width: 100%;
}

th,
td {
  font-weight: unset;
  padding-right: 10px;
}

.table100-head th {
  padding-top: 18px;
  padding-bottom: 18px;
}

.table100-body td {
  padding-top: 16px;
  padding-bottom: 16px;
}

.table100 {
  position: relative;
  padding-top: 60px;
}

.table100-head {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.table100-body {
  /*max-height: 585px;*/
  overflow: auto;
  width: 100%;
}

.table100.ver5 {
  margin-right: -30px;
}

.table100.ver5 .table100-head {
  padding-right: 30px;
}

.table100.ver5 th {
  font-family: Helvetica;
  font-size: 18px;
  color: #555555;
  line-height: 1.4;
  text-transform: uppercase;
  color: rgb(6, 66, 6);
  text-decoration: underline;
  background-color: rgba(150, 189, 150, 0.432);
}

.table100.ver5 td {
  font-family: Helvetica;
  font-size: 15px;
  color: #808080;
  line-height: 1.4;
  background-color: rgba(150, 189, 150, 0.432);
}

.table100.ver5 .table100-body tr {
  overflow: hidden;
  border-bottom: 10px solid #fff;
  border-radius: 10px;
}

.table100.ver5 .table100-body table {
  border-collapse: separate;
  border-spacing: 0 10px;
}
.table100.ver5 .table100-body td {
  border: solid 1px transparent;
  border-style: solid none;
  padding-top: 10px;
  padding-bottom: 10px;
}
.table100.ver5 .table100-body td:first-child {
  border-left-style: solid;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.table100.ver5 .table100-body td:last-child {
  border-right-style: solid;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.table100.ver5 tr:hover td {
  background-color: #ebebeb;
  cursor: pointer;
}

.table100.ver5 .table100-head th {
  padding-top: 25px;
  padding-bottom: 25px;
}

.table100.ver5 {
  overflow: hidden;
}

.table100.ver5 .table100-body {
  padding-right: 30px;
}

.table100.ver5 .ps__rail-y {
  right: 0px;
}

.table100.ver5 .ps__rail-y::before {
  background-color: #ebebeb;
}

.table100.ver5 .ps__rail-y .ps__thumb-y::before {
  background-color: rgba(97, 104, 97, 0.432);
}
</style>
