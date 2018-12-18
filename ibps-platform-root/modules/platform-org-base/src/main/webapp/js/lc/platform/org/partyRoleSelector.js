/**
 * 角色选择框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyRoleSelector;
var single = window.isSingleSelector, groupsTree=null;
$(function() {
	partyRoleSelector = new PartyRoleSelector();
	partyRoleSelector.init();
});


(function() {
	var template = '<span class="attach-span" roleid="#roleid#" rolekey="#rolekey#" rolename="#rolename#">' +
								'<span title="#rolename#">#rolename#</a>' +
								'&nbsp;' +
								'<a class="btn btn-ms" title="移除" href="javascript:partyRoleSelector.remove(\'#roleid#\',\'#rolekey#\');"><i class="fa fa-remove"></i></a>' +
								'</span>'+
							'</span>';
	
	// 定义常量
	var _consts = {
			GRID : "#roleDialogGrid",// 列表对象
			PAGER :"#roleDialogPager",// 列表分页
			FORM : '#roleSelectForm'// 表单form
	};
	/**
	 * 角色选择框 对象
	 * 
	 * @returns {PartyRoleSelector}
	 */
	PartyRoleSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	PartyRoleSelector.prototype = {
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
			
			this._initRoleContainer();
		},
		_initRoleContainer : function(){
			if(!this.isSingle){
				$("div[name='role_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			_url = __ctx + '/platform/org/partyRole/listBySubSysJson.htm';
			for(var pn in me.data){
				if('url' == pn){
					_url = me.data.url;
				}
			}
			
			for(var pn in me.data){
				if('partyType' == pn){
					if(_url.indexOf('?') > 0) _url += '&partyType='+me.data.partyType;
					else _url += '?partyType='+me.data.partyType;
				}
				if('partyId' == pn){
					if(_url.indexOf('?') > 0) _url += '&partyId='+me.data.partyId;
					else _url += '?partyId='+me.data.partyId;
				}
			}
			
			this.grid.GridList({
							url : _url,
							pager : this.consts.PAGER,
							colNames : [
										'角色ID',
										'roleAlias',
										'角色',
										'子系统名称' ],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'roleAlias',
											index : 'ROLE_ALIAS_',
											hidden : true
										},
										{
											name : 'name',
											index : 'NAME_',
											width : 100
										},
										{
											name : 'subSystemName',
											index : 'subSystemName',
											width : 100
											,formatter : partyRoleSelector.format
										} ],
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
			id= data.id,
			key = data.roleAlias
			;
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
				if($(records[i]).attr("roleid")==data['id'] || $(records[i]).attr("rolekey")==data['roleAlias']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='role_container']").append($(html));
		},
		remove:function(id,key){
			var obj = null;
			if(id && "" != id) obj = $("span[roleid='"+id+"']");
			if(key && "" != key) obj = $("span[rolekey='"+key+"']");
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
				var id=data.id||"", key=data.roleAlias||"", name=data.name||"", 
					tmp=template .replaceAll("#roleid#", id).replaceAll("#rolekey#", key).replaceAll("#rolename#",name);
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
				var obj = {id:$(n).attr("roleid"), key:$(n).attr("rolekey"), name:$(n).attr("rolename")};
				aryData.push(obj);
			});
			return aryData;
		},
		format : function(cellvalue){ //cellvalue表示当前单元格的值
			if(cellvalue==null) return "全局角色";
			else return cellvalue ;
		}
	};
	
})();