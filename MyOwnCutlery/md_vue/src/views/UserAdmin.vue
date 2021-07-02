<template>
  <div class="User">
    <br />
    <h2>User</h2>
    <div class="search">
      <input v-model="id" type="text" name="adminbutton" />
      <button name="adminbutton" @click="getUser(id)">Search User</button>
    </div>
    <div class="limiter">
      <div class="wrap-table100">
        <div class="table100 ver5 m-b-110" name="adminbutton">
          <table data-vertable="ver5">
            <thead>
              <tr class="row100 head">
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in userList" v-bind:key="p.nif" class="row100 body" >
                <td>{{p.name}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div name="adminbutton">
      <router-link to="/ChangeUsersInformationAdmin">
        <button>Change Users Information</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "user",
  components: {},
  data() {
    return {
      ids: null,
      userList: []
    };
  },
  mounted() {
    var toHide1 = document.getElementsByName("userbutton");
    var toHide2 = document.getElementsByName("adminbutton");
    var temp = localStorage.getItem("user");
    Vue.axios
      .get("http://localhost:3000/users/email/" + temp)
      .then(Response => {
        localStorage.setItem("role", Response.data.role);
      });
    var a = localStorage.getItem("role");
    if (a == "Admin") {
      toHide1.forEach(h => (h.style.display = "none"));
    } else {
      toHide2.forEach(h => (h.style.display = "none"));
    }
  },

  methods: {
    getUser(id) {
      this.userList.pop();
      this.userList = [];
      if (id <= 0 || id == null) {
        Vue.axios.get("http://localhost:3000/users").then(Response => {
          this.userList = Response.data;
        });
      } else {
        Vue.axios.get("http://localhost:3000/users/name/" + id).then(Response => {
          this.userList=Response.data;
        });
      }
    },
    getUserDetails() {
      this.userList.pop();
      var temp = localStorage.getItem("user");
      Vue.axios
        .get("http://localhost:3000/users/email/" + temp)
        .then(Response => {
          this.userList.push(Response.data);
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

.BackView {
  height: 15%;
  float: left;
  margin-top: 0%;
  margin-right: 0px;
}
</style>