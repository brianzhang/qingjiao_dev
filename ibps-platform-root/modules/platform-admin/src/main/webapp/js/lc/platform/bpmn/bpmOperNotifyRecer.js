
/**
 * 流程通知接收列表
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-29 21:28:25
 *</pre>
 */
$(function() {
	bpmOperNotifyRecer  = new BpmOperNotifyRecer();
	bpmOperNotifyRecer.init();
	
	formUrl = bpmOperNotifyRecer.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmOperNotifyRecerGrid",// 列表对象
			PAGER : "#bpmOperNotifyRecerPager",// 列表分页
			FORM : '#bpmOperNotifyRecerForm'// 表单form
	};
	/**
	 * 流程通知接收列表 对象
	 * @returns {BpmOperNotifyRecer}
	 */
	BpmOperNotifyRecer = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmOperNotifyRecer.prototype = {
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
						url :  __ctx+'/platform/bpmn/bpmOperNotifyRecer/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','通知ID','接收人ID','是否已读','阅读时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'notifyId',
				                	   index: 'notify_id_'

				                	 					                	 	}, {
				                 	   name:'receiverId',
				                	   index: 'receiver_id_'

				                	 					                	 	}, {
				                 	   name:'isRead',
				                	   index: 'is_read_'

				                	 					                	 	}, {
				                 	   name:'updateTime',
				                	   index: 'update_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmOperNotifyRecer/get.htm?id={id}'
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
							window.location.href = __ctx+'/platform/bpmn/bpmOperNotifyRecer/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


