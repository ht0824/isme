import axios from 'axios'

import {
  handleAuth,
  // handleAuthError,
  // handleGeneralError,
  // handleNetworkError,
  handleRequestHeader,
} from './tools'

type IAnyObj = Record<string, unknown>
interface FcResponse<T> {
  errno: string
  errmsg: string
  data: T
}
// 请求拦截
axios.interceptors.request.use((config) => {
  config = handleRequestHeader(config)
  config = handleAuth(config)
  return config
}, (error) => {
  return Promise.reject(error)
},
)
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // handleAuthError(response.data.errno)
    // handleGeneralError(response.data.errno, response.data.errmsg)
    return response
  },
  (error) => {
    // handleNetworkError(error.response.status)
    Promise.reject(error.response)
  },
)

export const Get = <T>(url: string, params: IAnyObj = {}): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((result) => {
        resolve(result.data as any)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const Post = <T>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        resolve(result.data as any)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
