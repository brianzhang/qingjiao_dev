/**
 * 生成方案
 * 
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-06 08:39:34
 *</pre>
 */
$(function() {
	scheme  = new Scheme();
	scheme.init();
	
	formUrl = scheme.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#schemeGrid",// 列表对象
			PAGER : "#schemePager",// 列表分页
			TYPE_TREE : "#typeTree", //左分类树
			FORM : '#schemeForm'// 表单form
	};
	/**
	 * 生成方案 对象
	 * @returns {Scheme}
	 */
	Scheme = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Scheme.prototype = {
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
				this.table_data = [];
				this._initForm();
				this.initTableSelect2();
				this.initFormSelect2($("#tableName").val(),false);
				//this.initDoTypeSelect2();
				this._initSelectData();
				this.initInput();
			}
			
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		
		_initSelectData : function(){
			var me = this;
			
			$("#typeName").on("blur", function(e){
				var params = {typeId : $("#typeId").val()};
				var dDivId = "#dDiv"
					, tDivId = "#tDiv"
					, templateId = "chkTemplate"
					, url = __ctx+'/platform/codegen/doType/doTypeListJson.htm';
				
				params.subType='doType';
				$.get(url, params,function(data){
					if($.isEmpty(data)){
						return;
					}
					
					$(dDivId).html('');
					for(var i = 0, len = data.length; i < len; i ++){
						var html = template(templateId, data[i]);
						$(dDivId).append(html);
					}
				});
				
				params.subType='template';
				$.get(url, params,function(data){
					if($.isEmpty(data)){
						return;
					}
					
					$(tDivId).html('');
					for(var i = 0, len = data.length; i < len; i ++){
						var html = template(templateId, data[i]);
						$(tDivId).append(html);
					}
				});
			});
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
						url :  __ctx+'/platform/codegen/scheme/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','方案名称','表名','包路径','菜单url','生成类型','是否生成子表','代码作者','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'tableName',
				                	   index: 'table_name_'
				                	 					                	 	}, {
				                 	   name:'packageUrl',
				                	   index: 'package_url_'
				                	 					                	 	}, {
				                 	   name:'menuUrl',
				                	   index: 'menu_url_'
				                	 					                	 	}, {
				                 	   name:'doType',
				                	   index: 'do_type_'
				                	 					                	 	}, {
				                 	   name:'genSub',
				                	   index: 'gen_sub_',
			                		   formatter: 'select',
			                           formatoptions: {
			                                value: {
			                                    'Y': '是',
			                                    'N': '否'
			                                }
			                            }
				                	 					                	 	}, {
				                 	   name:'developer',
				                	   index: 'developer_'
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	   formatter: 'timestamp',
				                	   formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 	},  {
									name : '__manage',
									width : 46,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'添加菜单资源',
										classes:'btn btn-primary fa fa-telegram',
										action:'javascript:scheme.add2Resource("{menuUrl}")'
									},{
										label:'生成到工作目录',
										classes:'btn btn-primary fa fa-free-code-camp',
										action:'javascript:scheme.genWorkspace("{id}")'
									},{
										label:'下载',
										classes:'btn btn-primary fa fa-download',
										action:'javascript:scheme.gen("{id}")'
									},{
										label:'发布',
										classes:'btn btn-primary fa fa-outdent',
										action:'javascript:scheme.deploy("{id}")'
									},{
										label:'复制',
										classes:'btn btn-primary fa fa-copy',
										action:'javascript:scheme.copy("{id}")'
									},{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/scheme/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/scheme/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/scheme/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 添加到菜单资源
		 * @param id
		 */
		add2Resource:function(menuUrl){
			var url =  __ctx+ "/platform/auth/resources/addResource.htm?menuUrl="+menuUrl;
			DialogUtil.dialog({
				params:{},
				callback:function(rtn){
				},
				maxmin:false,
				title:false,
				area : [ '100%', '100%' ],
				content :url
			});
		},
		/**
		 * 生成到工作目录
		 * 
		 * @param id
		 */
		genWorkspace:function(id){
			DialogUtil.confirm('是否生成代码到工作目录',
				function(rtn) {
					if(rtn){
						var __url = __ctx+'/platform/codegen/scheme/genWorkspace.htm?id='+id;
						$.ajax({
							type: 'POST',
							url: __url,
							success: function(responseText) {
								var msg = new com.lc.form.ResultMessage(responseText);
								if (msg.isSuccess()) {
									DialogUtil.msg(msg.getMessage());
								} else {
									DialogUtil.error(msg.getMessage());
								}
							},
							error: function(){}
						});
					}
				}
			);
		},
		/**
		 * 生成代码并下载
		 * 
		 * @param id
		 */
		gen:function(id){
			DialogUtil.confirm('是否生成代码并下载',
				function(rtn) {
					var __url = __ctx+'/platform/codegen/scheme/gen.htm?id='+id;
					$.ajax({
						type: 'POST',
						url: __url,
						success: function(responseText) {
							var msg = new com.lc.form.ResultMessage(responseText);
							if (msg.isSuccess()) {
								DialogUtil.msg(msg.getMessage());
								$("body").append("<iframe id='downloadCode' style='display:none;' src=''></iframe>");
								$("#downloadCode").prop("src", 
										__ctx + "/platform/file/attachment/downloadByPath.htm?filePath="
										+msg.getVar("filePath") + "&fileName=" + msg.getVar("fileName") + "&delete=true");
							} else {
								DialogUtil.error(msg.getMessage());
							}
						},
						error: function(){}
					});
				}
			);
		},
		/**
		 * 发布到容器
		 * 
		 * @param id
		 */
		deploy:function(id){
			DialogUtil.confirm('是否发布代码到容器',
				function(rtn) {
					if(rtn){
						var ld = DialogUtil.load("deploying...");
						var __url = __ctx+'/platform/codegen/scheme/deploy.htm?id='+id;
						$.ajax({
							type: 'POST',
							url: __url,
							success: function(responseText) {
								DialogUtil.close(ld);
								var msg = new com.lc.form.ResultMessage(responseText);
								if (msg.isSuccess()) {
									DialogUtil.msg(msg.getMessage());
								} else {
									DialogUtil.error(msg.getMessage());
								}
							},
							error: function(){
								DialogUtil.close(ld);
							}
						});
					}
				}
			);
		},
		/**
		 * 复制生成方案
		 * 
		 * @param id
		 */
		copy:function(id){
			DialogUtil.confirm('是否复制生成方案',
				function(rtn) {
					if(!rtn)return;
					
					var __url = __ctx+'/platform/codegen/scheme/copy.htm?id='+id;
					$.ajax({
						type: 'POST',
						url: __url,
						success: function(responseText) {
							var msg = new com.lc.form.ResultMessage(responseText);
							if (msg.isSuccess()) {
								window.location.reload(true);
								DialogUtil.msg(msg.getMessage());
							} else {
								DialogUtil.error(msg.getMessage());
							}
						},
						error: function(){}
					});
				}
			);
		},
		/**
		 * 绑定文本框(系统、模块、应用)输入事件
		 * 
		 */
		initInput:function(){
			$("#sys").on("input", function(){
				// 改包路径
				var $el = $("#packageUrl");
				var value = $(this).val();
				var vArr = $el.val().split(".");
				vArr[3] = value;
				$el.val(vArr.join("."));
			});
			
			$("#platform").on("input", function(){
				// 改菜单路径
				var $el = $("#menuUrl");
				var value = $(this).val();
				var vArr = $el.val().split("/");
				vArr[1] = value;
				$el.val(vArr.join("/"));
			});
			
			$("#module").on("input", function(){
				// 改菜单路径
				var $el = $("#menuUrl");
				var value = $(this).val();
				var vArr = $el.val().split("/");
				vArr[2] = value;
				$el.val(vArr.join("/"));
			});
		},
		/**
		 * 初始化表名下拉框
		 */
		initTableSelect2 : function(){
			var me = this;
			var $el = $('#tableName')
				,options = $el.data()
				,$val = options.value
				,$classVar = options.classvar
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
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
				    	var dataJson = {tableName: _params.term};
				    	return dataJson;
				    }
					,processResults: function (data) {
						me.table_data = data;
						return {
				          results: data
				        };
				     },
				     cache: true
				};
			}
			
			$el.select2(params);
			
			$el.on('select2:unselect', function (evt) {
				me.initFormSelect2('',true);
				
				var $el = $("#menuUrl");
				var value = $(this).val();
				var vArr = $el.val().split("/");
				vArr = vArr.slice(0, 3);
				$el.val(vArr.join("/"));
				
				me.frm.valid();
			});
			
			$el.on('change', function (evt, params) {
				var data = params || $el.select2("data")[0];
				if(undefined == data || null == data){
					return;
				}
				
				data.classVar = data.id != $val? data.classVar : $classVar;
				var $elment = data.element;
				
				for(var i = 0, len = me.table_data.length; i < len; i ++){
					if(data.id == me.table_data[i].id){
						data.struType = me.table_data[i].struType;
					}
				}
				
				$(this).append($elment);
				var mval = $("#menuUrl").val();
				var vArr = mval.split("/");
				if(vArr.length > 3){
					vArr[3] = data.classVar;
					if(data.struType&&data.struType=='tree'){
						vArr[4] = 'tree.htm';
					}else{
						vArr[4] = 'list.htm';
					}
					$("#menuUrl").val(vArr.join("/"));
				}else{
					if(data.struType&&data.struType=='tree'){
						$("#menuUrl").val(mval + "/" + data.classVar + "/tree.htm");
					}else{
						$("#menuUrl").val(mval + "/" + data.classVar + "/list.htm");
					}
				}
				me.initFormSelect2(data.id,true);
				
				me.frm.valid();
			});
			
			var struType = $("#struType").val();
			var cdata = {'id':$val,'text':$val,'classVar':$classVar, selected : true, 'struType' : struType
					, element : $("<option value='"+$val+"'>"+$val+"</option>")[0]};
			me.table_data = [cdata];
			$el.trigger("change", cdata);
			me.frm.valid();
		},
		/**
		 * 初始化表单下拉框
		 * @param $tableName
		 * @param $clear
		 */
		initFormSelect2 : function($tableName, $clear){
			var me = this;
			var $el = $('#formIdentity')
				,options = $el.data()
				,$val = $clear?'':options.value
				,$label = $clear?'':options.label
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
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
				    	var dataJson = {tableName: $tableName, formName: _params.term};
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
			
			if($.isEmpty($val)){
				$el.val(null).trigger("change",{});
				me.frm.valid();
			}else{
				$el.append("<option selected value='"+$val+"'>"+$label+"</option>");
				me.frm.valid();
			}
			
			$el.on('change', function (evt) {
				me.frm.valid();
			});
		},
		/**
		 * 初始化生成类型下拉框
		 * @param $tableName
		 */
		initDoTypeSelect2 : function($tableName){
			var me = this;
			var $el = $('#doType')
				,options = $el.data()
				,$val = options.value
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
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
				    	var dataJson = {key: _params.term, keys: $el.val()};
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
				var keyArr = $val.split(split);
				$.each(keyArr,function(index){
					$el.append('<option selected value="' + keyArr[index]+ '">'+keyArr[index]+'</option>');
				});
				me.frm.valid();
			}
			
			$el.on('change', function (evt) {
				me.frm.valid();
			});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.frm=frm;
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			me.formUrl.initSub('/platform/codegen/scheme');
			
			var menuUrl = $("#menuUrl").val();
			var index = menuUrl.indexOf("tree");
			if(index > -1){
				$("#struType").val('tree');
			}
			
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var doTypes = $("input:checked", $("#doTypeDiv"));
                if (doTypes && doTypes.length > 0) {
                	$(form).attr('action', "save.htm");
                	var $el = $(this);
    				$el.button('loading');
                    me.formUrl.submit(me._showResponse, $el);
                }else{
                	DialogUtil.warn("请选择代码生成类型！");
                }
			});
			
			$(document).on('click', 'a.fa-free-code-camp', function() {
				var doTypes = $("input:checked", $("#doTypeDiv"));
                if (doTypes && doTypes.length > 0) {
                	$(form).attr('action', "saveGenWorkspace.htm");
                	var $el = $(this);
    				$el.button('loading');
                    me.formUrl.submit(me._showResponse, $el);
                }else{
                	DialogUtil.warn("请选择代码生成类型！");
                }
			});
			
			$(document).on('click', 'a.fa-download', function() {
				var doTypes = $("input:checked", $("#doTypeDiv"));
                if (doTypes && doTypes.length > 0) {
                	$(form).attr('action', "saveGen.htm");
                	var $el = $(this);
    				$el.button('loading');
                    me.formUrl.submit(me._showDownload, $el);
                }else{
                	DialogUtil.warn("请选择代码生成类型！");
                }
			});
		},
		_showDownload : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				$("body").append("<iframe id='downloadCode' style='display:none;' src=''></iframe>");
				$("#downloadCode").prop("src", 
						__ctx + "/platform/file/attachment/downloadByPath.htm?filePath="
						+msg.getVar("filePath") + "&fileName=" + msg.getVar("fileName") + "&delete=true");
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
					function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/codegen/scheme/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/codegen/scheme/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


