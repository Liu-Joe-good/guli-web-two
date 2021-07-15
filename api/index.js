import request from '@/utils/request'
export default {
    index() {
    return request({
      url: '/eduservice/indexfront/getIndex',
      method: 'get'
    })
  }
}