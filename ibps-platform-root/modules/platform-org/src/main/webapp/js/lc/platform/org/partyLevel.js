/**
 * 参与者等级
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-06-20 10:29:18
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var partyLevel = new PartyLevel();
	partyLevel.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#partyLevelGrid",// 列表对象
		PAGER : "#partyLevelPager",// 列表分页
		FORM : '#partyLevelForm'// 表单form
	};
	/**
	 * 参与者等级 对象
	 * @returns {PartyLevel}
	 */
	PartyLevel = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyLevel.prototype = {
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
										+ '/platform/org/partyLevel/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID',  '名称', '参与者类型','级别数值','创建时间', '管理' ],
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
											name : 'type',
											index : 'TYPE_',
											formatter : 'select',
											formatoptions : {
												value : {
													'org' : '机构',
													'employee' : '员工',
													'position' : '岗位'
													
												}
											}
										},
										{
											name : 'level',
											index : 'LEVEL_'
										},
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											formatter : 'timestamp'

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
																+ '/platform/org/partyLevel/edit.htm?id={id}&typeId='+typeId
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyLevel/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyLevel/get.htm?id={id}&typeId='+typeId
													} ]
										} ]

							});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			var typeId=$("#typeId").val();
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
				if (frm.valid()){
					form.submit();
				}else{
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
			var typeId=$("#typeId").val();
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/org/partyLevel/list.htm?typeId='+typeId;
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
