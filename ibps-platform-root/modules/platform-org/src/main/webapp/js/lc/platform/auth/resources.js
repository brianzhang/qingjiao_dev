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
			IMPORTFORM : '#importForm'
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
			if ($(this.consts.SORTFORM).length > 0)// 排序
				this._initSortFrom();
			if ($(this.consts.MOVE_TREE).length > 0)// 树
				this._initMoveTree();
			if($(this.consts.IMPORTFORM).length > 0)
				this._initImport();
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
						me.treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e,treeId, treeNode) {
						me.treeOnRightClick(me,treeNode,e);
					},
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
			var url=__ctx+"/platform/auth/resources/get.htm?id=";
			$("#listFrame").attr("src",url);
		},
		treeOnLeftClick:function(me, treeNode) {
			var id=treeNode.id;
			me.selectTreeNode = treeNode;
			//me.resourcesTree.selectNode(treeNode);
			if(id== me._treeRootId)
				id ="";
			var url=__ctx+"/platform/auth/resources/get.htm?id="+id;
			$("#listFrame").attr("src",url);
		},
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.resourcesTree.selectNode(treeNode);
			var menu=null;
			if(treeNode.isFolder){
				if(treeNode.id!=0){
					menu=$('#foldMenu');
				}else{
					menu=$('#subSysMenu');
				}
			}else{
				menu=$('#leafMenu');
			}
				
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
				if (target.hasClass('disabled'))
					return false;
				switch (action) {
					case "node_add":// 新增节点
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
					case "node_export":// 导出
						me._exportNode(treeNode);
						break;
					case "node_import":// 导入
						me._importNode(treeNode);
						break;
				}
				}
			});

		},
		/**
		 * 导出菜单资源
		 */
		_exportNode : function(node){
			var url=__ctx +'/platform/auth/resources/exportXml.htm?id='+node.id+"&subSysId="+$("#subSystem").val();
			window.location.href=url;
		},
		/**
		 * 导入菜单资源
		 */
		_importNode : function(node){
			var me = this;
			var url=__ctx +'/platform/auth/resources/import.htm';
			param={
				id: node.id,
				subSysId: $("#subSystem").val()
			};
			
			DialogUtil.dialog({
			   content: url,
			   title:"菜单资源导入",
			   area: ['30%', '25%'],
			   params:param,
			   btn: [{label:'导入',
		   			iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   DialogUtil.confirm('是否覆盖原有资源？',function(rtn){
								if(rtn) DialogUtil.getChildFrameWindow().resources.setCover();
								var callback=function(isSuccess){
									   if(isSuccess){
										   me.loadTree();
										   DialogUtil.toastr( '菜单资源导入成功!',true);
										   DialogUtil.close(index);
									   }else{
										   DialogUtil.toastr( '菜单资源导入失败!',false);
									   }
								   };
								  DialogUtil.getChildFrameWindow().resources.submitImForm(callback);
						   });
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
		setCover:function(){$("#cover").val("true");},
		addNode:function(node){
			var url=__ctx+"/platform/auth/resources/edit.htm?parentId="+node.id+"&systemId="+node.systemId;
			$("#listFrame").attr("src",url);
		},
		editNode:function(node){
			var url=__ctx+"/platform/auth/resources/edit.htm?id="+node.id;
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
		delNode:function(node){
			var me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				
				if(node.isFolder){
					DialogUtil.confirm('是否删除子菜单？不删除则子菜单层次会转换到该菜单层次！',function(rtn){
						me.delRes(me, node, rtn);
					},true);
				}else{
					me.delRes(me, node, false);
				}
			});
		},
		delRes : function(me, node, rtn){
			var url =__ctx+"/platform/auth/resources/remove.htm";
			$.post(url,{
				id:node.id,
				cascade:rtn
				},
				function(responseText){
			    var resultMessage = new com.lc.form.ResultMessage(responseText);
			    if (resultMessage.isSuccess()) {
			    	DialogUtil.toastr( '删除成功！',true);
			    	//me.resourcesTree.removeNode(node);
			    	me.reFresh();
			    } 
			});
		},
		sortNode:function(node){
			var me = this;
			if(!node.isParent){
				DialogUtil.warn("无子节点，无法排序！");
				return;
			}
			
			var url=__ctx +'/platform/auth/resources/sortList.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'节点排序',
				area: ['50%', '55%'],
				content:url,
				 btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var  data = DialogUtil.getChildFrameWindow().getSelectIds();
						  if(data.length>0){
								var url=__ctx +'/platform/auth/resources/sortSave.htm';		
								var params = {ids:data};
								$.post(url,params,function(responseText){
								    var resultMessage = new com.lc.form.ResultMessage(responseText);
								    if (resultMessage.isSuccess()) {
								    	DialogUtil.toastr( '排序成功!',true);
								    	me.reFresh();
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
		moveNode:function(node){
			var me =this;
			var url=__ctx +'/platform/auth/resources/moveNode.htm?id='+node.id+'&systemId='+node.systemId;
			DialogUtil.dialog({
				title:'移动节点',
				area: ['50%', '55%'],
				params:{nodeId:node.id},
				content:url,
				btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var id = DialogUtil.getChildFrame("#id",index).val();
						  var subSystemId = DialogUtil.getChildFrame("#subSystem",index).val();
						  var destinationId=DialogUtil.getChildFrame("#destinationId",index).val();
						  if(destinationId.length <= 0){
							  DialogUtil.msg( '请选择要移动到的资源菜单!',true);
							  return;
						  }
						var url=__ctx +'/platform/auth/resources/saveMove.htm';		
						var params = {id:id,subSystemId:subSystemId,destinationId:destinationId};
						$.post(url,params,function(responseText){
						    var resultMessage = new com.lc.form.ResultMessage(responseText);
						    if (resultMessage.isSuccess()) {
						    	DialogUtil.toastr( '移动成功!',true);
						    	me.reFresh();
						    }else{
						    	DialogUtil.error(resultMessage.getMessage());
						    }
							})
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
				if (frm.valid()){
					var f =form.setData();
					f.submit();
				}else{
					$el.button('reset');
				}
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
					parent.resources.reFresh();
					window.location.reload(true);
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
			
		},
		/**
		 * 初始化排序页面
		 */
		_initSortFrom : function(){
			var me = this;
			//var obj = $("#typeIds");
			var obj=document.getElementById('ids');
			$("#btn_top").click(function(){
				selectOption.moveTop(obj);
			});
			$("#btn_up").click(function(){
				selectOption.moveUp(obj, 1);
			});
			$("#btn_down").click(function(){
				selectOption.moveDown(obj, 1);
			});
			$("#btn_bottom").click(function(){
				selectOption.moveBottom(obj);
			});
		},
		
		/**
		 * 初始化移动节点页面树
		 */
		_initMoveTree:function(){
			var me = this;
			// 树
			this.resourcesTree =null;
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResize();
			});
			this.systemId=$("#subSystem").val();
			this.loadMoveTree();
	        //初始化滚动
	        this.initLeftScroll();
	        //初始化树的顶部按钮
			this.initTreeToolbar();
			$(document).on("change", "#subSystem", function(){
				me.systemId=$(this).val();
				me.loadMoveTree();
			});
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
						DialogUtil.getChildFrameWindow().document.getElementById('destinationId').value=treeNode.id;
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/auth/resources/getTreeData.htm";
			$.post(url,{
				'systemId':me.systemId?me.systemId:1
			},function(result){
				me.resourcesTree=$.fn.zTree.init($(me.consts.MOVE_TREE), setting,result);
				var moveNode = me.resourcesTree.getNodesByParam("id",params.nodeId, null);
				me.resourcesTree.removeNode(moveNode[0]);
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
		_initImport : function(){
			var importParam = frameElement.dialog.params;
			var me = this, 
			form = $(this.consts.IMPORTFORM), frm = form.form();
			$("#resId").val(importParam.id);
			$("#subSysId").val(importParam.subSysId);
		},
		submitImForm: function(callback){
			var me = this,form = $(this.consts.IMPORTFORM), frm = form.form();
			frm.ajaxForm({
				success : function(responseText){me._importResponse(responseText,callback)}
			});
			if (!frm.valid()){
				  DialogUtil.toastr( '请选择导入文件!',true);
			}else{
				var name = $('#xmlFile').val();
				var xmlName = name.endWith(".xml");
				if(xmlName){
					form.submit();
				}else{
					 DialogUtil.toastr( '请选择xml文件!',true);
				}
			}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_importResponse : function(responseText,callback) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				callback(true);
			} else {
				DialogUtil.error(msg.getMessage());
			}
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
