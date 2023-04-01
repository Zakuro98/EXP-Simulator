//initializing game variables
let game = {
    version: "2.3.205",

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
    amp_eff: new Array(5).fill(-1),
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

    perks: new Array(28).fill(false),
    generator_kit: 0,
    flux_increase: 1,

    autopp_toggle: false,
    autopp_mode: 0,
    priority: new Array(39).fill(1),

    achievements: new Array(149).fill(false),
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
    autorb_goal: [1, 0.8],
    autorb_pending: false,

    cancer_reboots: 0,

    //v2.2.102 variables
    beta: false,

    //v2.2.200 variables
    speed_power: 1,
    banked_prestige: 0,

    subtab: [0, 0, 0, 0],
    challenge: 0,
    challenge_confirmation: true,
    completions: new Array(9).fill(0),
    ch_boost: new Array(9).fill(1),

    hints: false,
    refresh_rate: 30,

    //v2.2.201 variables
    watts_eff: new Array(5).fill(-1),

    //v2.2.300 variables
    hydrogen: 0,
    helium: 0,
    helium_boost: 1,
    hps: 0,
    core_level: new Array(8).fill(0),
    core_price: [1, 3, 10, 36, 136, 528, 2080, 8256],
    buy_max: false,
    supply_level: 0,
    supply_price: 16,

    true_banked_prestige: 0,

    //v2.2.301 variables
    priority_layer: 1,
    switchpoint: 0,

    //v2.3.000 variables
    quantum: 0,
    reboot_exp: 0,
    reboot_time: 0,
    fastest_quantize: 10 ** 21,
    reboot_highest_level: 1,
    reboot_clicks: 0,

    photons: 0,
    prism_level: 0,
    prism_boost: 1,
    qu_bought: new Array(8).fill(false),

    autorb_mode: 0,
    autohy_toggle: false,
    autohy_portion: 0.5,
    autohy_importance: 1,
    budget: 0,
    prev_completions: 0,
    superspeed_power: 1,

    quantum_confirmation: true,

    //v2.3.002 variables
    question: true,

    //v2.3.100 variables
    dark_matter: new Decimal(1),
    dark_matter_boost: 1,
    growth_interval: 60,
    growth_factor: 1,
    growth_time: 0,
    growth_price: [10 ** 15, 10 ** 13],
    dk_bought: new Array(8).fill(false),

    infusion: 1,
    ch_helium_boost: new Array(9).fill(1),

    autorb_push: 60,
    autoqu_toggle: false,
    autoqu_mode: 0,
    autoqu_goal: [1, 60, 2],

    //v2.3.103 variables
    omega_base: 10,

    //v2.3.200 variables
    omega_level: 0,
    highest_omega_level: 0,
    omega_points: 0,
    om_bought: new Array(8).fill(false),
    om_boost: [1, 1, 1],
    om_assigned: [0, 0, 0],

    omega_challenge: false,
    om_completions: 0,

    autocl_toggle: false,
    autogr_toggle: false,
    autops_toggle: false,
    prev_photons: 0,

    perks_hide: false,

    //v2.3.201 variables
    amp_amount: new Array(5).fill(-1),
    amp_time: new Array(5).fill(-1),
    watts_amount: new Array(5).fill(-1),
    watts_time: new Array(5).fill(-1),

    //v2.3.205 variables
    work: true,
    work_unlocked: false,
}

//initialize maps
const pp_map = new Map()
const perk_map = new Map()
const notif_map = new Map()
const challenge_map = new Map()
const reactor_map = new Map()
const quantum_map = new Map()

//initialize autoclick prevention
let click_time = undefined
let focus_time = undefined

let entering = false
let reduction = 1
let prism_angle = Math.PI / 10

let meme = true

//initialize pp upgrade priorities
for (let i = 0; i < 39; i++) {
    game.priority[i] = i
}

//number formatting
function format_num(num) {
    let negative = false
    let cutoff = 1000000
    switch (game.switchpoint) {
        case 0:
            cutoff = 1000000
            break
        case 1:
            cutoff = 1000000000
            break
    }
    if (num < 0) {
        negative = true
        num *= -1
    }
    let output = num.toString()
    if (num >= 1000) {
        let digits = output.length
        if (num < 10 ** 21) {
            for (let i = digits - 3; i > 0; i -= 3) {
                output = output.substr(0, i) + "," + output.substr(i)
            }
        }
    }
    if (num >= cutoff) {
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

                output = lead_str2 + " " + one_str2 + ten_str2
                break
            case 5:
                let exponent3 = Math.log10(num)
                output = "e" + exponent3.toFixed(3)
                break
            case 6:
                const alphabet = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z",
                    "A",
                ]
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

                output = lead_str3 + " "
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
                        output += alphabet[index]
                    }
                }
                break
            case 7:
                const cancer_alphabet = [
                    "😠",
                    "🎂",
                    "🎄",
                    "💀",
                    "🍆",
                    "🐱",
                    "🌈",
                    "💯",
                    "🍦",
                    "🎃",
                    "💋",
                    "😂",
                    "🌙",
                    "⛔",
                    "🐙",
                    "💩",
                    "❓",
                    "☢",
                    "🙈",
                    "👍",
                    "☂",
                    "✌",
                    "⚠",
                    "❌",
                    "😋",
                    "⚡",
                    "😠",
                ]
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
                        output += cancer_alphabet[index2]
                    }
                }
                break
            case 9:
                let exponent4 =
                    Math.log(num) / Math.log(1.7976931348622053 * 10 ** 308)
                output = exponent4.toFixed(3) + "∞"
                break
        }
    }
    if (game.notation === 10) {
        output = ""

        const fraction_array = [
            "",
            "·",
            ":",
            "∴",
            "∷",
            "⁙",
            "S",
            "S·",
            "S:",
            "S∴",
            "S∷",
            "S⁙",
        ]
        const one_array = [
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ]
        const ten_array = [
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
        ]
        const hundred_array = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
        ]
        const thousand_array = [
            "",
            "M",
            "MM",
            "MMM",
            'M<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>M',
            '<span style="text-decoration:overline">V</span>MM',
            '<span style="text-decoration:overline">V</span>MMM',
            'M<span style="text-decoration:overline">X</span>',
        ]
        const ten_thousand_array = [
            "",
            '<span style="text-decoration:overline">X</span>',
            '<span style="text-decoration:overline">XX</span>',
            '<span style="text-decoration:overline">XXX</span>',
            '<span style="text-decoration:overline">XL</span>',
            '<span style="text-decoration:overline">L</span>',
            '<span style="text-decoration:overline">LX</span>',
            '<span style="text-decoration:overline">LXX</span>',
            '<span style="text-decoration:overline">LXXX</span>',
            '<span style="text-decoration:overline">XC</span>',
        ]
        const hundred_thousand_array = [
            "",
            '<span style="text-decoration:overline">C</span>',
            '<span style="text-decoration:overline">CC</span>',
            '<span style="text-decoration:overline">CCC</span>',
            '<span style="text-decoration:overline">CD</span>',
            '<span style="text-decoration:overline">D</span>',
            '<span style="text-decoration:overline">DC</span>',
            '<span style="text-decoration:overline">DCC</span>',
            '<span style="text-decoration:overline">DCCC</span>',
            '<span style="text-decoration:overline">CM</span>',
        ]
        const million_array = [
            "",
            '<span style="text-decoration:overline">M</span>',
            '<span style="text-decoration:overline">MM</span>',
            '<span style="text-decoration:overline">MMM</span>',
        ]

        if (num >= 1000000) {
            output += million_array[Math.floor(num / 1000000) % 10]
        }
        if (num >= 100000) {
            output += hundred_thousand_array[Math.floor(num / 100000) % 10]
        }
        if (num >= 10000) {
            output += ten_thousand_array[Math.floor(num / 10000) % 10]
        }
        if (num >= 1000) {
            output += thousand_array[Math.floor(num / 1000) % 10]
        }
        if (num >= 100) {
            output += hundred_array[Math.floor(num / 100) % 10]
        }
        if (num >= 10) {
            output += ten_array[Math.floor(num / 10) % 10]
        }
        output += one_array[num % 10]

        if (num >= 4000000) {
            output = ""

            let exponent = Math.floor(Math.log10(num))
            let mantissa = num / 10 ** exponent

            output += one_array[Math.floor(mantissa)]
            output += fraction_array[Math.floor(mantissa * 12) % 12]

            output += "↑"
            output += format_num(exponent)
        }

        if (output === "") output = "0"
    }
    if (game.notation === 11) {
        const char_array = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "+",
            "/",
        ]
        output = ""
        switch (game.switchpoint) {
            case 0:
                cutoff = 64 ** 6
                break
            case 1:
                cutoff = 64 ** 9
                break
        }

        let exponent = Math.floor(Math.log(num) / Math.log(64))

        if (num >= cutoff) {
            output =
                char_array[Math.floor(num / 64 ** exponent)] +
                "." +
                char_array[Math.floor(num / 64 ** (exponent - 1)) % 64] +
                char_array[Math.floor(num / 64 ** (exponent - 2)) % 64] +
                char_array[Math.floor(num / 64 ** (exponent - 3)) % 64] +
                "^"
            if (exponent >= 64) output += char_array[Math.floor(exponent / 64)]
            output += char_array[exponent % 64]
        } else {
            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num / 64 ** i) % 64]
            }
        }

        if (output === "") output = "0"
    }
    if (
        (game.notation === 12 || game.notation === 13) &&
        num < 10 ** 36 &&
        num > cutoff
    ) {
        const single_array_cond2 = [
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
        const one_array_cond2 = [
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
        const ten_array_cond2 = [
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

        let order = Math.floor(Math.log10(num) / 3) - 1
        let one_str = ""
        let ten_str = ""
        if (order < 10) {
            one_str = single_array_cond2[order]
        } else {
            one_str = one_array_cond2[order % 10]
            ten_str = ten_array_cond2[Math.floor(order / 10)]
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

        output = lead_str + " " + one_str + ten_str
    } else if (num >= cutoff) {
        if (game.notation === 12) {
            let exponent = Math.floor(Math.log10(num))
            let mantissa = num / 10 ** exponent
            output = mantissa.toFixed(3) + "e" + exponent
        } else if (game.notation === 13) {
            let exponent = Math.floor(Math.log10(num) / 3) * 3
            let mantissa = num / 10 ** exponent
            if (mantissa < 10) {
                output = mantissa.toFixed(3) + "e" + exponent
            } else if (mantissa < 100) {
                output = mantissa.toFixed(2) + "e" + exponent
            } else {
                output = mantissa.toFixed(1) + "e" + exponent
            }
        }
    }
    if (num >= 1.7976931348622053 * 10 ** 308 && game.notation !== 9) {
        output = "∞"
    }
    if (negative) {
        output = "-" + output
    }
    if (game.notation === 8) {
        output = "???"
    }
    return output
}

//post-infinity number formatting
function format_infinity(num) {
    let negative = false
    let cutoff = 1000000
    switch (game.switchpoint) {
        case 0:
            cutoff = 1000000
            break
        case 1:
            cutoff = 1000000000
            break
    }
    if (num.cmp(0) === -1) {
        negative = true
        num = num.mul(-1)
    }
    let output = ""
    if (num.cmp(1.7976931348622053 * 10 ** 308) === -1) {
        let output = num.toNumber().toString()
        if (num >= 1000) {
            let digits = output.length
            if (num < 10 ** 21) {
                for (let i = digits - 3; i > 0; i -= 3) {
                    output = output.substr(0, i) + "," + output.substr(i)
                }
            }
        }
    } else {
        let exponent = Math.floor(num.exponent)
        let mantissa = num.mantissa
        output = mantissa.toFixed(16) + "e+" + format_num(exponent)
    }
    if (num.cmp(cutoff) === 1 || num.cmp(cutoff) === 0) {
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
                ]
                const hundred_array = [
                    "",
                    "cent",
                    "ducent",
                    "trecent",
                    "quadringent",
                    "quingent",
                    "sescent",
                    "septingent",
                    "octingent",
                    "nongent",
                ]

                let order = Math.floor(num.exponent / 3) - 1
                let one_str = ""
                let one_mod = ""
                let ten_str = ""
                let hundred_str = ""
                if (order < 10) {
                    one_str = single_array[order]
                } else {
                    one_str = one_array[order % 10]
                    ten_str = ten_array[Math.floor(order / 10) % 10]
                    hundred_str = hundred_array[Math.floor(order / 100) % 10]

                    const r_order = Math.floor(order / 10)
                    if (
                        (order % 10 === 7 || order % 10 === 9) &&
                        r_order % 10 !== 9 &&
                        r_order !== 90
                    )
                        if (
                            r_order % 10 === 2 ||
                            r_order % 10 === 8 ||
                            r_order === 80
                        )
                            one_mod = "m"
                        else one_mod = "n"
                    if (
                        (order % 10 === 3 || order % 10 === 6) &&
                        ((r_order >= 2 && r_order <= 5) ||
                            r_order % 10 === 8 ||
                            r_order === 0 ||
                            r_order === 10 ||
                            r_order === 30 ||
                            r_order === 40 ||
                            r_order === 50 ||
                            r_order === 80)
                    )
                        one_mod = "s"
                    if (
                        order % 10 === 6 &&
                        (r_order % 10 === 8 ||
                            r_order === 0 ||
                            r_order === 10 ||
                            r_order === 80)
                    )
                        one_mod = "x"
                    if (r_order === 0) one_mod += "t"

                    if (
                        Math.floor(order / 100) % 10 !== 0 &&
                        Math.floor(order / 10) % 10 >= 1
                    ) {
                        if (Math.floor(order / 10) % 10 <= 2) {
                            ten_str += "i"
                        } else {
                            ten_str += "a"
                        }
                    }
                }
                let unit_str = one_str + one_mod + ten_str + hundred_str
                let thousand_str = ""
                let million_str = ""

                if (order >= 1000) {
                    let orderk = Math.floor(order / 1000) % 1000
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (orderk > 1) {
                        one_str = one_array[orderk % 10]
                        ten_str = ten_array[Math.floor(orderk / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(orderk / 100) % 10]

                        const r_orderk = Math.floor(orderk / 10)
                        if (
                            (orderk % 10 === 7 || orderk % 10 === 9) &&
                            r_orderk % 10 !== 9 &&
                            r_orderk !== 90
                        )
                            if (
                                r_orderk % 10 === 2 ||
                                r_orderk % 10 === 8 ||
                                r_orderk === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (orderk % 10 === 3 || orderk % 10 === 6) &&
                            ((r_orderk >= 2 && r_orderk <= 5) ||
                                r_orderk % 10 === 8 ||
                                r_orderk === 10 ||
                                r_orderk === 30 ||
                                r_orderk === 40 ||
                                r_orderk === 50 ||
                                r_orderk === 80)
                        )
                            one_mod = "s"
                        if (
                            orderk % 10 === 6 &&
                            (r_orderk % 10 === 8 ||
                                r_orderk === 10 ||
                                r_orderk === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(orderk / 100) % 10 !== 0 &&
                            Math.floor(orderk / 10) % 10 >= 1
                        ) {
                            if (Math.floor(orderk / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (orderk !== 0) {
                        thousand_str =
                            one_str + one_mod + ten_str + hundred_str + "milli"
                        if ((unit_str = "")) thousand_str += "n"
                    }
                }

                if (order >= 1000000) {
                    let orderm = Math.floor(order / 1000000)
                    one_str = ""
                    one_mod = ""
                    ten_str = ""
                    hundred_str = ""
                    if (orderm > 1) {
                        one_str = one_array[orderm % 10]
                        ten_str = ten_array[Math.floor(orderm / 10) % 10]
                        hundred_str =
                            hundred_array[Math.floor(orderm / 100) % 10]

                        const r_orderm = Math.floor(orderm / 10)
                        if (
                            (orderm % 10 === 7 || orderm % 10 === 9) &&
                            r_orderm % 10 !== 9 &&
                            r_orderm !== 90
                        )
                            if (
                                r_orderm % 10 === 2 ||
                                r_orderm % 10 === 8 ||
                                r_orderm === 80
                            )
                                one_mod = "m"
                            else one_mod = "n"
                        if (
                            (orderm % 10 === 3 || orderm % 10 === 6) &&
                            ((r_orderm >= 2 && r_orderk <= 5) ||
                                r_orderm % 10 === 8 ||
                                r_orderm === 10 ||
                                r_orderm === 30 ||
                                r_orderm === 40 ||
                                r_orderm === 50 ||
                                r_orderm === 80)
                        )
                            one_mod = "s"
                        if (
                            orderm % 10 === 6 &&
                            (r_orderm % 10 === 8 ||
                                r_orderm === 10 ||
                                r_orderm === 80)
                        )
                            one_mod = "x"

                        if (
                            Math.floor(orderm / 100) % 10 !== 0 &&
                            Math.floor(orderm / 10) % 10 >= 1
                        ) {
                            if (Math.floor(orderm / 10) % 10 <= 2) {
                                ten_str += "i"
                            } else {
                                ten_str += "a"
                            }
                        }
                    }

                    if (orderm !== 0) {
                        million_str =
                            one_str + one_mod + ten_str + hundred_str + "micri"
                        if ((unit_str = "")) million_str += "n"
                    }
                }

                let lead = num
                    .div(new Decimal(10).pow(3 * order + 3))
                    .toNumber()
                let lead_str = ""
                if (lead < 10) {
                    lead_str = lead.toFixed(3)
                } else if (lead < 100) {
                    lead_str = lead.toFixed(2)
                } else {
                    lead_str = lead.toFixed(1)
                }

                output =
                    lead_str +
                    " " +
                    million_str +
                    thousand_str +
                    unit_str +
                    "illion"
                break
            case 2:
                let exponent = Math.floor(num.exponent)
                let mantissa = num.mantissa
                output = mantissa.toFixed(3) + "e" + format_num(exponent)
                break
            case 3:
                let exponent2 = Math.floor(num.exponent / 3) * 3
                let mantissa2 = num
                    .div(new Decimal(10).pow(exponent2))
                    .toNumber()
                if (mantissa2 < 10) {
                    output = mantissa2.toFixed(3) + "e" + format_num(exponent2)
                } else if (mantissa2 < 100) {
                    output = mantissa2.toFixed(2) + "e" + format_num(exponent2)
                } else {
                    output = mantissa2.toFixed(1) + "e" + format_num(exponent2)
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
                ]
                const hundred_array_cond = [
                    "",
                    "Ce",
                    "Du",
                    "Tc",
                    "Qd",
                    "Qe",
                    "Sc",
                    "St",
                    "Oe",
                    "Ne",
                ]

                let order2 = Math.floor(num.exponent / 3) - 1
                let one_str2 = ""
                let ten_str2 = ""
                let hundred_str2 = ""
                if (order2 < 10) {
                    one_str2 = single_array_cond[order2]
                } else {
                    one_str2 = one_array_cond[order2 % 10]
                    ten_str2 = ten_array_cond[Math.floor(order2 / 10) % 10]
                    hundred_str2 =
                        hundred_array_cond[Math.floor(order2 / 100) % 10]
                }
                let unit_str2 = one_str2 + ten_str2 + hundred_str2
                let thousand_str2 = ""
                let million_str2 = ""

                if (order2 >= 1000) {
                    let order2k = Math.floor(order2 / 1000) % 1000
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2k > 1) {
                        one_str2 = one_array_cond[order2k % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2k / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2k / 100) % 10]
                    }
                    if (order2k !== 0) {
                        thousand_str2 =
                            one_str2 + ten_str2 + hundred_str2 + "MI"
                        if (unit_str2 !== "") thousand_str2 += "-"
                    }
                }

                if (order2 >= 1000000) {
                    let order2m = Math.floor(order2 / 1000000)
                    one_str2 = ""
                    ten_str2 = ""
                    hundred_str2 = ""

                    if (order2m > 1) {
                        one_str2 = one_array_cond[order2m % 10]
                        ten_str2 = ten_array_cond[Math.floor(order2m / 10) % 10]
                        hundred_str2 =
                            hundred_array_cond[Math.floor(order2m / 100) % 10]
                    }
                    million_str2 = one_str2 + ten_str2 + hundred_str2 + "MC"
                    if (unit_str2 !== "") million_str2 += "-"
                }

                let lead2 = num
                    .div(new Decimal(10).pow(3 * order2 + 3))
                    .toNumber()
                let lead_str2 = ""
                if (lead2 < 10) {
                    lead_str2 = lead2.toFixed(3)
                } else if (lead2 < 100) {
                    lead_str2 = lead2.toFixed(2)
                } else {
                    lead_str2 = lead2.toFixed(1)
                }

                output =
                    lead_str2 + " " + million_str2 + thousand_str2 + unit_str2
                break
            case 5:
                let exponent3 = num.log10()
                output = "e" + exponent3.toFixed(3)
                break
            case 6:
                const alphabet = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                    "K",
                    "L",
                    "M",
                    "N",
                    "O",
                    "P",
                    "Q",
                    "R",
                    "S",
                    "T",
                    "U",
                    "V",
                    "W",
                    "X",
                    "Y",
                    "Z",
                    "A",
                ]
                let order3 = Math.floor(num.exponent / 3) - 1
                let lead3 = num
                    .div(new Decimal(10).pow(3 * order3 + 3))
                    .toNumber()
                let lead_str3 = ""
                if (lead3 < 10) {
                    lead_str3 = lead3.toFixed(3)
                } else if (lead3 < 100) {
                    lead_str3 = lead3.toFixed(2)
                } else {
                    lead_str3 = lead3.toFixed(1)
                }

                output = lead_str3 + " "
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
                        output += alphabet[index]
                    }
                }
                break
            case 7:
                const cancer_alphabet = [
                    "😠",
                    "🎂",
                    "🎄",
                    "💀",
                    "🍆",
                    "🐱",
                    "🌈",
                    "💯",
                    "🍦",
                    "🎃",
                    "💋",
                    "😂",
                    "🌙",
                    "⛔",
                    "🐙",
                    "💩",
                    "❓",
                    "☢",
                    "🙈",
                    "👍",
                    "☂",
                    "✌",
                    "⚠",
                    "❌",
                    "😋",
                    "⚡",
                    "😠",
                ]
                let order4 = Math.floor(num.exponent / 3) - 1
                let lead4 = num
                    .div(new Decimal(10).pow(3 * order4 + 3))
                    .toNumber()
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
                        output += cancer_alphabet[index2]
                    }
                }
                break
            case 9:
                let exponent4 = num.log(1.7976931348622053 * 10 ** 308)
                output = exponent4.toFixed(3) + "∞"
                break
        }
    }
    if (game.notation === 10) {
        output = ""

        const fraction_array = [
            "",
            "·",
            ":",
            "∴",
            "∷",
            "⁙",
            "S",
            "S·",
            "S:",
            "S∴",
            "S∷",
            "S⁙",
        ]
        const one_array = [
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ]
        const ten_array = [
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
        ]
        const hundred_array = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
        ]
        const thousand_array = [
            "",
            "M",
            "MM",
            "MMM",
            'M<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>',
            '<span style="text-decoration:overline">V</span>M',
            '<span style="text-decoration:overline">V</span>MM',
            '<span style="text-decoration:overline">V</span>MMM',
            'M<span style="text-decoration:overline">X</span>',
        ]
        const ten_thousand_array = [
            "",
            '<span style="text-decoration:overline">X</span>',
            '<span style="text-decoration:overline">XX</span>',
            '<span style="text-decoration:overline">XXX</span>',
            '<span style="text-decoration:overline">XL</span>',
            '<span style="text-decoration:overline">L</span>',
            '<span style="text-decoration:overline">LX</span>',
            '<span style="text-decoration:overline">LXX</span>',
            '<span style="text-decoration:overline">LXXX</span>',
            '<span style="text-decoration:overline">XC</span>',
        ]
        const hundred_thousand_array = [
            "",
            '<span style="text-decoration:overline">C</span>',
            '<span style="text-decoration:overline">CC</span>',
            '<span style="text-decoration:overline">CCC</span>',
            '<span style="text-decoration:overline">CD</span>',
            '<span style="text-decoration:overline">D</span>',
            '<span style="text-decoration:overline">DC</span>',
            '<span style="text-decoration:overline">DCC</span>',
            '<span style="text-decoration:overline">DCCC</span>',
            '<span style="text-decoration:overline">CM</span>',
        ]
        const million_array = [
            "",
            '<span style="text-decoration:overline">M</span>',
            '<span style="text-decoration:overline">MM</span>',
            '<span style="text-decoration:overline">MMM</span>',
        ]

        if (num.cmp(4000000) === 1 || num.cmp(4000000) === 0) {
            output = ""

            let exponent = num.exponent
            let mantissa = num.mantissa

            output += one_array[Math.floor(mantissa)]
            output += fraction_array[Math.floor(mantissa * 12) % 12]

            output += "↑"
            output += format_num(exponent)
        } else {
            let num2 = num.toNumber()

            if (num2 >= 1000000) {
                output += million_array[Math.floor(num2 / 1000000) % 10]
            }
            if (num2 >= 100000) {
                output += hundred_thousand_array[Math.floor(num2 / 100000) % 10]
            }
            if (num2 >= 10000) {
                output += ten_thousand_array[Math.floor(num2 / 10000) % 10]
            }
            if (num2 >= 1000) {
                output += thousand_array[Math.floor(num2 / 1000) % 10]
            }
            if (num2 >= 100) {
                output += hundred_array[Math.floor(num2 / 100) % 10]
            }
            if (num2 >= 10) {
                output += ten_array[Math.floor(num2 / 10) % 10]
            }
            output += one_array[num2 % 10]
        }

        if (output === "") output = "0"
    }
    if (game.notation === 11) {
        const char_array = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "+",
            "/",
        ]
        output = ""
        switch (game.switchpoint) {
            case 0:
                cutoff = 64 ** 6
                break
            case 1:
                cutoff = 64 ** 9
                break
        }

        let exponent = Math.floor(num.log(64))

        if (num.cmp(cutoff) === 1 || num.cmp(cutoff) === 0) {
            output =
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent)).toNumber()
                    )
                ] +
                "." +
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent - 1)).toNumber()
                    ) % 64
                ] +
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent - 2)).toNumber()
                    ) % 64
                ] +
                char_array[
                    Math.floor(
                        num.div(new Decimal(64).pow(exponent - 3)).toNumber()
                    ) % 64
                ] +
                "^"
            let exponent2 = Math.floor(Math.log(exponent) / Math.log(64))
            for (let i = exponent2; i >= 0; i--) {
                output += char_array[Math.floor(exponent / 64 ** i) % 64]
            }
        } else {
            let num2 = num.toNumber()
            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num2 / 64 ** i) % 64]
            }
        }

        if (output === "") output = "0"
    }
    if (
        (game.notation === 12 || game.notation === 13) &&
        num.cmp(10 ** 36) === -1 &&
        num.cmp(cutoff) >= 0
    ) {
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
        ]
        const hundred_array_cond = [
            "",
            "Ce",
            "Du",
            "Tc",
            "Qd",
            "Qe",
            "Sc",
            "St",
            "Oe",
            "Ne",
        ]

        let order2 = Math.floor(num.exponent / 3) - 1
        let one_str2 = ""
        let ten_str2 = ""
        let hundred_str2 = ""
        if (order2 < 10) {
            one_str2 = single_array_cond[order2]
        } else {
            one_str2 = one_array_cond[order2 % 10]
            ten_str2 = ten_array_cond[Math.floor(order2 / 10) % 10]
            hundred_str2 = hundred_array_cond[Math.floor(order2 / 100) % 10]
        }
        let unit_str2 = one_str2 + ten_str2 + hundred_str2
        let thousand_str2 = ""
        let million_str2 = ""

        if (order2 >= 1000) {
            let order2k = Math.floor(order2 / 1000) % 1000
            one_str2 = ""
            ten_str2 = ""
            hundred_str2 = ""

            if (order2k > 1) {
                one_str2 = one_array_cond[order2k % 10]
                ten_str2 = ten_array_cond[Math.floor(order2k / 10) % 10]
                hundred_str2 =
                    hundred_array_cond[Math.floor(order2k / 100) % 10]
            }
            if (order2k !== 0) {
                thousand_str2 = one_str2 + ten_str2 + hundred_str2 + "MI"
                if (unit_str2 !== "") thousand_str2 += "-"
            }
        }

        if (order2 >= 1000000) {
            let order2m = Math.floor(order2 / 1000000)
            one_str2 = ""
            ten_str2 = ""
            hundred_str2 = ""

            if (order2m > 1) {
                one_str2 = one_array_cond[order2m % 10]
                ten_str2 = ten_array_cond[Math.floor(order2m / 10) % 10]
                hundred_str2 =
                    hundred_array_cond[Math.floor(order2m / 100) % 10]
            }
            million_str2 = one_str2 + ten_str2 + hundred_str2 + "MC"
            if (unit_str2 !== "") million_str2 += "-"
        }

        let lead2 = num.div(new Decimal(10).pow(3 * order2 + 3)).toNumber()
        let lead_str2 = ""
        if (lead2 < 10) {
            lead_str2 = lead2.toFixed(3)
        } else if (lead2 < 100) {
            lead_str2 = lead2.toFixed(2)
        } else {
            lead_str2 = lead2.toFixed(1)
        }

        output = lead_str2 + " " + million_str2 + thousand_str2 + unit_str2
    } else if (num.cmp(cutoff) >= 0) {
        if (game.notation === 12) {
            let exponent = Math.floor(num.exponent)
            let mantissa = num.mantissa
            output = mantissa.toFixed(3) + "e" + format_num(exponent)
        } else if (game.notation === 13) {
            let exponent = Math.floor(num.exponent / 3) * 3
            let mantissa = num.div(new Decimal(10).pow(exponent)).toNumber()
            if (mantissa < 10) {
                output = mantissa.toFixed(3) + "e" + format_num(exponent)
            } else if (mantissa < 100) {
                output = mantissa.toFixed(2) + "e" + format_num(exponent)
            } else {
                output = mantissa.toFixed(1) + "e" + format_num(exponent)
            }
        }
    }
    if (
        (num.cmp(1.7976931348622053 * 10 ** 308) === 1 ||
            num.cmp(1.7976931348622053 * 10 ** 308) === 0) &&
        game.notation !== 9 &&
        !game.om_bought[6]
    ) {
        output = "∞"
    }
    if (negative) {
        output = "-" + output
    }
    if (game.notation === 8) {
        output = "???"
    }
    return output
}

//special level formatting
function format_lvl(num) {
    let output = num.toString()
    if (num >= 1000) {
        let digits = output.length
        if (num < 10 ** 21) {
            for (let i = digits - 3; i > 0; i -= 3) {
                output = output.substr(0, i) + "," + output.substr(i)
            }
        }
    }

    if (game.notation === 8) {
        output = "???"
    }

    return output
}

//special decimal formatting
function format_eff(num) {
    if (game.notation === 8) {
        return "???"
    } else if (game.notation === 10) {
        if (num >= 100) {
            return format_num(Math.round(num))
        } else {
            const fraction_array = [
                "",
                "·",
                ":",
                "∴",
                "∷",
                "⁙",
                "S",
                "S·",
                "S:",
                "S∴",
                "S∷",
                "S⁙",
            ]
            let output = format_num(Math.floor(num))
            if (Math.floor(num) === 0) {
                if (Math.floor(num * 12) === 0) output = "0"
                else output = ""
            }
            output += fraction_array[Math.floor(num * 12) % 12]

            return output
        }
    } else if (game.notation === 11) {
        if (num >= 64 ** 2) {
            return format_num(Math.round(num))
        } else {
            const char_array = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
                "+",
                "/",
            ]
            output = ""

            let exponent = Math.floor(Math.log(num) / Math.log(64))

            for (let i = exponent; i >= 0; i--) {
                output += char_array[Math.floor(num / 64 ** i) % 64]
            }

            if (output === "") output = "0"
            output += "."

            output += char_array[Math.floor(num * 64) % 64]

            if (num < 64) {
                output += char_array[Math.floor(num * 64 ** 2) % 64]
            }
            if (num < 1) {
                output += char_array[Math.floor(num * 64 ** 3) % 64]
            }

            return output
        }
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

//special post-infinity decimal formatting
function format_eff_infinity(num) {
    if (num.cmp(1.7976931348622053 * 10 ** 308) === -1) {
        return format_eff(num.toNumber())
    } else {
        return format_infinity(num)
    }
}

//time formatting
function format_time(input) {
    var time = input / game.tickspeed
    let output = undefined
    if (time >= 10 ** 20 / game.tickspeed) {
        output = "a very long time"
    } else if (time < 1) {
        output = time.toFixed(3) + "s"
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
    const p = (32 / 27) * (4800 + o) ** 12 + m - n
    const q =
        (2 ** (5 / 6) * 3 ** (27 / 26) * (p - m + n) ** (77 / 78)) /
        7 ** (14 / 13)
    const r = ((27 * q) / 32) ** (1 / 14)
    const s = (32 / 27) * (7200 + r) ** 14 + p - q
    const t =
        (7 ** (18 / 17) * 2 ** (10 / 119) * (s - p + q) ** (117 / 119)) /
        3 ** (258 / 119)
    const u = ((27 * t) / 32) ** (1 / 18)
    const v = (32 / 27) * (8000 + u) ** 18 + s - t
    const w =
        (2 ** (131 / 120) * 3 ** (41 / 40) * (v - s + t) ** (119 / 120)) /
        7 ** (21 / 20)
    const x = ((27 * w) / 32) ** (1 / 21)
    const y = (32 / 27) * (10000 + x) ** 21 + v - w
    const z =
        (7 ** (24 / 23) * (y - v + w) ** (160 / 161)) /
        (2 ** (499 / 161) * 3 ** (3 / 161))
    const aa = ((27 * z) / 32) ** (1 / 24)
    const ab = (32 / 27) * (18000 + aa) ** 24 + y - z
    const ac =
        (2 ** (245 / 116) * (ab - y + z) ** (115 / 116)) /
        (3 ** (3 / 116) * 5 ** (30 / 29))
    const ad = ((27 * ac) / 32) ** (1 / 30)
    const ae = (32 / 27) * (90000 + ad) ** 30 + ab - ac
    const af =
        (5 ** (36 / 35) * (ae - ab + ac) ** (174 / 175)) /
        (2 * 3 ** (183 / 175))
    const ag = ((27 * af) / 32) ** (1 / 36)
    const ah = (32 / 27) * (170000 + ag) ** 36 + ae - af
    const ai = 1.6974910196784041 * 10 ** 189
    const aj = 0.0004031069968415499
    const ak = 760779.9379686277

    if (game.challenge !== 3 && game.challenge !== 9) {
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
        } else if (xp < p) {
            return Math.floor(
                ((27 * (xp + n - m)) / 32) ** (1 / 12) + 12000 - o
            )
        } else if (xp < s) {
            return Math.floor(
                ((27 * (xp + q - p)) / 32) ** (1 / 14) + 16800 - r
            )
        } else if (xp < v) {
            return Math.floor(
                ((27 * (xp + t - s)) / 32) ** (1 / 18) + 24000 - u
            )
        } else if (xp < y) {
            return Math.floor(
                ((27 * (xp + w - v)) / 32) ** (1 / 21) + 32000 - x
            )
        } else if (xp < ab) {
            return Math.floor(
                ((27 * (xp + z - y)) / 32) ** (1 / 24) + 42000 - aa
            )
        } else if (xp < ae) {
            return Math.floor(
                ((27 * (xp + ac - ab)) / 32) ** (1 / 30) + 60000 - ad
            )
        } else if (xp < ah) {
            return Math.floor(
                ((27 * (xp + af - ae)) / 32) ** (1 / 36) + 150000 - ag
            )
        } else {
            return Math.floor(Math.log(xp - ai) / aj - ak)
        }
    } else {
        let precision = 10 ** 14
        if (xp < a * 60) {
            let guess = 60
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) * (guess + 1) ** 2 * (4 * guess + 1)) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < d * 300) {
            let guess = 300
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 60 + c) ** 4 *
                            (6 * guess - 60 + c) +
                            a -
                            b) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < g * 1320) {
            let guess = 1320
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 300 + f) ** 5.5 *
                            (7.5 * guess - 300 + f) +
                            d -
                            e) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < j * 4200) {
            let guess = 4200
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 1320 + i) ** 7 *
                            (9 * guess - 1320 + i) +
                            g -
                            h) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < m * 12000) {
            let guess = 12000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 4200 + l) ** 8 *
                            (10 * guess - 4200 + l) +
                            j -
                            k) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < p * 16800) {
            let guess = 16800
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 12000 + o) ** 11 *
                            (13 * guess - 12000 + o) +
                            m -
                            n) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < s * 24000) {
            let guess = 24000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 16800 + r) ** 13 *
                            (15 * guess - 16800 + r) +
                            p -
                            q) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < v * 32000) {
            let guess = 32000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 24000 + u) ** 17 *
                            (19 * guess - 24000 + u) +
                            s -
                            t) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < y * 42000) {
            let guess = 42000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 32000 + x) ** 20 *
                            (22 * guess - 32000 + x) +
                            v -
                            w) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < ab * 60000) {
            let guess = 60000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 42000 + aa) ** 23 *
                            (25 * guess - 42000 + aa) +
                            y -
                            z) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < ae * 150000) {
            let guess = 150000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 60000 + ad) ** 29 *
                            (31 * guess - 60000 + ad) +
                            ab -
                            ac) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < ah * 320000) {
            let guess = 320000
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        ((32 / 27) *
                            (guess - 150000 + ag) ** 35 *
                            (37 * guess - 60000 + ag) +
                            ae -
                            af) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp < get_exp(965813)) {
            let guess = 965813
            let iterations = 0
            while (
                Math.abs(xp - get_exp(guess - 1)) > xp / precision &&
                iterations < 1000
            ) {
                guess =
                    (xp - get_exp(guess - 1)) /
                        (ai +
                            (aj * (guess - 1) + 1) *
                                Math.E ** (aj * (guess + ak))) +
                    guess
                iterations++
            }
            return Math.floor(guess)
        } else if (xp >= get_exp(965813)) {
            return 965813
        }
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
    const p = (32 / 27) * (4800 + o) ** 12 + m - n
    const q =
        (2 ** (5 / 6) * 3 ** (27 / 26) * (p - m + n) ** (77 / 78)) /
        7 ** (14 / 13)
    const r = ((27 * q) / 32) ** (1 / 14)
    const s = (32 / 27) * (7200 + r) ** 14 + p - q
    const t =
        (7 ** (18 / 17) * 2 ** (10 / 119) * (s - p + q) ** (117 / 119)) /
        3 ** (258 / 119)
    const u = ((27 * t) / 32) ** (1 / 18)
    const v = (32 / 27) * (8000 + u) ** 18 + s - t
    const w =
        (2 ** (131 / 120) * 3 ** (41 / 40) * (v - s + t) ** (119 / 120)) /
        7 ** (21 / 20)
    const x = ((27 * w) / 32) ** (1 / 21)
    const y = (32 / 27) * (10000 + x) ** 21 + v - w
    const z =
        (7 ** (24 / 23) * (y - v + w) ** (160 / 161)) /
        (2 ** (499 / 161) * 3 ** (3 / 161))
    const aa = ((27 * z) / 32) ** (1 / 24)
    const ab = (32 / 27) * (18000 + aa) ** 24 + y - z
    const ac =
        (2 ** (245 / 116) * (ab - y + z) ** (115 / 116)) /
        (3 ** (3 / 116) * 5 ** (30 / 29))
    const ad = ((27 * ac) / 32) ** (1 / 30)
    const ae = (32 / 27) * (90000 + ad) ** 30 + ab - ac
    const af =
        (5 ** (36 / 35) * (ae - ab + ac) ** (174 / 175)) /
        (2 * 3 ** (183 / 175))
    const ag = ((27 * af) / 32) ** (1 / 36)
    const ah = (32 / 27) * (170000 + ag) ** 36 + ae - af
    const ai = 1.6974910196784041 * 10 ** 189
    const aj = 0.0004031069968415499
    const ak = 760779.9379686277

    let output = 0
    if (lvl !== 0) {
        if (lvl < 60) {
            output = (32 / 27) * (lvl + 2) ** 3
        } else if (lvl < 300) {
            output = (32 / 27) * (lvl - 59 + c) ** 5 + a - b
        } else if (lvl < 1320) {
            output = (32 / 27) * (lvl - 299 + f) ** 6.5 + d - e
        } else if (lvl < 4200) {
            output = (32 / 27) * (lvl - 1319 + i) ** 8 + g - h
        } else if (lvl < 12000) {
            output = (32 / 27) * (lvl - 4199 + l) ** 9 + j - k
        } else if (lvl < 16800) {
            output = (32 / 27) * (lvl - 11999 + o) ** 12 + m - n
        } else if (lvl < 24000) {
            output = (32 / 27) * (lvl - 16799 + r) ** 14 + p - q
        } else if (lvl < 32000) {
            output = (32 / 27) * (lvl - 23999 + u) ** 18 + s - t
        } else if (lvl < 42000) {
            output = (32 / 27) * (lvl - 31999 + x) ** 21 + v - w
        } else if (lvl < 60000) {
            output = (32 / 27) * (lvl - 41999 + aa) ** 24 + y - z
        } else if (lvl < 150000) {
            output = (32 / 27) * (lvl - 59999 + ad) ** 30 + ab - ac
        } else if (lvl < 320000) {
            output = (32 / 27) * (lvl - 149999 + ag) ** 36 + ae - af
        } else {
            output = ai + Math.E ** (aj * (lvl + ak + 1))
        }

        if (game.challenge === 3 || game.challenge === 9) output *= lvl + 1
    }
    return output
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
    } else if (pp < 10720000) {
        return Math.floor((pp - 180000) / 20000)
    } else {
        return Math.floor(((pp - 10720000) / 20000) ** 0.8) + 527
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
    if (meme) color = "black"
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
        pp_name.innerHTML = this.name
        pp_name.className = "pp_name"

        //upgrade description
        let pp_desc = document.createElement("P")
        pp_desc.innerHTML = this.desc
        pp_desc.className = "pp_desc"

        //upgrade purchase button
        let pp_button = document.createElement("BUTTON")
        pp_button.innerHTML = "-" + this.price + " PP"
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
                document.getElementById("pp").innerHTML =
                    format_num(game.pp) + " PP"
            }
        })

        //upgrade priority
        let pp_priority = document.createElement("DIV")
        pp_priority.className = "pp_priority"
        let priority_text = document.createElement("P")
        priority_text.innerHTML = "Priority:"
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
        document.getElementById("p_upgrades_page").appendChild(pp_block)
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
            if (game.challenge !== 7) game.ml_boost = 2
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
        "Unlocks automation for Prestige<br>Also unlocks Past Prestiges in Statistics",
        3,
        function () {
            document.getElementById("auto_config").style.display = "block"
            document.getElementById("amp_auto").style.display = "inline"
            if (game.tab === 2)
                document.getElementById("prestige_tabs").style.display = "flex"
        },
        autoupgrade
    )
    //manual labor 2 [4]
    let ml2 = new pp_upgrade_child(
        "Manual Labor II",
        "Unautomated clicks are 4x stronger",
        4,
        function () {
            if (game.challenge !== 7) game.ml_boost = 4
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
        "Breaks the limits, allowing you to go beyond LVL 60<br>Also allows Auto-Prestige configuration<br>(Heads up! PP gain past LVL 60 is based on highest level instead)",
        5,
        function () {
            document.getElementById("auto_level").style.display = "block"
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
        "The Auto-Prestige panel will now display average AMP gained per second",
        7,
        function () {},
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
            if (game.challenge !== 7) game.ml_boost = 8
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
            if (
                game.challenge !== 1 &&
                game.challenge !== 7 &&
                game.challenge !== 9
            )
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
            if (game.challenge !== 7) game.exp_fluct *= 2
        },
        oc
    )
    //auto overclock [16]
    new pp_upgrade_child(
        "Auto-Overclocking",
        "Unlocks an automator that will automatically activate EXP Overclock when its cooldown is over",
        100,
        function () {
            if (
                game.challenge !== 1 &&
                game.challenge !== 7 &&
                game.challenge !== 9 &&
                !game.perks[20]
            )
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
            if (game.challenge !== 7) game.ml_boost = 16
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
        "Unlocks an upgrade that generates a boost to EXP production, increasing over time<br>(Caps at 20x)",
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
        "Unautomated clicks are boosted a further +32% for every Autoclicker tier<br>(Currently: 16x)",
        840,
        function () {
            if (game.challenge !== 7) game.ml_boost = 16 + game.cps * 0.16
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
            if (game.challenge !== 7)
                game.prestige_power = 1 + (game.prestige / 1000) ** (1 / 2)
            pp_upgrade.upgrades[27].desc =
                "EXP production is boosted based on how many times you have Prestiged<br>(Currently: " +
                format_eff(game.prestige_power) +
                "x)"
            pp_map
                .get(pp_upgrade.upgrades[27])
                .querySelector(".pp_desc").innerHTML =
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
            pp_upgrade.upgrades[30].desc =
                "EXP production is boosted based on your highest level<br>(Currently: " +
                format_eff(game.depth_power) +
                "x)"
            pp_map
                .get(pp_upgrade.upgrades[30])
                .querySelector(".pp_desc").innerHTML =
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
            if (game.challenge !== 7) game.exp_battery *= 3
        },
        prst_power
    )
    //exp capacitor [32]
    let capacitor = new pp_upgrade_child(
        "EXP Capacitor",
        "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it<br>Stored EXP can later be discharged at a 2x boost",
        15000,
        function () {
            if (
                game.challenge !== 1 &&
                game.challenge !== 7 &&
                game.challenge !== 9
            ) {
                document.getElementById("capacitor").style.display = "block"
                if (game.perks[9]) {
                    document.getElementById("dis_auto").style.display = "block"
                    document.getElementById("dis_text").style.display = "block"
                    document.getElementById("dis_input").style.display = "block"
                }
                if (game.perks[11] && game.autocp_toggle) {
                    set_capacitance(1)
                }
            }
            if (!game.achievements[49]) get_achievement(49)
        },
        aaa
    )
    //magnified flux [33]
    let magflux = new pp_upgrade_child(
        "Magnified Flux",
        "EXP Flux now increases 5x faster, and has a 5x higher cap",
        20000,
        function () {
            if (game.challenge !== 7) game.flux_boost *= 5
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
        "Unlocks 50% Capacitance mode, which gives a 4x boost on Discharge<br>Also unlocks automation for Discharge",
        30000,
        function () {
            if (
                game.challenge !== 1 &&
                game.challenge !== 7 &&
                game.challenge !== 9
            ) {
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
            if (game.challenge !== 7) game.exp_battery *= 3
        },
        magflux
    )
    //high voltage 2 [37]
    let hv2 = new pp_upgrade_child(
        "High Voltage II",
        "Unlocks 75% Capacitance mode, giving a 6x boost on Discharge",
        45000,
        function () {
            if (
                game.challenge !== 1 &&
                game.challenge !== 7 &&
                game.challenge !== 9
            ) {
                document.getElementById("cap_75").style.display = "inline"
                if (game.perks[11] && game.autocp_toggle) {
                    set_capacitance(3)
                }
            }
        },
        hv1
    )
    //high voltage 3 [38]
    new pp_upgrade_child(
        "High Voltage III",
        "Unlocks 100% Capacitance mode, giving a 8x boost on Discharge<br>Also allows you to Discharge at 0 seconds",
        60000,
        function () {
            if (
                game.challenge !== 1 &&
                game.challenge !== 7 &&
                game.challenge !== 9
            ) {
                document.getElementById("cap_100").style.display = "inline"
                document.getElementById("dis_input").min = 0
                if (game.perks[11] && game.autocp_toggle) {
                    set_capacitance(4)
                }
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
        perk_name.innerHTML = this.name
        perk_name.className = "perk_name"

        //perk description
        let perk_desc = document.createElement("P")
        perk_desc.innerHTML = this.desc
        perk_desc.className = "perk_desc"

        //perk completion box
        let perk_complete = undefined
        if (meme) perk_complete = document.createElement("BUTTON")
        else perk_complete = document.createElement("DIV")
        perk_complete.className = "perk_complete incomplete"

        //perk requirement
        let perk_requirement = document.createElement("P")
        if (this.requirement === 1)
            perk_requirement.innerHTML =
                "Requires<br>" + this.requirement + " watt"
        else
            perk_requirement.innerHTML =
                "Requires<br>" + this.requirement + " watts"
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
        "EXP production is boosted +5% for every achievement completed<br>Also unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec",
        1
    )
    //starter kit 5 [1]
    new generator_perk(
        "Starter Kit V",
        "+12 extra free tiers on every upgrade on the Upgrades tab<br>(Stacks with the first four Starter Kit Prestige upgrades)",
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
        "EXP Flux permanently increases 5x faster and has a 5x higher cap<br>(stacks with Magnified Flux if you have it, making it uncapped)",
        4
    )
    //multi-prestige [4]
    new generator_perk(
        "Multi-Prestige",
        "You gain 1 extra Times Prestiged stat for every 200 levels when you Prestige<br>Patience will also boost Times Prestiged stat by up to 30x",
        5
    )
    //ultracharge [5]
    new generator_perk(
        "Ultracharge",
        "EXP Overclocker cooldown time is halved a second time<br>(stacks with Supercharge)",
        6
    )
    //exp discount 1 [6]
    new generator_perk(
        "EXP Discount I",
        "All upgrades require 25% fewer levels",
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
        "Discharge is 2x stronger<br>Discharge automation is also now unlocked with the EXP Capacitor instead of High Voltage I",
        14
    )
    //technological gift 2 [10]
    new generator_perk(
        "Technological Gift II",
        "You begin Reboots with every PP upgrade up to EXP Overclocker already purchased",
        16
    )
    //autocapacitance [11]
    new generator_perk(
        "Auto-Capacitance",
        "Unlocks automated mode switching for Capacitor, automatically switching to the highest available mode<br>Also unlocks Smart Auto-Discharge, which automatically Discharges when best to do so",
        18
    )
    //starter kit 6 [12]
    new generator_perk(
        "Starter Kit VI",
        "All upgrades on the Upgrades tab have twice as many free tiers",
        20
    )
    //energize [13]
    new generator_perk(
        "Energize",
        "The spare PP requirement for Reboot stops increasing, and you gain more watts on Reboot the farther past 200,000 PP you go<br>Also unlocks Past Reboots in Statistics",
        24
    )
    //smart auto-prestige [14]
    new generator_perk(
        "Smart Auto-Prestige",
        "Unlocks a customizable Auto-Prestige setting that automatically switches between Peak and PP mode",
        32
    )
    //auto-reboot [15]
    new generator_perk("Auto-Reboot", "Unlocks automation for Reboot", 48)
    //speed power [16]
    new generator_perk(
        "Speed Power I",
        "EXP production is boosted based on your fastest Reboot",
        72
    )
    //challenges [17]
    new generator_perk("Challenges", "Unlocks Challenges", 144)
    //reboot residue [18]
    new generator_perk(
        "Reboot Residue",
        "You permanently keep 25% of your Times Prestiged stat every Reboot",
        432
    )
    //overachievements [19]
    new generator_perk(
        "Overachievements",
        "The Enter Reboot boost based on achievements now works multiplicatively instead of additively",
        864
    )
    //infinicharge [20]
    new generator_perk(
        "Infinicharge",
        "The cooldown on EXP Overclocker is removed entirely, making Overclocker always active",
        1728
    )
    //exp discount 2 [21]
    new generator_perk(
        "EXP Discount II",
        "All upgrades require 50% fewer levels",
        4096
    )
    //go nuclear [22]
    new generator_perk(
        "Go Nuclear",
        "Unlocks the Nuclear Reactor<br>Rebooting will now also give hydrogen",
        98304
    )
    //dual power [23]
    new generator_perk(
        "Dual Power",
        "Helium production is boosted based on how many watts you have",
        589824
    )
    //snowball effect [24]
    new generator_perk(
        "Snowball Effect",
        "Helium production is boosted based on how much helium you have",
        1769472
    )
    //deuterium channeling [25]
    new generator_perk(
        "Deuterium Channeling",
        "Deuterium Power now boosts hydrogen gains 2.50x per tier instead<br>(This applies retroactively)",
        4423680
    )
    //amp conversion [26]
    new generator_perk(
        "AMP Conversion",
        "You gain 20% of your pending AMP every second",
        8847360
    )
    //pp shift [27]
    new generator_perk(
        "PP Shift",
        "PP is immediately granted on leveling up rather than Prestiging<br>AMP Conversion now gives 100% of your pending AMP instead",
        15482880
    )
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
    new achievement("The limit does not exist", "Reach LVL 300", 6, 0)
    new achievement("Addicted to EXP", "Reach LVL 500", 7, 0)
    new achievement("The pursuit of madness", "Reach LVL 1,000", 8, 0)
    new achievement("I tried so hard and got so far", "Reach LVL 2,000", 9, 0)
    new achievement("Overexperienced", "Reach LVL 3,000", 10, 0)
    new achievement("Blood, sweat, and EXP", "Reach LVL 6,000", 11, 0)
    new achievement("Event horizon", "Reach LVL 12,000", 12, 0)
    new achievement(
        "And this is to go even further beyond",
        "Reach LVL 18,000",
        77,
        0
    )
    new achievement("You're still here?", "Reach LVL 24,000", 95, 0)
    new achievement("On a whole new level", "Reach LVL 30,000", 97, 0)
    new achievement("LVL -> BIG", "Reach LVL 40,000", 98, 0)
    new achievement(
        "I dunno man I don't think it's enough progress",
        "Reach LVL 50,000",
        115,
        0
    )
    new achievement(
        "Your parents wouldn't be proud",
        "Reach LVL 60,000",
        116,
        0
    )
    new achievement("To hell and back again", "Reach LVL 80,000", 130, 0)
    new achievement("The big one-oh-oh-oh-oh-oh", "Reach LVL 100,000", 131, 0)
    new achievement("The grandmaster of level ups", "Reach LVL 150,000", 135, 0)
    new achievement("200 Grand™", "Reach LVL 200,000", 137, 0)
    new achievement("Stare into the abyss", "Reach LVL 300,000", 145, 0)
    new achievement("Levels all the way down", "Reach LVL 500,000", 149, 0)
    new achievement(
        "What if the real levels were the friends we made along the way?",
        "Reach LVL 750,000",
        150,
        0
    )
    new achievement(
        "As it turns out, the limit DOES exist",
        "Reach LVL 1,000,000",
        151,
        0
    )
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
        "And the reward for misplaced effort goes to... you",
        "Prestige 1 million times",
        78,
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
        "So big it breaks Long notation",
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
        "One chonker number",
        "Get " + format_num(10 ** 36) + " all time EXP",
        29,
        0
    )
    new achievement(
        "Endless growth",
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
    new achievement(
        "45 digits is a lot",
        "Get " + format_num(10 ** 45) + " all time EXP",
        79,
        0
    )
    new achievement(
        "Hungolomghnonoloughongous",
        "Get " + format_num(10 ** 48) + " all time EXP",
        80,
        0
    )
    new achievement(
        "Big numbers for a big boy",
        "Get " + format_num(10 ** 51) + " all time EXP",
        93,
        0
    )
    new achievement(
        "I like my women like I like my numbers",
        "Get " + format_num(10 ** 57) + " all time EXP",
        96,
        0
    )
    new achievement(
        "Honestly quite sizeable",
        "Get " + format_num(10 ** 63) + " all time EXP",
        99,
        0
    )
    new achievement(
        "More! More! More!!",
        "Get " + format_num(10 ** 75) + " all time EXP",
        100,
        0
    )
    new achievement(
        "Generic large number achievement name #20",
        "Get " + format_num(10 ** 87) + " all time EXP",
        101,
        0
    )
    new achievement(
        "Well the digits keep comin and they don't stop comin",
        "Get " + format_num(10 ** 99) + " all time EXP",
        102,
        0
    )
    new achievement(
        "Honestly bro, this is just a really heckin big number... like I can't even think of any good name for this one so this is what you get",
        "Get " + format_num(10 ** 111) + " all time EXP",
        118,
        0
    )
    new achievement(
        "*notices your EXP*",
        "Get " + format_num(10 ** 123) + " all time EXP",
        132,
        0
    )
    new achievement(
        "EXP singularity",
        "Get " + format_num(10 ** 138) + " all time EXP",
        134,
        0
    )
    new achievement(
        "Halfway to infinity",
        "Get " + format_num(10 ** 153) + " all time EXP",
        138,
        0
    )
    new achievement(
        "On the exponential scale this isn't really that big",
        "Get " + format_num(10 ** 183) + " all time EXP",
        146,
        0
    )
    new achievement(
        "Even Zakuro didn't expect you to make it this far",
        "Get " + format_num(10 ** 228) + " all time EXP",
        152,
        0
    )
    new achievement(
        "A hundred, at least",
        "Get " + format_num(10 ** 303) + " all time EXP",
        153,
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
    new achievement(
        "Started from the bottom now we here",
        "Get " + format_num(10 ** 18) + " AMP",
        81,
        1
    )
    new achievement(
        "Nigh unstoppable",
        "Get " + format_num(10 ** 20) + " AMP",
        94,
        1
    )
    new achievement(
        "With great power comes great EXP",
        "Get " + format_num(10 ** 24) + " AMP",
        103,
        1
    )
    new achievement(
        "Where no man has gone before",
        "Get " + format_num(10 ** 28) + " AMP",
        117,
        1
    )
    new achievement(
        "To the end of space and time",
        "Get " + format_num(10 ** 32) + " AMP",
        133,
        1
    )
    new achievement("The only RNG in the game", "Unlock EXP Fluctuation", 43, 1)
    new achievement("Now we're getting somewhere", "Unlock EXP Factor", 44, 1)
    new achievement("The sky's the limit", "Get Limit Break", 45, 2)
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
    new achievement("Progress from lost progress", "Reboot 100 times", 82, 3)
    new achievement(
        "Try turning it off and on again",
        "Reboot 1,000 times",
        83,
        3
    )
    new achievement("Picking up the pace", "Reboot in under 1 hour", 60, 3)
    new achievement("GAS GAS GAS", "Reboot in under 10 minutes", 74, 3)
    new achievement("Escape velocity", "Reboot in under 1 minute", 84, 3)
    new achievement("At the speed of light", "Reboot in under 1 second", 85, 3)
    new achievement(
        "Did you miss them?",
        "Complete Challenge I for the first time",
        86,
        3
    )
    new achievement(
        "That's some serious markup",
        "Complete Challenge II for the first time",
        87,
        3
    )
    new achievement(
        "When the levels are not so easy",
        "Complete Challenge III for the first time",
        88,
        3
    )
    new achievement(
        "Oops! All pushing",
        "Complete Challenge IV for the first time",
        89,
        3
    )
    new achievement(
        "The definition of diminishing returns",
        "Complete Challenge V for the first time",
        108,
        3
    )
    new achievement(
        "Calculated",
        "Complete Challenge VI for the first time",
        109,
        3
    )
    new achievement(
        "Helium is love Helium is life",
        "Complete Challenge VII for the first time",
        110,
        3
    )
    new achievement(
        "Like kicking a brick wall",
        "Complete Challenge VIII for the first time",
        111,
        3
    )
    new achievement(
        "Jack of all trades",
        "Complete Challenge IX for the first time",
        112,
        3
    )
    new achievement(
        "Ace of one trade",
        "Complete a single challenge 12 times",
        90,
        3
    )
    new achievement(
        "One down, eight to go",
        "Complete a single challenge 20 times",
        158,
        4
    )
    new achievement(
        "I like a little challenge in my life",
        "Get 27 total challenge completions",
        91,
        3
    )
    new achievement(
        "That was only half as difficult",
        "Get 54 total challenge completions",
        113,
        3
    )
    new achievement(
        "Ultimate completionism",
        "Get 108 total challenge completions",
        114,
        3
    )
    new achievement(
        "Never again again",
        "Get 180 total challenge completions",
        159,
        4
    )
    new achievement(
        "Congration, you done it",
        "Unlock all 28 Generator Perks",
        104,
        3
    )
    new achievement("Fusion mailed", "Unlock the Nuclear Reactor", 105, 3)
    new achievement(
        "This bad boy can fit so much hydrogen in it",
        "Upgrade every core of the Reactor",
        106,
        3
    )
    new achievement(
        "Critical mass",
        "Make " + format_num(10 ** 30) + " mg helium/sec",
        107,
        3
    )
    new achievement(
        "In case of implosion look at implosion",
        "Make " + format_num(10 ** 60) + " mg helium/sec",
        148,
        3
    )
    new achievement(
        "No shortage of helium for sure",
        "Make " + format_num(10 ** 90) + " mg helium/sec",
        157,
        3
    )
    new achievement("Tesseract one", "Quantize 1 time", 120, 4)
    new achievement(
        "Now you're thinking with photons!",
        "Quantize 3 times",
        121,
        4
    )
    new achievement("Your life, in particles", "Quantize 5 times", 122, 4)
    new achievement(
        "Luckily they banished him to an island",
        "Quantize 10 times",
        123,
        4
    )
    new achievement(
        "Haha what if we turned everything you've ever done into light",
        "Quantize 25 times",
        124,
        4
    )
    new achievement("Back into the blender again", "Quantize 50 times", 139, 4)
    new achievement("You should go get a PhD", "Quantize 100 times", 140, 4)
    new achievement(
        "Heat death of the universe",
        "Quantize 1,000 times",
        160,
        4
    )
    new achievement("All hail the Prism", "Reach Prism LVL 1", 126, 4)
    new achievement("Let its light inside you", "Reach Prism LVL 10", 127, 4)
    new achievement("Dazzling brilliance", "Reach Prism LVL 30", 125, 4)
    new achievement("Superluminous", "Reach Prism LVL 100", 141, 4)
    new achievement(
        "Okay that was too bright I'm blind now",
        "Reach Prism LVL 200",
        161,
        4
    )
    new achievement("With great haste", "Quantize in under 1 hour", 128, 4)
    new achievement(
        "Look at the sparks fly",
        "Quantize in under 5 minutes",
        129,
        4
    )
    new achievement(
        "Quickest reset in the west",
        "Quantize in under 1 minute",
        136,
        4
    )
    new achievement("Mach 874,030", "Quantize in under 30 seconds", 142, 4)
    new achievement(
        "Actually faster than light",
        "Quantize in under 10 seconds",
        147,
        4
    )
    new achievement(
        "Objects in well are heavier than they appear",
        "Unlock the Gravity Well",
        143,
        4
    )
    new achievement("Transfinite windup toy", "Unlock the Omega Drive", 156, 4)
    new achievement(
        "To infinity and not beyond",
        "Reach ∞ kg dark matter",
        144,
        4
    )
    new achievement(
        "Infinity doesn't seem so far anymore",
        "Reach ∞ kg dark matter in under 1 minute",
        154,
        4
    )
    new achievement(
        "At any point did someone say it was too much dark matter?",
        "Reach ∞ kg dark matter",
        155,
        4
    )
    new achievement("Infinity to one, real quick", "Reach Omega LVL 1", 162, 4)
    new achievement(
        "Now don't collapse too much or you might break it",
        "Reach Omega LVL 10",
        163,
        4
    )
    new achievement("Impressive", "Reach Omega LVL 30", 164, 4)
    new achievement(
        "The Challenge to end all Challenges",
        "Complete the Omega Challenge for the first time",
        165,
        4
    )
    new achievement(
        "Not a task for the faint of heart",
        "Complete the Omega Challenge 5 times",
        166,
        4
    )
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
        "A whole lot of nothing",
        "Gain no EXP for 10 minutes",
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
    new achievement(
        "Stuck between no eyes and a hard place",
        "Complete a challenge while using ??? notation",
        92,
        5
    )
    new achievement(
        "You could stop at five or six Prestiges, or just none",
        "Reboot without Prestiging",
        119,
        5
    )
    new achievement(
        "Like adding a needle to a haystack",
        "Manually upgrade a Reactor core when it has already been upgraded 100,000 times",
        167,
        5
    )
    new achievement(
        "A real power move",
        "Quantize without upgrading the Reactor",
        168,
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
        notif_text.innerHTML = this.text
        if (!meme) notif_text.style.color = this.color
        notif_text.className = "notif_text"

        notification.appendChild(notif_text)
        document.getElementById("notifications").appendChild(notification)
        notif_map.set(this, notification)
    }
}

//challenges class
class challenge {
    static challenges = []

    name
    desc
    goal
    step
    step2
    goal2
    step3
    step4

    //challenge constructor
    constructor(name, desc, goal, step, step2, goal2, step3, step4) {
        this.name = name
        this.desc = desc
        this.goal = goal
        this.goal2 = goal2
        this.id = challenge.challenges.length + 1
        this.step = step
        this.step2 = step2
        this.step3 = step3
        this.step4 = step4

        challenge.challenges.push(this)

        //challenge name
        let challenge_name = document.createElement("P")
        challenge_name.innerHTML = this.name
        challenge_name.className = "challenge_name"

        //challenge description
        let challenge_desc = document.createElement("P")
        challenge_desc.innerHTML = this.desc
        challenge_desc.className = "challenge_desc"

        //challenge goal
        let challenge_goal = document.createElement("P")
        challenge_goal.innerHTML =
            'Goal: <span class="challenge_pp">' +
            format_num(this.goal) +
            " PP</span>"
        challenge_goal.className = "challenge_goal"

        //challenge_completions
        let challenge_complete = document.createElement("P")
        challenge_complete.innerHTML =
            "Completions: " +
            format_num(0) +
            " / " +
            format_num(12) +
            "<br>EXP boost from completions: " +
            format_eff(1) +
            "x"
        challenge_complete.className = "challenge_complete"

        //enter challenge button
        let enter_button = document.createElement("BUTTON")
        enter_button.innerHTML = "ENTER CHALLENGE"
        enter_button.className = "enter_button"
        enter_button.addEventListener("click", () => {
            enter_challenge(this.id)
        })

        //all text div
        let challenge_text = document.createElement("DIV")
        challenge_text.className = "challenge_text"
        challenge_text.appendChild(challenge_name)
        challenge_text.appendChild(challenge_desc)
        challenge_text.appendChild(challenge_goal)
        challenge_text.appendChild(challenge_complete)

        //entire challenge div
        let challenge_block = document.createElement("DIV")
        challenge_block.className = "challenge_block"
        challenge_block.appendChild(challenge_text)
        challenge_block.appendChild(enter_button)

        //attatching challenge to challenges page
        challenge_map.set(this, challenge_block)
        document.getElementById("challenge_panel").appendChild(challenge_block)
    }
}

//initializing challenges
{
    new challenge(
        "Challenge I",
        "EXP Overclocker and EXP Capacitor are disabled",
        225000,
        65000,
        5000,
        102330000,
        71335000,
        6685000
    )
    new challenge(
        "Challenge II",
        "All upgrades require " + format_num(5) + "x as many levels",
        280000,
        95000,
        5000,
        99995000,
        58075000,
        4340000
    )
    new challenge(
        "Challenge III",
        "Levels require more EXP the more levels you have",
        340000,
        80000,
        5000,
        91880000,
        51440000,
        4560000
    )
    new challenge(
        "Challenge IV",
        "You must surpass your highest level to gain more AMP, Patience does not apply",
        585000,
        120000,
        -5000,
        114750000,
        62420000,
        5235000
    )
    new challenge(
        "Challenge V",
        "All EXP production reduces to zero over 30 seconds",
        750000,
        390000,
        -15000,
        103295000,
        57775000,
        2100000
    )
    new challenge(
        "Challenge VI",
        "All EXP production is divided by " +
            format_num(10 ** 12) +
            ", Multi-Prestige and Reboot Residue do not apply<br>Reboot in 6 Prestiges or less",
        1420000,
        0,
        0,
        63640000,
        11225000,
        -645000
    )
    new challenge(
        "Challenge VII",
        "All Upgrades tab things except EXP Boost and Autoclicker are disabled<br>The only EXP multipliers that apply are AMP, Challenge boosts, and Helium",
        1745000,
        185000,
        30000,
        14115000,
        3975000,
        540000
    )
    new challenge(
        "Challenge VIII",
        "Helium production is disabled",
        1645000,
        100000,
        -5000,
        9320000,
        230000,
        20000
    )
    new challenge(
        "Challenge IX",
        "All rules from the first four challenges, simultaneously<br>All EXP production is divided by " +
            format_num(10 ** 16) +
            ", AMP Conversion does not apply",
        3000000,
        200000,
        -10000,
        56800000,
        10200000,
        900000
    )
}
//done initializing challenges

//reactor core class
class core {
    static cores = []

    base

    //core constructor
    constructor(base) {
        this.id = core.cores.length
        this.base_price = base
        game.core_price[this.id] = base

        core.cores.push(this)

        //core id
        let core_id = document.createElement("P")
        core_id.innerHTML = "Core " + format_num(this.id)
        core_id.className = "core_id"

        //core power
        let core_power = document.createElement("P")
        if (this.id === 0)
            core_power.innerHTML = "+" + format_eff(0) + " mg base helium/sec"
        else core_power.innerHTML = format_num(1) + "x helium production"
        core_power.className = "core_power"

        //core upgrade button
        let core_button = document.createElement("BUTTON")
        core_button.innerHTML =
            "-" + format_num(this.base_price) + " g hydrogen"
        core_button.className = "core_button core_locked"
        core_button.addEventListener("click", () => {
            if (!game.buy_max) {
                if (game.hydrogen >= game.core_price[this.id]) {
                    game.hydrogen -= game.core_price[this.id]
                    game.budget -= game.core_price[this.id]
                    if (game.budget < 0) game.budget = 0
                    game.core_level[this.id]++

                    if (
                        game.core_level[this.id] >
                        Math.floor(500000 / 2 ** this.id)
                    ) {
                        game.core_price[this.id] +=
                            (this.base_price *
                                (game.core_level[this.id] -
                                    Math.floor(500000 / 2 ** this.id)) **
                                    1.65) /
                            4
                    } else {
                        game.core_price[this.id] += this.base_price / 4
                    }

                    if (!game.achievements[106] && this.id === 7)
                        get_achievement(106)

                    if (
                        !game.achievements[167] &&
                        game.core_level[this.id] > 100000
                    )
                        get_achievement(167)
                }
            } else {
                while (game.hydrogen >= game.core_price[this.id]) {
                    game.hydrogen -= game.core_price[this.id]
                    game.budget -= game.core_price[this.id]
                    if (game.budget < 0) game.budget = 0
                    game.core_level[this.id]++
                    if (
                        game.core_level[this.id] >
                        Math.floor(1000000 / 2 ** this.id)
                    ) {
                        game.core_price[this.id] +=
                            (this.base_price *
                                (game.core_level[this.id] -
                                    Math.floor(500000 / 2 ** this.id)) **
                                    1.65) /
                            4
                    } else {
                        game.core_price[this.id] += this.base_price / 4
                    }

                    if (!game.achievements[106] && this.id === 7)
                        get_achievement(106)
                }
            }
        })

        //all text div
        let core_text = document.createElement("DIV")
        core_text.className = "core_text"
        core_text.appendChild(core_id)
        core_text.appendChild(core_power)

        //entire upgrade div
        let core_block = document.createElement("DIV")
        core_block.className = "reactor_core"
        core_block.appendChild(core_text)
        core_block.appendChild(core_button)
        if (this.id === 0) core_block.id = "core0"

        //attatching upgrade to prestige page
        reactor_map.set(this, core_block)
        document.getElementById("core_page").appendChild(core_block)
    }
}

//initializing reactor cores
new core(1)
new core(3)
new core(10)
new core(36)
new core(136)
new core(528)
new core(2080)
new core(8256)
//done initializing cores

//quantum upgrade class
class quantum_upgrade {
    static upgrades = []

    name
    desc
    price
    func

    //quantum constructor
    constructor(name, desc, price, func) {
        this.name = name
        this.desc = desc
        this.price = price
        this.id = quantum_upgrade.upgrades.length
        game.qu_bought[this.id] = false
        this.on_purchase = func

        quantum_upgrade.upgrades.push(this)

        //upgrade name
        let qu_name = document.createElement("P")
        qu_name.innerHTML = this.name
        qu_name.className = "qu_name"

        //upgrade description
        let qu_desc = document.createElement("P")
        qu_desc.innerHTML = this.desc
        qu_desc.className = "qu_desc"

        //upgrade purchase button
        let qu_button = document.createElement("BUTTON")
        qu_button.innerHTML = "-" + this.price + " photons"
        qu_button.className = "qu_button unlit"
        qu_button.addEventListener("click", () => {
            if (
                game.photons >= this.price &&
                game.qu_bought[this.id] === false
            ) {
                game.photons -= this.price
                game.qu_bought[this.id] = true
                this.on_purchase()
                prism_update()
                if (game.photons === 1 && game.notation !== 8)
                    document.getElementById("photons_text").innerHTML = "photon"
                else
                    document.getElementById("photons_text").innerHTML =
                        "photons"
            }
        })

        //all text div
        let qu_text = document.createElement("DIV")
        qu_text.className = "qu_text"
        qu_text.appendChild(qu_name)
        qu_text.appendChild(qu_desc)

        //entire upgrade div
        let qu_block = document.createElement("DIV")
        qu_block.className = "qu_upgrade"
        qu_block.appendChild(qu_text)
        qu_block.appendChild(qu_button)

        //attatching upgrade to prism page
        quantum_map.set(this, qu_block)
        document.getElementById("prism_page").appendChild(qu_block)
    }
}

//initializing quantum upgrades
//beta decay [0]
new quantum_upgrade(
    "Beta Decay",
    "Helium production is boosted based on unspent hydrogen",
    5,
    function () {}
)
//advanced auto-reboot [1]
new quantum_upgrade(
    "Advanced Auto-Reboot",
    "Unlocks Time mode for Auto-Reboot",
    100,
    function () {}
)
//ease of compeltion [2]
new quantum_upgrade(
    "Ease of Completion",
    "You can do multiple completions per Challenge attempt, and completions are given automatically",
    1600,
    function () {}
)
//speed power 2 [3]
new quantum_upgrade(
    "Speed Power II",
    "EXP production is boosted based on your fastest Quantum Iteration",
    28000,
    function () {}
)
//auto-reactor [4]
new quantum_upgrade(
    "Auto-Reactor",
    "Unlocks automation for Reactor core upgrades",
    640000,
    function () {}
)
//quantum privilege [5]
new quantum_upgrade(
    "Quantum Privilege",
    "Quantize no longer resets Challenge completions",
    7.68 * 10 ** 7,
    function () {}
)
//helium avalanche [6]
new quantum_upgrade(
    "Helium Avalanche",
    "The Snowball Effect perk becomes stronger",
    4.8 * 10 ** 10,
    function () {}
)
//gravity well [7]
new quantum_upgrade(
    "Gravity Well",
    "Unlocks the Gravity Well",
    4.32 * 10 ** 13,
    function () {
        document.getElementById("quantum_tabs").style.display = "flex"
        if (!game.achievements[143]) get_achievement(143)
    }
)
//done initializing quantum upgrades

//dark upgrade class
class dark_upgrade {
    static upgrades = []

    name
    desc
    price
    func

    //dark constructor
    constructor(name, desc, price, func) {
        this.name = name
        this.desc = desc
        this.price = price
        this.id = dark_upgrade.upgrades.length
        game.dk_bought[this.id] = false
        this.on_purchase = func

        dark_upgrade.upgrades.push(this)

        //upgrade name
        let dk_name = document.createElement("P")
        dk_name.innerHTML = this.name
        dk_name.className = "dk_name"

        //upgrade description
        let dk_desc = document.createElement("P")
        dk_desc.innerHTML = this.desc
        dk_desc.className = "dk_desc"

        //upgrade purchase button
        let dk_button = document.createElement("BUTTON")
        dk_button.innerHTML = "-" + this.price + " photons"
        dk_button.className = "qu_button unlit"
        dk_button.addEventListener("click", () => {
            if (
                game.photons >= this.price &&
                game.dk_bought[this.id] === false
            ) {
                game.photons -= this.price
                game.dk_bought[this.id] = true
                this.on_purchase()
                prism_update()
                if (game.photons === 1 && game.notation !== 8)
                    document.getElementById("photons_text").innerHTML = "photon"
                else
                    document.getElementById("photons_text").innerHTML =
                        "photons"
            }
        })

        //all text div
        let dk_text = document.createElement("DIV")
        dk_text.className = "dk_text"
        dk_text.appendChild(dk_name)
        dk_text.appendChild(dk_desc)

        //entire upgrade div
        let dk_block = document.createElement("DIV")
        dk_block.className = "dk_upgrade"
        dk_block.appendChild(dk_text)
        dk_block.appendChild(dk_button)

        //attatching upgrade to gravity well page
        quantum_map.set(this, dk_block)
        document.getElementById("gravity_page").appendChild(dk_block)
    }
}

//initializing dark upgrades
//expert auto-reboot [0]
new dark_upgrade(
    "Expert Auto-Reboot",
    "Unlocks automation for not rebooting (to push levels for gaining photons)",
    5.2 * 10 ** 16,
    function () {}
)
//auto-quantize [1]
new dark_upgrade(
    "Auto-Quantize",
    "Unlocks Quantize automation",
    7.8 * 10 ** 19,
    function () {}
)
//photonic infusion [2]
new dark_upgrade(
    "Photonic Infusion",
    "EXP production is boosted based on unspent photons",
    1.56 * 10 ** 23,
    function () {}
)
//extended difficulty [3]
new dark_upgrade(
    "Extended Difficulty",
    "All challenges can now be completed up to 20 times<br>Completions past 12 also give a helium production boost",
    1.872 * 10 ** 27,
    function () {}
)
//atomic refraction [4]
new dark_upgrade(
    "Atomic Refraction",
    "Helium production is boosted based on Prism LVL",
    9.36 * 10 ** 32,
    function () {}
)
//open sesame [5]
new dark_upgrade(
    "Open Sesame",
    "Hydrogen now no longer requires 98,304 watts to be gained<br>Deuterium Power now also boosts 3x instead",
    10 ** 39,
    function () {}
)
//gravitational waves [6]
new dark_upgrade(
    "Gravitational Waves",
    "Dark matter also boosts helium production at a reduced amount",
    1.5 * 10 ** 45,
    function () {}
)
//omega drive [7]
new dark_upgrade(
    "Omega Drive",
    "Unlocks the Omega Drive",
    3.75 * 10 ** 51,
    function () {
        if (!game.achievements[156]) get_achievement(156)
    }
)
//done initializing dark upgrades

//omega upgrade class
class omega_upgrade {
    static upgrades = []

    name
    desc
    price
    func

    //omega constructor
    constructor(name, desc, price, func) {
        this.name = name
        this.desc = desc
        this.price = price
        this.id = omega_upgrade.upgrades.length
        game.om_bought[this.id] = false
        this.on_purchase = func

        omega_upgrade.upgrades.push(this)

        //upgrade name
        let om_name = document.createElement("P")
        om_name.innerHTML = this.name
        om_name.className = "om_name"

        //upgrade description
        let om_desc = document.createElement("P")
        om_desc.innerHTML = this.desc
        om_desc.className = "om_desc"

        //upgrade purchase button
        let om_button = document.createElement("BUTTON")
        om_button.innerHTML = "-" + this.price + " photons"
        om_button.className = "qu_button unlit"
        om_button.addEventListener("click", () => {
            if (
                game.photons >= this.price &&
                game.om_bought[this.id] === false
            ) {
                game.photons -= this.price
                game.om_bought[this.id] = true
                this.on_purchase()
                prism_update()
                if (game.photons === 1 && game.notation !== 8)
                    document.getElementById("photons_text").innerHTML = "photon"
                else
                    document.getElementById("photons_text").innerHTML =
                        "photons"
            }
        })

        //all text div
        let om_text = document.createElement("DIV")
        om_text.className = "om_text"
        om_text.appendChild(om_name)
        om_text.appendChild(om_desc)

        //entire upgrade div
        let om_block = document.createElement("DIV")
        om_block.className = "om_upgrade"
        om_block.appendChild(om_text)
        om_block.appendChild(om_button)

        //attatching upgrade to gravity well page
        quantum_map.set(this, om_block)
        document.getElementById("omega_page").appendChild(om_block)
    }
}

//initializing omega upgrades
//auto-collapse [0]
new omega_upgrade(
    "Auto-Collapse",
    "Unlocks automation for collapse",
    1.875 * 10 ** 59,
    function () {}
)
//advanced auto-quantize [1]
new omega_upgrade(
    "Advanced Auto-Quantize",
    "Unlocks Step mode for Quantize automation",
    2.813 * 10 ** 67,
    function () {}
)
//omega supplement [2]
new omega_upgrade(
    "Omega Supplement",
    "Dark matter growth factor is boosted based on your Highest Omega LVL",
    8.438 * 10 ** 75,
    function () {}
)
//auto-growth [3]
new omega_upgrade(
    "Auto-Growth",
    "Unlocks automation for Growth Factor upgrade",
    4.219 * 10 ** 84,
    function () {}
)
//auto-prism [4]
new omega_upgrade(
    "Auto-Prism",
    "Unlocks automation for Prism upgrading",
    3.164 * 10 ** 93,
    function () {}
)
//transfinite liberty [5]
new omega_upgrade(
    "Transfinite Liberty",
    "The penalty for collapse is weaker",
    3.322 * 10 ** 102,
    function () {}
)
//the great beyond [6]
new omega_upgrade(
    "The Great Beyond",
    "You can gain more than ∞ kg dark matter<br>Growth Factor will be reduced the further past ∞ kg you go",
    4.651 * 10 ** 111,
    function () {}
)
//omega challenge [7]
new omega_upgrade(
    "Omega Challenge",
    "Unlocks the Omega Challenge",
    8.372 * 10 ** 120,
    function () {}
)
//done initializing omega upgrades
