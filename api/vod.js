import request from '@/utils/request'
const api_name = '/eduVod/video'
export default {
  getPlayAuth(id) {
    return request({
      url: `${api_name}/gitPlayauthById/${id}`,
      method: 'get'
    })
  }
}