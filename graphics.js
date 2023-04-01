//updating the color of the level bar
function color_update() {
    if (!meme) {
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
}

//updating level related stuff
function level_update() {
    if (
        game.level < game.pr_min ||
        (game.pp_bought[6] && game.level < 1000000)
    ) {
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
            game.reboot_exp -=
                game.total_exp - Math.ceil(get_exp(game.pr_min - 1))
            game.prestige_exp -=
                game.total_exp - Math.ceil(get_exp(game.pr_min - 1))
            game.total_exp = Math.ceil(get_exp(game.pr_min - 1))
            game.level = game.pr_min

            game.exp = game.total_exp - Math.ceil(get_exp(game.level - 1))
            game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level - 1))
        }
    }

    if (
        game.pp_progress &&
        (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1)
    ) {
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

    document.getElementById("lvlnum").innerHTML = format_lvl(game.level)
    if (game.level < 60 || (game.pp_bought[6] && game.level < 1000000))
        document.getElementById("exp").innerHTML =
            format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    else document.getElementById("exp").innerHTML = "Maxed!"

    if (game.priority_layer === 2) {
        document.getElementById("total_exp").innerHTML =
            format_num(game.prestige_exp) + " Total EXP"
    } else if (game.priority_layer === 1) {
        document.getElementById("total_exp").innerHTML =
            format_num(game.total_exp) + " Total EXP"
    } else {
        if (game.reboot >= 1 || game.quantum >= 1) {
            document.getElementById("total_exp").innerHTML =
                format_num(game.prestige_exp) + " Total EXP"
        } else {
            document.getElementById("total_exp").innerHTML =
                format_num(game.total_exp) + " Total EXP"
        }
    }

    if (
        game.level >= 1000000 ||
        game.highest_level >= 1000000 ||
        game.reboot_highest_level >= 1000000 ||
        game.all_time_highest_level >= 1000000
    )
        document.getElementById("the_end").style.display = "inline"
    else document.getElementById("the_end").style.display = "none"
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
            document.getElementById("click").innerHTML =
                "+" +
                format_num(
                    Math.round(
                        game.exp_add * game.ml_boost * game.global_multiplier
                    )
                ) +
                " EXP"
        else
            document.getElementById("click").innerHTML =
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
            document.getElementById("click").innerHTML =
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
            document.getElementById("click").innerHTML =
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
            document.getElementById("amp").innerHTML =
                format_num(game.amp) + " AMP"
            document.getElementById("pp").innerHTML =
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
                document.getElementById("amp_up").innerHTML =
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
                document.getElementById("pp_up").innerHTML =
                    "+" + format_num(pp_amount) + " PP"
                if (
                    (pp_amount >= 1 || game.notation === 8) &&
                    !game.perks[27]
                ) {
                    document.getElementById("pp_up").style.display = "inline"
                } else {
                    document.getElementById("pp_up").style.display = "none"
                }
                document.getElementById("amp_button").innerHTML = "PRESTIGE!"
                if (!meme)
                    document.getElementById("amp_button").style.color = "white"
                else document.getElementById("amp_button").disabled = false
                document.getElementById("amp_button").style.cursor = "pointer"
            } else {
                document.getElementById("amp_up").style.display = "none"
                document.getElementById("pp_up").style.display = "none"
                document.getElementById("amp_button").innerHTML =
                    "LVL " + format_lvl(game.pr_min)
                if (!meme)
                    document.getElementById("amp_button").style.color =
                        get_color((Math.floor(game.pr_min / 60) + 5) % 12)
                else document.getElementById("amp_button").disabled = true
                document.getElementById("amp_button").style.cursor = "default"
            }
        } else {
            if (game.level >= game.highest_level) {
                let amp_amount =
                    get_amp(game.level) - get_amp(game.highest_level)
                document.getElementById("amp_up").style.display = "inline"
                document.getElementById("amp_up").innerHTML =
                    "+" +
                    format_num(Math.floor(amp_amount * game.watt_boost)) +
                    " AMP"
                let pp_amount = 0
                if (game.prestige <= 21)
                    pp_amount =
                        get_pp(game.level) - get_pp(game.highest_level) + 1
                else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
                document.getElementById("pp_up").innerHTML =
                    "+" + format_num(pp_amount) + " PP"
                if (
                    (pp_amount >= 1 || game.notation === 8) &&
                    !game.perks[27]
                ) {
                    document.getElementById("pp_up").style.display = "inline"
                } else {
                    document.getElementById("pp_up").style.display = "none"
                }
                document.getElementById("amp_button").innerHTML = "PRESTIGE!"
                if (!meme)
                    document.getElementById("amp_button").style.color = "white"
                else document.getElementById("amp_button").disabled = false
                document.getElementById("amp_button").style.cursor = "pointer"
            } else {
                document.getElementById("amp_up").style.display = "none"
                document.getElementById("pp_up").style.display = "none"
                document.getElementById("amp_button").innerHTML =
                    "LVL " + format_lvl(game.highest_level)

                if (!meme) {
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
                } else document.getElementById("amp_button").disabled = true
                document.getElementById("amp_button").style.cursor = "default"
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
            document.getElementById("watts2").innerHTML =
                format_num(game.watts) + " watt"
        else
            document.getElementById("watts2").innerHTML =
                format_num(game.watts) + " watts"
        if (game.perks[22] || game.quantum >= 1)
            document.getElementById("hydrogen3").style.display = "block"
        else document.getElementById("hydrogen3").style.display = "none"
        document.getElementById("hydrogen3").innerHTML =
            format_eff(game.hydrogen) + " g hydrogen"

        let all_pp_upgrades = true
        for (const upgrade2 of pp_upgrade.upgrades) {
            if (
                upgrade2.id < 39 &&
                upgrade2.id !== 8 &&
                !game.pp_bought[upgrade2.id]
            )
                all_pp_upgrades = false
        }

        let reboot_requirement = 0
        if (game.reboot >= 1 || game.quantum >= 1)
            reboot_requirement = 5000 * game.reboot + 80000
        if (game.reboot >= 24 || game.quantum >= 1) reboot_requirement = 200000

        if (game.qu_bought[2]) {
            if (game.challenge !== 0 && !entering) {
                if (game.prev_completions < 12) {
                    reboot_requirement =
                        challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.prev_completions +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.prev_completions - 1) *
                            game.prev_completions) /
                            2
                } else {
                    if (game.dk_bought[3]) {
                        if (game.prev_completions < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.prev_completions - 12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.prev_completions - 13) *
                                    (game.prev_completions - 12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        } else {
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
                    if (game.dk_bought[3]) {
                        if (game.completions[game.challenge - 1] < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.completions[game.challenge - 1] -
                                        12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.completions[game.challenge - 1] -
                                        13) *
                                    (game.completions[game.challenge - 1] -
                                        12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        }

        if (all_pp_upgrades && game.pp >= reboot_requirement) {
            document.getElementById("watt_button").className =
                "button reboot_power"
            document.getElementById("watts_up").style.display = "inline"
            if (meme) document.getElementById("watt_button").disabled = false
            if (!game.perks[13]) {
                if (
                    game.notation !== 8 &&
                    game.prism_level === 0 &&
                    game.om_boost[0] === 1
                )
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(game.prism_boost * game.om_boost[0]) +
                        " watt"
                else
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(game.prism_boost * game.om_boost[0]) +
                        " watts"
            } else {
                if (
                    get_watts(game.pp) * game.prism_boost * game.om_boost[0] ===
                        1 &&
                    game.notation !== 8
                )
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(
                            get_watts(game.pp) *
                                game.prism_boost *
                                game.om_boost[0]
                        ) +
                        " watt"
                else
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(
                            get_watts(game.pp) *
                                game.prism_boost *
                                game.om_boost[0]
                        ) +
                        " watts"
                if (
                    game.perks[22] &&
                    (game.watts >= 98304 || game.dk_bought[5])
                ) {
                    document.getElementById("hydrogen_up").style.display =
                        "inline"
                    document.getElementById("hydrogen_up").innerHTML =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                2 ** game.supply_level *
                                game.prism_boost
                        ) +
                        " g hydrogen"
                    if (game.perks[25])
                        document.getElementById("hydrogen_up").innerHTML =
                            "+" +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    2.5 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            " g hydrogen"
                    if (game.dk_bought[5])
                        document.getElementById("hydrogen_up").innerHTML =
                            "+" +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    3 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            " g hydrogen"
                }
            }
        } else {
            document.getElementById("watt_button").className =
                "button no_reboot_power"
            document.getElementById("watts_up").style.display = "none"
            document.getElementById("hydrogen_up").style.display = "none"
            if (meme) document.getElementById("watt_button").disabled = true
        }
    } else {
        document.getElementById("reboot_area").style.display = "none"
        document.getElementById("watts2").style.display = "none"
        document.getElementById("hydrogen3").style.display = "none"
    }

    if (game.priority_layer === 3) {
        document.getElementById("quantum_area").style.display = "block"
        document.getElementById("photons2").style.display = "block"
        if (game.photons === 1)
            document.getElementById("photons2").innerHTML =
                format_num(game.photons) + " photon"
        else
            document.getElementById("photons2").innerHTML =
                format_num(game.photons) + " photons"

        let all_pp_upgrades = true
        for (const upgrade2 of pp_upgrade.upgrades) {
            if (
                upgrade2.id < 39 &&
                upgrade2.id !== 8 &&
                !game.pp_bought[upgrade2.id]
            )
                all_pp_upgrades = false
        }

        let total_completions =
            game.completions[0] +
            game.completions[1] +
            game.completions[2] +
            game.completions[3] +
            game.completions[4] +
            game.completions[5] +
            game.completions[6] +
            game.completions[7] +
            game.completions[8]

        let highest_level = game.reboot_highest_level
        if (game.highest_level > highest_level)
            highest_level = game.highest_level
        if (game.level > highest_level) highest_level = game.level

        let amount = Math.floor(1000000 ** ((highest_level - 65536) / 32768))

        if (total_completions >= 108 && highest_level >= 65536) {
            document.getElementById("photon_button").className = "button lit"
            document.getElementById("photons_up2").style.display = "inline"
            if (meme) document.getElementById("photon_button").disabled = false

            if (amount === 1 && game.notation !== 8)
                document.getElementById("photons_up2").innerHTML =
                    "+" + format_num(amount) + " photon"
            else
                document.getElementById("photons_up2").innerHTML =
                    "+" + format_num(amount) + " photons"
        } else {
            document.getElementById("photon_button").className = "button unlit"
            document.getElementById("photons_up2").style.display = "none"
            if (meme) document.getElementById("photon_button").disabled = true
        }
    } else {
        document.getElementById("quantum_area").style.display = "none"
        document.getElementById("photons2").style.display = "none"
    }

    if (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) {
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
    if (
        game.boost_level < game.pr_min ||
        (game.pp_bought[6] && game.boost_level < 1000000)
    ) {
        if (game.level >= game.boost_level) {
            document.getElementById("boost_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("boost_button").style.color = "#ffffff"
            else document.getElementById("boost_button").disabled = false
            document.getElementById("boost_button").style.cursor = "pointer"
        } else {
            document.getElementById("boost_button").innerHTML =
                "LVL " + format_lvl(game.boost_level)
            if (!meme) {
                if (game.boost_level < 60) {
                    document.getElementById("boost_button").style.color =
                        get_color(Math.floor(game.boost_level / 10))
                } else if (game.boost_level < 12000) {
                    document.getElementById("boost_button").style.color =
                        get_color((Math.floor(game.boost_level / 60) + 5) % 12)
                } else if (game.boost_level < 60000) {
                    document.getElementById("boost_button").style.color =
                        get_color((Math.floor(game.boost_level / 300) - 3) % 12)
                } else {
                    document.getElementById("boost_button").style.color =
                        get_color(
                            (Math.floor(game.boost_level / 1200) + 3) % 12
                        )
                }
            }
            document.getElementById("boost_button").style.cursor = "default"
            if (meme) document.getElementById("boost_button").disabled = true
        }
    } else {
        document.getElementById("boost_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("boost_button").style.color = "#ffffff"
        else document.getElementById("boost_button").disabled = true
        document.getElementById("boost_button").style.cursor = "default"
    }
    if (game.battery_mode === 1 || game.perks[8]) {
        document.getElementById("boost").innerHTML =
            "EXP Boost<br>Tier " +
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
            document.getElementById("boost").innerHTML =
                "EXP Boost<br>Tier " +
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
        document.getElementById("boost").innerHTML =
            "EXP Boost<br>Tier " +
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
            document.getElementById("boost").innerHTML =
                "EXP Boost<br>Tier " +
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
        document.getElementById("boost").innerHTML =
            "EXP Boost<br>Tier " +
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
    if (
        game.auto_level < game.pr_min ||
        (game.pp_bought[6] && game.auto_level < 1000000)
    ) {
        if (game.level >= game.auto_level) {
            document.getElementById("auto_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("auto_button").style.color = "#ffffff"
            else document.getElementById("auto_button").disabled = false
            document.getElementById("auto_button").style.cursor = "pointer"
        } else {
            document.getElementById("auto_button").innerHTML =
                "LVL " + format_lvl(game.auto_level)
            if (!meme) {
                if (game.auto_level < 60) {
                    document.getElementById("auto_button").style.color =
                        get_color(Math.floor(game.auto_level / 10))
                } else if (game.auto_level < 12000) {
                    document.getElementById("auto_button").style.color =
                        get_color((Math.floor(game.auto_level / 60) + 5) % 12)
                } else if (game.auto_level < 60000) {
                    document.getElementById("auto_button").style.color =
                        get_color((Math.floor(game.auto_level / 300) - 3) % 12)
                } else {
                    document.getElementById("auto_button").style.color =
                        get_color((Math.floor(game.auto_level / 1200) + 3) % 12)
                }
            }
            document.getElementById("auto_button").style.cursor = "default"
            if (meme) document.getElementById("auto_button").disabled = true
        }
    } else {
        document.getElementById("auto_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("auto_button").style.color = "#ffffff"
        else document.getElementById("auto_button").disabled = true
        document.getElementById("auto_button").style.cursor = "default"
    }
    document.getElementById("auto").innerHTML =
        "Autoclicker<br>Tier " +
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
    if (
        game.fluct_level < game.pr_min ||
        (game.pp_bought[6] && game.fluct_level < 1000000)
    ) {
        if (game.level >= game.fluct_level) {
            document.getElementById("fluct_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("fluct_button").style.color = "#ffffff"
            else document.getElementById("fluct_button").disabled = false
            document.getElementById("fluct_button").style.cursor = "pointer"
        } else {
            document.getElementById("fluct_button").innerHTML =
                "LVL " + format_lvl(game.fluct_level)
            if (!meme) {
                if (game.fluct_level < 60) {
                    document.getElementById("fluct_button").style.color =
                        get_color(Math.floor(game.fluct_level / 10))
                } else if (game.fluct_level < 12000) {
                    document.getElementById("fluct_button").style.color =
                        get_color((Math.floor(game.fluct_level / 60) + 5) % 12)
                } else if (game.fluct_level < 60000) {
                    document.getElementById("fluct_button").style.color =
                        get_color((Math.floor(game.fluct_level / 300) - 3) % 12)
                } else {
                    document.getElementById("fluct_button").style.color =
                        get_color(
                            (Math.floor(game.fluct_level / 1200) + 3) % 12
                        )
                }
            }
            document.getElementById("fluct_button").style.cursor = "default"
            if (meme) document.getElementById("fluct_button").disabled = true
        }
    } else {
        document.getElementById("fluct_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("fluct_button").style.color = "#ffffff"
        else document.getElementById("fluct_button").disabled = true
        document.getElementById("fluct_button").style.cursor = "default"
    }
    if (game.battery_mode === 1 || game.perks[8]) {
        document.getElementById("fluct").innerHTML =
            "EXP Fluctuation<br>Tier " +
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
            document.getElementById("fluct").innerHTML =
                "EXP Fluctuation<br>Tier " +
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
        document.getElementById("fluct").innerHTML =
            "EXP Fluctuation<br>Tier " +
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
            document.getElementById("fluct").innerHTML =
                "EXP Fluctuation<br>Tier " +
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
    if (
        game.fact_level < game.pr_min ||
        (game.pp_bought[6] && game.fact_level < 1000000)
    ) {
        if (game.level >= game.fact_level) {
            document.getElementById("fact_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("fact_button").style.color = "#ffffff"
            else document.getElementById("fact_button").disabled = false
            document.getElementById("fact_button").style.cursor = "pointer"
        } else {
            document.getElementById("fact_button").innerHTML =
                "LVL " + format_lvl(game.fact_level)
            if (!meme) {
                if (game.fact_level < 60) {
                    document.getElementById("fact_button").style.color =
                        get_color(Math.floor(game.fact_level / 10))
                } else if (game.fact_level < 12000) {
                    document.getElementById("fact_button").style.color =
                        get_color((Math.floor(game.fact_level / 60) + 5) % 12)
                } else if (game.fact_level < 60000) {
                    document.getElementById("fact_button").style.color =
                        get_color((Math.floor(game.fact_level / 300) - 3) % 12)
                } else {
                    document.getElementById("fact_button").style.color =
                        get_color((Math.floor(game.fact_level / 1200) + 3) % 12)
                }
            }
            document.getElementById("fact_button").style.cursor = "default"
            if (meme) document.getElementById("fact_button").disabled = true
        }
    } else {
        document.getElementById("fact_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("fact_button").style.color = "#ffffff"
        else document.getElementById("fact_button").disabled = true
        document.getElementById("fact_button").style.cursor = "default"
    }
    document.getElementById("fact").innerHTML =
        "EXP Factor<br>Tier " +
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
    if (
        game.flux_level < game.pr_min ||
        (game.pp_bought[6] && game.flux_level < 1000000)
    ) {
        if (game.level >= game.flux_level) {
            document.getElementById("flux_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("flux_button").style.color = "#ffffff"
            else document.getElementById("flux_button").disabled = false
            document.getElementById("flux_button").style.cursor = "pointer"
        } else {
            document.getElementById("flux_button").innerHTML =
                "LVL " + format_lvl(game.flux_level)
            if (!meme) {
                if (game.flux_level < 60) {
                    document.getElementById("flux_button").style.color =
                        get_color(Math.floor(game.flux_level / 10))
                } else if (game.flux_level < 12000) {
                    document.getElementById("flux_button").style.color =
                        get_color((Math.floor(game.flux_level / 60) + 5) % 12)
                } else if (game.flux_level < 60000) {
                    document.getElementById("flux_button").style.color =
                        get_color((Math.floor(game.flux_level / 300) - 3) % 12)
                } else {
                    document.getElementById("flux_button").style.color =
                        get_color((Math.floor(game.flux_level / 1200) + 3) % 12)
                }
            }
            document.getElementById("flux_button").style.cursor = "default"
            if (meme) document.getElementById("flux_button").disabled = true
        }
    } else {
        document.getElementById("flux_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("flux_button").style.color = "#ffffff"
        else document.getElementById("flux_button").disabled = true
        document.getElementById("flux_button").style.cursor = "default"
    }
    document.getElementById("flux").innerHTML =
        "EXP Flux<br>Tier " +
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
    if (
        game.battery_level < game.pr_min ||
        (game.pp_bought[6] && game.battery_level < 1000000)
    ) {
        if (game.level >= game.battery_level) {
            document.getElementById("battery_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("battery_button").style.color =
                    "#ffffff"
            else document.getElementById("battery_button").disabled = false
            document.getElementById("battery_button").style.cursor = "pointer"
        } else {
            document.getElementById("battery_button").innerHTML =
                "LVL " + format_lvl(game.battery_level)
            if (!meme) {
                if (game.battery_level < 60) {
                    document.getElementById("battery_button").style.color =
                        get_color(Math.floor(game.battery_level / 10))
                } else if (game.battery_level < 12000) {
                    document.getElementById("battery_button").style.color =
                        get_color(
                            (Math.floor(game.battery_level / 60) + 5) % 12
                        )
                } else if (game.battery_level < 60000) {
                    document.getElementById("battery_button").style.color =
                        get_color(
                            (Math.floor(game.battery_level / 300) - 3) % 12
                        )
                } else {
                    document.getElementById("battery_button").style.color =
                        get_color(
                            (Math.floor(game.battery_level / 1200) + 3) % 12
                        )
                }
            }
            document.getElementById("battery_button").style.cursor = "default"
            if (meme) document.getElementById("battery_button").disabled = true
        }
    } else {
        document.getElementById("battery_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("battery_button").style.color = "#ffffff"
        document.getElementById("battery_button").style.cursor = "default"
        if (meme) document.getElementById("battery_button").disabled = true
    }
    if (game.battery_mode === 0) {
        document.getElementById("battery").innerHTML =
            "EXP Battery<br>Tier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x manual EXP production"
    } else if (game.battery_mode === 1) {
        document.getElementById("battery").innerHTML =
            "EXP Battery<br>Tier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x automated EXP production"
    }
    if (game.perks[8]) {
        document.getElementById("battery").innerHTML =
            "EXP Battery<br>Tier " +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            ": " +
            format_num(game.exp_battery) +
            "x EXP production"
    }

    if (game.starter_kit + game.generator_kit > 0) {
        document.getElementById("starter_kit").style.display = "block"
        document.getElementById("starter_kit").innerHTML =
            "+" +
            format_num(game.starter_kit + game.generator_kit) +
            " free tiers from Starter Kit"
    } else {
        document.getElementById("starter_kit").style.display = "none"
    }
}

//updating statistics page
function stats_update() {
    if (game.tab === 5 && game.subtab[3] === 0) {
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
        if (
            game.cps >= 10 ||
            game.prestige >= 1 ||
            game.reboot >= 1 ||
            game.quantum >= 1
        ) {
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

        document.getElementById("current_level_stat").innerHTML =
            "LVL " + format_lvl(game.level)
        document.getElementById("highest_level_stat").innerHTML =
            "LVL " + format_lvl(game.highest_level)
        document.getElementById("highest_level_ci_stat").innerHTML =
            "LVL " + format_lvl(game.reboot_highest_level)
        document.getElementById("highest_level_at_stat").innerHTML =
            "LVL " + format_lvl(game.all_time_highest_level)
        if (game.level < 60 || (game.pp_bought[6] && game.level < 1000000))
            document.getElementById("current_exp_stat").innerHTML =
                format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
        else document.getElementById("current_exp_stat").innerHTML = "Maxed!"
        document.getElementById("total_exp_cp_stat").innerHTML =
            format_num(game.total_exp) + " EXP"
        document.getElementById("total_exp_cr_stat").innerHTML =
            format_num(game.prestige_exp) + " EXP"
        document.getElementById("total_exp_ci_stat").innerHTML =
            format_num(game.reboot_exp) + " EXP"
        document.getElementById("total_exp_at_stat").innerHTML =
            format_num(game.all_time_exp) + " EXP"
        document.getElementById("exp_click_au_stat").innerHTML =
            "<br>" + auto_plus
        document.getElementById("exp_click_mn_stat").innerHTML = manual_plus
        document.getElementById("exp_multi_au_stat").innerHTML = total_auto
        document.getElementById("exp_multi_mn_stat").innerHTML = total_manual
        document.getElementById("autoclicking_stat").innerHTML =
            "<br>" + format_num(game.cps) + " clicks/s"
        document.getElementById("auto_power_stat").innerHTML = exp_eff
        document.getElementById("total_clicks_cp_stat").innerHTML =
            "<br>" + format_num(game.clicks)
        document.getElementById("total_clicks_cr_stat").innerHTML = format_num(
            game.prestige_clicks
        )
        document.getElementById("total_clicks_ci_stat").innerHTML = format_num(
            game.reboot_clicks
        )
        document.getElementById("total_clicks_at_stat").innerHTML = format_num(
            game.total_clicks
        )
        document.getElementById("times_prestiged_stat").innerHTML =
            "<br>" + format_num(game.prestige)
        if (game.perks[18] && game.banked_prestige > 0)
            document.getElementById("times_prestiged_stat").innerHTML =
                "<br>" +
                format_num(game.prestige) +
                " (+" +
                format_num(game.banked_prestige) +
                ")"
        document.getElementById("amplification_stat").innerHTML =
            format_num(game.amp) + " AMP"
        document.getElementById("current_pp_stat").innerHTML =
            format_num(game.pp) + " PP"
        document.getElementById("total_pp_stat").innerHTML =
            format_num(game.total_pp) + " PP"
        document.getElementById("total_reboots_stat").innerHTML =
            "<br>" + format_num(game.reboot)
        document.getElementById("generator_power_stat").innerHTML =
            format_num(game.watts) + " watts"
        if (game.watts === 1 && game.notation !== 8)
            document.getElementById("generator_power_stat").innerHTML =
                format_num(game.watts) + " watt"
        document.getElementById("current_hydrogen_stat").innerHTML =
            format_eff(game.hydrogen) + " g hydrogen"
        document.getElementById("total_iterations_stat").innerHTML =
            "<br>" + format_num(game.quantum)
        document.getElementById("current_photons_stat").innerHTML =
            format_num(game.photons) + " photons"
        if (game.photons === 1 && game.notation !== 8)
            document.getElementById("current_photons_stat").innerHTML =
                format_num(game.photons) + " photon"
        document.getElementById("time_played_cp_stat").innerHTML =
            "<br>" + format_time(game.time)
        document.getElementById("fastest_prestige_stat").innerHTML =
            format_time(game.fastest_prestige)
        document.getElementById("time_played_cr_stat").innerHTML = format_time(
            game.prestige_time
        )
        document.getElementById("fastest_reboot_stat").innerHTML = format_time(
            game.fastest_reboot
        )
        document.getElementById("time_played_ci_stat").innerHTML = format_time(
            game.reboot_time
        )
        document.getElementById("fastest_quantize_stat").innerHTML =
            format_time(game.fastest_quantize)
        document.getElementById("time_played_at_stat").innerHTML = format_time(
            game.all_time
        )
        if (game.prestige <= 0 && game.reboot <= 0 && game.quantum <= 0) {
            document.getElementById("total_exp_cp_name").innerHTML =
                "Total EXP:"
            document.getElementById("total_clicks_cp_name").innerHTML =
                "<br>Total Clicks:"
            document.getElementById("time_played_cp_name").innerHTML =
                "<br>Time Played:"
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
            document.getElementById("total_exp_cp_name").innerHTML =
                "Total EXP (Current Prestige):"
            document.getElementById("total_clicks_cp_name").innerHTML =
                "<br>Total Clicks (Current Prestige):"
            document.getElementById("time_played_cp_name").innerHTML =
                "<br>Time Played (Current Prestige):"
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

        if (game.reboot <= 0 && game.quantum <= 0) {
            document.getElementById("highest_level_ci").style.display = "none"
            document.getElementById("total_exp_ci").style.display = "none"
            document.getElementById("total_clicks_ci").style.display = "none"
            document.getElementById("total_reboots").style.display = "none"
            document.getElementById("generator_power").style.display = "none"
            document.getElementById("time_played_ci").style.display = "none"
            document.getElementById("fastest_reboot").style.display = "none"

            document.getElementById("highest_level_name").innerHTML =
                "Highest Level:"
            document.getElementById("total_exp_cr_name").innerHTML =
                "Total EXP (All Time):"
            document.getElementById("total_clicks_cr_name").innerHTML =
                "Total Clicks (All Time):"
            document.getElementById("time_played_cr_name").innerHTML =
                "Time Played (All Time):"
        } else {
            document.getElementById("highest_level_ci").style.display = "flex"
            document.getElementById("total_exp_ci").style.display = "flex"
            document.getElementById("total_clicks_ci").style.display = "flex"
            document.getElementById("total_reboots").style.display = "flex"
            document.getElementById("generator_power").style.display = "flex"
            document.getElementById("time_played_ci").style.display = "flex"
            document.getElementById("fastest_reboot").style.display = "flex"

            document.getElementById("highest_level_name").innerHTML =
                "Highest Level (Current Reboot):"
            document.getElementById("total_exp_cr_name").innerHTML =
                "Total EXP (Current Reboot):"
            document.getElementById("total_clicks_cr_name").innerHTML =
                "Total Clicks (Current Reboot):"
            document.getElementById("time_played_cr_name").innerHTML =
                "Time Played (Current Reboot):"
        }

        if (game.quantum <= 0) {
            document.getElementById("highest_level_at").style.display = "none"
            document.getElementById("total_exp_at").style.display = "none"
            document.getElementById("total_clicks_at").style.display = "none"
            document.getElementById("total_iterations").style.display = "none"
            document.getElementById("current_photons").style.display = "none"
            document.getElementById("time_played_at").style.display = "none"
            document.getElementById("fastest_quantize").style.display = "none"

            document.getElementById("highest_level_ci_name").innerHTML =
                "Highest Level (All Time):"
            document.getElementById("total_exp_ci_name").innerHTML =
                "Total EXP (All Time):"
            document.getElementById("total_clicks_ci_name").innerHTML =
                "Total Clicks (All Time):"
            document.getElementById("time_played_ci_name").innerHTML =
                "Time Played (All Time):"
        } else {
            document.getElementById("highest_level_at").style.display = "flex"
            document.getElementById("total_exp_at").style.display = "flex"
            document.getElementById("total_clicks_at").style.display = "flex"
            document.getElementById("total_iterations").style.display = "flex"
            document.getElementById("current_photons").style.display = "flex"
            document.getElementById("time_played_at").style.display = "flex"
            document.getElementById("fastest_quantize").style.display = "flex"

            document.getElementById("highest_level_ci_name").innerHTML =
                "Highest Level (Current Iteration):"
            document.getElementById("total_exp_ci_name").innerHTML =
                "Total EXP (Current Iteration):"
            document.getElementById("total_clicks_ci_name").innerHTML =
                "Total Clicks (Current Iteration):"
            document.getElementById("time_played_ci_name").innerHTML =
                "Time Played (Current Iteration):"
        }

        if (game.pp_bought[1] && game.challenge !== 7) {
            document.getElementById("exp_click_mn").style.display = "flex"
            document.getElementById("exp_multi_mn").style.display = "flex"
            document.getElementById("exp_click_au_name").innerHTML =
                "<br>Automated EXP/click:"
            document.getElementById("exp_multi_au_name").innerHTML =
                "Total Automated EXP Multipler:"
        } else {
            document.getElementById("exp_click_mn").style.display = "none"
            document.getElementById("exp_multi_mn").style.display = "none"
            document.getElementById("exp_click_au_name").innerHTML =
                "<br>EXP/click:"
            document.getElementById("exp_multi_au_name").innerHTML =
                "Total EXP Multipler:"
        }

        if (game.perks[22]) {
            document.getElementById("current_hydrogen").style.display = "flex"
        } else {
            document.getElementById("current_hydrogen").style.display = "none"
        }

        if (
            game.cps >= 10 ||
            game.prestige >= 1 ||
            game.reboot >= 1 ||
            game.quantum >= 1
        ) {
            document.getElementById("auto_power").style.display = "flex"
        } else {
            document.getElementById("auto_power").style.display = "none"
        }
        if (
            game.cps > 0 ||
            game.prestige >= 1 ||
            game.reboot >= 1 ||
            game.quantum >= 1
        ) {
            document.getElementById("autoclicking").style.display = "flex"
        } else {
            document.getElementById("autoclicking").style.display = "none"
        }
    }

    if (game.pp_bought[3] && game.tab === 5) {
        document.getElementById("statistics_tabs").style.display = "flex"
    } else {
        document.getElementById("statistics_tabs").style.display = "none"
    }

    if (game.tab === 5 && game.subtab[3] === 1) {
        let reset_str = "Past Prestiges:"

        let amp_sec = 0
        let entries = 0
        for (let i = 0; i < 5; i++) {
            reset_str += "<br>[" + format_num(i + 1) + "]"
            if (game.amp_amount[i] === -1) {
                reset_str += " no data"
            } else {
                reset_str +=
                    " +" +
                    format_num(Math.round(game.amp_amount[i])) +
                    " AMP in " +
                    format_time(game.amp_time[i] * game.tickspeed) +
                    " (+" +
                    format_eff(game.amp_eff[i]) +
                    " AMP/sec)"
                entries++
                amp_sec += game.amp_eff[i]
            }
        }

        if (entries !== 0) {
            amp_sec /= entries
            reset_str +=
                "<br><br>Average AMP gain: +" + format_eff(amp_sec) + " AMP/sec"
        } else {
            reset_str += "<br><br>Average AMP gain: undefined"
        }

        if (game.perks[13]) {
            reset_str += "<br><br><br>Past Reboots:"

            let watts_sec = 0
            entries = 0
            for (let i = 0; i < 5; i++) {
                reset_str += "<br>[" + format_num(i + 1) + "]"
                if (game.watts_amount[i] === -1) {
                    reset_str += "no data"
                } else {
                    reset_str +=
                        " +" +
                        format_num(game.watts_amount[i]) +
                        " watts in " +
                        format_time(game.watts_time[i] * game.tickspeed)
                    if (game.watts_eff[i] < 1 / 60) {
                        reset_str +=
                            " (+" +
                            format_eff(game.watts_eff[i] * 3600) +
                            " watts/hour)"
                    } else if (game.watts_eff[i] < 1) {
                        reset_str +=
                            " (+" +
                            format_eff(game.watts_eff[i] * 60) +
                            " watts/min)"
                    } else {
                        reset_str +=
                            " (+" +
                            format_eff(game.watts_eff[i]) +
                            " watts/sec)"
                    }
                    entries++
                    watts_sec += game.watts_eff[i]
                }
            }

            if (entries !== 0) {
                watts_sec /= entries
                if (watts_sec < 1 / 60) {
                    reset_str +=
                        "<br><br>Average watts gain: +" +
                        format_eff(watts_sec * 3600) +
                        " watts/hour"
                } else if (watts_sec < 1) {
                    reset_str +=
                        "<br><br>Average watts gain: +" +
                        format_eff(watts_sec * 60) +
                        " watts/min"
                } else {
                    reset_str +=
                        "<br><br>Average watts gain: +" +
                        format_eff(watts_sec) +
                        " watts/sec"
                }
            } else {
                reset_str += "<br><br>Average watts gain: undefined"
            }
        }

        document.getElementById("past_resets_text").innerHTML = reset_str
    }
}

//updating availability of pp upgrades
function pp_update() {
    //prestige panel
    document.getElementById("amp2").innerHTML = format_num(game.amp)
    document.getElementById("amp_boost").innerHTML =
        "creating " + format_num(game.amp) + "x EXP production"
    document.getElementById("pp2").innerHTML = format_num(game.pp)

    if (game.challenge !== 4 && game.challenge !== 9) {
        if (game.level >= game.pr_min) {
            document.getElementById("amp_up2").innerHTML =
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
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(pp_amount) + " PP"
            document.getElementById("prestige_button").innerHTML = "PRESTIGE!"
            if (!meme)
                document.getElementById("prestige_button").style.color = "white"
            else document.getElementById("prestige_button").disabled = false
            document.getElementById("prestige_button").style.cursor = "pointer"
        } else {
            document.getElementById("amp_up2").innerHTML =
                "+" + format_num(0) + " AMP"
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(0) + " PP"
            document.getElementById("prestige_button").innerHTML =
                "LVL " + format_lvl(game.pr_min)
            if (!meme)
                document.getElementById("prestige_button").style.color =
                    get_color((Math.floor(game.pr_min / 60) + 5) % 12)
            else document.getElementById("prestige_button").disabled = true
            document.getElementById("prestige_button").style.cursor = "default"
        }
    } else {
        if (game.level >= game.highest_level) {
            let amp_amount = get_amp(game.level) - get_amp(game.highest_level)
            document.getElementById("amp_up2").innerHTML =
                "+" +
                format_num(Math.floor(amp_amount * game.watt_boost)) +
                " AMP"
            let pp_amount = 0
            if (game.prestige <= 21)
                pp_amount = get_pp(game.level) - get_pp(game.highest_level) + 1
            else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(pp_amount) + " PP"
            document.getElementById("prestige_button").innerHTML = "PRESTIGE!"
            if (!meme)
                document.getElementById("prestige_button").style.color = "white"
            else document.getElementById("prestige_button").disabled = false
            document.getElementById("prestige_button").style.cursor = "pointer"
        } else {
            document.getElementById("amp_up2").innerHTML =
                "+" + format_num(0) + " AMP"
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(0) + " PP"
            document.getElementById("prestige_button").innerHTML =
                "LVL " + format_lvl(game.highest_level)
            if (meme) document.getElementById("prestige_button").disabled = true
            document.getElementById("prestige_button").style.cursor = "default"

            if (!meme) {
                if (game.highest_level < 12000) {
                    document.getElementById("prestige_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 60) + 5) % 12
                        )
                } else if (game.highest_level < 60000) {
                    document.getElementById("prestige_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 300) - 3) % 12
                        )
                } else {
                    document.getElementById("prestige_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 1200) + 3) % 12
                        )
                }
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
                    document.getElementById("pp_next").innerHTML =
                        "(Next PP at LVL " +
                        format_lvl(
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
                    document.getElementById("pp_next").innerHTML =
                        "(Next PP at LVL " +
                        format_lvl(
                            Math.ceil((current_pp + 1) ** 0.5 * 20 + 40)
                        ) +
                        ")"
                }
            } else {
                if (game.level < game.highest_level) {
                    document.getElementById("pp_next").style.display = "inline"
                    document.getElementById("pp_next").innerHTML =
                        "(Next PP at LVL " +
                        format_lvl(game.highest_level + 1) +
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
                if (
                    upgrade2.id < 39 &&
                    upgrade2.id !== 8 &&
                    !game.pp_bought[upgrade2.id]
                )
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
                if (
                    (game.reboot >= 1 || game.quantum >= 1) &&
                    game.pp_hide === 0
                ) {
                    element.style.display = "flex"
                }
            }
        }

        if (game.pp_bought[upgrade.id]) {
            button.className = "pp_button pp_bought"
            button.innerHTML = "PURCHASED"

            if (meme) button.disabled = true

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
            button.innerHTML = "-" + format_num(upgrade.price) + " PP"
            if (game.pp >= upgrade.price) {
                button.className = "pp_button pp_hidden"
                if (meme) button.disabled = true
                if (upgrade.can_buy()) {
                    button.className = "pp_button pp_unlocked"
                    if (meme) button.disabled = false
                }
            } else {
                button.className = "pp_button pp_hidden"
                if (upgrade.can_buy()) button.className = "pp_button pp_locked"
                if (meme) button.disabled = true
            }
        }

        if (upgrade.name === "AMP Efficiency") {
            element.style.display = "none"
        }

        if (game.perks[7] && upgrade.id !== 39) {
            let text = element.querySelector(".pp_text")
            let priority = text.querySelector(".pp_priority")
            priority.style.display = "block"
        }
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
    if (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) {
        document.getElementById("priority_layer").style.display = "flex"
    } else {
        document.getElementById("priority_layer").style.display = "none"
    }
}

//updating generator display
function watts_update() {
    document.getElementById("watts").innerHTML = format_num(game.watts)

    if (game.watts === 1 && game.notation !== 8)
        document.getElementById("watts_text").innerHTML = "watt"
    else document.getElementById("watts_text").innerHTML = "watts"

    if (game.watts <= 0 && game.notation !== 8)
        document.getElementById("watts").className = "watts_text no_power"
    else document.getElementById("watts").className = "watts_text power"

    document.getElementById("gen_boost").innerHTML =
        "producing " + format_num(game.watt_boost) + "x AMP gain"

    let all_pp_upgrades = true
    for (const upgrade2 of pp_upgrade.upgrades) {
        if (
            upgrade2.id < 39 &&
            upgrade2.id !== 8 &&
            !game.pp_bought[upgrade2.id]
        )
            all_pp_upgrades = false
    }

    if (!meme) {
        if (all_pp_upgrades)
            document.getElementById("all_pp_req").style.color = "#ffff00"
        else document.getElementById("all_pp_req").style.color = "#ffffff"
    } else {
        if (all_pp_upgrades)
            document.getElementById("all_pp_req").style.fontWeight = "bold"
        else document.getElementById("all_pp_req").style.fontWeight = "normal"
    }

    let reboot_requirement = 0
    if (game.reboot >= 1 || game.quantum >= 1) {
        reboot_requirement = 5000 * game.reboot + 80000
        if (game.reboot >= 24 || game.quantum >= 1) reboot_requirement = 200000
        if (game.qu_bought[2]) {
            if (game.challenge !== 0 && !entering) {
                if (game.prev_completions < 12) {
                    reboot_requirement =
                        challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.prev_completions +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.prev_completions - 1) *
                            game.prev_completions) /
                            2
                } else {
                    if (game.dk_bought[3]) {
                        if (game.prev_completions < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.prev_completions - 12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.prev_completions - 13) *
                                    (game.prev_completions - 12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        } else {
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
                    if (game.dk_bought[3]) {
                        if (game.completions[game.challenge - 1] < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.completions[game.challenge - 1] -
                                        12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.completions[game.challenge - 1] -
                                        13) *
                                    (game.completions[game.challenge - 1] -
                                        12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        }
        document.getElementById("spare_pp_req").style.display = "block"
        document.getElementById("reboot_button").innerHTML = "REBOOT!"
    } else {
        document.getElementById("spare_pp_req").style.display = "none"
        document.getElementById("reboot_button").innerHTML = "ACTIVATE!"
    }
    if (!meme) {
        if (game.pp >= reboot_requirement)
            document.getElementById("spare_pp_req").style.color = "#ffff00"
        else document.getElementById("spare_pp_req").style.color = "#ffffff"
    } else {
        if (game.pp >= reboot_requirement)
            document.getElementById("spare_pp_req").style.fontWeight = "bold"
        else document.getElementById("spare_pp_req").style.fontWeight = "normal"
    }
    if (!game.perks[13]) {
        document.getElementById("spare_pp_req").innerHTML =
            format_num(reboot_requirement) + " spare PP"
    } else {
        if (get_watts(game.pp) < 527)
            document.getElementById("spare_pp_req").innerHTML =
                format_num(
                    Math.ceil(20000 * (get_watts(game.pp) + 1) + 180000)
                ) + " spare PP"
        else
            document.getElementById("spare_pp_req").innerHTML =
                format_num(
                    Math.ceil(
                        20000 * (get_watts(game.pp) - 526) ** 1.25 + 10720000
                    )
                ) + " spare PP"
    }

    if (game.challenge !== 0) {
        if (game.completions[game.challenge - 1] < 12) {
            document.getElementById("spare_pp_req").innerHTML =
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
            if (game.dk_bought[3]) {
                if (game.completions[game.challenge - 1] < 20) {
                    document.getElementById("spare_pp_req").innerHTML =
                        format_num(
                            challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.completions[game.challenge - 1] -
                                        12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.completions[game.challenge - 1] -
                                        13) *
                                    (game.completions[game.challenge - 1] -
                                        12)) /
                                    2
                        ) + " spare PP"
                } else {
                    document.getElementById("spare_pp_req").innerHTML =
                        format_num(
                            challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        ) + " spare PP"
                }
            } else {
                document.getElementById("spare_pp_req").innerHTML =
                    format_num(
                        challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    ) + " spare PP"
            }
        }
    }

    if (all_pp_upgrades && game.pp >= reboot_requirement) {
        document.getElementById("reboot_button").className = "reboot_power"
        document.getElementById("watts_plus").style.display = "inline"
        if (meme) {
            document.getElementById("reboot_button").disabled = false
        }
        if (!game.perks[13]) {
            if (
                game.notation !== 8 &&
                game.prism_level === 0 &&
                game.om_boost[0] === 1
            )
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(game.prism_boost * game.om_boost[0]) +
                    " watt"
            else
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(game.prism_boost * game.om_boost[0]) +
                    " watts"
        } else {
            if (
                get_watts(game.pp) * game.prism_boost * game.om_boost[0] ===
                    1 &&
                game.notation !== 8
            )
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(
                        get_watts(game.pp) * game.prism_boost * game.om_boost[0]
                    ) +
                    " watt"
            else
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(
                        get_watts(game.pp) * game.prism_boost * game.om_boost[0]
                    ) +
                    " watts"
            if (game.perks[22] && (game.watts >= 98304 || game.dk_bought[5])) {
                document.getElementById("hydrogen_plus").style.display =
                    "inline"
                document.getElementById("hydrogen_plus").innerHTML =
                    "+" +
                    format_eff(
                        (get_watts(game.pp) / 100) *
                            2 ** game.supply_level *
                            game.prism_boost
                    ) +
                    " g hydrogen"
                if (game.perks[25])
                    document.getElementById("hydrogen_plus").innerHTML =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                2.5 ** game.supply_level *
                                game.prism_boost
                        ) +
                        " g hydrogen"
                if (game.dk_bought[5])
                    document.getElementById("hydrogen_plus").innerHTML =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                3 ** game.supply_level *
                                game.prism_boost
                        ) +
                        " g hydrogen"
            }
        }
    } else {
        document.getElementById("reboot_button").className = "no_reboot_power"
        document.getElementById("watts_plus").style.display = "none"
        document.getElementById("hydrogen_plus").style.display = "none"
        if (meme) {
            document.getElementById("reboot_button").disabled = true
        }
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
            text.innerHTML = "COMPLETED!"
            if (meme) box.disabled = true
        } else {
            element.className = "generator_perk incomplete_perk"
            box.className = "perk_complete incomplete"
            text.className = "perk_requirement incomplete_text"
            if (meme) box.disabled = false
            if (perk.requirement === 1 && game.notation !== 8)
                text.innerHTML =
                    "Requires<br>" + format_num(perk.requirement) + " watt"
            else
                text.innerHTML =
                    "Requires<br>" + format_num(perk.requirement) + " watts"
        }

        if (perk.id >= 3) {
            if (game.perks[perk.id - 3]) {
                if (game.perks[perk.id]) {
                    if (game.perks_hidden) element.style.display = "none"
                    else element.style.display = "flex"
                } else {
                    element.style.display = "flex"
                }
            } else {
                element.style.display = "none"
            }
        } else {
            if (game.perks[perk.id]) {
                if (game.perks_hidden) element.style.display = "none"
                else element.style.display = "flex"
            } else {
                element.style.display = "flex"
            }
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

        if (game.perks[27]) {
            document.getElementById("pendingrb_enabled").style.display = "none"
        } else {
            document.getElementById("pendingrb_enabled").style.display = "block"
        }

        if (game.qu_bought[1]) {
            document.getElementById("autorb_mode").style.display = "block"
        } else {
            document.getElementById("autorb_mode").style.display = "none"
        }

        if (game.dk_bought[0]) {
            document.getElementById("auto_push").style.display = "block"
        } else {
            document.getElementById("auto_push").style.display = "none"
        }
    } else {
        document.getElementById("autorb_block").style.display = "none"
        document.getElementById("watt_auto").style.display = "none"
    }

    if (game.perks[17] && game.tab === 3) {
        document.getElementById("reboot_tabs").style.display = "flex"
    } else {
        document.getElementById("reboot_tabs").style.display = "none"
    }

    if (game.reboot >= 1 || game.quantum >= 1) {
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

    if (game.perks[27] && game.perks_hidden) {
        document.getElementById("gen_perks_text").style.display = "none"
    } else {
        document.getElementById("gen_perks_text").style.display = "block"
    }

    if (game.pp_bought[39]) {
        document.getElementById("menu").className = "menu short"
        document.getElementById("row2").className = "row short_row"
    } else {
        document.getElementById("menu").className = "menu"
        document.getElementById("row2").className = "row"
    }

    if (!game.achievements[104] && game.perks[27]) {
        get_achievement(104)
    }
}

//updating challenges page
function challenge_update() {
    if (game.dk_bought[3]) {
        document.getElementById("challenge_header").innerHTML =
            "Entering a challenge will attempt to Reboot, and will reset without giving watts if you cannot<br>To complete a challenge you must Reboot with the required amount of spare PP<br><br>Total EXP boost from all challenges: " +
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
            "x<br>Total helium boost from all challenges: " +
            format_eff(
                game.ch_helium_boost[0] *
                    game.ch_helium_boost[1] *
                    game.ch_helium_boost[2] *
                    game.ch_helium_boost[3] *
                    game.ch_helium_boost[4] *
                    game.ch_helium_boost[5] *
                    game.ch_helium_boost[6] *
                    game.ch_helium_boost[7] *
                    game.ch_helium_boost[8]
            ) +
            "x"
    } else {
        document.getElementById("challenge_header").innerHTML =
            "Entering a challenge will attempt to Reboot, and will reset without giving watts if you cannot<br>To complete a challenge you must Reboot with the required amount of spare PP<br><br>Total EXP boost from all challenges: " +
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
    }

    let total_completions =
        game.completions[0] +
        game.completions[1] +
        game.completions[2] +
        game.completions[3] +
        game.completions[4] +
        game.completions[5] +
        game.completions[6] +
        game.completions[7] +
        game.completions[8]

    if (
        game.completions[8] >= 1 &&
        total_completions < 108 &&
        game.quantum === 0
    ) {
        document.getElementById("challenge_footer").style.display = "block"
    } else {
        document.getElementById("challenge_footer").style.display = "none"
    }

    if (total_completions >= 108 || game.quantum >= 1) {
        document.getElementById("quantum").style.display = "inline"
    } else {
        document.getElementById("quantum").style.display = "none"
    }

    for (const chg of challenge.challenges) {
        let element = challenge_map.get(chg)
        let button = element.querySelector(".enter_button")
        let goal = element.querySelector(".challenge_goal")
        let complete = element.querySelector(".challenge_complete")

        if (game.challenge === chg.id) {
            button.className = "enter_button in_progress"
            button.innerHTML = "IN PROGRESS"
            if (meme) button.disabled = true
        } else {
            button.className = "enter_button"
            button.innerHTML = "ENTER CHALLENGE"
            if (meme) button.disabled = false
        }

        if (game.dk_bought[3]) {
            complete.innerHTML =
                "Completions: " +
                format_num(game.completions[chg.id - 1]) +
                " / " +
                format_num(20) +
                "<br>Boosts from completions: " +
                format_num(game.ch_boost[chg.id - 1]) +
                "x EXP, " +
                format_eff(game.ch_helium_boost[chg.id - 1]) +
                "x helium"
        } else {
            complete.innerHTML =
                "Completions: " +
                format_num(game.completions[chg.id - 1]) +
                " / " +
                format_num(12) +
                "<br>EXP boost from completions: " +
                format_num(game.ch_boost[chg.id - 1]) +
                "x"
        }

        if (game.completions[chg.id - 1] < 12) {
            goal.innerHTML =
                'Goal: <span class="challenge_pp">' +
                format_num(
                    chg.goal +
                        chg.step * game.completions[chg.id - 1] +
                        (chg.step2 *
                            (game.completions[chg.id - 1] - 1) *
                            game.completions[chg.id - 1]) /
                            2
                ) +
                " PP</span>"
        } else {
            if (game.dk_bought[3]) {
                if (game.completions[chg.id - 1] < 20) {
                    goal.innerHTML =
                        'Goal: <span class="challenge_pp">' +
                        format_num(
                            chg.goal2 +
                                chg.step3 *
                                    (game.completions[chg.id - 1] - 12) +
                                (chg.step4 *
                                    (game.completions[chg.id - 1] - 13) *
                                    (game.completions[chg.id - 1] - 12)) /
                                    2
                        ) +
                        " PP</span>"
                } else {
                    goal.innerHTML =
                        'Goal: <span class="challenge_pp">' +
                        format_num(chg.goal2 + chg.step3 * 7 + chg.step4 * 21) +
                        " PP</span>"
                }
            } else {
                goal.innerHTML =
                    'Goal: <span class="challenge_pp">' +
                    format_num(chg.goal + chg.step * 11 + chg.step2 * 55) +
                    " PP</span>"
            }
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
        document.getElementById("hydrogen1").innerHTML = format_eff(
            game.hydrogen
        )
    }

    document.getElementById("hydrogen2").innerHTML = format_eff(game.hydrogen)

    document.getElementById("helium").innerHTML = format_eff(game.helium)
    document.getElementById("helium_boost").innerHTML =
        "creating " + format_eff(game.helium_boost) + "x EXP production"
    document.getElementById("helium_rate").innerHTML =
        "+" + format_eff(game.hps) + " mg helium/sec"
    if (game.challenge === 8)
        document.getElementById("helium_rate").innerHTML =
            "+" + format_eff(0) + " mg helium/sec"

    for (const c of core.cores) {
        let element = reactor_map.get(c)
        let button = element.querySelector(".core_button")
        let power = element.querySelector(".core_power")

        element.querySelector(".core_id").innerHTML = "Core " + format_num(c.id)

        if (c.id === 0) {
            power.innerHTML =
                "+" + format_eff(game.core_level[c.id]) + " mg base helium/sec"
        } else {
            power.innerHTML =
                format_num(game.core_level[c.id] + 1) + "x helium production"
            if (game.core_level[c.id - 1] >= 1) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        }

        button.innerHTML =
            "-" + format_eff(game.core_price[c.id]) + " g hydrogen"

        if (game.hydrogen >= game.core_price[c.id]) {
            button.className = "core_button core_unlocked"
            if (meme) button.disabled = false
        } else {
            button.className = "core_button core_locked"
            if (meme) button.disabled = true
        }
    }

    if (game.core_level[2] >= 1) {
        document.getElementById("power_supply").style.display = "flex"
        if (game.hydrogen >= game.supply_price) {
            document.getElementById("supply_button").className =
                "core_button core_unlocked"
            if (meme) document.getElementById("supply_button").disabled = false
        } else {
            document.getElementById("supply_button").className =
                "core_button core_locked"
            if (meme) document.getElementById("supply_button").disabled = true
        }
    } else {
        document.getElementById("power_supply").style.display = "none"
    }
    document.getElementById("supply_gain").innerHTML =
        format_eff(2 ** game.supply_level) + "x hydrogen gains"
    if (game.perks[25])
        document.getElementById("supply_gain").innerHTML =
            format_eff(2.5 ** game.supply_level) + "x hydrogen gains"
    if (game.dk_bought[5])
        document.getElementById("supply_gain").innerHTML =
            format_eff(3 ** game.supply_level) + "x hydrogen gains"
    document.getElementById("supply_button").innerHTML =
        "-" + format_eff(game.supply_price) + " g hydrogen"

    if (game.core_level[7] >= 1 || game.quantum >= 1) {
        document.getElementById("reactor_buy_max").style.display = "inline"
        document.getElementById("max_buttons").style.display = "flex"
    } else {
        document.getElementById("reactor_buy_max").style.display = "none"
        document.getElementById("max_buttons").style.display = "none"
    }

    if (
        game.core_level[7] >= 7 ||
        (game.core_level[7] >= 1 && game.quantum >= 1)
    ) {
        document.getElementById("reactor_max_all").style.display = "inline"

        if (game.qu_bought[0]) {
            document.getElementById("reactor_max_half").style.display = "inline"
        } else {
            document.getElementById("reactor_max_half").style.display = "none"
        }
    } else {
        document.getElementById("reactor_max_all").style.display = "none"
        document.getElementById("reactor_max_half").style.display = "none"
    }

    if (game.qu_bought[4]) {
        document.getElementById("autohy_block").style.display = "block"
    } else {
        document.getElementById("autohy_block").style.display = "none"
    }
}

//updating prism page
function prism_update() {
    document.getElementById("photons").innerHTML = format_num(game.photons)
    if (game.photons === 1 && game.notation !== 8)
        document.getElementById("photons_text").innerHTML = "photon"
    else document.getElementById("photons_text").innerHTML = "photons"

    let total_completions =
        game.completions[0] +
        game.completions[1] +
        game.completions[2] +
        game.completions[3] +
        game.completions[4] +
        game.completions[5] +
        game.completions[6] +
        game.completions[7] +
        game.completions[8]

    let highest_level = game.reboot_highest_level
    if (game.highest_level > highest_level) highest_level = game.highest_level
    if (game.level > highest_level) highest_level = game.level

    let amount = Math.floor(1000000 ** ((highest_level - 65536) / 32768))

    let quantum_requirement = 1
    if (game.omega_challenge) {
        quantum_requirement = 300 * 200 ** game.om_completions
    }

    if (total_completions >= 108 && amount >= quantum_requirement) {
        document.getElementById("quantize_button").className = "lit"
        document.getElementById("photons_up").style.display = "block"
        if (meme) document.getElementById("quantize_button").disabled = false
        if (amount === 1 && game.notation !== 8)
            document.getElementById("photons_up").innerHTML =
                "+" + format_num(amount) + " photon"
        else
            document.getElementById("photons_up").innerHTML =
                "+" + format_num(amount) + " photons"
    } else {
        document.getElementById("quantize_button").className = "unlit"
        if (meme) document.getElementById("quantize_button").disabled = true
        if (amount >= 1) {
            document.getElementById("photons_up").style.display = "block"
            if (amount === 1 && game.notation !== 8)
                document.getElementById("photons_up").innerHTML =
                    "+" + format_num(amount) + " photon"
            else
                document.getElementById("photons_up").innerHTML =
                    "+" + format_num(amount) + " photons"
        } else {
            document.getElementById("photons_up").style.display = "none"
        }
    }

    if (game.dk_bought[2]) {
        document.getElementById("quantize_footer").innerHTML =
            "Photons gained are based on your Highest Level (Current Iteration)"
    } else {
        document.getElementById("quantize_footer").innerHTML =
            "Photons gained are based on your Highest Level (Current Iteration)<br>They don't do anything by themselves, and are only for spending"
    }

    if (game.quantum >= 1) {
        document.getElementById("quantum_confirm").style.display = "flex"
    } else {
        document.getElementById("quantum_confirm").style.display = "none"
    }

    document.getElementById("prism_lvl_num").innerHTML = format_lvl(
        game.prism_level
    )
    document.getElementById("prism_level2").innerHTML =
        "Prism LVL " + format_lvl(game.prism_level)
    document.getElementById("prism_boost").innerHTML =
        format_num(game.prism_boost * game.om_boost[0]) + "x watt gain boost"
    document.getElementById("prism_boost2").innerHTML =
        format_num(game.prism_boost * game.om_boost[0]) + "x watt gain boost"
    document.getElementById("prism_button").innerHTML =
        "-" + format_num(Math.round(5 * 2.8 ** game.prism_level)) + " photons"

    if (game.prism_level >= 1)
        document.getElementById("prism").className = "prism_lit"
    else document.getElementById("prism").className = ""

    if (
        game.photons >= Math.round(5 * 2.8 ** game.prism_level) &&
        Math.round(5 * 2.8 ** game.prism_level) < Infinity
    ) {
        document.getElementById("prism_button").className = "lit"
        if (meme) document.getElementById("prism_button").disabled = false
    } else {
        document.getElementById("prism_button").className = "unlit"
        if (meme) document.getElementById("prism_button").disabled = true
    }

    //quantum upgrades handling
    for (const upgrade of quantum_upgrade.upgrades) {
        let element = quantum_map.get(upgrade)
        let button = element.querySelector(".qu_button")

        if (game.qu_bought[upgrade.id]) {
            button.className = "qu_button superlit"
            button.innerHTML = "PURCHASED"
            if (meme) button.disabled = true
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + " photons"
            if (game.photons >= upgrade.price) {
                button.className = "qu_button lit"
                if (meme) button.disabled = false
            } else {
                button.className = "qu_button unlit"
                if (meme) button.disabled = true
            }
        }
    }

    if (game.qu_bought[3]) {
        game.superspeed_power =
            5 **
                (Math.log(game.fastest_quantize / (6400 * game.tickspeed)) /
                    Math.log(0.5) +
                    1) +
            1
    } else {
        game.superspeed_power = 1
    }

    if (game.dk_bought[1] && !game.omega_challenge) {
        document.getElementById("autoqu_block").style.display = "block"
        document.getElementById("photon_auto").style.display = "inline"

        if (game.om_bought[1]) {
            document.getElementById("step_mode").style.display = "inline"

            if (game.prev_photons === 0) {
                document.getElementById("step_goal").innerHTML =
                    "Current Quantize Goal: " +
                    format_num(Math.ceil(game.autoqu_goal[2])) +
                    " photons"
            } else {
                document.getElementById("step_goal").innerHTML =
                    "Current Quantize Goal: " +
                    format_num(
                        Math.ceil(game.prev_photons * game.autoqu_goal[2])
                    ) +
                    " photons"
            }
        } else {
            document.getElementById("step_mode").style.display = "none"
        }
    } else {
        document.getElementById("autoqu_block").style.display = "none"
    }

    if (game.dk_bought[7]) {
        document.getElementById("omega_tab").style.display = "inline"
    } else {
        document.getElementById("omega_tab").style.display = "none"
    }

    //prism animation
    if (game.tab === 4) {
        let prism = document.getElementById("prism")
        let ctx = prism.getContext("2d")

        ctx.clearRect(0, 0, prism.width, prism.height)

        ctx.beginPath()
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle),
            100 -
                175 * 2 ** 0.5 * Math.sin(Math.PI / 18) * Math.sin(prism_angle)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI / 2)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI / 2)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + (3 * Math.PI) / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + (3 * Math.PI) / 2)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + (3 * Math.PI) / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + (3 * Math.PI) / 2)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle),
            100 -
                175 * 2 ** 0.5 * Math.sin(Math.PI / 18) * Math.sin(prism_angle)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle),
            100 -
                175 * 2 ** 0.5 * Math.sin(Math.PI / 18) * Math.sin(prism_angle)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI / 2)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + (3 * Math.PI) / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + (3 * Math.PI) / 2)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))

        ctx.lineWidth = 10
        ctx.lineCap = "round"
        ctx.strokeStyle = "white"
        if (meme) ctx.strokeStyle = "black"
        ctx.stroke()
    }
}

//updating gravity well page
function gravity_update() {
    document.getElementById("dark_matter").innerHTML = format_eff_infinity(
        game.dark_matter
    )
    document.getElementById("dark_matter_boost").innerHTML =
        "creating " + format_eff(game.dark_matter_boost) + "x EXP production"
    if (game.dk_bought[6])
        document.getElementById("dark_matter_boost").innerHTML =
            "creating " +
            format_eff(game.dark_matter_boost) +
            "x EXP production<br>also creating " +
            format_eff(game.dark_matter_boost ** 0.2) +
            "x helium production"
    if (game.challenge === 7) {
        document.getElementById("dark_matter_boost").innerHTML =
            "creating " + format_eff(1) + "x EXP production"
        if (game.dk_bought[6])
            document.getElementById("dark_matter_boost").innerHTML =
                "creating " +
                format_eff(1) +
                "x EXP production<br>also creating " +
                format_eff(1) +
                "x helium production"
    }

    let penalty = 1
    if (
        game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 1 ||
        game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 0
    )
        penalty =
            0.25 ** (game.dark_matter.log(1.7976931348622053 * 10 ** 308) - 1)

    if (game.omega_level >= 1) {
        document.getElementById("omega_level").style.display = "block"
        document.getElementById("omega_level_text").innerHTML =
            "Omega LVL " + format_num(game.omega_level)
        document.getElementById("growth_penalty").innerHTML =
            "Effective Growth Factor " +
            format_eff(
                (game.growth_factor * 12 ** game.om_completions) **
                    (0.7 ** game.omega_level * penalty)
            ) +
            "x"
        if (game.om_bought[2]) {
            document.getElementById("growth_penalty").innerHTML =
                "Effective Growth Factor " +
                format_eff(
                    (game.growth_factor *
                        1.15 ** game.highest_omega_level *
                        12 ** game.om_completions) **
                        (0.7 ** game.omega_level * penalty)
                ) +
                "x"
            if (game.om_bought[5])
                document.getElementById("growth_penalty").innerHTML =
                    "Effective Growth Factor " +
                    format_eff(
                        (game.growth_factor *
                            1.15 ** game.highest_omega_level *
                            12 ** game.om_completions) **
                            (0.8 ** game.omega_level * penalty)
                    ) +
                    "x"
        }
    } else {
        document.getElementById("omega_level").style.display = "none"
    }

    document.getElementById("interval_text").innerHTML =
        "Growth Interval<br>" +
        format_eff(game.growth_interval / game.tickspeed) +
        " seconds"
    if (game.growth_interval > 1) {
        document.getElementById("interval_button").innerHTML =
            "-" + format_num(game.growth_price[0]) + " photons"
        if (game.photons >= game.growth_price[0]) {
            document.getElementById("interval_button").className = "lit"
            if (meme)
                document.getElementById("interval_button").disabled = false
        } else {
            document.getElementById("interval_button").className = "unlit"
            if (meme) document.getElementById("interval_button").disabled = true
        }
    } else {
        document.getElementById("interval_button").innerHTML = "MAXED"
        document.getElementById("interval_button").className = "superlit"
        if (meme) document.getElementById("interval_button").disabled = true
    }
    document.getElementById("growth_text").innerHTML =
        "Growth Factor<br>" +
        format_eff(game.growth_factor * 12 ** game.om_completions) +
        "x"
    if (game.om_bought[2])
        document.getElementById("growth_text").innerHTML =
            "Growth Factor<br>" +
            format_eff(
                game.growth_factor *
                    1.15 ** game.highest_omega_level *
                    12 ** game.om_completions
            ) +
            "x"
    document.getElementById("growth_button").innerHTML =
        "-" + format_num(game.growth_price[1]) + " photons"
    if (game.photons >= game.growth_price[1]) {
        document.getElementById("growth_button").className = "lit"
        if (meme) document.getElementById("growth_button").disabled = false
    } else {
        document.getElementById("growth_button").className = "unlit"
        if (meme) document.getElementById("growth_button").disabled = true
    }

    if (game.dk_bought[7]) {
        document.getElementById("growth_reset").style.display = "block"
        if (
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 1 ||
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 0
        ) {
            document.getElementById("collapse_button").className = "lit"
            if (meme)
                document.getElementById("collapse_button").disabled = false
        } else {
            document.getElementById("collapse_button").className = "unlit"
            if (meme) document.getElementById("collapse_button").disabled = true
        }
        if (
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === -1 ||
            game.omega_level === 0
        )
            document.getElementById("collapse_time").style.display = "block"
        else document.getElementById("collapse_time").style.display = "none"
        if (game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === -1) {
            document.getElementById("collapse_time").innerHTML =
                "Collapse ready in " +
                format_time(
                    (Math.log(
                        (1.7976931348622053 * 10 ** 308) /
                            game.dark_matter.toNumber()
                    ) /
                        Math.log(
                            (game.growth_factor * 12 ** game.om_completions) **
                                (0.7 ** game.omega_level)
                        )) *
                        game.growth_interval
                )
            if (game.om_bought[2]) {
                document.getElementById("collapse_time").innerHTML =
                    "Collapse ready in " +
                    format_time(
                        (Math.log(
                            (1.7976931348622053 * 10 ** 308) /
                                game.dark_matter.toNumber()
                        ) /
                            Math.log(
                                (game.growth_factor *
                                    1.15 ** game.highest_omega_level *
                                    12 ** game.om_completions) **
                                    (0.7 ** game.omega_level)
                            )) *
                            game.growth_interval
                    )

                if (game.om_bought[5])
                    document.getElementById("collapse_time").innerHTML =
                        "Collapse ready in " +
                        format_time(
                            (Math.log(
                                (1.7976931348622053 * 10 ** 308) /
                                    game.dark_matter.toNumber()
                            ) /
                                Math.log(
                                    (game.growth_factor *
                                        1.15 ** game.highest_omega_level *
                                        12 ** game.om_completions) **
                                        (0.8 ** game.omega_level)
                                )) *
                                game.growth_interval
                        )
            }
            if (game.omega_challenge)
                document.getElementById("collapse_time").innerHTML =
                    "Collapse ready in " +
                    format_time(
                        (Math.log(
                            (1.7976931348622053 * 10 ** 308) /
                                game.dark_matter.toNumber()
                        ) /
                            Math.log(1)) *
                            game.growth_interval
                    )
        } else {
            document.getElementById("collapse_time").innerHTML =
                "Effective Growth Factor " +
                format_eff(
                    (game.growth_factor * 12 ** game.om_completions) ** penalty
                ) +
                "x"
            if (game.om_bought[2]) {
                document.getElementById("collapse_time").innerHTML =
                    "Effective Growth Factor " +
                    format_eff(
                        (game.growth_factor *
                            1.15 ** game.highest_omega_level *
                            12 ** game.om_completions) **
                            penalty
                    ) +
                    "x"
            }
        }

        if (game.om_bought[5]) {
            document.getElementById("collapse_text").innerHTML =
                "Resets dark matter and<br>reduces Growth Factor 20%"
        } else {
            document.getElementById("collapse_text").innerHTML =
                "Resets dark matter and<br>reduces Growth Factor 30%"
        }
        if (game.notation === 8)
            document.getElementById("collapse_text").innerHTML =
                "Resets dark matter and<br>reduces Growth Factor ???"
    } else {
        document.getElementById("growth_reset").style.display = "none"
        document.getElementById("collapse_time").style.display = "none"
    }

    if (!meme) {
        if (
            game.dark_matter >= 1.7976931348622053 * 10 ** 308 &&
            game.notation !== 9 &&
            !game.om_bought[6]
        ) {
            document.documentElement.style.setProperty(
                "--dark_matter_size",
                "3em"
            )
            document.getElementById("dark_matter").style.marginTop = "0.2em"
            document.getElementById("dark_matter").style.marginBottom =
                "-0.28em"
        } else {
            document.documentElement.style.setProperty(
                "--dark_matter_size",
                "2em"
            )
            document.getElementById("dark_matter").style.marginTop = "0.68em"
            document.getElementById("dark_matter").style.marginBottom =
                "-0.18em"
        }
    }

    //dark upgrades handling
    for (const upgrade of dark_upgrade.upgrades) {
        let element = quantum_map.get(upgrade)
        let button = element.querySelector(".qu_button")

        if (game.dk_bought[upgrade.id]) {
            button.className = "qu_button superlit"
            button.innerHTML = "PURCHASED"
            if (meme) button.disabled = true
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + " photons"
            if (game.photons >= upgrade.price) {
                button.className = "qu_button lit"
                if (meme) button.disabled = false
            } else {
                button.className = "qu_button unlit"
                if (meme) button.disabled = true
            }
        }
    }

    if (game.dk_bought[2]) {
        if (game.photons > dark_upgrade.upgrades[2].price) {
            game.infusion =
                (Math.log(game.photons / dark_upgrade.upgrades[2].price) ** 4 +
                    1) *
                13
        } else {
            game.infusion = 1
        }
    } else {
        game.infusion = 1
    }
}

//updating omega drive page
function omega_update() {
    document.getElementById("omega_points").innerHTML = format_num(
        game.omega_points
    )
    document.getElementById("highest_omega_level").innerHTML =
        "Highest Omega LVL " + format_num(game.highest_omega_level)

    document.getElementById("prism_assigned").innerHTML =
        format_num(game.om_assigned[0]) +
        " Ω assigned<br>" +
        format_num(game.om_boost[0]) +
        "x Prism output"
    document.getElementById("reactor_assigned").innerHTML =
        format_num(game.om_assigned[1]) +
        " Ω assigned<br>" +
        format_num(game.om_boost[1]) +
        "x helium production"
    document.getElementById("dark_matter_assigned").innerHTML =
        format_num(game.om_assigned[2]) +
        " Ω assigned<br>Dark matter formula ^" +
        format_eff(game.om_boost[2])

    //omega upgrades handling
    for (const upgrade of omega_upgrade.upgrades) {
        let element = quantum_map.get(upgrade)
        let button = element.querySelector(".qu_button")

        if (game.om_bought[upgrade.id]) {
            button.className = "qu_button superlit"
            button.innerHTML = "PURCHASED"
            if (meme) button.disabled = true
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + " photons"
            if (game.photons >= upgrade.price) {
                button.className = "qu_button lit"
                if (meme) button.disabled = false
            } else {
                button.className = "qu_button unlit"
                if (meme) button.disabled = true
            }
        }
    }

    if (game.om_bought[0]) {
        document.getElementById("collapse_auto").style.display = "inline"
    } else {
        document.getElementById("collapse_auto").style.display = "none"
    }

    if (game.om_bought[3]) {
        document.getElementById("growth_auto").style.display = "inline"
    } else {
        document.getElementById("growth_auto").style.display = "none"
    }

    if (game.om_bought[4]) {
        document.getElementById("prism_auto").style.display = "inline"
    } else {
        document.getElementById("prism_auto").style.display = "none"
    }

    if (game.om_bought[7]) {
        document.getElementById("omega_challenge_block").style.display = "block"
        if (game.omega_challenge) {
            document.getElementById("omega_enter_button").className =
                "omega_in_progress"
            document.getElementById("omega_enter_button").innerHTML =
                "IN PROGRESS"
            if (meme)
                document.getElementById("omega_enter_button").disabled = true
        } else {
            let total_completions =
                game.completions[0] +
                game.completions[1] +
                game.completions[2] +
                game.completions[3] +
                game.completions[4] +
                game.completions[5] +
                game.completions[6] +
                game.completions[7] +
                game.completions[8]

            let highest_level = game.reboot_highest_level
            if (game.highest_level > highest_level)
                highest_level = game.highest_level
            if (game.level > highest_level) highest_level = game.level

            let amount = Math.floor(
                1000000 ** ((highest_level - 65536) / 32768)
            )

            let quantum_requirement = 1

            if (total_completions >= 108 && amount >= quantum_requirement) {
                document.getElementById("omega_enter_button").className =
                    "can_enter"
                if (meme)
                    document.getElementById(
                        "omega_enter_button"
                    ).disabled = false
            } else {
                document.getElementById("omega_enter_button").className =
                    "cannot_enter"
                if (meme)
                    document.getElementById(
                        "omega_enter_button"
                    ).disabled = true
            }

            document.getElementById("omega_enter_button").innerHTML =
                "ENTER CHALLENGE"
        }

        document.getElementById("omega_challenge_desc").innerHTML =
            "All EXP production ^" + format_eff(0.5)

        document.getElementById("omega_challenge_complete").innerHTML =
            "Completions: " +
            format_num(game.om_completions) +
            "<br>Growth Factor boost from completions: " +
            format_num(12 ** game.om_completions) +
            "x"

        document.getElementById("omega_challenge_goal").innerHTML =
            'Goal: <span class="challenge_photons">+' +
            format_num(300 * 200 ** game.om_completions) +
            " photons</span>"
    } else {
        document.getElementById("omega_challenge_block").style.display = "none"
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
                document.getElementById("ach_header" + (i + 1)).innerHTML =
                    achievement.achievements[p].name
                if (!meme)
                    document.getElementById(
                        "ach_header" + (i + 1)
                    ).style.color = "#00ff00"
                document.getElementById("ach_reqr" + (i + 1)).innerHTML =
                    achievement.achievements[p].requirement
                document.getElementById("slot" + (i + 1)).className =
                    "achievement_slot achievement_complete"
                if (achievement.achievements[p].new) {
                    document.getElementById("slot" + (i + 1)).className =
                        "achievement_slot achievement_complete achievement_new"
                }
            } else {
                document.getElementById("ach_header" + (i + 1)).innerHTML =
                    "?????"
                if (!meme)
                    document.getElementById(
                        "ach_header" + (i + 1)
                    ).style.color = "#ff0000"
                document.getElementById("slot" + (i + 1)).className =
                    "achievement_slot"

                switch (achievement.achievements[p].spoiler) {
                    case 0:
                        document.getElementById(
                            "ach_reqr" + (i + 1)
                        ).innerHTML = achievement.achievements[p].requirement
                        break
                    case 1:
                        if (
                            game.prestige >= 1 ||
                            game.reboot >= 1 ||
                            game.quantum >= 1
                        )
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 2:
                        if (game.pp_bought[6])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 3:
                        if (game.reboot >= 1 || game.quantum >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 4:
                        if (game.quantum >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 5:
                        if (!game.hints) {
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        } else {
                            switch (p) {
                                case 154:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "And with our combined powers we will make great progress"
                                    break
                                case 155:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Imagine if the game didn't play itself"
                                    break
                                case 156:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Maybe you should take a break from making progress for a bit"
                                    break
                                case 157:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Ask nicely for this one first"
                                    break
                                case 158:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML = 'Do something "funny"'
                                    break
                                case 159:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML = "Be very lucky"
                                    break
                                case 160:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML = "Pay respects"
                                    break
                                case 161:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "A lot of work if you're blind"
                                    break
                                case 162:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML = "Throw it all away"
                                    break
                                case 163:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Acquire appreciation for emoji"
                                    break
                                case 164:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Excessively challenging if you're blind"
                                    break
                                case 165:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Straight to number two without number one"
                                    break
                                case 166:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML =
                                        "Do it yourself when there's no point"
                                    break
                                case 167:
                                    document.getElementById(
                                        "ach_reqr" + (i + 1)
                                    ).innerHTML = "This is a no helium zone"
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
    document.getElementById("achievement_count").innerHTML =
        "Achievements earned: " +
        format_num(ach_completed) +
        " / " +
        format_num(achievement.achievements.length)
    if (game.perks[0]) {
        document.getElementById("achievement_count").innerHTML =
            "Achievements earned: " +
            format_num(ach_completed) +
            " / " +
            format_num(achievement.achievements.length) +
            "<br>EXP boost from Achievements: " +
            format_eff(game.ach_power) +
            "x"
    }

    document.getElementById("page_text1").innerHTML =
        "Page " + format_num(game.achiev_page + 1)
    document.getElementById("page_text2").innerHTML =
        "Page " + format_num(game.achiev_page + 1)
}

//updating descriptions of various things
function description_update() {
    pp_upgrade.upgrades[1].desc =
        "Unautomated clicks are " + format_num(2) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[1]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[1].desc
    pp_upgrade.upgrades[4].desc =
        "Unautomated clicks are " + format_num(4) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[4]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[4].desc
    pp_upgrade.upgrades[6].desc =
        "Breaks the limits, allowing you to go beyond LVL " +
        format_lvl(60) +
        "<br>Also allows Auto-Prestige configuration<br>(Heads up! PP gain past LVL " +
        format_lvl(60) +
        " is based on highest level instead)"
    pp_map.get(pp_upgrade.upgrades[6]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[6].desc
    pp_upgrade.upgrades[7].desc =
        "All further Prestiges start at LVL " +
        format_lvl(15) +
        "; Prestiging now requires LVL " +
        format_lvl(70)
    pp_map.get(pp_upgrade.upgrades[7]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[7].desc
    pp_upgrade.upgrades[10].desc =
        "All further Prestiges start at LVL " +
        format_lvl(30) +
        "; Prestiging now requires LVL " +
        format_lvl(80)
    pp_map.get(pp_upgrade.upgrades[10]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[10].desc
    pp_upgrade.upgrades[11].desc =
        "Unautomated clicks are " + format_num(8) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[11]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[11].desc
    pp_upgrade.upgrades[13].desc =
        "All further Prestiges start at LVL " +
        format_lvl(60) +
        "; Prestiging now requires LVL " +
        format_lvl(90)
    pp_map.get(pp_upgrade.upgrades[13]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[13].desc
    pp_upgrade.upgrades[17].desc =
        "Unautomated clicks are " + format_num(16) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[17]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[17].desc
    pp_upgrade.upgrades[19].desc =
        "EXP Overclocker now boosts EXP " + format_num(4) + "x"
    pp_map.get(pp_upgrade.upgrades[19]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[19].desc
    pp_upgrade.upgrades[23].desc =
        "EXP Overclocker now boosts EXP " + format_num(5) + "x"
    pp_map.get(pp_upgrade.upgrades[23]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[23].desc
    pp_upgrade.upgrades[27].desc =
        "EXP production is boosted based on how many times you have Prestiged<br>(Currently: " +
        format_eff(
            1 + ((game.prestige + game.banked_prestige) / 1000) ** (1 / 2)
        ) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[27]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[27].desc
    pp_upgrade.upgrades[30].desc =
        "EXP production is boosted based on your highest level<br>(Currently: " +
        format_eff(1 + game.highest_level / 400) +
        "x)"
    pp_map.get(pp_upgrade.upgrades[30]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[30].desc
    pp_upgrade.upgrades[31].desc =
        "EXP Battery is now " + format_num(3) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[31]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[31].desc
    pp_upgrade.upgrades[33].desc =
        "EXP Flux now increases " +
        format_num(5) +
        "x faster, and has a " +
        format_num(5) +
        "x higher cap"
    pp_map.get(pp_upgrade.upgrades[33]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[33].desc
    pp_upgrade.upgrades[36].desc =
        "EXP Battery is now " + format_num(9) + "x stronger"
    pp_map.get(pp_upgrade.upgrades[36]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[36].desc

    if (game.pp !== 0)
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have<br>(Currently: " +
            format_eff(Math.log(game.pp / 100 + 1) ** 2 + 1) +
            "x)"
    else
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have<br>(Currently: " +
            format_num(1) +
            "x)"
    pp_map.get(pp_upgrade.upgrades[22]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[22].desc

    generator_perk.perks[3].desc =
        "EXP Flux permanently increases " +
        format_num(5) +
        "x faster and has a " +
        format_num(5) +
        "x higher cap<br>(stacks with Magnified Flux if you have it, making it uncapped)"
    perk_map
        .get(generator_perk.perks[3])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[3].desc
    generator_perk.perks[4].desc =
        "You gain " +
        format_num(1) +
        " extra prestige stat for every " +
        format_num(200) +
        " levels gained<br>Patience will also boost prestige stat by up to " +
        format_num(30) +
        "x"
    perk_map
        .get(generator_perk.perks[4])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[4].desc
    generator_perk.perks[9].desc =
        "Discharge is " +
        format_num(2) +
        "x stronger<br>Discharge automation is also now unlocked with the EXP Capacitor instead of High Voltage I"
    perk_map
        .get(generator_perk.perks[9])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[9].desc
    generator_perk.perks[13].desc =
        "The spare PP requirement for Reboot stops increasing, and you gain more watts on Reboot the farther past " +
        format_num(200000) +
        " PP you go<br>Also unlocks Past Reboots in Statistics"
    perk_map
        .get(generator_perk.perks[13])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[13].desc
    if (game.fastest_reboot > 600 * game.tickspeed) {
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot<br>(Currently: " +
            format_eff(1) +
            "x)"
    } else {
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot<br>(Currently: " +
            format_eff(
                Math.log(game.fastest_reboot / (600 * game.tickspeed)) /
                    Math.log(0.75) +
                    1
            ) +
            "x)"
    }
    perk_map
        .get(generator_perk.perks[16])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[16].desc
    if (game.watts >= 117965)
        generator_perk.perks[23].desc =
            "Helium production is boosted based on how many watts you have<br>(Currently: " +
            format_eff(
                (game.watts * 5) / generator_perk.perks[23].requirement
            ) +
            "x)"
    else
        generator_perk.perks[23].desc =
            "Helium production is boosted based on how many watts you have<br>(Currently: " +
            format_eff(1) +
            "x)"
    perk_map
        .get(generator_perk.perks[23])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[23].desc
    let he_boost = 1
    if (game.helium > 10) {
        if (!game.qu_bought[6]) he_boost = Math.log10(game.helium)
        else he_boost = Math.log10(game.helium) ** 2
    }
    generator_perk.perks[24].desc =
        "Helium production is boosted based on how much helium you have<br>(Currently: " +
        format_eff(he_boost) +
        "x)"
    perk_map
        .get(generator_perk.perks[24])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[24].desc
    generator_perk.perks[25].desc =
        "Deuterium Power now boosts hydrogen gains " +
        format_eff(2.5) +
        "x per tier instead<br>(This applies retroactively)"
    perk_map
        .get(generator_perk.perks[25])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[25].desc

    if (game.hydrogen >= 1)
        quantum_upgrade.upgrades[0].desc =
            "Helium production is boosted based on unspent hydrogen<br>(Currently: " +
            format_eff(game.hydrogen ** 0.25) +
            "x)"
    else
        quantum_upgrade.upgrades[0].desc =
            "Helium production is boosted based on unspent hydrogen<br>(Currently: " +
            format_eff(1) +
            "x)"
    quantum_map
        .get(quantum_upgrade.upgrades[0])
        .querySelector(".qu_desc").innerHTML = quantum_upgrade.upgrades[0].desc

    quantum_upgrade.upgrades[3].desc =
        "EXP production is boosted based on your fastest Quantum Iteration<br>(Currently: " +
        format_eff(
            5 **
                (Math.log(game.fastest_quantize / (6400 * game.tickspeed)) /
                    Math.log(0.5) +
                    1) +
                1
        ) +
        "x)"
    quantum_map
        .get(quantum_upgrade.upgrades[3])
        .querySelector(".qu_desc").innerHTML = quantum_upgrade.upgrades[3].desc

    if (game.photons > dark_upgrade.upgrades[2].price)
        dark_upgrade.upgrades[2].desc =
            "EXP production is boosted based on unspent photons<br>(Currently: " +
            format_eff(
                (Math.log(game.photons / dark_upgrade.upgrades[2].price) ** 4 +
                    1) *
                    13
            ) +
            "x)"
    else
        dark_upgrade.upgrades[2].desc =
            "EXP production is boosted based on unspent photons<br>(Currently: " +
            format_eff(13) +
            "x)"
    quantum_map
        .get(dark_upgrade.upgrades[2])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[2].desc

    dark_upgrade.upgrades[3].desc =
        "All challenges can now be completed up to " +
        format_num(20) +
        " times<br>Completions past " +
        format_num(12) +
        " also give a helium production boost"
    quantum_map
        .get(dark_upgrade.upgrades[3])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[3].desc
    dark_upgrade.upgrades[4].desc =
        "Helium production is boosted based on Prism LVL<br>(Currently: " +
        format_eff((game.prism_boost / 150) ** (4 / 3)) +
        "x)"
    quantum_map
        .get(dark_upgrade.upgrades[4])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[4].desc
    dark_upgrade.upgrades[5].desc =
        "Hydrogen now no longer requires " +
        format_num(98304) +
        " watts to be gained<br>Deuterium Power now also boosts " +
        format_num(3) +
        "x instead"
    quantum_map
        .get(dark_upgrade.upgrades[5])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[5].desc

    omega_upgrade.upgrades[2].desc =
        "Dark matter growth factor is boosted based on your Highest Omega LVL<br>(Currently: " +
        format_eff(1.15 ** game.highest_omega_level) +
        "x)"
    quantum_map
        .get(omega_upgrade.upgrades[2])
        .querySelector(".om_desc").innerHTML = omega_upgrade.upgrades[2].desc
    omega_upgrade.upgrades[6].desc =
        "You can gain more than " +
        format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
        " kg dark matter<br>Growth Factor will be reduced the further past " +
        format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
        " kg you go"
    quantum_map
        .get(omega_upgrade.upgrades[6])
        .querySelector(".om_desc").innerHTML = omega_upgrade.upgrades[6].desc

    if (game.challenge === 7) {
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have<br>(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[22])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[22].desc
        pp_upgrade.upgrades[27].desc =
            "EXP production is boosted based on how many times you have Prestiged<br>(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[27])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[27].desc
        pp_upgrade.upgrades[30].desc =
            "EXP production is boosted based on your highest level<br>(Currently: " +
            format_eff(1) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[30])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[30].desc
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot<br>(Currently: " +
            format_eff(1) +
            "x)"
        perk_map
            .get(generator_perk.perks[16])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[16].desc
        quantum_upgrade.upgrades[3].desc =
            "EXP production is boosted based on your fastest Quantum Iteration<br>(Currently: " +
            format_eff(1) +
            "x)"
        quantum_map
            .get(quantum_upgrade.upgrades[3])
            .querySelector(".qu_desc").innerHTML =
            quantum_upgrade.upgrades[3].desc
        dark_upgrade.upgrades[2].desc =
            "EXP production is boosted based on unspent photons<br>(Currently: " +
            format_eff(1) +
            "x)"
        quantum_map
            .get(dark_upgrade.upgrades[2])
            .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[2].desc
    }

    achievement.achievements[0].requirement = "Reach LVL " + format_lvl(2)
    achievement.achievements[1].requirement = "Reach LVL " + format_lvl(10)
    achievement.achievements[2].requirement = "Reach LVL " + format_lvl(30)
    achievement.achievements[3].requirement = "Reach LVL " + format_lvl(60)
    achievement.achievements[4].requirement = "Reach LVL " + format_lvl(100)
    achievement.achievements[5].requirement = "Reach LVL " + format_lvl(200)
    achievement.achievements[6].requirement = "Reach LVL " + format_lvl(300)
    achievement.achievements[7].requirement = "Reach LVL " + format_lvl(500)
    achievement.achievements[8].requirement = "Reach LVL " + format_lvl(1000)
    achievement.achievements[9].requirement = "Reach LVL " + format_lvl(2000)
    achievement.achievements[10].requirement = "Reach LVL " + format_lvl(3000)
    achievement.achievements[11].requirement = "Reach LVL " + format_lvl(6000)
    achievement.achievements[12].requirement = "Reach LVL " + format_lvl(12000)
    achievement.achievements[13].requirement = "Reach LVL " + format_lvl(18000)
    achievement.achievements[14].requirement = "Reach LVL " + format_lvl(24000)
    achievement.achievements[15].requirement = "Reach LVL " + format_lvl(30000)
    achievement.achievements[16].requirement = "Reach LVL " + format_lvl(40000)
    achievement.achievements[17].requirement = "Reach LVL " + format_lvl(50000)
    achievement.achievements[18].requirement = "Reach LVL " + format_lvl(60000)
    achievement.achievements[19].requirement = "Reach LVL " + format_lvl(80000)
    achievement.achievements[20].requirement = "Reach LVL " + format_lvl(100000)
    achievement.achievements[21].requirement = "Reach LVL " + format_lvl(150000)
    achievement.achievements[22].requirement = "Reach LVL " + format_lvl(200000)
    achievement.achievements[23].requirement = "Reach LVL " + format_lvl(300000)
    achievement.achievements[24].requirement = "Reach LVL " + format_lvl(500000)
    achievement.achievements[25].requirement = "Reach LVL " + format_lvl(750000)
    achievement.achievements[26].requirement =
        "Reach LVL " + format_lvl(1000000)
    achievement.achievements[28].requirement =
        "Prestige " + format_num(10) + " times"
    achievement.achievements[29].requirement =
        "Prestige " + format_num(100) + " times"
    achievement.achievements[30].requirement =
        "Prestige " + format_num(1000) + " times"
    achievement.achievements[31].requirement =
        "Prestige " + format_num(10000) + " times"
    achievement.achievements[32].requirement =
        "Prestige " + format_num(100000) + " times"
    achievement.achievements[33].requirement =
        "Prestige " + format_num(1000000) + " times"
    achievement.achievements[34].requirement =
        "Get " + format_num(10 ** 6) + " all time EXP"
    achievement.achievements[35].requirement =
        "Get " + format_num(10 ** 9) + " all time EXP"
    achievement.achievements[36].requirement =
        "Get " + format_num(10 ** 12) + " all time EXP"
    achievement.achievements[37].requirement =
        "Get " + format_num(10 ** 15) + " all time EXP"
    achievement.achievements[38].requirement =
        "Get " + format_num(10 ** 18) + " all time EXP"
    achievement.achievements[39].requirement =
        "Get " + format_num(10 ** 21) + " all time EXP"
    achievement.achievements[40].requirement =
        "Get " + format_num(10 ** 24) + " all time EXP"
    achievement.achievements[41].requirement =
        "Get " + format_num(10 ** 27) + " all time EXP"
    achievement.achievements[42].requirement =
        "Get " + format_num(10 ** 30) + " all time EXP"
    achievement.achievements[43].requirement =
        "Get " + format_num(10 ** 33) + " all time EXP"
    achievement.achievements[44].requirement =
        "Get " + format_num(10 ** 36) + " all time EXP"
    achievement.achievements[45].requirement =
        "Get " + format_num(10 ** 39) + " all time EXP"
    achievement.achievements[46].requirement =
        "Get " + format_num(10 ** 42) + " all time EXP"
    achievement.achievements[47].requirement =
        "Get " + format_num(10 ** 45) + " all time EXP"
    achievement.achievements[48].requirement =
        "Get " + format_num(10 ** 48) + " all time EXP"
    achievement.achievements[49].requirement =
        "Get " + format_num(10 ** 51) + " all time EXP"
    achievement.achievements[50].requirement =
        "Get " + format_num(10 ** 57) + " all time EXP"
    achievement.achievements[51].requirement =
        "Get " + format_num(10 ** 63) + " all time EXP"
    achievement.achievements[52].requirement =
        "Get " + format_num(10 ** 75) + " all time EXP"
    achievement.achievements[53].requirement =
        "Get " + format_num(10 ** 87) + " all time EXP"
    achievement.achievements[54].requirement =
        "Get " + format_num(10 ** 99) + " all time EXP"
    achievement.achievements[55].requirement =
        "Get " + format_num(10 ** 111) + " all time EXP"
    achievement.achievements[56].requirement =
        "Get " + format_num(10 ** 123) + " all time EXP"
    achievement.achievements[57].requirement =
        "Get " + format_num(10 ** 138) + " all time EXP"
    achievement.achievements[58].requirement =
        "Get " + format_num(10 ** 153) + " all time EXP"
    achievement.achievements[59].requirement =
        "Get " + format_num(10 ** 183) + " all time EXP"
    achievement.achievements[60].requirement =
        "Get " + format_num(10 ** 228) + " all time EXP"
    achievement.achievements[61].requirement =
        "Get " + format_num(10 ** 303) + " all time EXP"
    achievement.achievements[67].requirement = "Get " + format_num(100) + " AMP"
    achievement.achievements[68].requirement =
        "Get " + format_num(10000) + " AMP"
    achievement.achievements[69].requirement =
        "Get " + format_num(10 ** 6) + " AMP"
    achievement.achievements[70].requirement =
        "Get " + format_num(10 ** 8) + " AMP"
    achievement.achievements[71].requirement =
        "Get " + format_num(10 ** 10) + " AMP"
    achievement.achievements[72].requirement =
        "Get " + format_num(10 ** 12) + " AMP"
    achievement.achievements[73].requirement =
        "Get " + format_num(10 ** 14) + " AMP"
    achievement.achievements[74].requirement =
        "Get " + format_num(10 ** 16) + " AMP"
    achievement.achievements[75].requirement =
        "Get " + format_num(10 ** 18) + " AMP"
    achievement.achievements[76].requirement =
        "Get " + format_num(10 ** 20) + " AMP"
    achievement.achievements[77].requirement =
        "Get " + format_num(10 ** 24) + " AMP"
    achievement.achievements[78].requirement =
        "Get " + format_num(10 ** 28) + " AMP"
    achievement.achievements[79].requirement =
        "Get " + format_num(10 ** 32) + " AMP"
    achievement.achievements[88].requirement =
        "Buy all " + format_num(39) + " Prestige upgrades"
    achievement.achievements[89].requirement =
        "Reach " + format_num(100) + "x EXP Flux boost"
    achievement.achievements[90].requirement =
        "Reach " + format_num(30) + " clicks/s on the Autoclicker"
    achievement.achievements[91].requirement =
        "Reach " + format_num(150) + " clicks/s on the Autoclicker"
    achievement.achievements[92].requirement =
        "Reach " + format_num(1000) + " clicks/s on the Autoclicker"
    achievement.achievements[94].requirement =
        "Reboot " + format_num(3) + " times"
    achievement.achievements[95].requirement =
        "Reboot " + format_num(5) + " times"
    achievement.achievements[96].requirement =
        "Reboot " + format_num(10) + " times"
    achievement.achievements[97].requirement =
        "Reboot " + format_num(25) + " times"
    achievement.achievements[98].requirement =
        "Reboot " + format_num(50) + " times"
    achievement.achievements[99].requirement =
        "Reboot " + format_num(100) + " times"
    achievement.achievements[100].requirement =
        "Reboot " + format_num(1000) + " times"
    achievement.achievements[114].requirement =
        "Complete a single challenge " + format_num(12) + " times"
    achievement.achievements[115].requirement =
        "Complete a single challenge " + format_num(20) + " times"
    achievement.achievements[116].requirement =
        "Get " + format_num(27) + " total challenge completions"
    achievement.achievements[117].requirement =
        "Get " + format_num(54) + " total challenge completions"
    achievement.achievements[118].requirement =
        "Get " + format_num(108) + " total challenge completions"
    achievement.achievements[119].requirement =
        "Get " + format_num(180) + " total challenge completions"
    achievement.achievements[120].requirement =
        "Unlock all " + format_num(28) + " Generator Perks"
    achievement.achievements[123].requirement =
        "Make " + format_num(10 ** 30) + " mg helium/sec"
    achievement.achievements[124].requirement =
        "Make " + format_num(10 ** 60) + " mg helium/sec"
    achievement.achievements[125].requirement =
        "Make " + format_num(10 ** 90) + " mg helium/sec"
    achievement.achievements[127].requirement =
        "Quantize " + format_num(3) + " times"
    achievement.achievements[128].requirement =
        "Quantize " + format_num(5) + " times"
    achievement.achievements[129].requirement =
        "Quantize " + format_num(10) + " times"
    achievement.achievements[130].requirement =
        "Quantize " + format_num(25) + " times"
    achievement.achievements[131].requirement =
        "Quantize " + format_num(50) + " times"
    achievement.achievements[132].requirement =
        "Quantize " + format_num(100) + " times"
    achievement.achievements[133].requirement =
        "Quantize " + format_num(1000) + " times"
    achievement.achievements[134].requirement =
        "Reach Prism LVL " + format_lvl(1)
    achievement.achievements[135].requirement =
        "Reach Prism LVL " + format_lvl(10)
    achievement.achievements[136].requirement =
        "Reach Prism LVL " + format_lvl(30)
    achievement.achievements[137].requirement =
        "Reach Prism LVL " + format_lvl(100)
    achievement.achievements[138].requirement =
        "Reach Prism LVL " + format_lvl(200)
    achievement.achievements[142].name = "Mach " + format_num(874030)
    achievement.achievements[146].requirement =
        "Reach " +
        format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
        " kg dark matter"
    achievement.achievements[148].requirement =
        "Reach " +
        format_infinity(new Decimal(10).pow(2000)) +
        " kg dark matter"
    achievement.achievements[149].requirement =
        "Reach Omega LVL " + format_num(1)
    achievement.achievements[150].requirement =
        "Reach Omega LVL " + format_num(10)
    achievement.achievements[151].requirement =
        "Reach Omega LVL " + format_num(30)
    achievement.achievements[153].requirement =
        "Complete the Omega Challenge " + format_num(5) + " times"
    achievement.achievements[159].requirement =
        "There is a " +
        format_num(1) +
        " in " +
        format_num(7777) +
        " chance every second you will get this achievement"
    achievement.achievements[163].requirement =
        "Reboot " + format_num(10) + " times while using Cancer notation"
    achievement.achievements[166].requirement =
        "Manually upgrade a Reactor core when it has already been upgraded " +
        format_num(100000) +
        " times"

    challenge.challenges[1].desc =
        "All upgrades require " + format_num(5) + "x as many levels"
    challenge_map
        .get(challenge.challenges[1])
        .querySelector(".challenge_desc").innerHTML =
        challenge.challenges[1].desc
    challenge.challenges[4].desc =
        "All EXP production reduces to zero over " + format_num(30) + " seconds"
    challenge_map
        .get(challenge.challenges[4])
        .querySelector(".challenge_desc").innerHTML =
        challenge.challenges[4].desc
    challenge.challenges[8].desc =
        "All rules from the first four challenges, simultaneously<br>All EXP production is divided by " +
        format_num(10 ** 16) +
        ", AMP Conversion does not apply"
    challenge_map
        .get(challenge.challenges[8])
        .querySelector(".challenge_desc").innerHTML =
        challenge.challenges[8].desc

    document.getElementById("challenge_footer").innerHTML =
        "Get all " +
        format_num(108) +
        " challenge completions to unlock a new prestige layer..."
    document.getElementById("quantize_req").innerHTML =
        format_num(108) +
        " challenge completions & LVL " +
        format_lvl(65536) +
        " required"

    switch (game.notation) {
        case 0:
            achievement.achievements[47].name =
                "Why are you still using Long notation?"
            break
        case 1:
            achievement.achievements[47].name =
                "Why are you still using Standard notation?"
            break
        case 2:
        case 3:
            achievement.achievements[47].name = "45 digits is a lot"
            break
        case 4:
            achievement.achievements[47].name =
                "Why are you still using Condensed notation?"
            break
        case 5:
            achievement.achievements[47].name = "45 digits is a lot"
            break
        case 6:
            achievement.achievements[47].name =
                "This achievement brought to you by the letter N"
            break
        case 7:
            achievement.achievements[47].name = "Cancerously huge"
            break
        case 8:
            achievement.achievements[47].name = "Can't even see how big this is"
            break
        case 9:
            achievement.achievements[47].name = "A non-zero portion of infinity"
            break
        case 10:
            achievement.achievements[47].name = "Oh, this is pretty mega"
            break
        case 11:
            achievement.achievements[47].name = "This was huge in Rome"
            break
        case 12:
            achievement.achievements[47].name = "NDUgZGlnaXRzIGlzIGEgbG90"
            break
    }

    if (game.notation === 8) {
        pp_upgrade.upgrades[14].desc =
            "Unlocks the EXP Overclocker, which boosts EXP ???x for ???"
        pp_map
            .get(pp_upgrade.upgrades[14])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[14].desc
        pp_upgrade.upgrades[24].desc =
            "Unautomated clicks are boosted a further +??? for every Autoclicker tier<br>(Currently: " +
            format_eff(16 + game.cps * 0.16) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[24])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[24].desc
        pp_upgrade.upgrades[29].desc =
            "Longer Prestiges give more AMP (up to ???)"
        pp_map
            .get(pp_upgrade.upgrades[29])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[29].desc
        pp_upgrade.upgrades[37].desc =
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge"
        pp_map
            .get(pp_upgrade.upgrades[37])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[37].desc
        pp_upgrade.upgrades[38].desc =
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge<br>Also allows you to Discharge at ???"
        pp_map
            .get(pp_upgrade.upgrades[38])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[38].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +??? for every achievement completed<br>Also unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[0].desc
        generator_perk.perks[18].desc =
            "You permanently keep ??? of your Times Prestiged stat every Reboot"
        perk_map
            .get(generator_perk.perks[18])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[18].desc
        generator_perk.perks[26].desc =
            "You gain ??? of your pending AMP every second"
        perk_map
            .get(generator_perk.perks[26])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[26].desc
        generator_perk.perks[27].desc =
            "PP is immediately granted on leveling up rather than Prestiging<br>AMP Conversion now gives ??? of your pending AMP instead"
        perk_map
            .get(generator_perk.perks[27])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[27].desc

        achievement.achievements[27].requirement = "Prestige ??? times"
        achievement.achievements[62].requirement = "Play for ???"
        achievement.achievements[63].requirement = "Play for ???"
        achievement.achievements[64].requirement = "Play for ???"
        achievement.achievements[65].requirement = "Play for ???"
        achievement.achievements[66].requirement = "Play for ???"
        achievement.achievements[101].requirement = "Reboot in under ???"
        achievement.achievements[102].requirement = "Reboot in under ???"
        achievement.achievements[103].requirement = "Reboot in under ???"
        achievement.achievements[104].requirement = "Reboot in under ???"
        achievement.achievements[126].requirement = "Quantize ??? times"
        achievement.achievements[139].requirement = "Quantize in under ???"
        achievement.achievements[140].requirement = "Quantize in under ???"
        achievement.achievements[141].requirement = "Quantize in under ???"
        achievement.achievements[142].requirement = "Quantize in under ???"
        achievement.achievements[143].requirement = "Quantize in under ???"
        achievement.achievements[147].requirement =
            "Reach " +
            format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
            " kg dark matter in under ???"
        achievement.achievements[156].requirement = "Gain no EXP for ???"

        if (game.perks[9]) {
            pp_upgrade.upgrades[35].desc =
                "Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
        } else {
            pp_upgrade.upgrades[35].desc =
                "Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge<br>Also unlocks automation for Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
        }

        if (game.perks[17]) {
            generator_perk.perks[6].desc =
                "All Upgrades require ??? fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require ??? fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        } else {
            generator_perk.perks[6].desc =
                "All Upgrades require ??? fewer levels"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require ??? fewer levels"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        }
    } else {
        pp_upgrade.upgrades[14].desc =
            "Unlocks the EXP Overclocker, which boosts EXP 3x for 45 seconds"
        pp_map
            .get(pp_upgrade.upgrades[14])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[14].desc
        pp_upgrade.upgrades[24].desc =
            "Unautomated clicks are boosted a further +32% for every Autoclicker tier<br>(Currently: " +
            format_eff(16 + game.cps * 0.16) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[24])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[24].desc
        if (game.challenge === 7) {
            pp_upgrade.upgrades[24].desc =
                "Unautomated clicks are boosted a further +32% for every Autoclicker tier<br>(Currently: " +
                format_eff(16 + game.cps * 0.16) +
                "x)"
            pp_map
                .get(pp_upgrade.upgrades[24])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[24].desc
        }
        pp_upgrade.upgrades[29].desc =
            "Longer Prestiges give more AMP (up to 10 seconds)"
        pp_map
            .get(pp_upgrade.upgrades[29])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[29].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +5% for every achievement completed<br>Also unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[0].desc
        generator_perk.perks[18].desc =
            "You permanently keep 25% of your Times Prestiged stat every Reboot"
        perk_map
            .get(generator_perk.perks[18])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[18].desc
        generator_perk.perks[26].desc =
            "You gain 20% of your pending AMP every second"
        perk_map
            .get(generator_perk.perks[26])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[26].desc
        generator_perk.perks[27].desc =
            "PP is immediately granted on leveling up rather than Prestiging<br>AMP Conversion now gives 100% of your pending AMP instead"
        perk_map
            .get(generator_perk.perks[27])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[27].desc

        achievement.achievements[27].requirement = "Prestige 1 time"
        achievement.achievements[62].requirement = "Play for 1 hour"
        achievement.achievements[63].requirement = "Play for 6 hours"
        achievement.achievements[64].requirement = "Play for 24 hours"
        achievement.achievements[65].requirement = "Play for 72 hours"
        achievement.achievements[66].requirement = "Play for 168 hours"
        achievement.achievements[101].requirement = "Reboot in under 1 hour"
        achievement.achievements[102].requirement = "Reboot in under 10 minutes"
        achievement.achievements[103].requirement = "Reboot in under 1 minute"
        achievement.achievements[104].requirement = "Reboot in under 1 second"
        achievement.achievements[126].requirement = "Quantize 1 time"
        achievement.achievements[139].requirement = "Quantize in under 1 hour"
        achievement.achievements[140].requirement =
            "Quantize in under 5 minutes"
        achievement.achievements[141].requirement = "Quantize in under 1 minute"
        achievement.achievements[142].requirement =
            "Quantize in under 30 seconds"
        achievement.achievements[143].requirement =
            "Quantize in under 10 seconds"
        achievement.achievements[147].requirement =
            "Reach " +
            format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
            " kg dark matter in under 1 minute"
        achievement.achievements[156].requirement = "Gain no EXP for 10 minutes"

        if (game.perks[9]) {
            pp_upgrade.upgrades[35].desc =
                "Unlocks 50% Capacitance mode, which gives a 8x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
            pp_upgrade.upgrades[37].desc =
                "Unlocks 75% Capacitance mode, giving a 12x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[37])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[37].desc
            pp_upgrade.upgrades[38].desc =
                "Unlocks 100% Capacitance mode, giving a 16x boost on Discharge<br>Also allows you to Discharge at 0 seconds"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[38].desc
        } else {
            pp_upgrade.upgrades[35].desc =
                "Unlocks 50% Capacitance mode, which gives a 4x boost on Discharge<br>Also unlocks automation for Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
            pp_upgrade.upgrades[37].desc =
                "Unlocks 75% Capacitance mode, giving a 6x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[37])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[37].desc
            pp_upgrade.upgrades[38].desc =
                "Unlocks 100% Capacitance mode, giving a 8x boost on Discharge<br>Also allows you to Discharge at 0 seconds"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[38].desc
        }

        if (game.perks[17]) {
            generator_perk.perks[6].desc =
                "All Upgrades require 25% fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require 50% fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        } else {
            generator_perk.perks[6].desc =
                "All Upgrades require 25% fewer levels"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require 50% fewer levels"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        }
    }

    if (game.perks[0]) {
        pp_upgrade.upgrades[12].desc =
            "Unlocks four additional modes for Auto-Prestige configuration"
        pp_map
            .get(pp_upgrade.upgrades[12])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[12].desc
    } else {
        pp_upgrade.upgrades[12].desc =
            "Unlocks three additional modes for Auto-Prestige configuration"
        pp_map
            .get(pp_upgrade.upgrades[12])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[12].desc
    }

    if (game.perks[8]) {
        pp_upgrade.upgrades[25].desc =
            "Unlocks an upgrade that gives an additional multiplier to EXP"
        pp_map
            .get(pp_upgrade.upgrades[25])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[25].desc
    } else {
        pp_upgrade.upgrades[25].desc =
            "Unlocks an upgrade that gives an additional multiplier to EXP with active and idle modes"
        pp_map
            .get(pp_upgrade.upgrades[25])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[25].desc
    }

    if (game.perks[9]) {
        pp_upgrade.upgrades[32].desc =
            "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it<br>Stored EXP can later be discharged at a " +
            format_num(4) +
            "x boost<br>Also starts with automation unlocked"
        pp_map
            .get(pp_upgrade.upgrades[32])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[32].desc
    } else {
        pp_upgrade.upgrades[32].desc =
            "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it<br>Stored EXP can later be discharged at a " +
            format_num(2) +
            "x boost"
        pp_map
            .get(pp_upgrade.upgrades[32])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[32].desc
    }

    if (game.perks[12]) {
        pp_upgrade.upgrades[9].desc =
            "+" +
            format_num(8) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map.get(pp_upgrade.upgrades[9]).querySelector(".pp_desc").innerHTML =
            pp_upgrade.upgrades[9].desc
        pp_upgrade.upgrades[18].desc =
            "+" +
            format_num(12) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[18])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[18].desc
        pp_upgrade.upgrades[28].desc =
            "+" +
            format_num(16) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[28])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[28].desc
        pp_upgrade.upgrades[34].desc =
            "+" +
            format_num(20) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[34])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[34].desc
        generator_perk.perks[1].desc =
            "+" +
            format_num(24) +
            " free tiers on every upgrade on the Upgrades tab"
        perk_map
            .get(generator_perk.perks[1])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[1].desc
    } else {
        pp_upgrade.upgrades[9].desc =
            "+" +
            format_num(4) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map.get(pp_upgrade.upgrades[9]).querySelector(".pp_desc").innerHTML =
            pp_upgrade.upgrades[9].desc
        pp_upgrade.upgrades[18].desc =
            "+" +
            format_num(6) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[18])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[18].desc
        pp_upgrade.upgrades[28].desc =
            "+" +
            format_num(8) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[28])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[28].desc
        pp_upgrade.upgrades[34].desc =
            "+" +
            format_num(10) +
            " free tiers on every upgrade on the Upgrades tab"
        pp_map
            .get(pp_upgrade.upgrades[34])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[34].desc
        generator_perk.perks[1].desc =
            "+" +
            format_num(12) +
            " free tiers on every upgrade on the Upgrades tab"
        perk_map
            .get(generator_perk.perks[1])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[1].desc
    }

    if (game.perks[17]) {
        generator_perk.perks[15].desc =
            "Unlocks automation for Reboot<br>(Does not apply to challenges)"
        perk_map
            .get(generator_perk.perks[15])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[15].desc
    } else {
        generator_perk.perks[15].desc = "Unlocks automation for Reboot"
        perk_map
            .get(generator_perk.perks[15])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[15].desc
    }

    if (game.dk_bought[3]) {
        if (game.completions[3] >= 12) {
            challenge.challenges[3].desc =
                "You must surpass your highest level to gain more AMP, Patience and AMP Conversion do not apply"
        } else {
            challenge.challenges[3].desc =
                "You must surpass your highest level to gain more AMP, Patience does not apply"
        }
        challenge_map
            .get(challenge.challenges[3])
            .querySelector(".challenge_desc").innerHTML =
            challenge.challenges[3].desc
    } else {
        challenge.challenges[3].desc =
            "You must surpass your highest level to gain more AMP, Patience does not apply"
        challenge_map
            .get(challenge.challenges[3])
            .querySelector(".challenge_desc").innerHTML =
            challenge.challenges[3].desc
    }

    switch (game.completions[5]) {
        case 0:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in " +
                format_num(6) +
                " Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
                challenge.challenges[5].desc
            break
        case 1:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in " +
                format_num(5) +
                " Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
                challenge.challenges[5].desc
            break
        case 2:
        case 3:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in " +
                format_num(4) +
                " Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
                challenge.challenges[5].desc
            break
        case 4:
        case 5:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in " +
                format_num(3) +
                " Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
                challenge.challenges[5].desc
            break
        case 6:
        case 7:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in " +
                format_num(2) +
                " Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
                challenge.challenges[5].desc
            break
        case 8:
        case 9:
        case 10:
        case 11:
            challenge.challenges[5].desc =
                "All EXP production is divided by " +
                format_num(10 ** 12) +
                ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in 1 Prestige or less"
            if (game.notation === 8)
                challenge.challenges[5].desc =
                    "All EXP production is divided by " +
                    format_num(10 ** 12) +
                    ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in ??? Prestiges or less"
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
                challenge.challenges[5].desc
            break
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        default:
            if (game.dk_bought[3]) {
                challenge.challenges[5].desc =
                    "All EXP production is divided by " +
                    format_num(10 ** (12 + 6 * (game.completions[5] - 11))) +
                    "<br>Multi-Prestige, Reboot Residue, Ease of Completion do not apply<br>Reboot in " +
                    format_num(0) +
                    " Prestiges or less"
            } else {
                challenge.challenges[5].desc =
                    "All EXP production is divided by " +
                    format_num(10 ** 12) +
                    ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in 1 Prestige or less"
                if (game.notation === 8)
                    challenge.challenges[5].desc =
                        "All EXP production is divided by " +
                        format_num(10 ** 12) +
                        ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in ??? Prestiges or less"
            }
            challenge_map
                .get(challenge.challenges[5])
                .querySelector(".challenge_desc").innerHTML =
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
    } else if (game.tab === 4) {
        goto_subtab(game.subtab[2])
    } else if (game.tab === 5) {
        goto_subtab(game.subtab[3])
    }
    if (game.work) {
        document.getElementById("work_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("work_button").innerHTML = "DISABLED"
    }
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
    switch (game.switchpoint) {
        case 0:
            document.getElementById("switchpoint_button").innerHTML = "MILLION"
            break
        case 1:
            document.getElementById("switchpoint_button").innerHTML = "BILLION"
            break
    }
    if (game.hotkeys) {
        document.getElementById("hotkeys_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("hotkeys_button").innerHTML = "DISABLED"
    }
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
    if (
        game.pp_progress &&
        (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1)
    ) {
        document.getElementById("pp_bar_button").innerHTML = "ENABLED"
        document.getElementById("pp_back").style.display = "block"
    } else {
        document.getElementById("pp_bar_button").innerHTML = "DISABLED"
        document.getElementById("pp_back").style.display = "none"
    }
    if (game.epilepsy) {
        document.getElementById("epilepsy_button").innerHTML = "DISABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "white"
        )
        document.documentElement.style.setProperty("--button_color", "black")
        document.documentElement.style.setProperty("--enter_color", "white")
        document.documentElement.style.setProperty("--enter_shadow", "white")
    } else {
        document.getElementById("epilepsy_button").innerHTML = "ENABLED"
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
            document.getElementById("color_button").innerHTML = "AUTOMATIC"
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
    if (game.confirmation) {
        document.getElementById("confirm_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("confirm_button").innerHTML = "DISABLED"
    }
    if (game.challenge_confirmation) {
        document.getElementById("ch_confirm_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("ch_confirm_button").innerHTML = "DISABLED"
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
    }
    if (game.hints) {
        document.getElementById("hints_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("hints_button").innerHTML = "DISABLED"
    }

    if (game.pp_bought[39] == true) {
        document.getElementById("reboot").style.display = "inline"
        watts_update()
    } else {
        document.getElementById("reboot").style.display = "none"
    }

    document.getElementById("lvlnum").innerHTML = format_num(game.level)
    document.getElementById("exp").innerHTML =
        format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerHTML =
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

    document.getElementById("page_text1").innerHTML =
        "Page " + (game.achiev_page + 1)
    document.getElementById("page_text2").innerHTML =
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
                document.getElementById("oc_state").innerHTML = "Recharging"
                document.getElementById("oc_timer").style.display = "block"
                if (!meme)
                    document.getElementById("oc_progress").style.background =
                        "#ff2f00"
                break
            case 1:
                document.getElementById("oc_button").style.display = "inline"
                document.getElementById("oc_state").innerHTML = "Standby"
                document.getElementById("oc_timer").style.display = "none"
                if (!meme)
                    document.getElementById("oc_progress").style.background =
                        "#ff2f00"
                break
            case 2:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerHTML =
                    "Boosting " + format_num(game.exp_oc) + "x"
                document.getElementById("oc_timer").style.display = "block"
                if (!meme)
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
        game.autods_toggle !== 2 &&
        ((game.pp_bought[35] && !game.perks[9]) ||
            (game.pp_bought[32] && game.perks[9]))
    ) {
        document.getElementById("dis_text").style.display = "block"
        document.getElementById("dis_input").style.display = "block"
    } else {
        document.getElementById("dis_text").style.display = "none"
        document.getElementById("dis_input").style.display = "none"
    }
    document.getElementById("dis_input").value = game.autods_goal

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
        document.getElementById("watts_input").value = game.autorb_goal[0]
        document.getElementById("time_input2").value = game.autorb_goal[1]
        document.getElementById("push_input").value = game.autorb_push
        pendingrb_toggle()
        pendingrb_toggle()
        autorb_switch(game.autorb_mode)
    } else {
        document.getElementById("autorb_block").style.display = "none"
    }

    if (game.qu_bought[4]) {
        document.getElementById("autohy_block").style.display = "block"
        hy_toggle()
        hy_toggle()
        document.getElementById("portion_input").value = game.autohy_portion
        document.getElementById("importance_input").value =
            game.autohy_importance
    } else {
        document.getElementById("autohy_block").style.display = "none"
    }

    if (game.qu_bought[7] && game.tab === 4) {
        document.getElementById("quantum_tabs").style.display = "flex"
    } else {
        document.getElementById("quantum_tabs").style.display = "none"
    }

    if (game.dk_bought[1]) {
        document.getElementById("autoqu_block").style.display = "block"
        if (!game.quantum_confirmation) {
            qu_toggle()
            qu_toggle()
        } else {
            game.autoqu_toggle = false
        }
        document.getElementById("photons_input").value = game.autoqu_goal[0]
        document.getElementById("time_input3").value = game.autoqu_goal[1]
        if (game.om_bought[1])
            document.getElementById("step_input").value = game.autoqu_goal[2]
        autoqu_switch(game.autoqu_mode)
    } else {
        document.getElementById("autoqu_block").style.display = "none"
    }

    if (game.om_bought[0]) {
        cl_toggle()
        cl_toggle()
    }

    if (game.om_bought[3]) {
        gr_toggle()
        gr_toggle()
    }

    if (game.om_bought[4]) {
        ps_toggle()
        ps_toggle()
    }

    document.getElementById("level_input").value = game.autopr_goal[0]
    document.getElementById("amp_input").value = game.autopr_goal[1]
    document.getElementById("pp_input").value = game.autopr_goal[2]
    document.getElementById("time_input").value = game.autopr_goal[3]

    document.getElementById("hue_input").value = game.custom_hue

    document.getElementById("refresh_input").value = game.refresh_rate
}
