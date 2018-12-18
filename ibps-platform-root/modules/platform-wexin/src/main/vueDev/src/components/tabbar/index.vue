<template>
  <div>
    <tabbar>
      <!-- @on-item-click="onItemClick(tabbar.pathName)" -->
      <tabbar-item  :link="{name:'waitingHandleList'}" >
        <span slot="label">待办事项</span>
      </tabbar-item>
      <tabbar-item  :link="{name:'completedlist'}" >
        <span slot="label">已办事项</span>
      </tabbar-item>


    </tabbar>
  </div>
</template>

<script>
import {
  Tabbar, TabbarItem
} from 'vux';
import Router from 'vue-router';
export default {
  data(){
    return {
      path:'',
      routerParams:'',
      // isSelect:false,
      tabbarList:[
        {
          pathName:'waitingHandleList',
          src:'../../assets/icon_nav_picker.png',
          tabbarName:'待办事项'
        },
        {
          pathName:'completedlist',
          src:'../../assets/icon_nav_select.png',
          tabbarName:'已办事项'
        }
      ]
    }
  },
  methods: {
    onItemClick(pathName){
      localStorage.clear();
      this.$router.push({
        name: pathName
      });
    },
    isSelect(pathName){
      let index = this.find(this.path,"/",1);
      return pathName.indexOf(this.path.substring(1,index))<0?false:true;
    },
    find(str,cha,num){
      var x=str.indexOf(cha);
      for(var i=0;i<num;i++){
          x=str.indexOf(cha,x+1);
      }
      return x;
    }
  },
  mounted(){
    this.path = this.$router.currentRoute.path;
  },
  computed:{

  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
