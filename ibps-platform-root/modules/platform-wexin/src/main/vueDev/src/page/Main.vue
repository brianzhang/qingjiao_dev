<template>
  <div>
    <div class="header">{{title}}</div>
    <div class="process clearfix">
      <div class="process_title">流程</div>
      <ul class="process_bigBox">
        <li class="process_box">
          <grid-item @on-item-click="onItemClick" :link="{name:'waitingHandleList'}">
          <!--<a href="javascript:;">-->
            <img class="icon_circle" src="../assets/icon_nav_picker.png" alt="">
            <span class="icon_desc">待办事宜</span>
          <!--</a>-->
          </grid-item>
        </li>
        <li class="process_box">
          <grid-item @on-item-click="onItemClick" :link="{name:'completedList'}">
          <!--<a href="javascript:;">-->
            <img class="icon_circle" src="../assets/icon_nav_select.png" alt="">
            <span class="icon_desc">办结事宜</span>
          <!--</a>-->
          </grid-item>
        </li>
        <li class="process_box">
          <grid-item @on-item-click="onItemClick" :link="{name:'handledList'}">
          <!--<a href="javascript:;">-->
            <img class="icon_circle" src="../assets/icon_nav_city.png" alt="">
            <span class="icon_desc">已办事宜</span>
          <!--</a>-->
          </grid-item>
        </li>
        <li class="process_box">
          <grid-item @on-item-click="onItemClick" :link="{name:'requestList'}">
          <!--<a href="javascript:;">-->
            <img class="icon_circle" src="../assets/icon_nav_article.png" alt="">
            <span class="icon_desc">我的请求</span>
          <!--</a>-->
          </grid-item>
        </li>
        <li class="process_box">
          <grid-item @on-item-click="onItemClick">
          <!--<a href="javascript:;">-->
            <img class="icon_circle" src="../assets/icon_nav_actionSheet.png" alt="">
            <span class="icon_desc">我的草稿</span>
          <!--</a>-->
          </grid-item>
        </li>
        <li class="process_box">
          <grid-item @on-item-click="onItemClick">
          <!--<a href="javascript:void(0)">-->
            <img class="icon_circle" src="../assets/icon_nav_dialog.png" alt="">
            <span class="icon_desc">新建流程</span>
          <!--</a>-->
          </grid-item>
        </li>
      </ul>
    </div>
    <div class="gap_line clearfix"></div>
    <div class="msg_admin clearfix">
      <div class="msg_admin_title">消息管理</div>
      <ul class="msg_admin_bigBox">
        <li class="msg_admin_box">
          <grid-item @on-item-click="onItemClick" :link="{name:'newsList'}">
          <!--<a href="javascript:void(0)">-->
            <img class="icon_circle" src="../assets/icon_nav_picker.png" alt="">
            <span class="icon_desc">公告列表</span>
          <!--</a>-->
          </grid-item>
        </li>
        <li class="msg_admin_box">
          <grid-item @on-item-click="onItemClick" :link="{name:'newNews'}">
          <!--<a href="javascript:void(0)">-->
            <img class="icon_circle" src="../assets/icon_nav_select.png" alt="">
            <span class="icon_desc">新建公告</span>
          <!--</a>-->
          </grid-item>
        </li>
        <!--<li><a href="javascript:void(0)"><img class="icon_circle" src="../assets/icon_nav_city.png" alt=""><span class="icon_desc">已办事宜</span></a></li>
        <li><a href="javascript:void(0)"><img class="icon_circle" src="../assets/icon_nav_article.png" alt=""><span class="icon_desc">我的请求</span></a></li>
        <li><a href="javascript:void(0)"><img class="icon_circle" src="../assets/icon_nav_actionSheet.png" alt=""><span class="icon_desc">我的草稿</span></a></li>
        <li><a href="javascript:void(0)"><img class="icon_circle" src="../assets/icon_nav_dialog.png" alt=""><span class="icon_desc">新建流程</span></a></li>-->
      </ul>
    </div>
  </div>
</template>
<style>
  /*a {
    text-decoration: none;
  }
  .weui-grid__label span{
    font-size: 16px;
  }*/
  @import '../styles/common.css';
  .process_title,
  .msg_admin_title {
    height: .3rem;
    padding-left: .1rem;
    border-left: 5px solid #1959a5;
    font-size: .16rem;
    margin-top:.05rem;
    color: #666;
    line-height: .3rem;
  }
  .process_bigBox{
    padding: 0;
    list-style-type: none;
    overflow: hidden;
    margin: 15px 0;
  }
  .process_box,
  .msg_admin_box {
    float: left;
    width: 25%;
    height: 1.2rem;
    position: relative;
  }
  .process_box a,
  .msg_admin_box a {
    display: block;
    box-sizing: border-box;
    height: 1.2rem;
    padding: .2rem 0;
    width:100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

  }
  img.icon_circle {
    display: block;
    margin: auto;
    width: .4rem;
    height:.4rem;
    text-align: center;
  }
  .icon_desc {
    display: block;
    text-align: center;
  }
  .gap_line {
    width:100%;
    height:1px;
    background-color: #c9c9c9;
    margin:.15rem 0;
  }

</style>

<script>
  import http from 'axios';
  import {getQueryString,getAccount} from '@/libs/utils';
  import {
    XHeader,
    Grid,
    GridItem,
    Icon,
    Divider
  } from 'vux';
  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      Icon,
      Divider
    },
    data() {
      return {
        title: "平台中心",
        dataList: [{
          label: "待办事宜",
          img: "./assets/icon_nav_picker.png"
        }]
      }
    },
    mounted() {
      // var that = this;
      // getAccount(http,getQueryString("code"),function(obj){
      //   that.account = that.$route.params.account?that.$route.params.account:"admin";
      // });

    },
    methods: {
      onItemClick() {
        //console.log('Main : on item click')
      },
      countColumn(){}
    }
  }
</script>



