import http from './serve'

// loading   是否关闭接口调用时 loading 效果 ，true 为关闭

//测试接口
export const billRecord = (params,loading) => {
  return http.fetchPost('/wcsApp/consume/billRecord?userid='+params.userid+'&time='+params.time,params,loading)
  // return http.fetchPost('/wcsApp/index/attendances1?userid='+params.userid+'&time='+params.time,params,loading)
}


// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/member/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/member/loginOut', params)
}

