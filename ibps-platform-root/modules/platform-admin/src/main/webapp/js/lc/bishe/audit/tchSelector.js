/**
 * 人员选择框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var tchSelector;
var single = window.isSingleSelector, groupsTree=null;
$(function() {
	tchSelector = new stuSelector();
	tchSelector.init();
});


(function() {
	var template = '<span class="attach-span" userid="#userid#" account="#account#" fullname="#fullname#">' +
								'<span title="#account#">#account#</a>' +
								'&nbsp;' +
								'<a class="btn btn-ms" title="移除" href="javascript:partyEmployeeSelector.remove(\'#userid#\');"><i class="fa fa-remove"></i></a>' +
								'</span>'+
							'</span>';
	
	// 定义常量
	var _consts = {
			GRID : "#tchLabelGrid",// 列表对象
			PAGER :"#tchLabelPager",// 列表分页
			FORM : '#tchSelectForm'// 表单form
	};
	/**
	 * 人员选择框 对象
	 * 
	 * @returns {PartyEmployeeSelector}
	 */
	stuSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	stuSelector.prototype = {
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
			
			this._initPersonContainer();
		},
		_initPersonContainer : function(){
			if(!this.isSingle){
				$("div[name='person_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var _url = me.data.url;
			this.grid.GridList({
							url : _url,
							pager : this.consts.PAGER,
							colNames: ['主键',"姓名",'标签'],
					        colModel: [{
			                 	   name:'id',
			                	   index: 'id_'
			                	 	,hidden:true,key:true
			                	 	},
			                	 	{
							               name:'orgId',
							               index: 'orgId'

							                	 					                },{
							               name:'labelId',
							               index: 'labelId'

							                	 					                }],
										multiboxonly:this.isSingle,
										onSelectRow : function(rowid, status) {
											me.onSelectRow(rowid,status);
										},
										onSelectAll : function(aRowids, status) {
											me.onSelectAll(aRowids,status);
										}
						});
			
		},
		onSelectRow : function(rowid, status) {
			debugger;
			var grid = this.grid,
			data = grid.jqGrid("getRowData", rowid),
			id= data.id,
			key=data.orgId
			;
			
			if (status) {//选中
				this.add(data);
			} else {//取消选中
				this.remove(id,key);
			}
		},
		onSelectAll : function(aRowids, status) {
			for (var i = 0; i < aRowids.length; i++) {
				this.onSelectRow(aRowids[i], status);
			}
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1)
					$(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("userid")==data['id'] || $(records[i]).attr("account")==data['orgId']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='person_container']").append($(html));
		},
		remove:function(id,key){
			var obj = null;
			if(id) obj = $("span[userid='"+id+"']");
			if(key) obj = $("span[account='"+key+"']");
			if(null!=obj) obj.remove();
		},
		clearSelect:function(){
			this.grid.trigger("reloadGrid");
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
				var id=data.id, key=data.orgId, name=data.name, 
					tmp=template.replaceAll("#userid#", id).replaceAll("#account#", key).replaceAll("#fullname#",name);
				str+=tmp;
			return str;
		},
		/**
		 * 回调获取数据
		 * @returns {Array}
		 */
		getData:function(){
			debugger;
			var data = $("span.attach-span");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = {id:$(n).attr("userid"), username:$(n).attr("account"),fullname:$(n).attr("fullname")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
})();