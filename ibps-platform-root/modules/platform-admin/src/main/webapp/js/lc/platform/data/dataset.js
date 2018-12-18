/**
 * 数据集
 * 
 *
 *<pre> 
 * liuyikuan
 *</pre>
 */
$(function() {
	dataset  = new Dataset();
	dataset.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#datasetGrid",// 列表对象
			PAGER : "#datasetPager",// 列表分页
			FORM : '#datasetForm',// 表单form
						
			TYPE_TREE : "#typeTree", //左分类树    liuyikuan 
			
	};
	/**
	 * 数据集 对象
	 * @returns {Dataset}
	 */
	Dataset = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Dataset.prototype = {
		consts:	_consts,
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
			if ($(this.consts.TYPE_TREE).length > 0)//分类树   liuyikuan
				this._initTypeTree();
		},
		_initTypeTree:function(){                   //初始化分类树
			var me = this;
			me.categoryKey ='DATASET_TYPE';				//typeid
		  	var typeTree =  new TypeTree( $(this.consts.TYPE_TREE),{
			  	categoryKey: me.categoryKey,
				onClick:function(event, treeId, treeNode){
					var typeId =treeNode.id;
					if(treeNode.isRoot == 1)typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.fa-search").click();
				},
				onRightClick:function(event, treeId, treeNode){
		  			if (!treeNode) 
		  				return false ;
		  		}
			}); 
		  	this._initLayout();
		},
		/**
		 * 初始化布局   liuyikuan
		 */
		_initLayout:function(){
			var layout =   $('body').layout({ applyDefaultStyles: true,
					onopen :function(){
						GridList.resizeGridSize();
					},
					onclose:function(){
						GridList.resizeGridSize();
					},
					onresize:function(){
						GridList.resizeGridSize();
					}
				});  
			layout.addPinBtn(".pinBtn", "west" );
		},
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			this._setDefCategory();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/data/dataset/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','名称','业务主键','类型','来源','是否树型','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				               }, {
				                 	   name:'name',
				                	   index: 'name_'
				              }, {
				                 	   name:'key',
				                	   index: 'key_'
				              },{
				                 	   name:'type',
				                	   index: 'type_',
				                	   formatter : 'dataFormat',
				                	   formatoptions : {
											value : [{
												name:"table",
												value:'物理表',
												css:'red'
											},{
												name:"view",
												value:'视图',
												css:'green'
											},{
												name:"sql",
												value:'自定义SQL',
												css:'green'
											}]
										}
				             } ,{
				                 	   name:'from',
				                	   index: 'from_'
				             }, {
				                 	   name:'isTree',
				                	   index: 'is_tree_',
				                	   formatter : 'dataFormat',
										formatoptions : {
											value : [{
												name:"N",
												value:'否',
												css:'red'
											},{
												name:"Y",
												value:'是',
												css:'green'
											}]
										}
				               } , {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/data/dataset/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/data/dataset/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/data/dataset/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			
			me.frm = frm;
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
					}
				});
				
				if(me._editor != undefined){
					$("#sql").val(me._editor.getValue());
					if($.isEmpty(me._editor.getValue())){
						DialogUtil.toastr("SQL语句不能为空！");
						return;
					}
				}
				
				if (frm.valid()){
					form.submit();
				}else{
					DialogUtil.toastr("请检查表单是否正确填写！");
					return;
				}
			});
			
			if($("#type").val() == 'sql'){
				$("#fromDiv").hide();
				$("#sqlDiv").show();
				me.initCodeMirror();
			}else{
				$("#fromDiv").show();
				$("#sqlDiv").hide();
			}
			
			if('Y' == $("[name='external']:checked").val()){
				$("#dsAliasDiv").show();
				
			}else{
				$("#dsAliasDiv").hide();
			}
			
			if('Y' == $("[name='isTree']:checked").val()){
				$("#refFieldDiv").show();
				me.initRef(false);
			}else{
				$("#refFieldDiv").hide();
			}
			
			/*------------------------处理SQL参数--------------------------*/
			var id = "param",
				params = [
			         {id:'1',parentId:'0',name:'系统参数',key:'currentUserId',type:'root'},
			         {id:'11',parentId:'1',name:'当前登录人ID',key:'currentUserId',type:'sys'},
			         {id:'21',parentId:'1',name:'当前登录人用户名',key:'currentUserName',type:'sys'},
			         {id:'31',parentId:'1',name:'当前登录人姓名',key:'currentFullName',type:'sys'},
			         {id:'41',parentId:'1',name:'当前登录人微信号',key:'currentWcAccount',type:'sys'},
			         {id:'51',parentId:'1',name:'当前登录人组织ID',key:'currentOrgId',type:'sys'},
			         {id:'61',parentId:'1',name:'当前登录人主岗位ID',key:'currentPositionId',type:'sys'},
			         {id:'71',parentId:'1',name:'当前日期',key:'curDate',type:'sys'},
			         {id:'81',parentId:'1',name:'当前日期时间',key:'curDateTime',type:'sys'}
			      ];
		
			var varTree = new BpmFormVar('varTree'+id, params)
				.setCallback({onClick:function(event, treeId, node){
					if(node.type == 'root'){
						return;
					}
					var data = "{"+node.key+"}";
					me._editor.replaceSelection(data);
					var cursor = me._editor.getCursor();
					me._editor.setCursor(cursor.line,cursor.ch);
					me._editor.focus();
					varTree.hideMenu();
					me.initSql();
				}})
				.makeCombTree(id)
				.initZtree();
			
			/*------------------------处理SQL校验--------------------------*/
			$(document).on('click', 'a.validate', function() {
				me.initSql();
				var __url 		= __ctx + '/platform/data/dataset/validate.htm',
					external 	= $("[name='external']:checked").val(),
					dsAlias 	= $("#dsAlias").val(),
					sql 		= $("#sql").val(),
					params 		= $("#params").val(),
					paramsJson 	= {external:external, dsAlias:dsAlias, sql:sql, params:params};
				
				if($.isEmpty(sql)){
					DialogUtil.warn('SQL语句为空！');
					return;
				}
				
				$.ajax({
					type: 'POST',
					data: paramsJson,
					url: __url,
					success: function(data){
						var msg = new com.lc.form.ResultMessage(data);
						if (msg.isSuccess()) {
							DialogUtil.toastr(msg.getMessage());
						}else{
							DialogUtil.error(msg.getMessage());
						}
					},
					error: function(){}
				});
			});
			
			/*--------------------------------------------------*/
			$("[name='external']",document).on("click",function(){
				var val = $(this).val();
				if('Y' == val){
					$("#dsAliasDiv").show();
				}else{
					$("#dsAliasDiv").hide();
				}
				me.initFrom('');
				me.initRef(false,'');
			});
			
			/*--------------------------------------------------*/
			me.initFrom();
			
			/*--------------------------------------------------*/
			$("#type",document).on("change",function(){
				if($(this).val() == 'sql'){
					$("#fromDiv").hide();
					$("#sqlDiv").show();
					me.initCodeMirror();
				}else{
					$("#fromDiv").show();
					$("#sqlDiv").hide();
				}
				me.initFrom('');
				me.initRef(false,'');
			});
			
			/*--------------------------------------------------*/
			$("#dsAlias",document).on("change",function(){
				me.initFrom('');
				me.initRef(false,'');
			});
			
			/*--------------------------------------------------*/
			$("[name='isTree']",document).on("click",function(){
				if('Y' == $(this).val()){
					$("#refFieldDiv").show();
				}else{
					$("#refFieldDiv").hide();
				}
				me.initRef(true, '');
			});
		},
		initParam:function(){
			var sql = $("#sql").val(),
				params = $.isEmpty($("#params").val())?'[]':$("#params").val(),
				reg = /\{(.*?)\}/gm,
				res = null,
				has = false,
				paramsJsonArr = JSON.parse(params);
			
			while ((res = reg.exec(sql)) != null) {
				// {key:res[1],type:'sys'}
				for(var i = 0, len = paramsJsonArr.length; i < len; i ++){
					if(paramsJsonArr[i].name == res[1]){
						has = true;
						break;
					}
				}
				
				if(!has){
					paramsJsonArr.push({name:res[1],source:'sys',value:''});
				}
				has = false;
			}
			
			$("#params").val(JSON.stringify(paramsJsonArr));
		},
		initSql:function(){
			var me = this,
				sql = me._editor.getValue();
			
			$("#sql").val(sql);
			me.initParam();
		},
		initFrom:function(_value){
			var me = this,
				$el = $("#from"),
				dsAlias = $("#dsAlias").val(),
				type = $("#type").val();
			
			$el.val('');
			
			if(type == 'sql'){
				//$el.select2('destroy');
				return;
			}else{
				$el.select2();
				$el.select2('destroy');
			}
			
			var options = $el.data()
				,$val = (undefined != _value)?_value:(options.value?options.value:'')
				,url = __ctx +"/platform/data/dataset/tableOrViewList.htm"
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split;
			
			var params = {
				placeholder:'请选择'
				,theme: "bootstrap"
				,language: "zh-CN"
				,multiple: multiple
				,allowClear: clear
				,separator: split
				,formatSelection : function (item) {return item.id;}  /*选择结果中的显示*/
				,formatResult : function (item) {return item.id;}  /*搜索列表中的显示*/
				,escapeMarkup : function (markup) {return markup;}
				,createSearchChoice : function(term, data) {
					/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
			        return {id: term, text: term};
			    },
				templateResult: function (data) {
				    if (data.id === '') { // adjust for custom placeholder values
				      return '';
				    }
				    return data.text+(data.comment?"【"+data.comment+"】":"");
				  }
			};
			
			if(url){
				params.ajax = {
				    url: url,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	var dataJson = {from: _params.term? _params.term:'', external:$("[name='external']:checked").val(),dsAlias:$("#dsAlias").val() ,type:$("#type").val()};
				    	return dataJson;
				    }
					,processResults: function (data) {
						return {
				          results: data
				        };
				     },
				     cache: true
				};
			}
			
			$el.select2(params);
			
			if(!$.isEmpty($val)){
				$el.append("<option selected value='"+$val+"'>"+$val+"</option>");
				me.frm.valid();
			}
			
			$el.on('select2:unselect', function (evt) {
				evt.stopPropagation();
				me.initRef(true,'');
				me.frm.valid();
			});
			
			$el.on('change', function (evt) {
				me.initRef(true,'');
				me.frm.valid();
			});
		},
		initRef:function(vald, _value){
			if(this._editor != undefined) this.initSql();
			var me 			= this,
				$el 		= $("#refField"),
				external 	= $("[name='external']:checked").val(),
				isTree 		= $("[name='isTree']:checked").val(),
				dsAlias 	= $("#dsAlias").val(),
				sql 		= $("#sql").val(),
				params 		= $("#params").val(),
				from 		= $("#from").val(),
				type 		= $("#type").val();
			
			$el.val('');
			
			if(isTree == 'N'){
				//$el.select2('destroy');
				return;
			}
			
			if(vald){
				if(type == 'sql' && $.isEmpty(sql)){
					DialogUtil.warn('SQL语句为空！');
					return;
				}else if(type != 'sql' && $.isEmpty(from)){
					DialogUtil.warn('表名或视图名为空！');
					return;
				}
			}
			
			var options = $el.data()
				,$val = (undefined != _value)?_value:(options.value?options.value:'')
				,url = __ctx +"/platform/data/dataset/columnList.htm"
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split;
			
			var params = {
				placeholder:'请选择'
				,theme: "bootstrap"
				,language: "zh-CN"
				,multiple: multiple
				,allowClear: clear
				,separator: split
				,formatSelection : function (item) {return (item != undefined && item.id != undefined)?item.id:"";}  /*选择结果中的显示*/
				,formatResult : function (item) {return (item != undefined && item.id != undefined)?item.id:"";}  /*搜索列表中的显示*/
				,escapeMarkup : function (markup) {return markup;}
				,createSearchChoice : function(term, data) {
					/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
			        return {id: term, text: term};
			    },
				templateResult: function (data) {
				    if (data == undefined || data.id == undefined || data.id === '') { 
				    	// adjust for custom placeholder values
				    	return '';
				    }
				    return data.text+(data.comment?"【"+data.comment+"】":"");
				}
			};
			
			if(url){
				params.ajax = {
				    url: url,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {columnName: (_params != undefined && _params.term != undefined) ? _params.term:'', 
				    			dsAlias : dsAlias,
				    			type : type, 
				    			external : external,
				    			sql : (me._editor != undefined) ? $("#sql").val(me._editor.getValue()) : '',
				    			params : params,
				    			from : from
				    		};
				    }
					,processResults: function (data) {
						return {
				          results: data
				        };
				     },
				     cache: true
				};
			}
			
			$el.select2(params);
			
			if(!$.isEmpty($val)){
				$el.append("<option selected value='"+$val+"'>"+$val+"</option>");
				me.frm.valid();
			}
			
			$el.on('select2:unselect', function (evt) {
				evt.stopPropagation();
				me.frm.valid();
			});
			
			$el.on('change', function (evt) {
				evt.stopPropagation();
				me.frm.valid();
			});
		},
		initCodeMirror:function(){
			var width = $("#sql").width();
			var height = $("#sql").height();
			if(!this._editor){
				this._editor = CodeMirror.fromTextArea(document.getElementById("sql"), {
					mode: "text/x-sql",
					tabMode: "indent",
					lineNumbers: true
				 });
				
				this._editor.setSize(width,height);
			}
			this._editor.setValue($("#sql").val());
		},
		

		/**
		 * 初始化顶部菜单
		 */
		initTreeToolbar:function(isExt){
			var me  = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.refreshTree(isExt);
				}else	if($(this).hasClass("fa-expand")){//展开
					me.boTree.expandAll(true);
				} else{//收缩
					me.boTree.expandAll(false);	
				}
			});
		},
		/**
		 * 刷新左树信息
		 */
		refreshTree:function(isExt){
			if(isExt){
				this.loadExternalTree();
			}else{
				this.loadTree();
			}
		},
		/**
		 * 左侧菜单的滚动
		 */
		initLeftScroll:function(){
	    	$(this.boTreeId).niceScroll({
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
	    	$(this.boTreeId).getNiceScroll().resize();
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-60);
			$(this.boTreeId).height( $(window).height()-155);
		},

		/**
		 * 设置分类  liuyikuan
		 */
		_setDefCategory : function(){
			var me = this;
			$(document).on('click', '#setCategory', function() {
				 var ids=$(me.consts.GRID).jqGrid('getGridParam','selarrrow');
					if (ids == null || ids.length == 0) {
						DialogUtil.toastr('还没有选择,请选择一项记录!');
						return;
					} 
				new DataSetCategoryDialog({callback:function(typeId,dialog){
					var params={defIds:ids.join(","),typeId:typeId};
					var url=__ctx+'/platform/data/dataset/setCategory.htm';
					$.post(url,params,function(responseText){
						var obj=new com.lc.form.ResultMessage(responseText);
						if(obj.isSuccess()){
							DialogUtil.msg('操作成功!');
							DialogUtil.closeAll();
							var url=location.href.getNewUrl();
							location.href=url;
						}
						else{
							DialogUtil.error("错误提示",obj.getMessage());
						}
					}); 
				}}).show();
			})
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
							window.location.href = __ctx+'/platform/data/dataset/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


