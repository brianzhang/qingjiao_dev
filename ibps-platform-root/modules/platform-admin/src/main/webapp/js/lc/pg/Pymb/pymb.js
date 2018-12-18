/**
 * t_pymb
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:25
 * </pre>
 */
$(function() {
	pymb = new Pymb();
	pymb.init();

	formUrl = pymb.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#pymbGrid",// 列表对象
		PAGER : "#pymbPager",// 列表分页
		FORM : '#pymbForm',// 表单form
		FORMGET : '#pymbFormGet'// 表单form
	};
	/**
	 * t_pymb 对象
	 * 
	 * @returns {Pymb}
	 */
	Pymb = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Pymb.prototype = {
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
			
			$(this.consts.GRID).GridList(
					{
						url : __ctx + '/pg/Pymb/pymb/listJson.htm?majorId='
								+ majorId,
								
						pager : this.consts.PAGER,
						colNames : [ '主键', '办学定位', '专业定位', '学科支撑', '本专业社会需求',
								'专业名称', '专业ID', '更新时间', '管理' ],
						colModel : [ {
							name : 'id',
							index : 'id_',
							hidden : true,
							key : true
						}, {
							name : 'school_local',

							index : 'school_local'

						}, {
							name : 'pro_local',
							index : 'pro_local'

						}, {
							name : 'subject_zhi_cheng_',
							index : 'subject_zhi_cheng_'

						}, {
							name : 'social_demand',
							index : 'social_demand'

						}, {
							name : 'pro_name',
							hidden : true,
							index : 'pro_name'

						}, {
							name : 'pro_id',
							index : 'pro_id',
							hidden : false,
							key : true
						}, {
							name : 'updateTime',
							hidden : true,
							index : 'update_time_',
							formatter : 'timestamp'
						}, {
							name : '__manage',
							width : 100,
							sortable : false,
							classes : 'rowOps',
							formatter : 'manage',
							align : 'center',
							formatoptions : [ {

								label : '详情',
								classes : 'btn btn-primary fa fa-detail',
								action : 'javascript:pymb.msg("{id}")',
							}
							// , {
                            //
							// 	label : '指标点分解',
							// 	classes : 'btn btn-primary fa fa-detail',
							// 	action : 'javascript:pymb.fenjie("{id}")',
							// }
							]
						} ],
						loadComplete : function() {
							try {
								$('.rowOps').each(function() {
									$(this).rowOps({
										showNum : 2
									});
								});
							} catch (e) {
							}
						}

					});
		},
		msg : function(id) {
			DialogUtil.dialog({
				title : '详细信息',
				content : __ctx + '/pg/Pymb/pymb/msg.htm?id=' + id ,
				index : 'edit',
				area : [ '80%', '80%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
		},
		fenjie : function(id) {
			DialogUtil.dialog({
				title : '分解点',
				content : __ctx + '/pg/ZFJD/fenjiedian/list.htm?id=' + id,
				index : 'edit',
				area : [ '80%', '80%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
							if (rtn)
								window.location.reload(true);
							else
								window.location.href = __ctx
										+ '/pg/Pymb/pymb/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
function cg() {
	$('a.fa-search').click()
}
