/**
 * resourceDialog
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-24 11:21:13
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	resourceDialog = new ResourceDialog();
	resourceDialog.init();
});

function changeGroupMenu(){
	resourceDialog.changeGroupMenu();
}
(function() {
	
	//定义常量
	var _consts = {
		TREE_ID : 'resourcesTree',// 树
		TREE : '#resourcesTree'// 树的ID
	};
	/**
	 * 用户组 对象
	 * @returns {ResourceDialog}
	 */
	ResourceDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ResourceDialog.prototype = {
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
			var me = this;
			// 树
			this.resourcesTree =null;
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResize();
			});
			this.systemId=$("#subSystem").val();
			this.loadTree();
	        //初始化滚动
	        this.initLeftScroll();
			this.initTreeToolbar();
			//this.changeGroupMenu();

			var me = this;
			//改变子系统
			$("#subSystem").change(function(){
				me.systemId=$("#subSystem").val();
				me.loadTree();
			});

		},
		initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.resourcesTree.expandAll(true);
				} else{
					me.resourcesTree.expandAll(false);	
				}
			});
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-85);
		},
		// 加载树
		loadTree:function (){
			var me = this;
			this._treeRootId=0;
			this.expandByDepth = 1;
			var setting = {
				async: {enable: false},
				checkable: true,
                check: {
                    autoCheckTrigger: false,
                    chkboxType: {
                        "Y": "ps",
                        "N": "ps"
                    },
                    chkStyle: "checkbox",
                    enable: true,
                    nocheckInherit: false,
                    chkDisableInherit: false,
                    radioType: "level"
                },
				data: {
					key:{name:"name",
                        checked: "checked"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId",
						rootPId:me.systemId
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
						me.treeOnLeftClick(me, treeNode);
					},
					onRightClick :function(e, treeId, treeNode) {
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/org/partyRole/getRolResTreeChecked.htm";
			$.post(url,{
				roleId : roleId, systemId : me.systemId
			},function(result){
				me.resourcesTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.resourcesTree.getNodesByFilter(function(node){
		                return (node.level <=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.resourcesTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.resourcesTree.expandAll(true);
		        }
			});
			
		},
		treeOnLeftClick: function (me, treeNode) {
             if (!treeNode.getCheckStatus().checked)
                 me.resourcesTree.checkNode(treeNode, true, false);
             else
                 me.resourcesTree.checkNode(treeNode, false, true);
                 /*
                  * if(treeNode.checked) treeNode.checked = false; else
                  * treeNode.checked = true;
                  */
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
		},
		changeGroupMenu : function (){
			var option=$("#partyType").children('option:selected');
			$.each(hasDelMenuItem, function(i, item){ 
				$('#groupMenu').menu('removeItem',item.target);
			});
			
		},
		saveRes:function(callback){
			var resourcesTree = $.fn.zTree.getZTreeObj("resourcesTree");
			var nodes = resourcesTree.getCheckedNodes(true);
			var resIds="";
			$.each(nodes,function(i,n){
				if(n.id != 0)resIds+=n.id+",";
			});
			resIds=resIds.substring(0,resIds.length-1);
			
			var url=__ctx + "/platform/org/partyRole/updateResource.htm";
			$.post(url,{
				roleId:roleId,
				systemId:this.systemId,
				resIds:resIds
			},function(result){
				var obj=new com.lc.form.ResultMessage(result);
				if(obj.isSuccess()){
					DialogUtil.confirm( '角色资源分配成功,是否继续?',function(rtn){
						if(!rtn){
							callback(true);
						}
					});
				}else{
					DialogUtil.error('角色资源分配出错!');
					callback(false);
				}
			})
		}
	};
	
	$(window).resize(function(){  
		divResize();
	});
	
	function divResize (){
		$('#divFrame').height( $(window).height());
	}
})();

