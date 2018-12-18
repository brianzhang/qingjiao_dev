/**
 * 岗位
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-08-05 10:07:14
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var partyPosition = new PartyPosition();
	partyPosition.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#partyPositionGrid",// 列表对象
		PAGER : "#partyPositionPager",// 列表分页
		FORM : '#partyPositionForm'// 表单form
	};
	/**
	 * 岗位 对象
	 * @returns {PartyPosition}
	 */
	PartyPosition = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyPosition.prototype = {
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
										+ '/platform/org/partyPosition/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID', '岗位名称', '等级数值','是否主岗位', '创建时间', '管理' ],
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
											name : 'level',
											index : 'LEVEL_'
										},
										{
											name : 'type',
											index : 'TYPE_'
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
																+ '/platform/org/partyPosition/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyPosition/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyPosition/get.htm?id={id}'
													} ]
										} ]
							});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			var clen = $("select[name='levelID']").children().length;
			if(clen < 1){
				DialogUtil.warn("岗位等级无数据，请到【用户管理-等级管理】添加岗位等级数据！");
			}
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
				if(tree && (tree == true || tree == 'true')){
					DialogUtil.alert(msg.getMessage());
					var url=__ctx+"/platform/org/partyOrg/info.htm?id="+orgId;
					if(mainOrgrade == 'grade'){
						url=__ctx+"/platform/org/partyOrg/gradeInfo.htm?id="+orgId+'&prem='+prem;
					}
					window.location.href = url;
				}else if(self && (self == true || self == 'true')){
					//刷新左边的树
					parent.partyPositionManager.loadTree();
					DialogUtil.alert(msg.getMessage());
					window.location.reload(true);
				}else{
					DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
						if (rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx
									+ '/platform/org/partyOrg/gradePositionList.htm?groupId='+orgId+'&prem='+prem;
					});
				}
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
