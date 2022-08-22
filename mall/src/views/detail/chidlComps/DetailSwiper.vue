<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="item in topImages" :key="item.index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper/index.js'
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
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
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>