<template>
  <div>
    <div class="header">
      <router-link :to="{ name: 'newsList'}" slot="overwrite-left">
        <x-icon type="ios-arrow-left" size="30" style="fill:#fff;position:absolute;top:.08rem;left:.1rem;"></x-icon>
      </router-link>
      {{detail.publicItem=="notices"?"[公告]":"[重要公告]"}}-{{detail.title}}
    </div>

    <div>
      <x-input title="类型：" v-model="detail.type" disabled></x-input>
      <x-input title="标题：" v-model="detail.title" disabled></x-input>
      <x-input title="发布人：" v-model="detail.userName" disabled></x-input>
      <div class="vux-x-input weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label" style="width: 5em;">有效时间：</label>
        </div>
        <div class="weui-cell__bd weui-cell__primary">
          {{detail.publicDate|formatDate}}
        </div>
      </div>
      <div class="vux-x-input weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label" style="width: 5em;">截至时间：</label>
        </div>
        <div class="weui-cell__bd weui-cell__primary">
          {{detail.loseDate|formatDate}}
        </div>
      </div>
      <div class="vux-x-input weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label" style="width: 5em;">是否公共：</label>
        </div>
        <div class="weui-cell__bd weui-cell__primary">
          {{detail.isPublic=='yes'?'是':'否'}}
        </div>
      </div>
      <div class="vux-x-input weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label" style="width: 5em;">发布状态：</label>
        </div>
        <div class="weui-cell__bd weui-cell__primary">
          {{detail.status=='publish'?'发布':'草稿'}}
        </div>
      </div>
      <x-input title="作者：" v-model="detail.author" disabled></x-input>
      <x-input title="关键字：" v-model="detail.key" disabled></x-input>
      <group title="附件" >
        <div v-for="(item, index) in files()">
          <div class="vux-x-input weui-cell">
            <input type="text" disabled="disabled" class="weui-input" :value="item">
          </div>
        </div>
      </group>

      <x-textarea title="内容：" v-model="detail.content" readonly></x-textarea>

    </div>

  </div>

</template>

<script>
import {XHeader,XInput,XTextarea,Group} from 'vux';
import http from 'axios';
import qs from 'qs';
import {webapiUrl} from '@/config/base';
import {formatDate} from '@/libs/date.js';
import {getFileNames} from '@/libs/utils.js';
export default {
  data() {
    return {
      newsUrl:webapiUrl+"/webapi/newsService/getNews",
      detail:'',
      format: "YYYY-MM-DD"
    }
  },
  computed:{

  },
  mounted() {
    // console.log(this.$route.params);
    this.getDetail();
  },
  methods: {
    files(){
      return getFileNames(this.detail.fileAttach);
    },
    getDetail(){
      let that = this;
      let params = this.$route.params;
      http.get(that.newsUrl+"?"+qs.stringify(params), {
              responseType: 'json'
            })
      .then(function(response) {
        // console.log(response.data);
        that.detail = response.data.data;
      })
      .catch(function(error) {
        console.log("detail's error:" + error);
        console.log("requesti's parameter: " + params);
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
    XInput,XHeader,XTextarea,Group
  }
}
</script>

<style>
</style>
