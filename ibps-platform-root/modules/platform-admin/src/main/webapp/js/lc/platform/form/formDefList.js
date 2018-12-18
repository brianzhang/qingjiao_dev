/**
 * 表单列表

 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-04-25 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefList  = new FormDefList();
	formDefList.init();

	
});

(function() {
	//定义常量
	var 	_consts = {
			TYPE_TREE : '#typeTree'// 树的ID
	};
	/**
	 * 表单列表 对象
	 * @returns {FormDefList}
	 */
	FormDefList = function() {
		
	};

	/**
	 * 方法
	 */
	FormDefList.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			//初始化新建
			this.initCreateForm();
			this.hasInitList = false;
			this.loadFormList();
			this._initTypeTree();
			this.handlerSearch();
			this.handleSearchKeyPress();

		},
		/**
		 * 初始化类型树
		 */
		_initTypeTree : function() {
			var typeTree = new TypeTree($(this.consts.TYPE_TREE), {
				categoryKey : 'FORM_TYPE',
				onClick : function(event, treeId, treeNode) {
					var typeId = treeNode.id;
					if (treeNode.isRoot == 1)
						typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.search").click();
				},
				onRightClick : function(event, treeId, treeNode) {
					
				}
			});
		},
	
		handleSearchKeyPress:function(){
			var $this = this;
			$(".form-search").keydown(function(e) {
				if (e.keyCode == 13) {// 回车
					e.preventDefault();
					$this.search($(".form-search a.btn.search"));
				}
			});
			
		},
		handlerSearch : function() {
			var $this = this;
			$(document).on("click", ".form-search a.btn.search", function(){
				$this.search(this);
			});
			
			//导入
			$('a.fa-import').click(function(){
				DialogUtil.dialog({
					title:'导入表单',
					area: ['30%', '40%'],
					content:__ctx + '/platform/form/formDef/import.htm',
					btn:[{
		            	label: '导入',
		            	iconCls:'btn btn-primary fa fa-import',
		                action: function(dialog,index) {
		              	  	DialogUtil.getChildFrameWindow(index).upload(function(rtn){
		              	  			if(rtn){
		              	  				$this.loadFormList();
		              	  			}
		              	  	});
		                }
		            },{
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
				});
			});	
			
			//导出
			$('a.fa-export').click(function(){
				 var checked  = $(".checks.checked",$("#formList"));
				 if(checked.length <= 0){
					 DialogUtil.msg("请选择导出的表单!");
					 return;
				 }
				 var ids = [];
				 checked.each(function(){
					var option = $(this).closest(".dashboard-item");
					  ids.push(option.data("id"));
				 });
			
		      	  	var frm=new com.lc.form.Form();
					frm.creatForm("frmExport", "exportForm.htm");
					frm.addFormEl("ids", ids.join(","));
					frm.submit();
			});
			
		},
		search:function(obj){
			var searchForm = $(obj).closest(".form-search");
			if (searchForm.length == 0)
				return;
			var data = this._serializeObject(searchForm);
			this.loadFormList(data);
		},
		_serializeObject : function(form) {
			var o = {}, a = $(form).serializeArray();
			$.each(a, function() {
				var v = this.value || '';
				if (o[this.name]) {
					o[this.name] = o[this.name] +","+ v;
				} else {
					o[this.name] =v;
				}
			});
			return o;
		},
		
		loadFormList:function(params){
			var _this = this;
			if(!params){
				params ={};
			}
			params.page =params.page||1; 
			params.rows =params.rows||20; 
			$.ajax({
		        url:  __ctx+ "/platform/form/formDef/listJson.htm",
		        data:params,
		        type:'POST',
		        success: function(data) {
		    		var html = template('formTemp', {
		    			list:data.rows
		    		});
		    		$("#formList").html(html);
		            laypage({
		                cont: 'formPage', //容器。
		                pages: data.total, //通过后台拿到的总页数
		                records: data.records, //记录数
		                rows:params.rows,
		                curr: 	params.page, //当前页
		                skip: true, //是否开启跳页
		                jump: function(obj, first){ //触发分页后的回调
		                    if(!first ){ //点击跳页触发函数自身，并传递当前页：obj.curr
		                    	params.page = obj.curr;
		                		params.rows =obj.rows; 
		                  	  _this.loadFormList(params);
		                    }
		                }
		            });	

		    		_this.bindClick();

		    		_this.bindSettingsOptions(_this);
		    		if(!_this.hasInitList){
		    			_this.hasInitList = true;
		    			$('.dashboard-header').stickUp();
		    		}
		    	
		        }
		      });
			
	
		},
		bindClick:function(){
			var _this = this;
			$(document).off( "click", ".dashboard-item[data-id]" ).on("click", ".dashboard-item[data-id]", function(e) {
				_this.editDesignForm({},$(this).data("id"));
			});
			$(document).off( "click", ".settings" ).on("click", ".settings", function(e) {
				e.preventDefault();
                e.stopPropagation();
			});
			$(document).off( "click", ".checks" ).on("click", ".checks", function(e) {
				e.preventDefault();
                e.stopPropagation();
                if(  $(this).hasClass("checked")){
                    $(this).removeClass("checked");
                }else{
                	$(this).addClass("checked");
                }
			});
			this.bindSettingsTip();
		},
		bindSettingsTip:function(){
			$('.settings').webuiPopover('destroy').webuiPopover({content:function(e){
			 	var el = e.$element, it =  el.closest(".dashboard-item");
              	 return  template('dashboard_form_settings_template', it.data());
			},padding:0,placement:'auto'});
		},
		bindSettingsOptions:function(_this){
			//删除表单
			$(document).off( "click", ".delete-form" ).on("click", ".delete-form", function(e) {
				e.preventDefault(); e.stopPropagation();
			 	 var el = $(this), option =  el.closest(".dashboard-settings-options"),
			 	 	url =  __ctx+"/platform/form/formDef/remove.htm?id="+option.data("id");
			 	 
			 	DialogUtil.confirm("确定删除吗？",function(r){
			 		if(!r)
			 			return;
			 		$.post(url, function(responseText){
					    var resultMessage = new com.lc.form.ResultMessage(responseText);
					    if (resultMessage.isSuccess()) {
					    	DialogUtil.toastr(resultMessage.getMessage(),true);
					    	$('.form-search a.btn.search').click();
					    	$('.settings').webuiPopover('hide');
					    } else {
					    	DialogUtil.toastr( '删除失败！'+resultMessage.getMessage(),true);
					    }
					});
			 	});
			 
			});
			//预览
			$(document).off( "click", ".preview-form" ).on("click", ".preview-form", function(e) {
				e.preventDefault(); e.stopPropagation();
				var el = $(this), option =  el.closest(".dashboard-settings-options"),
				url =  __ctx+"/platform/form/formDef/preview.htm?id="+option.data("id");
			    DialogUtil.dialog({
			    	content:url,
			    	area: ['100%', '100%'],
					maxmin:false,
					title:false
			    });
		    	$('.settings').webuiPopover('hide');
			});
			$(document).off( "click", ".edit-form" ).on("click", ".edit-form", function(e) {
				e.preventDefault(); e.stopPropagation();
				var el = $(this), option =  el.closest(".dashboard-settings-options");
				_this.editDesignForm({},option.data("id"));
				$('.settings').webuiPopover('hide');
			});
			$(document).off( "click", ".copy-form" ).on("click", ".copy-form", function(e) {
				e.preventDefault(); e.stopPropagation();
				var el = $(this), option =  el.closest(".dashboard-settings-options");
				_this.copyForm(option.data("id"));
				$('.settings').webuiPopover('hide');
			});
			
			
			//	表单权限
			$(document).off( "click", ".form-rights" ).on("click", ".form-rights", function(e) {
				e.preventDefault(); e.stopPropagation();
				var el = $(this), option =  el.closest(".dashboard-settings-options");
				new FormRightsDialog({
					formKey : option.data("key")
				}).show();
				
				$('.settings').webuiPopover('hide');
			});
			
			//打印模版
			$(document).off( "click", ".print-template" ).on("click", ".print-template", function(e) {
				e.preventDefault(); e.stopPropagation();
				var el = $(this), option =  el.closest(".dashboard-settings-options");
				new FormPrintTemplateListDialog({
					formKey : option.data("key")
				}).show();
				
				$('.settings').webuiPopover('hide');
			});
			
		},
		initCreateForm:function(){
			var me = this;
			
			$(document).on("mouseleave", ".create-new.dashboard-item", function() {
			    return $(".dashboard-create-new-options").stop(true, false).fadeOut(200, function() {
			    	$(".plus-icon").stop(true, false).fadeIn(100);
			        return  $(".dashboard-create-new-options > .create-new-link").removeClass("ibps-link-background-inverse");
			    }
			    )
			});
			$(document).on("mousemove", ".create-new.dashboard-item", function() {
				$(".plus-icon").hide();
				$(".dashboard-create-new-options").show().removeClass("ibps-hide");
			    return $(".dashboard-create-new-options:visible > .create-new-link").addClass("ibps-link-background-inverse")
			});
			//创建新表单
			$(document).on("click",".create-new-link",function() {
				me.create();
			});
		},
		create:function(params){
			var me = this;
			DialogUtil.dialog({
				title : '新建表单',
				content : __ctx
						+ "/platform/form/formDef/create.htm",
				params:params,
				area : [ '70%', '80%' ],
				btn : [{
							label : '下一步',
							iconCls : 'btn btn-primary fa fa-arrow-circle-right',
							action : function(dialog, index) {
								var data = DialogUtil.getChildFrameWindow(index).formDefCreate.getNextData();
								if ($.isEmpty(data)) {
									return;
								}
								
					    	    $.get(  __ctx+ "/platform/form/formDef/isFormKeyExists.htm",{
					    	    	key:data.key
					    	    	},function(rtn){
					    	    		if(rtn.result == 1){
					    	    			me.selectTemplate(data);
											DialogUtil.close(index);
					    	    		}
					    	    		else{
					    	    			DialogUtil.msg(rtn.message);
					    	    		}
					    	    },"json");
						
							}
						},{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(dialog, index) {
								DialogUtil.close(index);
							}
						}]
			});	
		},
		selectTemplate:function(params){
			var me = this,
				buildMode = params.buildMode,url;
			
			if(buildMode == 'default'){
				return me.editDesignForm(params);
			}else if(buildMode == 'template'){
				url = __ctx+ "/platform/form/formDef/selectTemplate.htm";
			}else{
				url = __ctx+ "/platform/form/formDef/selectTableTemplate.htm?mode="+params.mode+"&code="+params.code;
			}
			
			DialogUtil.dialog({
				title : '选择模版',
				content : url,
				params:params,
				area : [ '70%', '80%' ],
				btn : [{
							label : '上一步',
							iconCls : 'btn btn-success fa fa-arrow-circle-left',
							action : function(dialog, index) {
								me.create(params);
								DialogUtil.close(index);
							}
						}, {
							label : '下一步',
							iconCls : 'btn btn-primary fa fa-arrow-circle-right',
							action : function(dialog, index) {
								var data;
									if(buildMode == 'template'){
										data = DialogUtil.getChildFrameWindow(index).formTemplateSelect.getData();
									}else{
										data = DialogUtil.getChildFrameWindow(index).formTemplateSelect.getTableData();
									}
								if ($.isEmpty(data)) {
									DialogUtil.confirm("确定不选择模版,采用默认模版？",function(r){
										if(r){
											me.editDesignForm(params);	
											DialogUtil.close(index);
										}
									});
								}else{
									params.template = data;
									me.editDesignForm(params);	
									DialogUtil.close(index);
								}
							}
						},{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(dialog, index) {
								DialogUtil.close(index);
							}
						}]
			});	
		},
		editDesignForm:function(params,id){
			var url =  __ctx+ "/platform/form/formDef/design.htm";
			if(id)
				url +="?id="+id;
			else{
				url +="?mode="+params.mode+"&code="+params.code+"&buildMode="+params.buildMode+"&template="+(params.template?params.template:"");
			}
			DialogUtil.dialog({
			params:params,
			callback:function(rtn){
				try {
					window.location.reload(true);
				} catch (e) {//出错不影响保存
				}
			
			},
			maxmin:false,
			title:false,
			area : [ '100%', '100%' ],
			content :url
			});
		},
		copyForm:function(id){
			var $this = this;
			var url =  __ctx+ "/platform/form/formDef/copy.htm?id="+id;
			DialogUtil.dialog({
				title : '复制表单',
				content : url,
				area : [ '70%', '80%' ],
				btn : [{
					label : '保存',
					iconCls : 'btn btn-primary fa fa-save',
					action : function(dialog, index) {
						 DialogUtil.getChildFrameWindow(index).formDefCopy.saveForm(function(){
							 DialogUtil.close(index);
								$this.loadFormList();
						 });
					}
				},{
					label : '取消',
					iconCls : 'btn btn-danger fa fa-cancel',
					action : function(dialog, index) {
						DialogUtil.close(index);
					}
				}]
			});
		}
	};
	

})();