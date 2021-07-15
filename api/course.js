import request from '@/utils/request'
export default {
  findAllCourse(current,limit,courseQueryVo) {
    return request({
      url: `/eduservice/frontCourse/findAllCourse/${current}/${limit}`,
      method: 'post',
      data:courseQueryVo
    })
  },
  getSubjectList(){
    return request({
      url:`/eduservice/edu-subject/getSubjectList`,
      method:'get'
    })
  },
  findCourseById(id){
    return request({
      url:`/eduservice/frontCourse/findCourseById/${id}`,
      method:'get'
    })
  }
}