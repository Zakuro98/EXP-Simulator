let tick_time = Date.now()
let delta_time = undefined

//game operations run every tick
function tick() {
    //calculating total multiplier
    game.global_multiplier = Decimal.mul(game.exp_fact, game.exp_oc)
        .mul(game.exp_flux)
        .mul(game.pp_power)
        .mul(game.prestige_power)
        .mul(game.depth_power)
        .mul(game.ach_power)
        .mul(game.speed_power)
        .mul(game.ch_boost[0])
        .mul(game.ch_boost[1])
        .mul(game.ch_boost[2])
        .mul(game.ch_boost[3])
        .mul(game.ch_boost[4])
        .mul(game.ch_boost[5])
        .mul(game.ch_boost[6])
        .mul(game.ch_boost[7])
        .mul(game.ch_boost[8])
        .mul(game.helium_boost)
        .mul(game.superspeed_power)
        .mul(game.dark_matter_boost)
        .mul(game.infusion)

    if (game.challenge === 7) {
        game.global_multiplier = Decimal.mul(game.ch_boost[0], game.ch_boost[1])
            .mul(game.ch_boost[2])
            .mul(game.ch_boost[3])
            .mul(game.ch_boost[4])
            .mul(game.ch_boost[5])
            .mul(game.ch_boost[6])
            .mul(game.ch_boost[7])
            .mul(game.ch_boost[8])
            .mul(game.helium_boost)
    }

    //challenge 5, 6 and 9
    if (game.challenge === 5) {
        if (game.prestige_time >= 30 * game.tickspeed) {
            reduction = new Decimal(0)
        } else {
            reduction = new Decimal(
                (1 - game.prestige_time / (30 * game.tickspeed)) ** 4
            )
        }
    } else {
        reduction = new Decimal(1)
    }

    //omega challenge
    if (game.omega_challenge) {
        if (game.challenge !== 7) {
            reduction = reduction.div(
                game.global_multiplier
                    .mul(game.exp_add + game.exp_fluct / 2)
                    .mul(game.exp_battery)
                    .pow(0.5)
            )
        } else {
            reduction = reduction.div(
                game.global_multiplier.mul(game.exp_add).pow(0.5)
            )
        }
    }

    game.global_multiplier = game.global_multiplier.mul(reduction)

    //autoclicker operation
    if (game.cps > 0) {
        game.click_time += game.cps / delta_time
        if (game.click_time >= 1) {
            if (game.challenge !== 7) {
                if (game.battery_mode === 1 || game.perks[8])
                    increment(
                        game.global_multiplier
                            .mul(game.exp_add + fluct_increment(game.exp_fluct))
                            .mul(Math.floor(game.click_time))
                            .mul(game.exp_battery)
                            .mul(game.cap_boost)
                            .round()
                    )
                else
                    increment(
                        game.global_multiplier
                            .mul(game.exp_add + fluct_increment(game.exp_fluct))
                            .mul(Math.floor(game.click_time))
                            .mul(game.cap_boost)
                            .round()
                    )
            } else {
                increment(
                    game.global_multiplier
                        .mul(game.exp_add)
                        .mul(Math.floor(game.click_time))
                        .round()
                )
            }
            game.click_time -= Math.floor(game.click_time)
        }
    }

    //amp conversion
    if (game.perks[27] && game.challenge !== 6 && game.challenge !== 9) {
        if (game.challenge === 4) {
            if (game.level >= game.highest_level) {
                if (game.amp < get_amp(game.level) * game.watt_boost) {
                    if (!game.perks[28])
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
                }

                if (game.amp > get_amp(game.level) * game.watt_boost)
                    game.amp = get_amp(game.level) * game.watt_boost

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
                if (!game.perks[28])
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
    if (game.qu_bought[2] && game.challenge !== 0) {
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
        if (!game.achievements[66] && roll < 1 / 77777) {
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
            if (game.exp_flux >= 100 && !game.qu_bought[1])
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
                    if (game.challenge !== 4) {
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
                    if (game.challenge === 4)
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

    //expert prestige automation
    if (game.perks[14]) {
        if (
            game.smartpr_mode === 0 &&
            document.getElementById("smart_panel").children.length >= 1
        ) {
            for (const p of game.smartpr_queue) {
                let block =
                    document.getElementById("smart_panel").children[p.id]
                let setup = block.querySelectorAll("div")[1]
                let goal = setup.querySelectorAll("div")[1]
                let goal_input = goal.querySelector("input")
                let until = setup.querySelectorAll("div")[2]
                let until_input = until.querySelector("input")

                if (p.mode <= 3) {
                    if (
                        goal_input.value === "" ||
                        goal_input.value === undefined
                    ) {
                        p.update = false
                    } else {
                        p.update = true
                        p.goal = Number(goal_input.value)
                    }
                }

                if (p.until <= 4) {
                    p.condition = Number(until_input.value)
                }
            }
        }

        if (
            game.smartpr_mode === 1 &&
            game.smartpr_phase < game.smartpr_queue.length
        ) {
            switch (game.smartpr_queue[game.smartpr_phase].until) {
                case 0:
                    game.smartpr_condition = game.highest_level
                    break
                case 1:
                    game.smartpr_condition = game.amp
                    break
                case 2:
                    game.smartpr_condition = game.total_pp
                    break
                case 3:
                    game.smartpr_condition += 30 / delta_time
                    break
            }

            let condition_true = false
            if (game.smartpr_queue[game.smartpr_phase].until === 5) {
                if (game.oc_state === 2) condition_true = true
            } else if (game.smartpr_queue[game.smartpr_phase].until === 3) {
                if (
                    game.smartpr_condition >=
                    game.smartpr_queue[game.smartpr_phase].condition *
                        game.tickspeed
                )
                    condition_true = true
            } else {
                if (
                    game.smartpr_condition >=
                    game.smartpr_queue[game.smartpr_phase].condition
                )
                    condition_true = true
            }

            if (condition_true) {
                if (game.smartpr_queue[game.smartpr_phase].until !== 4)
                    prestige()
                game.smartpr_phase++
                game.smartpr_condition = 0

                if (
                    game.smartpr_repeat &&
                    game.smartpr_phase >= game.smartpr_queue.length
                )
                    game.smartpr_phase = 0

                if (game.smartpr_phase < game.smartpr_queue.length) {
                    autopr_switch(game.smartpr_queue[game.smartpr_phase].mode)
                    if (game.smartpr_queue[game.smartpr_phase].update) {
                        switch (game.smartpr_queue[game.smartpr_phase].mode) {
                            case 0:
                                document.getElementById("level_input").value =
                                    game.smartpr_queue[game.smartpr_phase].goal
                                break
                            case 1:
                                document.getElementById("amp_input").value =
                                    game.smartpr_queue[game.smartpr_phase].goal
                                break
                            case 2:
                                document.getElementById("pp_input").value =
                                    game.smartpr_queue[game.smartpr_phase].goal
                                break
                            case 3:
                                document.getElementById("time_input").value =
                                    game.smartpr_queue[game.smartpr_phase].goal
                                break
                        }
                    }
                } else {
                    smart_mode(3)
                }
            }
        }

        if (
            (game.smartpr_mode === 1 || game.smartpr_mode === 2) &&
            document.getElementById("smart_panel").children.length >= 1
        ) {
            for (const p of game.smartpr_queue) {
                let block =
                    document.getElementById("smart_panel").children[p.id]
                let index = block.querySelector("div")
                let number = index.querySelector("p")
                let display_block = block.querySelectorAll("div")[5]

                if (game.smartpr_phase === p.id) {
                    number.className = "smart_number current"
                } else {
                    number.className = "smart_number"
                }

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
                if (game.smartpr_phase === p.id) {
                    switch (p.until) {
                        case 0:
                            str +=
                                "<br>Progress: highest LVL " +
                                format_lvl(game.smartpr_condition) +
                                " / " +
                                format_lvl(p.condition)
                            break
                        case 1:
                            str +=
                                "<br>Progress: " +
                                format_num(game.smartpr_condition) +
                                " / " +
                                format_num(p.condition) +
                                " total AMP"
                            break
                        case 2:
                            str +=
                                "<br>Progress: " +
                                format_num(game.smartpr_condition) +
                                " / " +
                                format_num(p.condition) +
                                " total PP"
                            break
                        case 3:
                            str +=
                                "<br>Progress: " +
                                format_time(game.smartpr_condition) +
                                " / " +
                                format_time(p.condition * game.tickspeed)
                            break
                        case 4:
                            if (p.condition === 1)
                                str +=
                                    "<br>Progress: " +
                                    format_num(game.smartpr_condition) +
                                    " / " +
                                    format_num(p.condition) +
                                    " prestige"
                            else
                                str +=
                                    "<br>Progress: " +
                                    format_num(game.smartpr_condition) +
                                    " / " +
                                    format_num(p.condition) +
                                    " prestiges"
                            break
                        case 5:
                            str += "<br>Waiting until overclocker activates"
                            break
                    }
                } else {
                    switch (p.until) {
                        case 0:
                            str +=
                                "<br>Wait until highest LVL " +
                                format_lvl(p.condition)
                            break
                        case 1:
                            str +=
                                "<br>Wait until " +
                                format_num(p.condition) +
                                " total AMP"
                            break
                        case 2:
                            str +=
                                "<br>Wait until " +
                                format_num(p.condition) +
                                " total PP"
                            break
                        case 3:
                            str +=
                                "<br>Wait for " +
                                format_time(p.condition * game.tickspeed)
                            break
                        case 4:
                            if (p.condition === 1)
                                str +=
                                    "<br>Wait until " +
                                    format_num(p.condition) +
                                    " prestige happens"
                            else
                                str +=
                                    "<br>Wait until " +
                                    format_num(p.condition) +
                                    " prestiges happen"
                            break
                        case 5:
                            str += "<br>Wait until overclocker activates"
                            break
                    }
                }
                display_text.innerHTML = str
            }
        }
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
    } else {
        game.patience = 1
    }

    //capacitance handling
    if (
        game.pp_bought[32] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        let eps = game.global_multiplier
            .mul(game.exp_add + game.exp_fluct / 2)
            .mul(game.cps)
        if (game.battery_mode === 1 || game.perks[8])
            eps = eps.mul(game.exp_battery)
        let base_exp =
            "Base EXP Production: " + format_infinity(eps) + " EXP/sec"
        let effective_exp =
            "Effective EXP Production: " +
            format_infinity(eps.mul(game.cap_boost)) +
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
                    format_infinity(
                        eps.mul(
                            (game.stored_exp / game.tickspeed) *
                                game.cap_mode *
                                2
                        )
                    ) +
                    " EXP (" +
                    format_num(game.cap_mode * 2) +
                    "x)"
            else
                if_discharge =
                    "If Discharged: +" +
                    format_infinity(
                        eps.mul(
                            (game.stored_exp / game.tickspeed) *
                                game.cap_mode *
                                4
                        )
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
            game.stored_exp += (1 - game.cap_boost) * (30 / delta_time)
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

                while (cheapest !== undefined) {
                    game.pp -= pp_upgrade.upgrades[cheapest].price
                    game.pp_bought[cheapest] = true
                    pp_upgrade.upgrades[cheapest].on_purchase()
                    document.getElementById("pp").innerHTML =
                        format_num(game.pp) + " PP"

                    cheapest = undefined
                    price = Infinity
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

                while (lowest !== undefined) {
                    game.pp -= pp_upgrade.upgrades[lowest].price
                    game.pp_bought[lowest] = true
                    pp_upgrade.upgrades[lowest].on_purchase()
                    document.getElementById("pp").innerHTML =
                        format_num(game.pp) + " PP"

                    lowest = undefined
                    priority = Infinity
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

                while (
                    lowest2 !== undefined &&
                    game.pp >= pp_upgrade.upgrades[lowest2].price
                ) {
                    game.pp -= pp_upgrade.upgrades[lowest2].price
                    game.pp_bought[lowest2] = true
                    pp_upgrade.upgrades[lowest2].on_purchase()
                    document.getElementById("pp").innerHTML =
                        format_num(game.pp) + " PP"

                    lowest2 = undefined
                    priority2 = Infinity
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
        if (game.autorb_mode === 0) {
            if (
                get_watts(
                    game.pp + get_pp(game.level) - get_pp(game.highest_level)
                ) < 527
            ) {
                if (
                    game.autorb_pending &&
                    (!game.perks[28] || game.challenge === 6) &&
                    game.pp + get_pp(game.level) - get_pp(game.highest_level) >=
                        Math.ceil(20000 * game.autorb_goal[0] + 180000)
                ) {
                    prestige()
                }
            } else {
                if (
                    game.autorb_pending &&
                    (!game.perks[28] || game.challenge === 6) &&
                    game.pp + get_pp(game.level) - get_pp(game.highest_level) >=
                        Math.ceil(
                            20000 * (game.autorb_goal[0] - 526) ** 1.25 +
                                10720000
                        )
                ) {
                    prestige()
                }
            }
        } else if (game.autorb_mode === 1) {
            if (
                game.autorb_pending &&
                (!game.perks[28] || game.challenge === 6) &&
                game.prestige_time >= game.autorb_goal[1] * game.tickspeed &&
                game.pp + get_pp(game.level) - get_pp(game.highest_level) >=
                    200000
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
    if (game.perks[23] && (game.watts >= 98304 || game.dk_bought[5])) {
        game.hps =
            game.core_level[0] *
            (game.core_level[1] + 1) *
            (game.core_level[2] + 1) *
            (game.core_level[3] + 1) *
            (game.core_level[4] + 1) *
            (game.core_level[5] + 1) *
            (game.core_level[6] + 1) *
            (game.core_level[7] + 1)
        if (game.perks[24] && game.watts >= 117965)
            game.hps *= (game.watts * 5) / generator_perk.perks[23].requirement
        if (game.perks[25] && game.helium > 10) {
            if (!game.qu_bought[6]) game.hps *= Math.log10(game.helium)
            else game.hps *= game.helium ** 0.08
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
        if (game.dk_bought[4])
            game.hps *=
                (game.prism_level / 58 + 1) ** Math.log2(game.prism_level + 1)
        if (game.dk_bought[6]) game.hps *= game.dark_matter_boost ** 0.2
        game.hps *= game.om_boost[1]

        if (!game.achievements[107] && game.hps >= 10 ** 30)
            get_achievement(107)
        if (!game.achievements[148] && game.hps >= 10 ** 60)
            get_achievement(148)
        if (!game.achievements[157] && game.hps >= 10 ** 90)
            get_achievement(157)
        if (!game.achievements[173] && game.hps >= 10 ** 120)
            get_achievement(173)

        if (game.challenge !== 8) game.helium += game.hps / delta_time
        game.helium_boost = (game.helium / 256 + 1) ** 1.25
    } else {
        game.hps = 0
    }

    //prism spinning
    prism_angle -= Math.min(300, game.prism_level) ** (2 / 3) / 135

    //reactor automation
    game.autohy_portion = Number(document.getElementById("portion_input").value)
    if (game.autohy_portion === NaN) game.autohy_portion = 0.5
    if (game.autohy_portion < 0) game.autohy_portion = 0
    if (game.autohy_portion > 1) game.autohy_portion = 1

    game.autohy_deuterium = Number(
        document.getElementById("deuterium_input").value
    )
    if (game.autohy_deuterium === NaN) game.autohy_deuterium = 0.5
    if (game.autohy_deuterium < 0) game.autohy_deuterium = 0
    if (game.autohy_deuterium > 1) game.autohy_deuterium = 1

    if (
        game.qu_bought[4] &&
        game.autohy_toggle &&
        (game.watts >= 98304 || game.dk_bought[5])
    ) {
        while (game.budget[8] >= game.supply_price) {
            game.hydrogen -= game.supply_price
            game.budget[8] -= game.supply_price
            game.supply_level++
            if (game.supply_level > 11)
                game.supply_price *= 5 ** (game.supply_level - 10)
            else game.supply_price *= 5
        }
        const scaling_array = [24000, 16000, 8000, 4000, 2000, 1000, 500, 250]
        for (let i = 0; i < 8; i++) {
            let c = core.cores[i]
            let scaling = scaling_array[c.id]

            if (game.core_level[c.id] < scaling) {
                let n = Math.floor(
                    ((game.core_level[c.id] + 3.5) ** 2 +
                        (8 * game.budget[i]) / c.base_price) **
                        0.5 -
                        game.core_level[c.id] -
                        3.5
                )
                if (n >= scaling - game.core_level[c.id])
                    n = scaling - game.core_level[c.id]

                let hydrogen_before = game.hydrogen
                game.hydrogen -=
                    (c.base_price * n ** 2 +
                        n *
                            (2 * c.base_price * game.core_level[c.id] +
                                7 * c.base_price)) /
                    8
                game.budget[i] -= hydrogen_before - game.hydrogen
                if (game.budget[i] < 0) game.budget[i] = 0

                game.core_level[c.id] += n
                game.core_price[c.id] =
                    (c.base_price / 4) * (game.core_level[c.id] + 4)
            }

            if (game.core_level[c.id] >= scaling) {
                let m = game.core_level[c.id] - scaling
                let p = (6 * scaling - 31) / 3
                let q =
                    12 * (game.budget[i] / c.base_price) +
                    (3 * scaling - 15) +
                    m * (3 * scaling - 14) +
                    m ** 2 * 1.5 +
                    m ** 3 / 2
                let n = Math.floor(
                    Math.cbrt(q + Math.sqrt(p ** 3 + q ** 2)) -
                        p / Math.cbrt(q + Math.sqrt(p ** 3 + q ** 2)) -
                        m -
                        1.5
                )

                let a = 3 - 2 * scaling
                let b = scaling ** 2 - scaling + 8
                let u = n - 1
                let hydrogen_before = game.hydrogen
                game.hydrogen -=
                    (c.base_price / 48) *
                    (2 * u ** 3 +
                        3 * u * (1 + a) * (u + 2 * game.core_level[c.id]) +
                        u * (3 * a + 6 * b + 1) +
                        6 *
                            (game.core_level[c.id] * u ** 2 +
                                game.core_level[c.id] ** 2 * u +
                                game.core_level[c.id] ** 2 +
                                a * game.core_level[c.id] +
                                b))
                game.budget[i] -= hydrogen_before - game.hydrogen
                if (game.budget[i] < 0) game.budget[i] = 0

                game.core_level[c.id] += n
                game.core_price[c.id] =
                    (c.base_price / 8) *
                    (game.core_level[c.id] ** 2 + a * game.core_level[c.id] + b)

                if (game.budget[i] >= game.core_price[c.id]) {
                    game.hydrogen -= game.core_price[c.id]
                    game.budget[i] -= game.core_price[c.id]
                    if (game.budget[i] < 0) game.budget[i] = 0
                    game.core_level[c.id]++

                    game.core_price[c.id] =
                        (c.base_price / 8) *
                        (game.core_level[c.id] ** 2 -
                            game.core_level[c.id] * (2 * scaling - 3) +
                            scaling ** 2 -
                            scaling +
                            8)
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

    if (game.autoqu_toggle && game.dk_bought[2]) {
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

        while (game.growth_time >= game.growth_interval) {
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
                (game.growth_factor * game.op_dark_boost) **
                (0.5 ** game.omega_level * penalty)
            if (game.om_bought[2]) {
                growth =
                    (game.growth_factor *
                        1.15 ** game.highest_omega_level *
                        game.op_dark_boost) **
                    (0.5 ** game.omega_level * penalty)

                if (game.om_bought[4])
                    growth =
                        (game.growth_factor *
                            1.15 ** game.highest_omega_level *
                            game.op_dark_boost) **
                        ((2 / 3) ** game.omega_level * penalty)
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
            if (game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 1)
                game.dark_matter_boost =
                    game.dark_matter_boost **
                    (1 +
                        0.01 *
                            (game.dark_matter.ln() / Decimal.pow(2, 1024).ln() -
                                1) **
                                2)
        }
    }

    //collapse automation
    if (game.om_bought[0] && game.autocl_toggle) {
        collapse()
    }

    //quantum upgrade automation
    if (game.om_bought[5] || game.om_bought[3]) {
        if (
            game.om_bought[5] &&
            game.autogr_toggle &&
            game.om_bought[3] &&
            game.autops_toggle
        ) {
            if (game.growth_price[1].cmp(game.prism_price) === -1) {
                upgrade_growth()
            } else {
                upgrade_prism()
            }
        } else if (game.om_bought[3] && game.autops_toggle) {
            upgrade_prism()
        } else if (game.om_bought[5] && game.autogr_toggle) {
            upgrade_growth()
        }
    }

    //challenge 6 handling
    game.banked_prestige = game.true_banked_prestige
    if (game.challenge === 6) {
        game.banked_prestige = 0

        if (game.prestige > 1) {
            exit_challenge()
            if (!game.achievements[65]) get_achievement(65)
            alert(
                "You have Prestiged more than once, you will now exit Challenge VI."
            )
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
            "<br><br><br>EXP Simulator v2.3.302<br>Made by Zakuro<br><br>Last updated August 8, 2024"
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
        if (game.tab < 7) game.tab += 1
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
document.getElementById("slot1").addEventListener("click", function () {
    if (!game.achievements[64] && game.achiev_page === 17) {
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
    game.version = "2.3.302"
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
            game.pr_min = 60
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
            game.global_multiplier = new Decimal(1)
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
        game.version = "2.3.302"
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
        game.perks = new Array(29).fill(false)
        game.hold_time = 0
        game.generator_kit = 0
        game.flux_increase = 1
        game.autopp_toggle = false
        game.autopp_mode = 0
        game.priority = new Array(39).fill(1)
        game.achievements = new Array(175).fill(false)
        game.ach_power = 1
        game.achiev_page = 0
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
        game.autorb_toggle = false
        game.autorb_goal = [1, 0.8]
        game.autorb_pending = false
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
        game.core_price = [5, 15, 50, 180, 680, 2640, 10400, 41280]
        game.buy_max = false
        game.supply_level = 0
        game.supply_price = 80
        game.true_banked_prestige = game.banked_prestige
        game.priority_layer = 1
        game.switchpoint = 0
        game.quantum = 0
        game.photons = 0
        game.prism_level = 0
        game.prism_price = new Decimal(1)
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
        game.autohy_deuterium = 0.5
        game.budget = new Array(9).fill(0)
        game.superspeed_power = 1
        game.dark_matter = new Decimal(1)
        game.dark_matter_boost = 1
        game.growth_interval = 60
        game.growth_factor = 1
        game.growth_time = 0
        game.growth_price = [new Decimal(10 ** 17), new Decimal(5 * 10 ** 14)]
        game.growth_level = [0, 0]
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
        game.omega_best = new Decimal(0)
        game.free_omega_points = 0
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
        game.cancer_prestiges = 0
        game.no_upgrades = true
        game.pp_amount = new Array(5).fill(-1)
        game.hydrogen_amount = new Array(5).fill(-1)
        game.photons_amount = new Array(5).fill(-1)
        game.photons_time = new Array(5).fill(-1)
        game.photons_eff = new Array(5).fill(-1)
        game.past_alt = [0, 0]
        game.smartpr_phase = 0
        game.smartpr_condition = 0
        game.smartpr_queue = []
        game.smartpr_presets = [[], [], []]
        game.smartpr_mode = 0
        game.smartpr_repeat = false
        game.smartpr_start = false
        game.smartpr_select = 0
    } else if (major < 3) {
        game = savegame
        //v2.2.000
        if (minor < 100) {
            let old_perks = game.perks
            game.perks = new Array(29).fill(false)
            for (let i = 0; i <= 7; i++) {
                game.perks[i] = old_perks[i]
            }
            let old_achievements = game.achievements
            game.achievements = new Array(175).fill(false)
            for (let i = 0; i <= 69; i++) {
                game.achievements[i] = old_achievements[i]
            }
            game.autocp_toggle = false
            game.smartds_oc = false
            game.autorb_toggle = false
            game.autorb_goal = [1, 0.8]
            game.autorb_pending = false
        }
        //v2.2.100
        if (minor < 102) {
            game.beta = false
        }
        //v2.2.102, v2.2.200
        if (minor < 200) {
            let old_perks = game.perks
            game.perks = new Array(29).fill(false)
            for (let i = 0; i <= 15; i++) {
                game.perks[i] = old_perks[i]
            }
            let old_achievements = game.achievements
            game.achievements = new Array(175).fill(false)
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
            game.perks = new Array(29).fill(false)
            for (let i = 0; i <= 22; i++) {
                game.perks[i] = old_perks[i]
            }
            let old_achievements = game.achievements
            game.achievements = new Array(175).fill(false)
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
            game.core_price = [5, 15, 50, 180, 680, 2640, 10400, 41280]
            game.buy_max = false
            game.supply_level = 0
            game.supply_price = 80
            game.true_banked_prestige = game.banked_prestige
        }
        //v2.2.300
        if (minor < 301) {
            game.subtab = new Array(3).fill(0)
            game.priority_layer = 1
            game.switchpoint = 0
        }
        //v2.2.301
        game.version = "2.3.302"
        game.amp_eff = new Array(5).fill(-1)
        game.watts_eff = new Array(5).fill(-1)
        game.quantum = 0
        game.photons = 0
        game.prism_level = 0
        game.prism_price = new Decimal(1)
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
        game.autohy_deuterium = 0.5
        game.budget = new Array(9).fill(0)
        game.superspeed_power = 1
        let old_achievements = game.achievements
        game.achievements = new Array(175).fill(false)
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
        game.growth_price = [new Decimal(10 ** 17), new Decimal(5 * 10 ** 14)]
        game.growth_level = [0, 0]
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
        game.omega_best = new Decimal(0)
        game.free_omega_points = 0
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
        game.cancer_prestiges = 0
        game.no_upgrades = true
        game.pp_amount = new Array(5).fill(-1)
        game.hydrogen_amount = new Array(5).fill(-1)
        game.photons_amount = new Array(5).fill(-1)
        game.photons_time = new Array(5).fill(-1)
        game.photons_eff = new Array(5).fill(-1)
        game.past_alt = [0, 0]
        game.smartpr_phase = 0
        game.smartpr_condition = 0
        game.smartpr_queue = []
        game.smartpr_presets = [[], [], []]
        game.smartpr_mode = 0
        game.smartpr_repeat = false
        game.smartpr_start = false
        game.smartpr_select = 0
    } else {
        if (minor > 302) {
            alert(
                "You cannot load saves from game versions that do not exist\nIf you think you are recieving this alert in error, reload and try again"
            )
            return
        }
        game = savegame
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
            game.growth_price = [
                new Decimal(10 ** 17),
                new Decimal(5 * 10 ** 14),
            ]
            game.dk_bought = new Array(8).fill(false)
            game.infusion = 1
            game.ch_helium_boost = new Array(9).fill(1)
            game.autorb_push = 60
            game.autoqu_toggle = false
            game.autoqu_mode = 0
            game.autoqu_goal = [1, 60]
            let old_achievements = game.achievements
            game.achievements = new Array(175).fill(false)
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
            game.omega_best = new Decimal(0)
            game.free_omega_points = 0
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
        if (minor < 300) {
            game.goal = get_exp(game.level)
                .sub(get_exp(game.level - 1))
                .ceil()
            let old_perks = game.perks
            game.perks = new Array(29).fill(false)
            for (let i = 0; i <= 21; i++) {
                game.perks[i] = old_perks[i]
            }
            if (game.watts >= 16384 || game.qu_bought[1]) game.perks[22] = true
            for (let i = 23; i <= 28; i++) {
                game.perks[i] = old_perks[i - 1]
            }
            game.prism_price = Decimal.pow(2.8, game.prism_level).round()
            let old_budget = game.budget
            game.budget = new Array(9).fill(old_budget / 9)
            game.autohy_deuterium = Math.round(1 / game.autohy_importance) / 100
            console.log(old_budget)
            let old_price = [game.growth_price[0], game.growth_price[1]]
            game.growth_level = [0, 0]
            game.growth_price[0] = new Decimal(10 ** 17)
            while (game.growth_price[0].cmp(old_price[0]) === -1) {
                game.growth_level[0]++
                if (game.growth_level[0] >= 39) {
                    break
                } else if (game.growth_level[0] < 24) {
                    game.growth_price[0] = game.growth_price[0].mul(
                        100 + 100 * game.growth_level[0]
                    )
                } else {
                    game.growth_price[0] = game.growth_price[0].mul(
                        Decimal.pow(2500, game.growth_level[0] - 23)
                    )
                }
            }
            game.growth_interval = Math.max(1, 60 * 0.9 ** game.growth_level[0])
            game.growth_price[1] = new Decimal(5 * 10 ** 14)
            while (game.growth_price[1].cmp(old_price[1]) === -1) {
                game.growth_level[1]++
                if (game.growth_level[1] < 24) {
                    game.growth_price[1] = game.growth_price[1].mul(
                        25 + 25 * game.growth_level[1]
                    )
                } else {
                    game.growth_price[1] = game.growth_price[1].mul(
                        Decimal.pow(625, game.growth_level[1] - 23)
                    )
                }
            }
            game.growth_factor = 1.02 ** game.growth_level[1]
            let old_achievements = game.achievements
            game.achievements = new Array(175).fill(false)
            for (let i = 0; i <= 168; i++) {
                game.achievements[i] = old_achievements[i]
            }
            game.omega_best = new Decimal(0)
            game.free_omega_points = 0
            game.op_dark_boost = 1
            game.highest_omega_level = Math.round(
                game.highest_omega_level * 0.75
            )
            game.omega_level = 0
            retrieve()
            game.achievements[165] = false
            game.achievements[166] = false
            if (game.all_time_exp < 10 ** 39) game.achievements[29] = false
            if (game.all_time_exp < 10 ** 45) game.achievements[30] = false
            if (game.all_time_exp < 10 ** 51) game.achievements[70] = false
            if (game.all_time_exp < 10 ** 57) game.achievements[79] = false
            if (game.all_time_exp < 10 ** 63) game.achievements[80] = false
            if (game.all_time_exp < 10 ** 78) game.achievements[93] = false
            if (game.all_time_exp < 10 ** 93) game.achievements[96] = false
            if (game.all_time_exp < 10 ** 108) game.achievements[99] = false
            if (game.all_time_exp < 10 ** 123) game.achievements[100] = false
            if (game.all_time_exp < 10 ** 138) game.achievements[101] = false
            if (game.all_time_exp < 10 ** 153) game.achievements[102] = false
            if (game.all_time_exp < 10 ** 183) game.achievements[118] = false
            if (game.all_time_exp < 10 ** 213) game.achievements[132] = false
            if (game.all_time_exp < 10 ** 243) game.achievements[134] = false
            if (game.all_time_exp < 10 ** 273) game.achievements[138] = false
            if (game.all_time_exp < 10 ** 303) game.achievements[146] = false
            game.achievements[152] = false
            game.achievements[153] = false
        } else {
            game.goal = new Decimal(game.goal)
            game.prism_price = new Decimal(game.prism_price)
            game.growth_price[0] = new Decimal(game.growth_price[0])
            game.growth_price[1] = new Decimal(game.growth_price[1])
            game.omega_best = new Decimal(game.omega_best)
        }
        //v2.3.300
        if (minor < 302) {
            game.cancer_prestiges = 0
            game.no_upgrades = true
            game.pp_amount = new Array(5).fill(-1)
            game.hydrogen_amount = new Array(5).fill(-1)
            game.hydrogen_eff = new Array(5).fill(-1)
            game.photons_amount = new Array(5).fill(-1)
            game.photons_time = new Array(5).fill(-1)
            game.photons_eff = new Array(5).fill(-1)
            game.past_alt = [0, 0]
            game.smartpr_phase = 0
            game.smartpr_condition = 0
            game.smartpr_queue = []
            game.smartpr_presets = [[], [], []]
            game.smartpr_mode = 0
            game.smartpr_repeat = false
            game.smartpr_start = false
            game.smartpr_select = 0
            for (let i = 0; i < 8; i++) {
                game.core_price[i] *= 5
            }
            game.supply_price *= 8
            game.achievements[62] = false
            game.achievements[68] = false
            game.achievements[76] = false
            game.achievements[92] = false
        }
        //v2.3.302
        if (game.budget === null) game.budget = new Array(9).fill(0)
        game.dark_matter = new Decimal(game.dark_matter)
        game.total_exp = new Decimal(game.total_exp)
        game.exp = new Decimal(game.exp)
        game.all_time_exp = new Decimal(game.all_time_exp)
        game.prestige_exp = new Decimal(game.prestige_exp)
        game.reboot_exp = new Decimal(game.reboot_exp)
        game.global_multiplier = new Decimal(game.global_multiplier)
        game.photons = new Decimal(game.photons)
        game.version = "2.3.302"
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
        localStorage.removeItem("exp_simulator_save")
        window.location.reload()
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
