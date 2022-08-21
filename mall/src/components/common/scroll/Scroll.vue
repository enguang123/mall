<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {       //监听位置参数类型
        type: Number,
        default: 0
      },
      pullUpLoad: {     //上拉加载功能开启参数
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        observeDOM: true,
        pullUpLoad: this.pullUpLoad,
      })

      //2.监听滚动的位置   发送到使用的地方
      this.scroll.on('scroll', (position)=>{
        // console.log(position);
        this.$emit('scroll', position)
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp',()=>{
        // console.log("上拉加载更多")
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>