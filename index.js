const { ipcRenderer, remote } = require("electron")
const win = remote.getCurrentWindow()

document.querySelector("#menubar_itmm_toggle_dev").addEventListener("click", () =>
    remote.getCurrentWebContents().toggleDevTools()
)

document.querySelector(".codicon-chrome-close").addEventListener("click", () => 
    win.close()
)

document.querySelector(".codicon-chrome-minimize").addEventListener("click", () =>
    win.minimize()
)

document.querySelector(".codicon-chrome-maximize").addEventListener("click", () => {
    if (win.isMaximized())
        win.unmaximize()
    else
        win.maximize()
})

win.on("maximize", () => {
    let x = document.querySelector(".codicon-chrome-maximize")
    x.classList.remove("codicon-chrome-maximize")
    x.classList.add("codicon-chrome-restore")
})

win.on("unmaximize", () => {
    let x = document.querySelector(".codicon-chrome-restore")
    x.classList.remove("codicon-chrome-restore")
    x.classList.add("codicon-chrome-maximize")
})