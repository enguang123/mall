<template>
  <div id='home'>
    <NavBar class='home-nav'><div slot="center">购物街</div></NavBar>

    <Scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners"/>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl calss="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  import BackTop from '../../components/content/backTop/BackTop.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getMultiData, getProductData} from '../../network/home.js'
  import {debounce} from '../../common/utils.js'


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false, //刚进入页面 不显示回顶部按钮
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      //请求多个数据
      this.getMultiData();

      //请求商品数据
      this.getProductData('pop');
      this.getProductData('sell');
      this.getProductData('new');
      
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,200)

      //监听商品组件中 图片加载完成 better-scroll在计算高度时，可能在图片未加载完成之前得到计算的高度，可能出现卡顿现象
      this.$bus.$on('imgLoad', ()=>{     //事件总线的使用
        refresh();
        // console.log("def")
      })

    },
    methods: {
      /*
      事件监听相关方法
      */
   
      /*类型*/
      tabClick(index){
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      /*回到顶部*/
      backTop(){
        this.$refs.scroll.scrollTo(0,0,500)  /* xy坐标 时间 ms */
      },
      /*回到顶部的按钮是否显示*/
      contentScroll(position){
        // console.log(position);
        if(position.y < -500) this.isShowBackTop = true;
        else{
          this.isShowBackTop = false;
        }
      },
      loadMore(){
        console.log("上拉加载");
        this.getProductData(this.currentType);
      },
      /*
      网络请求相关方法
      */
      getMultiData(){
        getMultiData().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getProductData(type){
        const page = this.goods[type].page + 1;
        getProductData(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载
          this.$refs.scroll.finishPullUp();

        })
      }
    }
  }
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;

  background-color: #fff;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*.content {
  height: 100%;
  margin-top: 44px;
  overflow: hidden;
}*/
</style>
