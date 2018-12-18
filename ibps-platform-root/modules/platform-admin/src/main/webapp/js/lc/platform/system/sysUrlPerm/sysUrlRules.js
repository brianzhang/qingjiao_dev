/**
 * ibps_SYSTEM_URL_RULES【地址拦截规则】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-21 10:18:53
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var sysUrlRules = new SysUrlRules();
	sysUrlRules.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#sysUrlRulesGrid",// 列表对象
		PAGER : "#sysUrlRulesPager",// 列表分页
		FORM : '#sysUrlRulesForm'// 表单form
	};
	/**
	 * ibps_SYSTEM_URL_RULES【地址拦截规则】 对象
	 * @returns {SysUrlRules}
	 */
	SysUrlRules = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	SysUrlRules.prototype = {
		consts : _consts,
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
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/platform/system/urlRules/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '拦截规则', '是否禁用', '拦截地址ID',
										'描述', '序号', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'script',
											index : 'script_'
										},
										{
											name : 'enable',
											index : 'enable_'
										},
										{
											name : 'sysUrlId',
											index : 'sys_url_id_'
										},
										{
											name : 'descp',
											index : 'descp_'
										},
										{
											name : 'sort',
											index : 'sort_'
										},
										{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/system/urlRules/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/system/urlRules/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/system/urlRules/get.htm?id={id}'
													} ]
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
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/system/urlRules/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
