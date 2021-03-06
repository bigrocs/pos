import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import localStore from '@/utils/electron-store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: localStore.get('settings.baseURL'), // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  error: false // 默认开启错误提示
})

// request interceptor
service.interceptors.request.use(
  config => {
    //  使用最新的服务器地址访问
    if (store.getters.baseURL) {
      config.baseURL = store.getters.baseURL
    }
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-CSRF-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-CSRF-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response
    // const res = response.data
    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    // 错误提示
    // if (service.defaults.error) {
    //   const detail = error.response.data.detail
    //   Message({
    //     message: detail,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
