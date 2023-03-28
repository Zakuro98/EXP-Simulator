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

//smart autoprestige toggle
function smart_toggle() {
    if (!game.smartpr_toggle) {
        game.smartpr_toggle = true
        if (game.smartpr_mode === 0) autopr_switch(4)
        else if (game.smartpr_mode === 1) autopr_switch(2)
        document.getElementById("smart_toggle").innerHTML = "ENABLED"
        if (!meme)
            document.getElementById("smart_toggle").style.color = "#00ff00"
    } else {
        game.smartpr_toggle = false
        document.getElementById("smart_toggle").innerHTML = "DISABLED"
        if (!meme)
            document.getElementById("smart_toggle").style.color = "#ff0000"
    }
}

//initial smart autoprestige mode
function initial_switch(mode) {
    game.smartpr_start = mode

    document.getElementById("smart_peak_mode").className = "button"
    document.getElementById("smart_pp_mode").className = "button"

    if (meme) {
        document.getElementById("smart_peak_mode").disabled = false
        document.getElementById("smart_pp_mode").disabled = false
    }

    switch (mode) {
        case 0:
            document.getElementById("smart_peak_mode").className =
                "button mode_active"
            if (meme) document.getElementById("smart_peak_mode").disabled = true
            break
        case 1:
            document.getElementById("smart_pp_mode").className =
                "button mode_active"
            if (meme) document.getElementById("smart_pp_mode").disabled = true
            break
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
    smart_toggle()
    smart_toggle()
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
