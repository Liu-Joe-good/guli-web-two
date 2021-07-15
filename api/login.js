import request from '@/utils/request'
export default {
    // 登录
    loginUser(member) {
    return request({
      url: '/api/ucenter/member/login',
      method: 'post',
      data:member
    })
  },
    // 通过token获取用户id
    getMemberInfo(){
        return request({
            url: '/api/ucenter/member/getMemberInfo',
            method: 'get'
            // 不用传httpServletRequest
        })
    },
    // 微信登录并获取token
    getWXLogin(){
        return request({
          url:'/api/ucenter/wx/login',
          method:'get'
        })
    }
}