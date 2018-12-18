$(function() {
	changePassword  = new ChangePassword();
	changePassword.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : '#changePasswordForm'// 表单form
	};
	/**
	 * 密码修改
	 *
	 */
	ChangePassword = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ChangePassword.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM);
			var frm = form.form({
				rules:[{
					name:'containnum',
					rule:function(v){
						var regx = /\d+/;
						return regx.test(v)
					},
					msg:'必须包含数字'
				},{
					name:'containlowcase',
					rule:function(v){
						var regx=/[a-z]+/;
						return regx.test(v)
					},
					msg:'必须包含小写字母'
				},{
					name:'containuppercase',
					rule:function(v){
						var regx = /[A-Z]+/;
						return regx.test(v)
					},
					msg:'必须包含大写字母'
				},{
					name:'containspec',
					rule:function(v){
						var regx =/[^%&@*?!$]+/;
						return regx.test(v)
					},
					msg:'必须包含特殊字符'
				}]
			});
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.saveData();
			});
		},
		saveData:function(callback,isDef){
			var me = this, form = $(this.consts.FORM), frm = form.form();
			form.attr("action","changePassword.htm");
			frm.ajaxForm({
				success : function(responseText){
					me._showResponse(responseText,callback);
				}
			});
			if(isDef){
				$("#newPassword").val("1");
				form.submit();
			}else{
				if (frm.valid()){
					var newPassword=$("#newPassword").val(), repeatPassword=$("#repeatPassword").val();
					if(newPassword!=repeatPassword){
						DialogUtil.error("两次输入的密码不一致",'');
					}else{
						form.submit();
					}
				}
			}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.alert(msg.getMessage(),function(){
					DialogUtil.closeAll();
				});
			} else {
				DialogUtil.error(msg.getMessage(), function(){
					DialogUtil.closeAll();
				});
			}
		}
	};
})();


