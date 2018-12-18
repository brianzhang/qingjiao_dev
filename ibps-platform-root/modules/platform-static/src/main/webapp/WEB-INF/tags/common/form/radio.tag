<%@tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@tag import="java.util.List"%>
<%@tag import="com.lc.ibps.base.core.util.string.StringUtil"%>
<%@tag import="com.lc.ibps.base.core.util.string.StringCollections"%>
<%@tag import="com.lc.ibps.base.core.entity.OptionEntity"%>
<%@ attribute name="label" required="true" type="java.lang.String"%>
<%@ attribute name="name" required="true" type="java.lang.String"%>
<%@ attribute name="value" required="false" type="java.lang.Boolean"%>
<%@ attribute name="options" required="true" type="java.lang.String" description="格式是：a#v1,b#v2,c#v3"%>
<%@ attribute name="required" required="false" type="java.lang.Boolean"%>
<%@ attribute name="validate" required="false" type="java.lang.String"%>
<%@ attribute name="sm" required="false" type="java.lang.String"%>
<%@ attribute name="help" required="false" type="java.lang.String"%>
<%
	Boolean required_ = required;
	if(required_==null){
		required_=false;
	}
	request.setAttribute("required_",required_);	
	Boolean value_ = value;
	if(value_== null){
		value_ = true;
	}
	request.setAttribute("value_",value_);	
	List<OptionEntity> optionEntitys = StringCollections.toOptionList(options, ",", "#");
	request.setAttribute("optionEntitys",optionEntitys);		
	
	String sm_ = sm;
	if(StringUtil.isEmpty(sm_)){
		sm_="10";
	}
	request.setAttribute("sm_",sm_);			
%>
<c:if test="${sm_ eq '10'}">
<div class="form-group">
</c:if>
	<label class="col-sm-2 control-label">${label }<c:if test="${required_}"><span class="required">*</span></c:if>:
	</label>
	<div class="col-sm-${sm}">
		<c:forEach items="${optionEntitys}" var="optionEntity">
			<label class="radio-inline"> <input type="radio" class="ibps" value="${optionEntity.value}" name="${name }"
				<c:if test="${value_==true || value_ eq optionEntity.value}">checked="checked"</c:if>><span class="lbl">${optionEntity.label}</span>
			</label>			
		</c:forEach>	
		<c:if test="${! empty help}"><span class="help-block m-b-none">${help }</span></c:if>
	</div>
<c:if test="${sm_ eq '10'}">
</div>
</c:if>