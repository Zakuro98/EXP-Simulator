//updating the color of the level bar
function color_update() {
    if (game.level < 60) {
        document.getElementById("lvlnum").style.color = get_color(
            Math.floor(game.level / 10)
        )
        document.getElementById("progress").style.background = get_color(
            Math.floor(game.level / 10)
        )
    } else {
        document.getElementById("lvlnum").style.color = get_color(
            (Math.floor(game.level / 60) + 5) % 12
        )
        document.getElementById("progress").style.background = get_color(
            (Math.floor(game.level / 60) + 5) % 12
        )
    }
}

//updating text on the exp button
function click_update() {
    if (game.fluct_tier === 0 && game.starter_kit + game.generator_kit === 0) {
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
function ampbutton_update() {
    if (game.level >= game.pr_min || game.amp > 1) {
        document.getElementById("amp_up").style.display = "inline"
        document.getElementById("pp_up").style.display = "inline"
        document.getElementById("amp_button").style.display = "inline"
        document.getElementById("amp").innerText = format_num(game.amp) + " AMP"
        document.getElementById("pp").innerText = format_num(game.pp) + " PP"
        document.getElementById("amp").style.display = "block"
        document.getElementById("pp").style.display = "block"
    }
    if (game.level >= game.pr_min) {
        document.getElementById("amp_up").style.display = "inline"
        document.getElementById("amp_up").innerText =
            "+" +
            format_num(
                Math.floor(
                    get_amp(game.level) * game.patience * game.watt_boost
                )
            ) +
            " AMP"
        if (game.prestige === 0 && game.reboot === 0)
            document.getElementById("amp_up").innerText =
                "+" +
                format_num(
                    Math.floor(
                        get_amp(game.level) * game.patience * game.watt_boost
                    )
                ) +
                " AMP (EXP Multiplier)"
        if (game.pp_bought[8])
            document.getElementById("amp_up").innerText =
                "+" +
                format_num(
                    Math.floor(
                        get_amp(game.level) * game.patience * game.watt_boost
                    )
                ) +
                " AMP +" +
                format_eff(game.amp_eff) +
                " AMP/sec"
        let pp_amount = 0
        if (game.level > game.highest_level) {
            if (game.prestige <= 21)
                pp_amount = get_pp(game.level) - get_pp(game.highest_level) + 1
            else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
        } else {
            if (game.prestige <= 21) pp_amount = 1
            else pp_amount = 0
        }
        document.getElementById("pp_up").innerText =
            "+" + format_num(pp_amount) + " PP"
        if (pp_amount >= 1 || game.notation === 8) {
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

    if (game.amp > 1) {
        document.getElementById("prestige").style.display = "inline"
    } else {
        document.getElementById("amp").style.display = "none"
        document.getElementById("pp").style.display = "none"
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
            } else {
                document.getElementById("boost_button").style.color = get_color(
                    (Math.floor(game.boost_level / 60) + 5) % 12
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
            } else {
                document.getElementById("auto_button").style.color = get_color(
                    (Math.floor(game.auto_level / 60) + 5) % 12
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
    if (game.pp_bought[0]) {
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
            } else {
                document.getElementById("fluct_button").style.color = get_color(
                    (Math.floor(game.fluct_level / 60) + 5) % 12
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
    if (game.pp_bought[5]) {
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
            } else {
                document.getElementById("fact_button").style.color = get_color(
                    (Math.floor(game.fact_level / 60) + 5) % 12
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
    if (game.pp_bought[20]) {
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
            } else {
                document.getElementById("flux_button").style.color = get_color(
                    (Math.floor(game.flux_level / 60) + 5) % 12
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
    if (game.pp_bought[25]) {
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
            if (game.flux_level < 60) {
                document.getElementById("battery_button").style.color =
                    get_color(Math.floor(game.battery_level / 10))
            } else {
                document.getElementById("battery_button").style.color =
                    get_color((Math.floor(game.battery_level / 60) + 5) % 12)
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

//updating availability of pp upgrades
function pp_update() {
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

    //spare power
    if (game.pp_bought[22]) {
        if (game.pp !== 0) {
            game.pp_power = Math.log(game.pp / 100 + 1) ** 2 + 1
        } else {
            game.pp_power = 1
        }
    }

    watts_update()

    //hiding lvl / 60 display
    if (game.pp_bought[6]) {
        document.getElementById("lvlrequirement").style.display = "none"
    } else {
        document.getElementById("lvlrequirement").style.display = "inline"
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

    if (all_pp_upgrades && game.pp >= reboot_requirement) {
        document.getElementById("reboot_button").className = "reboot_power"
        document.getElementById("watts_plus").style.display = "block"
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
        }
    } else {
        document.getElementById("reboot_button").className = "no_reboot_power"
        document.getElementById("watts_plus").style.display = "none"
    }

    //perks handling
    for (const perk of generator_perk.perks) {
        let element = perk_map.get(perk)
        let box = element.querySelector(".perk_complete")
        let text = element.querySelector(".perk_requirement")

        if (game.watts >= perk.requirement) {
            game.perks[perk.id] = true
        } else {
            game.perks[perk.id] = false
        }

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
    }

    if (game.perks[8])
        document.getElementById("battery_mode").style.display = "none"

    if (game.reboot >= 1) {
        document.getElementById("reboot_confirm").style.display = "flex"
    } else {
        document.getElementById("reboot_confirm").style.display = "none"
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
                        document.getElementById(
                            "ach_reqr" + (i + 1)
                        ).innerText = "?????"
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
    achievement.achievements[14].requirement =
        "Prestige " + format_num(10) + " times"
    achievement.achievements[15].requirement =
        "Prestige " + format_num(100) + " times"
    achievement.achievements[16].requirement =
        "Prestige " + format_num(1000) + " times"
    achievement.achievements[17].requirement =
        "Prestige " + format_num(10000) + " times"
    achievement.achievements[18].requirement =
        "Prestige " + format_num(100000) + " times"
    achievement.achievements[19].requirement =
        "Get " + format_num(10 ** 6) + " all time EXP"
    achievement.achievements[20].requirement =
        "Get " + format_num(10 ** 9) + " all time EXP"
    achievement.achievements[21].requirement =
        "Get " + format_num(10 ** 12) + " all time EXP"
    achievement.achievements[22].requirement =
        "Get " + format_num(10 ** 15) + " all time EXP"
    achievement.achievements[23].requirement =
        "Get " + format_num(10 ** 18) + " all time EXP"
    achievement.achievements[24].requirement =
        "Get " + format_num(10 ** 21) + " all time EXP"
    achievement.achievements[25].requirement =
        "Get " + format_num(10 ** 24) + " all time EXP"
    achievement.achievements[26].requirement =
        "Get " + format_num(10 ** 27) + " all time EXP"
    achievement.achievements[27].requirement =
        "Get " + format_num(10 ** 30) + " all time EXP"
    achievement.achievements[28].requirement =
        "Get " + format_num(10 ** 33) + " all time EXP"
    achievement.achievements[29].requirement =
        "Get " + format_num(10 ** 36) + " all time EXP"
    achievement.achievements[30].requirement =
        "Get " + format_num(10 ** 39) + " all time EXP"
    achievement.achievements[31].requirement =
        "Get " + format_num(10 ** 42) + " all time EXP"
    achievement.achievements[37].requirement = "Get " + format_num(100) + " AMP"
    achievement.achievements[38].requirement =
        "Get " + format_num(10000) + " AMP"
    achievement.achievements[39].requirement =
        "Get " + format_num(10 ** 6) + " AMP"
    achievement.achievements[40].requirement =
        "Get " + format_num(10 ** 8) + " AMP"
    achievement.achievements[41].requirement =
        "Get " + format_num(10 ** 10) + " AMP"
    achievement.achievements[42].requirement =
        "Get " + format_num(10 ** 12) + " AMP"
    achievement.achievements[43].requirement =
        "Get " + format_num(10 ** 14) + " AMP"
    achievement.achievements[44].requirement =
        "Get " + format_num(10 ** 16) + " AMP"
    achievement.achievements[53].requirement =
        "Buy all " + format_num(40) + " Prestige upgrades"
    achievement.achievements[54].requirement =
        "Reach " + format_num(100) + "x EXP Flux boost"
    achievement.achievements[55].requirement =
        "Reach " + format_num(30) + " clicks/s on the Autoclicker"
    achievement.achievements[56].requirement =
        "Reach " + format_num(150) + " clicks/s on the Autoclicker"
    achievement.achievements[57].requirement =
        "Reach " + format_num(1000) + " clicks/s on the Autoclicker"
    achievement.achievements[59].requirement =
        "Reboot " + format_num(3) + " times"
    achievement.achievements[60].requirement =
        "Reboot " + format_num(5) + " times"
    achievement.achievements[61].requirement =
        "Reboot " + format_num(10) + " times"
    achievement.achievements[62].requirement =
        "Reboot " + format_num(25) + " times"
    achievement.achievements[63].requirement =
        "Reboot " + format_num(50) + " times"
    achievement.achievements[71].requirement =
        "There is a " +
        format_num(1) +
        " in " +
        format_num(7777) +
        " chance every second you will get this achievement"
    achievement.achievements[75].requirement =
        "Reboot " + format_num(10) + " times while using Cancer notation"

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
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge"
        pp_map
            .get(pp_upgrade.upgrades[38])
            .querySelector(".pp_desc").innerText = pp_upgrade.upgrades[38].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +??? for every achievement completed\nAlso unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[0].desc
        generator_perk.perks[6].desc = "All Upgrades require ??? fewer levels"
        perk_map
            .get(generator_perk.perks[6])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[6].desc

        achievement.achievements[13].requirement = "Prestige ??? times"
        achievement.achievements[32].requirement = "Play for ???"
        achievement.achievements[33].requirement = "Play for ???"
        achievement.achievements[34].requirement = "Play for ???"
        achievement.achievements[35].requirement = "Play for ???"
        achievement.achievements[36].requirement = "Play for ???"
        achievement.achievements[64].requirement = "Reboot in under ???"
        achievement.achievements[65].requirement = "Reboot in under ???"
        achievement.achievements[68].requirement =
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
        generator_perk.perks[6].desc = "All Upgrades require 25% fewer levels"
        perk_map
            .get(generator_perk.perks[6])
            .querySelector(".perk_desc").innerText =
            generator_perk.perks[6].desc

        achievement.achievements[13].requirement = "Prestige 1 time"
        achievement.achievements[32].requirement = "Play for 1 hour"
        achievement.achievements[33].requirement = "Play for 6 hours"
        achievement.achievements[34].requirement = "Play for 24 hours"
        achievement.achievements[35].requirement = "Play for 72 hours"
        achievement.achievements[36].requirement = "Play for 168 hours"
        achievement.achievements[64].requirement = "Reboot in under 1 hour"
        achievement.achievements[65].requirement = "Reboot in under 10 minutes"
        achievement.achievements[68].requirement =
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
                "Unlocks 100% Capacitance mode, giving a 16x boost on Discharge"
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
                "Unlocks 100% Capacitance mode, giving a 8x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[38].desc
        }
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
}

//make all gui match the loaded save data
function regenerate_ui() {
    color_update()
    ampbutton_update()
    pp_update()
    goto_tab(game.tab)
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
    if (game.pp_progress) {
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
    } else {
        document.getElementById("epilepsy_button").innerText = "ENABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "#780e74"
        )
        document.documentElement.style.setProperty("--button_color", "white")
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

    if (game.pp_bought[39] == true) {
        document.getElementById("reboot").style.display = "inline"
        watts_update()
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
        if (game.pp_bought[6]) {
            document.getElementById("auto_config").style.display = "block"
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
            document.getElementById("auto_config").style.display = "none"
        }
    } else {
        document.getElementById("amp_auto").style.display = "none"
    }

    if (game.pp_bought[14]) {
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
            document.getElementById("oc_auto").style.display = "inline"
        } else {
            document.getElementById("oc_auto").style.display = "none"
        }
    } else {
        document.getElementById("overclock").style.display = "none"
    }

    if (game.pp_bought[32]) {
        document.getElementById("capacitor").style.display = "block"
        set_capacitance(game.cap_mode)
        if (game.perks[9]) {
            document.getElementById("dis_auto").style.display = "block"
            document.getElementById("dis_text").style.display = "block"
            document.getElementById("dis_input").style.display = "block"
            document.getElementById("dis_input").value = game.autods_goal
        }
    } else {
        document.getElementById("capacitor").style.display = "none"
    }

    if (game.pp_bought[35]) {
        document.getElementById("cap_50").style.display = "inline"
        document.getElementById("cap_disc").style.display = "inline"
        if (!game.perks[9]) {
            document.getElementById("dis_auto").style.display = "block"
            document.getElementById("dis_text").style.display = "block"
            document.getElementById("dis_input").style.display = "block"
            document.getElementById("dis_input").value = game.autods_goal
        }
    } else {
        document.getElementById("cap_50").style.display = "none"
        document.getElementById("cap_disc").style.display = "none"
    }

    if (game.pp_bought[37]) {
        document.getElementById("cap_75").style.display = "inline"
    } else {
        document.getElementById("cap_75").style.display = "none"
    }

    if (game.pp_bought[38]) {
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
        document.getElementById("autorb_block").style.display = "block"
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
}
