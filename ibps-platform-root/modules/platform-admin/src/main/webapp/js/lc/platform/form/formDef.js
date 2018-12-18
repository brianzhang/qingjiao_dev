/**
 * 表单定义
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-30 16:21:52
 *</pre>
 */
$(function() {
    formDef = new FormDef();
	formDef.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#formDefGrid",// 列表对象
		PAGER : "#formDefPager",// 列表分页
		TYPE_TREE : "#typeTree", //左分类树
	};
	/**
	 * 流程定义 对象
	 * @returns {FormDef}
	 */
	FormDef = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	FormDef.prototype = {
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
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
							{
								url : __ctx+ '/platform/form/formDef/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '表单定义ID', '表单名称', '表单key','表单状态', '创建时间', '当前版本号','管理' ],
								colModel : [
										{
											name : 'id',
											hidden : true,
											key:true
										},{
											name : 'name',
											index : 'NAME_',
											formatter : function(val, opts,
													rowData) {
												return '<a href="javascript:formDef.edit(\'\',\''
														+ rowData.id
														+ '\')">'
														+ val + '</a>';
											},
											 width :200
										},{
											name : 'key',
											index : 'KEY_'
										},{
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
													name : 'forbidden',
													value : '禁用',
													css : 'red'
												}
											]}
										},{
											name : 'version',
											index : 'VERSION_',
											 width :60
										},{
											name : 'version',
											index : 'VERSION_',
											 width :60
										},{
											name : '__manage',
											width : 40,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
												{
													label:'预览',
													classes:'btn btn-primary fa fa-eye',
													action: "javascript:formDef.preview('{id}')",
												},{
													label:'表单权限',
													classes:'btn btn-primary fa fa-cog',
													action: "javascript:formDef.formRights('{key}')",
												},{
													label:'数据模版',
													classes:'btn btn-primary fa fa-bars',
													action: "javascript:formDef.formDataTemplate('{key}')",
												},{
													label:'编辑',
													classes:'btn btn-primary fa fa-edit',
													action: "javascript:formDef.edit('','{id}')",
												},{
													label:'删除',
													classes:'btn btn-primary fa fa-remove',
													action:__ctx+'/platform/form/formDef/remove.htm?id={id}'
												}]
										} ]

							});
		},
		_initTypeTree:function(){
			var typeTree = new TypeTree($(this.consts.TYPE_TREE), {
				categoryKey : 'FORM_TYPE',
				onClick : function(event, treeId, treeNode) {
					var typeId = treeNode.id;
					if (treeNode.isRoot == 1)
						typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.search").click();
				},
				onRightClick : function(event, treeId, treeNode) {
					
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
		createForm:function(){
			var me = this;
			DialogUtil.dialog({
				title : '新建表单',
				content : __ctx
						+ "/platform/form/formDef/create.htm",
				area : [ '55%', '80%' ],
				btn : [{
							label : '下一步',
							iconCls : 'btn btn-primary fa fa-ok',
							action : function(dialog, index) {
								var data = DialogUtil.getChildFrameWindow(index).formDefCreate.getNextData();
								if ($.isEmpty(data)) {
									return;
								}
								me.selectTemplate(data);
								DialogUtil.close(index);
							}
						},{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(dialog, index) {
								DialogUtil.close(index);
							}
						}]
			});	
		},
		selectTemplate:function(data){
			DialogUtil.dialog({
				title : '选择模版',
				content : __ctx+ "/platform/form/formDef/selectTemplate.htm",
				params:data,
				area : [ '100%', '100%' ],
				btn : [{
							label : '下一步',
							iconCls : 'btn btn-primary fa fa-ok',
							action : function(dialog, index) {
								var data = DialogUtil.getChildFrameWindow(index).formDefCreate.getNextData();
								if ($.isEmpty(data)) {
									return;
								}
								me.selectTemplate(data);
								DialogUtil.close(index);
							}
						},{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(dialog, index) {
								DialogUtil.close(index);
							}
						}]
			});	
		},
		/**
		 * 编辑设计表单
		 */
		edit:function(params,id){
			var url =  __ctx+ "/platform/form/formDef/design.htm";
			if(id)
				url +="?id="+id;
			else
				url +="?mode="+params.mode+"&code="+params.code;
			DialogUtil.dialog({
				params:params,
				callback:function(rtn){
					try {
						window.location.reload(true);
					} catch (e) {//出错不影响保存
					}
				},
				maxmin:false,
				title:false,
				area : [ '100%', '100%' ],
				content :url
				});
		},
		preview:function(id){
			var url =  __ctx+"/platform/form/formDef/preview.htm?id="+id;
		    DialogUtil.dialog({
		    	content:url,
		    	area: ['100%', '100%'],
				maxmin:false,
				title:false
		    });
		},
		formRights:function(key){
			new FormRightsDialog({
				formKey : key
			}).show();
		},
		formDataTemplate:function(key){
			var url =__ctx+"/platform/form/formDataTemplate/design.htm?formKey=" +key;
		    DialogUtil.dialog({
		    	content:url,
		    	area: ['100%', '100%'],
				maxmin:false,
				title:false
		    });
		}

	
	}
	})();