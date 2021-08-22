'use strict'

const { URL } = require('url')

const BASE_URL = 'http://localhost'

/**
 * Parse URL
 *
 * @param {(Object|String)} url
 * @param {Object} [query]
 * @return {URL}
 */
module.exports = function parseURL (url, query) {
  let url_obj=new URL(url,BASE_URL)
  url_obj.pathname=url
  const result = typeof url === 'object'
    ? Object.assign(new URL(BASE_URL), url)
    : url_obj

  const merged = Object.assign({}, url.query, query)
  for (const key in merged) {
    const value = merged[key]

    if (Array.isArray(value)) {
      result.searchParams.delete(key)
      for (const param of value) {
        result.searchParams.append(key, param)
      }
    } else {
      result.searchParams.set(key, value)
    }
  }

  return result
}
