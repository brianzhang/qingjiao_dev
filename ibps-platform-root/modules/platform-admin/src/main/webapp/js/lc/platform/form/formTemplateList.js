/**
 * 表单模版列表

 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-04-25 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formTemplateList  = new FormTemplateList();
	formTemplateList.init();

	
});

(function() {
	//定义常量
	var 	_consts = {
			TYPE_TREE : '#typeTree'// 树的ID
	};
	/**
	 * 表单列表 对象
	 * @returns {FormTemplateList}
	 */
	FormTemplateList = function() {
		
	};

	/**
	 * 方法
	 */
	FormTemplateList.prototype = {
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
		        url:  __ctx+ "/platform/form/formTemplate/listJson.htm",
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
		                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
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
				_this.editFormTemplate({},$(this).data("id"));
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
			},padding:0});
			
		},
		bindSettingsOptions:function(_this){
			//删除表单
			$(document).off( "click", ".delete-form" ).on("click", ".delete-form", function(e) {
				e.preventDefault(); e.stopPropagation();
			 	 var el = $(this), option =  el.closest(".dashboard-settings-options"),
			 	 	url =  __ctx+"/platform/form/formTemplate/remove.htm?id="+option.data("id");
			 	 
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
				url =  __ctx+"/platform/form/formTemplate/preview.htm?id="+option.data("id");
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
				_this.editFormTemplate({},option.data("id"));
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
				
				me.editFormTemplate();
				
			});
		},
		editFormTemplate:function(params,id){
			var url =  __ctx+ "/platform/form/formTemplate/edit.htm";
			if(id)
				url +="?id="+id;
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
		}
	};
	

})();