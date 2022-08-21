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
      pullUpLoad: {
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

      //3监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
        // console.log("上拉加载更多")
        this.$emit('pullingUp')
        })
      }
      
    },
    methods: {
      scrollTo(x, y, time=300){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>