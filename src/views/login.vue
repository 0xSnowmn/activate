<template>
<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-8">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
            <div class="mb-md-5 mt-md-4 pb-5">
              <h2 class="fw-bold mb-5 text-uppercase">Enter Your Activation Code</h2>
              <div class="form-outline  mb-4">
                <input v-model="key" class="form-control form-control-lg mb-5" />
              </div>
              <button @click="this.$store.dispatch('checkKey',this.key)" class="btn btn-outline-warning btn-lg px-5" type="submit">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
export default {
  data(){
    return {
      key:''
    }
  }

}
</script>
<style scoped>
.form-control,.form-control:active {
    background-color: #1d1d1d;
    border: none;
    border-radius: 50px;
    color:#ddd;
}


.form-control:focus{
    box-shadow: 0 0 0 0.25rem rgb(17 18 19 / 25%);
    color:#ddd;
}
</style>
