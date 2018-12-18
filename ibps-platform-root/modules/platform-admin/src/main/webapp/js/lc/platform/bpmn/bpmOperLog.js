
/**
 * 流程操作日志
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-21 11:18:52
 *</pre>
 */
$(function() {
	bpmOperLog  = new BpmOperLog();
	bpmOperLog.init();
	
	formUrl = bpmOperLog.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmOperLogGrid",// 列表对象
			PAGER : "#bpmOperLogPager",// 列表分页
			FORM : '#bpmOperLogForm'// 表单form
	};
	/**
	 * 流程操作日志 对象
	 * @returns {BpmOperLog}
	 */
	BpmOperLog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmOperLog.prototype = {
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
						url :  __ctx+'/platform/bpmn/bpmOperLog/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','流程定义ID','流程业务主键','任务节点ID','流程实例ID','事项标题','任务ID','操作意见','操作类型','是否干预','操作内容','操作人','操作时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'procDefId',
				                	   index: 'proc_def_id_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'procDefKey',
				                	   index: 'proc_def_key_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'nodeId',
				                	   index: 'node_id_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'procInstId',
				                	   index: 'proc_inst_id_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'procInstSubject',
				                	   index: 'proc_inst_subject_'
				                	 	}, {
				                 	   name:'taskId',
				                	   index: 'task_id_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'option',
				                	   index: 'option_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'operTypeName',
				                	   index: 'oper_type_name_'
				                	 	}, {
				                 	   name:'interpose',
				                	   index: 'interpose_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'content',
				                	   index: 'content_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'creator',
				                	   index: 'creator_'

				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 		,formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmOperLog/get.htm?id={id}'
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
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)){
				var params = frameElement.dialog.params;
				var data = params.data;
				this.formUrl.setData("[name^='m:']", data);
				this.formUrl.validate();
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
							window.location.href = __ctx+'/platform/bpmn/bpmOperLog/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


