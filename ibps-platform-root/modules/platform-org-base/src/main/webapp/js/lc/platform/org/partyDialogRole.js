/**
 * 角色选择器
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyDialogRole;
var single = window.isSingleSelector, partyOrgTree=null;
$(function() {
	partyDialogRole = new PartyDialogRole();
	partyDialogRole.init();
});

(function() {
	var template = '<span class="attach-span" roleid="#roleid#" rolename="#rolename#" rolekey="#rolekey#">' +
								'<span title="#rolename#">#rolename#</a>' +
								'&nbsp;' +
								'<a class="btn btn-ms" title="移除" href="javascript:partyDialogRole.remove(\'#roleid#\',\'#rolekey#\');"><i class="fa fa-remove"></i></a>' +
								'</span>'+
							'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#partyDialogRoleGrid",// 列表对象
		PAGER :"#partyDialogRolePager",// 列表分页
		FORM : '#partyDialogRoleForm'// 表单form
	};
	
	/**
	 * 角色选择框 对象
	 * 
	 * @returns {PartyDialogRole}
	 */
	PartyDialogRole = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	PartyDialogRole.prototype = {
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
			this.data = params.params;
			//初始化页面数据
			this._initGridList();
			this._initCheckMyself();
			this._initRoleContainer();
			this._initData();
		},
		_initRoleContainer : function(){
			if(!this.isSingle){
				$("div[name='role_container']").height("80px");
			}
		},
		_initCheckMyself : function(){
			var me = this;
			var $obj = $("#tbl_myself");
			$(':checkbox', $obj).on('click',function(event){
				event.stopPropagation();
				
				var val = $(this).val();
				var id_name = val.split(',');
				if($(this).is(':checked')){
					var data = {id: id_name[0], name: id_name[1], roleAlias : id_name[2]};
					me.add(data);
				}else{
					me.remove(id_name[0],id_name[2]);
				}
			});
			
			$("tr", $obj).on("click", function(){
				var chkbox = $(this).find(":checkbox");
				$(chkbox).click();
			});
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var _url = __ctx + '/platform/org/partyRole/listJson.htm';
			// 判断url参数是否存在
			for(var pn in me.data){
				if('url' == pn) _url = me.data.url;
			}
			
			this.grid.GridList({
							url : _url,
							pager : this.consts.PAGER,
							colNames : [
										'ID',
										'名称',
										'别名',
										'子系统'],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'name_'
										},
										{
											name : 'roleAlias',
											index : 'role_alias_'
										},
										{
											name : 'subSystemName',
											index : 'subSystemName'
										}],
										multiselect: true,//复选框
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
				key= data.roleAlias
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
			// 角色展示演示
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
				var id=data.id||"", name=data.name||"", key=data.roleAlias||"", 
					tmp=template .replaceAll("#roleid#", id).replaceAll("#rolename#",name).replaceAll("#rolekey#",key);
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
				var obj = {roleid:$(n).attr("roleid"), rolename:$(n).attr("rolename"), rolekey : $(n).attr("rolekey")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
})();