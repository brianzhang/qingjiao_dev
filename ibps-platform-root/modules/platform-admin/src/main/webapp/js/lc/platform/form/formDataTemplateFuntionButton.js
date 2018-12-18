$(function(){
		formDataTemplateFuntionButton.init();
	});

function getData(){
	return formDataTemplateFuntionButton.getData();
}

var formDataTemplateFuntionButton = {
	DEFAULT_BUTTON:FormButtons.t.buttons,
	init:function(){
		this.label = $("#label");
		this.rightsDiv =$("#rightsDiv");
		this.rights = $("#rights");
		
		this.position = $("#position");
		this.style = $("#style");
		this.icon = $("#icon");
		this.code = $("#code");
		this.selStartFlow = $("input[name='selStartFlow']");
		
		this.initData();
		this._initIcon()
		this.bindSettingRights();
	},
	initData:function(){
		var 	params= frameElement.dialog.params,type,operationType;
		this.data = params.data;
		this.formKey  =params.formKey;
		type = this.data.button_type;
		operationType = params.operationType;
		if(type == 'custom'){
			$("#codeDiv").show();
			this.code.val(this.data.code?this.data.code:'custom'+this.data.$index);
		}else{
			$("#codeDiv").hide();
			this.code.val("");
		}
		
		this.label.val(this.data.label);
		
		this.position.val(this.data.position?this.data.position:this.getDefPosition(type));
		this.style.val(this.data.style?this.data.style:this.DEFAULT_BUTTON[type]["style"]);
		this.icon.val(this.data.icon?this.data.icon:this.DEFAULT_BUTTON[type]["icon"]);
		$('[data-icon="icp"]').addClass(	this.icon.val());
		
		RightsSetting.init (this.rights,this.rightsDiv);
		RightsSetting.setRights($.isEmpty(this.data.rights)?[{type:"all"}]:this.data.rights);
		
		
		if(operationType == 'function' && !this.hasManagePosition(type)){
			$("#position").find("option[value='manage']").remove(); 
		}
		if( !this.hasSearchPosition(type)){
			$("#position").find("option[value='search']").remove(); 
		}
		else if(operationType == 'edit' && !this.hasDetailPosition(type)){
			$("#position").find("option[value='detail']").remove(); 
		}
		
		if(type == 'startFlow'){
			$("#selStartFlowGroup").show();
			var flag = typeof(this.data.selStartFlow) == "undefined"
				||this.data.selStartFlow ==="false" ? false : true;
			if(flag){
				$("input[name='selStartFlow']:radio[value=true]").attr('checked',true);
			}else{
				$("input[name='selStartFlow']:radio[value=false]").attr('checked',true);
			}
		}else{
			$("#selStartFlowGroup").hide();
			$("input[name='selStartFlow']").attr('checked',false);
		}
	},
	hasManagePosition:function(type){
		return FormButtons.t.hasPermission(type,"manage");
	},
	hasDetailPosition:function(type){
		return FormButtons.t.hasPermission(type,"detail");
	},
	hasSearchPosition:function(type){
		return FormButtons.t.hasPermission(type,"search");
	},
	getDefPosition:function(type){
		if(!this.hasSearchPosition(type))
			return 'all';
		return 'toolbar';
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
		var code = this.code.val();
		this.data ={
				label:this.label.val(),
				position:this.position.val(),
				style:this.style.val(),
				icon:this.icon.val(),
				button_type:this.data.button_type,
				code:code,
				rights:JSON.parse(this.rights.val()),
				selStartFlow:$("input[name='selStartFlow']:checked").val()
		};
		return this.data;
	}
};
			