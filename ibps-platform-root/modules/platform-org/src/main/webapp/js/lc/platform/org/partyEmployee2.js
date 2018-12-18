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
(function ($) {
    $.extend($.fn, {
        // 获取复选框的值。
        getCheckBoxValue: function (objJson, scope) {
            $(':checkbox,:radio', scope).each(function () {
                var name = $(this).attr('name');
                objJson[name] = '';
            });

            $(':checkbox:checked,:radio:checked', scope).each(function () {
                var name = $(this).attr('name');
                if (objJson[name] == '') {
                    objJson[name] = $(this).val();
                } else {
                    objJson[name] += "," + $(this).val();
                }
            });
        },
    });
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
})(jQuery);

var partyEmployee;

$(function() {
	partyEmployee = new PartyEmployee();
	partyEmployee.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#partyEmployeeGrid",// 列表对象
		PAGER : "#partyEmployeePager",// 列表分页
		FORM : '#partyEmployeeForm',// 表单form
        ORGTREE_ID: 'orgTree', // 组织树
        ORGTREE: '#orgTree', // 组织树的ID
        POSTREE_ID: 'posTree', // 岗位树
        POSTREE: '#posTree', // 岗位树的ID
        ROLETREE_ID: 'roleTree', // 角色树
        ROLETREE: '#roleTree', // 角色树的ID
        POSITEMGRID: "#posItemGrid",// 岗位列表
        USERGROUPITEMGRID: "#userGroupItemGrid",// 用户组列表
        ROLEITEMGRID: "#roleItemGrid"// 角色列表
	};
	

	/**
	 * 员工 对象
	 * @returns {PartyEmployee}
	 */
	PartyEmployee = function() {
		//定义属性
		this.roleItemList = [];
	};

	/**
	 * 方法
	 */
	PartyEmployee.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if ($(this.consts.GRID).length > 0)//列表
			{
				this._initGridList();
				this._bindBtns();
				this._initEvent();
			}	
			if ($(this.consts.ORGTREE).length > 0) // 树
				this._initOrgTree();
			if ($(this.consts.POSTREE).length > 0) // 树
				this._initPosTree();
			if ($(this.consts.POSITEMGRID).length > 0) // 列表
				this._initPosItemGridList();
			if ($(this.consts.ROLETREE).length > 0) // 树
				this._initRoleTree();
			if ($(this.consts.ROLEITEMGRID).length > 0) // 列表
				this._initRoleItemGridList();
			if ($(this.consts.USERGROUPITEMGRID).length > 0) // 列表
				this._initUserGroupItemGridList();
		},
		_bindBtns : function(){
			var me = this;
			var flowkey = '${ques_kind}';
			$(document).on('click', 'a.fa-caret-square-o-right', function () {
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}
            	
            	var lid = DialogUtil.load();
            	var url = __ctx + "/bishe/urlZhiYuant/urlZhiYuan/startFlow2.htm"
                $.post(url, {'id': ids.join(','), 'flowKey':'Process_1hji5ev'}, function (responseText) {
//            	 $.post(url, {'id': ids.join(','), 'flowKey':flowKey}, function (responseText) {
                	DialogUtil.close(lid);
                	var msg = new com.lc.form.ResultMessage(responseText);
        			if (msg.isSuccess()) {
        				DialogUtil.msg(msg.getMessage());
        				window.location.reload(true);
        			} else {
        				DialogUtil.error(msg.getMessage());
        			}
                });
            });
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
										+ '/platform/org/partyEmployee/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [
										' ID',
										'姓名',
										'用户名',
										'归属组织',
										'性别',
										'创建时间',
										'管理' ],
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
//										{
//											name : 'wcAccount',
//											index : 'wc_account_'
//										},
										{
											name : 'orgName',
											index : 'orgName',
											
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
//										{
//											name : 'status',
//											index : 'STATUS_',
//											 formatter: 'dataFormat',
//					                            formatoptions: {
//					                            	value : [{
//														name:'actived',
//														value:'已激活',
//														css:'green'
//													},{
//														name:'inactive',
//														value:'未激活',
//														css:'blue'
//													},{
//														name:'expired',
//														value:'过期',
//														css:'gray'
//													},{
//														name:'locked',
//														value:'锁定',
//														css:'orange'
//													},{
//														name:'disabled',
//														value:'禁用',
//														css:'red'
//													},{
//														name:'deleted',
//														value:'已删除'
//													}
//												]}
//										},
										{
											name : '__manage',
											width : 60,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
//												{
//				                                label: '重置密码',
//				                                classes: 'btn btn-primary fa fa-lock',
//				                                action: "javascript: partyEmployee.resetPwd('{id}','{name}')",
//				                                hidden: function (opts, rowData) {
//				                                    return rowData.status=='deleted' || !__isSuper;
//				                                }
//				                            },
				                            {
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/org/partyEmployee/edit.htm?id={id}',
														hidden: function (opts, rowData) {
						                                    return rowData.status=='deleted' || __currentUserId == rowData.id || rowData.isSuper=='Y';
						                                }
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyEmployee/remove.htm?id={id}',
														hidden: function (opts, rowData) {
						                                    return rowData.status=='deleted' || __currentUserId == rowData.id || rowData.isSuper=='Y';
						                                }
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyEmployee/get.htm?id={id}'
													},
//													{
//						                                label: '激活',
//						                                classes: 'btn btn-primary fa fa-unlock',
//						                                action: 'javascript:partyEmployee.active("{id}");',
//						                                hidden: function (opts, rowData) {
//						                                    return rowData.status == 'actived' || __currentUserId == rowData.id || !__isSuper;
//						                                }
//						                            },
//													{
//						                                label: '禁用',
//						                                classes: 'btn btn-primary fa fa-minus',
//						                                action: 'javascript:partyEmployee.disable("{id}");',
//						                                hidden: function (opts, rowData) {
//						                                    return rowData.status != 'actived' || __currentUserId == rowData.id || !__isSuper;
//						                                }
//						                            },
//													{
//						                                label: '切换用户',
//						                                classes: 'btn btn-primary fa fa-exchange',
//						                                action: 'javascript:partyEmployee.switchuser("{account}");',
//						                                hidden: function (opts, rowData) {
//						                                	if(__switchAllowed == 'false') return true;
//						                                    return rowData.status != 'actived' || __currentUserId == rowData.id || !__isSuper;
//						                                }
//						                            } 
													]
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									} catch (e) {
									}
								}
							});
		},
		/**
		 * 禁用用户
		 */
		disable : function(id){
			var url = __ctx + "/platform/org/partyEmployee/disable.htm";
            $.post(url, {id : id}, function (responseText) {
            	var msg = new com.lc.form.ResultMessage(responseText);
    			if (msg.isSuccess()) {
    				DialogUtil.toastr(msg.getMessage());
    				window.location.reload(true);
    			} else {
    				DialogUtil.error(msg.getMessage());
    			}
            });
		},
		/**
		 * 激活用户
		 */
		active : function(id){
			var url = __ctx + "/platform/org/partyEmployee/active.htm";
            $.post(url, {id : id}, function (responseText) {
            	var msg = new com.lc.form.ResultMessage(responseText);
    			if (msg.isSuccess()) {
    				DialogUtil.toastr(msg.getMessage());
    				window.location.reload(true);
    			} else {
    				DialogUtil.error(msg.getMessage());
    			}
            });
		},
		/**
         * 重置密码
         */
        resetPwd:function(id,fullname){
        	var _title = fullname != null ? "重置密码:"+fullname : "重置密码";
        	DialogUtil.dialog({
        		title:_title,
        		content:__ctx+'/platform/org/partyUser/changePasswordView.htm?isReset=1&userId='+id,
        	    area: ['50%', '50%'],
        	    btn:[ {
        	    	label: '保存',
                  	iconCls:'btn btn-primary fa fa-save',
	                action: function(dialog,index) {
	                	 DialogUtil.getChildFrameWindow(index).changePassword.saveData(function(){
	                		 DialogUtil.close(index);
	                	 });
                    	}
        	    	},{
        	    		label: '还原默认',
                        iconCls: 'btn btn-primary fa fa-reply',
                        action: function(dialog,index) {
                        	 DialogUtil.getChildFrameWindow(index).changePassword.saveData(function(){
		                		 DialogUtil.close(index);
		                	 },true);
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
		 * 切换用户
		 */
		switchuser : function(account){
			parent.mainPlugin.switchUser(account);
		},
		/**
		 * 初始化岗位列表
		 */
		_initPosItemGridList : function(){
			var me = this;
			
			$(this.consts.POSITEMGRID).jqGrid({
				url : __ctx + '/platform/org/partyEmployee/empPos4EditListJson.htm?id='+userId,
				autowidth : false,
				shrinkToFit : true,
				datatype:"json", //数据类型
		        mtype:"POST",//提交方式
		        rownumbers:true,//添加左侧行号
				width: $(window).width()*0.63,
		        height: $(window).height()-172,
				colNames : [
					'岗位ID',
					'岗位名称',
					'是否主岗位',
					'主负责人',
					'管理' ],
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
					},{
						name : 'isMainPost',
						index : 'IS_MAINPOST_',
						formatter : function(cellval, opts, rowdata) {
							var rs;
							if('Y' == cellval)
								rs = "<input type='radio' name='isMainPost' checked='checked' value='true'/>";
							else
								rs = "<input type='radio' name='isMainPost' value='false'/>";
							return rs;
						}
					},{
						name : 'isPrincipal',
						index : 'IS_PRINCIPAL_',
						formatter : function(cellval, opts, rowdata) {
							var rs;
							if('Y' == cellval)
								rs = "<input type='checkbox' name='isPrincipal' checked='checked' value='true'/>";
							else
								rs = "<input type='checkbox' name='isPrincipal' value='false'/>";
							return rs;
						}
					},
					{
						name : '__manage',
						width : 50,
						sortable:false,
						classes : 'rowOps',
						formatter : 'manage',
						formatoptions : [
							{
								classes:'btn btn-primary  fa fa-delete',
								click:'partyEmployee.removePos(\'{id}\');'
							} ]
					} ],
					gridComplete : function(){
						var $obj=$(":radio,:checkbox",me.consts.POSITEMGRID);
						$obj.unbind('click');
						$obj.bind('click',function(){
							$(this).attr("value", $(this).is(':checked'));
						});
					}
			});
		},
		chk : function(){
			$(this).attr("value", $(this).is(':checked'));
		},
		/**
		 * 获取分配岗位数据
		 * @returns {Array}
		 */
		getPosData:function(){
			var data = $(this.consts.POSITEMGRID).jqGrid('getRowData');
			var aryData=[];
			$.each(data, function(i, n){
				delete n['__manage'];
				n['isMainPost']=$(n['isMainPost']).val();
				n['isPrincipal']=$(n['isPrincipal']).val();
				aryData.push(n);
			});
			return aryData;
		},
		removePos:function(id){
			$(this.consts.POSITEMGRID).jqGrid("delRowData", id);
		},
		/**
		 * 初始化角色列表
		 */
		_initRoleItemGridList : function(){
			var me = this;
			
			$(this.consts.ROLEITEMGRID).jqGrid({
				url : __ctx + '/platform/org/partyEmployee/empRoleListJson.htm?id='+userId,
				autowidth : false,
				shrinkToFit : true,
				datatype:"json", //数据类型
		        mtype:"POST",//提交方式
		        rownumbers:true,//添加左侧行号
				width: $(window).width()*0.63,
		        height: $(window).height()-172,
				colNames : [
					'ID',
					'角色名称',
					'子系统',
					'角色来源',
					'可删除',
					'管理' ],
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
						name : 'source',
						width : 80
					},
					{
						name : 'canDelete',
						index : 'canDelete',
						hidden : true
					},
					{
						name : '__manage',
						width : 50,
						sortable:false,
						classes : 'rowOps',
						formatter : 'manage',
						formatoptions : [
							{
								classes:'btn btn-primary fa fa-delete',
								hidden : function(opts, rowData){
									return rowData.canDelete == 'false' || rowData.canDelete == false;
								},
								click:'partyEmployee.removeRole(\'{id}\');'
							} ]
					} ]
				,gridComplete : function(){
				}
			});
		},
		/**
		 * 获取分配角色数据
		 * @returns {Array}
		 */
		getRoleData:function(){
			var data = $(this.consts.ROLEITEMGRID).jqGrid('getRowData');
			var aryData=[];
			$.each(data, function(i, n){
				delete n['__manage'];
				aryData.push(n);
			});
			return aryData;
		},
		removeRole:function(id){
			$(this.consts.ROLEITEMGRID).jqGrid("delRowData", id);
		},
		
		/* TODO 用户组操作 */
		/**
		 * 初始化用户组列表
		 */
		_initUserGroupItemGridList : function(){
			var me = this;
			
			$(this.consts.USERGROUPITEMGRID).jqGrid({
				url : __ctx + '/platform/org/partyEmployee/empGroupListJson.htm?id='+userId,
				autowidth : false,
				shrinkToFit : true,
				datatype:"json", //数据类型
		        mtype:"POST",//提交方式
		        rownumbers:true,//添加左侧行号
				width: $(window).width()*0.945,
		        height: $(window).height()-172,
				colNames : [
					'组ID',
					'组名称',
					'管理' ],
				colModel : [
					{
						name : 'groupId',
						index : 'GROUP_ID_',
						hidden : true,
						key : true
					},
					{
						name : 'groupName',
						index : 'GROUP_NAME_'
					},
					{
						name : '__manage',
						width : 50,
						sortable:false,
						hidden : 'get' === $("#mode").val(),
						classes : 'rowOps',
						formatter : 'manage',
						formatoptions : [
							{
								classes:'btn btn-primary fa fa-delete',
								click:'partyEmployee.removeUserGroup(\'{groupId}\');'
							}]
					}]
				,gridComplete : function(){
				}
			});
		},
		/**
		 * 获取用户组数据
		 * @returns {Array}
		 */
		getUserGroupData:function(){
			var data = $(this.consts.USERGROUPITEMGRID).jqGrid('getRowData');
			var aryData=[];
			$.each(data, function(i, n){
				delete n['__manage'];
				aryData.push(n);
			});
			return aryData;
		},
		removeUserGroup:function(id){
			$(this.consts.USERGROUPITEMGRID).jqGrid("delRowData", id);
		},
		addUserGroup:function(){
			var me = this;
			new PartyGroupDialog({
				isObj:true,
				callback : function(data) {
					//业务代码处理
					if($.isEmpty(data)){
						return;
					}
					
					var groupIds = $(me.consts.USERGROUPITEMGRID).jqGrid("getDataIDs");
					
					for(var i = 0, len = data.length; i < len; i++){
						var tdata = data[i];
						tdata.groupId = tdata.id;
						tdata.groupName = tdata.name;
						if($.inArray(tdata.groupId, groupIds) < 0){
							/*groupId,groupName*/
							$(me.consts.USERGROUPITEMGRID).jqGrid("addRowData", tdata.groupId, tdata, "last");
						}
					}
				}
			}).show();
		},
		clearUserGroup:function(){
			$(this.consts.USERGROUPITEMGRID).jqGrid("clearGridData");
		},
		
		/**
		 * 初始化组织树
		 */
		_initOrgTree : function(){
			var me = this;
            // 树
			me.orgResTree = null;
			me.loadOrgTree();
			me.initOrgTreeToolbar();
            // 初始化滚动
			me.initLeftScroll(me.consts.ORGTREE);
		},
		/**
		 * 初始化组织机构树工具条
		 */
		initOrgTreeToolbar: function () {
            var me = this;
            $('.org-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadOrgTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.orgResTree.expandAll(true);
                } else {
                    me.orgResTree.expandAll(false);
                }
            });
        },
        /**
         * 加载机构树
         */
        loadOrgTree: function () {
            var me = this;
            this._treeRootId = 0;
            this.expandByDepth = 1;
            var setting = {
                async: {
                    enable: false
                },
                checkable: true,
                check: {
                    autoCheckTrigger: false,
                    chkStyle: "radio",
                    enable: true,
                    nocheckInherit: false,
                    chkDisableInherit: false,
                    radioType: "all"
                },
                data: {
                    key: {
                        name: "name",
                        checked: "checked"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: "0"
                    }
                },
                view: {
                    selectedMulti: false,
                    showIconFont: true
                },
                edit: {
                    drag: {
                        prev: false,
                        inner: false,
                        next: false,
                        isMove: false
                    },
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                callback: {
                    onClick: function (e, treeId, treeNode) {
                        me.orgTreeOnLeftClick(me, treeNode);
                    },
                    onRightClick: function (treeId, treeNode) {
                        //me.orgTreeOnRightClick(me, treeNode);
                    },
                    beforeDrop: null,
                    beforeCheck: null,
                    onCheck: null,
                    onDrop: null
                }
            };
            var orgTreeDataUrl = __ctx + "/platform/org/partyOrg/getTreeData.htm"
            $.post(orgTreeDataUrl, {type: 1}, function (result) {
                me.orgResTree = $.fn.zTree.init($(me.consts.ORGTREE), setting, result);
                if (me.expandByDepth != 0) {
                    var nodes = me.orgResTree.getNodesByFilter(function (node) {
                        return (node.level == me.expandByDepth);
                    });
                    if (nodes.length > 0) {
                        for (var idx = 0; idx < nodes.length; idx++) {
                            me.orgResTree.expandNode(nodes[idx], true, false);
                        }
                    }
                } else {
                    me.orgResTree.expandAll(true);
                }
            });
        },
        /**
         * 组织机构树左键事件
         * @param me
         * @param treeNode
         */
        orgTreeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked){
                me.orgResTree.checkNode(treeNode, true, false);
            }else{
                me.orgResTree.checkNode(treeNode, false, true);
            }
        },
		/**
		 * 初始化岗位树
		 */
		_initPosTree : function(){
			var me = this;
            // 树
			me.orgResTree = null;
			me.loadPosTree();
			me.initPosTreeToolbar();
            // 初始化滚动
			me.initLeftScroll(me.consts.POSTREE);
		},
		/**
		 * 初始化岗位树工具条
		 */
		initPosTreeToolbar: function () {
            var me = this;
            $('.pos-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadPosTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.posResTree.expandAll(true);
                } else {
                    me.posResTree.expandAll(false);
                }
            });
        },
        /**
         * 加载岗位树
         */
        loadPosTree: function () {
            var me = this;
            this._treeRootId = 0;
            this.expandByDepth = 1;
            var setting = {
                async: {
                    enable: false
                },
                checkable: true,
                check: {
                    autoCheckTrigger: false,
                    chkboxType: {
                        "Y": "ps",
                        "N": "ps"
                    },
                    chkStyle: "checkbox",
                    enable: true,
                    nocheckInherit: false,
                    chkDisableInherit: false,
                    radioType: "all"
                },
                data: {
                    key: {
                        name: "name",
                        checked: "checked"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: "0"
                    }
                },
                view: {
                    selectedMulti: false,
                    showIconFont: true
                },
                edit: {
                    drag: {
                        prev: false,
                        inner: false,
                        next: false,
                        isMove: false
                    },
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                callback: {
                    onClick: function (e, treeId, treeNode) {
                        me.posTreeOnLeftClick(me, treeNode);
                    },
                    onRightClick: function (treeId, treeNode) {
                        //me.orgTreeOnRightClick(me, treeNode);
                    },
                    beforeDrop: null,
                    beforeCheck: null,
                    onCheck: null,
                    onDrop: null
                }
            };
            var posTreeDataUrl = __ctx + "/platform/org/partyPosition/getTreeData.htm"
            $.post(posTreeDataUrl, {
                'type': 'position',
                'orgId' : orgId
            }, function (result) {
                me.posResTree = $.fn.zTree.init($(me.consts.POSTREE), setting, result);
                if (me.expandByDepth != 0) {
                    var nodes = me.posResTree.getNodesByFilter(function (node) {
                        return (node.level == me.expandByDepth);
                    });
                    if (nodes.length > 0) {
                        for (var idx = 0; idx < nodes.length; idx++) {
                            me.posResTree.expandNode(nodes[idx], true, false);
                        }
                    }
                } else {
                    me.posResTree.expandAll(true);
                }
            });
        },
        /**
         * 岗位树左键事件
         * @param me
         * @param treeNode
         */
        posTreeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked){
                me.posResTree.checkNode(treeNode, true, false);
            }else{
                me.posResTree.checkNode(treeNode, false, true);
            }
        },
		/**
		 * 初始化角色树
		 */
		_initRoleTree : function(){
			var me = this;
            // 树
			me.roleResTree = null;
			me.loadRoleTree();
			me.initRoleTreeToolbar();
            // 初始化滚动
			me.initLeftScroll(me.consts.ROLETREE);
		},
		/**
		 * 初始化角色树工具条
		 */
		initRoleTreeToolbar: function () {
            var me = this;
            $('.role-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadRoleTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.roleResTree.expandAll(true);
                } else {
                    me.roleResTree.expandAll(false);
                }
            });
        },
        /**
         * 加载角色树
         */
        loadRoleTree: function () {
            var me = this;
            this._treeRootId = 0;
            this.expandByDepth = 1;
            var setting = {
                async: {
                    enable: false
                },
                checkable: true,
                check: {
                    autoCheckTrigger: false,
                    chkboxType: {
                        "Y": "ps",
                        "N": "ps"
                    },
                    chkStyle: "checkbox",
                    enable: true,
                    nocheckInherit: false,
                    chkDisableInherit: false,
                    radioType: "level"
                },
                data: {
                    key: {
                        name: "name",
                        checked: "checked"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: "-1"
                    }
                },
                view: {
                    selectedMulti: false,
                    showIconFont: true
                },
                edit: {
                    drag: {
                        prev: false,
                        inner: false,
                        next: false,
                        isMove: false
                    },
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                callback: {
                    onClick: function (e, treeId, treeNode) {
                            me.roleTreeOnLeftClick(me, treeNode);
                        },
                        onRightClick: function (treeId, treeNode) {
                            //me.roleTreeOnRightClick(me, treeNode);
                        },
                        beforeDrop: null,
                    beforeCheck: null,
                    onCheck: null,
                    onDrop: null
                }
            };
            var roleTreeDataUrl = __ctx + "/platform/org/partyRole/getTreeData.htm"
            $.post(roleTreeDataUrl, { }, function (result) {
                me.roleResTree = $.fn.zTree.init($(me.consts.ROLETREE), setting, result);
                if (me.expandByDepth != 0) {
                    var nodes = me.roleResTree.getNodesByFilter(function (node) {
                        return (node.level == me.expandByDepth);
                    });
                    if (nodes.length > 0) {
                        for (var idx = 0; idx < nodes.length; idx++) {
                            me.roleResTree.expandNode(nodes[idx], true, false);
                        }
                    }
                } else {
                    me.roleResTree.expandAll(true);
                }
            });
        },
        /**
         * 角色树左键事件
         * @param me
         * @param treeNode
         */
        roleTreeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked)
                me.roleResTree.checkNode(treeNode, true, false)
            else
                me.roleResTree.checkNode(treeNode, false, true)
        },
		/**
         * 左侧菜单的滚动
         */
        initLeftScroll: function (obj) {
            var $obj = $(obj);
            $obj.niceScroll({
                horizrailenabled: false,
                cursorborder: "0",
                cursorwidth: "6px",
                cursorcolor: "#2A2A2A",
                zindex: "5555",
                autohidemode: true,
                bouncescroll: true,
                mousescrollstep: '40',
                scrollspeed: '100',
                background: "#999",
                cursoropacitymax: "0.6",
                cursorborderradius: "0"
            });
            $obj.getNiceScroll().resize();
            $obj.parent().height($(window).height()-188);
        },
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(me.consts.FORM), frm = form.form({excludes:"",rules:[{
				name:'containnum',
				rule:function(v){
					var regx = /\d+/;
					return regx.test(v)
				},
				msg:'必须包含数字'
			},{
				name:'containlowcase',
				rule:function(v){
					var regx=/[a-z]+/;
					return regx.test(v)
				},
				msg:'必须包含小写字母'
			},{
				name:'containuppercase',
				rule:function(v){
					var regx = /[A-Z]+/;
					return regx.test(v)
				},
				msg:'必须包含大写字母'
			},{
				name:'containspec',
				rule:function(v){
					var regx =/[^%&@*?!$]+/;
					return regx.test(v)
				},
				msg:'必须包含特殊字符'
			}]});
			//设置高度
			var winHeight = $(window).height();
			var infoHeight = winHeight - 160;
			$(".party-org-info").height(infoHeight);
			// 触发表单验证
			frm.valid();
			if(!__isSuper){
				var sp = $(":radio[name='isSuper']");
				$(sp[1]).attr("checked", true);
				$(":radio[name='isSuper']").attr("disabled", true);
			}
			
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				/*重写表单提交事件*/
                action = frm[0].action;
                newForm = $("<form></form>");
                newForm.attr('action', action);
                newForm.attr('method', 'post');

                var main = {};
                // 找到子表 遍历每一行 得到子表数据
                form.find('input:text,input:hidden,textarea,select,input:password').each(function () {
                    var value = $(this).val();
                    var name = $(this).attr('name');
                    if (value != null && value != '') {
                        main[name] = value;
                    }
                });
                
                form.children('input:hidden').each(function () {
                    var value = $(this).val();
                    var name = $(this).attr('name');
                    if (value != null && value != '') {
                        main[name] = value;
                    }
                });
                
                // 设定checkbox，radio的值。
                $(':checkbox,:radio', form.find('[id="tab-1"]')).each(function () {
                    var name = $(this).attr('name');
                    main[name] = '';
                });

                $(':checkbox:checked,:radio:checked', form.find('[id="tab-1"]')).each(function () {
                    var name = $(this).attr('name');
                    if (main[name] == '') {
                        main[name] = $(this).val();
                    } else {
                        main[name] += "," + $(this).val();
                    }
                });
                
                main['posItemList'] = me.getPosData();
                 
                main['roleItemList'] = me.getRoleData();
                
                main['userGroupItemList'] = me.getUserGroupData();
                
                main['attrItemList'] = me.getAttrData();
                
                var mainStr = JSON2.stringify(main);
                console.log("employee save param: " + mainStr);
                $('textarea[name="json"]', newForm).remove();
                input1 = "<textarea style='display:none;'  name='json'>" + mainStr + "</textarea>";
                newForm.append(input1);
                newForm.appendTo("body");
                newForm.css('display', 'none');
                
                var $el = $(this);
				$el.button('loading'); 
                
                newForm.ajaxForm({
                	success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
                });
                
                if (frm.valid() && me.validBaseInfo(main) && me.validAttrInfo()) {
                    newForm.submit();
                }else{
					$el.button('reset');
				}
			});
		},
		/**
		 * 校验用户基本信息
		 * @param main
		 * @returns {Boolean}
		 */
		validBaseInfo : function(main){
			if(!main['account'] 
				|| undefined == main['account'] 
				|| 'undefined' == main['account']){
				DialogUtil.toastr('请填写账号');
				return false;
			}
			if(!isValidAccount(main['account'])){
				return false;
			}
			
			if(!main['password'] 
				|| undefined == main['password'] 
				|| 'undefined' == main['password']){
				DialogUtil.toastr('请填写密码');
				return false;
			}
			
			if(!main['name'] 
				|| undefined == main['name'] 
				|| 'undefined' == main['name']){
				DialogUtil.toastr('请填写用户姓名');
				return false;
			}
			
			if(!main['email'] 
				|| undefined == main['email'] 
				|| 'undefined' == main['email']){
				DialogUtil.toastr('请填写邮箱');
				return false;
			}
			if(!isValidMail(main['email'])){
				return false;
			}
			
			if(main['mobile'] 
				&& undefined != main['mobile'] 
				&& 'undefined' != main['mobile']
				&& '' != main['mobile']
				&& !isValidMobil(main['mobile'])){
				return false;
			}
			
			if(main['qq'] 
				&& undefined != main['qq'] 
				&& 'undefined' != main['qq']
				&& '' != main['qq']
				&& !isValidQQ(main['qq'])){
				return false;
			}
			
			return true;
		},
		/**
		 * 校验用户扩展属性
		 * @param main
		 * @returns {Boolean}
		 */
		validAttrInfo : function(){
			var data = $("div[type='attrItem']");
			var rs = true;
			$.each(data, function(i, n){
				var input = $("input[type='text']", n);
				var val = input.val();
				if(val
					&& undefined != val
					&& 'undefined' != val ){
					var validate = $(input).attr('validate');
					validate =  eval('(' + validate + ')');
					if(validate.number && !isValidNumber(val)){
						rs = false;
						return false;
					}
					if(validate.digits && !isValidDigits(val)){
						rs = false;
						return false;
					}
				}
			});
			
			return rs;
		},
		/**
		 * 获取扩展属性数据
		 * @returns {Array}
		 */
		getAttrData:function(){
			var data = $("div[type='attrItem']");
			var aryData=[];
			$.each(data, function(i, n){
				//{attrId:'-', value:'-'}
				var attrId = $("input[name='attrId']", n).val();
				var input = $("input[type='text']", n);
				if(input && input.val() != ''
					&& $.trim(input.val()) != ''){
					var attr = {'attrId':attrId,'value':$.trim(input.val())};
					aryData.push(attr);
				}
				
				var chks = $(":checkbox:checked,:radio:checked", n);
				if(chks && chks != null && chks.length != 0){
					for(var i = 0; i < chks.length; i ++){
						var chk = $(chks[i]);
						var attr = {'attrId':attrId,'value':$.trim(chk.val())};
						aryData.push(attr);
					}
				}
			});
			return aryData;
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var prem = $('#prem').val();
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else{
						if(orgId == null || orgId == ''){
							window.location.href = __ctx
							+ '/platform/org/partyEmployee/list.htm';
						}else{
							window.location.href = __ctx
							+ '/platform/org/partyOrg/gradeUserList.htm?orgId='+orgId+'&prem='+prem;
						}
					}
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 展示组织信息
		 */
        showOrgInfo: function () {
            var me = this;
            var treeObj = $.fn.zTree.getZTreeObj(me.consts.ORGTREE_ID);
            var nodes = treeObj.getCheckedNodes(true);
            if (nodes == null || nodes == "") {
            	$("#orgId").val("");
            	$("#orgName").html("");
            	$("#pathName").html("");
                DialogUtil.warn("你还没有选择任何节点！");
                return;
            }
            
            var _id = "";
            var _name = "";
            var _path_name = "";
            var _level = "";
            var n = nodes[0];
            
            _id = n.id;
            _name = n.name;
            _level = n.level;
            
            var path = n.getPath();
            for(var i = 1; i < path.length; i ++){
            	_path_name += path[i].name + '.'
            }
         
            // 根节点不能加
            if (_level != '0'){
            	$("#orgId").val(_id);
            	$("#orgName").html(_name);
            	$("#pathName").html(_path_name);
            }else{
            	DialogUtil.warn("根节点不是组织机构！");
                return;
            }

            //添加角色信息
//            var roleDataUrl = __ctx + "/platform/org/partyEmployee/roleListJson.htm?orgId="+ _id;
//            $.get(roleDataUrl,function (result) {
//            	$.each(result, function (i, r) { 
//            		me.addHtml('roleTree', r.id, r.name, null, r);
//            	});
//            }); 
        },
        /**
		 * 清除org信息
		 */
        hiddenOrgInfo: function () {
        	$("#orgId").val('');
        	$("#orgName").html('');
        	$("#pathName").html('');
        },
        /**
         * 清空扩展属性
         */
        clearAttr: function () {
        	var me = this;
        	var tab = $("#tab-1-1");
        	$(":text", tab).val('');
        	$(":checkbox", tab).removeAttr('checked');
        	$(":radio", tab).removeAttr('checked');
        },
        /**
         * 将角色添加到角色列表中【roleItemGrid】
         * @param rsArr
         */
        add2RoleGrid : function(rsArr){
        	var me = this;
        	for(var i = 0; i < rsArr.length; i ++){
        		me.addHtml('roleTree', rsArr[i].id, rsArr[i].name, null, rsArr[i]);
        	}
        },
		/**
		 * 添加数据到Grid中
		 */
        addRow2Grid: function (treeId, constType) {
            var me = this;
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var nodes = treeObj.getCheckedNodes(true);
            if (nodes == null || nodes == "") {
                DialogUtil.warn("你还没有选择任何节点！");
                return;
            }
            
            var tmpArr = [];
            if (treeId == this.consts.ROLETREE_ID) {
            	for(var i = 0; i < nodes.length; i ++){
            		if('role' == nodes[i].type){
            			tmpArr.push(nodes[i]);
            		}
            	}
            	if(tmpArr.length == 0){
            		DialogUtil.warn("你还没有选择任何角色节点！");
                    return;
            	}else{
            		nodes = tmpArr;
            	}
            }
            
            var _id = "";
            var _name = "";
            var _parentId = "";
            var _level = "";
            var _nodeId = "";
            var _nodeName = "";
            $.each(nodes, function (i, n) {
                _id = n.id;
                _name = n.name;
                _parentId = n.parentId;
                _level = n.level;
                n.source = '自有';
                // 根节点不能加
                if (_id && _id != '0' && _parentId != '-1'){
                	me.addHtml(treeId, _id, _name, constType, n);
                }
                //添加角色信息
//                var roleDataUrl = __ctx + "/platform/org/partyEmployee/roleListJson.htm?posId="+ _id;
//                $.get(roleDataUrl,function (result) {
//                	$.each(result, function (i, r) { 
//                		me.addHtml('roleTree', r.id, r.name, null, r);
//                	});
//                }); 
            });
           
        },
        /**
         * 清空列表数据（可删除列）
         * @param treeId	树id
         */
        clearGrid: function (treeId) {
        	var me = this;
            var records,rowData;
            
            if (treeId == this.consts.POSTREE_ID) {
                $(this.consts.POSITEMGRID).clearGridData();
            } else if (treeId == this.consts.ROLETREE_ID) {
                records = $(this.consts.ROLEITEMGRID).jqGrid('getRowData');
                for(var i = 0; i < records.length; i++){
                	rowData = records[i];
                	if(rowData.canDelete && (rowData.canDelete == true || rowData.canDelete == 'true')) {
                		$(this.consts.ROLEITEMGRID).delRowData(rowData.id);
                	}
                }
            }
        },
        /**
         * 向列表中动态添加记录
         * @param treeId	树id
         * @param objId		记录id
         * @param objName	记录名称
         * @param constType	类型（暂无用处）
         * @param node		树节点对象
         */
        addHtml: function (treeId, objId, objName, constType, node) {
        	
        	var me = this;
            // 因为我是以grid中是用from字段来存放行ID的，所以这里也是from
            var obj = {};
            var rowData = {};
            var json = [];
            
            var records;
            if (treeId == this.consts.POSTREE_ID) {
                records = $(this.consts.POSITEMGRID).jqGrid('getRowData');
            } else if (treeId == this.consts.ROLETREE_ID) {
                records = $(this.consts.ROLEITEMGRID).jqGrid('getRowData');
            }
            
            var isRepeat=false;
            //判断是否有相同行数据
            $(records).each(function (i,n) {
                if (n.id+'' == objId){
                	isRepeat=true;
                	if(n.source.indexOf(node.source)==-1){
                		n.source += "," + node.source;
                		n.canDelete = n.source.indexOf("其他")>-1?false:true;
                		$(me.consts.ROLEITEMGRID).jqGrid("setRowData", n.id, n);
                	}
                	return;
                }
            });
            
            if(isRepeat){
            	return;
            }

            rowData.id = objId;
            rowData.name = objName;
            
            var $obj=null;
            if (treeId == this.consts.POSTREE_ID) {
                $(this.consts.POSITEMGRID)[0].refreshIndex();
                $(this.consts.POSITEMGRID).jqGrid("addRowData", rowData.id, rowData, "first");
                $obj=$(":radio,:checkbox",this.consts.POSITEMGRID);
            } else if (treeId == this.consts.ROLETREE_ID) {
            	rowData.subSystemName = node.subSystemName;
            	rowData.source = node.source;
            	rowData.canDelete = rowData.source.indexOf("其他")>-1?false:true;
                $(this.consts.ROLEITEMGRID)[0].refreshIndex();
                $(this.consts.ROLEITEMGRID).jqGrid("addRowData", rowData.id, rowData, "first");
                $obj=$(":radio,:checkbox",this.consts.ROLEITEMGRID);
            }
            
			$obj.unbind('click');
			$obj.bind('click',function(){
				$(this).attr("value", $(this).is(':checked'));
			});
        },
        _initEvent: function(){
        	var me = this;
        	$(document).off("click", ".toolbar-panel a.btn.fa-more");
			$(document).on("click", ".toolbar-panel a.btn.fa-more", function(){
				var params = [];
				$(".pace-inactive input[type='hidden']").each(function(){
					params.push({name:$(this).attr("name"),value:$(this).val()});
				  });
				new AttrDialog({
					title:"拓展属性输入框",
					params:params,
					callback:function(data){
						me.setInputVal(".pace-inactive", data);
					}
				}).show();
			});
			
			$(document).on("click", "a.fa-refresh", function(){
				var userIds = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
				if(null == userIds || userIds.length == 0){
					DialogUtil.warn("请选择用户！");
					return;
				}
				me.resetPwd(userIds.join(","), null);
			});
        },
        setInputVal : function(selector, params){
			if(!params) return;
			var inputHtml = "<input type='hidden' name='#name#' value='#value#' />";
			var element = $(selector);
			element.html("");
			for(var i=0,temp;i<params.length;i++){
				temp = inputHtml;
				element.append( temp.replace("#name#",params[i].name).replace("#value#",params[i].value));
			}
			$(".toolbar-panel a.btn.fa-search").trigger("click");
		}
        
	};
})();
//自动搜索函数
function cg() {
	$('a.fa-search').click()
}
//图片上传 begin
function addPic(){
	new UploadDialog({
		uploadType: 'picture',
		maxUploadNum: 1,
		compressConf:{
		    width: 251,
		    height: 251,
		    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
		    allowMagnify: false,
		    // 是否允许裁剪。
		    crop: true,
		    // 是否保留头部meta信息。
		    preserveHeaders: true,
		    // 如果发现压缩后文件大小比原来还大，则使用原来图片
		    // 此属性可能会影响图片自动纠正功能
		    noCompressIfLarger: true,
		    // 单位字节，如果图片大小小于此值，不会采用压缩。
		    compressSize: 200
		},
		fileFormates :'bmp, gif, jpg, jpeg, png',
		callback:picCallBack
	}).show()}

function delPic(){
	$("#photo").val("");
	$("#personPic").attr("src",__ctx+"/commons/image/default_use_image.jpg");
};

function picCallBack(ary){
	if(!ary) return;
	var id = ary[0].id;
	var path= __ctx + "/platform/file/attachment/getFileById.htm?fileId=" + id;
	$("#photo").val("/platform/file/attachment/getFileById.htm?fileId=" + id);
	$("#personPic").attr("src",path);
};