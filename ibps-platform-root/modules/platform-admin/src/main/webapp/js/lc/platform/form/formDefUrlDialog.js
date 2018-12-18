/**
 * 自定义对话框-url绑定字段
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefUrlDialog = new FormDefUrlDialog();
	formDefUrlDialog.init();
});

/**
 * 获取数据
 */
function getData() {
	return formDefUrlDialog.getValue();
}


(function() {
	/**
	 * 自定义对话框 对象
	 * 
	 * @returns {FormDefUrlDialog}
	 */
	FormDefUrlDialog= function() {

	};

	/**
	 * 方法
	 */
	FormDefUrlDialog.prototype = {
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			var params = this.params = frameElement.dialog.params;
			this.boField = this.getBoField(params);
			this.initAction();
			this.initData(params.value);
		},
		initAction:function(){
			var me = this;
		      //新增
		  	$(document).on("click", ".js-add", function() {
		  		var tr= me.getTr();
		  		 $('#resultfieldTb').append(tr);
		  	});
		},
		getTr:function(data){
			data = data?data:{fieldName:"",name:""};
			var tr=[];
			tr.push('<tr><td> <input type="text" name="fieldName" class="form-control" value="'+data.fieldName+'" /></td><td >'+ 
					this.getBoField(data.name) + '</td><td><a href="javascript:void(0);" class="btn btn-danger  fa fa-remove js-remove" title="删除"></a></td></tr>');
			
			return tr.join("");
		},
		getBoData:function(bo){
			var bos = [];
			$.each(bo, function(i, n) {
				bos.push({
					key: n.key,
					name: n.name
				});
			});
			return bos;
		},
		getBoField : function(key) {
			var bo = this.getBoData(this.params.bo),
				options = [];
			options.push('<select name="bofield" class="form-control">');
			options.push('<option value="">-请选择-</option>');
			$.each(bo, function(i, n) {
				options.push("<option value='" + n.key + "'  "+  ( key== n.key?"selected='selected'":"") +">" + n.name
						+ "</option>");
			});
			options.push("</select>");
			return options.join("");
		},
		initData : function(params) {
			$("#url").val(params.url?params.url:"");
			var resultfield =   params.fields?params.fields:[],
			options=[],
			me =this;
			$.each(resultfield, function(i, n) {
				options.push(me.getTr(n))
			});
			var tbody = $('#resultfieldTb');
			tbody.html(options.join(""));
		},

		getValue : function() {
			var fields = [];
			$('#resultfieldTb tr').each(
					function(i, n) {
						var self = $(this), result = self
								.find("[name=fieldName]"), 
							bo = self.find("[name=bofield]");
						fields.push({
							fieldName : result.val(),
							name : $(bo).val()
						});
					});
			return {
				url :$("#url").val(),
				fields:fields
			};
		}
	}
})();