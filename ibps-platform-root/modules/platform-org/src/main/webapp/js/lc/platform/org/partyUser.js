/**
 * 用户
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-07-04 16:02:01
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var partyUser = new PartyUser();
	partyUser.init();
});

(function() {
	//加载参与者的信息
	 var orgTreeDateUrl = __ctx + "/platform/org/partyUser/getGroupListByDimKey.htm";
	 
	//定义常量
	var _consts = {
		GRID : "#partyUserGrid",// 列表对象
		PAGER : "#partyUserPager",// 列表分页
		FORM : '#partyUserForm',// 表单form
		GROUPTREE_ID: 'groupTree', // 树
        GROUPTREE: '#groupTree', // 树的ID,
        ORGTREE_ID: 'orgTree', // 树
        ORGTREE: '#orgTree', // 树的ID,
        ROLETREE_ID: 'roleTree', // 树
        ROLETREE: '#roleTree', // 树的ID,
        ORGITEMGRID: "#orgItemGrid",
        ROLEITEMGRID: "#roleItemGrid",
        GROUPITEMGRID: "#groupItemGrid"
	};
	/**
	 * 用户 对象
	 * @returns {PartyUser}
	 */
	PartyUser = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyUser.prototype = {
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
			if ($(this.consts.ORGTREE).length > 0) // 树
              this._initOrgTree();
			if ($(this.consts.GROUPTREE).length > 0) // 树
              this._initGroupTree();
			if ($(this.consts.ROLETREE).length > 0) // 树
              this._initRoleTree();
			if ($(this.consts.ORGITEMGRID).length > 0) // 表单
              this._initOrgItemGridList();
			if ($(this.consts.ROLEITEMGRID).length > 0) // 表单
              this._initRoleItemGridList();
			if ($(this.consts.GROUPITEMGRID).length > 0) // 表单
              this._initGroupItemGridList();
    
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
										+ '/platform/org/partyUser/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [
										'用户 ID',
										'登录账号',
										'微信账号',
										'用户状态',
										'是否超级管理员',
										'创建时间', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'account',
											index : 'ACCOUNT_'
										},
										{
											name : 'wcAccount',
											index : 'WC_ACCOUNT_'
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
											name : 'isSuper',
											index : 'IS_SUPER_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                    'Y': '是',
				                                    'N': '否'
				                                }
				                            }
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
																+ '/platform/org/partyUser/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyUser/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyUser/get.htm?id={id}'
													} ]
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
         * 初始化树
         */
        _initOrgTree: function () {
            var me = this;
            // 树
            this.orgTree = null;
            this.loadOrgTree();
            // 初始化滚动
            this.initOrgLeftScroll();
            this.initOrgTreeToolbar();

        },
        
        /**
         * 加载顶部刷新按钮事件
         */
        initOrgTreeToolbar: function () {
            var me = this;
            $('.org-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadOrgTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.orgTree.expandAll(true);
                } else {
                    me.orgTree.expandAll(false);
                }
            });
        },
        
        // 加载组织树
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
                            me.orgTreeOnRightClick(me, treeNode);
                        },
                        beforeDrop: null,
                    beforeCheck: null,
                    onCheck: null,
                    onDrop: null
                }
            };
            if (isGrade) {
                orgTreeDateUrl = __ctx + "/platform/org/partyEntit/getOrgTreeData.htm"
            }
            $.post(orgTreeDateUrl, {
            	'typeId':orgDimsion.typeId,
                'id': orgDimsion.typeId
            }, function (result) {
                me.orgTree = $.fn.zTree.init($(me.consts.ORGTREE), setting, result);
                if (me.expandByDepth != 0) {
                    var nodes = me.orgTree.getNodesByFilter(function (node) {
                        return (node.level == me.expandByDepth);
                    });
                    if (nodes.length > 0) {
                        for (var idx = 0; idx < nodes.length; idx++) {
                            me.orgTree.expandNode(nodes[idx], true, false);
                        }
                    }
                } else {
                    me.orgTree.expandAll(true);
                }

            });

        },
        
        /**
         * 初始化树
         */
        _initRoleTree: function () {
            var me = this;
            // 树
            this.roleTree = null;
            this.loadRoleTree();
            // 初始化滚动
            this.initRoleLeftScroll();
            this.initRoleTreeToolbar();

        },
        initRoleTreeToolbar: function () {
            var me = this;
            $('.role-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadRoleTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.roleTree.expandAll(true);
                } else {
                    me.roleTree.expandAll(false);
                }
            });
        },
        
        /**
         * 左侧菜单的滚动
         */
        initRoleLeftScroll: function () {
            $(_consts.ROLETREE).niceScroll({
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
            $(_consts.ROLETREE).getNiceScroll().resize();
        },
        
        // 加载树
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
            if (isGrade) {
                orgTreeDateUrl = __ctx + "/platform/org/partyEntit/getOrgTreeData.htm"
            }
            $.post(orgTreeDateUrl, {
                'typeId': roleDimsion.typeId,
                'id': roleDimsion.typeId
            }, function (result) {
                me.roleTree = $.fn.zTree.init($(me.consts.ROLETREE), setting, result);
                if (me.expandByDepth != 0) {
                    var nodes = me.roleTree.getNodesByFilter(function (node) {
                        return (node.level == me.expandByDepth);
                    });
                    if (nodes.length > 0) {
                        for (var idx = 0; idx < nodes.length; idx++) {
                            me.roleTree.expandNode(nodes[idx], true, false);
                        }
                    }
                } else {
                    me.roleTree.expandAll(true);
                }

            });

        },
        
        roleTreeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked)
                me.roleTree.checkNode(treeNode, true, false)
            else
                me.roleTree.checkNode(treeNode, false, true)
        },
        orgTreeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked)
                me.orgTree.checkNode(treeNode, true, false)
            else
                me.orgTree.checkNode(treeNode, false, true)
        },
        
        /**
         * 左侧菜单的滚动
         */
        initOrgLeftScroll: function () {
            $(_consts.ORGTREE).niceScroll({
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
            $(_consts.ORGTREE).getNiceScroll().resize();
        },
        
        /**
         * 初始列表
         */
        _initRoleItemGridList: function () {
            var me = this;
            $(this.consts.ROLEITEMGRID)
                .jqGrid({
                    datatype: "json",
                    url: __ctx + '/platform/org/user/partyUser/roleListJson.htm?userId=' + userId + '&type=role',
                    colNames: ['relId', 'groupId', 'relTypeId', 'userId', 'dimId', '维度', '组名称', '关系类型', '状态', '管理'
                    ],
                    colModel: [{
                        name: 'relId',
                        index: 'relId',
                        hidden: true,
                        key: true
                    }, {
                        name: 'groupId',
                        index: 'groupId',
                        hidden: true
                    }, {
                        name: 'relTypeId',
                        index: 'relTypeId',
                        hidden: true
                    }, {
                        name: 'userId',
                        index: 'userId',
                        hidden: true
                    }, {
                        name: 'dimId',
                        index: 'dimId',
                        hidden: true
                    }, {
                        name: 'dimName',
                        index: 'dimName',
                        width: 30
                    }, {
                        name: 'groupName',
                        index: 'groupName',
                        width: 40,
                        formatter: function(value,row,index){
							if(row.rowId=='00')
						    	return "全局角色";
						    	else return value;
							}
                    }, {
                    	name: 'relationName',
                        index: 'relationName',
                        width: 30
                    }, {
                        name: 'status',
                        index: 'status',
                        width: 30,
                        formatter: 'select',
                        formatoptions: {
                        	value : {
								'actived' : '已激活',
								'archived' : '已归档',
								'locked' : '锁定',
								'deleted' : '已删除'
							}
                        }
                    }, {
                        name: '__manage',
                        width: 120,
                        classes: 'rowOps',
                        formatter: 'manage',
                        formatoptions: [{
                            label: '移除',
                            classes: 'btn btn-primary fa fa-delete',
                            action: 'javascript:delRow("' + this.consts.ROLEITEMGRID + '","{relId}");'
                        }]
                    }],
                    width: $(window).width()-300,
                    height: $(window).height() - 100,
                    shrinkToFit: true,
                    multiselect: true,
                    multiboxonly: true,
                    viewrecords: true,
                    loadonce: true,
                    loadComplete: function () {
                        try {
                            me.initBtnOption();
                            if(this.p.initRowOptions)
            					this.p.initRowOptions.apply(this, arguments);
                        } catch (e) {}
                    }

                });
        },
        
        
        /**
         * 初始化树
         */
        _initGroupTree: function () {
            var me = this;
            // 树
            this.groupTree = null;
            this.loadGroupTree();
            // 初始化滚动
            this.initGroupLeftScroll();
            this.initGroupTreeToolbar();

        },
        initGroupTreeToolbar: function () {
            var me = this;
            $('.group-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadGroupTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.groupTree.expandAll(true);
                } else {
                    me.groupTree.expandAll(false);
                }
            });
        },
        // 加载树
        loadGroupTree: function () {
            var me = this;
            this._treeRootId = 0;
            this.expandByDepth = 1;
            var setting = {
                async: {
                    enable: false,
                    otherParam: ["isGrade", "true"]
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
                        rootPId: me.systemId
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
                            me.groupTreeOnLeftClick(me, treeNode);
                        },
                        onRightClick: function (treeId, treeNode) {
                            me.groupTreeOnRightClick(me, treeNode);
                        },
                        beforeDrop: null,
                    beforeCheck: null,
                    onCheck: null,
                    onDrop: null
                }
            };
            if (isGrade) {
                orgTreeDateUrl = __ctx + "/platform/org/partyEntit/getOrgTreeData.htm"
            }
            $.post(orgTreeDateUrl, {
                'typeId': typeId,
                'id': typeId
            }, function (result) {
                me.groupTree = $.fn.zTree.init($(me.consts.GROUPTREE), setting, result);
                if (me.expandByDepth != 0) {
                    var nodes = me.groupTree.getNodesByFilter(function (node) {
                        return (node.level == me.expandByDepth);
                    });
                    if (nodes.length > 0) {
                        for (var idx = 0; idx < nodes.length; idx++) {
                            me.groupTree.expandNode(nodes[idx], true, false);
                        }
                    }
                } else {
                    me.groupTree.expandAll(true);
                }

            });

        },
        groupTreeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked)
                me.groupTree.checkNode(treeNode, true, false)
            else
                me.groupTree.checkNode(treeNode, false, true)
        },
        /**
         * 左侧菜单的滚动
         */
        initGroupLeftScroll: function () {
            $(_consts.GROUPTREE).niceScroll({
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
            $(_consts.GROUPTREE).getNiceScroll().resize();
        },
        
        /**
         * 初始列表
         */
        _initOrgItemGridList: function () {
            var me = this;
            $(this.consts.ORGITEMGRID)
                .jqGrid({
                    datatype: "json",
                    url: __ctx + '/platform/org/partyUser/roleListJson.htm?userId=' + userId + '&type=org',
                    colNames: ['relId', 'groupId', 'relTypeId', 'userId', 'typeId', '组名称', '关系类型','是否主组织','管理'
                           ],
                    colModel: [{
                        name: 'relId',
                        index: 'relId',
                        hidden: true,
                        key: true
                    }, {
                    	name: 'groupId',
                        index: 'groupId',
                        hidden: true
                    }, {
                        name: 'relTypeId',
                        index: 'relTypeId',
                        hidden: true
                    }, {
                        name: 'userId',
                        index: 'userId',
                        hidden: true
                    }, {
                        name: 'typeId',
                        index: 'typeId',
                        hidden: true
                    },{
                        name: 'groupName',
                        index: 'groupName',
                        width: 40
                    }, {
                    	name: 'relationName',
                        index: 'relationName',
                        width: 30
                    }, {
                    	name: 'relId',
                        index: 'relId',
                        width: 30,
                        formatter : function(cellval, opts, rowdata) {
							var rs = "<input type='radio' name='isMainOrg' value='"+cellval+"'/>";
							return rs;
						}
                    }, {
                        name: '__manage',
                        width: 120,
                        classes: 'rowOps',
                        formatter: 'manage',
                        formatoptions: [{
                            label: '移除',
                            classes: 'btn btn-primary fa fa-delete',
                            action: 'javascript:delRow("' + this.consts.ORGITEMGRID + '","{relId}");'
                        }]
                    }],
                    width: $(window).width()-300,
                    height: $(window).height() - 100,
                    shrinkToFit: true,
                    multiselect: true,
                    multiboxonly: true,
                    viewrecords: true,
                    loadonce: true,
                    loadComplete: function () {
                        me.initBtnOption();
                        try {
                        	if(this.p.initRowOptions)
            					this.p.initRowOptions.apply(this, arguments);
                        } catch (e) {}
                    }

                });
        },
        
    	/**
		 * 初始化按钮的操作
		 */
		initBtnOption:function(){
			$(document).on("click", ".rowOps a.btn", function(){
				if ($(this).hasClass('disabled'))
					return false;
				var self = $(this), url = self.attr('action');
				if (url == null || url == '') {
					DialogUtil.toastr('未找到配置参数[action]!');
					return false;
				}
				window.location.href =  url;
			});
		},
        
		 // 添加按钮 （ treeName ,关系类型ID ，关系类型名字,关系约束类型,维度）
        btnAddRow: function (treeName, typeId, typeName, constType, relDimId) {
            var me = this;
            var treeObj = $.fn.zTree.getZTreeObj(treeName);
            var nodes = treeObj.getCheckedNodes(true);
            if (nodes == null || nodes == "") {
                DialogUtil.warn("你还没有选择任何节点！");
                return;
            }
            if (treeName == 'groupTree') {
                var dimName = $("#dimensions option:selected").text();
            } else if (false) {

            }
            var groupId = "";
            var name = "";
            $.each(nodes, function (i, n) {
                var dimid = typeId;
                var dimname = name;
                if (n.dimKey == 'position') {
                    dimid = postDimsion.typeId;
                    dimname = postDimsion.name;
                } else if (n.dimKey == 'role') {
                    dimid = roleDimsion.typeId;
                    dimname = roleDimsion.name;
                } else if (n.dimKey == 'org') {
                    dimid = orgDimsion.typeId;
                    dimname = orgDimsion.name;
                }
                groupName = n.name;
                groupId = n.groupId;
                var parentId = n.parentId;
                if (!relDimId || relDimId == dimid)
                    if ((groupId && parentId != '-1') || groupId== '0') // 角色根节点不能加
                        me.groupAddHtml(treeName, groupId, groupName, typeId, typeName, dimid, dimname, constType);
            });
        },
        
        /**
         * 往右添加信息
         * @param treeName
         * @param groupId
         * @param groupName
         * @param typeId
         * @param typeName
         * @param dimId
         * @param dimName
         * @param constType
         */
        groupAddHtml: function (treeName, groupId, groupName, typeId, typeName, dimId, dimName, constType) {
            var obj = {};
            var rowData = {};
            var json = [];
            var relId = "";
            // 以 one 结尾的 不能添加至多个组织
            if (constType.indexOf("2one") != -1) {
            	relId = typeId + '';
            } else {
            	relId = groupId + typeId + '';
            }
            var records;
            if (treeName == this.consts.GROUPTREE_ID) {
                records = $(this.consts.GROUPITEMGRID).jqGrid('getRowData');
            } else if (treeName == this.consts.ORGTREE_ID) {
                records = $(this.consts.ORGITEMGRID).jqGrid('getRowData');
            } else if (treeName == this.consts.ROLETREE_ID) {
                records = $(this.consts.ROLEITEMGRID).jqGrid('getRowData');
            }
            var isRepeat=false;
            //判断是否有相同行数据
            $(records).each(function (i) {
                if ((this.groupId+this.relTypeId+'') == relId){
                	isRepeat=true;
                	return;
                }
            });
            if(isRepeat){
            	return;
            }

            rowData.relId = relId;
            rowData.groupId = groupId;
            rowData.relTypeId = typeId;
            rowData.dimId = typeId;
            rowData.groupName = groupName;
            rowData.dimName = dimName;
            rowData.status = 'actived';
            rowData.relationName = typeName;
            rowData.isnew = true;
            if (treeName == this.consts.GROUPTREE_ID) {
                $(this.consts.GROUPITEMGRID)[0].refreshIndex();
                $(this.consts.GROUPITEMGRID).jqGrid("addRowData", rowData.relId, rowData, "first");
            } else if (treeName == this.consts.ORGTREE_ID) {
                $(this.consts.ORGITEMGRID)[0].refreshIndex();
                $(this.consts.ORGITEMGRID).jqGrid("addRowData", rowData.relId, rowData, "first");
            } else if (treeName == this.consts.ROLETREE_ID) {
                $(this.consts.ROLEITEMGRID)[0].refreshIndex();
                $(this.consts.ROLEITEMGRID).jqGrid("addRowData", rowData.relId, rowData, "first");
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
						if(orgId == null || orgId == ''){
							window.location.href = __ctx
							+ '/platform/org/partyUser/list.htm';
						}else{
							window.location.href = __ctx
							+ '/platform/org/partyOrg/gradeUserList.htm?groupId='+orgId;
						}
					}
						
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
        
	};
})();

/**
 * 中间属于按钮方法
 * @param treeName
 * @param typeId
 * @param typeName
 * @param constType
 * @param relDimId
 */
function btnAddRow(treeName, typeId, typeName, constType, relDimId) {
	new PartyUser().btnAddRow(treeName, typeId, typeName, constType, relDimId);
};

//删除一行
function delRow(gridName, id) {
    $(gridName).jqGrid('delRowData', id);
};

//图片上传 begin
function addPic(){
	new UploadDialog({
		uploadType: 'picture',
		fileFormates :'bmp, gif, jpg, jpeg, png',
		callback:picCallBack
	}).show()
}

function delPic(){
	$("#picture").val("");
	$("#personPic").attr("src",__ctx+"/commons/image/default_image_male.jpg");
};

function picCallBack(ary){
	var id = ary[0].id;
	var path= __ctx + "/platform/file/attachment/getFileById.htm?fileId=" + id;
	$("#photo").val("/platform/file/attachment/getFileById.htm?fileId=" + id);
	$("#personPic").attr("src",path);
};


