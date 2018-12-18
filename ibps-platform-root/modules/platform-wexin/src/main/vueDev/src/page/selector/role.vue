<template>
<div>
  <div class="allSort">
    <div class="sortMenu clearfix">
      <ul class="sortMenu-ul">
        <li class="cell" v-for="(item,index) in navigate">
          <div v-if="index==0">
            <span @click="load()">{{item.name}}</span><span class="lc-icon" v-if="index+1<navLength">></span>
          </div>
          <div v-if="index > 0">
            <span>{{item.name}}</span><span class="lc-icon" v-if="index+1<navLength">></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="weui-cells weui-cells_checkbox " v-if="subSysData.length>0">
    <div v-for="(item,index) in subSysData" class="checkbox-list">
      <div class="weui-cell lc-list-cell">
        <div @click="fetch(item)">{{item.name}}</div>
      </div>
    </div>
  </div>
  <div class="weui-cells weui-cells_checkbox ">
    <div v-for="(item,index) in listData" class="checkbox-list">
      <div class="weui-cell lc-list-cell">
        <input type="radio" :value="item.id" name="radio" class="mgr-success mgr-lg" checked @click="radioSelect(item)" :key="item.id" v-if="(isSingle)&&(item.defaultSelected)" />
        <input type="radio" :value="item.id" name="radio" class="mgr-success mgr-lg" @click="radioSelect(item)" :key="item.id" v-if="(isSingle)&&!(item.defaultSelected)" />
        <input type="checkbox" :value="item.id" name="checkbox" class="mgc-success mgc-lg" checked @click="checkboxSelect(item,index)" :key="item.id" v-if="!(isSingle)&&(item.defaultSelected)" />
        <input type="checkbox" :value="item.id" name="checkbox" class="mgc-success mgc-lg" @click="checkboxSelect(item,index)" :key="item.id" v-if="!(isSingle)&&!(item.defaultSelected)" />
        <div>{{item.name}}</div>
      </div>
    </div>

  </div>

  <tabbar>
    <tabbar-item @on-item-click="submit()">
      <span slot="label">确定</span>
    </tabbar-item>
    <tabbar-item @on-item-click="view">
      <span slot="label">查看已选</span>
    </tabbar-item>
    <tabbar-item @on-item-click="cancel()">
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
      taskData: '',
      isSingle: '',
      optionIndex: '',
      navigate: [{
        name: '角色选择器',
        id: '0'
      }],
      subSysData: [],
      listData: [],
      params: {
        subSysId: ''
      },
      selectorValue: [],
      defaltSelect: [],
      selectorType: '',
      subSysUrl: '',
      findRoleUrl: ''
    }
  },
  computed: {
    navLength: function() {
      return this.navigate.length;
    }
  },
  mounted() {
    console.log(this.$route.params);
    this.selectorType = this.$route.params.selectorType;
    switch (this.selectorType) {
      case 'role':
        this.subSysUrl = webapiUrl + "/webapi/subSysService/getAllSubSys";
        this.findRoleUrl = webapiUrl + "/webapi/roleService/findBySubSysId";
        break;

    }
    this.isSingle = this.$route.params.isSingle;
    this.optionIndex = this.$route.params.index;
    var task = localStorage.getItem('waitingHandleTaskData');
    this.taskData = task ? JSON.parse(task) : {};
    if (this.$route.params.isReturn) {
      this.defaltSelect = this.$route.params.defaltSelect;
      this.navigate = this.$route.params.navigate;
      this.params.subSysId = this.$route.params.parentId;
    } else {
      var value = this.taskData.detail[this.optionIndex].inputValue;
      this.defaltSelect = value ? JSON.parse(value) : [];
    }
    if (this.params.subSysId) {
      this.fetch({
        id: this.params.subSysId
      });
    } else {
      this.load();
    }

  },
  methods: {
    load: function(obj) {
      let that = this;
      http.get(
        this.subSysUrl
      ).then(function(response) {
        if (response.data.data.length > 0) {
          that.subSysData = response.data.data;
          that.listData = [];
          that.navigate.push();
          that.navigate = that.navigate.slice(0, 1);
          that.params.subSysId = '';
        }
      }).catch(function(error) {
        console.log(error);
      })
    },
    fetch: function(obj) {
      let that = this;
      if (obj && obj.id) {
        that.params.subSysId = obj.id;
      } else {
        return;
      }
      http.get(
        this.findRoleUrl + "?" + qs.stringify(that.params)
      ).then(function(response) {

        that.listData = response.data.data;
        that.subSysData = [];
        that.isSelect(that);
        that.navigate.push(obj);
      }).catch(function(error) {
        console.log(error);
      })

    },
    reLoadNavigate: function(obj, that) {
      let nav = that.navigate;
      for (var i = 0; i < nav.length; i++) {
        if (nav[i] && nav[i].id == obj.id) {
          that.navigate = nav.slice(0, i + 1);
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
          "parentId": this.params.subSysId,
          "selectorType": this.selectorType
        }
      });
    },
    isSelect: function(that) {
      for (var i = 0; i < that.listData.length; i++) {
        for (var j = 0; j < that.defaltSelect.length; j++) {
          if (that.listData[i].id == that.defaltSelect[j].id) {
            that.listData[i].defaultSelected = true;
            break;
          } else {
            that.listData[i].defaultSelected = false;
          }
        }
      }
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





/* 分类菜单*/

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
  font-weight: 600;
  text-align: center;
  height: 50px;
  line-height: 50px;
  text-align: center;
  /*position: relative;*/
  text-overflow: ellipsis;
  word-break: keep-all;
}

.sortMenu .cell.special a {
  color: #ff474c;
}

.sortMenu .cell.special:before {
  content: '';
  height: 2px;
  width: 100%;
  background: #ff474c;
  position: absolute;
  bottom: 0;
}
</style>
