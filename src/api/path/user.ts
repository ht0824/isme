import { Get, Post } from '../server'

export const loginApi = (data: any) => {
  const headers = {
    'Accept': 'application/json',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'text/plain;charset=UTF-8',
  }
  return Post('/api/oauth/admin/user/login', { headers }, data)
}
export const getToken = (data: any) => {
  const headers = {
    'Accept': 'application/json',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'text/plain;charset=UTF-8',
    'Authorization': 'Basic bGpzOmxqcw==',
  }
  const params = {
    ...data,
    grant_type: 'password',
    scope: 'server',
  }
  return Post('/api/oauth/oauth/token', { headers }, params)
}
export const checkUsername = (params: any) => {
  return Get(`/api/oauth/user/checkUsername/${params}`)
}
export const userRegister = (data: any) => {
  return Post('/api/oauth/user/register', data)
}
export const userApi = {
  loginApi,
  userRegister,
  checkUsername,
}
