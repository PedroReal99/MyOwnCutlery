<template>
  <div class="User">
    <br />
    <h2>Permission for User</h2>
    <div>
      Client can create order
      <select id="ClientCanCreateOrder">
        <option value='true'>True</option>
        <option value='false'>False</option>
      </select>
    </div>
    <br />
    <div>
      Client can change his information
      <select id="ClientCanChangeHisInfo">
        <option value='true'>True</option>
        <option value='false'>False</option>
      </select>
    </div>
    <br />
    <button @click="save()">Save all changes</button>
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

  methods: {
    save() {
      var a = document.getElementById("ClientCanCreateOrder");
      var ClientCanCreateOrderT = a.options[a.selectedIndex].value;
      var b = document.getElementById("ClientCanChangeHisInfo");
      var ClientCanChangeHisInfoT = b.options[b.selectedIndex].value;
      Vue.axios.post("http://localhost:3000/users/permission/write", {
        ClientCanCreateOrder: ClientCanCreateOrderT,
        ClientCanChangeHisInfo: ClientCanChangeHisInfoT
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