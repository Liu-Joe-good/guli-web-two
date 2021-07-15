// 引入刚下载的axios组件
import axios from 'axios'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url ,用了nginx即使用nginx配的地址
  timeout: 20000 // 请求超时时间
})
// 拦截器
service.interceptors.request.use(
  config=>{
    // 创建拦截器实例
    if(cookie.get('guli_token')){
      // 存在token，则存入header请求头中
      config.headers['token']=cookie.get('guli_token');
    }
    return config;
  },
  err=>{
    return Promise.reject(err);
  }
)
export default service