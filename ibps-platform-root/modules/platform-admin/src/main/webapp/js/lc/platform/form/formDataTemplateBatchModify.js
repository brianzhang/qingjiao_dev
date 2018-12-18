
/**
 * 批量编辑
 */
$(function() {
	formDataTemplateBatchModify.init();
});

function saveData(){
	
}

var formDataTemplateBatchModify = {

	init : function() {

		this.initData();
	},
	initData : function() {
		this.data = frameElement.dialog.params;
		var id = this.data.id;
		
		var fields = this.data.fields;
		this.initFields(fields);
	},
	initFields:function(fields){
		var options  = [];
		$.each(fields,function(i,field){
			options.push("<option value='"+field.name+"'   data-type='"+field.field_type+"'>"+field.label+"</option>");
		});
		
		$("#batchEditFld").append(options.join("")).on("change",function(){
			var type =$(this).find("option:selected").data("type");
			$("#batchEditVal").empty();
			$("#batchEditVal").append('<input type="text" class="form-control">');
		});
	}
};