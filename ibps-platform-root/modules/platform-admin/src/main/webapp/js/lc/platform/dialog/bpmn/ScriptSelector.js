/**
 *  常用脚本选择框  
 *  调用方式
 *  new ScriptSelector(function(script){ }).show();
 * 
 * <pre>
 * 作者：caixy
 * 邮箱：3286168767@qq.com
 * 日期：2016-1-7 17:47:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'常用脚本选择框',
			modal:true,
			resizable:true
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	ScriptSelDialog= function(options){
		this.opts = $.extend({}, defaults, options);
	};
	
	ScriptSelDialog.prototype={
		/**
		 * 显示窗口
		 */
		show:function(){
			var me=  this;
			var title = this.opts.title;
			DialogUtil.dialog({
				title:typeof(title)!='undefined'&&title!=null?title:'常用脚本选择框',
				content:__ctx+'/platform/script/commonScript/selectorDialog.htm',
				params: {},
				area:['75%','80%'],
				 btn:[{
		            	label: ' 选择',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		              	  	var  data = DialogUtil.getChildFrameWindow(index).getData();
		              	  	if($.isEmpty(data)){
		              	  		DialogUtil.toastr("请选择数据！");
		              	  		return;
		              	  	}
		              	  	me.opts.callback(data,index);
		              	  	DialogUtil.close(index);
		                }
		            }, {
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

	
