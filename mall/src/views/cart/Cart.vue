<template>
  <div class="cart">
    <!--导航-->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>

    <!--列表-->
    <CartList/>
    <!--汇总-->
    <CartBottomBar/>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    font-weight: 500;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    }
</style>
