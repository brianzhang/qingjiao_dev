/**
 * partyOrgGradeManager
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-15 21:31:13
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	partyOrgGradeManager = new PartyOrgGradeManager();
	partyOrgGradeManager.init();
});

(function() {
	
	//定义常量
	var _consts = {
		TREE_ID : 'orgTree',// 树
		TREE : '#orgTree'// 树的ID
	};
	/**
	 * 用户组 对象
	 * @returns {PartyOrgGradeManager}
	 */
	PartyOrgGradeManager = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyOrgGradeManager.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TREE).length > 0)// 树
				this._initTree();
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			//初始化布局
			var layout =   $('body').layout({ applyDefaultStyles: true});  
			layout.addPinBtn( ".pinBtn", "west" );
			var me = this;
			// 树
			this.orgTree =null;
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
					me.orgTree.expandAll(true);
				} else{
					me.orgTree.expandAll(false);	
				}
			});
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-145);
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
						pIdKey: "parentId",
						rootPId:0
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
					onRightClick :function(e, treeId, treeNode) {
						me.treeOnRightClick(me,treeNode,e);
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/org/partyOrg/getTreeData.htm";
			$.post(url,{
				'type' : '4'
			},function(result){
				me.orgTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.orgTree.getNodesByFilter(function(node){
		                return (node.level <=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.orgTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        }else{
		        	me.orgTree.expandAll(true);
		        }
			});
		},
		treeOnLeftClick:function(me, treeNode) {
			if(!treeNode || treeNode.id==0 || treeNode.id == '0')
				return;
			var groupId=treeNode.id;
			me.selectTreeNode = treeNode;
			
			// 分级管理员权限控制
			var prem = me.getPrem(treeNode);
			
			var url=__ctx+"/platform/org/partyOrg/gradeInfo.htm?id="+groupId+'&prem='+prem;
			$("#listFrame").attr("src",url);
		},
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode || treeNode.id == '0' || treeNode.id == 0) 
				return;
			me.orgTree.selectNode(treeNode);
			
			//获取当前点击左树的参与者Id
			var groupId = treeNode.id;
			
			// 分级管理员权限控制
			var auths = JSON.parse(partyOrgAuths);
			var parent = treeNode.getParentNode();
			if(parent.id == 0 || parent.id == '0'){
				for(var i = 0; i < auths.length; i ++){
					var auth = auths[i];
					if(groupId == auth.orgID){
						me.menuPrem(auth.orgPerms);
						break;
					}
				}
			}else{
				var pid = null;
				
				for(;parent.getParentNode() && (parent.getParentNode().id != 0 || parent.getParentNode().id != '0');){
					parent = parent.getParentNode();
				}
				
				pid = parent.id;
				
				for(var i = 0; i < auths.length; i ++){
					var auth = auths[i];
					if(pid == auth.orgID){
						me.menuPrem(auth.userPerms);
						break;
					}
				}
			}
			
			var menu=null;
			///特殊节点能新增
			if(groupId==''||groupId==undefined ||groupId =="0"){
				menu=$('#rootMenu');
			}
			else{
				menu=$('#groupMenu');
				menu.contextMenu(e,{
					onItem: function(context, ev) {
						var target =$(ev.target), 
						action = target.data("action");
						if (target.hasClass('disabled'))
							return false;
						switch (action) {
						case "node_add":// 增加节点
							me.addNode(treeNode);
							break;
						case "node_edit":// 编辑节点
							me.editNode(treeNode);
							break;
						case "node_del":// 删除节点
							me.delNode(treeNode);
							break;
						case "node_sort":// 节点排序
							me.sortNode(treeNode);
							break;
						case "node_move":// 节点排序
							me.moveNode(treeNode);
							break;
						case "node_set":// 设置分级管理员
							me.setManager(treeNode);
							break;
						case "node_addPOS":// 新增岗位
							me.addPOS(treeNode);
							break;
						case "node_addByMainFromself":// 新增节点
							me.addByMainFromself(treeNode);
							break;
						}
					}
				});
			}
		},
		getPrem : function(treeNode){
			var prem = null;
			var parent = treeNode.getParentNode();
			var auths = JSON.parse(partyOrgAuths);
			if(parent.id == 0 || parent.id == '0'){
				for(var i = 0; i < auths.length; i ++){
					var auth = auths[i];
					if(treeNode.id == auth.orgID){
						prem = auth.orgPerms;
						break;
					}
				}
			}else{
				var pid = null;
				
				for(;parent.getParentNode() && (parent.getParentNode().id != 0 || parent.getParentNode().id != '0');){
					parent = parent.getParentNode();
				}
				
				pid = parent.id;
				
				for(var i = 0; i < auths.length; i ++){
					var auth = auths[i];
					if(pid == auth.orgID){
						prem = auth.userPerms;
						break;
					}
				}
			}
			
			return prem;
		},
		menuPrem : function(prem){
			if(prem.indexOf('add') != -1){
				$("a[data-action='node_add']").removeClass("disabled");
				$("a[data-action='node_set']").removeClass("disabled");
				$("a[data-action='node_addPOS']").removeClass("disabled");
			}else{
				$("a[data-action='node_add']").addClass("disabled");
				$("a[data-action='node_set']").addClass("disabled");
				$("a[data-action='node_addPOS']").addClass("disabled");
			}
			if(prem.indexOf('delete') != -1){
				$("a[data-action='node_del']").removeClass("disabled");
			}else{
				$("a[data-action='node_del']").addClass("disabled");
			}
			if(prem.indexOf('edit') != -1){
				$("a[data-action='node_edit']").removeClass("disabled");
			}else{
				$("a[data-action='node_edit']").addClass("disabled");
			}
		},
		delNode:function(node){
			var url =__ctx+"/platform/org/partyOrg/remove.htm",me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(url,{
					id:node.id
				},function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	window.location.reload(true);
				    	DialogUtil.toastr( resultMessage.getMessage(),true);
				    } else{
				    	DialogUtil.error(resultMessage.getMessage());
				    }
				});
			});
		},
		sortNode:function(node){
			var url=__ctx +'/platform/org/partyOrg/sortNode.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'节点排序',
				content:url
			});
		},
		moveNode:function(	node){
			var url=__ctx +'/platform/org/partyOrg/moveNode.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'移动节点',
				area:['400','300'],
				content:url
			});
		},
		addNode:function(node){
			var url=__ctx+"/platform/org/partyOrg/edit.htm?parentId="+node.id+"&prem="+prem;
			$("#listFrame").attr("src",url);
		},
		editNode:function(node){
			var me = this;
			// 分级管理员权限控制
			var prem = me.getPrem(node);
			var url=__ctx+"/platform/org/partyOrg/edit.htm?id="+node.id+"&parentId="+node.getParentNode().id+"&prem="+prem;
			$("#listFrame").attr("src",url);
		},
		setManager:function(node){
			var me = this;
			// 分级管理员权限控制
			var prem = me.getPrem(node);
			var url=__ctx+"/platform/org/partyOrgAuth/edit.htm?mainOrgrade=grade&tree=true&groupId="+node.id+"&prem="+prem;
			$("#listFrame").attr("src",url);
		},
		addPOS:function(node){
			var me = this;
			// 分级管理员权限控制
			var prem = me.getPrem(node);
			var url=__ctx+"/platform/org/partyPosition/edit.htm?mainOrgrade=grade&tree=true&orgId="+node.id+"&prem="+prem;
			$("#listFrame").attr("src",url);
		},
		addByMainFromself:function(node){
			var url=__ctx+"/platform/org/partyOrg/edit.htm?typeId="+this.typeId+"&mainGroupId="+node.id;
			$("#listFrame").attr("src",url);
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
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/org/partyOrg/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
	
	$(window).resize(function(){  
		divResize();
	});
	
	function divResize (){
		$('#divFrame').height( $(window).height());
	}
})();
