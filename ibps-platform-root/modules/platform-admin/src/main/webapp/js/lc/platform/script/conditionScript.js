/**
 * 条件脚本
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-16 14:59:46
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var conditionScript = new ConditionScript();
	conditionScript.init();
	$("select[name='className']").change(conditionScript._classNameChange).trigger("change");
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#conditionScriptGrid",// 列表对象
		PAGER : "#conditionScriptPager",// 列表分页
		FORM : '#conditionScriptForm'// 表单form
	};
	/**
	 * 条件脚本 对象
	 * 
	 * @returns {ConditionScript}
	 */
	ConditionScript = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	ConditionScript.prototype = {
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
			if ($(this.consts.FORM).length > 0)// 表单
				this._initForm();
			//初始化测试脚本按钮
			this._initShowDialog();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/platform/script/conditionScript/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '脚本的别名', '脚本描述', 
										 '方法名', '方法描述', '是否有效', '脚本类型',
										'管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'aliasName',
											index : 'alias_name_'
										},
										{
											name : 'aliasDesc',
											index : 'alias_desc_'
										},
										{
											name : 'methodName',
											index : 'method_name_'
										},
										{
											name : 'methodDesc',
											index : 'method_desc_'
										},
										{
											name : 'enable',
											index : 'enable_',
											formatter : function(cellvalue,
													options, row) {
												if (cellvalue == '1') {
													return '是';
												} else
													return '否';
											}
										},
										{
											name : 'type',
											index : 'type_',
											formatter : function(cellvalue,
													options, row) {
												if (cellvalue == '1')
													return '条件脚本';
												else if (cellvalue == '2')
													return '别名脚本';
												else if (cellvalue == '3')
													return '人员脚本';
												else
													return '';
											}
										},
										{
											name : '__manage',
											width : 45,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/script/conditionScript/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/script/conditionScript/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/script/conditionScript/get.htm?id={id}'
													} ]
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
                    },
                    error: function(){
                    	$el.button('reset'); 
                    }
				});
				if (frm.valid()){
					//给条件脚本中的参数列赋值
					var json = scriptEdit._getTrJson();
					json = JSON2.stringify(json);
					if(json=='[]'){
						json='';
					}
					$("textarea[name='argument']").val(json);
					form.submit();
				}else{
					$el.button('reset'); 
				}
			});
		},
		// 类名选择事件
		_classNameChange:function() {
			var className = $(this).val();
			if (!className)
				return;

			var match = /^.*\.(\w*)$/.exec(className), name = '';
			if (match != null) {
				name = match[1];
			}
			if (!name)
				return;
			name = name.toLowerCase().split("", 1) + name.slice(1);
			$("input[name='classInsName']").val(name);
			var id = $("input[name='id']").val();
			var url = __ctx
					+ '/platform/script/conditionScript/getMethodsByClassName.htm?className='
					+ className+'&id='+id;
			scriptEdit._getMethods(url);
		},
		
		/**
		 * 初始化测试脚本方法
		 * @param conf
		 * @param method
		 */
		_initShowDialog:function(){
			$(document).on('click','a.fa-eye',function() {
				// 获取选中行的id值
				var id = $("#conditionScriptGrid").jqGrid('getGridParam', 'selrow');
				var url = __ctx
						+ '/platform/script/conditionScript/setting.htm?id='
						+ id;
				DialogUtil.dialog({
							title : '测试条件脚本',
							content : url,
							area : [ '60%', '80%' ],
							btn : [
									{
										label : '测试',
										iconCls : 'btn btn-primary fa fa-ok',
										action : function(dialog, index) {
											DialogUtil.getChildFrameWindow().conditionScript
													._submitData();
											
										}
									},
									{
										label : '关闭',
										iconCls : 'btn btn-danger fa fa-cancel',
										action : function(dialog, index) {
												DialogUtil.close(index);
										}
									} ]
						});
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
								+ '/platform/script/conditionScript/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
