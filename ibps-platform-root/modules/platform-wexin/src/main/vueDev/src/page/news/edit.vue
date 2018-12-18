<template>
  <!--新建公告-->
  <div>
    <loading :shows="show1" :text="text1"></loading>
    <div class="header">
      <router-link :to="{ name: 'main'}" slot="overwrite-left">
        <x-icon type="ios-arrow-left" size="30" style=""></x-icon>
      </router-link>
      {{title}}
    </div>
    <group title="发布选项">
      <radio :options="options" v-model="newsPO.publicItem"></radio>
    </group>
    <group title="类型">
      <selector :options="type" v-model="newsPO.typeId"></selector>
    </group>
    <group>
      <x-input title="标题：" placeholder="请输入" v-model="newsPO.title" required></x-input>
    </group>
    <!-- 发布人 -->
    <lc-selector type="user" id="userSelector" :value="newsPO.userId" :valueText="newsPO.userName" title="发布人" :returnUrlName="returnUrlName" :form="newsPO" isDisabled=false isSingle=true ></lc-selector>
    <group title="是否公共">
      <radio :options="isPublic" v-model="newsPO.isPublic"></radio>
    </group>
    <!-- 组织 -->
    <div v-show="newsPO.isPublic!='yes'">
      <lc-selector type="org" id="roleSelector" :value="newsPO.depId" :valueText="newsPO.depName" title="组织" :returnUrlName="returnUrlName" :form="newsPO" isDisabled='false' isSingle='false' ></lc-selector>
    </div>
    <group>
      <x-input title="作者：" v-model="newsPO.author" placeholder="请输入"></x-input>
    </group>
    <group>
      <x-input title="关键字：" v-model="newsPO.key" placeholder="请输入"></x-input>
    </group>
    <group>
      <datetime title="发布时间" v-model="newsPO.publicDate"></datetime>
    </group>
    <group>
      <datetime title="失效时间" v-model="newsPO.loseDate"></datetime>
    </group>
    <!-- <group title="附件">
  </group> -->
    <group>
      <x-textarea title="内容：" v-model="newsPO.content" placeholder="请输入"></x-textarea>
    </group>
    <div style="height:50px;"></div>
    <tabbar class="tabbar_box">
      <tabbar-item @on-item-click="save('publish')" >
        <span slot="label">发布</span>
      </tabbar-item>
      <tabbar-item class="tab_left" @on-item-click="save('drafts')" >
        <span slot="label">保存草稿</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <alert v-model="alertPamars.alertShow" :title="alertPamars.alertTitle"> {{alertPamars.alertContent}}</alert>
    </div>
  </div>
</template>
<script>
import http from 'axios';
import qs from 'qs';
import LcSelector from '@/components/selectors/index';
import {formatDate} from '@/libs/date.js';
import {webapiUrl} from '@/config/base';
import {XHeader,Radio,Group,Tabbar,TabbarItem,XInput,Datetime,XTextarea,Alert,TransferDom,XButton,Selector,/*Loading */ } from 'vux';
import Loading from '@/components/cells/Loading';
export default {
  data() {
    return{
      options:[{
        key: 'notices',
        value: '普通公告'
      }, {
        key: 'important',
        value: '重要公告'
      }],
      isPublic:[{
        key: 'yes',
        value: '是'
      }, {
        key: 'no',
        value: '否'
      }],
      type:[],
      newsPO:{
        id:'',
        publicItem:'notices',
        typeId:'',
        type:'',
        title:'',
        userId:'',
        userName:'',
        isPublic:'yes',
        depId:'',
        depName:'',
        author:'',
        key:'',
        publicDate:'',
        loseDate:'',
        fileAttach:'',
        content:'',
        status:'',
        picture:'',
        editorValue:'',
        account: localStorage.getItem("account")
      },
      saveUrl:webapiUrl+'/webapi/newsService/saveNews',
      newsUrl:webapiUrl+"/webapi/newsService/getNews",
      getTypeUrl:webapiUrl+"/webapi/typeService/getTypes",
      alertPamars: {
        alertShow: false,
        alertContent: '',
        alertTitle: '温馨提示'
      },
      returnUrlName:this.$route.name,
      show1: true,
      text1: '玩命加载中'
    }
  },
  computed:{
    title(){
      return this.$route.name=='editNews' ? '编辑公告' :'新建公告'
    }
  },
  mounted(){
    this.getType();//获取弹框信息
//    console.log(this.$route);
//    选择器
    if(this.$route.params.props){
      this.newsPO = this.$route.params.props.form;//初始化表单
      if(this.$route.params.props.type=='org'){
        this.newsPO.depId=this.$route.params.value;
        this.newsPO.depName=this.$route.params.valueText;
      }else if(this.$route.params.props.type=='user'){
        this.newsPO.userId=this.$route.params.value;
        this.newsPO.userName=this.$route.params.valueText;
      }

    }else{
      if(this.$route.name=='editNews'){
        this.getDetail();//判断是编辑页面就返回初始页面
      }
    }
  },
  methods: {
    getType(){
      let that = this;
      http.post(this.getTypeUrl, qs.stringify({catKey:'NOTICE_TYPE',account:this.newsPO.account}), {
        responseType: 'json'
      }).then(function(response){
        let list=response.data.data;
        for (var i = 0; i < list.length; i++) {
          var temp={key:'',value:''};
          temp.key=list[i].id;
          temp.value=list[i].name;
          that.type.push(temp);
        }

        that.show1 = false;

      }).catch(function(error){
        console.log(error);
      });
    },
    save(status){
      let that = this;
      if (!that.newsPO.title) {
        return;
      }
      if (that.newsPO.publicDate==undefined||that.newsPO.publicDate.length==0) {
        that.newsPO.publicDate = that.getToday();
      }
      if (that.newsPO.loseDate==undefined||that.newsPO.loseDate.length==0) {
        that.newsPO.loseDate = that.getNextYearToday();
      }
      // console.log(JSON.stringify(this.newsPO));
      that.newsPO.status = status;
      http.post(that.saveUrl, 'newsJson='+JSON.stringify(this.newsPO), {
        responseType: 'json'
      }).then(function(response) {
        if(response.data.result==1){
          that.alertPamars.alertContent = '保存公告信息成功';
          that.alertPamars.alertShow = true;
          setTimeout(() => {
            that.alertPamars.alertShow = false;
            // localStorage.removeItem('waitingHandleTaskData');
            that.$router.push({
              name: 'newsList'
            });
          }, 2000);
        }else{
          console.log(response);
          that.alertPamars.alertContent = '保存公告信息失败';
          that.alertPamars.alertShow = true;
        }
      }).catch(function(error) {
        console.log(error);
        that.alertPamars.alertContent = '保存公告信息失败';
        that.alertPamars.alertShow = true;
      });
    },
    getDetail(){
      let that = this;
      let params = this.$route.params;
      http.get(that.newsUrl+"?"+qs.stringify(params), {
              responseType: 'json'
            })
      .then(function(response) {
        let po = response.data.data;
        po.publicDate = that.format(po.publicDate);
        po.loseDate = that.format(po.loseDate);
        that.newsPO = po;
        console.log(po);
      })
      .catch(function(error) {
        console.log("detail's error:" + error);
        console.log("requesti's parameter: " + params);
      });
    },
    format(time) {
      if(time){
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd");
        }
    },
    getToday(){
      var date = new Date();
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      return currentdate;
    },
    getNextYearToday(){
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear() + 1;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
  },
  directives: {
    TransferDom
  },
  components:{
    XHeader,Radio,Group,Tabbar,TabbarItem,XInput,Datetime,XTextarea,Alert,XButton,LcSelector,Selector,Loading
  }
}
</script>

<style></style>
