//updating the color of the level bar
function color_update() {
    if (game.level < 60) {
        document.getElementById("lvlnum").style.color = get_color(
            Math.floor(game.level / 10)
        )
        document.getElementById("progress").style.background = get_color(
            Math.floor(game.level / 10)
        )
    } else if (game.level < 12000) {
        document.getElementById("lvlnum").style.color = get_color(
            (Math.floor(game.level / 60) + 5) % 12
        )
        document.getElementById("progress").style.background = get_color(
            (Math.floor(game.level / 60) + 5) % 12
        )
    } else if (game.level < 60000) {
        document.getElementById("lvlnum").style.color = get_color(
            (Math.floor(game.level / 300) - 3) % 12
        )
        document.getElementById("progress").style.background = get_color(
            (Math.floor(game.level / 300) - 3) % 12
        )
    } else {
        document.getElementById("lvlnum").style.color = get_color(
            (Math.floor(game.level / 1200) + 3) % 12
        )
        document.getElementById("progress").style.background = get_color(
            (Math.floor(game.level / 1200) + 3) % 12
        )
    }
}

//updating level related stuff
function level_update() {
    if (game.level < game.pr_min || game.pp_bought[6]) {
        if (game.epilepsy) {
            document.getElementById("progress").style.width =
                (100 * game.exp) / game.goal + "%"
        } else {
            let eps =
                (game.exp_add + game.exp_fluct / 2) *
                game.global_multiplier *
                game.cap_boost *
                game.cps
            if (
                (game.autods_toggle === 1 && game.autods_goal === 0) ||
                (game.autods_toggle === 2 &&
                    game.cap_mode === 4 &&
                    !game.smartds_oc)
            )
                eps =
                    (game.exp_add + game.exp_fluct / 2) *
                    game.global_multiplier *
                    (game.cap_boost +
                        (1 - game.cap_boost) * game.cap_mode * 2) *
                    game.cps
            if (game.battery_mode === 1 || game.perks[8])
                eps *= game.exp_battery
            if (eps / game.goal >= 2) {
                document.getElementById("progress").style.width = 100 + "%"
            } else {
                document.getElementById("progress").style.width =
                    (100 * game.exp) / game.goal + "%"
            }
        }
    } else {
        document.getElementById("progress").style.width = 100 + "%"
        if (!game.pp_bought[6] && game.level >= game.pr_min) {
            game.all_time_exp -=
                game.total_exp - Math.ceil(get_exp(game.pr_min - 1))
            game.prestige_exp -=
                game.total_exp - Math.ceil(get_exp(game.pr_min - 1))
            game.total_exp = Math.ceil(get_exp(game.pr_min - 1))
            game.level = game.pr_min

            game.exp = game.total_exp - Math.ceil(get_exp(game.level - 1))
            game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level - 1))
        }
    }

    if (game.pp_progress && (game.prestige >= 1 || game.reboot >= 1)) {
        let goal2 = 0
        if (game.pp_bought[6]) {
            if (game.prestige < 21) {
                if (game.level < 60) {
                    document.getElementById("pp_progress").style.width =
                        (100 * game.total_exp) / get_exp(59) + "%"
                    goal2 = get_exp(59)
                } else {
                    if (game.level < game.highest_level + 1) {
                        let goal =
                            get_exp(
                                Math.ceil(
                                    20 *
                                        (get_pp(game.highest_level) + 2) **
                                            (1 / 2) +
                                        40
                                ) - 1
                            ) - get_exp(59)
                        let prog = game.total_exp - get_exp(59)
                        document.getElementById("pp_progress").style.width =
                            (100 * prog) / goal + "%"
                        goal2 = goal
                    } else {
                        let goal =
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 2) ** (1 / 2) +
                                        40
                                ) - 1
                            ) -
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 1) ** (1 / 2) +
                                        40
                                ) - 1
                            )
                        let prog =
                            game.total_exp -
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 1) ** (1 / 2) +
                                        40
                                ) - 1
                            )
                        document.getElementById("pp_progress").style.width =
                            (100 * prog) / goal + "%"
                        goal2 = goal
                    }
                }
            } else {
                if (game.level < game.highest_level + 1) {
                    let goal = get_exp(
                        Math.ceil(
                            20 * (get_pp(game.highest_level) + 2) ** (1 / 2) +
                                40
                        ) - 1
                    )
                    let prog = game.total_exp
                    document.getElementById("pp_progress").style.width =
                        (100 * prog) / goal + "%"
                    goal2 = goal
                } else {
                    let goal =
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 2) ** (1 / 2) + 40
                            ) - 1
                        ) -
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 1) ** (1 / 2) + 40
                            ) - 1
                        )
                    let prog =
                        game.total_exp -
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 1) ** (1 / 2) + 40
                            ) - 1
                        )
                    document.getElementById("pp_progress").style.width =
                        (100 * prog) / goal + "%"
                    goal2 = goal
                }
            }
        } else {
            document.getElementById("pp_progress").style.width =
                (100 * game.total_exp) / get_exp(59) + "%"
            goal2 = get_exp(59)
        }
        if (!game.epilepsy) {
            let eps =
                (game.exp_add + game.exp_fluct / 2) *
                game.global_multiplier *
                game.cap_boost *
                game.cps
            if (
                (game.autods_toggle === 1 && game.autods_goal === 0) ||
                (game.autods_toggle === 2 &&
                    game.cap_mode === 4 &&
                    !game.smartds_oc)
            )
                eps =
                    (game.exp_add + game.exp_fluct / 2) *
                    game.global_multiplier *
                    (game.cap_boost +
                        (1 - game.cap_boost) * game.cap_mode * 2) *
                    game.cps
            if (game.battery_mode === 1 || game.perks[8])
                eps *= game.exp_battery
            if (eps / goal2 >= 2) {
                document.getElementById("pp_progress").style.width = "100%"
            }
        }
    }

    if (game.notation === 8) {
        document.getElementById("progress").style.width = "100%"
        document.getElementById("pp_progress").style.width = "100%"
    }

    document.getElementById("lvlnum").innerText = format_num(game.level)
    if (game.level < 60 || game.pp_bought[6])
        document.getElementById("exp").innerText =
            format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    else document.getElementById("exp").innerText = "Maxed!"

    if (game.priority_layer === 2) {
        document.getElementById("total_exp").innerText =
            format_num(game.prestige_exp) + " Total EXP"
    } else if (game.priority_layer === 1) {
        document.getElementById("total_exp").innerText =
            format_num(game.total_exp) + " Total EXP"
    } else {
        if (game.reboot >= 1) {
            document.getElementById("total_exp").innerText =
                format_num(game.prestige_exp) + " Total EXP"
        } else {
            document.getElementById("total_exp").innerText =
                format_num(game.total_exp) + " Total EXP"
        }
    }
}

//updating text on the exp button
function click_update() {
    if (
        (game.fluct_tier === 0 &&
            game.starter_kit + game.generator_kit === 0) ||
        game.challenge === 7 ||
        game.global_multiplier === 0
    ) {
        if (game.battery_mode === 1 && !game.perks[8])
            document.getElementById("click").innerText =
                "+" +
                format_num(
                    Math.round(
                        game.exp_add * game.ml_boost * game.global_multiplier
                    )
                ) +
                " EXP"
        else
            document.getElementById("click").innerText =
                "+" +
                format_num(
                    Math.round(
                        game.exp_add *
                            game.ml_boost *
                            game.global_multiplier *
                            game.exp_battery
                    )
                ) +
                " EXP"
    } else if (
        game.fluct_tier >= 1 ||
        game.starter_kit + game.generator_kit >= 1
    ) {
        if (game.battery_mode === 1 && !game.perks[8])
            document.getElementById("click").innerText =
                "+" +
                format_num(
                    Math.round(
                        game.exp_add * game.ml_boost * game.global_multiplier
                    )
                ) +
                " - " +
                format_num(
                    Math.round(
                        (game.exp_add + game.exp_fluct) *
                            game.ml_boost *
                            game.global_multiplier
                    )
                ) +
                " EXP"
        else
            document.getElementById("click").innerText =
                "+" +
                format_num(
                    Math.round(
                        game.exp_add *
                            game.ml_boost *
                            game.global_multiplier *
                            game.exp_battery
                    )
                ) +
                " - " +
                format_num(
                    Math.round(
                        (game.exp_add + game.exp_fluct) *
                            game.ml_boost *
                            game.global_multiplier *
                            game.exp_battery
                    )
                ) +
                " EXP"
    }
}

//updating text on the prestige button
function reset_button_update() {
    if (game.priority_layer === 1) {
        document.getElementById("amp_area").style.display = "block"

        if (game.level >= game.pr_min || game.amp > 1) {
            document.getElementById("amp_up").style.display = "inline"
            document.getElementById("pp_up").style.display = "inline"
            document.getElementById("amp_button").style.display = "inline"
            document.getElementById("amp").innerText =
                format_num(game.amp) + " AMP"
            document.getElementById("pp").innerText =
                format_num(game.pp) + " PP"
            document.getElementById("amp").style.display = "block"
            document.getElementById("pp").style.display = "block"
        } else {
            document.getElementById("amp_button").style.display = "none"
            document.getElementById("amp").style.display = "none"
            document.getElementById("pp").style.display = "none"
        }

        if (game.challenge !== 4 && game.challenge !== 9) {
            if (game.level >= game.pr_min) {
                document.getElementById("amp_up").style.display = "inline"
                document.getElementById("amp_up").innerText =
                    "+" +
                    format_num(
                        Math.floor(
                            get_amp(game.level) *
                                game.patience *
                                game.watt_boost
                        )
                    ) +
                    " AMP"
                let pp_amount = 0
                if (game.level > game.highest_level) {
                    if (game.prestige <= 21)
                        pp_amount =
                            get_pp(game.level) - get_pp(game.highest_level) + 1
                    else
                        pp_amount =
                            get_pp(game.level) - get_pp(game.highest_level)
                } else {
                    if (game.prestige <= 21) pp_amount = 1
                    else pp_amount = 0
                }
                document.getElementById("pp_up").innerText =
                    "+" + format_num(pp_amount) + " PP"
                if (
                    (pp_amount >= 1 || game.notation === 8) &&
                    !game.perks[27]
                ) {
                    document.getElementById("pp_up").style.display = "inline"
                } else {
                    document.getElementById("pp_up").style.display = "none"
                }
                document.getElementById("amp_button").innerText = "PRESTIGE!"
                document.getElementById("amp_button").style.color = "white"
            } else {
                document.getElementById("amp_up").style.display = "none"
                document.getElementById("pp_up").style.display = "none"
                document.getElementById("amp_button").innerText =
                    "LVL " + format_num(game.pr_min)
                document.getElementById("amp_button").style.color = get_color(
                    (Math.floor(game.pr_min / 60) + 5) % 12
                )
            }
        } else {
            if (game.level >= game.highest_level) {
                let amp_amount =
                    get_amp(game.level) - get_amp(game.highest_level)
                document.getElementById("amp_up").style.display = "inline"
                document.getElementById("amp_up").innerText =
                    "+" +
                    format_num(Math.floor(amp_amount * game.watt_boost)) +
                    " AMP"
                let pp_amount = 0
                if (game.prestige <= 21)
                    pp_amount =
                        get_pp(game.level) - get_pp(game.highest_level) + 1
                else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
                document.getElementById("pp_up").innerText =
                    "+" + format_num(pp_amount) + " PP"
                if (
                    (pp_amount >= 1 || game.notation === 8) &&
                    !game.perks[27]
                ) {
                    document.getElementById("pp_up").style.display = "inline"
                } else {
                    document.getElementById("pp_up").style.display = "none"
                }
                document.getElementById("amp_button").innerText = "PRESTIGE!"
                document.getElementById("amp_button").style.color = "white"
            } else {
                document.getElementById("amp_up").style.display = "none"
                document.getElementById("pp_up").style.display = "none"
                document.getElementById("amp_button").innerText =
                    "LVL " + format_num(game.highest_level)

                if (game.highest_level < 12000) {
                    document.getElementById("amp_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 60) + 5) % 12
                        )
                } else if (game.highest_level < 60000) {
                    document.getElementById("amp_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 300) - 3) % 12
                        )
                } else {
                    document.getElementById("amp_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 1200) + 3) % 12
                        )
                }
            }
        }
    } else {
        document.getElementById("amp_area").style.display = "none"
        document.getElementById("amp").style.display = "none"
        document.getElementById("pp").style.display = "none"
    }

    if (game.priority_layer === 2) {
        document.getElementById("reboot_area").style.display = "block"
        document.getElementById("watts2").style.display = "block"
        if (game.watts === 1)
            document.getElementById("watts2").innerText =
                format_num(game.watts) + " watt"
        else
            document.getElementById("watts2").innerText =
                format_num(game.watts) + " watts"
        if (game.watts >= 98304)
            document.getElementById("hydrogen3").style.display = "block"
        else document.getElementById("hydrogen3").style.display = "none"
        document.getElementById("hydrogen3").innerText =
            format_eff(game.hydrogen) + " g hydrogen"

        let all_pp_upgrades = true
        for (const upgrade2 of pp_upgrade.upgrades) {
            if (upgrade2.id < 39 && !game.pp_bought[upgrade2.id])
                all_pp_upgrades = false
        }

        let reboot_requirement = 0
        if (game.reboot >= 1) reboot_requirement = 5000 * game.reboot + 80000
        if (game.reboot >= 24) reboot_requirement = 200000

        if (game.challenge !== 0 && !entering) {
            if (game.completions[game.challenge - 1] < 12) {
                reboot_requirement =
                    challenge.challenges[game.challenge - 1].goal +
                    challenge.challenges[game.challenge - 1].step *
                        game.completions[game.challenge - 1] +
                    (challenge.challenges[game.challenge - 1].step2 *
                        (game.completions[game.challenge - 1] - 1) *
                        game.completions[game.challenge - 1]) /
                        2
            } else {
                reboot_requirement =
                    challenge.challenges[game.challenge - 1].goal +
                    challenge.challenges[game.challenge - 1].step * 11 +
                    challenge.challenges[game.challenge - 1].step2 * 55
            }
        }

        if (all_pp_upgrades && game.pp >= reboot_requirement) {
            document.getElementById("watt_button").className =
                "button reboot_power"
            document.getElementById("watts_up").style.display = "inline"
            if (!game.perks[13]) {
                if (game.notation !== 8)
                    document.getElementById("watts_up").innerText =
                        "+" + format_num(1) + " watt"
                else
                    document.getElementById("watts_up").innerText =
                        "+" + format_num(1) + " watts"
            } else {
                if (get_watts(game.pp) === 1 && game.notation !== 8)
                    document.getElementById("watts_up").innerText =
                        "+" + format_num(get_watts(game.pp)) + " watt"
                else
                    document.getElementById("watts_up").innerText =
                        "+" + format_num(get_watts(game.pp)) + " watts"
                if (game.perks[22]) {
                    document.getElementById("hydrogen_up").style.display =
                        "inline"
                    document.getElementById("hydrogen_up").innerText =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) * 2 ** game.supply_level
                        ) +
                        " g hydrogen"
                    if (game.perks[25])
                        document.getElementById("hydrogen_up").innerText =
                            "+" +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    2.5 ** game.supply_level
                            ) +
                            " g hydrogen"
                }
            }
        } else {
            document.getElementById("watt_button").className =
                "button no_reboot_power"
            document.getElementById("watts_up").style.display = "none"
            document.getElementById("hydrogen_up").style.display = "none"
        }
    } else {
        document.getElementById("reboot_area").style.display = "none"
        document.getElementById("watts2").style.display = "none"
        document.getElementById("hydrogen3").style.display = "none"
    }

    if (game.prestige >= 1 || game.reboot >= 1) {
        document.getElementById("prestige").style.display = "inline"
    }
}

//updating whether or not upgrades are visible
//and updating the button text/color
function upgrade_update() {
    //exp boost
    document.getElementById("boost").style.display = "block"
    document.getElementById("boost_button").style.display = "inline"
    if (game.pp_bought[2])
        document.getElementById("boost_auto").style.display = "inline"
    if (game.boost_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.boost_level) {
            document.getElementById("boost_button").innerText = "UPGRADE!"
            document.getElementById("boost_button").style.color = "#ffffff"
        } else {
            document.getElementById("boost_button").innerText =
                "LVL " + format_num(game.boost_level)
            if (game.boost_level < 60) {
                document.getElementById("boost_button").style.color = get_color(
                    Math.floor(game.boost_level / 10)
                )
            } else if (game.boost_level < 12000) {
                document.getElementById("boost_button").style.color = get_color(
                    (Math.floor(game.boost_level / 60) + 5) % 12
                )
            } else if (game.boost_level < 60000) {
                document.getElementById("boost_button").style.color = get_color(
                    (Math.floor(game.boost_level / 300) - 3) % 12
                )
            } else {
                document.getElementById("boost_button").style.color = get_color(
                    (Math.floor(game.boost_level / 1200) + 3) % 12
                )
            }
        }
    } else {
        document.getElementById("boost_button").innerText = "MAXED"
        document.getElementById("boost_button").style.color = "#ffffff"
    }
    if (game.battery_mode === 1 || game.perks[8]) {
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
        if (
            (game.autods_toggle === 1 && game.autods_goal === 0) ||
            (game.autods_toggle === 2 &&
                game.cap_mode === 4 &&
                !game.smartds_oc)
        )
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
        if (
            (game.autods_toggle === 1 && game.autods_goal === 0) ||
            (game.autods_toggle === 2 &&
                game.cap_mode === 4 &&
                !game.smartds_oc)
        )
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
    if (game.challenge === 7)
        document.getElementById("boost").innerText =
            "EXP Boost\nTier " +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            ": +" +
            format_num(Math.round(game.exp_add * game.global_multiplier)) +
            " EXP/click"

    //autoclicker
    document.getElementById("auto").style.display = "block"
    document.getElementById("auto_button").style.display = "inline"
    if (game.pp_bought[2])
        document.getElementById("auto_auto").style.display = "inline"
    if (game.auto_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.auto_level) {
            document.getElementById("auto_button").innerText = "UPGRADE!"
            document.getElementById("auto_button").style.color = "#ffffff"
        } else {
            document.getElementById("auto_button").innerText =
                "LVL " + format_num(game.auto_level)
            if (game.auto_level < 60) {
                document.getElementById("auto_button").style.color = get_color(
                    Math.floor(game.auto_level / 10)
                )
            } else if (game.auto_level < 12000) {
                document.getElementById("auto_button").style.color = get_color(
                    (Math.floor(game.auto_level / 60) + 5) % 12
                )
            } else if (game.auto_level < 60000) {
                document.getElementById("auto_button").style.color = get_color(
                    (Math.floor(game.auto_level / 300) - 3) % 12
                )
            } else {
                document.getElementById("auto_button").style.color = get_color(
                    (Math.floor(game.auto_level / 1200) + 3) % 12
                )
            }
        }
    } else {
        document.getElementById("auto_button").innerText = "MAXED"
        document.getElementById("auto_button").style.color = "#ffffff"
    }
    document.getElementById("auto").innerText =
        "Autoclicker\nTier " +
        format_num(game.auto_tier + game.starter_kit + game.generator_kit) +
        ": " +
        format_num(game.cps) +
        " clicks/s"

    //exp fluctuation
    if (game.pp_bought[0] && game.challenge !== 7) {
        document.getElementById("fluct").style.display = "block"
        document.getElementById("fluct_button").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("fluct_auto").style.display = "inline"
    }
    if (game.fluct_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.fluct_level) {
            document.getElementById("fluct_button").innerText = "UPGRADE!"
            document.getElementById("fluct_button").style.color = "#ffffff"
        } else {
            document.getElementById("fluct_button").innerText =
                "LVL " + format_num(game.fluct_level)
            if (game.fluct_level < 60) {
                document.getElementById("fluct_button").style.color = get_color(
                    Math.floor(game.fluct_level / 10)
                )
            } else if (game.fluct_level < 12000) {
                document.getElementById("fluct_button").style.color = get_color(
                    (Math.floor(game.fluct_level / 60) + 5) % 12
                )
            } else if (game.fluct_level < 60000) {
                document.getElementById("fluct_button").style.color = get_color(
                    (Math.floor(game.fluct_level / 300) - 3) % 12
                )
            } else {
                document.getElementById("fluct_button").style.color = get_color(
                    (Math.floor(game.fluct_level / 1200) + 3) % 12
                )
            }
        }
    } else {
        document.getElementById("fluct_button").innerText = "MAXED"
        document.getElementById("fluct_button").style.color = "#ffffff"
    }
    if (game.battery_mode === 1 || game.perks[8]) {
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
        if (game.autods_toggle >= 1 && game.autods_goal === 0)
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
        if (game.autods_toggle >= 1 && game.autods_goal === 0)
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

    //exp factor
    if (game.pp_bought[5] && game.challenge !== 7) {
        document.getElementById("fact").style.display = "block"
        document.getElementById("fact_button").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("fact_auto").style.display = "inline"
    }
    if (game.fact_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.fact_level) {
            document.getElementById("fact_button").innerText = "UPGRADE!"
            document.getElementById("fact_button").style.color = "#ffffff"
        } else {
            document.getElementById("fact_button").innerText =
                "LVL " + format_num(game.fact_level)
            if (game.fact_level < 60) {
                document.getElementById("fact_button").style.color = get_color(
                    Math.floor(game.fact_level / 10)
                )
            } else if (game.fact_level < 12000) {
                document.getElementById("fact_button").style.color = get_color(
                    (Math.floor(game.fact_level / 60) + 5) % 12
                )
            } else if (game.fact_level < 60000) {
                document.getElementById("fact_button").style.color = get_color(
                    (Math.floor(game.fact_level / 300) - 3) % 12
                )
            } else {
                document.getElementById("fact_button").style.color = get_color(
                    (Math.floor(game.fact_level / 1200) + 3) % 12
                )
            }
        }
    } else {
        document.getElementById("fact_button").innerText = "MAXED"
        document.getElementById("fact_button").style.color = "#ffffff"
    }
    document.getElementById("fact").innerText =
        "EXP Factor\nTier " +
        format_num(game.fact_tier + game.starter_kit + game.generator_kit) +
        ": " +
        format_num(game.exp_fact) +
        "x EXP/click"

    //exp flux
    if (game.pp_bought[20] && game.challenge !== 7) {
        document.getElementById("flux").style.display = "block"
        document.getElementById("flux_button").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("flux_auto").style.display = "inline"
    }
    if (game.flux_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.flux_level) {
            document.getElementById("flux_button").innerText = "UPGRADE!"
            document.getElementById("flux_button").style.color = "#ffffff"
        } else {
            document.getElementById("flux_button").innerText =
                "LVL " + format_num(game.flux_level)
            if (game.flux_level < 60) {
                document.getElementById("flux_button").style.color = get_color(
                    Math.floor(game.flux_level / 10)
                )
            } else if (game.flux_level < 12000) {
                document.getElementById("flux_button").style.color = get_color(
                    (Math.floor(game.flux_level / 60) + 5) % 12
                )
            } else if (game.flux_level < 60000) {
                document.getElementById("flux_button").style.color = get_color(
                    (Math.floor(game.flux_level / 300) - 3) % 12
                )
            } else {
                document.getElementById("flux_button").style.color = get_color(
                    (Math.floor(game.flux_level / 1200) + 3) % 12
                )
            }
        }
    } else {
        document.getElementById("flux_button").innerText = "MAXED"
        document.getElementById("flux_button").style.color = "#ffffff"
    }
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

    //exp battery
    if (game.pp_bought[25] && game.challenge !== 7) {
        document.getElementById("battery").style.display = "block"
        document.getElementById("battery_button").style.display = "inline"
        if (!game.perks[8])
            document.getElementById("battery_mode").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("battery_auto").style.display = "inline"
    }
    if (game.battery_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.battery_level) {
            document.getElementById("battery_button").innerText = "UPGRADE!"
            document.getElementById("battery_button").style.color = "#ffffff"
        } else {
            document.getElementById("battery_button").innerText =
                "LVL " + format_num(game.battery_level)
            if (game.battery_level < 60) {
                document.getElementById("battery_button").style.color =
                    get_color(Math.floor(game.battery_level / 10))
            } else if (game.battery_level < 12000) {
                document.getElementById("battery_button").style.color =
                    get_color((Math.floor(game.battery_level / 60) + 5) % 12)
            } else if (game.battery_level < 60000) {
                document.getElementById("battery_button").style.color =
                    get_color((Math.floor(game.battery_level / 300) - 3) % 12)
            } else {
                document.getElementById("battery_button").style.color =
                    get_color((Math.floor(game.battery_level / 1200) + 3) % 12)
            }
        }
    } else {
        document.getElementById("battery_button").innerText = "MAXED"
        document.getElementById("battery_button").style.color = "#ffffff"
    }
    if (game.battery_mode === 0) {
        document.getElementById("battery").innerText =
            "EXP Battery\nTier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x manual EXP production"
    } else if (game.battery_mode === 1) {
        document.getElementById("battery").innerText =
            "EXP Battery\nTier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x automated EXP production"
    }
    if (game.perks[8]) {
        document.getElementById("battery").innerText =
            "EXP Battery\nTier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x EXP production"
    }

    if (game.starter_kit + game.generator_kit > 0) {
        document.getElementById("starter_kit").style.display = "block"
        document.getElementById("starter_kit").innerText =
            "+" +
            format_num(game.starter_kit + game.generator_kit) +
            " free tiers from Starter Kit"
    } else {
        document.getElementById("starter_kit").style.display = "none"
    }
}

//updating statistics page
function stats_update() {
    if (game.tab === 4) {
        let cap_const = 2
        if (game.perks[9]) cap_const = 4
        let auto_plus = ""
        let manual_plus = ""
        if (
            game.fluct_tier === 0 &&
            game.starter_kit + game.generator_kit === 0
        ) {
            if (game.battery_mode === 1 || game.perks[8]) {
                auto_plus =
                    format_num(
                        Math.round(
                            game.exp_add *
                                game.global_multiplier *
                                game.exp_battery *
                                game.cap_boost
                        )
                    ) + " EXP"
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            cap_const)
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
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            cap_const)
                            )
                        ) + " EXP (Discharging)"
            }
        } else if (
            game.fluct_tier >= 1 ||
            game.starter_kit + game.generator_kit >= 1
        ) {
            if (game.battery_mode === 1 || game.perks[8]) {
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
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    game.exp_battery *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            cap_const)
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
                                            cap_const)
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
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    auto_plus =
                        format_num(
                            Math.round(
                                game.exp_add *
                                    game.global_multiplier *
                                    (game.cap_boost +
                                        (1 - game.cap_boost) *
                                            game.cap_mode *
                                            cap_const)
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
                                            cap_const)
                            )
                        ) +
                        " EXP (Discharging)"
            }
        }
        if (game.challenge === 7)
            auto_plus =
                format_num(Math.round(game.exp_add * game.global_multiplier)) +
                " EXP"
        if (game.pp_bought[1]) {
            if (
                game.fluct_tier === 0 &&
                game.starter_kit + game.generator_kit === 0
            ) {
                if (game.battery_mode === 0 || game.perks[8]) {
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
                if (game.battery_mode === 0 || game.perks[8]) {
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
            if (game.battery_mode === 1 || game.perks[8]) {
                exp_eff =
                    format_eff(
                        (game.exp_add + game.exp_fluct / 2) *
                            game.global_multiplier *
                            game.exp_battery *
                            game.cap_boost *
                            game.cps
                    ) + " EXP/sec"
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    exp_eff =
                        format_eff(
                            (game.exp_add + game.exp_fluct / 2) *
                                game.global_multiplier *
                                game.exp_battery *
                                (game.cap_boost +
                                    (1 - game.cap_boost) *
                                        game.cap_mode *
                                        cap_const) *
                                game.cps
                        ) + " EXP/sec (Discharging)"
            } else {
                exp_eff =
                    format_eff(
                        (game.exp_add + game.exp_fluct / 2) *
                            game.global_multiplier *
                            game.cap_boost *
                            game.cps
                    ) + " EXP/sec"
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    exp_eff =
                        format_eff(
                            (game.exp_add + game.exp_fluct / 2) *
                                game.global_multiplier *
                                (game.cap_boost +
                                    (1 - game.cap_boost) *
                                        game.cap_mode *
                                        cap_const) *
                                game.cps
                        ) + " EXP/sec (Discharging)"
            }
        }
        if (game.challenge === 7)
            exp_eff =
                format_eff(game.exp_add * game.global_multiplier * game.cps) +
                " EXP/sec"

        let total_auto = ""
        let total_manual = ""
        if (game.amp > 1) {
            if (game.battery_mode === 1 || game.perks[8]) {
                total_auto =
                    format_eff(
                        game.amp *
                            game.global_multiplier *
                            game.exp_battery *
                            game.cap_boost
                    ) + "x"
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    total_auto =
                        format_eff(
                            game.amp *
                                game.global_multiplier *
                                game.exp_battery *
                                (game.cap_boost +
                                    (1 - game.cap_boost) *
                                        game.cap_mode *
                                        cap_const)
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
                if (
                    (game.autods_toggle === 1 && game.autods_goal === 0) ||
                    (game.autods_toggle === 2 &&
                        game.cap_mode === 4 &&
                        !game.smartds_oc)
                )
                    total_auto =
                        format_eff(
                            game.amp *
                                game.global_multiplier *
                                (game.cap_boost +
                                    (1 - game.cap_boost) *
                                        game.cap_mode *
                                        cap_const)
                        ) + "x (Discharging)"
                total_manual =
                    format_eff(
                        game.amp *
                            game.global_multiplier *
                            game.exp_battery *
                            game.ml_boost
                    ) + "x"
            }

            if (game.challenge === 7)
                total_auto = format_eff(game.amp * game.global_multiplier) + "x"
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
            "\n" + format_num(game.prestige + game.banked_prestige)
        if (game.perks[18] && game.banked_prestige > 0)
            document.getElementById("times_prestiged_stat").innerText =
                "\n" +
                format_num(game.prestige + game.banked_prestige) +
                " (+" +
                format_num(game.banked_prestige) +
                ")"
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
        }

        if (game.pp_bought[1] && game.challenge !== 7) {
            document.getElementById("exp_click_mn").style.display = "flex"
            document.getElementById("exp_multi_mn").style.display = "flex"
            document.getElementById("exp_click_au_name").innerText =
                "\nAutomated EXP/click:"
            document.getElementById("exp_multi_au_name").innerText =
                "Total Automated EXP Multipler:"
        } else {
            document.getElementById("exp_click_mn").style.display = "none"
            document.getElementById("exp_multi_mn").style.display = "none"
            document.getElementById("exp_click_au_name").innerText =
                "\nEXP/click:"
            document.getElementById("exp_multi_au_name").innerText =
                "Total EXP Multipler:"
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
}

//updating availability of pp upgrades
function pp_update() {
    //prestige panel
    document.getElementById("amp2").innerText = format_num(game.amp)
    document.getElementById("amp_boost").innerText =
        "creating " + format_num(game.amp) + "x EXP production"
    document.getElementById("pp2").innerText = format_num(game.pp)

    if (game.challenge !== 4 && game.challenge !== 9) {
        if (game.level >= game.pr_min) {
            document.getElementById("amp_up2").innerText =
                "+" +
                format_num(
                    Math.floor(
                        get_amp(game.level) * game.patience * game.watt_boost
                    )
                ) +
                " AMP"
            let pp_amount = 0
            if (game.level > game.highest_level) {
                if (game.prestige <= 21)
                    pp_amount =
                        get_pp(game.level) - get_pp(game.highest_level) + 1
                else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
            } else {
                if (game.prestige <= 21) pp_amount = 1
                else pp_amount = 0
            }
            document.getElementById("pp_up2").innerText =
                "+" + format_num(pp_amount) + " PP"
            document.getElementById("prestige_button").innerText = "PRESTIGE!"
            document.getElementById("prestige_button").style.color = "white"
        } else {
            document.getElementById("amp_up2").innerText =
                "+" + format_num(0) + " AMP"
            document.getElementById("pp_up2").innerText =
                "+" + format_num(0) + " PP"
            document.getElementById("prestige_button").innerText =
                "LVL " + format_num(game.pr_min)
            document.getElementById("prestige_button").style.color = get_color(
                (Math.floor(game.pr_min / 60) + 5) % 12
            )
        }
    } else {
        if (game.level >= game.highest_level) {
            let amp_amount = get_amp(game.level) - get_amp(game.highest_level)
            document.getElementById("amp_up2").innerText =
                "+" +
                format_num(Math.floor(amp_amount * game.watt_boost)) +
                " AMP"
            let pp_amount = 0
            if (game.prestige <= 21)
                pp_amount = get_pp(game.level) - get_pp(game.highest_level) + 1
            else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
            document.getElementById("pp_up2").innerText =
                "+" + format_num(pp_amount) + " PP"
            document.getElementById("prestige_button").innerText = "PRESTIGE!"
            document.getElementById("prestige_button").style.color = "white"
        } else {
            document.getElementById("amp_up2").innerText =
                "+" + format_num(0) + " AMP"
            document.getElementById("pp_up2").innerText =
                "+" + format_num(0) + " PP"
            document.getElementById("prestige_button").innerText =
                "LVL " + format_num(game.highest_level)

            if (game.highest_level < 12000) {
                document.getElementById("prestige_button").style.color =
                    get_color((Math.floor(game.highest_level / 60) + 5) % 12)
            } else if (game.highest_level < 60000) {
                document.getElementById("prestige_button").style.color =
                    get_color((Math.floor(game.highest_level / 300) - 3) % 12)
            } else {
                document.getElementById("prestige_button").style.color =
                    get_color((Math.floor(game.highest_level / 1200) + 3) % 12)
            }
        }
    }

    if (!game.perks[27]) {
        document.getElementById("amp_up2").style.marginTop = "0em"
        document.getElementById("pp_up2").style.display = "inline"

        if (game.pp_bought[6]) {
            if (game.highest_level < 500) {
                document.getElementById("pp_next").style.display = "inline"
                if (game.level < game.highest_level) {
                    let current_pp = ((game.highest_level - 40) / 20) ** 2 - 1
                    if (current_pp % 1 === 0) {
                        current_pp++
                    } else {
                        current_pp = Math.ceil(current_pp)
                    }
                    document.getElementById("pp_next").innerText =
                        "(Next PP at LVL " +
                        format_num(
                            Math.ceil((current_pp + 1) ** 0.5 * 20 + 40)
                        ) +
                        ")"
                } else {
                    let current_pp = ((game.level - 40) / 20) ** 2 - 1
                    if (current_pp % 1 === 0) {
                        current_pp++
                    } else {
                        current_pp = Math.ceil(current_pp)
                    }
                    document.getElementById("pp_next").innerText =
                        "(Next PP at LVL " +
                        format_num(
                            Math.ceil((current_pp + 1) ** 0.5 * 20 + 40)
                        ) +
                        ")"
                }
            } else {
                if (game.level < game.highest_level) {
                    document.getElementById("pp_next").style.display = "inline"
                    document.getElementById("pp_next").innerText =
                        "(Next PP at LVL " +
                        format_num(game.highest_level + 1) +
                        ")"
                } else {
                    document.getElementById("pp_next").style.display = "none"
                }
            }
        } else {
            document.getElementById("pp_next").style.display = "none"
        }
    } else {
        document.getElementById("amp_up2").style.marginTop = "0.5em"
        document.getElementById("pp_up2").style.display = "none"
        document.getElementById("pp_next").style.display = "none"
    }

    //pp upgrade handling
    for (const upgrade of pp_upgrade.upgrades) {
        let element = pp_map.get(upgrade)
        let button = element.querySelector(".pp_button")

        if (upgrade.name === "The Generator") {
            let all_pp_upgrades = true
            for (const upgrade2 of pp_upgrade.upgrades) {
                if (upgrade2.id < 39 && !game.pp_bought[upgrade2.id])
                    all_pp_upgrades = false
            }
            if (all_pp_upgrades) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        } else {
            if (upgrade.can_buy()) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
                if (game.reboot >= 1 && game.pp_hide === 0) {
                    element.style.display = "flex"
                }
            }
        }

        if (game.pp_bought[upgrade.id]) {
            button.className = "pp_button pp_bought"
            button.innerText = "PURCHASED"

            if (game.pp_hide === 2) {
                element.style.display = "none"
            } else if (game.pp_hide === 1) {
                if (
                    upgrade.name === "EXP Flux" ||
                    upgrade.name === "Spare Power" ||
                    upgrade.name === "Manual Labor V" ||
                    upgrade.name === "Prestige Power" ||
                    upgrade.name === "Depth Power"
                ) {
                    element.style.display = "flex"
                } else {
                    element.style.display = "none"
                }
            } else if (game.pp_hide === 0) {
                element.style.display = "flex"
            }
        } else {
            button.innerText = "-" + format_num(upgrade.price) + " PP"
            if (game.pp >= upgrade.price) {
                button.className = "pp_button pp_hidden"
                if (upgrade.can_buy())
                    button.className = "pp_button pp_unlocked"
            } else {
                button.className = "pp_button pp_hidden"
                if (upgrade.can_buy()) button.className = "pp_button pp_locked"
            }
        }

        if (game.perks[7] && upgrade.id !== 39) {
            let text = element.querySelector(".pp_text")
            let priority = text.querySelector(".pp_priority")
            priority.style.display = "block"
        }
    }

    //amp efficiency
    if (game.pp_bought[8]) {
        document.getElementById("amp_eff").style.display = "block"
        let amp_sec = 0
        let entries = 0
        for (let i = 0; i < 5; i++) {
            if (game.amp_eff[i] !== -1) {
                entries++
                amp_sec += game.amp_eff[i]
            }
        }
        if (entries !== 0) {
            amp_sec /= entries
            document.getElementById("amp_eff").innerText =
                "AMP Efficiency: +" + format_eff(amp_sec) + " AMP/sec"
        } else
            document.getElementById("amp_eff").innerText =
                "AMP Efficiency: undefined"
    } else {
        document.getElementById("amp_eff").style.display = "none"
    }

    //spare power
    if (game.pp_bought[22] && game.challenge !== 7) {
        if (game.pp !== 0) {
            game.pp_power = Math.log(game.pp / 100 + 1) ** 2 + 1
        } else {
            game.pp_power = 1
        }
    }

    //hiding lvl / 60 display
    if (game.pp_bought[6]) {
        document.getElementById("lvlrequirement").style.display = "none"
    } else {
        document.getElementById("lvlrequirement").style.display = "inline"
    }

    //show priority layer setting
    if (game.prestige >= 1 || game.reboot >= 1) {
        document.getElementById("priority_layer").style.display = "flex"
    } else {
        document.getElementById("priority_layer").style.display = "none"
    }
}

//updating generator display
function watts_update() {
    document.getElementById("watts").innerText = format_num(game.watts)

    if (game.watts === 1 && game.notation !== 8)
        document.getElementById("watts_text").innerText = "watt"
    else document.getElementById("watts_text").innerText = "watts"

    if (game.watts <= 0 && game.notation !== 8)
        document.getElementById("watts").className = "watts_text no_power"
    else document.getElementById("watts").className = "watts_text power"

    document.getElementById("gen_boost").innerText =
        "producing " + format_num(game.watt_boost) + "x AMP gain"

    let all_pp_upgrades = true
    for (const upgrade2 of pp_upgrade.upgrades) {
        if (upgrade2.id < 39 && !game.pp_bought[upgrade2.id])
            all_pp_upgrades = false
    }

    if (all_pp_upgrades)
        document.getElementById("all_pp_req").style.color = "#ffff00"
    else document.getElementById("all_pp_req").style.color = "#ffffff"

    let reboot_requirement = 0
    if (game.reboot >= 1) {
        reboot_requirement = 5000 * game.reboot + 80000
        if (game.reboot >= 24) reboot_requirement = 200000
        if (game.challenge !== 0) {
            if (game.completions[game.challenge - 1] < 12) {
                reboot_requirement =
                    challenge.challenges[game.challenge - 1].goal +
                    challenge.challenges[game.challenge - 1].step *
                        game.completions[game.challenge - 1] +
                    (challenge.challenges[game.challenge - 1].step2 *
                        (game.completions[game.challenge - 1] - 1) *
                        game.completions[game.challenge - 1]) /
                        2
            } else {
                reboot_requirement =
                    challenge.challenges[game.challenge - 1].goal +
                    challenge.challenges[game.challenge - 1].step * 11 +
                    challenge.challenges[game.challenge - 1].step2 * 55
            }
        }
        document.getElementById("spare_pp_req").style.display = "block"
        document.getElementById("reboot_button").innerText = "REBOOT!"
    } else {
        document.getElementById("spare_pp_req").style.display = "none"
        document.getElementById("reboot_button").innerText = "ACTIVATE!"
    }
    if (game.pp >= reboot_requirement)
        document.getElementById("spare_pp_req").style.color = "#ffff00"
    else document.getElementById("spare_pp_req").style.color = "#ffffff"
    if (!game.perks[13]) {
        document.getElementById("spare_pp_req").innerText =
            format_num(reboot_requirement) + " spare PP"
    } else {
        document.getElementById("spare_pp_req").innerText =
            format_num(
                Math.ceil(
                    15000 * (get_watts(game.pp) + 1) ** (20 / 17) + 185000
                )
            ) + " spare PP"
    }

    if (game.challenge !== 0) {
        if (game.completions[game.challenge - 1] < 12) {
            document.getElementById("spare_pp_req").innerText =
                format_num(
                    challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.completions[game.challenge - 1] +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.completions[game.challenge - 1] - 1) *
                            game.completions[game.challenge - 1]) /
                            2
                ) + " spare PP"
        } else {
            document.getElementById("spare_pp_req").innerText =
                format_num(
                    challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step * 11 +
                        challenge.challenges[game.challenge - 1].step2 * 55
                ) + " spare PP"
        }
    }

    if (all_pp_upgrades && game.pp >= reboot_requirement) {
        document.getElementById("reboot_button").className = "reboot_power"
        document.getElementById("watts_plus").style.display = "inline"
        if (!game.perks[13]) {
            if (game.notation !== 8)
                document.getElementById("watts_plus").innerText =
                    "+" + format_num(1) + " watt"
            else
                document.getElementById("watts_plus").innerText =
                    "+" + format_num(1) + " watts"
        } else {
            if (get_watts(game.pp) === 1 && game.notation !== 8)
                document.getElementById("watts_plus").innerText =
                    "+" + format_num(get_watts(game.pp)) + " watt"
            else
                document.getElementById("watts_plus").innerText =
                    "+" + format_num(get_watts(game.pp)) + " watts"
            if (game.perks[22]) {
                document.getElementById("hydrogen_plus").style.display =
                    "inline"
                document.getElementById("hydrogen_plus").innerText =
                    "+" +
                    format_eff(
                        (get_watts(game.pp) / 100) * 2 ** game.supply_level
                    ) +
                    " g hydrogen"
                if (game.perks[25])
                    document.getElementById("hydrogen_plus").innerText =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                2.5 ** game.supply_level
                        ) +
                        " g hydrogen"
            }
        }
    } else {
        document.getElementById("reboot_button").className = "no_reboot_power"
        document.getElementById("watts_plus").style.display = "none"
        document.getElementById("hydrogen_plus").style.display = "none"
    }

    //perks handling
    for (const perk of generator_perk.perks) {
        let element = perk_map.get(perk)
        let box = element.querySelector(".perk_complete")
        let text = element.querySelector(".perk_requirement")

        if (game.perks[perk.id]) {
            element.className = "generator_perk complete_perk"
            box.className = "perk_complete complete"
            text.className = "perk_requirement complete_text"
            text.innerText = "COMPLETED!"
        } else {
            element.className = "generator_perk incomplete_perk"
            box.className = "perk_complete incomplete"
            text.className = "perk_requirement incomplete_text"
            if (perk.requirement === 1 && game.notation !== 8)
                text.innerText =
                    "Requires\n" + format_num(perk.requirement) + " watt"
            else
                text.innerText =
                    "Requires\n" + format_num(perk.requirement) + " watts"
        }

        if (perk.id >= 3) {
            if (game.perks[perk.id - 3]) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        } else {
            element.style.display = "flex"
        }
    }

    if (game.perks[7])
        document.getElementById("autopp_config").style.display = "block"
    else document.getElementById("autopp_config").style.display = "none"

    if (game.perks[8])
        document.getElementById("battery_mode").style.display = "none"

    if (game.perks[11])
        document.getElementById("cap_auto").style.display = "inline"
    else document.getElementById("cap_auto").style.display = "none"

    if (game.perks[15] && game.challenge === 0) {
        document.getElementById("autorb_block").style.display = "block"
        document.getElementById("watt_auto").style.display = "inline"
        let watts_sec = 0
        let entries = 0
        for (let i = 0; i < 5; i++) {
            if (game.watts_eff[i] !== -1) {
                entries++
                watts_sec += game.watts_eff[i]
            }
        }
        if (entries !== 0) {
            watts_sec /= entries
            if (watts_sec < 1 / 60) {
                document.getElementById("watts_eff").innerText =
                    "Watt Efficiency: +" +
                    format_eff(watts_sec * 3600) +
                    " watts/hour"
            } else if (watts_sec < 1) {
                document.getElementById("watts_eff").innerText =
                    "Watt Efficiency: +" +
                    format_eff(watts_sec * 60) +
                    " watts/min"
            } else {
                document.getElementById("watts_eff").innerText =
                    "Watt Efficiency: +" + format_eff(watts_sec) + " watts/sec"
            }
        } else
            document.getElementById("watts_eff").innerText =
                "Watt Efficiency: undefined"
    } else {
        document.getElementById("autorb_block").style.display = "none"
        document.getElementById("watt_auto").style.display = "none"
    }

    if (game.perks[17] && game.tab === 3) {
        document.getElementById("reboot_tabs").style.display = "flex"
    } else {
        document.getElementById("reboot_tabs").style.display = "none"
    }

    if (game.reboot >= 1) {
        document.getElementById("reboot_confirm").style.display = "flex"
    } else {
        document.getElementById("reboot_confirm").style.display = "none"
    }

    if (game.perks[17]) {
        document.getElementById("challenge_confirm").style.display = "flex"
    } else {
        document.getElementById("challenge_confirm").style.display = "none"
    }

    if (game.perks[22]) {
        document.getElementById("reactor_tab").style.display = "inline"
    } else {
        document.getElementById("reactor_tab").style.display = "none"
    }

    if (!game.achievements[104] && game.perks[27]) {
        get_achievement(104)
    }
}

//updating challenges page
function challenge_update() {
    document.getElementById("challenge_header").innerText =
        "Entering a challenge will attempt to Reboot, and will reset without giving watts if you cannot\nTo complete a challenge you must Reboot with the required amount of spare PP\n\nTotal EXP boost from all challenges: " +
        format_num(
            game.ch_boost[0] *
                game.ch_boost[1] *
                game.ch_boost[2] *
                game.ch_boost[3] *
                game.ch_boost[4] *
                game.ch_boost[5] *
                game.ch_boost[6] *
                game.ch_boost[7] *
                game.ch_boost[8]
        ) +
        "x"

    if (game.completions[8] >= 1) {
        document.getElementById("challenge_footer").style.display = "block"
    } else {
        document.getElementById("challenge_footer").style.display = "none"
    }

    for (const chg of challenge.challenges) {
        let element = challenge_map.get(chg)
        let button = element.querySelector(".enter_button")
        let goal = element.querySelector(".challenge_goal")
        let complete = element.querySelector(".challenge_complete")

        if (game.challenge === chg.id) {
            button.className = "enter_button in_progress"
            button.innerText = "IN PROGRESS"
        } else {
            button.className = "enter_button"
            button.innerText = "ENTER CHALLENGE"
        }

        complete.innerText =
            "Completions: " +
            format_num(game.completions[chg.id - 1]) +
            " / " +
            format_num(12) +
            "\nEXP boost from completions: " +
            format_num(game.ch_boost[chg.id - 1]) +
            "x"

        if (game.completions[chg.id - 1] < 12) {
            goal.innerText =
                "Goal: " +
                format_num(
                    chg.goal +
                        chg.step * game.completions[chg.id - 1] +
                        (chg.step2 *
                            (game.completions[chg.id - 1] - 1) *
                            game.completions[chg.id - 1]) /
                            2
                ) +
                " PP"
        } else {
            goal.innerText =
                "Goal: " +
                format_num(chg.goal + chg.step * 11 + chg.step2 * 55) +
                " PP"
        }

        if (chg.id === 1) {
            element.style.display = "flex"
        } else {
            if (game.completions[chg.id - 2] >= 1) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        }
    }

    switch (game.completions[5]) {
        case 0:
            challenge.challenges[5].goal = 1420000
            break
        case 1:
            challenge.challenges[5].goal = 1680000
            break
        case 2:
            challenge.challenges[5].goal = 1855000
            break
        case 3:
            challenge.challenges[5].goal = 2045000
            break
        case 4:
            challenge.challenges[5].goal = 2360000
            break
        case 5:
            challenge.challenges[5].goal = 2485000
            break
        case 6:
            challenge.challenges[5].goal = 2415000
            break
        case 7:
            challenge.challenges[5].goal = 2520000
            break
        case 8:
            challenge.challenges[5].goal = 1210000
            break
        case 9:
            challenge.challenges[5].goal = 1350000
            break
        case 10:
            challenge.challenges[5].goal = 1485000
            break
        case 11:
        default:
            challenge.challenges[5].goal = 1590000
    }
}

//updating reactor page
function reactor_update() {
    if (game.perks[22]) {
        document.getElementById("hydrogen_block1").style.display = "flex"
        document.getElementById("hydrogen1").innerText = format_eff(
            game.hydrogen
        )
    }

    document.getElementById("hydrogen2").innerText = format_eff(game.hydrogen)

    document.getElementById("helium").innerText = format_eff(game.helium)
    document.getElementById("helium_boost").innerText =
        "creating " + format_eff(game.helium_boost) + "x EXP production"
    document.getElementById("helium_rate").innerText =
        "+" + format_eff(game.hps) + " mg helium/sec"
    if (game.challenge === 8)
        document.getElementById("helium_rate").innerText =
            "+" + format_eff(0) + " mg helium/sec"

    for (const c of core.cores) {
        let element = reactor_map.get(c)
        let button = element.querySelector(".core_button")
        let power = element.querySelector(".core_power")

        if (c.id === 0) {
            power.innerText =
                "+" + format_eff(game.core_level[c.id]) + " mg base helium/sec"
        } else {
            power.innerText =
                format_num(game.core_level[c.id] + 1) + "x helium production"
            if (game.core_level[c.id - 1] >= 1) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        }

        button.innerText =
            "-" + format_eff(game.core_price[c.id]) + " g hydrogen"

        if (game.hydrogen >= game.core_price[c.id]) {
            button.className = "core_button core_unlocked"
        } else {
            button.className = "core_button core_locked"
        }
    }

    if (game.core_level[2] >= 1) {
        document.getElementById("power_supply").style.display = "flex"
        if (game.hydrogen >= game.supply_price) {
            document.getElementById("supply_button").className =
                "core_button core_unlocked"
        } else {
            document.getElementById("supply_button").className =
                "core_button core_locked"
        }
    } else {
        document.getElementById("power_supply").style.display = "none"
    }
    document.getElementById("supply_gain").innerText =
        format_eff(2 ** game.supply_level) + "x hydrogen gains"
    if (game.perks[25])
        document.getElementById("supply_gain").innerText =
            format_eff(2.5 ** game.supply_level) + "x hydrogen gains"
    document.getElementById("supply_button").innerText =
        "-" + format_eff(game.supply_price) + " g hydrogen"

    if (game.core_level[7] >= 1) {
        document.getElementById("reactor_buy_max").style.display = "inline"
        document.getElementById("max_buttons").style.display = "flex"
    } else {
        document.getElementById("reactor_buy_max").style.display = "none"
        document.getElementById("max_buttons").style.display = "none"
    }

    if (game.core_level[7] >= 7) {
        document.getElementById("reactor_max_all").style.display = "inline"
    } else {
        document.getElementById("reactor_max_all").style.display = "none"
    }
}

//updating achievements page
function achievements_update() {
    for (let i = 0; i < 10; i++) {
        let p = i + game.achiev_page * 10
        if (p < achievement.achievements.length) {
            let r = achievement.achievements[p].id
            document.getElementById("slot" + (i + 1)).style.display = "block"
            if (game.achievements[r]) {
                document.getElementById("ach_header" + (i + 1)).innerText =
                    achievement.achievements[p].name
                document.getElementById("ach_header" + (i + 1)).style.color =
                    "#00ff00"
                document.getElementById("ach_reqr" + (i + 1)).innerText =
                    achievement.achievements[p].requirement
                document.getElementById("slot" + (i + 1)).className =
                    "achievement_slot achievement_complete"
                if (achievement.achievements[p].new) {
                    document.getElementById("slot" + (i + 1)).className =
                        "achievement_slot achievement_complete achievement_new"
                }
            } else {
                document.getElementById("ach_header" + (i + 1)).innerText =
                    "?????"
                document.getElementById("ach_header" + (i + 1)).style.color =
                    "#ff0000"
                document.getElementById("slot" + (i + 1)).className =
                    "achievement_slot"

                switch (achievement.achievements[p].spoiler) {
                    case 0:
                        document.getElementById(
                            "ach_reqr" + (i + 1)
                        ).innerText = achievement.achievements[p].requirement
                        break
                    case 1:
                        if (game.prestige >= 1 || game.reboot >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText = "?????"
                        break
                    case 2:
                        if (game.pp_bought[6])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText = "?????"
                        break
                    case 3:
                        if (game.reboot >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText = "?????"
                        break
                    case 5:
                        if (!game.hints) {
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerText = "?????"
                        } else {
                            switch (p) {
                                case 107:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "And with our combined powers we will make great progress"
                                    break
                                case 108:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "Imagine if the game didn't play itself"
                                    break
                                case 109:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "Maybe you should go do something in real life"
                                    break
                                case 110:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "Ask nicely for this one first"
                                    break
                                case 111:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText = 'Do something "funny"'
                                    break
                                case 112:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText = "Be very lucky"
                                    break
                                case 113:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText = "Pay respects"
                                    break
                                case 114:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "A lot of work if you're blind"
                                    break
                                case 115:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText = "Throw it all away"
                                    break
                                case 116:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "Acquire appreciation for emoji"
                                    break
                                case 117:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "Excessively challenging if you're blind"
                                    break
                                case 118:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerText =
                                        "Straight to number two without number one"
                                    break
                            }
                        }
                        break
                }
            }
        } else {
            document.getElementById("slot" + (i + 1)).style.display = "none"
        }
    }

    let ach_completed = 0
    for (let i = 0; i < achievement.achievements.length; i++) {
        if (game.achievements[i]) ach_completed++
    }
    document.getElementById("achievement_count").innerText =
        "Achievements earned: " +
        ach_completed +
        " / " +
        achievement.achievements.length
    if (game.perks[0]) {
        document.getElementById("achievement_count").innerText =
            "Achievements earned: " +
            ach_completed +
            " / " +
            achievement.achievements.length +
            "\nEXP boost from Achievements: " +
            format_eff(game.ach_power) +
            "x"
    }
}

//updating descriptions of various things
function description_update() {
    pp_upgrade.upgrades[1].desc =
        "Unautomated clicks are " + format_num(2) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[1]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[1].desc
    pp_upgrade.upgrades[4].desc =
        "Unautomated clicks are " + format_num(4) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[4]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[4].desc
    pp_upgrade.upgrades[6].desc =
        "Breaks the limits, allowing you to go beyond LVL " +
        format_num(60) +
        "\nAlso allows Auto-Prestige configuration\n(Heads up! PP gain past LVL " +
        format_num(60) +
        " is based on highest level instead)"
    pp_map.get(pp_upgrade.upgrades[6]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[6].desc
    pp_upgrade.upgrades[7].desc =
        "All further Prestiges start at LVL " +
        format_num(15) +
        "; Prestiging now requires LVL " +
        format_num(70)
    pp_map.get(pp_upgrade.upgrades[7]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[7].desc
    pp_upgrade.upgrades[10].desc =
        "All further Prestiges start at LVL " +
        format_num(30) +
        "; Prestiging now requires LVL " +
        format_num(80)
    pp_map.get(pp_upgrade.upgrades[10]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[10].desc
    pp_upgrade.upgrades[11].desc =
        "Unautomated clicks are " + format_num(8) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[11]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[11].desc
    pp_upgrade.upgrades[13].desc =
        "All further Prestiges start at LVL " +
        format_num(60) +
        "; Prestiging now requires LVL " +
        format_num(90)
    pp_map.get(pp_upgrade.upgrades[13]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[13].desc
    pp_upgrade.upgrades[17].desc =
        "Unautomated clicks are " + format_num(16) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[17]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[17].desc
    pp_upgrade.upgrades[19].desc =
        "EXP Overclocker now boosts EXP " + format_num(4) + "x"
    pp_map.get(pp_upgrade.upgrades[19]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[19].desc
    pp_upgrade.upgrades[23].desc =
        "EXP Overclocker now boosts EXP " + format_num(5) + "x"
    pp_map.get(pp_upgrade.upgrades[23]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[23].desc
    pp_upgrade.upgrades[24].desc =
        "Unautomated clicks are boosted a further +32% for every Autoclicker tier\n(Currently: " +
        format_eff(16 + game.cps * 0.16) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[24].desc
    pp_upgrade.upgrades[27].desc =
        "EXP production is boosted based on how many times you have Prestiged\n(Currently: " +
        format_eff(
            1 + ((game.prestige + game.banked_prestige) / 1000) ** (1 / 2)
        ) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[27]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[27].desc
    pp_upgrade.upgrades[30].desc =
        "EXP production is boosted based on your highest level\n(Currently: " +
        format_eff(1 + game.highest_level / 400) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[30]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[30].desc
    pp_upgrade.upgrades[31].desc =
        "EXP Battery is now " + format_num(3) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[31]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[31].desc
    pp_upgrade.upgrades[36].desc =
        "EXP Battery is now " + format_num(9) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[36]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[36].desc

    if (game.pp !== 0)
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have\n(Currently: " +
            format_eff(Math.log(game.pp / 100 + 1) ** 2 + 1) +
            "x)"
    else
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have\n(Currently: " +
            format_num(1) +
            "x)"
    pp_map.get(pp_upgrade.upgrades[22]).querySelector(".pp_desc").innerText =
        pp_upgrade.upgrades[22].desc

    generator_perk.perks[3].desc =
        "EXP Flux permanently increases " +
        format_num(5) +
        "x faster and has a " +
        format_num(5) +
        "x higher cap\n(stacks with Magnified Flux if you have it, making it uncapped)"
    perk_map
        .get(generator_perk.perks[3])
        .querySelector(".perk_desc").innerText = generator_perk.perks[3].desc
    generator_perk.perks[4].desc =
        "You gain " +
        format_num(1) +
        " extra prestige stat for every " +
        format_num(200) +
        " levels gained\nPatience will also boost prestige stat by up to " +
        format_num(30) +
        "x"
    perk_map
        .get(generator_perk.perks[4])
        .querySelector(".perk_desc").innerText = generator_perk.perks[4].desc
    generator_perk.perks[9].desc =
        "Discharge is " +
        format_num(2) +
        "x stronger\nDischarge automation is also now unlocked with the EXP Capacitor instead of High Voltage I"
    perk_map
        .get(generator_perk.perks[9])
        .querySelector(".perk_desc").innerText = generator_perk.perks[9].desc
    generator_perk.perks[13].desc =
        "You gain more watts on Reboot the farther past " +
        format_num(200000) +
        " PP you go"
    perk_map
        .get(generator_perk.perks[13])
        .querySelector(".perk_desc").innerText = generator_perk.perks[13].desc
    if (game.fastest_reboot > 600 * game.tickspeed) {
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot\n(Currently: " +
            format_eff(1) +
            "x)"
    } else {
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot\n(Currently: " +
            format_eff(
                Math.log(game.fastest_reboot / (600 * game.tickspeed)) /
                    Math.log(0.75) +
                    1
            ) +
            "x)"
    }
    perk_map
        .get(generator_perk.perks[16])
        .querySelector(".perk_desc").innerText = generator_perk.perks[16].desc
    generator_perk.perks[23].desc =
        "Helium production is boosted based on how many watts you have\n(Currently: " +
        format_eff((game.watts * 5) / generator_perk.perks[23].requirement) +
        "x)"
    perk_map
        .get(generator_perk.perks[23])
        .querySelector(".perk_desc").innerText = generator_perk.perks[23].desc
    let he_boost = 1
    if (game.helium > 10) he_boost = Math.log10(game.helium)
    generator_perk.perks[24].desc =
        "Helium production is boosted based on how much helium you have\n(Currently: " +
        format_eff(he_boost) +
        "x)"
    perk_map
        .get(generator_perk.perks[24])
        .querySelector(".perk_desc").innerText = generator_perk.perks[24].desc
    generator_perk.perks[25].desc =
        "Deuterium Power now boosts hydrogen gains " +
        format_eff(2.5) +
        "x per tier instead\n(This applies retroactively)"
    perk_map
        .get(generator_perk.perks[25])
        .querySelector(".perk_desc").innerText = generator_perk.perks[25].desc

    if (game.challenge === 7) {
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have\n(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[22])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[22].desc
        pp_upgrade.upgrades[24].desc =
            "Unautomated clicks are boosted a further +32% for every Autoclicker tier\n(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[24])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[24].desc
        pp_upgrade.upgrades[27].desc =
            "EXP production is boosted based on how many times you have Prestiged\n(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[27])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[27].desc
        pp_upgrade.upgrades[30].desc =
            "EXP production is boosted based on your highest level\n(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[30])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[30].desc
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot\n(Currently: " +
            format_eff(1) +
            "x)"
        perk_map
            .get(generator_perk.perks[16])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[16].desc
    }

    achievement.achievements[0].requirement = "Reach LVL " + format_num(2)
    achievement.achievements[1].requirement = "Reach LVL " + format_num(10)
    achievement.achievements[2].requirement = "Reach LVL " + format_num(30)
    achievement.achievements[3].requirement = "Reach LVL " + format_num(60)
    achievement.achievements[4].requirement = "Reach LVL " + format_num(100)
    achievement.achievements[5].requirement = "Reach LVL " + format_num(200)
    achievement.achievements[6].requirement = "Reach LVL " + format_num(300)
    achievement.achievements[7].requirement = "Reach LVL " + format_num(500)
    achievement.achievements[8].requirement = "Reach LVL " + format_num(1000)
    achievement.achievements[9].requirement = "Reach LVL " + format_num(2000)
    achievement.achievements[10].requirement = "Reach LVL " + format_num(3000)
    achievement.achievements[11].requirement = "Reach LVL " + format_num(6000)
    achievement.achievements[12].requirement = "Reach LVL " + format_num(12000)
    achievement.achievements[13].requirement = "Reach LVL " + format_num(18000)
    achievement.achievements[14].requirement = "Reach LVL " + format_num(24000)
    achievement.achievements[15].requirement = "Reach LVL " + format_num(30000)
    achievement.achievements[16].requirement = "Reach LVL " + format_num(40000)
    achievement.achievements[17].requirement = "Reach LVL " + format_num(50000)
    achievement.achievements[18].requirement = "Reach LVL " + format_num(60000)
    achievement.achievements[20].requirement =
        "Prestige " + format_num(10) + " times"
    achievement.achievements[21].requirement =
        "Prestige " + format_num(100) + " times"
    achievement.achievements[22].requirement =
        "Prestige " + format_num(1000) + " times"
    achievement.achievements[23].requirement =
        "Prestige " + format_num(10000) + " times"
    achievement.achievements[24].requirement =
        "Prestige " + format_num(100000) + " times"
    achievement.achievements[25].requirement =
        "Prestige " + format_num(1000000) + " times"
    achievement.achievements[26].requirement =
        "Get " + format_num(10 ** 6) + " all time EXP"
    achievement.achievements[27].requirement =
        "Get " + format_num(10 ** 9) + " all time EXP"
    achievement.achievements[28].requirement =
        "Get " + format_num(10 ** 12) + " all time EXP"
    achievement.achievements[29].requirement =
        "Get " + format_num(10 ** 15) + " all time EXP"
    achievement.achievements[30].requirement =
        "Get " + format_num(10 ** 18) + " all time EXP"
    achievement.achievements[31].requirement =
        "Get " + format_num(10 ** 21) + " all time EXP"
    achievement.achievements[32].requirement =
        "Get " + format_num(10 ** 24) + " all time EXP"
    achievement.achievements[33].requirement =
        "Get " + format_num(10 ** 27) + " all time EXP"
    achievement.achievements[34].requirement =
        "Get " + format_num(10 ** 30) + " all time EXP"
    achievement.achievements[35].requirement =
        "Get " + format_num(10 ** 33) + " all time EXP"
    achievement.achievements[36].requirement =
        "Get " + format_num(10 ** 36) + " all time EXP"
    achievement.achievements[37].requirement =
        "Get " + format_num(10 ** 39) + " all time EXP"
    achievement.achievements[38].requirement =
        "Get " + format_num(10 ** 42) + " all time EXP"
    achievement.achievements[39].requirement =
        "Get " + format_num(10 ** 45) + " all time EXP"
    achievement.achievements[40].requirement =
        "Get " + format_num(10 ** 48) + " all time EXP"
    achievement.achievements[41].requirement =
        "Get " + format_num(10 ** 51) + " all time EXP"
    achievement.achievements[42].requirement =
        "Get " + format_num(10 ** 57) + " all time EXP"
    achievement.achievements[43].requirement =
        "Get " + format_num(10 ** 63) + " all time EXP"
    achievement.achievements[44].requirement =
        "Get " + format_num(10 ** 75) + " all time EXP"
    achievement.achievements[45].requirement =
        "Get " + format_num(10 ** 87) + " all time EXP"
    achievement.achievements[46].requirement =
        "Get " + format_num(10 ** 99) + " all time EXP"
    achievement.achievements[47].requirement =
        "Get " + format_num(10 ** 111) + " all time EXP"
    achievement.achievements[53].requirement = "Get " + format_num(100) + " AMP"
    achievement.achievements[54].requirement =
        "Get " + format_num(10000) + " AMP"
    achievement.achievements[55].requirement =
        "Get " + format_num(10 ** 6) + " AMP"
    achievement.achievements[56].requirement =
        "Get " + format_num(10 ** 8) + " AMP"
    achievement.achievements[57].requirement =
        "Get " + format_num(10 ** 10) + " AMP"
    achievement.achievements[58].requirement =
        "Get " + format_num(10 ** 12) + " AMP"
    achievement.achievements[59].requirement =
        "Get " + format_num(10 ** 14) + " AMP"
    achievement.achievements[60].requirement =
        "Get " + format_num(10 ** 16) + " AMP"
    achievement.achievements[61].requirement =
        "Get " + format_num(10 ** 18) + " AMP"
    achievement.achievements[62].requirement =
        "Get " + format_num(10 ** 20) + " AMP"
    achievement.achievements[63].requirement =
        "Get " + format_num(10 ** 24) + " AMP"
    achievement.achievements[64].requirement =
        "Get " + format_num(10 ** 28) + " AMP"
    achievement.achievements[73].requirement =
        "Buy all " + format_num(40) + " Prestige upgrades"
    achievement.achievements[74].requirement =
        "Reach " + format_num(100) + "x EXP Flux boost"
    achievement.achievements[75].requirement =
        "Reach " + format_num(30) + " clicks/s on the Autoclicker"
    achievement.achievements[76].requirement =
        "Reach " + format_num(150) + " clicks/s on the Autoclicker"
    achievement.achievements[77].requirement =
        "Reach " + format_num(1000) + " clicks/s on the Autoclicker"
    achievement.achievements[79].requirement =
        "Reboot " + format_num(3) + " times"
    achievement.achievements[80].requirement =
        "Reboot " + format_num(5) + " times"
    achievement.achievements[81].requirement =
        "Reboot " + format_num(10) + " times"
    achievement.achievements[82].requirement =
        "Reboot " + format_num(25) + " times"
    achievement.achievements[83].requirement =
        "Reboot " + format_num(50) + " times"
    achievement.achievements[84].requirement =
        "Reboot " + format_num(100) + " times"
    achievement.achievements[85].requirement =
        "Reboot " + format_num(1000) + " times"
    achievement.achievements[99].requirement =
        "Complete a single challenge " + format_num(12) + " times"
    achievement.achievements[100].requirement =
        "Get " + format_num(27) + " total challenge completions"
    achievement.achievements[101].requirement =
        "Get " + format_num(54) + " total challenge completions"
    achievement.achievements[102].requirement =
        "Get " + format_num(108) + " total challenge completions"
    achievement.achievements[103].requirement =
        "Unlock all " + format_num(28) + " Generator Perks"
    achievement.achievements[106].requirement =
        "Make " + format_num(10 ** 30) + " mg helium/sec"
    achievement.achievements[112].requirement =
        "There is a " +
        format_num(1) +
        " in " +
        format_num(7777) +
        " chance every second you will get this achievement"
    achievement.achievements[116].requirement =
        "Reboot " + format_num(10) + " times while using Cancer notation"

    challenge.challenges[1].desc =
        "All upgrades require " + format_num(5) + "x as many levels"
    challenge_map
        .get(challenge.challenges[1])
        .querySelector(".challenge_desc").innerText =
        challenge.challenges[1].desc
    challenge.challenges[8].desc =
        "All rules from the first four challenges, simultaneously\nAll EXP production is divided by " +
        format_num(10 ** 16) +
        ", AMP Conversion does not apply"
    challenge_map
        .get(challenge.challenges[8])
        .querySelector(".challenge_desc").innerText =
        challenge.challenges[8].desc

    switch (game.notation) {
        case 0:
            achievement.achievements[39].name =
                "Why are you still using Long notation?"
            break
        case 1:
            achievement.achievements[39].name =
                "Why are you still using Standard notation?"
            break
        case 2:
        case 3:
            achievement.achievements[39].name = "45 digits is a lot"
            break
        case 4:
            achievement.achievements[39].name =
                "Why are you still using Condensed notation?"
            break
        case 5:
            achievement.achievements[39].name = "45 digits is a lot"
            break
        case 6:
            achievement.achievements[39].name =
                "This achievement brought to you by the letter N"
            break
        case 7:
            achievement.achievements[39].name = "Cancerously huge"
            break
        case 8:
            achievement.achievements[39].name = "Can't even see how big this is"
            break
    }

    if (game.notation === 8) {
        pp_upgrade.upgrades[14].desc =
            "Unlocks the EXP Overclocker, which boosts EXP ???x for ???"
        pp_map
            .get(pp_upgrade.upgrades[14])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[14].desc
        pp_upgrade.upgrades[29].desc =
            "Longer Prestiges give more AMP (up to ???)"
        pp_map
            .get(pp_upgrade.upgrades[29])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[29].desc
        pp_upgrade.upgrades[37].desc =
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge"
        pp_map
            .get(pp_upgrade.upgrades[37])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[37].desc
        pp_upgrade.upgrades[38].desc =
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge\nAlso allows you to Discharge at ???"
        pp_map
            .get(pp_upgrade.upgrades[38])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[38].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +??? for every achievement completed\nAlso unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[0].desc
        generator_perk.perks[18].desc =
            "You permanently keep ??? of your Times Prestiged stat every Reboot"
        perk_map
            .get(generator_perk.perks[18])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[18].desc

        achievement.achievements[19].requirement = "Prestige ??? times"
        achievement.achievements[48].requirement = "Play for ???"
        achievement.achievements[49].requirement = "Play for ???"
        achievement.achievements[50].requirement = "Play for ???"
        achievement.achievements[51].requirement = "Play for ???"
        achievement.achievements[52].requirement = "Play for ???"
        achievement.achievements[86].requirement = "Reboot in under ???"
        achievement.achievements[87].requirement = "Reboot in under ???"
        achievement.achievements[88].requirement = "Reboot in under ???"
        achievement.achievements[89].requirement = "Reboot in under ???"
        achievement.achievements[109].requirement =
            "Do absolutely nothing for ???"

        if (game.perks[9]) {
            pp_upgrade.upgrades[35].desc =
                "Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[35].desc
        } else {
            pp_upgrade.upgrades[35].desc =
                "Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge\nAlso unlocks automation for Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[35].desc
        }

        if (game.perks[17]) {
            generator_perk.perks[6].desc =
                "All Upgrades require ??? fewer levels\n(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require ??? fewer levels\n(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[21].desc
        } else {
            generator_perk.perks[6].desc =
                "All Upgrades require ??? fewer levels"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require ??? fewer levels"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[21].desc
        }
    } else {
        pp_upgrade.upgrades[14].desc =
            "Unlocks the EXP Overclocker, which boosts EXP 3x for 45 seconds"
        pp_map
            .get(pp_upgrade.upgrades[14])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[14].desc
        pp_upgrade.upgrades[29].desc =
            "Longer Prestiges give more AMP (up to 10 seconds)"
        pp_map
            .get(pp_upgrade.upgrades[29])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[29].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +5% for every achievement completed\nAlso unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[0].desc
        generator_perk.perks[18].desc =
            "You permanently keep 25% of your Times Prestiged stat every Reboot"
        perk_map
            .get(generator_perk.perks[18])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[18].desc

        achievement.achievements[19].requirement = "Prestige 1 time"
        achievement.achievements[48].requirement = "Play for 1 hour"
        achievement.achievements[49].requirement = "Play for 6 hours"
        achievement.achievements[50].requirement = "Play for 24 hours"
        achievement.achievements[51].requirement = "Play for 72 hours"
        achievement.achievements[52].requirement = "Play for 168 hours"
        achievement.achievements[86].requirement = "Reboot in under 1 hour"
        achievement.achievements[87].requirement = "Reboot in under 10 minutes"
        achievement.achievements[88].requirement = "Reboot in under 1 minute"
        achievement.achievements[89].requirement = "Reboot in under 1 second"
        achievement.achievements[109].requirement =
            "Do absolutely nothing for 10 minutes"

        if (game.perks[9]) {
            pp_upgrade.upgrades[35].desc =
                "Unlocks 50% Capacitance mode, which gives a 8x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[35].desc
            pp_upgrade.upgrades[37].desc =
                "Unlocks 75% Capacitance mode, giving a 12x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[37])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[37].desc
            pp_upgrade.upgrades[38].desc =
                "Unlocks 100% Capacitance mode, giving a 16x boost on Discharge\nAlso allows you to Discharge at 0 seconds"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[38].desc
        } else {
            pp_upgrade.upgrades[35].desc =
                "Unlocks 50% Capacitance mode, which gives a 4x boost on Discharge\nAlso unlocks automation for Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[35].desc
            pp_upgrade.upgrades[37].desc =
                "Unlocks 75% Capacitance mode, giving a 6x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[37])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[37].desc
            pp_upgrade.upgrades[38].desc =
                "Unlocks 100% Capacitance mode, giving a 8x boost on Discharge\nAlso allows you to Discharge at 0 seconds"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[38].desc
        }

        if (game.perks[17]) {
            generator_perk.perks[6].desc =
                "All Upgrades require 25% fewer levels\n(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require 50% fewer levels\n(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[21].desc
        } else {
            generator_perk.perks[6].desc =
                "All Upgrades require 25% fewer levels"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require 50% fewer levels"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerText =
                generator_perk.perks[21].desc
        }
    }

    if (game.perks[0]) {
        pp_upgrade.upgrades[12].desc =
            "Unlocks four additional modes for Auto-Prestige configuration"
        pp_map
            .get(pp_upgrade.upgrades[12])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[12].desc
    } else {
        pp_upgrade.upgrades[12].desc =
            "Unlocks three additional modes for Auto-Prestige configuration"
        pp_map
            .get(pp_upgrade.upgrades[12])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[12].desc
    }

    if (game.perks[8]) {
        pp_upgrade.upgrades[25].desc =
            "Unlocks an upgrade that gives an additional multiplier to EXP"
        pp_map
            .get(pp_upgrade.upgrades[25])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[25].desc
    } else {
        pp_upgrade.upgrades[25].desc =
            "Unlocks an upgrade that gives an additional multiplier to EXP with active and idle modes"
        pp_map
            .get(pp_upgrade.upgrades[25])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[25].desc
    }

    if (game.perks[9]) {
        pp_upgrade.upgrades[32].desc =
            "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it\nStored EXP can later be discharged at a " +
            format_num(4) +
            "x boost\nAlso starts with automation unlocked"
        pp_map
            .get(pp_upgrade.upgrades[32])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[32].desc
    } else {
        pp_upgrade.upgrades[32].desc =
            "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it\nStored EXP can later be discharged at a " +
            format_num(2) +
            "x boost"
        pp_map
            .get(pp_upgrade.upgrades[32])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[32].desc
    }

    if (game.perks[12]) {
        pp_upgrade.upgrades[9].desc =
            "+" +
            format_num(8) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map.get(pp_upgrade.upgrades[9]).querySelector(".pp_desc").innerText =
            pp_upgrade.upgrades[9].desc
        pp_upgrade.upgrades[18].desc =
            "+" +
            format_num(12) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[18])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[18].desc
        pp_upgrade.upgrades[28].desc =
            "+" +
            format_num(16) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[28])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[28].desc
        pp_upgrade.upgrades[34].desc =
            "+" +
            format_num(20) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[34])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[34].desc
        generator_perk.perks[1].desc =
            "+" +
            format_num(24) +
            " free tiers on every upgrade on the Upgrades tab"
        perk_map
            .get(generator_perk.perks[1])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[1].desc
    } else {
        pp_upgrade.upgrades[9].desc =
            "+" +
            format_num(4) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map.get(pp_upgrade.upgrades[9]).querySelector(".pp_desc").innerText =
            pp_upgrade.upgrades[9].desc
        pp_upgrade.upgrades[18].desc =
            "+" +
            format_num(6) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[18])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[18].desc
        pp_upgrade.upgrades[28].desc =
            "+" +
            format_num(8) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[28])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[28].desc
        pp_upgrade.upgrades[34].desc =
            "+" +
            format_num(10) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[34])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[34].desc
        generator_perk.perks[1].desc =
            "+" +
            format_num(12) +
            " free tiers on every upgrade on the Upgrades tab"
        perk_map
            .get(generator_perk.perks[1])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[1].desc
    }

    if (game.perks[17]) {
        generator_perk.perks[15].desc =
            "Unlocks automation for Reboot\nAlso has an average watts/sec display\n(Does not apply to challenges)"
        perk_map
            .get(generator_perk.perks[15])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[15].desc
    } else {
        generator_perk.perks[15].desc =
            "Unlocks automation for Reboot\nAlso has an average watts/sec display"
        perk_map
            .get(generator_perk.perks[15])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[15].desc
    }

    switch (game.completions[5]) {
        case 0:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply\nReboot in 6 Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerText =
                challenge.challenges[5].desc
            break
        case 1:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply\nReboot in 5 Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerText =
                challenge.challenges[5].desc
            break
        case 2:
        case 3:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply\nReboot in 4 Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerText =
                challenge.challenges[5].desc
            break
        case 4:
        case 5:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply\nReboot in 3 Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerText =
                challenge.challenges[5].desc
            break
        case 6:
        case 7:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply\nReboot in 2 Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerText =
                challenge.challenges[5].desc
            break
        case 8:
        case 9:
        case 10:
        case 11:
        default:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply\nReboot in 1 Prestige or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerText =
                challenge.challenges[5].desc
            break
    }
}

//make all gui match the loaded save data
function regenerate_ui() {
    color_update()
    reset_button_update()
    pp_update()
    challenge_update()
    reactor_update()
    goto_tab(game.tab)
    if (game.tab === 2) {
        goto_subtab(game.subtab[0])
    } else if (game.tab === 3) {
        goto_subtab(game.subtab[1])
    }
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
    switch (game.switchpoint) {
        case 0:
            document.getElementById("switchpoint_button").innerText = "MILLION"
            break
        case 1:
            document.getElementById("switchpoint_button").innerText = "BILLION"
            break
    }
    if (game.hotkeys) {
        document.getElementById("hotkeys_button").innerText = "ENABLED"
    } else {
        document.getElementById("hotkeys_button").innerText = "DISABLED"
    }
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
    if (game.pp_progress && (game.prestige >= 1 || game.reboot >= 1)) {
        document.getElementById("pp_bar_button").innerText = "ENABLED"
        document.getElementById("pp_back").style.display = "block"
    } else {
        document.getElementById("pp_bar_button").innerText = "DISABLED"
        document.getElementById("pp_back").style.display = "none"
    }
    if (game.epilepsy) {
        document.getElementById("epilepsy_button").innerText = "DISABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "white"
        )
        document.documentElement.style.setProperty("--button_color", "black")
        document.documentElement.style.setProperty("--enter_color", "white")
        document.documentElement.style.setProperty("--enter_shadow", "white")
    } else {
        document.getElementById("epilepsy_button").innerText = "ENABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "#780e74"
        )
        document.documentElement.style.setProperty("--button_color", "white")
        document.documentElement.style.setProperty("--enter_color", "#ff2929")
        document.documentElement.style.setProperty("--enter_shadow", "#ff0000")
    }
    switch (game.color_mode) {
        case 0:
            document.getElementById("color_button").innerText = "AUTOMATIC"
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
    if (game.confirmation) {
        document.getElementById("confirm_button").innerText = "ENABLED"
    } else {
        document.getElementById("confirm_button").innerText = "DISABLED"
    }
    if (game.challenge_confirmation) {
        document.getElementById("ch_confirm_button").innerText = "ENABLED"
    } else {
        document.getElementById("ch_confirm_button").innerText = "DISABLED"
    }
    switch (game.priority_layer) {
        case 0:
            document.getElementById("layer_button").innerText = "NONE"
            break
        case 1:
            document.getElementById("layer_button").innerText = "PRESTIGE"
            break
        case 2:
            document.getElementById("layer_button").innerText = "REBOOT"
            break
    }
    if (game.hints) {
        document.getElementById("hints_button").innerText = "ENABLED"
    } else {
        document.getElementById("hints_button").innerText = "DISABLED"
    }

    if (game.pp_bought[39] == true) {
        document.getElementById("reboot").style.display = "inline"
        watts_update()
    } else {
        document.getElementById("reboot").style.display = "none"
    }

    document.getElementById("lvlnum").innerText = format_num(game.level)
    document.getElementById("exp").innerText =
        format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerText =
        format_num(game.total_exp) + " Total EXP"

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
    pp_switch(game.autopp_mode)
    cp_toggle()
    cp_toggle()
    battery_toggle()
    battery_toggle()
    max_toggle()
    max_toggle()
    autopr_switch(game.autopr_mode)
    if (game.level < 60) {
        document.getElementById("progress").style.width =
            (100 * game.exp) / game.goal + "%"
    } else {
        document.getElementById("progress").style.width = 100 + "%"
    }

    if (game.achiev_page === 0) {
        document.getElementById("page_left1").style.display = "none"
        document.getElementById("page_left2").style.display = "none"
    }
    if (
        game.achiev_page === Math.ceil(achievement.achievements.length / 10 - 1)
    ) {
        document.getElementById("page_right1").style.display = "none"
        document.getElementById("page_right2").style.display = "none"
    }

    document.getElementById("page_text1").innerText =
        "Page " + (game.achiev_page + 1)
    document.getElementById("page_text2").innerText =
        "Page " + (game.achiev_page + 1)

    if (game.pp_bought[3]) {
        document.getElementById("amp_auto").style.display = "inline"
        document.getElementById("auto_config").style.display = "block"
        if (game.pp_bought[6]) {
            document.getElementById("auto_level").style.display = "block"
            if (game.pp_bought[12]) {
                document.getElementById("auto_mode").style.display = "block"
                if (game.perks[0])
                    document.getElementById("peak_mode").style.display =
                        "inline"
                else document.getElementById("peak_mode").style.display = "none"
                autopr_switch(game.autopr_mode)
            } else {
                document.getElementById("auto_mode").style.display = "none"
            }
        } else {
            document.getElementById("auto_level").style.display = "none"
        }
    } else {
        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
    }

    if (
        game.pp_bought[14] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("overclock").style.display = "block"
        switch (game.oc_state) {
            case 0:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerText = "Recharging"
                document.getElementById("oc_timer").style.display = "block"
                document.getElementById("oc_progress").style.background =
                    "#ff2f00"
                break
            case 1:
                document.getElementById("oc_button").style.display = "inline"
                document.getElementById("oc_state").innerText = "Standby"
                document.getElementById("oc_timer").style.display = "none"
                document.getElementById("oc_progress").style.background =
                    "#ff2f00"
                break
            case 2:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerText =
                    "Boosting " + format_num(game.exp_oc) + "x"
                document.getElementById("oc_timer").style.display = "block"
                document.getElementById("oc_progress").style.background =
                    "#ff7f00"
                break
        }

        if (game.pp_bought[16]) {
            if (!game.perks[20])
                document.getElementById("oc_auto").style.display = "inline"
        } else {
            document.getElementById("oc_auto").style.display = "none"
        }
    } else {
        document.getElementById("overclock").style.display = "none"
    }

    if (
        game.pp_bought[32] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("capacitor").style.display = "block"
        set_capacitance(game.cap_mode)
        if (game.perks[9]) {
            document.getElementById("dis_auto").style.display = "block"
            if (game.autods_toggle !== 2) {
                document.getElementById("dis_text").style.display = "block"
                document.getElementById("dis_input").style.display = "block"
            } else {
                document.getElementById("dis_text").style.display = "none"
                document.getElementById("dis_input").style.display = "none"
            }
            document.getElementById("dis_input").value = game.autods_goal
        }
    } else {
        document.getElementById("capacitor").style.display = "none"
    }

    if (
        game.pp_bought[35] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("cap_50").style.display = "inline"
        document.getElementById("cap_disc").style.display = "inline"
        if (!game.perks[9]) {
            document.getElementById("dis_auto").style.display = "block"
            if (game.autods_toggle !== 2) {
                document.getElementById("dis_text").style.display = "block"
                document.getElementById("dis_input").style.display = "block"
            } else {
                document.getElementById("dis_text").style.display = "none"
                document.getElementById("dis_input").style.display = "none"
            }
            document.getElementById("dis_input").value = game.autods_goal
        }
    } else {
        document.getElementById("cap_50").style.display = "none"
        document.getElementById("cap_disc").style.display = "none"
    }

    if (
        game.pp_bought[37] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("cap_75").style.display = "inline"
    } else {
        document.getElementById("cap_75").style.display = "none"
    }

    if (
        game.pp_bought[38] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("cap_100").style.display = "inline"
        document.getElementById("dis_input").min = 0
    } else {
        document.getElementById("cap_100").style.display = "none"
    }

    if (game.perks[7]) {
        document.getElementById("autopp_config").style.display = "block"

        for (const upgrade of pp_upgrade.upgrades) {
            if (upgrade.id !== 39) {
                let element = pp_map.get(upgrade)
                let text = element.querySelector(".pp_text")
                let priority = text.querySelector(".pp_priority")
                let input = priority.querySelector(".priority_input")
                input.value = game.priority[upgrade.id]
            }
        }
    } else {
        document.getElementById("autopp_config").style.display = "none"
    }

    if (game.perks[11])
        document.getElementById("cap_auto").style.display = "inline"
    else document.getElementById("cap_auto").style.display = "none"

    if (game.perks[14]) {
        document.getElementById("smart_config").style.display = "block"
        document.getElementById("smart_peak_input").value = game.smartpr_peak
        document.getElementById("smart_pp_input").value = game.smartpr_pp
        document.getElementById("smart_amp_input").value = game.smartpr_amp
        smart_toggle()
        smart_toggle()
        initial_switch(game.smartpr_start)
    } else {
        document.getElementById("smart_config").style.display = "none"
    }

    if (game.perks[15]) {
        if (game.challenge === 0)
            document.getElementById("autorb_block").style.display = "block"
        else document.getElementById("autorb_block").style.display = "none"
        if (!game.confirmation) {
            rb_toggle()
            rb_toggle()
        } else {
            game.autorb_toggle = false
        }
        document.getElementById("watts_input").value = game.autorb_goal
        pendingrb_toggle()
        pendingrb_toggle()
    } else {
        document.getElementById("autorb_block").style.display = "none"
    }

    document.getElementById("level_input").value = game.autopr_goal[0]
    document.getElementById("amp_input").value = game.autopr_goal[1]
    document.getElementById("pp_input").value = game.autopr_goal[2]
    document.getElementById("time_input").value = game.autopr_goal[3]

    document.getElementById("hue_input").value = game.custom_hue

    document.getElementById("refresh_input").value = game.refresh_rate
}
