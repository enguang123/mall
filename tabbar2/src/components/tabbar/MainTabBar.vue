<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="red">
      <img slot="item-icon" src="../../assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="../../assets/img/tabbar/home_active.svg">
      <div slot="item-text" >首页</div>
    </TabBarItem>
    <TabBarItem path="/category" activeColor="red">
      <img slot="item-icon" src="../../assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="../../assets/img/tabbar/category_active.svg">
      <div slot="item-text" >分类</div>
    </TabBarItem>
    <TabBarItem path="/cart" activeColor="red">
      <img slot="item-icon" src="../../assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="../../assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text" >购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile" activeColor="red">
      <img slot="item-icon" src="../../assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="../../assets/img/tabbar/profile_active.svg">
      <div slot="item-text" >我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar.vue'
import TabBarItem from '@/components/tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style>

</style>