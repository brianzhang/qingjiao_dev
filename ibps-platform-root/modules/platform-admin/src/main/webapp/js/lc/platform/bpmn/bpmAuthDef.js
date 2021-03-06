/**
 * 流程授权定义
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-02-06 15:00:59
 *</pre>
 */
$(function() {
	var bpmAuthDef  = new BpmAuthDef();
	bpmAuthDef.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmAuthDefGrid",// 列表对象
			PAGER : "#bpmAuthDefPager",// 列表分页
			FORM : '#bpmAuthDefForm'// 表单form
	};
	/**
	 * 流程授权定义 对象
	 * @returns {BpmAuthDef}
	 */
	BpmAuthDef = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmAuthDef.prototype = {
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
						url :  __ctx+'/platform/bpmn/bpmAuthDef/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['流程授权ID','授权流程KEY','授权流程名称','授权内容','管理'],
				        colModel: [{
				                 	   name:'authId',
				                	   index: 'AUTH_ID_'
				                	 					                	 	}, {
				                 	   name:'defKey',
				                	   index: 'DEF_KEY_'
				                	 					                	 	}, {
				                 	   name:'defName',
				                	   index: 'DEF_NAME_'
				                	 					                	 	}, {
				                 	   name:'rights',
				                	   index: 'RIGHTS_'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/bpmn/bpmAuthDef/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/bpmn/bpmAuthDef/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmAuthDef/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				frm.ajaxForm({
					success : me._showResponse
				});
				if (frm.valid())
					form.submit();
			});
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
							window.location.href = __ctx+'/platform/bpmn/bpmAuthDef/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


