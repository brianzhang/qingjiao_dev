/**
 * 员工
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-07-04 16:02:01
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	partyPositionUser = new PartyPositionUser();
	partyPositionUser.init();
});

(function() {
	 
	//定义常量
	var _consts = {
		GRID : "#partyPositionUserGrid",// 列表对象
		PAGER : "#partyPositionUserPager"// 列表分页
	};
	/**
	 * 员工 对象
	 * @returns {PartyPositionUser}
	 */
	PartyPositionUser = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyPositionUser.prototype = {
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
				__url = __ctx + '/platform/org/partyPosition/positionUserListJson.htm?Q^POSITIONS_^SL='+id,
				__url = encodeURI(__url);
			
			$(this.consts.GRID)
					.GridList(
							{
								url : __url,
								pager : this.consts.PAGER,
								colNames : [
										'员工 ID',
										'姓名',
										'归属组织',
										'性别',
										'创建时间',
										'状态','管理' ],
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
											name : 'orgName',
											index : 'orgName'
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
											name : '__manage',
											width : 60,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '设为主岗位',
														classes : 'btn btn-primary fa fa-edit',
														action : 'javascript:partyPositionUser.assignMainPost("{id}", "'+id+'");',
														hidden : function(opts, rowData){
															return rowData.status == 'deleted' || rowData.isMainPost == 'Y';
														}
													},
													{
														label : '设为主负责人',
														classes : 'btn btn-primary fa fa-edit',
														action : 'javascript:partyPositionUser.assignPrincipal("{id}", "'+id+'");',
														hidden : function(opts, rowData){
															return rowData.status == 'deleted' || rowData.isPrincipal == 'Y';
														}
													},
													{
														label : '撤销主岗位',
														classes : 'btn btn-primary fa fa-edit',
														action : 'javascript:partyPositionUser.removeMainPost("{id}", "'+id+'");',
														hidden : function(opts, rowData){
															return rowData.isMainPost == 'N';
														}
													},
													{
														label : '撤销主负责人',
														classes : 'btn btn-primary fa fa-edit',
														action : 'javascript:partyPositionUser.removePrincipal("{id}", "'+id+'");',
														hidden : function(opts, rowData){
															return rowData.isPrincipal == 'N';
														}
													},
													{
														label : '移除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyPosition/removeUser.htm?id={id}&posId='+id
													}]
										} ]
							});
		},
		/**
		 * 添加岗位人员
		 * @param posId
		 */
		addUser : function(posId){
			var me = this;
			var url =__ctx+"/platform/org/partyPosition/addUser.htm";
			new PartyEmployeeDialog({
				url:__ctx+'/platform/org/partyEmployee/dialog.htm?id='+posId,
				params : {url: __ctx + '/platform/org/partyEmployee/listWoutPosJson.htm?posId='+posId},
				callback : function(userIds,fullNames) {
						var param = {
								posId:posId+'',
								userIds:userIds.toString()+''
								};
						me.post(url,param);
				}
			}).show();
		},
		assignMainPost : function(id, posId){
			var me = this;
			var url = __ctx + '/platform/org/partyPosition/assignMainPost.htm';
			me.post(url,{'id':id , 'posId': posId});
		},
		assignPrincipal : function(id, posId){
			var me = this;
			var url = __ctx + '/platform/org/partyPosition/assignPrincipal.htm';
			me.post(url,{'id':id , 'posId': posId});
		},
		removeMainPost : function(id, posId){
			var me = this;
			var url = __ctx + '/platform/org/partyPosition/removeMainPost.htm';
			me.post(url,{'id':id , 'posId': posId});
		},
		removePrincipal : function(id, posId){
			var me = this;
			var url = __ctx + '/platform/org/partyPosition/removePrincipal.htm';
			me.post(url,{'id':id , 'posId': posId});
		},
		post : function(url,param){
			$.post(url,param,function(responseText){
				var msg=new com.lc.form.ResultMessage(responseText);
				if(msg.isSuccess()){
					DialogUtil.alert(msg.getMessage());
					window.location.reload(true);
				}else{
					DialogUtil.error(msg.getMessage(),"");
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
								+ '/platform/org/partyPosition/userList.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();