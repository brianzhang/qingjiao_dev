/**
 * 数据模版对话框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	dataTemplateSelector = new DataTemplateSelector();
	dataTemplateSelector.init();
});


(function() {
	var template =
		'<span class="attach-span" name="dataTemplate-span" data-id="#id#" data-key="#key#" data-name="#name#">' +
				'<span title="#name#">#name#</a>' +
				'&nbsp;' +
				'<a class="btn btn-ms" title="移除" href="javascript:dataTemplateSelector.remove(\'#id#\',\'#key#\');"><i class="fa fa-remove"></i></a>' +
				'</span>'+
			'</span>';

	// 定义常量
	var _consts = {
		GRID : "#dataTemplateGrid",// 列表对象
		PAGER :'#dataTemplatePager'
	};
	/**
	 * 数据模版定义 对象
	 * 
	 * @returns {DataTemplateSelector}
	 */
	DataTemplateSelector = function() {
		this.grid =$(this.consts.GRID);
	
	};

	/**
	 * 方法
	 */
	DataTemplateSelector.prototype = {
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
			this.gridUrl = params.gridUrl?params.gridUrl:(__ctx+ '/platform/data/dataTemplate/listJson.htm');
			this.data = null;
			if(!$.isEmpty(this.params))
				this.data = this.params.data;
			this._initContainer()
			this._initGridList();
			this._initData();
		},
		_initContainer : function(){
			if(!this.isSingle){
				$("div[name='dataTemplate_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,url= this.gridUrl+"?Q^show_type_^S="+this.params.type;
			url = encodeURI(url);
			this.grid.GridList({
								url :url,
								pager : this.consts.PAGER,
								colNames: ['主键','名称','业务主键','类型'],
						        colModel: [{
						                 	   name:'id',
						                	   index: 'id_',
						                	 	hidden:true,
						                	 	key:true
						               }, {
						                 	   name:'name',
						                	   index: 'name_'
						              }, {
						                 	   name:'key',
						                	   index: 'key_'
						              },{
						                 	   name:'showType',
						                	   index: 'show_type_',
						                	   formatter : 'dataFormat',
						                	   formatoptions : {
													value : [{
														name:"list",
														value:'列表',
														css:'red'
													},{
														name:"tree",
														value:'树形',
														css:'green'
													}]
												}
						             } ],
										multiboxonly:this.isSingle,
										onSelectAll : function(rowids, status) {
											me.onSelectAll(rowids,status);
										},
										onSelectRow : function(rowid, status) {
												me.onSelectRow(rowid,status);
										},
										loadBeforeSend : function() {
											if(me.isSingle){
												$('#cb_dataTemplateGrid').hide();
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
			var records = $("[name='dataTemplate-span']");
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
			$("div[name='dataTemplate_container']").append($(html));
		},
		remove:function(id,key){
			var obj,val;
			if(dataTemplateSelector.pkKey == 'id'){
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
			var data =  $("[name='dataTemplate-span']");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = $(n).data();
				aryData.push(obj);
			});
			return aryData;
		}
	};
	
})();