const defaultLogger = require('../../../src/utils/defaultLogger')

const { debug, error } = defaultLogger()
const logger = defaultLogger()
function log (key, p, open = false) {
  if (open) {
    debug({
      [key]:
        JSON.stringify(p)
    })
  }
}

function logError (key, p) {
  error({
    [key]:
      JSON.stringify(p)
  })
}

module.exports = { log, logger, logError }
