<template>
  <div>
    <loading :show="show1" :text="text1"></loading>
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
              {{item.createTime|formatDate}}
            </div>
            <div class="lc-list-right-title genre">
              <!--{{ item.status }}-->
              {{listGenre(item)}}
            </div>
            <div class="lc-list-right-title">
              {{ item.subject }}
            </div>
          </div>
        </div>
      </div>
    </scroller>

    <tabbar class="tabbar_box">
      <tabbar-item @on-item-click="getList(1,params.limit,'')" selected>
        <span slot="label">全部</span>
      </tabbar-item>
      <tabbar-item class="tab_left" @on-item-click="getList(1,params.limit,'running')" >
        <span slot="label">运行中</span>
      </tabbar-item>
      <tabbar-item class="tab_left" @on-item-click="getList(1,params.limit,'end')" >
        <span slot="label">正常结束</span>
      </tabbar-item>
      <tabbar-item class="tab_left" @on-item-click="getList(1,params.limit,'manualend')" >
        <span slot="label">人工结束</span>
      </tabbar-item>
    </tabbar>

  </div>

</template>

<script>
import {
  XHeader,
  Tabbar,
  TabbarItem,
  Loading
  // XIcon
} from 'vux';
import Vue from 'vue';
import Router from "vue-router";
import VueScroller from 'vue-scroller';
import {formatDate} from '@/libs/date.js';
import http from 'axios';
import qs from 'qs';
import {
  webapiUrl
} from '@/config/base';
Vue.use(VueScroller);

export default {
  data() {
    return {
      title: "已办事宜",
      datalist: [],
      listUrl: webapiUrl + '/webapi/bpmService/myHandled',
      params: {
        account: '',
        page: '1',
        limit: '15',
        status: ''
      },
      show1: true,
      text1: '玩命加载中'
    }
  },
  mounted() {
    this.params.account = localStorage.getItem("account")?localStorage.getItem("account"):"admin";
    this.getList(1, this.params.limit, this.params.status);
    this.$refs.my_scroller.finishInfinite(true);
    // console.log(this.$router);
  },
  ready() {
    this.$nextTick(() => {
      this.$refs.scroller.reset()
    })
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        // console.log("refresh:");
        this.params.page = 1;
        this.getList(this.params.page, this.params.limit,this.params.status);
        // console.log(this.responseData);

        done()
      }, 1500)
    },
    infinite(done) {
      setTimeout(() => {
        // console.log("infinite:");
        this.params.page += 1;
        let response = this.getList(this.params.page, this.params.limit, this.params.status);
        if (!response) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }
        this.datalist = this.datalist.concat(response);

        done()
      }, 1500)
    },
    onItemClick(index, item) {
      this.$router.push({
        name: "handledDetail",
        params: {
          taskId: item.taskId,
          account: this.params.account,
          subject: item.subject,
          item: item
        }
      });
    },
    getList: function(page, limit, status) {
      let that = this;
      that.params.page = page;
      that.params.limit = limit;
      that.params.status = status;
      http.get(this.listUrl+"?"+ qs.stringify(this.params), {
        herders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json',
        // withCredentials:true
      }).then(function(response) {
        if (that.params.page == 1) {
          that.datalist = response.data.data;
        } else {
          that.datalist = that.datalist.concat(response.data.data);
        }
        that.show1 = false;
      }).catch(function(error) {
        console.log(error);
      });
    },
    listGenre: function(item) {
      var genre = '';
      switch (item.status) {
        case 'running':
          genre = "运行中";
          break;
        case 'suspend':
          genre = "挂起";
          break;
        case 'end':
          genre = "结束";
          break;
        case 'manualend':
          genre = "人工结束";
          break;
        case 'rejectToStart':
          genre = "驳回到发起人";
          break;
        case 'reject':
          genre = "驳回";
          break;
        case 'revoke':
          genre = "撤销";
          break;
        case 'revokeToStart':
          genre = "撤销到发起人";
          break;
        default:
          genre = ""
      }
      return genre;
    }
  },
  filters: {
    formatDate(time) {
        var date = new Date(time);
        if(time){
          return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    }
  },
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    Router,
    Loading
  }
}
</script>

<style>
@import '../../styles/lc-common.css';
</style>
