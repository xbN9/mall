<template>
  <nav-bar class="home-nav">
    <div slot="center">女王皇冠</div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components:{
      NavBar
    },
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    created() {
      //生命周期中组件创建时请求
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #f6f6f6;
  }
</style>
