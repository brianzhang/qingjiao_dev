<template>
<div>
  <div class="header">{{title}}</div>
  <div class="allSort" style="margin-top: .1rem">
    <div class="sortMenu clearfix" style="background-color: #D9EDF7">
      <ul class="sortMenu-ul">
        <li class="cell" v-for="(item,index) in navigate">
          <span @click="fetch(item)">{{item.name}}</span><span class="lc-icon" v-if="index+1<navLength">></span>
        </li>
      </ul>
    </div>
  </div>

  <div class="weui-cells weui-cells_checkbox ">
    <div v-for="(item,index) in listData" class="checkbox-list">
      <label class="weui-cell lc-list-cell">
        <input type="radio" :value="item.id" name="radio" class="mgr-success mgr-lg" checked @click="radioSelect(item)" :key="item.id" v-if="(isSingle=='true')&&(item.defaultSelected)" />
        <input type="radio" :value="item.id" name="radio" class="mgr-success mgr-lg" @click="radioSelect(item)" :key="item.id" v-if="(isSingle=='true')&&!(item.defaultSelected)" />
        <input type="checkbox" :value="item.id" name="checkbox" class="mgc-success mgc-lg" checked @click="checkboxSelect(item,index)" :key="item.id" v-if="(isSingle=='false')&&(item.defaultSelected)" />
        <input type="checkbox" :value="item.id" name="checkbox" class="mgc-success mgc-lg" @click="checkboxSelect(item,index)" :key="item.id" v-if="(isSingle=='false')&&!(item.defaultSelected)" />
        <div @click="load(item)">&nbsp;&nbsp;{{item.name}}</div>
      </label>
    </div>
  </div>
  <tabbar class="tabbar_box">
    <tabbar-item @on-item-click="submit()">
      <span slot="label">确定</span>
    </tabbar-item>
    <tabbar-item @on-item-click="view" class="tab_left">
      <span slot="label">查看已选</span>
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
import {
  Tabbar,
  TabbarItem
} from 'vux';
import {
  webapiUrl
} from '@/config/base';
export default {
  data() {
    return {
      title: '',
      taskData: '',
      isSingle: true,
      optionIndex: '',
      navigate: [{
        name: '组织选择器',
        id: '0'
      }],
      listData: [],
      params: {
        parentId: '0',
        account:localStorage.getItem('account')
      },
      selectorValue: [],
      defaltSelect: [],
      selectorType: '',
      url: ''
    }
  },
  computed: {
    navLength: function() {
      return this.navigate.length;
      console.log(this.navigate.length);
    },
    getSelectorId:function(){
    	var ids = '';
    	for(var i = 0; i < this.defaltSelect.length; i++){
        if(ids.length>0){
          ids += ",";
        }
    		ids += this.defaltSelect[i].id;
    	}
    	return ids;
    },
    getSelectorName:function(){
    	var ids = '';
    	for(var i = 0; i < this.defaltSelect.length; i++){
        if(ids.length>0){
          ids += ",";
        }
    		ids += this.defaltSelect[i].name;
    	}
    	return ids;
    }
  },
  mounted() {
   /* console.log(this.$route.params);*/
    // console.log((this.$route.params.props.isSingle));
    this.selectorType = this.$route.params.props.type;
    switch (this.selectorType) {
      case 'org':
        this.url = webapiUrl + "/webapi/orgService/findByParentId";
        this.navigate[0].name = "组织选择器";
        this.title = '组织';
        break;
      case 'position':
        this.url = webapiUrl + "/webapi/positionService/findByParentId";
        this.navigate[0].name = "岗位选择器";
        this.title = '岗位';
        break;

    }
    this.isSingle = this.$route.params.props.isSingle;
    if (this.$route.params.isReturn) {
      this.defaltSelect = this.$route.params.defaltSelect;
      this.navigate = this.$route.params.navigate;
      this.params.parentId = this.$route.params.parentId;
    } else {
      var value = this.$route.params.props.value;
      if(value){
        this.defaltSelect = this.concatValue(this.$route.params.props.value,this.$route.params.props.valueText);
        console.log(this.defaltSelect);
      }
    }
    this.load();
  },
  methods: {
    load: function(obj) {
      let that = this;
      if (obj) {
        that.params.parentId = obj.id;
      }
      http.get(
        that.url + "?" + qs.stringify(that.params)
      ).then(function(response) {
        if (response.data.data.length > 0) {
          that.listData = response.data.data;
          that.isSelect(that);
          if (obj) {
            that.navigate.push(obj);
          }
        }
      }).catch(function(error) {
        console.log(error);
      })
    },
    fetch: function(obj) {
        let that = this;
        if (obj && obj.id) {
          that.params.parentId = obj.id;
        } else {
          return;
        }
        http.get(
          this.url + "?" + qs.stringify(that.params)
        ).then(function(response) {
          that.listData = response.data.data;
          that.isSelect(that);
          that.reLoadNavigate(obj, that);
        }).catch(function(error) {
          console.log(error);
        })

    },
    reLoadNavigate: function(obj, that) {
      let nav = that.navigate;
      for (var i = 0; i < nav.length; i++) {
        if (nav[i] && nav[i].id == obj.id) {
          that.navigate = nav.slice(0, i + 1)
        }
      }
    },
    radioSelect: function(obj) {
      var selected = {
        'id': obj.id,
        'name': obj.name
      };
      var s = [];
      s.push(selected);
      this.defaltSelect = s;
    },
    checkboxSelect: function(obj, index) {
      var selected = {
        'id': obj.id,
        'name': obj.name
      };
      if (obj.defaultSelected) {
        for (var i = 0; i < this.defaltSelect.length; i++) {
          if (this.defaltSelect[i].id == selected.id) {
            continue;
          }
          this.selectorValue.push(this.defaltSelect[i]);
        }
        this.defaltSelect = this.selectorValue;
        this.selectorValue = [];
        this.listData[index].defaultSelected = false;
      } else {
        this.defaltSelect.push(selected);
        this.listData[index].defaultSelected = true;
      }
    },
    cancel: function() {
      this.$router.push({
        name: this.$route.params.props.returnUrlName
      })
    },
    submit: function() {
      this.$router.push({
        name: this.$route.params.props.returnUrlName,
        params:{
          props:this.$route.params.props,
          value:this.getSelectorId,
          valueText:this.getSelectorName
        }
      })
    },
    view: function() {
      this.$router.push({
        name: 'viewSelector',
        params: {
          'props':this.$route.params.props,
          "index": this.optionIndex,
          "isSingle": this.isSingle,
          "seletedList": this.defaltSelect,
          "navigate": this.navigate,
          "parentId": this.params.parentId,
          "selectorType": this.selectorType
        }
      });
    },
    isSelect:function(that) {
      for (var i = 0; i < that.listData.length; i++) {
        for (var j = 0; j < that.defaltSelect.length; j++) {
          if (that.listData[i].id == that.defaltSelect[j].id){
            that.listData[i].defaultSelected = true;
            break;
          } else {
            that.listData[i].defaultSelected = false;
          }
        }
      }
    },
    concatValue: function(value,text){
      let temp = [];
      let valueArr = value.split(",");
      let textArr = text.split(",");
      for (var i = 0; i < valueArr.length; i++){
        temp.push({id:valueArr[i],name:textArr[i]});
      }
      return temp;
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style>
@import '~magic-input/dist/magic-input.min.css';

.sortMenu {
  width: 100%;
  background-color: #fff;
  overflow-x: scroll;
  -webkit-overflow-x: scroll;
}

.lc-icon {
  font-size: 20px;
  margin: 0 0.5em;
}

.sortMenu::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #fff;
}

.sortMenu-ul {
  min-width: 500px;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  padding-right: 10px;
}

.sortMenu .cell {
  display: inline-block;
}

.sortMenu .cell span {
  font-size: 20px;
  /*font-weight: 600;*/
  text-align: center;
  height: 50px;
  line-height: 50px;
  text-align: center;
  /*position: relative;*/
  text-overflow: ellipsis;
  word-break: keep-all;
}

</style>
