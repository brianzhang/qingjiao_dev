/**
 * 表单按钮
 */
if (!window.FormButtons) {
	window.FormButtons = {
	};
}

FormButtons.t = {
		buttons:{
			"search" : {
				label : "搜索",
				style : "btn-primary",
				icon : "fa fa-search",
				scope :[ 'toolbar','search'],
			},
			"resetSearch" : {
				label : "重置",
				style : "btn-danger",
				icon : "fa fa-undo",
				scope :[ 'toolbar','search'],
			},
			"moreSearch" : {
				label : "更多",
				style : "btn-primary",
				icon : "fa fa-ellipsis-h",
				scope :[ 'toolbar','search']
			},
			"add" : {
				label : "添加",
				style : "btn-primary",
				icon : "fa fa-add",
				scope : ['toolbar'],
				contextmenu : 'all'
			},
			"remove" : {
				label : "删除",
				style : "btn-primary",
				icon : "fa fa-remove",
				scope :  ["toolbar","manage"],
				contextmenu : 'sub'
			},
			"edit" : {
				label : "编辑",
				style : "btn-primary",
				icon : "fa fa-edit",
				scope : ["toolbar","manage"],
				contextmenu : 'sub'
			},
			"detail" : {
				label : "明细",
				style : "btn-primary",
				icon : "fa fa-detail",
				scope : ["toolbar","manage"],
				contextmenu : 'sub'
			},
			"batchModify" : {
				label : "批量修改",
				style : "btn-primary",
				icon : "fa fa-check-square-o",
				scope :  ['toolbar']
			},
			'import' : {
				label : "导入",
				style : "btn-primary",
				icon : "fa fa-import",
				scope :  ['toolbar']
			},
			'export' : {
				label : "导出",
				style : "btn-primary",
				icon : "fa fa-export",
				scope : ["toolbar"],
				dropdown : [ {
					label : '导出所有',
					alias : 'exportAll'
				}, {
					label : '导出选中',
					alias : 'exportSelected'
				}, {
					label : '导出当前页',
					alias : 'exportCurPage'
				} ]
			},
			"startFlow" : {
				label : "启动流程",
				style : "btn-primary",
				icon : "fa fa-send",
				scope : ["toolbar","manage","edit"]
			},			
			"defStartFlow" : {
				label : "自定义启动流程",
				style : "btn-primary",
				icon : "fa fa-send",
				scope : ["manage","edit"],
				canReAdd:true
			},
			"close" : {
				label : "关闭",
				style : "btn-default",
				icon : "fa fa-close",
				scope :  ["edit","detail"]
			},
			"save" : {
				label : "保存",
				style : "btn-primary",
				icon : "fa fa-save",
				scope : ["edit"]
			},
			"print" : {
				label : "打印",
				style : "btn-primary",
				icon : "fa fa-print",
				scope : ["toolbar","manage","edit","detail"]
			},
			"custom" : {
				label : "自定义",
				style : "btn-primary",
				icon : "fa fa-cog",
				scope : ["toolbar","manage","edit","detail","dialog"]
			},
			"ok" : {
				label : "确定",
				style : "btn-primary",
				icon : "fa fa-ok",
				scope :["dialog"]
			},
			"clean" : {
				label : "清空",
				style : "btn-success",
				icon : "fa fa-clean",
				scope :["dialog"]
			},
			"cleanSelected":{
				label : "清空选择",
				style : "btn-warning",
				icon : "fa fa-times-circle-o",
				scope : ["dialog"]
			},
			"cancel" : {
				label : "取消",
				style : "btn-danger",
				icon : "fa fa-cancel",
				scope : ["dialog"]
			},
			"refresh" : {
				label : "刷新",
				style : "btn-primary",
				icon : "fa fa-refresh",
				scope : ["toolbar"]
			},
			"expand" : {
				label : "展开",
				style : "btn-primary",
				icon : "fa fa-expand",
				scope :  ["toolbar"]
			},
			"compress" : {
				label : "收缩",
				style : "btn-primary",
				icon : "fa fa-compress",
				scope :  ["toolbar"]
			}
		
			
	},
	/**
	 * 是否有权限
	 */
	hasPermission : function(type,action){
		var positions = this.buttons[type]["scope"];
		if(!positions)
			return false;
		return $.inArray(action,positions) >-1;
	},
	/**
	 * 是否有按钮
	 */
	hasButton : function(type,action,position){
		var hasPermission = this.hasPermission(type,action);
    	if(!hasPermission)//没有权限
    		return false;	
    	if(!position || position == 'all' ||  position == action)
    		return true;
  		return false;
	},
	hasSearchPermission : function(type){
		return this.hasPermission(type,'search');
	}
};
