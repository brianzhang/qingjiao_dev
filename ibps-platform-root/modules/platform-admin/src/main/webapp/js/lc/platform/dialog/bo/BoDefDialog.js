/**
 * 业务对象(BO)选择框
 * 
 * <br>
	使用说明：
	<p>	new BoDefDialog({
					params:params,
					callback : function(data,index) {
						$('#bos').val(data[i].id);
						$('#bo').html(data[i].name);
						DialogUtil.close(index);
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'业务对象选择框'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：true；
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为data： bo选择的对象数组，字段：{id:'', code:'', name:'', desc:'', version:''}， 类型 Array。 
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
			title:'业务对象选择框',
			url:__ctx+'/platform/bo/boDef/dialog.htm',
			isSingle:true, //是否单选
			table:'', //是否生成表 Y N
			type:'' //查找业务对象类型 object out
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	BoDefDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	BoDefDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options=me.options;
				DialogUtil.dialog({
					title:options.title,
					content:options.url,
					params: options,
					area:['60%','80%'],
					btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).boDefSelector.getData();
			              	  if(data == null && data.length <=0){
			              		  DialogUtil.toastr("请选择业务对象信息！");
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
			                	DialogUtil.close(index);
			                }
			            }]
				});
			}
		};
})();