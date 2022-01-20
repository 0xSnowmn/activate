<template>
<div>
  <div v-if="this.$store.state.loading" class="spin">
    <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  <div v-if="!this.$store.state.loading" class="container">
    <check v-if="!this.$store.state.Key"/>
    <router-view v-else/>
    </div>
</div>
</template>
<script>
import check from "./views/login.vue"
export default {
  mounted () {
    document.title = "FB Activate Tool Created By yghonem14";
    const key = localStorage.getItem('key')
    if(key === null) {
      this.$store.commit("changeKey",false)
    } else {
      this.$store.dispatch('checkKey',key); 
    }
 
 
},
methods:{
  },
components:{
  check
}
}
</script>

<style>
* {
  background-color: #111;
  color:#ddd;
}
.spin {
    width: 5%;
    height: 50%;
    margin: 25% auto;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}


</style>

