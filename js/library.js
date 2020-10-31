import { Utilities } from "./utilities.js"

export class Library {
    static initialize () {
        Utilities.ipc_on("update_list_done", (e, result, params) => {
            let list_html = `<div class="main_list_row header_row">`
            for (let i = 0; i < params.length; i++)
                list_html += `<div class="main_list_col_${i}"> ${params[i]} </div>`
            
            list_html += `</div><div class="main_list scroll_enabled">`

            let is_even_row = false
            for (let entry of result) {
                list_html += `<div class="main_list_row ${is_even_row ? "even_row" : "" }" entry_id="${entry["id"]}">`
                
                for (let i = 0; i < params.length; i++)
                    list_html += `<div class="main_list_col_${i}"> ${entry[params[i]]} </div>`
                
                list_html += `</div>`
                is_even_row = !is_even_row
            }
            list_html += `</div>`
            $(".panel_center").html(list_html)
            
            $(() => {
                $(".main_list_row").on("click", (e) => {
                    let selected_id = $(e.currentTarget).attr("entry_id")
                    Utilities.ipc_send("item_panel:update", selected_id)
                })
            })
        })

        Utilities.ipc_on("item_panel:update:success", (e, result) => {
            $(".panel_right").html(result)
        })
    }
}