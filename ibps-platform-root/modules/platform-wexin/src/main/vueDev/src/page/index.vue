<template>
  <div>
    <div v-transfer-dom><!--  <!--:text="text-->-->
<!--
      <loading :shows="show"></loading>
-->
    </div>
  </div>
</template>

<script>
import { /*Loading,*/ TransferDomDirective as TransferDom } from 'vux'
import http from 'axios';
import Loading from '@/components/cells/Loading';
import {getQueryString,getAccount} from '@/libs/utils';
export default {
  data() {
    return {
      show: false,
      text: '加载中...'
    }
  },
  created:function(){
  },
  mounted() {
    let that = this;
    let p = window.location.search.split("?");
    console.log(p.length);
    // let account = localStorage.getItem("account");
    if(p.length==4){
      let p1 = p[1].split("&");
      let code = p1[0].split("=");
      // console.log("code:"+code[0]+"---"+code[1]);
      let p2 = p[2].split("=");
      let p3 = p[3].split("=");
      if(p3[1]&&p3[1]=="waitingDetail"){
        localStorage.setItem("taskId",p2[1]);
        getAccount(http,code[1],function(obj){
          localStorage.setItem("account", obj);
          that.show=false;
          that.$router.push({
            name: "waitingHandleDetail",
            params: {
              taskId: p2[1],
              account: obj,
              subject: ""
            }
          });
        });

      }
    }else if(p.length==2){
      setTimeout(function () {
        getAccount(http,getQueryString("code"),function(obj){
          localStorage.setItem("account", obj);
          if(obj){
            that.show=false;
            that.$router.push({
              name: "main"
            });
          }else{
            that.show=false;
            that.$router.push({
              name: "login"
            });
          }
        });
      },2000)
    }else{
      that.show=false;
      that.$router.push({
        name: "login"
      });
      // that.show=false;
      // localStorage.setItem("account", "admin");
      // that.$router.push({
      //   name: "main"
      // });
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Loading,
  }
}
</script>
