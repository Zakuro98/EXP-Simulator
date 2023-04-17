let tick_time = Date.now()
let delta_time = undefined

//game operations run every tick
function tick() {
    //calculating total multiplier
    game.global_multiplier =
        game.exp_fact *
        game.exp_oc *
        game.exp_flux *
        game.pp_power *
        game.prestige_power *
        game.depth_power *
        game.ach_power *
        game.speed_power *
        game.ch_boost[0] *
        game.ch_boost[1] *
        game.ch_boost[2] *
        game.ch_boost[3] *
        game.ch_boost[4] *
        game.ch_boost[5] *
        game.ch_boost[6] *
        game.ch_boost[7] *
        game.ch_boost[8] *
        game.helium_boost *
        game.superspeed_power *
        game.dark_matter_boost *
        game.infusion

    if (game.challenge === 7) {
        game.global_multiplier =
            game.ch_boost[0] *
            game.ch_boost[1] *
            game.ch_boost[2] *
            game.ch_boost[3] *
            game.ch_boost[4] *
            game.ch_boost[5] *
            game.ch_boost[6] *
            game.ch_boost[7] *
            game.ch_boost[8] *
            game.helium_boost
    }

    //challenge 5, 6 and 9
    if (game.challenge === 5) {
        if (game.prestige_time >= 30 * game.tickspeed) {
            reduction = 0
        } else {
            reduction = (1 - game.prestige_time / (30 * game.tickspeed)) ** 4
        }
    } else if (game.challenge === 6) {
        if (game.dk_bought[3]) {
            if (game.completions[5] >= 12) {
                reduction = 10 ** (-6 * (game.completions[5] - 11))
            } else {
                reduction = 10 ** -12
            }
        } else {
            reduction = 10 ** -12
        }
    } else if (game.challenge === 9) {
        reduction = 10 ** -16
    } else {
        reduction = 1
    }

    //omega challenge
    if (game.omega_challenge) {
        if (game.challenge !== 7) {
            reduction /=
                ((game.exp_add + game.exp_fluct / 2) *
                    game.global_multiplier *
                    game.exp_battery) **
                0.5
        } else {
            reduction /= (game.exp_add * game.global_multiplier) ** 0.5
        }
    }

    game.global_multiplier *= reduction

    //autoclicker operation
    if (game.cps > 0) {
        game.click_time += game.cps / delta_time
        if (game.click_time >= 1) {
            if (game.challenge !== 7) {
                if (game.battery_mode === 1 || game.perks[8])
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
            } else {
                increment(
                    Math.round(
                        game.exp_add *
                            Math.floor(game.click_time) *
                            game.global_multiplier
                    )
                )
            }
            game.click_time -= Math.floor(game.click_time)
        }
    }

    //amp conversion
    if (
        game.perks[26] &&
        game.challenge !== 9 &&
        !(
            game.challenge === 4 &&
            game.dk_bought[3] &&
            game.completions[3] >= 12
        )
    ) {
        if (game.challenge === 4) {
            if (game.level >= game.highest_level) {
                if (!game.perks[27])
                    game.amp += Math.floor(
                        (get_amp(game.level) * game.watt_boost * 0.2) /
                            delta_time
                    )
                else
                    game.amp += Math.floor(
                        (get_amp(game.level) *
                            game.patience *
                            game.watt_boost) /
                            delta_time
                    )

                if (!game.achievements[36] && game.amp >= 100)
                    get_achievement(36)
                if (!game.achievements[37] && game.amp >= 10000)
                    get_achievement(37)
                if (!game.achievements[38] && game.amp >= 10 ** 6)
                    get_achievement(38)
                if (!game.achievements[39] && game.amp >= 10 ** 8)
                    get_achievement(39)
                if (!game.achievements[40] && game.amp >= 10 ** 10)
                    get_achievement(40)
                if (!game.achievements[41] && game.amp >= 10 ** 12)
                    get_achievement(41)
                if (!game.achievements[42] && game.amp >= 10 ** 14)
                    get_achievement(42)
                if (!game.achievements[71] && game.amp >= 10 ** 16)
                    get_achievement(71)
                if (!game.achievements[81] && game.amp >= 10 ** 18)
                    get_achievement(81)
                if (!game.achievements[94] && game.amp >= 10 ** 20)
                    get_achievement(94)
                if (!game.achievements[103] && game.amp >= 10 ** 24)
                    get_achievement(103)
                if (!game.achievements[117] && game.amp >= 10 ** 28)
                    get_achievement(117)
                if (!game.achievements[133] && game.amp >= 10 ** 32)
                    get_achievement(133)
            }
        } else {
            if (game.level >= game.pr_min) {
                if (!game.perks[27])
                    game.amp += Math.floor(
                        (get_amp(game.level) *
                            game.patience *
                            game.watt_boost *
                            0.2) /
                            delta_time
                    )
                else
                    game.amp += Math.floor(
                        (get_amp(game.level) *
                            game.patience *
                            game.watt_boost) /
                            delta_time
                    )

                if (!game.achievements[36] && game.amp >= 100)
                    get_achievement(36)
                if (!game.achievements[37] && game.amp >= 10000)
                    get_achievement(37)
                if (!game.achievements[38] && game.amp >= 10 ** 6)
                    get_achievement(38)
                if (!game.achievements[39] && game.amp >= 10 ** 8)
                    get_achievement(39)
                if (!game.achievements[40] && game.amp >= 10 ** 10)
                    get_achievement(40)
                if (!game.achievements[41] && game.amp >= 10 ** 12)
                    get_achievement(41)
                if (!game.achievements[42] && game.amp >= 10 ** 14)
                    get_achievement(42)
                if (!game.achievements[71] && game.amp >= 10 ** 16)
                    get_achievement(71)
                if (!game.achievements[81] && game.amp >= 10 ** 18)
                    get_achievement(81)
                if (!game.achievements[94] && game.amp >= 10 ** 20)
                    get_achievement(94)
                if (!game.achievements[103] && game.amp >= 10 ** 24)
                    get_achievement(103)
                if (!game.achievements[117] && game.amp >= 10 ** 28)
                    get_achievement(117)
                if (!game.achievements[133] && game.amp >= 10 ** 32)
                    get_achievement(133)
            }
        }
    }

    //incrementing time statistics
    game.time += 30 / delta_time
    game.prestige_time += 30 / delta_time
    game.reboot_time += 30 / delta_time
    game.all_time += 30 / delta_time
    game.afk_time += 30 / delta_time

    //photon colors
    document.documentElement.style.setProperty(
        "--photon_color",
        "hsl(" + (((game.all_time * 72) / game.tickspeed) % 360) + ",100%,75%)"
    )
    document.documentElement.style.setProperty(
        "--photon_color2",
        "hsl(" + (((game.all_time * 72) / game.tickspeed) % 360) + ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--photon_color3",
        "hsl(" +
            (((game.all_time * 72) / game.tickspeed) % 360) +
            ",100%,12.5%)"
    )

    //ease of completion
    if (
        game.qu_bought[2] &&
        game.challenge !== 0 &&
        !(game.challenge === 6 && game.completions[5] >= 12)
    ) {
        let challenge_requirement = 0
        let ch = game.challenge - 1

        if (game.completions[ch] < 12) {
            challenge_requirement =
                challenge.challenges[ch].goal +
                challenge.challenges[ch].step * game.completions[ch] +
                (challenge.challenges[ch].step2 *
                    (game.completions[ch] - 1) *
                    game.completions[ch]) /
                    2
        } else {
            if (game.dk_bought[3]) {
                if (game.completions[ch] < 20) {
                    challenge_requirement =
                        challenge.challenges[ch].goal2 +
                        challenge.challenges[ch].step3 *
                            (game.completions[ch] - 12) +
                        (challenge.challenges[ch].step4 *
                            (game.completions[ch] - 13) *
                            (game.completions[ch] - 12)) /
                            2
                } else {
                    challenge_requirement =
                        challenge.challenges[ch].goal2 +
                        challenge.challenges[ch].step3 * 7 +
                        challenge.challenges[ch].step4 * 21
                }
            } else {
                challenge_requirement =
                    challenge.challenges[ch].goal +
                    challenge.challenges[ch].step * 11 +
                    challenge.challenges[ch].step2 * 55
            }
        }

        if (game.pp >= challenge_requirement) {
            if (game.dk_bought[3]) {
                if (game.completions[ch] < 20) game.completions[ch]++

                if (game.completions[ch] >= 20 && !game.achievements[158])
                    get_achievement(158)

                if (
                    !game.achievements[159] &&
                    game.completions[0] +
                        game.completions[1] +
                        game.completions[2] +
                        game.completions[3] +
                        game.completions[4] +
                        game.completions[5] +
                        game.completions[6] +
                        game.completions[7] +
                        game.completions[8] >=
                        180
                )
                    get_achievement(159)
            } else {
                if (game.completions[ch] < 12) game.completions[ch]++
            }

            if (!game.achievements[92] && game.blind) get_achievement(92)

            if (game.completions[ch] === 0) {
                game.ch_boost[ch] = 1
            } else {
                game.ch_boost[ch] = game.completions[ch] * 4
                if (game.completions[ch] >= 13) {
                    game.ch_helium_boost[ch] =
                        (game.completions[ch] - 12) * 0.5 + 1
                } else {
                    game.ch_helium_boost[ch] = 1
                }
            }
        }
    }

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
    if (Math.floor(game.all_time) % game.tickspeed === 0) {
        let roll = Math.random()
        if (!game.achievements[66] && roll < 1 / 7777) {
            get_achievement(66)
        }
    }

    //a whole lot of nothing
    if (!game.achievements[63] && game.afk_time >= 600 * game.tickspeed)
        get_achievement(63)

    //discharge automation
    if (
        (game.pp_bought[35] || (game.pp_bought[32] && game.perks[9])) &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        if (game.autods_toggle === 1) {
            if (game.stored_exp >= game.autods_goal * game.tickspeed) {
                discharge()
            }
        }
        if (game.autods_toggle === 2) {
            let oc_cycle = 45
            if (game.pp_bought[21]) oc_cycle = 90
            if (game.pp_bought[26] && game.perks[5]) oc_cycle += 90
            else if (game.pp_bought[26] || game.perks[5]) oc_cycle += 180
            else oc_cycle += 360

            if (game.autopr_mode === 2) {
                game.smartds_oc = true

                if (game.perks[14]) {
                    if (
                        game.smartpr_pp < oc_cycle &&
                        game.amp < game.smartpr_amp
                    ) {
                        game.smartds_oc = false
                    } else {
                        game.smartds_oc = true
                    }
                }
            }
            if (game.autopr_mode === 3) {
                if (game.autopr_goal[3] >= oc_cycle) {
                    game.smartds_oc = true
                } else {
                    game.smartds_oc = false
                }
            }
            if (
                game.autopr_mode === 0 ||
                game.autopr_mode === 1 ||
                game.autopr_mode === 4
            ) {
                game.smartds_oc = false
            }
            if (!game.autopr_toggle) {
                game.smartds_oc = true
            }

            if (game.perks[20]) game.smartds_oc = false

            if (game.smartds_oc) {
                if (game.oc_state === 2) {
                    discharge()
                }
            } else {
                discharge()
            }
        }
    }

    //upgrade automation
    for (let i = 0; i < 6; i++) {
        if (game.autoup_toggle[i] && game.pp_bought[2]) {
            upgrade(i, true)
        }
    }

    //exp flux handling
    if (game.pp_bought[20] && game.challenge !== 7) {
        game.exp_flux +=
            (0.0025 *
                game.flux_boost *
                game.flux_increase *
                (game.flux_tier + game.starter_kit + game.generator_kit)) /
            delta_time
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
            "Unlocks an upgrade that generates a boost to EXP production, increasing over time<br>(Currently: " +
            format_eff(game.exp_flux) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[20])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[20].desc
    } else {
        pp_upgrade.upgrades[20].desc =
            "Unlocks an upgrade that generates a boost to EXP production, increasing over time<br>(Caps at " +
            format_num(20) +
            "x)"
        pp_map
            .get(pp_upgrade.upgrades[20])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[20].desc
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

    //grabbing refresh rate from input
    game.refresh_rate = Number(document.getElementById("refresh_input").value)
    if (game.refresh_rate === NaN) game.refresh_rate = 30
    if (game.refresh_rate < 2) game.refresh_rate = 2
    if (game.refresh_rate > 30) game.refresh_rate = 30

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
                    if (game.challenge !== 4 && game.challenge !== 9) {
                        if (
                            get_amp(game.level) *
                                game.patience *
                                game.watt_boost >=
                            game.autopr_goal[1]
                        ) {
                            prestige()
                        }
                    } else {
                        if (
                            (get_amp(game.level) -
                                get_amp(game.highest_level)) *
                                game.watt_boost >=
                            game.autopr_goal[1]
                        ) {
                            prestige()
                        }
                    }
                    break
                case 2:
                    let pp_amount = 0
                    if (game.prestige <= 21) pp_amount += 1
                    if (game.level > game.highest_level)
                        pp_amount +=
                            get_pp(game.level) - get_pp(game.highest_level)
                    if (pp_amount >= game.autopr_goal[2]) {
                        prestige()
                    }
                    if (
                        game.perks[14] &&
                        game.smartpr_time >= game.smartpr_pp * game.tickspeed &&
                        game.amp < game.smartpr_amp
                    ) {
                        prestige()
                        game.smartpr_time = 0
                    }
                    break
                case 3:
                    if (game.time >= game.autopr_goal[3] * game.tickspeed) {
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
                    if (game.challenge === 4 || game.challenge === 9)
                        amp_sec =
                            Math.floor(
                                (get_amp(game.level) -
                                    get_amp(game.highest_level)) *
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

    //smart prestige automation
    if (game.perks[14]) {
        if (game.smartpr_toggle && game.autopr_toggle) {
            game.smartpr_time++
            document.getElementById("smart_time").innerHTML =
                "Current Mode Time: " + format_time(game.smartpr_time)
            if (game.smartpr_mode === 0) {
                if (game.smartpr_time >= game.smartpr_peak * game.tickspeed) {
                    game.smartpr_mode = 1
                    game.smartpr_time = 0
                    autopr_switch(2)
                }
                if (game.amp >= game.smartpr_amp && game.smartpr_amp > 0) {
                    game.smartpr_mode = 1
                    game.smartpr_time = 0
                    autopr_switch(2)
                }
            } else if (game.smartpr_mode === 1) {
                if (
                    game.smartpr_time >= game.smartpr_pp * game.tickspeed &&
                    game.amp < game.smartpr_amp
                ) {
                    game.smartpr_mode = 0
                    game.smartpr_time = 0
                    autopr_switch(4)
                }
                if (
                    game.smartpr_time >= game.smartpr_pp * game.tickspeed &&
                    game.smartpr_amp === 0
                ) {
                    game.smartpr_mode = 0
                    game.smartpr_time = 0
                    autopr_switch(4)
                }
            }
        }

        game.smartpr_peak = Number(
            document.getElementById("smart_peak_input").value
        )
        game.smartpr_pp = Number(
            document.getElementById("smart_pp_input").value
        )
        game.smartpr_amp = Number(
            document.getElementById("smart_amp_input").value
        )
        if (game.smartpr_peak === NaN) game.smartpr_peak = 0
        if (game.smartpr_peak < 0) game.smartpr_peak = 0
        if (game.smartpr_pp === NaN) game.smartpr_pp = 0
        if (game.smartpr_pp < 0) game.smartpr_pp = 0
        if (game.smartpr_amp === NaN) game.smartpr_amp = 0
        if (game.smartpr_amp < 0) game.smartpr_amp = 0
    }

    //overclocker handling
    if (
        game.pp_bought[14] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        switch (game.oc_state) {
            case 0:
                game.oc_time += 30 / delta_time
                if (game.pp_bought[26] && game.perks[5]) {
                    document.getElementById("oc_timer").innerHTML =
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
                        document.getElementById("oc_state").innerHTML =
                            "Standby"
                        document.getElementById("oc_timer").style.display =
                            "none"
                    }
                } else if (game.pp_bought[26] || game.perks[5]) {
                    document.getElementById("oc_timer").innerHTML =
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
                        document.getElementById("oc_state").innerHTML =
                            "Standby"
                        document.getElementById("oc_timer").style.display =
                            "none"
                    }
                } else {
                    document.getElementById("oc_timer").innerHTML =
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
                        document.getElementById("oc_state").innerHTML =
                            "Standby"
                        document.getElementById("oc_timer").style.display =
                            "none"
                    }
                }
                break
            case 2:
                if (game.oc_time > 0) {
                    game.oc_time -= 30 / delta_time
                    document.getElementById("oc_timer").innerHTML =
                        format_time(game.oc_time) + " Left"
                    document.getElementById("oc_progress").style.width =
                        (100 * game.oc_time) / (45 * game.tickspeed) + "%"
                    if (game.pp_bought[21])
                        document.getElementById("oc_progress").style.width =
                            (100 * game.oc_time) / (90 * game.tickspeed) + "%"
                } else {
                    game.exp_oc = 1
                    game.oc_state = 0
                    game.oc_time = 0
                    document.getElementById("oc_state").innerHTML = "Recharging"
                    if (!meme)
                        document.getElementById(
                            "oc_progress"
                        ).style.background = "#ff2f00"
                }
                break
        }
        if (game.notation === 8) {
            document.getElementById("oc_progress").style.width = "100%"
        }

        if (game.perks[20]) {
            game.oc_state = 2
            if (game.pp_bought[21]) game.oc_time = 90 * game.tickspeed
            else game.oc_time = 45 * game.tickspeed
            game.exp_oc = 3
            if (game.pp_bought[19]) game.exp_oc = 4
            if (game.pp_bought[23]) game.exp_oc = 5
            document.getElementById("oc_state").innerHTML =
                "Boosting " + format_num(game.exp_oc) + "x"
            document.getElementById("oc_button").style.display = "none"
            document.getElementById("oc_auto").style.display = "none"
            document.getElementById("oc_timer").style.display = "block"
            document.getElementById("oc_timer").innerHTML = "∞ Left"
            if (!meme)
                document.getElementById("oc_progress").style.background =
                    "#ff7f00"
            document.getElementById("oc_progress").style.width = "100%"
        }
    }

    //overclocker automation
    if (
        game.autooc_toggle &&
        game.pp_bought[16] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9 &&
        !game.perks[20]
    ) {
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
        }
    }

    //capacitance handling
    if (
        game.pp_bought[32] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        let eps =
            (game.exp_add + game.exp_fluct / 2) *
            game.global_multiplier *
            game.cps
        if (game.battery_mode === 1 || game.perks[8]) eps *= game.exp_battery
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
        if (game.cap_mode >= 1 || game.notation === 8) {
            if (!game.perks[9])
                if_discharge =
                    "If Discharged: +" +
                    format_num(
                        (game.stored_exp / game.tickspeed) *
                            eps *
                            game.cap_mode *
                            2
                    ) +
                    " EXP (" +
                    format_num(game.cap_mode * 2) +
                    "x)"
            else
                if_discharge =
                    "If Discharged: +" +
                    format_num(
                        (game.stored_exp / game.tickspeed) *
                            eps *
                            game.cap_mode *
                            4
                    ) +
                    " EXP (" +
                    format_num(game.cap_mode * 4) +
                    "x)"
        }
        document.getElementById("cap_stats").innerHTML =
            base_exp +
            "<br>" +
            effective_exp +
            "<br>" +
            stored +
            "<br>" +
            if_discharge

        if (game.stored_exp <= 300 * game.tickspeed) {
            game.stored_exp += (30 / delta_time) * (1 - game.cap_boost)
        }

        if (
            game.cap_mode > 0 &&
            (game.stored_exp >= game.tickspeed || game.pp_bought[38])
        ) {
            document.getElementById("discharge_button").className =
                "button ready"
            if (meme)
                document.getElementById("discharge_button").disabled = false
            else {
                if (game.level < 60) {
                    document.getElementById("discharge_button").style.color =
                        get_color(Math.floor(game.level / 10))
                } else {
                    document.getElementById("discharge_button").style.color =
                        get_color((Math.floor(game.level / 60) + 5) % 12)
                }
            }
        } else {
            document.getElementById("discharge_button").className =
                "button blocked"
            if (!meme)
                document.getElementById("discharge_button").style.color =
                    "silver"
            else document.getElementById("discharge_button").disabled = true
        }
    }

    //grabbing amount from auto discharge config
    game.autods_goal = Number(document.getElementById("dis_input").value)
    if (game.autods_goal === NaN) game.autods_goal = 1
    if (game.autods_goal < 1 && !game.pp_bought[38]) game.autods_goal = 1
    else if (game.autods_goal < 0 && game.pp_bought[38]) game.autods_goal = 0
    if (game.autods_goal > 300) game.autods_goal = 300

    //prestige upgrade automation
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
                    document.getElementById("pp").innerHTML =
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
                    document.getElementById("pp").innerHTML =
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
                        document.getElementById("pp").innerHTML =
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

    //reboot automation
    game.autorb_goal[0] = Number(document.getElementById("watts_input").value)
    if (game.autorb_goal[0] === NaN) game.autorb_goal[0] = 1
    if (game.autorb_goal[0] < 1) game.autorb_goal[0] = 1

    game.autorb_goal[1] = Number(document.getElementById("time_input2").value)
    if (game.autorb_goal[1] === NaN) game.autorb_goal[1] = 0
    if (game.autorb_goal[1] < 0) game.autorb_goal[1] = 0

    game.autorb_push = Number(document.getElementById("push_input").value)
    if (game.autorb_push === NaN) game.autorb_push = 0
    if (game.autorb_push < 0) game.autorb_push = 0

    if (game.autorb_toggle && game.perks[15] && game.challenge === 0) {
        if (
            get_watts(
                game.pp + get_pp(game.level) - get_pp(game.highest_level)
            ) < 527
        ) {
            if (
                game.autorb_pending &&
                !game.perks[27] &&
                game.pp + get_pp(game.level) - get_pp(game.highest_level) >=
                    Math.ceil(20000 * game.autorb_goal[0] + 180000)
            ) {
                prestige()
            }
        } else {
            if (
                game.autorb_pending &&
                !game.perks[27] &&
                game.pp + get_pp(game.level) - get_pp(game.highest_level) >=
                    Math.ceil(
                        20000 * (game.autorb_goal[0] - 526) ** 1.25 + 10720000
                    )
            ) {
                prestige()
            }
        }

        if (
            game.reboot_time < game.autorb_push * game.tickspeed ||
            !game.dk_bought[0]
        ) {
            switch (game.autorb_mode) {
                case 0:
                    if (
                        get_watts(game.pp) * game.prism_boost >=
                        game.autorb_goal[0]
                    ) {
                        reboot()
                    }
                    break
                case 1:
                    if (
                        game.prestige_time >=
                        game.autorb_goal[1] * game.tickspeed
                    ) {
                        reboot()
                    }
                    break
            }
        }
    }

    //reactor handling
    if (game.perks[22] && (game.watts >= 98304 || game.dk_bought[5])) {
        game.hps =
            game.core_level[0] *
            (game.core_level[1] + 1) *
            (game.core_level[2] + 1) *
            (game.core_level[3] + 1) *
            (game.core_level[4] + 1) *
            (game.core_level[5] + 1) *
            (game.core_level[6] + 1) *
            (game.core_level[7] + 1)
        if (game.perks[23] && game.watts >= 117965)
            game.hps *= (game.watts * 5) / generator_perk.perks[23].requirement
        if (game.perks[24] && game.helium > 10) {
            if (!game.qu_bought[6]) game.hps *= Math.log10(game.helium)
            else game.hps *= Math.log10(game.helium) ** 2
        }
        if (game.qu_bought[0] && game.hydrogen >= 1)
            game.hps *= game.hydrogen ** 0.25
        if (game.dk_bought[3]) {
            game.hps *=
                game.ch_helium_boost[0] *
                game.ch_helium_boost[1] *
                game.ch_helium_boost[2] *
                game.ch_helium_boost[3] *
                game.ch_helium_boost[4] *
                game.ch_helium_boost[5] *
                game.ch_helium_boost[6] *
                game.ch_helium_boost[7] *
                game.ch_helium_boost[8]
        }
        if (game.dk_bought[4]) game.hps *= (game.prism_boost / 150) ** (4 / 3)
        if (game.dk_bought[6]) game.hps *= game.dark_matter_boost ** 0.2
        game.hps *= game.om_boost[1]

        if (!game.achievements[107] && game.hps >= 10 ** 30)
            get_achievement(107)
        if (!game.achievements[148] && game.hps >= 10 ** 60)
            get_achievement(148)
        if (!game.achievements[157] && game.hps >= 10 ** 90)
            get_achievement(157)

        if (game.challenge !== 8) game.helium += game.hps / delta_time
        game.helium_boost = (game.helium / 256 + 1) ** 1.25
    } else {
        game.hps = 0
    }

    //prism spinning
    prism_angle -= game.prism_level ** (2 / 3) / 135

    //reactor automation
    game.autohy_portion = Number(document.getElementById("portion_input").value)
    if (game.autohy_portion === NaN) game.autohy_portion = 0.5
    if (game.autohy_portion < 0) game.autohy_portion = 0
    if (game.autohy_portion > 1) game.autohy_portion = 1

    game.autohy_importance = Number(
        document.getElementById("importance_input").value
    )
    if (game.autohy_importance === NaN) game.autohy_importance = 1
    if (game.autohy_importance < 0.01) game.autohy_importance = 0.01
    if (game.autohy_importance > 100) game.autohy_importance = 100

    if (
        game.qu_bought[4] &&
        game.autohy_toggle &&
        (game.watts >= 98304 || game.dk_bought[5])
    ) {
        let deuterium = false
        let supply_boost = 2 ** game.supply_level
        if (game.perks[25]) supply_boost = 2.5 ** game.supply_level
        if (game.dk_bought[5]) supply_boost = 3 ** game.supply_level
        if (game.core_level[0] >= 500000) {
            if (
                game.hydrogen * game.autohy_importance ** 0.5 >
                game.supply_price
            )
                deuterium = true
        } else {
            if (game.core_level[0] * game.autohy_importance > supply_boost)
                deuterium = true
        }

        if (game.core_level[2] >= 1 && deuterium) {
            while (game.budget >= game.supply_price) {
                game.hydrogen -= game.supply_price
                game.budget -= game.supply_price
                game.supply_level++
                game.supply_price *= 5
                if (game.supply_level > 16)
                    game.supply_price *= 5 * (game.supply_level - 16) ** 2
            }
        } else {
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
                        ((game.core_level[i] + 2) / (game.core_level[i] + 1) -
                            1)
                }
                if (
                    efficiency[i] < efficiency[selection] &&
                    game.hydrogen >= game.core_price[i]
                )
                    selection = i
            }
            while (game.budget >= game.core_price[selection]) {
                game.hydrogen -= game.core_price[selection]
                game.budget -= game.core_price[selection]
                game.core_level[selection]++
                if (
                    game.core_level[selection] >
                    Math.floor(500000 / 2 ** selection)
                ) {
                    game.core_price[selection] +=
                        (core.cores[selection].base_price *
                            (game.core_level[selection] -
                                Math.floor(500000 / 2 ** selection)) **
                                1.65) /
                        4
                } else {
                    game.core_price[selection] +=
                        core.cores[selection].base_price / 4
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
                            ((game.core_level[i] + 2) /
                                (game.core_level[i] + 1) -
                                1)
                    }
                    if (
                        efficiency[i] < efficiency[selection] &&
                        game.hydrogen >= game.core_price[i]
                    )
                        selection = i
                }
            }
        }
    }

    //quantize automation
    game.autoqu_goal[0] = Number(document.getElementById("photons_input").value)
    if (game.autoqu_goal[0] === NaN) game.autoqu_goal[0] = 1
    if (game.autoqu_goal[0] < 1) game.autoqu_goal[0] = 1

    game.autoqu_goal[1] = Number(document.getElementById("time_input3").value)
    if (game.autoqu_goal[1] === NaN) game.autoqu_goal[1] = 0
    if (game.autoqu_goal[1] < 0) game.autoqu_goal[1] = 0

    game.autoqu_goal[2] = Number(document.getElementById("step_input").value)
    if (game.autoqu_goal[2] === NaN) game.autoqu_goal[2] = 1.01
    if (game.autoqu_goal[2] <= 1) game.autoqu_goal[2] = 1.01

    let highest_level = game.reboot_highest_level
    if (game.highest_level > highest_level) highest_level = game.highest_level
    if (game.level > highest_level) highest_level = game.level

    if (game.autoqu_toggle && game.dk_bought[1]) {
        switch (game.autoqu_mode) {
            case 0:
                if (
                    Math.floor(1000000 ** ((highest_level - 65536) / 32768)) >=
                    game.autoqu_goal[0]
                ) {
                    quantize()
                }
                break
            case 1:
                if (game.reboot_time >= game.autoqu_goal[1] * game.tickspeed) {
                    quantize()
                }
                break
            case 2:
                if (game.prev_photons === 0) {
                    if (
                        Math.floor(
                            1000000 ** ((highest_level - 65536) / 32768)
                        ) >= game.autoqu_goal[2]
                    ) {
                        quantize()
                    }
                } else {
                    if (
                        Math.floor(
                            1000000 ** ((highest_level - 65536) / 32768)
                        ) >=
                        game.prev_photons * game.autoqu_goal[2]
                    ) {
                        quantize()
                    }
                }
                break
        }
    }

    //dark matter shadow animation
    let shadow_constant = 0.1 * Math.sin((game.all_time * 2) / game.tickspeed)
    document.documentElement.style.setProperty(
        "--shadow_size1",
        0.2 + shadow_constant + "em"
    )
    document.documentElement.style.setProperty(
        "--shadow_size2",
        0.3 + shadow_constant + "em"
    )
    document.documentElement.style.setProperty(
        "--shadow_size3",
        0.4 + shadow_constant + "em"
    )
    document.documentElement.style.setProperty(
        "--shadow_size4",
        0.6 + shadow_constant + "em"
    )
    document.documentElement.style.setProperty(
        "--shadow_size5",
        0.8 + shadow_constant + "em"
    )

    //dark matter handling
    if (game.qu_bought[7]) {
        game.growth_time += 30 / delta_time

        if (game.growth_time >= game.growth_interval) {
            game.growth_time -= game.growth_interval
            let penalty = 1
            if (
                game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 1 ||
                game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 0
            )
                penalty =
                    0.25 **
                    (game.dark_matter.log(1.7976931348622053 * 10 ** 308) - 1)
            let growth =
                (game.growth_factor * 12 ** game.om_completions) **
                (0.7 ** game.omega_level * penalty)
            if (game.om_bought[2]) {
                growth =
                    (game.growth_factor *
                        1.15 ** game.highest_omega_level *
                        12 ** game.om_completions) **
                    (0.7 ** game.omega_level * penalty)

                if (game.om_bought[5])
                    growth =
                        (game.growth_factor *
                            1.15 ** game.highest_omega_level *
                            12 ** game.om_completions) **
                        (0.8 ** game.omega_level * penalty)
            }
            if (
                game.dark_matter
                    .mul(growth)
                    .cmp(1.7976931348622053 * 10 ** 308) === -1
            ) {
                game.dark_matter = game.dark_matter.mul(growth)
            } else {
                if (!game.om_bought[6]) {
                    game.dark_matter = new Decimal(
                        1.7976931348622053 * 10 ** 308
                    )
                } else {
                    game.dark_matter = game.dark_matter.mul(growth)
                }

                if (!game.achievements[144]) get_achievement(144)
                if (
                    !game.achievements[154] &&
                    game.reboot_time <= game.tickspeed * 60
                )
                    get_achievement(154)
                if (
                    !game.achievements[155] &&
                    (game.dark_matter.cmp(new Decimal(10).pow(2000)) === 1 ||
                        game.dark_matter.cmp(new Decimal(10).pow(2000)) === 0)
                )
                    get_achievement(155)
            }
            game.dark_matter_boost =
                (game.dark_matter.ln() + 1) ** (5 * game.om_boost[2])
        }
    }

    //collapse automation
    if (game.om_bought[0] && game.autocl_toggle) {
        collapse()
    }

    //quantum upgrade automation
    if (game.om_bought[3] || game.om_bought[4]) {
        if (
            game.om_bought[3] &&
            game.autogr_toggle &&
            game.om_bought[4] &&
            game.autops_toggle
        ) {
            if (
                game.growth_price[1] < Math.round(5 * 2.8 ** game.prism_level)
            ) {
                upgrade_growth()
            } else {
                upgrade_prism()
            }
        } else if (game.om_bought[4] && game.autops_toggle) {
            upgrade_prism()
        } else if (game.om_bought[3] && game.autogr_toggle) {
            upgrade_growth()
        }
    }

    //challenge 6 handling
    game.banked_prestige = game.true_banked_prestige
    if (game.challenge === 6) {
        game.banked_prestige = 0

        if (game.completions[5] === 0) {
            if (game.prestige > 6) {
                exit_challenge()
                alert(
                    "You have exceeded 6 Prestiges, you will now exit Challenge VI."
                )
            }
        } else if (game.completions[5] === 1) {
            if (game.prestige > 5) {
                exit_challenge()
                alert(
                    "You have exceeded 5 Prestiges, you will now exit Challenge VI."
                )
            }
        } else if (game.completions[5] >= 2 && game.completions[5] <= 3) {
            if (game.prestige > 4) {
                exit_challenge()
                alert(
                    "You have exceeded 4 Prestiges, you will now exit Challenge VI."
                )
            }
        } else if (game.completions[5] >= 4 && game.completions[5] <= 5) {
            if (game.prestige > 3) {
                exit_challenge()
                alert(
                    "You have exceeded 3 Prestiges, you will now exit Challenge VI."
                )
            }
        } else if (game.completions[5] >= 6 && game.completions[5] <= 7) {
            if (game.prestige > 2) {
                exit_challenge()
                alert(
                    "You have exceeded 2 Prestiges, you will now exit Challenge VI."
                )
            }
        } else if (game.completions[5] >= 8 && game.completions[5] <= 11) {
            if (game.prestige > 1) {
                exit_challenge()
                alert(
                    "You have exceeded 1 Prestige, you will now exit Challenge VI."
                )
            }
        } else if (game.completions[5] >= 12) {
            if (game.dk_bought[3]) {
                if (game.prestige > 0) {
                    exit_challenge()
                    alert(
                        "You have exceeded 0 Prestiges, you will now exit Challenge VI."
                    )
                }
            } else {
                if (game.prestige > 1) {
                    exit_challenge()
                    alert(
                        "You have exceeded 1 Prestige, you will now exit Challenge VI."
                    )
                }
            }
        }
    }

    //update achievements tab
    if (game.tab === 6) {
        achievements_update()
    }

    let ach_completed = 0
    for (i = 0; i < achievement.achievements.length; i++) {
        if (game.achievements[i] && i !== 69) ach_completed += 1
    }

    if (game.perks[0]) {
        game.ach_power = 1 + ach_completed * 0.05

        if (game.perks[19]) game.ach_power = 1.05 ** ach_completed
    }

    if (ach_completed >= achievement.achievements.length - 1) {
        if (!game.achievements[69]) {
            get_achievement(69)
            increment(1)
        }
    } else {
        game.achievements[69] = false
    }

    //speed power
    if (game.perks[16]) {
        if (game.fastest_reboot > 600 * game.tickspeed) {
            game.speed_power = 1
        } else {
            game.speed_power =
                Math.log(game.fastest_reboot / (600 * game.tickspeed)) /
                    Math.log(0.75) +
                1
        }
    }

    //depth power
    if (game.pp_bought[30] && game.challenge !== 7) {
        game.depth_power = 1 + game.highest_level / 400
    } else {
        game.depth_power = 1
    }

    //prestige power
    if (game.pp_bought[27] && game.challenge !== 7) {
        game.prestige_power =
            1 + ((game.prestige + game.banked_prestige) / 1000) ** (1 / 2)
    } else {
        game.depth_power = 1
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
    for (let i = 0; i < 2; i++) {
        if (
            game.autorb_goal[i] === 34 ||
            game.autorb_goal[i] === 69 ||
            game.autorb_goal[i] === 420 ||
            game.autorb_goal[i] === 666 ||
            game.autorb_goal[i] === 727 ||
            game.autorb_goal[i] === 1337 ||
            game.autorb_goal[i] === 9001 ||
            game.autorb_goal[i] === 42069 ||
            game.autorb_goal[i] === 69420
        ) {
            if (!game.achievements[65]) get_achievement(65)
        }
    }
    for (let i = 0; i < 2; i++) {
        if (
            game.autoqu_goal[i] === 34 ||
            game.autoqu_goal[i] === 69 ||
            game.autoqu_goal[i] === 420 ||
            game.autoqu_goal[i] === 666 ||
            game.autoqu_goal[i] === 727 ||
            game.autoqu_goal[i] === 1337 ||
            game.autoqu_goal[i] === 9001 ||
            game.autoqu_goal[i] === 42069 ||
            game.autoqu_goal[i] === 69420
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
    if (
        game.autorb_push === 34 ||
        game.autorb_push === 69 ||
        game.autorb_push === 420 ||
        game.autorb_push === 666 ||
        game.autorb_push === 727 ||
        game.autorb_push === 1337 ||
        game.autorb_push === 9001 ||
        game.autorb_push === 42069 ||
        game.autorb_push === 69420
    ) {
        if (!game.achievements[65]) get_achievement(65)
    }
    if (
        game.smartpr_peak === 34 ||
        game.smartpr_peak === 69 ||
        game.smartpr_peak === 420 ||
        game.smartpr_peak === 666 ||
        game.smartpr_peak === 727 ||
        game.smartpr_peak === 1337 ||
        game.smartpr_peak === 9001 ||
        game.smartpr_peak === 42069 ||
        game.smartpr_peak === 69420
    ) {
        if (!game.achievements[65]) get_achievement(65)
    }
    if (
        game.smartpr_pp === 34 ||
        game.smartpr_pp === 69 ||
        game.smartpr_pp === 420 ||
        game.smartpr_pp === 666 ||
        game.smartpr_pp === 727 ||
        game.smartpr_pp === 1337 ||
        game.smartpr_pp === 9001 ||
        game.smartpr_pp === 42069 ||
        game.smartpr_pp === 69420
    ) {
        if (!game.achievements[65]) get_achievement(65)
    }
    if (
        game.smartpr_amp === 34 ||
        game.smartpr_amp === 69 ||
        game.smartpr_amp === 420 ||
        game.smartpr_amp === 666 ||
        game.smartpr_amp === 727 ||
        game.smartpr_amp === 1337 ||
        game.smartpr_amp === 9001 ||
        game.smartpr_amp === 42069 ||
        game.smartpr_amp === 69420
    ) {
        if (!game.achievements[65]) get_achievement(65)
    }
    if (
        !game.achievements[65] &&
        (game.autods_goal === 34 || game.autods_goal === 69)
    ) {
        get_achievement(65)
    }
    if (
        !game.achievements[65] &&
        (game.custom_hue === 34 || game.custom_hue === 69)
    ) {
        get_achievement(65)
    }
    if (
        !game.achievements[65] &&
        (game.autohy_portion === 0.34 || game.autohy_portion === 0.69)
    ) {
        get_achievement(65)
    }
    if (
        !game.achievements[65] &&
        (game.autohy_importance === 0.34 ||
            game.autohy_importance === 0.69 ||
            game.autohy_importance === 34 ||
            game.autohy_importance === 69)
    ) {
        get_achievement(65)
    }

    //what a madman
    for (let i = 0; i < 6; i++) {
        if (game.autoup_toggle[i]) game.no_automation = false
    }
    if (game.autopr_toggle) game.no_automation = false
    if (game.smartpr_toggle) game.no_automation = false
    if (game.autooc_toggle && !game.perks[20]) game.no_automation = false
    if (game.autods_toggle >= 1) game.no_automation = false
    if (game.autopp_toggle) game.no_automation = false
    if (game.autocp_toggle) game.no_automation = false
    if (game.autorb_toggle) game.no_automation = false

    //as we can see you can't
    if (game.notation !== 8) game.blind = false

    //notification age handling
    for (const notif of notify.queue) {
        notif.age += 30 / delta_time
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
    if (game.tab === 7) {
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
        game.mouse_time += 30 / delta_time
        if (game.mouse_time >= game.tickspeed / 2) hold_tick()
    }

    //???
    if (game.notation === 8) {
        document.getElementById("version").innerHTML =
            "<br><br><br>EXP Simulator v?.?.???<br>Made by ???<br><br>Last updated ???"
    } else {
        document.getElementById("version").innerHTML =
            "<br><br><br>EXP Simulator v2.3.206<br>Made by Zakuro<br><br>Last updated April 2, 2023"
    }
}

//hold exp key handling
function hold_tick() {
    game.hold_time += 30 / delta_time
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
document.getElementById("click").addEventListener("touchstart", function () {
    game.mouse_held = true
})
document.addEventListener("touchend", function () {
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

    if (event.code === "ArrowLeft") {
        if (game.tab > 1) game.tab -= 1
        if (game.tab == 4 && total_completions < 108 && game.quantum == 0)
            game.tab = 3
        if (
            game.tab == 3 &&
            !game.pp_bought[39] &&
            total_completions < 108 &&
            game.quantum == 0
        )
            game.tab = 2
        if (
            game.tab == 2 &&
            game.prestige == 0 &&
            !game.pp_bought[39] &&
            total_completions < 108 &&
            game.quantum == 0
        )
            game.tab = 1
        goto_tab(game.tab)
    } else if (event.code === "ArrowRight") {
        if (
            game.tab < 8 &&
            (game.level >= 1000000 ||
                game.highest_level >= 1000000 ||
                game.reboot_highest_level >= 1000000 ||
                game.all_time_highest_level >= 1000000)
        )
            game.tab += 1
        else if (game.tab < 7) game.tab += 1
        if (
            game.tab == 2 &&
            game.prestige == 0 &&
            !game.pp_bought[39] &&
            total_completions < 108 &&
            game.quantum == 0
        )
            game.tab = 3
        if (
            game.tab == 3 &&
            !game.pp_bought[39] &&
            total_completions < 108 &&
            game.quantum == 0
        )
            game.tab = 4
        if (game.tab == 4 && total_completions < 108 && game.quantum == 0)
            game.tab = 5
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
document.getElementById("slot8").addEventListener("click", function () {
    if (!game.achievements[64] && game.achiev_page === 15) {
        get_achievement(64)
    }
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
    game.beta = false
    game.version = "2.3.205"
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

    //beta reject check
    if (savegame.beta) {
        alert("Beta saves cannot be imported into the live game")
        return
    }

    //version compatibility checks

    //v2.0.000, v2.0.100, v2.0.200
    if (savegame.version == "2.0.200" || savegame.version == undefined) {
        alert(
            "Your save has been wiped, very sorry!\nv2.0.xxx saves are not compatible with the current version"
        )
        regenerate_ui()
        return
    }
    const [edition, major, minor] = savegame.version
        .split(".")
        .map(val => parseInt(val))
    if (major >= 4) {
        alert(
            "You cannot load saves from game versions that do not exist\nIf you think you are recieving this alert in error, reload and try again"
        )
        return
    }
    if (major < 2) {
        if (minor < 100 && savegame.highest_level >= 300) {
            alert(
                "Your save has been wiped, very sorry!\nThere were balancing issues past LVL 300 that have now been fixed, making this wipe necessary"
            )
            regenerate_ui()
            return
        }

        game = savegame
        //v2.1.000
        if (minor < 3) {
            game.pp_hide = false
        }
        //v2.1.003
        if (minor < 100) {
            game.amp_eff = 0
            game.autopr_mode = 0
            game.exp_oc = 1
            game.oc_state = 0
            game.oc_time = game.tickspeed * 180
        }
        //v2.1.100
        if (minor < 102) {
            game.autopr_goal = [60, 1, 1, 0]
        }
        //v2.1.102
        if (minor < 200) {
            game.exp_flux = 1
            game.pp_power = 1
            game.fluct_tier = 0
            game.flux_level = 75
            game.pr_min = 60 + game.jumpstart * 10
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
            game.autods_toggle = 0
            game.autods_goal = 30
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
        //v2.1.403
        if (minor < 405) {
            game.hold_time = 0
            game.mouse_time = 0
            game.mouse_held = false
        }
        //v2.1.405
        game.version = "2.3.205"
        if (game.tab > 2) game.tab += 2
        if (game.tab > 3) game.tab += 1
        game.reboot = 0
        game.watts = 0
        game.watt_boost = 1
        game.prestige_exp = game.all_time_exp
        game.prestige_clicks = game.total_clicks
        game.prestige_time = game.all_time
        game.all_time_highest_level = 1
        game.fastest_reboot = 10 ** 21
        game.perks = new Array(28).fill(false)
        game.hold_time = 0
        game.generator_kit = 0
        game.flux_increase = 1
        game.autopp_toggle = false
        game.autopp_mode = 0
        game.priority = new Array(39).fill(1)
        game.achievements = new Array(169).fill(false)
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
        if (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) {
            game.hold_notify = true
            game.halfway_notify = true
        } else {
            if (game.level < 5) game.hold_notify = false
            if (game.level < 30) game.halfway_notify = false
        }
        game.autocp_toggle = false
        game.smartds_oc = false
        game.smartpr_toggle = false
        game.smartpr_time = 0
        game.smartpr_peak = 60
        game.smartpr_pp = 120
        game.smartpr_mode = 0
        game.smartpr_amp = 0
        game.smartpr_start = 0
        game.autorb_toggle = false
        game.autorb_goal = [1, 0.8]
        game.autorb_pending = false
        game.cancer_reboots = 0
        game.beta = false
        game.speed_power = 1
        game.banked_prestige = 0
        game.true_banked_prestige = 0
        game.subtab = new Array(4).fill(0)
        game.challenge = 0
        game.completions = new Array(9).fill(0)
        game.ch_boost = new Array(9).fill(1)
        game.challenge_confirmation = true
        game.hints = false
        game.refresh_rate = 30
        game.amp_eff = new Array(5).fill(-1)
        game.watts_eff = new Array(5).fill(-1)
        game.hydrogen = 0
        game.helium = 0
        game.helium_boost = 1
        game.hps = 0
        game.core_level = new Array(8).fill(0)
        game.core_price = [1, 3, 10, 36, 136, 528, 2080, 8256]
        game.buy_max = false
        game.supply_level = 0
        game.supply_price = 16
        game.true_banked_prestige = game.banked_prestige
        game.priority_layer = 1
        game.switchpoint = 0
        game.quantum = 0
        game.photons = 0
        game.prism_level = 0
        game.prism_boost = 1
        game.reboot_exp = game.all_time_exp
        game.reboot_time = game.all_time
        game.fastest_quantize = 10 ** 21
        game.reboot_highest_level = game.all_time_highest_level
        game.reboot_clicks = game.total_clicks
        game.quantum_confirmation = true
        game.qu_bought = new Array(8).fill(false)
        game.prev_completions = 0
        game.autorb_mode = 0
        game.autohy_toggle = false
        game.autohy_portion = 0.5
        game.autohy_importance = 1
        game.budget = 0
        game.superspeed_power = 1
        game.dark_matter = new Decimal(1)
        game.dark_matter_boost = 1
        game.growth_interval = 60
        game.growth_factor = 1
        game.growth_time = 0
        game.growth_price = [10 ** 15, 10 ** 13]
        game.dk_bought = new Array(8).fill(false)
        game.infusion = 1
        game.ch_helium_boost = new Array(9).fill(1)
        game.autorb_push = 60
        game.autoqu_toggle = false
        game.autoqu_mode = 0
        game.autoqu_goal = [1, 60]
        game.omega_base = 10
        game.omega_level = 0
        game.highest_omega_level = 0
        game.omega_points = 0
        game.om_bought = new Array(8).fill(false)
        game.om_assigned = [0, 0, 0]
        game.om_boost = [1, 1, 1]
        game.omega_challenge = false
        game.om_completions = 0
        game.autocl_toggle = false
        game.autogr_toggle = false
        game.autops_toggle = false
        game.prev_photons = 0
        game.perks_hide = false
        game.amp_amount = new Array(5).fill(-1)
        game.amp_time = new Array(5).fill(-1)
        game.watts_amount = new Array(5).fill(-1)
        game.watts_time = new Array(5).fill(-1)
        game.work = true
        game.work_unlocked = false
    } else if (major < 3) {
        game = savegame
        //v2.2.000
        if (minor < 100) {
            let old_perks = game.perks
            game.perks = new Array(28).fill(false)
            for (let i = 0; i <= 7; i++) {
                game.perks[i] = old_perks[i]
            }
            let old_achievements = game.achievements
            game.achievements = new Array(169).fill(false)
            for (let i = 0; i <= 69; i++) {
                game.achievements[i] = old_achievements[i]
            }
            game.autocp_toggle = false
            game.smartds_oc = false
            game.smartpr_toggle = false
            game.smartpr_time = 0
            game.smartpr_peak = 60
            game.smartpr_pp = 120
            game.smartpr_mode = 0
            game.smartpr_amp = 0
            game.smartpr_start = 0
            game.autorb_toggle = false
            game.autorb_goal = [1, 0.8]
            game.autorb_pending = false
            game.cancer_reboots = 0
        }
        //v2.2.100
        if (minor < 102) {
            game.beta = false
        }
        //v2.2.102, v2.2.200
        if (minor < 200) {
            let old_perks = game.perks
            game.perks = new Array(28).fill(false)
            for (let i = 0; i <= 15; i++) {
                game.perks[i] = old_perks[i]
            }
            let old_achievements = game.achievements
            game.achievements = new Array(169).fill(false)
            for (let i = 0; i <= 76; i++) {
                game.achievements[i] = old_achievements[i]
            }
            game.speed_power = 1
            game.banked_prestige = 0
            game.subtab = new Array(4).fill(0)
            game.challenge = 0
            game.completions = new Array(9).fill(0)
            game.ch_boost = new Array(9).fill(1)
            game.challenge_confirmation = true
            game.hints = false
            game.refresh_rate = 30
        }
        //v2.2.201
        if (minor < 300) {
            let old_perks = game.perks
            game.perks = new Array(28).fill(false)
            for (let i = 0; i <= 22; i++) {
                game.perks[i] = old_perks[i]
            }
            let old_achievements = game.achievements
            game.achievements = new Array(169).fill(false)
            for (let i = 0; i <= 96; i++) {
                game.achievements[i] = old_achievements[i]
            }
            old_completions = game.completions
            old_boost = game.ch_boost
            game.completions = new Array(9).fill(0)
            game.ch_boost = new Array(9).fill(1)
            for (let i = 0; i <= 7; i++) {
                game.completions[i] = old_completions[i]
                game.ch_boost[i] = old_boost[i]
            }
            game.hydrogen = 0
            game.helium = 0
            game.helium_boost = 1
            game.hps = 0
            game.core_level = new Array(8).fill(0)
            game.core_price = [1, 3, 10, 36, 136, 528, 2080, 8256]
            game.buy_max = false
            game.supply_level = 0
            game.supply_price = 16
            game.true_banked_prestige = game.banked_prestige
        }
        //v2.2.300
        if (minor < 301) {
            game.subtab = new Array(3).fill(0)
            game.priority_layer = 1
            game.switchpoint = 0
        }
        //v2.2.301
        game.version = "2.3.205"
        game.amp_eff = new Array(5).fill(-1)
        game.watts_eff = new Array(5).fill(-1)
        game.quantum = 0
        game.photons = 0
        game.prism_level = 0
        game.prism_boost = 1
        game.reboot_exp = game.all_time_exp
        game.reboot_time = game.all_time
        game.fastest_quantize = 10 ** 21
        game.reboot_highest_level = game.all_time_highest_level
        game.reboot_clicks = game.total_clicks
        game.quantum_confirmation = true
        if (game.tab > 3) game.tab += 1
        game.qu_bought = new Array(8).fill(false)
        game.prev_completions = 0
        game.autorb_mode = 0
        game.autohy_toggle = false
        game.autohy_portion = 0.5
        game.autohy_importance = 1
        game.budget = 0
        game.superspeed_power = 1
        let old_achievements = game.achievements
        game.achievements = new Array(169).fill(false)
        for (let i = 0; i <= 119; i++) {
            game.achievements[i] = old_achievements[i]
        }
        let reboot_watts = game.autorb_goal
        game.autorb_goal = [reboot_watts, 0.8]
        let old_subtab = game.subtab
        game.subtab = new Array(4).fill(0)
        game.subtab[0] = old_subtab[0]
        game.subtab[1] = old_subtab[1]
        game.dark_matter = new Decimal(1)
        game.dark_matter_boost = 1
        game.growth_interval = 60
        game.growth_factor = 1
        game.growth_time = 0
        game.growth_price = [10 ** 15, 10 ** 13]
        game.dk_bought = new Array(8).fill(false)
        game.infusion = 1
        game.ch_helium_boost = new Array(9).fill(1)
        game.autorb_push = 60
        game.autoqu_toggle = false
        game.autoqu_mode = 0
        game.autoqu_goal = [1, 60]
        game.omega_base = 10
        game.omega_level = 0
        game.highest_omega_level = 0
        game.omega_points = 0
        game.om_bought = new Array(8).fill(false)
        game.om_assigned = [0, 0, 0]
        game.om_boost = [1, 1, 1]
        game.omega_challenge = false
        game.om_completions = 0
        game.autocl_toggle = false
        game.autogr_toggle = false
        game.autops_toggle = false
        game.prev_photons = 0
        game.perks_hide = false
        game.amp_amount = new Array(5).fill(-1)
        game.amp_time = new Array(5).fill(-1)
        game.watts_amount = new Array(5).fill(-1)
        game.watts_time = new Array(5).fill(-1)
        game.work = true
        game.work_unlocked = false
    } else {
        if (minor > 205) {
            alert(
                "You cannot load saves from game versions that do not exist\nIf you think you are recieving this alert in error, reload and try again"
            )
            return
        }
        game = savegame
        if (game.dark_matter !== undefined)
            game.dark_matter = new Decimal(game.dark_matter)
        else game.dark_matter = new Decimal(1)
        //v2.3.002
        if (minor < 100) {
            let old_subtab = game.subtab
            game.subtab = new Array(4).fill(0)
            game.subtab[0] = old_subtab[0]
            game.subtab[1] = old_subtab[1]
            game.dark_matter = new Decimal(game.dark_matter)
            game.dark_matter_boost = 1
            game.growth_interval = 60
            game.growth_factor = 1
            game.growth_time = 0
            game.growth_price = [10 ** 15, 10 ** 13]
            game.dk_bought = new Array(8).fill(false)
            game.infusion = 1
            game.ch_helium_boost = new Array(9).fill(1)
            game.autorb_push = 60
            game.autoqu_toggle = false
            game.autoqu_mode = 0
            game.autoqu_goal = [1, 60]
            let old_achievements = game.achievements
            game.achievements = new Array(169).fill(false)
            for (let i = 0; i <= 136; i++) {
                game.achievements[i] = old_achievements[i]
            }
        }
        //v2.3.100
        if (minor < 103) {
            game.omega_base = 10
        }
        //v2.3.103
        if (minor < 200) {
            game.dark_matter = new Decimal(game.dark_matter)
            game.omega_level = 0
            game.highest_omega_level = 0
            game.omega_points = 0
            game.om_bought = new Array(8).fill(false)
            game.om_assigned = [0, 0, 0]
            game.om_boost = [1, 1, 1]
            game.omega_challenge = false
            game.om_completions = 0
            game.autocl_toggle = false
            game.autogr_toggle = false
            game.autops_toggle = false
            game.prev_photons = 0
            game.perks_hide = false
        }
        //v2.3.200
        if (minor < 201) {
            game.amp_amount = new Array(5).fill(-1)
            game.amp_time = new Array(5).fill(-1)
            game.watts_amount = new Array(5).fill(-1)
            game.watts_time = new Array(5).fill(-1)
            let old_subtab = game.subtab
            game.subtab = new Array(4).fill(0)
            game.subtab[0] = old_subtab[0]
            game.subtab[1] = old_subtab[1]
            game.subtab[2] = old_subtab[2]
        }
        //v2.3.201
        if (minor < 205) {
            game.work = true
            game.work_unlocked = false
        }
        //v2.3.205
        game.version = "2.3.205"
    }
    if (game.om_boost[2] === 0) game.om_boost[2] === 1
    if (game.question) {
        game.question = false
        game.notation = 1
        document.getElementById("notation_button").innerHTML = "STANDARD"
    }

    if (new Date().getDate() === 1 && new Date().getMonth() === 3)
        game.work_unlocked = true
    if (game.work_unlocked && game.work) meme = true

    if (meme) {
        document.getElementById("main_css").rel = "stylesheet alternate"
        document.getElementById("meme_css").rel = "stylesheet"

        document.getElementById("changelog").href = "meme_changelog.html"
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
        game.subtab = new Array(4).fill(0)

        game.challenge = 0
        game.completions = new Array(9).fill(0)
        game.ch_boost = new Array(9).fill(1)
        game.ch_helium_boost = new Array(9).fill(1)

        game.hydrogen = 0
        game.helium = 0
        game.helium_boost = 1
        game.hps = 0
        game.core_level = new Array(8).fill(0)
        game.core_price = [1, 3, 10, 36, 136, 528, 2080, 8256]
        game.buy_max = false
        game.supply_level = 0
        game.supply_price = 16

        game.prestige_exp = game.all_time_exp
        game.prestige_clicks = game.total_clicks
        game.prestige_time = game.all_time
        game.all_time_highest_level = 1
        game.fastest_reboot = 10 ** 21

        game.quantum = 0
        game.photons = 0
        game.prism_level = 0
        game.prism_boost = 1
        game.qu_bought = new Array(8).fill(false)

        game.prev_completions = 0
        game.superspeed_power = 1

        game.dark_matter = new Decimal(1)
        game.dark_matter_boost = 1
        game.growth_interval = 60
        game.growth_factor = 1
        game.growth_time = 0
        game.growth_price = [10 ** 15, 10 ** 13]
        game.dk_bought = new Array(8).fill(false)

        game.infusion = 1

        game.reboot_exp = 0
        game.reboot_time = 0
        game.fastest_quantize = 10 ** 21
        game.reboot_highest_level = 1
        game.reboot_clicks = 0

        game.hold_time = 0
        game.generator_kit = 0
        game.flux_increase = 1
        game.priority = new Array(39).fill(1)
        game.priority_layer = 1

        game.achievements = new Array(137).fill(false)
        game.ach_power = 1
        game.achiev_page = 0
        game.no_automation = true
        game.blind = true
        game.afk_time = 0

        game.speed_power = 1
        game.banked_prestige = 0
        game.true_banked_prestige = 0

        game.autopr_toggle = false
        game.autopr_goal = [60, 1, 1, 0]
        game.autopr_mode = 0
        autopr_switch(game.autopr_mode)
        game.autooc_toggle = false
        game.autods_toggle = 0
        game.autods_goal = 30
        game.autopp_toggle = false
        game.autopp_mode = 0
        game.autorb_toggle = false
        game.autorb_goal = [1, 0.8]
        game.autorb_pending = false
        game.autorb_mode = 0
        game.autohy_toggle = false
        game.autohy_portion = 0.5
        game.autohy_importance = 1
        game.budget = 0
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

        game.amp_amount = new Array(5).fill(-1)
        game.amp_time = new Array(5).fill(-1)
        game.watts_amount = new Array(5).fill(-1)
        game.watts_time = new Array(5).fill(-1)

        set_capacitance(0)
        document.getElementById("click").innerHTML =
            "+" + format_num(1) + " EXP"

        document.getElementById("amp_up").style.display = "none"
        document.getElementById("pp_up").style.display = "none"
        document.getElementById("amp_button").style.display = "none"
        document.getElementById("pp_back").style.display = "none"

        document.getElementById("boost_auto").style.display = "none"
        document.getElementById("auto_auto").style.display = "none"
        document.getElementById("fluct").style.display = "none"
        document.getElementById("fluct_button").style.display = "none"
        document.getElementById("fluct_auto").style.display = "none"
        document.getElementById("fact").style.display = "none"
        document.getElementById("fact_button").style.display = "none"
        document.getElementById("fact_auto").style.display = "none"
        document.getElementById("flux").style.display = "none"
        document.getElementById("flux_button").style.display = "none"
        document.getElementById("flux_auto").style.display = "none"
        document.getElementById("battery").style.display = "none"
        document.getElementById("battery_button").style.display = "none"
        document.getElementById("battery_mode").style.display = "none"
        document.getElementById("battery_auto").style.display = "none"

        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("prestige").style.display = "none"
        document.getElementById("prestige_tabs").style.display = "none"
        document.getElementById("reboot").style.display = "none"
        document.getElementById("reboot_tabs").style.display = "none"
        document.getElementById("reactor_tab").style.display = "none"
        document.getElementById("quantum_tabs").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
        document.getElementById("auto_mode").style.display = "none"

        document.getElementById("overclock").style.display = "none"
        document.getElementById("oc_auto").style.display = "none"
        document.getElementById("oc_button").style.display = "none"
        document.getElementById("oc_state").innerHTML = "Recharging"
        document.getElementById("oc_timer").style.display = "block"
        if (!meme)
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
        this.changeButton.innerHTML = "CHANGE"
        this.changeButton.classList.add("option_button")
        this.changeButton.addEventListener("click", () => {
            if (recorded_hotkey) recorded_hotkey = null
            else recorded_hotkey = this
            this.changeButton.innerHTML =
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
new configurable_hotkey(
    "Prestige",
    "KeyP",
    prestige,
    () => game.prestige > 0 || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey(
    "Toggle auto-Prestige",
    "Shift+KeyP",
    pr_toggle,
    () => game.pp_bought[3] || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey("Reboot", "KeyR", reboot, () => !game.confirmation)
new configurable_hotkey(
    "Toggle auto-Reboot",
    "Shift+KeyR",
    rb_toggle,
    () => game.perks[15]
)
new configurable_hotkey("Quantize", "KeyQ", quantize, () => game.quantum >= 1)
new configurable_hotkey(
    "Activate Overclocker",
    "KeyO",
    oc_activate,
    () => game.pp_bought[14] || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey(
    "Toggle auto-Overclock",
    "Shift+KeyO",
    oc_toggle,
    () => game.pp_bought[16] || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey(
    "Discharge Capacitor",
    "KeyD",
    discharge,
    () => game.pp_bought[32] || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey(
    "Toggle auto-Discharge",
    "Shift+KeyD",
    ds_toggle,
    () => game.pp_bought[35] || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey(
    "Toggle all automation",
    "KeyA",
    toggle_all_automation,
    () => game.pp_bought[2] || game.reboot > 0 || game.quantum > 0
)
new configurable_hotkey(
    "Exit Challenge",
    "KeyE",
    exit_challenge,
    () => game.perks[17]
)
new configurable_hotkey("Buy all upgrades (on upgrades tab)", "KeyM", ev => {
    if (game.tab === 1) {
        for (let i = 0; i < 6; i++) {
            upgrade(i, true)
        }
    }
})

//setting up the tick loop
function tick_loop() {
    let start_time = Date.now()
    let delta_ms = undefined
    let delta_ticks = 1
    if (delta_time === undefined) {
        delta_time = game.tickspeed
    } else {
        if (Date.now() < tick_time) tick_time = Date.now()
        if (Date.now() > tick_time + 3600000) tick_time = Date.now() - 3600000

        delta_ms = Date.now() - tick_time
        delta_time = 1000 / delta_ms
        delta_ticks = Math.floor((delta_ms * game.tickspeed) / 1000)
    }

    tick_time = Date.now()

    if (delta_ms >= 333) {
        if (delta_ticks > 60 * game.tickspeed) delta_ticks = 60 * game.tickspeed
        delta_time *= delta_ticks
        while (delta_ticks > 0) {
            tick()
            delta_ticks--
        }
    } else {
        tick()
    }

    let end_time = Date.now()
    let total_time = end_time - start_time
    if (total_time < 0) total_time = 0
    if (total_time < 1000 / game.tickspeed) {
        window.setTimeout(tick_loop, 1000 / game.tickspeed - total_time)
    } else {
        tick_loop()
    }
}

//setting up the visual update loop
function refresh() {
    level_update()
    stats_update()
    description_update()
    upgrade_update()
    color_update()
    reset_button_update()
    click_update()
    pp_update()
    watts_update()
    challenge_update()
    reactor_update()
    prism_update()
    gravity_update()
    omega_update()

    window.setTimeout(refresh, 250 / game.refresh_rate)
}

meme = false
goto_tab(0)

//load the game when opened
load(JSON.parse(localStorage.getItem("exp_simulator_save")))

if (game.work_unlocked) {
    document.getElementById("work").style.display = "flex"
} else {
    document.getElementById("work").style.display = "none"
}

tick_loop()
refresh()

//setting up the autosave loop
let save_loop = window.setInterval(function () {
    save()
    if (document.visibilityState === "visible")
        new notify("Game saved", "#00ddff")
}, 60000)

console.log("*hacker voice* I'm in")
