<template>
  <div id="detail">
    {{iid}}
  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    created() {
      console.log(this.$route.query.iid);
      this.iid = this.$route.query.iid
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
