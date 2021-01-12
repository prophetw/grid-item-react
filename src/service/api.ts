import { AxiosRequestConfig } from 'axios'

const API: Record<string, string> = {
  app_login: 'post /uc/auth/devLogin',
  app_logout: 'get /uc/auth/logout',
  getDropdownMenu: 'get /component/ui/data',
  getMenu: 'get /component/ui/data',
}

export interface APIRes {
  success: boolean
  data: any
  code: number
  msg: string
  status: number
}
export type APIResponse = (
  data?: any,
  AxiosOptions?: AxiosRequestConfig,
) => Promise<{
  success: boolean
  data: any
  code: number
  msg: string
  status: number
}>

const APIs = {
  checkIsDeveloper: 'post /uc/user/isDeveloper',
  getPdsStats: 'post /rf/pds/trans/bim/stats',
}

type APIRequest<T extends keyof typeof APIs> = {
  [key in keyof typeof APIs]: APIResponse
}

export interface APIRef extends Record<string, APIResponse> {
  app_login: APIResponse
  app_logout: APIResponse
  getDropdownMenu: APIResponse
  getMenu: APIResponse
}

export default API
