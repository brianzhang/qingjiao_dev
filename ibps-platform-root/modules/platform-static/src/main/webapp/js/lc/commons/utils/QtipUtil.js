/**
 * 
 * 提示帮助类
 *  Copyright 2011-2017 lc, Inc.
 *  作者：hugh zhuang 
 *  邮箱:zhuangxh@bpmhome.cnm
 * 日期:2017-10-20-上午11:15:52
 *  版权：广州流辰信息技术有限公司版权所有
 */
QtipUtils = {
	// 提示
	qtip : function($thisEl) {
		var defaultSetting = {
			position : {
				viewport : $(window),
				adjust : {
					mouse : true
				},
				my : 'top center',
				at : 'bottom center'
			},
			hide : {
				event : 'mouseleave',
				leave : false,
				fixed : true,
				delay : 100
			},
			style : {
				classes : 'qtip-default  qtip qtip-bootstrap qtip-shadow'
			}
		}, options = {};

		$('[data-tip]', $thisEl).each(function() {
			var $el = $(this);
			options = {
				content : {
					title : $el.data("title"),
					text : $el.data("text")
				}
			};
			$el.qtip($.extend({}, defaultSetting, options));
		});
	}
};