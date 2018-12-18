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
	formTemplateSelect  = new FormTemplateSelect();
	formTemplateSelect.init();

	
});

(function() {
	//定义常量
	var 	_consts = {
			TYPE_TREE : '#typeTree'// 树的ID
	};
	/**
	 * 表单列表 对象
	 * @returns {FormTemplateSelect}
	 */
	FormTemplateSelect = function() {
		
	};

	/**
	 * 方法
	 */
	FormTemplateSelect.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			if($("#formList").length > 0){
				this.hasInit = true;
				this.hasInitList = false;
				this.loadFormList();
				this._initTypeTree();
				this.handlerSearch();
				this.handleSearchKeyPress();
			}
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
		        }
		      });
		},
		bindClick:function(){
			$(document).off( "click", ".dashboard-item[data-id]" ).on("click", ".dashboard-item[data-id]", function(e) {
				var $this = $(this);
				if($this.hasClass("selected")){
					$this.removeClass("selected");
				}else{
					$this.parent().find("div.selected").removeClass("selected");
					$this.addClass("selected");
				}
			});
		},
		getData:function(){
			var selected = $(".dashboard-item.selected");
			if(selected.length > 0){
				return  selected.data("id");
			}
		},
		getTableData:function(){
			var data ={};
			$("[template]").each(function(){
				var $this =$(this);
				data[$this.data("name")] = $this.val();
			})
			return encodeURIComponent(encodeURIComponent(JSON.stringify(data)));
		}
	};
	

})();