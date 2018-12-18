<template>
  <div>
    <div class="header">
      <a slot="overwrite-left" @click="goback()">
        <x-icon type="ios-close-empty" size="45" style="fill:#fff;position:absolute;top: .03rem;left:.1rem;"></x-icon>
      </a>
      {{title}}
      <a slot="right" @click="finish()">
        <x-icon type="ios-checkmark-empty" size="50" style="fill:#fff;position:absolute;right:.1rem;float: right;"></x-icon>
      </a>
    </div>

    <group :title="textareaTitle">
      <x-textarea v-model="opinion" :placeholder="placeholder" :show-counter="false" :height="200" :rows="8" :readonly="showOpinion" :cols="30"></x-textarea>
    </group>
    <group v-show="showDirectHandlerSign">
      <check-icon :value.sync="taskData.task.directHandlerSign">特权:直接处理</check-icon>
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
  XHeader,
  Group,
  Cell,
  XTextarea,
  Alert,
  TransferDomDirective as TransferDom,
  Loading,
  CheckIcon
} from 'vux';
import axios from 'axios';
import Router from 'vue-router';
import qs from 'qs';
import {
  webapiUrl
} from '@/config/base';
require('promise.prototype.finally').shim();
export default {
  components: {
    XHeader,
    Group,
    Cell,
    Router,
    XTextarea,
    Alert,
    Loading,
    CheckIcon
  },
  directives: {
    TransferDom
  },
  props: [

  ],
  data() {
    return {
      title: "同意",
      textareaTitle: "审批意见：",
      placeholder: '请输入审批意见',
      alertPamars: {
        alertShow: false,
        alertContent: '',
        alertTitle: '温馨提示'
      },
      taskData: {
        task:{
          directHandlerSign:false
        }
      },
      opinion: '',
      showMask:false,
      showOpinion: true,
      showDirectHandlerSign:false
    }
  },
  mounted() {
    this.showMask = true;
    this.taskData = JSON.parse(localStorage.waitingHandleTaskData || '{}');
    this.title = this.taskData.task.action;
    this.showOpinion = this.taskData.attributes.isHideOpinion;
    if(this.showOpinion){
      this.placeholder = '你不能填写意见，请直接提交或返回！';
    }
    this.actionMessage();
  },
  methods: {
    goback() {
      this.$router.go(-1);
      // this.$router.push({
      //   name: 'waitingHandleList'
      // });
    },
    finish() {
      let _self = this;
      _self.showMask=true;
      this.taskData.task.opinion = this.opinion;
      // this.taskData.task.taskId = '9999999';
      this.taskData.task.account = localStorage.getItem("account");
      this.taskData.task.curUser = localStorage.getItem("userId");
      this.taskData.task.curUserName = localStorage.getItem("fullName");
      // console.log(JSON.stringify(this.taskData.task.data));
      axios.post(webapiUrl+"/webapi/bpmService/complete", qs.stringify(this.taskData.task), {
        responseType: 'json'
      }).then(function(response) {
        _self.showMask=false;
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
        //console.log(error);
        _self.alertPamars.alertContent = '任务办理失败';
        _self.alertPamars.alertShow = true;
        _self.showMask=false;
      });

    },
    actionMessage (){
      let _self = this;
      let params = {taskId:_self.taskData.task.taskId,actionName:_self.taskData.task.actionName,account:localStorage.getItem("account")};
      axios.post(webapiUrl+"/webapi/bpmService/actionMessage", qs.stringify(params), {
          responseType: 'json'
        }).then(function(response) {
          console.log(response.data.vars.directHandlerSign);
          _self.taskData.task.directHandlerSign = false;
          _self.showDirectHandlerSign=response.data.vars.directHandlerSign;

        }).catch(function(error) {
          console.log(error);
        }).finally(function(){
          _self.showMask = false;
        });

    }
  }

};
</script>

<style>
</style>
