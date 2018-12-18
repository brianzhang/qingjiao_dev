/**
 * 人员选择器
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyDialogPerson;
var single = window.isSingleSelector, partyOrgTree=null;
$(function() {
	partyDialogPerson = new PartyDialogPerson();
	partyDialogPerson.init();
	
	$("#entity").change(function(){
		partyDialogPerson = new PartyDialogPerson();
		partyDialogPerson.init();
	});
	$("#inclueChild").click(function(){
		partyDialogPerson = new PartyDialogPerson();
		partyDialogPerson.init();
	});
});

(function() {
	var template = '<span class="attach-span" userid="#userid#" fullname="#fullname#" account="#account#">' +
						'<span title="#fullname#">#fullname#</a>' +
						'&nbsp;' +
						'<a class="btn btn-ms" title="移除" href="javascript:partyDialogPerson.remove(\'#userid#\',\'#account#\');"><i class="fa fa-remove"></i></a>' +
						'</span>'+
					'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#partyDialogPersonGrid",// 列表对象
		PAGER :"#partyDialogPersonPager",// 列表分页
		FORM : '#partyDialogPersonForm',// 表单form
			
		TREE_ID : 'partyOrgTree',// 树
		TREE : '#partyOrgTree'// 树的ID
	};
	
	/**
	 * 用户选择框 对象
	 * 
	 * @returns {PartyDialogPerson}
	 */
	PartyDialogPerson = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	PartyDialogPerson.prototype = {
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
			this.orgId = params.orgid;
			this.isSingle = params.isSingle;
			this.type = params.type;
			this.data = params.params;
			//初始化页面数据
			this._initTree();
			this._initGridList();
			this._initData();
			this._initCheckMyself();
			this._initPersonContainer();
			this._initScope();
			this._initSearchEvent();
		},
		_initPersonContainer : function(){
			if(!this.isSingle){
				$("div[name='person_container']").height("80px");
			}
		},
		_initCheckMyself : function(){
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
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var _url = __ctx + '/platform/org/partyUser/dialogUserJson.htm';
			// 判断url参数是否存在
			for(var pn in me.data){
				if('url' == pn) _url = me.data.url;
			}
			
			var params = 'type='+me.type;
			if(me.type == 3 || me.type == '3') params += '&orgId='+me.orgId;
			if(_url.indexOf('?') > 0) _url += '&'+params;
			else _url += '?' + params;
			
			this.grid.GridList({
							url : _url,
							pager : this.consts.PAGER,
							colNames : [
										'用户ID',
										'姓名',
										'账号'],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'fullname',
											index : 'full_name_'
										},
										{
											name : 'account',
											index : 'account_'
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
		_initScope : function(){
			var me = this;
			if(me.type == 3 || me.type == '3')
				$("#entity option[value='role']").remove();
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
				key= data.account;
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
				if($(records[i]).attr("userid")==data['id'] || $(records[i]).attr("account")==data['account']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='person_container']").append($(html));
		},
		remove:function(id,key){
			var obj = null;
			if(id && "" != id) obj = $("span[userid='"+id+"']");
			if(key && "" != key) obj = $("span[account='"+key+"']");
			if(null!=obj) obj.remove();
		},
		clearSelect:function(){
			var me = this;
			me.grid.trigger("reloadGrid");
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			//初始化布局
			var me = this;
			// 树
			this.partyOrgTree =null;
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){
				me._treeFrameResize();
			});
			// 判断url参数是否存在
			for(var pn in me.data){
				if('entityId' == pn) {
					var __entityId = me.data.entityId;
					switch (__entityId) {
					case 'org':
						$("#entity").html("<option value=\"org\" >组织</option>");
						$("#entity").val('org');
						break;
					case 'role':
						$("#entity").html("<option value=\"role\" >角色</option>");
						$("#entity").val('role');
						break;
					case 'position':
						$("#entity").html("<option value=\"position\" >岗位</option>");
						$("#entity").val('position');
						break;

					default:
						break;
					}
				}
			}
			this.loadTree();
	        //初始化滚动
	        this.initLeftScroll();
			this.initTreeToolbar();
		},
		initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.partyOrgTree.expandAll(true);
				} else{
					me.partyOrgTree.expandAll(false);	
				}
			});
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-155);
		},
		// 加载树
		loadTree:function (){
			var me = this;
			this.entityId=$("#entity").val();
			this._treeRootId=0;
			this.expandByDepth = 1;
			var setting = {
				async: {enable: false},
				data: {
					key:{name:"name"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId"
					}
				},
				view: {
					selectedMulti: false,
					showIconFont:true
				},
				edit: {
					drag: {
						prev: false,inner: false,next: false,isMove:false
					},
					enable: true,
					showRemoveBtn: false,
					showRenameBtn: false
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
						me.treeOnLeftClick(me,treeNode);	
					},
					onRightClick : null,
					beforeDrop: null,
					onDrop: null
				}
			};
			
			var url = __ctx+"/platform/org/partyOrg/getTreeData.htm";
			if(me.entityId == 'position'){
				url = __ctx+"/platform/org/partyPosition/getTreeData.htm";
			}else if(me.entityId == 'role'){
				url = __ctx+"/platform/org/partyRole/getTreeData.htm";
			}
			var params = {type: me.type};
			if(me.type == 3 || me.type == '3') params ={type: me.type, orgId : me.orgId};
			
			$.post(url, params, function(result){
				me.partyOrgTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.partyOrgTree.getNodesByFilter(function(node){
		                return (node.level <=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.partyOrgTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.partyOrgTree.expandAll(true);
		        }
			});
		},
		treeOnLeftClick:function(me, treeNode) {
			orgId = treeNode.id;
			if(orgId != 0 && orgId != '0')
				me.refreshGrid(treeNode.id);
			else{
				var chds = treeNode.children;
				if(chds.length > 0) me.refreshGrid(chds[0].id);
			}
		},
		/**
		 * 左侧菜单的滚动
		 */
		initLeftScroll:function(){
	    	$(_consts.TREE).niceScroll({
	    		horizrailenabled : false,
	    		cursorborder : "0",
	    		cursorwidth : "6px",
	    		cursorcolor : "#2A2A2A",
	    		zindex : "5555",
	    		autohidemode : true,
	    		bouncescroll : true,
	    		mousescrollstep : '40',
	    		scrollspeed : '100',
	    		background : "#999",
	    		cursoropacitymax : "0.6",
	    		cursorborderradius : "0"
	    	});
	    	$(_consts.TREE).getNiceScroll().resize();
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
				var id=data.id||"", name=data.fullname||"", account=data.account||"",
					tmp=template .replaceAll("#userid#", id).replaceAll("#fullname#",name).replaceAll("#account#",account);
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
				var obj = {userid:$(n).attr("userid"), fullname:$(n).attr("fullname"), account:$(n).attr("account")};
				aryData.push(obj);
			});
			return aryData;
		},
		/**
		 * 获取选中节点
		 */
		getSelectNode:function(){
			partyOrgTree = $.fn.zTree.getZTreeObj("partyOrgTree");
			var nodes  = partyOrgTree.getSelectedNodes();
			var node   = nodes[0];
			return node;
		},
		refreshGrid : function(orgId) {
			var me = this;
			var hiddenInput = $("#typeValue");
			var inclueChild = $($("#inclueChild")).is(':checked');
			var _url = __ctx + '/platform/org/partyUser/dialogUserJson.htm';
			var _param = {'orgId': orgId, 'inclueChild' : inclueChild};
			// 判断url参数是否存在
			for(var pn in me.data){
				if('url' == pn) _url = me.data.url;
			}
			hiddenInput.attr("name",'orgId').val(orgId);
			if(me.entityId == 'position'){
				_url = __ctx + '/platform/org/partyUser/dialogUserJson4Post.htm';
				_param = {'posId': orgId, 'inclueChild' : inclueChild, 'orgId': me.orgId};
				hiddenInput.attr("name",'posId');
			}else if(me.entityId == 'role'){
				_url = __ctx + '/platform/org/partyUser/dialogUserJson4Role.htm';
				_param = {'roleId': orgId, 'inclueChild' : inclueChild};
				hiddenInput.attr("name",'roleId');
			}
			
			var params = 'type='+me.type;
			if(_url.indexOf('?') > 0) _url += '&'+params;
			else _url += '?' + params;
			
			this.grid.jqGrid('setGridParam', {
				url :_url,
				postData : _param, // 发送数据
				page : 1
			}).trigger("reloadGrid");
		},
		_initSearchEvent : function(){
			var me = this;
			$(document).off("click", ".toolbar-panel a.btn.fa-search");
			$(document).on("click", ".toolbar-panel a.btn.fa-search", function(){
				var obj = this,_url;
				if ($(obj).hasClass('disabled'))
					return;
				var searchForm = $(obj).closest("div .toolbar-panel").find(
						".search-form");
				if (searchForm.length == 0)
					return;
				var inclueChild = $($("#inclueChild")).is(':checked');
				if(me.entityId == 'org'){
					_url = __ctx + '/platform/org/partyUser/dialogUserJson.htm';
				}else if(me.entityId == 'position'){
					_url = __ctx + '/platform/org/partyUser/dialogUserJson4Post.htm';
				}else if(me.entityId == 'role'){
					_url = __ctx + '/platform/org/partyUser/dialogUserJson4Role.htm';
				}
				var data = me._serializeObject(searchForm);
				me.grid.jqGrid('setGridParam', {
					url : _url,
					postData : data, // 发送数据
					page : 1
				}).trigger("reloadGrid"); // 重新载入
			});
			
			$(document).off("click", ".toolbar-panel a.btn.fa-more");
			$(document).on("click", ".toolbar-panel a.btn.fa-more", function(){
				var params = [];
				$("#hiddenFields input[type='hidden']").each(function(){
					params.push({name:$(this).attr("name"),value:$(this).val()});
				  });
				new AttrDialog({
					title:"更多查询条件",
					params:params,
					selectorType: "user",
					callback:function(data){
						me.setInputVal("#hiddenFields", data);
					}
				}).show();
				
				
			});
		},
		_serializeObject : function(form) {
			var o = {}, a = $(form).serializeArray();
			$.each(a, function() {
				var v = this.value || '';
				if (o[this.name]) {
					o[this.name] = o[this.name] +","+ v;
				} else {
					o[this.name] =v;
				}
			});
			return o;
		},
        setInputVal : function(selector, params){
			if(!params) return;
			var inputHtml = "<input type='hidden' name='#name#' value='#value#' />";
			var element = $(selector);
			element.html("");
			for(var i=0,temp;i<params.length;i++){
				temp = inputHtml;
				element.append( temp.replace("#name#",params[i].name).replace("#value#",params[i].value));
			}
			$(".toolbar-panel a.btn.fa-search").trigger("click");
		}
	};
})();