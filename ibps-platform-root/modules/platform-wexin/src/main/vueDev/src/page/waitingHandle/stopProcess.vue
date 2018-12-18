<template>
  <div>
    <group :title="textareaTitle">
      <x-textarea v-model="commitData.endReason" :placeholder="placeholder" :show-counter="false" :height="250" :rows="10" :cols="30"></x-textarea>
    </group>
    <div v-transfer-dom>
      <alert v-model="alertPamars.alertShow" :title="alertPamars.alertTitle"> {{alertPamars.alertContent}}</alert>
    </div>
    <group>
      <div style="text-align: center; padding-bottom: .16rem;">
        <x-button type="primary" mini text="完成" action-type="button" @click.native="finish()"></x-button>

        <x-button type="primary" mini text="返回" action-type="button" @click.native="goback()"></x-button>

        <x-button type="primary" mini text="关闭" action-type="button" @click.native="close()"></x-button>
      </div>
    </group>
    <div v-transfer-dom>
      <alert v-model="alertPamars.alertShow" :title="alertPamars.alertTitle"> {{alertPamars.alertContent}}</alert>
    </div>
    <div v-transfer-dom>
      <loading :show="showMask" text="Processing"></loading>
    </div>
  </div>

</template>

<script>
import {
  XButton,
  Group,
  XTextarea,
  Alert,
  TransferDomDirective as TransferDom,
  Loading
} from 'vux';
import http from 'axios';
import qs from 'qs';
import { webapiUrl } from '@/config/base';
export default {
  components: {
    XButton,
    Group,
    XTextarea,
    Alert,
    Loading
  },
  directives: {
    TransferDom
  },
  props: [],
  data() {
    return {
      textareaTitle: '',
      placeholder: '请输入审批意见',
      alertPamars: {
        alertShow: false,
        alertContent: '',
        alertTitle: '温馨提示'
      },
      taskData: '',
      commitData: {
        taskId: '',
        messageType: '',
        endReason: '',
        account: ''
      },
      stopProcessUrl: webapiUrl+'/webapi/bpmService/stopProcess',
      showMask:false
    }
  },
  mounted() {
    this.taskData = JSON.parse(localStorage.waitingHandleTaskData || '{}');
    this.textareaTitle = this.taskData.task.action+"意见：";
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    close() {
      localStorage.removeItem('waitingHandleTaskData');
      this.$router.go(-2);
    },
    finish() {
      let _self = this;
      _self.showMask=true;
      _self.commitData.taskId = _self.taskData.task.taskId;
      _self.commitData.account = localStorage.getItem("account");
      http.post(this.stopProcessUrl, qs.stringify(_self.commitData), {
        responseType: 'json'
      }).then(function(response) {
        _self.showMask=false;
        // console.log(response);
        _self.alertPamars.alertContent = '任务办理成功';
        _self.alertPamars.alertShow = true;
        setTimeout(() => {
          _self.showMask=false;
          _self.alertPamars.alertShow = false;
          localStorage.removeItem('waitingHandleTaskData');
          _self.$router.push({
            name: 'waitingHandleList'
          });
        }, 2000);
      }).catch(function(error) {
        _self.alertPamars.alertContent = '任务办理失败';
        _self.alertPamars.alertShow = true;
        _self.showMask=false;
      });

    }
  }

};
</script>

<style>
.m-title{
  text-align: center;
  padding-top: 45%;
}
</style>
