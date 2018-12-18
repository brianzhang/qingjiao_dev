/**
 * 
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var sameNodeDialog;
var data = frameElement.dialog.params;
$(function() {
	sameNodeDialog  = new SameNodeDialog();
	sameNodeDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : "#sameNodeForm",// 列表对象
	};
	/**
	 * 
	 * @returns {CusersDialog}
	 */
	SameNodeDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	SameNodeDialog.prototype = {
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
			if(data.initData){
				var jsonData = JSON2.parse(data.initData);
				$('select#nodeId').val(jsonData.nodeId);
			}
		},
	};
})();

/**
 * 获取数据
 */
 function getData(){
	 var nodeId = $('select#nodeId option:selected').val();
	 var nodeName = $('select#nodeId option:selected').text();
	 var retultData={
			 nodeId:nodeId,
			 nodeName:nodeName
	 };
	 return retultData;
 }

