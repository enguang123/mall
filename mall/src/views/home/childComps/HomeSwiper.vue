<template>
  <Swiper>
    <SwiperItem v-for="item in banners" :key="item.index">
      <a :href="item.link">
        <img :src="item.image"  alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper/index.js'
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }
      
    }
  }
}
</script>

<style scoped>
</style>