import request from '@/utils/request'
export default {
  saveOrder(courseId) {
    return request({
      url: `/orderservice/t-order/saveOrder/${courseId}`,
      method: 'post'
    })
  },
  getOrder(orderId) {
    return request({
      url: `/orderservice/t-order/getOrder/${orderId}`,
      method: 'get'
    })
  }
}