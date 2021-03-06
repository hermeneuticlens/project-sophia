const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require("fs")

function createWindow () { 
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    minWidth: 800,
    minHeight: 600,
    frame: false, // https://www.electronjs.org/docs/api/frameless-window
    menuBarVisible: false,
    backgroundColor: "#222222",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  win.loadFile('html/index.html')
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

ipcMain.on("app:dom_ready", (e) => {
  const params = ["Title", "Author", "Year", "Publication"]
  fs.readFile("./test_data.json", (err, data) => {
    let result = []
    let data_json = JSON.parse(data)
    
    for (const entry of data_json) {
      let result_entry = {}
      result_entry.id = entry.id

      try {
        result_entry.Title = entry.title
        if (result_entry.Title == null) result_entry.Title = ""
      } catch { result_entry.Title = "" }

      try {
        result_entry.Author = entry.author[0].family
        if (result_entry.Author == null) result_entry.Author = ""
      } catch { result_entry.Author = "" }

      try {
        result_entry.Year = entry.issued["date-parts"][0][0]
        if (result_entry.Year == null) result_entry.Year = ""
      } catch { result_entry.Year = "" }

      try {
        result_entry.Publication = entry["container-title"]
        if(result_entry.Publication == null) result_entry.Publication = ""
      } catch { result_entry.Publication = "" }

      result.push(result_entry)
    }
    e.reply("update_list_done", result, params)
  })
})

let is_slow_loading = false

ipcMain.on("item_panel:update", (e, selected_id) => {
  params = ["Item Type", "Title", ""]

  if (is_slow_loading) {// simulate slow loading 
    console.log("slow loading")
    setTimeout( () => {  
      e.reply("item_panel:update:success", selected_id)
    }, 2000)
  } else {
    console.log("regular loading")
    e.reply("item_panel:update:success", selected_id)
  }
  is_slow_loading = !is_slow_loading
})


// ------------------------ settings ---------------------------------

ipcMain.on("settings:render", (e) => {
  e.reply("settings:render:complete", 
    fs.readFileSync(`./html/settings.html`, {encoding: "utf8", flag: "r"}))
})