/**
 * ibps_SCRIPT_COMMON【常用脚本】
 * 
 * <pre>
 * 作者：xu qiang
 * 邮箱：819842974@qq.com
 * 日期：2015-12-16 09:29:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var selectorDialog ;
$(function() {
	selectorDialog  = new CommonScriptSelectorDialog();
	selectorDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#commonScriptGrid",// 列表对象
			PAGER : "#commonScriptPager",// 列表分页
	};
	/**
	 * ibps_SCRIPT_COMMON【常用脚本】 对象
	 * @returns {CommonScript}
	 */
	CommonScriptSelectorDialog = function() {
		//定义属性
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	CommonScriptSelectorDialog.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this.grid.GridList(
					{
						url :  __ctx+'/platform/script/commonScript/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','脚本名称','脚本','脚本分类','备注'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'script',
				                	   index: 'script_',
				                	   hidden:true,
				                	 					                	 	}, {
				                 	   name:'category',
				                	   index: 'category_'
				                	 					                	 	}, {
				                 	   name:'memo',
				                	   index: 'memo_'
				                	 					                	 	} ]
	
					});
		},
		getSelectRow : function() {
			var grid = this.grid,record=[];
				ids = grid.jqGrid("getGridParam", 'selarrrow');
			for(var i=0;i<ids.length;i++){
				var data = grid.jqGrid("getRowData", ids[i]);
				record.push(data);
			}
			return record;
		},
	};
})();

function getData(){
	return selectorDialog.getSelectRow();
}


