/**
 * ibps_SYSTEM_URL_PERIMISSION【url地址拦截】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-19 15:39:37
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var sysUrlPermission = new SysUrlPermission();
	sysUrlPermission.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#sysUrlPermissionGrid",// 列表对象
		PAGER : "#sysUrlPermissionPager",// 列表分页
		FORM : '#sysUrlPermissionForm'// 表单form
	};
	/**
	 * ibps_SYSTEM_URL_PERIMISSION【url地址拦截】 对象
	 * 
	 * @returns {SysUrlPermission}
	 */
	SysUrlPermission = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	SysUrlPermission.prototype = {
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
										+ '/platform/system/urlPermission/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '描述', '拦截地址', '拦截参数',
										'是否启用', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'descp',
											index : 'descp_'
										},
										{
											name : 'url',
											index : 'url_'
										},
										{
											name : 'params',
											index : 'params_'
										},
										{
											name : 'enable',
											index : 'enable_',
											formatter : function(cellvalue,
													options, row) {
												if (cellvalue == '0')
													return '禁用';
												else if (cellvalue == '1')
													return '启用';
											}
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
																+ '/platform/system/urlPermission/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/system/urlPermission/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/system/urlPermission/get.htm?id={id}'
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
				if (frm.valid()) {
					if (me._initValidUrl())
						form.submit();
					else {
						$el.button('reset');
						DialogUtil.confirm("url地址格式不正确!");
					}
				}else{
					$el.button('reset');
				}
			});
		},

		/**
		 * 校验url地址格式是否正确
		 */
		_initValidUrl : function() {
			var url = $("#url").val();
			var strRegex =  "^(https|http|ftp|rtsp|mms):\/\/(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))+(\\?\\S*)?$";
			var re = new RegExp(strRegex);
			if (re.test(url)) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil
						.confirm(
								msg.getMessage() + ',是否继续操作',
								function(rtn) {
									if (rtn)
										window.location.reload(true);
									else
										window.location.href = __ctx
												+ '/platform/system/urlPermission/list.htm';
								});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();