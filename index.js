const { ipcRenderer, remote } = require("electron")
const win = remote.getCurrentWindow()

// Window

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

// Data

ipcRenderer.on("update_list_done", (e, result, params) => {
    let list_html = `<div class="main_list_row header_row">`
    for (param of params)
        list_html += `<div> ${param} </div>`
    
    list_html += `</div><div class="main_list scroll_enabled">`
    for (entry of result) {
        list_html += `<div class="main_list_row" entry_id="${entry["id"]}">`
        
        for (param of params)
            list_html += `<div> ${entry[param]} </div>`
        
        list_html += `</div>`
    }
    list_html += `</div>`
    document.querySelector(".panel_center").innerHTML = list_html
})