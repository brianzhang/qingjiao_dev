

/**
 * 【Office列表】
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：lium
 * 邮箱地址：1316679699@qq.com
 * 创建时间：2017-08-07 14:23:54
 *</pre>
 */
var office;
$(function() {
	office  = new Office();
	office.init();
	
	formUrl = office.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#officeControlGrid",// 列表对象
			PAGER : "#officeControlPager",// 列表分页
			FORM : '#officeControlForm'// 表单form
	};
	/**
	 * 【Office列表】 对象
	 * @returns {Office}
	 */
	Office = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Office.prototype = {
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
						url :  __ctx+'/platform/office/officeControl/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','文件名','文件拓展名','文件大小','文件路径','创建者','修改者','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'fileName',
				                	   index: 'FILE_NAME_'
				                	 					                	 	}, {
				                 	   name:'ext',
				                	   index: 'EXT_'
				                	 					                	 	}, {
				                 	   name:'totalBytes',
				                	   index: 'TOTAL_BYTES_'
				                	 					                	 	}, {
				                 	   name:'filePath',
				                	   index: 'FILE_PATH_'
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
										label:'编辑office',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript: office.editOffice("{id}")'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx
										+ '/platform/office/officeControl/remove.htm?id={id}',
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/office/officeControl/get.htm?id={id}'
									}]
								} ]
	
					});
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
				var fileName = $("#fileName").val();
				try{
					OfficePlugin.officeControlObj["office"].saveFile(fileName);
					window.location.href = __ctx+'/platform/office/officeControl/list.htm';
				}catch(err){
					DialogUtil.error("保存失败");
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
							window.location.href = __ctx+'/platform/office/officeControl/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		createOffice : function(){
			new OfficeDialog({
				title : "新建office文档"
			}).show();
		},
		
		editOffice : function(id){
			new OfficeDialog({
				fileId : id,
				title : "编辑office文档"
			 }).show();
		},
	};
})();


