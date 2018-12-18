/**
 * 业务对象定义
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	boDef = new BODef();
	boDef.init();
});

(function($ , undefined) {
	$.fn.ibps_wizard = function(options) {

		this.each(function() {
			var $this = $(this);
			$this.wizard();

			var buttons = $this.siblings('.wizard-actions').eq(0);
			var $wizard = $this.data('wizard');
			
			$wizard.$prevBtn.remove();
			$wizard.$nextBtn.remove();
			
			$wizard.$prevBtn = buttons.find('.btn-prev').eq(0).on('click',  function(){
				$wizard.previous();
			}).attr('disabled', 'disabled');
			
			$wizard.$nextBtn = buttons.find('.btn-next').eq(0).on('click',  function(){
				$wizard.next();
			}).removeAttr('disabled');
			
			$wizard.nextText = $wizard.$nextBtn.text();
			
			var step = options && ((options.selectedItem && options.selectedItem.step) || options.step);
			if(step) {
				$wizard.currentStep = step;
				$wizard.setState();
			}
		});

		return this;
	}

})(window.jQuery);

(function() {
	// 定义常量
	var _consts = {
		GRID : "#boDefGrid",// 列表对象
		PAGER : "#boDefPager",// 列表分页
		
		FORM : '#boDefForm',// 表单form
		OPTIONS_FORM : '#boDefOptionsForm',// 表单form
		
		TREE:'#boDefTree', //内部BO树
		TYPE_TREE : "#typeTree", //左分类树
		
		VERSION_GRID:'#boDefVersionGrid',
		VERSION_PAGER : "#boDefVersionPager",// 列表分页
		
		ATTR_GRID:"#boDefAttr",
		
		EXTERNAL_TABLE:"#boDefExternalTable",
		EXTERNAL_TABLE_PAGER : "#boDefExternalTablePager"// 列表分页
	};
	/**
	 * 业务对象定义 对象
	 * 
	 * @returns {BODef}
	 */
	BODef = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	BODef.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
			if ($(this.consts.OPTIONS_FORM).length > 0)// 表单
				this._initOptionsForm();
			if ($(this.consts.FORM).length > 0)// 表单
				this._initForm();
			if($(this.consts.TREE).length > 0)//树形
				this._initTree();
			if ($(this.consts.VERSION_GRID).length > 0)// 列表
				this._initVersionGridList();
			if($(this.consts.EXTERNAL_TABLE).length > 0)//外部表列表
				this._initExternalTable();
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		_initTypeTree:function(){
			var me = this;
			me.categoryKey ='BO_TYPE';
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
		
		//TODO boDef列表=======================
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this._setDefCategory();
			$(this.consts.GRID).GridList({
								url : __ctx + '/platform/bo/boDef/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '对象定义ID', '名称', '编码','版本信息', '状态', '对象类型', '生成表', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'NAME_'
										},
										{
											name : 'code',
											index : 'CODE_'
										},
										{
											name : 'version',
											sortable : false,
											formatter:function(cellval, opts, rowdata) {
												var str='默认:<a href="manage.htm?id='+rowdata.id+'">版本('+cellval+')</a>';
												str+='&nbsp;&nbsp;&nbsp;';
												str+='<a href="versions.htm?code='+rowdata.code+'">更多版本('+rowdata.versionCount+')</a>';
												return str;
											}
										},
										{
											name : 'status',
											width : 50,
											index : 'STATUS_',
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'actived',
													value : '激活',
													css : 'green'
												}, {
													name : 'inactive',
													value : '未激活',
													css : 'blue'
												}, {
													name : 'forbidden',
													value : '禁用',
													css : 'red'
												} ]
											}
										},
										{
											name : 'boType',
											width : 85,
											index : 'BO_TYPE_',
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'out',
													value : '外部表',
													css : 'red'
												}, {
													name : 'object',
													value : '自建对象',
													css : 'green'
												} ]
											}
										},
										{
											name : 'isCreateTable',
											index : 'IS_CREATE_TABLE_',
											width : 70,
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'Y',
													value : '是',
													css : 'green'
												}, {
													name : 'N',
													value : '否',
													css : 'red'
												} ]
											}
										},
										{
											name : '__manage',
											width : 40,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [{
													label : '生成表',
													classes : 'btn btn-primary fa fa-cog',
													hidden:function(opts, rowData){
														return rowData.isCreateTable=='Y'||rowData.boType=='out'?true:false;
													},
													action:'javascript: boDef.genBoTable("{id}");'
													},
													{
														label : '复制',
														classes : 'btn btn-primary fa fa-copy',
														hidden:function(opts, rowData){
															return 'object' === rowData.boType ? false : true;
														},
														action:'javascript: boDef.copyDef("{id}", "{code}", "{name}");'
													},
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/bo/boDef/manage.htm?id={id}&action=edit'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/bo/boDef/remove.htm?id={id}&rmType=all'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/bo/boDef/manage.htm?id={id}&action=get'
													}]
										} ]

							});
			this._initToolbar();
		},
		copyDef : function(defId, defCode, defName){
			var me = this;
			
			DialogUtil.confirm(
				"是否复制业务对象【"+defCode+":"+defName+"】？"
				,"业务对象复制"
				,function(rt){
					if(!rt){
						return;
					}
					
					DialogUtil.prompt({
						formType: 0,
						value: defCode,
						title: '请输入新BO定义Code(原Bo定义Code【'+defCode+'】)'
					}, function(value, index, elem){
						if(defCode === value){
							var msg = "BO定义Code【" + value + "】不能与原BO定义Code【" + defCode + "】一致";
							DialogUtil.warn(msg);
							return;
						}
						
						if(!isValidKey(value)){
							return;
						}
						
						if(value.length > 18){
							DialogUtil.warn("编码长度大于18");
							return;
						}
						
						var newDefCode = value;
						
						DialogUtil.prompt({
							formType: 0,
							value: defName,
							title: '请输入新BO定义名称(原Bo定义名称【'+defName+'】)'
						}, function(value, index, elem){
							if(defName === value){
								var msg = "BO定义名称【" + value + "】不能与原BO定义名称【" + defName + "】一致";
								DialogUtil.warn(msg);
								return;
							}
						
							var newDefName = value;
							
							DialogUtil.closeAll();
							DialogUtil.load("处理中...");
						
							var url = __ctx + '/platform/bo/boDef/copy.htm';
							$.post(url, {defId : defId, defCode : newDefCode, defName : newDefName, cascade : rt},
								function(responseText){
									DialogUtil.closeAll();
									var resultMessage=new com.lc.form.ResultMessage(responseText);
									if(resultMessage.isSuccess()){
										$(me.consts.GRID).trigger("reloadGrid"); // 重新载入
										DialogUtil.alert(resultMessage.getMessage());
									}else{
										DialogUtil.error(resultMessage.getMessage());
									}
								}
							);
						});
					});
				}
				,true
			);
		},
		//TODO 初始化boDefList顶部按钮
		_initToolbar:function(){
			var me = this;
			//导出
			$('a.fa-export').click(function(){
				var ids= $(me.consts.GRID).jqGrid('getGridParam', 'selarrrow');
				if(ids.length == 0){
					DialogUtil.toastr("请选择业务对象!");
					return ;
				}
				
				DialogUtil.confirm(
					"是否进一步配置导出数据？否，则直接导出当前业务对象。"
					,"业务对象导出"
					,function(rt){
						if(rt){
							DialogUtil.dialog({
								title:'导出业务对象数据配置',
								area:["100%","100%"],
								content:__ctx + '/platform/bo/boDef/export.htm?ids='+ids.join(","),
								btn:[{
					            	label: '导出',
					            	iconCls:'btn btn-primary fa fa-export',
					                action: function(dialog, index) {
					              	  	var data = DialogUtil.getChildFrameWindow(index).boDefExport.getData();
					              	  	if(undefined == data || null == data || '' == data){
					              	  		return;
					              	  	}
					              	  	
					              	  	DialogUtil.close(index);
					              	  	var frm=new com.lc.form.Form();
										frm.creatForm("frmExport", "exportBo.htm");
										frm.addFormEl("ids", data);
										frm.submit();
					                }
					            },{
					            	label: '取消',
					            	iconCls:'btn btn-danger fa fa-cancel',
					                action: function(dialog, index) {
					                	DialogUtil.close(index);
					                }
					            }]
							});
						}else{
							var frm=new com.lc.form.Form();
							frm.creatForm("frmExport","exportBo.htm");
							frm.addFormEl("ids",ids.join(";"));
							frm.submit();
						}
					}
					,true
				);
			});	
			//导入
			$('a.fa-import').click(function(){
				DialogUtil.dialog({
					title:'导入业务对象',
					area: ['30%', '40%'],
					content:__ctx + '/platform/bo/boDef/import.htm',
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
		 * 生成bo表对象
		 * @param id
		 */
		genBoTable:function(id){
			var me = this,profix = $("#profix").val();
			var mmm = "确定生成表吗？";
			if(!$.isEmpty(profix)){
				mmm += "表名自动添加【"+profix+"】业务前缀。";
			}
			
		    DialogUtil.confirm(mmm, function(r){
		    	 if(!r)
		    		 return;
				var url = __ctx + '/platform/bo/boDef/genBoTable.htm?id='+id;
				var index = DialogUtil.load('生成中...');
				$.post(url,function(responseText){
					DialogUtil.close(index);
					var resultMessage=new com.lc.form.ResultMessage(responseText);
					if(resultMessage.isSuccess()){
						if($(me.consts.GRID).length > 0)$(me.consts.GRID).trigger("reloadGrid"); // 重新载入
						if($(me.consts.VERSION_GRID).length > 0)$(me.consts.VERSION_GRID).trigger("reloadGrid"); // 重新载入
						DialogUtil.alert(resultMessage.getMessage());
					}else{
						DialogUtil.error(resultMessage.getMessage());
					}
			   });
			});
		},
		
		/**
		 * 设置主版本
		 */
		setMainVersion:function(id){
			var me = this;
		    DialogUtil.confirm("确定设置为主版本吗？",function(r){
		    	if(!r) return;
		    	var url = __ctx + '/platform/bo/boDef/setMainVersion.htm?id='+id;
				var index = DialogUtil.load('设置中...');
				$.post(url,function(responseText){
					DialogUtil.close(index);
					var resultMessage=new com.lc.form.ResultMessage(responseText);
					if(resultMessage.isSuccess()){
						$(me.consts.VERSION_GRID).trigger("reloadGrid"); // 重新载入
						DialogUtil.alert(resultMessage.getMessage());
					}else{
						DialogUtil.error(resultMessage.getMessage());
					}
			   });
			});
		},
		
		//TODO boDef版本列表=======================
		/**
		 * 初始版本列表
		 */
		_initVersionGridList : function() {
			var me = this,code=$('#code').val();
			$(this.consts.VERSION_GRID).GridList({
						url : __ctx + '/platform/bo/boDef/listJsonByCode.htm?code='+code,
						pager : this.consts.VERSION_PAGER,
						colNames : [ '对象定义ID', '名称', '编码','版本号','主版本', '状态', '对象类型', '生成表', '管理' ],
						colModel : [
								{
									name : 'id',
									index : 'ID_',
									hidden : true,
									key : true
								},
								{
									name : 'name',
									index : 'NAME_'
								},
								{
									name : 'code',
									index : 'CODE_'
								},
								{
									name : 'version',
									index : 'VERSION_'
								},
								{
									name : 'isMain',
									sortable : false,
									formatter : 'dataFormat',
									formatoptions : {
										value : [ {
											name : 'Y',
											value : '是',
											css : 'green'
										}, {
											name : 'N',
											value : '否',
											css : 'blue'
										} ]
									}
								},
								{
									name : 'status',
									index : 'STATUS_',
									formatter : 'dataFormat',
									formatoptions : {
										value : [ {
											name : 'actived',
											value : '激活',
											css : 'green'
										}, {
											name : 'inactive',
											value : '未激活',
											css : 'blue'
										}, {
											name : 'forbidden',
											value : '禁用',
											css : 'red'
										} ]
									}
								},
								{
									name : 'boType',
									index : 'BO_TYPE_',
									formatter : 'dataFormat',
									formatoptions : {
										value : [ {
											name : 'out',
											value : '外部表',
											css : 'red'
										}, {
											name : 'object',
											value : '自建对象',
											css : 'green'
										} ]
									}
								},
								{
									name : 'isCreateTable',
									index : 'IS_CREATE_TABLE_',
									formatter : 'dataFormat',
									formatoptions : {
										value : [ {
											name : 'Y',
											value : '是',
											css : 'green'
										}, {
											name : 'N',
											value : '否',
											css : 'red'
										} ]
									}
								},
								{
									name : '__manage',
									width : 40,
									sortable : false,
									classes : 'rowOps',
									formatter : 'manage',
									formatoptions : [{
										label : '设置为主版本',
										classes : 'btn btn-primary fa fa-cog',
										hidden:function(opts, rowData){
											return rowData.isMain=='Y'?true:false;
										},
										action:'javascript: boDef.setMainVersion("{id}");'
									},{
										label : '生成表',
										classes : 'btn btn-primary fa fa-cog',
										hidden:function(opts, rowData){
											return rowData.isMain != 'Y' || rowData.isCreateTable == 'Y'?true:false;
										},
										action:'javascript: boDef.genBoTable("{id}");'
									},{
										label : '编辑',
										classes : 'btn btn-primary fa fa-edit',
										/*hidden:function(opts, rowData){
											return rowData.isMain != 'Y'?true:false;
										},*/
										action : __ctx
												+ '/platform/bo/boDef/manage.htm?id={id}&isMain={isMain}&action=edit'
									},{
										label : '删除',
										classes : 'btn btn-primary fa fa-remove',
										action : __ctx
												+ '/platform/bo/boDef/remove.htm?id={id}&rmType=signle'
									},
									{
										label : '明细',
										classes : 'btn btn-primary fa fa-detail',
										action : __ctx
												+ '/platform/bo/boDef/manage.htm?id={id}&isMain={isMain}&action=get'
									}]
								} ]

					});
		},
		
		//TODO boTree树管理页面=======================
		_initTree:function(){
			var me = this;
			this.boTreeId =this.consts.TREE;
			//初始化布局
			this.initLayout();
			
			this._treeRootId="0";
			// 树对象
			this.boTree =null;
			this.treeNodes =[];
			
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResize();
			});
			//初始化bo树
			this.initBoTree();
	        //初始化滚动
	        this.initLeftScroll();
	        //初始化树顶部菜单操作
			this.initTreeToolbar();
			//处理Bo的操作(包含保存，发布新版本)
			this.handerBoDef();
			
			//判断是新增还是修改
			var defId = $('#defId').val();
			if($.isEmpty(defId)){		//新增
				me.addNode({
					level:0,
					id:me._treeRootId
				});
			}else{
				var node = this.boTree.getNodeByParam("id",defId);
				this.boTree.selectNode(node);
				me.treeOnLeftClick(this,node);	
			}
		},
		
		/**
		 * 初始化布局
		 */
		initLayout:function(){
			var layout =   $('body').layout({ applyDefaultStyles: true,
				north:{
					spacing_open:			1	,	
					togglerLength_open:		0	,		
					togglerLength_closed:	-1	,
					resizable: 				false
				}});
			layout.addPinBtn(".pinBtn", "west" );
		},
		
		/**
		 * 初始化顶部菜单
		 */
		initTreeToolbar:function(isExt){
			var me  = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.refreshTree(isExt);
				}else	if($(this).hasClass("fa-expand")){//展开
					me.boTree.expandAll(true);
				} else{//收缩
					me.boTree.expandAll(false);	
				}
			});
		},
		
		/**
		 * 刷新左树信息
		 */
		refreshTree:function(isExt){
			if(isExt){
				this.loadExternalTree();
			}else{
				this.loadTree();
			}
		},
		
		/**
		 * 左侧菜单的滚动
		 */
		initLeftScroll:function(){
	    	$(this.boTreeId).niceScroll({
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
	    	$(this.boTreeId).getNiceScroll().resize();
		},
		
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-60);
			$(this.boTreeId).height( $(window).height()-155);
		},
		
		/**
		 * 
		 */
		initBoTree:function(){
			var treeObj = new this.BODefTree({
				name:"业务对象根节点"
			});
			this.treeNodes.push(treeObj);
			this.getBoDefJsonTree();
			this.loadTree();
		},
		
		/**
		 * 获取bo生成json树形
		 */
		getBoDefJsonTree:function(){
			var boDefJson = $('#boDefJson').val();
			if($.isEmpty(boDefJson))
				return;
			//转换成treeNodes
			var  json =  JSON.parse(boDefJson);
			// 主表
			this.builderTree(json,this._treeRootId,1);
			// 子表
			this.builderSubTree(json,1);
		},
		
		/**
		 * 子表树形结构
		 */
		builderSubTree:function(data,level){
			var sub = data.subBoDefs,pId=data.id;
				level = level+1;
			if(!$.isEmpty(sub) && sub.length >0 ){
				for(var i=0,c;c=sub[i++];){
					this.builderTree(c,pId,level);
					this.builderSubTree(c,level);
				}
			}
		},
		
		/**
		 * 构建树
		 * @param data
		 * @param pId
		 * @param level
		 */
		builderTree:function(data,pId,level){
			var boDef = {
					id:data.id,
					name : data.name,
					code : data.code,
					isMain : data.isMain,
					version : data.version,
					desc : data.desc,
					pk : data.pk,
					fk : data.fk,
					options : data.options,
					fromAttr : data.fromAttr,
					relation : data.relation,
					dsAlias : data.dsAlias,
					dsName : data.dsName,
					boType : data.boType,
					state : data.state,
					status : data.status,
					isMaster:data.isMaster,
					dataFormat : data.dataFormat,
					attrs :data.attrs
			};

			//构建树
			var treeObj = new this.BODefTree({
				id:data.id, 
				parentId:  pId,
				name:data.name,
				level:level,
				data:boDef
			});
			this.treeNodes.push(treeObj);
		},
		/**
		 * 加载树
		 */
		loadTree:function (){
			var me = this;
			this.expandByDepth = 1;
			var setting = {
				async: {enable: false},
				data: {
					key:{name:"name"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId",
						rootPId:this._treeRootId
					}
				},
				view: {
					selectedMulti: false,
					showIconFont:false
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
			
			this.boTree=$.fn.zTree.init($(this.boTreeId), setting,this.treeNodes);
			this.boTree.expandAll(true);
		},
		/**
		 * 树的右键菜单处理
		 * @param me
		 * @param treeNode
		 * @param e
		 */
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			
			if(action == 'get'){
				return;
			}
			
			me.boTree.selectNode(treeNode);
			var menu= treeNode.id==me._treeRootId?$('#topMenu'):$('#subMenu');
			// 已添加主业务对象不能继续添加
			if(treeNode.id == '0' && treeNode.children)
				return;
			$(".fa-add").parent().parent().show();
			
			//TODO 目前只支持3层业务对象
			if(3 === treeNode.level) $(".fa-add").parent().parent().hide();
			
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
						}
				}
			});
		},
		/**
		 * 树的点击
		 * @param me
		 * @param node
		 */
		treeOnLeftClick:function(me, node) {
			me.selectTreeNode = node;
			me.editNode(node);
		},
		/**
		 *  新增节点
		 * @param node 当前选中节点
		 */
		addNode:function(node){
			var me= this,
				level = node.level+1,
				isMain = node.isMain ? node.isMain : 'Y',
				isMaster = node.isMaster ? node.isMaster : 'Y',
				version = node.data && node.data.version ? node.data.version : '1',
				pid = node.parentId ? node.parentId : '-1',
				mattrs = node.data ? node.data.attrs : [],
				url=__ctx+"/platform/bo/boDef/edit.htm"
						+"?level="+level
						+"&isMain="+isMain
						+"&version="+version
						+"&action="+action
						+"&isMaster="+isMaster
						+"&pid="+pid;
			
			$("#listFrame").attr("src",url);
			var listIframe =$("#listFrame")[0];
			//传递参数
			listIframe.params= {
				level:level,
				mattrs:mattrs
			};
			//回调方法
			listIframe.callback = function(data,checkCode){
				if(checkCode){//检查是否存在
					return me.checkCodeExists(data);
				}else{
					data.parentId = node.id;
					var treeObj = new  me.BODefTree({
						id:data.id, 
						parentId:data.parentId,
						name:data.name,
						level:level,
						data:data
					});
					
					me.addTreeNode(treeObj);
					me.loadTree();
				}
			}
		},
		/**
		 * 编辑节点
		 * @param node
		 * @param level
		 */
		editNode:function(node){
			var me= this,
				level = node.level,
				isMain = node.data && node.data.isMain ? node.data.isMain : 'Y',
				isMaster = node.data && node.data.isMaster ? node.data.isMaster : 'Y',
				version = node.data && node.data.version ? node.data.version : '1',
				pid = node.parentId ? node.parentId : '-1',
				mattrs = node.getParentNode() && node.getParentNode().data ? node.getParentNode().data.attrs : [],
				url=__ctx+"/platform/bo/boDef/edit.htm"
						+"?level="+level
						+"&isMain="+isMain
						+"&version="+version
						+"&action="+action
						+"&isMaster="+isMaster
						+"&pid="+pid;
			
			$("#listFrame").attr("src",url);
			var listIframe =$("#listFrame")[0];
			//传递参数
			listIframe.params={
				data: node.data,
				level:level,
				mattrs:mattrs
			};
			//回调方法
			listIframe.callback = function(data,checkCode){
				if(checkCode){//检查是否存在
					return me.checkCodeExists(data,true);
				}else{
					me.setTreeNode(data, node.parentId);
					me.loadTree();
				}
			}
		},
		
		/**
		 * 检查业务编码是否存在
		 */
		checkCodeExists:function(data,isEdit){
			if($.isEmpty(data.code))
				return true;
			var flag = false;
			$.each(this.treeNodes,function(i,d){
				if(!d.data)
					return true;
				if(d.id == data.id)
					return true;
				if(d.data.code == data.code){
					flag= true;
					return false;
				}
			});
			return flag;
		},
		/**
		 *  设置树对象
		 * @param treeNode
		 */
		addTreeNode:function(treeNode){
			var me = this,treeNodes =[],__treeNode = null,isExist = false;
			
			var __treeNode = null;
			for (var i = 0; i < this.treeNodes.length; i++) {
				__treeNode = this.treeNodes[i];
				if(__treeNode.id == treeNode.id){
					isExist = true;
					__treeNode = treeNode;
				}
				
				treeNodes.push(__treeNode);
			}
			
			if(!isExist){
				treeNodes.push(treeNode);
			}
			
			this.treeNodes = treeNodes;
		},
		/**
		 *  设置树对象
		 * @param data
		 * @param parentId
		 */
		setTreeNode:function(data,parentId,nameKey){
			var me = this,treeNodes =[];
			
			for (var i = 0; i < this.treeNodes.length; i++) {
				var treeNode = this.treeNodes[i];
				if(treeNode.id == data.id){
					treeNode = {
							id:data.id, 
							parentId:parentId,
							name: nameKey?data[nameKey]:data.name,
							level:treeNode.level,
							data:data
					};
				}
				treeNodes.push(treeNode);
			}
			
			this.treeNodes = treeNodes;
		},
		/**
		 * 删除节点
		 * @param node
		 */
		delNode:function(node,isExt){
			var me = this;
		     DialogUtil.confirm("确定是否删除？",function(r){
		    	 if(!r)return;
	    		me.treeNodes = me.removeObj(me.treeNodes, node.id);
	    		me.refreshTree(isExt);
	    		var level = 0,url=__ctx+"/platform/bo/boDef/edit.htm?level="+level;
	    		$("#listFrame").attr("src",url);
				DialogUtil.msg("删除成功！");
		    });
		},
		/**
		 * BO对象Tree
		 * @param opts
		 * @returns {___anonymous8839_8841}
		 */
		BODefTree :function(opts){
			var obj = new Object();
			obj.id = opts.id?opts.id:"0";
			obj.parentId = opts.parentId?opts.parentId:null;
			obj.name = opts.name;
			obj.level =opts.level?opts.level:0;
			obj.data = opts.data;
			return obj;
		},
		/**
		 * 处理bo的相关操作
		 */
		handerBoDef:function(){
			var me = this;
			$(document).on('click', 'a.fa-save,a.fa-release', function() {
				if(!me.checkFormValid()){
					return;
				}
				me.handerOK(me);
				
				//构建成树形；
				var n = [];
				//$.cloneObject(me.treeNodes,n);
				n = $.extend([], me.treeNodes);
				var nodes = me.transformToTreeFormat(n);
				//属性字符数组
				var boDefs = new Array(), 
					mainBo =	nodes[0].children;
		
				if($.isEmpty(mainBo)){
					DialogUtil.msg("请设置主对象");return;
				}
				
				for(var i=0,c;c=mainBo[i++];){
					var bodef ={};
					me.getBoDef(c,bodef);
					if($.isEmpty(bodef.name) || $.isEmpty(bodef.code) ){
						DialogUtil.alert("请检查对象的数据");return;
					}
					boDefs.push(bodef)
				}
				
				var boDefStr = JSON.stringify(boDefs),
					url = __ctx+'/platform/bo/boDef/save.htm',
					saveType = $(this).hasClass("fa-release") ?"deploy":"save";
				
				if(saveType == 'deploy'){
					DialogUtil.confirm( '是否发布新版本？',function(r){
						if(r)
							me.handerSaveData(url,boDefStr,saveType);
					});
				}else{
					me.handerSaveData(url,boDefStr,saveType);
				}
			});
		},
		checkFormValid:function(){
			var  frameContents =$("#listFrame").contents(),
				form = frameContents.find(this.consts.FORM),
				frm = form.form(),
				tab = frameContents.find(".tab-pane.active"),
				canContinue = true;
			if(form.length == 0)
				return true;
			if(tab.attr("id") != 'tab-1'){
				//激活第一Tab
				frameContents.find('#boDefTabs a[href="#tab-1"]').tab('show');
				canContinue = frm.valid();
				frameContents.find('#boDefTabs a[href="#tab-2"]').tab('show');
			}else{
				canContinue = frm.valid();
			}
			return canContinue;
		},
		/**
		 * 处理保存数据和发布版本
		 * @param boDefStr
		 * @param saveType
		 */
		handerSaveData:function(url,boDefStr,saveType){
			var loading = DialogUtil.load('保存中...');
			$.post(url,{boDefs:boDefStr,saveType:saveType},function(responseText){
				DialogUtil.close(loading);
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.msg(msg.getMessage());
					window.location.href = __ctx + "/platform/bo/boDef/list.htm";
				}else{
					DialogUtil.error(msg.getMessage(),msg.getCause());
				}
			});
		},
		/**
		 * 表单编辑页面弹出框中保存BO
		 */
		saveBoDef:function(callback){
			var me 	= this,
				n 	= [];
			
			//$.cloneObject(me.treeNodes,n);
			n = $.extend([], me.treeNodes);
			var nodes = me.transformToTreeFormat(n);
			var boDefs = new Array(), mainBo = nodes[0].children;
			if($.isEmpty(mainBo)){
				//修改处
				var bo=new Array();
				for(var i=1;i<nodes.length;i++)
					bo.push(nodes[i]);
				mainBo = bo;
				if($.isEmpty(mainBo)){
					DialogUtil.alert("请至少设置个主对象");return;
				}
			}
			for(var i=0,c;c=mainBo[i++];){
				var bodef ={};
				me.getBoDef(c,bodef);
				boDefs.push(bodef)
			}
			var url = __ctx+'/platform/bo/boDef/save.htm',
				boDefStr = JSON.stringify(boDefs),
				saveType = '';
			
			$.post(url,{boDefs:boDefStr,saveType:saveType},function(data){
				callback();
			});
		},
		
		/**
		 * 获取属性信息
		 */
		getBoDef:function(bo,bodef){
			 $.extend(bodef, bo.data);
			 bodef.parentId = bo.parentId;
			 if(!$.isEmpty(bo.children))//有儿子节点
				 this.getChidrenBoDef(bo.children, bodef);
		},
		
		/**
		 * 递归孩子的属性信息
		 */
		getChidrenBoDef:function(bos,bodef){
			var subBoDefs = [];
			for(var i=0,c;c=bos[i++];){
				var bo = c.data;
				
				if(!$.isEmpty(c.children))//有儿子节点
					 this.getChidrenBoDef(c.children, bo);
				
				subBoDefs.push(bo);
			}
			bodef.subBoDefs = subBoDefs;
		},
		
		/**
		 * 转换成树结构
		 */
		transformToTreeFormat : function(sNodes) {
			var node =   this.transformToArrayFormat(sNodes);
			return node;
		},
		/**
		 * 转换成数组结构
		 */
		transformToArrayFormat : function(sNodes) {
			var i			= 0, 
				l 			= 0, 
				key 		= 'id', 
				parentKey 	= 'parentId', 
				childKey 	= 'children';
			
			if (!key || key == "" || !sNodes)
				return [];
			
			if ($.isArray(sNodes)) {
				var r = [];
				var tmpMap = [];
				for (i = 0, l = sNodes.length; i < l; i++) {
					tmpMap[sNodes[i][key]] = sNodes[i];
				}
				for (i = 0, l = sNodes.length; i < l; i++) {
					if (tmpMap[sNodes[i][parentKey]]
							&& sNodes[i][key] != sNodes[i][parentKey]) {
						if (!tmpMap[sNodes[i][parentKey]][childKey])
							tmpMap[sNodes[i][parentKey]][childKey] = [];
						tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
					} else {
						r.push(sNodes[i]);
					}
				}

				return r;
			} else {
				return [sNodes];
			}
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
				new BoSetCategoryDialog({callback:function(typeId,dialog){
					var params={defIds:ids.join(","),typeId:typeId};
					var url=__ctx+'/platform/bo/boDef/setCategory.htm';
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
		//TODO boDefEdit编辑表单页面=======================
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			this.$wizard = null;
			$("#stepContent").hide();
			$("#boContent").show();
			this.initParams();
			this.initTrigger();
			if($("#state").val() == 'exist') {
				$("#code").attr("readonly", "readonly");
			}
			this.initWizard();
		},
		/**
		 * 初始化表单
		 */
		_initOptionsForm : function() {
			var me = this;
			// 其它属性
			$("div[name='treeOptions']").hide();
			$('#struType', document).on('change',function(event){
				var options	= me.genOptions();
				var idKeyOpts = me.buildSelectAttrs(me.attrs, options.idKey);
				$("#idKey").html(idKeyOpts);
				var pIdKeyOpts = me.buildSelectAttrs(me.attrs, options.pIdKey);
				$("#pIdKey").html(pIdKeyOpts);
				var keyOpts = me.buildSelectAttrs(me.attrs, options.key);
				$("#key").html(keyOpts);
				if($(this).val() == 'tree'){
					$("div[name='treeOptions']").show();
				}else{
					$("div[name='treeOptions']").hide();
				}
			});
		},
		initWizard:function(){
			var _this =this;
			if(this.$wizardInit){
				return;
			}
			
			var isMaster = $('#isMaster').val();
			if('Y' === isMaster){
				$(":radio[name=boType][value=bo]").attr("disabled", true);
			}
			
			$("#stepContent").show();
			$("#boContent").hide();
			var buttons = $('#fuelux-wizard-container').siblings('.wizard-actions').eq(0);
			this.$wizard = 	$('#fuelux-wizard-container').ibps_wizard();
			this.$wizard.on('change', function(e, data) {
				if(!data){
					return;
				}
					
				var step = data.step, direction = data.direction;
				// 第1步的下一步操作
				if (step == 1 && direction == 'next'){
					// boType=new，新建bo，直接显示编辑页面
					if("new" == $(":radio[name=boType]:checked").val()){
						$("#stepContent").hide();
						$("#boContent").show();
						_this.setBoDefAttr();
						
						return true;
					}else if("bo" == $(":radio[name=boType]:checked").val()){
						$("[data-toggle='bodef']").data("type",'object');
					}else if("out" == $(":radio[name=boType]:checked").val()){
						$("[data-toggle='bodef']").data("type",'out');
						if('Y' === isMaster){
							$("[data-toggle='bodef']").addClass("hidden");
							$("#extDiv").removeClass("hidden");
						}
					}
				}
				
				// 第2步的下一步操作
				if (step == 2 && direction == 'next'){
					var boid = $("textarea[name=boid]").val();
					//TODO 判断是否循环引用
					if(_this.isCircle(boid)){
						DialogUtil.warn("BO定义存在循环引用或层次混乱！");
						return false;
					}
					
					if("bo" == $(":radio[name=boType]:checked").val()){
						if($.isEmpty(boid)){
							// boType=bo，选择bo为空，不能进行下一步
							DialogUtil.warn("请选择BO定义！");
							return false;
						}else{
							// boType=bo，选择bo不为空，跳转编辑页面
							$("#stepContent").hide();
							$("#boContent").show();
							
							// 设置数据
							return _this.getByBoDef(boid);
						}
					}else if("out" == $(":radio[name=boType]:checked").val()){
						if(!$.isEmpty(boid)){
							// boType=out，选择bo不为空，跳转编辑页面
							$("#stepContent").hide();
							$("#boContent").show();
							
							// 设置数据
							_this.getByBoDef(boid);
							
							return true;
						}
					}
				}
				
				// 第3步的上一步操作
				/*if (step == 3 && direction == 'previous'){
					if('Y' === isMaster){
						_this.$wizard.wizard('selectedItem', {step:1});
					}
				}*/
			})
			.on('stepclick', function(e, data) {
				//e.preventDefault();//this will prevent clicking and
				// selecting steps
				return true;
			})
			.on('finished', function(e, data) {
				//e.preventDefault();//this will prevent clicking and
				var tbldata = $("textarea[name=tbldata]").val();
				
				if($.isEmpty(tbldata)){
					// boType=out，选择table为空，不能进行下一步
					DialogUtil.warn("请选择外部数据表！");
					return;
				}else{
					// boType=out，选择table不为空，跳转编辑页面
					$("#stepContent").hide();
					$("#boContent").show();
					
					// 设置数据
					_this.transformExtTableToBoDef();
					
					return;
				}
				
				return true;
			});
		},
		/**
		 * 是否存在循环引用
		 */
		isCircle : function(boid){
			// 根节点
			var rootNode = parent.boDef.boTree.getNodes()[0];
			var selectNode = parent.boDef.boTree.getSelectedNodes()[0];
			if(!rootNode.children || 0 === rootNode.children.length){
				return false;
			}
			
			// 主业务对象
			var masterNode = rootNode.children[0];
			if(!masterNode.children || 0 === masterNode.children.length){
				return false;
			}
			
			var masterId = masterNode.id;
			if(masterId === boid){
				return true;
			}
			
			// 子业务对象
			var idArr = [];
			var childrens = masterNode.children;
			for(var i = 0, len = childrens.length; i < len; i ++){
				var children = childrens[i];
				var childrenArr = [];
				childrenArr.push(masterId);
				childrenArr.push(children.id);
				this.getIdArr(idArr, childrenArr, children.children);
			}
			
			var selectId = selectNode.id;
			for(var i = 0, len = idArr.length; i < len; i ++){
				if($.inArray(selectId, idArr[i]) >= 0 && $.inArray(boid, idArr[i]) >= 0){
					return true;
				}
			}
			
			return false;
		},
		getIdArr : function(idArr, childrenArr, childrens){
			if(undefined == childrens || 0 === childrens.length){
				idArr.push(childrenArr);
			}else{
				for(var i = 0, len = childrens.length; i < len; i ++){
					var children = childrens[i];
					var childrenArrTmp = [];
					$.cloneObject(childrenArr, childrenArrTmp);
					childrenArrTmp.push(children.id);
					this.getIdArr(idArr, childrenArrTmp, children.children);
				}
			}
		},
		/**
		 * 初始化参数
		 */
		initParams:function(){
			//树传入的对象
			var params = frameElement.params;
			
			if(params && params.mattrs){
				this.mattrs = params.mattrs;
			}else{
				this.mattrs = [];
			}
			
			this.initBoDef(params);
		},
		/**
		 * 初始化boDef
		 */
		initBoDef : function(params){
			this.$wizardInit = false;
			if(!params){
				params ={};
				params.level = $('#level').val();
				params.mattrs = [];
			}
			
			//初始化 字段属性
			this.initAttrGrid(params);
	
			var isMaster = 'Y'
			if(params) isMaster = params.level == 1 ? "Y" : 'N';
			if(isMaster == 'Y'){ //主数据对象
				 $(".mainBo").show();
				 $(".subBo").hide();
			}else{
				 $(".mainBo").hide();
				 $(".subBo").show();
				 
				 var optHtml = this.buildSelectAttrs(this.mattrs);
				 $("#fromAttr").html(optHtml);
			}
			
			$('#isMaster').val(isMaster);
			
			if(!params) return;
			
			var data = params.data;
			if(!data) {
				$(".outBo").hide();
				return;
			}else{
				if(data.boType=='out'){ //外部数据
					$(".outBo").show();
					$('#tblName').val(data.code);
				}else{
					$(".outBo").hide();
				}
			}
			
			this.$wizardInit = true;
			
			var pkOpts = this.buildSelectAttrs(this.attrs, data.pk);
			$("#pk").html(pkOpts);
			if(isMaster == 'N'){
				var fkVal = data.fk ? data.fk : 'parentId';
				data.fk = fkVal;
				var fkOpts = this.buildSelectAttrs(this.attrs, fkVal);
				$("#fk").html(fkOpts);
			}
			
			 $('#id').val(data.id);
			 $('#name').val(data.name);
			 $('#code').val(data.code);
			 $('#dsAlias').val(data.dsAlias);
			 $('#dsName').val(data.dsName);
			 $('#boType').val(data.boType);
			 $('#state').val(data.state);
			 $('#status').val(data.status);
			 $('#pk').val(data.pk);
			 $('#fk').val(data.fk);
			 this.parseOptions(data.options);
			 $('#fromAttr').val(data.fromAttr);
			 $('#relation').val(data.relation?data.relation:'one2many');
			 $('#dataFormat').val(data.dataFormat);
			 $('#desc').val(data.desc);
			 
			 this.setRights(data);
		},
		setRights : function(data){
			 if(action == 'get'){
				 $('#fk').attr("disabled", true);
				 $('#fromAttr').attr("disabled", true);
				 $('#relation').attr("disabled", true);
				 $('#name').attr("disabled", true);
				 $('#code').attr("disabled", true);
				 $('#dataFormat').attr("disabled", true);
				 $('#pk').attr("disabled", true);
				 $('#desc').attr("disabled", true);
				 
				 $('#struType').attr("disabled", true);
				 $('#idKey:visible').attr("disabled", true);
				 $('#pIdKey:visible').attr("disabled", true);
				 $('#key:visible').attr("disabled", true);
			 }else{
				 if(data.boTyoe != 'object' && data.state != 'new'){
					 $('#code').attr("disabled", true);
				 }
			 }
			 var form = $(this.consts.FORM), frm = form.form();
			 frm.valid();
		},
		/**
		 * 查询boDef
		 */
		getByBoDef : function(defId){
			var me = this
				,params = {}
				,_url = __ctx + "/platform/bo/boDef/isNew.htm"
				,url = __ctx + "/platform/bo/boDef/getJson.htm";
			
			$.post(_url, 
				{id: defId}
				,function(responseText){
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						$.post(url, 
							{id: defId}, 
							function (boDef) {
								if($.isEmpty(boDef)){
									DialogUtil.warn("BO数据异常！");
								} else {
									var level = $("#level").val();
									params.level = level;
									
									boDef.attrs = boDef.attrList;
									params.data = boDef;
									
									me.initBoDef(params);
									me.handerOK(me);
								}
							}
						);
					}else{
						$("#stepContent").show();
						$("#boContent").hide();
						me.$wizard.wizard('previous');
						DialogUtil.warn(msg.getMessage());
						return;
					}
				}
			);
		},
		/**
		 * 转换外部表为boDef
		 */
		transformExtTableToBoDef : function(){
			var me = this
				,params = {}
				,tbldata = $("textarea[name=tbldata]").val()
				,url = __ctx + "/platform/bo/boDef/getJsonByTbl.htm";
		
			$.post(url, 
				{boDefs: "["+tbldata+"]"}, 
				function (boDef) {
					if($.isEmpty(boDef)){
						DialogUtil.warn("外部表数据异常！");
					} else {
						var level = $("#level").val();
						params.level = level;
						
						boDef.boType = 'out';
						boDef.state = 'new';
						boDef.attrs = boDef.attrList;
						params.data = boDef;
						
						me.initBoDef(params);
						me.handerOK(me);
					}
				}
			);
		},
		/**
		 * 自动触发json生成
		 */
		initTrigger:function(){
			var me = this;
			/*$(document).on('blur', 'input[type=text],select:not(#struType),textarea', function(){*/
			$(document).on('blur', 'input[type=text],select,textarea', function(){
				me.handerOK(me);
			});
		},
		/**
		 * 确定按钮事件
		 */
		handerOK:function(me, qtip){
			var form 		= $(me.consts.FORM), 
				frm 		= form.form(), 
				pk 			= $("#pk").val(),
				isMaster	= $('#isMaster').val(),
				options		= this.genOptions();
			
			if($.isEmpty(pk)) pk = 'id';
			var pkOpts = this.buildSelectAttrs(me.attrs, pk);
			$("#pk").html(pkOpts);
			if(isMaster=='N'){
				var fk = $("#fk").val();
				if($.isEmpty(fk)) fk = 'parentId';
				var fkOpts =this.buildSelectAttrs(me.attrs, fk);
				$("#fk").html(fkOpts);
			}
			
			me.parseOptions(options);
			
			var name = $('#name').val();
			if($.isEmpty(name)){
				return false;
			}
			
			var tab = $(".tab-pane.active");
			var canContinue = false;
			var tabId = tab.attr("id");
			//激活第一Tab
			$('#boDefTabs a[href="#tab-1"]').tab('show');
			canContinue = frm.valid();
			if(!canContinue){
				return false;
			}
			//激活第二Tab
			$('#boDefTabs a[href="#tab-3"]').tab('show');
			canContinue = frm.valid();
			if(!canContinue){
				return false;
			}
			//激活原Tab
			$('#boDefTabs a[href="#'+tabId+'"]').tab('show');
	
			var boDef 			= {},
				id 				= $("#id").val()
				code			= $('#code').val(),
				boType			= $('#boType').val(),
				dsName			= $('#dsName').val(),
				dsAlias			= $('#dsAlias').val(),
				tblName			= $('#tblName').val(),
				state			= $('#state').val(),
				status			= $('#status').val(),
				pk				= $('#pk').val(),
				fk				= $('#fk').val(),
				fromAttr		= $('#fromAttr').val(),
				relation		= $('#relation').val(),
				desc 			= $('#desc').val(),
				df 				= $('#dataFormat').val();
			
			boDef.name = name;
			boDef.code = code;
			boDef.boType = boType;
			boDef.dsName = dsName;
			boDef.dsAlias = dsAlias;
			boDef.tblName = tblName;
			boDef.state = state;
			boDef.status = status;
			boDef.pk = pk;
			boDef.fk = fk;
			boDef.options = JSON.stringify(options);
			boDef.fromAttr = fromAttr;
			boDef.relation = relation;
			boDef.desc = desc;
			boDef.isMaster = isMaster;
			boDef.dataFormat = df;
			
			if($.isEmpty(id)){
				id = me.guid();
				$("#id").val(id);
			}
			
			boDef.id= id;
			
			var isExists = false;
			if(frameElement.callback && frameElement.callback != null)
				isExists = frameElement.callback(boDef, true);
			
			if(isExists){
				DialogUtil.msg("业务对象的标识[" + code + "]已存在了,请重新填写！");
				return false;
			}
			
			//检查code 是否重复
			$.post(__ctx+'/platform/bo/boDef/checkCode.htm',{
				id:id
				,code:code
				,isMain:isMain
				,isMaster:isMaster
				,pid:pid
				}
				,function(responseText){
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						//对象属性
						boDef.attrs = me.attrs;
						frameElement.callback(boDef);
						
						if(qtip) DialogUtil.msg("当前对象数据已缓存！");
					}else{
						DialogUtil.msg("业务对象的标识[" + code + "]已存在了,请重新填写！");
					}
			});
		},
		
		parseOptions : function(__options){
			/* 解析其它参数json{struType:*,idKey:*,pIdKey:*,key:*} */
			var idKeyOpts = this.buildSelectAttrs(this.attrs, '');
			$("#idKey").html(idKeyOpts);
			var pIdKeyOpts = this.buildSelectAttrs(this.attrs, '');
			$("#pIdKey").html(pIdKeyOpts);
			var keyOpts = this.buildSelectAttrs(this.attrs, '');
			$("#key").html(keyOpts);
			
			if($.isNotEmpty(__options)){
				var options = __options;
				if(!options.struType) options.struType = 'list';
				
				$("#struType").val(options.struType);
				idKeyOpts = this.buildSelectAttrs(this.attrs, options.idKey);
				$("#idKey").html(idKeyOpts);
				pIdKeyOpts = this.buildSelectAttrs(this.attrs, options.pIdKey);
				$("#pIdKey").html(pIdKeyOpts);
				keyOpts = this.buildSelectAttrs(this.attrs, options.key);
				$("#key").html(keyOpts);
				if(options.struType == 'tree'){
					$("div[name='treeOptions']").show();
				}else{
					$("div[name='treeOptions']").hide();
				}
			}
		},
		genOptions : function(){
			/* 生成其它参数json{struType:*,idKey:*,pIdKey:*,key:*} */
			var options = $(this.consts.OPTIONS_FORM).serializeObject();
			if(options.struType == 'tree'){
				if($.isEmpty(options.idKey)){
					DialogUtil.warn("请输入其它属性->树ID字段！");
					throw new Error("请输入其它属性->树ID字段！");
				}
				if($.isEmpty(options.pIdKey)){
					DialogUtil.warn("请输入其它属性->树父ID字段！");
					throw new Error("请输入其它属性->树父ID字段！");
				}
				if($.isEmpty(options.key)){
					DialogUtil.warn("请输入其它属性->树展示字段！");
					throw new Error("请输入其它属性->树展示字段！");
				}
			}
			
			return options;
		},
		
		/**
		 *  生成个随机的ID
		 * @returns {String}
		 */
		guid:function  () {
			var a = function() {
				return Math.floor(Math.random() * 0x10000).toString(16);
			};
			return (a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a());
		},
	
		//TODO boDef属性页面=======================
		setBoDefAttr : function(){
			var lvl = $("#level").val();
			
			var pk = {id:this.guid(), name:'主键', code:'id', fieldName:'ID_', dataType:'varchar', attrLength : 64, precision : 0, format : ''};
			this.boDefAttrGrid.jqGrid("addRowData",  pk["id"], pk, "last");
			this.attrs =[pk];
			
			if('1' !== lvl){
				var fk = {id:this.guid(), name:'外键', code:'parentId', fieldName:'PARENT_ID_', dataType:'varchar', attrLength : 64, precision : 0, format : ''};
				this.boDefAttrGrid.jqGrid("addRowData",  fk["id"], fk, "last");
				this.attrs.push(fk);
			}
			
			var ip = {id:this.guid(), name:'IP地址', code:'ip', fieldName:'IP_', dataType:'varchar', attrLength : 15, precision : 0, format : ''};
			this.boDefAttrGrid.jqGrid("addRowData",  ip["id"], ip, "last");
			this.attrs.push(ip);
			
			var createBy = {id:this.guid(), name:'创建人', code:'createBy', fieldName:'CREATE_BY_', dataType:'varchar', attrLength : 64, precision : 0, format : ''};
			this.boDefAttrGrid.jqGrid("addRowData",  createBy["id"], createBy, "last");
			this.attrs.push(createBy);
			
			var createTime = {id:this.guid(), name:'创建时间', code:'createTime', fieldName:'CREATE_TIME_', dataType:'date', attrLength : 0, precision : 0, format : 'yyyy-MM-dd HH:mm:ss'};
			this.boDefAttrGrid.jqGrid("addRowData",  createTime["id"], createTime, "last");
			this.attrs.push(createTime);
			
			var updateBy = {id:this.guid(), name:'更新人', code:'updateBy', fieldName:'UPDATE_BY_', dataType:'varchar', attrLength : 64, precision : 0, format : ''};
			this.boDefAttrGrid.jqGrid("addRowData",  updateBy["id"], updateBy, "last");
			this.attrs.push(updateBy);
			
			var updateTime = {id:this.guid(), name:'更新时间', code:'updateTime', fieldName:'UPDATE_TIME_', dataType:'date', attrLength : 0, precision : 0, format : 'yyyy-MM-dd HH:mm:ss'};
			this.boDefAttrGrid.jqGrid("addRowData",  updateTime["id"], updateTime, "last");
			this.attrs.push(updateTime);
			
			var pkOpts = this.buildSelectAttrs(this.attrs, pk.code);
			$("#pk").html(pkOpts);
			if('1' !== lvl){
				var fkOpts =this.buildSelectAttrs(this.attrs, fk.code);
				$("#fk").html(fkOpts);
			}
		},
		/**
		 * 初始化字段表格
		 */
		initAttrGrid:function(params){
			var jqgridParams = {
				colNames : [ 'ID','名称', '编码', '字段', '属性类型'],
				colModel : [
				    {name:'id',hidden : true,key : true},
	            	{name : 'name'},
	            	{name : 'code'},
	            	{name : 'fieldName'},
					{name:'dataType', formatter : 'select',
	            	 formatoptions : {value : { 'varchar':'字符串','number':'数字', 'date':'日期','clob':'大文本'}
	            	}
				}],
				width: $(window).width()-45, 
				height: $(window).height()-200, 
				shrinkToFit : true,
				viewrecords : true
			};
			
			// 控制复选框是否出现
			if('get' == action){
				if($("#boAttrToolBar")) $("#boAttrToolBar").hide();
				jqgridParams.multiselect = false;
				jqgridParams.multiboxonly = false;
			}else{
				var boType = "object";
				if(params && params.data) boType = params.data.boType;
				
				if(boType == 'out'){
					if($("#boAttrToolBar")) $("#boAttrToolBar").hide();
					jqgridParams.multiselect = false;
					jqgridParams.multiboxonly = false;
				}else if(boType == 'object'){
					jqgridParams.multiselect = true;
					jqgridParams.multiboxonly = true;
				}
			}
			
			this.boDefAttrGrid = $(this.consts.ATTR_GRID).jqGrid(jqgridParams);
		
			this.attrs = [];
			if(params && params.data){
				if(params.data.attrs){
					this.attrs = params.data.attrs;
				}
			}
			
			if(this.attrs.length > 0){
				for(var i=0,c;c=this.attrs[i++];){
			     	this.boDefAttrGrid.jqGrid("addRowData",  c["id"], c, "last");
				}
			}
			
			//初始化字段（属性）操作
			this.initAttrOperation();
			//this.boDefAttrGrid.jqGrid('sortableRows', {items : '.jqgrow:not(.unsortable)'});
		},
		/**
		 * 初始化属性操作
		 */
		initAttrOperation:function(){
			var me = this,grid=this.boDefAttrGrid;
			
			//新增、编辑 属性
			$(document).on('click', '#addAttr,#editAttr', function() {
				var self = $(this),params = {},isEdit= false;
				if(self.hasClass("fa-edit")){
					//获取选中的
				     var selectedRowIds =  grid.jqGrid("getGridParam","selarrrow");
				     var len = selectedRowIds.length;
				     if( selectedRowIds.length ==0){
				    	 DialogUtil.toastr("请选择记录！");
				    	 return;
				     }
				     params = me.getObj(me.attrs, selectedRowIds[0]);
				     /*if('createTime' === params.code){
				    	 DialogUtil.toastr("【创建时间】不可编辑！");
				    	 return;
				     }*/
				     
				     isEdit = true;
				}
				
				DialogUtil.dialog({
					title:'属性设置',
					content:__ctx+"/platform/bo/boDef/attr.htm",
				    area: ['70%', '70%'],
				    params:params,
				    btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		                  	me.handerGridSave(grid,me.attrs,index,isEdit,true);
		                  	me.handerOK(me);
		                }
		            },{
		            	label: '应用',
		            	hide: isEdit,
		            	iconCls:'btn btn-success fa fa-save',
		                action: function(dialog,index) {
		                   	me.handerGridSave(grid,me.attrs,index,isEdit);
		                   	me.handerOK(me);
		                }
		            }, {
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
				});
			});
			
			//删除属性
			$(document).on('click', '#delAttr', function() {
			     var selectedRowIds =grid.jqGrid("getGridParam","selarrrow");
			     var len = selectedRowIds.length;
			     if(len == 0){
			    	 DialogUtil.toastr("请选择记录！");
			    	 return;
			     }
			     
			     DialogUtil.confirm("是否删除？",function(r){
			    	 if(r){
			    		 var ctIdx = -1;
					     for(var i = 0;i < len ;i ++) {
					    	 var id= selectedRowIds[i];
					    	 var params = me.getObj(me.attrs, id);
					    	 if('createTime' === params.code){
					    		 ctIdx = i;
						    	 DialogUtil.toastr("【创建时间】不可删除！");
						    	 continue;
						     }
					    	 
					    	 me.attrs = me.removeObj(me.attrs,id);
					    	 //grid.jqGrid("delRowData", id);
					     }
					     
					     if(me.attrs.length > 0){
					    	 grid.jqGrid("clearGridData");
							 for(var i=0,c;c=me.attrs[i++];){
						     	 me.boDefAttrGrid.jqGrid("addRowData",  c["id"], c, "last");
							 }
						 }
					     
					     me.handerOK(me);
			    	 }
			     });
			});
			//重置
			$(document).on('click', '#resetAttr', function() {
				DialogUtil.confirm("是否重置到初始属性？",function(r){
					if(r){
						//me.attrs =[];
						grid.jqGrid("clearGridData");
						me.setBoDefAttr();
						me.handerOK(me);
					}
				});
			});
			//上移
			$(document).on('click','#moveUpAttr',function(){
				 var selectedRowIds =grid.jqGrid("getGridParam","selarrrow");
			     var len = selectedRowIds.length;
			     if(len == 0){
			    	 DialogUtil.toastr("请选择记录！");
			    	 return;
			     }
			     if(len > 1){
			    	 DialogUtil.toastr("已经选择了多项,请选择一项进行操作");
			    	 return;
			     }
			     me.moveGrid(grid,selectedRowIds[0],true);
			     me.handerOK(me);
			});
			//下移
			$(document).on('click','#moveDownAttr',function(){
				 var selectedRowIds =grid.jqGrid("getGridParam","selarrrow");
			     var len = selectedRowIds.length;
			     if(len == 0){
			    	 DialogUtil.toastr("请选择记录！");
			    	 return;
			     }
			     if(len > 1){
			    	 DialogUtil.toastr("已经选择了多项,请选择一项进行操作");
			    	 return;
			     }
			     me.moveGrid(grid,selectedRowIds[0],false);
			     me.handerOK(me);
			});
		},
		
		/**
		 * 移动属性位置：isUp:上移，否则false：下移
		 */
		moveGrid:function(grid,selectedRowId,isUp){
		  var selectData = grid.jqGrid('getRowData',selectedRowId),
	    		rowData = grid.jqGrid('getRowData'),rowId = '',
	    		j = isUp?-1:1,
	    		position = isUp?'before':'after';
		   for(var i = 0;i < rowData.length ;i ++) {
			   if(rowData[i].id == selectedRowId){
				   rowId = rowData[i+j].id;
				   break;
			   }
		   }
		   if($.isEmpty(rowId))
			   return ;
		  grid.jqGrid('delRowData',selectedRowId);
		  grid.jqGrid("addRowData",selectedRowId, selectData,position,rowId);
		  grid.jqGrid('setSelection',selectedRowId,true);
		  
		  if(isUp){ //是为上移
			  this.moveObjAry(this.attrs,selectedRowId,rowId);
		  }else{
			  //是下移
			  this.moveObjAry(this.attrs,rowId,selectedRowId);
		  }
		},
		
		//TODO boDef数组操作============
		moveObjAry:function(objAry,upId,downId,key){
			if(!key)key =  'id';
			if(null == objAry || 0 == objAry.length){
				return;
			}
			
			var upIdx = 0, upObj = null, downIdx = 0, downObj = null;
			for(var i = 0, len = objAry.length; i < len; i ++){
				if(objAry[i][key] == upId){
					upIdx = i;
					upObj = objAry[i];
				}else if(objAry[i][key] == downId){
					downIdx = i;
					downObj = objAry[i];
				}
			}
			objAry[upIdx] = downObj;
			objAry[downIdx] = upObj;
		},
		pushObjAry: function(objAry,data,key){
			objAry.push(data);
		},
		/**
		 * 修改对象
		 * @param objAry
		 * @param data
		 * @param key
		 */
		updObjAry: function(objAry,data,key){
			if(!key)key =  'id';
			for (var i = 0; i < objAry.length; i++) {
				if(objAry[i][key]   == data[key])
					objAry[i] =data;
			}
		},
		/**
		 * 通过key和val，获取数组对象中的对象
		 */
		getObj : function(objAry,val,key){
			if(!key) key =  'id';
			for(var i=0,c;c=objAry[i++];){
				if(c[key] == val)
					return c;
			}
			return null;
		},
		removeObj : function (objAry,val,key){
			if(!key) key = 'id';
			return  $.grep(objAry,function(n,i){
	    		return n[key] == val;
	    	 }, true);
		},
		/**
		 * 处理表格保存
		 * @param grid
		 * @param index
		 * @param isEdit
		 * @param isRefresh
		 */
		//TODO 处理boDefAttr属性表格保存===============
		handerGridSave:function (grid,datas,index,isEdit,isRefresh){
			var me 	= this,
				d 	= DialogUtil.getChildFrameWindow(index).getData();
			
          	if($.isEmpty(d))
          		return;
          	
          	if(me.checkAttr(grid,d.code,isEdit,d.id)) {
          		DialogUtil.toastr("属性编码【" + d.code + "】已存在");return;
          	}
          	if(me.checkField(grid,d.fieldName,isEdit,d.id)) {
          		DialogUtil.toastr("字段名【" + d.code + "】已存在");return;
          	}
          	
            if(isEdit){//编辑操作
            	me.updObjAry(datas,d);
            	grid.jqGrid("setRowData", d.id, d);
            	DialogUtil.msg("修改成功！");
               	DialogUtil.close(index);
            }else{//新增
            	me.pushObjAry(datas,d);
            	grid.jqGrid("addRowData", d.id, d, "last");
            	if(!isRefresh)
            		DialogUtil.getChildFrameWindow(index).refresh();
            	else
                 	DialogUtil.close(index);
            	DialogUtil.msg("新增成功！");
            }
		},
		/**
		 * bo属性唯一校验
		 * @param grid		属性列表对象
		 * @param attrCode	属性编码
		 * @param isEdit	是否编辑状态
		 * @param attrId	属性ID
		 * @return {Boolean}
		 */
		checkAttr:function(grid, attrCode, isEdit, attrId){
			var record,records = this.attrs;
			for(var i = 0; i < records.length; i ++){
				record = records[i];
				if(isEdit && record.code == attrCode && record.id != attrId){//编辑操作
					return true;
				}
				if(!isEdit && record.code == attrCode){
					return true;
				}
			}
			
			return false;
		},
		/**
		 * bo字段唯一校验
		 * @param grid		属性列表对象
		 * @param fieldName	字段名
		 * @param isEdit	是否编辑状态
		 * @param attrId	属性ID
		 * @return {Boolean}
		 */
		checkField:function(grid, fieldName, isEdit, attrId){
			var record,records = this.attrs;
			for(var i = 0; i < records.length; i ++){
				record = records[i];
				if(isEdit && record.fieldName == fieldName && record.id != attrId){//编辑操作
					return true;
				}
				if(!isEdit && record.fieldName == fieldName){
					return true;
				}
			}
			
			return false;
		},
		_initExternalTable:function(){
			$(this.consts.EXTERNAL_TABLE).GridList({
				url : __ctx + '/platform/bo/boDef/tableListJson.htm',
				rowNum:null,
				multiboxonly:true,
				colNames : ['表名', '描述','字段' ],
				colModel : [{
							name : 'name',
							key : true
						},{
							name : 'comment'
						},{
							name:'columnList',
							formatter:'json',
							hidden:true
						}]
			});
		},
		//TODO 设置主键、外键下拉框值============
		buildSelectAttrs:function(attrs,selectedCode){
			 var opts ="";
			 if($.isEmpty(attrs))
				 return opts;
			 for ( var i = 0, c; c = attrs[i++];) {
					if(c.code==selectedCode){
						opts += "<option value='"+c.code+"' selected='selected' >"+c.name+"</option>";
					}else{
						opts += "<option value='"+c.code+"' >"+c.name+"</option>";
					}
				}
			 return opts
		}
	};
})();
