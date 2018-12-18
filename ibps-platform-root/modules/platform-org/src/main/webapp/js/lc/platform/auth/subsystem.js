/**
 * 子系统
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	subsystem = new Subsystem();
	subsystem.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#subsystemGrid",// 列表对象
			PAGER : "#subsystemPager",// 列表分页
			TREE_ID : 'subsystemTree',// 树
			TREE : '#subsystemTree',// 树的ID
			FORM : '#subsystemForm'// 表单form
	};
	/**
	 * 子系统
	 * @returns {Subsystem}
	 */
	Subsystem = function(){
		
	};

	Subsystem.prototype = {
			consts:_consts,
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
				if ($(this.consts.GRID).length > 0)//列表
					this._initGridList();
				if ($(this.consts.FORM).length > 0)//表单
					this._initForm();
				if ($(this.consts.TREE).length > 0)// 树
					this._initTree();
			},
			/**
			 * 初始化树
			 */
			_initTree:function(){
				var me = this;
				//初始化布局
				var layout = $('body').layout({ applyDefaultStyles: true});  
				layout.addPinBtn(".pinBtn", "west");
				// 树
				this.subsystemTree =null;
				this._treeFrameResize();
				// 缩放时候计算高度
				$(window).resize(function(){  
					me._treeFrameResize();
				});
				this.loadTree();
		        //初始化滚动
		        this.initLeftScroll();
		        //初始化树的顶部按钮
				this.initTreeToolbar();
			},
			initTreeToolbar:function(){
				var me = this;
				$('.tree-toolbar').on("click", "a.btn", function(){
					if($(this).hasClass("fa-refresh")){//刷新
						me.loadTree();
					}else	if($(this).hasClass("fa-expand")){//展开
						me.subsystemTree.expandAll(true);
					} else{
						me.subsystemTree.expandAll(false);	
					}
				});
			},
			/**
			 * 缩放时候计算高度
			 */
			_treeFrameResize:function (){
				$('.treeFrame').height( $(window).height()-20);
				$(this.consts.TREE).height( $(window).height()-140);
			},
			// 加载树
			loadTree:function (){
				var me = this;
				this._treeRootId=0;
				this.expandByDepth = 1;
				var setting = {
					async: {enable: false},
					data: {
						key:{name:"name"},
						simpleData: {
							enable: true,
							idKey: "id",
							pIdKey: "parentId",
							rootPId:this._treeRootId
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
							me.treeOnLeftClick(me,treeNode);	
						},
						onRightClick :function(e,treeId, treeNode) {
							me.treeOnRightClick(me,treeNode,e);
						},
						beforeDrop: null,
						onDrop: null
					}
				};
				var url=__ctx+"/platform/auth/subsystem/getTreeData.htm";
				$.post(url,{},function(result){
					me.subsystemTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
			        if(me.expandByDepth!=0) {
			            var nodes = me.subsystemTree.getNodesByFilter(function(node){
			                return (node.level==me.expandByDepth);
			            });
			            if(nodes.length>0){
			                for(var idx=0;idx<nodes.length;idx++){
			                	me.subsystemTree.expandNode(nodes[idx],true,false);
			                }
			            }
			        } else {
			        	me.subsystemTree.expandAll(true);
			        }
				});
			},
			/**
			 * 重新加载树
			 */
			reFresh:function(){
				//刷新左边的树
				this.loadTree();
				var url=__ctx+"/platform/auth/subsystem/get.htm?tree=true";
				$("#listFrame").attr("src",url);
			},
			treeOnLeftClick:function(me, treeNode) {
				var id=treeNode.id;
				me.selectTreeNode = treeNode;
				if(id== me._treeRootId)
					id ="";
				var url=__ctx+"/platform/auth/subsystem/get.htm?tree=true&id="+id;
				$("#listFrame").attr("src",url);
			},
			treeOnRightClick:function(me,treeNode,e){
				if (!treeNode) 
					return;
				me.subsystemTree.selectNode(treeNode);
				var menu=$('#subsystemMenu');
					
				menu.contextMenu(e,{
					onItem: function(context, ev) {
						var target =$(ev.target), 
						action = target.data("action");
					if (target.hasClass('disabled'))
						return false;
					switch (action) {
						case "node_add":// 新增节点
							me.addNode(treeNode);
							break;
						case "node_edit":// 编辑节点
							me.editNode(treeNode);
							break;
						case "node_del":// 删除节点
							me.delNode(treeNode);
							break;
					}
					}
				});
			},
			addNode:function(node){
				var url=__ctx+"/platform/auth/subsystem/edit.htm?tree=true&parentId="+node.id;
				$("#listFrame").attr("src",url);
			},
			editNode:function(node){
				var url=__ctx+"/platform/auth/subsystem/edit.htm?tree=true&id="+node.id;
				$("#listFrame").attr("src",url);
			},
			delNode:function(node){
				var me =this;
				DialogUtil.confirm('确认删除吗？',function(rtn){
					if(!rtn)
						return;
					
					if(node.isFolder){
						DialogUtil.confirm('是否删除下级子系统？不删除则下级子系统层次会转换到该子系统层次！',function(rtn){
							me.delSubsystem(me, node, rtn);
						},true);
					}else{
						me.delSubsystem(me, node, false);
					}
				});
			},
			delSubsystem : function(me, node, rtn){
				var url =__ctx+"/platform/auth/subsystem/remove.htm";
				$.post(url,{
					id:node.id,
					cascade:rtn
					},
					function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr( '删除成功！',true);
				    	me.reFresh();
				    } 
				});
			},
			/**
			 * 左侧菜单的滚动
			 */
			initLeftScroll:function(){
		    	$(_consts.TREE).niceScroll({
		    		horizrailenabled : false,
		    		cursorborder : "0",
		    		cursorwidth : "6px",
		    		cursorcolor : "#2A2A2A",
		    		zindex : "5555",
		    		autohidemode : true,
		    		bouncescroll : true,
		    		mousescrollstep : '40',
		    		scrollspeed : '100',
		    		background : "#999",
		    		cursoropacitymax : "0.6",
		    		cursorborderradius : "0"
		    	});
		    	$(_consts.TREE).getNiceScroll().resize();
			},
			
			/* TODO 列表 */
			/**
			 * 初始列表
			 */
			_initGridList : function() {
				var me = this;
				$(this.consts.GRID).GridList(
						{
							url : __ctx + "/platform/auth/subsystem/listJson.htm",
							pager : _consts.PAGER,
							colNames : [ 'id', '名称', '别名', 'LOGO', '子系统主页', '创建时间',
									'本地系统', '管理' ],
							colModel : [
									{
										name : 'id',
										index : 'ID_',
										hidden : true,
										key : true
									},
									{
										name : 'name',
										index : 'NAME_',
										width : 60
									},
									{
										name : 'alias',
										index : 'ALIAS_',
										width : 90
									},
									{
										name : 'logo',
										index : 'LOGO_',
										width : 100,
										formatter : function(cellval, opts, rowdata) {
									
												if(		rowdata.logoType == 'image'){
													return '<img id="logoImage" src="'+__ctx+'/styles/commons/images/logo/'+cellval+'" width="30px" height="30px"/>';
												}else{
													
												}
											return '	<i class="fa '+cellval+'"></i>';
										}
									}, {
										name : 'homePage',
										index : 'HOMEPAGE_',
										width : 80
									}, {
										name : 'createTime',
										index : 'CREATE_TIME_',
										width : 80,
										formatter : "timestamp"
									}, {
										name : 'isLocal',
										index : 'IS_LOCAL_',
										width : 40,
										formatter : 'dataFormat',
										formatoptions : {
											value : [{
												name:"false",
												value:'否',
												css:'red'
											},{
												name:"true",
												value:'是',
												css:'green'
											}]
										}
									}, {
										name : '__manage',
										label:'管理',
										width : 30,
										sortable:false,
										classes:"rowOps",
										formatter : 'manage',
										formatoptions :[{
											label:"编辑",
											classes:'btn btn-primary fa fa-edit',
											action:__ctx+'/platform/auth/subsystem/edit.htm?id={id}'
										},{
											label:"删除",
											classes:'btn btn-primary fa fa-remove',
											action:__ctx+'/platform/auth/subsystem/remove.htm?id={id}'
										},{
											label:"明细",
											classes:'btn btn-primary fa fa-detail',
											action: __ctx+'/platform/auth/subsystem/get.htm?id={id}'
										}]
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
				$(document).on("click", "a.fa-save", function() {
					var $el = $(this);
					$el.button('loading');
					frm.ajaxForm({
						success : function(responseText){
							me._showResponse(responseText,$el);
						},
						error: function(){
							$el.button('reset'); 
						}
					});
					if (frm.valid())
						form.submit();
					else{
						$el.button('reset');
						DialogUtil.toastr("请检查表单是否正确填写！")
					}

				});
				me._selectLogoType();
				// 选择Logo
				me._selectLogo();
			},
			/**
			 * 表单成功返回信息
			 * 
			 * @param responseText
			 */
			_showResponse : function(responseText,$el) {
				$el.button('reset');
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					var isTree = $("#tree").val();
					if('true' === isTree){
						parent.subsystem.reFresh();
						window.location.reload(true);
					}else{
						DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
								function(rtn) {
							if(rtn)
								window.location.reload(true);
							else
								window.location.href = __ctx	+ "/platform/auth/subsystem/list.htm";
						});
					}
				} else {
					DialogUtil.error(msg.getMessage(),msg.getCause());
				}
			},
			_selectLogoType:function(){
				$('[name="logoType"]').on("click", function() {
					var val =	$(this).val();
					if(val == 'font'){
						$('#fontLogo').removeClass("hidden");
						$('#imageLogo').addClass("hidden");
					}else{
						$('#fontLogo').addClass("hidden");
						$('#imageLogo').removeClass("hidden");
					}
				});
				$('[name="logoType"]:checked').click();
			},
			/**
			 * 选择对话框
			 */
			_selectLogo : function() {
				
				
			    $('.icp-dd').iconpicker({
                });
			    
			    $('.icp-dd').on('iconpickerSelected', function(e) {
			    	var val =e.iconpickerValue;
                     if(val.match(/^fa-/)){
                    	 val = 'fa '+val;
                     }else{
                    	 val = 'glyphicon '+val;
                     }
                     $("#logo").val(val);
			    });
			    
			    $(document).on("click", "#selectImageLogo", function() {
					new LogoDialog({
						callback : function(data,dialog,index) {
							$('#logo').val(data);
							$('#logoImage').attr('src',__ctx+'/styles/commons/images/logo/'+data);

							DialogUtil.close(index);
						}
					}).show();
				});
			}
		};
})();


