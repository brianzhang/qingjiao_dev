<template>
  <div style="background-color: white;">
    <div class="header">
      <a @click="goback" slot="overwrite-left">
        <x-icon type="ios-arrow-left" size="30" style="fill:#fff;position:absolute;top:.08rem;left:.1rem;"></x-icon>
      </a>
      {{taskData.subject}}
    </div>
    <p class="lc-detail-title">{{title}}</p>

    <tab v-model="index" style="background-color: #D9EDF7">
      <tab-item key='1' @click="index = 0">流程信息</tab-item>
      <tab-item key='2' @click="index = 1">流程表单</tab-item>
      <tab-item key='3' @click="index = 2">流程图</tab-item>
      <tab-item key='4' @click.native="getOpinions()">审批历史</tab-item>
    </tab>

    <div v-if="index==0">
      <!--<x-input title="流程实例标题：" :value="taskData.bpmProcessInstance.subject" disabled></x-input>-->
      <x-input title="实例状态：" v-if="taskData.bpmProcessInstance.status=='running'" value="正在运行" disabled></x-input>
      <x-input title="实例状态：" v-else-if="taskData.bpmProcessInstance.status=='manualend'" value="人工结束" disabled></x-input>
      <x-input title="实例状态：" v-else-if="taskData.bpmProcessInstance.status=='end'" value="结束" disabled></x-input>
      <x-input title="实例状态：" v-else :value="taskData.bpmProcessInstance.status" disabled></x-input>
      <x-input title="流程名称：" :value="taskData.bpmProcessInstance.procDefName" disabled></x-input>
      <x-input title="流程定义KEY：" :value="taskData.bpmProcessInstance.procDefKey" disabled></x-input>
      <div data-v-77624150="" class="vux-x-input weui-cell">
        <div class="weui-cell__hd">
          <label for="vux-x-input-9pmrk" class="weui-label" style="width: 1.3rem">关联数据业务主键：</label>
        </div>
        <div class="weui-cell__bd weui-cell__primary">
          <input id="vux-x-input-9pmrk" :value="taskData.bpmProcessInstance.bizKey" disabled="disabled" class="weui-input">
        </div>
      </div>
      <!--<x-input title="关联数据业务主键：" :value="taskData.bpmProcessInstance.bizKey" disabled></x-input>-->
      <x-input title="绑定的表单KEY：" :value="taskData.bpmProcessInstance.formKey" disabled></x-input>
      <x-input title="创建时间：" :value="timeUtil(taskData.bpmProcessInstance.createTime)" disabled></x-input>
      <x-input title="是否禁止：" :value="taskData.bpmProcessInstance.forbidden" disabled></x-input>
      <x-input title="数据保存模式：" v-if="taskData.bpmProcessInstance.dataMode='bo_db'" value="物理表" disabled></x-input>
      <x-input title="数据保存模式：" v-else-if="taskData.bpmProcessInstance.dataMode='table'" value="物理表" disabled></x-input>
      <x-input title="数据保存模式：" v-else value="实例数据" disabled></x-input>
      <x-input title="是否正式数据：" v-if="taskData.bpmProcessInstance.isFormmal='N'" value="测试数据" disabled></x-input>
      <x-input title="是否正式数据：" v-else value="正式数据" disabled></x-input>
      <x-input title="BPMN流程实例ID：" :value="taskData.bpmProcessInstance.bpmnInstId" disabled></x-input>
      <x-input title="父实例ID：" v-if="taskData.bpmProcessInstance.parentInstId=='0'" value="无" disabled></x-input>
      <x-input title="父实例ID：" v-else :value="taskData.bpmProcessInstance.parentInstId" disabled></x-input>
    </div>

    <div v-if="index==1">
      <x-input v-for="(obj,index) in taskData.detail" :key="index+11" :title="obj.label+'：'" :value="getValue(obj)" disabled></x-input>
    </div>

    <div v-if="index==2">
      <div style="overflow:scroll;min-height:500px;">
        <x-img :src="flowImageSrc"></x-img>
      </div>
    </div>

    <div v-if="index==3">
      <cell v-for="(item,index) in opinions" :title="item.taskName" :key="index+item">
        <x-input title="审批状态：" :value="item.statusName" disabled></x-input>
        <div v-if="item.batch">
          <x-input title="待执行人：" v-if="item.qualifiedExecutor&&item.status == 'pending'" :value="getName(item.qualifiedExecutor)" disabled></x-input>
          <x-input title="执行人：" v-else-if="item.qualifiedExecutor&&item.status != 'pending'" :value="getName(item.qualifiedExecutor)" disabled></x-input>
          <x-input title="未设置执行人：" v-else disabled></x-input>
        </div>
        <div v-else>
          <x-input title="执行人：" v-if="item.auditor" :value="item.auditorName" disabled></x-input>
          <x-input title="待执行人：" v-else-if="item.qualifiedExecutor" :value="getName(item.qualifiedExecutor)" disabled></x-input>
          <x-input title="未设置执行人：" v-else disabled></x-input>
        </div>
        <div><x-input title="审批时间：" :value="timeUtil(item.completeTime)" disabled></x-input></div>
        <div><x-input title="审批意见：" :value="item.opinion" disabled></x-input></div>
      </cell>
    </div>

    <div style="height:50px;"></div>

  </div>

</template>

<script>
  import {
    XHeader,
    Group,
    Cell,
    XInput,
    XButton,
    XTextarea,
    Actionsheet,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    XImg,
    Flow,
    FlowState,
    FlowLine
  } from 'vux'
  import http from 'axios';
  import qs from 'qs';
  import {
    webapiUrl
  } from '@/config/base';
  import {
    hideMainTabbar,
    showMainTabbar
  } from '@/libs/utils';

  export default {
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      XButton,
      XTextarea,
      Actionsheet,
      Tab,
      TabItem,
      Tabbar,
      TabbarItem,
      XImg,
      Flow,
      FlowState,
      FlowLine
    },
    data() {
      return {
        taskData: {
          subject: '详细信息',
          detail: '',
          account: '',
          bpmProcessInstance: ''
        },
        title: this.$route.params.subject,
        instForm: webapiUrl + "/webapi/bpmService/getInstForm",
        flowImageSrc: webapiUrl + '/webapi/bpmImage/gen?bpmnInstId=' +  this.$route.params.item.bpmnInstId+'&account=' + localStorage.getItem('account'),
        opinionsUrl: webapiUrl + '/webapi/bpmService/opinions',
        opinions: '',
        index: 0
      }
    },
    computed: {
      isDisabled: function() {
        return !(this.permission_ && this.permission_.indexOf('e') >= 0);
      }
    },
    mounted() {
      this.taskData.bpmProcessInstance = this.$route.params.item;
      this.getInstForm();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      //'$route': 'data'
    },
    created() {},
    methods: {
      getInstForm() {
        let _self = this;
        let params = {
          "account": localStorage.getItem("account"),
          "bpmInstId": this.$route.params.item.id
        };

        http.get(this.instForm + "?" + qs.stringify(params), {
          responseType: 'json'
        })
          .then(function(response) {
            _self.initializeData(response.data.data);
          })
          .catch(function(error) {
            console.log("detail's error:");
            console.log(error);
            console.log("request's parameter: ");
            console.log(params);
          });


      },
      initializeData(obj) {
        let _self = this;
        // console.log(obj);
        let formFields = eval('(' + obj.formModel.formData + ')').fields;
        let boData = eval('(' + obj.boData + ')');
        let value;
        for (var i = 0; i < formFields.length; i++) {
          if (!boData[formFields[i].name]) {
            continue;
          }
          try {
            value = JSON.parse(boData[formFields[i].name]);
            formFields[i].value = value[0].name?value[0].name:value[0].filename;
          } catch (e) {
            value = boData[formFields[i].name];
            formFields[i].value = value;
          }
          if (formFields[i].field_type=="datePicker"&&formFields[i].value.length>formFields[i].field_options.datefmt.length) {
            formFields[i].value = formFields[i].value.substr(0,formFields[i].field_options.datefmt.length);
          }
        }
        _self.taskData.detail = formFields;
        console.log(_self.taskData.detail);
      },
      getOpinions() {
        let _self = this;
        let params = {
          "bpmInstId": this.$route.params.item.id,
          "account": localStorage.getItem("account")
        };
        http.get(this.opinionsUrl + "?" + qs.stringify(params), {
          responseType: 'json'
        })
          .then(function(response) {
            _self.opinions = response.data.data;
          })
          .catch(function(error) {
            console.log("detail's error:");
            console.log(error);
            console.log("request's parameter: ");
            console.log(params);
          });

      },
      timeUtil(timestamp) {
        if (timestamp) {
          return new Date(parseInt(timestamp)).toLocaleString();
        } else {
          return "";
        }
      },
      getName(obj) {
        let name = '';
        for (var i = 0; i < obj.length; i++) {
          name += obj[i].executor + " ";
        }
        return name;
      },
      goback() {
        this.$router.go(-1);
      },
      getValue(obj){
        console.log(obj.field_type);
        if(obj.field_type=="checkbox"||obj.field_type=="select"||obj.field_type=="radio"){
          let valueArray = (obj.value).split(",");
          let opts = obj.field_options.options;
          let valueLabel = '';
          out:for (var i = 0; i < valueArray.length; i++) {
            for (var j = 0; j < opts.length; j++) {
              if (valueArray[i]==opts[j].val) {
                if (valueLabel.length>0) {
                  valueLabel+=",";
                }
                valueLabel+=opts[j].label;
                continue out;
              }

            }
          }
          return valueLabel;
        }else{
          return obj.value;
        }

      }
    }
  }
</script>


<style lang="less" scoped>
  @import '~vux/src/styles/close.less';
  @import '../../styles/lc-common.css';

  .lc-tabbar {
    height: 0;
  }
  .lc-popup {
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .lc-detail-title {
    margin: 10px 20px;
    font-size: 16px;
    white-space: normal;
    text-align: center;
    font-weight: 800;
    color: #524f4f;
  }
</style>
