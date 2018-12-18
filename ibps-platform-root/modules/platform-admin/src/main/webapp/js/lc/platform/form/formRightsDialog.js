/**
 * 表单授权
 * 
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
			title:'表单授权',
			permissionTypes:["all"],
			url:__ctx+"/platform/form/formRights/dialog.htm",
	};
	
	/**
	 * 表单授权
	 * @param options
	 * @returns
	 */
	FormRightsDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	FormRightsDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options = me.options,url=options.url;
				DialogUtil.dialog({
					title:options.title,
					content:url,
					params: options,
					 btn:[{
			            	label: '保存',
			            	iconCls:'btn btn-primary fa fa-save',
			                action: function(dialog,index) {
			              	  DialogUtil.getChildFrameWindow(index).formRights.saveData();
			                }
			            },
			            {
			            	label: '重置',
			            	iconCls:'btn btn-success fa fa-undo',
			                action: function(dialog,index) {
			                	DialogUtil.getChildFrameWindow(index).formRights.resetFormRights();
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