const { ipcRenderer } = require("electron")
import { Window } from "./window.js"

export class Utilities {
    static loading_counter = 0

    static ipc_send(...args) {
        this.loading_counter ++
        if(this.loading_counter == 1)
            Window.start_loading_animation()
        ipcRenderer.send(...args)
    }

    static ipc_on(channel, listener) {
        ipcRenderer.on(channel, (...args) => {
            listener(...args);
            this.loading_counter --
            if (this.loading_counter <= 0) {
                this.loading_counter = 0
                Window.stop_loading_animation()
            }
        })
    }
}