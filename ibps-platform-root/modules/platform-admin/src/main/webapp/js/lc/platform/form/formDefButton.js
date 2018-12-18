$(function(){
		formDefButton.init();
	});

function getData(){
	return formDefButton.getData();
}

var formDefButton = {
	DEFAULT_BUTTON:FormButtons.t.buttons,
	init:function(){
		this.label = $("#label");
		this.rightsDiv =$("#rightsDiv");
		this.rights = $("#rights");
		
		this.position = $("#position");
		this.style = $("#style");
		this.icon = $("#icon");
		this.code = $("#code");
		
		this.enabledCustom = $("#enabledCustom");
		this.dialog =  $("#dialog");
		this.custom = $("#custom");
		
		this.bindEnabledCustom();

		this.bindCustomDialogSetting();
		
		this.initData();
		this._initIcon();

	},
	initData:function(){
		var 	params= frameElement.dialog.params,
				type,
				operationType;
		this.bo =  params.bo;
		this.extBo = params.extBo;
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
		
		this.label.val(this.data.label);
		
		this.position.val(this.data.position?this.data.position:"all");
		this.style.val(this.data.style?this.data.style:this.DEFAULT_BUTTON[type]["style"]);
		this.icon.val(this.data.icon?this.data.icon:this.DEFAULT_BUTTON[type]["icon"]);
		$('[data-icon="icp"]').addClass(	this.icon.val());
		
		 if(operationType == 'edit' && !this.hasManagePosition(type)){
			$("#position").find("option[value='manage']").remove(); 
		}
		 
		 this.enabledCustom.prop("checked",this.data.enabledCustom=='Y'?true:false).trigger("change");
		 
		 this.customData = this.data.custom;
		 
	},
	hasManagePosition:function(type){
		return  FormButtons.t.hasPermission(type,"edit");
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
	bindEnabledCustom:function(){
		var _this = this;
		$(document).on("click","#enabledCustom",function() {
			if($(this).is(":checked")){
				$("#customGroup").show();
				_this.initCustomDialog();
			}else{
				$("#customGroup").hide();
			}
		});
		$(document).on("change","#enabledCustom",function() {
			if($(this).is(":checked")){
				$("#customGroup").show();
				_this.initCustomDialog();
			}else{
				$("#customGroup").hide();
			}
		});
		
	},
	initCustomDialog:function(){
		var _this =  this;
		var url =__ctx+ "/platform/data/dataTemplate/getSelectorData.htm?type=dialog",
			_key = 'key',
			_text = 'name',
	 	    rows = 20;
	 	    
	 	    
	this.dialogData =this.data.dialog||'';
	 
	var $el = $("#dialog");

	var placeholder = "请选择自定义对话框";
		var params = {
				theme: "bootstrap",
				language: "zh-CN",
				allowClear: true,
				placeholder:placeholder,
				formatSelection : function (item) {  //选择结果中的显示
					return item.text;
				},
	    		formatResult : function (item) {//【搜索】列表中的显示
					return (item != undefined && item.text != undefined)?item.text:"";  
	    		},
	    		createSearchChoice : function(term, data) {	//创建搜索结果（使用户可以输入匹配值以外的其它值）
			        return {id: term, text: term};
			    },
				escapeMarkup : function (markup) {
					return markup;
				},
				initSelection:function (element, callback) {
			       	return  callback(_this.dialogData);
	    		},
	    		templateSelection:function(item){
	    	    	if(!item || $.isEmpty(item.id))
			    		return  placeholder;
			    	return item? item.text:'';
	    		},
	    		templateResult: function (item) {
				    if (!item || !item.id) { 
				    	return "";
				    }
				    return item.text;
				},
				ajax : {
    				    url: url,
    				    dataType: 'json',
    				    delay: 250,
    				    data: function (_params) {
    				    	return {
    				    		queryName:_params.term,//查询
    				    		page : _params.page|| 1,// 第几页，分页哦
	                            rows : rows// 每页显示多少行
    				    	};
    				    }
    					,processResults: function (results,params) {
    			     		var data = results.data;
				            //重命名字段名
				            for (var i = 0; i < data.length; i++){
				            	var item =  data[i];
				                data[i].id = item[_key];
				                data[i].text = item[_text];
				            }
				            params.page = params.page || 1;
				            return {
				                results: data,
				                pagination : {
	                                more :  (params.page * rows) < results.totalCount// 总页数为10，那么1-9页的时候都可以下拉刷新
	                            }
				            };
    					 },
    				     cache: true
    				}
			};
		$el.select2(params);
		
		$el.on("change", function (e) {
    		var data = $el.select2("data"),value = "";
    		if($.isNotEmpty(data)){
    	  		_this.dialogData = {
    	  				id:data[0].id,
						text:data[0].text
    	  		}
    		}else{
    			_this.dialogData = "";
    		}
  
		});
		
	},
	bindCustomDialogSetting:function(){
		var _this = this;
		$(document).on("click","#customConfig",function() {
		var selectDialog = _this.dialogData?_this.dialogData.id:'';
 	   if($.isEmpty(selectDialog)){
       	   DialogUtil.msg("请选择自定义对话框！");
       	   return;
       } 
		var	  url =   __ctx+'/platform/form/formDef/customDialog2.htm?key='+selectDialog;
		var params ={
			mode:'custom',
			bo:_this.bo,
			extBo:_this.extBo,
			value:$.isEmpty(_this.customData)?'':_this.customData
		};
 
     DialogUtil.dialog({
	   		title:'设置对话框属性',
	   		params:params,
	   		area: ['550px', '500px'],
	   		content:url,
	   		btn:[{
	           	label: '确定',
	           	iconCls:'btn btn-primary fa fa-ok',
	               action: function(dialog,index) {
	             	  var  data = DialogUtil.getChildFrameWindow(index).getData();
	             	  if(!data)
	             		 return;
	             	  
	             	 _this.setCustomValue(data);
	             	
	              	DialogUtil.close(index);
	               }
	           },{
	           	label: '清空',
	           	iconCls:'btn btn-success fa fa-clean',
	               action: function(dialog,index) {
	            	   _this.setCustomValue();
		              	DialogUtil.close(index);
	               }
	           },  {
	           	label: '取消',
	           	iconCls:'btn btn-danger fa fa-cancel',
	               action: function(dialog,index) {
	               	DialogUtil.close(index);
	               }
	           }]
	   	});
		});
	},
	setCustomValue:function(data){
		this.customData= data?data:'';
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
		var code = this.code.val(),
				data ={
					label:this.label.val(),
					position:this.position.val(),
					style:this.style.val(),
					icon:this.icon.val(),
					code:code
			};
		if(this.enabledCustom.is(":checked")){
			data ["enabledCustom"] =  'Y';
			if($.isEmpty(this.dialogData)){
				alert("请选择自定义对话框！");
				return;
			}
			data["dialog"] =  this.dialogData;
			data["custom"] = this.customData;
			
		}else{
			data ["enabledCustom"] =  'N';
			data["dialog"] = null;
			data["custom"] =null;
		}
	
		
		data[this.buttonTypeKey] = this.data[this.buttonTypeKey];

		return data;
	}
};
			