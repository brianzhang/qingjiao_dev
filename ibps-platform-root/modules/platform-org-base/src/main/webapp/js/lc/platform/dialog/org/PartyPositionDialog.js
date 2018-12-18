/**
 * 岗位选择框
 * 
 * <br>
	使用说明：
	<p>	new PartyPositionDialog({
					params:params, params参数用JSON数组形式，类似于[{"id":"1","key":"1","name":"1"}]
					callback : function(posIds,posNames) {
						//业务代码处理
					}
				}).show();
	</p>
	<p>	new PartyPositionDialog({
					params:params,
					callback : function(data) {
						//业务代码处理
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'岗位选择框'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：false；
		isObj【可选】：是否返回对象 。类型 : Boolean，默认：false；
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为posIds： 选择的对象posIds数组， 类型 Array。 
										第二个参数为posNames： 选择的对象posNames数组， 类型 Array。
										第三个参数为data： 选择的对象数组， 类型 Array。
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
			title:'岗位选择框',
			url:__ctx+'/platform/org/partyPosition/dialog.htm',
			isSingle:false, //是否单选
			isObj:false//是否返回对象
	};	
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	PartyPositionDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	PartyPositionDialog.prototype={
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
					area:['60%','80%'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).partyPositionSelector.getData();
			              	  if($.isEmpty(data)){
			              		  DialogUtil.toastr("请选择！");
			              		  return;
			              	  }
			              	  if(!options.callback){
			              		 DialogUtil.toastr("传入参数必须包含【callback】");
			              		 return;
			              	  }
			              	  if(options.isObj){
			              		options.callback(data);
			              	  }else{
			              		var posIds=[],posNames=[];
			          			$.each(data, function(i, content) {
									var posId=content.id;
									var posName=content.name;
									posIds.push(posId);
									posNames.push(posName);
								});
			          			options.callback(posIds,posNames);
			              	  }
			              	  DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).partyPositionSelector.getData();
			                	if($.isEmpty(data)){
				              		  return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).partyPositionSelector.remove(content.id,content.key);
			                	});
			                	DialogUtil.getChildFrameWindow(index).partyPositionSelector.clearSelect();
			                	/*if(options.isObj){
				              		options.callback(data);
			                	}else{
			                		options.callback([], []);
			                	}
			                	DialogUtil.close(index);*/
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