/**
 * 用户选择框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyUserSelector;
var single = window.isSingleSelector, partyOrgTree=null;
$(function() {
	partyUserSelector = new PartyUserSelector();
	partyUserSelector.init();
});


(function() {
	var template = '<span class="attach-span" userid="#userid#" account="#account#" fullname="#fullname#">' +
								'<span title="#fullname#">#fullname#</a>' +
								'&nbsp;' +
								'<a class="btn btn-ms" title="移除" href="javascript:partyUserSelector.remove(\'#userid#\',\'#account#\');"><i class="fa fa-remove"></i></a>' +
								'</span>'+
							'</span>';
	
	// 定义常量
	var _consts = {
			GRID : "#partyUserDialogGrid",// 列表对象
			PAGER :"#partyUserDialogPager",// 列表分页
			FORM : '#partyUserSelectForm',// 表单form
			
			TREE_ID : 'partyOrgTree',// 树
			TREE : '#partyOrgTree'// 树的ID
	};
	/**
	 * 用户选择框 对象
	 * 
	 * @returns {PartyUserSelector}
	 */
	PartyUserSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	PartyUserSelector.prototype = {
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
			this._initLayout();
			this._initTree();
			this._initGridList();
			this._initData();
			this._initUserContainer();
		},
		_initUserContainer : function(){
			if(!this.isSingle){
				$("div[name='user_container']").height("80px");
			}
		},
		_initLayout:function(){
			//初始化布局
			var layout =   $('body').layout({ applyDefaultStyles: true,
				onopen :function(){
					GridList.resizeGridSize();
				},
				onclose:function(){
					GridList.resizeGridSize();
				},
				onresize:function(){
					GridList.resizeGridSize();
				}
			});   
			layout.addPinBtn( ".pinleftBtn", "west" );
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,
				__url = __ctx + '/platform/org/partyUser/dialogUserJson.htm?Q^GROUP_ID_^S='+orgId,
				__url = encodeURI(__url);
			
			this.grid.GridList({
							url : __url,
							pager : this.consts.PAGER,
							colNames : [
										'用户ID',
										'用户帐号',
										'姓名' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'account',
											index : 'account_',
											width : 100
										},
										{
											name : 'fullname',
											index : 'full_name_',
											width : 100
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
			key = data.account
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
				if($(records[i]).attr("userid")==data['id'] || $(records[i]).attr("account")==data['account']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='user_container']").append($(html));
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
			var url=__ctx+"/platform/org/partyOrg/getTreeData.htm";
			$.post(url,{type:'1'},function(result){
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
			me.refreshGrid(treeNode.id);
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
				var id=data.id||"", key=data.account||"", name=data.fullname||"", 
					tmp=template .replaceAll("#userid#", id).replaceAll("#account#", key).replaceAll("#fullname#",name);
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
				var obj = {id:$(n).attr("userid"), account:$(n).attr("account"), fullname:$(n).attr("fullname")};
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
			var me = this,
				__url = __ctx + '/platform/org/partyUser/dialogUserJson.htm?Q^GROUP_ID_^S='+orgId,
				__url = encodeURI(__url);
			
			this.grid.jqGrid('setGridParam', {
				url : __url,
				postData : {
					/*'Q^group_id_^S': orgId*/
				}, // 发送数据
				page : 1
			}).trigger("reloadGrid"); 
		}
	};
	
})();