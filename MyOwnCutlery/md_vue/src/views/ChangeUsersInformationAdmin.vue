<template>
  <div class="User">
    <br />
    <button name="adminbutton" @click="getUser(id)">Search User</button>
    <br />
    <br />
    <b v-for="z in userList" v-bind:key="z.id">
      <input type="radio" name="userL" :value="z.nif" v-model="uId" />
      {{z.name}}
      <br />
    </b>
    <h2>Change Information</h2>
    <div class="limiter">
      <div name="userbutton" id="mydivChange">
        <h4>New User Name</h4>
        <input v-model="name" type="text" name="name" />
        <h4>New User Email</h4>
        <input v-model="email" type="email" name="email" />
        <h4>New User Password</h4>
        <input v-model="password" type="password" name="password" />
        <h4>New Mobile Number</h4>
        <input v-model="mobileNumbers" type="Number" name="mobileNumbers" />
        <h4>Incapacity</h4>
        <input v-model="incapacity" type="text" name="incapacity" />
        <h4>Role</h4>
        <select id="role">
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        <br />
        <button @click="ChangeInformation(uId,name,email,password,mobileNumbers,incapacity)">Change</button>
      </div>
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
  mounted() {},
  methods: {
    getUser(id) {
      this.userList.pop();
      this.userList = [];
      if (id <= 0 || id == null) {
        Vue.axios.get("http://localhost:3000/users").then(Response => {
          for (var a = 0; a < Response.data.length; a++) {
            if(Response.data[a].role!="Admin" || Response.data[a].email==localStorage.getItem("user")){
            this.userList.push(Response.data[a]);
          }}
        });
      } else {
        Vue.axios.get("http://localhost:3000/users/" + id).then(Response => {
          this.userList.push(Response.data);
        });
      }
    },
    ChangeInformation(
      uIdP,
      nameP,
      emailP,
      passwordP,
      mobileNumbersP,
      incapacityP
    ) {
      var e = document.getElementById("role");
      var roleP = e.options[e.selectedIndex].value;
      Vue.axios.put("http://localhost:3000/users/" + uIdP, {
        name: nameP,
        email: emailP,
        password: passwordP,
        mobileNumbers: mobileNumbersP,
        incapacity: incapacityP,
        role: roleP
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
</style>