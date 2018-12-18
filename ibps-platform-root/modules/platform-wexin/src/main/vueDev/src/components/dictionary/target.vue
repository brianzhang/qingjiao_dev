<template>
  <div>
    <loading :shows="show1" :text="text1"></loading>
    <div class="header">数据字典</div>
    <div class="allSort">
      <div class="sortMenu clearfix" style="background-color: #D9EDF7">
        <ul class="sortMenu-ul">
          <li class="cell" v-for="(item,index) in navigate"><!--@click="fetch(item)"--><!--v-if="index+1<navLength"-->
            <span @click="doNavigate(item,index)">{{item.name}}</span><span class="lc-icon" v-if="index+1<navLength">></span>
          </li>
        </ul>
      </div>
    </div>
    <!--数据字典页数据渲染-->
    <div class="weui-cells weui-cells_checkbox" v-if="struType==1&&isleef=='Y'">
      <div v-for="(item,index) in dicdata" class="checkbox-list">
        <label class="weui-cell lc-list-cell" @click="dictionaryData[item.id] && isClick(item)">
          <img src="../../assets/organization.png" alt="" v-if="dictionaryData[item.id]">&nbsp;&nbsp;&nbsp;<!--selected[navigate[1].id]-->
          <input type="radio" :value="item" name="radio" class="mgr-success mgr-lg" v-model="selected[item]" v-if="!dictionaryData[item.id]" />&nbsp;&nbsp;
          {{item.name}}
        </label>
      </div>
    </div>
    <tabbar class="tabbar_box">
      <tabbar-item @on-item-click="submit()">
        <span slot="label">确定</span>
      </tabbar-item>
      <tabbar-item @on-item-click="view()" class="tab_left">
        <span slot="label">查看已选项</span>
      </tabbar-item>
      <tabbar-item @on-item-click="cancel()" class="tab_left">
        <span slot="label">取消</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import http from 'axios';
  import qs from 'qs';
  import Loading from '@/components/cells/Loading';
  import {
    Tabbar,
    TabbarItem
  } from 'vux';
  import {
    webapiUrl
  } from '@/config/base';
  export default {
    components: {
      Tabbar,
      TabbarItem,
      Loading,
    },
    data() {
      return {
        dictionaryData:{},//数据字典列表值
        dicdata:{},
        struType:'',
        isleef:'',
        // selected:this.$route.params.props.value || {},
        selected: (this.$route.params.props &&Object.assign( this.$route.params.props.value ||{})),
        // selectedList:[],
        navigate: [{
          name: '数据字典选择器',
          id: "0"
        }],
        optionIndex: '',
        selectorValue: [],
        defaltSelect: [],
        targetData: [],
        params: {
          parentId: '',
          account:localStorage.getItem("account")
        },
        dicByTypeUrl: webapiUrl + "/webapi/dictionaryService/getDicByType",
        dicInfoUrl:webapiUrl +"/webapi/dictionaryService/getDicInfo",
        show1: true,
        text1:'加载中',
      }
    },
    computed: {
      navLength: function() {
        return this.navigate.length;
      },
      selectedList:function(){
        return Object.values(this.selected)
      },
      getSelectorId:function(){
        var ids = '';
        for(var i = 0; i < this.selectedList.length; i++){
          if(ids.length>0){
            ids += ",";
          }
          ids += this.selectedList[i].id;
        }
        return ids;
      },
      getSelectorName:function(){
        var ids = '';
        for(var i = 0; i < this.selectedList.length; i++){
          if(ids.length>0){
            ids += ",";
          }
          ids += this.selectedList[i].name;
        }
        return ids;
      }
    },
    mounted() {
      let data=this.$route.params.props.obj;
      this.load(data.field_options);
    },
    methods: {
      load:function(obj){
        let that=this;
        Promise.all([
          http.get(that.dicByTypeUrl+'?'+ qs.stringify({type:obj.dictionary}),{
            responseType:'json'
          }),
          http.get(that.dicInfoUrl+'?'+ qs.stringify({typeKey:obj.dictionary}),{
            responseType:'json'
          })
        ]).then(function (response) {
          that.show1=false;
          if(response[1].data.data)
            that.struType=response[1].data.data.struType;//数据字典类型 0平铺 1树形
            that.isleef=response[1].data.data.isLeaf;
          if(response[0].data.data.length>0){
            that.initTreeData(response[0].data.data);//数据字典数据处理
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      initTreeData(data){
        let dicData={};
        for(let i = 0; i < data.length; i++){
          let item=data[i];
           if(item.parentId==item.typeId){
             if(!dicData['first']) dicData['first']=[];
             dicData['first'].push(item);
           }else{
             if(!dicData[item.parentId]) dicData[item.parentId]=[];
             dicData[item.parentId].push(item);
           }
        }
        let _that=this;
        _that.dictionaryData=dicData;
        _that.dicdata=_that.dictionaryData.first;
      },
      isClick(item){
        let that=this;
        that.dicdata=that.dictionaryData[item.id];
        this.navigate.push(item)
      },
      doNavigate(item,index){
       let that=this;
       let length=that.navigate.length;
        that.navigate.splice(index+1,length-1);
        if(item.id==0){
          that.dicdata=that.dictionaryData.first;
        }else{
          that.dicdata=that.dictionaryData[item.id];
        }
      },
      cancel: function() {/*Object.assign(this.$route.params.props.value || {}*/
        this.selected=(this.$route.params.props &&Object.assign( this.$route.params.props.value|| {}) );
        this.$router.push({
          name: 'waitingHandleDetail',
          params:{
            props:this.$route.params.props,
            value:this.getSelectorId,
            valueText:this.getSelectorName,
          }
        })
      },
      submit: function() {
        this.$router.push({
          name: "waitingHandleDetail",
          params:{
            props:this.$route.params.props,
            value:this.getSelectorId,
            valueText:this.getSelectorName,
            selected:this.selected
          }
        })
      },
      view: function() {
        this.$router.push({
                name: 'viewSelector',
                params: {
                  "props":this.$route.params.props,
                  "seletedList": this.selectedList,//已选的值--数组
                  "parentId": this.params.parentId,
                  "selectorType":'dictionary',
                  "navigate": this.navigate,
                  "selected":this.selected
                }
              });
          }//查看已选项目
    },

  }
</script>

<style>
  @import '~magic-input/dist/magic-input.min.css';

</style>
