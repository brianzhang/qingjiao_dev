/**
 * 表单模版设计
 */
$(function() {
	formTemplateEdit = new FormTemplateEdit();
	formTemplateEdit.init();
});

(function() {
	//定义常量
	var me;
	FormTemplateEdit = function() {
		this.boTree = null;
	};

	/**
	 * 方法
	 */
	FormTemplateEdit.prototype = {
		/**
		 * 初始化
		 */
		init : function() {
			me = this;
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			// 从前个页面传过来的参数
			this.data ={};
			//
			var id = $("#id").val();
			if(id != ""){
				this.data  = JSON.parse($("#data").val());
			}else{
				if(frameElement){
					this.data =  frameElement.dialog.params;
				}
			}
	
			//初始化布局
			this._initLayout();
			
			this._initScroll();
			
			this.formbuilder(this.data);
			
		},
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({
				applyDefaultStyles : true,
				west: {
					size:					250
				},
				east: {
					size:					300
				},
				onresize : function() {
				}
			});
			//布局加载完成初始化
			$(".layout-header").removeClass("hidden");
			$(".fb-tabs").removeClass("hidden");
			
			var height = $(window).height();
			$(".niceScroll").height(height-40);
		
	
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
		formbuilder:function(data){
			this.fb = new Formbuilder({
			        selector : '#form_design',
			        data:data,
			        isTemplate:true,
			        callback:function(rtn){
			        	frameElement.dialog.callback(true);
			        	if(!rtn)
			        		DialogUtil.close(frameElement.dialog.index);
			        }
			});
			
		}
	};
})();