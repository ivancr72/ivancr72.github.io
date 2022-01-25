'use strict';

let kawarchor = new Map();
let ziker = new Map();
let misper = new Map();

let prenkwer = new Map();
let meiokiPrenkw = 0;

let postnkwer = new Map();
let meiokiPostnkw = 0;

function splitOnce(string, pattern) {
    const idx = string.search(pattern);
    return [string.substring(0, idx), string.substring(idx + 1)];
}

function explode(name) {
    return [
        name.replaceAll("ä", "a").replaceAll("ö", "o").replaceAll("ü", "u"),
        name.replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue"),
    ];
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
            const sus = misper.get(zik) ?? misper.get("#ander");
            if (misp == wort.length - 1) {
                return "+" + sus;
            } else {
                return "&"
                    + sus.substring(0, sus.length - 1)
                    + (parseInt(sus.at(-1), 16) | 8).toString(16);
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
        const parsed = ovsäMaghchat(value);
        if (parsed === null) { console.log(`netov maghchat v ${name}`); return; }
        for (const n of explode(name)) { kawarchor.set(n, parsed); }
    },
    "#zik": (name, value) => ziker.set(name, value),
    "#misp": (name, value) => misper.set(name === "#efes" ? " " : name, value),
    "#prenkw": (name, value) => ozefPrenkw(name, ovsäMaghchat(value)),
    "#postnkw": (name, value) => ozefPostnkw(name, ovsäMaghchat(value)),
    "#kawarprenkw": (name, value) => {
        const parsed = ovsäMaghchat(value);
        if (parsed === null) { console.log(`netov maghchat v ${name}`); return; }
        for (const n of explode(name)) {
            kawarchor.set(n, parsed);
            ozefPrenkw(n, parsed);
        }
    },
    "#kawarpostnkw": (name, value) => {
        const parsed = ovsäMaghchat(value);
        if (parsed === null) { console.log(`netov maghchat v ${name}`); return; }
        for (const n of explode(name)) {
            kawarchor.set(n, parsed);
            ozefPostnkw(n, parsed);
        }
    }
}

function faireFairechater(fairechater) {
    for (const ziklinja of fairechater.split("\n")) {
        if (ziklinja[0] != "#") { continue; }
        const [fairechatname, anderchoser] = splitOnce(ziklinja.trimStart(), " ");
        const [ikijem, doujem] = splitOnce(anderchoser, " ");
        (toutfairechat[fairechatname] ?? (
            () => { console.log(`inv fairechat ${fairechatname}`); }
        ))(ikijem, doujem.trimEnd());
    }
}

function ovsäWort(wort) {
    if ("+&".includes(wort[0])) {
        return wort.toLowerCase() + "0".repeat(8 - wort.length);

    } else if (wort === "//" || wort === "\n") {
        return "//";

    } else if (wort === "  ") {
        return kawarchor.get("#efes");

    } else if ([".", ",", ":", "?", "!", "...", "(", ")"].includes(wort)) {
        return kawarchor.get(wort);

    } else if ("0123456789".includes(wort[0])) {
        return kawarVMisper(wort);

    } else if (wort[0] === '"') {
        return wort.substring(1, wort.length - 1)
            .replaceAll("A", "ä").replaceAll("O", "ö").replaceAll("U", "ü")
            .replaceAll("E", "ë").replaceAll("N", "ŋ")
            .toLowerCase()
            .split(" ").map(kawarVZiker).join(" ");

    } else {
        return opadWort(wort.toLowerCase()
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
    let meinagaiLinja = 0;
    for (const suslinja of ovsärt.split("//")) {
        const linja = suslinja.trim();
        if (!linja) { linjar.push([]); continue; }  // "".split(" ") is [""] (???)
        const zaker = linja.split(" ");

        let dji = 0;
        while (dji < zaker.length) {
            let zor = dji + zakerVLinja;
            while ((zaker[zor - 1] ?? "+")[0] == "&") {
                zor--;
                if (zor <= dji) { zor = dji + zakerVLinja; break; }  // ku zak ist plynagai linja
            }
            const slice = zaker.slice(dji, zor);
            linjar.push(slice);
            meinagaiLinja = Math.max(meinagaiLinja, slice.length);
            dji = zor;
        }
    }
    return [linjar, meinagaiLinja];
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
    ctx.fillStyle = document.getElementById("preparp").value;
    ctx.fillRect(0, 0, oras.width, oras.height);
    ctx.fillStyle = document.getElementById("zikparp").value;
}

function faireOras() {
    const oras = document.getElementById("oras");
    const ctx = oras.getContext('2d', { alpha: false });
    const ekrivmist = document.getElementById("ekrivmist");
    const lukbattäj = parseInt(document.getElementById("lukbattaej").value, 10);
    if (!(lukbattäj >= 1)) { return; }

    const parsed = ovsäMaghchat(ekrivmist.value);

    const xTäj = ekrivmist.parentElement.offsetWidth;

    if (!parsed) {
        oras.width = document.getElementById("plynoki").checked ? lukbattäj : xTäj;
        oras.height = 9 * lukbattäj; 
        loridOras(ctx);
        return;
    }
    const lukbaterVLinja = Math.floor(xTäj / lukbattäj - 2);
    if (lukbaterVLinja < 8) { return; }
    const [linjar, meinagaiLinja] = faireLinjar(parsed, lukbaterVLinja);

    oras.width = document.getElementById("plynoki").checked 
        ? (meinagaiLinja * 4 + 1) * lukbattäj
        : xTäj;
    oras.height = (linjar.length * 8 + 1) * lukbattäj;

    loridOras(ctx);

    faireOrasSus(ctx, linjar, lukbattäj);

}

fetch("./fairechoser.txt")
    .then(req => req.text())
    .then(txt => {
        faireFairechater(txt);
        //console.debug(kawarchor, ziker, prenkwer, postnkwer);
        window.addEventListener("resize", faireOras);
        for (const x of document.querySelectorAll("input, textarea")) {
            x.addEventListener("input", faireOras);
        }
        faireOras();
    });
