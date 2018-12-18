<#if isBaseModule = 'true'>
<#assign package="com."+cAlias+"."+cPlatform+"."+sys + ".consumer">
<#else>
<#assign package="com."+cAlias+"."+cPlatform+"."+sys+"." +  module + ".consumer">
</#if>
<?xml version="1.0" encoding="UTF-8"?>

<ibps:validations xmlns:ibps="http://www.bpmhome.cn/ibps/validation/def" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xsi:schemaLocation="http://www.bpmhome.cn/ibps/validation/def ibps-validation-def.xsd">
  <ibps:class package="${package}" name="${class}ServiceImpl">
		<ibps:method name="save" duplicate="false" index="0" identity="id">
			<ibps:param name="jsonData" type="JSONObjectString">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}数据为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		<ibps:method name="deleteByIds">
			<ibps:param name="ids" type="StringArray">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}ID数组为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		<#if vars.flowKey?exists && vars.flowKey != "">
		<ibps:method name="save">
			<ibps:param name="cmd" type="Object">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}流程数据为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		<ibps:method name="startFlow">
			<ibps:param name="defKey" type="String">
				<ibps:verification name="notNull">
					<ibps:message>流程定义key为空</ibps:message>
				</ibps:verification>
			</ibps:param>
			<ibps:param name="destination" type="String">
			</ibps:param>
			<ibps:param name="ids" type="StringArray">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}ID数组为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		</#if>
		<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
		<ibps:method name="saveCascade" duplicate="false" index="0" identity="id">
			<ibps:param name="jsonData" type="JSONObjectString">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}数据为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		<ibps:method name="deleteByIdsCascade">
			<ibps:param name="ids" type="StringArray">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}ID数组为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		</#if>
	</ibps:class>
</ibps:validations>