<template>
<div>
  <group>
    <cell v-for="item in selectedList" :key="item.id" :value="item.name" value-align="left"></cell>
  </group>
  <tabbar>
    <tabbar-item @on-item-click="submit()">
      <span slot="label">确定</span>
    </tabbar-item>
    <tabbar-item @on-item-click="cancel()">
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
    }
  },
  mounted() {
    // console.log(this.$route.params);
    this.selectedList = this.$route.params.seletedList;
    this.index = this.$route.params.index;
    this.isSingle = this.$route.params.isSingle;
    var task = localStorage.getItem('waitingHandleTaskData');
    this.taskData = task ? JSON.parse(task) : {};
  },
  methods: {
    submit: function() {
      this.taskData.detail[this.index].inputValue = JSON.stringify(this.selectedList);
      localStorage.setItem('waitingHandleTaskData', JSON.stringify(this.taskData));
      this.$router.push({
        name: "waitingHandleDetail"
      })
    },
    cancel: function() {
      this.navigate = this.$route.params.navigate;
      this.parentId = this.$route.params.parentId;
      this.selectorType = this.$route.params.selectorType;
      if (this.selectorType == "org" || this.selectorType == "position") {
        this.$router.push({
          name: 'selectorOrg',
          params: {
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
          name: 'selectorRole',
          params: {
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
          name: 'selectorUser',
          params: {
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
