/**
 * 获取对应的自定义对话框信息
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 21:40:48
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var customDialogData = new CustomDialogData();
	customDialogData.init();
});

(function() {
	//定义常量
	var _consts = {
			SETTING : '#customDialogData'//显示数据页面
	};
	/**
	 * 自定义对话框 对象
	 * @returns {CustomDialog}
	 */
	CustomDialogData = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CustomDialogData.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.SETTING).length > 0)// 设置页面
				this._initSetting();
		},
		/**
		 * 初始列表
		 */
		_initSetting : function() {
			var me = this;
			var h =60+ $('.toolbar-body').offset().top;
			$('#toolbar-search').height(h+"px");
			var $obj= $('.toolbar-box .tools .collapse, .toolbar-box .tools .expand');
			$obj.unbind('click');
		
			//收缩、展开
			$obj.bind("click",function () {
				var me =$(this);
		        var el = me.parents(".toolbar-box").children(".toolbar-body");
		        if (me.hasClass("collapse")) {
		        	me.attr("title","展开");
		        	me.removeClass("collapse").addClass("expand");
		            var i = me.children(".fa-angle-double-up");
					i.removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
					me.parents('.toolbar-box').addClass("toolbar-border-bottom");
		            el.slideUp(200);
			  		$('#toolbar-search').height('60px');
		        } else {
		        	me.attr("title","收缩");
		        	me.removeClass("expand").addClass("collapse");
		            var i = me.children(".fa-angle-double-down");
					i.removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
					me.parents('.toolbar-box').removeClass("toolbar-border-bottom");
		            el.slideDown(200);
		            $('#toolbar-search').height(h+"px");
		        }
		    });
		},
	
		/**
		 * 设置返回数据
		 */
		getResult:function(){
			var scope =$("body").scope();
			if(scope.prop.style=="0"){
				return scope.getResult();
			}else if(scope.prop.style=="1"){
				return scope.getTreeResult();
			}
		},
	};
})();
