var passConf={roleJson:""}; 
			$(function(){
				var $obj=$("a.btn.btn-primary.fa-add");
				var url =__ctx+"/platform/org/partyPosition/addAssignRoles.htm";
				$obj.unbind('click');
				$obj.bind('click',function(){
					new PartyRoleDialog({
						params : {partyType : 'position', partyId : id+''},
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
				positionRoleAssign = new PositionRoleAssign();
				positionRoleAssign.init();
			});

			(function() {
				//var groupTreeDateUrl = __ctx+"/platform/org/partyUser/getGroupListByDimKey.htm";
				//定义常量
				var _consts = {
					GRID : "#positionRoleAssignGrid",// 列表对象
					PAGER : "#positionRoleAssignPager",// 列表分页
				};
				/**
				 * PositionRoleAssign 对象
				 * @returns {PositionRoleAssign}
				 */
				PositionRoleAssign = function() {
					//定义属性
				};

				/**
				 * 方法
				 */
				PositionRoleAssign.prototype = {
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
						
						this.grid = $(this.consts.GRID);
						
						this.grid.GridList(
										{
											url : __ctx + '/platform/org/partyPosition/positionRoleListJson.htm?id='+id,
											pager : this.consts.PAGER,
											colNames : [ '用户ID', '角色', '别名', '子系统名称', '角色来源', '管理' ],
											colModel : [
													{
														name : 'id',
														index : 'id_',
														hidden : true,
														key : true
													},
													{
														name : 'name',
														index : 'NAME_',
														width : 80
													},
													{
														name : 'roleAlias',
														index : 'ROLE_ALIAS_',
														width : 80
													},
													{
														name : 'subSystemName',
														index : 'subSystemName',
														width : 80
													},
													{
														name : 'source',
														width : 80
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
																	hidden : function(opts, rowData){
																		return rowData.canDelete == 'false' || rowData.canDelete == false;
																	},
																	action : 'javascript:new PositionRoleAssign().changStatus("'+id+'","{id}","deleted")'
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
							var url = __ctx+"/platform/org/partyPosition/changePosRelationStatus.htm?id="+id+"&status="+status+"&pid="+pid;
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
					refresh : function(){
						window.location.reload(true);
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
											+ '/platform/org/partyPosition/roleList.htm';
							});
						} else {
							DialogUtil.error(msg.getMessage());
						}
					}
				};
			})();