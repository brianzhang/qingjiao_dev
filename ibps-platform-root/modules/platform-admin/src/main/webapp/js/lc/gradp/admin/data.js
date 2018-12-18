/**
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-09-14 22:52:17
 * </pre>
 */
$(function() {
	data = new Data();
	data.init();

	formUrl = data.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		__ENTITYGRID : "#entityGrid",// 列表对象
		__ENTITYPAGER : "#entityPager",// 列表分页
	// FORM : '#courseForm'// 表单form
	};
	/**
	 * 
	 * @returns {Data}
	 */
	Data = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Data.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {

			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.__ENTITYGRID).length > 0)// 列表
				this._initENTITYGridList();
		},
		/**
		 * 初始列表
		 */
		_initENTITYGridList : function() {
			var me = this;
			$(this.consts.__ENTITYGRID)
					.GridList(
							{
								url : __ctx
										+ '/gradp/admin/data/listEntityJson.htm?eType='
										+ eType,
								pager : this.consts.__ENTITYPAGER,
								colNames : [
										'主键',
										center('工号'),
										center('姓名'),
										center('状态'),
										center('创建时间'),
										'管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id',
											hidden : true,
											key : true
										},
										{
											name : 'num',
											index : 'party_alias_',
											align : 'center'
										},
										{
											name : 'name',
											sortable : false,
											align : 'center'
										},
										{
											name : 'status',
											sortable : false,
											align : 'center'
										},
										{
											name : 'createTime',
											index : 'create_time_',
											align : 'center'
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
																+ '/gradp/admin/data/entityEdit.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/gradp/admin/data/entityGet.htm?id={id}'
													} ]
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
			$('.search-form input').on('keyup', function() {
				me.cg();
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
								+ '/gradp/data/data/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		cg : function() {
			$("a.fa-search").click();
		}
	};
})();
center = function(s){
	return '<div style="text-align:center;">'+s+'</div>';
}