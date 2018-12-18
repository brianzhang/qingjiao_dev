
(function(){
	var defaults = {
			title:'套红模板选择框',
			url:__ctx+'/platform/office/template/get.htm',
			isSingle:true, //是否单选
			isObj:false//是否返回对象
	};
	
	OfficeTemplateDialog = function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	OfficeTemplateDialog.prototype = {

			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options=me.options,
					url = options.url;
				DialogUtil.dialog({
					title:options.title,
					content:url,
					params: options,
					area:['60%','80%'],
					 btn:[{
			            	label: '选择',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).officeTemplateSelect.getData();
			              	  if($.isEmpty(data)){
			              		  DialogUtil.toastr("请选择！");
			              		  return;
			              	  }
			              	  if(!options.callback){
			              		 DialogUtil.toastr("传入参数必须包含【callback】");
			              		 return;
			              	  }
			              	  if(options.isObj){
			              		options.callback(data);
			              	  }
			              	  DialogUtil.close(index);
			                }
			            },
			            {
			            	label: '清空',
			            	iconCls:'btn btn-success fa fa-clean',
			                action: function(dialog,index) {
			                	var  data = DialogUtil.getChildFrameWindow(index).officeTemplateSelect.getData();
			                	if($.isEmpty(data)){
				              		  return;
				              	}
			                	$.each(data, function(i, content) {
			                		DialogUtil.getChildFrameWindow(index).officeTemplateSelect.remove(content.id,content.account);
			                	});
			                	DialogUtil.getChildFrameWindow(index).officeTemplateSelect.clearSelect();
			                }
			            },  {
			            	label: '取消',
			            	iconCls:'btn btn-danger fa fa-cancel',
			                action: function(dialog,index) {
			                	DialogUtil.close(index);
			                }
			            }]
				});
			}
		
	};
	
})();
