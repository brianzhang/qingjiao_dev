$(function() {
	boDefExport = new BoDefExport();
	boDefExport.init();
});

(function() {
	// 定义常量
	var _consts = {
		UP_BODEF_GRID:"#upBoDefGrid",
		CURR_BODEF_GRID:"#currBoDefGrid",
		SUB_BODEF_GRID:"#subBoDefGrid"
	};
	/**
	 * bo导出 对象
	 * 
	 * @returns {BoDefExport}
	 */
	BoDefExport = function() {
		this.jsonData = {};/*{3322233:{p:[333,333],s:[34234,344]}}*/
		this.upDataUrl = __ctx + '/platform/bo/boDef/listJsonBySid.htm';
		this.subDataUrl = __ctx + '/platform/bo/boDef/listJsonByPid.htm';
	};
	/**
	 * 方法
	 */
	BoDefExport.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			this._initJsonData();
			this._initLayout();
			this._initCurrBoDefGridList();
			this._initUpBoDefGridList('');
			this._initSubBoDefGridList('');
		},
		_initJsonData : function(){
			var idArr = $("#ids").val().split(',');
			for(var i = 0, len = idArr.length; i < len; i ++){
				this.jsonData[idArr[i]] = {p:[],s:[]};
			}
		},
		_initLayout : function(){
			// 初始化布局
			var layout = $('body').layout({
				applyDefaultStyles : true
			});
			layout.sizePane("west", "33%");
			layout.sizePane("center", "33%");
			layout.sizePane("east", "33%");
		},
		/**
		 * 初始化导出对象列表
		 */
		_initCurrBoDefGridList : function(){
			var me = this;
			this.currBoDefGrid = $(this.consts.CURR_BODEF_GRID).GridList({
				url : __ctx + '/platform/bo/boDef/listJsonByIds.htm?ids='+$("#ids").val(),
				colNames : [ 'ID','对象名称'],
				colModel : [{name:'id',
							index : 'ID_',
							hidden : true,
							key : true},
			            	{name : 'name', index : 'NAME_'}
							],
				multiboxonly: true,
				onSelectRow : function(rowid, status) {
					me.onSelectCurrRow(rowid, status);
				}
			});
		},
		onSelectCurrRow : function(rowid, status) {
			var me = this,
				data = this.currBoDefGrid.jqGrid("getRowData", rowid),
				id= data.id;
			
			if (status) {//选中
				/*{3322233:{p:[333,333],s:[34234,344]}}*/
				var jData = this.jsonData[id];
				
				this.upBoDefGrid.jqGrid('setGridParam', {
					url : this.upDataUrl,
					postData : {id:id}, // 发送数据
					loadComplete : function(){
						try{
							var pData = jData.p;
							if(!$.isEmptyObject(pData)){
								for(var i = 0,ln = pData.length; i < ln; i++){
									me.upBoDefGrid.jqGrid('setSelection', pData[i], false);
								}
							}
						}catch(e){}
					}
				}).trigger("reloadGrid"); // 重新载入
				
				this.subBoDefGrid.jqGrid('setGridParam', {
					url : this.subDataUrl,
					postData : {id:id}, // 发送数据
					loadComplete : function(){
						try{
							var sData = jData.s;
							if(!$.isEmptyObject(sData)){
								for(var i = 0,ln = sData.length; i < ln; i++){
									me.subBoDefGrid.jqGrid('setSelection', sData[i], false);
								}
							}
						}catch(e){}
					}
				}).trigger("reloadGrid"); // 重新载入
			}
		},
		/**
		 * 初始化选中导出对象的父对象列表
		 */
		_initUpBoDefGridList : function(id){
			var me = this;
			this.upBoDefGrid = $(this.consts.UP_BODEF_GRID).GridList({
				url : me.upDataUrl,
				colNames : [ 'ID','对象名称'],
				colModel : [{name:'id',index : 'ID_',
							hidden : true,
							key : true},
							{name : 'name', index : 'NAME_'}
							],
				multiboxonly: false,
				onSelectRow : function(rowid, status) {
					me.onSelectUpRow(rowid, status);
				},
				onSelectAll : function(aRowids, status) {
					me.onSelectUpAll(aRowids, status);
				}
			});
		},
		onSelectUpRow : function(rowid, status) {
			var cid = this.currBoDefGrid.jqGrid("getGridParam", 'selrow'),
				data = this.upBoDefGrid.jqGrid("getRowData", rowid),
				pid= data.id;
			
			var cpArr = this.jsonData[cid].p;
			if (status) {//选中
				cpArr.push(pid);
			}else {//取消
				var index = $.inArray(pid, cpArr);
				if(index >= 0){
					cpArr.splice(index, 1);
				}
			}
			this.jsonData[cid].p = cpArr;
		},
		onSelectUpAll : function(aRowids, status) {
			for (var i = 0; i < aRowids.length; i++) {
				this.onSelectUpRow(aRowids[i], status);
			}
		},
		/**
		 * 初始化选中导出对象的子对象列表
		 */
		_initSubBoDefGridList : function(id){
			var me = this;
			this.subBoDefGrid = $(this.consts.SUB_BODEF_GRID).GridList({
				url : me.subDataUrl,
				colNames : [ 'ID','对象名称'],
				colModel : [{name:'id',index : 'ID_',
							hidden : true,
							key : true},
							{name : 'name', index : 'NAME_'}
							],
				multiboxonly: false,
				onSelectRow : function(rowid, status) {
					me.onSelectSubRow(rowid, status);
				},
				onSelectAll : function(aRowids, status) {
					me.onSelectSubAll(aRowids, status);
				}
			});
		},
		onSelectSubRow : function(rowid, status) {
			var cid = this.currBoDefGrid.jqGrid("getGridParam", 'selrow'),
				data = this.subBoDefGrid.jqGrid("getRowData", rowid),
				sid= data.id;
			
			var csArr = this.jsonData[cid].s;
			if (status) {//选中
				csArr.push(sid);
			}else {//取消
				var index = $.inArray(sid, csArr);
				if(index >= 0){
					csArr.splice(index, 1);
				}
			}
			this.jsonData[cid].s = csArr;
		},
		onSelectSubAll : function(aRowids, status) {
			for (var i = 0; i < aRowids.length; i++) {
				this.onSelectSubRow(aRowids[i], status);
			}
		},
		/**
		 * 获取数据 并返回
		 * @return string
		 */
		getData : function() {
			var jsonDataArr = [];
			var idStr = '';
			for(var cid in this.jsonData){
				/*this.jsonData[cid]={3322233:{p:[333,333],s:[34234,344]}}*/
				idStr = '';
				idStr += cid;
				idStr += ':';
				idStr += this.jsonData[cid].p.join(",");
				idStr += ':';
				idStr += this.jsonData[cid].s.join(",");
				
				jsonDataArr.push(idStr);
			}
			
			return jsonDataArr.join(';');
		}
	};
})();
