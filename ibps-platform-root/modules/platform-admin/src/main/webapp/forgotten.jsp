<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<head>
<title>忘记密码 轻教平台</title>
<%@include file="/commons/include/login.jsp"%>
</head>

<body class=" login scroll-animations-activated hidden" id="loginBody">
	<!-- BEGIN LOGO -->
	<div class="logo">
		<div>忘记密码 轻教平台</div>
	</div>
	<!-- END LOGO -->
	<!-- BEGIN LOGIN -->
	<div class="content  animated bounceIn" data-animation="bounceIn">
		<!-- BEGIN LOGIN FORM -->
		<form class="login-form" method="post">
			<h3 class="form-title">通过邮箱找回</h3>
			<div class="form-group">
				<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
				<label class="control-label visible-ie8 visible-ie9">用户名</label>
				<div class="input-icon">
					<i class="fa fa-user"></i> <input
						class="form-control placeholder-no-fix" type="text"
						autocomplete="off" placeholder="学号或工号" id="username"
						name="username" tabindex="1" />
				</div>
			</div>
			<div class="form-group">
				<label class="control-label visible-ie8 visible-ie9">邮箱账号</label>
				<div class="input-icon">
					<i class="fa fa-envelope-o fa-fw"></i> <input
						class="form-control placeholder-no-fix" type="email"
						autocomplete="off" placeholder="请输入您绑定的邮箱账号" id="email"
						name="email" tabindex="2" />
				</div>
			</div>
			<div class="form-group" id="validCodeFormGroup">
				<div class="input-group">
					<label class="control-label visible-ie8 visible-ie9">验证码</label>
					<div class="input-icon" style="margin-right: 10px">
						<i class="fa fa-qrcode"></i> <input
							class="form-control placeholder-no-fix" style="z-index: 0;"
							type="text" autocomplete="off" placeholder="验证码" id="validCode"
							name="validCode" tabindex="3" />
					</div>
					<span class="input-group-addon"
						style="padding: 0; border: 0; background-color: transparent;"><img
						class="captcha" id="validImg" src="${ctx}/servlet/ValidCode"
						title="刷新验证码" /> </span>
				</div>
			</div>
			<div class="form-actions">
				<a href="login.jsp" class="btn btn-primary green pull-left"> <i
					class="fa fa-chevron-left"></i>&nbsp;返&nbsp;回
				</a> <a id="getBack" href="javascript:void(0);"
					class="btn btn-primary green pull-right">
					找&nbsp;回&nbsp;密&nbsp;码&nbsp;<i class="fa fa-chevron-right"></i>
				</a>
			</div>

		</form>
		<div class="create-account register">
			<p>
				<a href="${ctx}/register.jsp" id="register"
					class="btn btn-primary  register" style="width: 80%;">
					注&nbsp;&nbsp;册&nbsp;&nbsp;帐&nbsp;&nbsp;号</a>
			</p>
		</div>
		<!-- END LOGIN FORM -->
	</div>
	<!-- END LOGIN -->
	<div class="copyright">
		2016-2017 &copy; <a href="http://www.hrbeu.edu.cn" target="_blank">哈尔滨工程大学</a>
		- All Rights Reserved.
	</div>

	<script type="text/javascript">
	/**
	 * Copyright (c) 2016 hustcc
	 * License: MIT
	 * Version: v1.0.1
	 * GitHub: https://github.com/hustcc/canvas-nest.js
	**/
	
		/**
		 * 功能：移除首尾空格
		 */
		String.prototype.trim = function() {
			return this.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
		};
		//当这个窗口出现在iframe里，表示其目前已经timeout，需要把外面的框架窗口也重定向登录页面
		if(top!=this){
		}else{
				$("#loginBody").removeClass("hidden");
		}
		var __ctx = '${ctx}';
		$(".register").addClass("hidden");
		$(function(){
			var login =  new Login();
			login.init();
		});
		
		var Login = function(){
		};
		 
		Login.prototype = {
				init : function() {
					if (this.hasInit) // 是否已初始化
						return false;
					this.hasInit = true;
					this.handeEvent();
					
					
			        $("#username").focus();
			         
			        this.handleBackstretch();
			        
			        this.handleFixInputPlaceholderForIE();
				},
				handeEvent:function(){
					var me = this;
					$(document).keydown(function(event) {//处理回车事件
						if (event.keyCode == 13)
							me.getBack();
					});

					$(document).on('click', '#reset', function(e) {//重置
						$('#loginForm')[0].reset();
					});
					$(document).on('click', '#getBack', function(e) {//找回
						me.getBack();
					});
					$(document).on('click', '.captcha', function(e) {//刷新验证码
						me.reload();
					});
				},
				handleBackstretch:function(){
					var num = Math.random()*10 + 1,
						 images=[],path = __ctx+"/styles/commons/images/login/";
						 num = parseInt(num, 10);
					for (var i = 0; i < 10; i++) {
						images.push(path+num+".jpg");
						num++
						if(num >10) num =1;
					}
		 		    $.backstretch(images, { 
		 		    				fade: 1000,
		 			   		        duration: 5000
		 			   		    	}
		 			           	);
				},
				handleFixInputPlaceholderForIE : function() {
					var  isIE8 = !!navigator.userAgent.match(/MSIE 8.0/),
				        isIE9 = !!navigator.userAgent.match(/MSIE 9.0/),
				        isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);
			        //fix html5 placeholder attribute for ie7 & ie8
			        if (isIE8 || isIE9) { // ie8 & ie9
			            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
			            $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function() {
			                var input = $(this);

			                if (input.val() === '' && input.attr("placeholder") !== '') {
			                    input.addClass("placeholder").val(input.attr('placeholder'));
			                }

			                input.focus(function() {
			                    if (input.val() == input.attr('placeholder')) {
			                        input.val('');
			                    }
			                });

			                input.blur(function() {
			                    if (input.val() === '' || input.val() == input.attr('placeholder')) {
			                        input.val(input.attr('placeholder'));
			                    }
			                });
			            });
			        }
			    },
				/**
				*	找回
				*/
				getBack:function(){
					var me=this,username =  $("#username").val(),
						email =  $("#email").val() ,validCode = $("#validCode").val();
					
					if(username == "" ){
						laydialog.msg("用户名为空");
						$("#username").focus();
						return;
					}
					
					
					if( email == "" ){
						laydialog.msg("邮箱为空");
						$("#email").focus();
						return;
					}
					
					if( validCode == "" ){
						laydialog.msg("验证码为空");
						$("#validCode").focus();
						return;
					}
					var _this =this;
					var loading = laydialog.load(0,{
						 shade: 0.3
					})
					$.post("${ctx}/getBack.jsp",{ 
								username: username,
								email: email,
								validCode: validCode
							},
					   function(data){
							laydialog.close(loading);
							laydialog.msg(data.msg);
								if(data.success){
									setTimeout(function(){
										location.href = '/login.jsp';
									},2000);
								}else{
									me.reload();
									$("#email").focus();
								}
					 },'json');
				},
				/**
				*刷新验证码
				*/
				reload:function(){
					var url = __ctx+"/servlet/ValidCode?rand=" + new Date().getTime();
					document.getElementById("validImg").src = url;
				}
		 };
	</script>
</body>

</html>
