

/**
 * 套红模板
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：lium
 * 邮箱地址：1316679699@qq.com
 * 创建时间：2017-08-09 10:30:31
 *</pre>
 */
$(function() {
	officeTemplate  = new OfficeTemplate();
	officeTemplate.init();
	
	formUrl = officeTemplate.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#officeTemplateGrid",// 列表对象
			PAGER : "#officeTemplatePager",// 列表分页
			FORM : '#officeTemplateForm'// 表单form
	};
	/**
	 * 套红模板 对象
	 * @returns {OfficeTemplate}
	 */
	OfficeTemplate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	OfficeTemplate.prototype = {
		consts:	_consts,
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
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/office/officeTemplate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','模板名','模板类型','模板路径','创建者','修改者','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'NAME_'
				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'TYPE_',
				                	   formatter: 'select',
			                            formatoptions: {
			                                value: {
			                                    'plain': '普通模板',
			                                    'red': '套红模板'
			                                }
			                            }
				                	 					                	 	}, {
				                 	   name:'path',
				                	   index: 'PATH_'
				                	 					                	 	}, {
				                 	   name:'createBy',
				                	   index: 'CREATE_BY_'
				                	 					                	 	}, {
				                 	   name:'updateBy',
				                	   index: 'UPDATE_BY_'
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'CREATE_TIME_',
				                	 	formatter: 'timestamp'
				                	 	
				                	 	},{
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑模板',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript: officeTemplate.editTemplate("{id}")'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/office/officeTemplate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/office/officeTemplate/get.htm?id={id}'
									}]
								} ]
	
					});
			
			$("#uploadAdd").on("click",function(){
				 new UploadDialog({
					 callback:function(data){
						 GridList.search('#search');
					 }
				 }).show();
			});
		},
		/**
		 * 新建模板
		 */
		createTemplate : function(){
			new OfficeDialog({
				title : "新建模板",
				saveURL : __ctx + "/platform/office/officeTemplate/saveTemplate.htm"
			}).show();
		},
		/**
		 * 编辑模板
		 */
		editTemplate : function(id){
			new OfficeDialog({
				fileId : id,
				fileURL : __ctx + "/platform/office/officeTemplate/getFileById.htm?fileId=",
				title : "编辑模板"
			}).show();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				//formUrl.submit(me._showResponse);
				var name = $("#name").val();
				var type = $("input[name='m:officeTemplate:type']:checked").val();
				try{
					OfficePlugin.officeControlObj["template"].saveFile(name,type);
					window.location.href = __ctx+'/platform/office/officeTemplate/list.htm';
				}catch(err){
					DialogUtil.error("保存套红模板失败");
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/office/officeTemplate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


