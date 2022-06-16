const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

var result = [];

var response = [];

app.post('/', (req, res) => {

    for (var i = 0; i < req.body.length; i++) {
        result.push({ 'login': req.body[i].login, 'password': req.body[i].password })
        console.log(result[i].login + ' ' + result[i].password);

        let nametype = makeName() + " " + makeName();
        let emailtype = makeEmail();

        //gon(result[i].login, result[i].password, nametype, emailtype, response);
        goFb(result[i].login, result[i].password, nametype, emailtype, response);
    }

    res.send(JSON.stringify(response));

    result = [];

    response = [];
});

function gon(email, password, ntype, etype, rsp) {
    try {
        console.log(email);
        console.log(password);
        console.log(ntype);
        console.log(etype);
        rsp.push({ 'login': email, 'password': password, 'nametype': ntype, 'emailtype': etype })
    } catch (error) {
        console.log(error);
    }
}

async function goFb(email, password, ntype, etype, rsp) {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0);

        await page.setViewport({ width: 720, height: 600 });

        await page.goto('https://facebook.com', {
            waitUntil: 'load',
            timeout: 0
        });

        await page.waitForSelector('#email', {
            waitUntil: 'load',
            timeout: 0
        });

        await page.type("#email", email);
        await page.type("#pass", password);
        await page.click(`[type="submit"]`);

        await page.waitForNavigation({
            waitUntil: 'load',
            timeout: 0
        });

        await page.goto('http://business.facebook.com/create', {
            waitUntil: 'load',
            timeout: 0
        });

        await page.waitForSelector(`[data-testid="business-create-account-button"]`, {
            waitUntil: 'load',
            timeout: 0
        });
        await page.click(`[data-testid="business-create-account-button"]`);

        await page.waitForSelector(`[placeholder="Jasper's Market"]`, {
            waitUntil: 'load',
            timeout: 0
        });
        await page.click(`[placeholder="Jasper's Market"]`);

        for (i = 0; i < ntype.length; i++) {
            await page.keyboard.press(ntype[i]);
        }

        await page.click('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.puibpoiz.rwb8dzxj.yukb02kx.lftrkhxp.rgsc13q7.s7wjoji2.tds9wb2m > div.lmtvg2su.f030igb8.k1bdusab.tds9wb2m > div.fdgfg23c.rl78xhln.k70v3m9n.srn514ro > div > div._2-ox > div > div:nth-child(3) > div > div.hkz453cq.dkjikr3h.cfpbkchl.ms26wupl.rwb8dzxj.hv94jbsx.yukb02kx > div > div > div > div.dfy4e4am.rwb8dzxj.jytk9n0j.ojz0a1ch.avm085bc.mtc4pi7f.ebvw7njr.otilsnaa.mt3dn3ju.dn0c128b.mso6dn0j.gg04it2x.orxfpuly.ralnb31v.hkz453cq.dkjikr3h.ay1kswi3.lcvupfea.mpql2fhx.te7ihjl9.fy8wk4jp.hkj1b9lb.s2b50fxc.eqcl0x55 > div > div > div');

        for (i = 0; i < etype.length; i++) {
            await page.keyboard.press(etype[i]);
        }

        await page.click('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.a53abz89.rgsc13q7.dfy4e4am.rwb8dzxj.diwav8v6.hkvtgs2m.apktr6ye.tlhxvphw.s1aoc7nz.q72jrxl3.k1bdusab.mk3evetr.nlmdo9b9 > div > div > div');
        await page.waitForNavigation({
            waitUntil: 'load',
            timeout: 0
        });

        await page.waitForSelector('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.a53abz89.rgsc13q7.dfy4e4am.rwb8dzxj.diwav8v6.hkvtgs2m.apktr6ye.tlhxvphw.s1aoc7nz.q72jrxl3.k1bdusab.mk3evetr.nlmdo9b9 > div > div > div', {
            waitUntil: 'load',
            timeout: 0
        });
        await page.click('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.a53abz89.rgsc13q7.dfy4e4am.rwb8dzxj.diwav8v6.hkvtgs2m.apktr6ye.tlhxvphw.s1aoc7nz.q72jrxl3.k1bdusab.mk3evetr.nlmdo9b9 > div > div > div');

        /*let isContains = await page.evaluate(() => {
            let el = document.querySelector('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.puibpoiz.rwb8dzxj.yukb02kx.lftrkhxp.rgsc13q7.s7wjoji2.tds9wb2m > div.lmtvg2su.f030igb8.k1bdusab.tds9wb2m > div.fdgfg23c.rl78xhln.k70v3m9n.srn514ro > div > div.rwb8dzxj.puibpoiz.s7wjoji2.mtc4pi7f.ek72jv22.f548rbsf.sv5x006p.jeelzvb6.n0zgccvv.k6ytt5sy.jmjvpl1r.rwmzgb4t.e13a1il5.oikwo4y7.pf8xl99m.p5l3rwok.cxf3l55u.jljqakvt.mpql2fhx.ol91lf0t > div > div > div.a53abz89.rgsc13q7.hmx0cwvu.rwb8dzxj.diwav8v6.yukb02kx.apktr6ye.tlhxvphw > div.yukb02kx.a53abz89 > div');
            return el ? true : false;
        })

        if (isContains) {
            await page.click('body > div._10._8uff.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div.mpql2fhx.c6q80kpu.ig151e16.sme1n7fz.qm5707zr.m9fzaka6.lftrkhxp.tds9wb2m.rwb8dzxj.hv94jbsx.f3aw7s6y > div > div.a53abz89.rgsc13q7.dfy4e4am.rwb8dzxj.diwav8v6.hkvtgs2m.apktr6ye.tlhxvphw.s1aoc7nz.q72jrxl3.k1bdusab.mk3evetr.nlmdo9b9 > div > div > div');
        }
        else {
            await page.waitForNavigation({
                waitUntil: 'load',
                timeout: 0
            });
        }*/

        rsp.push({ 'login': email, 'password': password, 'nametype': ntype, 'emailtype': etype })
        await browser.close();
    } catch (e) {
        console.log(e);
        rsp.push({ 'login': email, 'password': password, 'nametype': 'error', 'emailtype': 'error' })
    }
}

function makeName() {
    var text = "";

    var firstChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    text += firstChar.charAt(Math.floor(Math.random() * firstChar.length));

    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function makeEmail() {
    var text = "";

    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += "@gmail.com"

    return text;
}