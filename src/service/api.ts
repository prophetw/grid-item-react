import { AxiosRequestConfig } from 'axios'
type API = {
  [key: string]: string
}
const a: API = {
  getUserList: '/worker/ui/list',
  getWorkerInfo: '/worker/:userid',
  getAssetsList: '/asset/ui/select',
  getGroupTree: '/worker/group/ui/list',
  getWorkerType: '/worker/type/ui/list',
  postWorkerInfo: 'POST /worker',
  uploadImg: 'POST /worker/upload',
  uploadIdCardFront: 'POST /worker/card/front/upload',
  uploadIdCardBack: 'POST /worker/card/back/upload',
}
export default a

type PromiseFn = (
  data: any,
  axiosExtraOptions?: AxiosRequestConfig | null | undefined,
) => Promise<{
  list?: any[] | undefined
  code?: number | undefined
  data?: any
  msg?: string | undefined
  status?: number | undefined
  success: boolean
  message: string
  statusCode: number
}>

interface APIRef {
  [key: string]: PromiseFn
}
export interface APIRequest extends APIRef {
  getUserList: PromiseFn
  getWorkerInfo: PromiseFn
  getAssetsList: PromiseFn
  getGroupTree: PromiseFn
  getWorkerType: PromiseFn
  postWorkerInfo: PromiseFn
  uploadImg: PromiseFn
  uploadIdCardFront: PromiseFn
  uploadIdCardBack: PromiseFn
}
