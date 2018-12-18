<template>
  <!--<router-view>-->
    <div>

      <x-header>{{title}}
        <span slot="overwrite-left"></span>
      </x-header>
      <grid :rows="1">

        <grid-item label="待办事宜" @on-item-click="onItemClick" :link="{name:'waitingHandleList'}">
          <img slot="icon" src="../assets/icon_nav_picker.png"/>
        </grid-item>

        <!-- <grid-item label="已办事宜" @on-item-click="onItemClick" link="myCompleted">
          <img slot="icon" src="../assets/icon_nav_select.png"/>
        </grid-item>
        <grid-item label="办结事宜" @on-item-click="onItemClick" link="myHandled">
          <img slot="icon" src="../assets/icon_nav_city.png"/>
        </grid-item>
        <grid-item label="我的请求" @on-item-click="onItemClick">
          <img slot="icon" src="../assets/icon_nav_article.png"/>
        </grid-item>
        <grid-item label="我的草稿" @on-item-click="onItemClick">
          <img slot="icon" src="../assets/icon_nav_actionSheet.png"/>
        </grid-item>
        <grid-item label="新建流程" @on-item-click="onItemClick">
          <img slot="icon" src="../assets/icon_nav_dialog.png"/>
        </grid-item> -->
      </grid>

    </div>

  <!--</router-view>-->
</template>

<style>
  a {
    text-decoration: none;
  }
</style>

<script>
  import { XHeader,Grid,GridItem,Icon } from 'vux'
  import Router from 'vue-router'
  export default{
    components: {
      XHeader,
      Grid,
      GridItem,
      Icon,
      Router
    },
    data () {
      return {
        title: "流程中心",
        dataList: [
          {
            label: "待办事宜",
            img: "./assets/icon_nav_picker.png"
          }
        ]
      }
    },
    methods: {
      onItemClick () {
        //console.log('Main : on item click')
      }
    }
  }
</script>
