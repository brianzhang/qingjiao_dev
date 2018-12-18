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
<title>登录-轻教平台-哈尔滨工程大学</title>
<%@include file="/commons/include/login.jsp"%>
<f:link href="login.css"  isCommon="false"></f:link>
</head>

<body class=" login scroll-animations-activated hidden" id="loginBody">
        <!-- BEGIN LOGO -->
        <div class="logo">
            <div >轻教 平台 </div>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content  animated bounceIn" data-animation="bounceIn">
            <!-- BEGIN LOGIN FORM -->
            <form class="login-form" method="post">
                <h3 class="form-title">登录账户</h3>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">用户名</label>
                    <div class="input-icon">
                        <i class="fa fa-user"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" id="username"name="username" tabindex="1" /> </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <div class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="密码"  id="password"name="password" tabindex="2"  /> </div>
                </div>
				<div class="form-group hidden" id="validCodeFormGroup">
                          <div class="input-group">
                                <label class="control-label visible-ie8 visible-ie9">验证码</label>
                                <div class="input-icon">
                      				<i class="fa fa-qrcode"></i>
                      				<input  class="form-control placeholder-no-fix"  style="z-index: 0;"  type="text" autocomplete="off" placeholder="验证码"  id="validCode"name="validCode" tabindex="3"  />
                      			 </div>  
                      			<span class="input-group-addon" style="padding: 0; border: 0; background-color:transparent;"><img class="captcha" id="validImg" src="${ctx}/servlet/ValidCode" title="刷新验证码" /> </span>    
                          </div>
                        </div>
                <div class="form-actions">
                	<div class="pull-left">
		                  <label class="rememberme mt-checkbox mt-checkbox-outline">
		                        <input type="checkbox" id="rememberMe"   name="rememberme"  checked="checked"/>下次自动登录
		                        <span></span>
		                 </label>
                   </div>
                   		<div class="pull-right register hidden">
                   			<a href="${ctx}/register.jsp"   id="register"  >注册账号</a>
                   			<a href="${ctx}/forget.jsp"   id="forget"  >忘记密码</a>
                     	</div>
                  </div>
                 <a class="btn btn-primary btn-block btn-lg green m-b "   id="login" href="javascript:void(0);" style="padding: 5px;">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
                </div>
       		 </form>
       		        <!-- END LOGIN FORM -->
       </div>
         <!-- END LOGIN -->
         <div class="copyright"> 2015-2018 &copy; <a href="http://www.bpmhome.cn" target="_blank">哈尔滨工程工程大学</a> - All Rights Reserved. </div>
		<!-- 		
		<div class="navbar-fixed-top align-right">
			<div class="btn-group style-toggle">
                <a href="javascript:;" class="btn btn-default btn-outline btn-sm active">样式1</a>
                <a href="login2.jsp" class="btn btn-default btn-outline btn-sm">样式2</a>
            </div>
		</div> 
		-->

	<script type="text/javascript">
		var isAjaxLogin =  '<%=isAjaxLogin%>',
				__ctx = '${ctx}',
				__redirectUri = '<%=redirectUri%>',
				__responseType = '<%=responseType%>',
				__clientId = '<%=clientId%>',
				validCodeEnabled='<%=validCodeEnabled%>',
				registerEnabled='<%=registerEnabled %>';
		//当这个窗口出现在iframe里，表示其目前已经timeout，需要把外面的框架窗口也重定向登录页面
		if(top!=this && 'true'!= isAjaxLogin){
			top.location= '${ctx}/login.jsp';
		}else{
			$("#loginBody").removeClass("hidden");
		}
	</script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/console/login.js"></script>
	
</body>
</html>
