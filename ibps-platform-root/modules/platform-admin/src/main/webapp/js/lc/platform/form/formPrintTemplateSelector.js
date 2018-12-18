/**
 * 表单打印模版
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formPrintTemplateSelector = new FormPrintTemplateSelector();
	formPrintTemplateSelector.init();
});


(function() {
	var template =
			'<span class="attach-span" data-id="#id#" data-name="#name#" >' +
					'<span title="#name#">#name#</a>' +
					'&nbsp;' +
					'<a class="btn btn-ms" title="移除" href="javascript:formPrintTemplateSelector.remove(\'#id#\');"><i class="fa fa-remove"></i></a>' +
					'</span>'+
				'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#formPrintTemplateGrid",// 列表对象
		PAGER :'#formPrintTemplatePager'
	};
	
	/**
	 * 业务对象定义 对象
	 * 
	 * @returns {FormPrintTemplateSelector}
	 */
	FormPrintTemplateSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	FormPrintTemplateSelector.prototype = {
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
			this.formKey = params.formKey;
			this.data = params.params;
			this._initGridList();
			this._initData()
			this._initContainer();
		},
		_initContainer : function(){
			if(!this.isSingle){
				$("div[name='selector_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me =this,url=__ctx+'/platform/form/formPrintTemplate/listJson.htm?Q^FORM_KEY_^S='+this.formKey;
			url = encodeURI(url);
			$(this.consts.GRID).GridList({
						url :  url,
						pager :this.consts.PAGER,
						colNames: ['主键','模板名称'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	},{
				                 	   name:'name',
				                	   index: 'name_'
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
				if($(records[i]).data("id")==data['id']){
					return; 
				}
			}
			// 展示演示
			var html = this.getHtml(data);
			$("div[name='selector_container']").append($(html));
		},
		remove:function(id){
			var obj = $("span[data-id='"+id+"']");
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
				var id=data.id, name=data.name, 
					tmp=template .replaceAll("#id#", id).replaceAll("#name#",name);
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
				var obj = {id:$(n).data("id"), name:$(n).data("name")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
	
})();