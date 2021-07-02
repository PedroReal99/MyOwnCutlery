<template>
  <div id="app">
    <main class="App__main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>
 
<script>
 export default {
    data () {
      return {
        publicPath: process.env.BASE_URL
      }
    }
  }
</script>
 
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
 
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
 

a {
  color: #2c3e50;
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px 0 10px;
}

 
a:visited {
  text-decoration: none;
}
</style>