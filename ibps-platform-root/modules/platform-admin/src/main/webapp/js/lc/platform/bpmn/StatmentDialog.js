/**
 * 产用于选择器
 * 
 * <br>
	使用说明：
	<p>	new StatmentDialog({
					title:'',	【可选】
					url:'',	【可选】
					isSingle:false,	【可选】
					params:params,	params参数用JSON数组形式，类似于[{"id":"1","key":"1","name":"1"}]
					callback : function(entityIds,entityNames) {
						//业务代码处理
					}
				}).show();
	</p>
	
	<p>	new StatmentDialog({
					params:params,
					callback : function(data) {
						//业务代码处理
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'参与者选择框'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：false；
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为entityIds： 选择的对象entityIds数组， 类型 Array。 
										第二个参数为entityNames： 选择的对象entityNames数组， 类型 Array。
										第三个参数为data： 选择的对象数组， 类型 Array。
	</p>
/**
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：zhongjh
 * 邮箱地址：zjh20140614@163.com
 * 创建时间：2017-10-30 11:10:25
 *</pre>
 */
(function() {
	var defaults = {
			title:'常用语选择器',
			url:__ctx+'/platform/bpmn/bpmDialog/statment.htm',
			isSingle:true //是否单选
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	StatmentDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	StatmentDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options=me.options,
					url =options.url;
				DialogUtil.dialog({
					title:options.title,
					content:url,
					params: options,
					area:['66%','88%'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			                	var data = DialogUtil.getChildFrameWindow(index).bpmDialogStatment.getData();
			              	  if($.isEmpty(data)){
			              		  DialogUtil.toastr("请选择！");
			              		  return;
			              	  }
			              	  if(!options.callback){
			              		 DialogUtil.toastr("传入参数必须包含【callback】");
			              		 return;
			              	  }
			              	  var content = '';
			              	  for(var i=0;i<data.length;i++){
			              		  if(!$.isEmpty(content)) content+=";"
			              		  content += data[i].name;
			              	  }
			              		  
			              	  options.callback(content);
			              	  
			              	  DialogUtil.close(index);
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