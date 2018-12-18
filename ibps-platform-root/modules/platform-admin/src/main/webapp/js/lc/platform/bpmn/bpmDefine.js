/**
 * 流程定义
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2016-12-30 16:21:52
 *</pre>
 */
$(function() {
    bpmDefine = new BpmDefine();
	bpmDefine.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#bpmDefineGrid",// 列表对象
		PAGER : "#bpmDefinePager",// 列表分页
		FORM : '#bpmDefineForm',// 表单form
		TYPE_TREE : "#typeTree", //左分类树
		VERS_GRID : "#bpmDefinitionVersGrid" //版本列表
	};
	/**
	 * 流程定义
	对象
	 * @returns {BpmDefine}
	 */
	BpmDefine = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmDefine.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			//在线建模
			this._bpmnModelDesign();
			//设置分类
			this._setDefCategory();
			this._initToolbar();
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/platform/bpmn/bpmDefine/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '流程定义ID', '流程名称', '流程业务主键','流程状态', '测试状态','更新时间', '当前版本号','管理' ],
								colModel : [
										{
											name : 'defId',
											hidden : true,
											key:true
										},{
											name : 'name',
											index : 'NAME_',
											 width :200
										},
										{
											name : 'defKey',
											index : 'DEF_KEY_'
										},
										{
											name : 'status',
											index : 'STATUS_',
											width :80,
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'draft',
													value : '草稿',
													css : 'blue'
												}, {
													name : 'deploy',
													value : '已发布',
													css : 'green'
												}, {
													name : 'suspend',
													value : '挂起',
													css : 'red'
												}, {
													name : 'forbidden',
													value : '禁用',
													css : 'red'
												}, {
													name : 'forbidden_instance',
													value : '禁用流程实例',
													css : 'red'
												} 
											]}
										},
										{
											name : 'testStatus',
											index : 'TEST_STATUS_',
											width :80,
					                	    formatter : function(cellval, opts, rowdata) {
												var rs = "正式";
												if(cellval=="test"){
													rs = "测试";
												}
												return rs;
											}
										},
										{
											name : 'updateTime',
											index : 'UPDATE_TIME_',
											formatter : 'timestamp',
											 width :80
										},
										{
											name : 'version',
											index : 'VERSION_',
											 width :60
										},
										{
											name : '__manage',
											width : 40,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
												{
													label:'启动',
													classes:'btn btn-primary fa fa-send',
													action:'javascript:bpmDefine._toStart("{defId}")',
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementStart=="Y"&&rowData.status=="deploy"){
															return false;
														}
														return true;
													}
												},
												{
													label:'复制', 
													classes:'btn btn-primary fa fa-copy',
													action:'javascript:bpmDefine._copy("{defId}","{defKey}","{name}")'
												},
												{
													label:'发布', 
													classes:'btn btn-primary fa fa-paper-plane',
													action:'javascript:bpmDefine._toDeploy("{defId}")',
													hidden:function(opts, rowData){
														if(rowData.status=="draft"){
															return false;
														}
														return true;
													}
												},
												{
													label:'挂起', 
													classes:'btn btn-primary fa fa-square ',
													action:'javascript:bpmDefine._toSuspend("{defId}")',
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementStart=="Y"&&rowData.status=="deploy"){
															return false;
														}
														return true;
													}
												},
												{
													label:'恢复', 
													classes:'btn btn-primary fa fa-reply',
													action:'javascript:bpmDefine._toRecover("{defId}")',
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementStart=="Y"&&rowData.status=="suspend"){
															return false;
														}
														return true;
													}
												},
												{
													label:'设置',
													classes:'btn btn-primary fa fa-cogs',
													action: "javascript:bpmDefine.setting('{defId}')",
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementSet=="Y"&& rowData.status!="draft"){
															return false;
														}
														return true;
													}
												},{
													label:'设计',
													classes:'btn btn-primary fa fa-share-alt',
													action:"javascript:bpmDefine._design('{defId}','{defKey}')",
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementEdit=="Y"){
															return false;
														}
														return true;
													}
												},{
													label:'删除',
													classes:'btn btn-primary fa fa-remove',
													action:__ctx+'/platform/bpmn/bpmDefine/remove.htm?defId={defId}',
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementDel=="Y"){
															return false;
														}
														return true;
													}
												},{
													label:'清除数据',
													classes:'btn btn-primary fa fa-trash',
													action:"javascript:bpmDefine._cleanData('{defId}')",
													hidden:function(opts, rowData){
														if(rowData.authorizeRight.managementClean=="Y"){
															return false;
														}
														return true;
													}
												}]
										} ]

							});
			me.initEvent($(this.consts.GRID));
		},
		//初始化顶部按钮
		_initToolbar:function(){
			var me = this;
			//导出
			$('a.fa-export').click(function(){
				var ids= $(me.consts.GRID).jqGrid('getGridParam', 'selarrrow');
				if(ids.length == 0){
					DialogUtil.toastr("请选择流程定义!");
					return ;
				}
				var frm=new com.lc.form.Form();
				frm.creatForm("frmExport","export.htm");
				frm.addFormEl("ids",ids.join(","));
				frm.submit();
			});	
			//导入
			$('a.fa-import').click(function(){
				DialogUtil.dialog({
					title:'导入流程定义',
					area: ['30%', '40%'],
					content:__ctx + '/platform/bpmn/bpmDefine/import.htm',
					btn:[{
		            	label: '导入',
		            	iconCls:'btn btn-primary fa fa-import',
		                action: function(dialog,index) {
		              	  	DialogUtil.getChildFrameWindow(index).upload(function(rtn){
		              	  			if(rtn){
		              	      	 		$(me.consts.GRID).trigger("reloadGrid"); // 重新载入
		              	  			}
		              	  	});
		                }
		            },{
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
				});
			});	
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 保存
			$(document).on('click', 'a.fa-save', function() {
				frm.ajaxForm({
					success : me._showResponse,
					data:{isSave:true}
				});
				if (frm.valid())
					form.submit();
			});
			// 发布
			$(document).on('click', 'a.fa-paper-plane', function() {
				frm.ajaxForm({
					success : me._showResponse,
					data:{isDeploy:true}
				});
				if (frm.valid())
					form.submit();
			});
		},
		_copy : function(defId, defKey, defName){
			DialogUtil.confirm('是否复制流程定义【'+defKey+':'+defName+'】',
				function(rtn) {
					if(!rtn)return;
				
					DialogUtil.prompt({
						formType: 0,
						value: defKey,
						title: '请输入新流程定义Key(原流程定义Key【'+defKey+'】)'
					}, function(value, index, elem){
						if(defKey === value){
							var msg = "流程定义Key【" + value + "】不能与原流程定义Key【" + defKey + "】一致";
							DialogUtil.warn(msg);
							return;
						}
						
						if(!isValidKey(value)){
							return;
						}
						
						DialogUtil.closeAll();
						DialogUtil.load("处理中...");
						
						var __url = __ctx+'/platform/bpmn/bpmDefine/copy.htm';
						$.ajax({
							type: 'POST',
							url: __url,
							data: "defId="+defId+"&newDefKey="+value,
							success: function(responseText) {
								DialogUtil.closeAll();
								var msg = new com.lc.form.ResultMessage(responseText);
								if (msg.isSuccess()) {
									window.location.reload(true);
									DialogUtil.msg(msg.getMessage());
								} else {
									DialogUtil.error(msg.getMessage());
								}
								
							},
							error: function(){DialogUtil.closeAll();}
						});
					});
				}
			);
		},
		setting:function(defId){
			var me = this;
			DialogUtil.dialog({
				maxmin:false,
				title:false,
				content:__ctx+'/platform/bpmn/bpmDefine/setting.htm?defId='+defId,
			    area: ['100%', '100%'],
				callback:function(rtn){
					$(me.consts.GRID).trigger("reloadGrid"); // 重新载入
				}
			});
		},
		webDesign:function(){
			window.open(__ctx+'/platform/bpmn/bpmDefinition/design.htm');
		},
		
		modelDesign:function(){
			DialogUtil.dialog({
				title:false,
				content: __ctx+"/platform/bpmn/bpmModeler/editor.htm",
			    area: ['100%', '100%'],
			    callback:function(){
			    	$("a.fa-search").click();
			    }
			});
		},
		
		_bpmnModelDesign:function(){
			// 在线建模
			$(document).on('click', '#bpmnModelDesign', function() {
				DialogUtil.dialog({
					title:false,
					content: __ctx+"/platform/bpmn/bpmModeler/editor.htm",
				    area: ['100%', '100%'],
				    callback:function(){
				    	$("a.fa-search").click();
				    }
				});
			})
		},
		
		/**
		 * 设置分类
		 */
		_setDefCategory : function(){
			var me = this;
			$(document).on('click', '#setCategory', function() {
				 var ids=$(me.consts.GRID).jqGrid('getGridParam','selarrrow');
					if (ids == null || ids.length == 0) {
						DialogUtil.toastr('还没有选择,请选择一项记录!');
						return;
					} 
				new BpmSetCategoryDialog({callback:function(typeId,dialog){
					var params={defIds:ids.join(","),typeId:typeId};
					var url=__ctx+'/platform/bpmn/bpmDefine/setCategory.htm';
					$.post(url,params,function(responseText){
						var obj=new com.lc.form.ResultMessage(responseText);
						if(obj.isSuccess()){
							DialogUtil.msg('操作成功!');
							dialog.close();
							var url=location.href.getNewUrl();
							location.href=url;
						}
						else{
							DialogUtil.error("错误提示",obj.getMessage());
						}
					}); 
				}}).show();
			})
		},
		
		
		/**
		 * 在线建模函数
		 */
		bpmnModelDesign:function(){
			DialogUtil.dialog({
				title:false,
				content: __ctx+"/platform/bpmn/bpmModeler/editor.htm",
			    area: ['100%', '100%'],
			    callback:function(){
			    	$("a.fa-search").click();
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/bpmn/bpmDefine/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		//==========================TODO 树管理页面=======================
		_initTypeTree:function(){
			var me = this;
			me.categoryKey ='FLOW_TYPE';
		  	var typeTree =  new TypeTree( $(this.consts.TYPE_TREE),{
			  	categoryKey: me.categoryKey,
				onClick:function(event, treeId, treeNode){
					var typeId =treeNode.id;
					if(treeNode.isRoot == 1)typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.fa-search").click();
				},
				onRightClick:function(event, treeId, treeNode){
		  			if (!treeNode) 
		  				return false ;
					var	menu=$('#typeMenu');
					
					menu.contextMenu(event,{
						onItem: function(context, ev) {
							var target =$(ev.target), 
							action = target.data("action");
						if (target.hasClass('disabled'))
							return false;
							switch (action) {
								case "node_add":// 新增节点
									me._addNode(treeNode);
									break;
								case "node_edit":// 编辑节点
									me._editNode(treeNode);
									break;
								case "node_del":// 删除节点
									me._delNode(treeNode);
									break;
								case "node_sort":// 节点排序
									me._sortNode(treeNode);
									break;
							}
						}
					});
		  		}
			}); 
		  	this._initLayout();
		},
		
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
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
			layout.addPinBtn(".pinBtn", "west" );
		},
		
		//右键菜单项事件
		/**
		 * 增加分类
		 */
		_addNode : function(node){
			var isRoot=0;
			var me = this;
			console.info(node);
			if(node.parentId==me.categoryKey) isRoot = 1;
			if(node.parentId===1)isRoot = 1;
			var url=__ctx+"/platform/cat/type/edit.htm";
			url = url+"?parentId="+node.id+"&isPriNode="+0+"&isRoot="+isRoot;
			url = url+"&categoryKey=FLOW_TYPE"+"&parentName="+node.name+"&isDialog=1";
			
			DialogUtil.dialog({
				content: url,
				 area: ['60%', '50%'],
				 btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var  data = DialogUtil.getChildFrameWindow().getTypeData();
						  if(data.length>0){
								var url=__ctx +'/platform/cat/type/saveType.htm';		
								var params = {typeVo:data};
								$.post(url,params,function(responseText){
								    var resultMessage = new com.lc.form.ResultMessage(responseText);
								    if (resultMessage.isSuccess()) {
								    	me._initTypeTree();
								    	DialogUtil.toastr(resultMessage.getMessage(),true);
								    }else{
								    	DialogUtil.error(resultMessage.getMessage());
								    }
								})
								DialogUtil.close(index);
						  }
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
		 * 编辑分类
		 */
		_editNode : function(node){
			var isRoot=0;
			var me = this;
			if(node.parentId==me.categoryKey) isRoot = 1;
			var url=__ctx+"/platform/cat/type/edit.htm";
			url = url+"?id="+node.id+"&parentId="+node.parentId+"&isPriNode="+0+"&isRoot="+isRoot;
			url = url+"&categoryKey=FLOW_TYPE"+"&parentName="+node.name+"&isDialog=1";
			
			DialogUtil.dialog({
				content: url,
				 area: ['60%', '50%'],
				 btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var  data = DialogUtil.getChildFrameWindow().getTypeData();
						  if(data.length>0){
								var url=__ctx +'/platform/cat/type/saveType.htm';		
								var params = {typeVo:data};
								$.post(url,params,function(responseText){
								    var resultMessage = new com.lc.form.ResultMessage(responseText);
								    if (resultMessage.isSuccess()) {
								    	me._initTypeTree();
								    	DialogUtil.toastr(resultMessage.getMessage(),true);
								    }else{
								    	DialogUtil.error(resultMessage.getMessage());
								    }
								})
								DialogUtil.close(index);
						  }
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
				    	me._initTypeTree();
				    } 
				});
			});
		
		},
		
		/**
		 * 启动流程
		 * @param defId
		 */
		_toStart:function(defId){
			DialogUtil.dialog({
				title:'启动流程',
				content:__ctx+'/platform/bpmn/instance/bpmInst/toStart.htm?defId='+defId,
			    area: ['100%', '100%']
			});
		},
		
		_toDeploy:function(defId){
			DialogUtil.confirm("确定要发布吗?",  function(r) {
                if (r) {
                	var url = __ctx+'/platform/bpmn/bpmDefine/deploy.htm';
                	$.post(url,{defId:defId},function(data){
        	 			var obj=new com.lc.form.ResultMessage(data);
        	 			if(obj.isSuccess()){
        	 				DialogUtil.toastr(obj.getMessage());
        	 				window.location.href = __ctx+'/platform/bpmn/bpmDefine/list.htm';
        	 			}else{
        	 				DialogUtil.error("发布流程定义失败",obj.getMessage());
        	 			}
        			});
                }
			});
		},
		_toSuspend:function(defId){
			DialogUtil.confirm("是否级联挂起运行实例?",  function(r) {
				var url = __ctx+'/platform/bpmn/bpmDefine/suspend.htm';
				$.post(url,{defId:defId,cascade:r},function(data){
					var obj=new com.lc.form.ResultMessage(data);
					if(obj.isSuccess()){
						DialogUtil.toastr(obj.getMessage());
						window.location.href = __ctx+'/platform/bpmn/bpmDefine/list.htm';
					}else{
						DialogUtil.error("挂起流程定义失败",obj.getMessage());
					}
				});
			});
		},
		_toRecover:function(defId){
			DialogUtil.confirm("是否级联恢复挂起实例?",  function(r) {
				var url = __ctx+'/platform/bpmn/bpmDefine/recover.htm';
				$.post(url,{defId:defId,cascade:r},function(data){
					var obj=new com.lc.form.ResultMessage(data);
					if(obj.isSuccess()){
						DialogUtil.toastr(obj.getMessage());
						window.location.href = __ctx+'/platform/bpmn/bpmDefine/list.htm';
					}else{
						DialogUtil.error("恢复流程定义失败",obj.getMessage());
					}
				});
			});
		},
		
		/**
		 * 清除数据
		 * @param defId
		 */
		_cleanData:function(defId){
			DialogUtil.confirm("确定要清除数据吗?",  function(r) {
                if (r) {
                	var url = __ctx+'/platform/bpmn/bpmDefine/cleanData.htm';
                	$.post(url,{defId:defId},function(data){
        	 			var obj=new com.lc.form.ResultMessage(data);
        	 			if(obj.isSuccess()){
        	 				DialogUtil.msg(obj.getMessage());
        	 			}else{
        	 				DialogUtil.error("清除数据失败",obj.getMessage());
        	 			}
        			});
                }
            });
		},
		
		/**
		 * 在线编辑设计
		 */
		_design:function(defId,defKey){
			DialogUtil.dialog({
				title:false,
				maxmin:false,
				content: __ctx+'/platform/bpmn/bpmModeler/editor.htm?defId='+defId+'&defKey='+defKey,
			    area: ['100%', '100%'],
			    callback:function(){
			    	$("a.fa-search").click();
			    }
			});
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
											    	me._initTypeTree();
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
		
		initEvent: function(receiveGrid){
			//批量挂起流程实例
			$(document).on("click", ".btn-primary.fa-suspend", function(){
				var ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				
				DialogUtil.confirm('确认批量挂起流程定义？',function(rtn){
					if(!rtn)
						return;
					DialogUtil.confirm("是否级联挂起运行实例?",  function(r) {
						var url = __ctx+'/platform/bpmn/bpmDefine/batchSuspend.htm?defIds='+ids+'&cascade='+r;
						console.log(ids);
						$.post(url,function(data){
							var obj=new com.lc.form.ResultMessage(data);
							if(obj.isSuccess()){
								DialogUtil.toastr(obj.getMessage());
								window.location.href = __ctx+'/platform/bpmn/bpmDefine/list.htm';
							}else{
								DialogUtil.error("批量挂起流程定义失败",obj.getMessage());
							}
						});
					});
				});
			});
			
			//批量恢复流程实例
			$(document).on("click", ".btn-primary.fa-recover", function(){
				var ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				
				DialogUtil.confirm('确认批量恢复流程定义吗？',function(rtn){
					if(!rtn)
						return;
					DialogUtil.confirm("是否级联恢复挂起实例?",  function(r) {
						var url = __ctx+'/platform/bpmn/bpmDefine/batchRecover.htm?defIds='+ids+'&cascade='+r;
						$.post(url,function(data){
							var obj=new com.lc.form.ResultMessage(data);
							if(obj.isSuccess()){
								DialogUtil.toastr(obj.getMessage());
								window.location.href = __ctx+'/platform/bpmn/bpmDefine/list.htm';
							}else{
								DialogUtil.error("批量恢复流程定义失败",obj.getMessage());
							}
						});
					});
				});
			});
			
		}
	};
})();
