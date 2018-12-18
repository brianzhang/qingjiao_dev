<template>
  <div class="login_content">
    <div>
      <loading :shows="show"></loading>
      <div class="logo_box"></div>
      <h1 class="lc-title">Welcome IBPS</h1>
      <form action="">
        <div class="all_input">
          <div class="input_box">
            <!--<span class="login_font">账号：</span>-->
            <x-input title="账号：" type="text" v-model="params.account" class="input_user"></x-input>
          </div>
          <div class="input_box">
            <!--<span class="login_font">密码：</span>-->
            <x-input title="密码：" type="password" v-model="params.pwd" class="input_password"></x-input>
          </div>

          <p style="text-align:center" class="p_mes">
            {{message}}
          </p>
          <!--<div class="checkbox remember-password-container">
            <input type="checkbox" value="remember-me" v-model="rememberPassword" id="remember-password-checkbox" v-on:click="doRememberPassword($event)">
            <label for="remember-password-checkbox">
              记住密码
            </label>
          </div>-->


          <div class="input_box input_box_blue">
            <x-button type="primary" :text="submit001" :disabled="disable001" class="login_input" @click.native="processButton" style="font-size: .2rem"></x-button>
          </div>

        </div>

      </form>

    </div>
  </div>

</template>

<script>
  import http from 'axios';
  import qs from 'qs';
  import Loading from '@/components/cells/Loading';

  import {
    XInput,
    Group,
    Cell,
    XButton,
    TransferDom
  } from 'vux';
  import {
    webapiUrl
  } from '@/config/base';
  import {getAccount} from '@/libs/utils';
  export default {
    data() {
      return {
        params: {
          account: "",
          pwd: "",
          ser: webapiUrl
        },
        submit001: "登录",
        disable001: false,
        message:'',
        show:false

      }
    },
    mounted() {
      localStorage.clear();
    },
    methods: {
      appLogin: function() {
        let that = this;
        that.message = '';
        var acount = localStorage.getItem("acount");
        if (acount) {
          return acount;
        } else {
          http.post(webapiUrl+"/loginService/appLogin",
            qs.stringify(that.params), {
              herders: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              responseType: 'json',
            })
            .then(function(response) {
              if (response.status == 200&&response.data.data) {
                var userRs = eval('(' + response.data.data + ')');
                var account = userRs.account;
                localStorage.setItem("account", account);
                var userId = userRs.userId;
                localStorage.setItem("userId", userId);
                var fullName = userRs.fullName;
                localStorage.setItem("fullName", fullName);
                that.resetButton();
                that.$router.push({
                  name: "main"
                });
                return account;
              }else{
                that.resetButton();
                that.message = "账号或者密码有误，请再次确认后输入！";
                console.log(response);
              }
              return '';
            })
            .catch(function(error) {
              that.resetButton();
              that.message = "账号或者密码有误，请再次确认后输入！";
              console.log(error);
              return '';
            })
        }

      },
      processButton :function(){
        this.submit001 = '提交中';
        this.show=true;
        this.disable001 = true;
        this.appLogin();
      },
      resetButton: function(){
        this.show=false;
        this.submit001 = '登录';
        this.disable001 = false;
      }
    },
    components: {
      XInput,
      Group,
      Cell,
      XButton,
      Loading
    },
    directives: {
      TransferDom
    }
  }
</script>

<style>

  .login_content{
    position: fixed;
    width:100%;
    height:100%;
    background-image: url(bg.jpg);
    background-size: 100% 100%;
  }
  .logo_box {
    position: relative;
    top: .6rem;
    left: 43%;
    width: .6rem;
    height: .6rem;
    background-image: url(logo.jpg);
    background-size: 100% 100%;
    border-radius: 50%;
  }
  .lc-title {
    text-align: center;
    padding-top: 20%;
    padding-bottom: 10%;
    color: #ececec;
  }
  .p_mes {
    background-color: #c3d9ec;
    width: 95%;
    margin: auto;
    border-radius: 6px;
    color: #666;
  }
  .checkbox  {
    position: relative;
    top: .05rem;
    left: 35%;
    width: 50%;
    color: white;
    font-size: .18rem;
  }
  .checkbox>input {
    position: relative;
    top: .04rem;
    width: .18rem;
    height: .18rem;
  }

  .all_input {
    width: 90%;
    margin: 0 auto;
  }
  .input_box,
  .login_input {
    height:50px;
    width: 90%;
    margin: 0 auto;
    margin-bottom:15px;
    border-radius: 30px;
    border: 1px solid #d0d0d0;
    color: #d0d0d0;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }

  .input_box_blue {
    margin-top:20px;
    border: none;
    background-color: #6f9cd2;
  }
  .login_input,
  .input_user,
  .input_password {
    -webkit-appearance: normal!important;
    -moz-appearance: normal!important;
    -o-appearance: normal!important;
    appearance: normal!important;
    outline:none;
    border:none;
    background-color: transparent!important;
  }
  .login_input {
    color: white;
    font-size: 20px;
  }
  .input_user,
  .input_password {
    color: white;
    font-size: .18rem;
    padding: 0 .1rem!important;
  }
  .weui-btn:after {
    border: none!important;
  }

</style>



