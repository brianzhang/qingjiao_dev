var passConf={roleJson:""}; 

$(function() {
	var employeeRoleAssign = new EmployeeRoleAssign();
	employeeRoleAssign.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#employeeRoleAssignGrid",// 列表对象
		PAGER : "#employeeRoleAssignPager",// 列表分页
	};
	/**
	 * OrgRoleAssign 对象
	 * @returns {OrgRoleAssign}
	 */
	EmployeeRoleAssign = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	EmployeeRoleAssign.prototype = {
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
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx + '/platform/org/partyEmployee/empRoleListJson.htm?id='+id,
								pager : this.consts.PAGER,
								colNames : [ 'ID', '角色', '别名', '子系统名称'],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'NAME_'
										},
										{
											name : 'roleAlias',
											index : 'ROLE_ALIAS_'
										},
										{
											name : 'subSystemName',
											index : 'subSystemName'
										}]

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
								+ '/platform/org/partyEmployee/roleList.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();