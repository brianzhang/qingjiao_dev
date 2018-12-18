$(function(){
		dataTemplateButton.init();
	});

function getData(){
	return dataTemplateButton.getData();
}

var dataTemplateButton = {
	DEFAULT_BUTTON:FormButtons.t.buttons,
	init:function(){
		
		var _this = this;
		
		this.label = $("#label");
		this.rightsDiv =$("#rightsDiv");
		this.rights = $("#rights");
		
		this.position = $("#position");
		this.style = $("#style");
		this.icon = $("#icon");
		this.code = $("#code");
		this.deflow = _this.deflow = $("#deflow");
		
		this.initData();
		this._initIcon()
		this.bindSettingRights();
		
		$(document).on("click","#deflowBtn",function() {
			new BpmDefinitionDialog({
				isSingle:true,
				callback : function(data,index) {
					_this.deflow.val(data[0].defKey);
					$("#deflowDiv").text(data[0].name);
					DialogUtil.close(index);
				}
			}).show();
		});
		
	},
	initData:function(){
		var 	params= frameElement.dialog.params,
				type,
				operationType;
		this.buttonTypeKey = params.buttonTypeKey?params.buttonTypeKey:'button_type';
		this.data = params.data;
		
		type = this.data[this.buttonTypeKey];
		operationType = params.operationType;
		this.settingRights =  $.isNotEmpty(params.settingRights)?params.settingRights:true;
		if(type == 'custom'){
			$("#codeDiv").show();
			this.code.val(this.data.code?this.data.code:'custom'+this.data.$index);
		}else{
			$("#codeDiv").hide();
			this.code.val("");
		}
		
		if(type == 'defStartFlow'){
			$(".deflow").show();
			this.deflow.val(this.data.deflow?this.data.deflow:'');
			$("#deflowDiv").text(this.data.deflowText);
		}
		
		this.label.val(this.data.label);
		
		this.position.val(this.data.position?this.data.position:"all");
		this.style.val(this.data.style?this.data.style:this.DEFAULT_BUTTON[type]["style"]);
		this.icon.val(this.data.icon?this.data.icon:this.DEFAULT_BUTTON[type]["icon"]);
		$('[data-icon="icp"]').addClass(	this.icon.val());
		
		if(this.settingRights){
			RightsSetting.init (this.rights,this.rightsDiv);
			RightsSetting.setRights($.isEmpty(this.data.rights)?[{type:"all"}]:this.data.rights);
		}else{
			$("#rightsGroupDiv").hide();
		}
		if( !this.hasSearchPosition(type)){
			$("#position").find("option[value='search']").remove(); 
		}
		if(operationType == 'dialog' ){
			$('#positionDiv').hide();
		}else if(operationType == 'function' && !this.hasManagePosition(type)){
			$("#position").find("option[value='manage']").remove(); 
		}
		else if(operationType == 'edit' && !this.hasEditPosition(type)){
			$("#position").find("option[value='detail']").remove(); 
		}
	},
	hasManagePosition:function(type){
		return  FormButtons.t.hasPermission(type,"manage");
	},
	hasEditPosition:function(type){
		return  FormButtons.t.hasPermission(type,"edit");
	},
	hasSearchPosition:function(type){
		return FormButtons.t.hasPermission(type,"search");
	},
	/**
	 * 选择对话框
	 */
	_initIcon: function() {
		var me =this;
	    $('.icp-dd').iconpicker({});
	    
	    $('.icp-dd').on('iconpickerSelected', function(e) {
	    	var val =e.iconpickerValue;
             if(val.match(/^fa-/)){
            	 val = 'fa '+val;
             }else{
            	 val = 'glyphicon '+val;
             }
             me.icon.val(val);
	    });
		
	},
	bindSettingRights:function(){
		var _this = this;
		$(document).on("click","#settingRights",function() {
			var data = $.isEmpty(_this.rights.val())?{}:JSON.parse(_this.rights.val());
			new RightsDefDialog({
				data:data,
				title:'字段权限',
				key:'formRights',
				callback:function(data){
					RightsSetting.setRights(data);
				}
			}).show();
		});
	},
	getData:function(){

		var data ={
				label:this.label.val(),
				position:this.position.val(),
				style:this.style.val(),
				icon:this.icon.val(),
				code:this.code.val(),
				deflow:this.deflow.val(),
				deflowText:$("#deflowDiv").text()
			};
		
		data[this.buttonTypeKey] = this.data[this.buttonTypeKey];
		if(this.settingRights)
			data.rights = JSON.parse(this.rights.val());
		return data;
	}
};
			