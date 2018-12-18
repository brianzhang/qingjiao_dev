/**
 * 数据模版预览
 */

$(function() {
	var loading1 = DialogUtil.load("加载中！"),isPreview=false;
	try {
	var data = {}, fields = {}, id = $("#id").val(),params={},isSingle= false,shows;
	if (id != "") {
		data = JSON.parse($("#data").val());
		fields = data.datasets;
	} else {
		if (frameElement) {
			var dialogParams =  $.extend({},frameElement.dialog.params);
			isSingle  =dialogParams.isSingle;
			data = dialogParams.data||{};
			fields = dialogParams.fields;
			params = dialogParams.params;
			shows = dialogParams.shows;
		}
	}
	
	data.response = {};

	/*if (console) {
		console.info(formData);
	}*/


		window.DTR= new DataTemplateRenderer($.extend(data, {
			isSingle:isSingle,
			fields :fields,
			shows:shows,
			params:params,
			onReady : function() {
			    setTimeout(function(){
			    	DialogUtil.close(loading1);
			    },100);
			}
		}));
	} catch (e) {
		DialogUtil.close(loading1);
		$.console().info(e);
	}


});
