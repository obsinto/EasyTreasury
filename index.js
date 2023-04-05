// prettier-ignore
require('dotenv').config()
const pup = require("puppeteer");
const url = "https://autoatendimento2.bb.com.br/apf-apj-acesso/";
const chaveJ = process.env.CHAVEJ
const passwd = process.env.PASSWD
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

await page.waitForTimeout(10000)
await page.waitForSelector('#senhaUsuario');
await page.type("#senhaUsuario", passwd);
await page.click("#botaoEnviar")


} catch (error) {
console.error('Ocorreu um erro:', error)
}
//await browser.close()
})()