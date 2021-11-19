export function RequiredValidator(errorMsg) {
  return (rule, value, callback) => {
    if (isUndef(value)) {
      return callback(new Error(errorMsg))
    }
    if (isArray(value) && !value.length) {
      return callback(new Error(errorMsg))
    }
    if (isString(value) && !value) {
      return callback(new Error(errorMsg))
    }
    if (isObject(value) && JSON.stringify(value) === '{}') {
      return callback(new Error(errorMsg))
    }
    return callback()
  }
}

/**
 * 生成统一的验证器
 *
 * @param {string or validaor} type 生成字符串 和 验证器
 * @param {any} message
 * @param {string} [trigger=['blur', 'change']]
 * @returns
 */
export function generateValidator(type, message, trigger = ['blur', 'change']) {
  // 生成验证器
  const validator = {
    trigger: trigger
  }
  if (isString(type)) {
    validator.type = type
    if (type === 'required') {
      validator.validator = RequiredValidator(message)
    }
    validator.message = message
  } else if (isFunction(type)) {
    validator.validator = type
  }

  return validator
}

const isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}

const isString = isType('String')

const isArray = isType('Array')

const isObject = isType('Object')

const isBoolean = isType('Boolean')

const isFunction = isType('Function')

const isNumber = isType('Number')

const isPromise = isType('Promise')

export {
  isType,
  isString,
  isArray,
  isObject,
  isFunction,
  isNumber,
  isBoolean,
  isPromise,
}

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}
