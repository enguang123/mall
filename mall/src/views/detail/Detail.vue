<template>
  <div id="detail">
    <DetailNavBar class="detailNav" @tabClick="tabClick" ref="nav"/>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"/>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"/>
      <GoodsList ref="recommend" :goods="recommends"/> 
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"/>
    <Toast ref="toast"/>
    <BackTop @click.native="Backtop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './chidlComps/DetailNavBar.vue'
  import DetailSwiper from './chidlComps/DetailSwiper.vue'
  import DetailBaseInfo from './chidlComps/DetailBaseInfo.vue'
  import DetailShopInfo from './chidlComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './chidlComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './chidlComps/DetailParamInfo.vue'
  import DetailCommentInfo from './chidlComps/DetailCommentInfo.vue'
  import DetailBottomBar from './chidlComps/DetailBottomBar.vue'

  import Scroll from '../../components/common/scroll/Scroll.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail.js'

  import {backTopMixin} from '../../common/mixin.js'
  // import {TOP_DISTANCE} from '../../common/const.js'
  import { mapActions } from 'vuex'
  import Toast from '../../components/common/toast/Toast.vue'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
      Toast
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        goodsList: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    created() {
      //1.获取iid
      // console.log(this.$route.query.iid);
      this.iid = this.$route.query.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        //获取轮播图数据
        this.topImages = data.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取商家信息
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        } 


        // //第一次获取值不对，因为this.$refs.params.$el没有渲染出来
        // this.themeTops =[];
        // this.themeTops.push(0);
        // this.themeTops.push(this.$refs.params.$el.offsetTop);
        // this.themeTops.push(this.$refs.comment.$el.offsetTop);
        // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTops)

        // //第二次获取，在下一帧中获取高度，防止DOM还没有渲染出来，无法获取正确的值,但依然存在图片加载问题
        // this.$nextTick(() =>{
        //   this.themeTops =[];
        //   this.themeTops.push(0);
        //   this.themeTops.push(this.$refs.params.$el.offsetTop);
        //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTops)
        // }) 
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      })
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh();

        this.themeTops =[];
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTops.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTops.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTops.push(Number.MAX_VALUE);//多加一个值，用于约束第四部分
        // console.log(this.themeTops)
      },
      tabClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTops[index],500)
      },
      contentScroll(position) {
        // console.log(position)
        // 获取Y值
        const positionY = -position.y;
        let length = this.themeTops.length;
        // positionY与themeTops中的值对比
        for(let i = 0 ; i < length-1; i++) {
          // 方式一
          // if(this.currentIndex !== i && i < (length - 1) && positionY > this.themeTops[i] && positionY < this.themeTops[i+1]
          //   || (i == length -1 && positionY > this.themeTops[i])){
          //     this.currentIndex = i;
          //     this.$refs.nav.currentIndex = this.currentIndex;
          //   }

          //方式二
          if(this.currentIndex !== i && (positionY >= this.themeTops[i]) && (positionY < this.themeTops[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        };

        this.listenShowBackTop(position);
        // console.log(this.isShowBackTop);
      },
      addToCart(){
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(product);

        //将商品添加到购物车
        // this.$store.commit('addCart',product);
        //方式二
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        //方式三 通过vuex映射
        this.addCart(product).then(res => {
          this.$toast({message: res, duration: 2000})
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
.detailNav {
  position: relative;
  z-index: 9;
  }
</style>
