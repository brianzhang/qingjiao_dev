<template>
<div>
  <div class="lc-img">
    <x-img :src="flowImageSrc"></x-img>
  </div>
  <div style="margin-top:50px">
    <x-button type="primary" text="返回" action-type="button" @click.native="goback()"></x-button>
    <x-button type="primary" text="关闭" action-type="button" @click.native="close()"></x-button>
  </div>
</div>
</template>

<script>
import {
  XButton,
  XImg
} from 'vux';
import {
  webapiUrl
} from '@/config/base';
export default {
  components: {
    XButton,
    XImg
  },
  props: [],
  data() {
    return {
      title: "流程图",
      taskData: '',
      flowImageSrc: ''
    }
  },
  mounted() {
    this.taskData = JSON.parse(localStorage.getItem("waitingHandleTaskData") || '{}');

    this.title = this.taskData.task.action;
    this.flowImageSrc = webapiUrl + '/webapi/bpmImage/gen?taskId=' + this.taskData.task.taskId+"&account="+localStorage.getItem("account");
    console.log(this.flowImageSrc);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    close() {
      localStorage.removeItem('waitingHandleTaskData');
      this.$router.go(-2);
    }
  }
};
</script>

<style>
.lc-img {
  overflow:scroll;
  max-width: 100%;
  min-height: 400px;

}
</style>
