import { apiPrefix } from '@/utils/config'
import { AxiosRequestConfig } from 'axios'
import request from '../utils/request'
import API, { APIRef } from './api'
export const decodeParams = (params: string) => {
  const paramsArr = params.split(' ')
  let method = 'get'
  let url = ''
  if (paramsArr.length === 3) {
    method = paramsArr[0]
    url = paramsArr[1]
  }
  if (paramsArr.length === 2) {
    method = paramsArr[0]
    url = paramsArr[1]
  }
  if (paramsArr.length === 1) {
    url = paramsArr[1]
  }
  return {
    url,
    method,
  }
}
export const gen = (params: string) => {
  const { url, method } = decodeParams(params)
  // baseUrl 替换成对应的 url
  const baseUrl = window.baseUrl
  const fullUrl = baseUrl + apiPrefix + url
  return function (data?: any, AxiosOptions: AxiosRequestConfig = {}) {
    const opts = {
      url: fullUrl,
      method,
      data,
      AxiosOptions,
    }
    return request(opts)
  }
}
// @ts-ignore
const APIFunction: APIRef = {}
for (const key in API) {
  APIFunction[key] = gen(API[key])
}
// console.log(APIFunction)
export default APIFunction
