/**
 * t_zyb
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 13:44:23
 * </pre>
 */
$(function() {
	profession = new Profession();
	profession.init();

	formUrl = profession.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#professionGrid",// 列表对象
		PAGER : "#professionPager",// 列表分页
		FORM : '#professionForm',// 表单form
		FORMGET : '#professionFormGet'// 表单form
	};
	/**
	 * t_zyb 对象
	 * 
	 * @returns {Profession}
	 */
	Profession = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Profession.prototype = {
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
										+ '/pg/Profession/profession/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [
										'<div style="text-align:center;">创建时间</div>',
										'<div style="text-align:center;">学校</div>',
										'<div style="text-align:center;">学院</div>',
										'<div style="text-align:center;">专业</div>',
										'<div style="text-align:center;">专业号</div>',
										'<div style="text-align:center;">管理</div>', ],
								colModel : [

										{
											name : 'createTime',
											hidden : true,
											index : 'create_time_',
											formatter : 'timestamp',
											align : 'center',
										},
										{
											name : 'xueXiao',
											index : 'xue_xiao_',
											align : 'center',

										},
										{
											name : 'xueYuan',
											index : 'xue_yuan_',
											align : 'center',

										},
										{
											name : 'zhuanYe',
											index : 'zhuan_ye_',
											align : 'center',

										},
										{
											name : 'id',
											index : 'id_',
											hidden : false,
											align : 'center',
											key : true
										},
										{
											name : '__manage',
											width : 150,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											align : 'center',
											formatoptions : [

													{
														label : '培养目标',
														classes : 'btn btn-primary fa fa-detail',
														action : 'javascript:profession.aim("{id}","{zhuanYe}")',
													},
													{
														label : '毕业要求',
														classes : 'btn btn-primary fa fa-detail',
														action : 'javascript:profession.demand("{id}","{zhuanYe}")',

													},
													{
														label : '课程体系',
														classes : 'btn btn-primary fa fa-detail',
														action : 'javascript:profession.demand("{id}","{zhuanYe}")',

													} ]
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
		demand : function(id, zhuanye) {
			DialogUtil.dialog({
				title : '毕业要求',
				content : __ctx + '/pg/Byyq/byyq/list.htm?majorId=' + id
						+ '&major=' + zhuanye,
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
		aim : function(id, zhuanye) {
			DialogUtil.dialog({
				title : '培养目标',
				content : __ctx + '/pg/Pymb/pymb/list.htm?majorId=' + id
						+ '&major=' + zhuanye,
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/pg/Profession/profession/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
