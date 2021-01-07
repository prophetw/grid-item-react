import { AxiosRequestConfig } from 'axios'

const API: Record<string, string> = {
  getLayout: 'get /api/layout/:projectid',
  getComponentConfig: 'get /api/componentconfig/:id',
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

export interface APIRef extends Record<string, APIResponse> {
  getLayout: APIResponse
  getComponentConfig: APIResponse
}

export default API
