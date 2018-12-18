

/**
 * 系统操作日志
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2017-03-01 19:33:17
 *</pre>
 */
$(function() {
	log  = new Log();
	log.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#logGrid",// 列表对象
			PAGER : "#logPager",// 列表分页
			FORM : '#logForm'// 表单form
	};
	/**
	 * 系统操作日志 对象
	 * @returns {Log}
	 */
	Log = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Log.prototype = {
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
						url :  __ctx+'/platform/log/log/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','标题','类型','IP地址','请求URI','提交方式','操作人','操作时间','管理'],
				        colModel: [{
					                 	   name:'id',
					                	   index: 'id_',
					                	   hidden:true,
					                	   key:true
				                	 	},  {
				                	 		name:'title',
				                	 		index: 'title_'
				                	 	}, {
				                	 		  name:'type',
				                	 		  index: 'type_',
			                	 			  formatter : 'dataFormat',
			                	 			  defaultValue:"未知类型",
											  formatoptions : {
													value : [{
														name:'access',
														value:'访问日志',
														css:'green'
													},{
														name:"exception",
														value:'异常日志',
														css:'red'
													},{
														name:'login',
														value:'登录日志',
														css:'orange'
													},{
														name:'loginError',
														value:'登录异常',
														css:'brown'
													},{
														name:'404',
														value:'404',
														css:'red'
													},{
														name:'400',
														value:'400',
														css:'red'
													}]
												}
				                	 	},{
					                 	   name:'ipAddr',
					                	   index: 'ip_addr_'
				                	 	}, {
					                 	   name:'requestUri',
					                	   index: 'request_uri_'
				                	 	}, {
					                 	   name:'method',
					                	   index: 'method_'
				                	 	}, {
					                 	   name:'createor',
					                	   index: 'createor_'
				                	 	}, {
				                	 		name:'createTime',
				                	 		index: 'create_time_',
				                	 		formatter: 'timestamp',
				                	   		formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 	},  {
									name : '__manage',
									width : 50,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/log/log/get.htm?id={id}'
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
							window.location.href = __ctx+'/platform/log/log/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


