/*******************************************************************************
 * 
 * 系统首页布局js
 * 
 * <pre>
 *  
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-01-8-上午11:10:52
 * 版权：广州流辰信息技术有限公司
 * </pre>
 * 
 ******************************************************************************/
var desktopPagePlugin = null;
;
(function($, window, document, undefined) {

	var pluginName = "desktopPage",
		defaults = {
			templateAliasKey : "template-alias",// 模版别名
			templateParams : "template-params",// 模版传递参数
			disableStye : "hideAdaption",//禁用样式，hideAdaption:隐藏适应栏目。show：显示栏目，hide：隐藏栏目
			defHeight : 320// 默认高度
		}, 
		 portletTools = {
				fullscreen : {
					title : '全屏'
				},
				reload : {
					title : '刷新'
				},
				more : {
					title : '更多'
				},
				collapse : {
					title : '收缩/展开'
				},
				expand : {
					title : '展开/收缩'
				}
			},
			me;
	function Plugin(element, options) {
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init : function() {
			desktopPagePlugin = this;
			me = this;
			me.initUI();
			me.parser();
		},
		initUIEvent : function(el) {
			me.handleSlimScrolls(el);
			me.handleDashboard(el);
			me.handlePieChar(el);
			me.handleSparkline(el);
			me.handleCounterup(el);
			me.handleTooltips(el);
		},
		initUI : function() {
			// 处理顶部的按钮
			me.handleTools();
			// 处理tab
			me.handleTab();
			// 处理list
			me.handeList();
			// 处理事件
			me.handleEvent();
			// 处理回到顶部
			me.handleGoTop();
		},
		/**
		 * 处理顶部的按钮
		 */
		handleTools : function() {
			$(document).on('click', '.portlet-title a[data-action]',function(e) {
				e.preventDefault();

				var $this = $(this), $box = $this.closest('.portlet');
				if ($box.length == 0)
					return;

				var $action = $this.data('action');
				if ($action == 'collapse' || $action == 'expand') {// 展开
					me.toggle($this);
				} else if ($action == 'close') {// 关闭
					me.close($box);
				} else if ($action == 'reload') {// 刷新
					$this.blur();
					me.reload($this);
				} else if ($action == 'fullscreen') {// 全屏
					me.fullscreen($this);
				} else if ($action == 'more') {// 更多
					me.more($this);
				} else if ($action == 'first') {// 首页
					me.firstPage($box);
				} else if ($action == 'prev') {// 上一页
					me.prevPage($box);
				} else if ($action == 'next') {// 下一页
					me.nextPage($box);
				} else if ($action == 'last') {// 最后一页
					me.lastPage($box);
				} else if ($action == 'pageSize') {// 分页大小
					me.pageSize($box, $this);
				} else {// 数据扩扩展
					if ($this.attr("data-ext") && !me.isEmpty($action))
						me.getParamsExt($box, $this, $action);
				}
			});

		},
		/**
		 * 处理底部回到顶部的按钮
		 *  Handles the go to top button at the footer
		 */
		handleGoTop : function() {
			var offset = 200;
			var duration = 500;

			if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) { // ios supported
				$(window).bind("touchend touchcancel touchleave", function(e) {
					if ($(this).scrollTop() > offset) {
						$('.scroll-to-top').fadeIn(duration);
					} else {
						$('.scroll-to-top').fadeOut(duration);
					}
				});
			} else { // general
				$(window).scroll(function() {
					if ($(this).scrollTop() > offset) {
						$('.scroll-to-top').fadeIn(duration);
					} else {
						$('.scroll-to-top').fadeOut(duration);
					}
				});
			}

			$('.scroll-to-top').click(function(e) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop : 0
				}, duration);
				return false;
			});
		},
		handleTooltips : function(el) {
			// global tooltips
			$('.tooltips', el).tooltip();
			
			for ( var p in portletTools) { // 方法
				$('.portlet > .portlet-title .' + p, el).tooltip({
					trigger : 'hover',
					placement:'auto top',
					container : 'body',
					title : portletTools[p].title
				});
			}
			
			me.handleImageExists();
		},
		destroyPortletTools:function(el){
			for ( var p in portletTools) { // 方法
				$('.portlet > .portlet-title .' + p, el).tooltip('destroy');
			}
			$('[role="tooltip"]').remove();
		},
		/**
		 * 处理图片异常的bug
		 */
		handleImageExists : function() {
			var t = document.getElementsByTagName("img");
			for (var i = 0; i < t.length; i++) {
				t.item(i).onerror = function() {
					this.src = __ctx + "/commons/image/default_use_image.jpg";
					this.onerror = null;
				};
			}
		},
		handleEvent : function() {
			var me = this;
			$(document).on('click', '.portlet a[data-event]', function(e) {
				var $this = $(this), event = $this.data('event');
				if (event == 'action') {
					DialogUtil.openFullWindow({
						title : $this.data('title') ? $this.data('title') : false,
						maxmin: $this.data('maxmin') ? $this.data('maxmin'):false,
						content : $this.data('url'),
						callback:function(rtn){
							me.reload($this);
							//刷新指定栏目
							me.reloadTemplate("dashboard");
						}
					});
				}
				
			});
		},
		

		handleTab : function() {
			$(document).on('click','a[data-toggle="tab"]',function(e) {
				e.preventDefault();
				var $this = $(this), 
					  $box = $this
						.closest('.portlet'),
					templateParams = me._defaults.templateParams,
					params = $box.attr(templateParams), 
					alias = $this.attr("data-alias"),
					dataParam = $this.attr("data-param");
				params = eval("(" + params + ")");
				if (!params)
					return;
				params[dataParam] = alias;
				// 分页的处理
				if (!me.isEmpty(params.currentPage))
					params.currentPage = 1;

				$box.attr(templateParams, JSON
						.stringify(params));

				// 打开那个tab
				$(this).tab('show');
			});
		},
		handeList : function() {
			$(document).on('click','[data-toggle="list"]',function(e) {
				e.preventDefault();
				var $this = $(this), url = $this.data("url"),
				// 显示方式;tab:新的tab，dialog：弹窗窗口
				show = $this.data("show");
				if (me.isEmpty(url))
					return;
				if (me.isEmpty(show) || show == 'tab') { // 新增tab
					me.addToLeftTab({
						url : url,
						txt : $this.data("txt"),
						id : $this.data("id"),
						icon : __ctx + $this.attr("data-icon"),
						isLastParent : 1,
						alias : $this.data("data-alias")
					});
				} else if (show == 'dialog') { // 弹出窗口·
					DialogUtil.open({
						content : __ctx + url,
						height : $this.attr("height") ? $this
								.attr("height") : 450,
						width : $this.attr("width") ? $this
								.attr("width") : 600,
						title : $this.attr("title") ? $this
								.attr("title") : ''
					})
				}
			});
		},
		getParamsExt : function($box, $this, $action) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			var templateParams = me._defaults.templateParams, params = $box
					.attr(templateParams)
			val = $this.attr("data-value");
			params = eval("(" + params + ")");
			params[$action] = val;
			$box.attr(templateParams, JSON.stringify(params));
			me.blockUI({
				target : $box
			});
			window.setTimeout(function() {
				me.parserTemplate($box);
			}, 100);
		},
		/**
		 * 获取模版参数
		 */
		getTemplateParams : function($box) {
			var templateParams = me._defaults.templateParams, params = $box
					.attr(templateParams);
			if (!params) {
				DialogUtil.msg("请配置参数。");
				return;
			} else {
				return eval("(" + params + ")");
			}
		},
		firstPage : function($box) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			me.handerPage($box, 1);
		},
		prevPage : function($box) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			var currentPage = params.currentPage;
			if (currentPage <= 1)
				return;
			me.handerPage($box, currentPage - 1);

		},
		nextPage : function($box) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			var currentPage = params.currentPage, totalPage = params.totalPage;

			if (currentPage >= totalPage)
				return;
			me.handerPage($box, currentPage + 1);
		},
		lastPage : function($box) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			me.handerPage($box, params.totalPage);
		},
		pageSize : function($box, $this) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			me.handerPage($box, 1, $this.html());
		},
		/**
		 * 处理分页
		 * @param $box
		 * @param currentPage 当前页
		 * @param pageSize 
		 */
		handerPage : function($box, currentPage, pageSize) {
			var params = me.getTemplateParams($box);
			if (!params)
				return;
			params.currentPage = currentPage;
			if (pageSize)
				params.pageSize = pageSize;
			$box.attr(templateParams, JSON.stringify(params));
			me.blockUI({
				target : $box
			});
			
			window.setTimeout(function() {
				me.parserTemplate($box);
			}, 100);
		},
		/**
		 * 处理收起、展开
		 */
		toggle : function($this) {
			var el = $this.closest(".portlet").children(".portlet-body");
			if ($this.hasClass("collapse")) {
				$this.removeClass("collapse").addClass("expand");
				el.slideUp(200);
			} else {
				$this.removeClass("expand").addClass("collapse");
				el.slideDown(200);
			}
		},
		/**
		 * 刷新指定模版
		 */
		reloadTemplate : function(key) {
			var  el = $("body").find("[" + me._defaults.templateAliasKey + "='"+key+"']");
			if (el.length > 0) {
				me.blockUI({
					target : el
				});
				window.setTimeout(function() {
					me.parserTemplate(el);
					me.unblockUI(el);
				}, 100);
			}
		},
		/**
		 * 处理刷新
		 */
		reload : function($this) {
			var el = $this.parents(".portlet");
			me.blockUI({
				target : el
			});
			var alias = el.parent().find("[" + me._defaults.templateAliasKey + "]");
			if (alias.length > 0) {
				window.setTimeout(function() {
					me.parserTemplate(el);
				}, 100);
				
				this.destroyPortletTools(el);
			} else {
				me.unblockUI(el);
			}
		},
		/**
		 * 处理更多
		 */
		more : function($this) {
			var url = $this.attr('data-url');
			me.addTab(url);
		},
		/**
		 * 关闭
		 */
		close : function($box) {
			var closeSpeed = 300;
			$box.fadeOut(closeSpeed, function() {
				$box.remove();
			});
		},
		/**
		 * 全屏
		 */
		fullscreen : function($this) {
			var portlet = $this.closest(".portlet");
			if (portlet.length <= 0) {
				return;
			}

			if (portlet.hasClass('portlet-fullscreen')) {
				$this.removeClass('on');
				portlet.removeClass('portlet-fullscreen');
				$('body').removeClass('page-portlet-fullscreen');
				portlet.children('.portlet-body').css('height', 'auto');
				if (portlet.find('[data-height]').length > 0)
					portlet.find('[data-height]').css('height',
							portlet.find('[data-height]').data("height"));
			} else {
				var height = me.getViewPort().height
						- portlet.children('.portlet-title').outerHeight()
						- parseInt(portlet.children('.portlet-body').css(
								'padding-top'))
						- parseInt(portlet.children('.portlet-body').css(
								'padding-bottom'));

				$this.addClass('on');
				portlet.addClass('portlet-fullscreen');
				$('body').addClass('page-portlet-fullscreen');
				portlet.children('.portlet-body').css('height', height);
				portlet.find('[data-height]').css('height', height - 50);
			}
			$(window).resize();
		},
		getViewPort : function() {
			var e = window, a = 'inner';
			if (!('innerWidth' in window)) {
				a = 'client';
				e = document.documentElement || document.body;
			}

			return {
				width : e[a + 'Width'],
				height : e[a + 'Height']
			};
		},
		addTab : function(url) {
			if (!url || url == "")
				return;
			$.post(__ctx + "/platform/auth/resources/getByUrl.htm?url=" + url,
					function(data) {
						if (data == null | data == "") {
							DialogUtil.msg("更多路径配置有误");
						} else {
							me.addToTab(data);
						}
					});
		},
		// 添加到tab或者刷新
		addToTab : function(data) {
			me.getParent().mainPlugin.addTab({
				id : data.alias,
				title : data.name,
				url : data.defaultUrl,
				icon : data.icon
			});
		},
		// 找到最顶层窗口
		getParent : function(w) {
			var win = w ? w : window;
			if (win.parent != win) // 找到最顶层窗口
				return this.getParent(win.parent);
			return win;
		},
		isEmpty : function(v, allowBlank) {
			return v === null || v === undefined
					|| (!allowBlank ? v === '' : false);
		},
		getGlobalImgPath : function() {
			return  __ctx+"/";
		},
		// wrApper function to block element(indicate loading)
		blockUI : function(options) {
			options = $.extend(true, {
				animate : true
			}, options);
			var html = '';
			if (options.animate) {
				html = '<div class="loading-message '
						+ (options.boxed ? 'loading-message-boxed' : '')
						+ '">'
						+ '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'
						+ '</div>';
			} else if (options.iconOnly) {
				html = '<div class="loading-message '
						+ (options.boxed ? 'loading-message-boxed' : '')
						+ '"><img src="' + this.getGlobalImgPath()
						+ 'loading-spinner-grey.gif" align=""></div>';
			} else if (options.textOnly) {
				html = '<div class="loading-message '
						+ (options.boxed ? 'loading-message-boxed' : '')
						+ '"><span>&nbsp;&nbsp;'
						+ (options.message ? options.message : '加载中...')
						+ '</span></div>';
			} else {
				html = '<div class="loading-message '
						+ (options.boxed ? 'loading-message-boxed' : '')
						+ '"><img src="'
						+ this.getGlobalImgPath()
						+ 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;'
						+ (options.message ? options.message : 'LOADING...')
						+ '</span></div>';
			}

			if (options.target) { // element blocking
				var el = $(options.target);
				if (el.height() <= ($(window).height())) {
					options.cenrerY = true;
				}
				el.block({
							message : html,
							baseZ : options.zIndex ? options.zIndex : 1000,
							centerY : options.cenrerY !== undefined ? options.cenrerY
									: false,
							css : {
								top : '10%',
								border : '0',
								padding : '0',
								backgroundColor : 'none'
							},
							overlayCSS : {
								backgroundColor : options.overlayColor ? options.overlayColor
										: '#555',
								opacity : options.boxed ? 0.05 : 0.1,
								cursor : 'wait'
							}
						});
			} else { // page blocking
				$.blockUI({
							message : html,
							baseZ : options.zIndex ? options.zIndex : 1000,
							css : {
								border : '0',
								padding : '0',
								backgroundColor : 'none'
							},
							overlayCSS : {
								backgroundColor : options.overlayColor ? options.overlayColor
										: '#555',
								opacity : options.boxed ? 0.05 : 0.1,
								cursor : 'wait'
							}
						});
			}

		},
		// wrapper function to un-block element(finish loading)
		unblockUI : function(target) {
			if (target) {
				$(target).unblock({
					onUnblock : function() {
						$(target).css('position', '');
						$(target).css('zoom', '');
					}
				});
			} else {
				$.unblockUI();
			}
		},
		handleCounterup : function(el) {
			if (!$().counterUp)
				return;
			$("[data-counter='counterup']", el).counterUp({
				delay : 10,
				time : 1000
			});
		},
		/**
		 * 走马灯效果
		 */
		handleCarousel : function(conf) {
			if (!jQuery().carouFredSel)
				return;
			var div = conf.div, data = conf.data ? conf.data : [], height = conf.height ? conf.height
					: me._defaults.defHeight, carouFredSel = $('.portlet-list',
					div);
			if (carouFredSel.length <= 0) {
				me.initUIEvent(div);
				return;
			}

			// Basic carousel, no options
			carouFredSel
					.each(function() {
						var self = $(this), direction = self
								.attr("data-direction") ? self
								.attr("data-direction") : 'up', // 滚动方向 left
																// right down up
						duration = self.attr("data-duration") ? self
								.attr("data-duration") : 500, // 持续时间
						easing = self.attr("data-easing") ? self
								.attr("data-easing") : 'swing', // 展示效果swing（摆动）、linear、
																// cubic、quadratic
						pauseOnHover = self.attr("data-pauseOnHover") ? self
								.attr("data-pauseOnHover") : true;// 是否鼠标停止

						self.carouFredSel({
							direction : direction,
							height : height - 20,
							scroll : {
								easing : easing,
								duration : duration,
								pauseOnHover : pauseOnHover
							}
						});
					});

		},
		/**
		 * 处理幻灯片效果
		 */
		handleLayerslider : function(conf) {
			if (!jQuery().layerSlider)
				return;
			var div = conf.div, data = conf.data ? conf.data : [], height = conf.height ? conf.height
					: me._defaults.defHeight, layerslider = $(
					'.portlet-layerslider', div);
			if (layerslider.length <= 0)
				return;

			layerslider
					.each(function() {
						var self = $(this), width = self.width() > 0 ? self
								.width() : me._defaults.defHeight, skin = self
								.attr("data-skin") ? self.attr("data-skin")
								: 'fullwidth', thumbnailNavigation = self
								.attr("data-thumbnailNavigation") ? self
								.attr("data-thumbnailNavigation") : 'hover', hoverPrevNext = self
								.attr("data-hoverPrevNext") ? self
								.attr("data-hoverPrevNext") : false, responsive = self
								.attr("data-responsive") ? self
								.attr("data-responsive") : false, responsiveUnder = self
								.attr("data-responsiveUnder") ? self
								.attr("data-responsiveUnder") : width;
						layersContainer = self.attr("data-layersContainer") ? self
								.attr("data-layersContainer")
								: width;

						self
								.layerSlider({
									skinsPath : __ctx
											+ '/styles/commons/css/slider-layer-slider/skins/',
									skin : skin,
									thumbnailNavigation : thumbnailNavigation,
									hoverPrevNext : hoverPrevNext,
									responsive : responsive,
									responsiveUnder : responsiveUnder,
									layersContainer : layersContainer
								});
					});

		},
		/**
		 * 处理列表数据滚动
		 */
		handleSlimScrolls : function(el) {
			if (!jQuery().slimScroll)
				return;

			$('.portlet-scroller', el).each(function() {
					var self = $(this), height = self
							.attr("data-height");
					self.slimScroll({
								size : '7px',
								color : '#a1b2bd',
								height : height ? height
										: (me._defaults.defHeight + 'px'),
								alwaysVisible : (self
										.attr("data-always-visible") == "1" ? true
										: false),
								railVisible : (self
										.attr("data-rail-visible") == "1" ? true
										: false),
								railOpacity : 0.1,
								disableFadeOut : true
							});
				});
		},
		/**
		 * 处理仪表盘
		 */
		handleDashboard : function(el) {
			$('.dashboard[data-url]', el).on("click", function() {
				var self = $(this), url = self.attr("data-url");
				me.addTab(url);
			});
		},
		/**
		 * 处理饼图
		 */
		handlePieChar : function(el) {
			if (!jQuery().easyPieChart)
				return;
			$('.easy-pie-chart.percentage', el)
					.each(
							function() {
								var self = $(this), $box = self
										.closest('.dashboard'), barColor = self
										.data('color')
										|| (!$box.hasClass('dashboard-dark') ? $box
												.css('color')
												: 'rgba(255,255,255,0.95)'), trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)'
										: '#E2E2E2', size = parseInt(self
										.data('size')) || 50;
								self.easyPieChart({
									barColor : barColor,
									trackColor : trackColor,
									scaleColor : false,
									lineCap : 'butt',
									lineWidth : parseInt(size / 10),
									animate : /msie\s*(8|7|6)/
											.test(navigator.userAgent
													.toLowerCase()) ? false
											: 1000,
									size : size
								});
							});
		},
		/**
		 * 处理仪表盘的图表
		 */
		handleSparkline : function(el) {
			if (!jQuery().sparkline)
				return;
			$('.sparkline', el)
					.each(
							function() {
								var self = $(this), $box = self
										.closest('.dashboard'), barColor = !$box
										.hasClass('infobox-dark') ? $box
										.css('color') : '#FFF', type = self
										.attr("data-type") ? $(this).attr(
										"data-type") : 'bar';
								$(this).sparkline('html', {
									tagValuesAttribute : 'data-values',
									type : type,
									barColor : barColor,
									chartRangeMin : $(this).data('min') || 0
								});
							});
		},
		/**
		 * 处理日历
		 */
		handleCalendar : function(option) {
			if (!jQuery().fullCalendar)
				return;
			var el = option.el, data = option.data ? option.data : [], height = option.height ? option.height
					: me._defaults.defHeight, calendar = $('.portlet-calendar',
					el);
			if (calendar.length <= 0)
				return;
			calendar.fullCalendar('destroy');// destroy the calendar
			calendar
					.fullCalendar({
						header : {
							left : 'title',
							center : '',
							right : 'prev,next,today,month,agendaWeek,agendaDay,listWeek'
						},
						height : height,
						selectable : true,
						selectHelper : true,
						editable : false,
						eventLimit : true, // 更多
						views : {
							month : {
								eventLimit : 5
							},
							agendaWeek : {
								eventLimit : 5
							},
							agendaDay : {
								eventLimit : 5
							}
						},
						eventClick : function(calEvent, jsEvent, view) {
							if (calEvent.eventClick) {
								calEvent.eventClick.call(this, calEvent,
										jsEvent, view);
							}
						},
						events : data
					});
			me.handleCalendarClick(calendar, option);
		},
		handleCalendarClick : function(calendar, option) {
			var el = option.el, alias = option.alias;
			$('.fc-prev-button,.fc-next-button,fc-today-button,.fc-month-button,.fc-month-button,.fc-agendaWeek-button,.fc-agendaDay-button',
					calendar).click(
					function() {
						var v = calendar.fullCalendar('getView')
						params = {
							startTime : v.start.format("YYYY-MM-DD"),
							endTime : v.end.format("YYYY-MM-DD"),
							mode : v.type
						};
						me.getOptionData({
							el : el,
							alias : alias,
							params : JSON.stringify(params),
							callback : function(data) {
								calendar.fullCalendar('removeEvents');
								calendar.fullCalendar("addEventSource",
										eval('(' + data + ')'));
							}
						});
					});
		},
		/**
		 * el:要操作的模块 alias：别名 params：可以为空，如果不为空，请传json字符串
		 * 
		 */
		getOptionData : function(option) {
			var el = option.el;
			me.blockUI({
				target : el
			});
			$.ajax({
				type : "POST",
				url : __ctx + "/platform/desktop/desktopColumn/getOptionData.htm",
				data : {
					params : option.params ? option.params : '',
					alias : option.alias
				},
				dataType : "json",
				success : function(data) {
					me.unblockUI(el);
					if(data == "")
						DialogUtil.msg("获取数据异常,请联系管理员");
					else
					  option.callback(data);
				},
				error : function(e) {
					me.unblockUI(el);
				}
			});
		},
		/**
		 * 处理图表
		 */
		handleChart : function(conf) {
			var div = conf.div, data = conf.data, chartBody = div
					.find(".portlet-chart");// 对图表布局class标签写死
			if (me.isEmpty(chartBody))// 如果没有自己解析图表
				return;
			chartBody.css("height", chartBody.data("height") ? chartBody
					.data("height") : this._defaults.defHeight)
			var myChart = echarts.init(chartBody.get(0), 'shine');
			// 为echarts对象加载数据
			myChart.setOption(data);
			// 解决自适应的bug
			$(window).on("resize", function() {
				myChart.resize();
			});
			me.handleTooltips(div);
		},
		/**
		 * 处理树形
		 * 
		 * @param conf
		 */
		handleTree : function(conf) {
			var div = conf.div, data = conf.data, height = conf.height ? conf.height
					: me._defaults.defHeight, treeBody = div
					.find(".portlet-tree");
			if (me.isEmpty(treeBody))// 如果没有自己解析图表
				return;
			var tree = $.fn.zTree.init(treeBody, {
				view : {
					showLine : false,
					showIcon : false,
					selectedMulti : false
				},
				data : {
					simpleData : {
						enable : true
					}
				},
				callback : {
					onClick : function(event, treeId, treeNode) {
						if (treeNode.defaultUrl) {
							me.addToLeftTabTree(treeNode,
									treeNode.parentResource);
						} else {
							if (treeNode.open) {
								tree.expandNode(treeNode, false);
							} else {
								tree.expandNode(treeNode, true);
							}
						}
					}
				}
			}, data);
			this.handleSlimScrolls(div);
		},
		/**
		 * 定时刷新页面
		 */
		timingRefreshPage : function(el, delaytime) {
			window.setTimeout(function() {
				me.blockUI({
					target : el
				});
				me.parserTemplate(el);
			}, delaytime ? delaytime : 3000);
		},
		// 解析模版
		parserTemplate : function(el, callback) {
			var self = $(el), 
				isFullscreen = self.hasClass("portlet-fullscreen"),
				alias = self.attr(me._defaults.templateAliasKey), 
				params = self.attr(me._defaults.templateParams),
				div = $("<div></div>");
			me.blockUI({
				target : el
			});
			if (!alias) {
				me.unblockUI(el);
				return;
			}
			$.ajax({
				type : "POST",
				url : __ctx + "/platform/desktop/desktopColumn/getData.htm",
				data : {
					params : params ? params : '',
					alias : alias
				},
				success : function(data) {
					me.unblockUI(el);
					if (me.isEmpty(data)){
						return;
					}
					var rtn = eval('(' + data + ')'), 
						templateHtml = rtn.html, // 模版html
						type = rtn.type, // 栏目类型
						isRefresh = rtn.isRefresh, // 是否刷新
						refreshTime = rtn.refreshTime, // 刷新时间
						delayTime = refreshTime ? refreshTime : 5,
						show = rtn.show, 	// 展示效果。1、默认效果，走马灯
						height = rtn.height,// 高度
						disable = rtn.enabled== 'N'?true:false;//是否禁用
					// 判断div的父类是否有元素，刷新时候可以刷新这个父类
					
					var parent = self.parent();
					if (parent.hasClass('parent-template-class')) {
						div = parent;
					} else {
						div.addClass("parent-template-class");
						self.after(div);
					}
					self.remove();
					div.append(templateHtml);// 把当前页替换成模版的页面
					if(callback){
						callback({
							success:true,
							$el:div,
							disable:disable
						});
					}
					if(disable){
						return;
					}
				
					if (type == 1) {// 图表方式
						me.handleChart({
							div : div,
							data : rtn.option,
							height : height
						});
					} else if (type == 2) {// 日历方式
						me.handleCalendar({
							alias:alias,
							params:params,
							el : div,
							data : rtn.option,
							height : height
						});
					} else if (type == 4) {// 树形方式
						me.handleTree({
							div : div,
							data : rtn.option,
							height : height
						});
					} else {// 默认方式
						if (show != 1) // 除了走马灯外其他方式
							me.initUIEvent(div);
					}

					// 0、默认；1、走马灯、2、幻灯片
					if (show && show == 1) {// 1、走马灯
						me.handleCarousel({
							div : div,
							data : rtn.option,
							height : height
						});
					} else if (show && show == 2) {// 幻灯片
						me.handleLayerslider({
							div : div,
							data : rtn.option,
							height : height
						});
					}

					if (isFullscreen) {// 刷新还原
						me.fullscreen(div.find(".fullscreen"));
					}
					// 处理刷新 页面关闭或者隐藏
					if (isRefresh && isRefresh == 1)
						me.timingRefreshPage(div.children().first(),
								delayTime * 1000);
				},
				error : function(data) {
					me.unblockUI(el);
				}
			});

		},
		getColumnGrid:function(column){
			var dataGrid = column.data("grid");
			if(	$.isNotEmpty(dataGrid)){
				return dataGrid;
			}else{
				var clz = column.attr("class");
				var col =  clz.match(/col-([a-zA-z]+)-\d+/g);
				var grid = parseInt(col[0].split("-")[2],10);
				column.data("grid",grid);
				 return grid;
			}
		},
		handleDisableColumn:function($el){
			var column = $el.closest(".column");
			column.hide();
			var curGrid = me.getColumnGrid(column);
			if(curGrid  == 12)
				return;
			var sibs = column.siblings(".column");
			//判断旁边的栏目是否隐藏
			var hideGrid  = curGrid,showGirdLength = 0;
			sibs.each(function(j,c){
				var cel = $(c);
				if(cel	.is(':hidden')){
					hideGrid += me.getColumnGrid(cel);
				}else{
					showGirdLength ++;
				}
			});	
			hideGrid = hideGrid/showGirdLength;
			
			sibs.each(function(j,c){
				var cel = $(c),g = me.getColumnGrid(cel);
				if(!cel.is(':hidden')){
					 cel.css('width', (100*(g+hideGrid)/12) + '%');
				}
			});	
		},
		parser : function() {
			var desktopPageTemplate = $('.desktop-page').find(
					"[" + me._defaults.templateAliasKey + "]"),
					data = {};
					len = desktopPageTemplate.length,
					j = 0;
			if (len <= 0)
				return;
	
			desktopPageTemplate.each(function(i, n) {
				$(n).addClass("desktop-border");
				me.parserTemplate(n, function(r) {
					var $el = r.$el;
					$el.removeClass("desktop-border");
					if(r.disable &&  me._defaults.disableStye=='hideAdaption'){
						me.handleDisableColumn($el);
					}else if(r.disable &&  me._defaults.disableStye=='hide'){
						$el.closest(".column").hide();
					}
				});
			});
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

$(document).ready(function() {
	$('body').desktopPage();
});

jQuery(window).load(function() {
	desktopPagePlugin.initUIEvent($('body'));
});