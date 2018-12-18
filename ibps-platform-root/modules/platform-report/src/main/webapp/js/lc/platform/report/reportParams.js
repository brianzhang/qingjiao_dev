
/**
 * 报表参数
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:41
 *</pre>
 */
$(function() {
	reportParams  = new ReportParams();
	reportParams.init();
	
	formUrl = reportParams.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#reportParamsGrid",// 列表对象
			PAGER : "#reportParamsPager",// 列表分页
			FORM : '#reportParamsForm'// 表单form
	};
	/**
	 * 报表参数 对象
	 * @returns {ReportParams}
	 */
	ReportParams = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ReportParams.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/components/report/ireport/reportParams/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','报表定义ID','参数名','参数描述','数据类型','参数类型','参数来源','参数值','默认值','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'
				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'reportId',
				                	   index: 'REPORT_ID_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'NAME_'
				                	 	}, {
				                 	   name:'desc',
				                	   index: 'DESC_'
				                	 	}, {
				                 	   name:'dataType',
				                	   index: 'DATA_TYPE_'
				                	 	}, {
				                 	   name:'paramType',
				                	   index: 'PARAM_TYPE_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'source',
				                	   index: 'SOURCE_'
				                	 	,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'fixed':'固定值'
												,'input':'表单输入'
												,'script':'脚本'
			                                }
				                        }
				                	 	}, {
				                 	   name:'value',
				                	   index: 'VALUE_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'defValue',
				                	   index: 'DEF_VALUE_'
				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/components/report/ireport/reportParams/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/components/report/ireport/reportParams/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/components/report/ireport/reportParams/get.htm?id={id}'
									}]
								} ]
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.formUrl.submit(me._showResponse);
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
							window.location.href = __ctx+'/components/report/ireport/reportParams/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


