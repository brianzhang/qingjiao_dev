/**
 * 数据模版预览
 */

$(function() {
	var loading1 = DialogUtil.load("加载中！"),isPreview=false;
	var data = {}, formData = {}, id = $("#id").val();
	if (id != "") {
		data = JSON.parse($("#data").val());
		formData = JSON.parse($("#formData").val());
		data.pk = $("#pk").val();
	} else {
		if (frameElement) {
			//DialogUtil.msg("直接预览是没有权限控制！");
			params = _.clone(frameElement.dialog.params);
			data = params.data;
			formData = params.formData;
			data.pk =  params.pk;
		}
	}
	data.response = {};

	/*if (console) {
		console.info(formData);
	}*/

	try {
		var fr = new TemplateRenderer($.extend(data, {
			fields : formData ? formData.fields : null,
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
