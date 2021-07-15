<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>
<script>
import vod from '@/api/vod'
export default {
  layout: 'video',//应用video布局
  asyncData({params,error}){
      return vod.getPlayAuth(params.id).then(Response=>{
          console.log("ssssssssssssss");
          debugger;
          return {
            // 这个id必须与_id.vue中的"_id"名称相同
            id: params.id,
            playAuth: Response.data.data.playAuth
          }
      })
  },
 /**
 * 页面渲染完成时：此时js脚本已加载，Aliplayer已定义，可以使用
 * 如果在created生命周期函数中使用，则会Aliplayer is not defined错误
 */
    mounted() {
        new Aliplayer({
            id: 'J_prismPlayer',
            vid: this.id, // 视频id
            playauth: this.playAuth, // 播放凭证
            // encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            width: '100%',
            height: '500px'
        }, function(player) {
            console.log('播放器创建成功')
        })
    }
}
</script>