<template>
  <view class="search-container" :style="{'background-color': bgcolor}" @click="clicksearch">
    <view class="search-border" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="18" ></uni-icons>
      <text class="serchText">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-serach",
    data() {
      return {};
    },
    props:{
       // 背景颜色
        bgcolor: {
          type: String,
          default: '#C00000'
        },
        // 圆角尺寸
        radius: {
          type: Number,
          // 单位是 px
          default: 18
        } 
    },
    methods:{
      clicksearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-container {
    // background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;

    .search-border {
      height: 36px;
      background-color: #ffffff;
      border-radius: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .serchText{
        font-size: 30rpx;
      }
    }  
  }
</style>
