const express = require('express')
const app = express()
const os = require('os')
const opn = require('opn')

const fetchData = require('./fetchData')

function getIPAdress () {
  var interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

let server = app.listen('3000', () => {
  // let host = server.address().address
  const port = server.address().port
  const url = `http://${getIPAdress()}:${port}`
  // opn(`${url}`)
  console.log(`Your App is running at ${url}`)
  fetchData.postData()
})

app.get('/', async (req, res, next) => {
  res.send('hello crawler')
})
