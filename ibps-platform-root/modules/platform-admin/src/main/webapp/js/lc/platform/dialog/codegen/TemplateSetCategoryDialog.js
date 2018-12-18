/**
 *重置模板分类  
 *	@param conf 
 *			{single:true,callback:function(){}}
 *		 其中：single{true:false}
**/
var TemplateSetCategoryDialog=function (conf){
	var dialog=null,
		me = this;
	this.show=function(){
		dialog=DialogUtil.dialog({
			title:'重置模板分类',
			params: '',
			content:__ctx+'/platform/codegen/template/setCategoryDialog.htm',
		    area: ['40%', '40%'],
		    btn:[{
		    	label: '选择',
            	iconCls:'btn btn-primary fa fa-ok',
                action: function(dialog,index) {
					    var win=dialog.innerWin;
						var records = DialogUtil.getChildFrameWindow(index).templateSetCategoryDialog.getData();
						if($.isEmpty(records)) {
							DialogUtil.toastr('请选择分类');
							return;
						}
						if(conf.callback){
							conf.callback(records,dialog);
							DialogUtil.close(index);
						}else{
							DialogUtil.close(index);
						}
				}
			},{
            	label: '取消',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
		});
		
		return dialog;
	};
	
	$.extend({}, conf);
	
	this.closeDialog = function(){
		dialog.dialog('close');
	};
	return this;
};
	
