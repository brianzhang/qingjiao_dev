/**
 *  导出字段配置
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-07 15:42:57
 *</pre>
 */
$(function() {
	dataTemplateExportColumn  = new DataTemplateExportColumn();
	dataTemplateExportColumn.init();
});

(function() {
	//定义常量
	var _consts = {
		
	};
	/**
	 * 导出字段配置 对象
	 * @returns {DataTemplateExportColumn}
	 */
	DataTemplateExportColumn = function() {
		this.trTemplate = '\
				<tr class="{{? it.isTable}}table{{??}}field{{?}}" style="{{? it.isTable}}background-color:#d9edf7;{{?}}">\
					<td>\
						<input type="hidden" class="name" name="name_{{= it.name}}" value="{{= it.name}}">\
						<input type="hidden" class="type" name="type_{{= it.name}}" value="{{= it.field_type}}">\
						<input type="hidden" class="label" name="label_{{= it.name}}" value="{{= it.label}}">\
						<span>{{= it.label}}</span>\
					</td>\
					<td class="hidden">\
						<input type="text" name="fmt_{{= it.name}}" value="{{= it.fmt}}">\
					</td>\
					<td style="position: relative;" class="field-rights" data-type="required">\
						<div style="width: 100%; float: left;" class="rights">\
							{{~ it.rights : right : i}}\
							<span class="owner-span {{= right.className}}" title="{{= right.title}}" \
									data-type="{{= right.type}}" data-id="{{= right.dataId}}" data-name="{{= right.dataName}}">\
								{{= right.rightsSpan}}\
								<a class="fa fa-remove remove-owner {{= right.hidden}}" title="删除"></a>\
							</span>\
							{{~}}\
						</div>\
						<div class="settings">\
							<a title="编辑" class="btn btn-sm btn-info fa fa-pencil-square-o per-a-edit"></a>\
							<a title="重置" class="btn btn-sm btn-danger fa fa-undo per-a-reset"></a>\
						</div>\
					</td>\
				</tr>';
		
		this.rightsTemplate = '\
			{{~ it : right : i}}\
			<span class="owner-span {{= right.className}}" title="{{= right.title}}" \
					data-type="{{= right.type}}" data-id="{{= right.dataId}}" data-name="{{= right.dataName}}">\
				{{= right.rightsSpan}}\
				<a class="fa fa-remove remove-owner {{= right.hidden}}" title="删除"></a>\
			</span>\
			{{~}}';
		
		this.trTemplateDoT = doT.template(this.trTemplate);
		this.rightsTemplateDoT = doT.template(this.rightsTemplate);
	};

	/**
	 * 方法
	 */
	DataTemplateExportColumn.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			
			var params = frameElement.dialog.params;
			
			this.fields = params.fields;
			
			this.data = params.data;
			
			//初始化快速操作按钮
			this.initQuickButtons();
			//初始化导出配置
			this.initDataExport();
		},
		initQuickButtons:function(){
			var me = this;
			//快捷操作统一字段权限
			this.initGeneralExports();
			//删除拥有的权限
			this.initRemoveOwner();
			//编辑和重置
			this.initEditResetExports();
		},
		initDataExport:function(){
			this._loadRadio();
			this._loadSetting();
		},
		_loadSetting : function(){
			var me = this,
				aryTr = [];
			var dataFields = this.getDataFields();

			for(var i = 0, len = this.fields.length; i < len; i++){
				var field = this.fields[i];
				if(!field.field_type)
					field.field_type = 'text';
		
				var  f =  dataFields[field.name];
				if(f){
					//设置已经配置
					field.rights  =f.rights;
				}
				var fieldHtml = this._getFieldTdHtml(field, false);
				aryTr.push(fieldHtml);
			}
			
			$("#tableExports").append(aryTr.join(""));
		},
		getDataFields : function(){
			if(!this.data)
				return {};
			var fields = this.data.fields,
				dataFields= {};
			if($.isEmpty(fields))
				return dataFields;
				
			for(var i = 0, len = fields.length; i < len; i++){
				var field = fields[i];
				dataFields[field.name] = field;
			}	
			return dataFields;
		},
		_loadRadio : function(){
			
			var selectField = 'N',
				 exportType = 'db';
			if($.isNotEmpty( this.data)){
				 selectField = this.data.select_field;
				exportType = this.data.export_type;
			}
			
			 $("[name='selectField'][value='"+selectField+"']").prop("checked", true);
			 $("[name='exportType'][value='"+exportType+"']").prop("checked", true);
		},
		_getFieldTdHtml:function(field, isTable){
			var me = this;
			
			var rights = me.__getRights(field.rights);
			field.rights = rights;
			
			return this.trTemplateDoT(field);
		},
		/**
		 * 全局权限
		 */
		initGeneralExports:function(){
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
			var rights = this.__getRights(rights);
			var rightsHtml = this.rightsTemplateDoT(rights);
			
			rightsDiv.empty();
			rightsDiv.html(rightsHtml);
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
					var rights = me.__getRights(rights);
					var rightsHtml = me.rightsTemplateDoT(rights);
					owner.parent().append(rightsHtml);
				}
				owner.remove();
			});
		},
		initEditResetExports:function(){
			var me = this;
			$(document).on("click",".per-a-edit,.per-a-reset",function() {
				var fieldRights = $(this).closest(".field-rights"),type=fieldRights.data("type"),
					rightsDiv =fieldRights.find(".rights");
				if($(this).hasClass("per-a-edit")){
					//获取当前的值
					var ownerSpan = rightsDiv.find(".owner-span");
					var data = me.getOwnerSpanData(ownerSpan);
					me.rightsSettingDialog(data,function(data){
						var rights = me.__getRights(data);
						var rightsHtml = me.rightsTemplateDoT(rights);
						rightsDiv.empty();
						rightsDiv.html(rightsHtml);
					});
				}else{
					var ownerType = (type == "read" || type == "edit"  || type == "show")?"all":"none";
					var rights = [{type:ownerType}];
					var _rights = me.__getRights(rights);
					var rightsHtml = me.rightsTemplateDoT(_rights);
					rightsDiv.empty();
					rightsDiv.html(rightsHtml);
				}
			});
		},
		rightsSettingDialog:function(data,callback){
			new RightsDefDialog({
				data:data,
				title:'导出字段授权',
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
		__getRights : function(rights, idKey, nameKey){
			var _result = [];
			idKey = idKey?idKey:"rightsId";
			nameKey = nameKey?nameKey:"rightsName";
			
			if(!rights || rights.length ==0){
				var right = {};
				right.rightsSpan = "无";
				right.className = "";
				right.title = "";
				right.type = "none";
				right.dataId = "";
				right.dataName = "";
				right.hidden = "hidden";
				right[idKey] = "";
				right[nameKey] = "";
				
				_result.push(right);
				return _result;
			}
			
			for(var i =0 ;i<rights.length;i++){
				var owner = rights[i],type =owner.type;
				if (type == 'all') {
					rights[i].rightsSpan = "所有人";
					rights[i].type = type;
					rights[i].hidden = '';
					
					_result.push(rights[i]);
				} else if (type == 'none') {
					rights[i].rightsSpan = "无";
					rights[i].className = "";
					rights[i].title = "";
					rights[i].type = "none";
					rights[i].dataId = "";
					rights[i].dataName = "";
					rights[i].hidden = "hidden";
					rights[i][idKey] = "";
					rights[i][nameKey] = "";
					
					_result.push(rights[i]);
				}else{
					var ids=(owner[idKey]+"").split(","), names=owner[nameKey].split(",");
					switch(type){
						case "employee":
							rights[i].className = "span-employee";
							rights[i].title = "用户";
							break;
						case "position":
							rights[i].className = "span-position";
							rights[i].title = "岗位";
							break;
						case "role":
							rights[i].className = "span-role";
							rights[i].title = "角色";
							break;
						case "org":
							rights[i].className = "span-org";
							rights[i].title = "组织";
							break;
						case "orgSub":
							rights[i].className = "span-org-sub";
							rights[i].title = "组织下";
							break;
						default:
							rights[i].className = "span-org";
							rights[i].title = "组织";
							break;
					}
					
					for(var j = 0 ;j <ids.length;j++){
						var id = ids[j],name=names[j];
						if(!id) continue;
						
						rights[i].type = type;
						rights[i].dataId = id;
						rights[i].dataName = name;
						rights[i].rightsSpan = name;
						rights[i].hidden = '';
						
						var _right = $.extend(true, {}, rights[i]);
						_result.push(_right);
					}
				}
			}
			return _result;
		},
		_getField : function(fields, table_name, field_name, field_type){

			for(var i = 0, len = fields.length; i < len; i ++){
				var field = $.extend(true, {}, fields[i]);
				
				if(field.field_type == field_type && field.name == field_name){
					return field;
				}
			}
			
			return null;
		},
		getRightsData:function(rights){
			var rightsData = [],me = this;
			rights.each(function(){
				var ownerSpan = $(this).find(".owner-span"),
					right = me.getOwnerSpanData(ownerSpan);
				rightsData = $.extend(true, rightsData, right);
			});
			return rightsData;
		},
		getData:function(){
			var me=this,
				selectField = $( '[name=selectField]:checked').val(),
				exportType = $( '[name=exportType]:checked').val(),
				fields =[];

			$("#tableExports tbody tr").each(function(){
				var _self = $(this),
					fieldName = _self.find(".name").val(),
					fieldType = _self.find(".type").val(),
					label = _self.find(".label").val(),
					rights = _self.find('.field-rights');
				
					var  field = {
							name:fieldName,
							label:label,
							fieldType:$.isNotEmpty(fieldType)?fieldType:'text',
							rights: me.getRightsData(rights)
					};
					fields.push(field);
			});
			
			return {select_field : selectField, export_type : exportType, fields : fields};
		}
	};
})();