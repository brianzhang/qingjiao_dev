/**
 * 常用语 选择器
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：zhongjh
 * 邮箱地址：zjh20140614@163.com
 * 创建时间：2017-10-28 15:34:46
 *</pre>
 */
var bpmDialogStatment;
var single = window.isSingleSelector;
$(function() {
	bpmDialogStatment = new BpmDialogStatment();
	bpmDialogStatment.init();
});

(function() {
	var template = '<span class="attach-span" statmentid="#statmentid#" statmentkey="#statmentkey#" statmentname="#statmentname#">' +
						'<span title="#statmentname#">#statmentname#</a>' +
						'&nbsp;' +
						'<a class="btn btn-ms" title="移除" href="javascript:bpmDialogStatment.remove(\'#statmentid#\',\'#statmentkey#\');"><i class="fa fa-remove"></i></a>' +
						'</span>'+
					'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#bpmDialogStatmentGrid",// 列表对象
		PAGER :"#bpmDialogStatmentPager"// 列表分页
	};
	
	/**
	 * 常用语选择框 对象
	 * 
	 * @returns {BpmDialogStatment}
	 */
	BpmDialogStatment = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	BpmDialogStatment.prototype = {
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
			this.action = params.action;
			//初始化页面数据
			this._initGridList();
			this._initData();
			this._initGroupContainer();
		},
		_initGroupContainer : function(){
			if(!this.isSingle){
				$("div[name='statment_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var _url = __ctx + '/platform/bpmn/bpmCommonStatment/listForSelector.htm?curUser=true&action='+me.action;
			// 判断url参数是否存在
			for(var pn in me.data){
				if('url' == pn) _url = me.data.url;
			}
			
			this.grid.GridList({
							url : _url,
							pager : this.consts.PAGER,
							colNames : [
										'常用语ID',
										'内容',
										'操作类型',
										'是否默认'],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'value',
											index : 'VALUE_'
										},
										{
											name : 'action',
											index : 'ACTION_',
											width : 80,
											formatter : function(cellvalue,
													options, rowObject) {
												if (cellvalue == "agree") {
													return "同意";
												} else if (cellvalue == "oppose") {
													return "反对";
												} else if (cellvalue == "reject") {
													return "驳回";
												} else if (cellvalue == "rejectToStart") {
													return "驳回到发起人";
												} else if (cellvalue == "abandon") {
													return "弃权";
												} else if (cellvalue == "manualend") {
													return "人工终止";
												} else {
													return cellvalue;
												}
											}
										},
										{
											name : 'isDefault',
											index : 'IS_DEFAULT_',
											width : 80,
											formatter : function(cellvalue,
													options, rowObject) {
												if (cellvalue == "Y") {
													return "是";
												} else if (cellvalue == "N") {
													return "否";
												}
											}
										}],
										multiselect: false,//复选框
//										multiboxonly:this.isSingle,
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
				data = grid.jqGrid("getRowData", rowid),
				id= data.id,
				key= data.statmentAlias;
			if (status) {//选中
				this.add(data);
			} else {//取消选中
				this.remove(id,key);
			}
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1)
					$(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("statmentid")==data['id'] || $(records[i]).attr("statmentkey")==data['statmentAlias']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='statment_container']").append($(html));
		},
		remove:function(id, key){
			var obj = null;
			if(id && "" != id) obj = $("span[statmentid='"+id+"']");
			if(key && "" != key) obj = $("span[statmentkey='"+key+"']");
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
				var id=data.id||"", key=data.statmentAlias||"", name=data.value||"",
					tmp=template .replaceAll("#statmentid#", id).replaceAll("#statmentkey#", key).replaceAll("#statmentname#",name);
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
				var obj = {id:$(n).attr("statmentid"), key:$(n).attr("statmentkey"), name:$(n).attr("statmentname")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
})();