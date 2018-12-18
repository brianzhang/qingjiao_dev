/**
 * 表单复制
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-30 16:21:52
 *</pre>
 */
$(function() {
    formDefCopy = new FormDefCopy();
    formDefCopy.init();
});

(function() {
	//定义常量
	var _consts = {
			FORM :  '#formDefCopy'// 表单form
	};
	/**
	 * 表单复制 对象
	 * @returns {FormDef}
	 */
	FormDefCopy = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	FormDefCopy.prototype = {
			consts:_consts,
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
				var me = this, form = $(this.consts.FORM), frm = form.form();
				// 触发表单验证
				frm.valid();

			},
			saveForm:function(callback){
			    var loading = DialogUtil.load("保存中...");
				var me = this, form = $(this.consts.FORM), frm = form.form();
					frm.ajaxForm({
						success : function(responseText){
							DialogUtil.close(loading);
							me._showResponse(responseText,callback);
						}
					});
					if (frm.valid())
						form.submit();
					else{
						DialogUtil.close(loading);
						DialogUtil.toastr("请检查表单是否正确填写！")
					}
						
			},
			/**
			 * 表单成功返回信息
			 * 
			 * @param responseText
			 */
			_showResponse : function(responseText,callback) {
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.alert(msg.getMessage(),function(){
						callback(true);
					});
				} else {
					DialogUtil.error(msg.getMessage(),msg.getCause());
				}
			}

	};
	
})();