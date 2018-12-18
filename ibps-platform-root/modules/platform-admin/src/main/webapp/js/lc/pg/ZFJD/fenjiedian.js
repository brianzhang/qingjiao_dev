/**
 * t_fenjiedian
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 17:03:02
 * </pre>
 */
$(function() {
	fenjiedian = new Fenjiedian();
	fenjiedian.init();

	formUrl = fenjiedian.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#fenjiedianGrid",// 列表对象
		PAGER : "#fenjiedianPager",// 列表分页
		FORM : '#fenjiedianForm',// 表单form
		FORMGET : '#fenjiedianFormGet'// 表单form
	};
	/**
	 * t_fenjiedian 对象
	 * 
	 * @returns {Fenjiedian}
	 */
	Fenjiedian = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Fenjiedian.prototype = {
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
								+ '/pg/ZFJD/fenjiedian/listJson.htm?id='
								+ id,
						pager : this.consts.PAGER,
						colNames : [ '主键', '创建时间', '更新时间', '培养目标ID', '专业名称',
								'专业ID', '分解点标题', 'del', '分解内容' ],
						colModel : [ {
							name : 'id',
							index : 'id_'

							,
							hidden : true,
							key : true
						}, {
							name : 'createTime',
							hidden : true,
							index : 'create_time_',
							formatter : 'timestamp'
						}, {
							name : 'updateTime',
							hidden : true,
							index : 'update_time_',
							formatter : 'timestamp'
						}, {
							name : 'pymb_id',
							hidden : true,
							index : 'pymb_id'

						}, {
							name : 'pro_name',
							hidden : true,
							index : 'pro_name'

						}, {
							name : 'pro_id',
							hidden : true,
							index : 'pro_id'

						}, {
							name : 'title',
							width : 50,
							index : 'title'

						}, {
							name : 'dEL',
							hidden : true,
							index : 'd_e_l_'

						}, {
							name : 'content',
							index : 'content'

						}, ],
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
								+ '/pg/ZFJD/fenjiedian/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
