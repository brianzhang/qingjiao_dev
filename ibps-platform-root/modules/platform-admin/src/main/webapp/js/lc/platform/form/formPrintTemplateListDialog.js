/**
 * 表单打印模版列表
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
			title:'表单打印模版列表',
			url:__ctx+"/platform/form/formPrintTemplate/list.htm",
	};
	
	/**
	 * 打印模版
	 * @param options
	 * @returns
	 */
	FormPrintTemplateListDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	FormPrintTemplateListDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options = me.options,url=options.url;
				DialogUtil.openFullWindow({
					title:false,
					maxmin: false,
					content:url,
					params: options
				});
			}
		};
})();