import apiRequest from '../utils/request.js'
// apiRequest = apiRequest.apiRequest
const apiUrl = 'api'
console.log(apiRequest)
// 登录
const login = (params) => apiRequest.apiRequest(params, apiUrl + '/sys/loginr')
// 图片验证密码
const picCheckCode = (params) => apiRequest.apiRequest(params, apiUrl + '/captcha.jpg')

console.log(login)
/**
 * demo
 * 演示业务
 */
export default {
  login,
  picCheckCode
}
