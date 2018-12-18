$(function() {
	dataTemplateQueryColumn.init();
});

function getData(){
	return dataTemplateQueryColumn.getData();
}


var dataTemplateQueryColumn = {

	init : function() {
		this.label = $("#label");
		this.name = $("#name");
		
		this.same =  $("#same");
		
		this.fieldType = $("#fieldType");
		
		this.common =  $("#common");
		
		this.defaultValueType = $("#defaultValueType");
		this.defaultValue = $("#defaultValue");
		
		this.rightsDiv = $("#rightsDiv");
		this.rights = $("#rights");

		
		FieldTypeSetting.init();
		
	//	this.bindDefaultValueType();
		this.bindSettingRights();
		
		this.initData();
	},
	initData : function() {
		this.data = frameElement.dialog.params.data;
		this.field = frameElement.dialog.params.field;
		

		
		this.label.val(this.data.label);
		
		this.common.val(this.data.common?this.data.common:'Y');
		
		var same = this.data.same?this.data.same:'Y';
		
		this.same.val(same).trigger("change");
		
		if(same == 'N'){
			FieldTypeSetting.setData(this.data,	this.field );	
		}
		
		
		this.defaultValueType.val(this.data.default_value_type);
		this.defaultValue.val(this.data.default_value);
		
		RightsSetting.init (this.rights,this.rightsDiv);
		RightsSetting.setRights(	this.data.rights?this.data.rights:([{type : "all"}]));
	},

	bindSettingRights : function() {
		var _this = this;
		$(document).on("click","#settingRights",
				function() {
					var data = $.isEmpty(_this.rights.val()) ? {} : JSON
							.parse(_this.rights.val());
					new RightsDefDialog({
						data : data,
						title : '字段权限',
						key : 'formRights',
						callback : function(data) {
							RightsSetting.setRights(	data);
						}
					}).show();
				});
	},
	getData : function() {
		var same = this.same.val(),
			fieldType = same == 'Y'?null: this.fieldType.val();
		this.data = {
			label : this.label.val(),
			name : this.data.name,
			common:this.common.val(),
			same:this.same.val(),
			field_type : fieldType,
			default_value_type : this.defaultValueType.val(),
			default_value : this.defaultValue.val(),
			rights : JSON.parse(this.rights.val())
		};
		var fieldOptions= FieldTypeSetting.getFieldOptions(fieldType);
		if($.isNotEmpty(fieldOptions))
			this.data["field_options"] = fieldOptions;
		return this.data;
	}
};