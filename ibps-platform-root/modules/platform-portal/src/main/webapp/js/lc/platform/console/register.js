
		$(function(){
			var register =  new Register();
			register.init();
		});
		
		var Register = function(){
		};
		 
		Register.prototype = {
				init : function() {
					if (this.hasInit) // 是否已初始化
						return false;
					this.hasInit = true;
					this.handeEvent();
					
			        $("#fullName").focus();
			         
			        this.handleBackstretch();
			        
			        this.handleFixInputPlaceholderForIE();
				},
				handeEvent:function(){
					var me = this;
					$(document).keydown(function(event) {//处理回车事件
						if (event.keyCode == 13)
							me.register();
					});

					$(document).on('click', '#register', function(e) {//注册
						me.register();
					});
					$(document).on('click', '#sendSms', function(e) {//刷新验证码
						var _this = $(this);
						if(_this.attr("disabled")){
							return;
						}
						
						var mobile =  $("#mobile").val();
						if(mobile == ""){
							laydialog.msg("手机号码为空");
							$("#mobile").focus();
							throw new error("手机号码为空");
						}else if(!(/^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/.test(mobile.trim()))){
							laydialog.msg("手机号码格式错误");
							$("#mobile").focus();
							throw new error("手机号码格式错误");
						}
						
						$.post(__ctx+"/sendSms.htm", {mobile:mobile},
						   	function(rsdata){
							if(rsdata.result == 2){
								laydialog.alert(rsdata.message);
							}else{
								me.settime(_this, 60);
								laydialog.msg(rsdata.message);
							}
						}, "json");
					});
				},
				settime : function(obj, countdown){
		            var me=this;

	                if (countdown == 0) {
	                    obj.attr("disabled", false);
	                    obj.innerHTML = "获取验证码";
	                    countdown = 60;
	                    return;
	                } else {
	                    obj.attr("disabled", true);
	                    obj.innerHTML = "" + countdown + "秒后再获取";
	                    countdown--;
	                }
	                
	                setTimeout(function () {
	                	me.settime(obj, countdown);
	                }, 1000);
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
				*	注册
				*/
				register:function(){
					var _this =this,data = _this.getData();
					
					var loading = laydialog.load("注册中...")
					$.post(__ctx+"/register.htm", data,
					   	function(rsdata){
							laydialog.close(loading);
							if(rsdata.result == 1){
								laydialog.msg(rsdata.message);
								$.post(__ctx+"/login.htm",{
											username: data.mobile,
											password: data.passWd,
											//validCode: $("#validCode").val(),
											'_spring_security_remember_me':'on'
									},
								   	function(logindata){
										laydialog.close(loading);
										if(logindata.result == 1){
											  window.location.href=__ctx+"/platform/console/main.htm";
										}else{
											laydialog.msg(data.message);
											window.location.href=__ctx+"/login.jsp";
										}
								 }, "json");
							}else{
								laydialog.msg(rsdata.message);
							}
					 }, "json");
				},
				/*
				 * 获取表单数据
				 */
				getData:function(){
					var fullName =  $("#fullName").val(),
						gender =  $(":radio:checked").val(),
						company =  $("#company").val(),
						area =  $("#area").val(),
						mobile =  $("#mobile").val(),
						passWd =  $("#passWd").val(),
						validCode =  $("#validCode").val();
		
					if(fullName == "" ){
						laydialog.msg("姓名为空");
						$("#fullName").focus();
						throw new error("姓名为空");
					}
					if( company == "" ){
						laydialog.msg("公司为空");
						$("#company").focus();
						throw new error("公司为空");
					}
					if(area == "" ){
						laydialog.msg("地区为空");
						$("#area").focus();
						throw new error("地区为空");
					}
					
					if(mobile == ""){
						laydialog.msg("手机号码为空");
						$("#mobile").focus();
						throw new error("手机号码为空");
					}else if(!(/^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/.test(mobile.trim()))){
						laydialog.msg("手机号码格式错误");
						$("#mobile").focus();
						throw new error("手机号码格式错误");
					}
					
					if(passWd == "" ){
						laydialog.msg("密码为空");
						$("#passWd").focus();
						throw new error("密码为空");
					}
					if( validCode == "" ){
						laydialog.msg("验证码为空");
						$("#validCode").focus();
						throw new error("验证码为空");
					}
					
					if( validCode == "" ){
						laydialog.msg("验证码为空");
						$("#validCode").focus();
						throw new error("验证码为空");
					}
					
					if(!$("#agreement").prop("checked")){
						laydialog.msg("请同意《用户协议》");
						$("#agreement").focus();
						throw new error("用户协议");
					}
					
					var data = { 
						fullName : fullName,
						gender : gender,
						company : company,
						area : area,
						mobile : mobile,
						passWd : passWd,
						validCode : validCode
					};
					
					return data;
				}
		 };
		function showAgreement(){
			laydialog.open({
				title:'用户协议',
				content:$("#agreementTemp").html(),
				area: ['80%', '80%'],
				shadeClose:true
			})
		}