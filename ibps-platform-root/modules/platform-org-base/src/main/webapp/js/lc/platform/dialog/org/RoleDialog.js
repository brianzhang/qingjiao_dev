/**
 * 角色选择器
 * 
 * <br>
	使用说明：
	<p>	new RoleDialog({
					params:params, params参数用JSON数组形式，类似于[{"id":"1","roleAlias":"1","name":"1"}]
					callback : function(roleIds,roleNames) {
						//业务代码处理
					}
				}).show();
	</p>
	<p>	new RoleDialog({
					params:params,
					callback : function(data) {
						//业务代码处理
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'角色选择器'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：false；
		isObj【可选】：是否返回对象 。类型 : Boolean，默认：false；
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为roleIds： 选择的对象roleIds数组， 类型 Array。 
										第二个参数为roleNames： 选择的对象roleNames数组， 类型 Array。
										第三个参数为data： 选择的对象数组， 类型 Array。
	</p>
 * 
 * <pre>
 * 作者:eddy
 * 邮箱:1546077710@qq.com
 * 日期:2016-09-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'角色选择器',
			url:__ctx+'/platform/org/partyDialog/role.htm',
			isSingle:false, //是否单选
			isObj:false//是否返回对象
	};	
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	RoleDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	RoleDialog.prototype={
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
					area:['64%','80%'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).partyDialogRole.getData();
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
			              		var roleIds=[],roleNames=[];
			          			$.each(data, function(i, content) {
									var roleId=content.roleid;
									var roleName=content.rolename;
									roleIds.push(roleId);
									roleNames.push(roleName);
								});
			          			options.callback(roleIds,roleNames);
			              	  }
			              	  DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).partyDialogRole.getData();
			                	if($.isEmpty(data)){
				              		  return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).partyDialogRole.remove(content.roleid,content.rolekey);
			                	});
			                	DialogUtil.getChildFrameWindow(index).partyDialogRole.clearSelect();
			                	if(options.isObj){
				              		options.callback(data);
			                	}else{
			                		options.callback([], []);
			                	}
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