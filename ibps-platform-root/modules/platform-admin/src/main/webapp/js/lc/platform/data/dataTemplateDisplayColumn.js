$(function() {
	dataTemplateDisplayColumn.init();
});

function getData(){
	return dataTemplateDisplayColumn.getData();
}


var dataTemplateDisplayColumn = {

	init : function() {
		this.label = $("#label");
		this.name = $("#name");
		this.rightsDiv = $("#rightsDiv");
		this.rights = $("#rights");
		this.noRightStyle = $("#noRightStyle");
		
		this.sortable =  $("#sortable");
		this.align =  $("#align");
		this.fieldType = $("#fieldType");
		
		this.same =  $("#same");
		FieldTypeSetting.init();
		this.bindSettingRights();
		
		this.initData();
	},
    
	initData : function() {
		this.data = frameElement.dialog.params.data;
		this.field = frameElement.dialog.params.field;
		
		this.label.val(this.data.label);
		this.name.val(this.data.name);
		
		this.sortable.val(this.data.sortable?this.data.sortable:'Y');
		this.align.val(this.data.align?this.data.align:'left');
		
		var same = this.data.same?this.data.same:'Y';
		
		this.same.val(same).trigger("change");
		
		if(same == 'N')
			FieldTypeSetting.setData(this.data,this.field);	
		
		this.noRightStyle.val(this.data.noRightStyle);
	
		RightsSetting.init (this.rights,this.rightsDiv);
		RightsSetting.setRights($.isEmpty(this.data.rights) ? [ {type : "all"} ] : this.data.rights);
	},
	bindSettingRights : function() {
		var _this = this;
		$(document).on(
				"click",
				"#settingRights",
				function() {
					var data = $.isEmpty(_this.rights.val()) ? {} : JSON
							.parse(_this.rights.val());
					new RightsDefDialog({
						data : data,
						title : '字段权限',
						key : 'formRights',
						callback : function(data) {
							RightsSetting.setRights(data);
						}
					}).show();
				});
	},
	getData : function() {
		var same = this.same.val(),
			fieldType = same == 'Y'?null: this.fieldType.val();
		this.data = {
			label : this.label.val(),
			name : this.name.val(),
			sortable: this.sortable.val(),
			align : 	this.align.val(),
			same:same,
			noRightStyle:this.noRightStyle.val(),
			field_type:fieldType,
			rights : JSON.parse(this.rights.val())
		};
		
		var fieldOptions= FieldTypeSetting.getFieldOptions(fieldType);
		if($.isNotEmpty(fieldOptions))
			this.data["field_options"] = fieldOptions;

		return this.data;
	}
};