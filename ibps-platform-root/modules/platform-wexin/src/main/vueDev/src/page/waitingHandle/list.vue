<template>
  <div>
    <loading :show="show1" ></loading><!--:text="text1"-->
    <!--<loading></loading>-->
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
  </div>
</template>

<script>
import Vue from 'vue';
import VueScroller from 'vue-scroller';
import http from 'axios';
import qs from 'qs';
import {formatDate} from '@/libs/date.js';
import {
  webapiUrl
} from '@/config/base';
Vue.use(VueScroller);
import {
  XHeader} from 'vux';/*,Loading*/
import Loading from '@/components/cells/Loading';
export default {
  props: [],
  data() {
    return {
      title: "待办事宜",
      size:15,
      datalist: [],
      listUrl: webapiUrl + '/webapi/bpmService/myTasks',
      params: {
        account: '',
        page: 1,
        limit: 15,
        subject: '',
//        status: '',
        code: ''
      },
      search: '',
      show1: true,
      text1: '玩命加载中',
      shows1: true
    }
  },
  components: {
    XHeader,Loading
  },
  mounted() {
//    this.canvas.style.display = 'block';

    console.log(document.getElementsByTagName("canvas").style);
    // document.title = "待办列表";
    let that = this;
    that.params.account = localStorage.getItem("account")?localStorage.getItem("account"):"admin";
    this.getList(this.params.account, 1, this.params.limit);
    this.$refs.my_scroller.finishInfinite(true);
    /*window.onload = function () {
      document.getElementsByClassName("loading").style.display = "none";
    }*/
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
      this.$router.push({
        name: "waitingHandleDetail",
        params: {
          taskId: item.taskId,
          account: this.params.account,
          subject: item.subject
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

      // todo open load

      http.get(this.listUrl + "?" + qs.stringify(this.params), {
        herders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json',
        // withCredentials:true
      }).then(function(response) {

        // todo close load

        console.log(response.data.data);
        if (that.params.page == 1) {
          that.datalist = response.data.data;
        } else {
          that.datalist = that.datalist.concat(response.data.data);
        }
        that.size = response.data.vars.size;

        /*var ll =document.getElementsByClassName("loading");
        debugger;
        ll.style.display = "none";*/

        that.show1 = false;
//        document.getElementsByTagName("canvas").style.display = 'none';
//        console.log(that.shows1);
//        that.shows1 = false;
//        that.canvas.style.display = 'none';
      }).catch(function(error) {
//        console.log(error);
      });
    },

    listGenre: function(item) {
      var genre = '';
      switch (item.status) {
        case 'NORMAL':
          genre = "普通任务";
          break;
        case 'AGENT':
          genre = "代理任务";
          break;
        case 'DELIVERTO':
          genre = "转交任务";
          break;
        case 'TRANSFORMING':
          genre = "流转源任务";
          break;
        case 'TRANSFORMED':
          genre = "接收流转任务";
          break;
        case 'COMMU':
          genre = "通知任务";
          break;
        default:
          genre = ""
      }
      return genre;
    },

  },
  filters: {
    formatDate(time) {
        var date = new Date(time);
        if(time){
          return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    }
  },
  ready(){

  },

}
</script>

<style>
@import '../../styles/lc-common.css';
@import '../../styles/common.css';

</style>
