/**
 * 流程定义设置
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmDefinitionSetting = new BpmDefinitionSetting();
	bpmDefinitionSetting.init();
});

(function() {
	// 定义常量
	var _consts = {

	}, me;
	BpmDefinitionSetting = function() {

	};

	/**
	 * 方法
	 */
	BpmDefinitionSetting.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			me = this;
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			// 初始化布局
			this._initLayout();
			// 初始化滚动设置
			this._initScroll();
			// 初始化提示
			this.initIntro();
			// 绑定按钮
			this.bindButton();
			// 流程定义设置
			this.initBpmDefinitionBuilder();
		},
		initIntro : function() {
			if (arguments.length == 0) {
				if ($.cookie("intro_bpmn_cookie_index") == 1)
					return;
			}
			if(!$.browser.ie8)
		    	 this.loadIntro();
		},
		loadIntro : function() {
			introJs()
					.setOptions(
							{
								// 对应的按钮
								prevLabel : "上一步",
								nextLabel : "下一步",
								skipLabel : "不再提示",
								doneLabel : "完成",
								// 对应的数组，顺序出现每一步引导提示
								steps : [
										{
											// 第一步引导
											element : '#bpmImage',
											// 这里是每个引导框具体的文字内容，中间可以编写HTML代码
											intro : '<h5>流程图区域</h5>可为流程进行设置<br>1、点击非节点任意位置可以进行全局设置<br>2、点击节点位置可以进行该节点的设置<br><br>',
											// 这里可以规定引导框相对于选中对象出现的位置
											// top,bottom,left,right
											position : 'right'
										},
										{
											// 第二步引导
											element : '#bpmSetting',
											// 这里是每个引导框具体的文字内容，中间可以编写HTML代码
											intro : '<h5>设置区域</h5>可为流程进行详细设置<br>可以配置全局或节点的相关参数。<br><br>',
											// 这里可以规定引导框相对于选中对象出现的位置
											// top,bottom,left,right
											position : 'left'
										},

										{
											// 第步引导
											element : '#bpmTools',
											// 这里是每个引导框具体的文字内容，中间可以编写HTML代码
											intro : '<h5>保存区域</h5>最后您要记得保存了！<br><br>',
											// 这里可以规定引导框相对于选中对象出现的位置
											// top,bottom,left,right
											position : 'bottom'
										} ]

							}).onbeforechange(function(c) {
						var id = $(c).attr("id");
					}).oncomplete(function() {
						// 点击跳过按钮后执行的事件(这里保存对应的版本号到cookie,并且设置有效期为30天）
						$.cookie("intro_bpmn_cookie_index", 1,{ expires: 365, path: '/' });
					}).onexit(function() {
						// 点击结束按钮后， 执行的事件
						$.cookie("intro_bpmn_cookie_index", 1,{ expires: 365, path: '/' });
					}).start();
		},
		bindButton : function() {
			var _this = this;
			$(document).on("click", ".js-intro-bpm", function() {
				if($.browser.ie8)
					alert("ie8不支持！")
				else
					_this.loadIntro();
			});
			$(document).on("click", ".js-close", function() {
				  DialogUtil.closeDialog();
			});
		},
		/**
		 * 初始化布局
		 */
		_initLayout : function() {

			var layout = $('body').layout({
				applyDefaultStyles : true,
				east : {
					size : 500
				},
				onresize : function() {

				}
			});

			var height = $(window).height();
			$("#bpmSetting").height(height - 42);

			$("#bpmImage").height(height - 42);

		},
		/**
		 * 滚动
		 */
		_initScroll : function() {
			$(".imageNiceScroll").niceScroll({
				horizrailenabled : true,
				cursorborder : "0",
				cursorwidth : "10px",
				cursorcolor : "#2A2A2A",
				zindex : "5555",
				autohidemode : "leave",
				bouncescroll : true,
				mousescrollstep : '40',
				scrollspeed : '100',
				background : "#999",
				cursoropacitymax : "0.6",
				cursorborderradius : "0"
			});
			$(".imageNiceScroll").getNiceScroll().resize();
			
			
			$(".niceScroll").niceScroll({
				horizrailenabled : true,
				cursorborder : "0",
				cursorwidth : "8px",
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
		initBpmDefinitionBuilder : function() {
              new BpmDefinitionBuilder({
            	  dialogDefIds: frameElement.dialog.params,
                  selector : '#bpmDefinitionBuilder',
                  defId:$("#defId").val(),
                  defKey:$("#defKey").val(),
            	  data:JSON.parse($("#data").val()),
            	  callback:function(rtn){
            			  frameElement.dialog.callback(rtn);
            	  }
              });
		}
	};
})();