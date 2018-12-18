
/**
 * 子表例子
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:30
 *</pre>
 */
$(function() {
	urlFormSub  = new UrlFormSub();
	urlFormSub.init();
	
	formUrl = urlFormSub.formUrl;// 内嵌URL使用
	bpmnData = {};// 外嵌URL使用
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#urlFormSubGrid",// 列表对象
			PAGER : "#urlFormSubPager",// 列表分页
			FORM : '#urlFormSubForm'// 表单form
	};
	/**
	 * 子表例子 对象
	 * @returns {UrlFormSub}
	 */
	UrlFormSub = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	UrlFormSub.prototype = {
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
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/demo/urlFormSub/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','KEY','NAME','AGE','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'

				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'

				                	 					                	 	}, {
				                 	   name:'age',
				                	   index: 'age_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/demo/urlFormSub/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/demo/urlFormSub/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/demo/urlFormSub/get.htm?id={id}'
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
				formUrl.submit(me._showResponse);
			});
			
			// 处理流程表单保存
			$(document).on('click', 'a.fa-send', function() {
				me._setData();
				formUrl.submit(me._showFlowResponse);
			});
			// 处理流程表单同意
			$(document).on('click', 'a.fa-check-square-o', function() {
				me._setData();
				$("#actionName").val("agree");
				formUrl.submit(me._showFlowResponse);
			});
		},
		/**
		 * 外嵌URL时流程数据传递
		 * bpmnData是流程页面写过来，业务页面直接使用即可
		 */
		_setData:function(){
			$("#defId").val(bpmnData.defId);// 流程定义ID
			$("#proInstId").val(bpmnData.proInstId);// 流程实例ID
			$("#taskId").val(bpmnData.taskId);// 流程任务ID
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showFlowResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.alert(msg.getMessage(),
					function() {
						DialogUtil.closeAll();
					}
				);
			} else {
				DialogUtil.error(msg.getMessage());
			}
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
							window.location.href = __ctx+'/platform/demo/urlFormSub/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


