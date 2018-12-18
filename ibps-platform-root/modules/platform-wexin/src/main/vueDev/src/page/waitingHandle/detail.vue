<template>
  <div>
    <loading :shows="show1" :text="text1"></loading><!--:text="text1"-->
    <div class="header">详细信息</div>
    <p class="lc-detail-title" style="color: #524f4f;">
      {{taskData.subject}}
    </p>
    <tab v-model="index">
      <tab-item key='1' @click="index = 0">流程表单</tab-item>
      <tab-item key='2' @click="index = 1">流程图</tab-item>
      <tab-item key='3' @on-item-click="toggleTab('his')">审批历史</tab-item>
      <!--<tab-item key='4' @click.native="getOpinions()">审批历史</tab-item>-->
    </tab>
    <div v-if="index==0">
      <div class="tab-swiper vux-center" ref="formContent" style="overflow:scroll">
        <group v-for="(obj,index) in taskData.detail" :key="index+1">
          <div v-if="obj.field_type=='hidden'" class="hidden" style="display: none">
            <x-input :title="obj.label" type="hide" v-model="obj.inputValue" :disabled="false"></x-input>
          </div>
          <div v-else-if="obj.field_type=='text'">
            <single-line-text :obj="obj"></single-line-text>
          </div>
          <div v-else-if="obj.field_type=='datePicker'">
            <date-picker :obj="obj" :format="obj.field_options.datefmt" :value="obj.inputValue"></date-picker>
          </div>
          <div v-else-if="obj.field_type=='number'">
            <number :obj="obj"></number>
          </div>
          <div v-else-if="obj.field_type=='select'">
            <lc-select :obj="obj" id="selector1"></lc-select>
          </div>
          <div v-else-if="obj.field_type=='radio'">
            <radio :obj="obj" id="radio1"></radio>
          </div>

          <div v-else-if="obj.field_type=='textarea'">
            <multi-line-text :obj="obj"></multi-line-text>
          </div>
          <div v-else-if="obj.field_type=='checkbox'">
            <checklist :obj="obj" id="checkbox1"></checklist>
          </div>
          <div v-else-if="obj.field_type=='editor'">
            <x-textarea :title="obj.label+'：'" v-model="obj.inputValue" :readonly="false" placeholder="请输入"></x-textarea>
          </div>
          <div v-else-if="obj.field_type=='selector'">
            <component :is="'lc'+obj.field_type" :obj="obj" :data="taskData"  :index="index"></component>
          </div>
          <div v-else-if="obj.field_type=='dictionary'">
            <dictionary title='数据字典' :obj="obj" :value="selected" :valueText="valueText" :returnUrlName="returnUrlName" :data="taskData"></dictionary>
          </div>
          <div v-else>
             <!--<x-input :title='obj.label+"："' v-model="obj.inputValue"></x-input>-->
          </div>
        </group>
        <!-- <group>
          <x-button type="primary" mini :text="obj.name" action-type="button" @click.native="complete(obj)" v-for="(obj,index) in taskData.buttons" key="index+'buttons'" style="width:100%"></x-button>
        </group> -->
      </div>
    </div>
    <div v-if="index==1">
      <div style="overflow:scroll;min-height:500px;">
        <x-img :src="flowImageSrc"></x-img>
      </div>
    </div>
    <div v-if="index==2"></div>
    <tabbar ref="detailTabbarRef" class="tabbar_box">
      <tabbar-item @on-item-click="show=true" selected>
        <span slot="label">操作</span>
      </tabbar-item>
      <tabbar-item class="tab_left" @on-item-click="goback()" >
        <span slot="label">返回</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <alert v-model="alertPamars.alertShow" :title="alertPamars.alertTitle"> {{alertPamars.alertContent}}</alert>
    </div>

    <div style="height:50px;"></div>
    <actionsheet v-model="show" :menus="menus" @on-click-menu="operate" show-cancel ></actionsheet>
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
  Swiper,
  SwiperItem,
  Tabbar,
  TabbarItem,
  Alert,
  TransferDom,
  XImg
  // Loading
} from 'vux'
import http from 'axios';
import qs from 'qs';
import SingleLineText from '@/components/cells/Text';
import MultiLineText from '@/components/cells/Textarea';
import Number from '@/components/cells/Number';
// import DatePicker from '@/components/cells/DatePicker';
import Radio from '@/components/cells/Radio';
import LcSelect from '@/components/cells/Select';
import Checklist from '@/components/cells/Checklist';
import LcSelector from '@/components/selectors/index';
//import LcSelector from '@/components/selectors/index';
import DatePicker from '@/components/datepicker/index';
import Dictionary from '@/components/dictionary/index';
import Loading from '@/components/cells/Loading';
import {
  webapiUrl
} from '@/config/base';

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XInput,
    XButton,
    SingleLineText,
    MultiLineText,
    Number,
    DatePicker,
    Radio,
    LcSelect,
    Checklist,
    lcselector: LcSelector,
    LcSelector,
    XTextarea,
    Actionsheet,
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    Alert,
    Loading,
    Dictionary,
    XImg
  },
  data() {
    return {
      taskData: {
        task: {
          opinion: '',
          data: '',
          taskId: '',
          action: '',
          actionName: '',
          nodeUsers: '',
          directHandlerSign: '',
          backHandMode: '',
          jumpType: '',
          nodeId: '',
          destination: ''
        },
        subject: '详细流程',
        detail: '',
        buttons: [],
        attributes: '',
        account: '',
        dicId: '',
        dicName: ''
      },
      detailUrl: webapiUrl + "/webapi/bpmService/getFormData",
//      dictUrl: webapiUrl + "/webapi/dictionaryService/getByTypeKey",
      flowImageSrc: webapiUrl + '/webapi/bpmImage/gen?taskId=' + this.$route.params.taskId+'&account=' + localStorage.getItem('account'),
      show: false,
      menus: [],
      alertPamars: {
        alertShow: false,
        alertContent: '',
        alertTitle: '温馨提示'
      },
      IncludeChild:false,
      index: 0,
      show1: true,
      text1: '玩命加载中',
      returnUrlName:this.$route.name,
      valueText:this.$route.params.valueText,
      value:this.$route.params.value,
      selected:this.$route.params.selected
    }
  },
  directives: {
    TransferDom
  },
  computed: {
    isDisabled: function() {
      return !(this.permission_ && this.permission_.indexOf('e') >= 0);
    }
  },
  mounted() {
    this.getTaskDetail();
    this.checkIncludeTable();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    //'$route': 'data'
  },
  created() {},
  methods: {
    goback() {
      localStorage.removeItem('waitingHandleTaskData');
      this.$router.push({
        name: 'waitingHandleList'
      });
    },
    getTaskDetail() {
      let _self = this;
      if (localStorage.waitingHandleTaskData){
        _self.taskData = JSON.parse(localStorage.getItem('waitingHandleTaskData'));
        _self.menus = _self.buttonsMenus(_self.taskData.buttons);
        _self.show1 = false
      }else{
        let params = this.$route.params;
        http.get(this.detailUrl+"?"+qs.stringify(params), {
              responseType: 'json'
            })
          .then(function(response) {
            _self.initializeData(response.data.vars, params);
            _self.show1 = false
          })
          .catch(function(error) {
          });
      }
    },
    initializeData(obj, routerParams) {
      let _self = this;
      let formFields = eval('(' + obj.formModel.formData + ')').fields;
      var boData = eval('(' + obj.boData + ')');
      let permissions = eval('(' + obj.permissions + ')');
      let name = '';
      for (var i = 0; i < formFields.length; i++) {
        if(formFields[i].field_type=="table"){
        }
        name = formFields[i].name;
        if ((permissions.fields)[name]) {
        // formFields[i].permission = "e";
        formFields[i].permission = (permissions.fields)[name];
        }
        if (boData[name]) {
          formFields[i].inputValue = boData[name];
        }
      }
      _self.taskData.buttons = obj.buttons;
      _self.menus = _self.buttonsMenus(obj.buttons);
      _self.taskData.detail = formFields;
      _self.taskData.task.data = boData;
      _self.taskData.task.taskId = routerParams.taskId;
      _self.taskData.subject = routerParams.subject;
      _self.taskData. attributes = obj.attributes;
      _self.taskData.account = localStorage.getItem("account");
      _self.checkIncludeTable();
      localStorage.waitingHandleTaskData= JSON.stringify(_self.taskData);
    },
    buttonsMenus(buttons){
      let menus = [];
      for (var button of buttons) {
        if (button.alias == 'agree' || button.alias == 'oppose' || button.alias == 'reject' || button.alias == 'rejectToStart' || button.alias == 'flowImage' || button.alias == 'endProcess' || button.alias == 'return') {
          menus.push({label:button.name,value:button.alias,otherProp:button});
        }
      }
      return menus;
    },
    operate(key){
      let _self = this;
      if(this.IncludeChild==true){
        this.alertPamars.alertContent = '该流程包含主子表，暂不支持操作！';
        this.alertPamars.alertShow = true;
        return;
      }
      _self.taskData.task.actionName = key;
      var buttons = _self.taskData.buttons;
      for (var i = 0; i < buttons.length; i++) {
        if(buttons[i].alias==key){
          _self.taskData.task.action = buttons[i].name;
          break;
        }
      }
      let pathName = '';
      switch (key) {
        case 'agree':
          pathName = 'waitingHandleAgree';
          break;
        case 'oppose':
          pathName = 'waitingHandleAgree';
          break;
        case 'reject':
          pathName = 'waitingHandleReject';
          break;
        case 'rejectToStart':
          pathName = 'waitingHandleRejectToStart';
          break;
        case 'endProcess':
          pathName = 'waitingHandleStopProcess';
          break;
        case 'flowImage':
          pathName = 'waitingHandleFlowImage';
          break;
        case 'cancel':
          return;
        default:
          pathName = 'waitingHandleList';
      }
      this.$router.push({
        name: pathName
      });
    },
    checkIncludeTable(){
      for (var i = 0; i < this.taskData.detail.length; i++) {
        if(this.taskData.detail[i].field_type=="table"){
          this.IncludeChild = true;
          return;
        }
        this.show1 = false
      }
    },
    toggleTab(flag){
      let pathName = '';
      if(flag=='img'){

        pathName = 'waitingHandleFlowImage';
      }else if(flag=='his'){
      }
      this.$router.push({
        name: pathName
      });
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
    margin-top: 15px;
    font-size: 18px;
    white-space: normal;
    text-align: center;
    font-weight: 800;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
