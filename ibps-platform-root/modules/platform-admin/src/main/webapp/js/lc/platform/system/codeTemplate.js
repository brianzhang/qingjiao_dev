/**
 * ibps_code_template
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-04-25 09:39:50
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var codeTemplate  = new CodeTemplate();
	codeTemplate.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#codeTemplateGrid",// 列表对象
			PAGER : "#codeTemplatePager"// 列表分页
	};
	/**
	 * ibps_code_template 对象
	 * @returns {CodeTemplate}
	 */
	CodeTemplate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CodeTemplate.prototype = {
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
			this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/system/codeTemplate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','模板名称','模板别名','备注','模板类型','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'templateName',
				                	   index: 'template_name_'
				                	 					                	 	}, {
				                 	   name:'templateAlias',
				                	   index: 'template_alias_'
				                	 					                	 	},{
				                	   name:'memo',
				                	   index: 'memo_'
				                	 						                	}, {
				                 	   name:'templateType',
				                	   index: 'template_type_',
				                	   formatter : function(cellvalue,
												options, row) {
											if (cellvalue == '1') {
												return '系统模版';
											} else
												return '自定义模版';
										}
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/system/codeTemplate/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/system/codeTemplate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/system/codeTemplate/get.htm?id={id}'
									}]
								} ]
	
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
					},error:function(){
		            	$el.button('reset');
		            }
				});
				if (frm.valid())
					form.submit();
				else{
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/system/codeTemplate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


