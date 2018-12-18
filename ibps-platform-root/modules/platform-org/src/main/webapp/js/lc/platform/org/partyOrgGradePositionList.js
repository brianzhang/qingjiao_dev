$(function() {
	orgGradePositionAssign = new OrgGradePositionAssign();
	orgGradePositionAssign.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#orgPositionAssignGrid",// 列表对象
		PAGER : "#orgPositionAssignPager",// 列表分页
	};
	/**
	 * OrgGradePositionAssign 对象
	 * @returns {OrgGradePositionAssign}
	 */
	OrgGradePositionAssign = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	OrgGradePositionAssign.prototype = {
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
			var me = this,
				__url = __ctx + '/platform/org/partyOrg/orgPositionListJson.htm?Q^ORG_ID_^S='+id,
				__url = encodeURI(__url);
			
			$(this.consts.GRID)
					.GridList(
							{
								url : __url,
								pager : this.consts.PAGER,
								colNames : [ 'ID', '岗位名称', '等级值', '业务类型', '管理' ],
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
											index : 'level_'
										},
										{
											name : 'type',
											index : 'TYPE_',
											formatter: 'dataFormat',
											formatoptions: {
					                            	value : [{
														name:'no',
														value:'无'
													}
												]}
										},
										{
											name : '__manage',
											width : 30,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/org/partyPosition/edit.htm?id={id}&mainOrgrade=grade&orgId='+id+'&&prem='+prem,
														hidden : function(){
															return prem.indexOf('edit') == -1;
														}
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyPosition/remove.htm?id={id}',
														hidden : function(){
															return prem.indexOf('delete') == -1;
														}
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyPosition/get.htm?id={id}'
													}]
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
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/org/partyOrg/gradePositionList.htm?groupId='+id;
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();