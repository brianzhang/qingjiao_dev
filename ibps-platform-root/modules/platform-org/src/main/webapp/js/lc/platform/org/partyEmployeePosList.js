var passConf={roleJson:""}; 

$(function() {
	var employeePosAssign = new EmployeePosAssign();
	employeePosAssign.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#employeePosAssignGrid",// 列表对象
		PAGER : "#employeePosAssignPager",// 列表分页
	};
	/**
	 * EmployeePosAssign 对象
	 * @returns {EmployeePosAssign}
	 */
	EmployeePosAssign = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	EmployeePosAssign.prototype = {
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
								url : __ctx + '/platform/org/partyEmployee/empPosListJson.htm?id='+id,
								pager : this.consts.PAGER,
								colNames : [ 'ID', '岗位名称', '等级值', '归属组织', '是否主岗位', '是否主负责人'],
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
											name : 'level',
											index : 'LEVEL_'
										},
										{
											name : 'orgName',
											index : 'ORG_NAME_'
										},
										{
											name : 'isMainPost',
											index : 'MAINPOST_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                    'Y': '是',
				                                    'N': '否'
				                                }
				                            }
										},
										{
											name : 'isPrincipal',
											index : 'PRINCIPAL_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                    'Y': '是',
				                                    'N': '否'
				                                }
				                            }
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
								+ '/platform/org/partyEmployee/posList.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();