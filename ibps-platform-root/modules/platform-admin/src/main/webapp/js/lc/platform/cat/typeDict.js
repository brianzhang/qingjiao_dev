/**
 * 分类-字典
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-19 14:17:32
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	typeDict  = new TypeDict();
	typeDict.init();
});

function reFresh(){
	new TypeDict().loadTree();
}

(function() {
	//定义常量
	var 	_consts = {
			TREE : '#dictionaryTree',// 树的ID
			IMPORTFORM : '#importForm'
	};
	/**
	 * 数据字典 对象
	 * @returns {TypeDict}
	 */
	TypeDict = function() {
		//定义属性
		this.categoryKey='DIC_TYPE'
	};

	/**
	 * 方法
	 */
	TypeDict.prototype = {
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
			if($(this.consts.IMPORTFORM).length > 0)
				this._initImport();
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
			me.dictionaryTree =null;
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
			$('.treeFrame').height($(window).height()-20);
			$(this.consts.TREE).height($(window).height()-90);
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
				'categoryKey':me.categoryKey
			},function(result){
				me.dictionaryTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.dictionaryTree.getNodesByFilter(function(node){
		                return (node.level<=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.dictionaryTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.dictionaryTree.expandAll(true);
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
					me.dictionaryTree.expandAll(true);
				} else{
					me.dictionaryTree.expandAll(false);	
				}
			});
		},
		/**
		 * 树的左键点击事件
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
			var url=__ctx+"/platform/cat/dictionary/list.htm?id="+id;
			$("#listFrame").attr("src",url);
		},
		
		/**
		 * 树的右键点击事件
		 * @param me
		 * @param treeNode
		 * @param e
		 */
		_treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.dictionaryTree.selectNode(treeNode);
			var menu=null;
			//如果id为0说明是根节点，如果ownerId则为公共分类，如果ownerId不为0，则为私有分类
			if(treeNode.parentId!=me.categoryKey){
				if(treeNode.ownerId==0){
					menu=$('#publicMenu');
				}else{
					menu=$('#privateMenu');
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
						me._addNode(treeNode,0,0);
						break;
					case "node_pri_add":// 增加私有分类
						me._addNode(treeNode,1,0);
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
					case "node_edit":// 编辑
						me._addNode(treeNode,0,1);
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
		 * 导出数据字典
		 */
		_exportNode : function(node){
			var url=__ctx +'/platform/cat/dictionary/exportXml.htm?id='+node.id+"&isRoot="+(node.level == 0);
			window.location.href=url;
		},
		/**
		 * 导入数据字典
		 */
		_importNode : function(node){
			var me = this;
			var url=__ctx +'/platform/cat/dictionary/import.htm';
			param={
				id: node.id
			};
			
			DialogUtil.dialog({
			   content: url,
			   title:"数据字典导入",
			   area: ['30%', '25%'],
			   params:param,
			   btn: [{label:'导入',
		   			iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   DialogUtil.confirm('是否覆盖原有数据字典？',function(rtn){
								if(rtn) DialogUtil.getChildFrameWindow().typeDict.setCover();
								var callback=function(isSuccess){
									   if(isSuccess){
										   me._loadTree();
										   DialogUtil.toastr( '数据字典导入成功!',true);
										   DialogUtil.close(index);
									   }else{
										   DialogUtil.toastr( '数据字典导入失败!',false);
									   }
								   };
								  DialogUtil.getChildFrameWindow().typeDict.submitImForm(callback);
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
		/**
		 * 增加分类
		 */
		_addNode : function(node,isPriNode,isAdd){
			var isRoot=0;
			var me = this;
			if(node.parentId==me.categoryKey) isRoot = 1;
			var url=__ctx+"/platform/cat/type/edit.htm";
			if(isAdd==1){
				url=url+"?id="+node.id;
			}else{
				url = url+"?parentId="+node.id+"&isPriNode="+isPriNode+"&isRoot="+isRoot+"&categoryKey="+me.categoryKey+"&parentName="+node.name;
			}
			DialogUtil.dialog({
				   content: url,
				   title:"数据字典",
				   area: ['70%', '65%'],
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var  data = DialogUtil.getChildFrameWindow().getTypeData();
						  if(data.length>0){
								var url=__ctx +'/platform/cat/type/saveDic.htm';		
								var params = {typeVo:data};
								$.post(url,params,function(responseText){
								    var resultMessage = new com.lc.form.ResultMessage(responseText);
								    if (resultMessage.isSuccess()) {
								    	DialogUtil.toastr( '增加数据字典成功!',true);
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
			})
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
				    	me.dictionaryTree.removeNode(node);
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
			if(!node){
				DialogUtil.warn("请选择节点");
				return;
			}
			
			if(!node.isParent){
				DialogUtil.warn("叶节点没有子节点，不可排序");
				return;
			}
			
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
		_initImport : function(){
			var importParam = frameElement.dialog.params;
			var me = this, 
			form = $(this.consts.IMPORTFORM), frm = form.form();
			$("#id").val(importParam.id);
			$("#isRoot").val(importParam.isRoot);
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




