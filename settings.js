//toggle work theme
function work() {
    if (game.work) {
        game.work = false
        document.getElementById("work_button").innerHTML = "DISABLED"
    } else {
        game.work = true
        document.getElementById("work_button").innerHTML = "ENABLED"
    }
    save()
    window.location.reload()
}

//notation switching
function notation() {
    game.notation += 1
    if (game.notation >= 14) game.notation = 0
    pp_update()
    switch (game.notation) {
        case 0:
            document.getElementById("notation_button").innerHTML = "LONG"
            break
        case 1:
            document.getElementById("notation_button").innerHTML = "STANDARD"
            break
        case 2:
            document.getElementById("notation_button").innerHTML = "SCIENTIFIC"
            break
        case 3:
            document.getElementById("notation_button").innerHTML = "ENGINEERING"
            break
        case 4:
            document.getElementById("notation_button").innerHTML = "CONDENSED"
            break
        case 5:
            document.getElementById("notation_button").innerHTML = "LOGARITHM"
            break
        case 6:
            document.getElementById("notation_button").innerHTML = "LETTERS"
            break
        case 7:
            document.getElementById("notation_button").innerHTML = "CANCER"
            break
        case 8:
            document.getElementById("notation_button").innerHTML = "???"
            break
        case 9:
            document.getElementById("notation_button").innerHTML = "INFINITY"
            break
        case 10:
            document.getElementById("notation_button").innerHTML = "ROMAN"
            break
        case 11:
            document.getElementById("notation_button").innerHTML = "BASE64"
            break
        case 12:
            document.getElementById("notation_button").innerHTML =
                "MIXED SCIENTIFIC"
            break
        case 13:
            document.getElementById("notation_button").innerHTML =
                "MIXED ENGINEERING"
            break
    }
    increment(0)
    watts_update()
    challenge_update()
    reactor_update()
    if (game.oc_state === 2)
        document.getElementById("oc_state").innerHTML =
            "Boosting " + format_num(game.exp_oc) + "x"
    pp_upgrade.upgrades[24].desc =
        "Unautomated clicks are boosted a further +32% for every Autoclicker tier<br>(Currently: " +
        format_eff(16 + game.cps * 0.16) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[24].desc
    pp_upgrade.upgrades[27].desc =
        "EXP production is boosted based on how many times you have Prestiged<br>(Currently: " +
        format_eff(1 + (game.prestige / 1000) ** (1 / 2)) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[27]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[27].desc
    pp_upgrade.upgrades[30].desc =
        "EXP production is boosted based on your highest level<br>(Currently: " +
        format_eff(1 + game.highest_level / 400) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[30]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[30].desc
}

//switchpoint toggle
function switchpoint() {
    game.switchpoint += 1
    if (game.switchpoint >= 2) game.switchpoint = 0
    switch (game.switchpoint) {
        case 0:
            document.getElementById("switchpoint_button").innerHTML = "MILLION"
            break
        case 1:
            document.getElementById("switchpoint_button").innerHTML = "BILLION"
            break
    }
}

//hotkeys toggle
function hotkeys() {
    if (game.hotkeys) {
        game.hotkeys = false
        document.getElementById("hotkeys_button").innerHTML = "DISABLED"
    } else {
        game.hotkeys = true
        document.getElementById("hotkeys_button").innerHTML = "ENABLED"
    }
}

//resetting custom hotkeys
function reset_hotkeys() {
    if (recorded_hotkey) recorded_hotkey = null
    for (const hotkey of configurable_hotkey.hotkeys) {
        hotkey.parse_key(hotkey.default_combination)
        hotkey.text.data = `${hotkey.key_to_string(true)}: ${hotkey.name}`
    }
}

//hidden purchased pp upgrades toggle
function pp_hidden() {
    game.pp_hide += 1
    if (game.pp_hide >= 3) game.pp_hide = 0
    pp_update()
    switch (game.pp_hide) {
        case 0:
            document.getElementById("hidden_button").innerHTML = "SHOW ALL"
            break
        case 1:
            document.getElementById("hidden_button").innerHTML =
                "SHOW IMPORTANT"
            break
        case 2:
            document.getElementById("hidden_button").innerHTML = "HIDE BOUGHT"
            break
    }
}

//hidden completed perks toggle
function perks_hidden() {
    if (game.perks_hidden) {
        game.perks_hidden = false
        document.getElementById("perks_hidden_button").innerHTML = "DISABLED"
    } else {
        game.perks_hidden = true
        document.getElementById("perks_hidden_button").innerHTML = "ENABLED"
    }
}

//pp progress bar toggle
function pp_bar() {
    if (game.pp_progress) {
        game.pp_progress = false
        document.getElementById("pp_bar_button").innerHTML = "DISABLED"
        document.getElementById("pp_back").style.display = "none"
    } else {
        game.pp_progress = true
        document.getElementById("pp_bar_button").innerHTML = "ENABLED"
        document.getElementById("pp_back").style.display = "block"
    }
}

//anti-seizure progress bar toggle
function epilepsy() {
    if (game.epilepsy) {
        game.epilepsy = false
        document.getElementById("epilepsy_button").innerHTML = "ENABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "#780e74"
        )
        document.documentElement.style.setProperty("--button_color", "white")
        document.documentElement.style.setProperty("--enter_color", "#ff2929")
        document.documentElement.style.setProperty("--enter_shadow", "#ff0000")
    } else {
        game.epilepsy = true
        document.getElementById("epilepsy_button").innerHTML = "DISABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "white"
        )
        document.documentElement.style.setProperty("--button_color", "black")
        document.documentElement.style.setProperty("--enter_color", "white")
        document.documentElement.style.setProperty("--enter_shadow", "white")
    }
}

//custom level color toggle
function level_color() {
    game.color_mode += 1
    if (game.color_mode >= 3) game.color_mode = 0
    switch (game.color_mode) {
        case 0:
            document.getElementById("color_button").innerHTML = "AUTOMATIC"
            document.getElementById("custom_hue_text").style.display = "none"
            document.getElementById("hue_input").style.display = "none"
            break
        case 1:
            document.getElementById("color_button").innerHTML = "RAINBOW"
            break
        case 2:
            document.getElementById("color_button").innerHTML = "CUSTOM"
            document.getElementById("custom_hue_text").style.display = "block"
            document.getElementById("hue_input").style.display = "block"
            break
    }
}

//toggling reboot confirmation
function confirmation() {
    if (game.confirmation) {
        game.confirmation = false
        document.getElementById("confirm_button").innerHTML = "DISABLED"
    } else {
        game.confirmation = true
        game.autorb_toggle = false
        document.getElementById("autorb_toggle").innerHTML = "DISABLED"
        if (!meme)
            document.getElementById("autorb_toggle").style.color = "#ff0000"
        document.getElementById("watt_auto").innerHTML = "OFF"
        if (!meme) document.getElementById("watt_auto").style.color = "#ff0000"
        document.getElementById("confirm_button").innerHTML = "ENABLED"
    }
}

//toggling challenge confirmation
function challenge_confirmation() {
    if (game.challenge_confirmation) {
        game.challenge_confirmation = false
        document.getElementById("ch_confirm_button").innerHTML = "DISABLED"
    } else {
        game.challenge_confirmation = true
        document.getElementById("ch_confirm_button").innerHTML = "ENABLED"
    }
}

//toggling quantize confirmation
function quantum_confirmation() {
    if (game.quantum_confirmation) {
        game.quantum_confirmation = false
        document.getElementById("qu_confirm_button").innerHTML = "DISABLED"
    } else {
        game.quantum_confirmation = true
        game.autoqu_toggle = false
        document.getElementById("autoqu_toggle").innerHTML = "DISABLED"
        if (!meme)
            document.getElementById("autoqu_toggle").style.color = "#ff0000"
        document.getElementById("qu_confirm_button").innerHTML = "ENABLED"
    }
}

//??? toggle
function question() {
    if (game.question) {
        game.question = false
        document.getElementById("question_button").innerHTML = "DISABLED"
    } else {
        game.question = true
        document.getElementById("question_button").innerHTML = "ENABLED"
    }
}

//priority reset layer switching
function priority_layer() {
    game.priority_layer += 1
    if (game.quantum >= 1) {
        if (game.priority_layer >= 4) game.priority_layer = 0
    } else if (game.reboot >= 1) {
        if (game.priority_layer >= 3) game.priority_layer = 0
    } else {
        if (game.priority_layer >= 2) game.priority_layer = 0
    }
    switch (game.priority_layer) {
        case 0:
            document.getElementById("layer_button").innerHTML = "NONE"
            break
        case 1:
            document.getElementById("layer_button").innerHTML = "PRESTIGE"
            break
        case 2:
            document.getElementById("layer_button").innerHTML = "REBOOT"
            break
        case 3:
            document.getElementById("layer_button").innerHTML = "QUANTUM"
            break
    }
}

//toggling hidden achievement hints
function hints() {
    if (game.hints) {
        game.hints = false
        document.getElementById("hints_button").innerHTML = "DISABLED"
    } else {
        game.hints = true
        document.getElementById("hints_button").innerHTML = "ENABLED"
    }
}

//tab switching
function goto_tab(id) {
    if (id !== 5 && game.tab === 6) {
        if (!meme)
            document.getElementById("achievements").style.color = "#ffffff"
        for (let i = 0; i < achievement.achievements.length; i++) {
            achievement.achievements[i].new = false
        }
    }

    game.tab = id

    document.getElementById("upgrades_page").style.display = "none"
    document.getElementById("prestige_page").style.display = "none"
    document.getElementById("p_upgrades_page").style.display = "none"
    document.getElementById("p_config_page").style.display = "none"
    document.getElementById("reboot_page").style.display = "none"
    document.getElementById("challenges_page").style.display = "none"
    document.getElementById("reactor_page").style.display = "none"
    document.getElementById("quantum_page").style.display = "none"
    document.getElementById("prism_page").style.display = "none"
    document.getElementById("gravity_page").style.display = "none"
    document.getElementById("omega_page").style.display = "none"
    document.getElementById("statistics_page").style.display = "none"
    document.getElementById("past_resets_page").style.display = "none"
    document.getElementById("achievements_page").style.display = "none"
    document.getElementById("settings_page").style.display = "none"
    document.getElementById("the_end_page").style.display = "none"

    document.getElementById("prestige_tabs").style.display = "none"
    document.getElementById("reboot_tabs").style.display = "none"
    document.getElementById("quantum_tabs").style.display = "none"

    switch (id) {
        case 1:
            document.getElementById("upgrades_page").style.display = "block"
            break
        case 2:
            document.getElementById("prestige_page").style.display = "block"
            if (game.subtab[0] === 0)
                document.getElementById("p_upgrades_page").style.display =
                    "block"
            if (game.subtab[0] === 1)
                document.getElementById("p_config_page").style.display = "block"
            if (game.pp_bought[3])
                document.getElementById("prestige_tabs").style.display = "flex"
            break
        case 3:
            if (game.subtab[1] === 0)
                document.getElementById("reboot_page").style.display = "block"
            if (game.subtab[1] === 1)
                document.getElementById("challenges_page").style.display =
                    "block"
            if (game.subtab[1] === 2)
                document.getElementById("reactor_page").style.display = "block"
            if (game.perks[17])
                document.getElementById("reboot_tabs").style.display = "flex"
            break
        case 4:
            document.getElementById("quantum_page").style.display = "block"
            if (game.subtab[2] === 0)
                document.getElementById("prism_page").style.display = "block"
            if (game.subtab[2] === 1)
                document.getElementById("gravity_page").style.display = "block"
            if (game.subtab[2] === 2)
                document.getElementById("omega_page").style.display = "block"
            if (game.qu_bought[7])
                document.getElementById("quantum_tabs").style.display = "flex"
            break
        case 5:
            if (game.subtab[3] === 0)
                document.getElementById("statistics_page").style.display =
                    "flex"
            if (game.subtab[3] === 1)
                document.getElementById("past_resets_page").style.display =
                    "block"
            break
        case 6:
            document.getElementById("achievements_page").style.display = "block"
            if (!meme)
                document.getElementById("achievements").style.color = "#ffffff"
            break
        case 7:
            document.getElementById("settings_page").style.display = "flex"
            break
        case 8:
            document.getElementById("the_end_page").style.display = "block"
            break
    }
}

//subtab switching
function goto_subtab(id) {
    if (game.tab === 2) {
        game.subtab[0] = id

        document.getElementById("p_upgrades_page").style.display = "none"
        document.getElementById("p_config_page").style.display = "none"

        switch (id) {
            case 0:
                document.getElementById("p_upgrades_page").style.display =
                    "block"
                break
            case 1:
                document.getElementById("p_config_page").style.display = "block"
                break
        }
    } else if (game.tab === 3) {
        game.subtab[1] = id

        document.getElementById("reboot_page").style.display = "none"
        document.getElementById("challenges_page").style.display = "none"
        document.getElementById("reactor_page").style.display = "none"

        switch (id) {
            case 0:
                document.getElementById("reboot_page").style.display = "block"
                break
            case 1:
                document.getElementById("challenges_page").style.display =
                    "block"
                break
            case 2:
                document.getElementById("reactor_page").style.display = "block"
                break
        }
    } else if (game.tab === 4) {
        game.subtab[2] = id

        document.getElementById("prism_page").style.display = "none"
        document.getElementById("gravity_page").style.display = "none"
        document.getElementById("omega_page").style.display = "none"

        switch (id) {
            case 0:
                document.getElementById("prism_page").style.display = "block"
                break
            case 1:
                document.getElementById("gravity_page").style.display = "block"
                break
            case 2:
                document.getElementById("omega_page").style.display = "block"
                break
        }
    } else if (game.tab === 5) {
        game.subtab[3] = id

        document.getElementById("statistics_page").style.display = "none"
        document.getElementById("past_resets_page").style.display = "none"

        switch (id) {
            case 0:
                document.getElementById("statistics_page").style.display =
                    "flex"
                break
            case 1:
                document.getElementById("past_resets_page").style.display =
                    "block"
                break
        }
    }
}

//changing page on achievements tab
function change_page(dir) {
    if (dir === "prev") {
        game.achiev_page--
        document.getElementById("page_right1").style.display = "inline"
        document.getElementById("page_right2").style.display = "inline"
        if (game.achiev_page === 0) {
            document.getElementById("page_left1").style.display = "none"
            document.getElementById("page_left2").style.display = "none"
        } else if (game.achiev_page >= 1) {
            document.getElementById("page_left1").style.display = "inline"
            document.getElementById("page_left2").style.display = "inline"
        }
    } else if (dir === "next") {
        game.achiev_page++
        document.getElementById("page_left1").style.display = "inline"
        document.getElementById("page_left2").style.display = "inline"
        if (
            game.achiev_page ===
            Math.ceil(achievement.achievements.length / 10 - 1)
        ) {
            document.getElementById("page_right1").style.display = "none"
            document.getElementById("page_right2").style.display = "none"
        } else if (
            game.achiev_page <
            Math.ceil(achievement.achievements.length / 10 - 1)
        ) {
            document.getElementById("page_right1").style.display = "inline"
            document.getElementById("page_right2").style.display = "inline"
        }
    }
}

//toggling buy one/buy max
function max_toggle() {
    if (game.buy_max) {
        game.buy_max = false
        document.getElementById("reactor_buy_max").innerHTML = "BUY ONE"
        if (!meme)
            document.getElementById("reactor_buy_max").style.color = "#4db2ff"
        if (!meme)
            document.getElementById("reactor_buy_max").style.textShadow =
                "0em 0em 0.2em #0091ff"
    } else {
        game.buy_max = true
        document.getElementById("reactor_buy_max").innerHTML = "BUY MAX"
        if (!meme)
            document.getElementById("reactor_buy_max").style.color = "#ffffff"
        if (!meme)
            document.getElementById("reactor_buy_max").style.textShadow =
                "0em 0em 0.2em #ffffff"
    }
}

//buy max cores
function max_all() {
    let efficiency = new Array(8).fill(Infinity)
    let selection = 0
    for (let i = 0; i < 8; i++) {
        if (i === 0) {
            efficiency[i] =
                game.core_price[i] /
                ((game.core_level[i] + 1) / game.core_level[i] - 1)
        } else {
            efficiency[i] =
                game.core_price[i] /
                ((game.core_level[i] + 2) / (game.core_level[i] + 1) - 1)
        }
        if (
            efficiency[i] < efficiency[selection] &&
            game.hydrogen >= game.core_price[i]
        )
            selection = i
    }
    while (game.hydrogen >= game.core_price[selection]) {
        game.hydrogen -= game.core_price[selection]
        game.budget -= game.core_price[selection]
        if (game.budget < 0) game.budget = 0
        game.core_level[selection]++
        if (game.core_level[selection] > Math.floor(500000 / 2 ** selection)) {
            game.core_price[selection] +=
                (core.cores[selection].base_price *
                    (game.core_level[selection] -
                        Math.floor(500000 / 2 ** selection)) **
                        1.65) /
                4
        } else {
            game.core_price[selection] += core.cores[selection].base_price / 4
        }

        selection = 0

        for (let i = 0; i < 8; i++) {
            if (i === 0) {
                efficiency[i] =
                    game.core_price[i] /
                    ((game.core_level[i] + 1) / game.core_level[i] - 1)
            } else {
                efficiency[i] =
                    game.core_price[i] /
                    ((game.core_level[i] + 2) / (game.core_level[i] + 1) - 1)
            }
            if (
                efficiency[i] < efficiency[selection] &&
                game.hydrogen >= game.core_price[i]
            )
                selection = i
        }
    }
}

//buy max cores with half money
function max_half() {
    let efficiency = new Array(8).fill(Infinity)
    let selection = 0
    let budget = game.hydrogen / 2
    for (let i = 0; i < 8; i++) {
        if (i === 0) {
            efficiency[i] =
                game.core_price[i] /
                ((game.core_level[i] + 1) / game.core_level[i] - 1)
        } else {
            efficiency[i] =
                game.core_price[i] /
                ((game.core_level[i] + 2) / (game.core_level[i] + 1) - 1)
        }
        if (
            efficiency[i] < efficiency[selection] &&
            game.hydrogen >= game.core_price[i]
        )
            selection = i
    }
    while (budget >= game.core_price[selection]) {
        game.hydrogen -= game.core_price[selection]
        budget -= game.core_price[selection]
        game.budget -= game.core_price[selection]
        if (game.budget < 0) game.budget = 0
        game.core_level[selection]++
        if (game.core_level[selection] > Math.floor(500000 / 2 ** selection)) {
            game.core_price[selection] +=
                (core.cores[selection].base_price *
                    (game.core_level[selection] -
                        Math.floor(500000 / 2 ** selection)) **
                        1.65) /
                4
        } else {
            game.core_price[selection] += core.cores[selection].base_price / 4
        }

        selection = 0

        for (let i = 0; i < 8; i++) {
            if (i === 0) {
                efficiency[i] =
                    game.core_price[i] /
                    ((game.core_level[i] + 1) / game.core_level[i] - 1)
            } else {
                efficiency[i] =
                    game.core_price[i] /
                    ((game.core_level[i] + 2) / (game.core_level[i] + 1) - 1)
            }
            if (
                efficiency[i] < efficiency[selection] &&
                game.hydrogen >= game.core_price[i]
            )
                selection = i
        }
    }
}
