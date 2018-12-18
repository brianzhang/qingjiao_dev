/**
 * 人员选择器
 * 
 * <br>
	使用说明：
	<p>	new PersonDialog({
					title:'',	【可选】
					url:'',	【可选】
					isSingle:false,	【可选】
					isObj:false,	【可选】
					type:1,	【可选】
					params:params,	params参数用JSON数组形式，类似于[{"id":"1","account":"1","fullname":"1"}]
					callback : function(userIds,fullNames) {
						//业务代码处理
					}
				}).show();
	</p>
	
	<p>	new PersonDialog({
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
					类型 1：默认获取所有用户
						   2：获取当前用户归属组的所有下级 
						   3：根据组织获取所有用户
						   4：获取分级授权所拥有权限的下级用户
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；type=3,params必传orgId参数
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为userIds： 选择的对象userIds数组， 类型 Array。 
										第二个参数为fullNames： 选择的对象fullNames数组， 类型 Array。
										第三个参数为data： 选择的对象数组， 类型 Array。
	</p>
 * 
 * <pre>
 * 作者:eddy
 * 邮箱:1546077710@qq.com
 * 日期:2016-08-31-下午2:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var type=1;
	var defaults = {
			title:'人员选择器',
			url:__ctx+'/platform/org/partyDialog/person.htm',
			isSingle:false, //是否单选
			isObj:false ,//是否返回对象
			type:1 //数据范围，1：所有数据、2：单前用户归属组织数据
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	PersonDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	PersonDialog.prototype={
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
			              	  var  data = DialogUtil.getChildFrameWindow(index).partyDialogPerson.getData();
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
									var userId=content.userid;
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
			                	var  data = DialogUtil.getChildFrameWindow(index).partyDialogPerson.getData();
			                	if($.isEmpty(data)){
				              		  return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).partyDialogPerson.remove(content.userid,content.account);
			                	});
			                	DialogUtil.getChildFrameWindow(index).partyDialogPerson.clearSelect();
			                	if(options.isObj){
				              		options.callback([]);
			                	}else{
			                		options.callback([], [], []);
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