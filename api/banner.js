import request from '@/utils/request'
export default {
    getAllBanner() {
    return request({
      url: '/educms/crm-banner/getAllBanner',
      method: 'get'
    })
  }
}