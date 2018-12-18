/**
 * conditionScript【条件脚本】
 * 
 * <pre>
 * 作者：wude
 * 邮箱：819842974@qq.com
 * 日期：2015-12-16 09:29:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var conditionScript ;
$(function() {
	conditionScript  = new ConditionScriptSetting();
	conditionScript.init();
});

(function() {
	//定义常量
	var _consts = {
			FORM : '#conditionScriptSettingForm'// 表单form
	};
	
	ConditionScriptSetting = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ConditionScriptSetting.prototype = {
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
			var me = this;
			$(document).on("click","#condScript",function(){
				var  url = __ctx+'/platform/script/conditionScript/selector.htm';
				DialogUtil.dialog({
					title : '条件脚本',
					content : url,
				    area : ['60%', '80%'],
				    btn: [{
						   label:'确定',
						   iconCls : 'btn btn-primary fa fa-ok',
						   action:function(dialog,index){
							  var jsonStr = DialogUtil.getChildFrameWindow(index).getData();
							  $("#alias").val(jsonStr.aliasName);
							  $("#id").val(jsonStr.id);
							  var tbody = $("tbody","#settingTable").empty();
							  var params = JSON2.parse(jsonStr.argument);
							  for(var i=0;i<params.length;i++){
									var tr = scriptEdit._constructParamTr(params[i]);
									tbody.append(tr);
							  }
							  DialogUtil.close(index);
						   }
					   },
					   {
						   label:'取消',
						   iconCls : 'btn btn-danger fa fa-cancel',
						   action:function(dialog,index){
							    DialogUtil.close(index);
						   }
					   }]
				});
			})
		},
		_submitData:function(){
			var  url = __ctx+'/platform/script/conditionScript/execMethod.htm?';
			var id = $("#id").val();
			var paraValue = $("#paraValue").val();
			url+="id="+id+"&args="+paraValue;
			$.post(url, function(data) {
				$("#scriptResult").val(data.flag);
			});
		}
	};
})();


