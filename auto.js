//upgrade automation toggles
function up_toggle(id) {
    if (!game.autoup_toggle[id]) {
        game.autoup_toggle[id] = true
        switch (id) {
            case 0:
                //exp boost
                document.getElementById("boost_auto").innerHTML = "ON"
                if (!meme)
                    document.getElementById("boost_auto").style.color =
                        "#00ff00"
                break
            case 1:
                //autoclicker
                document.getElementById("auto_auto").innerHTML = "ON"
                if (!meme)
                    document.getElementById("auto_auto").style.color = "#00ff00"
                break
            case 2:
                //exp fluctuation
                document.getElementById("fluct_auto").innerHTML = "ON"
                if (!meme)
                    document.getElementById("fluct_auto").style.color =
                        "#00ff00"
                break
            case 3:
                //exp factor
                document.getElementById("fact_auto").innerHTML = "ON"
                if (!meme)
                    document.getElementById("fact_auto").style.color = "#00ff00"
                break
            case 4:
                //exp flux
                document.getElementById("flux_auto").innerHTML = "ON"
                if (!meme)
                    document.getElementById("flux_auto").style.color = "#00ff00"
                break
            case 5:
                //exp battery
                document.getElementById("battery_auto").innerHTML = "ON"
                if (!meme)
                    document.getElementById("battery_auto").style.color =
                        "#00ff00"
                break
        }
    } else {
        game.autoup_toggle[id] = false
        switch (id) {
            case 0:
                //exp boost
                document.getElementById("boost_auto").innerHTML = "OFF"
                if (!meme)
                    document.getElementById("boost_auto").style.color =
                        "#ff0000"
                break
            case 1:
                //autoclicker
                document.getElementById("auto_auto").innerHTML = "OFF"
                if (!meme)
                    document.getElementById("auto_auto").style.color = "#ff0000"
                break
            case 2:
                //exp fluctuation
                document.getElementById("fluct_auto").innerHTML = "OFF"
                if (!meme)
                    document.getElementById("fluct_auto").style.color =
                        "#ff0000"
                break
            case 3:
                //exp factor
                document.getElementById("fact_auto").innerHTML = "OFF"
                if (!meme)
                    document.getElementById("fact_auto").style.color = "#ff0000"
                break
            case 4:
                //exp flux
                document.getElementById("flux_auto").innerHTML = "OFF"
                if (!meme)
                    document.getElementById("flux_auto").style.color = "#ff0000"
                break
            case 5:
                //exp battery
                document.getElementById("battery_auto").innerHTML = "OFF"
                if (!meme)
                    document.getElementById("battery_auto").style.color =
                        "#ff0000"
                break
        }
    }
}

//prestige automation toggle
function pr_toggle() {
    if (!game.autopr_toggle) {
        game.autopr_toggle = true
        document.getElementById("amp_auto").innerHTML = "ON"
        if (!meme) document.getElementById("amp_auto").style.color = "#00ff00"
        document.getElementById("auto_toggle").innerHTML = "ENABLED"
        if (!meme)
            document.getElementById("auto_toggle").style.color = "#00ff00"
    } else {
        game.autopr_toggle = false
        document.getElementById("amp_auto").innerHTML = "OFF"
        if (!meme) document.getElementById("amp_auto").style.color = "#ff0000"
        document.getElementById("auto_toggle").innerHTML = "DISABLED"
        if (!meme)
            document.getElementById("auto_toggle").style.color = "#ff0000"
    }
}

//overclock automation toggle
function oc_toggle() {
    if (!game.autooc_toggle) {
        game.autooc_toggle = true
        document.getElementById("oc_auto").innerHTML = "ON"
        if (!meme) document.getElementById("oc_auto").style.color = "#00ff00"
    } else {
        game.autooc_toggle = false
        document.getElementById("oc_auto").innerHTML = "OFF"
        if (!meme) document.getElementById("oc_auto").style.color = "#ff0000"
    }
}

//discharge automation toggle
function ds_toggle() {
    game.autods_toggle++
    if (game.perks[11]) {
        if (game.autods_toggle > 2) game.autods_toggle = 0
    } else {
        if (game.autods_toggle > 1) game.autods_toggle = 0
    }
    switch (game.autods_toggle) {
        case 0:
            document.getElementById("dis_auto").innerHTML = "OFF"
            if (!meme)
                document.getElementById("dis_auto").style.color = "#ff0000"
            if (
                (game.pp_bought[32] && game.perks[9]) ||
                (game.pp_bought[35] && !game.perks[9])
            ) {
                document.getElementById("dis_text").style.display = "block"
                document.getElementById("dis_input").style.display = "block"
            }
            break
        case 1:
            document.getElementById("dis_auto").innerHTML = "ON"
            if (!meme)
                document.getElementById("dis_auto").style.color = "#00ff00"
            break
        case 2:
            document.getElementById("dis_auto").innerHTML = "SMART"
            if (!meme)
                document.getElementById("dis_auto").style.color = "#00ffff"
            document.getElementById("dis_text").style.display = "none"
            document.getElementById("dis_input").style.display = "none"
            break
    }
}

//prestige upgrade automation toggle
function pp_toggle() {
    if (!game.autopp_toggle) {
        game.autopp_toggle = true
        document.getElementById("autopp_toggle").innerHTML = "ENABLED"
        if (!meme)
            document.getElementById("autopp_toggle").style.color = "#00ff00"
    } else {
        game.autopp_toggle = false
        document.getElementById("autopp_toggle").innerHTML = "DISABLED"
        if (!meme)
            document.getElementById("autopp_toggle").style.color = "#ff0000"
    }
}

//capacitance mode switch automation toggle
function cp_toggle() {
    if (!game.autocp_toggle) {
        game.autocp_toggle = true
        document.getElementById("cap_auto").innerHTML = "ON"
        if (!meme) document.getElementById("cap_auto").style.color = "#00ff00"
        if (game.pp_bought[38]) set_capacitance(4)
        else if (game.pp_bought[37]) set_capacitance(3)
        else if (game.pp_bought[35]) set_capacitance(2)
        else if (game.pp_bought[32]) set_capacitance(1)
    } else {
        game.autocp_toggle = false
        document.getElementById("cap_auto").innerHTML = "OFF"
        if (!meme) document.getElementById("cap_auto").style.color = "#ff0000"
    }
}

//reboot automation toggle
function rb_toggle() {
    if (!game.confirmation) {
        if (!game.autorb_toggle) {
            game.autorb_toggle = true
            document.getElementById("watt_auto").innerHTML = "ON"
            if (!meme)
                document.getElementById("watt_auto").style.color = "#00ff00"
            document.getElementById("autorb_toggle").innerHTML = "ENABLED"
            if (!meme)
                document.getElementById("autorb_toggle").style.color = "#00ff00"
        } else {
            game.autorb_toggle = false
            document.getElementById("watt_auto").innerHTML = "OFF"
            if (!meme)
                document.getElementById("watt_auto").style.color = "#ff0000"
            document.getElementById("autorb_toggle").innerHTML = "DISABLED"
            if (!meme)
                document.getElementById("autorb_toggle").style.color = "#ff0000"
        }
    } else {
        alert(
            "Reboot Confirmation must be turned off to enable Reboot automation"
        )
    }
}

//quantize automation toggle
function qu_toggle() {
    if (!game.quantum_confirmation) {
        if (!game.autoqu_toggle) {
            game.autoqu_toggle = true
            document.getElementById("photon_auto").innerHTML = "ON"
            if (!meme)
                document.getElementById("photon_auto").style.color = "#00ff00"
            document.getElementById("autoqu_toggle").innerHTML = "ENABLED"
            if (!meme)
                document.getElementById("autoqu_toggle").style.color = "#00ff00"
        } else {
            game.autoqu_toggle = false
            document.getElementById("photon_auto").innerHTML = "OFF"
            if (!meme)
                document.getElementById("photon_auto").style.color = "#ff0000"
            document.getElementById("autoqu_toggle").innerHTML = "DISABLED"
            if (!meme)
                document.getElementById("autoqu_toggle").style.color = "#ff0000"
        }
    } else {
        alert(
            "Quantize Confirmation must be turned off to enable Quantize automation"
        )
    }
}

//pending reboot toggle
function pendingrb_toggle() {
    if (!game.autorb_pending) {
        game.autorb_pending = true
        document.getElementById("pendingrb_toggle").innerHTML = "YES"
    } else {
        game.autorb_pending = false
        document.getElementById("pendingrb_toggle").innerHTML = "NO"
    }
}

//reactor automation toggle
function hy_toggle() {
    if (!game.autohy_toggle) {
        game.autohy_toggle = true
        document.getElementById("autohy_toggle").innerHTML = "ENABLED"
        if (!meme)
            document.getElementById("autohy_toggle").style.color = "#00ff00"
    } else {
        game.autohy_toggle = false
        document.getElementById("autohy_toggle").innerHTML = "DISABLED"
        if (!meme)
            document.getElementById("autohy_toggle").style.color = "#ff0000"
    }
}

//collapse automation toggle
function cl_toggle() {
    if (!game.autocl_toggle) {
        game.autocl_toggle = true
        document.getElementById("collapse_auto").innerHTML = "ON"
        document.getElementById("collapse_auto").className =
            "button autoqu superlit"
    } else {
        game.autocl_toggle = false
        document.getElementById("collapse_auto").innerHTML = "OFF"
        document.getElementById("collapse_auto").className = "button autoqu lit"
    }
}

//growth factor automation toggle
function gr_toggle() {
    if (!game.autogr_toggle) {
        game.autogr_toggle = true
        document.getElementById("growth_auto").innerHTML = "ON"
        document.getElementById("growth_auto").className =
            "button autoqu superlit"
    } else {
        game.autogr_toggle = false
        document.getElementById("growth_auto").innerHTML = "OFF"
        document.getElementById("growth_auto").className = "button autoqu lit"
    }
}

//prism automation toggle
function ps_toggle() {
    if (!game.autops_toggle) {
        game.autops_toggle = true
        document.getElementById("prism_auto").innerHTML = "ON"
        document.getElementById("prism_auto").className =
            "button autoqu superlit"
    } else {
        game.autops_toggle = false
        document.getElementById("prism_auto").innerHTML = "OFF"
        document.getElementById("prism_auto").className = "button autoqu lit"
    }
}

//battery mode toggle
function battery_toggle() {
    if (game.battery_mode === 0) {
        game.battery_mode = 1
        document.getElementById("battery_mode").innerHTML = "IDLE"
        if (!meme)
            document.getElementById("battery_mode").style.color = "#00ffff"
    } else {
        game.battery_mode = 0
        document.getElementById("battery_mode").innerHTML = "ACTIVE"
        if (!meme)
            document.getElementById("battery_mode").style.color = "#ff0000"
    }
}

//switching autoprestige modes
function autopr_switch(mode) {
    game.autopr_mode = mode

    document.getElementById("auto_level").style.display = "none"
    document.getElementById("auto_amp").style.display = "none"
    document.getElementById("auto_pp").style.display = "none"
    document.getElementById("auto_time").style.display = "none"

    document.getElementById("level_mode").className = "button"
    document.getElementById("amp_mode").className = "button"
    document.getElementById("pp_mode").className = "button"
    document.getElementById("time_mode").className = "button"
    document.getElementById("peak_mode").className = "button"

    if (meme) {
        document.getElementById("level_mode").disabled = false
        document.getElementById("amp_mode").disabled = false
        document.getElementById("pp_mode").disabled = false
        document.getElementById("time_mode").disabled = false
        document.getElementById("peak_mode").disabled = false
    }

    switch (mode) {
        case 0:
            document.getElementById("level_mode").className =
                "button mode_active"
            document.getElementById("auto_level").style.display = "block"
            if (meme) document.getElementById("level_mode").disabled = true
            break
        case 1:
            document.getElementById("amp_mode").className = "button mode_active"
            document.getElementById("auto_amp").style.display = "block"
            if (meme) document.getElementById("amp_mode").disabled = true
            break
        case 2:
            document.getElementById("pp_mode").className = "button mode_active"
            document.getElementById("auto_pp").style.display = "block"
            if (meme) document.getElementById("pp_mode").disabled = true
            break
        case 3:
            document.getElementById("time_mode").className =
                "button mode_active"
            document.getElementById("auto_time").style.display = "block"
            if (meme) document.getElementById("time_mode").disabled = true
            break
        case 4:
            document.getElementById("peak_mode").className =
                "button mode_active"
            if (meme) document.getElementById("peak_mode").disabled = true
            break
    }
}

//switching prestige upgrade automation priority modes
function pp_switch(mode) {
    game.autopp_mode = mode

    document.getElementById("ignore_mode").className = "button"
    document.getElementById("weak_mode").className = "button"
    document.getElementById("strict_mode").className = "button"

    if (meme) {
        document.getElementById("ignore_mode").disabled = false
        document.getElementById("weak_mode").disabled = false
        document.getElementById("strict_mode").disabled = false
    }

    switch (mode) {
        case 0:
            document.getElementById("ignore_mode").className =
                "button mode_active"
            if (meme) document.getElementById("ignore_mode").disabled = true
            break
        case 1:
            document.getElementById("weak_mode").className =
                "button mode_active"
            if (meme) document.getElementById("weak_mode").disabled = true
            break
        case 2:
            document.getElementById("strict_mode").className =
                "button mode_active"
            if (meme) document.getElementById("strict_mode").disabled = true
            break
    }
}

//switching autoreboot modes
function autorb_switch(mode) {
    game.autorb_mode = mode

    document.getElementById("auto_watts").style.display = "none"
    document.getElementById("auto_time2").style.display = "none"

    document.getElementById("watts_mode").className = "button"
    document.getElementById("time_mode2").className = "button"

    if (meme) {
        document.getElementById("watts_mode").disabled = false
        document.getElementById("time_mode2").disabled = false
    }

    switch (mode) {
        case 0:
            document.getElementById("watts_mode").className =
                "button mode_active"
            document.getElementById("auto_watts").style.display = "block"
            if (meme) document.getElementById("watts_mode").disabled = true
            break
        case 1:
            document.getElementById("time_mode2").className =
                "button mode_active"
            document.getElementById("auto_time2").style.display = "block"
            if (meme) document.getElementById("time_mode2").disabled = true
            break
    }
}

//switching autoquantize modes
function autoqu_switch(mode) {
    game.autoqu_mode = mode

    document.getElementById("auto_photons").style.display = "none"
    document.getElementById("auto_time3").style.display = "none"
    document.getElementById("auto_step").style.display = "none"
    document.getElementById("step_goal").style.display = "none"

    document.getElementById("photons_mode").className = "button"
    document.getElementById("time_mode3").className = "button"
    document.getElementById("step_mode").className = "button"

    if (meme) {
        document.getElementById("photons_mode").disabled = false
        document.getElementById("time_mode3").disabled = false
        document.getElementById("step_mode").disabled = false
    }

    switch (mode) {
        case 0:
            document.getElementById("photons_mode").className =
                "button mode_active"
            document.getElementById("auto_photons").style.display = "block"
            if (meme) document.getElementById("photons_mode").disabled = true
            break
        case 1:
            document.getElementById("time_mode3").className =
                "button mode_active"
            document.getElementById("auto_time3").style.display = "block"
            if (meme) document.getElementById("time_mode3").disabled = true
            break
        case 2:
            document.getElementById("step_mode").className =
                "button mode_active"
            document.getElementById("auto_step").style.display = "block"
            document.getElementById("step_goal").style.display = "block"
            if (meme) document.getElementById("step_mode").disabled = true
            break
    }
}

//toggling all automation
function toggle_all_automation() {
    let all_off = true
    for (let i = 0; i < 6; i++) {
        if (game.autoup_toggle[i]) all_off = false
    }
    if (
        game.autopr_toggle ||
        game.autooc_toggle ||
        game.autods_toggle >= 1 ||
        game.autopp_toggle ||
        game.autocp_toggle ||
        game.autorb_toggle ||
        game.smartpr_toggle ||
        game.autohy_toggle ||
        game.autoqu_toggle
    )
        all_off = false

    if (all_off) {
        for (let i = 0; i < 6; i++) {
            game.autoup_toggle[i] = true
        }
        game.autopr_toggle = true
        game.autooc_toggle = true
        game.autods_toggle = 1
        game.autopp_toggle = true
        game.autocp_toggle = true
        game.autorb_toggle = true
        game.smartpr_toggle = true
        game.autohy_toggle = true
        game.autoqu_toggle = true
    } else {
        for (let i = 0; i < 6; i++) {
            game.autoup_toggle[i] = false
        }
        game.autopr_toggle = false
        game.autooc_toggle = false
        game.autods_toggle = 0
        game.autopp_toggle = false
        game.autocp_toggle = false
        game.autorb_toggle = false
        game.smartpr_toggle = false
        game.autohy_toggle = false
        game.autoqu_toggle = false
    }

    for (let i = 0; i < 6; i++) {
        up_toggle(i)
        up_toggle(i)
    }
    pr_toggle()
    pr_toggle()
    oc_toggle()
    oc_toggle()
    ds_toggle()
    ds_toggle()
    if (game.perks[11]) ds_toggle()
    pp_toggle()
    pp_toggle()
    cp_toggle()
    cp_toggle()
    rb_toggle()
    rb_toggle()
    hy_toggle()
    hy_toggle()
    qu_toggle()
    qu_toggle()
    battery_toggle()
    battery_toggle()
}

//changing advanced auto-prestige mode
function smart_mode(mode) {
    switch (mode) {
        case 0:
            game.smartpr_mode = mode

            document.getElementById("edit_mode").className =
                "button smart_button mode_active"
            document.getElementById("play_mode").className =
                "button smart_button"
            document.getElementById("pause_mode").className =
                "button smart_button"
            document.getElementById("stop_mode").className =
                "button smart_button"
            document.getElementById("smart_footer").style.display = "flex"
            document.getElementById("smart_save").style.display = "inline"
            game.smartpr_phase = 0
            game.smartpr_condition = 0
            for (const p of game.smartpr_queue) {
                let block =
                    document.getElementById("smart_panel").children[p.id]
                let index = block.querySelector("div")
                let number = index.querySelector("p")
                let setup = block.querySelectorAll("div")[1]
                let display_block = block.querySelectorAll("div")[5]
                let delete_block = block.querySelectorAll("div")[6]

                setup.style.display = "block"
                display_block.style.display = "none"
                delete_block.style.display = "flex"
                number.className = "smart_number"
            }
            break
        case 1:
            if (game.smartpr_queue.length >= 1) {
                if (game.smartpr_mode === 0 || game.smartpr_mode === 3) {
                    autopr_switch(game.smartpr_queue[0].mode)
                    if (game.smartpr_queue[0].update) {
                        switch (game.smartpr_queue[0].mode) {
                            case 0:
                                document.getElementById("level_input").value =
                                    game.smartpr_queue[0].goal
                                break
                            case 1:
                                document.getElementById("amp_input").value =
                                    game.smartpr_queue[0].goal
                                break
                            case 2:
                                document.getElementById("pp_input").value =
                                    game.smartpr_queue[0].goal
                                break
                            case 3:
                                document.getElementById("time_input").value =
                                    game.smartpr_queue[0].goal
                                break
                        }
                    }
                }

                game.smartpr_mode = mode

                document.getElementById("play_mode").className =
                    "button smart_button mode_active"
                document.getElementById("edit_mode").className =
                    "button smart_button"
                document.getElementById("pause_mode").className =
                    "button smart_button"
                document.getElementById("stop_mode").className =
                    "button smart_button"
                document.getElementById("smart_footer").style.display = "none"
                document.getElementById("smart_save").style.display = "none"
                for (const p of game.smartpr_queue) {
                    let block =
                        document.getElementById("smart_panel").children[p.id]
                    let setup = block.querySelectorAll("div")[1]
                    let display_block = block.querySelectorAll("div")[5]
                    let delete_block = block.querySelectorAll("div")[6]

                    setup.style.display = "none"
                    display_block.style.display = "block"
                    delete_block.style.display = "none"
                }
            }
            break
        case 2:
            if (game.smartpr_queue.length >= 1) {
                game.smartpr_mode = mode

                document.getElementById("pause_mode").className =
                    "button smart_button mode_active"
                document.getElementById("edit_mode").className =
                    "button smart_button"
                document.getElementById("play_mode").className =
                    "button smart_button"
                document.getElementById("stop_mode").className =
                    "button smart_button"
                document.getElementById("smart_footer").style.display = "none"
                document.getElementById("smart_save").style.display = "none"
                for (const p of game.smartpr_queue) {
                    let block =
                        document.getElementById("smart_panel").children[p.id]
                    let setup = block.querySelectorAll("div")[1]
                    let display_block = block.querySelectorAll("div")[5]
                    let delete_block = block.querySelectorAll("div")[6]

                    setup.style.display = "none"
                    display_block.style.display = "block"
                    delete_block.style.display = "none"
                }
            }
            break
        case 3:
            if (game.smartpr_queue.length >= 1) {
                game.smartpr_mode = mode

                document.getElementById("stop_mode").className =
                    "button smart_button mode_active"
                document.getElementById("edit_mode").className =
                    "button smart_button"
                document.getElementById("play_mode").className =
                    "button smart_button"
                document.getElementById("pause_mode").className =
                    "button smart_button"
                document.getElementById("smart_footer").style.display = "none"
                document.getElementById("smart_save").style.display = "none"
                game.smartpr_phase = 0
                game.smartpr_condition = 0
                for (const p of game.smartpr_queue) {
                    let block =
                        document.getElementById("smart_panel").children[p.id]
                    let index = block.querySelector("div")
                    let number = index.querySelector("p")
                    let setup = block.querySelectorAll("div")[1]
                    let display_block = block.querySelectorAll("div")[5]
                    let delete_block = block.querySelectorAll("div")[6]

                    setup.style.display = "none"
                    display_block.style.display = "block"
                    delete_block.style.display = "none"
                    number.className = "smart_number"

                    let display_text = display_block.querySelector("p")
                    let str = "Set mode to "
                    switch (p.mode) {
                        case 0:
                            str += "LEVEL"
                            break
                        case 1:
                            str += "AMP"
                            break
                        case 2:
                            str += "PP"
                            break
                        case 3:
                            str += "TIME"
                            break
                        case 4:
                            str += "PEAK"
                            break
                    }
                    if (p.update && p.mode <= 3) {
                        str += "<br>Set goal to "
                        switch (p.mode) {
                            case 0:
                                str += "LVL " + format_lvl(p.goal)
                                break
                            case 1:
                                str += format_num(p.goal) + " AMP"
                                break
                            case 2:
                                str += format_num(p.goal) + " PP"
                                break
                            case 3:
                                str += format_eff(p.goal) + " seconds"
                                break
                        }
                    }
                    str += "<br>Wait "
                    switch (p.until) {
                        case 0:
                            str +=
                                "until highest LVL " + format_lvl(p.condition)
                            break
                        case 1:
                            str +=
                                "until " +
                                format_num(p.condition) +
                                " total AMP"
                            break
                        case 2:
                            str +=
                                "until " + format_num(p.condition) + " total PP"
                            break
                        case 3:
                            str +=
                                "for " +
                                format_time(p.condition * game.tickspeed)
                            break
                        case 4:
                            if (p.condition === 1)
                                str +=
                                    "until " +
                                    format_num(p.condition) +
                                    " prestige happens"
                            else
                                str +=
                                    "until " +
                                    format_num(p.condition) +
                                    " prestiges happen"
                            break
                        case 5:
                            str += "until overclocker activates"
                            break
                    }
                    display_text.innerHTML = str
                }
            }
            break
    }
}

//toggling advanced auto-prestige repeat
function smart_repeat() {
    if (!game.smartpr_repeat) {
        game.smartpr_repeat = true
        document.getElementById("smart_repeat").className =
            "button smart_button mode_active"
    } else {
        game.smartpr_repeat = false
        document.getElementById("smart_repeat").className =
            "button smart_button"
    }
}

//toggling whether advanced auto-prestige should start automatically on reboot
function smart_start() {
    if (!game.smartpr_start) {
        game.smartpr_start = true
        document.getElementById("smart_start").className =
            "button smart_button mode_active"
    } else {
        game.smartpr_start = false
        document.getElementById("smart_start").className = "button smart_button"
    }
}

//selecting an advanced auto-prestige preset
function smart_select(preset) {
    if (preset !== undefined) game.smartpr_select = preset
    else game.smartpr_select++
    if (game.smartpr_select >= 3) game.smartpr_select = 0
    document.getElementById("smart_select").innerHTML =
        "PRESET " + (game.smartpr_select + 1)
}

//generating ui elements for a new auto-prestige phase
function phase_ui(new_phase) {
    let number = document.createElement("P")
    number.innerHTML = format_num(new_phase.id + 1)
    number.className = "smart_number"
    let index = document.createElement("DIV")
    index.className = "smart_index"
    index.appendChild(number)

    let mode_text = document.createElement("P")
    mode_text.innerHTML = "Set mode to: "
    mode_text.className = "goal_text"
    let mode_button = document.createElement("BUTTON")
    switch (new_phase.mode) {
        case 0:
            mode_button.innerHTML = "LEVEL"
            break
        case 1:
            mode_button.innerHTML = "AMP"
            break
        case 2:
            mode_button.innerHTML = "PP"
            break
        case 3:
            mode_button.innerHTML = "TIME"
            break
        case 4:
            mode_button.innerHTML = "PEAK"
            break
    }
    mode_button.className = "button smart_button"
    mode_button.addEventListener("click", function () {
        phase_mode(new_phase.id)
    })
    let mode_block = document.createElement("DIV")
    mode_block.appendChild(mode_text)
    mode_block.appendChild(mode_button)

    let goal_text = document.createElement("P")
    goal_text.innerHTML = "Set goal to: "
    goal_text.className = "goal_text"
    let goal_input = document.createElement("INPUT")
    goal_input.type = "number"
    goal_input.value = ""
    if (new_phase.update) goal_input.value = new_phase.goal
    goal_input.className = "goal_input"
    let goal_text2 = document.createElement("P")
    goal_text2.innerHTML = " (leave blank for no change)"
    goal_text2.className = "goal_text"
    let goal_block = document.createElement("DIV")
    goal_block.className = "smart_lower_line"
    if (new_phase.mode === 4) goal_block.style.display = "none"
    goal_block.appendChild(goal_text)
    goal_block.appendChild(goal_input)
    goal_block.appendChild(goal_text2)

    let until_text = document.createElement("P")
    until_text.innerHTML = "Wait until: "
    until_text.className = "goal_text"
    let until_button = document.createElement("BUTTON")
    until_button.className = "button smart_button"
    until_button.addEventListener("click", function () {
        phase_until(new_phase.id)
    })
    let until_text2 = document.createElement("P")
    until_text2.className = "goal_text"
    let until_input = document.createElement("INPUT")
    until_input.type = "number"
    until_input.value = new_phase.condition
    until_input.className = "goal_input"
    let until_text3 = document.createElement("P")
    until_text3.className = "goal_text"
    switch (new_phase.until) {
        case 0:
            until_button.innerHTML = "LEVEL"
            until_text2.innerHTML = " Highest LVL "
            until_input.style.display = "inline"
            until_text3.innerHTML = ""
            break
        case 1:
            until_button.innerHTML = "AMP"
            until_text2.innerHTML = " "
            until_input.style.display = "inline"
            until_text3.innerHTML = " total AMP"
            break
        case 2:
            until_button.innerHTML = "PP"
            until_text2.innerHTML = " "
            until_input.style.display = "inline"
            until_text3.innerHTML = " total PP"
            break
        case 3:
            until_button.innerHTML = "TIME"
            until_text2.innerHTML = " "
            until_input.style.display = "inline"
            until_text3.innerHTML = " seconds"
            break
        case 4:
            until_button.innerHTML = "PRESTIGE"
            until_text2.innerHTML = " "
            until_input.style.display = "inline"
            until_text3.innerHTML = " prestiges"
            break
        case 5:
            until_button.innerHTML = "OVERCLOCKER"
            until_text2.innerHTML = " when overclocker activates"
            until_input.style.display = "none"
            until_text3.innerHTML = ""
            break
    }
    let until_block = document.createElement("DIV")
    until_block.className = "smart_lower_line"
    until_block.appendChild(until_text)
    until_block.appendChild(until_button)
    until_block.appendChild(until_text2)
    until_block.appendChild(until_input)
    until_block.appendChild(until_text3)

    let setup = document.createElement("DIV")
    setup.style.flexGrow = "0"
    setup.appendChild(mode_block)
    setup.appendChild(goal_block)
    setup.appendChild(until_block)

    let display_text = document.createElement("P")
    display_text.className = "goal_text"
    let display_block = document.createElement("DIV")
    display_block.style.flexGrow = "0"
    display_block.style.display = "none"
    display_block.appendChild(display_text)

    let delete_button = document.createElement("BUTTON")
    delete_button.innerHTML = "DELETE"
    delete_button.className = "button smart_button"
    delete_button.addEventListener("click", function () {
        phase_delete(new_phase.id)
    })
    let delete_block = document.createElement("DIV")
    delete_block.className = "smart_delete"
    delete_block.appendChild(delete_button)

    let full_block = document.createElement("DIV")
    full_block.className = "smart_block"
    full_block.appendChild(index)
    full_block.appendChild(setup)
    full_block.appendChild(display_block)
    full_block.appendChild(delete_block)

    document.getElementById("smart_panel").appendChild(full_block)
}

//saving current phase loadout to a preset
function smart_save(preset) {
    game.smartpr_presets[preset] = JSON.parse(
        JSON.stringify(game.smartpr_queue)
    )
}

//loading phase loadout from a preset, or intiailizing when the game is first loaded
function smart_load(preset) {
    if (preset >= 0) {
        game.smartpr_queue = JSON.parse(
            JSON.stringify(game.smartpr_presets[preset])
        )
        if (game.smartpr_mode === 1) {
            game.smartpr_phase = 0
            game.smartpr_condition = 0
        }
    }

    document.getElementById("smart_panel").innerHTML = ""
    for (const p of game.smartpr_queue) {
        phase_ui(p)
    }
    smart_mode(game.smartpr_mode)
}

//creating a new auto-prestige phase
function new_phase() {
    let new_phase = new phase(0, false, undefined, 4, 1)
    game.smartpr_queue.push(new_phase)
    phase_ui(new_phase)
}

//clearing all auto-prestige phases
function clear_phases() {
    game.smartpr_queue = []
    document.getElementById("smart_panel").innerHTML = ""
}

//choosing which auto-prestige mode to switch to when this phase starts
function phase_mode(id) {
    game.smartpr_queue[id].mode++
    if (game.smartpr_queue[id].mode >= 5) game.smartpr_queue[id].mode = 0

    let block = document.getElementById("smart_panel").children[id]
    let setup = block.querySelectorAll("div")[1]
    let mode = setup.querySelector("div")
    let button = mode.querySelector("button")
    let goal = setup.querySelectorAll("div")[1]

    switch (game.smartpr_queue[id].mode) {
        case 0:
            button.innerHTML = "LEVEL"
            goal.style.display = "block"
            break
        case 1:
            button.innerHTML = "AMP"
            goal.style.display = "block"
            break
        case 2:
            button.innerHTML = "PP"
            goal.style.display = "block"
            break
        case 3:
            button.innerHTML = "TIME"
            goal.style.display = "block"
            break
        case 4:
            button.innerHTML = "PEAK"
            goal.style.display = "none"
            break
    }
}

//choosing what criteria to wait for to proceed to the next phase
function phase_until(id) {
    game.smartpr_queue[id].until++
    if (game.smartpr_queue[id].until >= 6) game.smartpr_queue[id].until = 0

    let block = document.getElementById("smart_panel").children[id]
    let setup = block.querySelectorAll("div")[1]
    let until = setup.querySelectorAll("div")[2]
    let button = until.querySelector("button")
    let input = until.querySelector("input")
    let text = until.querySelectorAll("p")[1]
    let text2 = until.querySelectorAll("p")[2]

    switch (game.smartpr_queue[id].until) {
        case 0:
            button.innerHTML = "LEVEL"
            input.style.display = "inline"
            text.innerHTML = " Highest LVL "
            text2.innerHTML = ""
            break
        case 1:
            button.innerHTML = "AMP"
            input.style.display = "inline"
            text.innerHTML = " "
            text2.innerHTML = " total AMP"
            break
        case 2:
            button.innerHTML = "PP"
            input.style.display = "inline"
            text.innerHTML = " "
            text2.innerHTML = " total PP"
            break
        case 3:
            button.innerHTML = "TIME"
            input.style.display = "inline"
            text.innerHTML = " "
            text2.innerHTML = " seconds"
            break
        case 4:
            button.innerHTML = "PRESTIGE"
            input.style.display = "inline"
            text.innerHTML = " "
            text2.innerHTML = " prestiges"
            break
        case 5:
            button.innerHTML = "OVERCLOCKER"
            input.style.display = "none"
            text.innerHTML = " when overclocker activates"
            text2.innerHTML = ""
            break
    }
}

//deleting this phase
function phase_delete(id) {
    document.getElementById("smart_panel").children[id].remove()
    game.smartpr_queue.splice(id, 1)

    for (let i = id; i < game.smartpr_queue.length; i++) {
        game.smartpr_queue[i].id = i

        let block = document.getElementById("smart_panel").children[i]
        let index = block.querySelector("div")
        let number = index.querySelector("p")
        number.innerHTML = format_num(i + 1)
    }
}
