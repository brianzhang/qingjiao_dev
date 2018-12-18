/**
 * 分级管理具体授权
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-15 21:31:13
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	partyOrgAuth = new PartyOrgAuth();
	partyOrgAuth.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#partyOrgAuthGrid",// 列表对象
		PAGER : "#partyOrgAuthPager",// 列表分页
		FORM : '#partyOrgAuthForm'// 表单form
	};
	/**
	 * 分级管理具体授权 对象
	 * @returns {PartyOrgAuth}
	 */
	PartyOrgAuth = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyOrgAuth.prototype = {
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
			var me = this,
				__url = __ctx + '/platform/org/partyOrgAuth/listJson.htm?Q^ORG_ID_^S=' + groupId,
				__url = encodeURI(__url);
			
			$(this.consts.GRID)
					.GridList(
							{
								url : __url,
								pager : this.consts.PAGER,
								colNames : [ 'ID', '用户ID', '用户姓名', '组织ID', '组织名称', 
										'组织操作权限', '子组织操作权限', '创建时间', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'managerID',
											index : 'MANAGER_ID_',
											hidden : true
										},
										{
											name : 'managerName',
											index : 'managerName',
											width : 50
										},
										{
											name : 'orgID',
											index : 'ORG_ID_',
											hidden : true,
										},
										{
											name : 'orgName',
											index : 'ORG_NAME_'
										},
										{
											name : 'orgPerms',
											index : 'ORG_PERMS_',
				                            formatter: function(value,row,index){
												if(value)
											    	return value.replace("add"," 增").replace("delete"," 删").replace("edit"," 改");
											    else 
											    	return '';
											}
										},
										{
											name : 'userPerms',
											index : 'USER_PERMS_',
				                            formatter: function(value,row,index){
												if(value)
											    	return value.replace("add"," 增").replace("delete"," 删").replace("edit"," 改");
											    else 
											    	return '';
											}
										},
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											width : 50,
											formatter : 'timestamp'
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
																+ '/platform/org/partyOrgAuth/edit.htm?id={id}&groupId='+groupId+'&mainOrgrade='+mainOrgrade+'&prem='+prem,
														hidden : function(){
															return mainOrgrade == 'grade' && prem.indexOf('edit') == -1;
														}
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyOrgAuth/remove.htm?id={id}',
														hidden : function(){
															return mainOrgrade == 'grade' && prem.indexOf('delete') == -1;
														}
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
				if (frm.valid()){
					form.submit();
				}else{
					$el.button('reset');
				}
			});
		},
		/**
		 * 新人员选择器
		 */
		addPerson : function(){
			if(tree == true || tree == 'true'){
				new PersonDialog({
					isSingle:true, //是否单选
					url:__ctx+'/platform/org/partyDialog/person.htm?orgId='+orgId+'&tree='+tree,
					type : 3,
					params : {'orgId' : orgId},
					callback : function(userIds, fullnames) {
						$("#managerName").val(fullnames);
						$("#managerID").val(userIds);
					}
				}).show();
			}else if(mainOrgrade == 'grade'){
				new PersonDialog({
					isSingle:true, //是否单选
					url:__ctx+'/platform/org/partyDialog/person.htm?orgId='+orgId+'&tree='+tree,
					type : 4,
					callback : function(userIds, fullnames) {
						$("#managerName").val(fullnames);
						$("#managerID").val(userIds);
					}
				}).show();
			}else{
				new PersonDialog({
					isSingle:true, //是否单选
					url:__ctx+'/platform/org/partyDialog/person.htm?orgId='+orgId+'&tree='+tree,
					callback : function(userIds, fullnames) {
						$("#managerName").val(fullnames);
						$("#managerID").val(userIds);
					}
				}).show();
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else{
						if(tree && (tree == true || tree == 'true')){
							var url=__ctx+"/platform/org/partyOrg/info.htm?id="+orgId;
							if(mainOrgrade == 'grade'){
								url=__ctx+"/platform/org/partyOrg/gradeInfo.htm?id="+orgId;
							}
							window.location.href = url;
						}else{
							window.location.href = __ctx
							+ '/platform/org/partyOrgAuth/list.htm?mainOrgrade=main&groupId='+orgId;
						}
					}
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
