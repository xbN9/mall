<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="item"
         class="tab-control-item"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span class="">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      title:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0,
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>
