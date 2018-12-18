/**
 * 富文本框。
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	editorControl = new EditorControl();
	editorControl.init();  //初始化操作
});

(function() {
	

	EditorControl = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	EditorControl.prototype = {
			/**
			 * 初始化
			 */
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
	
				this.initData();
			},
			initData:function(parent){
				var me = this;
				if(	$.isEmpty(parent))
					parent = $("script[data-toggle='editor']");
				parent.each(function(){
		    	  	var $this=$(this),editor,
		    	  		$name = $("[name='"+ $this.data("name")+"']"),
		    	  		id = $this.attr("id");
		    	try {
		        	editor =  UE.getEditor(id);
		        	// 页面渲染好后如果有值
					if(!editor) return;
		
					editor.ready( function( e ) {
						if(!$.isEmpty($name.val()))
							editor.setContent($name.val());
					     // 当内容改变了进行值的变更
					     editor.addListener( 'contentChange', function( e ) {
					    	 $name.val(editor.getContent());
					     });
					 });
		    	} catch (e) {
				}
		    	});
			}
	}
})();