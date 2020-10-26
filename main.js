const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow () {
  const window = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.setMenuBarVisibility(false)
  window.loadFile('index.html')
  window.webContents.openDevTools()
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

// -----------------------------------------------

ipcMain.on("toggle_dev_tools", e => {
  e.sender.webContents.toggleDevTools()
})