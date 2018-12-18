/**
 * 用户组 选择器
 * 
 * <br>
	使用说明：
	<p>	new PartyGroupDialog({
					title:'',	【可选】
					url:'',	【可选】
					isSingle:false,	【可选】
					isObj:false,	【可选】
					params:params,	params参数用JSON数组形式，类似于[{"id":"1","name":"1"}]
					callback : function(groupIds,groupNames) {
						//业务代码处理
					}
				}).show();
	</p>
	
	<p>	new PartyGroupDialog({
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
		title:'用户组选择器',
		url:__ctx+'/platform/org/partyDialog/group.htm',
		isSingle:false, //是否单选
		isObj:false //是否返回对象
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	PartyGroupDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	PartyGroupDialog.prototype={
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
			              	  var  data = DialogUtil.getChildFrameWindow(index).partyDialogGroup.getData();
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
			              		var groupIds=[],groupNames=[];
			          			$.each(data, function(i, content) {
									var groupId=content.id;
									var groupName=content.name;
									groupIds.push(groupId);
									groupNames.push(groupName);
								});
			          			options.callback(groupIds,groupNames);
			              	  }
			              	  DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).partyDialogGroup.getData();
			                	if($.isEmpty(data)){
				              		  return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).partyDialogGroup.remove(content.id, content.key);
			                	});
			                	DialogUtil.getChildFrameWindow(index).partyDialogGroup.clearSelect();
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