//function for handling resets of any kind
//prestige, reboot, save wiping, etc
function reset() {
    if (!game.pp_bought[0] || game.challenge === 7) {
        document.getElementById("fluct").style.display = "none"
        document.getElementById("fluct_button").style.display = "none"
        document.getElementById("fluct_auto").style.display = "none"
    }
    if (!game.pp_bought[5] || game.challenge === 7) {
        document.getElementById("fact").style.display = "none"
        document.getElementById("fact_button").style.display = "none"
        document.getElementById("fact_auto").style.display = "none"
    }
    if (!game.pp_bought[20] || game.challenge === 7) {
        document.getElementById("flux").style.display = "none"
        document.getElementById("flux_button").style.display = "none"
        document.getElementById("flux_auto").style.display = "none"
    }
    if (!game.pp_bought[25] || game.challenge === 7) {
        document.getElementById("battery").style.display = "none"
        document.getElementById("battery_button").style.display = "none"
        document.getElementById("battery_mode").style.display = "none"
        document.getElementById("battery_auto").style.display = "none"
    }

    game.total_exp = new Decimal(0)
    game.exp_add = 1
    game.exp_fluct = 0
    game.exp_fact = 1
    game.exp_flux = 1
    game.exp_battery = 1
    if (game.battery_mode === 0) game.battery_charge = 1
    else game.battery_charge = 0
    game.level = 1
    game.exp = new Decimal(0)
    game.goal = new Decimal(32)

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
    game.flux_level = 300
    game.battery_tier = 0
    game.battery_level = 1080

    game.time = 0

    color_update()

    document.getElementById("lvlnum").innerHTML = format_num(game.level)
    document.getElementById("exp").innerHTML =
        format_infinity(game.exp) + " / " + format_infinity(game.goal) + " EXP"
    document.getElementById("total_exp").innerHTML =
        format_infinity(game.total_exp) + " Total EXP"

    if (game.notation !== 8 && game.epilepsy)
        document.getElementById("progress").style.width = 0 + "%"
}

//prestiging code
function prestige() {
    if (game.challenge !== 4) {
        if (game.level >= game.pr_min) {
            let prestige_stat = 1
            if (game.perks[4] && game.challenge !== 6)
                prestige_stat =
                    Math.ceil(game.level / 200) * Math.round(game.patience)
            game.prestige += prestige_stat
            if (pause) prestige_count += prestige_stat
            if (game.challenge !== 9)
                game.amp += Math.floor(
                    get_amp(game.level) * game.patience * game.watt_boost
                )
            let old_total_pp = game.total_pp
            if (
                game.prestige <= 21 &&
                (!game.perks[28] || game.challenge === 6)
            ) {
                game.pp += 1
                game.total_pp += 1
            }
            if (game.level > game.highest_level) {
                if (!game.perks[28] || game.challenge === 6) {
                    game.pp += get_pp(game.level) - get_pp(game.highest_level)
                    game.total_pp +=
                        get_pp(game.level) - get_pp(game.highest_level)
                    game.highest_level = game.level
                }
            }
            document.getElementById("amp").innerHTML =
                format_num(game.amp) + " AMP"
            document.getElementById("pp").innerHTML =
                format_num(game.pp) + " PP"

            for (let i = 4; i > 0; i--) {
                game.amp_amount[i] = game.amp_amount[i - 1]
                game.pp_amount[i] = game.pp_amount[i - 1]
                game.amp_time[i] = game.amp_time[i - 1]
                game.amp_eff[i] = game.amp_amount[i] / game.amp_time[i]
                game.prestige_amount[i] = game.prestige_amount[i - 1]
            }
            game.amp_amount[0] =
                get_amp(game.level) * game.patience * game.watt_boost
            game.pp_amount[0] = game.total_pp - old_total_pp
            game.amp_time[0] = game.time / game.tickspeed
            game.amp_eff[0] = game.amp_amount[0] / game.amp_time[0]
            game.prestige_amount[0] = prestige_stat

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
            if (!game.achievements[103] && game.amp >= 10 ** 24)
                get_achievement(103)
            if (!game.achievements[117] && game.amp >= 10 ** 28)
                get_achievement(117)
            if (!game.achievements[133] && game.amp >= 10 ** 32)
                get_achievement(133)

            if (game.notation === 7) game.cancer_prestiges++
            if (!game.achievements[76] && game.cancer_prestiges >= 1000)
                get_achievement(76)

            if (game.time < game.fastest_prestige && game.time > 0)
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
            if (game.pp_bought[25] && game.challenge !== 7) {
                if (!game.pp_bought[31])
                    game.exp_battery =
                        (game.battery_tier +
                            game.starter_kit +
                            game.generator_kit) *
                            0.25 +
                        1
                else if (!game.pp_bought[36])
                    game.exp_battery =
                        (game.battery_tier +
                            game.starter_kit +
                            game.generator_kit) *
                            0.75 +
                        3
                else
                    game.exp_battery =
                        (game.battery_tier +
                            game.starter_kit +
                            game.generator_kit) *
                            2.25 +
                        9
            }
            game.cps = (game.starter_kit + game.generator_kit) * 2
            if (game.challenge === 7) {
                game.exp_fluct = 0
                game.exp_fact = 1
            }

            if (game.pp_bought[27] && game.challenge !== 7) {
                game.prestige_power = 1 + (game.prestige / 1000) ** (1 / 2)
            }

            if (game.perks[6] && game.challenge === 0) {
                game.boost_level = Math.round(2 * 0.75)
                game.auto_level = Math.round(5 * 0.75)
                game.fluct_level = Math.round(6 * 0.75)
                game.fact_level = Math.round(15 * 0.75)
                game.flux_level = Math.round(300 * 0.75)
                game.battery_level = Math.round(1080 * 0.75)

                if (game.perks[21]) {
                    game.boost_level = Math.round(2 * 0.5)
                    game.auto_level = Math.round(5 * 0.5)
                    game.fluct_level = Math.round(6 * 0.5)
                    game.fact_level = Math.round(15 * 0.5)
                    game.flux_level = Math.round(300 * 0.5)
                    game.battery_level = Math.round(1080 * 0.5)
                }
            }

            if (game.challenge === 2 || game.challenge === 9) {
                game.boost_level = 10
                game.auto_level = 25
                game.fluct_level = 30
                game.fact_level = 75
                game.flux_level = 1500
                game.battery_level = 5400
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

            switch (game.jumpstart) {
                case 1:
                    if (game.challenge !== 3 && game.challenge !== 9) {
                        game.total_exp = new Decimal(4855)
                        game.prestige_exp = game.prestige_exp.add(4855)
                        game.reboot_exp = game.reboot_exp.add(4855)
                        game.all_time_exp = game.all_time_exp.add(4855)
                    } else {
                        game.total_exp = new Decimal(72818)
                        game.prestige_exp = game.prestige_exp.add(72818)
                        game.reboot_exp = game.reboot_exp.add(72818)
                        game.all_time_exp = game.all_time_exp.add(72818)
                    }
                    break
                case 2:
                    if (game.challenge !== 3 && game.challenge !== 9) {
                        game.total_exp = new Decimal(35308)
                        game.prestige_exp = game.prestige_exp.add(35308)
                        game.reboot_exp = game.reboot_exp.add(35308)
                        game.all_time_exp = game.all_time_exp.add(35308)
                    } else {
                        game.total_exp = new Decimal(1059236)
                        game.prestige_exp = game.prestige_exp.add(1059236)
                        game.reboot_exp = game.reboot_exp.add(1059236)
                        game.all_time_exp = game.all_time_exp.add(1059236)
                    }
                    break
                case 3:
                    if (game.challenge !== 3 && game.challenge !== 9) {
                        game.total_exp = new Decimal(115362)
                        game.prestige_exp = game.prestige_exp.add(115362)
                        game.reboot_exp = game.reboot_exp.add(115362)
                        game.all_time_exp = game.all_time_exp.add(115362)
                    } else {
                        game.total_exp = new Decimal(5191254)
                        game.prestige_exp = game.prestige_exp.add(5191254)
                        game.reboot_exp = game.reboot_exp.add(5191254)
                        game.all_time_exp = game.all_time_exp.add(5191254)
                    }
                    break
            }
            increment(0)

            if (game.pp_progress) {
                document.getElementById("pp_back").style.display = "block"
            }

            if (game.perks[14]) {
                if (
                    game.smartpr_mode === 1 &&
                    game.smartpr_queue[game.smartpr_phase].until === 4
                ) {
                    game.smartpr_condition++
                }
            }
        }
    } else {
        if (game.level >= game.highest_level) {
            if (game.perks[4] && game.challenge !== 6)
                game.prestige +=
                    Math.ceil(game.level / 200) * Math.round(game.patience)
            else game.prestige += 1
            if (game.challenge !== 9)
                game.amp += Math.floor(
                    (get_amp(game.level) - get_amp(game.highest_level)) *
                        game.watt_boost
                )
            let old_total_pp = game.total_pp
            if (
                game.prestige <= 21 &&
                (!game.perks[28] || game.challenge === 6)
            ) {
                game.pp += 1
                game.total_pp += 1
            }
            if (!game.perks[28] || game.challenge === 6) {
                game.pp += get_pp(game.level) - get_pp(game.highest_level)
                game.total_pp += get_pp(game.level) - get_pp(game.highest_level)
                game.highest_level = game.level
            }
            document.getElementById("amp").innerHTML =
                format_num(game.amp) + " AMP"
            document.getElementById("pp").innerHTML =
                format_num(game.pp) + " PP"

            for (let i = 4; i > 0; i--) {
                game.amp_amount[i] = game.amp_amount[i - 1]
                game.pp_amount[i] = game.pp_amount[i - 1]
                game.amp_time[i] = game.amp_time[i - 1]
                game.amp_eff[i] = game.amp_amount[i] / game.amp_time[i]
            }
            game.amp_amount[0] =
                (get_amp(game.level) - get_amp(game.highest_level)) *
                game.watt_boost
            game.pp_amount[0] = game.total_pp - old_total_pp
            game.amp_time[0] = game.time / game.tickspeed
            game.amp_eff[0] = game.amp_amount[0] / game.amp_time[0]

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
            if (!game.achievements[103] && game.amp >= 10 ** 24)
                get_achievement(103)
            if (!game.achievements[117] && game.amp >= 10 ** 28)
                get_achievement(117)
            if (!game.achievements[133] && game.amp >= 10 ** 32)
                get_achievement(133)

            if (game.notation === 7) game.cancer_prestiges++
            if (!game.achievements[76] && game.cancer_prestiges >= 1000)
                get_achievement(76)

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
            if (game.pp_bought[25] && game.challenge !== 7) {
                if (!game.pp_bought[31])
                    game.exp_battery =
                        (game.battery_tier +
                            game.starter_kit +
                            game.generator_kit) *
                            0.25 +
                        1
                else if (!game.pp_bought[36])
                    game.exp_battery =
                        (game.battery_tier +
                            game.starter_kit +
                            game.generator_kit) *
                            0.75 +
                        3
                else
                    game.exp_battery =
                        (game.battery_tier +
                            game.starter_kit +
                            game.generator_kit) *
                            2.25 +
                        9
            }
            game.cps = (game.starter_kit + game.generator_kit) * 2
            if (game.challenge === 7) {
                game.exp_fluct = 0
                game.exp_fact = 1
            }

            if (game.perks[6] && game.challenge === 0) {
                game.boost_level = Math.round(2 * 0.75)
                game.auto_level = Math.round(5 * 0.75)
                game.fluct_level = Math.round(6 * 0.75)
                game.fact_level = Math.round(15 * 0.75)
                game.flux_level = Math.round(300 * 0.75)
                game.battery_level = Math.round(1080 * 0.75)

                if (game.perks[21]) {
                    game.boost_level = Math.round(2 * 0.5)
                    game.auto_level = Math.round(5 * 0.5)
                    game.fluct_level = Math.round(6 * 0.5)
                    game.fact_level = Math.round(15 * 0.5)
                    game.flux_level = Math.round(300 * 0.5)
                    game.battery_level = Math.round(1080 * 0.5)
                }
            }

            if (game.challenge === 2 || game.challenge === 9) {
                game.boost_level = 10
                game.auto_level = 25
                game.fluct_level = 30
                game.fact_level = 75
                game.flux_level = 1500
                game.battery_level = 5400
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

            switch (game.jumpstart) {
                case 1:
                    if (game.challenge !== 3 && game.challenge !== 9) {
                        game.total_exp = new Decimal(4855)
                        game.prestige_exp = game.prestige_exp.add(4855)
                        game.reboot_exp = game.reboot_exp.add(4855)
                        game.all_time_exp = game.all_time_exp.add(4855)
                    } else {
                        game.total_exp = new Decimal(72818)
                        game.prestige_exp = game.prestige_exp.add(72818)
                        game.reboot_exp = game.reboot_exp.add(72818)
                        game.all_time_exp = game.all_time_exp.add(72818)
                    }
                    break
                case 2:
                    if (game.challenge !== 3 && game.challenge !== 9) {
                        game.total_exp = new Decimal(35308)
                        game.prestige_exp = game.prestige_exp.add(35308)
                        game.reboot_exp = game.reboot_exp.add(35308)
                        game.all_time_exp = game.all_time_exp.add(35308)
                    } else {
                        game.total_exp = new Decimal(1059236)
                        game.prestige_exp = game.prestige_exp.add(1059236)
                        game.reboot_exp = game.reboot_exp.add(1059236)
                        game.all_time_exp = game.all_time_exp.add(1059236)
                    }
                    break
                case 3:
                    if (game.challenge !== 3 && game.challenge !== 9) {
                        game.total_exp = new Decimal(115362)
                        game.prestige_exp = game.prestige_exp.add(115362)
                        game.reboot_exp = game.reboot_exp.add(115362)
                        game.all_time_exp = game.all_time_exp.add(115362)
                    } else {
                        game.total_exp = new Decimal(5191254)
                        game.prestige_exp = game.prestige_exp.add(5191254)
                        game.reboot_exp = game.reboot_exp.add(5191254)
                        game.all_time_exp = game.all_time_exp.add(5191254)
                    }
                    break
            }
            increment(0)

            if (game.pp_progress) {
                document.getElementById("pp_back").style.display = "block"
            }

            if (game.perks[14]) {
                if (
                    game.smartpr_mode === 1 &&
                    game.smartpr_queue[game.smartpr_phase].until === 4
                ) {
                    game.smartpr_condition++
                }
            }
        }
    }
}

//prestiging without getting anything
function empty_prestige() {
    reset()

    game.exp_add =
        game.amp + game.starter_kit * game.amp + game.generator_kit * game.amp
    if (!game.pp_bought[15])
        game.exp_fluct = (game.starter_kit + game.generator_kit) * game.amp
    else game.exp_fluct = (game.starter_kit + game.generator_kit) * game.amp * 2
    game.exp_fact = 1 + game.starter_kit + game.generator_kit
    if (game.pp_bought[25] && game.challenge !== 7) {
        if (!game.pp_bought[31])
            game.exp_battery =
                (game.battery_tier + game.starter_kit + game.generator_kit) *
                    0.25 +
                1
        else if (!game.pp_bought[36])
            game.exp_battery =
                (game.battery_tier + game.starter_kit + game.generator_kit) *
                    0.75 +
                3
        else
            game.exp_battery =
                (game.battery_tier + game.starter_kit + game.generator_kit) *
                    2.25 +
                9
    }
    game.cps = (game.starter_kit + game.generator_kit) * 2
    if (game.challenge === 7) {
        game.exp_fluct = 0
        game.exp_fact = 1
    }

    if (game.perks[6] && game.challenge === 0) {
        game.boost_level = Math.round(2 * 0.75)
        game.auto_level = Math.round(5 * 0.75)
        game.fluct_level = Math.round(6 * 0.75)
        game.fact_level = Math.round(15 * 0.75)
        game.flux_level = Math.round(300 * 0.75)
        game.battery_level = Math.round(1080 * 0.75)

        if (game.perks[21]) {
            game.boost_level = Math.round(2 * 0.5)
            game.auto_level = Math.round(5 * 0.5)
            game.fluct_level = Math.round(6 * 0.5)
            game.fact_level = Math.round(15 * 0.5)
            game.flux_level = Math.round(300 * 0.5)
            game.battery_level = Math.round(1080 * 0.5)
        }
    }

    if (game.challenge === 2 || game.challenge === 9) {
        game.boost_level = 10
        game.auto_level = 25
        game.fluct_level = 30
        game.fact_level = 75
        game.flux_level = 1500
        game.battery_level = 5400
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

    switch (game.jumpstart) {
        case 1:
            if (game.challenge !== 3 && game.challenge !== 9) {
                game.total_exp = new Decimal(4855)
                game.prestige_exp = game.prestige_exp.add(4855)
                game.reboot_exp = game.reboot_exp.add(4855)
                game.all_time_exp = game.all_time_exp.add(4855)
            } else {
                game.total_exp = new Decimal(72818)
                game.prestige_exp = game.prestige_exp.add(72818)
                game.reboot_exp = game.reboot_exp.add(72818)
                game.all_time_exp = game.all_time_exp.add(72818)
            }
            break
        case 2:
            if (game.challenge !== 3 && game.challenge !== 9) {
                game.total_exp = new Decimal(35308)
                game.prestige_exp = game.prestige_exp.add(35308)
                game.reboot_exp = game.reboot_exp.add(35308)
                game.all_time_exp = game.all_time_exp.add(35308)
            } else {
                game.total_exp = new Decimal(1059236)
                game.prestige_exp = game.prestige_exp.add(1059236)
                game.reboot_exp = game.reboot_exp.add(1059236)
                game.all_time_exp = game.all_time_exp.add(1059236)
            }
            break
        case 3:
            if (game.challenge !== 3 && game.challenge !== 9) {
                game.total_exp = new Decimal(115362)
                game.prestige_exp = game.prestige_exp.add(115362)
                game.reboot_exp = game.reboot_exp.add(115362)
                game.all_time_exp = game.all_time_exp.add(115362)
            } else {
                game.total_exp = new Decimal(5191254)
                game.prestige_exp = game.prestige_exp.add(5191254)
                game.reboot_exp = game.reboot_exp.add(5191254)
                game.all_time_exp = game.all_time_exp.add(5191254)
            }
            break
    }
    increment(0)

    if (game.pp_progress) {
        document.getElementById("pp_back").style.display = "block"
    }
}

//respeccing prestige upgrades
function respec() {
    if (game.challenge !== 7 && game.pp_bought[33]) game.flux_boost /= 5

    let overclocker = game.pp_bought[14]
    let all_pp_upgrades = true
    for (const upgrade3 of pp_upgrade.upgrades) {
        if (
            upgrade3.id < 39 &&
            upgrade3.id !== 8 &&
            !game.pp_bought[upgrade3.id]
        )
            all_pp_upgrades = false
    }
    if (!game.achievements[75] && all_pp_upgrades) get_achievement(75)
    for (let i = 0; i < 39; i++) {
        game.pp_bought[i] = false
    }

    autopr_switch(0)
    game.au_boost = 1
    document.getElementById("amp_auto").style.display = "none"
    document.getElementById("auto_config").style.display = "none"
    game.jumpstart = 0
    game.pr_min = 60
    game.starter_kit = 0
    document.getElementById("auto_mode").style.display = "none"
    game.exp_oc = 1
    game.oc_state = 0
    if (overclocker) game.oc_time = 0
    document.getElementById("overclock").style.display = "none"
    document.getElementById("oc_auto").style.display = "none"
    document.getElementById("oc_button").style.display = "none"
    document.getElementById("oc_state").innerHTML = "Recharging"
    document.getElementById("oc_timer").style.display = "block"
    if (!meme)
        document.getElementById("oc_progress").style.background = "#ff2f00"
    set_capacitance(0)
    game.prev_mode = 0
    game.stored_exp = 0
    game.cap_boost = 1
    game.ds_boost = 2
    if (game.perks[9]) game.ds_boost = 4
    document.getElementById("capacitor").style.display = "none"
    document.getElementById("cap_50").style.display = "none"
    document.getElementById("cap_75").style.display = "none"
    document.getElementById("cap_100").style.display = "none"
    document.getElementById("dis_auto").style.display = "none"
    document.getElementById("dis_text").style.display = "none"
    document.getElementById("dis_input").style.display = "none"

    if (game.level >= game.pr_min) {
        prestige()
    } else {
        empty_prestige()
    }

    game.pp = game.total_pp
    document.getElementById("pp").innerHTML = format_num(game.pp) + " PP"
    document.getElementById("prestige_tabs").style.display = "none"
}

//rebooting code
function pre_reboot() {
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
                            (challenge.challenges[game.challenge - 1].step4 *
                                (game.prev_completions - 13) *
                                (game.prev_completions - 12)) /
                                2
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal2 +
                            challenge.challenges[game.challenge - 1].step3 * 7 +
                            challenge.challenges[game.challenge - 1].step4 * 21
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
                                (game.completions[game.challenge - 1] - 12) +
                            (challenge.challenges[game.challenge - 1].step4 *
                                (game.completions[game.challenge - 1] - 13) *
                                (game.completions[game.challenge - 1] - 12)) /
                                2
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal2 +
                            challenge.challenges[game.challenge - 1].step3 * 7 +
                            challenge.challenges[game.challenge - 1].step4 * 21
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
        if (game.confirmation) {
            if (modal === "none") {
                let message = ""
                if (game.reboot < 1) {
                    message =
                        "Are you sure you want to activate the Generator?<br>This will reset ALL progress up to this point!<br>However, you will gain 1 watt"
                } else {
                    if (!game.perks[13]) {
                        message =
                            "Are you sure you want to Reboot?<br>You will gain 1 watt"
                    } else {
                        if (
                            get_watts(game.pp) * game.prism_boost === 1 &&
                            game.notation !== 8
                        ) {
                            message =
                                "Are you sure you want to Reboot?<br>You will gain " +
                                format_num(
                                    get_watts(game.pp) * game.prism_boost
                                ) +
                                " watt"
                        } else {
                            message =
                                "Are you sure you want to Reboot?<br>You will gain " +
                                format_num(
                                    get_watts(game.pp) * game.prism_boost
                                ) +
                                " watts"
                        }
                    }

                    if (game.dk_bought[5])
                        message +=
                            " and " +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    3 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            " g hydrogen"
                    else if (
                        game.perks[26] &&
                        (game.watts >= 98304 || game.dk_bought[5])
                    )
                        message +=
                            " and " +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    2.5 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            " g hydrogen"
                    else if (
                        game.perks[23] &&
                        (game.watts >= 98304 || game.dk_bought[5])
                    )
                        message +=
                            " and " +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    2 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            " g hydrogen"
                }

                open_modal("confirm", message, reboot)
            }
        } else {
            reboot()
        }
    }
}

function reboot() {
    reset()

    let in_challenge = false
    if (game.challenge !== 0 && !entering) {
        if (!game.qu_bought[2]) {
            let ch = game.challenge - 1
            if (!game.dk_bought[3]) {
                if (game.completions[ch] < 12) game.completions[ch]++
            } else {
                if (game.completions[ch] < 20) game.completions[ch]++
            }

            if (game.completions[ch] >= 12 && !game.achievements[90])
                get_achievement(90)
            if (game.completions[ch] >= 20 && !game.achievements[158])
                get_achievement(158)

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
                case 4:
                    if (!game.achievements[108]) get_achievement(108)
                    break
                case 5:
                    if (!game.achievements[109]) get_achievement(109)
                    break
                case 6:
                    if (!game.achievements[110]) get_achievement(110)
                    break
                case 7:
                    if (!game.achievements[111]) get_achievement(111)
                    break
                case 8:
                    if (!game.achievements[112]) get_achievement(112)
                    break
            }

            if (
                !game.achievements[91] &&
                game.completions[0] +
                    game.completions[1] +
                    game.completions[2] +
                    game.completions[3] +
                    game.completions[4] +
                    game.completions[5] +
                    game.completions[6] +
                    game.completions[7] +
                    game.completions[8] >=
                    27
            )
                get_achievement(91)

            if (
                !game.achievements[113] &&
                game.completions[0] +
                    game.completions[1] +
                    game.completions[2] +
                    game.completions[3] +
                    game.completions[4] +
                    game.completions[5] +
                    game.completions[6] +
                    game.completions[7] +
                    game.completions[8] >=
                    54
            )
                get_achievement(113)

            if (
                !game.achievements[114] &&
                game.completions[0] +
                    game.completions[1] +
                    game.completions[2] +
                    game.completions[3] +
                    game.completions[4] +
                    game.completions[5] +
                    game.completions[6] +
                    game.completions[7] +
                    game.completions[8] >=
                    108
            )
                get_achievement(114)

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

        game.challenge = 0
        in_challenge = true
    }

    game.reboot += 1
    if (pause) reboot_count += 1
    let hydrogen_gain = 0
    if (!game.perks[13]) game.watts += game.prism_boost * game.om_boost[0]
    else {
        game.watts += get_watts(game.pp) * game.prism_boost * game.om_boost[0]
        if (game.perks[23] && (game.watts >= 98304 || game.dk_bought[5])) {
            hydrogen_gain =
                (get_watts(game.pp) / 100) *
                2 ** game.supply_level *
                game.prism_boost *
                game.om_boost[0]
            if (game.perks[26])
                hydrogen_gain =
                    (get_watts(game.pp) / 100) *
                    2.5 ** game.supply_level *
                    game.prism_boost *
                    game.om_boost[0]
            if (game.dk_bought[5])
                hydrogen_gain =
                    (get_watts(game.pp) / 100) *
                    3 ** game.supply_level *
                    game.prism_boost *
                    game.om_boost[0]

            game.hydrogen += hydrogen_gain
            if (game.qu_bought[4] && game.autohy_toggle) {
                let cores = 1
                let deuterium = false
                for (let i = 0; i < 7; i++) {
                    if (game.core_level[i] >= 1) {
                        cores++
                    }
                }
                if (game.core_level[2] >= 1) deuterium = true

                if (deuterium) {
                    for (let i = 0; i < cores; i++) {
                        game.budget[i] +=
                            (hydrogen_gain *
                                game.autohy_portion *
                                (1 - game.autohy_deuterium)) /
                            cores
                    }
                    game.budget[8] +=
                        hydrogen_gain *
                        game.autohy_portion *
                        game.autohy_deuterium
                } else {
                    for (let i = 0; i < cores; i++) {
                        game.budget[i] +=
                            (hydrogen_gain * game.autohy_portion) / cores
                    }
                }
            }
        }
    }
    if (game.watts < 96)
        game.watt_boost =
            ((game.watts + 1) * (game.watts + 2) * (game.watts + 3)) / 6
    else
        game.watt_boost =
            ((game.watts + 4755) * (game.watts + 4756)) / 2 - 11611677

    if (game.highest_level > game.reboot_highest_level) {
        game.reboot_highest_level = game.highest_level
    }
    if (game.level > game.reboot_highest_level) {
        game.reboot_highest_level = game.level
    }

    if (!in_challenge) {
        for (let i = 4; i > 0; i--) {
            game.watts_amount[i] = game.watts_amount[i - 1]
            game.watts_time[i] = game.watts_time[i - 1]
            game.watts_eff[i] = game.watts_amount[i] / game.watts_time[i]
            game.hydrogen_amount[i] = game.hydrogen_amount[i - 1]
            game.hydrogen_eff[i] = game.hydrogen_amount[i] / game.watts_time[i]
        }
        if (game.perks[13])
            game.watts_amount[0] =
                get_watts(game.pp) * game.prism_boost * game.om_boost[0]
        else game.watts_amount[0] = game.prism_boost * game.om_boost[0]
        game.watts_time[0] = game.prestige_time / game.tickspeed
        game.watts_eff[0] = game.watts_amount[0] / game.watts_time[0]
        game.hydrogen_amount[0] = hydrogen_gain
        game.hydrogen_eff[0] = game.hydrogen_amount[0] / game.watts_time[0]
    }

    game.amp_amount = new Array(5).fill(-1)
    game.pp_amount = new Array(5).fill(-1)
    game.amp_time = new Array(5).fill(-1)
    game.amp_eff = new Array(5).fill(-1)

    if (!game.achievements[56] && game.reboot >= 1) get_achievement(56)
    if (!game.achievements[57] && game.reboot >= 3) get_achievement(57)
    if (!game.achievements[58] && game.reboot >= 5) get_achievement(58)
    if (!game.achievements[59] && game.reboot >= 10) get_achievement(59)
    if (!game.achievements[72] && game.reboot >= 25) get_achievement(72)
    if (!game.achievements[73] && game.reboot >= 50) get_achievement(73)
    if (!game.achievements[82] && game.reboot >= 100) get_achievement(82)
    if (!game.achievements[83] && game.reboot >= 1000) get_achievement(83)

    if (!game.achievements[62] && game.no_upgrades) get_achievement(62)
    game.no_upgrades = true

    game.amp = game.watt_boost
    game.pp = 0
    game.total_pp = 0
    game.pr_min = 60
    for (let i = 0; i < 39; i++) {
        game.pp_bought[i] = false
    }

    if (game.prestige_time < game.fastest_reboot && game.prestige_time > 0)
        game.fastest_reboot = game.prestige_time
    if (!game.achievements[60] && game.fastest_reboot < 3600 * game.tickspeed)
        get_achievement(60)
    if (!game.achievements[74] && game.fastest_reboot < 600 * game.tickspeed)
        get_achievement(74)
    if (!game.achievements[84] && game.fastest_reboot < 60 * game.tickspeed)
        get_achievement(84)
    if (!game.achievements[85] && game.fastest_reboot < game.tickspeed)
        get_achievement(85)

    if (game.perks[18] && game.challenge === 0) {
        game.true_banked_prestige += Math.floor(game.prestige / 4)
    }

    for (const perk of generator_perk.perks) {
        if (game.watts >= perk.requirement) {
            game.perks[perk.id] = true
            if (!game.achievements[105] && perk.id === 23) get_achievement(105)
        }
    }

    if (!game.achievements[119] && game.prestige === 0) {
        get_achievement(119)
    }

    game.prestige = 0
    game.prestige_exp = new Decimal(0)
    game.highest_level = 1
    game.prestige_clicks = 0
    game.prestige_time = 0
    game.exp_add = game.amp
    if (!game.perks[10]) {
        game.autopr_mode = 0
        autopr_switch(game.autopr_mode)
    }

    game.au_boost = 1
    game.jumpstart = 0
    game.starter_kit = 0
    game.pp_power = 1

    game.exp_oc = 1
    game.exp_battery = 1
    if (game.battery_mode === 0) game.battery_charge = 1
    else game.battery_charge = 0
    game.pp_power = 1
    game.prestige_power = 1
    game.depth_power = 1
    game.patience = 1
    game.oc_state = 0
    game.oc_time = 0
    set_capacitance(0)
    game.prev_mode = 0
    game.cap_boost = 1
    game.ds_boost = 2
    if (game.perks[9]) game.ds_boost = 4
    game.stored_exp = 0
    game.flux_boost = 1
    game.flux_increase = 1
    if (game.perks[3]) game.flux_boost = 5

    game.helium = 0
    game.helium_boost = 1

    if (game.perks[1]) {
        game.generator_kit = 12
        if (game.perks[12]) game.generator_kit = 24
        game.exp_add = game.generator_kit * game.watt_boost
        game.cps = game.generator_kit
    } else game.generator_kit = 0

    if (!game.perks[2]) game.subtab[0] = 0

    document.getElementById("click").innerHTML =
        "+" + format_num(game.amp) + " EXP"

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
    document.getElementById("auto_config").style.display = "none"
    document.getElementById("auto_level").style.display = "none"
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
    document.getElementById("dis_auto").style.display = "none"
    document.getElementById("dis_text").style.display = "none"
    document.getElementById("dis_input").style.display = "none"

    if (game.perks[14]) {
        document.getElementById("smart_config").style.display = "block"
        if (game.smartpr_mode === 1 || game.smartpr_mode === 2) {
            if (game.smartpr_queue.length >= 1) smart_mode(3)
            else smart_mode(0)
        }
        if (game.smartpr_start) smart_mode(1)
    } else {
        document.getElementById("smart_config").style.display = "none"
    }

    if (game.perks[10]) {
        for (let i = 0; i < 15; i++) {
            game.pp_bought[i] = true
            pp_upgrade.upgrades[i].on_purchase()
        }
    } else if (game.perks[2]) {
        for (let i = 0; i < 7; i++) {
            game.pp_bought[i] = true
            pp_upgrade.upgrades[i].on_purchase()
        }
    }
}

//rebooting without getting watts
function empty_reboot() {
    reset()

    if (game.highest_level > game.reboot_highest_level) {
        game.reboot_highest_level = game.highest_level
    }
    if (game.level > game.reboot_highest_level) {
        game.reboot_highest_level = game.level
    }

    game.amp_amount = new Array(5).fill(-1)
    game.pp_amount = new Array(5).fill(-1)
    game.amp_time = new Array(5).fill(-1)
    game.amp_eff = new Array(5).fill(-1)

    game.amp = game.watt_boost
    game.pp = 0
    game.total_pp = 0
    game.pr_min = 60
    for (let i = 0; i < 39; i++) {
        game.pp_bought[i] = false
    }

    if (game.perks[18]) {
        game.true_banked_prestige += Math.floor(game.prestige / 4)
    }

    game.prestige = 0
    game.prestige_exp = new Decimal(0)
    game.highest_level = 1
    game.prestige_clicks = 0
    game.prestige_time = 0
    game.exp_add = game.amp
    if (!game.perks[10]) {
        game.autopr_mode = 0
        autopr_switch(game.autopr_mode)
    }

    game.au_boost = 1
    game.jumpstart = 0
    game.starter_kit = 0
    game.pp_power = 1

    game.exp_oc = 1
    game.exp_battery = 1
    if (game.battery_mode === 0) game.battery_charge = 1
    else game.battery_charge = 0
    game.pp_power = 1
    game.prestige_power = 1
    game.depth_power = 1
    game.patience = 1
    game.oc_state = 0
    game.oc_time = 0
    set_capacitance(0)
    game.prev_mode = 0
    game.cap_boost = 1
    game.ds_boost = 2
    if (game.perks[9]) game.ds_boost = 4
    game.stored_exp = 0
    game.flux_boost = 1
    game.flux_increase = 1
    if (game.perks[3]) game.flux_boost = 5

    game.helium = 0
    game.helium_boost = 1

    if (game.perks[1]) {
        game.generator_kit = 12
        if (game.perks[12]) game.generator_kit = 24
        game.exp_add = game.generator_kit * game.watt_boost
        game.cps = game.generator_kit
    } else game.generator_kit = 0

    if (!game.perks[2]) game.subtab[0] = 0

    document.getElementById("click").innerHTML =
        "+" + format_num(game.amp) + " EXP"

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
    document.getElementById("dis_auto").style.display = "none"
    document.getElementById("dis_text").style.display = "none"
    document.getElementById("dis_input").style.display = "none"

    if (game.perks[14]) {
        if (game.smartpr_mode === 1 || game.smartpr_mode === 2) {
            if (game.smartpr_queue.length >= 1) smart_mode(3)
            else smart_mode(0)
        }
        if (game.smartpr_start) smart_mode(1)
    }

    if (game.perks[10]) {
        for (let i = 0; i < 15; i++) {
            game.pp_bought[i] = true
            pp_upgrade.upgrades[i].on_purchase()
        }
    } else if (game.perks[2]) {
        for (let i = 0; i < 7; i++) {
            game.pp_bought[i] = true
            pp_upgrade.upgrades[i].on_purchase()
        }
    }
}

//quantum reset code
function pre_quantize() {
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

    let amount = Decimal.pow(1000, (highest_level - 65536) / 16384).floor()
    if (amount.cmp(Decimal.pow(2, 1024)) >= 0)
        amount = amount
            .div(Decimal.pow(2, 1024))
            .pow(0.5)
            .mul(Decimal.pow(2, 1024))
            .floor()

    if (total_completions >= 108 && amount.cmp(1) >= 0) {
        if (game.quantum_confirmation) {
            if (modal === "none") {
                if (modal === "none") {
                    let message = ""
                    if (game.quantum < 1) {
                        message =
                            "Are you sure you want to Quantize? This will reset ALL progress up to this point except for Perks and give you "
                    } else {
                        message =
                            "Are you sure you want to Quantize? You will gain "
                    }
                    if (amount.cmp(1) === 0 && game.notation !== 8) {
                        message += format_infinity(amount) + " photon"
                    } else {
                        message += format_infinity(amount) + " photons"
                    }

                    open_modal("confirm", message, quantize)
                }
            }
        } else {
            quantize()
        }
    }
}

function quantize() {
    let highest_level = game.reboot_highest_level
    if (game.highest_level > highest_level) highest_level = game.highest_level
    if (game.level > highest_level) highest_level = game.level

    let amount = Decimal.pow(1000, (highest_level - 65536) / 16384).floor()
    if (amount.cmp(Decimal.pow(2, 1024)) >= 0)
        amount = amount
            .div(Decimal.pow(2, 1024))
            .pow(0.5)
            .mul(Decimal.pow(2, 1024))
            .floor()

    game.quantum++
    if (pause) quantum++
    game.photons = game.photons.add(amount)
    if (!game.omega_challenge)
        game.prev_photons = Math.floor(
            1000000 ** ((highest_level - 65536) / 32768)
        )

    if (!game.achievements[120] && game.quantum >= 1) get_achievement(120)
    if (!game.achievements[121] && game.quantum >= 3) get_achievement(121)
    if (!game.achievements[122] && game.quantum >= 5) get_achievement(122)
    if (!game.achievements[123] && game.quantum >= 10) get_achievement(123)
    if (!game.achievements[124] && game.quantum >= 25) get_achievement(124)
    if (!game.achievements[139] && game.quantum >= 50) get_achievement(139)
    if (!game.achievements[140] && game.quantum >= 100) get_achievement(140)
    if (!game.achievements[160] && game.quantum >= 1000) get_achievement(160)

    if (!game.achievements[168] && game.hps === 0) get_achievement(168)

    if (!game.achievements[68] && game.blind) get_achievement(68)
    game.blind = true

    game.watts = 0
    game.watt_boost = 1

    if (!game.omega_challenge) {
        for (let i = 4; i > 0; i--) {
            game.photons_amount[i] = game.photons_amount[i - 1]
            game.photons_time[i] = game.photons_time[i - 1]
            game.photons_eff[i] = game.photons_eff[i - 1]
        }
        game.photons_amount[0] = amount
        game.photons_time[0] = game.reboot_time / game.tickspeed
        game.photons_eff[0] = game.photons_amount[0].div(game.photons_time[0])
    }

    game.watts_amount = new Array(5).fill(-1)
    game.hydrogen_amount = new Array(5).fill(-1)
    game.watts_time = new Array(5).fill(-1)
    game.watts_eff = new Array(5).fill(-1)

    game.challenge = 0
    if (!game.qu_bought[5]) {
        for (let i = 0; i < 9; i++) {
            game.completions[i] = 0
            game.ch_boost[i] = 1
        }
    }

    game.hydrogen = 0
    game.budget = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    game.core_level = [0, 0, 0, 0, 0, 0, 0, 0]
    game.core_price = [5, 15, 50, 180, 680, 2640, 10400, 41280]
    game.supply_level = 0
    game.supply_price = 80
    game.autohy_spent = 0

    game.dark_matter = new Decimal(1)
    game.dark_matter_boost = 1
    game.omega_level = 0

    if (game.reboot_time < game.fastest_quantize && game.reboot_time > 0)
        game.fastest_quantize = game.reboot_time

    if (
        !game.achievements[128] &&
        game.fastest_quantize <= game.tickspeed * 3600
    )
        get_achievement(128)
    if (
        !game.achievements[129] &&
        game.fastest_quantize <= game.tickspeed * 300
    )
        get_achievement(129)
    if (!game.achievements[136] && game.fastest_quantize <= game.tickspeed * 60)
        get_achievement(136)
    if (!game.achievements[142] && game.fastest_quantize <= game.tickspeed * 30)
        get_achievement(142)
    if (!game.achievements[147] && game.fastest_quantize <= game.tickspeed * 10)
        get_achievement(147)

    if (game.reboot_highest_level > game.all_time_highest_level)
        game.all_time_highest_level = game.reboot_highest_level

    if (game.highest_level > game.all_time_highest_level) {
        game.all_time_highest_level = game.highest_level
    }

    if (game.level > game.all_time_highest_level) {
        game.all_time_highest_level = game.level
    }

    if (game.omega_challenge) {
        game.omega_challenge = false
        if (amount.cmp(game.omega_best) === 1) {
            game.omega_best = amount
            let completion = Math.max(
                0,
                game.omega_best.div(2 * 10 ** 16).ln() / Math.log(150) + 1
            )
            if (completion >= 5)
                game.free_omega_points = Math.floor((completion / 5) ** 0.5 * 5)
            else game.free_omega_points = Math.floor(completion)
            game.op_dark_boost = 12 ** completion
            if (completion >= 5)
                game.op_dark_boost = 12 ** ((completion / 5) ** 0.75 * 5)
        }

        game.omega_points += game.free_omega_points
        if (!game.achievements[166] && game.free_omega_points >= 5)
            get_achievement(166)
    }

    empty_reboot()

    game.reboot = 0
    game.true_banked_prestige = 0
    game.reboot_exp = new Decimal(0)
    game.reboot_time = 0
    game.highest_level = 1
    game.reboot_highest_level = 1
    game.reboot_clicks = 0
}
