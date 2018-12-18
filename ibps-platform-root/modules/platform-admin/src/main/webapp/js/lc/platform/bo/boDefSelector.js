/**
 * 业务对象定义
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	boDefSelector = new BoDefSelector();
	boDefSelector.init();
});


(function() {
	var template =
			'<span class="attach-span" boid="#boid#" bocode="#bocode#" boname="#boname#" bodesc="#bodesc#" boversion="#boversion#">' +
					'<span title="#boname#">#boname#</a>' +
					'&nbsp;' +
					'<a class="btn btn-ms" title="移除" href="javascript:boDefSelector.remove(\'#boid#\');"><i class="fa fa-remove"></i></a>' +
					'</span>'+
				'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#boDefGrid",// 列表对象
		PAGER :'#boDefPager'
	};
	
	/**
	 * 业务对象定义 对象
	 * 
	 * @returns {BoDefSelector}
	 */
	BoDefSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	BoDefSelector.prototype = {
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
			this.type = params.type;
			this.table = params.table;
			this.data = params.params;
			this._initGridList();
			this._initData()
			this._initBoContainer();
		},
		_initBoContainer : function(){
			if(!this.isSingle){
				$("div[name='bo_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,
				url = __ctx + '/platform/bo/boDef/listJson.htm';
			
			if('' != this.type && 0 < this.type.length){
				if(url.indexOf('?') > 0){
					url += '&Q^BO_TYPE_^S=' + this.type;
				}else{
					url += '?Q^BO_TYPE_^S=' + this.type;
				}
			}
			
			if('' != this.table && 0 < this.table.length){
				if(url.indexOf('?') > 0){
					url += '&Q^IS_CREATE_TABLE_^S=' + this.table;
				}else{
					url += '?Q^IS_CREATE_TABLE_^S=' + this.table;
				}
			}
			
			url = encodeURI(url);
			
			this.grid.GridList({
				url : url,
				pager : this.consts.PAGER,
				colNames : [ '定义ID', '名称','编码','版本号','生成表'],
				colModel : [
						{
							name : 'id',
							index : 'ID_',
							hidden : true,
							key : true
						},{
							name : 'name',
							index : 'NAME_'
						},{
							name : 'code',
							index : 'CODE_'
						},{
							name : 'version',
							index : 'VERSION_'
						},{
							name:'isCreateTable',
							index:'IS_CREATE_TABLE_',
							formatter : 'select',
							formatoptions : {
								value : {
									'Y' : '<font color="red">是</font>',
									'N' :'<font color="green">否</font>'
								}
							}
						}],
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
			id= data.id;
			if (status) {//选中
				this.add(data);
			} else {//取消选中
				this.remove(id);
			}
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1)
					$(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("boid")==data['id']){
					return; 
				}
			}
			// 展示演示
			var html = this.getHtml(data);
			$("div[name='bo_container']").append($(html));
		},
		remove:function(id){
			var obj = $("span[boid='"+id+"']");
			obj.remove();
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
				var id=data.id, name=data.name, desc=data.desc, code=data.code, version=data.version, 
					tmp=template .replaceAll("#boid#", id).replaceAll("#bocode#",code).replaceAll("#boname#",name).replaceAll("#bodesc#",desc).replaceAll("#boversion#",version);
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
				var obj = {id:$(n).attr("boid"), code:$(n).attr("bocode"), name:$(n).attr("boname"), desc:$(n).attr("bodesc"), version:$(n).attr("boversion")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
	
})();