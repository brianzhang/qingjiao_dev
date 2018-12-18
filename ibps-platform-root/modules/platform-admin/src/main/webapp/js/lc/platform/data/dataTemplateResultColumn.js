$(function() {
	dataTemplateResultColumn.init();
});

function getData(){
	return dataTemplateResultColumn.getData();
}


var dataTemplateResultColumn = {

	init : function() {
		this.label = $("#label");
		this.name = $("#name");
		
		this.same =  $("#same");
		
		this.fieldType = $("#fieldType");
		
		
		FieldTypeSetting.init();
		this.initData();
	},
	initData : function() {
		this.data = frameElement.dialog.params.data;
		this.field = frameElement.dialog.params.field;
		
		this.label.val(this.data.label);
		this.name.val(this.data.name);
		
		
		var same = this.data.same?this.data.same:'Y';
		
		this.same.val(same).trigger("change");
		
		if(same == 'N')
			FieldTypeSetting.setData(this.data,this.field);	
		
	},

	getData : function() {
		var same = this.same.val(),
			fieldType = same == 'Y'?null: this.fieldType.val();
		this.data = {
			label : this.label.val(),
			name : this.name.val(),
			same:same,
			field_type:fieldType
		};
		var fieldOptions= FieldTypeSetting.getFieldOptions(fieldType);
		if($.isNotEmpty(fieldOptions))
			this.data["field_options"] = fieldOptions;

		return this.data;
	}
};