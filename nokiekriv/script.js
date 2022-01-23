'use strict';
let ctx;

const preParp = "#fff";
const zikParp = "#000";

let kawarchor = new Map();
let ziker = new Map();
let misper = new Map();

let prenkwer = new Map();
let meiokiPrenkw = 0;

let postnkwer = new Map();
let meiokiPostnkw = 0;

function splitOnce(string, pattern) {
    let idx = string.search(pattern);
    return [string.substring(0, idx), string.substring(idx + 1)]
}

function explode(name) {
    return [
        name.replaceAll("ä", "a").replaceAll("ö", "o").replaceAll("ü", "u"),
        name.replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue")
    ]
}

function kawarVZiker(wort) {
    return [...wort].map(
        (zik, misp) => (
            ((misp == wort.length - 1) ? "+7" : "&f")
            + (ziker.get(zik.toLowerCase()) || ziker.get("#ander"))
        )
    ).join(" ");
}

function kawarVMisper(wort) {
    return [...wort].map(
        (zik, misp) => {
            let sus = misper.get(zik) ?? misper.get("#ander");
            if (misp == wort.length - 1) {
                return "+" + sus
            } else {
                return "&" + sus.substring(0, sus.length - 1) + (parseInt(sus.at(-1), 16) | 8).toString(16)
            }
        }
    ).join(" ");
}

function ozefPrenkw(name, value) {
    prenkwer.set(name, value);
    if (value.length > meiokiPrenkw) { meiokiPrenkw = value.length; }
}
function ozefPostnkw(name, value) {
    postnkwer.set(name, value);
    if (value.length > meiokiPostnkw) { meiokiPostnkw = value.length; }
}

const toutfairechat = {
    "##": () => { },
    "#kawar": (name, value) => {
        let parsed = ovsäMaghchat(value);
        if (parsed === null) { console.log(`netov maghchat v ${name}`); return; }
        for (let n of explode(name)) { kawarchor.set(n, parsed); }
    },
    "#zik": (name, value) => ziker.set(name, value),
    "#misp": (name, value) => misper.set(name === "#efes" ? " " : name, value),
    "#prenkw": (name, value) => ozefPrenkw(name, ovsäMaghchat(value)),
    "#postnkw": (name, value) => ozefPostnkw(name, ovsäMaghchat(value)),
    "#kawarprenkw": (name, value) => {
        let parsed = ovsäMaghchat(value);
        if (parsed === null) { console.log(`netov maghchat v ${name}`); return; }
        for (let n of explode(name)) {
            kawarchor.set(n, parsed);
            ozefPrenkw(n, parsed);
        }
    },
    "#kawarpostnkw": (name, value) => {
        let parsed = ovsäMaghchat(value);
        if (parsed === null) { console.log(`netov maghchat v ${name}`); return; }
        for (let n of explode(name)) {
            kawarchor.set(n, parsed);
            ozefPostnkw(n, parsed);
        }
    }
}

function faireFairechater(fairechater) {
    for (let ziklinja of fairechater.split("\n")) {
        if (ziklinja[0] != "#") { continue; }
        let [fairechatname, anderchoser] = splitOnce(ziklinja.trimStart(), " ");
        let [ikijem, doujem] = splitOnce(anderchoser, " ");
        (toutfairechat[fairechatname] ?? (
            () => { console.log(`inv fairechat ${fairechatname}`); }
        ))(ikijem, doujem.trimEnd());
    }
}

function ovsäWort(wort) {
    if ("+&".includes(wort[0])) {
        return wort.toLowerCase() + "0".repeat(8 - wort.length);

    } else if (wort === "//" || wort === "\n") {
        return "//"

    } else if (wort === "  ") {
        return kawarchor.get("#efes");

    } else if ([".", ",", ":", "?", "!", "...", "(", ")"].includes(wort)) {
        return kawarchor.get(wort);

    } else if ("0123456789".includes(wort[0])) {
        return kawarVMisper(wort);

    } else if (wort[0] === "$") {
        return kawarVMisper(wort.substring(1, wort.length - 1))

    } else if (wort[0] === '"') {
        return wort.substring(1, wort.length - 1)
            .replaceAll("A", "ä").replaceAll("O", "ö").replaceAll("U", "ü")
            .replaceAll("E", "ë").replaceAll("N", "ŋ")
            .toLowerCase()
            .split(" ").map(kawarVZiker).join(" ");

    } else {
        opadWort(wort.toLowerCase()
            .replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue")
            .replaceAll("ë", "e").replaceAll("ŋ", "ng"));
    }
}

function opadWort(wort) {
    
    if (kawarchor.has(wort)) {
        return kawarchor.get(wort);
    } else {
        for (let i = 1; i <= Math.min(meiokiPrenkw, wort.length - 1); i++) {
            const substr = wort.substring(0, i);
            if (prenkwer.has(substr)) {
                const rest = opadWort(wort.substring(i));
                if (rest) { return prenkwer.get(substr) + " " + rest; }
            }
        }
        for (let i = 1; i <= Math.min(meiokiPrenkw, wort.length - 1); i++) {
            const substr = wort.substring(wort.length - i);
            if (postnkwer.has(substr)) {
                const rest = opadWort(wort.substring(0, wort.length - i));
                if (rest) { return rest + " " + postnkwer.get(substr); }
            }
        }
        return null;
    }
}


function ovsäMaghchat(mogus) {
    return [...mogus.matchAll(
        /[a-zäëöüŋA-ZÄËÖÜŊ']+|\.\.\.|[\.,:?!()]|"[a-zäëöüŋA-ZÄËÖÜŊ'\- ]+"|  |[+&][0-9a-fA-F]{1,7}|\/\/|\n|[0-9]+/g
    )].map(word =>
        ovsäWort(word[0]) ?? kawarVZiker(word[0])
    ).join(" ");
}

function faireLinjar(ovsärt, lukbater) {
    const zakerVLinja = Math.floor(lukbater / 4);
    let linjar = [];
    for (let linja of ovsärt.split("//")) {
        linja = linja.trim();

        if (linja) { linja = linja.split(" "); }
        else { linjar.push([]); continue; }  // "".split(" ") is [""] (???)

        let dji = 0;
        while (dji < linja.length) {
            let zor = dji + zakerVLinja;
            while ((linja[zor - 1] ?? "+")[0] == "&") {
                zor--;
                if (zor <= dji) { zor = dji + zakerVLinja; break; }  // ku zak ist plynagai linja
            }
            linjar.push(linja.slice(dji, zor));
            dji = zor;
        }
    }
    return linjar;
}

function faireOrasSus(ctx, linjar, lukbattäj) {
    for (const [yy, line] of linjar.entries()) {
        for (const [xx, oras] of line.entries()) {
            if ("+&".includes(oras[0])) {
                for (let y = 0; y < 7; y++) {
                    const seläre = parseInt(oras[y + 1], 16);
                    for (let x = 0; x < 4; x++) {
                        if (seläre & (1 << x)) {
                            ctx.fillRect(
                                (xx * 4 + x + 1) * lukbattäj,
                                (yy * 8 + y + 1) * lukbattäj,
                                lukbattäj, lukbattäj);
                        }
                    }
                }
            } else {
                console.log(`${oras} ist wa???`);
                continue;
            }
        }
    }
}

function loridOras(ctx) {
    ctx.fillStyle = preParp;
    ctx.fillRect(0, 0, oras.width, oras.height);
    ctx.fillStyle = zikParp;
}

function faireOras() {
    const ekrivmist = document.getElementById("ekrivmist");
    const oras = document.getElementById("oras");
    const lukbattäj = parseInt(document.getElementById("lukbattaej").value, 10);
    if (!(lukbattäj >= 1)) { return; }

    const parsed = ovsäMaghchat(ekrivmist.value);

    const xTäj = ekrivmist.parentElement.offsetWidth;
    oras.width = xTäj;

    if (parsed === "") { oras.height = 9 * lukbattäj; loridOras(ctx); return; }
    const lukbaterVLinja = Math.floor(xTäj / lukbattäj - 2);
    if (lukbaterVLinja < 8) { return; }
    const linjar = faireLinjar(parsed, lukbaterVLinja);

    oras.height = (linjar.length * 8 + 1) * lukbattäj;

    loridOras(ctx);

    faireOrasSus(ctx, linjar, lukbattäj);

}

fetch("./fairechoser.txt")
    .then(req => req.text())
    .then(txt => {
        faireFairechater(txt);
        //console.debug(kawarchor, ziker, prenkwer, postnkwer);
        ctx = document.getElementById("oras").getContext('2d', {alpha: false});
        window.addEventListener("resize", faireOras);
        document.getElementById("ekrivmist").addEventListener("input", faireOras)
        document.getElementById("lukbattaej").addEventListener("input", faireOras)
        faireOras();
    });
