//game operations run every tick
function tick() {
    //autoclicker operation
    if (game.cps > 0) {
        game.click_time += game.cps / game.tickspeed
        if (game.click_time >= 1) {
            if (game.battery_mode === 1)
                increment(
                    Math.round(
                        (game.exp_add + fluct_increment(game.exp_fluct)) *
                            Math.floor(game.click_time) *
                            game.global_multiplier *
                            game.exp_battery *
                            game.cap_boost
                    )
                )
            else
                increment(
                    Math.round(
                        (game.exp_add + fluct_increment(game.exp_fluct)) *
                            Math.floor(game.click_time) *
                            game.global_multiplier *
                            game.cap_boost
                    )
                )
            game.click_time -= Math.floor(game.click_time)
        }
    }

    //incrementing time statistics
    game.time += 1
    game.prestige_time += 1
    game.all_time += 1
    game.afk_time += 1

    //time based achievements
    if (!game.achievements[31] && game.all_time >= 3600 * game.tickspeed)
        get_achievement(31)
    if (!game.achievements[32] && game.all_time >= 21600 * game.tickspeed)
        get_achievement(32)
    if (!game.achievements[33] && game.all_time >= 86400 * game.tickspeed)
        get_achievement(33)
    if (!game.achievements[34] && game.all_time >= 259200 * game.tickspeed)
        get_achievement(34)
    if (!game.achievements[35] && game.all_time >= 604800 * game.tickspeed)
        get_achievement(35)

    //achievement for all upgrades tab unlocks
    if (
        !game.achievements[50] &&
        game.pp_bought[0] &&
        game.pp_bought[5] &&
        game.pp_bought[14] &&
        game.pp_bought[20] &&
        game.pp_bought[25] &&
        game.pp_bought[32]
    )
        get_achievement(50)

    //spontaneous fortune
    if (game.all_time % game.tickspeed === 0) {
        let roll = Math.random()
        if (!game.achievements[66] && roll < 1 / 7777) {
            get_achievement(66)
        }
    }

    //afk simulator
    if (!game.achievements[63] && game.afk_time >= 600 * game.tickspeed)
        get_achievement(63)

    //updating statistics page
    if (game.tab === 4) {
        let auto_plus = ""
        let manual_plus = ""
        if (
            game.fluct_tier === 0 &&
            game.starter_kit + game.generator_kit === 0
        ) {
            if (game.battery_mode === 1) {
                auto_plus =
                    format_num(
                        Math.round(
                            game.exp_add *
                                game.global_multiplier *
                                game.exp_battery *
                                game.cap_boost
                        )
                    ) + " EXP"
                if (game.autods_toggle && game.autods_goal === 0)
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            2)
                            )
                        ) + " EXP (Discharging)"
            } else {
                auto_plus =
                    format_num(
                        Math.round(
                            game.exp_add *
                                game.global_multiplier *
                                game.cap_boost
                        )
                    ) + " EXP"
                if (game.autods_toggle && game.autods_goal === 0)
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            2)
                            )
                        ) + " EXP (Discharging)"
            }
        } else if (
            game.fluct_tier >= 1 ||
            game.starter_kit + game.generator_kit >= 1
        ) {
            if (game.battery_mode === 1) {
                auto_plus =
                    format_num(
                        Math.round(
                            game.exp_add *
                                game.global_multiplier *
                                game.exp_battery *
                                game.cap_boost
                        )
                    ) +
                    " - " +
                    format_num(
                        Math.round(
                            (game.exp_add + game.exp_fluct) *
                                game.global_multiplier *
                                game.exp_battery *
                                game.cap_boost
                        )
                    ) +
                    " EXP"
                if (game.autods_toggle && game.autods_goal === 0)
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            2)
                            )
                        ) +
                        " - " +
                        format_num(
                            Math.round(
                                (game.exp_add + game.exp_fluct) *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            2)
                            )
                        ) +
                        " EXP (Discharging)"
            } else {
                auto_plus =
                    format_num(
                        Math.round(
                            game.exp_add *
                                game.global_multiplier *
                                game.cap_boost
                        )
                    ) +
                    " - " +
                    format_num(
                        Math.round(
                            (game.exp_add + game.exp_fluct) *
                                game.global_multiplier *
                                game.cap_boost
                        )
                    ) +
                    " EXP"
                if (game.autods_toggle && game.autods_goal === 0)
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            2)
                            )
                        ) +
                        " - " +
                        format_num(
                            Math.round(
                                (game.exp_add + game.exp_fluct) *
                                    game.global_multiplier *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            2)
                            )
                        ) +
                        " EXP (Discharging)"
            }
        }
        if (game.pp_bought[1]) {
            if (
                game.fluct_tier === 0 &&
                game.starter_kit + game.generator_kit === 0
            ) {
                if (game.battery_mode === 0) {
                    manual_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    game.ml_boost
                            )
                        ) + " EXP"
                } else {
                    manual_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.ml_boost
                            )
                        ) + " EXP"
                }
            } else if (
                game.fluct_tier >= 1 ||
                game.starter_kit + game.generator_kit >= 1
            ) {
                if (game.battery_mode === 0) {
                    manual_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    game.ml_boost
                            )
                        ) +
                        " - " +
                        format_num(
                            Math.round(
                                (game.exp_add + game.exp_fluct) *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    game.ml_boost
                            )
                        ) +
                        " EXP"
                } else {
                    manual_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.ml_boost
                            )
                        ) +
                        " - " +
                        format_num(
                            Math.round(
                                (game.exp_add + game.exp_fluct) *
                                    game.global_multiplier *
                                    game.ml_boost
                            )
                        ) +
                        " EXP"
                }
            }
        }

        let exp_eff = ""
        if (game.cps >= 10 || game.prestige >= 1 || game.reboot >= 1) {
            if (game.battery_mode === 1) {
                exp_eff =
                    format_num(
                        (game.exp_add + game.exp_fluct / 2) *
                            game.global_multiplier *
                            game.exp_battery *
                            game.cap_boost *
                            game.cps
                    ) + " EXP/sec"
                if (game.autods_toggle && game.autods_goal === 0)
                    exp_eff =
                        format_num(
                            (game.exp_add + game.exp_fluct / 2) *
                                game.global_multiplier *
                                game.exp_battery *
                                (game.cap_boost +
                                    (1 - game.cap_boost) * game.cap_mode * 2) *
                                game.cps
                        ) + " EXP/sec (Discharging)"
            } else {
                exp_eff =
                    format_num(
                        (game.exp_add + game.exp_fluct / 2) *
                            game.global_multiplier *
                            game.cap_boost *
                            game.cps
                    ) + " EXP/sec"
                if (game.autods_toggle && game.autods_goal === 0)
                    exp_eff =
                        format_num(
                            (game.exp_add + game.exp_fluct / 2) *
                                game.global_multiplier *
                                (game.cap_boost +
                                    (1 - game.cap_boost) * game.cap_mode * 2) *
                                game.cps
                        ) + " EXP/sec (Discharging)"
            }
        }

        let total_auto = ""
        let total_manual = ""
        if (game.amp > 1) {
            if (game.battery_mode === 1) {
                total_auto =
                    format_eff(
                        game.amp *
                            game.global_multiplier *
                            game.exp_battery *
                            game.cap_boost
                    ) + "x"
                if (game.autods_toggle && game.autods_goal === 0)
                    total_auto =
                        format_eff(
                            game.amp *
                                game.global_multiplier *
                                game.exp_battery *
                                (game.cap_boost +
                                    (1 - game.cap_boost) * game.cap_mode * 2)
                        ) + "x (Discharging)"
                total_manual =
                    format_eff(
                        game.amp * game.global_multiplier * game.ml_boost
                    ) + "x"
            } else {
                total_auto =
                    format_eff(
                        game.amp * game.global_multiplier * game.cap_boost
                    ) + "x"
                if (game.autods_toggle && game.autods_goal === 0)
                    total_auto =
                        format_eff(
                            game.amp *
                                game.global_multiplier *
                                (game.cap_boost +
                                    (1 - game.cap_boost) * game.cap_mode * 2)
                        ) + "x (Discharging)"
                total_manual =
                    format_eff(
                        game.amp *
                            game.global_multiplier *
                            game.exp_battery *
                            game.ml_boost
                    ) + "x"
            }
        }

        document.getElementById("current_level_stat").innerText =
            "LVL " + format_num(game.level)
        document.getElementById("highest_level_stat").innerText =
            "LVL " + format_num(game.highest_level)
        document.getElementById("highest_level_at_stat").innerText =
            "LVL " + format_num(game.all_time_highest_level)
        document.getElementById("current_exp_stat").innerText =
            format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
        document.getElementById("total_exp_cp_stat").innerText =
            format_num(game.total_exp) + " EXP"
        document.getElementById("total_exp_cr_stat").innerText =
            format_num(game.prestige_exp) + " EXP"
        document.getElementById("total_exp_at_stat").innerText =
            format_num(game.all_time_exp) + " EXP"
        document.getElementById("exp_click_au_stat").innerText =
            "\n" + auto_plus
        document.getElementById("exp_click_mn_stat").innerText = manual_plus
        document.getElementById("exp_multi_au_stat").innerText = total_auto
        document.getElementById("exp_multi_mn_stat").innerText = total_manual
        document.getElementById("autoclicking_stat").innerText =
            "\n" + format_num(game.cps) + " clicks/s"
        document.getElementById("auto_power_stat").innerText = exp_eff
        document.getElementById("total_clicks_cp_stat").innerText =
            "\n" + format_num(game.clicks)
        document.getElementById("total_clicks_cr_stat").innerText = format_num(
            game.prestige_clicks
        )
        document.getElementById("total_clicks_at_stat").innerText = format_num(
            game.total_clicks
        )
        document.getElementById("times_prestiged_stat").innerText =
            "\n" + format_num(game.prestige)
        document.getElementById("amplification_stat").innerText =
            format_num(game.amp) + " AMP"
        document.getElementById("current_pp_stat").innerText =
            format_num(game.pp) + " PP"
        document.getElementById("total_pp_stat").innerText =
            format_num(game.total_pp) + " PP"
        document.getElementById("total_reboots_stat").innerText =
            "\n" + format_num(game.reboot)
        document.getElementById("generator_power_stat").innerText =
            format_num(game.watts) + " watts"
        if (game.watts === 1 && game.notation !== 8)
            document.getElementById("generator_power_stat").innerText =
                format_num(game.watts) + " watt"
        document.getElementById("time_played_cp_stat").innerText =
            "\n" + format_time(game.time)
        document.getElementById("fastest_prestige_stat").innerText =
            format_time(game.fastest_prestige)
        document.getElementById("time_played_cr_stat").innerText = format_time(
            game.prestige_time
        )
        document.getElementById("fastest_reboot_stat").innerText = format_time(
            game.fastest_reboot
        )
        document.getElementById("time_played_at_stat").innerText = format_time(
            game.all_time
        )
        if (game.prestige <= 0 && game.reboot <= 0) {
            document.getElementById("total_exp_cp_name").innerText =
                "Total EXP:"
            document.getElementById("total_clicks_cp_name").innerText =
                "\nTotal Clicks:"
            document.getElementById("time_played_cp_name").innerText =
                "\nTime Played:"
            document.getElementById("total_exp_cr").style.display = "none"
            document.getElementById("exp_multi_au").style.display = "none"
            document.getElementById("total_clicks_cr").style.display = "none"
            document.getElementById("times_prestiged").style.display = "none"
            document.getElementById("amplification").style.display = "none"
            document.getElementById("current_pp").style.display = "none"
            document.getElementById("total_pp").style.display = "none"
            document.getElementById("fastest_prestige").style.display = "none"
            document.getElementById("time_played_cr").style.display = "none"
        } else {
            document.getElementById("total_exp_cp_name").innerText =
                "Total EXP (Current Prestige):"
            document.getElementById("total_clicks_cp_name").innerText =
                "\nTotal Clicks (Current Prestige):"
            document.getElementById("time_played_cp_name").innerText =
                "\nTime Played (Current Prestige):"
            document.getElementById("total_exp_cr").style.display = "flex"
            document.getElementById("exp_multi_au").style.display = "flex"
            document.getElementById("total_clicks_cr").style.display = "flex"
            document.getElementById("times_prestiged").style.display = "flex"
            document.getElementById("amplification").style.display = "flex"
            document.getElementById("current_pp").style.display = "flex"
            document.getElementById("total_pp").style.display = "flex"
            document.getElementById("fastest_prestige").style.display = "flex"
            document.getElementById("time_played_cr").style.display = "flex"
        }

        if (game.reboot <= 0) {
            document.getElementById("highest_level_at").style.display = "none"
            document.getElementById("total_exp_at").style.display = "none"
            document.getElementById("total_clicks_at").style.display = "none"
            document.getElementById("total_reboots").style.display = "none"
            document.getElementById("generator_power").style.display = "none"
            document.getElementById("time_played_at").style.display = "none"
            document.getElementById("fastest_reboot").style.display = "none"

            document.getElementById("highest_level_name").innerText =
                "Highest Level:"
            document.getElementById("total_exp_cr_name").innerText =
                "Total EXP (All Time):"
            document.getElementById("total_clicks_cr_name").innerText =
                "Total Clicks (All Time):"
            document.getElementById("time_played_cr_name").innerText =
                "Time Played (All Time):"

            if (game.pp_bought[1]) {
                document.getElementById("exp_click_mn").style.display = "flex"
                document.getElementById("exp_multi_mn").style.display = "flex"
                document.getElementById("exp_click_au_name").style.display =
                    "\nAutomated EXP/click:"
                document.getElementById("exp_multi_au_name").style.display =
                    "Total Automated EXP Multipler:"
            } else {
                document.getElementById("exp_click_mn").style.display = "none"
                document.getElementById("exp_multi_mn").style.display = "none"
                document.getElementById("exp_click_au_name").style.display =
                    "\nEXP/click:"
                document.getElementById("exp_multi_au_name").style.display =
                    "Total EXP Multipler:"
            }
        } else {
            document.getElementById("highest_level_at").style.display = "flex"
            document.getElementById("total_exp_at").style.display = "flex"
            document.getElementById("total_clicks_at").style.display = "flex"
            document.getElementById("total_reboots").style.display = "flex"
            document.getElementById("generator_power").style.display = "flex"
            document.getElementById("time_played_at").style.display = "flex"
            document.getElementById("fastest_reboot").style.display = "flex"

            document.getElementById("highest_level_name").innerText =
                "Highest Level (Current Reboot):"
            document.getElementById("total_exp_cr_name").innerText =
                "Total EXP (Current Reboot):"
            document.getElementById("total_clicks_cr_name").innerText =
                "Total Clicks (Current Reboot):"
            document.getElementById("time_played_cr_name").innerText =
                "Time Played (Current Reboot):"

            document.getElementById("exp_click_mn").style.display = "flex"
            document.getElementById("exp_multi_mn").style.display = "flex"
            document.getElementById("exp_click_au_name").style.display =
                "\nAutomated EXP/click:"
            document.getElementById("exp_multi_au_name").style.display =
                "Total Automated EXP Multipler:"
        }

        if (game.cps >= 10 || game.prestige >= 1 || game.reboot >= 1) {
            document.getElementById("auto_power").style.display = "flex"
        } else {
            document.getElementById("auto_power").style.display = "none"
        }
        if (game.cps > 0 || game.prestige >= 1 || game.reboot >= 1) {
            document.getElementById("autoclicking").style.display = "flex"
        } else {
            document.getElementById("autoclicking").style.display = "none"
        }
    }

    //upgrade automation
    color_update()
    for (let i = 0; i < 6; i++) {
        if (game.autoup_toggle[i] && game.pp_bought[2]) {
            upgrade(i, true)
        }
    }

    //exp flux handling
    if (game.pp_bought[20]) {
        game.exp_flux +=
            (0.0025 *
                game.flux_boost *
                game.flux_increase *
                (game.flux_tier + game.starter_kit + game.generator_kit)) /
            game.tickspeed
        if (game.perks[3] && game.pp_bought[33]) {
            game.flux_increase = 1
            if (game.exp_flux >= 100)
                game.flux_increase = 1 / 2 ** (game.exp_flux / 100 - 1)
        } else if (game.pp_bought[33] || game.perks[3]) {
            if (game.exp_flux >= 100) game.exp_flux = 100
        } else if (!game.pp_bought[33] && !game.perks[3]) {
            if (game.exp_flux >= 20) game.exp_flux = 20
        }
        if (!game.achievements[52] && game.exp_flux >= 100) get_achievement(52)
        pp_upgrade.upgrades[20].desc =
            "Unlocks an upgrade that generates a boost to EXP production, increasing over time\n(Currently: " +
            format_eff(game.exp_flux) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[20])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[20].desc
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
        }
        if (game.battery_mode === 1) {
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
        } else {
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
        }
    }

    //grabbing level from autoprestige level config
    document.getElementById("level_input").min = game.pr_min
    switch (game.autopr_mode) {
        case 0:
            game.autopr_goal[0] = Number(
                document.getElementById("level_input").value
            )
            if (game.autopr_goal[0] === NaN) game.autopr_goal[0] = game.pr_min
            if (game.autopr_goal[0] < game.pr_min)
                game.autopr_goal[0] = game.pr_min
            break
        case 1:
            game.autopr_goal[1] = Number(
                document.getElementById("amp_input").value
            )
            if (game.autopr_goal[1] === NaN) game.autopr_goal[1] = 1
            if (game.autopr_goal[1] < 1) game.autopr_goal[1] = 1
            break
        case 2:
            game.autopr_goal[2] = Number(
                document.getElementById("pp_input").value
            )
            if (game.autopr_goal[2] === NaN) game.autopr_goal[2] = 1
            if (game.autopr_goal[2] < 1) game.autopr_goal[2] = 1
            break
        case 3:
            game.autopr_goal[3] = Number(
                document.getElementById("time_input").value
            )
            if (game.autopr_goal[3] === NaN) game.autopr_goal[3] = 0
            if (game.autopr_goal[3] < 0) game.autopr_goal[3] = 0
            break
    }

    //grabbing hue from custom hue input
    game.custom_hue = Number(document.getElementById("hue_input").value)
    if (game.custom_hue === NaN) game.custom_hue = 0
    if (game.custom_hue < 0) game.custom_hue = 0
    if (game.custom_hue >= 360) game.custom_hue = 359

    //prestige automation
    if (game.autopr_toggle && game.pp_bought[3]) {
        if (game.pp_bought[6]) {
            switch (game.autopr_mode) {
                case 0:
                    if (game.level >= game.autopr_goal[0]) {
                        prestige()
                    }
                    break
                case 1:
                    if (
                        game.level >= game.pr_min &&
                        get_amp(game.level) >= game.autopr_goal[1]
                    ) {
                        prestige()
                    }
                    break
                case 2:
                    let pp_amount = 0
                    if (game.prestige <= 21) pp_amount += 1
                    if (game.level > game.highest_level)
                        pp_amount +=
                            get_pp(game.level) - get_pp(game.highest_level)
                    if (
                        game.level >= game.pr_min &&
                        pp_amount >= game.autopr_goal[2]
                    ) {
                        prestige()
                    }
                    break
                case 3:
                    if (
                        game.level >= game.pr_min &&
                        game.time >= game.autopr_goal[3] * game.tickspeed
                    ) {
                        prestige()
                    }
                    break
                case 4:
                    let amp_sec =
                        Math.floor(
                            get_amp(game.level) *
                                game.patience *
                                game.watt_boost
                        ) * game.tickspeed
                    if (game.time > 0) amp_sec /= game.time
                    if (game.pp_bought[29]) {
                        if (
                            game.time >= 10 * game.tickspeed &&
                            game.amp_sec_prev > amp_sec
                        )
                            prestige()
                    } else {
                        if (game.amp_sec_prev > amp_sec) prestige()
                    }
                    game.amp_sec_prev = amp_sec
                    break
            }
        } else {
            prestige()
        }
    }

    //overclocker handling
    if (game.pp_bought[14]) {
        switch (game.oc_state) {
            case 0:
                game.oc_time++
                if (game.pp_bought[26] && game.perks[5]) {
                    document.getElementById("oc_timer").innerText =
                        format_time(90 * game.tickspeed - game.oc_time) +
                        " Left"
                    document.getElementById("oc_progress").style.width =
                        (100 * game.oc_time) / (90 * game.tickspeed) + "%"
                    if (game.oc_time >= 90 * game.tickspeed) {
                        game.oc_time = 45 * game.tickspeed
                        if (game.pp_bought[21])
                            game.oc_time = 90 * game.tickspeed
                        game.oc_state = 1
                        document.getElementById("oc_button").style.display =
                            "inline"
                        document.getElementById("oc_state").innerText =
                            "Standby"
                        document.getElementById("oc_timer").style.display =
                            "none"
                    }
                } else if (game.pp_bought[26] || game.perks[5]) {
                    document.getElementById("oc_timer").innerText =
                        format_time(180 * game.tickspeed - game.oc_time) +
                        " Left"
                    document.getElementById("oc_progress").style.width =
                        (100 * game.oc_time) / (180 * game.tickspeed) + "%"
                    if (game.oc_time >= 180 * game.tickspeed) {
                        game.oc_time = 45 * game.tickspeed
                        if (game.pp_bought[21])
                            game.oc_time = 90 * game.tickspeed
                        game.oc_state = 1
                        document.getElementById("oc_button").style.display =
                            "inline"
                        document.getElementById("oc_state").innerText =
                            "Standby"
                        document.getElementById("oc_timer").style.display =
                            "none"
                    }
                } else {
                    document.getElementById("oc_timer").innerText =
                        format_time(360 * game.tickspeed - game.oc_time) +
                        " Left"
                    document.getElementById("oc_progress").style.width =
                        (100 * game.oc_time) / (360 * game.tickspeed) + "%"
                    if (game.oc_time >= 360 * game.tickspeed) {
                        game.oc_time = 45 * game.tickspeed
                        if (game.pp_bought[21])
                            game.oc_time = 90 * game.tickspeed
                        game.oc_state = 1
                        document.getElementById("oc_button").style.display =
                            "inline"
                        document.getElementById("oc_state").innerText =
                            "Standby"
                        document.getElementById("oc_timer").style.display =
                            "none"
                    }
                }
                break
            case 2:
                if (game.oc_time > 0) {
                    game.oc_time--
                    document.getElementById("oc_timer").innerText =
                        format_time(game.oc_time) + " Left"
                    document.getElementById("oc_progress").style.width =
                        (100 * game.oc_time) / (45 * game.tickspeed) + "%"
                    if (game.pp_bought[21])
                        document.getElementById("oc_progress").style.width =
                            (100 * game.oc_time) / (90 * game.tickspeed) + "%"
                } else {
                    game.exp_oc = 1
                    game.oc_state = 0
                    if (game.battery_mode === 1) {
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
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
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                    } else {
                        document.getElementById("boost").innerText =
                            "EXP Boost\nTier " +
                            format_num(
                                game.boost_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_add *
                                        game.global_multiplier *
                                        game.cap_boost
                                )
                            ) +
                            " EXP/click"
                        if (game.autods_toggle && game.autods_goal === 0)
                            document.getElementById("boost").innerText =
                                "EXP Boost\nTier " +
                                format_num(
                                    game.boost_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_add *
                                            game.global_multiplier *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " EXP/click"
                    }
                    if (game.battery_mode === 1) {
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
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
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            game.exp_battery *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    } else {
                        document.getElementById("fluct").innerText =
                            "EXP Fluctuation\nTier " +
                            format_num(
                                game.fluct_tier +
                                    game.starter_kit +
                                    game.generator_kit
                            ) +
                            ": +" +
                            format_num(
                                Math.round(
                                    game.exp_fluct *
                                        game.global_multiplier *
                                        game.cap_boost
                                )
                            ) +
                            " max extra EXP/click"
                        if (game.autods_toggle && game.autods_goal === 0)
                            document.getElementById("fluct").innerText =
                                "EXP Fluctuation\nTier " +
                                format_num(
                                    game.fluct_tier +
                                        game.starter_kit +
                                        game.generator_kit
                                ) +
                                ": +" +
                                format_num(
                                    Math.round(
                                        game.exp_fluct *
                                            game.global_multiplier *
                                            (game.cap_boost +
                                                (1 - game.cap_boost) *
                                                    game.cap_mode *
                                                    2)
                                    )
                                ) +
                                " max extra EXP/click"
                    }
                    click_update()
                    document.getElementById("oc_state").innerText = "Recharging"
                    document.getElementById("oc_progress").style.background =
                        "#ff2f00"
                }
                break
        }
        if (game.notation === 8) {
            document.getElementById("oc_progress").style.width = "100%"
        }
    }

    //overclocker automation
    if (game.autooc_toggle && game.pp_bought[16]) {
        if (game.oc_state === 1) {
            oc_activate()
        }
    }

    //patience handling
    if (game.pp_bought[29]) {
        if (game.time > 10 * game.tickspeed) {
            game.patience = 30
        } else {
            game.patience = 1 + 0.29 * (game.time / game.tickspeed) ** 2
            ampbutton_update()
        }
    }

    //capacitance handling
    if (game.pp_bought[32]) {
        let eps =
            (game.exp_add + game.exp_fluct / 2) *
            game.global_multiplier *
            game.cps
        if (game.battery_mode === 1) eps *= game.exp_battery
        let base_exp = "Base EXP Production: " + format_num(eps) + " EXP/sec"
        let effective_exp =
            "Effective EXP Production: " +
            format_num(eps * game.cap_boost) +
            " EXP/sec"
        let stored = "Stored EXP: " + format_time(game.stored_exp) + " of EXP"
        if (game.stored_exp >= 300 * game.tickspeed && game.notation !== 8)
            stored = "Stored EXP: 5:00 of EXP (MAX)"
        let if_discharge =
            "If Discharged: +" + format_num(0) + " EXP (Not Active)"
        if (game.cap_mode >= 1 || game.notation === 8)
            if_discharge =
                "If Discharged: +" +
                format_num(
                    (game.stored_exp / game.tickspeed) * eps * game.cap_mode * 2
                ) +
                " EXP (" +
                format_num(game.cap_mode * 2) +
                "x)"
        document.getElementById("cap_stats").innerText =
            base_exp +
            "\n" +
            effective_exp +
            "\n" +
            stored +
            "\n" +
            if_discharge

        if (game.stored_exp <= 300 * game.tickspeed) {
            game.stored_exp += 1 - game.cap_boost
            if (game.cap_mode > 0) game.afk_time = 0
        }

        if (
            game.cap_mode > 0 &&
            (game.stored_exp >= game.tickspeed || game.pp_bought[38])
        ) {
            document.getElementById("discharge_button").className =
                "button ready"
            if (game.level < 60) {
                document.getElementById("discharge_button").style.color =
                    get_color(Math.floor(game.level / 10))
            } else {
                document.getElementById("discharge_button").style.color =
                    get_color((Math.floor(game.level / 60) + 5) % 12)
            }
        } else {
            document.getElementById("discharge_button").className =
                "button blocked"
            document.getElementById("discharge_button").style.color = "silver"
        }
    }

    //grabbing amount from auto discharge config
    game.autods_goal = Number(document.getElementById("dis_input").value)
    if (game.autods_goal === NaN) game.autods_goal = 1
    if (game.autods_goal < 1 && !game.pp_bought[38]) game.autods_goal = 1
    else if (game.autods_goal < 0 && game.pp_bought[38]) game.autods_goal = 0
    if (game.autods_goal > 300) game.autods_goal = 300

    //discharge automation
    if (game.autods_toggle && game.pp_bought[35]) {
        if (game.stored_exp >= game.autods_goal * game.tickspeed) {
            discharge()
        }
    }

    //prestige upgrade automaton
    if (game.perks[7] && game.autopp_toggle) {
        switch (game.autopp_mode) {
            case 0:
                let cheapest = undefined
                let price = Infinity
                for (const upgrade of pp_upgrade.upgrades) {
                    if (!game.pp_bought[upgrade.id] && upgrade.id !== 39) {
                        if (
                            upgrade.price < price &&
                            game.pp >= upgrade.price &&
                            upgrade.can_buy()
                        ) {
                            cheapest = upgrade.id
                            price = upgrade.price
                        }
                    }
                }

                if (cheapest !== undefined) {
                    game.pp -= pp_upgrade.upgrades[cheapest].price
                    game.pp_bought[cheapest] = true
                    pp_upgrade.upgrades[cheapest].on_purchase()
                    pp_update()
                    document.getElementById("pp").innerText =
                        format_num(game.pp) + " PP"
                }
                break
            case 1:
                let lowest = undefined
                let priority = Infinity
                for (const upgrade of pp_upgrade.upgrades) {
                    if (!game.pp_bought[upgrade.id] && upgrade.id !== 39) {
                        if (
                            game.priority[upgrade.id] < priority &&
                            game.pp >= upgrade.price &&
                            upgrade.can_buy()
                        ) {
                            lowest = upgrade.id
                            priority = game.priority[upgrade.id]
                        }
                    }
                }

                if (lowest !== undefined) {
                    game.pp -= pp_upgrade.upgrades[lowest].price
                    game.pp_bought[lowest] = true
                    pp_upgrade.upgrades[lowest].on_purchase()
                    pp_update()
                    document.getElementById("pp").innerText =
                        format_num(game.pp) + " PP"
                }
                break
            case 2:
                let lowest2 = undefined
                let priority2 = Infinity
                for (const upgrade of pp_upgrade.upgrades) {
                    if (!game.pp_bought[upgrade.id] && upgrade.id !== 39) {
                        if (
                            game.priority[upgrade.id] < priority2 &&
                            upgrade.can_buy()
                        ) {
                            lowest2 = upgrade.id
                            priority2 = game.priority[upgrade.id]
                        }
                    }
                }

                if (lowest2 !== undefined) {
                    if (game.pp >= pp_upgrade.upgrades[lowest2].price) {
                        game.pp -= pp_upgrade.upgrades[lowest2].price
                        game.pp_bought[lowest2] = true
                        pp_upgrade.upgrades[lowest2].on_purchase()
                        pp_update()
                        document.getElementById("pp").innerText =
                            format_num(game.pp) + " PP"
                    }
                }
                break
        }
    }

    //grabbing priority from pp upgrades
    if (game.perks[7]) {
        for (const upgrade of pp_upgrade.upgrades) {
            if (upgrade.id !== 39) {
                let element = pp_map.get(upgrade)
                let text = element.querySelector(".pp_text")
                let priority = text.querySelector(".pp_priority")
                let input = priority.querySelector(".priority_input")

                game.priority[upgrade.id] = Number(input.value)
            }
        }
    }

    //update achievements tab
    if (game.tab === 5) {
        achievements_update()
    }

    let ach_completed = 0
    for (i = 0; i < achievement.achievements.length; i++) {
        if (game.achievements[i]) ach_completed += 1
    }

    if (game.perks[0]) {
        game.ach_power = 1 + ach_completed * 0.05
    }

    if (
        !game.achievements[69] &&
        ach_completed >= achievement.achievements.length - 1
    ) {
        get_achievement(69)
        increment(1)
    }

    //did it for the memes
    for (let i = 0; i < 4; i++) {
        if (
            game.autopr_goal[i] === 69 ||
            game.autopr_goal[i] === 420 ||
            game.autopr_goal[i] === 666 ||
            game.autopr_goal[i] === 727 ||
            game.autopr_goal[i] === 1337 ||
            game.autopr_goal[i] === 9001 ||
            game.autopr_goal[i] === 42069 ||
            game.autopr_goal[i] === 69420
        ) {
            if (!game.achievements[65]) get_achievement(65)
        }
    }
    for (let i = 0; i < 39; i++) {
        if (
            game.priority[i] === 69 ||
            game.priority[i] === 420 ||
            game.priority[i] === 666 ||
            game.priority[i] === 727
        ) {
            if (!game.achievements[65]) get_achievement(65)
        }
    }
    if (!game.achievements[65] && game.autods_goal === 69) {
        get_achievement(65)
    }
    if (!game.achievements[65] && game.custom_hue === 69) {
        get_achievement(65)
    }

    //what a madman
    for (let i = 0; i < 6; i++) {
        if (game.autoup_toggle[i]) game.no_automation = false
    }
    if (game.autopr_toggle) game.no_automation = false
    if (game.autooc_toggle) game.no_automation = false
    if (game.autods_toggle) game.no_automation = false
    if (game.autopp_toggle) game.no_automation = false

    //as we can see you can't
    if (game.notation !== 8) game.blind = false

    //notification age handling
    for (const notif of notify.queue) {
        notif.age++
        if (notif.age >= game.tickspeed * 4) {
            notif_map.get(notif).remove()
            notif_map.delete(notif)
            notify.queue.splice(notif, 1)
        } else if (notif.age >= game.tickspeed * 3) {
            let notif_box = notif_map.get(notif)
            notif_box.style.opacity =
                1 - (notif.age - game.tickspeed * 3) / game.tickspeed
        }
    }

    //hide spoiler items in hotkeys list
    if (game.tab === 6) {
        document.getElementById("auto_upgrade_hotkey").style.display = game
            .pp_bought[2]
            ? "unset"
            : "none"
        for (const hotkey of configurable_hotkey.hotkeys) {
            if (!hotkey.unlock_condition || hotkey.unlock_condition())
                hotkey.container.style.display = "unset"
            else hotkey.container.style.display = "none"
        }
    }

    //handling held mouse
    if (game.mouse_held == true) {
        game.mouse_time++
        if (game.mouse_time >= game.tickspeed / 2) hold_tick()
    }

    //???
    if (game.notation === 8) {
        document.getElementById("version").innerText =
            "\n\n\nEXP Simulator v?.?.???\nMade by Zakuro"
    } else {
        document.getElementById("version").innerText =
            "\n\n\nEXP Simulator v2.2.003\nMade by Zakuro"
    }

    //calculating total multiplier
    game.global_multiplier =
        game.exp_fact *
        game.exp_oc *
        game.exp_flux *
        game.pp_power *
        game.prestige_power *
        game.depth_power *
        game.ach_power
}

//calculating amp/sec
function amp_tick() {
    if (game.time > 0)
        game.amp_eff =
            (Math.floor(get_amp(game.level) * game.patience * game.watt_boost) *
                game.tickspeed) /
            game.time
    else
        game.amp_eff =
            Math.floor(get_amp(game.level) * game.patience * game.watt_boost) *
            game.tickspeed
    if (game.pp_bought[8]) {
        ampbutton_update()
    }
}

//hold exp key handling
function hold_tick() {
    game.hold_time++
    if (game.hold_time >= game.tickspeed / 10) {
        game.hold_time = 0
        player_increment()
    }
}

//holdable exp button
document.getElementById("click").addEventListener("mousedown", function () {
    game.mouse_held = true
})
document.addEventListener("mouseup", function () {
    game.mouse_held = false
    game.mouse_time = 0
})

//hotkeys handling
document.addEventListener("keydown", function (event) {
    if (recorded_hotkey) {
        if (!["Control", "Shift", "Alt"].includes(code_to_readable(event.code)))
            recorded_hotkey.keycode = event.code
        recorded_hotkey.shift = event.shiftKey
        recorded_hotkey.control = event.ctrlKey
        recorded_hotkey.alt = event.altKey
        recorded_hotkey.text.data = `${recorded_hotkey.key_to_string(true)}: ${
            recorded_hotkey.name
        }`
    }
    if (!game.hotkeys) return
    if (event.code === "ArrowLeft") {
        if (game.tab > 1) game.tab -= 1
        if (game.tab == 3 && !game.pp_bought[39]) game.tab = 2
        if (game.tab == 2 && game.prestige == 0 && game.reboot == 0)
            game.tab = 1
        goto_tab(game.tab)
    } else if (event.code === "ArrowRight") {
        if (game.tab < 6) game.tab += 1
        if (game.tab == 2 && game.prestige == 0 && game.reboot == 0)
            game.tab = 3
        if (game.tab == 3 && !game.pp_bought[39]) game.tab = 4
        goto_tab(game.tab)
    } else {
        for (const hotkey of configurable_hotkey.hotkeys) {
            if (
                hotkey.keycode === event.code &&
                hotkey.shift === event.shiftKey &&
                hotkey.control === event.ctrlKey &&
                hotkey.alt === event.altKey &&
                (!hotkey.unlock_condition || hotkey.unlock_condition())
            ) {
                hotkey.on_activate(event)
            }
        }
    }

    if (!game.achievements[67] && event.code === "KeyF") get_achievement(67)

    if (game.tab === 1)
        for (let i = 1; i <= 6; i++) {
            if (event.shiftKey && event.code === "Digit" + i) {
                up_toggle(i - 1)
            } else if (event.code === "Digit" + i) {
                upgrade(i - 1, true)
            }
        }
})

document.addEventListener("keyup", function (event) {
    if (!recorded_hotkey) return
    if (event.code.startsWith("Shift")) recorded_hotkey.shift = false
    if (event.code.startsWith("Control")) recorded_hotkey.control = false
    if (event.code.startsWith("Alt")) recorded_hotkey.alt = false
    recorded_hotkey.text.data = `${recorded_hotkey.key_to_string(true)}: ${
        recorded_hotkey.name
    }`
})

//wish granted
document.getElementById("slot5").addEventListener("click", function () {
    if (!game.achievements[64] && game.achiev_page === 6) {
        get_achievement(64)
    }
})

//resetting timer for afk simulator
document.addEventListener("click", function () {
    game.afk_time = 0
})
document.addEventListener("wheel", function () {
    game.afk_time = 0
})
document.addEventListener("mousemove", function () {
    game.afk_time = 0
})

//prevent enter abuse
document.getElementById("click").onkeydown = function (e) {
    if (e.code === "Enter" || e.code === "Space" || e.code === "NumpadEnter") {
        e.preventDefault()
        return false
    }
}

//prevent space scrolling
window.addEventListener("keydown", e => {
    if (e.code === "Space" && e.target === document.body) {
        e.preventDefault()
        return false
    }
})

//save before the save??? idk lmao
function pre_save() {
    for (const hotkey of configurable_hotkey.hotkeys) {
        game.hotkey_configurations[hotkey.name] = hotkey.key_to_string()
    }
}

//saving the game
function save() {
    pre_save()
    localStorage.setItem("exp_simulator_save", JSON.stringify(game))
}

//exporting a save file
function export_save() {
    pre_save()
    navigator.clipboard.writeText(btoa(JSON.stringify(game)))
    if (document.visibilityState === "visible")
        new notify("Exported to clipboard", "#00ddff")
}

//importing a save file
function import_save() {
    let save_file = atob(prompt("Paste your exported save code here:"))
    let valid_json = true
    try {
        JSON.parse(save_file)
    } catch {
        valid_json = false
    }

    if (valid_json) {
        if (JSON.parse(save_file) !== null) {
            load(JSON.parse(save_file))
        }
    }
}

//load the game
function load(savegame) {
    if (savegame === null) return
    //version compatibility checks

    //v2.0.000, v2.0.100, v2.0.200
    if (savegame.version == "2.0.200" || savegame.version == undefined) {
        alert(
            "Your save has been wiped, very sorry!\nv2.0.xxx saves are not compatible with v2.1.xxx"
        )
        regenerate_ui()
        return
    }
    const [edition, major, minor] = savegame.version
        .split(".")
        .map(val => parseInt(val))
    if (major < 2) {
        if (minor < 100 && savegame.highest_level >= 300) {
            alert(
                "Your save has been wiped, very sorry!\nThere were balancing issues past LVL 300 that have now been fixed, making this wipe necessary"
            )
            regenerate_ui()
            return
        }
        //v2.1.405
        game = savegame
        game.version = "2.2.002"
        if (game.tab > 2) game.tab += 2
        game.reboot = 0
        game.watts = 0
        game.watt_boost = 1
        game.prestige_exp = game.all_time_exp
        game.prestige_clicks = game.total_clicks
        game.prestige_time = game.all_time
        game.all_time_highest_level = 1
        game.fastest_reboot = 10 ** 21
        game.perks = new Array(8).fill(false)
        game.hold_time = 0
        game.generator_kit = 0
        game.flux_increase = 1
        game.autopp_toggle = false
        game.autopp_mode = 0
        game.priority = new Array(39).fill(1)
        game.achievements = new Array(70).fill(false)
        game.ach_power = 1
        game.achiev_page = 0
        game.no_automation = true
        game.blind = true
        game.afk_time = 0
        game.confirmation = true
        let old_bought = game.pp_bought
        game.pp_bought = new Array(40).fill(false)
        for (let i = 0; i <= 38; i++) {
            game.pp_bought[i] = old_bought[i]
        }
        if (game.prestige >= 1) {
            game.hold_notify = true
            game.halfway_notify = true
        } else {
            if (game.level < 5) game.hold_notify = false
            if (game.level < 30) game.halfway_notify = false
        }
        //v2.1.403
        if (minor < 405) {
            game.hold_time = 0
            game.mouse_time = 0
            game.mouse_held = false
        }
        //v2.1.401
        if (minor < 403) {
            game.hotkey_configurations = {}
        }
        for (const hotkey of configurable_hotkey.hotkeys) {
            if (game.hotkey_configurations[hotkey.name])
                hotkey.parse_key(game.hotkey_configurations[hotkey.name])
            else hotkey.parse_key(hotkey.default_combination)
            hotkey.text.data = `${hotkey.key_to_string(true)}: ${hotkey.name}`
        }
        //v2.1.400
        if (minor < 401) {
            game.pp_progress = false
            game.hotkeys = false
            game.total_pp = game.pp
            for (let i = 0; i <= pp_upgrade.upgrades.length; i++) {
                if (game.pp_bought[i]) {
                    game.total_pp += pp_upgrade.upgrades[i].price
                }
            }
        }
        //v2.1.300
        if (minor < 400) {
            game.color_mode = 0
            game.custom_hue = 0
            game.cap_mode = 0
            game.prev_mode = 0
            game.cap_boost = 1
            game.stored_exp = 0
            game.global_multiplier = 1
            game.flux_boost = 1
            game.autods_toggle = false
            game.autods_goal = 30
        }
        //v2.1.200
        if (minor < 300) {
            game.epilepsy = true
            game.exp_battery = 1
            game.battery_mode = 0
            game.battery_tier = 0
            game.battery_level = 90
            game.patience = 1
            game.prestige_power = 1
            game.depth_power = 1
        }
        //v2.1.102
        if (minor < 200) {
            game.exp_flux = 1
            game.pp_power = 1
            game.fluct_tier = 0
            game.flux_level = 75
            game.pr_min = 60 + game.jumpstart * 10
        }

        //v2.1.100
        if (minor < 102) {
            game.autopr_goal = [60, 1, 1, 0]
        }
        //v2.1.003
        if (minor < 100) {
            game.amp_eff = 0
            game.autopr_mode = 0
            game.exp_oc = 1
            game.oc_state = 0
            game.oc_state = game.tickspeed * 180
        }
        //v2.1.000
        if (minor < 3) {
            game.pp_hide = false
        }
    } else {
        //v2.2.000
        game = savegame
        game.version = "2.2.000"
    }
    regenerate_ui()
}

//wiping the save
function wipe() {
    if (
        confirm(
            "Are you sure you want to wipe your save?\nThis will reset EVERYTHING!"
        )
    ) {
        reset()
        game.amp = 1
        game.pp = 0
        game.total_pp = 0
        game.pp_progress = true
        game.pr_min = 60
        for (let i = 0; i < 40; i++) {
            game.pp_bought[i] = false
        }
        pp_update()

        game.prestige = 0
        game.all_time_exp = 0
        game.highest_level = 1
        game.total_clicks = 0
        game.all_time = 0
        game.fastest_prestige = 10 ** 21
        game.exp_add = 1

        game.ml_boost = 1
        game.jumpstart = 0
        game.starter_kit = 0
        game.pp_power = 1

        game.reboot = 0
        game.watts = 0
        game.watt_boost = 1
        game.perks = new Array(8).fill(false)

        game.prestige_exp = game.all_time_exp
        game.prestige_clicks = game.total_clicks
        game.prestige_time = game.all_time
        game.all_time_highest_level = 1
        game.fastest_reboot = 10 ** 21

        game.hold_time = 0
        game.generator_kit = 0
        game.flux_increase = 1
        game.priority = new Array(39).fill(1)

        game.achievements = new Array(70).fill(false)
        game.ach_power = 1
        game.achiev_page = 0
        game.no_automation = true
        game.blind = true
        game.afk_time = 0

        game.autopr_toggle = false
        game.autopr_goal = [60, 1, 1, 0]
        game.autopr_mode = 0
        autopr_switch(game.autopr_mode)
        game.autooc_toggle = false
        game.autods_toggle = false
        game.autods_goal = 30
        game.autopp_toggle = false
        game.autopp_mode = 0
        for (let i = 0; i < 4; i++) {
            game.autoup_toggle[i] = false
        }
        for (let i = 0; i < 4; i++) {
            up_toggle(i)
            up_toggle(i)
        }

        game.autopr_mode = 0
        game.battery_mode = 0
        game.exp_oc = 1
        game.exp_battery = 1
        game.pp_power = 1
        game.prestige_power = 1
        game.depth_power = 1
        game.patience = 1
        game.oc_state = 0
        game.oc_time = 180 * 30
        game.cap_mode = 0
        game.prev_mode = 0
        game.cap_boost = 1
        game.stored_exp = 0
        game.flux_boost = 1

        set_capacitance(0)
        ampbutton_update()
        document.getElementById("click").innerText = "+1 EXP"

        document.getElementById("amp_up").style.display = "none"
        document.getElementById("pp_up").style.display = "none"
        document.getElementById("amp_button").style.display = "none"

        document.getElementById("boost_auto").style.display = "none"
        document.getElementById("auto_auto").style.display = "none"
        document.getElementById("fluct_auto").style.display = "none"
        document.getElementById("fact_auto").style.display = "none"
        document.getElementById("flux_auto").style.display = "none"
        document.getElementById("battery_auto").style.display = "none"

        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("prestige").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
        document.getElementById("auto_mode").style.display = "none"

        document.getElementById("overclock").style.display = "none"
        document.getElementById("oc_auto").style.display = "none"
        document.getElementById("oc_button").style.display = "none"
        document.getElementById("oc_state").innerText = "Recharging"
        document.getElementById("oc_timer").style.display = "block"
        document.getElementById("oc_progress").style.background = "#ff2f00"

        document.getElementById("capacitor").style.display = "none"
        document.getElementById("cap_50").style.display = "none"
        document.getElementById("cap_75").style.display = "none"
        document.getElementById("cap_100").style.display = "none"
        document.getElementById("cap_disc").style.display = "none"
        document.getElementById("dis_auto").style.display = "none"
        document.getElementById("dis_text").style.display = "none"
        document.getElementById("dis_input").style.display = "none"

        game.hold_notify = false
        game.halfway_notify = false

        if (document.visibilityState === "visible")
            new notify("Save deleted", "#ff0000")
        save()
    }
}

//hotkey customization
let recorded_hotkey = null

function code_to_readable(code) {
    if (code.startsWith("Digit")) code = code.slice(5)
    if (code.startsWith("Key")) code = code.slice(3)
    if (code.endsWith("Left")) code = code.slice(0, code.length - 4)
    return code
}

const hotkey_list = document.getElementById("hotkeys_list")

class configurable_hotkey {
    static hotkeys = []
    constructor(name, default_combination, on_activate, unlock_condition) {
        this.name = name
        this.on_activate = on_activate
        this.default_combination = default_combination
        this.parse_key(default_combination)
        if (unlock_condition) this.unlock_condition = unlock_condition
        configurable_hotkey.hotkeys.push(this)
        const list = document.getElementById("hotkeys_list")
        this.text = document.createTextNode(
            `${this.key_to_string(true)}: ${this.name}`
        )
        this.container = document.createElement("span")
        this.container.appendChild(this.text)
        this.changeButton = document.createElement("button")
        this.changeButton.innerText = "CHANGE"
        this.changeButton.classList.add("option_button")
        this.changeButton.addEventListener("click", () => {
            if (recorded_hotkey) recorded_hotkey = null
            else recorded_hotkey = this
            this.changeButton.innerText =
                recorded_hotkey === this ? "RECORDING..." : "CHANGE"
        })
        this.container.appendChild(this.changeButton)
        hotkey_list.appendChild(this.container)
    }
    parse_key(str) {
        this.shift = str.includes("Shift+")
        if (this.shift) {
            str = str.replace("Shift+", "")
        }
        this.control = str.includes("Ctrl+")
        if (this.control) {
            str = str.replace("Ctrl+", "")
        }
        this.alt = str.includes("Alt+")
        if (this.alt) {
            str = str.replace("Alt+", "")
        }
        this.keycode = str
    }
    key_to_string(readable) {
        let str = readable ? code_to_readable(this.keycode) : this.keycode
        if (this.control) str = "Ctrl+" + str
        if (this.shift) str = "Shift+" + str
        if (this.alt) str = "Alt+" + str
        return str
    }
}

//initializing customizable hotkeys
new configurable_hotkey("EXP button", "Space", ev => {
    if (!ev.repeat) player_increment()
    else if (ev.repeat) hold_tick()
})
new configurable_hotkey("Prestige", "KeyP", prestige, () => game.prestige > 0)
new configurable_hotkey(
    "Toggle auto-Prestige",
    "Shift+KeyP",
    pr_toggle,
    () => game.pp_bought[3]
)
new configurable_hotkey("Reboot", "KeyR", reboot, () => !game.confirmation)
new configurable_hotkey(
    "Activate Overclocker",
    "KeyO",
    oc_activate,
    () => game.pp_bought[14]
)
new configurable_hotkey(
    "Toggle auto-Overclock",
    "Shift+KeyO",
    oc_toggle,
    () => game.pp_bought[16]
)
new configurable_hotkey(
    "Discharge Capacitor",
    "KeyD",
    discharge,
    () => game.pp_bought[32]
)
new configurable_hotkey(
    "Toggle auto-Discharge",
    "Shift+KeyD",
    ds_toggle,
    () => game.pp_bought[35]
)
new configurable_hotkey(
    "Toggle all automation",
    "KeyA",
    toggle_all_automation,
    () => game.pp_bought[2]
)
new configurable_hotkey("Buy all upgrades", "KeyM", ev => {
    for (let i = 0; i < 6; i++) {
        upgrade(i - 1, true)
    }
})

//setting up the tick loop
let tick_loop = window.setInterval(function () {
    tick()
}, 1000 / game.tickspeed)

//setting up the amp/sec calculation loop
let amp_tick_loop = window.setInterval(function () {
    amp_tick()
}, 100)

//load the game when opened
load(JSON.parse(localStorage.getItem("exp_simulator_save")))

//setting up the autosave loop
let save_loop = window.setInterval(function () {
    save()
    if (document.visibilityState === "visible")
        new notify("Game saved", "#00ddff")
}, 60000)
