const { Console } = require('console')

const defaultLogger = () =>
  new Console({
    stdout: process.stdout,
    stderr: process.stderr
  })

module.exports = defaultLogger
