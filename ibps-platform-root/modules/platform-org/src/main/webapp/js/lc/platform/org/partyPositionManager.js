/**
 * partyPositionManager
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-15 21:31:13
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	partyPositionManager = new PartyPositionManager();
	partyPositionManager.init();

});

(function() {
	
	//定义常量
	var _consts = {
		TREE_ID : 'positionTree',// 树
		TREE : '#positionTree',// 树的ID
		MOVE_TREE:'#positionMoveTree',// 移动页面树
		MOVE_FORM : '#moveForm',//移动页面Form
	};
	/**
	 * 用户组 对象
	 * @returns {PartyPositionManager}
	 */
	PartyPositionManager = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyPositionManager.prototype = {
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
			if ($(this.consts.MOVE_TREE).length > 0)// 树
				this._initMoveTree();
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
			this.positionTree =null;
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
					me.positionTree.expandAll(true);
				} else{
					me.positionTree.expandAll(false);	
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
			var url=__ctx+"/platform/org/partyPosition/getTreeData.htm";
			$.post(url,{
				'type' : 'position'
			},function(result){
				me.positionTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.positionTree.getNodesByFilter(function(node){
		                return (node.level <=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.positionTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        }else{
		        	me.positionTree.expandAll(true);
		        }
			});
	},
		treeOnLeftClick:function(me, treeNode) {
			var groupId=treeNode.id;
			me.selectTreeNode = treeNode;
			if(groupId==0)
				return;
			var url=__ctx+"/platform/org/partyPosition/info.htm?id="+groupId;
			$("#listFrame").attr("src",url);
		},
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.positionTree.selectNode(treeNode);
			
			//获取当前点击左树的参与者Id
			var groupId = treeNode.id;
			var menu=null;
			///特殊节点能新增
			if(groupId==''||groupId==undefined ||groupId =="0"){
				menu=$('#rootMenu');
			}
			else{
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
				}
				}
			});
		},
		delNode:function(node){
			if(node.children != null && node.children.length > 0) {
				DialogUtil.toastr("请先删除子节点！");
				return;
			}
			var url =__ctx+"/platform/org/partyPosition/remove.htm",me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(url,{
					id:node.id
				},function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr( resultMessage.getMessage(),true);
				    	me.positionTree.removeNode(node);
				    }  else{
				    	DialogUtil.error(resultMessage.getMessage());
				    }
				});
			});
		},
		sortNode:function(node){
			var url=__ctx +'/platform/org/partyPosition/sortNode.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'节点排序',
				content:url
			});
		},
		moveNode:function(	node){
			var me = this;
			var url=__ctx +'/platform/org/partyPosition/moveNode.htm?id='+node.id;
			DialogUtil.dialog({
				title:'移动节点',
				area:['400','300'],
				params:{nodeId:node.id},
				content:url,
				btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var id = DialogUtil.getChildFrame("#id",index).val();
						   var destinationId=DialogUtil.getChildFrame("#destinationId",index).val();
						   if(destinationId.length <= 0){
							   DialogUtil.msg( '请选择要移动到的资源菜单!',true);
							   return;
						   }
						   var url=__ctx +'/platform/org/partyPosition/saveMove.htm';
						   var params = {id:id,destinationId:destinationId};
						   $.post(url,params,function(responseText){
							    var resultMessage = new com.lc.form.ResultMessage(responseText);
							    if (resultMessage.isSuccess()) {
							    	DialogUtil.toastr( '移动成功!',true);
							    	me.loadTree();
							    }else{
							    	DialogUtil.error(resultMessage.getMessage());
							    }
							});
							DialogUtil.close(index);
					   }
				   },
				   {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
							DialogUtil.close(index);
					   }
				   }]
			});
		},
		addNode:function(node){
			var url=__ctx+"/platform/org/partyPosition/edit.htm?self=true&parentId="+node.id;
			$("#listFrame").attr("src",url);
		},
		editNode:function(node){
			var url=__ctx+"/platform/org/partyPosition/edit.htm?self=true&id="+node.id+"&parentId="+node.getParentNode().id;
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
								+ '/platform/org/partyPosition/info.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 初始化移动节点页面树
		 */
		_initMoveTree:function(){
			var me = this;
			// 树
			this.positionTree =null;
			this._treeFrameResizeMove();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResizeMove();
			});
			this.loadMoveTree();
	        //初始化滚动
	        this.initLeftScrollMove();
	        //初始化树的顶部按钮
			this.initTreeToolbar();
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResizeMove:function (){
			$('.treeFrame').height( $(window).height()-20);
			//$(this.consts.MOVE_TREE).height( $(window).height()-145);
		},
		/**
		 * 左侧菜单的滚动
		 */
		initLeftScrollMove:function(){
	    	$(_consts.MOVE_TREE).niceScroll({
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
	    	$(_consts.MOVE_TREE).getNiceScroll().resize();
		},
		// 加载移动节点页面树
		loadMoveTree:function (){
			var me = this, params = frameElement.dialog.params;
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
						DialogUtil.getChildFrameWindow().document.getElementById('destinationId').value=treeNode.id;
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/org/partyPosition/getTreeData.htm";
			$.post(url,{
				'type' : '1'
			},function(result){
				me.positionTree=$.fn.zTree.init($(me.consts.MOVE_TREE), setting,result);
				var moveNode = me.positionTree.getNodesByParam("id",params.nodeId, null);
				me.positionTree.removeNode(moveNode[0]);
		        if(me.expandByDepth!=0) {
		            var nodes = me.positionTree.getNodesByFilter(function(node){
		                return (node.level==me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.positionTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.positionTree.expandAll(true);
		        }
			});
		}
		
	};
	
	$(window).resize(function(){  
		divResize();
	});
	
	function divResize (){
		$('#divFrame').height( $(window).height());
	}
})();
