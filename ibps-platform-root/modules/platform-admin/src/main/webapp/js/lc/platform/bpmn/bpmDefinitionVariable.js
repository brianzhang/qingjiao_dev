/**
 * 流程表单定义- 表单变量
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-29 11:11:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmDefinitionVariable  = new BpmDefinitionVariable();
	bpmDefinitionVariable.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : '#bpmDefinitionVariableForm'// 表单form
	};
	/**
	 * 流程定义 对象
	 * @returns {BpmDefinitionVariable}
	 */
	BpmDefinitionVariable = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmDefinitionVariable.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, 
			form = $(this.consts.FORM);
			
			this.frm = form.form();
		
			this._initData();
			// 触发表单验证
			this.frm.valid();
		},
		
		_initData:function(){
			var params = frameElement.dialog.params,
				data = params.data,
				nodes = params.nodes,
				options="";
			for(var i=0;i<nodes.length;i++){
				var node = nodes[i];
				options += "<option value='"+node.id+"'>"+node.name+"</option>";
			}
			$("#nodeId").append(options);
			
			if($.isEmpty(data))
				return;
			
			$("#nodeId").val(data.nodeId);
			$("#name").val(data.name);
			$("#key").val(data.key);
			$("#dataType").val(data.dataType);
			$("#isRequired").val(data.isRequired);
			$("#defaultVal").val(data.defaultVal);
			$("#description").val(data.description);
			
		}
		
	};
})();

function getData(){
	var data ={
			nodeId:$("#nodeId").val(),
			name:$("#name").val(),
			key:$("#key").val(),
			dataType:$("#dataType").val(),
			isRequired:$("#isRequired").val(),
			defaultVal:$("#defaultVal").val(),
			description:$("#description").val()
	};
	return data;
}