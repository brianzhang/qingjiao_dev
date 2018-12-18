/**
 * 流程表单定义- 表单按钮
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-29 11:11:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmDefinitionButton  = new BpmDefinitionButton();
	bpmDefinitionButton.init();
});

(function() {
	//定义常量
	var 	_consts = {
			NODE_FORM : '#buttonNodeForm'// 表单form
	};
	/**
	 * 流程定义 对象
	 * @returns {BpmDefinitionButton}
	 */
	BpmDefinitionButton = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmDefinitionButton.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.NODE_FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, 
			form = $(this.consts.NODE_FORM);
			
			this.frm = form.form();
			
			this._initAlias();
		
			this._initData();
			// 触发表单验证
			this.frm.valid();
		},
		_initAlias:function(){
			var me = this;
			$("#alias").change(function(){
				var val=$(this).find("option:selected").text().trim();
				var script=$(this).find("option:selected").attr("script");
				if(val!="") $("#name").val(val);
				me.frm.valid();
				$("#aliasName").val(val);
				$("#supportScript").val(script);
				if(script=="false"){
					$("#divBeforevscript,#divAfterscript").hide();
				}else{
					$("#divBeforevscript,#divAfterscript").show();
				}
			});
		},
		_initData:function(){
			var params = frameElement.dialog.params;	
			var data = params.data;
			if($.isEmpty(data))
				return;
			$("#alias").val(data.alias).trigger("change");
			$("#name").val(data.name);
			$("#beforeScript").val(data.beforeScript);
			$("#afterScript").val(data.afterScript);
		}
		
	};
})();

function getData(){
	var data ={
			name:$("#name").val(),
			alias:$("#alias").val(),
			aliasName:$("#aliasName").val(),
			supportScript:$("#supportScript").val(),
			beforeScript:$("#beforeScript").val(),
			afterScript:$("#afterScript").val()
	};
	return data;
}