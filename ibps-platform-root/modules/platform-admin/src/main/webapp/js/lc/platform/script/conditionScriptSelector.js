/**
 * 条件脚本
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-16 14:59:46
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var conditionScript;
$(function() {
	conditionScript = new ConditionScriptSelector();
	conditionScript.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#conditionScriptGrid",// 列表对象
		PAGER : "#conditionScriptPager",// 列表分页
	};
	/**
	 * 条件脚本 对象
	 * 
	 * @returns {ConditionScriptSelector}
	 */
	ConditionScriptSelector = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	ConditionScriptSelector.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this.grid=$(this.consts.GRID).GridList({
					url : __ctx + '/platform/script/conditionScript/listJson.htm',
					pager : this.consts.PAGER,
					multiselect : false,
					colNames : [ '主键', '脚本的别名', '脚本描述', 
							 '方法名', '方法描述','参数', '是否有效'],
					colModel : [
							{
								name : 'id',
								index : 'id_',
								hidden : true,
								key : true
							},
							{
								name : 'aliasName',
								index : 'alias_name_'
							},
							{
								name : 'aliasDesc',
								index : 'alias_desc_'
							},
							{
								name : 'methodName',
								index : 'method_name_'
							},
							{
								name : 'methodDesc',
								index : 'method_desc_'
							},
							{
								name : 'argument',
								hidden : true
							},
							{
								name : 'enable',
								index : 'enable_',
								formatter : function(cellvalue,
										options, row) {
									if (cellvalue == '1') {
										return '是';
									} else
										return '否';
								}
							}]

				});
		},
		getSelectRow : function() {
			var grid = this.grid,record=[],
				id = grid.jqGrid("getGridParam", 'selrow');
			return grid.jqGrid("getRowData", id);
		},
	};
})();

function getData(){
	console.info(conditionScript.getSelectRow());
	return conditionScript.getSelectRow();
}
