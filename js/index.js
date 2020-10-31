const { remote } = require("electron")
import { Utilities } from "./utilities.js"
import { Settings } from "./settings.js"

// Window

const win = remote.getCurrentWindow()

$("#menubar_item_settings").on("click", (e) => {
    if ($(".settings_panel").length == 0) {
        Utilities.ipc_send("settings:render")
        Utilities.is_block_sending = true;
    } else {
        $(".settings_panel").remove()
    }
})

Utilities.ipc_on("settings:render:complete", (e, content) => {
    $(".body_wrapper").append(content);
    Settings.init();
    Utilities.is_block_sending = false;
})

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

// Load data

import { Library } from "./library.js"

$(() => {
    Utilities.ipc_send("app:dom_ready")
    Library.initialize()
})
