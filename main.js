var game = {
    total_exp: 0,
    exp_add: 1,
    level: 1,
    exp: 0,
    goal: 32,

    tickspeed: 50,
    cps: 0,
    click_time: 0,

    boost_tier: 0,
    boost_level: 2,
    auto_tier: 0,
    auto_level: 5,

    amp: 1
}
  
function get_level(xp) {
    return Math.floor(Math.pow(27*xp/32,1/3) - 2) + 1
}

function get_exp(lvl) {
    if (lvl == 0) {
        return lvl
    }else{
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
    }else{
        document.getElementById("lvlnum").style.color = get_color((Math.floor(game.level/60)+5)%12)
        document.getElementById("progress").style.background = get_color((Math.floor(game.level/60)+5)%12)
    }
}

function upgrade_update() {
    if (game.level >= 2) {
        document.getElementById("boost").style.display = "block"
        document.getElementById("boost_button").style.display = "block"
    }if (game.boost_level < 60) {
        if (game.level >= game.boost_level) {
            document.getElementById("boost_button").innerHTML = "UPGRADE!"
            document.getElementById("boost_button").style.color = "#ffffff"
        }else{
            document.getElementById("boost_button").innerHTML = "LVL " + game.boost_level
            if (game.boost_level < 60) {
                document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
            }else{
                document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
            }
        }
    }else{
        document.getElementById("boost_button").innerHTML = "MAXED"
        document.getElementById("boost_button").style.color = "#ffffff"
    }

    if (game.level >= 5) {
        document.getElementById("auto").style.display = "block"
        document.getElementById("auto_button").style.display = "block"
    }if (game.auto_level < 60) {
        if (game.level >= game.auto_level){
            document.getElementById("auto_button").innerHTML = "UPGRADE!"
            document.getElementById("auto_button").style.color = "#ffffff"
        }else{
            document.getElementById("auto_button").innerHTML = "LVL " + game.auto_level
            if (game.auto_level < 60) {
                document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
            }else{
                document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
            }
        }
    }else{
        document.getElementById("auto_button").innerHTML = "MAXED"
        document.getElementById("auto_button").style.color = "#ffffff"
    }

    if (game.level >= 60 || game.amp > 1) {
        document.getElementById("amplifier").style.display = "block"
        document.getElementById("amp_button").style.display = "block"
    }if (game.level >= 60) {
        document.getElementById("amp_button").innerHTML = "PRESTIGE!"
        document.getElementById("amp_button").style.color = "#ffffff"
    }else{
        document.getElementById("amp_button").innerHTML = "LVL 60"
        document.getElementById("amp_button").style.color = get_color(6)
    }
}

function increment(num) {
    if (game.level < 60) {
        game.total_exp += num
        if (game.total_exp <= 10) {
            game.level = 1
        }else{
            game.level = get_level(game.total_exp)
        }

        game.exp = game.total_exp - Math.ceil(get_exp(game.level-1))
        game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level-1))

        document.getElementById("progress").style.width = 100*game.exp/game.goal + "%"
    }else{
        document.getElementById("progress").style.width = 100 + "%"
    }

    color_update()
    upgrade_update()

    document.getElementById("lvlnum").innerHTML = game.level
    if (game.level < 60)
        document.getElementById("exp").innerHTML = game.exp + " / " + game.goal + " EXP"
    else
        document.getElementById("exp").innerHTML = "Maxed!"
    document.getElementById("total_exp").innerHTML = game.total_exp + " Total EXP"
}

function tick() {
    if (game.cps > 0) {
        game.click_time += game.cps/game.tickspeed
        if (game.click_time >= 1) {
            increment(game.exp_add*Math.floor(game.click_time))
            game.click_time -= Math.floor(game.click_time)
        }
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
                    document.getElementById("boost").innerHTML = "EXP Boost <br> Tier " + game.boost_tier + ": +" + game.exp_add + " EXP/click"
                    document.getElementById("click").innerHTML = "+" + game.exp_add + " EXP"
                }if (game.level < game.boost_level) {
                    document.getElementById("boost_button").innerHTML = "LVL " + game.boost_level
                    if (game.auto_level < 60) {
                        document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
                    }else{
                        document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
                    }
                }
            }

            break
        case 1:
            if (game.level < 60) {
                if (game.level >= game.auto_level) {
                    game.auto_tier += 1
                    game.auto_level += 5
                    game.cps = 2*game.auto_tier
                    document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + game.auto_tier + ": " + game.cps + " clicks/s"
                }if (game.level < game.auto_level) {
                    document.getElementById("auto_button").innerHTML = "LVL " + game.auto_level
                    if (game.auto_level < 60) {
                        document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
                    }else{
                        document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
                    }
                }
            }

            break
    }
}

function prestige() {
    game.amp += 1
    document.getElementById("amplifier").innerHTML = "+1 AMP<br>Current: " + game.amp + " AMP"
    document.getElementById("amp_button").innerHTML = "LVL 60"
    document.getElementById("amp_button").style.color = get_color(6)

    document.getElementById("boost").style.display = "none"
    document.getElementById("boost_button").style.display = "none"
    document.getElementById("auto").style.display = "none"
    document.getElementById("auto_button").style.display = "none"

    game.total_exp = 0
    game.exp_add = game.amp
    game.level = 1
    game.exp = 0
    game.goal = 32
    
    game.cps = 0
    game.click_time = 0
    
    game.boost_tier = 0
    game.boost_level = 2
    game.auto_tier = 0
    game.auto_level = 5

    color_update()

    document.getElementById("lvlnum").innerHTML = game.level
    document.getElementById("exp").innerHTML = game.exp + " / " + game.goal + " EXP"
    document.getElementById("total_exp").innerHTML = game.total_exp + " Total EXP"

    document.getElementById("boost").innerHTML = "EXP Boost <br> Tier " + game.boost_tier + ": +" + game.exp_add + " EXP/click"
    document.getElementById("boost_button").innerHTML = "UPGRADE!"
    document.getElementById("click").innerHTML = "+" + game.exp_add + " EXP"
    document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + game.auto_tier + ": " + game.cps + " clicks/s"
    document.getElementById("auto_button").innerHTML = "UPGRADE!"

    document.getElementById("progress").style.width = 0 + "%"
}

var tick_loop = window.setInterval(function() {
    tick()
}, 1000/game.tickspeed)

var savegame = JSON.parse(localStorage.getItem("exp_simulator_save"))
if (savegame !== null) {
    game = savegame
}

color_update()
upgrade_update()

document.getElementById("amplifier").innerHTML = "+1 AMP<br>Current: " + game.amp + " AMP"
document.getElementById("lvlnum").innerHTML = game.level
document.getElementById("exp").innerHTML = game.exp + " / " + game.goal + " EXP"
document.getElementById("total_exp").innerHTML = game.total_exp + " Total EXP"
document.getElementById("boost").innerHTML = "EXP Boost <br> Tier " + game.boost_tier + ": +" + game.exp_add + " EXP/click"
document.getElementById("click").innerHTML = "+" + game.exp_add + " EXP"
document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + game.auto_tier + ": " + game.cps + " clicks/s"
if (game.level < 60) {
    document.getElementById("progress").style.width = 100*game.exp/game.goal + "%"
}else{
    document.getElementById("progress").style.width = 100 + "%"
}

var save_loop = window.setInterval(function() {
    localStorage.setItem("exp_simulator_save",JSON.stringify(game))
}, 15000)
