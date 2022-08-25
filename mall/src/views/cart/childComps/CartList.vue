<template>
  <div class="cart">  
    <Scroll class="content" ref="scroll">
      <CartListItem v-for="item in cartList" :key="item.iid" :item-info="item"></CartListItem>
      <!--ul>
        <li>f</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>fe</li>
        <li>e</li>
      </ul-->
    </Scroll>
  </div>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll.vue'
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

	export default {
		name: "CartList",
    components: {
		  Scroll, 
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated(){
      // 进入页面进行刷新，重新计算显示的内容的高度
      this.$refs.scroll.refresh();
    }
	}
</script>

<style scoped>
  .cart {
    height: calc(100% - 44px -49px - 40px)
  }
  .content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
