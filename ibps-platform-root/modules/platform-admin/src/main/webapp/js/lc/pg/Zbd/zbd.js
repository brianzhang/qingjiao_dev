/**
 * t_zbd
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 16:14:53
 * </pre>
 */
$(function() {
	zbd = new Zbd();
	zbd.init();

	formUrl = zbd.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#zbdGrid",// 列表对象
		PAGER : "#zbdPager",// 列表分页
		FORM : '#zbdForm',// 表单form
		FORMGET : '#zbdFormGet'// 表单form
	};
	/**
	 * t_zbd 对象
	 * 
	 * @returns {Zbd}
	 */
	Zbd = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Zbd.prototype = {
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
			$(this.consts.GRID).GridList({
				url : __ctx + '/pg/Zbd/zbd/listJson.htm?demandId=' + demandId,
				pager : this.consts.PAGER,
				colNames : [ '主键', '创建时间', '要求ID', '指标点序号', '内容' ],
				colModel : [ {
					name : 'id',
					index : 'id_'

					,
					hidden : true,
					key : true
				}, {
					name : 'createTime',
					index : 'create_time_',
					hidden : true,
					formatter : 'timestamp'
				}, {
					name : 'demand_id',
					hidden : true,
					index : 'demand_id'

				}, {
					name : 'zhi_biao_dian_id_',
					index : 'zhi_biao_dian_id_'

				}, {
					name : 'content',
					index : 'content'

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
						window.location.href = __ctx + '/pg/Zbd/zbd/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
