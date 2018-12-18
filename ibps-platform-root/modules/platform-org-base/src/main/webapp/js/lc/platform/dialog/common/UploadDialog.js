/**
 * 文件上传
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
		title : '文件上传',
		url : __ctx + '/components/upload/upload/dialog.htm',
		maxUploadSize : 1024*1024 * 1024 * 100,// 默认限制上传文件的大小 单位字节.100M=100*1024*1024(B)=104857600 bytes
		maxUploadNum : undefined,// 默认限制上传文件的数量 为999999
		compress : false,// 是否压缩
		uploadType : 'file',// 默认组件上传类型为file,文件上传类型。查看MimeType.js
		isCancle : false //是否提示取消
	};
	/**
	 * 图标选择
	 * 
	 * @param options
	 * @returns {IconDialog}
	 */
	UploadDialog = function(options) {
		this.options = $.extend({}, defaults, options);
	};

	UploadDialog.prototype = {
		/**
		 * 显示窗口
		 */
		show : function() {
			var me = this, options = this.options;
			DialogUtil.dialog({
				content : options.url,
				title : options.title,
				area : [ '70%', '70%' ],
				params : options,
				btn : [{
							label : '确定',
							iconCls : 'btn btn-primary fa fa-ok',
							action : function(dialog, index) {
								var data = DialogUtil.getChildFrameWindow(index).fileUpload.initConfirm();
								if (!data) 
									return;
								if (options.callback) {
									options.callback(data, index);
								}
								DialogUtil.close(index);
							}
						},{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(dialog, index) {
								if (options.isCancle) {
									DialogUtil.confirm("确认关闭？",function(rtn) {
												if (rtn)	DialogUtil.close(index);
											});
								} else {
									DialogUtil.close(index);
								}
							}
						} ]
			});
		}
	};
})();
