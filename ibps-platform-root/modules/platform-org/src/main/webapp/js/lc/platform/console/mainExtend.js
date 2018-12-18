/*******************************************************************************
 * 
 * 系统主页
 * 
 * <pre>
 *  
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-9-17-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 * 
 ******************************************************************************/
var mainPlugin = null;
;(function($, window, document, undefined) {

	var pluginName = "main", menus = [], me = null, defaults = {
		key : 'id',
		parentKey : 'parentId',
		childKey : 'children',
		levelKey : 'level',
		nameKey : 'name',
		iconKey : 'icon',
		urlKey : 'defaultUrl',
		isOpenKey : 'isOpen',
		aliasKey:'alias'
	},	ie8 =   (/MSIE 8/.test(navigator.userAgent) );

	function Plugin(element, options) {
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init : function() {
			mainPlugin = this;
			me = this;
			$('a[href="#"]').click(function(event) {
				event.preventDefault();
			});
			// 初始化主页
			me.initHome();
			//布局管理
			me.layoutFormatter();
			
			//初始化菜单
			me.initMenu();
			//处理Tab
			me.handerTabs();
			// 处理图片不存在
			me.handerImageExists();
			//处理退出
			me.handerLogout();
			
			me.handerDropdown();
			//处理未读消息
			me.handerInnerMessage();
			//处理邮件
			me.handerOutMail();
			//切换皮肤
			me.handerSkin();
			//切换子系统
			me.handerSwitchSystem();
			//退出切换用户
			me.handerSwitchUser();
			//滚动处理
			me.initNiceScroll();

			me.fixedIbps();
		},
		fixedIbps:function(){
			//头部
			try{ ibps.settings.navbar_fixed(false, false);}catch(e){}
			//主体内容
			try{ibps.settings.check('main-container' , 'fixed');}catch(e){}
			//侧边栏
			try{ibps.settings.sidebar_fixed(null, true);}catch(e){}
			//侧边栏 收缩、展开
//			try{ibps.settings.check('sidebar' , 'collapsed');}catch(e){}
		},
		initNiceScroll : function() {
			var scrollable = $(".scrollable-nice");
			// 其他的滚动
			scrollable.niceScroll({
				horizrailenabled : false,
				cursorborder : "0",
				cursorwidth : "6px",
				cursorcolor : "#999",
				zindex : "5555",
				autohidemode : true,
				bouncescroll : true,
				mousescrollstep : '40',
				scrollspeed : '100',
				background : "#F5F5F5",
				cursoropacitymax : "0.6",
				cursorborderradius : "0"
			});
			scrollable.getNiceScroll().resize();
		},

		/**
		 * 初始化主页
		 */
		initHome:function(){
			var url = $('#homePage').val(),
				isLocal= $("#isLocal").val(),
				baseUrl = $("#baseUrl").val();
			if(isLocal == 'true' && baseUrl == '')
				baseUrl = __ctx;
			url = baseUrl +url;
			me._createIframe({
				id:"home",
				url:url
			});
			//修复ie8bug
			var height =  	ie8?me.flexFrameHeight():'100%';
			$("#home").height(height);
		},
		/**
		 * 创建iframe
		 */
		_createIframe:function(opts){
			var height =  	ie8?me.flexFrameHeight():'100%';
			// 添加选项卡对应的iframe
			var str1 = '<iframe class="J_iframe"   name="iframe' + opts.id
					+ '" width="100%" height="'+height+'" src="' +opts.url
					+ '" frameborder="0" data-id="' + opts.id
					+ '" seamless></iframe>';
			$('.J_mainContent').find('iframe.J_iframe').hide();
			$('.J_mainContent').append(str1);

			// 显示loading提示
			var loading =DialogUtil.load(0, {shade:0});
			$('.J_mainContent iframe:visible').load(function() {
				// iframe加载完成后隐藏loading提示
				DialogUtil.close(loading);
				me.initContextmenu();
			});	
		},
		handerInnerMessage:function(){
			$('#innerMessage').click(function(){
				$.post(__ctx+'/platform/msg/innerMessage/msgList.htm',function(result) {
					var r = '';
					if(result.records >0){
						for ( var i = 0; i < result.rows.length; i++) {
							var msg =  result.rows[i];
							 r += '<li >'
							 	+'<a  onclick="showReadMsgDlg(\''+msg.id+'\')"><div class="clearfix">'
								+'<span class="pull-left">'
								+'<i class="btn btn-xs no-hover btn-pink fa fa-bullhorn"></i>'
								+msg.subject
							 	+'</span>'
		                       + '<span class="pull-right">'
		                        +(msg.durationTime?msg.durationTime:"")+"&nbsp;&nbsp;"
		                          +  '<span class="glyph-icon fa fa-clock-o"></span>'
		                    	 +'</span>'
		                        '</div></a>'+
		                    '</li>';
						}
					}else{
						 r += '<li >'+
                        '<span class="notification-text">暂无未读消息</span>'+
                        '</li>';
					}
					$('#msgList').empty();
					$('#msgList').append(r);
				});
			});
		},
		handerOutMail:function(){
			$('#outMail').click(function(){
				$.post(__ctx+'/platform/mail/outMail/msgList.htm',function(result) {
					var r = '';
					if(result.records >0){
						for ( var i = 0; i < result.rows.length; i++) {
							var msg =  result.rows[i];
							 r += '<li >'
								 	+'<a  ><div class="clearfix">'
									+'<span class="pull-left">'
									+'<i class="btn btn-xs no-hover btn-pink fa fa-bullhorn"></i>'
									+msg.title
								 	+'</span>'
			                       + '<span class="pull-right">'
			                        +(msg.durationTime?msg.durationTime:"")+"&nbsp;&nbsp;"
			                         +  '<span class="glyph-icon fa fa-clock-o"></span>'
			                    	 +'</span>'
			                        '</div></a>'+
			                    '</li>';
						}
					}else{
						 r += '<li >'+
                        '<span class="notification-text">暂无未读邮件</span>'+
                        '</li>';
					}
					$('#outMailList').empty();
					$('#outMailList').append(r);
				});
			});
		},
		/**
		 * 处理图片不存在
		 */
		handerImageExists : function() {
			var t = document.getElementsByTagName("img");
			for (i = 0; i < t.length; i++) {
				t.item(i).onerror = function() {
					if (this.id == "picture") {
						this.src = __ctx
								+ "/commons/image/default_use_image.jpg";
						this.onerror = null;
					}
				};
			}
		},
		handerLogout : function() {
			$('#logout').click(function() {
				DialogUtil.confirm("确认退出", function(r) {
					if (r)
						window.location.href = __ctx + "/logout.htm";
				});
			});
		},
		handerDropdown : function() {
			var me = this;
			//增加Tab
			$('[data-toggle="menuTab"]').click(function() {
				var $el =$(this), options = $el.data();
				me.addTab({
					id:options.id,
					title:options.title,
					icon:options.icon,
					url:options.url
				});
			});
			
		},
		/**
		 * 转换成树结构
		 */
		transformToTreeFormat : function(sNodes) {
			var node = this.transformToArrayFormat(sNodes);
			// 设置层级
			for ( var i = 0; i < node.length; i++) {
				this.setSonNodeLevel(null, node[i]);
			}
			return node;
		},
		/**
		 * 转换成数组结构
		 */
		transformToArrayFormat : function(sNodes) {
			var i, l, key = this._defaults.key, parentKey = this._defaults.parentKey, childKey = this._defaults.childKey;
			if (!key || key == "" || !sNodes)
				return [];
			if ($.isArray(sNodes)) {
				var r = [];
				var tmpMap = [];
				for (i = 0, l = sNodes.length; i < l; i++) {
					tmpMap[sNodes[i][key]] = sNodes[i];
				}
				for (i = 0, l = sNodes.length; i < l; i++) {
					if (tmpMap[sNodes[i][parentKey]]
							&& sNodes[i][key] != sNodes[i][parentKey]) {
						if (!tmpMap[sNodes[i][parentKey]][childKey])
							tmpMap[sNodes[i][parentKey]][childKey] = [];
						tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
					} else {
						r.push(sNodes[i]);
					}
				}

				return r;
			} else {
				return [ sNodes ];
			}
		},
		setSonNodeLevel : function(parentNode, node) {
			if (!node)
				return;
			var childKey = this._defaults.childKey, levelKey = this._defaults.levelKey;
			node[levelKey] = (parentNode) ? parentNode[levelKey] + 1 : 0;
			if (!node[childKey])
				return;
			for ( var i = 0, l = node[childKey].length; i < l; i++) {
				if (node[childKey][i])
					this.setSonNodeLevel(node, node[childKey][i]);
			}
		},
		getChildByParentId : function(pId, nodes) {
			for ( var i = 0; i < menus.length; i++) {
				if (menus[i].id == pId)
					nodes.push(menus[i]);
			}
			return (nodes.length >0)?nodes[0]:{};
		},
		/**
		 * 初始化菜单
		 */
		initMenu : function() {
			$.post(__ctx + "/platform/auth/resources/getMenuData.htm",function(result) {
				menus = me.transformToTreeFormat(result);
     			me.buildSidebarMenu(menus);
     
     			me.fixedSubmenu();
    			//加载完成后修复下ibps
    			me.fixedIbps();
			});
		},
		fixedSubmenu:function(){
			var scrollable = $(".submenu");
			var  $height=500;
			//获取窗口高度 
			if (window.innerHeight) 
				$height = window.innerHeight; 
			else if ((document.body) && (document.body.clientHeight)) 
				$height = document.body.clientHeight; 
			//通过深入Document内部对body进行检测，获取窗口大小 
			if (document.documentElement && document.documentElement.clientHeight) 
				$height = document.documentElement.clientHeight; 
			
			var height = $height-$('#page-header').height();
			
			scrollable.each(function(){
				var $this = $(this), li = $this.children("li");
				
				if(li.length*40 > height)
					$this.css("height",height);
				else
					return true;
			});		
		},
		buildSidebarMenu:function(o){
 			var menuContainer = $("#leftMenu");
 			//构建层
			for ( var i = 0; i <o.length; i++) {
				var s = this.getSideMenu(o[i]);
				menuContainer.append(s);
 			}
			$('#leftMenu .J_menuItem ').on("click", function(e) {
				// 为点击菜单绑定事件
				var self = $(this), opts = self.data();
				self.parents().find('li').removeClass('active');
				self.parents("li.hover-shown").addClass('active');
				me.addTab(opts);
			});

		},
		// 初始化左侧
		getSideMenu : function(o) {
			var me = this,
			childKey = this._defaults.childKey, 
			levelKey = this._defaults.levelKey,
			nameKey = this._defaults.nameKey,
			iconKey = this._defaults.iconKey,
			urlKey = this._defaults.urlKey,
			isOpenKey = this._defaults.isOpenKey,
			aliasKey = this._defaults.aliasKey;
	
			var level = o[levelKey];
			var isRoot = (level == 0 ? true : false);
			
			var m = isRoot ? me.getMenu(o): ('<ul class="submenu">');

			if(!isRoot && o){
				$.each(o, function(i, n) {
					m += me.getMenu(n);
				});
			}
			
			m += isRoot?'':'</ul>';
			return m;
		},
		getMenu :function(n){
 			var me = this,
				childKey = this._defaults.childKey, 
				levelKey = this._defaults.levelKey,
				nameKey = this._defaults.nameKey,
				iconKey = this._defaults.iconKey,
				urlKey = this._defaults.urlKey,
				isOpenKey = this._defaults.isOpenKey,
				aliasKey = this._defaults.aliasKey;
	
			var isHashChild = n[childKey] && n[childKey].length > 0 ? true: false;
			var arr = isHashChild ?  '<span class="arrow fa fa-angle-right "></span>' : '';
			var arr1=  isHashChild ?  '<b class="arrow"></b>' : '';
			var addTab = isHashChild ? 'dropdown-toggle' : 'J_menuItem';
			var options = 'data-id="'+ n[aliasKey] +'" ' 
						+ 'data-title="'+ n[nameKey] +'" ' 
						+ 'data-icon="'+ n[iconKey] +'" ' 
						+(n[urlKey] ?( 'data-url="'+n[urlKey] +'" ') :'')	;
			var subMenu =  isHashChild?me.getSideMenu(n[childKey]):true,
					icon =  n[levelKey]==0?"menu-icon":'';
			li = '<li class="hover">'
					+ '<a href="javascript:void(0)" class="' + addTab
					+ '" ' + options + '   >' 
					+'<i class="'+icon+' fa '+n[iconKey]+'"></i>&nbsp;&nbsp;<span class="menu-text"  title="'+n[nameKey]+'">'+n[nameKey] +' </span>'
					+arr+'</a>' + arr1;
		
			if (isHashChild && subMenu  )
    				li += subMenu;
	  		li += '</li>';
	  		
	  		return li;
 		},
		handerTabs : function() {
			// 左移按扭
			$('.J_tabLeft').on('click', function() {
				me.scrollTabLeft();
			});

			// 右移按扭
			$('.J_tabRight').on('click', function() {
				me.scrollTabRight();
			});
			// 双击tab
			$('.J_menuTabs').on('click', '.J_menuTab', function() {
				me.activeTab(this);
			});
			$(".J_menuItem_other").click(function() {
				var self = $(this);
				me.addTab({
					url : self.data("url"),
					id : self.data("id"),
					title : self.data("title")
				});
			});
			this.initTabMenu();
		},
		initTabMenu:function(){
			// 关闭tab
			$('.J_menuTabs').on('click', '.J_menuTab i', me.closeTab);
			// 关闭其他tab
			$('.J_tabCloseOther').on('click', me.closeOtherTabs);
			//
			$('.J_tabShowActive').on('click', me.showActiveTab);
			// 关闭全部
			$('.J_tabCloseAll').on('click', me.closeAllTabs);
			// 刷新当前激活的
			$('.J_tabRefresh').on('click',function(){
				 me.refreshTab();
			});
		
			//双击菜单刷新
			$('.J_menuTabs').on('dblclick', '.J_menuTab', function() {
				me.refreshTab(this);
			});
			
		},
		addTab : function(opts) {
			// 获取标识数据
			var title = opts.title, url = opts.url, id = opts.id, icon = opts.icon, closable = (opts.closable ? false
					: true), baseUrl = opts.baseUrl ? opts.baseUrl : __ctx;
			if (url == undefined || $.trim(url).length == 0)
				return false;

			// 选项卡菜单不存在
			if (me.isTabExists(id)) {
				var str = '<a href="javascript:void(0);" class="active J_menuTab"  data-toggle="context" data-id="'
						+ id
						+ '">'
						+ title
						+ ' <i class="fa fa-times-circle"></i></a>';
				$('.J_menuTab').removeClass('active');

				me._createIframe({
					id:id,
					url:baseUrl+url
				});
				// 添加选项卡
				$('.J_menuTabs .page-tabs-content').append(str);
				me.scrollToTab($('.J_menuTab.active'));
			} else {
				this.load($('.J_iframe[data-id="' + id + '"]'));
			}
			return false;
		},
		initContextmenu : function() {
			$('.J_menuTab').contextmenu({
						target : '#context-menu',
						before : function(context, e) {
							var id = $(e).data("id");
							if (!id)
								return false;
							// 激活选择的tab
							me.isTabExists(id);
							if (id == "home") {// 禁用关闭
								$('#context-menu a[data-action="tab-close-left"]').addClass("disabled");
								$('#context-menu a[data-action="tab-close"]').addClass("disabled");
							} else {
								$('#context-menu a[data-action="tab-close-left"]').removeClass("disabled");
								$('#context-menu a[data-action="tab-close"]').removeClass("disabled");
							}
						},
						onItem : function(context, e) {
							var target = $(e.target), action = target
									.data("action"), self = $(context);
							if (target.hasClass('disabled'))
								return false;
							switch (action) {
							case "tab-refresh":// 刷新
								me.refreshTab(self);
								break;
							case "tab-close":// 关闭
								me.closeCurTab(self);
								break;
							case "tab-close-all":// 所有
								me.closeAllTabs();
								break;
							case "tab-close-other":
								me.closeOtherTabs();
								break;
							case "tab-close-right":
								me.closeRightLeftTabs(self, true);
								break;
							case "tab-close-left":
								me.closeRightLeftTabs(self, false);
								break;
							case "tab-exit":
								break;
							}
						}
					});
		},
		isTabExists : function(id) {
			var flag = true;
			$('.J_menuTab').each(	function() {
						if ($(this).data('id') == id) {
							if (!$(this).hasClass('active')) {
								$(this).addClass('active').siblings(
										'.J_menuTab').removeClass('active');
								me.scrollToTab(this);
								// 显示tab对应的内容区
								$('.J_mainContent .J_iframe').each(
										function() {
											if ($(this).data('id') == id) {
												$(this).show().siblings('.J_iframe').hide();
												return false;
											}
										});
							}
							flag = false;
							return false;
						}
					});
			return flag;
		},
		// 计算元素集合的总宽度
		calSumWidth : function(elements) {
			var width = 0;
			$(elements).each(function() {
				width += $(this).outerWidth(true);
			});
			return width;
		},
		// 滚动到指定选项卡
		scrollToTab : function(element) {
			var marginLeftVal = me.calSumWidth($(element).prevAll()), marginRightVal = me
					.calSumWidth($(element).nextAll());
			// 可视区域非tab宽度
			var tabOuterWidth = me.calSumWidth($(".content-tabs").children()
					.not(".J_menuTabs"));
			// 可视区域tab宽度
			var visibleWidth = $(".content-tabs").outerWidth(true)
					- tabOuterWidth;
			// 实际滚动宽度
			var scrollVal = 0;
			if ($(".page-tabs-content").outerWidth() < visibleWidth) {
				scrollVal = 0;
			} else if (marginRightVal <= (visibleWidth
					- $(element).outerWidth(true) - $(element).next()
					.outerWidth(true))) {
				if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
					scrollVal = marginLeftVal;
					var tabElement = element;
					while ((scrollVal - $(tabElement).outerWidth()) > ($(
							".page-tabs-content").outerWidth() - visibleWidth)) {
						scrollVal -= $(tabElement).prev().outerWidth();
						tabElement = $(tabElement).prev();
					}
				}
			} else if (marginLeftVal > (visibleWidth
					- $(element).outerWidth(true) - $(element).prev()
					.outerWidth(true))) {
				scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
			}
			$('.page-tabs-content').animate({
				marginLeft : 0 - scrollVal + 'px'
			}, "fast");
		},
		/**
		 * 查看右侧隐藏的选项卡
		 */
		scrollTabLeft : function() {
			var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css(
					'margin-left')));
			// 可视区域非tab宽度
			var tabOuterWidth = me.calSumWidth($(".content-tabs").children()
					.not(".J_menuTabs"));
			// 可视区域tab宽度
			var visibleWidth = $(".content-tabs").outerWidth(true)
					- tabOuterWidth;
			// 实际滚动宽度
			var scrollVal = 0;
			if ($(".page-tabs-content").width() < visibleWidth) {
				return false;
			} else {
				var tabElement = $(".J_menuTab:first");
				var offsetVal = 0;
				while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {// 找到离当前tab最近的元素
					offsetVal += $(tabElement).outerWidth(true);
					tabElement = $(tabElement).next();
				}
				offsetVal = 0;
				if (me.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
					while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth)
							&& tabElement.length > 0) {
						offsetVal += $(tabElement).outerWidth(true);
						tabElement = $(tabElement).prev();
					}
					scrollVal = me.calSumWidth($(tabElement).prevAll());
				}
			}
			$('.page-tabs-content').animate({
				marginLeft : 0 - scrollVal + 'px'
			}, "fast");
		},
		// 查看右侧隐藏的选项卡
		scrollTabRight : function() {
			var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css(
					'margin-left')));
			// 可视区域非tab宽度
			var tabOuterWidth = me.calSumWidth($(".content-tabs").children()
					.not(".J_menuTabs"));
			// 可视区域tab宽度
			var visibleWidth = $(".content-tabs").outerWidth(true)
					- tabOuterWidth;
			// 实际滚动宽度
			var scrollVal = 0;
			if ($(".page-tabs-content").width() < visibleWidth) {
				return false;
			} else {
				var tabElement = $(".J_menuTab:first");
				var offsetVal = 0;
				while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {// 找到离当前tab最近的元素
					offsetVal += $(tabElement).outerWidth(true);
					tabElement = $(tabElement).next();
				}
				offsetVal = 0;
				while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth)
						&& tabElement.length > 0) {
					offsetVal += $(tabElement).outerWidth(true);
					tabElement = $(tabElement).next();
				}
				scrollVal = me.calSumWidth($(tabElement).prevAll());
				if (scrollVal > 0) {
					$('.page-tabs-content').animate({
						marginLeft : 0 - scrollVal + 'px'
					}, "fast");
				}
			}
		},
		/**
		 * 双击tab
		 * 
		 * @param self
		 */
		activeTab : function(self) {
			if ($(self).hasClass('active'))
				return;
			var currentId = $(self).data('id');
			// 显示tab对应的内容区
			$('.J_mainContent .J_iframe').each(function() {
				if ($(this).data('id') == currentId) {
					$(this).show().siblings('.J_iframe').hide();
					return false;
				}
			});
			$(self).addClass('active').siblings('.J_menuTab').removeClass(
					'active');
			me.scrollToTab(self);
		},
		closeRightLeftTabs : function(self, flag) {
			if (!$(self).hasClass('active'))
				return;
			var $this = $(self), currentWidth = $this.width(), tabs;
			if (flag)// 右边
				tabs = $this.nextAll('.J_menuTab');
			else
				tabs = $this.prevAll('.J_menuTab');
			// 当前元素后面有同辈元素，使后面的所有元素删除
			if (tabs.size() > 0) {
				tabs.each(function() {
					if ($(this).data('id') == 'home')
						return false;
					$(this).remove();
				});
				var marginLeftVal = parseInt($('.page-tabs-content').css(
						'margin-left'));
				if (marginLeftVal < 0) {
					$('.page-tabs-content').animate({
						marginLeft : (marginLeftVal + currentWidth) + 'px'
					}, "fast");
				}
				// 移除tab对应的内容区
				$('.J_mainContent .J_iframe').each(function() {
					var $that = $(this), curId = $that.data('id');
					if (curId == 'home')
						return true;
					tabs.each(function() {
						if (curId == $(this).data('id')) {
							$that.remove();
							return false;
						}
					});
				});
			}
		},
		closeCurTab : function(self) {
			var $this = $(self), closeTabId = $this.data('id'), currentWidth = $this
					.width();
			if(closeTabId == 'home')
				return;
			// 当前元素处于活动状态
			if ($this.hasClass('active')) {

				// 当前元素后面有同辈元素，使后面的一个元素处于活动状态
				if ($this.next('.J_menuTab').size()) {

					var activeId = $this.next('.J_menuTab:eq(0)').data('id');
					$this.next('.J_menuTab:eq(0)').addClass('active');

					$('.J_mainContent .J_iframe').each(function() {
						if ($(this).data('id') == activeId) {
							$(this).show().siblings('.J_iframe').hide();
							return false;
						}
					});

					var marginLeftVal = parseInt($('.page-tabs-content').css(
							'margin-left'));
					if (marginLeftVal < 0) {
						$('.page-tabs-content').animate({
							marginLeft : (marginLeftVal + currentWidth) + 'px'
						}, "fast");
					}

					// 移除当前选项卡
					$this.remove();

					// 移除tab对应的内容区
					$('.J_mainContent .J_iframe').each(function() {
						if ($(this).data('id') == closeTabId) {
							$(this).remove();
							return false;
						}
					});
				}

				// 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
				if ($this.prev('.J_menuTab').size()) {
					var activeId = $this.prev('.J_menuTab:last').data('id');
					$this.prev('.J_menuTab:last').addClass('active');
					$('.J_mainContent .J_iframe').each(function() {
						if ($(this).data('id') == activeId) {
							$(this).show().siblings('.J_iframe').hide();
							return false;
						}
					});

					// 移除当前选项卡
					$this.remove();

					// 移除tab对应的内容区
					$('.J_mainContent .J_iframe').each(function() {
						if ($(this).data('id') == closeTabId) {
							$(this).remove();
							return false;
						}
					});
				}
			}
			// 当前元素不处于活动状态
			else {
				// 移除当前选项卡
				$this.remove();
				// 移除相应tab对应的内容区
				$('.J_mainContent .J_iframe').each(function() {
					if ($(this).data('id') == closeTabId) {
						$(this).remove();
						return false;
					}
				});
				//激活当前
				me.scrollToTab($('.J_menuTab.active'));
			}
		},
		// 关闭选项卡菜单
		closeTab : function() {
			me.closeCurTab($(this).parents('.J_menuTab'));
		},
		// 关闭其他选项卡
		closeOtherTabs : function() {
			$('.page-tabs-content').children("[data-id]").not(":first").not(
					".active").each(function() {
				$('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
				$(this).remove();
			});
			$('.page-tabs-content').css("margin-left", "0");
		},
		// 滚动到已激活的选项卡
		showActiveTab : function() {
			me.scrollToTab($('.J_menuTab.active'));
		},
		/**
		 * 关闭所有
		 */
		closeAllTabs : function() {
			$('.page-tabs-content').children("[data-id]").not(":first").each(
					function() {
						$('.J_iframe[data-id="' + $(this).data('id') + '"]')
								.remove();
						$(this).remove();
					});
			$('.page-tabs-content').children("[data-id]:first").each(
					function() {
						$('.J_iframe[data-id="' + $(this).data('id') + '"]')
								.show();
						$(this).addClass("active");
					});
			$('.page-tabs-content').css("margin-left", "0");
		},
		getActivemenuTab:function(){
			return $('.J_menuTab.active')
		},
		// 刷新iframe
		refreshTab : function(self) {
			var tab;
			if(self)
				 tab =$(self);
			else{
				 tab = this.getActivemenuTab();
			}
			 this.load($('.J_iframe[data-id="' + tab.data('id') + '"]'));
		},
		load : function(target, url) {
			if (!url)
				url = target.attr('src');
			// 显示loading提示
			var loading = DialogUtil.load(0, {
				shade : 0
			});
			target.attr('src', url).load(function() {
				// 关闭loading提示
				DialogUtil.close(loading);
				me.initContextmenu();
			});
		},
        handerSkin:function(){
        	$('.skin').click(function(){
    			me.switchSkin(this);
    		});
    		
    		var skin = ibps.data.get('skin');
    		if(!skin)
    			skin='skin-1';
    		$('[skin="'+skin+'"]').click();
        },
        /**
         * 切换皮肤
         * @param skin_class
         */
        switchSkin: function (obj) {
        	var me = $(obj),
        		skin_class = me.attr('skin')
        	me.parent().find('li').removeClass('disabled').removeClass("grey-bg");
        	me.addClass('disabled').addClass("grey-bg");
        	var body = $(document.body);
        	body.removeClass('no-skin skin-1 skin-2 skin-3');

        	//if(skin_class != 'skin-0') {
        		body.addClass(skin_class);
        		ibps.data.set('skin', skin_class);
        		//save the selected skin to cookies
        		//which can later be used by your server side app to set the skin
        		//for example: <body class="<?php echo $_COOKIE['ibps_skin']; ?>"
        	//} else ibps.data.remove('skin');
        	
        	var skin3_colors = ['red', 'blue', 'green', ''];
        	
        	
        		//undo skin-1
        		$('.ibps-nav > li.grey').removeClass('dark');
        		
        		//undo skin-2
        		$('.ibps-nav > li').removeClass('no-border margin-1');
        		$('.ibps-nav > li:not(:last-child)').removeClass('light-pink').find('> a > '+ibps.vars['.icon']).removeClass('pink').end().eq(0).find('.badge').removeClass('badge-warning');
        		$('.sidebar-shortcuts .btn')
        		.removeClass('btn-pink btn-white')
        		.find(ibps.vars['.icon']).removeClass('white');
        		
        		//undo skin-3
        		$('.ibps-nav > li.grey').removeClass('red').find('.badge').removeClass('badge-yellow');
        		$('.sidebar-shortcuts .btn').removeClass('btn-primary btn-white')
        		var i = 0;
        		$('.sidebar-shortcuts .btn').each(function() {
        			$(this).find(ibps.vars['.icon']).removeClass(skin3_colors[i++]);
        		})
        	
        	

        	var skin0_buttons = ['btn-success', 'btn-info', 'btn-warning', 'btn-danger'];
        	if(skin_class == 'no-skin') {
        		var i = 0;
        		$('.sidebar-shortcuts .btn').each(function() {
        			$(this).attr('class', 'btn ' + skin0_buttons[i++%4]);
        		})
        	}

        	else if(skin_class == 'skin-1') {
        		$('.ibps-nav > li.grey').addClass('dark');
        		var i = 0;
        		$('.sidebar-shortcuts')
        		.find('.btn').each(function() {
        			$(this).attr('class', 'btn ' + skin0_buttons[i++%4]);
        		})
        	}

        	else if(skin_class == 'skin-2') {
        		$('.ibps-nav > li').addClass('no-border margin-1');
        		$('.ibps-nav > li:not(:last-child)').addClass('light-pink').find('> a > '+ibps.vars['.icon']).addClass('pink').end().eq(0).find('.badge').addClass('badge-warning');
        		
        		$('.sidebar-shortcuts .btn').attr('class', 'btn btn-white btn-pink')
        		.find(ibps.vars['.icon']).addClass('white');
        	}

        	//skin-3
        	//change shortcut buttons classes, this should be hard-coded if you want to choose this skin
        	else if(skin_class == 'skin-3') {
        		body.addClass('no-skin');//because skin-3 has many parts of no-skin as well
        		
        		$('.ibps-nav > li.grey').addClass('red').find('.badge').addClass('badge-yellow');
        		
        		var i = 0;
        		$('.sidebar-shortcuts .btn').each(function() {
        			$(this).attr('class', 'btn btn-primary btn-white');
        			$(this).find(ibps.vars['.icon']).addClass(skin3_colors[i++]);
        		})

        	}

        },
        handerSwitchSystem:function(){
        	$(".switchSystem").on("click",function(){
        		var self = $(this),id=self.data("id");
        		 me.switchSystem(id);
        	});
        },
        switchSystem: function (systemId){
        	window.location.href = __ctx+"/platform/console/saveCurrSys.htm?systemId="
        		+ systemId;
        },
        
		//修复iFrame高度
		flexFrameHeight:function (){
			var $width=100,$height=500;
			try{
				//获取窗口宽度 
				if (window.innerWidth) 
					$width = window.innerWidth; 
				else if ((document.body) && (document.body.clientWidth)) 
					$width = document.body.clientWidth; 
				//获取窗口高度 
				if (window.innerHeight) 
					$height = window.innerHeight; 
				else if ((document.body) && (document.body.clientHeight)) 
					$height = document.body.clientHeight; 
				//通过深入Document内部对body进行检测，获取窗口大小 
				if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) { 
					$height = document.documentElement.clientHeight; 
					$width = document.documentElement.clientWidth; 
				} 
				
				var headerHeight  = $('#page-header').height(),
					tabHeight = $('.content-tabs').height();
				$height = $height-headerHeight-tabHeight;
			}catch (ex){}
			return $height;
		},
		/**
		 * 布局整理
		 */
        layoutFormatter : function(){

        	/* Layout Formatter */
        	if ($(window).width() > 1050) {
        		$('#page-sidebar').show();
        	}
        	setTimeout(function() {
				var windowH = $(window).height(), headerH = $('#navbar')
						.height(), navH = $('#page-nav').height(), sideH = windowH
						- headerH, contH = windowH - headerH - navH;

				$('#page-sidebar').height(sideH);
				$('#page-sidebar-wrapper').height(sideH);
				$('#page-content').css('min-height', contH - 2);
				$('#page-content-wrapper').height(sideH-10);
			}, 10);
        },
        handerSwitchUser :function (){
          	$("#userSwitch").on("click",function(){
        		var self = $(this),account=self.data("value");
     			window.location.href = __ctx + '/j_spring_security_exit_user?j_username='+account;
        	});
        },
		/**
		 * 切换用户
		 */
		switchUser : function(account){
			window.location.href = __ctx + '/j_spring_security_switch_user?j_username='+account;
		}

	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {
					if (!$.data(this, "plugin_" + pluginName)) {
						$.data(this, "plugin_" + pluginName, new Plugin(this,
								options));
					}
				});
	};

})(jQuery, window, document);


$(function() {
	$('body').main();
/*	$(window).resize(function() {
		mainPlugin.layoutFormatter();
	});*/
});


if (top != this) {// 当这个窗口出现在iframe里，表示其目前已经timeout，需要把外面的框架窗口也重定向登录页面
	top.location = __ctx + '/platform/console/main.htm';
}




function showReadMsgDlg(msgId){
	DialogUtil.dialog({
		title:"未读消息",
		content:__ctx+'/platform/msg/innerMessage/readMsg.htm?id='+msgId,
		callback:function(rtn){
			if(rtn){
				//刷新数量
				var readMsg = $('#readMsg'),readMsgCount=readMsg.text()-1 ;
				readMsg.text(readMsgCount);
			}
		}
	});
}


