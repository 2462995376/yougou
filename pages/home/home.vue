<template>
  <view class="home-container">
    <view class="serchbox">
      <my-serach></my-serach>
    </view>
    <swiper autoplay="true" :duration="1500" indicator-dots indicator-active-color="dark" :interval="3000"
      circular="true">
      <swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key=index>
        <navigator class="swipeimage" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="navList">
      <view class="navitem" v-for="(item,index) in navList" :key="index" @click="navgator(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-big-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"> </image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-box">
            <navigator v-for="(item2,index) in item.product_list" v-if="index !==0" :url="item2.url" :key="index">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>

      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      }
    },
    created() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      navgator(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '../cate/cate'
          })
        }
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/home/floordata')
        if (res.meta.status !== 200) return nui.$showMsg()
        res.message.forEach(item=>{
          item.product_list.forEach(item2=>{
            item2.url='/subpkg/goods_list/goods_list?'+item2.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
  .serchbox{
    position: sticky;
    top:0;
    z-index: 999;
  }
  .home-container{
  swiper {
    height: 330rpx;
  }

  .swipeimage,
  image {
    width: 100%;
    height: 100%;
  }

  .navList {
    display: flex;
    justify-content: space-around;
    margin: 15rpx 0;
  }

  .navitem image {
    width: 128rpx;
    height: 140rpx;
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }
  .floor-img-box{
    display: flex;
    justify-content: space-around;
    padding-left: 10rpx;
  }
  .right-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  }
</style>
