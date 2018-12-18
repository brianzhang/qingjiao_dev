

/**
 * 变量，全局、私有。
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-02 16:58:37
 *</pre>
 */
$(function() {
	variable  = new Variable();
	variable.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#variableGrid",// 列表对象
			PAGER : "#variablePager",// 列表分页
			FORM : '#variableForm'// 表单form
	};
	/**
	 * 变量，全局、私有。 对象
	 * @returns {Variable}
	 */
	Variable = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Variable.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				this._initRefresh();
			}
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		_initRefresh : function(){
			$(document).on('click', 'a.fa-refresh', function() {
				var __url = __ctx+'/platform/codegen/variable/refresh.htm';
				var $el = $(this);
				$el.button('loading');
				$.ajax({
					type: 'POST',
					url: __url,
					success: function(responseText) {
						$el.button('reset');
						var msg = new com.lc.form.ResultMessage(responseText);
						if (msg.isSuccess()) {
							DialogUtil.msg(msg.getMessage());
							window.location.href = __ctx+'/platform/codegen/variable/list.htm';
						} else {
							DialogUtil.error(msg.getMessage());
						}
					},
					error: function(){
						$el.button('reset');
					}
				});
			});
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/codegen/variable/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','变量key','变量名','变量值','变量类型','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'value',
				                	   index: 'value_'
				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'type_',
				                	   formatter : 'dataFormat',
										formatoptions : {
											value : [ {
												name : 'global',
												value : '全局',
												css : 'blue'
											}, {
												name : 'default',
												value : '默认',
												css : 'green'
											}, {
												name : 'private',
												value : '私有',
												css : 'red'
											} 
										]}
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	 	formatter: 'timestamp'
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/variable/edit.htm?id={id}'
									},{
										label:'删除',
										hidden:function (opts, rowData) {
		                                    return rowData.deletable=='N';
		                                },
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/variable/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/variable/get.htm?id={id}'
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
				var $el = $(this);
				$el.button('loading');
				
				frm.ajaxForm({
					success : function(rText){
						$el.button('reset');
						me._showResponse(rText);
					},error:function(){
						$el.button('reset');
					}
				});
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset');
				}
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
							window.location.href = __ctx+'/platform/codegen/variable/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


