
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
			this.reportDataType = $('#reportDataType').val();
			this.reportControlType = $('#controlType').val();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initBtn();
			}
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
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/report/reportDef/list.htm?reportType='+$("#reportType").val();
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		_initBtn:function(){
			var me = this;
			$("table a.js-edit-row-report").off("click");
			$(document).on("click", "table a.js-edit-row-report", function(){
				var table = $(this).parents().filter("table");
				var tr = $(this).parents().filter("tr");
				var data = $(this).hasClass('js-edit-row-report')?me.formUrl.getData("[name^='s:']", tr):{};
				var title='添加子表数据';
				var url = __ctx+'/platform/report/reportParams/edit.htm?reportType='+me.reportType;
				if(data.id){
					url+="&id="+data.id;
					title = '编辑子表数据';
				} 
				DialogUtil.dialog({
					title:title,
					content:url,
					params:{data:data},//传递参数
					area:['66%','88%'],
					btn:[{
						label: '确定',
						iconCls:'btn btn-primary fa fa-ok',
				        action: function(dialog,index) {
				        	DialogUtil.getChildFrameWindow(index).reportParams.initControlOption();
				      	  	var form = DialogUtil.getChildFrameWindow(index).reportParams.formUrl;
				      	  	if(form.validate()){
				      	  		var data = form.getValue();
				          	  	if($.isEmpty(data)){
				          		  	DialogUtil.toastr("请正确输入！");
				          		  	return;
				          	  	}
				          	  	var templateId = "s:reportParams:TrTemplate";
				          	  	data.idx = Math.ceil(Math.random()*10000000+1);
				          	  	data.reportDataType=JSON.parse(me.reportDataType);
				          	  	data.reportControlType=JSON.parse(me.reportControlType);
								var html = template(templateId, data);
								$(tr).before(html);
								$(tr).remove();
				          	  	DialogUtil.close(index);
				      	  	}
				        }
				    },  {
				    	label: '取消',
				    	iconCls:'btn btn-danger fa fa-cancel',
				        action: function(dialog,index) {
				        	DialogUtil.close(index);
				        	window.location.href=__ctx+"/platform/report/reportDef/list.htm?reportType=raqsoft";
				        }
				    }]
				});
				
			});
		}
	};
})();


