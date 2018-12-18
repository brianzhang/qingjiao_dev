<template>
  <!--公告列表-->
  <div>
   <!-- <loading :show="show1" :text="text1"></loading>-->
    <div class="header">
      <router-link :to="{ name: 'main'}" slot="overwrite-left">
        <x-icon type="ios-arrow-left" size="30" style="fill:#fff;position:absolute;top:.08rem;left:.1rem;"></x-icon>
      </router-link>
      {{title}}
    </div>

    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" class="lc-list-box">
      <div v-for="(item, index) in datalist" @click="onItemClick(index, item)">
        <div class="lc-list-cell">
          <div class="lc-list-left">
            <img src="../../assets/default_use_image.jpg" />
          </div>
          <div class="lc-list-right">
            <div class="lc-list-right-time">
              {{item.publicDate|formatDate}}
            </div>
            <div class="lc-list-right-title genre">
              {{item.status=="publish"?"公布":(item.status=="drafts"?"草稿":"过期")}}
            </div>
            <div class="lc-list-right-title">
              {{ item.title }}
            </div>

          </div>
        </div>
      </div>
    </scroller>
<!--
    <tabbar class="tabbar_box">
      <tabbar-item @on-item-click="newNews()" >
        <span slot="label">新建</span>
      </tabbar-item>
    </tabbar>
-->
  </div>

</template>

<script>
import Vue from 'vue';
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);
import http from 'axios';
import qs from 'qs';
import {webapiUrl} from '@/config/base';
import {formatDate} from '@/libs/date.js';
import {XHeader,Tabbar,TabbarItem,Loading} from 'vux';
export default {
  data() {
    return {
      title:"公告列表",
      datalist: [],
      listUrl:webapiUrl+"/webapi/newsService/list",
      params: {
        account: '',
        page: 1,
        limit: 15,
        code: ''
      },
   /*   show1: true,*/
      text1: '玩命加载中'
    }
  },
  mounted() {
    this.params.account = localStorage.getItem("account")?localStorage.getItem("account"):"admin";
    this.getList(this.params.account, 1, this.params.limit);
    this.$refs.my_scroller.finishInfinite(true);
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        this.params.page = 1;
        this.getList(this.params.account,this.params.page, this.params.limit);
        done();
      }, 1500);
    },
    infinite(done) {
      setTimeout(() => {
        // console.log("infinite:"+this.params.page);
        this.params.page += 1;
        let response = this.getList(this.params.account,this.params.page, this.params.limit);
        if (!response) {
          setTimeout(() => {
            done(true)
          }, 1500);
          return;
        }
        // this.datalist = this.datalist.concat(response);
        done();
      }, 1500)
    },
    onItemClick(index, item) {
      let name = "";
      if(item.status=="publish"){
        name='newsDetail';
      }else if(item.status=="drafts"){
        name = 'editNews';
      }else if(item.status=="expired"){
        name = 'newsDetail';
      }
      console.log(name);
      this.$router.push({
        name: name,
        params: {
          account: this.params.account,
          id: item.id,
          item: item
        }
      });
    },
    getList: function(account, page, limit) {
      let that = this;
      if(account){
        that.params.account = account;
        // console.log(account);
      }
      if(page&limit){
        that.params.page = page;
        that.params.limit = limit;
      }
      http.get(this.listUrl + "?" + qs.stringify(this.params), {
        herders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json',
        // withCredentials:true
      }).then(function(response) {
        console.log(response.data.data);
        if (that.params.page == 1) {
          that.datalist = response.data.data;
        } else {
          that.datalist = that.datalist.concat(response.data.data);
        }
        that.params.size = response.data.vars.sze;
        that.show1 = false;
      }).catch(function(error) {
        console.log(error);
      });
    },
    newNews(){
      this.$router.push({
        name: "newNews"
      });
    }
  },
  filters: {
    formatDate(time) {
        var date = new Date(time);
        if(time){
          return formatDate(date, "yyyy-MM-dd");
        }
    }
  },
  components: {
    XHeader,Tabbar,TabbarItem,Loading
  }
}
</script>

<style>
@import '../../styles/lc-common.css';
</style>
