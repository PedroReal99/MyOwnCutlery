<template>
  <div>
    <br />
    <br />
    <br />
    <input class="css-input" placeholder="Name" v-model="name" />
    <br />
    <br />
    <input class="css-input" placeholder="NIF" v-model="nif" />
    <br />
    <br />
    <input class="css-input" type="email" placeholder="Insert a valid Email" v-model="email" />
    <br />
    <br />
    <input
      class="css-input"
      type="password"
      placeholder=" Insert a Password"
      id="pass"
      v-model="password"
    />
    <br />
    <br />
    <input class="css-input" placeholder=" Insert a mobile number" v-model="mobileNumbers" />
    <br />
    <br />
    <input class="css-input" placeholder=" Insert an incapacity if exists" v-model="incapaticty" />
    <br />
    <br />
    <router-link to="/lapr">Terms of use</router-link>
    <br />
    <input type="checkbox" name="condicoes" v-model="condicoes" />Accept terms of use
    <br />
    <p class="error">{{emailNotFound}}</p>
    <button
      @click="register(nif,name,email,password,mobileNumbers,incapaticty,condicoes)"
      class="myButton"
      id="lol"
    >Register</button>
    <router-link to="/" class="myButton">Cancel</router-link>
  </div>
</template>
<script>
import Vue from "vue";
//import router from 'vue-router'

//import { store } from "../router";

export default {
  name: "login",
  data() {
    return {
      name: "",
      nif: "",
      email: "",
      password: "",
      mobileNumbers: "",
      incapaticty: "",
      log: "",
      emailNotFound: ""
    };
  },
  methods: {
    register(
      nifP,
      nameP,
      emailP,
      passwordP,
      mobileNumbersP,
      incapacityP,
      condicoesP
    ) {
      if (condicoesP == true) {
        var phone = [];
        phone.push(mobileNumbersP);
        Vue.axios
          .post("http://localhost:3000/auth", {
            nif: nifP,
            name: nameP,
            password: passwordP,
            email: emailP,
            mobileNumbers: phone,
            incapacity: incapacityP,
            role:"Client"
          })
          .then(response => {
            this.log = response.data.out;
            this.submited = true;
            this.$router.push("/");
            alert("Register Sucessfull! Welcome:)");
          });
      }else{
        alert("Please accept condicions)");
      }
    },
    canLogin(email, password) {
      return email == "admin" && password == "admin";
    }
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  padding: 10px 20px;
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
</style>