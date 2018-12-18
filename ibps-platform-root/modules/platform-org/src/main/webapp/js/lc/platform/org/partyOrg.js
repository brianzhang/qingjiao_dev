/**
 * 组织
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-06-20 09:08:11
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var partyOrg = new PartyOrg();
	partyOrg.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#partyOrgGrid",// 列表对象
		PAGER : "#partyOrgPager",// 列表分页
		FORM : '#partyOrgForm'// 表单form
	};
	/**
	 * 参与者 对象
	 * @returns {PartyOrg}
	 */
	PartyOrg = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyOrg.prototype = {
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
										+ '/platform/org/partyOrg/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID', '名称', '组织等级','状态',  '创建时间','管理' ],
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
											name : 'partyLevel',
											index : 'LEVEL_'
										},
										{
											name : 'status',
											index : 'STATUS_',
											formatter: 'dataFormat',
					                            formatoptions: {
					                            	value : [{
														name:'actived',
														value:'已激活',
														css:'green'
													},{
														name:'inactive',
														value:'未激活',
														css:'blue'
													},{
														name:'locked',
														value:'锁定',
														css:'red'
													},{
														name:'deleted',
														value:'已删除'
													}
												]}
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
																+ '/platform/org/partyOrg/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyOrg/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyOrg/get.htm?id={id}'
													} ]
										} ]
							});
		},
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me 		= this, 
				form 	= $(this.consts.FORM), 
				frm 	= form.form();
			var clen = $("select[name='levelID']").children().length;
			if(clen < 1){
				DialogUtil.warn("组织等级无数据，请到【用户管理-等级管理】添加组织等级数据！");
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
			
			// 绑定选择icon对话框
			me._selectIcon();
		},
		
		/**
		 * 选择图片控件
		 */
		_selectIcon : function() {
			$(document).on("click", "#selectIcon", function() {
				new IconDialog({
					callback : function(data,dialog,index) {
						$('#profile').val(data);
						$('#logoIcon').removeAttr('class').addClass("fa "+data);
						DialogUtil.close(index);
					}
				}).show();
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
				//刷新左边的树
				if(parent.partyOrgManager)parent.partyOrgManager.loadTree();
				if(parent.partyOrgGradeManager)parent.partyOrgGradeManager.loadTree();
				DialogUtil.alert(msg.getMessage());
				window.location.reload(true);
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
