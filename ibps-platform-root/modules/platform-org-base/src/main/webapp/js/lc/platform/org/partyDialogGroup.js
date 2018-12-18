/**
 * 用户组选择器
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyDialogGroup;
var single = window.isSingleSelector;
$(function() {
	partyDialogGroup = new PartyDialogGroup();
	partyDialogGroup.init();
});

(function() {
	var template = '<span class="attach-span" groupid="#groupid#" groupkey="#groupkey#" groupname="#groupname#">' +
						'<span title="#groupname#">#groupname#</a>' +
						'&nbsp;' +
						'<a class="btn btn-ms" title="移除" href="javascript:partyDialogGroup.remove(\'#groupid#\',\'#groupkey#\');"><i class="fa fa-remove"></i></a>' +
						'</span>'+
					'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#partyDialogGroupGrid",// 列表对象
		PAGER :"#partyDialogGroupPager"// 列表分页
	};
	
	/**
	 * 用户选择框 对象
	 * 
	 * @returns {PartyDialogGroup}
	 */
	PartyDialogGroup = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	PartyDialogGroup.prototype = {
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
			this._initGroupContainer();
		},
		_initGroupContainer : function(){
			if(!this.isSingle){
				$("div[name='group_container']").height("80px");
			}
		},
		/*_initCheckMyself : function(){
			var me = this;
			var $obj = $("#tbl_myself");
			$(':checkbox', $obj).on('click',function(event){
				event.stopPropagation();
				
				if($(this).is(':checked')){
					var data = {id: __currentUserId, fullname: __currentFullname, account: __currentAccount};
					me.add(data);
				}else{
					me.remove(__currentUserId,__currentAccount);
				}
			});
			
			$("tr", $obj).on("click", function(){
				var chkbox = $(this).find(":checkbox");
				$(chkbox).click();
			});
		},*/
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var _url = __ctx + '/platform/org/partyGroup/listJson.htm';
			// 判断url参数是否存在
			for(var pn in me.data){
				if('url' == pn) _url = me.data.url;
			}
			
			this.grid.GridList({
							url : _url,
							pager : this.consts.PAGER,
							colNames : [
										'组ID',
										'组别名',
										'组名称'],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'groupAlias',
											index : 'group_alias_'
										},
										{
											name : 'name',
											index : 'name_'
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
				data = grid.jqGrid("getRowData", rowid),
				id= data.id,
				key= data.groupAlias;
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
				if($(records[i]).attr("groupid")==data['id'] || $(records[i]).attr("groupkey")==data['groupAlias']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='group_container']").append($(html));
		},
		remove:function(id, key){
			var obj = null;
			if(id && "" != id) obj = $("span[groupid='"+id+"']");
			if(key && "" != key) obj = $("span[groupkey='"+key+"']");
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
				var id=data.id||"", key=data.groupAlias||"", name=data.name||"",
					tmp=template .replaceAll("#groupid#", id).replaceAll("#groupkey#", key).replaceAll("#groupname#",name);
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
				var obj = {id:$(n).attr("groupid"), key:$(n).attr("groupkey"), name:$(n).attr("groupname")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
})();