/**
 * 用户选择框
 * 
 * <br>
	使用说明：
	<p>	new PartyUserDialog({
					title:'',	【可选】
					url:'',	【可选】
					isSingle:false,	【可选】
					isObj:false,	【可选】
					type:1,	【可选】
					params:params,	params参数用JSON数组形式，类似于[{"userId":"1","account":"1","fullname":"1"}]
					callback : function(userIds,fullnames) {
						//业务代码处理
					}
				}).show();
	</p>
	<p>	new PartyUserDialog({
					params:params,
					callback : function(data) {
						//业务代码处理
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'用户选择框'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：false；
		isObj【可选】：是否返回对象 。类型 : Boolean，默认：false；
		type【可选】：根据类型获取对应范围数据 。类型 : int，默认：1；
					类型 1：默认获取所有维度的所有用户
						   2：获取当前用户所有组的所有下级 
						   3： 根据组织域、获取所有用户 
						   4：获取分级授权所拥有权限的下级用户
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为userIds： 选择的对象userIds数组， 类型 Array。 
										第二个参数为fullNames： 选择的对象fullNames数组， 类型 Array。
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
	var type=1;
	var defaults = {
			title:'用户选择框',
			url:__ctx+'/platform/org/partyUser/dialog.htm',
			isSingle:false, //是否单选
			isObj:false ,//是否返回对象
			type:1
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	PartyUserDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	PartyUserDialog.prototype={
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
			              	  var  data = DialogUtil.getChildFrameWindow(index).partyUserSelector.getData();
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
			              		var userIds=[],fullNames=[];
			          			$.each(data, function(i, content) {
									var userId=content.id;
									var fullName=content.fullname;
									userIds.push(userId);
									fullNames.push(fullName);
								});
			          			options.callback(userIds,fullNames);
			              	  }
			              	  DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).partyUserSelector.getData();
			                	if($.isEmpty(data)){
				              		  return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).partyUserSelector.remove(content.id,content.account);
			                	});
			                	DialogUtil.getChildFrameWindow(index).partyUserSelector.clearSelect();
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