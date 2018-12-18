$(function() {

	formDataTemplateDisplayColumn.init();
});

function getData(){
	return formDataTemplateDisplayColumn.getData();
}


var formDataTemplateDisplayColumn = {

	init : function() {
		this.label = $("#label");
		this.name = $("#name");
		this.field_type = $("#field_type");
		this.rightsDiv = $("#rightsDiv");
		this.rights = $("#rights");
		this.align = $("#align");
		
		this.bindDatefmtType();
		this.initData();
		this.bindSettingRights();
	},
    DATE_FORMATS:{
  	  "date":"yyyy-MM-dd",
	  "datetime":"yyyy-MM-dd HH:mm:ss",
	  "time":"HH:mm:ss"
    },
	initData : function() {
		this.data = frameElement.dialog.params.data;
		this.field = frameElement.dialog.params.field;
		
		this.label.val(this.data.label);
		this.name.val(this.data.name);
		
		this.align.val(this.data.align?this.data.align:'left');
		
		this.initDataFormat();
		
		RightsSetting.init (this.rights,this.rightsDiv);
		RightsSetting.setRights($.isEmpty(this.data.rights) ? [ {type : "all"} ] : this.data.rights);
	},
	initDataFormat:function(){
		var field_type = this.field.field_type;
		if(field_type =='datePicker'){
			var  formatType =  this.field["field_options"]["datefmt_type"];
			if(!formatType)
				return;
			$("#datefmtGroup").removeClass("hidden");
			$("#datefmtType").val(formatType).trigger("change");
			var datefmt = this.data.field_options["datefmt"]? this.data.field_options["datefmt"]:this.field["field_options"]["datefmt"]
			$("#datefmt").val(datefmt);
		}

	},
	bindDatefmtType:function(){
		var _this = this;
		$(document).on("change","#datefmtType",function() {
		      var $el = $(this),val =$el.val();
		        if(val =='custom' ){
		        	$("#datefmt").removeClass("hidden");
		          	$("#datefmt").val("");
		        }else{// 自定义的
		        	$("#datefmt").addClass("hidden");
		          	$("#datefmt").val(	_this.DATE_FORMATS[val]);
		        }
		});
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
		this.data = {
			label : this.label.val(),
			name : this.name.val(),
			align : 	this.align.val(),
			field_type:this.field_type.val(),
			field_options:this.data.field_options,
			rights : JSON.parse(this.rights.val())
		};
		
		if(this.field.field_type =='datePicker'){
			this.data.field_options["datefmt_type"]= $("#datefmtType").val();
			this.data.field_options["datefmt"]=$("#datefmt").val();
		}

		return this.data;
	}
};