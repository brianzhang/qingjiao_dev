/**
 * 参与者属性弹出框
 * 
 * <br>
	使用说明：
	<p>	new AttrDialog({
					title:'',	【可选】
					partyType:employee,org,position,	【可选】
					params:params,	params参数用JSON数组形式，类似于[{"id":"1","account":"1","fullname":"1"}]
					callback : function(userIds,fullNames) {
						//业务代码处理
					}
				}).show();
	</p>
	
	<p>	new AttrDialog({
					params:params,
					callback : function(data) {
						//业务代码处理
					}
				}).show();
	</p>
	参数说明：
	<p>	
		title【可选】 : 标题。类型：String，默认：'用户选择框'；
		partyType【可选】：根据类型获取对应范围数据 。类型 : String，默认：employee；
					类型 employee：人员
						   position：岗位
						   org：组织
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		selectorType 【可选】: 选择器类型。类型：String
		callback【必选】：回调数据。类型：function。默认：null；
	</p>
 * 
 * <pre>
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年11月7日-上午11:13:21
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
(function() {
	var partyType='employee';
	var defaults = {
			title:'条件输入框',
			url:__ctx+'/platform/org/partyDialog/attr.htm',
			partyType:'employee', //参与者类型：默认employee
			selectorType: ""
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	AttrDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	AttrDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options=me.options,
					url = options.url + "?partyType=" + options.partyType;
				DialogUtil.dialog({
					title:options.title,
					content:url,
					params: options,
					selectorType: options.selectorType,
					area:['25%','75%'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).partyDialogAttr.getData(),
			              		callback = DialogUtil.getChildFrameWindow(index).partyDialogAttr.callback;
			          			callback(data);
			          			DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var data = DialogUtil.getChildFrameWindow(index).partyDialogAttr.getData();
			                	for(var i=0,c;c=data[i++];){
			                		c.value='';
			                	}
			                	callback = DialogUtil.getChildFrameWindow(index).partyDialogAttr.callback;
			          			callback(data);
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