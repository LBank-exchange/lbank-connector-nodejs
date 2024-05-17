const isEmptyValue = input => {
  return (
    (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) &&
      /^\s+$/.test(input)) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
  )
}

module.exports = isEmptyValue
