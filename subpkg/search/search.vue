<template>
  <view class="search-container">
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入搜索内容">
      </uni-search-bar>
    </view>
    <view class="serchList" v-if="searchList.length!==0">
      <view class="searchitem" v-for="(item,index) in searchList" :key="index" @click="gotodetail(item)">
        <text class="searchtext">{{item.goods_name}}</text>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="searchHistory" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="20" @click="historyclear"></uni-icons>
      </view>
      <view class="historyList">
        <text class="historyitem" v-for="(item,index) in historyList" :key="index" @click="gotolist(item)">
          {{item}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchList: [],
        historyList: []
      }
    },
    created() {
      this.historyList = JSON.parse(uni.getStorageSync('HISTORY') || "[]")
    },
    methods: {
      input(e) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchSuggest()
        }, 500)
      },
      async getSearchSuggest() {
        if (this.kw === '') {
          this.searchList = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchList = res.message
        this.historyList.unshift(this.kw)
        this.historyList = Array.from(new Set(this.historyList))
        uni.setStorageSync('HISTORY', JSON.stringify(this.historyList))
      },
      gotodetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      gotolist(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
        })
      },
      historyclear() {
        this.historyList = []
        uni.setStorageSync('HISTORY', JSON.stringify(this.historyList))
      }
    }
  }
</script>

<style lang="scss">
  .search-container {
    .search-box {
      position: sticky;
      top: 0;
      z-index: 999;
    }

    .serchList {
      padding: 0 20rpx;

      .searchitem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100rpx;
        // line-height: 80rpx;
        border-bottom: 1px solid #efefef;

        .searchtext {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 10px;
        }
      }
    }

    .searchHistory {
      .history-title {
        padding: 0 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        border-bottom: 1px solid #efefef;
        font-size: 16px;
      }

      .historyList {
        .historyitem {
          display: inline-block;
          height: 60rpx;
          margin: 10rpx;
          padding: 0 10px;
          box-sizing: border-box;
          background-color: #EEEEEE;
          min-width: 60px;
          line-height: 60rpx;
          border-radius: 30rpx;
          text-align: center;
        }
      }
    }
  }
</style>
