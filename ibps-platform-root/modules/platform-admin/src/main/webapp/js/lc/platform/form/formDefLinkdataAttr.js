/**
 * 关联属性-绑定字段
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefLinkdataAttr = new FormDefLinkdataAttr();
	formDefLinkdataAttr.init();
});

/**
 * 获取数据
 */
function getData() {
	return formDefLinkdataAttr.getValue();
}


(function() {
	/**
	 * 对象
	 * 
	 * @returns {FormDefLinkdataAttr}
	 */
	FormDefLinkdataAttr = function() {

	};

	/**
	 * 方法
	 */
	FormDefLinkdataAttr.prototype = {
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			var params = this.params = frameElement.dialog.params;

			
			this.fieldsHtml = this.getFields(params.fields);
			
			this.resultColumns = params.resultColumns;
			
			this.initHtml();
			
			this.setData(params.data);
		},
		getFields : function(fields) {
			var options = [];
			options.push('<select name="field" class="form-control">');
			options.push('<option value="">-请选择-</option>');
			$.each(fields, function(i, n) {
				options.push("<option value='" + n.name + "'>" + n.label
						+ "</option>");
			});
			options.push("</select>");
			return options.join("");
		},
		initHtml : function() {
			var _this = this,options=[];
			$.each(this.resultColumns, function(i, n) {
				options.push("<tr><td data-name='" + n.name
						+ "' name='resultfield'>" + n.label
						+ "</td><td >" + _this.fieldsHtml + "</td></tr>");
			});
			var tbody = $('#resultfieldTb');
			tbody.html(options.join(""));
		},
		getValue : function() {
			var  results = [];

			$('#resultfieldTb tr').each(
					function(i, n) {
						var self = $(this), 
						result = self.find("[name=resultfield]"), 
						name = self.find("[name=field]").val();
						
						if($.isEmpty(name))
							return true;
						var obj = {
							name :name ,
							field : result.data("name")
						};
						results.push(obj);
					});
			
			return results;
		},
		setData : function(data) {
			if ($.isEmpty(data))
				return;
			var _this = this,
				resultfieldTb = $('#resultfieldTb');
	
			$.each(data,function(i,n){
				var fieldObj = resultfieldTb.find("[data-name="+n.field+"]").siblings().children("[name=field]");
				fieldObj.val(n.name);
			});
			
			
		}
	}
})();