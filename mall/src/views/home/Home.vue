<template>
  <div id='home'>
    <NavBar class='home-nav'><div slot="center">购物街</div></NavBar>
    <TabControl :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed"/>

    <Scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl2"/>
      <GoodsList :goods="showGoods"/>
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
        tabOffsetTop: 0, //Tabcontrol距离顶部的距离
        isTabFixed: false, //Tabcontrol是否固定
        saveY: 0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated(){
      console.log(this.saveY)
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY)
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
      // 防抖动函数
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
        /*保持选项状态一致*/
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      /*回到顶部*/
      backTop(){
        this.$refs.scroll.scrollTo(0,0,500)  /* xy坐标 时间 ms */
      },
      /*获取位置*/
      contentScroll(position){
        //1.判断backtop是否显示
        if(position.y < -500) this.isShowBackTop = true;
        else{
          this.isShowBackTop = false;
        }

        //2.决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //上拉加载更多
      loadMore(){
        // console.log("上拉加载");
        this.getProductData(this.currentType);
      },
      //等待轮播图加载完成，计算实际高度
      swiperImageLoad(){   
        //获取tabcontrol的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

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
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时，为了使导航不跟随一起滚动*/
  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;*/
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
.tab-control {
  position: relative;
  z-index: 9
}

</style>
