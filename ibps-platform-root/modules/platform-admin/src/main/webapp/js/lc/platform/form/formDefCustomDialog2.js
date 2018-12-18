/**
 * 自定义对话框-绑定字段
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefCustomDialog = new FormDefCustomDialog();
	formDefCustomDialog.init();
});

/**
 * 获取数据
 */
function getData() {
	return formDefCustomDialog.getValue();
}


(function() {
	/**
	 * 自定义对话框 对象
	 * 
	 * @returns {FormDefCustomDialog}
	 */
	FormDefCustomDialog = function() {

	};

	/**
	 * 方法
	 */
	FormDefCustomDialog.prototype = {
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			var data = JSON.parse($("#data").val());

			var params = this.params = frameElement.dialog.params;

			if($.isEmpty(data))
				return;
			this.bo =  params.bo;
			this.extBo =  params.extBo;
			this.mode =  params.mode;
			this.boField =  this.getBoField();
			this.extBoField =  this.getExtBoField();
			this.filterConditions = data.filter_conditions;
			this.resultColumns = data.result_columns;
			this.fields= data.fields;
			
			this.initFieldMap();
			
			this.initConditionfield();
			
			this.initDynamicParams();
			
			this.initCustomDialog();

			this.setValue(params.value);

			$(".linkage-name").html(params.label);
		},
		getBoField : function() {
			if($.isEmpty(this.extBo)){
				return this.getExtBoField()
			}
			var options = [];
			options.push('<select name="bofield" class="form-control">');
			options.push('<option value="">-请选择-</option>');
			$.each(this.extBo, function(i, n) {//主表数据
				options.push("<option value='" + n.tableName + "." + n.key + "'>" + n.name
						+ "</option>");
			});
			if(!this.mode){
				$.each(this.bo, function(i, n) {//子表数据
					options.push("<option value='" + n.tableName + "." + n.key + "'>" + n.name
							+ "</option>");
				});
			}
			options.push("</select>");
			return options.join("");
		},
		getExtBoField : function() {
			var options = [];
			options.push('<select name="bofield" class="form-control">');
			options.push('<option value="">-请选择-</option>');
			if($.isEmpty(this.bo)){
				$.each(this.extBo, function(i, n) {
					options.push("<option value='" + n.key + "'>" + n.name
							+ "</option>");
				});
			}else{
				$.each(this.bo, function(i, n) {
					options.push("<option value='" + n.key + "'>" + n.name
							+ "</option>");
				});
			}
			options.push("</select>");
			return options.join("");
		}, 
		initCustomDialog : function() {
			var _this = this,options=[];
			$.each(this.resultColumns, function(i, n) {
				options.push("<tr><td data-name='" + n.name
						+ "' name='resultfield'>" + n.label
						+ "</td><td >" + _this.extBoField + "</td></tr>");
			});
			var tbody = $('#resultfieldTb');
			tbody.html(options.join(""));
		},
		initFieldMap:function(){
			this.fieldMap = {};
			var _this = this;
			$.each(this.fields, function(i, n) {
				_this.fieldMap[n.name] =n.label;
			});
		},
		initConditionfield:function(){
			
			this.dynamicParams = DataTemplateUtil.buildDynamicParams(this.filterConditions);
			this.isParamsNeeded =$.isNotEmpty(this.dynamicParams)? true:false;
	
		},
		
		initDynamicParams:function(){
			if(!this.isParamsNeeded)
				return false;
			var options=[];
			var _this = this;
			$.each(this.dynamicParams, function(i, n) {
				options.push("<tr><td data-name='" + n.field
						+ "' name='paramfield'>" +_this.fieldMap[n.field]
						+ "</td>" 
						+ "<td ><select name=\"bindmode\" class=\"form-control\"><option value=\"bind\">绑定表单字段</option></select></td>"//<option value=\"fixed\">固定值</option>
						+	"<td >" +_this.boField + "</td></tr>");
			});
			var tbody = $('#paramsTb');
			tbody.html(options.join(""));
			$("#dynamicParams").removeClass("hidden");
			
		},
		getValue : function() {
			var rtn = {}, results = [],params=[];

			$('#resultfieldTb tr').each(
					function(i, n) {
						var self = $(this), 
						result = self.find("[name=resultfield]"), 
						bo = self.find("[name=bofield]");
						var obj = {
							fieldName : result.data("name"),
							name : $(bo).val()
						};
						results.push(obj);
					});
			
			rtn.results = results;
			
			$('#paramsTb tr').each(
					function(i, n) {
						var self = $(this),
						param = self.find("[name=paramfield]"), 
						bindmode = self.find("[name=bindmode]").val(), 
						bo = self.find("[name=bofield]"),
						fixedValue =  self.find("[name=fixedvalue]");
						var obj = {
							fieldName : param.data("name"),
							mode:bindmode,
							value : bindmode =='bind'?bo.val():fixedValue.val()
						};
						
						params.push(obj);
					});
			rtn.params = params;	
			return rtn;
		},
		setValue : function(data) {
			if ($.isEmpty(data))
				return;
			var _this = this,
				resultfieldTb = $('#resultfieldTb');
				paramsTb = $('#paramsTb');
			if($.isNotEmpty(data.results))	{
				$.each( data.results,function(i,n){
					var bofield = resultfieldTb.find("[data-name="+n.fieldName+"]").siblings().children("[name=bofield]");
					bofield.val(n.name);
				});
			}
			
			if(this.isParamsNeeded && $.isNotEmpty(data.params)){
				$.each( data.params,function(i,n){
					var paramsTr =  paramsTb.find("[data-name="+n.fieldName+"]").siblings();
					 var  bofield = paramsTr.children("[name=bofield]");
					var	fixedValue =  paramsTr.children("[name=fixedvalue]");
					 if(n.mode == 'bind'){
						 bofield.val(n.value);
					 }else{
						 fixedValue.val(n.value);
					 }
			
				 });
			}
			
		}
	}
})();