const ipcMain = require('electron').ipcMain
const fs = require("fs");
const script = require('@/script/activate')

const init = async () => {
  try {
    const readData = async (file) => {
      var data = []
      var file = fs.readFileSync(file,'utf8')
      var text = file.split('\n')
      text = text.slice(0,-1)
  
      text.forEach(el => {
          var tx = el.split(':')
          data.push(tx)
      });
      return data
  }
    ipcMain.on('startAuto', async (event, arg) => {
      event.returnValue = '';
      const page = await script.Init()
      const data = await readData(arg)
      for (let index = 0; index < data.length; index++) {
        var start = await script.Start(page,index,data[index][0],data[index][1])
        event.sender.send("done", start);
      }
      
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports.Init = init
