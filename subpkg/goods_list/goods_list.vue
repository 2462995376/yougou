<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []

      // 2. 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if (this.isLoading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    data() {
      return {
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.isLoading = false
        cb && cb();
        this.total = res.message.total
        this.goodsList = [...res.message.goods, ...this.goodsList]
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '../goods_detail/goods_detail?goods_id=' +item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
