<template>
  <div class="User">
    <br />
    <h2>Change Information</h2>
    <div class="limiter">
      <div name="userbutton" id="mydivChange">
        <h4>New Name</h4>
        <input v-model="name" type="text" name="name" /> 
        <h4>New Email</h4>
        <input v-model="email" type="email" name="email" />
        <h4>New Password</h4>
        <input v-model="password" type="password" name="password" />
        <h4>New Mobile Number</h4>
        <input v-model="mobileNumbers" type="Number" name="mobileNumbers" />
        <h4>Incapacity</h4>
        <input v-model="incapacity" type="text" name="incapacity" />
        <br />
        <button @click="ChangeInformation(name,email,password,mobileNumbers,incapacity)">Change</button>
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
      userList: [],
      name: String,
      email: String,
      mobile: Number,
      incapacity: String,
      nif: Number
    };
  },
  mounted() {
    this.userList.pop();
    var temp = localStorage.getItem("user");
    Vue.axios
      .get("http://localhost:3000/users/email/" + temp)
      .then(Response => {
        this.name = Response.data.name;
        this.email = Response.data.email;
        this.mobileNumbers = Response.data.mobileNumbers;
        this.incapacity = Response.data.incapacity;
      });
  },
  methods: {
    ChangeInformation(
      nameP,
      emailP,
      passwordP,
      mobileNumbersP,
      incapacityP
    ) {
      var temp = localStorage.getItem("user");
      Vue.axios
        .get("http://localhost:3000/users/email/" + temp)
        .then(Response => {
          this.nif = Response.data.nif;
        });
      Vue.axios.put("http://localhost:3000/users/" + this.nif, {
        name: nameP,
        email: emailP,
        password: passwordP,
        mobileNumbers: mobileNumbersP,
        incapacity: incapacityP
      });
      localStorage.setItem("user", emailP);
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