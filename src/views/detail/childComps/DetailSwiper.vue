<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImg" :key="item">
      <img :src="item"/>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper";

  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImg:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 280px;
    overflow-y: hidden;
  }
</style>
