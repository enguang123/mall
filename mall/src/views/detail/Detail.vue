<template>
  <div id="detail">
    <DetailNavBar/>
    <DetailSwiper :topImages="topImages"/>
    <DetailBaseInfo :goods="goods"/>
    <DetailShopInfo :shop="shop"/>
  </div>
</template>

<script>
  import DetailNavBar from './chidlComps/DetailNavBar.vue'
  import DetailSwiper from './chidlComps/DetailSwiper.vue'
  import DetailBaseInfo from './chidlComps/DetailBaseInfo.vue'
  import DetailShopInfo from './chidlComps/DetailShopInfo.vue'

  import {getDetail, Goods, Shop} from '../../network/detail.js'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      //1.获取iid
      // console.log(this.$route.query.iid);
      this.iid = this.$route.query.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        //获取轮播图数据
        this.topImages = data.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取商家信息
        this.shop = new Shop(data.shopInfo)
      })
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
</style>
