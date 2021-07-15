<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li >
                  <!-- javascript:void(0);保留链接的样式，但不让链接执行实际操作 -->
                  <a title="全部" href="javascript:void(0);" @click="searchOne()">全部</a>
                </li>
                <li  v-for="oneSubject in subjectNestedList" :key="oneSubject.id" :class="{active:oneIndex==oneSubject.id}">
                  <a :title="oneSubject.title" href="javascript:void(0);" @click="searchOne(oneSubject.id)">{{oneSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li  v-for="twoSubject in subSubjectList" :key="twoSubject.id" :class="{active:twoIndex==twoSubject.id}">
                  <a :title="twoSubject.title" href="javascript:void(0);" @click="searchTwo(twoSubject.id)">{{twoSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total>0">
            <ul class="of" id="bna">
              <li v-for="(item,index) in data.items" :key="index">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.cover">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of" >
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA" v-if="Number(item.price)==0">免费</i>
                      <i class="c-fff fsize12 f-fA" v-if="Number(item.price)>0">{{item.price}}元</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.buyCount}}人学习</i>
                      |
                      <i class="c-999 f-fA">{{item.viewCount}}评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <!--:class="{undisable: !data.hasPrevious}"表示如果没有不能点击    @click.prevent防止点击后a标签跳转 -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from '@/api/course'
export default {
  data(){
    return{
      page:1,
      // 课程列表数据
      data:{},
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      // 为了查询时有颜色变化
      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  created(){
    this.findAllCourse();
    this.getSubjectList();
  },
  methods:{
    // 查询课程列表
    findAllCourse(){
      course.findAllCourse(1, 8,this.searchObj).then(response => {
        this.data = response.data.data.map
      })
    },
    // 查询所有一级分类
    getSubjectList(){
      course.getSubjectList().then(response => {
        this.subjectNestedList = response.data.data.list
      })
    },
    // 点击一级分类下课程类别
    searchOne(oneSubjectId){
        // 把二级分类之前得id给去除
        this.searchObj.subjectId='';
        // 用于颜色改变
        this.oneIndex=oneSubjectId;
        this.searchObj.subjectParentId=oneSubjectId;
        // 调用查询课程列表
        course.findAllCourse(1, 8,this.searchObj).then(response => {
          this.data = response.data.data.map
        })
        // 显示当前一级分类下二级分类
        for(let i=0;i<this.subjectNestedList.length;i++){
          if(this.subjectNestedList[i].id==oneSubjectId){
            this.subSubjectList='';
            this.subSubjectList=this.subjectNestedList[i].children;
          }
        }
    },
    // 点击二级分类下课程类别
    searchTwo(twoSubjectId){
      // 用于颜色改变
      this.twoIndex=twoSubjectId;
      this.searchObj.subjectId=twoSubjectId;
      // 调用查询课程列表
        course.findAllCourse(1, 8,this.searchObj).then(response => {
          this.data = response.data.data.map
        })
    },
    // 分页跳转
    gotoPage(page){
        course.findAllCourse(page,8,this.searchObj).then(Response=>{
          // return {data:Response.data};
          // 不可再按照上面声明，因为data已被声明了
          this.data=Response.data.data.map;
        });
      },
    // 按销量排序
    searchBuyCount(){
      this.buyCountSort='1';
      this.gmtCreateSort='';
      this.priceSort='';
      this.searchObj.buyCountSort=this.buyCountSort;
      this.searchObj.gmtCreateSort=this.gmtCreateSort;
      this.searchObj.priceSort=this.priceSort;
      course.findAllCourse(1,8,this.searchObj).then(Response=>{
          this.data=Response.data.data.map;
        });
    },
    // 按最新排序
    searchGmtCreate(){
      this.buyCountSort='';
      this.gmtCreateSort='1';
      this.priceSort='';
      this.searchObj.buyCountSort=this.buyCountSort;
      this.searchObj.gmtCreateSort=this.gmtCreateSort;
      this.searchObj.priceSort=this.priceSort;
      course.findAllCourse(1,8,this.searchObj).then(Response=>{
          this.data=Response.data.data.map;
        });
    },
    // 按价格排序
    searchPrice(){
      this.buyCountSort='';
      this.gmtCreateSort='';
      this.priceSort='1';
      this.searchObj.buyCountSort=this.buyCountSort;
      this.searchObj.gmtCreateSort=this.gmtCreateSort;
      this.searchObj.priceSort=this.priceSort;
      course.findAllCourse(1,8,this.searchObj).then(Response=>{
          this.data=Response.data.data.map;
        });
    }
  }
};
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>