/**
 * 表单权限
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-04-25 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formRights  = new FormRights();
	formRights.init();
});

(function() {
	//定义常量
	var 	_consts = {
			 field_type: {
			   	 hidden:'隐藏域',
				 text:"单行文本",
		    	 textarea:'多行文本',
		    	 editor:'富文本框',
		    	 number: '数字',
		    	 radio:'单项选择',
		    	 checkbox:'多项选择',
		     	 select:'下拉框',
		     	 dictionary:'数据字典',
		     	 datePicker:'日期控件',
		     	 autoNumber:'自动编号',
		     	 attachment:'上传附件',
		     	 selector :'选择器',
		     	 customDialog:"自定义对话框",
		     	 address:'地址',
		     	 signature:'签名',
		     	 office:'office控件',
		     	 linkdata:'关联数据',
		     	 linkattribute:'关联属性',
		    	 table :'子表单',
		    	 tab_break:'选项卡',
		    	 page_break:'分页',
		    	 desc:'描述',
		    	 label:'文本',
		    	 fold_card:'折叠卡',
		    	 approval_opinion:'审批意见',
		    	 flow_diagram:'流程图',
		    	 approval_history:'审批历史'
		      }
	};
	/**
	 * 表单权限 对象
	 * @returns {BpmFormList}
	 */
	FormRights = function() {
		
	};

	/**
	 * 方法
	 */
	FormRights.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.params = frameElement.dialog.params;
			//初始化快速操作按钮
			this.initQuickButtons();
			
			this.initFormRights();
		},
		initQuickButtons:function(){
			var me = this;
			//快捷操作统一字段权限
			this.initGeneralRights();
			//删除拥有的权限
			this.initRemoveOwner();
			//编辑和重置
			this.initEditResetRights();
			
			this.initAllFiedsRights();
		},
		/**
		 * 全局权限
		 */
		initGeneralRights:function(){
			var me =this;
			$(document).on("click",".general-rights",function() {
				var val = $(this).val(),
					type= $(this).attr("name"),
					generalRights= $(".field-rights[data-type='"+type+"']"),
					rightsDiv =generalRights.find(".rights");
				if(val =="all" || val == "none"){
					var rights = [{type:val}];
					me.setGeneralRights(rights,rightsDiv);
					me.setGeneralButtonRights(type,val,rights);
				}else{
					me.rightsSettingDialog({},function(rights){
						me.setGeneralRights(rights,rightsDiv);
						me.setGeneralButtonRights(type,val,rights);
					});
				}
			});
		},
		setGeneralRights:function(rights,rightsDiv){
			var rightsHtml =  this.__getRightsSpan(rights);
			rightsDiv.empty();
			rightsDiv.append(rightsHtml);
		},
		setGeneralButtonRights:function(type,val,rights){
			var generalRights= $(".field-rights[data-type='show']"),
				rightsDiv =generalRights.find(".rights");
			if(type == "hide"){
				var rights = [{type:"none"}];
				this.setGeneralRights(rights,rightsDiv);
			}
		},
		initRemoveOwner :function(){
			var me =this;
			$(document).on("click",".remove-owner",function() {
				var owner = $(this).closest(".owner-span");
				var ownerSiblings =owner.siblings(".owner-span");
				if(ownerSiblings.length == 0){
					var rights = [{type:'none'}];
					var rightsHtml =  me.__getRightsSpan(rights);
					owner.parent().append(rightsHtml);
				}
				owner.remove();
			});
		},
		initEditResetRights:function(){
			var me = this;
			$(document).on("click",".per-a-edit,.per-a-reset",function() {
				var fieldRights = $(this).closest(".field-rights"),type=fieldRights.data("type"),
					rightsDiv =fieldRights.find(".rights");
				if($(this).hasClass("per-a-edit")){
					//获取当前的值
					var ownerSpan =  rightsDiv.find(".owner-span");
					var data = me.getOwnerSpanData(ownerSpan);
					me.rightsSettingDialog(data,function(data){
						var rightsHtml =  me.__getRightsSpan(data);
						rightsDiv.empty();
						rightsDiv.append(rightsHtml);
					});
				}else{
					var ownerType = (type == "read" || type == "edit"  || type == "show")?"all":"none";
					var rights = [{type:ownerType}];
					var rightsHtml =  me.__getRightsSpan(rights);
					rightsDiv.empty();
					rightsDiv.append(rightsHtml);
				}
			});
		},
		initAllFiedsRights:function(){
			//字段
			$(document).on("click","[name=fields]",function() {
				var val = $(this).val();
				if(val == 'hide'){//隐藏
					$(".general-rights[value='none']").click();
				}
				else if(val == 'read'){//只读
					$(".general-rights[value='all'][name='read']").click();
					$(".general-rights[value='none'][name='edit']").click();
					$(".general-rights[value='none'][name='required']").click();
				}
				else if(val == 'edit'){//编辑
					$(".general-rights[value='all'][name='read']").click();
					$(".general-rights[value='all'][name='edit']").click();
					$(".general-rights[value='none'][name='required']").click();
				}
				else if(val == 'required'){//必填
					$(".general-rights[value='all']").click();
				}
			});
		},
		rightsSettingDialog:function(data,callback){
			new RightsDefDialog({
				data:data,
				title:'表单授权',
				key:'formRights',
				callback:callback
			}).show();
		},
		getOwnerSpanData:function(ownerSpan){
			var data = [];
			$.each(ownerSpan,function(i,n){
				var o ={},s=$(n),
					type=s.data("type"),
					id=s.data("id")? s.data("id"):'',
					name = s.data("name")? s.data("name"):'';
				var hasThisType = false;
				for(var j = 0 ;j < data.length;j++){
					var c = data[j],
						types = c.type,
						ids = $.isNotEmpty(c.rightsId)?(c.rightsId+"").split(","):[];
						names =$.isNotEmpty(c.rightsName)?c.rightsName.split(","):[];
					if(types != type ){
						continue;
					}
					hasThisType=true;
					ids.push(id);
					names.push(name);
					data[j].rightsId=ids.join(",");
					data[j].rightsName=names.join(",");
				}
				if(!hasThisType){
					data.push({
						type:type,
						rightsId:id,
						rightsName:name
					});
				}
			});
			
			return data;
		},
	
		//
		initFormRights:function(){
			this._loadFormRights("getPermission.htm", this.getRightsParams());
		},
		_loadFormRights:function(url,params){
			var me= this;
				url = __ctx+"/platform/form/formRights/"+url;
			$.post(url, params,function(data){
				if($.isEmpty(data)){
					DialogUtil.msg("未获取表单字段数据");
					return;
				}
				var tables =data["table"];
				var opinions =data["opinion"];
//				me.fields=fields;
//				me.opinions=opinions;
				var aryTr  =[],table;
		//		var 
				//'<tbody class="sub">'+

				for(var i = 0 ;i < tables.length;i++){
					table =  tables[i];
					table.colspan=4;
					aryTr.push('<tbody  class="'+(table.isMain =='Y'?'main':'sub')+'">');
					var tableHtml =  me._getTableHtml(table);
					
					var fieldsHtml	=me._getPermissionHtml(table.fields,'field',table.isMain);
					
					aryTr.push(tableHtml);
					aryTr.push(fieldsHtml);
					aryTr.push('</tbody>');
				}
				
				$("#tablePermission").append(aryTr.join(""));
				
//				//意见权限。
//				if(opinions!=undefined && opinions!=''){
//					var opinionHtml=_self.__getPermission(opinions,"opinion");
//					$("#opinionPermission").empty();
//					$("#opinionPermission").append(opinionHtml);
//					_self.__serviceCallback__($("#opinionPermission"));
//					$("#opinionPermission").closest( 'table' ).removeClass("hide");
//				}
				//设置office菜单的权限
			});
		},
		_getTableHtml:function(table){
			var tableHtml ="";
			if(table.isMain =='Y'){
				var tableHtml =''+
					'<tr class="info">'+
						'<td colspan="'+table.colspan+'" >'+
								'<div class="pull-left" style="text-align: left;  font-weight: bold;">'+table.label+'</div>'+
								
						'</td>'+
					'</tr>';
			}else{
					tableHtml = this._getHtml(table,"tableRights")
					
					tableHtml +='<tr class="warning">'+
							'<td colspan="'+table.colspan+'"    style="position: relative;">'+
							this._getButtons(table.buttons,table)+
							'</td>'+
						'</tr>';
						
			}
			return tableHtml;
	
		},

		_getButtons:function(buttons,table){
			var aryTr  = ["<table class=\"table table-bordered table-condensed table-hover table-striped  buttonsRights\" style=\"width: 50%;margin-bottom:5px;\"  data-tablename=\""+table.name+"\">"];
			aryTr.push("<thead><tr class='danger'><td >按钮权限</td><td>显示权限</td></tr><thead>");
			aryTr.push("<tbody>");
			for(var i=0;i<buttons.length;i++){
				var label = FormButtons.t .buttons[buttons[i].type]?FormButtons.t .buttons[buttons[i].type].label:buttons[i].label;
				aryTr.push("<tr  class=\"button-rights\"  data-name=\""+buttons[i].name+"\"  data-type=\""+buttons[i].type+"\">");
				aryTr.push("<th   style=\"width: 39%\">");
				aryTr.push("<span><span class='capsule-span span-employee'>"+label+"</span>"+buttons[i].label+"</span>");
				aryTr.push("</th>");
				aryTr.push(this.__getHtmlTd("show",buttons[i]));
				aryTr.push("</tr>")
			}
			aryTr.push("</tbody></table>");
			return aryTr.join("");
		},
		//没有输入文本，只有隐藏和
		_getNotInputHtml:function(permission,type,isMain){
			var _self=this;
			var rpostTd ="",firstTr="";
			var fieldType =  permission.field_type;
			var typeTitle  = this.consts.field_type[fieldType];
			var capsule = '<span class="capsule-span span-role">'+typeTitle+'</span>';
			var istNotInputFieldSpecial = this.istNotInputFieldSpecial(fieldType);
			var aryTr = [firstTr,'<tr '
			             ,' data-code="'+(permission.code?permission.code:'')+'"'
			             ,' data-name="'+permission.name+'"'
			             ,' data-ismain="'+(isMain?isMain:false)+'"'
			             ,' class="'+(type=='tableRights'?(type+ " info"):type)+'">'
			             , '<th colspan="1" class="w14">',
			             			'<div style="padding-top: 5%; '+(type=='tableRights'? 'text-align: left;  font-weight: bold;' :'') +'">'+capsule+permission.label+'</div> '
			             ,'</th>'
			             
			         	,(istNotInputFieldSpecial?'':this.__getHtmlTd("show",permission))
			         	,'<td colspan="'+(istNotInputFieldSpecial?'3':'2')+'">&nbsp;</td> '
				, '</tr>'];
			
				permissionTr=aryTr.join("");
				return permissionTr;
			
		},
		isNotInputField:function(type){
			return $.inArray(type,FormOptions.t.NON_INPUT_FIELD_TYPES) >-1;
		},
		istNotInputFieldSpecial:function(type){
			return	type == 'tab_break' || type == 'page_break';
		},
		
		_getPermissionHtml:function(permissionList,type,isMain){
			var sb=new StringBuffer(),permission;
			for(var i=0;i<permissionList.length;i++){
				permission = permissionList[i];
				var str ="";
				if(this.isNotInputField(permission.field_type)){
					 str=this._getNotInputHtml(permissionList[i], type,isMain);
				}else{
					 str=this._getHtml(permissionList[i], type,isMain);
				}
				sb.append(str);
			}
			return sb.toString();
		},
		_getHtml:function(permission,type,isMain){
			var _self=this;
			var rpostTd ="",firstTr="";
			var capsule ="";
			if(type=='tableRights'){
				capsule ='<span class="capsule-span span-employee">'+this.consts.field_type['table']+'</span>';
			}else{
				capsule ='<span class="capsule-span span-position">'+(this.consts.field_type[permission.field_type]||'')+'</span>';
			}
			
			var aryTr = [firstTr,'<tr '
			             ,' data-code="'+(permission.code?permission.code:'')+'"'
			             ,' data-name="'+permission.name+'"'
			             ,' data-ismain="'+(isMain?isMain:false)+'"'
			             ,' class="'+(type=='tableRights'?(type+ " info"):type)+'">'
			             , '<th colspan="1" class="w14">',
			             			'<div style="padding-top: 5%; '+(type=='tableRights'? 'text-align: left;  font-weight: bold;' :'') +'">'+capsule+permission.label+'</div> ',
			             			_self.__getOmrsHtml(permission),
			             '</th>',
				  
					//只读
					,_self.__getHtmlTd("read",permission)
					//编辑
					,_self.__getHtmlTd('edit',permission)
					//必填
					,_self.__getHtmlTd('required',permission)
					//只读提交
					, rpostTd
				, '</tr>'];
			
				permissionTr=aryTr.join("");
				return permissionTr;
		},
		__getOmrsHtml :function(permission){
			if(permission.fieldType == 'office'){
				return "<i style='float: right;margin-top: -10%;' class='officeMenuRights fa fa-file-word-o hover-pointer' title='office菜单权限设置' fieldTag='"+permission.formFieldId+"'></i>";
			}
			return "";
		},
		__getHtmlTd : function(type,permission){
			var tdstr = ' style="position: relative;" ';
			var settingsSpan= '<div class="settings"><a title="编辑" class="btn btn-sm btn-info fa fa-pencil-square-o per-a-edit" ></a> '+
				'<a title="重置" class="btn btn-sm btn-danger fa fa-undo per-a-reset" ></a></div>';
			
			var arlc = ['<td'+tdstr+'  class="field-rights" data-type="'+type+'">'
			             ,'<div style="width: 100%; float: left;" class="rights" >'+this.__getRightsSpan(permission[type])+'</div>'
			             ,settingsSpan
				, '</td>'];
			return arlc.join("");
		},
		__getRightsSpan : function(rights,idKey,nameKey){
			var returnStr = "",noneStr = '<span class="owner-span" data-type="none" >无</span> ';
			if(!rights || rights.length ==0){
				return noneStr;
			}
			idKey = idKey?idKey:"rightsId";
			nameKey = nameKey?nameKey:"rightsName";
			var removeOwner = '<a class="fa fa-remove remove-owner" title="删除"></a>';	
			
			for(var i =0 ;i<rights.length;i++){
				var owner = rights[i],type =owner.type;
				if (type == 'all') {
					returnStr += '<span class="owner-span" data-type="'+type+'">';
					returnStr += '所有人 ';
					returnStr += removeOwner;
					returnStr += '</span>';
				} else if (type== 'none') {
					returnStr += noneStr;
				} else{
					var ids=(owner[idKey]+"") .split(","), names=owner[nameKey].split(","), attrs = " ";
					switch(type){
						case "employee":
								attrs= "class='owner-span span-employee' title='用户' ";
							break;
						case "position":
							attrs= "class='owner-span span-position' title='岗位' ";
						break;
						case "role":
							attrs= "class='owner-span span-role' title='角色' ";
							break;
						case "org":
							attrs= "class='owner-span span-org' title='组织' ";
							break;
						case "orgSub":
							attrs= "class='owner-span span-org-sub' title='组织下'";
							break;
						default:
							attrs= "class='owner-span span-org' title='组织' ";
							break;
						}
					for(var j = 0 ;j <ids.length;j++){
						var id = ids[j],name=names[j];
						if(!id) continue;
						returnStr += '<span  '+attrs+'  data-type="'+type+'" data-id="'+id+'" data-name="'+name+'">';
						returnStr +=  name;
						returnStr += removeOwner;
						returnStr += '</span>';
					}
				}
			}
			return returnStr;
		},
		getJSONData:function(){
			var fields =[],subfields =[],tables=[],buttons= [],opinions=[],me=this;
			$(".field").each(function(){
				var field ={},_self =$(this),
					code =_self.data("code"), 
					name =_self.data("name"), 
					ismain =_self.data("ismain"), 
					fieldRight = _self.find('.field-rights');
			
				field.code = code;
				field.name= name;
				fieldRight.each(function(){
					var rightsType=$(this).data("type"),
						ownerSpan =  $(this).find(".owner-span");
					field[rightsType] = me.getOwnerSpanData(ownerSpan);
				});
				if(ismain == 'Y')
					fields.push(field);
				else
					subfields.push(field);
			});
			//表的权限
			$(".tableRights").each(function(){
				var table ={},_self =$(this),
				name =_self.data("name"), 
				tableRight = _self.find('.field-rights');
			
				table.code = name;
				table.name= name;
				tableRight.each(function(){
					var rightsType=$(this).data("type") ,
					ownerSpan =  $(this).find(".owner-span");
					table[rightsType] = me.getOwnerSpanData(ownerSpan);
			});
				tables.push(table);
				
			});
			//按钮权限
			$(".buttonsRights").each(function(){
				var _self =$(this),
					 tableName =_self.data("tablename"), 
					 buttonRights	 = _self.find('.button-rights');
				buttonRights.each(function(){
					var   button ={},
						 fieldRights = $(this).find('.field-rights'),
						 buttonName = $(this).data("name");
						 buttonType = $(this).data("type");
					button.code = tableName;
					button.name= buttonName;
					button.type= buttonType;
					fieldRights.each(function(){
						var rightsType=$(this).data("type") ,
							ownerSpan =  $(this).find(".owner-span");
						button[rightsType] = me.getOwnerSpanData(ownerSpan);
					});
					buttons.push(button);
				});
			});
			return {field:fields,subfield:subfields,table:tables,button:buttons,opinion:opinions};
		},
		getRightsParams:function(){
			var params  = {
					formKey: this.params.formKey?this.params.formKey:null,
					flowKey: this.params.flowKey?this.params.flowKey:null,
					nodeId :this.params.nodeId?this.params.nodeId:null,
					parentflowKey:	this.params.parentflowKey?this.params.parentflowKey:null,
					isInst: this.params.isInst?this.params.isInst:false,
			};
		
			params.rightsScope=this.params.rightsScope? this.params.rightsScope: 'form';
			
			return params;
		},
		
		saveData:function(){
			var me =this,
				params=this.getRightsParams();
				params.permission=JSON.stringify(this.getJSONData());
			var loading = DialogUtil.load("保存中...");
			 $.ajax({
			        url:  __ctx + "/platform/form/formRights/savePermission.htm",
			        type: 'post',
			        data: params,
			        success: function(data) {
			        	DialogUtil.close(loading);
			        	me.showResponse(data);
			        },
					error : function(){
						DialogUtil.close(loading);
					}
			 });
		},
		showResponse:function(data){
			var resultMessage=new com.lc.form.ResultMessage(data);
			if(resultMessage.isSuccess()){//成功
				DialogUtil.confirm('保存成功,是否继续操作?',function(r){
					if (!r){
						DialogUtil.close(frameElement.dialog.index);
					}
				});
		    }
			else{//失败
				DialogUtil.error(resultMessage.getMessage());
		    }
		},
		/**
		 * 重置权限
		 */
		resetFormRights : function(){
			var me =this;
			DialogUtil.confirm('确认重置表单权限吗？',function(r){
					if (!r)
						return;
					var loading = DialogUtil.load("保存中...");
					 $.ajax({
					        url:  __ctx+"/platform/form/formRights/resetRights.htm",
					        type: 'post',
					        data: me.getRightsParams(),
					        success: function(data) {
					        	DialogUtil.close(loading);
					    		var resultMessage=new com.lc.form.ResultMessage(data);
								if(resultMessage.isSuccess()){
									DialogUtil.msg('重置表单权限成功！');
									window.location.reload(true);
								}else{
									DialogUtil.error(resultMessage.getMessage());
								}
					        },
							error : function(){
								DialogUtil.close(loading);
							}
					 });
			});
		}
	};
		

})();