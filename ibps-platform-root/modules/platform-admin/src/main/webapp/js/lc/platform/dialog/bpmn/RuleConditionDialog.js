/**
 *  脚本规则 {json:json,defId:defId,nodeId:nodeId}
 * @param json:回显的脚本{Script：‘’，conDesc:'条件描述'}
 * @return {}
 * 
 * <pre>
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017-2-17 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'构造条件',
			modal:true,
			resizable:true
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	RuleConditionDialog= function(options){
		this.options = $.extend({}, defaults, options);
		if(!this.options.params) this.options.params={ruleType:1};
	};
	
	RuleConditionDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this;
				DialogUtil.dialog({
					title:me.options.title,
					content:__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/ruleConditionDialog.htm?defId='+me.options.defId+'&nodeId='+me.options.nodeId,
					params: me.options.params,
					area:['75%','80%'],
					 btn:[{
			            	label: ' 选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
			              	  if($.isEmpty(data)){
			              		  return;
			              	  }
			              	  if(!me.options.callback){
			              		 DialogUtil.toastr("传入参数必须包含【callback】");
			              		 return;
			              	  }
			              	  me.options.callback(data,index);
			              	  DialogUtil.close(index);
			                }
			            }, {
			            	label: '取消',
			            	iconCls:'btn btn-danger fa fa-cancel',
			                action: function(dialog,index) {
			                	DialogUtil.close(index);
			                }
			            }]
				});
			}
		};
})();

/* 初始化取消事件 */
function initCancle(callback){
    DialogUtil.confirm("是否关闭窗口？", "提示信息",function(rtn) {
    	callback(rtn);
	});
}
