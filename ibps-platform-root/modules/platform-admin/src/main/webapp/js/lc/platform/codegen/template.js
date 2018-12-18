

/**
 * 代码模板
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-04 08:38:58
 *</pre>
 */
$(function() {
	template  = new Template();
	template.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#templateGrid",// 列表对象
			PAGER : "#templatePager",// 列表分页
			TYPE_TREE : "#typeTree", //左分类树
			FORM : '#templateForm'// 表单form
	};
	/**
	 * 代码模板 对象
	 * @returns {Template}
	 */
	Template = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Template.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				this._initRefresh();
			}
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		_initRefresh:function(){
			$("#resetTemplate").on("click", function(){
				var $el = $(this);
				
				DialogUtil.confirm('是否初始化模板',
					function(rtn) {
						if(rtn){
							var __url = __ctx + "/platform/codegen/template/init.htm";
							$el.button('loading');
							$.ajax({
								type: 'POST',
								url: __url,
								success: function(responseText){
									$el.button('reset');
									var msg = new com.lc.form.ResultMessage(responseText);
									if (msg.isSuccess()) {
										window.location.reload(true);
									} else {
										DialogUtil.error(msg.getMessage());
									}
								},
								error: function(){
									$el.button('reset');
									DialogUtil.error("初始化异常！");
								}
							});
						}
					}
				);
			});
		},
		
		_initTypeTree:function(){
			var me = this;
			me.categoryKey ='TEMPLATE_TYPE';
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
					/*var	menu=$('#typeMenu');
					
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
					});*/
		  		}
			}); 
		  	this._initLayout();
		},
		
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({ applyDefaultStyles: true,
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
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this._setDefCategory();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/codegen/template/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','模板key','模板名称','文件名','代码目录','模板路径','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'filename',
				                	   index: 'filename_'
				                	 					                	 	}, {
				                 	   name:'dir',
				                	   index: 'dir_'
				                	 					                	 	}, {
				                 	   name:'path',
				                	   index: 'path_'
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	 	formatter: 'timestamp',
				                	 	formatoptions: 'yyyy-MM-dd HH:mm:ss'
				                	 	},  {
									name : '__manage',
									width : 40,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/template/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										hidden : function (opts, rowData) {
											return undefined === rowData.isDef || null === rowData.isDef || '' === rowData.isDef || 'Y' === rowData.isDef;
										},
										action:__ctx+'/platform/codegen/template/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/template/get.htm?id={id}'
									}]
								} ]
	
					});
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
				new TemplateSetCategoryDialog({callback:function(typeId,dialog){
					var params={templateIds:ids.join(","),typeId:typeId};
					var url=__ctx+'/platform/codegen/template/setCategory.htm';
					$.post(url,params,function(responseText){
						var obj=new com.lc.form.ResultMessage(responseText);
						if(obj.isSuccess()){
							DialogUtil.msg('操作成功!');
							DialogUtil.closeAll();
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
					success : function(rText){
						$el.button('reset');
						me._showResponse(rText);
					},error:function(){
						$el.button('reset');
					}
				});
				$("#content").val(me._editor.getValue());
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset');
				}
			});
			me.initCodeMirror();
		},
		initCodeMirror:function(){
			var width = $("#content").width();
			var height = $("#content").height();
			this._editor = CodeMirror.fromTextArea(document.getElementById("content"), {
				mode: "text/html",
				tabMode: "indent",
				lineNumbers: true
			 });
			
			this._editor.setSize(width,height);
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/codegen/template/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


