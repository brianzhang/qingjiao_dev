
/**
 * 报表定义
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:40
 *</pre>
 */
$(function() {
	reportDef  = new ReportDef();
	reportDef.init();
	
	formUrl = reportDef.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#reportDefGrid",// 列表对象
			PAGER : "#reportDefPager",// 列表分页
			TYPE_TREE : "#typeTree", //左分类树
			FORM : '#reportDefForm'// 表单form
	};
	/**
	 * 报表定义 对象
	 * @returns {ReportDef}
	 */
	ReportDef = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ReportDef.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.reportType = $("#reportType").val();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 添加到菜单资源
		 * @param id
		 */
		add2Resource:function(menuUrl){
			var url =  __ctx+ "/platform/auth/resources/addResource.htm?menuUrl="+menuUrl;
			DialogUtil.dialog({
				params:{},
				callback:function(rtn){
				},
				maxmin:false,
				title:false,
				area : [ '100%', '100%' ],
				content :url
			});
		},
		/**
		 * 预览报表
		 */
		preview:function(id){
			var url = '';
			if(this.reportType=='ireport'){
				url = __ctx+'/platform/report/ireport/preview.htm?reportId='+id+'&reportType='+this.reportType;
			}else if(this.reportType=='raqsoft'){
				url = __ctx+'/platform/report/raqsoft/showReport.htm?reportId='+id+'&reportType='+this.reportType;
			}
			window.location.href = url;
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			me.formUrl.initSub('/platform/report');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				me.formUrl.submit(me._showResponse, $el);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText),me=this;
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/report/reportDef/list.htm?reportType='+me.reportType;
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


