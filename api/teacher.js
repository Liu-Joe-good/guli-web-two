import request from '@/utils/request'
export default {
    findAllTeacher(current,limit) {
    return request({
      url: `/eduservice/frontTeacher/findAllTeacher/${current}/${limit}`,
      method: 'get'
    })
  },
  findTeacherById(id){
    return request({
      url:`/eduservice/frontTeacher/findTeacherById/${id}`,
      method:'get'
    })
  }
}