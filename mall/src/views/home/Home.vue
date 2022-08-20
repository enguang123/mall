<template>
  <div id='home'>
    <NavBar class='home-nav'><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners"/>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
    <TabControl calss="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
    <GoodsList :goods="showGoods"></GoodsList>
    <ul>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getMultiData, getProductData} from '../../network/home.js'


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
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
        currentType: 'pop'
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      this.getMultiData();
      this.getProductData('pop');
      this.getProductData('sell');
      this.getProductData('new');
    },
    methods: {
      /*
      事件监听相关方法
      */
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
        })
      }
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
