/**
 * 页面信息提示
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-01-06-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	$('[data-tip]')	.each(function() {
		var  el =$(this),
		defaultSetting = {
				position : {
					my : 'top center',
					at : 'bottom center'
				},
				hide: {
					event:'mouseleave',
		        	leave: false,
		        	fixed:true,
		        	delay:100
		        },
				style: {
					classes: 'qtip-default  qtip qtip-bootstrap qtip-shadow'
			    }
			  };
		var option =  el.attr("data-tip"), options ;
		try {
			options = eval('(' + option + ')');
		} catch (e) {
			options = {};
		}
		var setting =  $.extend({}, defaultSetting, options);
		$(this).qtip(setting);
		});
	});