$(function() {
	formDefScript = new FormDefScript();
	formDefScript.init();
});


(function() {
	/**
	 * 动态脚本 对象
	 * 
	 * @returns {formDefScript}
	 */
	FormDefScript = function() {

	};

	/**
	 * 方法
	 */
	FormDefScript.prototype = {
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			var params = this.params = frameElement.dialog.params;
			this.bo = params.bo;
			// 布局
			this.initLayout();
			// 输入
			this.initEditor();
			this._initScroll()
			// bo对象
			this.initBoTree();
			
			this.bindTreeEvent();
			
			this.insertDefaultScript();
		},
		initLayout : function() {
			$('body').layout({
				applyDefaultStyles : true
			});
			var height = $(window).height();
			$(".niceScroll").height(height-80);
		},
		initEditor : function() {
			var _this = this;
			var editor = this.editor = CodeMirror.fromTextArea(document
					.getElementById("formula"), {
				textWrapping : true,
				lineWrapping : true, // 是否自动换行
				lineNumbers : true,// 是否显示行数
				mode : "javascript",
				extraKeys: {  
				    'Ctrl-S': function(){  
				    	 frameElement.dialog.callback(_this.getData());
				    	 DialogUtil.msg("设置脚本成功");
				    }  
				}  
			});


			editor.setSize('100%', '390px');

			if (!$.isEmpty(this.params.data))
				this.setValue(this.params.data);
		},	
		/**
		 * 滚动
		 */
		_initScroll:function(){
	    	$(".niceScroll").niceScroll({
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
	    	$(".niceScroll").getNiceScroll().resize();
		},
		initBoTree : function() {
			var _this = this;
			var setting = {
				data : {
					key : {
						name : "name"
					},
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "parentId",
						rootPId : null
					}
				},
				view : {
					selectedMulti : false,
					showIconFont : true
				},
				callback : {
					onClick : function(e, treeId, treeNode) {
						_this.insertField(treeNode, false);
					}
				}
			};

			this.boTree = $.fn.zTree.init($('#boTree'), setting, this.bo);

			// 展开所有
			this.boTree.expandAll(true);
		},
		bindTreeEvent:function(){
			var _this = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					_this.initBoTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					_this.boTree.expandAll(true);
				} else{
					_this.boTree.expandAll(false);	
				}
			});
		},
		insertField : function(obj, b) {
			var start = this.editor.getCursor();
			this.editor.replaceSelection("_"+ obj.key);
			var end = this.editor.getCursor();
			this.editor.focus();
		},
		insertDefaultScript:function(){
			var _this = this;
			$("#insertDefaultScript").click(function(){
				var  val = "$.extend($.JForm,{\n  //加载事件\n  onLoad:function(){\n    \n  }\n});";
				if($.isNotEmpty(_this.getData())){
					DialogUtil.confirm("确定清空现在的脚本值插入默认脚本？",function(r){
						if(r)
							_this.setValue(val);
					})
				}else{
					_this.setValue(val);
				}
			
			});
		},
		getData : function() {
			return this.editor.getValue();
		},
		setValue : function(val) {
			this.editor.setValue(val);
		},
		cleanData:function(){
			this.editor.setValue("");
		}
	};
})();