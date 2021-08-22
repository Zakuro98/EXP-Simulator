let game = {
    version: "2.0.200",

    total_exp: 0,
    all_time_exp: 0,
    exp_add: 1,
    level: 1,
    highest_level: 1,
    exp: 0,
    goal: 32,

    clicks: 0,
    total_clicks: 0,

    cps: 0,
    click_time: 0,

    boost_tier: 0,
    boost_level: 2,
    auto_tier: 0,
    auto_level: 5,

    prestige: 0,
    amp: 1,

    time: 0,
    all_time: 0,
    fastest_prestige: Infinity,

    tab: 0,
    tickspeed: 30,
    tick_setting: 6,
    notation: 0
}

function notation() {
    game.notation += 1
    if (game.notation >= 3) game.notation = 0

    switch (game.notation) {
        case 0: document.getElementById("notation_button").innerHTML = "LONG"; break
        case 1: document.getElementById("notation_button").innerHTML = "STANDARD"; break
        case 2: document.getElementById("notation_button").innerHTML = "SCIENTIFIC"; break
    }
}

function format_num(num) {
    let output = num.toString()
    if (num >= 1000) {
        let digits = output.length
        for (let i=digits-3; i>0; i-=3) {
            output = output.substr(0,i) + "," + output.substr(i)
        }
    } if (num >= 1000000) {
        switch (game.notation) {
            case 1:
                let order = Math.floor(Math.log10(num)/3)-1
                let one_str = ""
                let one_mod = ""
                let ten_str = ""
                if (order < 10) {
                    switch (order) {
                        case 1: one_str = "m"; break
                        case 2: one_str = "b"; break
                        case 3: one_str = "tr"; break
                        case 4: one_str = "quadr"; break
                        case 5: one_str = "quint"; break
                        case 6: one_str = "sext"; break
                        case 7: one_str = "sept"; break
                        case 8: one_str = "oct"; break
                        case 9: one_str = "non"; break
                    }
                } else {
                    switch (order % 10) {
                        case 1: one_str = "un"; break
                        case 2: one_str = "duo"; break
                        case 3: one_str = "tre"; break
                        case 4: one_str = "quattuor"; break
                        case 5: one_str = "quin"; break
                        case 6: one_str = "se"; break
                        case 7: one_str = "septe"; break
                        case 8: one_str = "octo"; break
                        case 9: one_str = "nove"; break
                    }

                    switch (Math.floor(order/10)) {
                        case 1:
                            ten_str = "dec"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "n"
                            break
                        case 2:
                            ten_str = "vigint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "m"
                            if (order % 10 == 3 || order % 10 == 6) one_mod = "s"
                            break
                        case 3:
                            ten_str = "trigint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "n"
                            if (order % 10 == 3 || order % 10 == 6) one_mod = "s"
                            break
                        case 4:
                            ten_str = "quadragint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "n"
                            if (order % 10 == 3 || order % 10 == 6) one_mod = "s"
                            break
                        case 5:
                            ten_str = "quinquagint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "n"
                            if (order % 10 == 3 || order % 10 == 6) one_mod = "s"
                            break
                        case 6:
                            ten_str = "sexagint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "n"
                            break
                        case 7:
                            ten_str = "septuagint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "n"
                            break
                        case 8:
                            ten_str = "octogint"
                            if (order % 10 == 7 || order % 10 == 9) one_mod = "m"
                            if (order % 10 == 3) one_mod = "s"
                            if (order % 10 == 6) one_mod = "x"
                            break
                        case 9: ten_str = "nonagint"; break
                    }
                }

                let lead = num/Math.pow(10,3*order+3)
                let lead_str = ""
                if (lead < 10) {
                    lead_str = lead.toFixed(3)
                } else if (lead < 100) {
                    lead_str = lead.toFixed(2)
                } else {
                    lead_str = lead.toFixed(1)
                }

                output = lead_str + " " + one_str + one_mod + ten_str + "illion"
                break
            case 2:
                let exponent = Math.floor(Math.log10(num))
                let mantissa = num/Math.pow(10,exponent)
                output = mantissa.toFixed(3) + "e" + exponent
                break
        }
    }

    return output
}

function format_time(time) {
    time /= game.tickspeed
    let output = undefined
    if (time == Infinity){
        output = "a very long time"
    } else if (time < 10) {
        output = seconds.toFixed(2) + "s"
    } else if (time < 60) {
        output = time.toFixed(1) + "s"
    } else if (time < 3600) {
        let colon = ":"
        if (time % 60 < 10) colon = ":0"
        output = Math.floor(time/60) + colon + (Math.floor(time) % 60)
    } else {
        let colon1 = ":"
        let colon2 = ":"
        if (Math.floor(time/60) % 60 < 10) colon1 = ":0"
        if (time % 60 < 10) colon2 = ":0"
        output = Math.floor(time/3600) + colon1 + (Math.floor(time/60) % 60) + colon2 + (Math.floor(time) % 60)
    }

    return output
}

function get_level(xp) {
    return Math.floor(Math.pow(27*xp/32,1/3) - 2) + 1
}

function get_exp(lvl) {
    if (lvl == 0) {
        return lvl
    } else {
        return 32/27*Math.pow(lvl+2,3)
    }
}

function get_color(num) {
    switch (num) {
        case 0: return "#0055ff"; break
        case 1: return "#00d5ff"; break
        case 2: return "#00ffd0"; break
        case 3: return "#00ff2a"; break
        case 4: return "#c5ff00"; break
        case 5: return "#ffe700"; break
        case 6: return "#ff8e00"; break
        case 7: return "#ff3200"; break
        case 8: return "#ff0066"; break
        case 9: return "#ff00df"; break
        case 10: return "#b900ff"; break
        case 11: return "#5500ff"; break
    }
}

function color_update() {
    if (game.level < 60) {
        document.getElementById("lvlnum").style.color = get_color(Math.floor(game.level/10))
        document.getElementById("progress").style.background = get_color(Math.floor(game.level/10))
    } else {
        document.getElementById("lvlnum").style.color = get_color((Math.floor(game.level/60)+5)%12)
        document.getElementById("progress").style.background = get_color((Math.floor(game.level/60)+5)%12)
    }
}

function ampbutton_update() {
    if (game.level >= 60 || game.amp > 1) {
        document.getElementById("amplifier").style.display = "block"
        document.getElementById("amp_button").style.display = "block"
    } if (game.level >= 60) {
        document.getElementById("amp_button").innerHTML = "PRESTIGE!"
        document.getElementById("amp_button").style.color = "#ffffff"
    } else {
        document.getElementById("amp_button").innerHTML = "LVL 60"
        document.getElementById("amp_button").style.color = get_color(6)
    }
}

function upgrade_update() {
    if (game.level >= 2) {
        document.getElementById("boost").style.display = "block"
        document.getElementById("boost_button").style.display = "block"
    } if (game.boost_level < 60) {
        if (game.level >= game.boost_level) {
            document.getElementById("boost_button").innerHTML = "UPGRADE!"
            document.getElementById("boost_button").style.color = "#ffffff"
        } else {
            document.getElementById("boost_button").innerHTML = "LVL " + game.boost_level
            if (game.boost_level < 60) {
                document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
            } else {
                document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("boost_button").innerHTML = "MAXED"
        document.getElementById("boost_button").style.color = "#ffffff"
    }

    if (game.level >= 5) {
        document.getElementById("auto").style.display = "block"
        document.getElementById("auto_button").style.display = "block"
    } if (game.auto_level < 60) {
        if (game.level >= game.auto_level){
            document.getElementById("auto_button").innerHTML = "UPGRADE!"
            document.getElementById("auto_button").style.color = "#ffffff"
        } else {
            document.getElementById("auto_button").innerHTML = "LVL " + game.auto_level
            if (game.auto_level < 60) {
                document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
            } else {
                document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("auto_button").innerHTML = "MAXED"
        document.getElementById("auto_button").style.color = "#ffffff"
    }

    ampbutton_update()
}

function increment(num) {
    if (game.level < 60) {
        game.total_exp += num
        game.all_time_exp += num
        if (game.total_exp <= 10) {
            game.level = 1
        } else {
            game.level = get_level(game.total_exp)
        }

        game.exp = game.total_exp - Math.ceil(get_exp(game.level-1))
        game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level-1))

        document.getElementById("progress").style.width = 100*game.exp/game.goal + "%"
    } else {
        document.getElementById("progress").style.width = 100 + "%"
    }

    color_update()
    if (game.tab == 1) upgrade_update()

    document.getElementById("lvlnum").innerHTML = format_num(game.level)
    if (game.level < 60) document.getElementById("exp").innerHTML = format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    else document.getElementById("exp").innerHTML = "Maxed!"
    document.getElementById("total_exp").innerHTML = format_num(game.total_exp) + " Total EXP"
}

function player_increment() {
    increment(game.exp_add)
    game.clicks += 1
    game.total_clicks += 1
}

function tick() {
    if (game.cps > 0) {
        game.click_time += game.cps/game.tickspeed
        if (game.click_time >= 1) {
            increment(game.exp_add*Math.floor(game.click_time))
            game.click_time -= Math.floor(game.click_time)
        }
    }

    game.time += 1
    game.all_time += 1

    if (game.tab == 2) {
        if (game.prestige <= 0) {
            if (game.level < 5) {
                document.getElementById("stat_left").innerHTML = "Current Level:<br>Current EXP:<br>Total EXP:<br><br>EXP/click:<br><br>Total Clicks:<br><br>Time Played:"
                document.getElementById("stat_right").innerHTML = "LVL " + format_num(game.level) + "<br>" + format_num(game.exp) + " / " + format_num(game.goal) + " EXP<br>" + format_num(game.total_exp) + " EXP<br><br>"  + format_num(game.exp_add) + " EXP<br><br>" + format_num(game.clicks) + "<br><br>" + format_time(game.time)
            } else {
                document.getElementById("stat_left").innerHTML = "Current Level:<br>Current EXP:<br>Total EXP:<br><br>EXP/click:<br>Autoclicking:<br><br>Total Clicks:<br><br>Time Played:"
                document.getElementById("stat_right").innerHTML = "LVL " + format_num(game.level) + "<br>" + format_num(game.exp) + " / " + format_num(game.goal) + " EXP<br>" + format_num(game.total_exp) + " EXP<br><br>"  + format_num(game.exp_add) + " EXP<br>" + format_num(game.cps) + " clicks/s<br><br>" + format_num(game.clicks) + "<br><br>" + format_time(game.time)
            }
        } else {
            document.getElementById("stat_left").innerHTML = "Current Level:<br>Highest Level:<br>Current EXP:<br>Total EXP (Current Prestige):<br>Total EXP (All Time):<br><br>EXP/click:<br>Autoclicking:<br><br>Total Clicks (Current Prestige):<br>Total Clicks (All Time):<br><br>Times Prestiged:<br>Amplifier:<br><br>Time Played (Current Prestige):<br>Fastest Prestige:<br>Time Played (All Time):"
            document.getElementById("stat_right").innerHTML = "LVL " + format_num(game.level) + "<br>LVL " + format_num(game.highest_level) + "<br>" + format_num(game.exp) + " / " + format_num(game.goal) + " EXP<br>" + format_num(game.total_exp) + " EXP<br>" + format_num(game.all_time_exp) + " EXP<br><br>"  + format_num(game.exp_add) + " EXP<br>" + format_num(game.cps) + " clicks/s<br><br>" + format_num(game.clicks) + "<br>" + format_num(game.total_clicks) + "<br><br>" + format_num(game.prestige) + "<br>" + format_num(game.amp) + " AMP<br><br>" + format_time(game.time) + "<br>" + format_time(game.fastest_prestige) + "<br>" + format_time(game.all_time)
        }
    }
}

function goto_tab(id) {
    game.tab = id

    document.getElementById("boost").style.display = "none"
    document.getElementById("boost_button").style.display = "none"
    document.getElementById("auto").style.display = "none"
    document.getElementById("auto_button").style.display = "none"
    document.getElementById("stat_left").style.display = "none"
    document.getElementById("stat_right").style.display = "none"
    document.getElementById("save_button").style.display = "none"
    document.getElementById("notation_text").style.display = "none"
    document.getElementById("notation_button").style.display = "none"
    document.getElementById("wipe_button").style.display = "none"

    switch (id) {
        case 1:
            upgrade_update()
            break
        case 2:
            document.getElementById("stat_left").style.display = "inline"
            document.getElementById("stat_right").style.display = "inline"
            break
        case 3:
            document.getElementById("save_button").style.display = "block"
            document.getElementById("notation_text").style.display = "inline"
            document.getElementById("notation_button").style.display = "inline"
            document.getElementById("wipe_button").style.display = "block"
            break
    }
}

function upgrade(id) {
    switch (id) {
        case 0:
            if (game.level < 60) {
                if (game.level >= game.boost_level) {
                    game.boost_tier += 1
                    game.boost_level += 2
                    game.exp_add = (game.boost_tier + 1)*game.amp
                    document.getElementById("boost").innerHTML = "EXP Boost <br> Tier " + format_num(game.boost_tier) + ": +" + format_num(game.exp_add) + " EXP/click"
                    document.getElementById("click").innerHTML = "+" + format_num(game.exp_add) + " EXP"
                } if (game.level < game.boost_level) {
                    document.getElementById("boost_button").innerHTML = "LVL " + format_num(game.boost_level)
                    if (game.auto_level < 60) {
                        document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
                    } else {
                        document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
                    }
                }
            } break
        case 1:
            if (game.level < 60) {
                if (game.level >= game.auto_level) {
                    game.auto_tier += 1
                    game.auto_level += 5
                    game.cps = 2*game.auto_tier
                    document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + format_num(game.auto_tier) + ": " + format_num(game.cps) + " clicks/s"
                } if (game.level < game.auto_level) {
                    document.getElementById("auto_button").innerHTML = "LVL " + format_num(game.auto_level)
                    if (game.auto_level < 60) {
                        document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
                    } else {
                        document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
                    }
                }
            } break
    }
}

function prestige() {
    game.amp += 1
    game.prestige += 1
    document.getElementById("amplifier").innerHTML = "+1 AMP<br>Current: " + format_num(game.amp) + " AMP"
    document.getElementById("amp_button").innerHTML = "LVL 60"
    document.getElementById("amp_button").style.color = get_color(6)

    document.getElementById("boost").style.display = "none"
    document.getElementById("boost_button").style.display = "none"
    document.getElementById("auto").style.display = "none"
    document.getElementById("auto_button").style.display = "none"

    game.total_exp = 0
    game.exp_add = game.amp
    if (game.level > game.highest_level) game.highest_level = game.level
    game.level = 1
    game.exp = 0
    game.goal = 32

    game.clicks = 0
    
    game.cps = 0
    game.click_time = 0
    
    game.boost_tier = 0
    game.boost_level = 2
    game.auto_tier = 0
    game.auto_level = 5

    if (game.time < game.fastest_prestige) game.fastest_prestige = game.time
    game.time = 0

    color_update()

    document.getElementById("lvlnum").innerHTML = game.level
    document.getElementById("exp").innerHTML = format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerHTML = format_num(game.total_exp) + " Total EXP"

    document.getElementById("boost").innerHTML = "EXP Boost <br> Tier " + format_num(game.boost_tier) + ": +" + format_num(game.exp_add) + " EXP/click"
    document.getElementById("boost_button").innerHTML = "UPGRADE!"
    document.getElementById("click").innerHTML = "+" + format_num(game.exp_add) + " EXP"
    document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + format_num(game.auto_tier) + ": " + format_num(game.cps) + " clicks/s"
    document.getElementById("auto_button").innerHTML = "UPGRADE!"

    document.getElementById("progress").style.width = 0 + "%"
}

function save() {
    localStorage.setItem("exp_simulator_save",JSON.stringify(game))
}

function wipe() {
    prestige()
    game.amp = 1
    game.prestige = 0
    game.all_time_exp = 0
    game.highest_level = 1
    game.total_clicks = 0
    game.all_time = 0
    game.fastest_prestige = Infinity

    save()
}

let tick_loop = window.setInterval(function() {
    tick()
}, 1000/game.tickspeed)

let savegame = JSON.parse(localStorage.getItem("exp_simulator_save"))
if (savegame !== null) {
    game = savegame
}

if (game.version !== "2.0.200"){
    game.version = "2.0.200"
    game.highest_level = game.level
    game.all_time_exp = game.total_exp
    game.clicks = 0
    game.total_clicks = 0
    game.prestige = game.amp - 1
    game.time = Infinity
    game.all_time = Infinity
    game.fastest_prestige = Infinity
    game.notation = 0
    game.tickspeed = 30
}

color_update()
ampbutton_update()
if (game.tab == 1) upgrade_update()
if (game.tab == 2) {
    document.getElementById("stat_left").style.display = "inline"
    document.getElementById("stat_right").style.display = "inline"
} if (game.tab == 3) {
    document.getElementById("save_button").style.display = "block"
    document.getElementById("notation_text").style.display = "inline"
    document.getElementById("notation_button").style.display = "inline"
    document.getElementById("tickspeed_text").style.display = "inline"
    document.getElementById("tickspeed_button").style.display = "inline"
    document.getElementById("wipe_button").style.display = "block"
    switch (game.notation) {
        case 0: document.getElementById("notation_button").innerHTML = "LONG"; break
        case 1: document.getElementById("notation_button").innerHTML = "STANDARD"; break
        case 2: document.getElementById("notation_button").innerHTML = "SCIENTIFIC"; break
    }
}

document.getElementById("amplifier").innerHTML = "+1 AMP<br>Current: " + format_num(game.amp) + " AMP"
document.getElementById("lvlnum").innerHTML = format_num(game.level)
document.getElementById("exp").innerHTML = format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
document.getElementById("total_exp").innerHTML = format_num(game.total_exp) + " Total EXP"
document.getElementById("boost").innerHTML = "EXP Boost <br> Tier " + format_num(game.boost_tier) + ": +" + format_num(game.exp_add) + " EXP/click"
document.getElementById("click").innerHTML = "+" + format_num(game.exp_add) + " EXP"
document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + format_num(game.auto_tier) + ": " + format_num(game.cps) + " clicks/s"
if (game.level < 60) {
    document.getElementById("progress").style.width = 100*game.exp/game.goal + "%"
} else {
    document.getElementById("progress").style.width = 100 + "%"
}

let save_loop = window.setInterval(function() {
    save()
}, 15000)
