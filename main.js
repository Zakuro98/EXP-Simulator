//initializing game variables
let game = {
    version: "2.1.200",

    //v2.0.000 variables
    total_exp: 0,
    exp_add: 1,
    level: 1,
    exp: 0,
    goal: 32,

    cps: 0,
    click_time: 0,

    boost_tier: 0,
    boost_level: 2,
    auto_tier: 0,
    auto_level: 5,

    amp: 1,

    tickspeed: 30,

    //v2.0.200 variables
    all_time_exp: 0,
    highest_level: 1,
    clicks: 0,
    total_clicks: 0,
    prestige: 0,
    time: 0,
    all_time: 0,
    fastest_prestige: 10**21,

    tab: 0,
    notation: 0,

    //v2.1.000 variables
    pp: 0,
    pp_bought: new Array(25).fill(false),
    pr_min: 60,

    ml_boost: 1,
    jumpstart: 0,
    starter_kit: 0,
    
    exp_fluct: 0,
    exp_fact: 1,

    autoup_toggle: new Array(4).fill(false),
    autopr_toggle: false,
    autopr_goal: [60, 1, 1, 0],

    fluct_tier: 0,
    fluct_level: 6,
    fact_tier: 0,
    fact_level: 15,

    //v2.1.003 variables
    pp_hide: 0,

    //v2.1.100 variables
    amp_eff: 0,
    autopr_mode: 0,
    exp_oc: 1,
    oc_state: 0,
    oc_time: 180*30,
    autooc_toggle: false,

    //v2.1.200 variables
    exp_flux: 1,
    pp_power: 1,

    flux_tier: 0,
    flux_level: 75
}

//initialize map
const pp_map = new Map()

//pp upgrade class
class pp_upgrade {
    static upgrades = []
    
    name
    desc
    price
    func
    
    //pp constructor
    constructor(name,desc,price,func) {
        this.name = name
        this.desc = desc
        this.price = price
        this.id = pp_upgrade.upgrades.length
        game.pp_bought[this.id] = false
        this.on_purchase = func

        pp_upgrade.upgrades.push(this)

        //upgrade name
        let pp_name = document.createElement("P")
        pp_name.innerText = this.name
        pp_name.className = "pp_name"
        
        //upgrade description
        let pp_desc = document.createElement("P")
        pp_desc.innerText = this.desc
        pp_desc.className = "pp_desc"

        //upgrade purchase button
        let pp_button = document.createElement("BUTTON")
        pp_button.innerText = "-" + this.price + " PP"
        pp_button.className = "pp_button pp_locked"
        pp_button.addEventListener("click",() => {
            if (game.pp >= this.price && this.can_buy() == true && game.pp_bought[this.id] == false) {
                game.pp -= this.price
                game.pp_bought[this.id] = true
                this.on_purchase()
                pp_update()
                document.getElementById("pp").innerText = format_num(game.pp) + " PP"
            }
        })

        //all text div
        let pp_text = document.createElement("DIV")
        pp_text.className = "pp_text"
        pp_text.appendChild(pp_name); pp_text.appendChild(pp_desc)

        //entire upgrade div
        let pp_block = document.createElement("DIV")
        pp_block.className = "pp_upgrade"
        pp_block.appendChild(pp_text); pp_block.appendChild(pp_button)

        //attatching upgrade to prestige page
        pp_map.set(this,pp_block)
        document.getElementById("prestige_page").appendChild(pp_block)
    }

    //whether or not the upgrade can be bought
    can_buy() {
        return true
    }
}

//child version of upgrade
class pp_upgrade_child extends pp_upgrade {
    parent

    constructor(name,desc,price,func,parent) {
        super(name,desc,price,func)
        game.pp_bought[this.id] = false
        this.parent = parent
    }

    //whether or not the upgrade can be bought
    can_buy() {
        return game.pp_bought[this.parent.id]
    }
}

//initializing pp upgrades
//exp fluctuation [0]
let fluctuation = new pp_upgrade("EXP Fluctuation","Unlocks an upgrade that gives random amounts of extra EXP on all clicks",1,function(){})
//manual labor 1 [1]
let ml1 = new pp_upgrade("Manual Labor I","Unautomated clicks are 2x stronger",1,function(){
    game.ml_boost = 2
    click_update()
})
//auto upgrade [2]
let autoupgrade = new pp_upgrade("Auto-Upgrading","Unlocks automation for all upgrades",2,function(){
    upgrade_update()
})
//auto prestige [3]
let autoprestige = new pp_upgrade_child("Auto-Prestiging","Unlocks automation for Prestige",3,function(){
    document.getElementById("amp_auto").style.display = "inline"
},autoupgrade)
//manual labor 2 [4]
let ml2 = new pp_upgrade_child("Manual Labor II","Unautomated clicks are 4x stronger",4,function(){
    game.ml_boost = 4
    click_update()
},ml1)
//exp factor [5]
new pp_upgrade_child("EXP Factor","Unlocks an upgrade that multiplies all EXP production",5,function(){},fluctuation)
//limit break [6]
let lim_break = new pp_upgrade_child("Limit Break","Breaks the limits, allowing you to go beyond LVL 60\nAlso allows Auto-Prestige configuration",5,function(){
    document.getElementById("auto_config").style.display = "block"
},autoprestige)
//jumpstart 1 [7]
let js1 = new pp_upgrade_child("Jumpstart I","All further Prestiges start at LVL 15; Prestiging now requires LVL 70",5,function(){
    game.jumpstart = 1
    game.pr_min = 70
    if (Number(document.getElementById("level_input").value) < 70) {
        document.getElementById("level_input").value = 70
    }
},lim_break)
//amp efficiency [8]
new pp_upgrade_child("AMP Efficiency","The Prestige button will now display AMP gained per second",7,function(){
    ampbutton_update()
},lim_break)
//starter kit 1 [9]
new pp_upgrade_child("Starter Kit I","+1 free tier for every upgrade",10,function(){
    game.starter_kit = 1
    game.exp_add += game.amp
    game.cps += 2
    game.exp_fluct += game.amp
    game.exp_fact++
    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(game.exp_add*game.exp_fact) + " EXP/click"
    document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier) + ": +" + format_num(game.exp_fluct*game.exp_fact) + " max extra EXP/click"
    document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fact_tier) + ": " + format_num(game.exp_fact) + "x EXP/click"
    click_update()
    upgrade_update()
},lim_break)
//jumpstart 2 [10]
let js2 = new pp_upgrade_child("Jumpstart II","All further Prestiges start at LVL 30; Prestiging now requires LVL 80",15,function(){
    game.jumpstart = 2
    game.pr_min = 80
    if (Number(document.getElementById("level_input").value) < 80) {
        document.getElementById("level_input").value = 80
    }
},js1)
//manual labor 3 [11]
let ml3 = new pp_upgrade_child("Manual Labor III","Unautomated clicks are 8x stronger",20,function(){
    game.ml_boost = 8
    click_update()
},ml2)
//advanced auto prestige [12]
new pp_upgrade_child("Advanced Auto-Prestiging","Unlocks three additional modes for Auto-Prestige configuration",30,function(){
    document.getElementById("auto_mode").style.display = "block"
},lim_break)
//jumpstart 3 [13]
let js3 = new pp_upgrade_child("Jumpstart III","All further Prestiges start at LVL 60; Prestiging now requires LVL 90",45,function(){
    game.jumpstart = 3
    game.pr_min = 90
    if (Number(document.getElementById("level_input").value) < 90) {
        document.getElementById("level_input").value = 90
    }
},js2)
//exp overclocker [14]
let oc = new pp_upgrade_child("EXP Overclocker","Unlocks the EXP Overclocker, which boosts EXP 3x for a short time",50,function(){
    document.getElementById("overclock").style.display = "block"
},lim_break)
//true randomness [15]
new pp_upgrade_child("True Randomness","EXP Fluctuation is twice as strong",75,function(){
    game.exp_fluct *= 2
},oc)
//auto overclock [16]
new pp_upgrade_child("Auto-Overclocking","Unlocks an automator that will automatically activate EXP Overclock when its cooldown is over",100,function(){
    document.getElementById("oc_auto").style.display = "inline"
},oc)
//manual labor 4 [17]
let ml4 = new pp_upgrade_child("Manual Labor IV","Unautomated clicks are 16x stronger",120,function(){
    game.ml_boost = 16
    click_update()
},ml3)
//starter kit 2 [18]
new pp_upgrade_child("Starter Kit II","+2 free tiers for every upgrade",135,function(){
    game.starter_kit = 2
    game.exp_add += game.amp
    game.cps += 2
    game.exp_fluct += game.amp
    game.exp_fact++
    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(game.exp_add*game.exp_fact) + " EXP/click"
    document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier) + ": +" + format_num(game.exp_fluct*game.exp_fact) + " max extra EXP/click"
    document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fact_tier) + ": " + format_num(game.exp_fact) + "x EXP/click"
    click_update()
    upgrade_update()
},oc)
//extra cycles 1 [19]
let ec1 = new pp_upgrade_child("Extra Cycles I","EXP Overclocker now boosts EXP 4x",150,function(){},oc)
//exp flux [20]
let flux = new pp_upgrade_child("EXP Flux","Unlocks an upgrade that generates a boost to EXP production, increasing over time",200,function(){},oc)
//stretched time [21]
new pp_upgrade_child("Stretched Time","EXP Overclocker now stays active twice as long",300,function(){},flux)
//pp power [22]
new pp_upgrade_child("Spare Power","EXP production is boosted based on how much spare PP you have",450,function(){},flux)
//extra cycles 2 [23]
let ec2 = new pp_upgrade_child("Extra Cycles II","EXP Overclocker now boosts EXP 5x",600,function(){},ec1)
//manual labor 5 [24]
new pp_upgrade_child("Manual Labor V","Unautomated clicks are boosted a further +16% for every Autoclicker tier\n(Currently: 16x)",840,function(){
    game.ml_boost = 16 + game.cps * 0.08
    pp_upgrade.upgrades[24].desc = "Unautomated clicks are boosted a further +16% for every Autoclicker tier\n(Currently: " + format_eff(16+game.cps*0.08) + "x)"
    pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerText = pp_upgrade.upgrades[24].desc
    click_update()
},ml4)
//done initializing pp upgrades

//notation switching
function notation() {
    game.notation += 1
    if (game.notation >= 5) game.notation = 0
    pp_update()
    switch (game.notation) {
        case 0: document.getElementById("notation_button").innerText = "LONG"; break
        case 1: document.getElementById("notation_button").innerText = "STANDARD"; break
        case 2: document.getElementById("notation_button").innerText = "SCIENTIFIC"; break
        case 3: document.getElementById("notation_button").innerText = "ENGINEERING"; break
        case 4: document.getElementById("notation_button").innerText = "CONDENSED"; break
    }
}

//hidden purchased pp upgrades toggle
function pp_hidden() {
    game.pp_hide += 1
    if (game.pp_hide >= 3) game.pp_hide = 0
    pp_update()
    switch (game.pp_hide) {
        case 0: document.getElementById("hidden_button").innerText = "SHOW ALL"; break
        case 1: document.getElementById("hidden_button").innerText = "SHOW IMPORTANT"; break
        case 2: document.getElementById("hidden_button").innerText = "HIDE BOUGHT"; break
    }
}

//number formatting
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
                const single_array = ["", "m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non"]
                const one_array = ["", "un", "duo", "tre", "quattuor", "quin", "se", "septe", "octo", "nove"]
                const ten_array = ["", "dec", "vigint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octagint", "nonagint"]
            
                let order = Math.floor(Math.log10(num)/3)-1
                let one_str = ""
                let one_mod = ""
                let ten_str = ""
                if (order < 10) {
                    one_str = single_array[order]
                } else {
                    one_str = one_array[order % 10]
                    ten_str = ten_array[Math.floor(order/10)]

                    const r_order = Math.floor(order / 10)
                    if ((order % 10 === 7 || order % 10 === 9) && r_order !== 9)
                    if (r_order === 2 || r_order === 8) one_mod = "m"
                    else one_mod = "n"
                    if ((order % 10 === 3 || order % 10 === 6) && ((r_order >= 2 && r_order <= 5) || r_order === 8)) one_mod = "s"
                    if (order % 10 === 6 && r_order === 8) one_mod = "x"
                }

                let lead = num/(10**(3*order+3))
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
                let mantissa = num/(10**exponent)
                output = mantissa.toFixed(3) + "e" + exponent
                break
            case 3:
                let exponent2 = Math.floor(Math.log10(num)/3)*3
                let mantissa2 = num/(10**exponent2)
                if (mantissa2 < 10) {
                    output = mantissa2.toFixed(3) + "e" + exponent2
                } else if (mantissa2 < 100) {
                    output = mantissa2.toFixed(2) + "e" + exponent2
                } else {
                    output = mantissa2.toFixed(1) + "e" + exponent2
                }
                break
            case 4:
                const single_array_cond = ["", "M", "B", "T", "Qa", "Qn", "Se", "Sp", "Oc", "No"]
                const one_array_cond = ["", "U", "D", "T", "Qa", "Qn", "Se", "Sp", "O", "N"]
                const ten_array_cond = ["", "Dc", "Vg", "Tg", "Qg", "Qi", "Sx", "Sg", "Og", "Ng"]
            
                let order2 = Math.floor(Math.log10(num)/3)-1
                let one_str2 = ""
                let ten_str2 = ""
                if (order2 < 10) {
                    one_str2 = single_array_cond[order2]
                } else {
                    one_str2 = one_array_cond[order2 % 10]
                    ten_str2 = ten_array_cond[Math.floor(order2/10)]
                }

                let lead2 = num/(10**(3*order2+3))
                let lead_str2 = ""
                if (lead2 < 10) {
                    lead_str2 = lead2.toFixed(3)
                } else if (lead2 < 100) {
                    lead_str2 = lead2.toFixed(2)
                } else {
                    lead_str2 = lead2.toFixed(1)
                }

                output = lead_str2 + one_str2 + ten_str2
                break
        }
    }

    return output
}

//special amp/sec formatting
function format_eff(num) {
    if (num >= 100) {
        return format_num(Math.round(num))
    } else if (num >= 10) {
        return num.toFixed(1)
    } else if (num >= 1) {
        return num.toFixed(2)
    } else {
        return num.toFixed(3)
    }
}

//time formatting
function format_time(input) {
    var time = input/game.tickspeed
    let output = undefined
    if (time >= 10**20/game.tickspeed){
        output = "a very long time"
    } else if (time < 10) {
        output = time.toFixed(2) + "s"
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

//get level based on total exp
function get_level(xp) {
    let a = 32/27*61**3
    let b = 119072*61**(1/2)/(15*135**(1/4))
    let c = (27*b/32)**(1/5)
    let d = 32/27*(240+c)**5+a-b
    let e = (2**(16/11)*5**(13/11)*(d-a+b)**(52/55))/(3**(9/55)*13**(13/11))
    let f = (27*e/32)**(2/13)
    let g = 32/27*(1020+f)**6.5+d-e
    let h = (13**(8/7)*(g-d+e)**(88/91))/(2**(401/91)*3**(9/91))
    let i = (27*h/32)**(1/8)
    if (xp < a) {
        return Math.floor((27*xp/32)**(1/3) - 1)
    } else if (xp < d) {
        return Math.floor((27*(xp+b-a)/32)**(1/5)+60-c)
    } else if (xp < g) {
        return Math.floor((27*(xp+e-d)/32)**(2/13)+300-f)
    } else {
        return Math.floor((27*(xp+h-g)/32)**(1/8)+1320-i)
    }
}

//get total exp based on level
function get_exp(lvl) {
    let a = 32/27*61**3
    let b = 119072*61**(1/2)/(15*135**(1/4))
    let c = (27*b/32)**(1/5)
    let d = 32/27*(240+c)**5+a-b
    let e = (2**(16/11)*5**(13/11)*(d-a+b)**(52/55))/(3**(9/55)*13**(13/11))
    let f = (27*e/32)**(2/13)
    let g = 32/27*(1020+f)**6.5+d-e
    let h = (13**(8/7)*(g-d+e)**(88/91))/(2**(401/91)*3**(9/91))
    let i = (27*h/32)**(1/8)
    if (lvl == 0) {
        return lvl
    } else {
        if (lvl < 60){
            return 32/27*(lvl+2)**3
        } else if (lvl < 300) {
            return 32/27*(lvl-59+c)**5+a-b
        } else if (lvl < 1320) {
            return 32/27*(lvl-299+f)**6.5+d-e
        } else {
            return 32/27*(lvl-1319+i)**8+g-h
        }
    }
}

//get amp based on level
function get_amp(lvl) {
    if (lvl >= 60) {
        return Math.floor(((lvl-40)/20)**3)
    } else {
        return 0
    }
}

//get pp based on level
function get_pp(lvl) {
    if (lvl >= 60) {
        return Math.floor(((lvl-40)/20)**2-1)
    } else {
        return 0
    }
}

//getting level colors
const colors = ["#0055ff","#00d5ff","#00ffd0","#00ff2a","#c5ff00","#ffe700","#ff8e00","#ff3200","#ff0066","#ff00df","#b900ff","#5500ff"]
function get_color(num) {
    return colors[num]
}

//updating the color of the level bar
function color_update() {
    if (game.level < 60) {
        document.getElementById("lvlnum").style.color = get_color(Math.floor(game.level/10))
        document.getElementById("progress").style.background = get_color(Math.floor(game.level/10))
    } else {
        document.getElementById("lvlnum").style.color = get_color((Math.floor(game.level/60)+5)%12)
        document.getElementById("progress").style.background = get_color((Math.floor(game.level/60)+5)%12)
    }
}

//updating text on the exp button
function click_update() {
    if (game.fluct_tier == 0 && game.starter_kit == 0) {
        document.getElementById("click").innerText = "+" + format_num(Math.round(game.exp_add*game.ml_boost*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP"
    } else if (game.fluct_tier >= 1 || game.starter_kit >= 1) {
        document.getElementById("click").innerText = "+" + format_num(Math.round(game.exp_add*game.ml_boost*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " - " + format_num(Math.round((game.exp_add+game.exp_fluct)*game.ml_boost*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP"
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
    } if (game.level >= game.pr_min) {
        document.getElementById("amp_up").style.display = "inline"
        document.getElementById("amp_up").innerText = "+" + format_num(get_amp(game.level)) + " AMP"
        if (game.pp_bought[8] == true) document.getElementById("amp_up").innerText = "+" + format_num(get_amp(game.level)) + " AMP +" + format_eff(game.amp_eff) + " AMP/sec"
        let pp_amount = 0
        if (game.prestige <= 21) pp_amount += 1 
        if (game.level > game.highest_level) pp_amount += get_pp(game.level) - get_pp(game.highest_level)
        document.getElementById("pp_up").innerText = "+" + format_num(pp_amount) + " PP"
        if (pp_amount >= 1) {
            document.getElementById("pp_up").style.display = "inline"
        } else {
            document.getElementById("pp_up").style.display = "none"
        }
        document.getElementById("amp_button").innerText = "PRESTIGE!"
        document.getElementById("amp_button").style.color = "white"
    } else {
        document.getElementById("amp_up").style.display = "none"
        document.getElementById("pp_up").style.display = "none"
        document.getElementById("amp_button").innerText = "LVL " + game.pr_min
        document.getElementById("amp_button").style.color = get_color((Math.floor(game.pr_min/60)+5)%12)
    }

    if (game.amp > 1) {
        document.getElementById("prestige").style.display = "inline"
        document.getElementById("hidden").style.display = "flex"
    } else {
        document.getElementById("amp").style.display = "none"
        document.getElementById("pp").style.display = "none"
    }
}


//updating whether or not upgrades are visible
//and updating the button text/color
function upgrade_update() {
    //exp boost
    if (game.level >= 2 || game.starter_kit >= 1) {
        document.getElementById("boost").style.display = "block"
        document.getElementById("boost_button").style.display = "inline"
        if (game.pp_bought[2] == true) document.getElementById("boost_auto").style.display = "inline"
    } if (game.boost_level < game.pr_min || game.pp_bought[6] == true) {
        if (game.level >= game.boost_level) {
            document.getElementById("boost_button").innerText = "UPGRADE!"
            document.getElementById("boost_button").style.color = "#ffffff"
        } else {
            document.getElementById("boost_button").innerText = "LVL " + format_num(game.boost_level)
            if (game.boost_level < 60) {
                document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
            } else {
                document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("boost_button").innerText = "MAXED"
        document.getElementById("boost_button").style.color = "#ffffff"
    }

    //autoclicker
    if (game.level >= 5 || game.starter_kit >= 1) {
        document.getElementById("auto").style.display = "block"
        document.getElementById("auto_button").style.display = "inline"
        if (game.pp_bought[2] == true) document.getElementById("auto_auto").style.display = "inline"
    } if (game.auto_level < game.pr_min || game.pp_bought[6] == true) {
        if (game.level >= game.auto_level){
            document.getElementById("auto_button").innerText = "UPGRADE!"
            document.getElementById("auto_button").style.color = "#ffffff"
        } else {
            document.getElementById("auto_button").innerText = "LVL " + format_num(game.auto_level)
            if (game.auto_level < 60) {
                document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
            } else {
                document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("auto_button").innerText = "MAXED"
        document.getElementById("auto_button").style.color = "#ffffff"
    }

    //exp fluctuation
    if ((game.level >= 6 || game.starter_kit >= 1) && game.pp_bought[0] == true) {
        document.getElementById("fluct").style.display = "block"
        document.getElementById("fluct_button").style.display = "inline"
        if (game.pp_bought[2] == true) document.getElementById("fluct_auto").style.display = "inline"
    } if (game.fluct_level < game.pr_min || game.pp_bought[6] == true) {
        if (game.level >= game.fluct_level){
            document.getElementById("fluct_button").innerText = "UPGRADE!"
            document.getElementById("fluct_button").style.color = "#ffffff"
        } else {
            document.getElementById("fluct_button").innerText = "LVL " + format_num(game.fluct_level)
            if (game.fluct_level < 60) {
                document.getElementById("fluct_button").style.color = get_color(Math.floor(game.fluct_level/10))
            } else {
                document.getElementById("fluct_button").style.color = get_color((Math.floor(game.fluct_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("fluct_button").innerText = "MAXED"
        document.getElementById("fluct_button").style.color = "#ffffff"
    }

    //exp factor
    if ((game.level >= 15 || game.starter_kit >= 1) && game.pp_bought[5] == true) {
        document.getElementById("fact").style.display = "block"
        document.getElementById("fact_button").style.display = "inline"
        if (game.pp_bought[2] == true) document.getElementById("fact_auto").style.display = "inline"
    } if (game.fact_level < game.pr_min || game.pp_bought[6] == true) {
        if (game.level >= game.fact_level){
            document.getElementById("fact_button").innerText = "UPGRADE!"
            document.getElementById("fact_button").style.color = "#ffffff"
        } else {
            document.getElementById("fact_button").innerText = "LVL " + format_num(game.fact_level)
            if (game.fact_level < 60) {
                document.getElementById("fact_button").style.color = get_color(Math.floor(game.fact_level/10))
            } else {
                document.getElementById("fact_button").style.color = get_color((Math.floor(game.fact_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("fact_button").innerText = "MAXED"
        document.getElementById("fact_button").style.color = "#ffffff"
    }

    //exp flux
    if ((game.level >= 75 || game.starter_kit >= 1) && game.pp_bought[20] == true) {
        document.getElementById("flux").style.display = "block"
        document.getElementById("flux_button").style.display = "inline"
        if (game.pp_bought[2] == true) document.getElementById("flux_auto").style.display = "inline"
    } if (game.flux_level < game.pr_min || game.pp_bought[6] == true) {
        if (game.level >= game.flux_level){
            document.getElementById("flux_button").innerText = "UPGRADE!"
            document.getElementById("flux_button").style.color = "#ffffff"
        } else {
            document.getElementById("flux_button").innerText = "LVL " + format_num(game.flux_level)
            if (game.flux_level < 60) {
                document.getElementById("flux_button").style.color = get_color(Math.floor(game.flux_level/10))
            } else {
                document.getElementById("flux_button").style.color = get_color((Math.floor(game.flux_level/60)+5)%12)
            }
        }
    } else {
        document.getElementById("flux_button").innerText = "MAXED"
        document.getElementById("flux_button").style.color = "#ffffff"
    }
}

//updating availability of pp upgrades
function pp_update() {
    for (const upgrade of pp_upgrade.upgrades) {
        let element = pp_map.get(upgrade)
        let button = element.querySelector(".pp_button")
        
        if (upgrade.can_buy() == true) {
            element.style.display = "flex"
        } else {
            element.style.display = "none"
        }

        if (game.pp_bought[upgrade.id] == true) {
            button.className = "pp_button pp_bought"
            button.innerText = "PURCHASED"

            if (game.pp_hide == 2) {
                element.style.display = "none"
            } else if (game.pp_hide == 1) {
                if (upgrade.name == "EXP Flux" || upgrade.name == "Spare Power" || upgrade.name == "Manual Labor V") {
                    element.style.display = "flex"
                } else {
                    element.style.display = "none"
                }
            } else if (game.pp_hide == 0) {
                element.style.display = "flex"
            }
        } else {
            button.innerText = "-" + format_num(upgrade.price) + " PP"
            if (game.pp >= upgrade.price) {
                button.className = "pp_button pp_unlocked"
            } else {
                button.className = "pp_button pp_locked"
            }
        }
    }

    //spare power description
    if (game.pp_bought[22] == true) {
        if (game.pp != 0) {
            game.pp_power = 2*Math.log10(game.pp)+1
        } else {
            game.pp_power = 1
        }

        pp_upgrade.upgrades[22].desc = "EXP production is boosted based on how much spare PP you have\n(Currently: " + format_eff(game.pp_power) + "x)"
        pp_map.get(pp_upgrade.upgrades[22]).querySelector(".pp_desc").innerText = pp_upgrade.upgrades[22].desc
        click_update()
        document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
        document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
    }
}

//switching autoprestige modes
function autopr_switch(mode) {
    game.autopr_mode = mode

    document.getElementById("auto_level").style.display = "none"
    document.getElementById("auto_amp").style.display = "none"
    document.getElementById("auto_pp").style.display = "none"
    document.getElementById("auto_time").style.display = "none"
    
    document.getElementById("level_mode").className = "button"
    document.getElementById("amp_mode").className = "button"
    document.getElementById("pp_mode").className = "button"
    document.getElementById("time_mode").className = "button"

    switch (mode) {
        case 0:
            document.getElementById("level_mode").className = "button mode_active"
            document.getElementById("auto_level").style.display = "block"
            break
        case 1:
            document.getElementById("amp_mode").className = "button mode_active"
            document.getElementById("auto_amp").style.display = "block"
            break
        case 2:
            document.getElementById("pp_mode").className = "button mode_active"
            document.getElementById("auto_pp").style.display = "block"
            break
        case 3:
            document.getElementById("time_mode").className = "button mode_active"
            document.getElementById("auto_time").style.display = "block"
            break
    }
}

//function to increment exp and handle showing the results
function increment(num) {
    if (game.level < game.pr_min || game.pp_bought[6] == true) {
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
        if (game.pp_bought[6] == false && game.level >= game.pr_min) {
            game.all_time_exp -= game.total_exp - Math.ceil(get_exp(game.pr_min-1))
            game.total_exp = Math.ceil(get_exp(game.pr_min-1))
            game.level = game.pr_min

            game.exp = game.total_exp - Math.ceil(get_exp(game.level-1))
            game.goal = Math.ceil(get_exp(game.level) - get_exp(game.level-1))
        }
    }

    color_update()
    if (game.tab == 1) upgrade_update()
    ampbutton_update()

    document.getElementById("lvlnum").innerText = format_num(game.level)
    if (game.level < 60 || game.pp_bought[6] == true) document.getElementById("exp").innerText = format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    else document.getElementById("exp").innerText = "Maxed!"
    document.getElementById("total_exp").innerText = format_num(game.total_exp) + " Total EXP"
}

//generate random extra exp for fluctuation
function fluct_increment(max) {
    if (max == 0) {
        return 0
    } else {
        return Math.floor(Math.random()*(max+1))
    }
}

//special function for manual player clicks
function player_increment() {
    increment(Math.round((game.exp_add+fluct_increment(game.exp_fluct))*game.ml_boost*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power))
    game.clicks += 1
    game.total_clicks += 1
}

//game operations run every tick
function tick() {
    //autoclicker operation
    if (game.cps > 0) {
        game.click_time += game.cps/game.tickspeed
        if (game.click_time >= 1) {
            increment(Math.round((game.exp_add+fluct_increment(game.exp_fluct))*Math.floor(game.click_time)*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power))
            game.click_time -= Math.floor(game.click_time)
        }
    }

    //incrementing time statistics
    game.time += 1
    game.all_time += 1

    //updating statistics page
    if (game.tab == 2) {
        let exp_plus = ""
        if (game.fluct_tier == 0 && game.starter_kit == 0) {
            exp_plus = format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP"
        } else if (game.fluct_tier >= 1 || game.starter_kit >= 1) {
            exp_plus = format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " - " + format_num(Math.round((game.exp_add+game.exp_fluct)*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP"
        }

        let exp_eff = ""
        let exp_eff_stat = ""
        if (game.cps >= 10) {
            exp_eff = "\n" + format_num((game.exp_add+game.exp_fluct/2)*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power*game.cps) + " EXP/sec"
            exp_eff_stat = "\nEXP Automation Power:"
        }

        let total_boost = ""
        let total_boost_stat = ""
        if (game.pp_bought[20] == true || game.pp_bought[5] == true) {
            total_boost = "\n" + format_eff(game.amp*game.exp_fact*game.exp_flux*game.pp_power*game.exp_oc) + "x"
            total_boost_stat = "\nTotal EXP Multiplier:"
        }
        
        if (game.prestige <= 0) {
            if (game.level < 5) {
                document.getElementById("stat_left").innerText = "Current Level:\nCurrent EXP:\nTotal EXP:\n\nEXP/click:\n\nTotal Clicks:\n\nTime Played:"
                document.getElementById("stat_right").innerText = "LVL " + format_num(game.level) + "\n" + format_num(game.exp) + " / " + format_num(game.goal) + " EXP\n" + format_num(game.total_exp) + " EXP\n\n"  + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP\n\n" + format_num(game.clicks) + "\n\n" + format_time(game.time)
            } else {
                document.getElementById("stat_left").innerText = "Current Level:\nCurrent EXP:\nTotal EXP:\n\nEXP/click:\nAutoclicking:" + exp_eff_stat + "\n\nTotal Clicks:\n\nTime Played:"
                document.getElementById("stat_right").innerText = "LVL " + format_num(game.level) + "\n" + format_num(game.exp) + " / " + format_num(game.goal) + " EXP\n" + format_num(game.total_exp) + " EXP\n\n"  + exp_plus + "\n" + format_num(game.cps) + " clicks/s" + exp_eff + "\n\n" + format_num(game.clicks) + "\n\n" + format_time(game.time)
            }
        } else {
            document.getElementById("stat_left").innerText = "Current Level:\nHighest Level:\nCurrent EXP:\nTotal EXP (Current Prestige):\nTotal EXP (All Time):\n\nEXP/click:\nAutoclicking:" + exp_eff_stat + total_boost_stat + "\n\nTotal Clicks (Current Prestige):\nTotal Clicks (All Time):\n\nTimes Prestiged:\nAmplifier Points:\nPrestige Points: \n\nTime Played (Current Prestige):\nFastest Prestige:\nTime Played (All Time):"
            document.getElementById("stat_right").innerText = "LVL " + format_num(game.level) + "\nLVL " + format_num(game.highest_level) + "\n" + format_num(game.exp) + " / " + format_num(game.goal) + " EXP\n" + format_num(game.total_exp) + " EXP\n" + format_num(game.all_time_exp) + " EXP\n\n" + exp_plus + "\n" + format_num(game.cps) + " clicks/s" + exp_eff + total_boost + "\n\n" + format_num(game.clicks) + "\n" + format_num(game.total_clicks) + "\n\n" + format_num(game.prestige) + "\n" + format_num(game.amp) + " AMP\n" + format_num(game.pp) + " PP\n\n" + format_time(game.time) + "\n" + format_time(game.fastest_prestige) + "\n" + format_time(game.all_time)
        }
    }

    //upgrade automation
    for (let i = 0; i < 5; i++){
        if (game.autoup_toggle[i] == true){
            upgrade(i,true)
        }
    }

    //exp flux handling
    if (game.pp_bought[20] == true) {
        game.exp_flux += 0.0025*(game.flux_tier+game.starter_kit)/game.tickspeed
        if (game.exp_flux >= 20) game.exp_flux = 20
        pp_upgrade.upgrades[20].desc = "Unlocks an upgrade that generates a boost to EXP production, increasing over time\n(Currently: " + format_eff(game.exp_flux) + "x)"
        pp_map.get(pp_upgrade.upgrades[20]).querySelector(".pp_desc").innerText = pp_upgrade.upgrades[20].desc
        document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
        document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
    }

    //grabbing level from autoprestige level config
    document.getElementById("level_input").min = game.pr_min
    switch (game.autopr_mode) {
        case 0:
            game.autopr_goal[0] = Number(document.getElementById("level_input").value)
            if (game.autopr_goal[0] == NaN) game.autopr_goal[0] = game.pr_min
            if (game.autopr_goal[0] < game.pr_min) game.autopr_goal[0] = game.pr_min
            break
        case 1:
            game.autopr_goal[1] = Number(document.getElementById("amp_input").value)
            if (game.autopr_goal[1] == NaN) game.autopr_goal[1] = 1
            if (game.autopr_goal[1] < 1) game.autopr_goal[1] = 1
            break
        case 2:
            game.autopr_goal[2] = Number(document.getElementById("pp_input").value)
            if (game.autopr_goal[2] == NaN) game.autopr_goal[2] = 1
            if (game.autopr_goal[2] < 1) game.autopr_goal[2] = 1
            break
        case 3:
            game.autopr_goal[3] = Number(document.getElementById("time_input").value)
            if (game.autopr_goal[3] == NaN) game.autopr_goal[3] = 0
            if (game.autopr_goal[3] < 0) game.autopr_goal[3] = 0
            break
    }

    //prestige automation
    if (game.autopr_toggle == true) {
        if (game.pp_bought[6] == true) {
            switch (game.autopr_mode) {
                case 0:
                    if (game.level >= game.autopr_goal[0]) {
                        prestige()
                    } break
                case 1:
                    if (game.level >= game.pr_min && get_amp(game.level) >= game.autopr_goal[1]) {
                        prestige()
                    } break
                case 2:
                    let pp_amount = 0
                    if (game.prestige <= 21) pp_amount += 1
                    if (game.level > game.highest_level) pp_amount += get_pp(game.level) - get_pp(game.highest_level)
                    if (game.level >= game.pr_min && pp_amount >= game.autopr_goal[2]) {
                        prestige()
                    } break
                case 3:
                    if (game.level >= game.pr_min && game.time >= game.autopr_goal[3]*game.tickspeed) {
                        prestige()
                    } break
            }
        } else {
            prestige()
        }
    }

    //overclocker handling
    if (game.pp_bought[14] == true) {
        switch (game.oc_state) {
            case 0:
                game.oc_time++
                document.getElementById("oc_timer").innerText = format_time(360*game.tickspeed - game.oc_time) + " Left"
                document.getElementById("oc_progress").style.width = 100*game.oc_time/(360*game.tickspeed) + "%"
                if (game.oc_time >= 360*game.tickspeed) {
                    game.oc_time = 45*game.tickspeed
                    if (game.pp_bought[21] == true) game.oc_time = 90*game.tickspeed
                    game.oc_state = 1
                    document.getElementById("oc_button").style.display = "inline"
                    document.getElementById("oc_state").innerText = "Standby"
                    document.getElementById("oc_timer").style.display = "none"
                } break
            case 2:
                if (game.oc_time > 0) {
                    game.oc_time--
                    document.getElementById("oc_timer").innerText = format_time(game.oc_time) + " Left"
                    document.getElementById("oc_progress").style.width = 100*game.oc_time/(45*game.tickspeed) + "%"
                    if (game.pp_bought[21] == true) document.getElementById("oc_progress").style.width = 100*game.oc_time/(90*game.tickspeed) + "%"
                } else {
                    game.exp_oc = 1
                    game.oc_state = 0
                    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(game.exp_add*game.exp_fact*game.exp_oc) + " EXP/click"
                    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(game.exp_fluct*game.exp_fact*game.exp_oc) + " max extra EXP/click"
                    click_update()
                    document.getElementById("oc_state").innerText = "Recharging"
                    document.getElementById("oc_progress").style.background = "#ff2f00"
                } break
        }
    }

    //overclocker automation
    if (game.autooc_toggle == true) {
        if (game.oc_state == 1) {
            oc_activate()
        }
    }
}

//tab switching
function goto_tab(id) {
    game.tab = id

    document.getElementById("upgrades_page").style.display = "none"
    document.getElementById("prestige_page").style.display = "none"
    document.getElementById("statistics_page").style.display = "none"
    document.getElementById("settings_page").style.display = "none"

    switch (id) {
        case 1:
            document.getElementById("upgrades_page").style.display = "block"
            upgrade_update()
            break
        case 2:
            document.getElementById("statistics_page").style.display = "flex"
            break
        case 3:
            document.getElementById("settings_page").style.display = "flex"
            break
        case 4:
            document.getElementById("prestige_page").style.display = "block"
    }
}

//purchasing upgrades
//and updating the text to match
function upgrade(id,max) {
    if (max == false) {
        //single purchase
        switch (id) {
            case 0:
                //exp boost
                if (game.boost_level < game.pr_min || game.pp_bought[6] == true) {
                    if (game.level >= game.boost_level) {
                        game.boost_tier += 1
                        game.boost_level += 2
                        game.exp_add = (game.boost_tier + game.starter_kit + 1)*game.amp
                        document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
                        click_update()
                    } if (game.level < game.boost_level) {
                        document.getElementById("boost_button").innerText = "LVL " + format_num(game.boost_level)
                        if (game.auto_level < 60) {
                            document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
                        } else {
                            document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
                        }
                    }
                } break
            case 1:
                //autoclicker
                if (game.auto_level < game.pr_min || game.pp_bought[6] == true) {
                    if (game.level >= game.auto_level) {
                        game.auto_tier += 1
                        game.auto_level += 5
                        game.cps = 2*(game.auto_tier + game.starter_kit)
                        document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
                        if (game.pp_bought[24] == true) {
                            game.ml_boost = 16 + game.cps*0.08
                            pp_upgrade.upgrades[24].desc = "Unautomated clicks are boosted a further +16% for every Autoclicker tier\n(Currently: " + format_eff(16+game.cps*0.08) + "x)"
                            pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerText = pp_upgrade.upgrades[24].desc
                            click_update()
                        }
                    } if (game.level < game.auto_level) {
                        document.getElementById("auto_button").innerText = "LVL " + format_num(game.auto_level)
                        if (game.auto_level < 60) {
                            document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
                        } else {
                            document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
                        }
                    }
                } break
            case 2:
                //exp fluctuation
                if ((game.fluct_level < game.pr_min || game.pp_bought[6] == true) && game.pp_bought[0] == true) {
                    if (game.level >= game.fluct_level) {
                        game.fluct_tier += 1
                        game.fluct_level += 3
                        if (game.pp_bought[15] == false) game.exp_fluct = (game.fluct_tier+game.starter_kit)*game.amp
                        else game.exp_fluct = (game.fluct_tier+game.starter_kit)*game.amp*2
                        document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
                        click_update()
                    } if (game.level < game.fluct_level) {
                        document.getElementById("fluct_button").innerText = "LVL " + format_num(game.fluct_level)
                        if (game.fluct_level < 60) {
                            document.getElementById("fluct_button").style.color = get_color(Math.floor(game.fluct_level/10))
                        } else {
                            document.getElementById("fluct_button").style.color = get_color((Math.floor(game.fluct_level/60)+5)%12)
                        }
                    }
                } break
            case 3:
                //exp factor
                if ((game.fact_level < game.pr_min || game.pp_bought[6] == true) && game.pp_bought[5] == true) {
                    if (game.level >= game.fact_level) {
                        game.fact_tier += 1
                        if (game.fact_tier == 1) game.fact_level += 15
                        else if (game.fact_tier >= 2 && game.fact_tier <= 4) game.fact_level += 30
                        else if (game.fact_tier >= 5) game.fact_level += 60
                        game.exp_fact = game.fact_tier+game.starter_kit+1
                        document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fact_tier+game.starter_kit) + ": " + format_num(game.exp_fact) + "x EXP/click"
                        document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
                        document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
                        click_update()
                    } if (game.level < game.fact_level) {
                        document.getElementById("fact_button").innerText = "LVL " + format_num(game.fact_level)
                        if (game.fact_level < 60) {
                            document.getElementById("fact_button").style.color = get_color(Math.floor(game.fact_level/10))
                        } else {
                            document.getElementById("fact_button").style.color = get_color((Math.floor(game.fact_level/60)+5)%12)
                        }
                    }
                } break
            case 4:
                //exp flux
                if ((game.flux_level < game.pr_min || game.pp_bought[6] == true) && game.pp_bought[20] == true) {
                    if (game.level >= game.flux_level) {
                        game.flux_tier += 1
                        game.flux_level += 75
                        document.getElementById("flux").innerText = "EXP Flux\nTier " + format_num(game.flux_tier+game.starter_kit) + ": +" + format_eff((game.flux_tier+game.starter_kit)*0.15) + "x flux/min"
                    } if (game.level < game.flux_level) {
                        document.getElementById("flux_button").innerText = "LVL " + format_num(game.flux_level)
                        if (game.flux_level < 60) {
                            document.getElementById("flux_button").style.color = get_color(Math.floor(game.flux_level/10))
                        } else {
                            document.getElementById("flux_button").style.color = get_color((Math.floor(game.flux_level/60)+5)%12)
                        }
                    }
                } break
        }
    } else {
        //bulk purchase
        switch (id) {
            case 0:
                //exp boost
                if (game.boost_level < game.pr_min || game.pp_bought[6] == true) {
                    while (game.level >= game.boost_level) {
                        game.boost_tier += 1
                        game.boost_level += 2
                    }
                    game.exp_add = (game.boost_tier + game.starter_kit + 1)*game.amp
                    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
                    click_update()
                    if (game.level < game.boost_level) {
                        document.getElementById("boost_button").innerText = "LVL " + format_num(game.boost_level)
                        if (game.auto_level < 60) {
                            document.getElementById("boost_button").style.color = get_color(Math.floor(game.boost_level/10))
                        } else {
                            document.getElementById("boost_button").style.color = get_color((Math.floor(game.boost_level/60)+5)%12)
                        }
                    }
                } break
            case 1:
                //autoclicker
                if (game.auto_level < game.pr_min || game.pp_bought[6] == true) {
                    while (game.level >= game.auto_level) {
                        game.auto_tier += 1
                        game.auto_level += 5
                    }
                    game.cps = 2*(game.auto_tier + game.starter_kit)
                    document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
                    if (game.pp_bought[24] == true) {
                        game.ml_boost = 16 + game.cps*0.08
                        pp_upgrade.upgrades[24].desc = "Unautomated clicks are boosted a further +16% for every Autoclicker tier\n(Currently: " + format_eff(16+game.cps*0.08) + "x)"
                        pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerText = pp_upgrade.upgrades[24].desc
                        click_update()
                    }
                    if (game.level < game.auto_level) {
                        document.getElementById("auto_button").innerText = "LVL " + format_num(game.auto_level)
                        if (game.auto_level < 60) {
                            document.getElementById("auto_button").style.color = get_color(Math.floor(game.auto_level/10))
                        } else {
                            document.getElementById("auto_button").style.color = get_color((Math.floor(game.auto_level/60)+5)%12)
                        }
                    }
                } break
            case 2:
                //exp fluctuation
                if ((game.fluct_level < game.pr_min || game.pp_bought[6] == true) && game.pp_bought[0] == true) {
                    while (game.level >= game.fluct_level) {
                        game.fluct_tier += 1
                        game.fluct_level += 3
                    }
                    if (game.pp_bought[15] == false) game.exp_fluct = (game.fluct_tier+game.starter_kit)*game.amp
                    else game.exp_fluct = (game.fluct_tier+game.starter_kit)*game.amp*2
                    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
                    click_update()
                    if (game.level < game.fluct_level) {
                        document.getElementById("fluct_button").innerText = "LVL " + format_num(game.fluct_level)
                        if (game.fluct_level < 60) {
                            document.getElementById("fluct_button").style.color = get_color(Math.floor(game.fluct_level/10))
                        } else {
                            document.getElementById("fluct_button").style.color = get_color((Math.floor(game.fluct_level/60)+5)%12)
                        }
                    }
                } break
            case 3:
                //exp factor
                if ((game.fact_level < game.pr_min || game.pp_bought[6] == true) && game.pp_bought[5] == true) {
                    while (game.level >= game.fact_level) {
                        game.fact_tier += 1
                        if (game.fact_tier == 1) game.fact_level += 15
                        else if (game.fact_tier >= 2 && game.fact_tier <= 4) game.fact_level += 30
                        else if (game.fact_tier >= 5) game.fact_level += 60
                    }
                    game.exp_fact = game.fact_tier+game.starter_kit+1
                    document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fact_tier+game.starter_kit) + ": " + format_num(game.exp_fact) + "x EXP/click"
                    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
                    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
                    click_update()
                    if (game.level < game.fact_level) {
                        document.getElementById("fact_button").innerText = "LVL " + format_num(game.fact_level)
                        if (game.fact_level < 60) {
                            document.getElementById("fact_button").style.color = get_color(Math.floor(game.fact_level/10))
                        } else {
                            document.getElementById("fact_button").style.color = get_color((Math.floor(game.fact_level/60)+5)%12)
                        }
                    }
                } break
            case 4:
                //exp flux
                if ((game.flux_level < game.pr_min || game.pp_bought[6] == true) && game.pp_bought[20] == true) {
                    while (game.level >= game.flux_level) {
                        game.flux_tier += 1
                        game.flux_level += 75
                    }
                    document.getElementById("flux").innerText = "EXP Flux\nTier " + format_num(game.flux_tier+game.starter_kit) + ": +" + format_eff((game.flux_tier+game.starter_kit)*0.15) + "x flux/min"
                    if (game.level < game.flux_level) {
                        document.getElementById("flux_button").innerText = "LVL " + format_num(game.flux_level)
                        if (game.flux_level < 60) {
                            document.getElementById("flux_button").style.color = get_color(Math.floor(game.flux_level/10))
                        } else {
                            document.getElementById("flux_button").style.color = get_color((Math.floor(game.flux_level/60)+5)%12)
                        }
                    }
                } break
        }
    }
}

//overclocker activation
function oc_activate() {
    game.oc_state = 2
    game.exp_oc = 3
    if (game.pp_bought[19] == true) game.exp_oc = 4
    if (game.pp_bought[23] == true) game.exp_oc = 5
    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_add*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " EXP/click"
    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(Math.round(game.exp_fluct*game.exp_fact*game.exp_oc*game.exp_flux*game.pp_power)) + " max extra EXP/click"
    click_update()
    document.getElementById("oc_state").innerText = "Boosting " + game.exp_oc + "x"
    document.getElementById("oc_button").style.display = "none"
    document.getElementById("oc_timer").style.display = "block"
    document.getElementById("oc_progress").style.background = "#ff7f00"
}

//upgrade automation toggles
function up_toggle(id) {
    if (game.autoup_toggle[id] == false) {
        game.autoup_toggle[id] = true
        switch (id) {
            case 0:
                //exp boost
                document.getElementById("boost_auto").innerText = "ON"
                document.getElementById("boost_auto").style.color = "#00ff00"
                break
            case 1:
                //autoclicker
                document.getElementById("auto_auto").innerText = "ON"
                document.getElementById("auto_auto").style.color = "#00ff00"
                break
            case 2:
                //exp fluctuation
                document.getElementById("fluct_auto").innerText = "ON"
                document.getElementById("fluct_auto").style.color = "#00ff00"
                break
            case 3:
                //exp factor
                document.getElementById("fact_auto").innerText = "ON"
                document.getElementById("fact_auto").style.color = "#00ff00"
                break
            case 4:
                //exp flux
                document.getElementById("flux_auto").innerText = "ON"
                document.getElementById("flux_auto").style.color = "#00ff00"
                break
        }
    } else {
        game.autoup_toggle[id] = false
        switch (id) {
            case 0:
                //exp boost
                document.getElementById("boost_auto").innerText = "OFF"
                document.getElementById("boost_auto").style.color = "#ff0000"
                break
            case 1:
                //autoclicker
                document.getElementById("auto_auto").innerText = "OFF"
                document.getElementById("auto_auto").style.color = "#ff0000"
                break
            case 2:
                //exp fluctuation
                document.getElementById("fluct_auto").innerText = "OFF"
                document.getElementById("fluct_auto").style.color = "#ff0000"
                break
            case 3:
                //exp factor
                document.getElementById("fact_auto").innerText = "OFF"
                document.getElementById("fact_auto").style.color = "#ff0000"
                break
            case 4:
                //exp flux
                document.getElementById("flux_auto").innerText = "OFF"
                document.getElementById("flux_auto").style.color = "#ff0000"
                break
        }
    }
}

//prestige automation toggle
function pr_toggle() {
    if (game.autopr_toggle == false) {
        game.autopr_toggle = true
        document.getElementById("amp_auto").innerText = "ON"
        document.getElementById("amp_auto").style.color = "#00ff00"
    } else {
        game.autopr_toggle = false
        document.getElementById("amp_auto").innerText = "OFF"
        document.getElementById("amp_auto").style.color = "#ff0000"
    }
}

//overclock automation toggle
function oc_toggle() {
    if (game.autooc_toggle == false) {
        game.autooc_toggle = true
        document.getElementById("oc_auto").innerText = "ON"
        document.getElementById("oc_auto").style.color = "#00ff00"
    } else {
        game.autooc_toggle = false
        document.getElementById("oc_auto").innerText = "OFF"
        document.getElementById("oc_auto").style.color = "#ff0000"
    }
}

//function for handling resets of any kind
//prestige, save wiping, etc
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

    game.total_exp = 0
    game.exp_add = 1
    game.exp_fluct = 0
    game.exp_fact = 1
    game.exp_flux = 1
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
    game.fluct_tier = 0
    game.fluct_level = 6
    game.fact_tier = 0
    game.fact_level = 15
    game.flux_tier = 0
    game.flux_level = 75

    if (game.time < game.fastest_prestige) game.fastest_prestige = game.time
    game.time = 0

    color_update()
    click_update()

    document.getElementById("lvlnum").innerText = game.level
    document.getElementById("exp").innerText = format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerText = format_num(game.total_exp) + " Total EXP"

    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(game.exp_add) + " EXP/click"
    document.getElementById("boost_button").innerText = "UPGRADE!"
    document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
    document.getElementById("auto_button").innerText = "UPGRADE!"
    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(game.exp_fluct) + " max extra EXP/click"
    document.getElementById("fluct_button").innerText = "UPGRADE!"
    document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": " + format_num(game.exp_fact) + "x EXP/click"
    document.getElementById("fact_button").innerText = "UPGRADE!"
    document.getElementById("flux").innerText = "EXP Flux\nTier " + format_num(game.flux_tier+game.starter_kit) + ": +" + format_num(0.15*(game.flux_tier+game.starter_kit)) + "x flux/min"
    document.getElementById("flux_button").innerText = "UPGRADE!"

    document.getElementById("progress").style.width = 0 + "%"
}

//prestiging code
function prestige() {
    if (game.level >= game.pr_min) {
        game.prestige += 1
        game.amp += get_amp(game.level)
        if (game.prestige <= 21) game.pp += 1
        if (game.level > game.highest_level) {
            game.pp += get_pp(game.level) - get_pp(game.highest_level)
            game.highest_level = game.level
        }
        document.getElementById("amp").innerText = format_num(game.amp) + " AMP"
        document.getElementById("pp").innerText = format_num(game.pp) + " PP"

        reset()
        ampbutton_update()
        pp_update()
        
        game.exp_add = game.amp + game.starter_kit*game.amp
        if (game.pp_bought[15] == false) game.exp_fluct = game.starter_kit*game.amp
        else game.exp_fluct = game.starter_kit*game.amp*2
        game.exp_fact = 1+game.starter_kit
        click_update()
        game.cps = game.starter_kit*2
        
        if (game.pp_bought[24] == true) {
            game.ml_boost = 16
            pp_upgrade.upgrades[24].desc = "Unautomated clicks are boosted a further +16% for every Autoclicker tier\n(Currently: 16x)"
            pp_map.get(pp_upgrade.upgrades[24]).querySelector(".pp_desc").innerText = pp_upgrade.upgrades[24].desc
        }

        document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(game.exp_add) + " EXP/click"
        document.getElementById("boost_button").innerText = "UPGRADE!"
        document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
        document.getElementById("auto_button").innerText = "UPGRADE!"
        document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(game.exp_fluct) + " max extra EXP/click"
        document.getElementById("fluct_button").innerText = "UPGRADE!"
        document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": " + format_num(game.exp_fact) + "x EXP/click"
        document.getElementById("fact_button").innerText = "UPGRADE!"
        document.getElementById("flux").innerText = "EXP Flux\nTier " + format_num(game.flux_tier+game.starter_kit) + ": +" + format_num(0.15*(game.flux_tier+game.starter_kit)) + "x flux/min"
        document.getElementById("flux_button").innerText = "UPGRADE!"

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
    }
}

//calculating amp/sec
function amp_tick() {
    if (game.time > 0) game.amp_eff = get_amp(game.level)*game.tickspeed/game.time
    else game.amp_eff = get_amp(game.level)*game.tickspeed
    if (game.pp_bought[8] == true) {
        ampbutton_update()
    }
}

//saving the game
function save() {
    localStorage.setItem("exp_simulator_save",JSON.stringify(game))
}

//exporting a save file
function export_save() {
    navigator.clipboard.writeText(btoa(JSON.stringify(game)))
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
    
    if (valid_json == true) {
        if (JSON.parse(save_file) != null) {
            load(JSON.parse(save_file))
        }
    }
}

//wiping the save
function wipe() {
    if (confirm("Are you sure you want to wipe your save?\nThis will reset EVERYTHING!") == true) {
        reset()
        game.amp = 1
        game.pp = 0
        game.pr_min = 60
        for (let i=0; i<25; i++) {
            game.pp_bought[i] = false
        }

        game.prestige = 0
        game.all_time_exp = 0
        game.highest_level = 1
        game.total_clicks = 0
        game.all_time = 0
        game.fastest_prestige = 10**21

        game.ml_boost = 1
        game.jumpstart = 0
        game.starter_kit = 0
        game.pp_power = 1

        game.autopr_toggle = false
        game.autopr_goal = [60,1,1,0]
        for (let i=0; i<4; i++) {
            game.autoup_toggle[i] = false
        } for (let i=0; i<4; i++) {
            up_toggle(i)
            up_toggle(i)
        }

        game.autopr_mode = 0
        game.exp_oc = 1
        game.oc_state = 0
        game.oc_time = 180*30
        game.autooc_toggle = false

        ampbutton_update()
        click_update()

        document.getElementById("amp_up").style.display = "none"
        document.getElementById("pp_up").style.display = "none"
        document.getElementById("amp_button").style.display = "none"

        document.getElementById("boost_auto").style.display = "none"
        document.getElementById("auto_auto").style.display = "none"
        document.getElementById("fluct_auto").style.display = "none"
        document.getElementById("fact_auto").style.display = "none"
        document.getElementById("flux_auto").style.display = "none"

        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("prestige").style.display = "none"
        document.getElementById("hidden").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
        document.getElementById("auto_mode").style.display = "none"

        document.getElementById("overclock").style.display = "none"
        document.getElementById("oc_auto").style.display = "none"

        save()
    }
}

//setting up the tick loop
let tick_loop = window.setInterval(function() {
    tick()
}, 1000/game.tickspeed)

//setting up the amp/sec calculation loop
let amp_tick_loop = window.setInterval(function() {
    amp_tick()
}, 100)

//load the game
function load(save_file) {
    //version compatibility checks
    let savegame = save_file
    if (savegame !== null) {
        //v2.0.000, v2.0.100, v2.0.200
        if (savegame.version == "2.0.200" || savegame.version == undefined) {
            alert("Your save has been wiped, very sorry!\nv2.0.xxx saves are not compatible with v2.1.xxx");
        }
        //v2.1.000
        if (savegame.version == "2.1.000") {
            if (savegame.highest_level < 300) {
                game = savegame
                game.pp_hide = false
                game.amp_eff = 0
                game.autopr_mode = 0
                game.exp_oc = 1
                game.oc_state = 0
                game.oc_time = 180*game.tickspeed
                game.autopr_goal = [60,1,1,0]
                game.exp_flux = 1
                game.pp_power = 1
                game.flux_tier = 0
                game.flux_level = 75
                let old_bought = game.pp_bought
                game.pp_bought = new Array(25).fill(false)
                for (let i=0; i<=7; i++) {
                    game.pp_bought[i] = old_bought[i]
                } for (let i=9; i<=11; i++) {
                    game.pp_bought[i] = old_bought[i]
                } switch (game.jumpstart) {
                    case 0: game.pr_min = 60; break
                    case 1: game.pr_min = 70; break
                    case 2: game.pr_min = 80; break
                }
                game.version = "2.1.200"
            } else {
                alert("Your save has been wiped, very sorry!\nThere were balancing issues past LVL 300 that have now been fixed, making this wipe necessary");
            }
        }
        //v2.1.003
        if (savegame.version == "2.1.003") {
            if (savegame.highest_level < 300) {
                game = savegame
                game.amp_eff = 0
                game.autopr_mode = 0
                game.exp_oc = 1
                game.oc_state = 0
                game.oc_time = 180*game.tickspeed
                game.autopr_goal = [60,1,1,0]
                game.exp_flux = 1
                game.pp_power = 1
                game.flux_tier = 0
                game.flux_level = 75
                let old_bought = game.pp_bought
                game.pp_bought = new Array(25).fill(false)
                for (let i=0; i<=7; i++) {
                    game.pp_bought[i] = old_bought[i]
                } for (let i=9; i<=11; i++) {
                    game.pp_bought[i] = old_bought[i]
                } switch (game.jumpstart) {
                    case 0: game.pr_min = 60; break
                    case 1: game.pr_min = 70; break
                    case 2: game.pr_min = 80; break
                }
                game.version = "2.1.200"
            } else {
                alert("Your save has been wiped, very sorry!\nThere were balancing issues past LVL 300 that have now been fixed, making this wipe necessary");
            }
        }
        //v2.1.100
        if (savegame.version == "2.1.100") {
            game = savegame
            game.autopr_goal = [60,1,1,0]
            game.exp_flux = 1
            game.pp_power = 1
            game.flux_tier = 0
            game.flux_level = 75
            let old_bought = game.pp_bought
            game.pp_bought = new Array(25).fill(false)
            for (let i=0; i<=7; i++) {
                game.pp_bought[i] = old_bought[i]
            }
            game.pp_bought[8] = old_bought[10]
            game.pp_bought[9] = old_bought[9]
            for (let i=10; i<=18; i++) {
                game.pp_bought[i] = old_bought[i+1]
            } switch (game.jumpstart) {
                case 0: game.pr_min = 60; break
                case 1: game.pr_min = 70; break
                case 2: game.pr_min = 80; break
                case 3: game.pr_min = 90; break
            }
            game.version = "2.1.200"
        }
        //v2.1.102
        if (savegame.version == "2.1.102") {
            game = savegame
            game.exp_flux = 1
            game.pp_power = 1
            game.flux_tier = 0
            game.flux_level = 75
            let old_bought = game.pp_bought
            game.pp_bought = new Array(25).fill(false)
            for (let i=0; i<=7; i++) {
                game.pp_bought[i] = old_bought[i]
            }
            game.pp_bought[8] = old_bought[10]
            game.pp_bought[9] = old_bought[9]
            for (let i=10; i<=18; i++) {
                game.pp_bought[i] = old_bought[i+1]
            } switch (game.jumpstart) {
                case 0: game.pr_min = 60; break
                case 1: game.pr_min = 70; break
                case 2: game.pr_min = 80; break
                case 3: game.pr_min = 90; break
            }
            game.version = "2.1.200"
        }
        //v2.1.200
        if (savegame.version == "2.1.200") {
            game = savegame
        }
    }

    //make all gui match the loaded save data
    color_update()
    ampbutton_update()
    pp_update()
    goto_tab(game.tab)
    switch (game.notation) {
        case 0: document.getElementById("notation_button").innerText = "LONG"; break
        case 1: document.getElementById("notation_button").innerText = "STANDARD"; break
        case 2: document.getElementById("notation_button").innerText = "SCIENTIFIC"; break
        case 3: document.getElementById("notation_button").innerText = "ENGINEERING"; break
        case 4: document.getElementById("notation_button").innerText = "CONDENSED"; break
    } switch (game.pp_hide) {
        case 0: document.getElementById("hidden_button").innerText = "SHOW ALL"; break
        case 1: document.getElementById("hidden_button").innerText = "SHOW IMPORTANT"; break
        case 2: document.getElementById("hidden_button").innerText = "HIDE BOUGHT"; break
    }

    document.getElementById("lvlnum").innerText = format_num(game.level)
    document.getElementById("exp").innerText = format_num(game.exp) + " / " + format_num(game.goal) + " EXP"
    document.getElementById("total_exp").innerText = format_num(game.total_exp) + " Total EXP"
    document.getElementById("boost").innerText = "EXP Boost\nTier " + format_num(game.boost_tier+game.starter_kit) + ": +" + format_num(game.exp_add*game.exp_fact) + " EXP/click"
    document.getElementById("auto").innerText = "Autoclicker\nTier " + format_num(game.auto_tier+game.starter_kit) + ": " + format_num(game.cps) + " clicks/s"
    document.getElementById("fluct").innerText = "EXP Fluctuation\nTier " + format_num(game.fluct_tier+game.starter_kit) + ": +" + format_num(game.exp_fluct*game.exp_fact) + " max extra EXP/click"
    document.getElementById("fact").innerText = "EXP Factor\nTier " + format_num(game.fact_tier+game.starter_kit) + ": " + format_num(game.exp_fact) + "x EXP/click"
    click_update()
    for (let i=0; i<4; i++) {
        up_toggle(i)
        up_toggle(i)
    }
    pr_toggle()
    pr_toggle()
    oc_toggle()
    oc_toggle()
    if (game.level < 60) {
        document.getElementById("progress").style.width = 100*game.exp/game.goal + "%"
    } else {
        document.getElementById("progress").style.width = 100 + "%"
    }

    if (game.pp_bought[3] == true) {
        document.getElementById("amp_auto").style.display = "inline"
        if (game.pp_bought[6] == true) {
            document.getElementById("auto_config").style.display = "block"
            if (game.pp_bought[12] == true) {
                document.getElementById("auto_mode").style.display = "block"
                autopr_switch(game.autopr_mode)
            }
        }
    }

    if (game.pp_bought[14] == true) {
        document.getElementById("overclock").style.display = "block"
        switch (game.oc_state) {
            case 0:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerText = "Recharging"
                document.getElementById("oc_timer").style.display = "block"
                document.getElementById("oc_progress").style.background = "#ff2f00"
                break
            case 1:
                document.getElementById("oc_button").style.display = "inline"
                document.getElementById("oc_state").innerText = "Standby"
                document.getElementById("oc_timer").style.display = "none"
                document.getElementById("oc_progress").style.background = "#ff2f00"
                break
            case 2:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerText = "Boosting " + game.exp_oc + "x"
                document.getElementById("oc_timer").style.display = "block"
                document.getElementById("oc_progress").style.background = "#ff7f00"
                break
        }

        if (game.pp_bought[16] == true) {
            document.getElementById("oc_auto").style.display = "inline"
        }
    }

    document.getElementById("level_input").value = game.autopr_goal[0]
    document.getElementById("amp_input").value = game.autopr_goal[1]
    document.getElementById("pp_input").value = game.autopr_goal[2]
    document.getElementById("time_input").value = game.autopr_goal[3]
}

load(JSON.parse(localStorage.getItem("exp_simulator_save")))

//setting up the autosave loop
let save_loop = window.setInterval(function() {
    save()
}, 15000)
