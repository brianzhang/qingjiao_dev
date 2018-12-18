<%@page import="com.lc.ibps.base.web.util.RequestUtil"%>
<%@page import="com.lc.ibps.base.core.util.AppUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String isAjaxLogin = RequestUtil.getString(request, "isAjaxLogin","false");
	String redirectUri = RequestUtil.getString(request, "redirect_uri","");
	String responseType = RequestUtil.getString(request, "response_type","code");
	String clientId = RequestUtil.getString(request, "client_id","");
	String registerEnabled = AppUtil.getProperty("register.enabled","false");
	String validCodeEnabled= AppUtil.getProperty("validCodeEnabled", "false"); 
%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>登录-轻教平台</title>
<%@include file="/commons/include/login.jsp"%>
<f:link href="login2.css"  isCommon="false"></f:link>
</head>
<body >
  <div class="login v2 ">
    <div class="session-wrapper">
      <div class="card bg-white no-border  animated slideInRight ">
        <div class="card-block ">
          <form role="form" class="form-layout" >
            <div class="text-center m-b">
              <h4 class="text-uppercase">欢迎使用IBPS平台</h4>
              <p>快速开发平台</p>
            </div>
            <div class="form-inputs p-b ">
				<div class="form-group" >
					<label class="text-uppercase">用户名</label>
					<input type="text" class="form-control input-lg" placeholder="用户名" required id="username"name="username" tabindex="1" >
				</div>
				<div class="form-group" >
					<label class="text-uppercase">密码</label>
					<input type="password" class="form-control input-lg" placeholder="密码" required id="password"name="password" tabindex="2"  >
				</div>
				<div class="form-group hidden" id="validCodeFormGroup">
					<label class="text-uppercase">验证码</label>
					<div class="input-group">
                         <input type="text" class="form-control input-lg" placeholder="请输入验证码"   id="validCode"name="validCode" tabindex="3"  >
                         <a  class="input-group-addon padding-0 reload-vify captcha" href="javascript:;">
                             <img id="validImg" src="${ctx}/servlet/ValidCode" height="44px" title="刷新验证码" />
                         </a>
                  </div>
             </div>
        	<div class="form-group clearfix m-t-5">
        			<div class="pull-left ">
	                 <div class="cs-checkbox ">
	                  <input type="checkbox" id="rememberMe"   name="rememberme"  checked="checked">
	                  <label for="rememberMe">下次自动登录</label>
	                </div> 
                </div>   
                <div class="pull-right register hidden">
                         <a href="${ctx}/register.jsp"   id="register"  >注册账号</a>
                    </div>
             </div>
            </div>
            <a class="btn btn-primary btn-block btn-lg m-b"   id="login">登录</a>
            <br/>
            <p class="text-center"><small><em>2015-2018 &copy; <a href="http://www.bpmhome.cn" target="_blank">哈尔滨工程大学</a> - All Rights Reserved. </em></small>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
		<div class="navbar-fixed-top align-right">
				<div class="btn-group style-toggle">
                       <a href="login.jsp" class="btn btn-default btn-outline btn-sm ">样式1</a>
                       <a href="javascript:;" class="btn btn-default btn-outline btn-sm active" >样式2</a>
                   </div>
			</div>
	<script type="text/javascript">
		var isAjaxLogin =  '<%=isAjaxLogin%>',
				__ctx = '${ctx}',
				__redirectUri = '<%=redirectUri%>',
				__responseType = '<%=responseType%>',
				__clientId = '<%=clientId%>',
				validCodeEnabled='<%=validCodeEnabled%>',
				registerEnabled='<%=registerEnabled %>';
		//当这个窗口出现在iframe里，表示其目前已经timeout，需要把外面的框架窗口也重定向登录页面
		if(top!=this && 'true' != isAjaxLogin){
			  top.location= 	__ctx+ '/login.jsp';
		}else{
			  $("#loginBody").removeClass("hidden");
		}
	</script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/console/login.js"></script>
	
</body>
</html>
