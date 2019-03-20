const fs = require('fs')
const path = require('path')
function readLock () {
  const lockFilePath = path.resolve(__dirname, '../.applock')
  if (!fs.existsSync(lockFilePath)) {
    return {}
  } else {
    return JSON.parse(fs.readFileSync(lockFilePath))
  }
}

function saveLock (lockObj) {
  const lockFilePath = path.resolve(__dirname, '../.applock')
  fs.writeFileSync(lockFilePath, JSON.stringify(lockObj), 'utf-8')
}

module.exports = {
  readLock,
  saveLock
}
