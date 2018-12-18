/*******************************************************************************
 * 
 * 登录页
 * 
 * <pre>
 *  
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-9-17-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 * 
 ******************************************************************************/
$(function() {
	var login = new Login();
	login.init();
});
/**
 * 功能：移除首尾空格
 */
String.prototype.trim = function() {
	return this.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
};

var Login = function() {
};

Login.prototype = {
	init : function() {
		if (this.hasInit) // 是否已初始化
			return false;
		this.hasInit = true;
		this.handeEvent();

		if (registerEnabled == 'true') {
			$(".register").removeClass("hidden");
		} else {
			$(".register").addClass("hidden");
		}
		if (validCodeEnabled == 'true') {
			$("#validCodeFormGroup").removeClass("hidden");
		}

		$("#username").focus();

		this.handleBackstretch();

		this.handleFixInputPlaceholderForIE();
	},
	handeEvent : function() {
		var me = this;
		$('body').keydown(function(event) {// 处理回车事件
			if (event.keyCode == 13)
				me.login();
		});
		
		$(document).on('click', '#reset', function(e) {// 重置
			$('#loginForm')[0].reset();
		});
		$(document).on('click', '#login', function(e) {// 登录
			me.login();
		});
		$(document).on('click', '.captcha', function(e) {// 刷新验证码
			me.reload();
		});
	},
	handleBackstretch : function() {
		var num = Math.random() * 10 + 1, images = [], path = __ctx
				+ "/styles/commons/images/login/";
		num = parseInt(num, 10);
		for (var i = 0; i < 10; i++) {
			images.push(path + num + ".jpg");
			num++
			if (num > 10)
				num = 1;
		}
		$.backstretch(images, {
			fade : 1000,
			duration : 5000
		});
	},
	handleFixInputPlaceholderForIE : function() {
		var isIE8 = !!navigator.userAgent.match(/MSIE 8.0/), isIE9 = !!navigator.userAgent
				.match(/MSIE 9.0/), isIE10 = !!navigator.userAgent
				.match(/MSIE 10.0/);
		// fix html5 placeholder attribute for ie7 & ie8
		if (isIE8 || isIE9) { // ie8 & ie9
			$(
					'input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)')
					.each(
							function() {
								var input = $(this);

								if (input.val() === ''
										&& input.attr("placeholder") !== '') {
									input.addClass("placeholder").val(
											input.attr('placeholder'));
								}

								input.focus(function() {
									if (input.val() == input
											.attr('placeholder')) {
										input.val('');
									}
								});

								input.blur(function() {
									if (input.val() === ''
											|| input.val() == input
													.attr('placeholder')) {
										input.val(input.attr('placeholder'));
									}
								});
							});
		}
	},
	/**
	 * 登录
	 */
	login : function() {
		var username = $("#username").val(), password = $("#password").val();

		if (username == "") {
			laydialog.msg("用户名或者密码为空");
			$("#username").focus();
			return;
		}

		if (registerEnabled == 'true'
				&& !(/^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/
						.test(username.trim()))) {
			laydialog.msg("请使用手机号码登录");
			$("#username").focus();
			throw new error("请使用手机号码登录");
		}

		if (password == "") {
			laydialog.msg("用户名或者密码为空");
			$("#password").focus();
			return;
		}
		var _this = this;
		var loading = laydialog.load(0, {
			shade : 0.3
		});
		
		var param = {
			username : username,
			password : password,
			validCode : $("#validCode").val(),
			'rememberme' : $('#rememberMe').is(':checked') ? 'on' : 'off'
		};
		
		$.post(__ctx + "/login.htm",
				param, 
				function(data) {
					
					if (data.result == 1) {
						
						if(undefined == __redirectUri || null == __redirectUri || "" == __redirectUri){
							window.location.href = __ctx + "/platform/console/main.htm";
						}else{
							var ___url = __ctx + "/authorize.htm?redirect_uri=" + __redirectUri+"&response_type="+__responseType+"&client_id="+__clientId;
							console.log("redirect to " + ___url);
							window.location.href = ___url;
						}
						
					} else if (data.result == 2) {
						
						laydialog.close(loading);
						param.kickout = false;
						DialogUtil.confirm(data.message, function(rtn) {
							if (rtn){

								param.kickout = true;
								$.post(__ctx + "/login.htm",
										param, 
										function(data) {
											param.kickout = false;
											laydialog.close(loading);
											if (data.result == 1) {
												window.location.href = __ctx
														+ "/platform/console/main.htm";
											} else {
												laydialog.close(loading);
												if (data.validCode) {
													$("#validCodeFormGroup").removeClass("hidden");
												}
												laydialog.msg(data.message);
											}
								}, "json");

							}

						});
						
					}
					else {
						laydialog.close(loading);
						// if(data.message == "验证码为空"){
						// 	console.log("不管验证码");
                         //    window.location.href = __ctx + "/platform/console/main.htm";
						// }else {
                         //    if (data.validCode) {
                         //        $("#validCodeFormGroup").removeClass("hidden");
                         //        // _this.reload();
                         //        // window.location.href=__ctx;
                         //    }
                         //    laydialog.msg(data.message);
						// }
                        if (data.validCode) {
                            $("#validCodeFormGroup").removeClass("hidden");
                            // _this.reload();
                            // window.location.href=__ctx;
                        }
                        laydialog.msg(data.message);
					}
					
				}, "json");

		

		// $('#loginForm').submit();
	},
	/**
	 * 刷新验证码
	 */
	reload : function() {
		var url = __ctx + "/servlet/ValidCode?rand=" + new Date().getTime();
		document.getElementById("validImg").src = url;
	}
};