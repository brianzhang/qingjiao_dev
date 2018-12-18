<template>
  <div>
    <div class="header">已选</div>

    <group>
      <cell v-for="item in selectedList" :key="item.id" :value="item.name" value-align="left"></cell>
    </group>

    <tabbar class="tabbar_box">
      <tabbar-item @on-item-click="submit()">
        <span slot="label">确定</span>
      </tabbar-item>
      <tabbar-item class="tab_left" @on-item-click="cancel()">
        <span slot="label">取消</span>
      </tabbar-item>
    </tabbar>
  </div>

</template>

<script>
import {
  Group,
  Cell,
  Tabbar,
  TabbarItem
} from 'vux';
export default {
  data() {
    return {
      selectedList: '',
      index: '',
      isSingle: '',
      navigate: '',
      parentId: '',
      isReturn: true,
      selectorType: '',
      taskData: '',
      selected:'',
    }
  },
  computed:{
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
    this.selectedList = this.$route.params.seletedList;
    this.index = this.$route.params.index;
    this.isSingle = this.$route.params.isSingle;
    var task = localStorage.getItem('waitingHandleTaskData');
    this.taskData = task ? JSON.parse(task) : {};
  },
  methods: {
    submit: function() {

      this.$router.push({
        name: this.$route.params.props.returnUrlName,
        params:{
          'props': this.$route.params.props,
          'value':this.getSelectorId,
          'valueText':this.getSelectorName,
          'selected':this.$route.params.selected
        }
      })
    },
    cancel: function() {
      this.navigate = this.$route.params.navigate;
      this.parentId = this.$route.params.parentId;
      this.selectorType = this.$route.params.selectorType;
      if (this.selectorType == "org" || this.selectorType == "position") {
        this.$router.push({
          name: 'orgSelector',
          params: {
            "props": this.$route.params.props,
            "isSingle": this.isSingle,
            "index": this.index,
            "defaltSelect": this.selectedList,
            "navigate": this.navigate,
            "parentId": this.parentId,
            "isReturn": true,
            "selectorType": this.selectorType
          }
        });

      } else if (this.selectorType == "role") {
        this.$router.push({
          name: 'roleSelector',
          params: {
            "props": this.$route.params.props,
            "isSingle": this.isSingle,
            "index": this.index,
            "defaltSelect": this.selectedList,
            "navigate": this.navigate,
            "parentId": this.parentId,
            "isReturn": true,
            "selectorType": this.selectorType
          }
        });
      } else if(this.selectorType == "user"){
        this.$router.push({
          name: 'userSelector',
          params: {
            "props": this.$route.params.props,
            "isSingle": this.isSingle,
            "index": this.index,
            "defaltSelect": this.selectedList,
            "navigate": this.navigate,
            "parentId": this.parentId,
            "isReturn": true,
            "selectorType": this.selectorType,
            "type": this.$route.params.type
          }
        });
      }else if(this.selectorType == "dictionary"){
        this.$router.push({
          name: 'dictionaryTarget',
          params: {
            "props": this.$route.params.props,
            "isSingle": this.isSingle,
            "index": this.index,
            "defaltSelect": this.selectedList,
            "navigate": this.navigate,
            "parentId": this.parentId,
            "isReturn": true,
            "selectorType": this.selectorType,
            "type": this.$route.params.type,
            "selected":this.selected
          }
        });
      }
    }
  },
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem
  }
}
</script>
