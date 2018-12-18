/**
 * 流程定义选择框
 * 
 * <br>
	使用说明：
	<p>	new BpmDefinitionDialog({
					params:params,
					callback : function(data,index) {
						$('#defId').val(data.id);
						$('#defName').val(data.name);
						// defKey 流程定义key
						DialogUtil.close(index);
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'流程定义选择框'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：true；
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为data： 选择的数组， 类型 Array。 
										第二个参数为index：Dialog的索引，一般为回调数据后关闭窗口。
	</p>
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-01-06-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'流程定义选择框',
			url:__ctx+'/platform/bpmn/bpmDefine/dialog.htm',
			isSingle:false //是否单选
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	BpmDefinitionDialog= function(options){
		this.options = jQuery.extend({}, defaults, options);
	};
	
	BpmDefinitionDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options=me.options;
				DialogUtil.dialog({
					title:options.title,
					content:options.url,
					params: options,
					area:['85%','600px'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).bpmDefineSelector.getData();
			              	  if(data.length==0){
			              		  DialogUtil.toastr("请选择！");
			              		  return;
			              	  }
			              	  if(!options.callback){
			              		 DialogUtil.toastr("传入参数必须包含【callback】");
			              		 return;
			              	  }
			              	  options.callback(data,index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	options.callback([],index);
			                }
			            },  {
			            	label: '取消',
			            	iconCls:'btn btn-danger fa fa-cancel',
			                action: function(dialog,index) {
			                	if(options.cancelCallback){
			                		options.cancelCallback(index);
			                	}else{
			                		DialogUtil.close(index);
			                	}
			                }
			            }]
				});
			}
		};
})();