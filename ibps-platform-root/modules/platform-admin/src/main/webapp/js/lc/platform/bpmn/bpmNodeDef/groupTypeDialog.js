/**
 * 用户组属性选择组类型弹出框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */

$(function() {
	groupTypeDialog  = new GroupTypeDialog();
	groupTypeDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#groupPropForm",// 表单对象
	};
	/**
	 * 
	 * @returns {GroupPropDialog}
	 */
	GroupTypeDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GroupTypeDialog.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//
				this._init();

		},
		/**
		 * 初始表单
		 */
		_init : function() {
			
		},
		
	};
})();

/**
 * 获取数据
 */
 function getData(){
	var dimensionKey = $("#dimensionKey").val();
	var dimensionName = $("#dimensionKey").children('option:selected').text();
	var data = {
			groupType:dimensionKey,
			groupName:dimensionName
	}
	 return data;
 }

