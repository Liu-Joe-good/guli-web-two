import request from '@/utils/request'
export default {
  // 用户注册
  register(registerVo) {
    return request({
      url: `/api/ucenter/member/register`,
      method: 'post',
      data:registerVo
    })
  },
  // 根据手机号码发送短信
  code(phone) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  }
}