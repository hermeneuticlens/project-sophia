const { ipcRenderer } = require("electron")

document.querySelector("#menubar_itmm_toggle_dev").addEventListener("click", 
    e => ipcRenderer.send("toggle_dev_tools")
)