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
      //1.??????iid
      // console.log(this.$route.query.iid);
      this.iid = this.$route.query.iid

      //2.??????iid??????????????????
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        //?????????????????????
        this.topImages = data.itemInfo.topImages;

        //??????????????????
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //??????????????????
        this.shop = new Shop(data.shopInfo)

        //???????????????????????????
        this.detailInfo = data.detailInfo;

        //??????????????????
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //??????????????????
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        } 


        // //?????????????????????????????????this.$refs.params.$el??????????????????
        // this.themeTops =[];
        // this.themeTops.push(0);
        // this.themeTops.push(this.$refs.params.$el.offsetTop);
        // this.themeTops.push(this.$refs.comment.$el.offsetTop);
        // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTops)

        // //??????????????????????????????????????????????????????DOM????????????????????????????????????????????????,?????????????????????????????????
        // this.$nextTick(() =>{
        //   this.themeTops =[];
        //   this.themeTops.push(0);
        //   this.themeTops.push(this.$refs.params.$el.offsetTop);
        //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTops)
        // }) 
      })

      //3.??????????????????
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
        this.themeTops.push(Number.MAX_VALUE);//??????????????????????????????????????????
        // console.log(this.themeTops)
      },
      tabClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTops[index],500)
      },
      contentScroll(position) {
        // console.log(position)
        // ??????Y???
        const positionY = -position.y;
        let length = this.themeTops.length;
        // positionY???themeTops???????????????
        for(let i = 0 ; i < length-1; i++) {
          // ?????????
          // if(this.currentIndex !== i && i < (length - 1) && positionY > this.themeTops[i] && positionY < this.themeTops[i+1]
          //   || (i == length -1 && positionY > this.themeTops[i])){
          //     this.currentIndex = i;
          //     this.$refs.nav.currentIndex = this.currentIndex;
          //   }

          //?????????
          if(this.currentIndex !== i && (positionY >= this.themeTops[i]) && (positionY < this.themeTops[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        };

        this.listenShowBackTop(position);
        // console.log(this.isShowBackTop);
      },
      addToCart(){
        // ????????????????????????????????????
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(product);

        //???????????????????????????
        // this.$store.commit('addCart',product);
        //?????????
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        //????????? ??????vuex??????
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
