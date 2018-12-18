/**
 * 角色表
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-08-08 10:28:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var partyRole = new PartyRole();
	partyRole.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#partyRoleGrid",// 列表对象
		PAGER : "#partyRolePager",// 列表分页
		FORM : '#partyRoleForm',// 表单form
		GRUID : "#partyRoleUserGrid",//角色人员列表对象
		PAGERU : "#partyRoleUserPager"//角色人员列表分页
	};
	/**
	 * 角色表 对象
	 * 
	 * @returns {PartyRole}
	 */
	PartyRole = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	PartyRole.prototype = {
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
			if ($(this.consts.GRUID).length > 0)// 角色人员列表
				this._initUserGridList();
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
										+ '/platform/org/partyRole/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '角色名', '子系统', '角色别名', '管理' ],
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
											name : 'subSystemName',
											index : 'system_name_'
										},
										{
											name : 'roleAlias',
											index : 'ROLE_ALIAS_'
										},
										{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '人员列表',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyRole/userList.htm?id={id}'
													},
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/org/partyRole/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyRole/remove.htm?id={id}'
													},
													{
														label : '资源分配',
														classes : 'btn btn-primary fa fa-dashboard',
														action : 'javascript:new PartyRole().editRoleRes("{id}")'
													}]
										} ]
							});
		},
		/**
		 * 角色人员列表
		 */
		_initUserGridList : function() {
			var me = this;
			$(this.consts.GRUID)
					.GridList(
							{
								url : __ctx
										+ '/platform/org/partyRole/findUsersByRoleId.htm?roleId='+roleId,
								pager : this.consts.PAGERU,
								colNames : [
										' ID',
										'姓名',
										'用户名',
										'归属组织路径',
										'性别',
										'创建时间',
										'状态'],
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
											name : 'account',
											index : 'account_'
										},
										{
											name : 'orgName',
											index : 'orgName',
											width:'400px'
										},
										
										{
											name : 'gender',
											index : 'GENDER_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                    'male': '男',
				                                    'female': '女'
				                                }
				                            }
										},
									
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											formatter : 'timestamp'

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
														name:'expired',
														value:'过期',
														css:'gray'
													},{
														name:'locked',
														value:'锁定',
														css:'orange'
													},{
														name:'disabled',
														value:'禁用',
														css:'red'
													},{
														name:'deleted',
														value:'已删除'
													}
												]}
										}]
							});
		},
		
		/**
		 * 分配资源
		 * @param roleId
		 */
		editRoleRes:function (roleId){
		    DialogUtil.dialog({
				title:'资源分配',
				content:__ctx+"/platform/org/partyRole/resourceDialog.htm?roleId="+roleId,
			    area: ['50%', '80%'],
			    btn:[{
	            	label: '保存',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	              DialogUtil.getChildFrameWindow(index).resourceDialog.saveRes(function(r){
	            	  if(r){
	            		  DialogUtil.close(index);
	            	  }
	              });
	              	 
	                }
	            },{
	            	label: '取消',
	            	iconCls:'btn btn-danger fa fa-cancel',
	                action: function(dialog,index) {
	                	DialogUtil.close(index);
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
								+ '/platform/org/partyRole/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
