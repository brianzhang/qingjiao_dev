

/**
 * 日志模块管理
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2017-03-01 19:31:23
 *</pre>
 */
$(function() {
	logModule  = new LogModule();
	logModule.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#logModuleGrid",// 列表对象
			PAGER : "#logModulePager",// 列表分页
			FORM : '#logModuleForm'// 表单form
	};
	/**
	 * 日志模块管理 对象
	 * @returns {LogModule}
	 */
	LogModule = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	LogModule.prototype = {
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
			$(this.consts.GRID).GridList({
						url :  __ctx+'/platform/log/logModule/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','模块名称','模块别名','是否启用','管理'],
				        colModel: [{
				                 	   		name:'id',
				                 	   		index: 'id_',
				                 	   		hidden:true,
				                 	   		key:true
				                	 	}, {
				                	 		name:'name',
				                	 		index: 'name_'
				                	 	}, {
				                	 		name:'alias',
				                	 		index: 'alias_'
				                	 	}, {
					                 	   name:'enabled',
					                	   index: 'enabled_',
					                	   formatter : 'dataFormat',
					                	   formatoptions : {
												value : [{
													name:"true",
													value:'是',
													css:'green'
												},{
													name:"false",
													value:'否',
													css:'red'
												}]
											}
				                	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/log/logModule/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/log/logModule/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/log/logModule/get.htm?id={id}'
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
							window.location.href = __ctx+'/platform/log/logModule/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


