/**
 * 套红模板 选择框
 *
 *<pre> 
 * 构建组：ibps-platform-admin
 * 作者：Lium
 * 邮箱：1316679699@qq.com
 * 日期：2017年8月9日-上午11:21:15
 * 版权：广州流辰信息技术有限公司版权所有
 *</pre>
 */
var officeTemplateSelect;
$(function() {
	officeTemplateSelect = new OfficeTemplateSelect();
	officeTemplateSelect.init();
});

(function() {
	var template = '<span class="attach-span" templateid="#templateid#" templatekey="#templatekey#" templatetype="#templatetype#">' +
		'<span title="#templatekey#">#templatekey#</a>' +
		'&nbsp;' +
		'<a class="btn btn-ms" title="移除" href="javascript:officeTemplateSelect.remove(\'#templateid#\');"><i class="fa fa-remove"></i></a>' +
		'</span>'+
		'</span>';
	
	// 定义常量
	var _consts = {
		OTID : "#officeTemplateGrid",// 列表对象
		PAGER :"#officeTemplatePager"// 列表分页
	};
	
	/**
	 * 套红选择框 对象
	 * 
	 * @returns {PartyDialogGroup}
	 */
	OfficeTemplateSelect = function() {
		this.grid =$(this.consts.OTID);
	};

	/**
	 * 方法
	 */
	OfficeTemplateSelect.prototype = {
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
			//初始化页面数据
			this._initGridList();
			this._initData();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this.grid.GridList({
						url : __ctx + '/platform/office/officeTemplate/listJson.htm',
						pager : this.consts.PAGER,
						colNames : [
									'模板ID',
									'模板名',
									'模板类型'],
						colModel : [
									{
										name : 'id',
										index : 'id_',
										hidden : true,
										key : true
									},
									{
										name : 'name',
										index : 'NAME_'
									},
									{
										name : 'type',
										index : 'TYPE_',
										formatter: 'select',
				                        formatoptions: {
				                            value: {
				                                'plain': '普通模板',
				                                 'red': '套红模板'
				                             }
				                         }
								}],	
								multiselect: true,//复选框
								multiboxonly:this.isSingle,
								onSelectRow : function(rowid, status) {
									me.onSelectRow(rowid,status);
								}
				});
		},
		onSelectRow : function(rowid, status) {
			var grid = this.grid,
				data = grid.jqGrid("getRowData", rowid),
				id= data.id,
				key= data.name;
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
				if($(records[i]).attr("templateid")==data['id']){
					return; 
				}
			}

			var html = this.getHtml(data);
			$("div[name='template_container']").append($(html));
		},
		remove:function(id, key){
			var obj = null;
			if(id) obj = $("span[groupid='"+id+"']");
			if(key) obj = $("span[groupkey='"+key+"']");
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
				var id=data.id, key=data.name, type=data.type,
					tmp=template .replaceAll("#templateid#", id).replaceAll("#templatekey#", key).replaceAll("#templatetype#",type);
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
				var obj = {id:$(n).attr("templateid"), key:$(n).attr("templatekey"), type:$(n).attr("templatetype")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
})();