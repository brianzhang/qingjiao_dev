<template>
<div id="app" style="width:100%; height:100%;">
  <router-view></router-view>
<!--
  <loading ref="loading" :shows="loading"></loading>
-->
</div>
</template>
<script>
// import Tabbar from '@/components/tabbar';
import Loading from '@/components/cells/Loading';
export default {
  name: 'app',
  data() {
    return {
      loading:false
    }
  },
  mounted(){
    var that=this;
    setTimeout(()=>{
      that.loading=false
    },2000)
  },
  components: {
    // Tabbar
    Loading
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
body {
    background-color: #fbf9fe;
}
canvas {
    display: none;
  }
</style>
