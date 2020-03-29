<template>
<div class="recommend">
  <div v-for="item in recommends" :key="item.title" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" :alt="item.title">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return [];
        }
      }
    }
  }
</script>

<style scoped>

  .recommend{
    display: flex;
    width: 100%;
    displey:-webkit-flex;
    overflow-x: auto;
    list-style: none;
    overflow-y:hidden;
    text-align: center;

    padding: 10px 0 15px;
    border-bottom: 8px solid #eeeeee;
  }
  .recommend::-webkit-scrollbar{display: none;}
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 65px;
    height: 65px;
    /*margin: 6px;*/
  }
</style>
