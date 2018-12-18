(function() {
	var defaults = {
			url : __ctx+'/platform/office/office/get.htm',
			rights:"e",
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	OfficeDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};

	OfficeDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var url = this.options.url;
				DialogUtil.dialog({
					content: url,
					params:this.options,
					title:this.options.title,
					area:['100%','100%'],
				});
			},
		};
})();