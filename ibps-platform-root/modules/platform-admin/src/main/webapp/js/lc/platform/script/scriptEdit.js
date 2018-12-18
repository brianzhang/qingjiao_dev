/**
 * 脚本编辑。
 */
var scriptEdit;

$(function() {
	scriptEdit = new ScriptEdit();
	scriptEdit.init();
	$("select[name='methodName']").change(scriptEdit._methodChange);
});

(function() {
	// 定义常量
	var _consts = {

	};
	/**
	 * 条件脚本 对象
	 * 
	 * @returns {ScriptEdit}
	 */
	ScriptEdit = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	ScriptEdit.prototype = {
		consts : _consts,
		init : function() {
//			this._initEdit();
		},
		/**
		 * 创建参数表格行
		 */
		_constructParamTr : function(p) {
			// TODO
			var tr = $("#para-txt table tbody tr").clone();
			if ($('#typeName').val() == "text") {
				$("input[name='paraName']", tr).val(p.paraName);
				$("input[name='paraName']", tr).attr("validate",
						"{'required':true}");
				if (p.isRequired == 1) {
					$("input[name='isRequired']", tr).each(function() {
						$(this).attr("checked", "checked");
					});
				}
			} else {
				$("[name='paraName']", tr).text(p.paraName);
			}
			$("[name='paraType']", tr).text(p.paraType);
			$("[name='paraDesc']", tr).val(p.paraDesc);
			$("input[name='paraDesc']", tr).attr("validate",
			"{'required':true}");
			$("[name='paraCt']", tr).val(p.paraCt);
			if (p.dialog) {
				var settingSpan = $('#settingSpan', tr);
				settingSpan.show();
				$("#dialog-type", settingSpan).find(
						"option[value='" + p.dialog + "']").attr("selected",
						"selected");
				dialogChange($("#dialog-type", settingSpan));
				$("#dialog-param", settingSpan).find(
						"option[value='" + p.target + "']").attr("selected",
						"selected");
			}
			return tr;
		},
		/**
		 * 创建参数表格
		 */
		_constructParamTable : function(params) {
			var me = this;
			var table = $("#para-txt table").clone();
			var tbody = $("tbody", table).empty();
			for (var i = 0; i < params.para.length; i++) {
				var p = params.para[i];
				var tr = scriptEdit._constructParamTr(p);
				tbody.append(tr);
			}
			return table;
		},

		// 选择的方法事件
		_methodChange : function() {
			var option = $(this).find("option:selected");
			if (!option)
				return;
			var methodInfo = option.data('methodInfo');
			if (!methodInfo)
				return;
			$("input[name='returnType']").val(methodInfo.returnType);
			var param = scriptEdit._constructParamTable(methodInfo);
			$("#paraInfo").empty().append(param);
			if ($('#typeName').val() == "text") {
				$("input[name='paraName']").each(function(n) {
									$(this).blur(function() {
										var me = $(this);
										var paraValue = me.val();
										$("input[name='paraName']").not(this).each(function(m) {
													var other = $(this);
													var value = other.val();
													if ('undefined' != typeof (paraValue)&& paraValue != null&& paraValue != ''&& paraValue == value) {
																$.topCall.warn('参数值不能为空！',"提示");
																	return false;
														}
										});
									});
								});
			}
		},

		// 获取该类的方法
		_getMethods : function(url) {
			$.post(url,'',function(r) {
								var data = eval("(" + r + ")");
								if (data.result) {
									var methods = data.methods, 
									methodSelect = $("select[name='methodName']").empty(), methodName = $("#methodName").val();
									for (var i = 0, c; c = methods[i++];) {
										var newOpt = $('<option></option>').val(c.methodName).text(c.methodName);
										if (c.methodName == methodName) {
											var paraData = $("textarea[name='argument']").val();
											if (!paraData) {
												paraData = eval("(" + paraData+ ")");
												c.para = paraData;
											};
											$(newOpt).attr("selected", true);
										}
										$(newOpt).data('methodInfo', c);
										methodSelect.append(newOpt);
									}
									methodSelect.trigger("change");
								} else {
									$.topCall.error(data.message, '出错了!');
								}
							});
		},

		/**
		 * 获取参数行的JSON字符口串
		 */
		_getTrJson : function() {
			var json = [];
			$("#paraInfo").find("tr").each(function() {
								var me = $(this);
								var paraNameSpan;
								if ($('#typeName').val() == "text") {
									paraNameSpan = $("input[name='paraName']",me);
								} else {
									paraNameSpan = $("span[name='paraName']",me);
								}
								if (!paraNameSpan || paraNameSpan.length == 0)
									return true;
								var paraTypeSpan = $("span[name='paraType']",me), 
								paraDescInput = $("input[name='paraDesc']", me), 
								paraCtlTypeSelect = $("[name='paraCt']", me), job = {};

								if ($('#typeName').val() == "text") {
									job.paraName = paraNameSpan.val();
									$("input[name='isRequired']", me).each(
													function() {
														if ($(this).attr("checked") == "checked") {
															job.isRequired = 1;
														} else {
															job.isRequired = 0;
														}
													});

								} else {
									job.paraName = paraNameSpan.text();
								}
								job.paraType = paraTypeSpan.text();
								job.paraDesc = paraDescInput.val();
								job.paraCt = paraCtlTypeSelect.val();
								if ($('#settingSpan', me).css('display') != 'none') {
									var dialog = $(
											"select[name='dialog-type']", me), target = $(
											"select[name='dialog-param']", me);
									job.dialog = dialog.val();
									job.target = target.val();
								}
								json.push(job);
							});

			return json;
		},

		/**
		 * 初始化脚本测试按钮
		 */
		_initEdit : function() {
			$(document).on('click','a.fa-eye',function() {
								// 获取选中行的id值
								var id = $("#conditionScriptGrid").jqGrid('getGridParam', 'selrow');
								var url = __ctx
										+ '/platform/script/conditionScript/test.htm?id='
										+ id;
								DialogUtil.dialog({
											title : '测试条件脚本',
											content : url,
											area : [ '60%', '80%' ],
											btn : [
													{
														label : '确定',
														iconCls : 'btn btn-primary fa fa-ok',
														action : function(dialog, index) {
															DialogUtil.getChildFrameWindow().conditionScriptGet
																	.confirm(function(rtn) {
																		if (rtn) {
																			DialogUtil.close(index);
																			window.location.reload(true);
																		}
																	});
														}
													},
													{
														label : '关闭',
														iconCls : 'btn btn-danger fa fa-cancel',
														action : function(dialog, index) {
															DialogUtil.getChildFrameWindow().conditionScriptGet.cancle(function(rtn) {
																		if (rtn)
																			DialogUtil.close(index);
																	});
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
