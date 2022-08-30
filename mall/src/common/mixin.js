import BackTop from '../components/content/backTop/BackTop.vue'
import {TOP_DISTANCE} from './const.js'
import {POP, NEW, SELL} from "./const"
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

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
			console.log(this.currentType);
		}
	}
}