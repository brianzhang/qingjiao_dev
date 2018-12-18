/**
 *  流程变量选择框  
 *  调用方式
 *  var params ={defId:defId,nodeId:nodeId,type:user/group/both,initData:{}};
 *  new FlowVarDialog({params:params,callback:function(varData){ }})
 *  type :user/group/both,必填。
 *  defId：,nodeId： 获取节点的变量 必填
 *  initData : 回填数据，格式如下
 *  initData ={
 *  	source:'',
 *  	executorType:'group/user',
 *  	groupValType:'',   //executorType =group 出现
 *  	dimension:'',        //executorType =group 出现
 * 		userValType:'',      //executorType =user 出现
 * 		name:''
 *  }
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'流程变量选择',
			modal:true,
			resizable:true
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	FlowVarDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	FlowVarDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this;
				DialogUtil.dialog({
					title:this.options.title,
					content:__ctx+'/platform/bpmn/bpmNodeDef/flowVarDialog.htm?defId='+ this.options.params.defId+"&nodeId="+this.options.params.nodeId,
					params: this.options.params,
					area:['75%','80%'],
					 btn:[{
			            	label: ' 选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).getData();
			              	  if($.isEmpty(data)){
			              		  DialogUtil.toastr("请选择数据！");
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
	
