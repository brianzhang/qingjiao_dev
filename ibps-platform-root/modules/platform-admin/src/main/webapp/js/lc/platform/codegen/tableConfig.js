/**
 * 表配置
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-02 20:17:51
 *</pre>
 */
$(function() {
	tableConfig  = new TableConfig();
	tableConfig.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#tableConfigGrid",// 列表对象
			PAGER : "#tableConfigPager",// 列表分页
			TYPE_TREE : "#typeTree", //左分类树
			FORM : '#tableConfigForm'// 表单form
	};
	/**
	 * 表配置 对象
	 * @returns {TableConfig}
	 */
	TableConfig = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	TableConfig.prototype = {
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
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initEvent();
				this.initChk();
			}
			
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		_initEvent : function(){
			var me = this;
			
			me.initTableSelect2();
			me.initPTableSelect2();
			me._initFkRelation();
			me._initStruType();
			
			$('#tableSourceName', document).on('blur',function(event){
				me.initTableSelect2();
				me.initPTableSelect2();
				me._initFkRelation();
				me.removeSubAll('fieldConfigPoList');
			});
			
			$('#dsAlias', document).on('change',function(event){
				me.initTableSelect2();
				me.initPTableSelect2();
				me._initFkRelation();
				me.removeSubAll('fieldConfigPoList');
			});
			
			$('#boName', document).on('blur',function(event){
				me.initTableSelect2();
				me.initPTableSelect2();
				me._initFkRelation();
				me.removeSubAll('fieldConfigPoList');
			});
			$('input[name="struType"]', document).on('click',function(event){
				me._initStruType();
			});
		},
		_initFkRelation:function(){
			var p = $("#parentTableName").val();
			if($.isEmpty(p)){
				$("#subTblDiv").addClass("hidden");
			}else{
				$("#subTblDiv").removeClass("hidden");
			}
			this.initForeignKeySelect2();
			this.initFromKeySelect2();
		},
		_initStruType:function(){
			var tableName=$("#tableName").val();
			var struType=$("input:checked", $("#struType")).val();
			if($.isEmpty(tableName)||struType=='list'){
				$("#idKeyDiv").addClass("hidden");
				$("#pIdKeyDiv").addClass("hidden");
				$("#keyDiv").addClass("hidden");
			}else{
				$("#idKeyDiv").removeClass("hidden");
				$("#pIdKeyDiv").removeClass("hidden");
				$("#keyDiv").removeClass("hidden");
			}
			this.initTreeIDKeySelect2();
			this.initTreePIDKeySelect2();
			this.initTreeKeySelect2();
			
		},
		_initRelation:function(){
			$("#relation").val('');
		},
		_initTypeTree:function(){
			var me = this;
			me.categoryKey ='TEMPLATE_TYPE';
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
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({ applyDefaultStyles: true,
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
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/codegen/tableConfig/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','表名','表注释','类名','主表表名','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'tableName',
				                	   index: 'table_name_'
				                	 					                	 	}, {
				                 	   name:'tableComment',
				                	   index: 'table_comment_'
				                	 					                	 	}, {
				                 	   name:'className',
				                	   index: 'class_name_'
				                	 					                	 	}, {
				                 	   name:'parentTableName',
				                	   index: 'parent_table_name_'
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	 	formatter: 'timestamp',
				                	 	formatoptions:"yyyy-MM-dd HH:mm:ss"
				                	 	},  {
									name : '__manage',
									width : 40,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'布局',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript:tableConfig.editDesignForm("{id}");'
									},{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/tableConfig/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/tableConfig/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/tableConfig/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		editDesignForm:function(id){
			var __url = __ctx + "/platform/codegen/tableConfig/design.htm?id="+id;
			$.ajax({
				type: 'POST',
				url: __url,
				success: function(data){
					if('false' === data.result){
						DialogUtil.alert(data.msg);
						return;
					}
					
					var url =  __ctx+ "/platform/form/formDef/design.htm?mode="+data.mode+"&code="+data.code;
					DialogUtil.dialog({
						params:{},
						callback:function(rtn){
							/*try {
								window.location.reload(true);
							} catch (e) {//出错不影响保存
							}*/
						},
						maxmin:false,
						title:false,
						area : [ '100%', '100%' ],
						content :url
					});
				},
				error: function(){}
			});
		},
		initChk : function(){
			var $table = $("table[name='fieldConfigPoList']");
			var $thead = $table.find("thead");
			var $tbody = $table.find("tbody");
			$(':checkbox', $thead).on('click',function(event){
				var $chkAll = $(this);
				var isChecked = $chkAll.is(':checked');
				var $chks = $(':checkbox[name="'+$chkAll.attr("name")+'"]', $tbody);
				$chks.each(function(){
					$(this).prop("checked", isChecked);
				});
			});
		},
		initTableSelect2 : function(){
			var me = this
				,$el = $("#tableName")
				,tableSource = $("#tableSource").val()
				,boId = $("#boId").val()
				,dsAlias = $("#dsAlias").val()
				,options = $el.data()
				,$val = options.value
				,$comment = options.comment
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
			$el.val('');
			
			if('bo' === tableSource){
				$("#boDiv").removeClass("hidden");
				$("#dsAliasDiv").addClass("hidden");
			}else{
				$("#boDiv").addClass("hidden");
				$("#dsAliasDiv").removeClass("hidden");
				$("#boId").val('');
				$("#boName").val('');
			}
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 0,
				    data: function (_params) {
				    	return {tableName: _params.term, tableSource:tableSource, boId:boId, dsAlias:dsAlias};
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

				me.initPTableSelect2();
				me._initFkRelation();
				me._initStruType();
				me.removeSubAll('fieldConfigPoList');
				$("#className").val('');
				me.frm.valid();
			});
			
			$el.on('change', function (evt, params) {
				var sdata = params || $el.select2("data")[0];
				if(sdata.initVal){
					return;
				}
				var $elment = sdata.element;
				$(this).append($elment);
				$("#tableComment").val(sdata.id != $val? sdata.comment : $comment);
				var __url = __ctx + "/platform/codegen/tableConfig/fieldList.htm?tableName="+sdata.id+"&boId="+boId+"&dsAlias="+dsAlias;
				$.ajax({
					type: 'POST',
					url: __url,
					success: function(data){
						me.removeSubAll('fieldConfigPoList');
						for(var i = 0,size = data.length; i < size; i ++){
							data[i].prfix="$";
							me.addSub('fieldConfigPoList', data[i]);
						}
						me.initPTableSelect2();
						me.initForeignKeySelect2(sdata.id);
						me._initRelation();
						me.frm.valid();
					},
					error: function(){
						
					}
				});
				
				me.frm.valid();
			});
		},
		initPTableSelect2 : function(){
			var me = this
				,$el = $("#parentTableName")
				,tableSource = $("#tableSource").val()
				,boId = $("#boId").val()
				,dsAlias = $("#dsAlias").val()
				,options = $el.data()
				,$val = options.value
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
			$el.val('');
			
			me._initFkRelation();
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {tableName: _params.term, tableSource: tableSource, boId : boId, dsAlias:dsAlias};
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
				me._initFkRelation();
				me._initRelation();
			});
			
			$el.on('change', function (evt) {
				if(!$.isEmpty($(evt.currentTarget).val())){
					$("#subTblDiv").removeClass("hidden");
				}else{
					$("#subTblDiv").addClass("hidden");
				}
				
				me.initForeignKeySelect2($("#tableName").val());
				me.initFromKeySelect2($("#parentTableName").val());
				me.frm.valid();
			});
		},
		initFromKeySelect2 : function($parentTableName){
			var me = this
				,$el = $("#fromKey")
				,boId = $("#boId").val()
				,ptblName = $("#parentTableName").val()
				,dsAlias = $("#dsAlias").val()
				,options = $el.data()
				,$val = options.value
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
			$el.val('');
			me.frm.valid();
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {tableName:$parentTableName||ptblName,columnName:_params.term, boId : boId, dsAlias:dsAlias};
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
				me.frm.valid();
			});
		},
		initTreeKeySelect2:function(tableName){
			var me = this
			,$el = $("#key")
			,boId = $("#boId").val()
			,tblName = $("#tableName").val()
			,dsAlias = $("#dsAlias").val()
			,options = $el.data()
			,$val = options.value
			,ajax = options.ajax
			,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
			,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
			,split = $.isEmpty(options.split)?',':options.split
			;
			$el.val('');
			me.frm.valid();
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {tableName:tblName,columnName:_params.term, boId : boId, dsAlias:dsAlias};
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
				me.frm.valid();
			});
		},
		initTreePIDKeySelect2:function(tableName){
			var me = this
			,$el = $("#pidKey")
			,boId = $("#boId").val()
			,tblName = $("#tableName").val()
			,dsAlias = $("#dsAlias").val()
			,options = $el.data()
			,$val = options.value
			,ajax = options.ajax
			,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
			,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
			,split = $.isEmpty(options.split)?',':options.split
			;
			$el.val('');
			me.frm.valid();
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {tableName:tblName,columnName:_params.term, boId : boId, dsAlias:dsAlias};
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
				me.frm.valid();
			});
		},
		initTreeIDKeySelect2:function(tableName){
			var me = this
			,$el = $("#idKey")
			,boId = $("#boId").val()
			,tblName = $("#tableName").val()
			,dsAlias = $("#dsAlias").val()
			,options = $el.data()
			,$val = options.value
			,ajax = options.ajax
			,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
			,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
			,split = $.isEmpty(options.split)?',':options.split
			;
			$el.val('');
			me.frm.valid();
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {tableName:tblName,columnName:_params.term, boId : boId, dsAlias:dsAlias};
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
				me.frm.valid();
			});
		},
		initForeignKeySelect2 : function($tableName){
			var me = this
				,$el = $("#foreignKey")
				,boId = $("#boId").val()
				,tblName = $("#tableName").val()
				,dsAlias = $("#dsAlias").val()
				,options = $el.data()
				,$val = options.value
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
			$el.val('');
			me.frm.valid();
			
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
			    }
			};
			
			if(ajax){
				params.ajax = {
				    url: ajax,
				    dataType: 'json',
				    delay: 250,
				    data: function (_params) {
				    	return {tableName:$tableName||tblName,columnName:_params.term, boId : boId, dsAlias:dsAlias};
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
				me.frm.valid();
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
				// 重写表单提交事件
                action = frm[0].action;
                var newForm = $("<form></form>");
                $(newForm).attr('action', action);
                $(newForm).attr('method', 'post');
                var mainJson = {};
                
				// 主表数据提交
                var mainDiv = $(form).find("div:first");
                $("input,select,textarea", mainDiv).each(function(){
                	var name = $(this).attr("name");
                	if($(this).attr('type')=='radio'){
                		if($(this).is(":checked")){
                			var value = $(this).val();
                        	mainJson[name] = value;
                		}
                	}else{
                    	var value = $(this).val();
                    	mainJson[name] = value;
                	}
                });
				// 子表数据提交
				var fieldConfigPoList = [];
				var fieldConfigTable = $("table[name='fieldConfigPoList']");
				var trList = $(fieldConfigTable).find("tbody").find("tr");
				$(trList).each(function(){
					var fieldConfigPo = {};
					$(":hidden", $(this)).each(function(){
	                	var name = $(this).attr("name");
	                	var value = $(this).val();
	                	fieldConfigPo[name] = value;
	                });
	                $(":checkbox", $(this)).each(function(){
	                	var name = $(this).attr("name");
	                	var value = $(this).is(':checked')?'Y':'N';
	                	fieldConfigPo[name] = value;
	                });
	                $("input[type='text']", $(this)).each(function(){
	                	var name = $(this).attr("name");
	                	var value = $(this).val();
	                	fieldConfigPo[name] = value;
	                });
					
					fieldConfigPoList.push(fieldConfigPo);
				});
				mainJson["fieldConfigPoList"] = fieldConfigPoList;
				
				if(me.validClassName(mainJson.className)){
					DialogUtil.warn("类名规则不合法,包含字母数字并以大写字母开头！");
					return;
				}

				var mainStr = JSON2.stringify(mainJson);
				$('textarea[name="json"]', form).remove();
                var mainInput = "<textarea style='display:none;'  name='json'>" + mainStr + "</textarea>";
				$(newForm).append(mainInput);
				$(newForm).appendTo("body");
                $(newForm).hide();
                
                var $el = $(this);
				$el.button('loading');
                
				newForm.ajaxForm({
                    success: function(rText){
                    	$el.button('reset');
                    	me._showResponse(rText);
                    },error:function(){
                    	$el.button('reset');
                    }
                });
                if (frm.valid()) {
                    newForm.submit();
                }else{
                	$el.button('reset');
                }
			});
		},
		
		validClassName : function(className){
			if(containsSpecial(className)){
				return true;
			}
			
			var Regex = /^[A-Z]{1}([a-zA-Z0-9])*$/;
			
			return !Regex.test(className);
		},
		
		/**
		 * 删除子表数据
		 */
		addSub : function(tableName, data) {
			var me = this;
			var table = $("table[name='"+tableName+"']");
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)+1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
			
			// 添加一行
			data.index = subSize;
			var templateId = tableName+"TrTemplate";
			var html = template(templateId, data);
			$(table).find("tbody").append(html);
			
			var tableSource = $("#tableSource").val();
			if('bo' === tableSource){
				$("[name=propName]").attr("readonly", true);
			}
		},
		/**
		 * 删除子表选中数据
		 */
		removeSubAll : function(tableName) {
			var me = this;
			// 删除一行
			var table = $("table[name='"+tableName+"']");
			$(table).find("tbody").html("");
			
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val("0");
			$(table).find("tfoot > tr > td").html("共0条");
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
						window.location.href = __ctx+'/platform/codegen/tableConfig/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


