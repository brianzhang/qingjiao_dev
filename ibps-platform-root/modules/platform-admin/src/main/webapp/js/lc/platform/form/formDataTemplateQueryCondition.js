$(function() {
	formDataTemplateQueryCondition.init();
});


var formDataTemplateQueryCondition = {

	init : function() {
		this.label = $("#label");
		this.name = $("#name");
		this.defaultValueType = $("#defaultValueType");
		this.defaultValue = $("#defaultValue");
		this.rightsDiv = $("#rightsDiv");
		this.rights = $("#rights");
		
		this.common = $("#common");

		this.initData();
		this.bindDefaultValueType();
		this.bindSettingRights();
	},
	initData : function() {
		this.data = frameElement.dialog.params.data;
		this.field = frameElement.dialog.params.field;
		
		this.common.val(this.data.common?this.data.common:'Y');
		
		this.label.val(this.data.label);
		
		this.defaultValueType.val(this.data.default_value_type);
		this.defaultValue.val(this.data.default_value);
		RightsSetting.init (this.rights,this.rightsDiv);
		RightsSetting.setRights(	this.data.rights);
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
	bindDefaultValueType : function() {
		var _this = this;
		$(document).on("click", ".defaultValueType", function() {
			var self = $(this),type = self.data("type"), origType = _this.defaultValueType.val(),text =self.html();
			if (origType == type)
				return;
			_this.defaultValueType.val(type);
			$("#defaultValueTypeSpan").html(text);
		});
	},
	getData : function() {
		this.data = {
			label : this.label.val(),
			name : this.data.name,
			common:this.common.val(),
			field_type : this.data.field_type,
			default_value_type : this.defaultValueType.val(),
			default_value : this.defaultValue.val(),
			rights : JSON.parse(this.rights.val())
		};

		return this.data;
	}
};