import axios, { AxiosRequestConfig } from 'axios'
import { cloneDeep, method } from 'lodash'
const { parse, compile } = require('path-to-regexp')
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from './constant'

interface Result {
  list?: any[]
  code?: number
  data?: any //{menuList: Array(1), assetList: Array(1)}
  msg?: string
  status?: number
}
declare global {
  interface Window {
    cancelRequest: Map<any, any>
  }
}

const { CancelToken } = axios
window.cancelRequest = new Map()
export default function request(
  options: AxiosRequestConfig,
): Promise<{
  list?: any[] | undefined
  code?: number
  data?: any
  msg?: string | undefined
  status?: number | undefined
  success: boolean
  message: string
  statusCode: number
}> {
  let { url = '' } = options
  const { data, method = 'GET' } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = parse(url)
    url = compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  if (method === 'GET') {
    options.params = cloneData
  }
  // else{
  // 	options.data = cloneData
  // }
  options.cancelToken = new CancelToken((cancel) => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })
  return axios(options)
    .then((response) => {
      // console.log(' -------- ', response)
      const { statusText, status, data } = response

      let result: Result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        code: status,
        message: statusText,
        statusCode: status,
        ...result,
      })
    })
    .catch((error) => {
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
          statusCode: 200,
          message: 'Cancel Request',
          msg: 'Cancel Request',
          code: 200,
          data: null,
        }
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
        msg,
        code: statusCode,
      })
    })
}
