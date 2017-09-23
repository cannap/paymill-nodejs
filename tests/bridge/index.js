var http = require('http')
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')
var HeadlessChrome = require('simple-headless-chrome')
// Serve up public/ftp folder
var serve = serveStatic(__dirname)
var { join } = require('path')
const { promisify } = require('util')

const writeFile = promisify(require('fs').writeFile)
// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})
server.listen(8080)

const browser = new HeadlessChrome({
  headless: true
})
async function createToken () {
  await browser.init()
  const mainTab = await browser.newTab({ privateTab: false })

  await mainTab.goTo('localhost:8080/index.html')

  await mainTab.wait(2000)
  const frames = await mainTab.getFrames()
  const frameId = frames[1]
  await mainTab.fill('#pm-number', '4111111111111111', frameId.id)
  await mainTab.fill('#pm-cvc', '222', frameId.id)
  await mainTab.fill('#pm-cardholder', 'Max Mustermann', frameId.id)
  await mainTab.fill('#pm-exp-month', '10', frameId.id)
  await mainTab.fill('#pm-exp-year', '2020', frameId.id) //
  await mainTab.click('#submit-form')
  await mainTab.wait(3000)
  const location = await mainTab.evaluate(function (selector) {
    const selectorHtml = document.getElementById('tokenval')
    return selectorHtml.innerText
  })
  await browser.close()
  await writeFile(join(__dirname, 'token.txt'), location.result.value, {
    ecoding: 'utf-8'
  })
}

createToken()
