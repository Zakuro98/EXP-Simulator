document.getElementById("boost").style.display = "none"
document.getElementById("boost_button").style.display = "none"
document.getElementById("auto").style.display = "none"
document.getElementById("auto_button").style.display = "none"
document.getElementById("amplifier").style.display = "none"
document.getElementById("amp_button").style.display = "none"

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
    }

    if (game.level >= 2) {
        document.getElementById("boost").style.display = "block"
        document.getElementById("boost_button").style.display = "block"
    }if (game.boost_level < 60) {
        if (game.level >= game.boost_level){
            document.getElementById("boost_button").innerHTML = "UPGRADE!"
        }else{
            document.getElementById("boost_button").innerHTML = "LVL " + game.boost_level
        }
    }else{
        document.getElementById("boost_button").innerHTML = "MAXED"
    }

    if (game.level >= 5) {
        document.getElementById("auto").style.display = "block"
        document.getElementById("auto_button").style.display = "block"
    }if (game.auto_level < 60) {
        if (game.level >= game.auto_level){
            document.getElementById("auto_button").innerHTML = "UPGRADE!"
        }else{
            document.getElementById("auto_button").innerHTML = "LVL " + game.auto_level
        }
    }else{
        document.getElementById("auto_button").innerHTML = "MAXED"
    }

    if (game.level >= 60) {
        document.getElementById("amplifier").style.display = "block"
        document.getElementById("amp_button").style.display = "block"
    }if (game.level >= 60) {
        document.getElementById("amp_button").innerHTML = "PRESTIGE!"
    }else{
        document.getElementById("amp_button").innerHTML = "LVL 60"
    }

    if (game.level < 60)
        document.getElementById("exp").innerHTML = "LVL " + game.level + "<br>" + game.exp + " / " + game.goal + " EXP"
    else
        document.getElementById("exp").innerHTML = "LVL " + game.level + "<br> Maxed!"
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
                    document.getElementById("boost").innerHTML = "<br><br>EXP Boost <br> Tier " + game.boost_tier + ": +" + game.exp_add + " EXP/click"
                    document.getElementById("click").innerHTML = "+" + game.exp_add + " EXP"
                }if (game.level < game.boost_level) {
                    document.getElementById("boost_button").innerHTML = "LVL " + game.boost_level
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
                }
            }
            break
    }
}

function prestige() {
    game.amp += 1
    document.getElementById("amplifier").innerHTML = "<br><br>+1 AMP<br>Current: " + game.amp + " AMP"
    document.getElementById("amp_button").innerHTML = "LVL 60"

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

    document.getElementById("exp").innerHTML = "LVL " + game.level + "<br>" + game.exp + " / " + game.goal + " EXP"
    document.getElementById("total_exp").innerHTML = game.total_exp + " Total EXP"

    document.getElementById("boost").innerHTML = "<br><br>EXP Boost <br> Tier " + game.boost_tier + ": +" + game.exp_add + " EXP/click"
    document.getElementById("boost_button").innerHTML = "UPGRADE!"
    document.getElementById("click").innerHTML = "+" + game.exp_add + " EXP"
    document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + game.auto_tier + ": " + game.cps + " clicks/s"
    document.getElementById("auto_button").innerHTML = "UPGRADE!"
}

var tick_loop = window.setInterval(function() {
    tick()
}, 1000/game.tickspeed)

var savegame = JSON.parse(localStorage.getItem("exp_simulator_save"))
if (savegame !== null) {
    game = savegame
}

document.getElementById("amplifier").innerHTML = "<br><br>+1 AMP<br>Current: " + game.amp + " AMP"
document.getElementById("amp_button").innerHTML = "LVL 60"
document.getElementById("exp").innerHTML = "LVL " + game.level + "<br>" + game.exp + " / " + game.goal + " EXP"
document.getElementById("total_exp").innerHTML = game.total_exp + " Total EXP"
document.getElementById("boost").innerHTML = "<br><br>EXP Boost <br> Tier " + game.boost_tier + ": +" + game.exp_add + " EXP/click"
document.getElementById("boost_button").innerHTML = "UPGRADE!"
document.getElementById("click").innerHTML = "+" + game.exp_add + " EXP"
document.getElementById("auto").innerHTML = "Autoclicker <br> Tier " + game.auto_tier + ": " + game.cps + " clicks/s"
document.getElementById("auto_button").innerHTML = "UPGRADE!"

var save_loop = window.setInterval(function() {
    localStorage.setItem("exp_simulator_save",JSON.stringify(game))
}, 15000)
