/**
 * 应用选择框
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var authAppSelector;
var single = window.isSingleSelector;
$(function() {
	authAppSelector = new AuthAppSelector();
	authAppSelector.init();
});


(function() {
	var template = '<span class="attach-span" appKey="#appKey#" appName="#appName#">'+
						'<span title="#appName#">#appName#</a>'+
						'&nbsp;'+
						'<a class="btn btn-ms" title="移除" href="javascript:authAppSelector.remove(\'#appKey#\');"><i class="fa fa-remove"></i></a>'+
						'</span>'+
					'</span>';
	
	// 定义常量
	var _consts = {
			GRID : "#authAppDialogGrid",// 列表对象
			PAGER :"#authAppDialogPager"// 列表分页
	};
	/**
	 * 应用选择框 对象
	 * 
	 * @returns {AuthAppSelector}
	 */
	AuthAppSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	AuthAppSelector.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			
			this.hasInit = true;
			//初始参数
			var params = frameElement.dialog.params;
			this.isSingle = params.isSingle;
			this.data = params.params;
			
			this._initGridList();
			this._initData();
			this._initAppContainer();
		},
		_initAppContainer : function(){
			if(!this.isSingle){
				$("div[name='app_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,
				__url = __ctx + '/platform/auth/authApp/listJson.htm',
				__url = encodeURI(__url);
			
			this.grid.GridList({
				url : __url,
				pager : this.consts.PAGER,
				colNames : [
							'应用Key',
							'应用名'],
					colModel : [
						{
							name : 'appKey',
							index : 'app_key_',
							key : true
						},
						{
							name : 'appName',
							index : 'app_name_'
						}
					],
					multiboxonly:this.isSingle,
					onSelectAll : function(rowids, status) {
						me.onSelectAll(rowids,status);
					},
					onSelectRow : function(rowid, status) {
						me.onSelectRow(rowid,status);
					}
				});
		},
		onSelectAll : function(rowids, status) {
			for (var i = 0; i < rowids.length; i++) {
				this.onSelectRow(rowids[i], status);
			}
		},
		onSelectRow : function(rowid, status) {
			var grid = this.grid,
			data = grid.jqGrid("getRowData", rowid);
			appKey= data.appKey
			;
			if (status) {//选中
				this.add(data);
			} else {//取消选中
				this.remove(appKey);
			}
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1) $(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("appKey")==data['appKey']){
					return; 
				}
			}
			// 展示
			var html = this.getHtml(data);
			$("div[name='app_container']").append($(html));
		},
		remove:function(appKey){
			var obj = null;
			if(appKey && "" != appKey) obj = $("span[appKey='"+appKey+"']");
			if(null!=obj) obj.remove();
		},
		clearSelect:function(){
			var me = this;
			me.grid.trigger("reloadGrid");
		},
		/**
		 * 初始数据
		 */
		_initData:function(){
			if($.isEmpty(this.data))
				return;
			for(var i=0,c;c=this.data[i++];){
				this.add(c);
			}
		},
		getHtml:function(data){
			 var str ="";
				var appKey=data.appKey||"", appName=appKey, 
					tmp=template .replaceAll("#appKey#", appKey).replaceAll("#appName#", appName);
				str+=tmp;
			return str;
		},
		/**
		 * 回调获取数据
		 * @returns {Array}
		 */
		getData:function(){
			var data = $("span.attach-span");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = {appKey:$(n).attr("appKey"), appName:$(n).attr("appName")};
				aryData.push(obj);
			});
			return aryData;
		},
		refreshGrid : function(orgId) {
			var me = this,
				__url = __ctx + '/platform/auth/authApp/listJson.htm',
				__url = encodeURI(__url);
			
			this.grid.jqGrid('setGridParam', {
				url : __url,
				postData : {
				}, // 发送数据
				page : 1
			}).trigger("reloadGrid"); 
		}
	};
	
})();