/**
 * 系统资源
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-05 19:58:06
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	resources = new Resources();
	resources.init();
	
});

(function() {
	// 定义常量
	var 	_consts = {
			FORM : '#resourcesForm',// 表单form
			TREE_ID : 'resourcesTree',// 树
			TREE : '#resourcesTree',// 树的ID
			SORTFORM : '#sortForm',//排序页面Form
			MOVE_TREE:'#resourcesMoveTree',// 移动页面树
			MOVE_FORM : '#moveForm',//移动页面Form
				
	};
	/**
	 * 系统资源 对象
	 * 
	 * @returns {Resources}
	 */
	Resources = function() {
	
	};
	/**
	 * 方法
	 */
	Resources.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)// 表单
				this._initForm();
			if ($(this.consts.TREE).length > 0)// 树
				this._initTree();
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			var me = this;
			//初始化布局
			var layout =   $('body').layout({ applyDefaultStyles: true});  
			layout.addPinBtn( ".pinBtn", "west" );
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
	        //初始化树的顶部按钮
			this.initTreeToolbar();
			this.changeSubSystem();
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
		 * 改变子系统
		 */
		changeSubSystem:function(){
			var me = this;
			$(document).on("change", "#subSystem", function(){
					me.systemId=$(this).val();
					me.loadTree();
			});
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-140);
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
						var parentId=treeNode.id,systemId=treeNode.systemId,frame=$("#listFrame").contents();
						frame.find("#parentId").val(parentId);
						frame.find("#systemId").val(systemId);
					},
					onRightClick :null,
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/auth/resources/getTreeData.htm";
			$.post(url,{
				'systemId':me.systemId?me.systemId:1
			},function(result){
				me.resourcesTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.resourcesTree.getNodesByFilter(function(node){
		                return (node.level==me.expandByDepth);
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
		/**
		 * 重新加载树
		 */
		reFresh:function(){
			//刷新左边的树
			this.loadTree();
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
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				if($("#parentId").val() == '' || $("#systemId").val() == ''){
					$el.button('reset');
					DialogUtil.warn("请在左树，选择一个父节点!");
					return;
				}
				if (!frm.valid()){
					$el.button('reset');
					DialogUtil.msg("请检查表单");
					return;
				}
				var f =form.setData();
					f.submit();
			});
			this._selectIcon(); 
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.msg(msg.getMessage(), function(rtn) {
					DialogUtil.closeAll();
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 选择对话框
		 */
		_selectIcon : function() {
			  $('.icp-dd').iconpicker({
              });
			    
		    $('.icp-dd').on('iconpickerSelected', function(e) {
		    	var val =e.iconpickerValue;
               if(val.match(/^fa-/)){
              	 val = 'fa '+val;
               }else{
              	 val = 'glyphicon '+val;
               }
               $("#icon").val(val);
		    });
		}
	};

})();

function getSelectIds(){
	var obj=document.getElementById('ids');
	var ids = [];
	for(var i=0;i<obj.length;i++){
		ids.push(obj[i].value);
	}
	return ids.join(",");
}



