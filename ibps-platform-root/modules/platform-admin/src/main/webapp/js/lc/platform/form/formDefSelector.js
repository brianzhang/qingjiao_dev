/**
 * 表单定义对话框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefSelector = new FormDefSelector();
	formDefSelector.init();
});


(function() {
	var template =
		'<span class="attach-span" data-id="#id#" data-key="#key#" data-name="#name#">' +
				'<span title="#name#">#name#</a>' +
				'&nbsp;' +
				'<a class="btn btn-ms" title="移除" href="javascript:formDefSelector.remove(\'#id#\',\'#key#\');"><i class="fa fa-remove"></i></a>' +
				'</span>'+
			'</span>';

	// 定义常量
	var _consts = {
		GRID : "#formDefGrid",// 列表对象
		PAGER :'#formDefPager'
	};
	/**
	 * 业务对象定义 对象
	 * 
	 * @returns {FormDefSelector}
	 */
	FormDefSelector = function() {
		this.grid =$(this.consts.GRID);
	
	};

	/**
	 * 方法
	 */
	FormDefSelector.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			var params = frameElement.dialog.params;
			this.isSingle = params.isSingle;
			this.pkKey = params.pkKey?params.pkKey:'id';
			this.params = params.params;
			this.gridUrl = params.gridUrl?params.gridUrl:(__ctx+ '/platform/form/formDef/listJson.htm');
			this.data = null;
			if(!$.isEmpty(this.params))
				this.data = this.params.data;
			this._initContainer()
			this._initGridList();
			this._initData();
		},
		_initContainer : function(){
			if(!this.isSingle){
				$("div[name='form_container']").height("80px");
			}
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
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this.grid.GridList({
								url :this.gridUrl,
								pager : this.consts.PAGER,
								colNames : [ '表单ID','表单key', '表单名称','表单类型', '表单状态', '创建时间','更新时间'],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},{
											name : 'key',
											hidden : true
										},{
											name : 'name',
											index : 'NAME_'
										},{
											name : 'formType',
											index : 'FORM_TYPE_'
										},{
											name:'status',
											index:'STATUS_',
											formatter : 'select',
											formatoptions : {
												value : {
													'draft' : '<font color="red">草稿</font>',
													'deploy' :'<font color="green">发布</font>'
												}
											}
										},{
											name:'createTime',
											index:'CREATE_TIME_',
											formatter : "timestamp"
										},{
											name:'updateTime',
											index:'UPDATE_TIME_',
											formatter : "timestamp"
										}
										],
										multiboxonly:this.isSingle,
										onSelectAll : function(rowids, status) {
											me.onSelectAll(rowids,status);
										},
										onSelectRow : function(rowid, status) {
												me.onSelectRow(rowid,status);
										},
										loadBeforeSend : function() {
											if(me.isSingle){
												$('#cb_formDefGrid').hide();
											}
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
				if($(records[i]).data(this.pkKey)==data[this.pkKey]){
					return; 
				}
			}
			// 展示演示
			var html = this.getHtml(data);
			$("div[name='form_container']").append($(html));
		},
		remove:function(id,key){
			var obj,val;
			if(formDefSelector.pkKey == 'id'){
				val = id;
			}else{
				val = key;
			}
			obj = $("span[data-"+this.pkKey+"='"+val+"']");
			obj.remove();
		},
		getHtml:function(data){
			 var str ="",
			 	id=data.id?data.id:"", name=data.name?data.name:"", key=data.key?data.key:"", 
				tmp=template .replaceAll("#id#", id).replaceAll("#key#",key).replaceAll("#name#",name);
				str+=tmp;
			return str;
		},
		/**
		 * 初始数据
		 */
		_initData:function(){
			if($.isEmpty(this.data) || this.data.length <=0)
				return;
			for(var i=0,c;c=this.data[i++];){
				this.add(c);
			}
		},
		/**
		 * 回调获取数据
		 * @returns {Array}
		 */
		getData:function(){
			var data = $("span.attach-span");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = $(n).data();
				aryData.push(obj);
			});
			return aryData;
		}
	};
	
})();