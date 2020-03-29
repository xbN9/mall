<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">女王皇冠</div></nav-bar>
    <tab-control
      :title="title"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @position="position"
            :pull-up-load="true"
            @pullingUp="pullingUp">
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature/>
      <tab-control
        :title="title"
        @tabClick="tabClick"
        ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import Feature from "./childComps/Feature";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      Feature,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        title:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //生命周期中组件创建时请求
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')
    },
    mounted(){
      //图片加载完成监听
      const refresh = debounce(this.$refs.scroll.refresh,1000)
      this.$bus.$on('imgLoad',()=>{
        refresh()
      })
      //获取tabControl的offsetTOP
      //所有的组件都有$el:用于获取组件中的元素
      //this.$refs.tabControl.$el.offsetTop

    },
    methods:{
      /*
       *  事件监听
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.scroll && this.$refs.scroll.scrollTo(0,0,500)
      },
      position(position){
        //判断backtop是否显示
        this.isShowBackTop = -(position.y) > 1000
        //tabcontrol是吸顶
        this.isTabFixed = -(position.y) >this.tabOffsetTop
      },
      pullingUp(){//上拉加载更多
        this.getHomeGoods(this.currentType)
        this.scroll && this.$refs.scroll.refresh()
      },
      swiperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*
       *  网络请求相关
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 完成上拉加载更多
          this.scroll && this.$refs.scroll.finishPullUp()
        })
      }
    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y
    },
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    /*vh:viewport height 视口高度*/
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #f6f6f6;
  }
  .content {
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
  }
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
