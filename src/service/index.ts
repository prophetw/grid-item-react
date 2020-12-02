import request from '../utils/request'
import { BaseUrl, apiPrefix } from '../utils/config'
import api, { APIRequest } from './api'
import { AxiosRequestConfig } from 'axios'

const gen = (params: string) => {
  let url = BaseUrl + apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = BaseUrl + apiPrefix + paramsArray[1]
  }

  return function (data: any, axiosExtraOptions?: AxiosRequestConfig | null) {
    if (!axiosExtraOptions) {
      axiosExtraOptions = {}
    }
    const options: AxiosRequestConfig = Object.assign(
      {},
      {
        data,
        url,
        method,
      },
      axiosExtraOptions,
    )
    return request(options)
  }
}

const APIFunction: APIRequest = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
