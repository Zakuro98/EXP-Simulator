//upgrade automation toggles
function up_toggle(id) {
    if (!game.autoup_toggle[id]) {
        game.autoup_toggle[id] = true
        switch (id) {
            case 0:
                //exp boost
                document.getElementById("boost_auto").innerText = "ON"
                document.getElementById("boost_auto").style.color = "#00ff00"
                break
            case 1:
                //autoclicker
                document.getElementById("auto_auto").innerText = "ON"
                document.getElementById("auto_auto").style.color = "#00ff00"
                break
            case 2:
                //exp fluctuation
                document.getElementById("fluct_auto").innerText = "ON"
                document.getElementById("fluct_auto").style.color = "#00ff00"
                break
            case 3:
                //exp factor
                document.getElementById("fact_auto").innerText = "ON"
                document.getElementById("fact_auto").style.color = "#00ff00"
                break
            case 4:
                //exp flux
                document.getElementById("flux_auto").innerText = "ON"
                document.getElementById("flux_auto").style.color = "#00ff00"
                break
            case 5:
                //exp battery
                document.getElementById("battery_auto").innerText = "ON"
                document.getElementById("battery_auto").style.color = "#00ff00"
                break
        }
    } else {
        game.autoup_toggle[id] = false
        switch (id) {
            case 0:
                //exp boost
                document.getElementById("boost_auto").innerText = "OFF"
                document.getElementById("boost_auto").style.color = "#ff0000"
                break
            case 1:
                //autoclicker
                document.getElementById("auto_auto").innerText = "OFF"
                document.getElementById("auto_auto").style.color = "#ff0000"
                break
            case 2:
                //exp fluctuation
                document.getElementById("fluct_auto").innerText = "OFF"
                document.getElementById("fluct_auto").style.color = "#ff0000"
                break
            case 3:
                //exp factor
                document.getElementById("fact_auto").innerText = "OFF"
                document.getElementById("fact_auto").style.color = "#ff0000"
                break
            case 4:
                //exp flux
                document.getElementById("flux_auto").innerText = "OFF"
                document.getElementById("flux_auto").style.color = "#ff0000"
                break
            case 5:
                //exp battery
                document.getElementById("battery_auto").innerText = "OFF"
                document.getElementById("battery_auto").style.color = "#ff0000"
                break
        }
    }
}

//prestige automation toggle
function pr_toggle() {
    if (!game.autopr_toggle) {
        game.autopr_toggle = true
        document.getElementById("amp_auto").innerText = "ON"
        document.getElementById("amp_auto").style.color = "#00ff00"
    } else {
        game.autopr_toggle = false
        document.getElementById("amp_auto").innerText = "OFF"
        document.getElementById("amp_auto").style.color = "#ff0000"
    }
}

//overclock automation toggle
function oc_toggle() {
    if (!game.autooc_toggle) {
        game.autooc_toggle = true
        document.getElementById("oc_auto").innerText = "ON"
        document.getElementById("oc_auto").style.color = "#00ff00"
    } else {
        game.autooc_toggle = false
        document.getElementById("oc_auto").innerText = "OFF"
        document.getElementById("oc_auto").style.color = "#ff0000"
    }
}

//discharge automation toggle
function ds_toggle() {
    if (!game.autods_toggle) {
        game.autods_toggle = true
        document.getElementById("dis_auto").innerText = "ON"
        document.getElementById("dis_auto").style.color = "#00ff00"
    } else {
        game.autods_toggle = false
        document.getElementById("dis_auto").innerText = "OFF"
        document.getElementById("dis_auto").style.color = "#ff0000"
    }
}

//prestige upgrade automation toggle
function pp_toggle() {
    if (!game.autopp_toggle) {
        game.autopp_toggle = true
        document.getElementById("autopp_toggle").innerText = "ENABLED"
        document.getElementById("autopp_toggle").style.color = "#00ff00"
    } else {
        game.autopp_toggle = false
        document.getElementById("autopp_toggle").innerText = "DISABLED"
        document.getElementById("autopp_toggle").style.color = "#ff0000"
    }
}

//battery mode toggle
function battery_toggle() {
    if (game.battery_mode === 0) {
        game.battery_mode = 1
        click_update()
        document.getElementById("boost").innerText =
            "EXP Boost\nTier " +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_add *
                        game.global_multiplier *
                        game.exp_battery *
                        game.cap_boost
                )
            ) +
            " EXP/click"
        if (game.autods_toggle && game.autods_goal === 0)
            document.getElementById("boost").innerText =
                "EXP Boost\nTier " +
                format_num(
                    game.boost_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_add *
                            game.global_multiplier *
                            game.exp_battery *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " EXP/click"
        document.getElementById("fluct").innerText =
            "EXP Fluctuation\nTier " +
            format_num(
                game.fluct_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_fluct *
                        game.global_multiplier *
                        game.exp_battery *
                        game.cap_boost
                )
            ) +
            " max extra EXP/click"
        if (game.autods_toggle && game.autods_goal === 0)
            document.getElementById("fluct").innerText =
                "EXP Fluctuation\nTier " +
                format_num(
                    game.fluct_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_fluct *
                            game.global_multiplier *
                            game.exp_battery *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " max extra EXP/click"
        document.getElementById("battery_mode").innerText = "IDLE"
        document.getElementById("battery_mode").style.color = "#00ffff"
    } else {
        game.battery_mode = 0
        click_update()
        document.getElementById("battery_mode").innerText = "ACTIVE"
        document.getElementById("boost").innerText =
            "EXP Boost\nTier " +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_add * game.global_multiplier * game.cap_boost
                )
            ) +
            " EXP/click"
        if (game.autods_toggle && game.autods_goal === 0)
            document.getElementById("boost").innerText =
                "EXP Boost\nTier " +
                format_num(
                    game.boost_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_add *
                            game.global_multiplier *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " EXP/click"
        document.getElementById("fluct").innerText =
            "EXP Fluctuation\nTier " +
            format_num(
                game.fluct_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(
                Math.round(
                    game.exp_fluct * game.global_multiplier * game.cap_boost
                )
            ) +
            " max extra EXP/click"
        if (game.autods_toggle && game.autods_goal === 0)
            document.getElementById("fluct").innerText =
                "EXP Fluctuation\nTier " +
                format_num(
                    game.fluct_tier + game.starter_kit + game.generator_kit
                ) +
                ": +" +
                format_num(
                    Math.round(
                        game.exp_fluct *
                            game.global_multiplier *
                            (game.cap_boost +
                                (1 - game.cap_boost) * game.cap_mode * 2)
                    )
                ) +
                " max extra EXP/click"
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

    switch (mode) {
        case 0:
            document.getElementById("level_mode").className =
                "button mode_active"
            document.getElementById("auto_level").style.display = "block"
            break
        case 1:
            document.getElementById("amp_mode").className = "button mode_active"
            document.getElementById("auto_amp").style.display = "block"
            break
        case 2:
            document.getElementById("pp_mode").className = "button mode_active"
            document.getElementById("auto_pp").style.display = "block"
            break
        case 3:
            document.getElementById("time_mode").className =
                "button mode_active"
            document.getElementById("auto_time").style.display = "block"
            break
        case 4:
            document.getElementById("peak_mode").className =
                "button mode_active"
            break
    }
}

//switching prestige upgrade automation priority modes
function pp_switch(mode) {
    game.autopp_mode = mode

    document.getElementById("ignore_mode").className = "button"
    document.getElementById("weak_mode").className = "button"
    document.getElementById("strict_mode").className = "button"

    switch (mode) {
        case 0:
            document.getElementById("ignore_mode").className =
                "button mode_active"
            break
        case 1:
            document.getElementById("weak_mode").className =
                "button mode_active"
            break
        case 2:
            document.getElementById("strict_mode").className =
                "button mode_active"
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
        game.autods_toggle ||
        game.autopp_toggle
    )
        all_off = false

    if (all_off) {
        for (let i = 0; i < 6; i++) {
            game.autoup_toggle[i] = true
        }
        game.autopr_toggle = true
        game.autooc_toggle = true
        game.autods_toggle = true
        game.autopp_toggle = true
    } else {
        for (let i = 0; i < 6; i++) {
            game.autoup_toggle[i] = false
        }
        game.autopr_toggle = false
        game.autooc_toggle = false
        game.autods_toggle = false
        game.autopp_toggle = false
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
    pp_toggle()
    pp_toggle()
    battery_toggle()
    battery_toggle()
}
