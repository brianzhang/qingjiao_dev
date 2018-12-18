
/**
 * 脚本   详情
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-17 14:02:55
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var scriptGet;
$(function() {
	scriptGet = new ScriptGet();
	var methodInfo = $("textarea[name='argument']").val();
	var param = scriptGet._constructParamTable(methodInfo);
	$("#paraInfo").empty().append(param);
});

(function() {
	// 定义常量
	var _consts = {

	};
	/**
	 * 条件脚本 对象
	 * 
	 * @returns {ConditionScriptGet}
	 */
	ScriptGet = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	ScriptGet.prototype = {
		consts : _consts,
		init : function() {

		},
		/**
		 * 创建参数表格行(详情页面构建参数信息)
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
			$("[name='paraDesc']", tr).text(p.paraDesc);
			$("[name='paraCt']", tr).val(p.paraCt);
			return tr;
		},
		/**
		 * 创建参数表格(详情页面构建参数信息)
		 */
		_constructParamTable : function(params) {
			var me = this;
			var table = $("#para-txt table").clone();
			var tbody = $("tbody", table).empty();
			var obj = eval(params); 
			for(var i = 0; i < obj.length; i++){//遍历json数组
				var tr = scriptGet._constructParamTr(obj[i]);
				tbody.append(tr);
			}
			return table;
		},
		/* 取消事件 */
		cancle : function(callback) {
			DialogUtil.confirm("是否关闭窗口？", "提示信息", function(rtn) {
				callback(rtn);
			});
		},
		/* 确定事件 */
		confirm : function(callback) {
			
			var className = $("#className").val();
			var methodName = $("#methodName").val();
			var params = $("#params").val();
			var url = __ctx + "condition.htm";
			$.post(url, {
				"className" : className,
				"methodName" : methodName,
				"params" : params,
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
		}
	};
})();