<template>
<div>
  <div class="header">操作人</div>
  <div>
    <selector placeholder="请选择类型" v-model="type"  :options="types" @on-change="changeType"></selector>
  </div>
  <div class="allSort">
    <div class="sortMenu clearfix" style="background-color: #D9EDF7">
      <ul class="sortMenu-ul">
        <li class="cell" v-for="(item,index) in navigate">
          <span @click="fetch(item)">{{item.name}}</span><span class="lc-icon" v-if="index+1<navLength">></span>
        </li>
      </ul>
    </div>
  </div>
  <div class="weui-cells weui-cells_checkbox" v-if="listData.length>0">
    <div v-for="(item,index) in listData" class="checkbox-list">
      <label class="weui-cell lc-list-cell" @click="load(item)">
        <img src="../../assets/organization.png" alt="">&nbsp;&nbsp;&nbsp;
        {{item.name}}
      </label>
    </div>
  </div>
  <div class="weui-cells weui-cells_checkbox ">
    <div v-for="(item,index) in userData" class="checkbox-list">
      <label class="weui-cell lc-list-cell">
        <input type="radio" :value="item.id" name="radio" class="mgr-success mgr-lg" checked @click="radioSelect(item)" :key="item.id" v-if="isSingle&&item.defaultSelected"/>
        <input type="radio" :value="item.id" name="radio" class="mgr-success mgr-lg" @click="radioSelect(item)" :key="item.id" v-if="isSingle&&!item.defaultSelected" />
        <input type="checkbox" :value="item.id" name="checkbox" class="mgc-success mgc-lg" checked @click="checkboxSelect(item,index)" :key="item.id" v-if="!isSingle&&item.defaultSelected" />
        <input type="checkbox" :value="item.id" name="checkbox" class="mgc-success mgc-lg" @click="checkboxSelect(item,index)" :key="item.id" v-if="!isSingle&&!item.defaultSelected" />
        &nbsp;&nbsp;{{item.fullname}}
      </label>
    </div>

  </div>

  <tabbar class="tabbar_box">
    <tabbar-item @on-item-click="submit()">
      <span slot="label">确定</span>
    </tabbar-item>
    <tabbar-item class="tab_left" @on-item-click="view">
      <span slot="label">查看已选</span>
    </tabbar-item>
    <tabbar-item class="tab_left" @on-item-click="cancel()">
      <span slot="label">取消</span>
    </tabbar-item>
  </tabbar>
</div>
</template>

<script>
import http from 'axios';
import qs from 'qs';
import {
  Selector,
  Tabbar,
  TabbarItem
} from 'vux';
import {
  webapiUrl
} from '@/config/base';
export default {
  data() {
    return {
      types:[
        {
          key:"org",
          value:"机构"
        },
        {
          key:"position",
          value:"岗位"
        },
        {
          key:"role",
          value:"角色"
        }
      ],
      taskData: '',
      isSingle: '',
      optionIndex: '',
      navigate: [{
        name: '用户选择器',
        url: '',
        id: "0"
      }],
      listData: [],
      userData: [],
      params: {
        parentId: '0',
        account: localStorage.getItem("account")
      },
      selectorValue: [],
      defaltSelect: [],
      selectorType: 'user',//选择器的类型
      type: "org",//选择器的维度类型
      url: '',
      roleUrl: webapiUrl+'/webapi/roleService/findBySubSysId',
      userUrl: webapiUrl+'/webapi/userService/findByPartyAndType'
    }
  },
  computed: {
    navLength: function() {
      return this.navigate.length;
    }
  },
  mounted() {
    if(this.$route.params.type&&this.$route.params.type!=this.type){
      this.type = this.$route.params.type;
    }
    this.changeUrl(this);
    this.isSingle = this.$route.params.isSingle;
    this.optionIndex = this.$route.params.index;
    var task = localStorage.getItem('waitingHandleTaskData');
    this.taskData = task ? JSON.parse(task) : {};
    if (this.$route.params.isReturn) {
      this.defaltSelect = this.$route.params.defaltSelect;
      this.navigate = this.$route.params.navigate;
      this.params.parentId = this.$route.params.parentId;
      // this.userData = this.$route.params.userData;
    } else {
      var value = this.taskData.detail[this.optionIndex].inputValue;
      this.defaltSelect = value ? JSON.parse(value) : [];
    }
    // this.load();
  },
  methods: {
    load: function(obj) {
      let that = this;
      var url = this.url + "?" + qs.stringify(that.params);
      if (obj) {
        that.params.parentId = obj.id;
        url = this.url + "?" + qs.stringify(that.params);
        if(that.type=='role'){
          url = that.roleUrl + "?" +qs.stringify({subSysId:obj.id,account:that.params.account});
        }
      }
      http.get(url).then(function(response) {
        that.listData = response.data.data;
        if (obj) {
          obj.url = url;
          that.navigate.push(obj);
          if((that.type=="position"||that.type=="role")&&obj.id.length<2){
            that.userData = '';
          }else{
            that.findPerson(obj.id,that);
          }
        }else{
          if((that.type=="position"||that.type=="role")&&that.params.parentId.length<2){
            that.userData = '';
          }else{
            that.findPerson(that.params.parentId,that);
          }
        }
      }).catch(function(error) {
        console.log(error);
      })
    },
    fetch: function(obj) {
      let that = this;
      if (obj && obj.url) {

      } else {
        return;
      }
      http.get(obj.url).then(function(response) {
        that.listData = response.data.data;
        that.reLoadNavigate(obj, that);
        if((that.type=="position"||that.type=="role")&&obj.id.length<2){
          that.userData = '';
        }else{
          that.findPerson(obj.id,that);
        }
      }).catch(function(error) {
        console.log(error);
      })

    },
    findPerson:function(parentId,that){
      if(!parentId){
        parentId = "0";
      }
      var parameter = {partyType:that.type,partyId:parentId,account:that.params.account};
      http.get(
        that.userUrl + "?" + qs.stringify(parameter)
      ).then(function(response) {
        // console.log(response.data);
        that.userData = response.data.data;
        that.isSelect(that.userData,that.defaltSelect);
      }).catch(function(error) {
        that.userData = [];
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
        'name': obj.fullname
      };
      var s = [];
      s.push(selected);
      this.defaltSelect = s;
    },
    checkboxSelect: function(obj, index) {
      var selected = {
        'id': obj.id,
        'name': obj.fullname
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
        this.userData[index].defaultSelected = false;
      } else {
        this.defaltSelect.push(selected);
        this.userData[index].defaultSelected = true;
      }

    },
    cancel: function() {
      this.$router.push({
        name: "waitingHandleDetail"
      })
    },
    submit: function() {
      this.taskData.detail[this.optionIndex].inputValue = JSON.stringify(this.defaltSelect);
      localStorage.setItem('waitingHandleTaskData', JSON.stringify(this.taskData));
      this.$router.push({
        name: "waitingHandleDetail"
      })
    },
    view: function() {
      this.$router.push({
        name: 'selectorView',
        params: {
          "index": this.optionIndex,
          "isSingle": this.isSingle,
          "seletedList": this.defaltSelect,
          "navigate": this.navigate,
          "parentId": this.params.parentId,
          "selectorType": this.selectorType,
          "type": this.type
        }
      });
    },
    isSelect: function(source,target) {
      for (var i = 0; i < source.length; i++) {
        for (var j = 0; j < target.length; j++) {
          if (source[i].id == target[j].id) {
            source[i].defaultSelected = true;
            break;
          } else {
            source[i].defaultSelected = false;
          }
        }
      }
    },
    changeType: function(type){
        this.type = type;
        if(this.$route.params.isReturn){
          this.$route.params.isReturn = false;
        }else{
          this.params.parentId = "0";
          this.navigate = this.navigate.slice(0,1);
        }
        this.changeUrl(this);
        this.load();
    },
    changeUrl: function(that){
      switch (that.type) {
        case 'org':
          that.url = webapiUrl + "/webapi/orgService/findByParentId";
          that.navigate[0].url = webapiUrl + "/webapi/orgService/findByParentId?parentId=0&account="+that.params.account;
          break;
        case 'position':
          that.url = webapiUrl + "/webapi/positionService/findByParentId";
          that.navigate[0].url = webapiUrl + "/webapi/positionService/findByParentId?parentId=0&account="+that.params.account;
          break;
        case 'role':
          that.url = webapiUrl + "/webapi/subSysService/getAllSubSys";
          that.navigate[0].url = webapiUrl + "/webapi/subSysService/getAllSubSys&account="+that.params.account;
          break;
      }
    }
  },
  components: {
    Selector,
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
  text-align: center;
  height: 50px;
  line-height: 50px;
  text-align: center;
  /*position: relative;*/
  text-overflow: ellipsis;
  word-break: keep-all;
}

</style>
