const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require("fs")

function createWindow () { 
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    frame: false, // https://www.electronjs.org/docs/api/frameless-window
    menuBarVisible: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.webContents.on("dom-ready", (e) => {
    const params = ["Title", "Author"] //, "Year", "Publication"
    fs.readFile("test_data.json", (err, data) => {
      let result = []
      let data_json = JSON.parse(data)
      
      for (const entry of data_json) {
        let result_entry = {}, temp_value
        result_entry.id = entry.id

        try {
          temp_value = entry.title
        } finally {
          result_entry.Title = temp_value == null ? "" : temp_value
        }

        try {
          temp_value = entry.author[0].family
        } catch { console.log("empty stuff") } finally {
        result_entry.Author = temp_value == null ? "" : temp_value
        }

        result.push(result_entry)
      }
      win.webContents.send("update_list_done", result, params)
    })
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
