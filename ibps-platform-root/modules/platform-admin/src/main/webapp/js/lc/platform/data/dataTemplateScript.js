$(function() {
	dataTemplateScript = new DataTemplateScript();
	dataTemplateScript.init();
});


(function() {
	/**
	 * 动态脚本 对象
	 * 
	 * @returns {DataTemplateScript}
	 */
	DataTemplateScript = function() {

	};

	/**
	 * 方法
	 */
	DataTemplateScript.prototype = {
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			var params = this.params = frameElement.dialog.params;
			this.type = params.type?params.type:'template';
			// 布局
			this.initLayout();
			// 输入
			this.initEditor();
			// bo对象
			this.initBoTree(params.bo);
			this.insertDefaultScript();
		},
		initLayout : function() {
			$('body').layout({
				applyDefaultStyles : true
			});
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
		initBoTree : function(bo) {
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

			var tree = $.fn.zTree.init($('#boTree'), setting, bo);

			// 展开所有
			tree.expandAll(true);
		},
		insertField : function(obj, b) {
			var start = this.editor.getCursor();
			this.editor.replaceSelection("F"+ obj.key);
			var end = this.editor.getCursor();
			this.editor.focus();
		},
		insertDefaultScript:function(){
			var _this = this,key = (this.type =='dialog'?'JDialog':'JTemplate');
			$("#insertDefaultScript").click(function(){
				var  val = "$.extend($."+key+",{\n  //加载页面事件\n  onLoad:function(){\n    \n  },\n  //按钮提交前置事件\n  beforeSubmit:function(actionCode,params){\n    \n  }\n});";
	
				
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
		}
	};
})();