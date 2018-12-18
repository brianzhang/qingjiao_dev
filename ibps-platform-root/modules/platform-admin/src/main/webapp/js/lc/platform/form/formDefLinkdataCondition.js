/**
 * 关联属性-过滤条件
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefLinkdataCondition = new FormDefLinkdataCondition();
	formDefLinkdataCondition.init();
});

/**
 * 获取数据
 */
function getData() {
	return formDefLinkdataCondition.getValue();
}


(function() {
	/**
	 * 对象
	 * 
	 * @returns {FormDefLinkdataCondition}
	 */
	FormDefLinkdataCondition = function() {

	};

	/**
	 * 方法
	 */
	FormDefLinkdataCondition.prototype = {
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			var params = this.params = frameElement.dialog.params;
			
			this.fields = params.fields;
		
			
			this.fieldsHtml = this.getFields();

			
			this.filterConditions = params.filterConditions;
			
			this.initConditionfield();
			
			this.initDynamicParams();
			
			this.setData(params.data);
		},
		getFields : function() {
			var options = [];
			options.push('<select name="bindfield" class="form-control">');
			options.push('<option value="">-请选择-</option>');
			$.each(this.fields, function(i, n) {
				options.push("<option value='" + n.name + "'>" + n.label
						+ "</option>");
			});
			options.push("</select>");
			return options.join("");
		},
		initConditionfield:function(){
			
			this.dynamicParams = DataTemplateUtil.buildDynamicParams(this.filterConditions);
	
		},
		initFieldMap:function(){
			this.fieldMap = {};
			var _this = this;
			$.each(this.fields, function(i, n) {
				_this.fieldMap[n.name] =n.label;
			});
		},
		initDynamicParams : function() {
			var _this = this, options=[];
			$.each(this.dynamicParams, function(i, n) {
				options.push("<tr><td data-name='" + n.field
						+ "' name='paramfield'>" +n.field
						+ "</td>" 
						+ "<td ><select name=\"bindmode\" class=\"form-control\"><option value=\"bind\">绑定表单字段</option></select></td>"//<option value=\"fixed\">固定值</option>
						+	"<td >" +_this.fieldsHtml + "</td></tr>");
			});
			var tbody = $('#paramsTb');
			tbody.html(options.join(""));
		},
		getValue : function() {
			var  results = [];

			$('#paramsTb tr').each(
					function(i, n) {
						var self = $(this),
						param = self.find("[name=paramfield]"), 
						bindmode = self.find("[name=bindmode]").val(), 
						bindfield = self.find("[name=bindfield]"),
						fixedValue =  self.find("[name=fixedvalue]");
						var obj = {
							fieldName : param.data("name"),
							mode:bindmode,
							value : bindmode =='bind'?bindfield.val():fixedValue.val()
						};
						
						results.push(obj);
					});
			
			return results;
		},
		setData : function(data) {
			if ($.isEmpty(data))
				return;
			var _this = this,
				 paramsTb = $('#paramsTb');
	
				$.each(data,function(i,n){
					var paramsTr =  paramsTb.find("[data-name="+n.fieldName+"]").siblings();
					 var  bindfield = paramsTr.children("[name=bindfield]");
					var	fixedValue =  paramsTr.children("[name=fixedvalue]");
					 if(n.mode == 'bind'){
						 bindfield.val(n.value);
					 }else{
						 fixedValue.val(n.value);
					 }
			
				 });
			
		}
	}
})();