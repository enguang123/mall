import BackTop from '../components/content/backTop/BackTop.vue'
import {TOP_DISTANCE} from './const.js'
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods: {
    /*回到顶部*/
    Backtop(){
      this.$refs.scroll.scrollTo(0,0,500)  /* xy坐标 时间 ms */
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > TOP_DISTANCE;
      // console.log(this.isShowBackTop)
    }
  }
}