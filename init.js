//initializing game variables
let game = {
    version: "2.2.102",

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
    auto_level: 3,

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
    fastest_prestige: 10 ** 21,

    tab: 0,
    notation: 1,

    //v2.1.000 variables
    pp: 0,
    pp_bought: new Array(40).fill(false),
    pr_min: 60,

    ml_boost: 1,
    jumpstart: 0,
    starter_kit: 0,

    exp_fluct: 0,
    exp_fact: 1,

    autoup_toggle: new Array(6).fill(false),
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
    oc_time: 180 * 30,
    autooc_toggle: false,

    //v2.1.200 variables
    exp_flux: 1,
    pp_power: 1,

    flux_tier: 0,
    flux_level: 75,

    //v2.1.300 variables
    exp_battery: 1,
    battery_mode: 0,
    patience: 1,
    prestige_power: 1,
    depth_power: 1,

    battery_tier: 0,
    battery_level: 90,

    epilepsy: true,

    //v2.1.400 variables
    cap_mode: 0,
    prev_mode: 0,
    cap_boost: 1,
    stored_exp: 0,

    global_multiplier: 1,
    flux_boost: 1,

    autods_toggle: 0,
    autods_goal: 30,

    color_mode: 0,
    custom_hue: 0,

    //v2.1.401 variables
    total_pp: 0,
    pp_progress: true,
    hotkeys: false,

    //v2.1.403 variables
    hotkey_configurations: {},

    //v2.1.405 variables
    hold_time: 0,
    mouse_time: 0,
    mouse_held: false,

    //v2.2.000 variables
    reboot: 0,
    prestige_exp: 0,
    prestige_time: 0,
    fastest_reboot: 10 ** 21,
    all_time_highest_level: 1,
    prestige_clicks: 0,

    watts: 0,
    watt_boost: 1,

    perks: new Array(16).fill(false),
    hold_time: 0,
    generator_kit: 0,
    flux_increase: 1,

    autopp_toggle: false,
    autopp_mode: 0,
    priority: new Array(39).fill(1),

    achievements: new Array(77).fill(false),
    ach_power: 1,
    achiev_page: 0,
    no_automation: true,
    blind: true,
    afk_time: 0,
    hold_notify: false,
    halfway_notify: false,
    confirmation: true,
    amp_sec_prev: 0,

    //v2.2.100 variables
    autocp_toggle: false,
    smartds_oc: false,

    smartpr_toggle: false,
    smartpr_time: 0,
    smartpr_peak: 60,
    smartpr_pp: 120,
    smartpr_mode: 0,
    smartpr_amp: 0,
    smartpr_start: 0,

    autorb_toggle: false,
    autorb_goal: 1,
    autorb_pending: false,

    cancer_reboots: 0,

    //v2.2.102 variables
    beta: false,
}

//initialize maps
const pp_map = new Map()
const perk_map = new Map()
const notif_map = new Map()

//initialize autoclick prevention
let click_time = undefined
let focus_time = undefined

//initialize pp upgrade priorities
for (let i = 0; i < 39; i++) {
    game.priority[i] = i
}

//number formatting
function format_num(num) {
    let output = num.toString()
    if (num >= 1000) {
        let digits = output.length
        if (num < 10 ** 21) {
            for (let i = digits - 3; i > 0; i -= 3) {
                output = output.substr(0, i) + "," + output.substr(i)
            }
        }
    }
    if (num >= 1000000) {
        switch (game.notation) {
            case 1:
                const single_array = [
                    "",
                    "m",
                    "b",
                    "tr",
                    "quadr",
                    "quint",
                    "sext",
                    "sept",
                    "oct",
                    "non",
                ]
                const one_array = [
                    "",
                    "un",
                    "duo",
                    "tre",
                    "quattuor",
                    "quin",
                    "se",
                    "septe",
                    "octo",
                    "nove",
                ]
                const ten_array = [
                    "",
                    "dec",
                    "vigint",
                    "trigint",
                    "quadragint",
                    "quinquagint",
                    "sexagint",
                    "septuagint",
                    "octagint",
                    "nonagint",
                    "cent",
                ]

                let order = Math.floor(Math.log10(num) / 3) - 1
                let one_str = ""
                let one_mod = ""
                let ten_str = ""
                if (order < 10) {
                    one_str = single_array[order]
                } else {
                    one_str = one_array[order % 10]
                    ten_str = ten_array[Math.floor(order / 10)]

                    const r_order = Math.floor(order / 10)
                    if ((order % 10 === 7 || order % 10 === 9) && r_order !== 9)
                        if (r_order === 2 || r_order === 8) one_mod = "m"
                        else one_mod = "n"
                    if (
                        (order % 10 === 3 || order % 10 === 6) &&
                        ((r_order >= 2 && r_order <= 5) ||
                            r_order === 8 ||
                            r_order === 10)
                    )
                        one_mod = "s"
                    if (order % 10 === 6 && (r_order === 8 || r_order === 10))
                        one_mod = "x"
                }

                let lead = num / 10 ** (3 * order + 3)
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
                let mantissa = num / 10 ** exponent
                output = mantissa.toFixed(3) + "e" + exponent
                break
            case 3:
                let exponent2 = Math.floor(Math.log10(num) / 3) * 3
                let mantissa2 = num / 10 ** exponent2
                if (mantissa2 < 10) {
                    output = mantissa2.toFixed(3) + "e" + exponent2
                } else if (mantissa2 < 100) {
                    output = mantissa2.toFixed(2) + "e" + exponent2
                } else {
                    output = mantissa2.toFixed(1) + "e" + exponent2
                }
                break
            case 4:
                const single_array_cond = [
                    "",
                    "M",
                    "B",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "Oc",
                    "No",
                ]
                const one_array_cond = [
                    "",
                    "U",
                    "D",
                    "T",
                    "Qa",
                    "Qn",
                    "Se",
                    "Sp",
                    "O",
                    "N",
                ]
                const ten_array_cond = [
                    "",
                    "Dc",
                    "Vg",
                    "Tg",
                    "Qg",
                    "Qi",
                    "Sx",
                    "Sg",
                    "Og",
                    "Ng",
                    "Ce",
                ]

                let order2 = Math.floor(Math.log10(num) / 3) - 1
                let one_str2 = ""
                let ten_str2 = ""
                if (order2 < 10) {
                    one_str2 = single_array_cond[order2]
                } else {
                    one_str2 = one_array_cond[order2 % 10]
                    ten_str2 = ten_array_cond[Math.floor(order2 / 10)]
                }

                let lead2 = num / 10 ** (3 * order2 + 3)
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
            case 5:
                let exponent3 = Math.log10(num)
                output = "e" + exponent3.toFixed(3)
                break
            case 6:
                let order3 = Math.floor(Math.log10(num) / 3) - 1
                let lead3 = num / 10 ** (3 * order3 + 3)
                let lead_str3 = ""
                if (lead3 < 10) {
                    lead_str3 = lead3.toFixed(3)
                } else if (lead3 < 100) {
                    lead_str3 = lead3.toFixed(2)
                } else {
                    lead_str3 = lead3.toFixed(1)
                }

                output = lead_str3
                order3 -= 1
                if (order3 === 0) {
                    output += "A"
                } else if (order3 > 0) {
                    let index = 0
                    for (
                        let i = Math.floor(Math.log(order3) / Math.log(26));
                        i >= 0;
                        i--
                    ) {
                        index = (Math.floor(order3 / 26 ** i) - 1) % 26
                        if (i === 0) index += 1
                        switch (index) {
                            case 0:
                                output += "A"
                                break
                            case 1:
                                output += "B"
                                break
                            case 2:
                                output += "C"
                                break
                            case 3:
                                output += "D"
                                break
                            case 4:
                                output += "E"
                                break
                            case 5:
                                output += "F"
                                break
                            case 6:
                                output += "G"
                                break
                            case 7:
                                output += "H"
                                break
                            case 8:
                                output += "I"
                                break
                            case 9:
                                output += "J"
                                break
                            case 10:
                                output += "K"
                                break
                            case 11:
                                output += "L"
                                break
                            case 12:
                                output += "M"
                                break
                            case 13:
                                output += "N"
                                break
                            case 14:
                                output += "O"
                                break
                            case 15:
                                output += "P"
                                break
                            case 16:
                                output += "Q"
                                break
                            case 17:
                                output += "R"
                                break
                            case 18:
                                output += "S"
                                break
                            case 19:
                                output += "T"
                                break
                            case 20:
                                output += "U"
                                break
                            case 21:
                                output += "V"
                                break
                            case 22:
                                output += "W"
                                break
                            case 23:
                                output += "X"
                                break
                            case 24:
                                output += "Y"
                                break
                            case 25:
                                output += "Z"
                                break
                            case 26:
                                output += "A"
                                break
                        }
                    }
                }
                break
            case 7:
                let order4 = Math.floor(Math.log10(num) / 3) - 1
                let lead4 = num / 10 ** (3 * order4 + 3)
                let lead_str4 = ""
                if (lead4 < 10) {
                    lead_str4 = lead4.toFixed(3)
                } else if (lead4 < 100) {
                    lead_str4 = lead4.toFixed(2)
                } else {
                    lead_str4 = lead4.toFixed(1)
                }

                output = lead_str4
                order4 -= 1
                if (order4 === 0) {
                    output += "😠"
                } else if (order4 > 0) {
                    let index2 = 0
                    for (
                        let i = Math.floor(Math.log(order4) / Math.log(26));
                        i >= 0;
                        i--
                    ) {
                        index2 = (Math.floor(order4 / 26 ** i) - 1) % 26
                        if (i === 0) index2 += 1
                        switch (index2) {
                            case 0:
                                output += "😠"
                                break
                            case 1:
                                output += "🎂"
                                break
                            case 2:
                                output += "🎄"
                                break
                            case 3:
                                output += "💀"
                                break
                            case 4:
                                output += "🍆"
                                break
                            case 5:
                                output += "🐱"
                                break
                            case 6:
                                output += "🌈"
                                break
                            case 7:
                                output += "💯"
                                break
                            case 8:
                                output += "🍦"
                                break
                            case 9:
                                output += "🎃"
                                break
                            case 10:
                                output += "💋"
                                break
                            case 11:
                                output += "😂"
                                break
                            case 12:
                                output += "🌙"
                                break
                            case 13:
                                output += "⛔"
                                break
                            case 14:
                                output += "🐙"
                                break
                            case 15:
                                output += "💩"
                                break
                            case 16:
                                output += "❓"
                                break
                            case 17:
                                output += "☢"
                                break
                            case 18:
                                output += "🙈"
                                break
                            case 19:
                                output += "👍"
                                break
                            case 20:
                                output += "☂"
                                break
                            case 21:
                                output += "✌"
                                break
                            case 22:
                                output += "⚠"
                                break
                            case 23:
                                output += "❌"
                                break
                            case 24:
                                output += "😋"
                                break
                            case 25:
                                output += "⚡"
                                break
                            case 26:
                                output += "😠"
                                break
                        }
                    }
                }
                break
        }
    }
    if (num === Infinity) {
        output = "Infinity"
    }
    if (game.notation === 8) {
        output = "???"
    }
    return output
}

//special amp/sec formatting
function format_eff(num) {
    if (game.notation === 8) {
        return "???"
    } else {
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
}

//time formatting
function format_time(input) {
    var time = input / game.tickspeed
    let output = undefined
    if (time >= 10 ** 20 / game.tickspeed) {
        output = "a very long time"
    } else if (time < 10) {
        output = time.toFixed(2) + "s"
    } else if (time < 60) {
        output = time.toFixed(1) + "s"
    } else if (time < 3600) {
        let colon = ":"
        if (time % 60 < 10) colon = ":0"
        output = Math.floor(time / 60) + colon + (Math.floor(time) % 60)
    } else {
        let colon1 = ":"
        let colon2 = ":"
        if (Math.floor(time / 60) % 60 < 10) colon1 = ":0"
        if (time % 60 < 10) colon2 = ":0"
        output =
            Math.floor(time / 3600) +
            colon1 +
            (Math.floor(time / 60) % 60) +
            colon2 +
            (Math.floor(time) % 60)
    }

    if (game.notation === 8) output = "???"
    return output
}

//get level based on total exp
function get_level(xp) {
    const a = (32 / 27) * 61 ** 3
    const b = (119072 * 61 ** (1 / 2)) / (15 * 135 ** (1 / 4))
    const c = ((27 * b) / 32) ** (1 / 5)
    const d = (32 / 27) * (240 + c) ** 5 + a - b
    const e =
        (2 ** (16 / 11) * 5 ** (13 / 11) * (d - a + b) ** (52 / 55)) /
        (3 ** (9 / 55) * 13 ** (13 / 11))
    const f = ((27 * e) / 32) ** (2 / 13)
    const g = (32 / 27) * (1020 + f) ** 6.5 + d - e
    const h =
        (13 ** (8 / 7) * (g - d + e) ** (88 / 91)) /
        (2 ** (401 / 91) * 3 ** (9 / 91))
    const i = ((27 * h) / 32) ** (1 / 8)
    const j = (32 / 27) * (2880 + i) ** 8 + g - h
    const k = (2 ** (221 / 64) * (j - g + h) ** (63 / 64)) / 3 ** (147 / 64)
    const l = ((27 * k) / 32) ** (1 / 9)
    const m = (32 / 27) * (7800 + l) ** 9 + j - k
    const n = (3 * (m - j + k) ** (32 / 33)) / 2 ** (67 / 33)
    const o = ((27 * n) / 32) ** (1 / 12)

    if (xp < a) {
        return Math.floor(((27 * xp) / 32) ** (1 / 3) - 1)
    } else if (xp < d) {
        return Math.floor(((27 * (xp + b - a)) / 32) ** (1 / 5) + 60 - c)
    } else if (xp < g) {
        return Math.floor(((27 * (xp + e - d)) / 32) ** (2 / 13) + 300 - f)
    } else if (xp < j) {
        return Math.floor(((27 * (xp + h - g)) / 32) ** (1 / 8) + 1320 - i)
    } else if (xp < m) {
        return Math.floor(((27 * (xp + k - j)) / 32) ** (1 / 9) + 4200 - l)
    } else {
        return Math.floor(((27 * (xp + n - m)) / 32) ** (1 / 12) + 12000 - o)
    }
}

//get total exp based on level
function get_exp(lvl) {
    const a = (32 / 27) * 61 ** 3
    const b = (119072 * 61 ** (1 / 2)) / (15 * 135 ** (1 / 4))
    const c = ((27 * b) / 32) ** (1 / 5)
    const d = (32 / 27) * (240 + c) ** 5 + a - b
    const e =
        (2 ** (16 / 11) * 5 ** (13 / 11) * (d - a + b) ** (52 / 55)) /
        (3 ** (9 / 55) * 13 ** (13 / 11))
    const f = ((27 * e) / 32) ** (2 / 13)
    const g = (32 / 27) * (1020 + f) ** 6.5 + d - e
    const h =
        (13 ** (8 / 7) * (g - d + e) ** (88 / 91)) /
        (2 ** (401 / 91) * 3 ** (9 / 91))
    const i = ((27 * h) / 32) ** (1 / 8)
    const j = (32 / 27) * (2880 + i) ** 8 + g - h
    const k = (2 ** (221 / 64) * (j - g + h) ** (63 / 64)) / 3 ** (147 / 64)
    const l = ((27 * k) / 32) ** (1 / 9)
    const m = (32 / 27) * (7800 + l) ** 9 + j - k
    const n = (3 * (m - j + k) ** (32 / 33)) / 2 ** (67 / 33)
    const o = ((27 * n) / 32) ** (1 / 12)

    if (lvl === 0) {
        return lvl
    } else {
        if (lvl < 60) {
            return (32 / 27) * (lvl + 2) ** 3
        } else if (lvl < 300) {
            return (32 / 27) * (lvl - 59 + c) ** 5 + a - b
        } else if (lvl < 1320) {
            return (32 / 27) * (lvl - 299 + f) ** 6.5 + d - e
        } else if (lvl < 4200) {
            return (32 / 27) * (lvl - 1319 + i) ** 8 + g - h
        } else if (lvl < 12000) {
            return (32 / 27) * (lvl - 4199 + l) ** 9 + j - k
        } else {
            return (32 / 27) * (lvl - 11999 + o) ** 12 + m - n
        }
    }
}

//get amp based on level
function get_amp(lvl) {
    if (lvl >= 60) {
        return Math.floor(((lvl - 40) / 20) ** 3)
    } else {
        return 0
    }
}

//get pp based on level
function get_pp(lvl) {
    if (lvl >= 60) {
        return Math.floor(((lvl - 40) / 20) ** 2 - 1)
    } else {
        return 0
    }
}

//get watts based on pp
function get_watts(pp) {
    if (pp < 200000) {
        return 0
    } else {
        return Math.floor(((pp - 185000) / 15000) ** 0.85)
    }
}

//getting level colors
const colors = [
    "#0055ff",
    "#00d5ff",
    "#00ffd0",
    "#00ff2a",
    "#c5ff00",
    "#ffe700",
    "#ff8e00",
    "#ff3200",
    "#ff0066",
    "#ff00df",
    "#b900ff",
    "#5500ff",
]
function get_color(num) {
    let color = "#0055ff"
    switch (game.color_mode) {
        case 0:
            color = colors[num]
            break
        case 1:
            color =
                "hsl(" +
                (((game.all_time * 36) / game.tickspeed) % 360) +
                ",100%,50%)"
            break
        case 2:
            color = "hsl(" + game.custom_hue + ",100%,50%)"
            break
    }

    if (game.notation === 8) color = colors[0]
    return color
}

//pp upgrade class
class pp_upgrade {
    static upgrades = []

    name
    desc
    price
    func

    //pp constructor
    constructor(name, desc, price, func) {
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
        pp_button.addEventListener("click", () => {
            if (
                game.pp >= this.price &&
                this.can_buy() &&
                game.pp_bought[this.id] === false
            ) {
                game.pp -= this.price
                game.pp_bought[this.id] = true
                this.on_purchase()
                pp_update()
                document.getElementById("pp").innerText =
                    format_num(game.pp) + " PP"
            }
        })

        //upgrade priority
        let pp_priority = document.createElement("DIV")
        pp_priority.className = "pp_priority"
        let priority_text = document.createElement("P")
        priority_text.innerText = "Priority:"
        priority_text.className = "priority_text"
        priority_text.style.display = "inline"
        let priority_input = document.createElement("INPUT")
        priority_input.setAttribute("type", "number")
        priority_input.defaultValue = this.id + 1
        priority_input.min = 0
        priority_input.max = 999
        priority_input.className = "priority_input"
        priority_input.style.display = "inline"
        pp_priority.appendChild(priority_text)
        pp_priority.appendChild(priority_input)

        //all text div
        let pp_text = document.createElement("DIV")
        pp_text.className = "pp_text"
        pp_text.appendChild(pp_name)
        pp_text.appendChild(pp_desc)
        pp_text.appendChild(pp_priority)

        //entire upgrade div
        let pp_block = document.createElement("DIV")
        pp_block.className = "pp_upgrade"
        pp_block.appendChild(pp_text)
        pp_block.appendChild(pp_button)

        //attatching upgrade to prestige page
        pp_map.set(this, pp_block)
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

    constructor(name, desc, price, func, parent) {
        super(name, desc, price, func)
        game.pp_bought[this.id] = false
        this.parent = parent
    }

    //whether or not the upgrade can be bought
    can_buy() {
        return game.pp_bought[this.parent.id]
    }
}

//initializing pp upgrades
{
    //exp fluctuation [0]
    let fluctuation = new pp_upgrade(
        "EXP Fluctuation",
        "Unlocks an upgrade that gives random amounts of extra EXP on all clicks",
        1,
        function () {
            if (!game.achievements[43]) get_achievement(43)
        }
    )
    //manual labor 1 [1]
    let ml1 = new pp_upgrade(
        "Manual Labor I",
        "Unautomated clicks are 2x stronger",
        1,
        function () {
            game.ml_boost = 2
        }
    )
    //auto upgrade [2]
    let autoupgrade = new pp_upgrade(
        "Auto-Upgrading",
        "Unlocks automation for all upgrades",
        2,
        function () {}
    )
    //auto prestige [3]
    let autoprestige = new pp_upgrade_child(
        "Auto-Prestiging",
        "Unlocks automation for Prestige",
        3,
        function () {
            document.getElementById("amp_auto").style.display = "inline"
        },
        autoupgrade
    )
    //manual labor 2 [4]
    let ml2 = new pp_upgrade_child(
        "Manual Labor II",
        "Unautomated clicks are 4x stronger",
        4,
        function () {
            game.ml_boost = 4
        },
        ml1
    )
    //exp factor [5]
    new pp_upgrade_child(
        "EXP Factor",
        "Unlocks an upgrade that multiplies all EXP production",
        5,
        function () {
            if (!game.achievements[44]) get_achievement(44)
        },
        fluctuation
    )
    //limit break [6]
    let lim_break = new pp_upgrade_child(
        "Limit Break",
        "Breaks the limits, allowing you to go beyond LVL 60\nAlso allows Auto-Prestige configuration\n(Heads up! PP gain past LVL 60 is based on highest level instead)",
        5,
        function () {
            document.getElementById("auto_config").style.display = "block"
            if (!game.achievements[45]) get_achievement(45)
        },
        autoprestige
    )
    //jumpstart 1 [7]
    let js1 = new pp_upgrade_child(
        "Jumpstart I",
        "All further Prestiges start at LVL 15; Prestiging now requires LVL 70",
        5,
        function () {
            game.jumpstart = 1
            game.pr_min = 70
            if (Number(document.getElementById("level_input").value) < 70) {
                document.getElementById("level_input").value = 70
            }
        },
        lim_break
    )
    //amp efficiency [8]
    new pp_upgrade_child(
        "AMP Efficiency",
        "The Prestige button will now display AMP gained per second",
        7,
        function () {
            ampbutton_update()
        },
        lim_break
    )
    //starter kit 1 [9]
    new pp_upgrade_child(
        "Starter Kit I",
        "+4 free tiers on every upgrade on the Upgrades tab",
        10,
        function () {
            game.starter_kit += 4
            game.exp_add += game.amp * 4
            game.cps += 8
            game.exp_fluct += game.amp * 4
            game.exp_fact += 4
            if (game.perks[12]) {
                game.starter_kit += 4
                game.exp_add += game.amp * 4
                game.cps += 8
                game.exp_fluct += game.amp * 4
                game.exp_fact += 4
            }
        },
        lim_break
    )
    //jumpstart 2 [10]
    let js2 = new pp_upgrade_child(
        "Jumpstart II",
        "All further Prestiges start at LVL 30; Prestiging now requires LVL 80",
        15,
        function () {
            game.jumpstart = 2
            game.pr_min = 80
            if (Number(document.getElementById("level_input").value) < 80) {
                document.getElementById("level_input").value = 80
            }
        },
        js1
    )
    //manual labor 3 [11]
    let ml3 = new pp_upgrade_child(
        "Manual Labor III",
        "Unautomated clicks are 8x stronger",
        20,
        function () {
            game.ml_boost = 8
        },
        ml2
    )
    //advanced auto prestige [12]
    new pp_upgrade_child(
        "Advanced Auto-Prestiging",
        "Unlocks three additional modes for Auto-Prestige configuration",
        30,
        function () {
            document.getElementById("auto_mode").style.display = "block"
            if (game.perks[0])
                document.getElementById("peak_mode").style.display = "inline"
        },
        lim_break
    )
    //jumpstart 3 [13]
    let js3 = new pp_upgrade_child(
        "Jumpstart III",
        "All further Prestiges start at LVL 60; Prestiging now requires LVL 90",
        45,
        function () {
            game.jumpstart = 3
            game.pr_min = 90
            if (Number(document.getElementById("level_input").value) < 90) {
                document.getElementById("level_input").value = 90
            }
        },
        js2
    )
    //exp overclocker [14]
    let oc = new pp_upgrade_child(
        "EXP Overclocker",
        "Unlocks the EXP Overclocker, which boosts EXP 3x for 45 seconds",
        50,
        function () {
            document.getElementById("overclock").style.display = "block"
            if (!game.achievements[46]) get_achievement(46)
        },
        lim_break
    )
    //true randomness [15]
    new pp_upgrade_child(
        "True Randomness",
        "EXP Fluctuation is twice as strong",
        75,
        function () {
            game.exp_fluct *= 2
        },
        oc
    )
    //auto overclock [16]
    new pp_upgrade_child(
        "Auto-Overclocking",
        "Unlocks an automator that will automatically activate EXP Overclock when its cooldown is over",
        100,
        function () {
            document.getElementById("oc_auto").style.display = "inline"
        },
        oc
    )
    //manual labor 4 [17]
    let ml4 = new pp_upgrade_child(
        "Manual Labor IV",
        "Unautomated clicks are 16x stronger",
        120,
        function () {
            game.ml_boost = 16
        },
        ml3
    )
    //starter kit 2 [18]
    new pp_upgrade_child(
        "Starter Kit II",
        "+6 free tiers on every upgrade on the Upgrades tab",
        135,
        function () {
            game.starter_kit += 6
            game.exp_add += game.amp * 6
            game.cps += 12
            game.exp_fluct += game.amp * 6
            game.exp_fact += 6
            if (game.perks[12]) {
                game.starter_kit += 6
                game.exp_add += game.amp * 6
                game.cps += 12
                game.exp_fluct += game.amp * 6
                game.exp_fact += 6
            }
        },
        oc
    )
    //extra cycles 1 [19]
    let ec1 = new pp_upgrade_child(
        "Extra Cycles I",
        "EXP Overclocker now boosts EXP 4x",
        150,
        function () {},
        oc
    )
    //exp flux [20]
    let flux = new pp_upgrade_child(
        "EXP Flux",
        "Unlocks an upgrade that generates a boost to EXP production, increasing over time",
        200,
        function () {
            if (!game.achievements[47]) get_achievement(47)
        },
        oc
    )
    //stretched time [21]
    new pp_upgrade_child(
        "Stretched Time",
        "EXP Overclocker now stays active twice as long",
        300,
        function () {},
        flux
    )
    //pp power [22]
    new pp_upgrade_child(
        "Spare Power",
        "EXP production is boosted based on how much spare PP you have",
        450,
        function () {},
        flux
    )
    //extra cycles 2 [23]
    new pp_upgrade_child(
        "Extra Cycles II",
        "EXP Overclocker now boosts EXP 5x",
        600,
        function () {},
        ec1
    )
    //manual labor 5 [24]
    new pp_upgrade_child(
        "Manual Labor V",
        "Unautomated clicks are boosted a further +32% for every Autoclicker tier\n(Currently: 16x)",
        840,
        function () {
            game.ml_boost = 16 + game.cps * 0.16
        },
        ml4
    )
    //exp battery [25]
    let battery = new pp_upgrade_child(
        "EXP Battery",
        "Unlocks an upgrade that gives an additional multiplier to EXP with active and idle modes",
        1000,
        function () {
            if (!game.achievements[48]) get_achievement(48)
        },
        flux
    )
    //supercharge [26]
    new pp_upgrade_child(
        "Supercharge",
        "EXP Overclocker cooldown time is halved",
        1200,
        function () {},
        battery
    )
    //prestige power [27]
    let prst_power = new pp_upgrade_child(
        "Prestige Power",
        "EXP production is boosted based on how many times you have Prestiged",
        1440,
        function () {
            game.prestige_power = 1 + (game.prestige / 1000) ** (1 / 2)
            pp_upgrade.upgrades[27].desc =
                "EXP production is boosted based on how many times you have Prestiged\n(Currently: " +
                format_eff(game.prestige_power) +
                "x)"
            pp_map
                .get(pp_upgrade.upgrades[27])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[27].desc
        },
        battery
    )
    //starter kit 3 [28]
    new pp_upgrade_child(
        "Starter Kit III",
        "+8 free tiers on every upgrade on the Upgrades tab",
        1850,
        function () {
            game.starter_kit += 8
            game.exp_add += 8 * game.amp
            game.cps += 16
            game.exp_fluct += 8 * game.amp
            game.exp_fact += 8
            game.exp_battery += 8
            if (game.perks[12]) {
                game.starter_kit += 8
                game.exp_add += game.amp * 8
                game.cps += 16
                game.exp_fluct += game.amp * 8
                game.exp_fact += 8
                game.exp_battery += 8
            }
        },
        battery
    )
    //patience [29]
    new pp_upgrade_child(
        "Patience",
        "Longer Prestiges give more AMP (up to 10 seconds)",
        3200,
        function () {},
        prst_power
    )
    //depth power [30]
    new pp_upgrade_child(
        "Depth Power",
        "EXP production is boosted based on your highest level",
        6400,
        function () {
            game.depth_power = 1 + game.highest_level / 400
            pp_upgrade.upgrades[30].desc =
                "EXP production is boosted based on your highest level\n(Currently: " +
                format_eff(game.depth_power) +
                "x)"
            pp_map
                .get(pp_upgrade.upgrades[30])
                .querySelector(".pp_desc").innerText =
                pp_upgrade.upgrades[30].desc
        },
        prst_power
    )
    //triple a [31]
    let aaa = new pp_upgrade_child(
        "AAA",
        "EXP Battery is now 3x stronger",
        10000,
        function () {
            game.exp_battery *= 3
        },
        prst_power
    )
    //exp capacitor [32]
    let capacitor = new pp_upgrade_child(
        "EXP Capacitor",
        "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it\nStored EXP can later be discharged at a 2x boost",
        15000,
        function () {
            document.getElementById("capacitor").style.display = "block"
            if (!game.achievements[49]) get_achievement(49)
            if (game.perks[9]) {
                document.getElementById("dis_auto").style.display = "block"
                document.getElementById("dis_text").style.display = "block"
                document.getElementById("dis_input").style.display = "block"
            }
            if (game.perks[11] && game.autocp_toggle) {
                set_capacitance(1)
            }
        },
        aaa
    )
    //magnified flux [33]
    let magflux = new pp_upgrade_child(
        "Magnified Flux",
        "EXP Flux now increases 5x faster, and has a 5x higher cap",
        20000,
        function () {
            game.flux_boost *= 5
        },
        capacitor
    )
    //starter kit 4 [34]
    new pp_upgrade_child(
        "Starter Kit IV",
        "+10 free tiers on every upgrade on the Upgrades tab",
        25000,
        function () {
            game.starter_kit += 10
            game.exp_add += 10 * game.amp
            game.cps += 20
            game.exp_fluct += 10 * game.amp
            game.exp_fact += 10
            game.exp_battery += 10
            if (game.perks[12]) {
                game.starter_kit += 10
                game.exp_add += game.amp * 10
                game.cps += 20
                game.exp_fluct += game.amp * 10
                game.exp_fact += 10
                game.exp_battery += 10
            }
        },
        capacitor
    )
    //high voltage 1 [35]
    let hv1 = new pp_upgrade_child(
        "High Voltage I",
        "Unlocks 50% Capacitance mode, which gives a 4x boost on Discharge\nAlso unlocks automation for Discharge",
        30000,
        function () {
            document.getElementById("cap_50").style.display = "inline"
            document.getElementById("cap_disc").style.display = "inline"
            if (!game.perks[9]) {
                document.getElementById("dis_auto").style.display = "block"
                document.getElementById("dis_text").style.display = "block"
                document.getElementById("dis_input").style.display = "block"
            }
            if (game.perks[11] && game.autocp_toggle) {
                set_capacitance(2)
            }
        },
        capacitor
    )
    //9 volt [36]
    new pp_upgrade_child(
        "9-Volt",
        "EXP Battery is now 9x stronger",
        40000,
        function () {
            game.exp_battery *= 3
        },
        magflux
    )
    //high voltage 2 [37]
    let hv2 = new pp_upgrade_child(
        "High Voltage II",
        "Unlocks 75% Capacitance mode, giving a 6x boost on Discharge",
        45000,
        function () {
            document.getElementById("cap_75").style.display = "inline"
            if (game.perks[11] && game.autocp_toggle) {
                set_capacitance(3)
            }
        },
        hv1
    )
    //high voltage 3 [38]
    new pp_upgrade_child(
        "High Voltage III",
        "Unlocks 100% Capacitance mode, giving a 8x boost on Discharge\nAlso unlocks continuous Discharge (put in 0 for auto-discharge amount)",
        60000,
        function () {
            document.getElementById("cap_100").style.display = "inline"
            document.getElementById("dis_input").min = 0
            if (game.perks[11] && game.autocp_toggle) {
                set_capacitance(4)
            }
        },
        hv2
    )
    //the generator [39]
    new pp_upgrade(
        "The Generator",
        "Unlocks a new prestige layer",
        80000,
        function () {
            document.getElementById("reboot").style.display = "inline"
            if (!game.achievements[51]) get_achievement(51)
        }
    )
}
//done initializing pp upgrades

//generator perk class
class generator_perk {
    static perks = []

    name
    desc
    requirement

    //perk constructor
    constructor(name, desc, requirement) {
        this.name = name
        this.desc = desc
        this.requirement = requirement
        this.id = generator_perk.perks.length

        generator_perk.perks.push(this)

        //perk name
        let perk_name = document.createElement("P")
        perk_name.innerText = this.name
        perk_name.className = "perk_name"

        //perk description
        let perk_desc = document.createElement("P")
        perk_desc.innerText = this.desc
        perk_desc.className = "perk_desc"

        //perk completion box
        let perk_complete = document.createElement("DIV")
        perk_complete.className = "perk_complete incomplete"

        //perk requirement
        let perk_requirement = document.createElement("P")
        if (this.requirement === 1)
            perk_requirement.innerText =
                "Requires\n" + this.requirement + " watt"
        else
            perk_requirement.innerText =
                "Requires\n" + this.requirement + " watts"
        perk_requirement.className = "perk_requirement incomplete_text"
        perk_complete.appendChild(perk_requirement)

        //all text div
        let perk_text = document.createElement("DIV")
        perk_text.className = "perk_text"
        perk_text.appendChild(perk_name)
        perk_text.appendChild(perk_desc)

        //entire perk div
        let perk_block = document.createElement("DIV")
        perk_block.className = "generator_perk incomplete_perk"
        perk_block.appendChild(perk_text)
        perk_block.appendChild(perk_complete)

        //attatching upgrade to reboot page
        perk_map.set(this, perk_block)
        document.getElementById("reboot_page").appendChild(perk_block)
    }
}

//initializing generator perks
{
    //achievement power [0]
    new generator_perk(
        "Enter Reboot",
        "EXP production is boosted +5% for every achievement completed\nAlso unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec",
        1
    )
    //starter kit 5 [1]
    new generator_perk(
        "Starter Kit V",
        "+12 extra free tiers on every upgrade on the Upgrades tab\n(Stacks with the first four Starter Kit Prestige upgrades)",
        2
    )
    //technological gift 1 [2]
    new generator_perk(
        "Technological Gift I",
        "You begin Reboots with every PP upgrade up to Limit Break already purchased",
        3
    )
    //uninhibited flux [3]
    new generator_perk(
        "Uninhibited Flux",
        "EXP Flux permanently increases 5x faster and has a 5x higher cap\n(stacks with Magnified Flux if you have it, making it uncapped)",
        4
    )
    //multi-prestige [4]
    new generator_perk(
        "Multi-Prestige",
        "You gain 1 extra prestige stat for every 200 levels gained\nPatience will also boost prestige stat by up to 30x",
        5
    )
    //ultracharge [5]
    new generator_perk(
        "Ultracharge",
        "EXP Overclocker cooldown time is halved a second time\n(stacks with Supercharge)",
        6
    )
    //exp discount [6]
    new generator_perk(
        "EXP Discount",
        "All Upgrades require 25% fewer levels",
        8
    )
    //auto-prestige upgrading [7]
    new generator_perk(
        "PP Auto-Upgrading",
        "Unlocks automation for Prestige upgrades",
        10
    )
    //fusion [8]
    new generator_perk(
        "Fusion",
        "The active/idle switch for EXP Battery is removed, and both modes are now in effect simultaneously",
        12
    )
    //max capacity [9]
    new generator_perk(
        "Max Capacity",
        "Discharge is 2x stronger\nDischarge automation is also now unlocked with the EXP Capacitor instead of High Voltage I",
        16
    )
    //technological gift 2 [10]
    new generator_perk(
        "Technological Gift II",
        "You begin Reboots with every PP upgrade up to EXP Overclocker already purchased",
        20
    )
    //autocapacitance [11]
    new generator_perk(
        "Auto-Capacitance",
        "Unlocks automated mode switching for Capacitor, automatically switching to the highest available mode\nAlso unlocks Smart Auto-Discharge, which automatically Discharges when best to do so",
        24
    )
    //starter kit 6 [12]
    new generator_perk(
        "Starter Kit VI",
        "All upgrades on the Upgrades tab have twice as many free tiers",
        28
    )
    //energize [13]
    new generator_perk(
        "Energize",
        "You gain more watts on Reboot the farther past 200,000 PP you go",
        36
    )
    //smart auto-prestige [14]
    new generator_perk(
        "Smart Auto-Prestige",
        "Unlocks a customizable Auto-Prestige setting that automatically switches between Peak and PP mode",
        48
    )
    //auto-reboot [15]
    new generator_perk("Auto-Reboot", "Unlocks automation for Reboot", 64)
}
//done initializing generator perks

//achievement class
class achievement {
    static achievements = []

    name
    requirement
    id
    spoiler

    //perk constructor
    constructor(name, requirement, id, spoiler) {
        this.name = name
        this.requirement = requirement
        this.id = id
        this.spoiler = spoiler
        this.new = false

        achievement.achievements.push(this)
    }
}

//initializing achievements
{
    new achievement("Level up!", "Reach LVL 2", 0, 0)
    new achievement("Decathlevel", "Reach LVL 10", 1, 0)
    new achievement("Whoa, we're halfway there", "Reach LVL 30", 2, 0)
    new achievement("Push it to the limit", "Reach LVL 60", 3, 0)
    new achievement("Level 100 boss", "Reach LVL 100", 4, 0)
    new achievement("What do all these levels even do?", "Reach LVL 200", 5, 0)
    new achievement("Push it to the limit x5", "Reach LVL 300", 6, 0)
    new achievement("Addicted to EXP", "Reach LVL 500", 7, 0)
    new achievement("The pursuit of madness", "Reach LVL 1,000", 8, 0)
    new achievement("I tried so hard and got so far", "Reach LVL 2,000", 9, 0)
    new achievement("Overexperienced", "Reach LVL 3,000", 10, 0)
    new achievement("Blood, sweat, and EXP", "Reach LVL 6,000", 11, 0)
    new achievement("Event horizon", "Reach LVL 12,000", 12, 0)
    new achievement("Square one", "Prestige 1 time", 13, 1)
    new achievement("See you in another life", "Prestige 10 times", 14, 1)
    new achievement("Nowhere to go but up", "Prestige 100 times", 15, 1)
    new achievement("Welcome to hell", "Prestige 1,000 times", 16, 1)
    new achievement("A real grindset", "Prestige 10,000 times", 17, 1)
    new achievement(
        "You've been busy haven't you?",
        "Prestige 100,000 times",
        18,
        1
    )
    new achievement(
        "Stonks",
        "Get " + format_num(10 ** 6) + " all time EXP",
        19,
        0
    )
    new achievement(
        "Who wants to be a billionaire?",
        "Get " + format_num(10 ** 9) + " all time EXP",
        20,
        0
    )
    new achievement(
        "US national debt",
        "Get " + format_num(10 ** 12) + " all time EXP",
        21,
        0
    )
    new achievement(
        "The entire world economy",
        "Get " + format_num(10 ** 15) + " all time EXP",
        22,
        0
    )
    new achievement(
        "Unfathomable wealth",
        "Get " + format_num(10 ** 18) + " all time EXP",
        23,
        0
    )
    new achievement(
        "So big it breaks long notation",
        "Get " + format_num(10 ** 21) + " all time EXP",
        24,
        0
    )
    new achievement(
        "Satisfied yet?",
        "Get " + format_num(10 ** 24) + " all time EXP",
        25,
        0
    )
    new achievement(
        "Definitely can't count this on my hands",
        "Get " + format_num(10 ** 27) + " all time EXP",
        26,
        0
    )
    new achievement(
        "Absolute unit",
        "Get " + format_num(10 ** 30) + " all time EXP",
        27,
        0
    )
    new achievement(
        "Top ten numbers you'll never use",
        "Get " + format_num(10 ** 33) + " all time EXP",
        28,
        0
    )
    new achievement(
        "Big",
        "Get " + format_num(10 ** 36) + " all time EXP",
        29,
        0
    )
    new achievement(
        "Even Zakuro didn't expect you to make it this far",
        "Get " + format_num(10 ** 39) + " all time EXP",
        30,
        0
    )
    new achievement(
        "It's okay I lost track too",
        "Get " + format_num(10 ** 42) + " all time EXP",
        70,
        0
    )
    new achievement("Hot minute", "Play for 1 hour", 31, 0)
    new achievement("Time well spent", "Play for 6 hours", 32, 0)
    new achievement("Day in, day out", "Play for 24 hours", 33, 0)
    new achievement("Don't you have a life?", "Play for 72 hours", 34, 0)
    new achievement("True dedication", "Play for 168 hours", 35, 0)
    new achievement("Amplified", "Get " + format_num(100) + " AMP", 36, 1)
    new achievement(
        "Haha AMP go brrrrr",
        "Get " + format_num(10000) + " AMP",
        37,
        1
    )
    new achievement("Blast off", "Get " + format_num(10 ** 6) + " AMP", 38, 1)
    new achievement(
        "I can see my house from here",
        "Get " + format_num(10 ** 8) + " AMP",
        39,
        1
    )
    new achievement(
        "Making the most out of your reset",
        "Get " + format_num(10 ** 10) + " AMP",
        40,
        1
    )
    new achievement(
        "Not bad, kid",
        "Get " + format_num(10 ** 12) + " AMP",
        41,
        1
    )
    new achievement(
        "Oh, the places you'll go",
        "Get " + format_num(10 ** 14) + " AMP",
        42,
        1
    )
    new achievement(
        "We're not in Kansas anymore",
        "Get " + format_num(10 ** 16) + " AMP",
        71,
        1
    )
    new achievement("The only RNG in the game", "Unlock EXP Fluctuation", 43, 1)
    new achievement("Now we're getting somewhere", "Unlock EXP Factor", 44, 1)
    new achievement("The sky's the limit", "Get limit break", 45, 2)
    new achievement("But can it run Crysis?", "Unlock EXP Overclocker", 46, 2)
    new achievement("The EXP flows within you", "Unlock EXP Flux", 47, 2)
    new achievement("I've got the power", "Unlock EXP Battery", 48, 2)
    new achievement("Delayed gratification", "Unlock EXP Capacitor", 49, 2)
    new achievement(
        "Full potential unlocked",
        "Unlock everything on the Upgrades tab",
        50,
        1
    )
    new achievement(
        "Tutorial completed!",
        "Buy all 40 Prestige upgrades",
        51,
        1
    )
    new achievement(
        "EXP comes to those who wait",
        "Reach 100x EXP Flux boost",
        52,
        2
    )
    new achievement(
        "Speedy clicking",
        "Reach 30 clicks/s on the Autoclicker",
        53,
        0
    )
    new achievement(
        "Sir, do you know how fast you were going?",
        "Reach 150 clicks/s on the Autoclicker",
        54,
        0
    )
    new achievement(
        "WE HAVE REAHCED MXAIMUN VLELOCIPY",
        "Reach 1,000 clicks/s on the Autoclicker",
        55,
        0
    )
    new achievement("Cube one", "Activate the Generator", 56, 3)
    new achievement("All is lost again", "Reboot 3 times", 57, 3)
    new achievement("Less than zero", "Reboot 5 times", 58, 3)
    new achievement("Groundhog day", "Reboot 10 times", 59, 3)
    new achievement("Cycle of insanity", "Reboot 25 times", 72, 3)
    new achievement("I've become so numb", "Reboot 50 times", 73, 3)
    new achievement("Picking up the pace", "Reboot in under 1 hour", 60, 3)
    new achievement("GAS GAS GAS", "Reboot in under 10 minutes", 74, 3)
    new achievement(
        "#intentionalfeature",
        "Discharge the Capacitor while the Overclocker is active",
        61,
        5
    )
    new achievement(
        "What a madman",
        "Go an entire Reboot with all automation turned off",
        62,
        5
    )
    new achievement(
        "AFK Simulator",
        "Do absolutely nothing for 10 minutes",
        63,
        5
    )
    new achievement("Wish granted", "Click this achievement's box", 64, 5)
    new achievement(
        "Did it for the memes",
        "Enter a meme number into any input box",
        65,
        5
    )
    new achievement(
        "Spontaneous Fortune",
        "There is a 1 in 7,777 chance every second you will get this achievement",
        66,
        5
    )
    new achievement("F in the chat", "Pay respects", 67, 5)
    new achievement(
        "As we can see you can't",
        "Spend an entire Reboot with ??? notation",
        68,
        5
    )
    new achievement(
        "But for why though?",
        "Respec when you already have all the PP upgrades",
        75,
        5
    )
    new achievement(
        "Yes I love cancer",
        "Reboot 10 times while using Cancer notation",
        76,
        5
    )
    new achievement("You win 1 EXP", "Get every achievement", 69, 0)
}
//done initializing achievements

//notification class
class notify {
    static queue = []

    text
    color

    //notification constructor
    constructor(text, color) {
        this.text = text
        this.color = color
        this.age = 0

        notify.queue.push(this)

        let notification = document.createElement("DIV")
        notification.className = "notification"

        let notif_text = document.createElement("P")
        notif_text.innerText = this.text
        notif_text.style.color = this.color
        notif_text.className = "notif_text"

        notification.appendChild(notif_text)
        document.getElementById("notifications").appendChild(notification)
        notif_map.set(this, notification)
    }
}
