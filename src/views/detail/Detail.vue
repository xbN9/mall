<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"/>
    <scroll class="content">
      <detail-swiper :topImg="topImg"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam} from 'network/detail';

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data(){
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情页数据
      getDetail(this.iid).then(res=>{
        const data = res.result
        // 1.轮播图信息
        this.topImg = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
    },
    mounted(){

    },
    methods:{
      /**
       *
       */
    }
  }
</script>

<style scoped>
  #detail{
    overflow: hidden;
    position:relative ;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .nav-bar{
    position: relative;
    top: 0px;
    z-index: 10;
    background: #fff;
  }
</style>
