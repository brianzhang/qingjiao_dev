/**
 * 导出字段勾选
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017-11-01 11:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	dataTemplateSelectField = new DataTemplateSelectField();
	dataTemplateSelectField.init();
});

(function() {
	//定义常量
	var _consts = {
		
	};
	/**
	 * 导出字段勾选 对象
	 * @returns {DataTemplateSelectField}
	 */
	DataTemplateSelectField = function() {
		this.trTemplate = '\
				<tr class="{{? it.isTable}}table{{??}}field{{?}}" style="{{? it.isTable}}background-color:#d9edf7;{{?}}">\
					<td>\
						<label class="checkbox-inline">\
							<input type="hidden" class="name" name="name_{{= it.idx}}" value="{{= it.name}}">\
							<input type="hidden" class="type" name="type_{{= it.idx}}" value="{{= it.field_type}}">\
							<input type="hidden" class="label" name="label_{{= it.name}}" value="{{= it.label}}">\
				       	 	<input type="checkbox" class="ibps" name="field" checked="checked"/>\
				       	 	<span class="lbl">{{= it.label}}</span>\
		                 </label>\
					</td>\
				</tr>';
		
		this.trTemplateDoT = doT.template(this.trTemplate);
	};

	/**
	 * 方法
	 */
	DataTemplateSelectField.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			var params = frameElement.dialog.params;
			this.fields = params.data;
			
			//初始化快速操作按钮
			this.initQuickButtons();
			//初始化导出勾选
			this.initSelectField();
		},
		initQuickButtons:function(){
			var me = this;
			
			$(document).on("click",".chk",function() {
				var ck = $(this).is(':checked');
				var sf = $("[name='field']");
				sf.each(function(){
					$(this).prop("checked", ck);
				});
			});
		},
		_random : function(){
			return Math.round(Math.random() * 1000000 + 1);
		},
		initSelectField:function(){
			var me = this,
				fields = this.fields,
				aryTr = [];
			
			for(var i = 0, len = fields.length; i < len; i++){
				fields[i].idx = me._random();
				if(fields[i].field_type == 'table'){
					var tableTdHtml = me._getTableTdHtml(fields[i]);
					aryTr.push(tableTdHtml);
				}else if(fields[i].field_type != 'desc'
					&& fields[i].field_type != 'label'
					&& fields[i].field_type != 'fold_card'){
					var fieldHtml = me._getFieldTdHtml(fields[i], false);
					aryTr.push("<tbody class='fieldContainer'>");
					aryTr.push(fieldHtml);
					aryTr.push("</tbody>");
				}
			}
			
			$("#selectFields").append(aryTr.join(""));
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
					_fieldHtml = me._getFieldTdHtml(sfield, false);
				}
				aryTr.push(_fieldHtml);
			}
			aryTr.push("</tbody>");
			
			return aryTr.join("");
		},
		_getFieldTdHtml:function(field, isTable){
			var me = this;
			
			field.isTable = isTable;
			
			return this.trTemplateDoT(field);
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
				fields =[];
			
			// 字段导出勾选
			var _temp_table = null;
			$("[name='field']:checked").each(function(){
				var _self = $(this),
					tableName = _self.parents().filter("tbody").attr("name"),
					fieldName = _self.parents().filter("label").find(".name").val(),
					fieldType = _self.parents().filter("label").find(".type").val(),
					label = _self.parents().filter("label").find(".label").val();
			
				var  field = {
						name:fieldName,
						label:label,
						fieldType:$.isNotEmpty(fieldType)?fieldType:'text'
				};
				fields.push(field);
			});
			
			return fields;
		}
	};
})();