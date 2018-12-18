/**
 * 区域-字典
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-19 14:17:32
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	areaManage  = new AreaManage();
	areaManage.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE : '#areaTree'// 树的ID
	};
	/**
	 * 地理区域 对象
	 * @returns {AreaManage}
	 */
	AreaManage = function() {
	};

	/**
	 * 方法
	 */
	AreaManage.prototype = {
		consts:	_consts,
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
		_initTree : function(){
			var me = this;
			//初始化布局
			var layout =   $('body').layout({ applyDefaultStyles: true});  
			layout.addPinBtn( ".pinBtn", "west" );
			// 树
			me.areaTree =null;
			me._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResize();
			});
			me._loadTree();
	        //初始化滚动
			me._initLeftScroll();
			me._initTreeToolbar();
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize : function(){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-75);
		},
		/**
		 * 加载树
		 */
		_loadTree:function(){
			var me = this;
			var url=__ctx+"/platform/cat/area/getTreeData.htm";
			this._treeRootId=0;
			this.expandByDepth = 1;
			var setting = {
				data: {
					key:{name:"name"},
					simpleData: {
						enable: true,
						idKey: "key",
						pIdKey: "parentId",
						rootPId:"-1"
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
						me._treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e,treeId, treeNode) {
						me._treeOnRightClick(me,treeNode,e);
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			
			$.post(url,{},function(result){
				me.areaTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.areaTree.getNodesByFilter(function(node){
		                return (node.level<=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.areaTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else {
		        	me.areaTree.expandAll(true);
		        }
			});
		},
		/**
		 *  左侧菜单的滚动
		 */
		_initLeftScroll:function(){
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
		 * 初始化工具条
		 */
		_initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me._loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.areaTree.expandAll(true);
				} else{
					me.areaTree.expandAll(false);	
				}
			});
		},
		/**
		 * 树的左点击事件
		 * @param me
		 * @param treeNode
		 */
		_treeOnLeftClick:function(me, treeNode) {
			var id=treeNode.id;
			me.selectTreeNode = treeNode;
			if(id== me._treeRootId){
				return;
			}
			
			var url=__ctx+"/platform/cat/area/get.htm?id="+id;
			$("#listFrame").attr("src",url);
		},
		/**
		 * 树的又点击事件
		 * @param me
		 * @param treeNode
		 * @param e
		 */
		_treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) {
				return;
			}
			
			me.areaTree.selectNode(treeNode);
			var menu=null;
			if(treeNode.id==0){
				menu=$('#rootMenu');
			}else{
				menu=$('#areaMenu');
			}
			
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
				if (target.hasClass('disabled'))
					return false;
				switch (action) {
					case "node_add":// 增加区域
						me._addNode(treeNode,0);
						break;
					case "node_del":// 删除区域
						me._delNode(treeNode);
						break;
					case "node_fresh":// 刷新区域
						me._freshNode(treeNode);
						break;
					case "node_sort":// 排序
						me._sortNode(treeNode);
						break;
					case "node_edit":// 编辑
						me._addNode(treeNode,1);
						break;
				   }
				}
			});
		},
		/**
		 * 增加区域
		 */
		_addNode : function(node,isAdd){
			var me = this;
			var parentId = (node.getParentNode())?node.getParentNode().key:"0";
			var url=__ctx+"/platform/cat/area/edit.htm"
					+"?id="+node.id
					+"&key="+node.key
					+"&isAdd="+isAdd
					+"&parentId="+parentId;
			
			$("#listFrame").attr("src",url);
		},
		/**
		 * 删除区域
		 */
		_delNode : function(node){
			var url =__ctx+"/platform/cat/area/remove.htm",me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(url,{
					id:node.id
				},function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	me.areaTree.removeNode(node);
				    	$("#listFrame").attr("src", "");
				    	DialogUtil.toastr( '删除成功！',true);
				    }
				});
			});
		},
		/**
		 * 刷新区域
		 */
		_freshNode : function(node){
			var me = this;
			me._loadTree();
		},
		/**
		 * 区域排序
		 */
		_sortNode : function(node){
			var me = this;
			var url=__ctx +'/platform/cat/area/sortList.htm?id='+node.id;
			DialogUtil.dialog({
			   content: url,
			   title:"区域排序",
			   area: ['50%', '55%'],
			   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var  data = DialogUtil.getChildFrameWindow().getSelectIds();
						  if(data.length>0){
								var url=__ctx +'/platform/cat/area/sortSave.htm';		
								var params = {typeIds:data};
								$.post(url,params,function(responseText){
								    var resultMessage = new com.lc.form.ResultMessage(responseText);
								    if (resultMessage.isSuccess()) {
								    	me._loadTree();
								    	DialogUtil.toastr( '排序区域成功!',true);
								    }else{
								    	DialogUtil.error(resultMessage.getMessage());
								    }
								})
						  }
						  DialogUtil.close(index);
					   }
				   },
				   {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
							DialogUtil.close(index);
					   }
				   }
			   ]
			});
		},
	};
})();
