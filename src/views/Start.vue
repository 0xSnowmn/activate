<template>
  <div class="start">
    <h1 class="text-center">Upload Emails file</h1>
  <button class="btn btn-light text-center" @click="upload">Upload Emails File</button>
  <div class="text-center mb-5">{{ this.file }}</div>
  <button class="btn btn-warning text-center startBt" :disabled="this.file === null" @click="this.$router.push({ name: 'Dashboard', params: { file: this.file } })">Start</button>
  </div>
</template>
<script>
const script = require('@/script/activate')
const ipc = require("electron").ipcRenderer

export default {
  name: 'Start',
  data(){
    return {
      file:null,
      done:[]
    }
  },
  methods:{
    async upload() {
      await this.elc.dialog.showOpenDialog({properties: ['openFile']}).then(async (result) => {
        if (result.canceled) {
            return
        } else {
            this.file = result.filePaths[0];
            
        }
    });

    ipc.on('done',(event,arg) => {
      this.done.push(arg)
    })
        
    }
  }
}
</script>

<style scoped>
div.start {
   color:#ddd;
   display: grid;
}

h1 {
  margin: 109px;
}

button:first-of-type {
  width: 80%;
  margin: 45px 75px;
  border-radius: 50px;
}

.startBt {
    width: 95px;
    height: 95px;
    margin: auto;
    border-radius: 50px;
    color:#111;
}
</style>
