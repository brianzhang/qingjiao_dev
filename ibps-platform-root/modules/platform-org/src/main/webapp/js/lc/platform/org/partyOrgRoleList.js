var passConf={roleJson:""}; 
			$(function(){
				var $obj=$("a.btn.btn-primary.fa-add");
				var url =__ctx+"/platform/org/partyOrg/addAssignRoles.htm";
				$obj.unbind('click');
				$obj.bind('click',function(){
					new PartyRoleDialog({
						params : {partyType : 'org', partyId : id+''},
						callback : function(roleIds,names) {
								var param = {
										id:id+'',
										roleIds:roleIds+''
										};
								$.post(url,param,function(responseText){	
									var msg=new com.lc.form.ResultMessage(responseText);
									if(msg.isSuccess()){
										DialogUtil.alert(msg.getMessage());
										window.location.reload(true);
									}else{
										DialogUtil.error(msg.getMessage(),"");
									}
								});
						}
					}).show();
				});
			});
			
			$(function() {
				var orgRoleAssign = new OrgRoleAssign();
				orgRoleAssign.init();
			});

			(function() {
				//var groupTreeDateUrl = __ctx+"/platform/org/partyUser/getGroupListByDimKey.htm";
				//定义常量
				var _consts = {
					GRID : "#orgRoleAssignGrid",// 列表对象
					PAGER : "#orgRoleAssignPager",// 列表分页
				};
				/**
				 * OrgRoleAssign 对象
				 * @returns {OrgRoleAssign}
				 */
				OrgRoleAssign = function() {
					//定义属性
				};

				/**
				 * 方法
				 */
				OrgRoleAssign.prototype = {
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
											url : __ctx + '/platform/org/partyOrg/orgRoleListJson.htm?id='+id,
											pager : this.consts.PAGER,
											colNames : [ 'ID', '角色', '别名', '子系统名称', '管理' ],
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
													},
													{
														name : '__manage',
														width : 30,
														classes : 'rowOps',
														formatter : 'manage',
														formatoptions : [
																{
																	label : '删除',
																	classes : 'btn btn-primary fa fa-delete',
																	action : 'javascript:new OrgRoleAssign().changStatus("'+id+'","{id}","deleted")'
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
					changStatus : function(pid,id,status){
						var msg = '你确定要删除？';
						DialogUtil.confirm(msg,function(rtn){
							if(!rtn)
								return;
							var url = __ctx+"/platform/org/partyOrg/changeOrgRelationStatus.htm?id="+id+"&status="+status+"&pid="+pid;
							$.post(url, function(responseText){
							    var resultMessage = new com.lc.form.ResultMessage(responseText);
							    if (resultMessage.isSuccess()) {
							    	DialogUtil.toastr( resultMessage.getMessage(),true);
							    	window.location.reload(true);
							    } else {
							    	DialogUtil.toastr( resultMessage.getMessage(),true);
							    }
							});
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
											+ '/platform/org/partyOrg/roleList.htm';
							});
						} else {
							DialogUtil.error(msg.getMessage());
						}
					}
				};
			})();