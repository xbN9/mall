<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home2.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/cate">
      <img slot="item-icon" src="~assets/img/tabbar/cate2.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/cate.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/cat2.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/cat.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/my">
      <img slot="item-icon" src="~assets/img/tabbar/my2.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/my.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
