/**
 * partyPartyEntityyManager
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-15 21:31:13
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	partyPartyEntityManager = new PartyPartyEntityManager();
	partyPartyEntityManager.init();

});

(function() {
	
	//定义常量
	var _consts = {
		TREE_ID : 'groupsTree',// 树
		TREE : '#groupsTree'// 树的ID
	};
	/**
	 * 用户组 对象
	 * @returns {PartyPartyEntityManager}
	 */
	PartyPartyEntityManager = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyPartyEntityManager.prototype = {
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
			this.groupsTree =null;
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
					me.groupsTree.expandAll(true);
				} else{
					me.groupsTree.expandAll(false);	
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
			var url=__ctx+"/platform/org/partyPartyEntity/getTreeData.htm";
			$.post(url,{
				'typeId' : me.typeId
			},function(result){
				me.groupsTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.groupsTree.getNodesByFilter(function(node){
		                return (node.level <=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.groupsTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        }else{
		        	me.groupsTree.expandAll(true);
		        }
			});
	},
		treeOnLeftClick:function(me, treeNode) {
			var groupId=treeNode.id;
			me.selectTreeNode = treeNode;
			if(groupId==0)
				return;
			var url=__ctx+"/platform/org/partyPartyEntity/info.htm?typeId="+me.typeId+"&id="+groupId;
			$("#listFrame").attr("src",url);
		},
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.groupsTree.selectNode(treeNode);
			//获取点击左树中的类型Id
			var typeId=treeNode.typeId;
			//获取当前点击左树的参与者Id
			var groupId = treeNode.id;
			var menu=null;
			///特殊节点能新增
			if(typeId==''||typeId==undefined ||groupId =="0"){
				menu=$('#rootMenu');
			}
			else if(selectTypeId != typeId){
				menu=$('#addByMainFromself');  
			}else{
				menu=$('#groupMenu');
			}
				
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
					case "node_addPOS":// 新增岗位
						me.addPOS(treeNode);
						break;
					case "node_addByMainFromself":// 新增节点
						me.addByMainFromself(treeNode);
						break;
				}
				}
			});
		},
		delNode:function(node){
			var url =__ctx+"/platform/org/partyPartyEntity/remove.htm",me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(url,{
					id:node.id
				},function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr( '删除成功！',true);
				    	me.groupsTree.removeNode(node);
				    } 
				});
			});
		},
		sortNode:function(node){
			var url=__ctx +'/platform/org/partyPartyEntity/sortNode.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'节点排序',
				content:url
			});
		},
		moveNode:function(	node){
			var url=__ctx +'/platform/org/partyPartyEntity/moveNode.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'移动节点',
				area:['400','300'],
				content:url
			});
		},
		addNode:function(node){
			var url=__ctx+"/platform/org/partyPartyEntity/edit.htm?typeId="+this.typeId+"&parentId="+node.id;
			$("#listFrame").attr("src",url);
		},
		editNode:function(node){
			var url=__ctx+"/platform/org/partyPartyEntity/edit.htm?typeId="+this.typeId+"&groupId="+node.id+"&parentId="+node.getParentNode().id;
			$("#listFrame").attr("src",url);
		},
		addPOS:function(node){
			var url=__ctx+"/platform/org/partyPartyEntity/edit.htm?typeId=3&mainGroupId="+node.id;
			$("#listFrame").attr("src",url);
		},
		addByMainFromself:function(node){
			var url=__ctx+"/platform/org/partyPartyEntity/edit.htm?typeId="+this.typeId+"&mainGroupId="+node.id;
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
								+ '/platform/org/user/list.htm';
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
