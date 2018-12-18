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
	codeTemplatedetail  = new CodeTemplateDetail();
	codeTemplatedetail.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#codeTemplateGrid",// 列表对象
			PAGER : "#codeTemplatePager",// 列表分页
			FORM : '#codegenForm'// 表单form
	};
	/**
	 * ibps_code_template 对象
	 * @returns {CodeTemplate}
	 */
	CodeTemplateDetail = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CodeTemplateDetail.prototype = {
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
						colNames: ['ID','模板名称','模板别名'],
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
								} ]
	
					});
		},
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
					me._getRowData(form);
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
						if(!rtn)
							window.location.reload(true);
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		_getRowData : function(form){
			var selectedIds = $("#codeTemplateGrid").jqGrid("getGridParam", "selarrrow");
			if(selectedIds==""){
				DialogUtil.msg("必须选择模板！");
			}else{
				$("#ids").val(selectedIds);
				form.submit();
				
			}
		},
		_initData : function(data){
			$("#tableName").val(data.tableName);
			$("#packageName").val(data.packageName);
			$("#className").val(data.className);
		},
	};
})();


