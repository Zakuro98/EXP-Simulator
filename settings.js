//notation switching
function notation() {
    game.notation += 1
    if (game.notation >= 9) game.notation = 0
    pp_update()
    switch (game.notation) {
        case 0:
            document.getElementById("notation_button").innerText = "LONG"
            break
        case 1:
            document.getElementById("notation_button").innerText = "STANDARD"
            break
        case 2:
            document.getElementById("notation_button").innerText = "SCIENTIFIC"
            break
        case 3:
            document.getElementById("notation_button").innerText = "ENGINEERING"
            break
        case 4:
            document.getElementById("notation_button").innerText = "CONDENSED"
            break
        case 5:
            document.getElementById("notation_button").innerText = "LOGARITHM"
            break
        case 6:
            document.getElementById("notation_button").innerText = "LETTERS"
            break
        case 7:
            document.getElementById("notation_button").innerText = "CANCER"
            break
        case 8:
            document.getElementById("notation_button").innerText = "???"
            break
    }
    increment(0)
    click_update()
    watts_update()
    if (game.battery_mode === 1) {
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
        document.getElementById("battery").innerText =
            "EXP Battery\nTier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x automated EXP production"
    } else {
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
        document.getElementById("battery").innerText =
            "EXP Battery\nTier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x manual EXP production"
    }
    document.getElementById("auto").innerText =
        "Autoclicker\nTier " +
        format_num(game.auto_tier + game.starter_kit + game.generator_kit) +
        ": " +
        format_num(game.cps) +
        " clicks/s"
    document.getElementById("fact").innerText =
        "EXP Factor\nTier " +
        format_num(game.fact_tier + game.starter_kit + game.generator_kit) +
        ": " +
        format_num(game.exp_fact) +
        "x EXP/click"
    document.getElementById("flux").innerText =
        "EXP Flux\nTier " +
        format_num(game.flux_tier + game.starter_kit + game.generator_kit) +
        ": " +
        format_eff(game.exp_flux) +
        "x EXP/click (+" +
        format_eff(
            (game.flux_tier + game.starter_kit + game.generator_kit) *
                0.15 *
                game.flux_boost *
                game.flux_increase
        ) +
        "/min)"
    if (game.oc_state === 2)
        document.getElementById("oc_state").innerText =
            "Boosting " + format_num(game.exp_oc) + "x"
    pp_upgrade.upgrades[24].desc =
        "Unautomated clicks are boosted a further +32% for every Autoclicker tier\n(Currently: " +
        format_eff(16 + game.cps * 0.16) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[24].desc
    pp_upgrade.upgrades[27].desc =
        "EXP production is boosted based on how many times you have Prestiged\n(Currently: " +
        format_eff(1 + (game.prestige / 1000) ** (1 / 2)) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[27]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[27].desc
    pp_upgrade.upgrades[30].desc =
        "EXP production is boosted based on your highest level\n(Currently: " +
        format_eff(1 + game.highest_level / 400) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[30]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[30].desc
}

//hotkeys toggle
function hotkeys() {
    if (game.hotkeys) {
        game.hotkeys = false
        document.getElementById("hotkeys_button").innerText = "DISABLED"
    } else {
        game.hotkeys = true
        document.getElementById("hotkeys_button").innerText = "ENABLED"
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
            document.getElementById("hidden_button").innerText = "SHOW ALL"
            break
        case 1:
            document.getElementById("hidden_button").innerText =
                "SHOW IMPORTANT"
            break
        case 2:
            document.getElementById("hidden_button").innerText = "HIDE BOUGHT"
            break
    }
}

//pp progress bar toggle
function pp_bar() {
    if (game.pp_progress) {
        game.pp_progress = false
        document.getElementById("pp_bar_button").innerText = "DISABLED"
        document.getElementById("pp_back").style.display = "none"
    } else {
        game.pp_progress = true
        document.getElementById("pp_bar_button").innerText = "ENABLED"
        document.getElementById("pp_back").style.display = "block"
    }
}

//anti-seizure progress bar toggle
function epilepsy() {
    if (game.epilepsy) {
        game.epilepsy = false
        document.getElementById("epilepsy_button").innerText = "ENABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "#780e74"
        )
        document.documentElement.style.setProperty("--button_color", "white")
    } else {
        game.epilepsy = true
        document.getElementById("epilepsy_button").innerText = "DISABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "white"
        )
        document.documentElement.style.setProperty("--button_color", "black")
    }
}

//custom level color toggle
function level_color() {
    game.color_mode += 1
    if (game.color_mode >= 3) game.color_mode = 0
    switch (game.color_mode) {
        case 0:
            document.getElementById("color_button").innerText = "AUTOMATIC"
            document.getElementById("custom_hue_text").style.display = "none"
            document.getElementById("hue_input").style.display = "none"
            break
        case 1:
            document.getElementById("color_button").innerText = "RAINBOW"
            break
        case 2:
            document.getElementById("color_button").innerText = "CUSTOM"
            document.getElementById("custom_hue_text").style.display = "block"
            document.getElementById("hue_input").style.display = "block"
            break
    }
}

//toggling reboot confirmation
function confirmation() {
    if (game.confirmation) {
        game.confirmation = false
        document.getElementById("confirm_button").innerText = "DISABLED"
    } else {
        game.confirmation = true
        document.getElementById("confirm_button").innerText = "ENABLED"
    }
}

//tab switching
function goto_tab(id) {
    if (id !== 5 && game.tab === 5) {
        document.getElementById("achievements").style.color = "#ffffff"
        for (let i = 0; i < achievement.achievements.length; i++) {
            achievement.achievements[i].new = false
        }
    }

    game.tab = id

    document.getElementById("upgrades_page").style.display = "none"
    document.getElementById("prestige_page").style.display = "none"
    document.getElementById("reboot_page").style.display = "none"
    document.getElementById("statistics_page").style.display = "none"
    document.getElementById("achievements_page").style.display = "none"
    document.getElementById("settings_page").style.display = "none"

    switch (id) {
        case 1:
            document.getElementById("upgrades_page").style.display = "block"
            upgrade_update()
            break
        case 2:
            document.getElementById("prestige_page").style.display = "block"
            break
        case 3:
            document.getElementById("reboot_page").style.display = "block"
            break
        case 4:
            document.getElementById("statistics_page").style.display = "flex"
            break
        case 5:
            document.getElementById("achievements_page").style.display = "block"
            document.getElementById("achievements").style.color = "#ffffff"
            break
        case 6:
            document.getElementById("settings_page").style.display = "flex"
            break
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

    document.getElementById("page_text1").innerText =
        "Page " + (game.achiev_page + 1)
    document.getElementById("page_text2").innerText =
        "Page " + (game.achiev_page + 1)
}
