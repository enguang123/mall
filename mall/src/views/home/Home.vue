<template>
  <div id='home'>
    <NavBar class='home-nav'><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners"/>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import {getMultiData} from '../../network/home.js'


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    created(){
      getMultiData().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff
}

</style>
