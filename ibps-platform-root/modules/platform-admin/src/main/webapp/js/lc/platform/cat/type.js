/**
 * 分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-19 14:17:32
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */

$(function() {
	type  = new Type();
	type.init();
});

function reFresh(){
	type.loadTree();
}

(function() {
	//定义常量
	var _consts = {
			FORM : '#typeForm',// 表单form
			TREE : '#typeTree',// 树的ID
			SORTFORM : '#sortForm',//排序页面Form
			IMPORTFORM : '#importForm'
	};
	/**
	 * 分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。 对象
	 * @returns {Type}
	 */
	Type = function() {
		//定义属性 
	};

	/**
	 * 方法
	 */
	Type.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if ($(this.consts.TREE).length > 0)// 树
				this._initTree();
			if ($(this.consts.SORTFORM).length > 0)// 树
				this._initSortFrom();
			if($(this.consts.IMPORTFORM).length > 0)
				this._initImport();
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
					form.submit();
				}else{
					$el.button('reset');
				}
					
			});
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
					//刷新左边的树
					parent.type._loadTree();
					location.reload(true);
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
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
			me.typeTree =null;
			me._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResize();
			});
			me.categoryKey=$("#category").val();
			me._loadTree();
	        //初始化滚动
			me._initLeftScroll();
		     //初始化树的顶部按钮
			me._initTreeToolbar();
			me._changeCategory();
		},
		
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize : function(){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-145);
		},
		/**
		 * 加载树
		 */
		_loadTree:function(){
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
						rootPId:me.categoryKey
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
			var url=__ctx+"/platform/cat/type/getTreeData.htm";
			$.post(url,{
				'categoryKey':me.categoryKey?me.categoryKey:'DIC'
			},function(result){
				me.typeTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.typeTree.getNodesByFilter(function(node){
		                return (node.level<=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.typeTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.typeTree.expandAll(true);
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
					me.typeTree.expandAll(true);
				} else{
					me.typeTree.expandAll(false);	
				}
			});
		},
		/**
		 *
		 */
		_changeCategory:function(){
			var me = this;
			$(document).on("change", "#category", function(){
					me.categoryKey=$(this).val();
					me._loadTree();
					var url=__ctx+"/platform/cat/type/get.htm";
					$("#listFrame").attr("src",url);
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
			//me.resourcesTree.selectNode(treeNode);
			if(treeNode.parentId==me.categoryKey)return ;
			if(id== me._treeRootId)
				id ="";
			var url=__ctx+"/platform/cat/type/edit.htm?id="+id+"&isDialog=0";
			$("#listFrame").attr("src",url);
		},
		
		/**
		 * 树的右点击事件
		 * @param me
		 * @param treeNode
		 * @param e
		 */
		_treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.typeTree.selectNode(treeNode);
			var menu=null;
			//如果id为0说明是根节点，如果ownerId则为公共分类，如果ownerId不为0，则为私有分类
			if(treeNode.parentId!=me.categoryKey){
				if(treeNode.ownerId==0){
					menu=$('#typeMenu');
				}else{
					menu=$('#priTypeMenu');
				}
			}else{
				menu=$('#categoryMenu');
			}
				
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
				if (target.hasClass('disabled'))
					return false;
				switch (action) {
					case "node_pub_add":// 增加分类
						me._addNode(treeNode,0);
						break;
					case "node_pri_add":// 增加私有分类
						me._addNode(treeNode,1);
						break;
					case "node_del":// 删除分类
						me._delNode(treeNode);
						break;
					case "node_fresh":// 刷新分类
						me._freshNode(treeNode);
						break;
					case "node_sort":// 排序
						me._sortNode(treeNode);
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
		
		//右键菜单项事件
		/**
		 * 增加分类
		 */
		_addNode : function(node,isPriNode){
			var isRoot=0;
			var me = this;
			if(node.parentId==me.categoryKey) isRoot = 1;
			
			var url=__ctx+"/platform/cat/type/edit.htm";
			url = url+"?parentId="+node.id+"&isPriNode="+isPriNode+"&isRoot="+isRoot;
			url = url+"&categoryKey="+me.categoryKey+"&parentName="+node.name+"&isDialog=0";
			$("#listFrame").attr("src",url);
		},
		/**
		 * 删除分类
		 */
		_delNode : function(node){
			var url =__ctx+"/platform/cat/type/remove.htm",me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(url,{
					id:node.id
				},function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr( '删除成功！',true);
				    	me.typeTree.removeNode(node);
				    } 
				});
			});
		
		},
		/**
		 * 刷新分类
		 */
		_freshNode : function(node){
			var me = this;
			me._loadTree();
		},
		/**
		 * 分类排序
		 */
		_sortNode : function(node){
			var me = this;
			var url=__ctx +'/platform/cat/type/sortList.htm?id='+node.id;
			DialogUtil.dialog({
				   content: url,
				   title:"分类排序",
				   area: ['50%', '55%'],
				   btn: [{
								   label:'确定',
								   iconCls : 'btn btn-primary fa fa-ok',
								   action:function(dialog,index){
									  var  data = DialogUtil.getChildFrameWindow().getSelectIds();
									  if(data.length>0){
											var url=__ctx +'/platform/cat/type/sortSave.htm';		
											var params = {typeIds:data};
											$.post(url,params,function(responseText){
											    var resultMessage = new com.lc.form.ResultMessage(responseText);
											    if (resultMessage.isSuccess()) {
											    	DialogUtil.toastr( '排序分类成功!',true);
											    	me._loadTree();
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
		/**
		 * 导出分类
		 */
		_exportNode : function(node){
			var me = this;
			var url=__ctx +'/platform/cat/type/exportXml.htm?id='+node.id;
			window.location.href=url;
		},
		/**
		 * 导入分类
		 */
		_importNode : function(node){
			var me = this;
			var url=__ctx +'/platform/cat/type/import.htm';
			param={
					id: node.id
			};
			
			DialogUtil.dialog({
				   content: url,
				   title:"分类导入",
				   area: ['30%', '25%'],
				   params:param,
				   btn: [{  label:'导入',
					   				iconCls : 'btn btn-primary fa fa-ok',
								   action:function(dialog,index){
									   var callback=function(isSuccess){
										   if(isSuccess){
											   me._loadTree();
											   DialogUtil.toastr( '分类导入成功!',true);
											   DialogUtil.close(index);
										   }else{
											   DialogUtil.toastr( '分类导入失败!',false);
										   }
								
									   };
									  DialogUtil.getChildFrameWindow().type.submitImForm(callback);
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
		 * 初始化排序页面
		 */
		_initSortFrom : function(){
			var me = this;
			//var obj = $("#typeIds");
			var obj=document.getElementById('typeIds');
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
		_initImport : function(){
			var importParam = frameElement.dialog.params;
			var me = this, 
			form = $(this.consts.IMPORTFORM), frm = form.form();
			$("#typeId").val(importParam.id);
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
	var obj=document.getElementById('typeIds');
	var typeIds = [];
	for(var i=0;i<obj.length;i++){
		typeIds.push(obj[i].value);
	}
	return typeIds.join(",");
}

function getTypeData(){
	var id = $("[name='id']").val();
	var name = $("#name").val();
	var typeKey = $("#typeKey").val();
	var struType = $("[name='struType']:checked").val();
	var parentId = $("[name='parentId']").val();
	var categoryKey = $("[name='categoryKey']").val();
	var path = $("[name='path']").val();
	var isRoot = $("[name='isRoot']").val();
	var isPrivate = $("[name='isPrivate']").val();
	var isDict = $("[name='isDict']").val();
	var typeVo={
			id:id,
			name:name,
			typeKey:typeKey,
			struType:struType,
			categoryKey:categoryKey,
			path:path,
			isRoot:isRoot,
			isPrivate:isPrivate,
			isDict:isDict,
			parentId:parentId
	}
	//data.type=type;
	//data.typeVo=typeVo;
	return JSON2.stringify(typeVo);
}


