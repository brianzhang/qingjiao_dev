/**
 * 桌面布局
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-21 21:39:21
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var desktopLayout = new DesktopLayout();
	desktopLayout.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#desktopLayoutGrid",// 列表对象
		PAGER : "#desktopLayoutPager",// 列表分页
		FORM : '#desktopLayoutForm'// 表单form
	};
	/**
	 * 桌面布局 对象
	 * 
	 * @returns {DesktopLayout}
	 */
	DesktopLayout = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	DesktopLayout.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)// 表单
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
										+ '/platform/desktop/desktopLayout/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '布局名称', '布局描述','排序', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'NAME_'
										},
										{
											name : 'memo',
											index : 'MEMO_'
										},
										{
											name : 'sn',
											index : 'SN_'
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
																+ '/platform/desktop/desktopLayout/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/desktop/desktopLayout/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/desktop/desktopLayout/get.htm?id={id}'
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
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				$("#templateHtml").val(me._editor.getValue());
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset');
				}
			});
			this.initCodeMirror();
		},
		initCodeMirror:function(){
			var width = $("#templateHtml").width();
			var height = $("#templateHtml").height();
			this._editor = CodeMirror.fromTextArea(document.getElementById("templateHtml"), {
				mode: "text/html",
				tabMode: "indent",
				lineNumbers: true
			 });
			
			this._editor.setSize(width,height);
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
								+ '/platform/desktop/desktopLayout/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
