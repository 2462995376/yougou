<template>
  <view>
    <view class="scroll-view-container">
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh +'px'}">
        <view class="left-scroll-view-item" v-for="(item,index) in cateList" :key="index"
          :class="{active:index===active}" @click="changeactive(item,index)">
          {{item.cat_name}}
        </view>
      </scroll-view>
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh +'px'}" :scroll-top="scrollTop">
        <!-- 渲染二级列表 -->
        <view v-for="(item,index) in cateList2" :key="index">
          <view class="cateList2-catname"> /{{item.cat_name}}/</view>
          <!-- 渲染三级列表 -->
          <view class="catelist3">
            <view class="cate-item" v-for="(item2 ,index2) in item.children" :key="index2" @click="gotoGoodsList(item2)">
              <image :src="item2.cat_icon" mode="widthFix"></image>
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        cateList2: [],
        scrollTop: 0,
        active: 0,
      }
    },
    created() {
      const systemInfo = uni.getSystemInfoSync()
      this.wh = systemInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const res = await uni.$http.get('/categories')

        if (res.statusCode !== 200) {
          return uni.$showMsg()
        }
        this.cateList = res.data.message
        this.cateList2 = res.data.message[0].children
      },
      changeactive(item,index) {
        this.active = index
        this.cateList2=item.children
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      gotoGoodsList(item){
        uni.navigateTo({
           url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
    }

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;
    justify-content: space-around;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #fff;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    };

    .right-scroll-view {
      .cateList2-catname {
        text-align: center;
        font-weight: 700;
        margin: 10px 0;
      }

      .catelist3 {
       display: flex;
       flex-wrap: wrap; 
        .cate-item {
          display: flex;
          width: 33.33%;
          margin-top: 15rpx;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;  
          font-size: 12px;
          image {
            width: 150rpx;
            height: 60px;
          }
        }
      }
    }
  }
</style>
