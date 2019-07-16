import axios from 'axios'
console.log(axios)
const apiRequest = function (params = {}, url) {
  let data = params.query || {}
  // let contentType = parseInt(params.contentType) === 2 ? 'application/x-www-form-urlencoded; charset=utf-8' : 'application/json'
  //   // data.sign = SIGN
  //   // data.time = TIMESTAMP
  // console.log(url)
  // console.log(data)
  console.log('url----f', url)
  let httpDefaultOpts = {
    method: params.method || 'GET',
    url: url,
    timeout: 10000,
    data: data,
    headers: params.method === 'GET' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  new Promise((resolve, reject) => {
    axios(httpDefaultOpts).then(
      (res) => {
        resolve(res)
      }
    ).catch(
      (response) => {
        reject(response)
      }
    )
  }).then(res => {
    console.log('res-------------' + url, res.data)
    return res.data
  })
}
export default {
  apiRequest
}
