/**
 * 页面表单管理
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 * </pre>
 */
$(function() {
	pageForm = new PageForm();
	pageForm.init();

	formUrl = pageForm.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#pageFormGrid",// 列表对象
		PAGER : "#pageFormPager",// 列表分页
		FORM : '#pageFormForm',// 表单form
		FORMGET : '#pageFormFormGet'// 表单form
	};
	/**
	 * 页面表单管理 对象
	 * 
	 * @returns {PageForm}
	 */
	PageForm = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	PageForm.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0) {// 列表
				this._initGridList();

			}
			if ($(this.consts.FORM).length > 0) {// 表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0) {// 明细页面office控件初始化
				this._initOffice('r');
			}
		},
		_initOffice : function(_rights) {
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
										+ '/platform/codegen/pageForm/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '页面Key', '表单Key','备注', 'IP地址',
										'创建人', '创建时间', '更新人', '更新时间'],
								colModel : [
										{
											name : 'id',
											index : 'id_'

											,
											hidden : true,
											key : true
										},
										{
											name : 'pageKey',
											index : 'page_key_'

										},
										{
											name : 'formKey',
											index : 'form_key_'
										},
										{
											name : 'comment',
											index : 'comment_'
										},
										{
											name : 'ip',
											index : 'ip_'

											,
											hidden : true
										},
										{
											name : 'createBy',
											index : 'create_by_'

											,
											hidden : true
										},
										{
											name : 'createTime',
											index : 'create_time_',
											formatter : 'timestamp',
											hidden : true
										},
										{
											name : 'updateBy',
											index : 'update_by_'

											,
											hidden : true
										},
										{
											name : 'updateTime',
											index : 'update_time_',
											formatter : 'timestamp',
											hidden : true
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									} catch (e) {
									}
								}

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
				// office提交
				OfficePlugin.submit();
				me.formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function() {
			if (!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)
					&& !$.isEmpty(frameElement.dialog.params)
					&& !$.isEmpty(frameElement.dialog.params.data)) {
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/codegen/pageForm/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
