<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<head>
<title>密码重置-轻教平台</title>
<%@include file="/commons/include/register.jsp"%>
</head>
<body class=" login scroll-animations-activated hidden" id="registerBody">
        <!-- BEGIN REGISTER -->
        <div class="content  animated bounceIn" data-animation="bounceIn">
            <!-- BEGIN REGISTER FORM -->
            <form class="login-form" method="post">
                <h3 class="form-title">IBPS平台账户-密码重置</h3>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">手机号码</label>
                    <div class="input-icon">
                        <i class="fa fa-mobile"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" 
                        	placeholder="手机号码" id="mobile" name="mobile" tabindex="4" /> </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">新密码</label>
                    <div class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" 
                        	placeholder="登录密码"  id="passWd"name="passWd" tabindex="5" /></div>
                </div>
			  	<div class="form-group hidden" id="validCodeFormGroup">
                    <div class="input-group">
                    	<label class="control-label visible-ie8 visible-ie9">验证码</label>
                        <div class="input-icon">
               				<i class="fa fa-qrcode"></i>
               				<input  class="form-control placeholder-no-fix"  style="z-index: 0;"  type="text" autocomplete="off" placeholder="验证码"  id="validCode"name="validCode" tabindex="6"  />
               			 </div>  
               			<span class="input-group-addon" style="padding: 0; border: 0; background-color:transparent;">
	                    <a id="sendSms" href="javascript:void(0);"  class="btn btn-info  pull-right">获取短信验证码</a>
               			</span>    
                    </div>
                </div>
                <div> <a id="forget" href="javascript:void(0);"  class="btn btn-lg  green "   style="width: 100%;" > 重&nbsp;&nbsp;置&nbsp;&nbsp;</a></div>
       		 </form>
     		<div class="create-account">
                  <p>
                      <a  id="login" href="${ctx}/login.jsp"  style="width: 80%;" >返回登录</a>
                  </p>
              </div>
       		        <!-- END REGISTER FORM -->
       </div>
         <!-- END REGISTER -->
         <div class="copyright"> 2015-2018 &copy; <a href="http://www.bpmhome.cn" target="_blank">哈尔滨工程大学</a> - All Rights Reserved. </div>
	<script type="text/javascript">
		var __ctx = '${ctx}';
		$("#registerBody").removeClass("hidden");
		$("#validCodeFormGroup").removeClass("hidden");
	</script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/console/forget.js"></script>
</body>
</html>
