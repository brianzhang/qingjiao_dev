/**
 * t_employee_dic
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:27
 *</pre>
 */
$(function() {
	employeeDic  = new EmployeeDic();
	employeeDic.init();
	
	formUrl = employeeDic.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#employeeDicGrid",// 列表对象
			PAGER : "#employeeDicPager",// 列表分页
			FORM : '#employeeDicForm',// 表单form
			FORMGET : '#employeeDicFormGet',// 表单form
			DICTREE: '#dicTree', // 树
			DICTREEID:'dicTree',
			DICITEMGRID:'#dicItemGrid'
	};
	/**
	 * t_employee_dic 对象
	 * @returns {EmployeeDic}
	 */
	EmployeeDic = function() {
		//定义属性
		this.categoryKey='DIC_TYPE'
	};

	/**
	 * 方法
	 */
	EmployeeDic.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				
			}
			if ($(this.consts.FORM).length > 0){//表单
				params = frameElement.dialog.params;
				this.dicTree =null;
				this._initForm();
				this._initData();
				this._initDicTree();
			}
		},

		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/codegen/employeeDic/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','用户id',' 数据字典id','管理'],
				        colModel: [{
				                 	   name:'userId',
				                	   index: 'USER_ID_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp',
					                	   hidden:true
				                	 					                	 	}, {
				                 	   name:'userName',
				                	   index: 'USER_NAME_'

				                	 					                	 	}, {
				                 	   name:'dicId',
				                	   index: 'dic_id_',
				                	   hidden:true

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript:employeeDic._toAssigen("{userId}")',
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/employeeDic/remove.htm?userId={userId}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/employeeDic/get.htm?userId={userId}'
									}]
								} ]
	
					});
		},
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			frm.valid();
            $(document).on('click', 'a.fa-save', function() {

                var nodes = me.dicTree.getCheckedNodes(true);
                if (nodes == null || nodes == "") {
                    DialogUtil.warn("你还没有选择任何节点！");
                    return;
                }
                
                var ds=[];
                var userId = $("#userId").val();
                $.each(nodes, function (i, n) {
                    // 根节点不能加
                    if (n.id && n.id != '0' && n.parentId != '-1'){
                    	var r = {};
                    	r.dicId = n["id"];
                    	ds.push(r);
                    }
                });
                
                var mainStr = JSON2.stringify(ds);
                console.log("employee save param: " + mainStr);
                
                var url = __ctx+"/platform/codegen/employeeDic/save.htm";
                var $el = $(this);
                $el.button('loading');
                $.post(url,{
                	json:mainStr,
                	userId:userId
                },function(result){
                	$el.button('reset'); 
                	me._showResponse(result);
                });
            		
            });
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
					function(rtn) {
					if(rtn)
						window.location.reload(true);
					else
						DialogUtil.closeAll();
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		/**
		 * 初始化岗位树
		 */
		_initDicTree : function(){
			var me = this;
            // 树
			me.dicTree = null;
			me.loadDicTree();
			me.initDicTreeToolbar();
            // 初始化滚动
			me.initLeftScroll(me.consts.DICTREE);
		},
		/**
		 * 初始化岗位树工具条
		 */
		initDicTreeToolbar: function () {
            var me = this;
            $('.pos-tree-toolbar').on("click", "a.btn", function () {
                if ($(this).hasClass("fa-refresh")) { // 刷新
                    me.loadDicTree();
                } else if ($(this).hasClass("fa-expand")) { // 展开
                    me.dicTree.expandAll(true);
                } else {
                    me.dicTree.expandAll(false);
                }
            });
        },
        /**
         * 加载岗位树
         */
        loadDicTree: function () {
            
			var me = this;
			this._treeRootId=0;
			this.expandByDepth = 1;
			var setting = {
				async: {enable: false},
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
					key:{name:"name",typeKey:"typeKey"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId",
						rootPId:me.categoryKey
					}
				},
				view: {
					selectedMulti: false,
					showIconFont:true
				},
				edit: {
					drag: {
						prev: false,inner: false,next: false,isMove:false
					},
					enable: true,
					showRemoveBtn: false,
					showRenameBtn: false
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
						me._treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e,treeId, treeNode) {
//						me._treeOnRightClick(me,treeNode,e);
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/codegen/employeeDic/dicTree.htm";
			$.post(url,{
				'userId':params.userId
			},function(result){
				me.dicTree=$.fn.zTree.init($(me.consts.DICTREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.dicTree.getNodesByFilter(function(node){
		                return (node.level<=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.dicTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.dicTree.expandAll(true);
		        }
			});
            
        },
        _treeOnLeftClick: function (me, treeNode) {
            if (!treeNode.getCheckStatus().checked){
                me.dicTree.checkNode(treeNode, true, false);
            }else{
                me.dicTree.checkNode(treeNode, false, true);
            }
        },
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
		
		_initDicGridList : function(userId){
			var me = this;
			var url = __ctx + '/platform/codegen/employeeDic/dicItemGridJson.htm';
			if(userId!=''){
				url+="?userId="+userId;
			}
			$(this.consts.DICITEMGRID).jqGrid({
				url : url,
				autowidth : false,
				shrinkToFit : true,
				datatype:"json", //数据类型
		        mtype:"POST",//提交方式
		        rownumbers:true,//添加左侧行号
				width: $(window).width()*0.63,
		        height: $(window).height()-172,
				colNames : [
					'dicId',
					'别名',
					'名称',
					'管理' ],
				colModel : [
					{
						name : 'dicId',
						index : 'DIC_ID_',
						hidden : true,
						key : true,
						sortable: false
					},
					{
						name : 'catetoryKey',
						index : 'NAME_',
						sortable: false
					},{
						name : 'dicName',
						index : 'NAME_',
						sortable: false
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
								click:'employeeDic.removeDicItem(\'{dicId}\');'
							} ]
					} ],
					gridComplete : function(){
						var $obj=$(":radio,:checkbox",me.consts.DICITEMGRID);
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
		getDicData:function(){
			var data = $(this.consts.DICITEMGRID).jqGrid('getRowData');
			var aryData=[];
			for(var ix=0;ix<data.length;ix++){
				var n = data[0];
				delete n['__manage'];
				n['userId'] = 
				aryData.push(n);
			}
			return aryData;
		},
		removeDicItem:function(id){
			$(this.consts.DICITEMGRID).jqGrid("delRowData", id);
		},
		
		/**
		 * 添加数据到Grid中
		 */
        addRow2Grid: function () {
            var me = this, treeId=me.consts.DICTREEID;
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var nodes = treeObj.getCheckedNodes(true);
            if (nodes == null || nodes == "") {
                DialogUtil.warn("你还没有选择任何节点！");
                return;
            }

            $.each(nodes, function (i, n) {
                // 根节点不能加
                if (n.id && n.id != '0' && n.parentId != '-1'){
                	me.addHtml(treeId, n);
                }
            });
           
        },
        /**
         * 清空列表数据（可删除列）
         * @param treeId	树id
         */
        clearGrid: function () {
        	var me = this;
            var records= $(this.consts.DICITEMGRID).jqGrid('getRowData'),rowData;
            for(var i = 0; i < records.length; i++){
            	rowData = records[i];
            	$(this.consts.DICITEMGRID).delRowData(rowData.dicId);
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
        addHtml: function (treeId, node) {
        	
        	var me = this;
            // 因为我是以grid中是用from字段来存放行ID的，所以这里也是from
            var obj = {};
            var rowData = {};
            var json = [];
            
            var records = $(this.consts.DICITEMGRID).jqGrid('getRowData');
            
            var isRepeat=false;
            //判断是否有相同行数据
            $(records).each(function (i,n) {
                if (n.id+'' == node.id){
                	isRepeat=true;
                	return;
                }
            });
            
            if(isRepeat){
            	return;
            }

            rowData.dicId = node.id;
            rowData.dicName = node.name;
            rowData.catetoryKey = node.typeKey;

            $(this.consts.DICITEMGRID)[0].refreshIndex();
            $(this.consts.DICITEMGRID).jqGrid("addRowData", rowData.dicId, rowData, "first");
            var $obj=$(":checkbox",this.consts.DICTREE);
            
			$obj.unbind('click');
			$obj.bind('click',function(){
				$(this).attr("value", $(this).is(':checked'));
			});
        },
        
        _toAssigen:function(userId){
        	
            var me = this,
            	url = __ctx+"/platform/codegen/employeeDic/dicDialog.htm"
            if(userId!=""){
            	url+="?userId="+userId
            }
		    DialogUtil.dialog({
				title:'资源分配',
				content:url,
			    area: ['50%', '80%'],
			    params:{
			    	userId:userId
			    }
			    
			});
        }
        
	};
})();