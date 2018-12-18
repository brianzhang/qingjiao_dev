<#assign form=formData?eval>
<#---
********************************************
字段控件
field json的控件字段
classVar  表单对应的class值
isMain 是否主表
********************************************
-->
<#macro field_control field classVars isMain showVal>
	<#assign keyTag><#if isMain>m<#else>s</#if></#assign>
	<#switch field.field_type>
		<#case "hidden"><#---隐藏域-->
				<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "text"><#---文本框-->
			<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "textarea"><#---多行文本框-->
			<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "editor"><#---富文本框-->
			<#noparse>${</#noparse>${classVars}.${field.name}}
		<#break>
		<#case "number"><#---数字-->
			<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "radio"><#---单项选择-->
			<p class="form-control-static"><#list  field.field_options.options as option><c:if test="<#noparse>${</#noparse>${classVars}.${field.name}=='${option.val}'}">${option.label}</c:if></#list></p>
		<#break>
		<#case "checkbox"><#---多项选择-->
			<p class="form-control-static"><#list  field.field_options.options as option><c:if test="<#noparse>${</#noparse>fn:contains(${classVars}.${field.name}, '${option.val}')}">${option.label}&nbsp;</c:if></#list></p>
		<#break>
		<#case "select"><#---下拉框-->
			<p class="form-control-static"><#list  field.field_options.options as option><c:if test="<#noparse>${</#noparse>${classVars}.${field.name}=='${option.val}'}">${option.label}</c:if></#list></p>
		<#break>
		<#case "datePicker"><#---日期控件-->
			<#assign val><#if field.dataType=='date'><fmt:formatDate value="<#noparse>${</#noparse>${classVars}.${field.name}}"  pattern="${field.field_options.datefmt}"/><#else><#noparse>${</#noparse>${classVars}.${field.name}}</#if></#assign>
			<p class="form-control-static">${val}</p>
		<#break>
		<#case "dictionary"><#---数据字典-->
			 <p class="form-control-static"><#noparse>${</#noparse>f:getDictLabel2(${classVars}.${field.name},'${field.field_options.dictionary}', 'key','${field.field_options.display_mode}','${field.field_options.split}', '')}</p>
		<#break>
		<#case "autoNumber"><#---自动编号-->
			<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "attachment"><#---附件-->
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="${keyTag}:${classVar}:${field.name}" ><#noparse>${</#noparse>${classVars}.${field.name}}</textarea>
			</div>
		<#break>
		<#case "office"><#---office-->
			<div data-toggle="office">
				<div id="${field.name}">
				</div>
				<input type="hidden" id="${field.name}_value" data-office_type="${field.field_options.office_type}" value="<#noparse>${</#noparse>${classVars}.${field.name}}"/>
			</div>
		<#break>
		<#case "selector"><#---选择器-->
				<div class="fr-selector" data-toggle="selector" data-type="${field.field_options.selector_type}" data-store="${field.field_options.store}"  <#if field.field_options.store=="bind">data-bind-id="${keyTag}:${classVars}:${field.field_options.bind_id}"</#if>  data-single="${field.field_options.is_single}">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="${keyTag}:${classVars}:${field.name}" ><#noparse>${</#noparse>${classVars}.${field.name}}</textarea>
				</div>
		<#break>
		<#case "customDialog"><#---自定义对话框-->
			<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "address"><#---地址-->
			<p class="form-control-static"><#noparse>${</#noparse>${classVars}.${field.name}}</p>
		<#break>
		<#case "linkdata"><#---下拉框-->
				<select  name="${controlName}" class="form-control " data-toggle="select2" data-multiple="${field.field_options.multiple}"
		                             data-linkdata="${field.field_options.linkdata}" data-id="${field.field_options.link_config.id}" data-text="${field.field_options.link_config.text}" data-value="${val}"
		                             data-placeholder="${field.field_options.placeholder}"  validate="{<#if field.field_options.required>required:true<#else>required:false</#if><#noparse>}</#noparse>"
		        </select>
		    <#break>
	</#switch>
</#macro>
<#macro sub_table_control field classVars subClassVars isMain>
		<#assign keyTag><#if isMain>m<#else>s</#if></#assign>
		<#assign tblName>${keyTag}:${subClassVars}</#assign>
		<table name="${tblName}" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">${field.label}</div>
			</caption>
			<thead>
				<tr>
		      	<#list field.field_options.columns as column>
	      		 	 <#if column.field_type == 'hidden' ||  column.field_options.hide><#else>
	       			 <th>${column.label}</th>
	       			 </#if>
				</#list>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="${subClassVars}" items="<#noparse>${</#noparse>${classVars}.${subClassVars}PoList}">	
					<tr>	
				 <#list  field.field_options.columns as column>
				 	 	 <#if column.field_type == 'hidden' || column.field_options.hide ><#else>
				 		<td>
							<@field_control  field=column  classVars=subClassVars isMain=isMain showVal=true/>
						</td>	
						  </#if>	
				</#list>
					</tr>
				</c:forEach>
			</tbody>
		</table>
</#macro>
<#---
********************************************
占比宽
********************************************
-->
<#function gridsToOccupy field>
<#assign occupy><#if field.field_options??>${field.field_options.grids_to_occupy}<#else>4</#if></#assign>
<#assign rtn>
<#if occupy =="1">
col-sm-3
<#elseif occupy =="2"  >
col-sm-6
<#elseif occupy =="3" >
col-sm-9
<#elseif occupy =="4"  >
col-sm-12
<#else>
col-sm-12
</#if></#assign>
 <#return rtn?trim>
</#function>
<#---
********************************************
字段
********************************************
-->
<#macro response_field field tableName isMain>
	<#assign classVars>${tableMap[tableName]}</#assign>
	<#if field.field_type =='table'>  <#-- 子表 -->
		<#assign fieldname=field.field_name>
		<#assign subClassVars><#if tableMap[fieldname?lower_case] != null && tableMap[fieldname?lower_case] != ''>${tableMap[fieldname?lower_case]?trim}<#elseif tableMap[fieldname?upper_case] != null && tableMap[fieldname?upper_case] != ''>${tableMap[fieldname?upper_case]?trim}<#else>${tableMap[fieldname]?trim}</#if></#assign>
		<@sub_table_control field=field classVars=classVars subClassVars=subClassVars isMain=false/>
	<#else >
		 <#if  field.field_type == 'hidden' || field.field_options.hide ><#else>
		 	<div class="fr_response_field ${gridsToOccupy(field)}" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${field.label}</label>
				  	<div class="fr-form-block">
				  		<#if (field.dataType=="date")>
							<p class="form-control-static"><fmt:formatDate value="<#noparse>${</#noparse>${classVars}.${field.name}}" /></p>		
						<#else>	
							<@field_control  field=field  classVars=classVars isMain=isMain showVal=true/>
							<#if field.field_options.default_value>${field.field_options.default_value}</#if>
						</#if>		
				 	</div>
			  	</div>
			</div>
		 </#if>
	</#if>
</#macro>
<#---
********************************************
以下是模版
********************************************
-->
	<form  class="fr-form"  id="${classVar}FormGet" >
	<#list  form.fields as field>
		<@response_field  field=field tableName=form.code isMain=true/>
	</#list>
	</form>