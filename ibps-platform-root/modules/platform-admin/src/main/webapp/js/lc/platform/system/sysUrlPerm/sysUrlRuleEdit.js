/**
 * @author hugh zhuang
 * 
 */
var sysUrlRulesEdit;
$(function() {
	sysUrlRulesEdit = new SysUrlRulesEdit();
	sysUrlRulesEdit.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#sysUrlRulesGrid",// 列表对象
		PAGER : "#sysUrlRulesPager",// 列表分页
		FORM : '#sysUrlRulesForm'// 表单form
	};
	/**
	 * ibps_SYSTEM_URL_RULES【地址拦截规则】 对象
	 * 
	 * @returns {SysUrlRulesEdit}
	 */

	SysUrlRulesEdit = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	SysUrlRulesEdit.prototype = {
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
			this._initEdit();
			this._initRemove();
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
			me._initCodeMirror();
		},
		/**
		 * 初始化脚本编辑器
		 */
		_initCodeMirror : function() {
			var height = $("#script").height();
			this._editor = CodeMirror.fromTextArea(document
					.getElementById("script"), {
				mode : "groovy",
				tabMode : "indent",
				lineNumbers : true
			});
			this._editor.setSize("100%", height);
		},

		/**
		 * 初始化编辑按钮
		 */
		_initEdit : function() {
			$(document)
					.on(
							'click',
							'a.fa-edit',
							function() {
								var id = $(this).closest('tr').find('input')
										.val();
								var url = __ctx
										+ '/platform/system/urlRules/edit.htm?id='
										+ id;
								DialogUtil
										.dialog({
											title : '编辑脚本',
											content : url,
											area : [ '60%', '68%' ],
											btn : [
													{
														label : '保存',
														classes : 'fa fa-check-circle',
														action : function(
																dialog, index) {
															DialogUtil
																	.getChildFrameWindow().sysUrlRulesEdit
																	.confirm(function(
																			rtn) {
																		if (rtn) {
																			DialogUtil
																					.close(index);
																			window.location
																					.reload(true);
																		}
																	});
														}
													},
													{
														label : '取消',
														classes : 'fa fa-times-circle',
														action : function(
																dialog, index) {
															DialogUtil
																	.getChildFrameWindow().sysUrlRulesEdit
																	.cancle(function(
																			rtn) {
																		if (rtn)
																			DialogUtil
																					.close(index);
																	});
														}
													} ]
										});
							});
		},

		/**
		 * 初始化删除按钮
		 */
		_initRemove : function() {
			$(document).on(
					'click',
					'a.fa-remove',
					function() {
						var id = $(this).closest('tr').find('input').val();
						var url = __ctx
								+ '/platform/system/urlRules/remove.htm?id='
								+ id;
						DialogUtil.confirm("是否删除该信息？", "提示信息", function(rtn) {
							if (rtn) {
								$.post(url, {
									"id" : id
								}, function(responseText) {
									var msg = new com.lc.form.ResultMessage(
											responseText);
									if (msg.isSuccess()) {
										DialogUtil.confirm(msg.getMessage(),
												function(rtn) {
													if (rtn) {
														DialogUtil.close();
														window.location
																.reload(true);
													}
												});
									} else {
										DialogUtil.error(msg.getMessage());
									}
								});
							}
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
								+ '/platform/system/urlRules/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/* 取消事件 */
		cancle : function(callback) {
			DialogUtil.confirm("是否关闭窗口？", "提示信息", function(rtn) {
				callback(rtn);
			});
		},

		/* 确定事件 */
		confirm : function(callback) {
			var script = sysUrlRulesEdit._editor.getValue();
			var id = $("#id").val();
			var sysUrlId = $("#sysUrlId").val();
			var enable = $("#enable").val();
			var descp = $("#descp").val();
			var sort = $("#sort").val();
			var g = /^[1-9]*[1-9][0-9]*$/;
		    if(g.test(sort)){
			var url = __ctx + "/platform/system/urlRules/save.htm";
			$.post(url, {
				"id" : id,
				"script" : script,
				"enable" : enable,
				"descp" : descp,
				"sort" : sort,
				"sysUrlId" : sysUrlId
			}, function(responseText) {
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(
							rtn) {
						callback(rtn);
					});
				} else {
					DialogUtil.error(msg.getMessage());
				}
			});
		}else{
			DialogUtil.error("序号必须是正整数！");
		}
		},

		/* 测试脚本 */
		valid : function(callback) {
			var sysUrlPermissonId = $("#id").val();
			var url = __ctx + '/platform/system/urlRules/edit.htm?sysUrlId='
					+ sysUrlPermissonId;
			DialogUtil
					.dialog({
						title : '编辑脚本',
						content : url,
						area : [ '30%', '40%' ],
						btn : [
								{
									label : '确定',
									classes : 'fa fa-check-circle',
									action : function(dialog, index) {
										DialogUtil.getChildFrameWindow().sysUrlRulesEdit
												.confirm(function(rtn) {
													if (rtn) {
														DialogUtil.close(index);
														window.location
																.reload(true);
													}
												});
									}
								},
								{
									label : '取消',
									classes : 'fa fa-times-circle',
									action : function(dialog, index) {
										DialogUtil.getChildFrameWindow().sysUrlRulesEdit
												.cancle(function(rtn) {
													if (rtn)
														DialogUtil.close(index);
												});
									}
								} ]
					});
		}
	};
})();
