/**
 * 【url地址拦截】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var sysUrlPermissionEdit;
$(function() {
	sysUrlPermissionEdit = new SysUrlPermissionEdit();
	sysUrlPermissionEdit.init();
});

(function() {
	// 定义常量
	var _consts = {

	};
	/**
	 * 【url地址拦截 编辑】 对象
	 * 
	 * @returns {CommonScriptDialog}
	 */
	SysUrlPermissionEdit = function() {
		// 定义属性
		// 树
		this.scriptTree = null;
		// 运算符工具框

	};

	/**
	 * 方法
	 */
	SysUrlPermissionEdit.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			/**
			 * 监听 添加按钮
			 */
			$("#addSysUrlRule").click(function() {
				sysUrlPermissionEdit.addSysUrlRule();
			});
		},

		/**
		 * 打开添加拦截规则窗口
		 */
		addSysUrlRule : function() {
			var sysUrlPermissonId = $("#id").val();
			var url = __ctx + '/platform/system/urlRules/edit.htm?sysUrlId='
					+ sysUrlPermissonId;
			DialogUtil
					.dialog({
						title : '规则编辑',
						content : url,
						area : [ '60%', '68%' ],
						btn : [
								{
									label : '确定',
									classes : 'fa fa-check-circle',
									action : function(dialog, index) {
										/**
										 * 调用子窗口中确认方法
										 */
										DialogUtil.getChildFrameWindow().sysUrlRulesEdit
												.confirm(function(rtn) {
													if (rtn) {
														DialogUtil.close(index);
														window.location
																.reload(true);
													}
												});
									}
								},
								{
									label : '取消',
									classes : 'fa fa-times-circle',
									action : function(dialog, index) {
										/**
										 * 调用子窗口中取消方法
										 */
										DialogUtil.getChildFrameWindow().sysUrlRulesEdit
												.cancle(function(rtn) {
													if (rtn)
														DialogUtil.close(index);
												});
									}
								} ]
					});
		}
	};
})();
