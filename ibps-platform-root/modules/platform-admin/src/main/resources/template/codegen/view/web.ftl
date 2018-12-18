<#assign baseurl ="/"+app+"/"+module>
<#assign url =baseurl+"/"+classVar>
<#assign pkVar=pkModel.colName >

/**
 * ${comment}
 * 
 *
 *<pre> 
 <#if vars.company?exists>
 * 开发公司：${vars.company}
 </#if>
 <#if vars.developer?exists>
 * 开发人员：${vars.developer}
 </#if>
 <#if vars.email?exists>
 * 邮箱地址：${vars.email}
 </#if>
 * 创建时间：${date?string("yyyy-MM-dd HH:mm:ss")}
 *</pre>
 */
$(function() {
	${classVar}  = new ${class}();
	${classVar}.init();
	
	formUrl = ${classVar}.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			<#if model.variables.struType='tree'>
			TREE_ID : '${classVar}Tree',// 树
			TREE : '#${classVar}Tree', //树ID
			<#else>
			GRID : "#${classVar}Grid",// 列表对象
			PAGER : "#${classVar}Pager",// 列表分页
			</#if>
			FORM : '#${classVar}Form',// 表单form
			FORMGET : '#${classVar}FormGet'// 表单form
			
	};
	/**
	 * ${comment} 对象
	 * @returns {${class}}
	 */
	${class} = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	${class}.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			<#if model.variables.struType='tree'>
			if($(this.consts.TREE).length > 0){
				this._init${class}Tree();
			}
			<#else>
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				<#if (vars.flowKey?exists && vars.flowKey != "") || (vars.selStartFlow?exists && vars.selStartFlow != "")>this._bindBtns();</#if>
			}
			</#if>
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0){// 明细页面office控件初始化
				this._initOffice('r');
			}
		},
		_initOffice : function(_rights){
			<#list colList as col>
			<#if 'office' == col.control>
			<#assign colName=col.colName>
			<#assign paramsJsonObj=col.paramsJson?eval />
			<#assign menubars=paramsJsonObj.menubars />
			// office控件-${col.comment}-数据提交
			setTimeout((function(_this) {
				return function() {
					_thisoffice = new OfficeControl({
						controlId : '${colName}',
						fieldName : '${colName}',
						fileId : $('#${colName}_value').val() || '',
						type : $('#${colName}').prop('data-office_type') || 'doc',
						docName : '${col.comment}' + new Date().getTime(),
						btns : ${listToString(menubars)},
						rights : _rights,
						callback : function(){
							$('#${colName}_value').val(_thisoffice.options.fileId);
						}
					});
					_thisoffice.init();
				};
		  	})(this), 100);
			</#if>
			</#list>
		},
		<#if (vars.flowKey?exists && vars.flowKey != "" ) || (model.variables.flowKey?exists) 
			|| (vars.selStartFlow?exists && vars.selStartFlow != "" ) || (model.variables.selStartFlow?exists)>
		_bindBtns : function(){
			var me = this;
			$(document).on('click', '.buttons a.fa-caret-square-o-right', function () {
            	
 				me.startFlow('',me);
 			});
		},
		startFlow : function(id,scope){
			var me = typeof(scope) != "undefined"?scope:this;
        	var url = __ctx+'${url}/startFlow.htm';
            var $el = $(me);
           	var boId = '${model.boId?string}'
            
            if(id.length==0){
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}
            	id = ids.join(',');
            }
			
          	var selStartFlow,flowKey;
			<#if vars.flowKey?exists && vars.flowKey != "">
				flowKey = '${model.variables.flowKey}';
			<#elseif model.variables.flowKey?exists>
				flowKey = '${vars.flowKey}';
			<#elseif vars.selStartFlow?exists && vars.selStartFlow != "">
				selStartFlow = '${model.variables.selStartFlow}';
			<#elseif model.variables.selStartFlow?exists>
				selStartFlow = '${vars.selStartFlow}';
			</#if>
			
			if(typeof(selStartFlow) != "undefined"&&selStartFlow ==="true"){
				
				new BpmDefinitionDialog({
					params:{boId:boId},
					isSingle:true,
					callback : function(data,index) {
						defKey = data[0].defKey;
						postStartFlow();
						DialogUtil.close(index);
					}
				}).show();

			}else{

				if ($.isEmpty(flowKey)||typeof(selStartFlow)=="undefined"||selStartFlow ==="false") {
					DialogUtil.msg("请绑定或选择流程！");
					return;
				}
				postStartFlow();
			}
			
			var postStartFlow = function(){
            	
            	DialogUtil.confirm('确定启动流程？', function(rtn) {
	        		$el.button('loading');
	            	var lid = DialogUtil.load();
	                $.post(url, {'id': id, 'defKey': flowKey, "boId":boId}, function (responseText) {
	                	DialogUtil.close(lid);
	                	var msg = new com.lc.form.ResultMessage(responseText);
	        			if (msg.isSuccess()) {
	        				DialogUtil.msg(msg.getMessage());
	        				$el.button('reset');
	        			} else {
	        				DialogUtil.error(msg.getMessage());
	        				$el.button('reset');
	        			}
	                })
				})
			}
			
		},
		</#if>

		<#if model.variables.struType='tree'>
		_init${class}Tree:function(){
			var me = this;
			//初始化布局
			var layout =   $('body').layout({ applyDefaultStyles: true});  
			layout.addPinBtn( ".pinBtn", "west" );
			// 树
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
					key:{name:"${convertUnderLine(model.variables.key)}"},
					simpleData: {
						enable: true,
						idKey: "${convertUnderLine(model.variables.idKey)}",
						pIdKey: "${convertUnderLine(model.variables.pidKey)}",
						rootPId:"0"
					}
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
						me.treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e, treeId, treeNode) {
						me.treeOnRightClick(me,treeNode,e);
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"${url}/getTreeData.htm";
			$.post(url,function(result){
				me.${classVar}Tree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.${classVar}Tree.getNodesByFilter(function(node){
		                return (node.level==me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.${classVar}Tree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.${classVar}Tree.expandAll(true);
		        }
			});
		},
		/**
		 * 重新加载树
		 */
		reFresh:function(){
			//刷新左边的树
			this.loadTree();
		},
		treeOnLeftClick:function(me, treeNode) {
			var nodeId=treeNode.id;
			me.selectTreeNode = treeNode;
			if(nodeId==0 || nodeId == '0')
				return;
			var url=__ctx+"${url}/get.htm?id="+nodeId;
			$("#listFrame").attr("src",url);
		},
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			this.${classVar}Tree.selectNode(treeNode);
			
			//获取当前点击左树的参与者Id
			var nodeId = treeNode.id;
			var menu=null;
			///特殊节点能新增
			if(nodeId==''||nodeId==undefined ||nodeId =="0"){
				menu=$('#rootMenu');
			}
			else{
				menu=$('#groupMenu');
			}
				
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
				if (target.hasClass('disabled'))
					return false;
				switch (action) {
					case "node_add":// 增加节点
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
		delNode:function(node){
			if(node.children != null && node.children.length > 0) {
				DialogUtil.toastr("请先删除子节点！");
				return;
			}
			
			var me = this;
			var url =__ctx+"${url}/remove.htm",me =this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				
				$.ajax({
					type : "POST",
					url : url,
					data : {${convertUnderLine(model.variables.idKey)}:node.id},
					success : function(responseText) {
						var resultMessage = new com.lc.form.ResultMessage(responseText);
					    if (resultMessage.isSuccess()) {
					    	me.reFresh();
					    	DialogUtil.toastr(resultMessage.getMessage(),true);
					    } else{
					    	DialogUtil.error(resultMessage.getMessage());
					    }
					},
					errror:function(error){
						DialogUtil.error(error);
					}
				});
			});
		},
		addNode:function(node){
			var url=__ctx+"${url}/edit.htm?${convertUnderLine(model.variables.pidKey)}="+node.id;
			$("#listFrame").attr("src",url);
		},
		editNode:function(node){
			var url=__ctx+"${url}/edit.htm?${convertUnderLine(model.variables.idKey)}="+node.id+"&${convertUnderLine(model.variables.pidKey)}="+node.getParentNode().id;
			$("#listFrame").attr("src",url);
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
		initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.${classVar}Tree.expandAll(true);
				} else{
					me.${classVar}Tree.expandAll(false);	
				}
			});
		},
		blank : function(){
			$("#listFrame").attr("src",'');
		},
		<#else>
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'${url}/listJson.htm',
						pager :this.consts.PAGER,
						colNames: [<#list colList as col>'${col.getComment()}',</#list>'管理'],
				        colModel: [<#list colList as col><#assign colName=col.colName>{
				                 	   name:'${colName}',
				                	   index: '${col.columnName}'
				                	 	<#if (col.colType=="java.util.Date") ||(col.colType=="Date")>
				                	 	,formatter: 'timestamp'</#if>
				                	 	<#if (col.isPK) >,hidden:true,key:true
										<#elseif (col.isList)><#else>,hidden:true
										</#if>
										<#assign paramsJsonObj=col.paramsJson?eval />
										<#assign options=paramsJsonObj.options />
										<#if (col.isList) && (('radio' == col.control) || ('select' == col.control))>
										,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												<#list options as option>
												<#if (option_index==0)>
												'${option.val}':'${option.label}'
												<#else>
												,'${option.val}':'${option.label}'
												</#if>
												</#list>
			                                }
				                        }
										<#elseif (col.isList) && ('checkbox' == col.control)>
										,formatter: function(value,row,index){
											if(value){
												var chkJson = {};
												<#list options as option>
												chkJson['${option.val}']='${option.label}';
												</#list>
												var valArr = value.split(',');
												for(var i = 0,len = valArr.length; i < len; i ++){
													valArr[i]=chkJson[valArr[i]];
												}
												
										    	return valArr.join(',');
											}else{ 
										    	return '';
										    }
										}
										</#if>
				                	 	}, </#list> {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[<#if (vars.flowKey?exists && vars.flowKey != "") || (vars.selStartFlow?exists && vars.selStartFlow != "")>{
										label:'启动',
										classes:'btn btn-primary fa fa-caret-square-o-right',
										action : 'javascript:${classVar}.startFlow("{id}");'
									},</#if>{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'${url}/edit.htm?${pkVar}={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'${url}/remove.htm?${pkVar}={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'${url}/get.htm?${pkVar}={id}'
									}]
								} ]
	
					});
		},
		</#if>
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
			me.formUrl.initSub('${baseurl}');
			</#if>
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse, $el);
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
			}else{
				$("[name^='m:']", $(_consts.FORM)).each(function(){
					var data = $(this);
	        		// 单选框特殊处理 
	            	if(data.is('input') && "radio" == data.attr("type")){
			        		var defaultVal = data.attr("defaultVal");
			        		var defaultValue = data.attr("defaultValue");
		            		if(defaultValue=="true"&&defaultVal=="true"){
		            			data.prop("checked", "checked");
		            		}
		        	}
		        });
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
			<#if model.variables.struType='tree'>
			if (msg.isSuccess()) {
				if(parent.${classVar})parent.${classVar}.reFresh();
				
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
					function(rtn) {
					if(rtn)
						window.location.reload(true);
					else
				    	if(parent.${classVar})parent.${classVar}.blank();
					});
		    } else{
		    	DialogUtil.error(msg.getMessage());
		    }
		    <#else>
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
					function(rtn) {
					if(rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx+'${url}/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
			</#if>
		}
	};
})();


