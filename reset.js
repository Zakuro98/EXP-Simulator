//function for handling resets of any kind
//prestige, reboot, save wiping, etc
function reset() {
    document.getElementById("boost").style.display = "none"
    document.getElementById("boost_button").style.display = "none"
    document.getElementById("boost_auto").style.display = "none"
    document.getElementById("auto").style.display = "none"
    document.getElementById("auto_button").style.display = "none"
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

    game.total_exp = 0
    game.exp_add = 1
    game.exp_fluct = 0
    game.exp_fact = 1
    game.exp_flux = 1
    game.exp_battery = 1
    game.level = 1
    game.exp = 0
    game.goal = 32

    game.clicks = 0

    game.cps = 0
    game.click_time = 0

    game.boost_tier = 0
    game.boost_level = 2
    game.auto_tier = 0
    game.auto_level = 3
    game.fluct_tier = 0
    game.fluct_level = 6
    game.fact_tier = 0
    game.fact_level = 15
    game.flux_tier = 0
    game.flux_level = 75
    game.battery_tier = 0
    game.battery_level = 90

    game.time = 0
    game.afk_time = 0

    color_update()

    document.getElementById("lvlnum").innerText = game.level
    document.getElementById("exp").innerText =
        format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerText =
        format_num(game.total_exp) + " Total EXP"

    document.getElementById("progress").style.width = 0 + "%"
}

//prestiging code
function prestige() {
    if (game.challenge !== 4) {
        if (game.level >= game.pr_min) {
            if (game.perks[4])
                game.prestige +=
                    Math.ceil(game.level / 200) * Math.round(game.patience)
            else game.prestige += 1
            game.amp += Math.floor(
                get_amp(game.level) * game.patience * game.watt_boost
            )
            if (game.prestige <= 21) {
                game.pp += 1
                game.total_pp += 1
            }
            if (game.level > game.highest_level) {
                game.pp += get_pp(game.level) - get_pp(game.highest_level)
                game.total_pp += get_pp(game.level) - get_pp(game.highest_level)
                game.highest_level = game.level
            }
            document.getElementById("amp").innerText =
                format_num(game.amp) + " AMP"
            document.getElementById("pp").innerText =
                format_num(game.pp) + " PP"

            if (
                !game.achievements[13] &&
                game.prestige + game.banked_prestige >= 1
            )
                get_achievement(13)
            if (
                !game.achievements[14] &&
                game.prestige + game.banked_prestige >= 10
            )
                get_achievement(14)
            if (
                !game.achievements[15] &&
                game.prestige + game.banked_prestige >= 100
            )
                get_achievement(15)
            if (
                !game.achievements[16] &&
                game.prestige + game.banked_prestige >= 1000
            )
                get_achievement(16)
            if (
                !game.achievements[17] &&
                game.prestige + game.banked_prestige >= 10000
            )
                get_achievement(17)
            if (
                !game.achievements[18] &&
                game.prestige + game.banked_prestige >= 100000
            )
                get_achievement(18)
            if (
                !game.achievements[78] &&
                game.prestige + game.banked_prestige >= 1000000
            )
                get_achievement(78)

            if (!game.achievements[36] && game.amp >= 100) get_achievement(36)
            if (!game.achievements[37] && game.amp >= 10000) get_achievement(37)
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

            if (game.time < game.fastest_prestige)
                game.fastest_prestige = game.time

            reset()

            game.exp_add =
                game.amp +
                game.starter_kit * game.amp +
                game.generator_kit * game.amp
            if (!game.pp_bought[15])
                game.exp_fluct =
                    (game.starter_kit + game.generator_kit) * game.amp
            else
                game.exp_fluct =
                    (game.starter_kit + game.generator_kit) * game.amp * 2
            game.exp_fact = 1 + game.starter_kit + game.generator_kit
            if (game.pp_bought[25]) {
                if (!game.pp_bought[31])
                    game.exp_battery = 1 + game.starter_kit + game.generator_kit
                else if (!game.pp_bought[36])
                    game.exp_battery =
                        (1 + game.starter_kit + game.generator_kit) * 3
                else
                    game.exp_battery =
                        (1 + game.starter_kit + game.generator_kit) * 9
            }
            game.cps = (game.starter_kit + game.generator_kit) * 2

            if (game.pp_bought[27]) {
                game.prestige_power = 1 + (game.prestige / 1000) ** (1 / 2)
            }

            if (game.pp_bought[30]) {
                game.depth_power = 1 + game.highest_level / 400
            }

            if (game.perks[6] && game.challenge === 0) {
                game.boost_level = Math.round(2 * 0.75)
                game.auto_level = Math.round(5 * 0.75)
                game.fluct_level = Math.round(6 * 0.75)
                game.fact_level = Math.round(15 * 0.75)
                game.flux_level = Math.round(75 * 0.75)
                game.battery_level = Math.round(90 * 0.75)

                if (game.perks[21]) {
                    game.boost_level = Math.round(2 * 0.5)
                    game.auto_level = Math.round(5 * 0.5)
                    game.fluct_level = Math.round(6 * 0.5)
                    game.fact_level = Math.round(15 * 0.5)
                    game.flux_level = Math.round(75 * 0.5)
                    game.battery_level = Math.round(90 * 0.5)
                }
            }

            if (game.challenge === 2) {
                game.boost_level = 10
                game.auto_level = 25
                game.fluct_level = 30
                game.fact_level = 75
                game.flux_level = 375
                game.battery_level = 450
            }

            if (
                game.autopr_mode === 0 ||
                game.autopr_mode === 1 ||
                !game.autopr_toggle
            ) {
                game.smartds_oc = false
            }
            if (game.autopr_mode === 2) {
                game.smartds_oc = false
            }

            if (game.smartpr_mode === 1 && game.amp < game.smartpr_amp) {
                game.smartpr_mode = 0
                game.smartpr_time = 0
                autopr_switch(4)
            }

            switch (game.jumpstart) {
                case 1:
                    game.total_exp = 4855
                    game.all_time_exp += 4855
                    break
                case 2:
                    game.total_exp = 35308
                    game.all_time_exp += 35308
                    break
                case 3:
                    game.total_exp = 269015
                    game.all_time_exp += 269015
                    break
                case 4:
                    game.total_exp = 92611251
                    game.all_time_exp += 92611251
                    break
            }
            increment(0)

            if (game.pp_progress) {
                document.getElementById("pp_back").style.display = "block"
            }
        }
    } else {
        if (game.level >= game.highest_level) {
            if (game.perks[4])
                game.prestige +=
                    Math.ceil(game.level / 200) * Math.round(game.patience)
            else game.prestige += 1
            game.amp += Math.floor(
                (get_amp(game.level) - get_amp(game.highest_level)) *
                    game.watt_boost
            )
            if (game.prestige <= 21) {
                game.pp += 1
                game.total_pp += 1
            }
            game.pp += get_pp(game.level) - get_pp(game.highest_level)
            game.total_pp += get_pp(game.level) - get_pp(game.highest_level)
            game.highest_level = game.level
            document.getElementById("amp").innerText =
                format_num(game.amp) + " AMP"
            document.getElementById("pp").innerText =
                format_num(game.pp) + " PP"

            if (
                !game.achievements[13] &&
                game.prestige + game.banked_prestige >= 1
            )
                get_achievement(13)
            if (
                !game.achievements[14] &&
                game.prestige + game.banked_prestige >= 10
            )
                get_achievement(14)
            if (
                !game.achievements[15] &&
                game.prestige + game.banked_prestige >= 100
            )
                get_achievement(15)
            if (
                !game.achievements[16] &&
                game.prestige + game.banked_prestige >= 1000
            )
                get_achievement(16)
            if (
                !game.achievements[17] &&
                game.prestige + game.banked_prestige >= 10000
            )
                get_achievement(17)
            if (
                !game.achievements[18] &&
                game.prestige + game.banked_prestige >= 100000
            )
                get_achievement(18)
            if (
                !game.achievements[78] &&
                game.prestige + game.banked_prestige >= 1000000
            )
                get_achievement(78)

            if (!game.achievements[36] && game.amp >= 100) get_achievement(36)
            if (!game.achievements[37] && game.amp >= 10000) get_achievement(37)
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

            if (game.time < game.fastest_prestige)
                game.fastest_prestige = game.time

            reset()

            game.exp_add =
                game.amp +
                game.starter_kit * game.amp +
                game.generator_kit * game.amp
            if (!game.pp_bought[15])
                game.exp_fluct =
                    (game.starter_kit + game.generator_kit) * game.amp
            else
                game.exp_fluct =
                    (game.starter_kit + game.generator_kit) * game.amp * 2
            game.exp_fact = 1 + game.starter_kit + game.generator_kit
            if (game.pp_bought[25]) {
                if (!game.pp_bought[31])
                    game.exp_battery = 1 + game.starter_kit + game.generator_kit
                else if (!game.pp_bought[36])
                    game.exp_battery =
                        (1 + game.starter_kit + game.generator_kit) * 3
                else
                    game.exp_battery =
                        (1 + game.starter_kit + game.generator_kit) * 9
            }
            game.cps = (game.starter_kit + game.generator_kit) * 2

            if (game.pp_bought[27]) {
                game.prestige_power = 1 + (game.prestige / 1000) ** (1 / 2)
            }

            if (game.pp_bought[30]) {
                game.depth_power = 1 + game.highest_level / 400
            }

            if (game.perks[6] && game.challenge === 0) {
                game.boost_level = Math.round(2 * 0.75)
                game.auto_level = Math.round(5 * 0.75)
                game.fluct_level = Math.round(6 * 0.75)
                game.fact_level = Math.round(15 * 0.75)
                game.flux_level = Math.round(75 * 0.75)
                game.battery_level = Math.round(90 * 0.75)

                if (game.perks[21]) {
                    game.boost_level = Math.round(2 * 0.5)
                    game.auto_level = Math.round(5 * 0.5)
                    game.fluct_level = Math.round(6 * 0.5)
                    game.fact_level = Math.round(15 * 0.5)
                    game.flux_level = Math.round(75 * 0.5)
                    game.battery_level = Math.round(90 * 0.5)
                }
            }

            if (game.challenge === 2) {
                game.boost_level = 10
                game.auto_level = 25
                game.fluct_level = 30
                game.fact_level = 75
                game.flux_level = 375
                game.battery_level = 450
            }

            if (
                game.autopr_mode === 0 ||
                game.autopr_mode === 1 ||
                !game.autopr_toggle
            ) {
                game.smartds_oc = false
            }
            if (game.autopr_mode === 2) {
                game.smartds_oc = false
            }

            if (game.smartpr_mode === 1 && game.amp < game.smartpr_amp) {
                game.smartpr_mode = 0
                game.smartpr_time = 0
                autopr_switch(4)
            }

            switch (game.jumpstart) {
                case 1:
                    game.total_exp = 4855
                    game.all_time_exp += 4855
                    break
                case 2:
                    game.total_exp = 35308
                    game.all_time_exp += 35308
                    break
                case 3:
                    game.total_exp = 269015
                    game.all_time_exp += 269015
                    break
                case 4:
                    game.total_exp = 92611251
                    game.all_time_exp += 92611251
                    break
            }
            increment(0)

            if (game.pp_progress) {
                document.getElementById("pp_back").style.display = "block"
            }
        }
    }
}

//respeccing prestige upgrades
function respec() {
    if (game.level >= game.pr_min) {
        let all_pp_upgrades = true
        for (const upgrade3 of pp_upgrade.upgrades) {
            if (upgrade3.id < 39 && !game.pp_bought[upgrade3.id])
                all_pp_upgrades = false
        }
        if (!game.achievements[75] && all_pp_upgrades) get_achievement(75)
        for (let i = 0; i < 39; i++) {
            game.pp_bought[i] = false
        }

        game.ml_boost = 1
        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
        game.jumpstart = 0
        game.pr_min = 60
        game.starter_kit = 0
        document.getElementById("auto_mode").style.display = "none"
        game.exp_oc = 1
        game.oc_state = 0
        game.oc_time = 0
        document.getElementById("overclock").style.display = "none"
        document.getElementById("oc_auto").style.display = "none"
        document.getElementById("oc_button").style.display = "none"
        document.getElementById("oc_state").innerText = "Recharging"
        document.getElementById("oc_timer").style.display = "block"
        document.getElementById("oc_progress").style.background = "#ff2f00"
        set_capacitance(0)
        game.prev_mode = 0
        game.stored_exp = 0
        game.cap_boost = 1
        document.getElementById("capacitor").style.display = "none"
        document.getElementById("cap_50").style.display = "none"
        document.getElementById("cap_75").style.display = "none"
        document.getElementById("cap_100").style.display = "none"
        document.getElementById("cap_disc").style.display = "none"
        document.getElementById("dis_auto").style.display = "none"
        document.getElementById("dis_text").style.display = "none"
        document.getElementById("dis_input").style.display = "none"

        prestige()
        game.pp = game.total_pp
    }
}

//rebooting code
function reboot() {
    let all_pp_upgrades = true
    let confirmed = false
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
                challenge.challenges[game.challenge - 1].step2 * 110
        }
    }

    if (!game.confirmation) confirmed = true
    else {
        if (game.reboot < 1) {
            if (
                confirm(
                    "Are you sure you want to activate the Generator?\nThis will reset ALL progress up to this point!\nHowever, you will gain 1 watt"
                )
            ) {
                confirmed = true
            }
        } else {
            if (!game.perks[13]) {
                if (
                    confirm(
                        "Are you sure you want to Reboot?\nYou will gain 1 watt"
                    )
                ) {
                    confirmed = true
                }
            } else {
                if (get_watts(game.pp) === 1 && game.notation !== 8) {
                    if (
                        confirm(
                            "Are you sure you want to Reboot?\nYou will gain " +
                                format_num(get_watts(game.pp)) +
                                " watt"
                        )
                    ) {
                        confirmed = true
                    }
                } else {
                    if (
                        confirm(
                            "Are you sure you want to Reboot?\nYou will gain " +
                                format_num(get_watts(game.pp)) +
                                " watts"
                        )
                    ) {
                        confirmed = true
                    }
                }
            }
        }
    }

    if (all_pp_upgrades && game.pp >= reboot_requirement) {
        if (confirmed) {
            reset()

            if (game.challenge !== 0 && !entering) {
                let ch = game.challenge - 1
                if (game.completions[ch] < 12) game.completions[ch]++
                else if (!game.achievements[90]) get_achievement(90)

                switch (ch) {
                    case 0:
                        if (!game.achievements[86]) get_achievement(86)
                        break
                    case 1:
                        if (!game.achievements[87]) get_achievement(87)
                        break
                    case 2:
                        if (!game.achievements[88]) get_achievement(88)
                        break
                    case 3:
                        if (!game.achievements[89]) get_achievement(89)
                        break
                }

                if (
                    !game.achievements[91] &&
                    game.completions[0] +
                        game.completions[1] +
                        game.completions[2] +
                        game.completions[3] >=
                        27
                )
                    get_achievement(91)

                if (!game.achievements[92] && game.blind) get_achievement(92)

                switch (game.completions[ch]) {
                    case 0:
                        game.ch_boost[ch] = 1
                        break
                    case 1:
                        game.ch_boost[ch] = 4
                        break
                    case 2:
                        game.ch_boost[ch] = 8
                        break
                    case 3:
                        game.ch_boost[ch] = 12
                        break
                    case 4:
                        game.ch_boost[ch] = 16
                        break
                    case 5:
                        game.ch_boost[ch] = 20
                        break
                    case 6:
                        game.ch_boost[ch] = 24
                        break
                    case 7:
                        game.ch_boost[ch] = 28
                        break
                    case 8:
                        game.ch_boost[ch] = 32
                        break
                    case 9:
                        game.ch_boost[ch] = 36
                        break
                    case 10:
                        game.ch_boost[ch] = 40
                        break
                    case 11:
                        game.ch_boost[ch] = 44
                        break
                    case 12:
                        game.ch_boost[ch] = 48
                        break
                }
                game.challenge = 0
            }

            game.reboot += 1
            if (!game.perks[13]) game.watts += 1
            else game.watts += get_watts(game.pp)
            if (game.watts < 96)
                game.watt_boost =
                    ((game.watts + 1) * (game.watts + 2) * (game.watts + 3)) / 6
            else
                game.watt_boost =
                    ((game.watts + 4755) * (game.watts + 4756)) / 2 - 11611677

            if (game.highest_level > game.all_time_highest_level) {
                game.all_time_highest_level = game.highest_level
            }

            if (!game.achievements[56] && game.reboot >= 1) get_achievement(56)
            if (!game.achievements[57] && game.reboot >= 3) get_achievement(57)
            if (!game.achievements[58] && game.reboot >= 5) get_achievement(58)
            if (!game.achievements[59] && game.reboot >= 10) get_achievement(59)
            if (!game.achievements[72] && game.reboot >= 25) get_achievement(72)
            if (!game.achievements[73] && game.reboot >= 50) get_achievement(73)
            if (!game.achievements[82] && game.reboot >= 100)
                get_achievement(82)
            if (!game.achievements[83] && game.reboot >= 1000)
                get_achievement(83)

            if (!game.achievements[62] && game.no_automation)
                get_achievement(62)
            game.no_automation = true

            if (!game.achievements[68] && game.blind) get_achievement(68)
            game.blind = true

            if (game.notation === 7) game.cancer_reboots++
            if (!game.achievements[76] && game.cancer_reboots >= 10)
                get_achievement(76)

            game.amp = game.watt_boost
            game.pp = 0
            game.total_pp = 0
            game.pr_min = 60
            for (let i = 0; i < 39; i++) {
                game.pp_bought[i] = false
            }

            if (game.prestige_time < game.fastest_reboot)
                game.fastest_reboot = game.prestige_time
            if (
                !game.achievements[60] &&
                game.fastest_reboot < 3600 * game.tickspeed
            )
                get_achievement(60)
            if (
                !game.achievements[74] &&
                game.fastest_reboot < 600 * game.tickspeed
            )
                get_achievement(74)
            if (
                !game.achievements[84] &&
                game.fastest_reboot < 60 * game.tickspeed
            )
                get_achievement(84)
            if (!game.achievements[85] && game.fastest_reboot < game.tickspeed)
                get_achievement(85)

            if (game.perks[18] && game.challenge === 0) {
                game.banked_prestige += Math.floor(game.prestige / 4)
            }

            game.prestige = 0
            game.prestige_exp = 0
            game.highest_level = 1
            game.prestige_clicks = 0
            game.prestige_time = 0
            game.exp_add = game.amp
            if (!game.perks[10]) {
                game.autopr_mode = 0
                autopr_switch(game.autopr_mode)
            }

            game.ml_boost = 1
            game.jumpstart = 0
            game.starter_kit = 0
            game.pp_power = 1

            game.exp_oc = 1
            game.exp_battery = 1
            game.pp_power = 1
            game.prestige_power = 1
            game.depth_power = 1
            game.patience = 1
            game.oc_state = 0
            game.oc_time = 0
            set_capacitance(0)
            game.prev_mode = 0
            game.cap_boost = 1
            game.stored_exp = 0
            game.flux_boost = 1
            game.flux_increase = 1
            if (game.perks[3]) game.flux_boost = 5

            if (game.perks[1]) {
                game.generator_kit = 12
                if (game.perks[12]) game.generator_kit = 24
                game.exp_add = game.generator_kit * game.watt_boost
                game.cps = game.generator_kit
            } else game.generator_kit = 0

            game.smartpr_time = 0

            document.getElementById("click").innerText =
                "+" + format_num(game.amp) + " EXP"

            document.getElementById("boost_auto").style.display = "none"
            document.getElementById("auto_auto").style.display = "none"
            document.getElementById("fluct_auto").style.display = "none"
            document.getElementById("fact_auto").style.display = "none"
            document.getElementById("flux_auto").style.display = "none"
            document.getElementById("battery_auto").style.display = "none"

            document.getElementById("amp_auto").style.display = "none"
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

            if (game.perks[14]) {
                document.getElementById("smart_config").style.display = "block"
                game.smartpr_mode = game.smartpr_start
                if (game.smartpr_toggle) {
                    if (game.smartpr_mode === 0) autopr_switch(4)
                    else if (game.smartpr_mode === 1) autopr_switch(2)
                }
            }

            if (game.perks[10] && game.challenge === 0) {
                for (let i = 0; i < 15; i++) {
                    game.pp_bought[i] = true
                    pp_upgrade.upgrades[i].on_purchase()
                }
            } else if (game.perks[2] && game.challenge === 0) {
                for (let i = 0; i < 7; i++) {
                    game.pp_bought[i] = true
                    pp_upgrade.upgrades[i].on_purchase()
                }
            }
        }
    }
}

//rebooting without getting watts
function empty_reboot() {
    reset()

    if (game.highest_level > game.all_time_highest_level) {
        game.all_time_highest_level = game.highest_level
    }

    game.amp = game.watt_boost
    game.pp = 0
    game.total_pp = 0
    game.pr_min = 60
    for (let i = 0; i < 39; i++) {
        game.pp_bought[i] = false
    }

    if (game.perks[18]) {
        game.banked_prestige += Math.floor(game.prestige / 4)
    }

    game.prestige = 0
    game.prestige_exp = 0
    game.highest_level = 1
    game.prestige_clicks = 0
    game.prestige_time = 0
    game.exp_add = game.amp
    if (!game.perks[10]) {
        game.autopr_mode = 0
        autopr_switch(game.autopr_mode)
    }

    game.ml_boost = 1
    game.jumpstart = 0
    game.starter_kit = 0
    game.pp_power = 1

    game.exp_oc = 1
    game.exp_battery = 1
    game.pp_power = 1
    game.prestige_power = 1
    game.depth_power = 1
    game.patience = 1
    game.oc_state = 0
    game.oc_time = 0
    set_capacitance(0)
    game.prev_mode = 0
    game.cap_boost = 1
    game.stored_exp = 0
    game.flux_boost = 1
    game.flux_increase = 1
    if (game.perks[3]) game.flux_boost = 5

    if (game.perks[1]) {
        game.generator_kit = 12
        if (game.perks[12]) game.generator_kit = 24
        game.exp_add = game.generator_kit * game.watt_boost
        game.cps = game.generator_kit
    } else game.generator_kit = 0

    game.smartpr_time = 0

    document.getElementById("click").innerText =
        "+" + format_num(game.amp) + " EXP"

    document.getElementById("boost_auto").style.display = "none"
    document.getElementById("auto_auto").style.display = "none"
    document.getElementById("fluct_auto").style.display = "none"
    document.getElementById("fact_auto").style.display = "none"
    document.getElementById("flux_auto").style.display = "none"
    document.getElementById("battery_auto").style.display = "none"

    document.getElementById("amp_auto").style.display = "none"
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

    if (game.perks[10] && game.challenge === 0) {
        for (let i = 0; i < 15; i++) {
            game.pp_bought[i] = true
            pp_upgrade.upgrades[i].on_purchase()
        }
    } else if (game.perks[2] && game.challenge === 0) {
        for (let i = 0; i < 7; i++) {
            game.pp_bought[i] = true
            pp_upgrade.upgrades[i].on_purchase()
        }
    }
}
