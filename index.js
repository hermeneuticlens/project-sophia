const { ipcRenderer, remote } = require("electron")
const win = remote.getCurrentWindow()

// Window

$("#menubar_itmm_toggle_dev").on("click", () =>
    remote.getCurrentWebContents().toggleDevTools()
)

$(".codicon-chrome-close").on("click", () => 
    win.close()
)

$(".codicon-chrome-minimize").on("click", () =>
    win.minimize()
)

$(".codicon-chrome-maximize").on("click", () => {
    if (win.isMaximized())
        win.unmaximize()
    else
        win.maximize()
})

win.on("maximize", () => {
    let x = $(".codicon-chrome-maximize")
    x.removeClass("codicon-chrome-maximize")
    x.addClass("codicon-chrome-restore")
})

win.on("unmaximize", () => {
    let x = $(".codicon-chrome-restore")
    x.removeClass("codicon-chrome-restore")
    x.addClass("codicon-chrome-maximize")
})

// Data

ipcRenderer.on("update_list_done", (e, result, params) => {
    let list_html = `<div class="main_list_row header_row">`
    for (i = 0; i < params.length; i++)
        list_html += `<div class="main_list_col_${i}"> ${params[i]} </div>`
    
    list_html += `</div><div class="main_list scroll_enabled">`

    let is_even_row = false
    for (entry of result) {
        list_html += `<div class="main_list_row ${is_even_row ? "even_row" : "" }" entry_id="${entry["id"]}">`
        
        for (i = 0; i < params.length; i++)
            list_html += `<div class="main_list_col_${i}"> ${entry[params[i]]} </div>`
        
        list_html += `</div>`
        is_even_row = !is_even_row
    }
    list_html += `</div>
        <script>add_links_to_main_list_rows()</script>`
    $(".panel_center").html(list_html)
})

const add_links_to_main_list_rows = () => {
    $(".main_list_row").on("click", (e) => {
        let selected_id = $(e.currentTarget).attr("entry_id")
        ipcRenderer.send("item_panel:update", selected_id)
    })
}

ipcRenderer.on("item_panel:update:success", (e, result) => {
    $(".panel_right").html(result)
})