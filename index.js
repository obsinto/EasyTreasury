// prettier-ignore
require('dotenv').config()
const pup = require("puppeteer");
const url = "https://autoatendimento2.bb.com.br/apf-apj-acesso/";
const chaveJ = process.env.CHAVEJ
const passwd=process.env.PASSWD
const passwd2 = process.env.PASSWD2
const contas = ["115700-0", '112399-8'];

(async () => {
//abrir o navegador com visualização
const browser = await pup.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
    });

try {
const page = await browser.newPage();
//apagar cookies
await page.deleteCookie(...(await page.cookies()));
await page.goto(url);

await page.waitForSelector('button[value = "Setor Público"]'),
await page.click('button[value = "Setor Público"]')

await page.waitForSelector('button[alt = "ChaveJ"]'),
await page.click('button[alt = "ChaveJ"]')

await page.waitForSelector('#identificacaoUsuario');
await page.type("#identificacaoUsuario", chaveJ);

await page.click("#botaoEnviar")

//await page.waitForNavigation()
await page.waitForSelector('#senhaUsuario');
//await page.waitForTimeout(4000)
await page.type( '#senhaUsuario', '55568');
} catch (error) {
console.error('Ocorreu um erro:', error)
}
//await browser.close()
})()