/**
 * 导出字段配置
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017-11-01 11:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDataTemplateDataExport  = new FormDataTemplateDataExport();
	formDataTemplateDataExport.init();
});

(function() {
	//定义常量
	var _consts = {
		
	};
	/**
	 * 导出字段配置 对象
	 * @returns {FormDataTemplateDataExport}
	 */
	FormDataTemplateDataExport = function() {
		this.trTemplate = '\
				<tr class="{{? it.isTable}}table{{??}}field{{?}}" style="{{? it.isTable}}background-color:#d9edf7;{{?}}">\
					<td>\
						<input type="hidden" class="name" name="name_{{= it.idx}}" value="{{= it.name}}">\
						<input type="hidden" class="type" name="type_{{= it.idx}}" value="{{= it.field_type}}">\
						<input type="hidden" class="showName" name="showName_{{= it.idx}}" value="{{= it.showName}}">\
						<span>{{= it.showName}}</span>\
					</td>\
					<td class="hidden">\
						<input type="text" name="fmt_{{= it.idx}}" value="{{= it.fmt}}">\
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
	FormDataTemplateDataExport.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			var params = frameElement.dialog.params;
			this.def_data = $.extend(true, [], params.def_data);
			this.fields = this.def_data.fields;
			this.data = $.extend(true, {}, params.data);
			
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
		_random : function(){
			return Math.round(Math.random() * 1000000 + 1);
		},
		initDataExport:function(){
			if($.isEmpty(this.data) || $.isEmptyObject(this.data) || undefined == this.data.fields){
				this._loadSetting(this.def_data);
				return;
			}
			this._loadSetting(this.data);
		},
		_loadSetting : function(data){
			var me = this,
				fields = data.fields,
				aryTr = [];
			
			me._loadRadio(data);
			
			for(var i = 0, len = fields.length; i < len; i++){
				fields[i].idx = me._random();
				if(fields[i].field_type == 'table'){
					// TODO 子表暂不支持
					//var tableTdHtml = me._getTableTdHtml(fields[i]);
					//aryTr.push(tableTdHtml);
				}else if(fields[i].field_type != 'desc'
					&& fields[i].field_type != 'label'
					&& fields[i].field_type != 'fold_card'){
					if(fields[i].field_type == 'desc' ||  fields[i].field_type == 'label' ||  fields[i].field_type == 'fold_card' || fields[i].field_type == 'tab_break'  )
						continue;
					var fieldHtml = me._getFieldTdHtml(fields[i], false);
					aryTr.push("<tbody class='fieldContainer'>");
					aryTr.push(fieldHtml);
					aryTr.push("</tbody>");
				}
			}
			
			$("#tableExports").append(aryTr.join(""));
		},
		_loadRadio : function(data){
			var selectField = data.select_field,
				exportType = data.export_type;
			
			if(undefined != selectField) {
				var sf = $("[name='selectField']");
				sf.each(function(){
					if($(this).val() == selectField){
						$(this).prop("checked", true);
					}
				});
			}
			
			if(undefined != exportType) {
				var et = $("[name='exportType']");
				et.each(function(){
					if($(this).val() == exportType){
						$(this).prop("checked", true);
					}
				});
			}
		},
		_getTableTdHtml:function(table){
			var me = this, aryTr = [];
			
			var fieldHtml = me._getFieldTdHtml(table, true);
			aryTr.push(fieldHtml);
			
			aryTr.push("<tbody class='tableContainer' name='" + table.name + "'>");
			for(var i = 0, len = table.field_options.columns.length; i < len; i++){
				var _fieldHtml = '',
					sfield = table.field_options.columns[i];
				
				sfield.idx = me._random();
				if(sfield.field_type == 'table'){
					_fieldHtml = me._getTableTdHtml(sfield);
				}else if(sfield.field_type != 'desc' 
					&& sfield.field_type != 'label'
					&& sfield.field_type != 'fold_card'){
					if(sfield[i].field_type == 'desc' ||  sfield[i].field_type == 'label' ||  sfield[i].field_type == 'fold_card' || sfield[i].field_type == 'tab_break'  )
						continue;
					_fieldHtml = me._getFieldTdHtml(sfield, false);
				}
				aryTr.push(_fieldHtml);
			}
			aryTr.push("</tbody>");
			
			return aryTr.join("");
		},
		_getFieldTdHtml:function(field, isTable){
			var me = this;
			
			var rights = me.__getRights(field.rights);
			field.rights = rights;
			field.isTable = isTable;
			
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
			if($.isNotEmpty(table_name)){
				return this._getSubField(fields, table_name, field_name, field_type);
			}
			
			for(var i = 0, len = fields.length; i < len; i ++){
				var field = $.extend(true, {}, fields[i]);
				
				if(field.field_type == field_type && field.name == field_name){
					return field;
				}
			}
			
			return null;
		},
		_getSubField : function(fields, table_name, field_name, field_type){
			for(var i = 0, len = fields.length; i < len; i ++){
				var field = $.extend(true, {}, fields[i]);
				if(field.field_type == 'table'){
					if(table_name == field.name){
						for(var i = 0, len = field.field_options.columns.length; i < len; i++){
							var _field = $.extend(true, {}, field.field_options.columns[i]);
							if(_field.field_type == field_type && _field.name == field_name){
								return _field;
							}
						}
					}else{
						return _getSubField(field.field_options.columns, table_name, field_name, field_type);
					}
				}
			}
			
			return null;
		},
		getData:function(){
			var me=this,
				selectField = '',
				exportType = '',
				checked = $(":checked"),
				fields =[];
			
			checked.each(function(){
				if($(this).attr("name") == 'selectField'){
					selectField = $(this).val();
				}else if($(this).attr("name") == 'exportType'){
					exportType = $(this).val();
				}
			});
			
			// 字段权限配置
			var _temp_table = null;
			$("#tableExports tbody tr").each(function(){
				var _self = $(this),
					tableName = _self.parents().filter("tbody").attr("name"),
					fieldName = _self.find(".name").val(),
					fieldType = _self.find(".type").val(),
					showName = _self.find(".showName").val(),
					rights = _self.find('.field-rights'),
					field = me._getField(me.fields, tableName, fieldName, fieldType);
			
				if($.isNotEmpty(field)){
					if(fieldType == 'table'){
						field.field_options.columns = [];
						_temp_table = field;
					}
					
					field.showName = showName;
					var rightsData = [];
					rights.each(function(){
						var ownerSpan = $(this).find(".owner-span"),
							right = me.getOwnerSpanData(ownerSpan);
						rightsData = $.extend(true, rightsData, right);
					});
					field.rights = rightsData;
					
					if($.isEmpty(tableName)){
						fields.push(field);
					}else{
						_temp_table.field_options.columns.push(field);
					}
				}
			});
			
			return {select_field : selectField, export_type : exportType, fields : fields};
		}
	};
})();