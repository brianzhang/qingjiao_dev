/**
 * 组织选择器
 * 
 * <br>
	使用说明：
	<p>	new OrgDialog({
					title:'',	【可选】
					url:'',	【可选】
					isSingle:false,	【可选】
					isObj:false,	【可选】
					type:1,	【可选】
					params:params,	params参数用JSON数组形式，类似于[{"id":"1","key":"1","name":"1"}]
					callback : function(orgIds,orgNames) {
						//业务代码处理
					}
				}).show();
	</p>
	
	<p>	new OrgDialog({
					params:params,
					callback : function(data) {
						//业务代码处理
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'组织选择框'；
		url 【可选】：地址。类型 : String，默认：；
		isSingle【可选】：是否单选 。类型 : Boolean，默认：false；
		isObj【可选】：是否返回对象 。类型 : Boolean，默认：false；
		type【可选】：根据类型获取对应范围数据 。类型 : int，默认：1；
					类型 1：默认获取所有组织
						   2：获取当前组织归属组的所有下级 
						   3：根据组织获取所有组织
						   4：获取分级授权所拥有权限的下级组织
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；type=3,params必传orgId参数
		callback【必选】：回调数据。类型：function。默认：null；
						回调数据： 第一个参数为orgIds： 选择的对象orgIds数组， 类型 Array。 
										第二个参数为orgNames： 选择的对象orgNames数组， 类型 Array。
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
			title:'组织选择器',
			url:__ctx+'/platform/org/partyDialog/org.htm',
			isSingle:false, //是否单选
			isObj:false ,//是否返回对象
			type:1 //数据范围，1：所有数据、2：当前组织归属组织数据
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	OrgDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	OrgDialog.prototype={
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
					area:['36%','88%'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).partyDialogOrg.getData();
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
			              		var orgIds=[],orgNames=[];
			          			$.each(data, function(i, content) {
									var orgId=content.orgid;
									var orgName=content.orgname;
									orgIds.push(orgId);
									orgNames.push(orgName);
								});
			          			options.callback(orgIds,orgNames);
			              	  }
			              	  DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).partyDialogOrg.getData();
			                	if($.isEmpty(data)){
			                		return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).partyDialogOrg.remove(content.orgid,content.orgkey);
			                	});
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