/**
 * API选择框
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var authApiSelector;
var single = window.isSingleSelector;
$(function() {
	authApiSelector = new AuthApiSelector();
	authApiSelector.init();
});

(function() {
	var template = '<span class="attach-span" appKey="#appKey#" apiKey="#apiKey#" apiUri="#apiUri#" limit="#limit#" testLimit="#testLimit#" >'+
						'<span title="#apiName#">#apiName#</a>'+
						'&nbsp;'+
						'<a class="btn btn-ms" title="移除" href="javascript:authApiSelector.remove(\'#apiKey#\');"><i class="fa fa-remove"></i></a>'+
						'</span>'+
					'</span>';
	
	// 定义常量
	var _consts = {
			GRID : "#authApiDialogGrid",// 列表对象
			PAGER :"#authApiDialogPager"// 列表分页
	};
	/**
	 * 应用选择框 对象
	 * 
	 * @returns {AuthApiSelector}
	 */
	AuthApiSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	AuthApiSelector.prototype = {
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
			this.grantKey = params.grantKey;
			this.data = params.params;
			
			this._initGridList();
			this._initData();
			this._initApiContainer();
		},
		_initApiContainer : function(){
			if(!this.isSingle){
				$("div[name='api_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,
				__url = __ctx + '/platform/auth/authAppApi/listGrantJson.htm?grantKey='+me.grantKey,
				__url = encodeURI(__url);
			
			this.grid.GridList({
				url : __url,
				pager : this.consts.PAGER,
				colNames : [
				            '应用key','API标识','API名称','API地址','频次','测试频次'
							],
					colModel : [
						{
		                 	   name:'appKey',
		                	   index: 'app_key_'

		                	 					                	 	}, {
		                 	   name:'apiKey',
		                	   index: 'api_key_',
		                	   key : true

		                	 					                	 	}, {
		                 	   name:'apiName',
		                	   index: 'api_name_'

		                	 					                	 	}, {
		                 	   name:'apiUri',
		                	   index: 'api_uri_'

		                	 					                	 	}, {
		                 	   name:'limit',
		                	   index: 'limit_'

		                	 					                	 	}, {
		                 	   name:'testLimit',
		                	   index: 'test_limit_'

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
			apiKey= data.apiKey
			;
			if (status) {//选中
				this.add(data);
			} else {//取消选中
				this.remove(apiKey);
			}
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1) $(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("apiKey")==data['apiKey']){
					return;
				}
			}
			// 展示
			var html = this.getHtml(data);
			$("div[name='api_container']").append($(html));
		},
		remove:function(apiKey){
			var obj = null;
			if(apiKey && "" != apiKey) obj = $("span[apiKey='"+apiKey+"']");
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
				var appKey=data.appKey||"", apiKey=data.apiKey||"", apiName=data.apiName||"", apiUri=data.apiUri||"", limit=data.limit||"", testLimit=data.testLimit||"", 
					tmp=template.replaceAll("#appKey#", appKey).replaceAll("#apiKey#", apiKey).replaceAll("#apiName#", apiName).replaceAll("#apiUri#", apiUri).replaceAll("#limit#", limit).replaceAll("#testLimit#", testLimit);
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
				var obj = {appKey:$(n).attr("appKey"), apiKey:$(n).attr("apiKey"), apiUri:$(n).attr("apiUri"), limit:$(n).attr("limit"), testLimit:$(n).attr("testLimit")};
				aryData.push(obj);
			});
			return aryData;
		},
		refreshGrid : function() {
			var me = this,
				__url = __ctx + '/platform/auth/authAppApi/listGrantJson.htm?grantKey='+me.grantKey,
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