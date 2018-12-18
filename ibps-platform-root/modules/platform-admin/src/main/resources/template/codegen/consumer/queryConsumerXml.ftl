<#if isBaseModule = 'true'>
<#assign package="com."+cAlias+"."+cPlatform+"."+sys + ".consumer">
<#else>
<#assign package="com."+cAlias+"."+cPlatform+"."+sys+"." +  module + ".consumer">
</#if>
<?xml version="1.0" encoding="UTF-8"?>

<ibps:validations xmlns:ibps="http://www.bpmhome.cn/ibps/validation/def" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xsi:schemaLocation="http://www.bpmhome.cn/ibps/validation/def ibps-validation-def.xsd">
  <ibps:class package="${package}" name="${class}QueryServiceImpl">
		<ibps:method name="get">
			<ibps:param name="id" type="String">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}ID为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
		<ibps:method name="loadCascade">
			<ibps:param name="id" type="String">
				<ibps:verification name="notNull">
					<ibps:message>${model.tabComment}ID为空</ibps:message>
				</ibps:verification>
			</ibps:param>
		</ibps:method>
		</#if>
	</ibps:class>
</ibps:validations>