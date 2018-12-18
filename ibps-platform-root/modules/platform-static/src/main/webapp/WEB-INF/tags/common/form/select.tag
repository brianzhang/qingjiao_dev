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
<%@ attribute name="value" required="false" type="java.lang.String"%>
<%@ attribute name="options" required="true" type="java.lang.String" description="格式是：a#v1,b#v2,c#v3"%>
<%@ attribute name="required" required="false" type="java.lang.Boolean"%>
<%@ attribute name="help" required="false" type="java.lang.String"%>
<%@ attribute name="sm" required="false" type="java.lang.String"%>
<%
	Boolean required_ = required;
	if(required_==null){
		required_=false;
	}
	request.setAttribute("required_",required_);
	String sm_ = sm;
	if(StringUtil.isEmpty(sm_)){
		sm_="10";
	}
	request.setAttribute("sm_",sm_);	
	List<OptionEntity> optionEntitys = StringCollections.toOptionList(options, ",", "#");
	request.setAttribute("optionEntitys",optionEntitys);	
%>
<label class="col-sm-2 control-label">${label }<c:if test="${required_}"><span class="required">*</span></c:if>:
</label>
<div class="col-sm-${sm_ }">
	<select class="form-control" id="${name }" name="${name }">
		<c:forEach items="${optionEntitys}" var="optionEntity">
			<option value="${optionEntity.value }" <c:if test="${value == optionEntity.value}">selected</c:if>>${optionEntity.label }</option>
		</c:forEach>
	</select>
	<c:if test="${! empty help}"><span class="help-block m-b-none">${help }</span></c:if>
</div>