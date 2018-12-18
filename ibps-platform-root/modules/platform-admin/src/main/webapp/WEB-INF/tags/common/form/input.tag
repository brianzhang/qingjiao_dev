<%@tag pageEncoding="UTF-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@tag import="com.lc.ibps.base.core.util.string.StringUtil" %>
<%@ attribute name="label" required="true" type="java.lang.String" %>
<%@ attribute name="name" required="true" type="java.lang.String" %>
<%@ attribute name="value" required="false" type="java.lang.String" %>
<%@ attribute name="required" required="false" type="java.lang.Boolean" %>
<%@ attribute name="validate" required="false" type="java.lang.String" %>
<%@ attribute name="help" required="false" type="java.lang.String" %>
<%@ attribute name="sm" required="false" type="java.lang.String" %>
<%
	Boolean required_ = required;
	if(required_==null){
		required_=false;
	}
	if(StringUtil.isNotEmpty(validate) && validate.indexOf("required:true")>0){
		required_=true;
	}
	request.setAttribute("required_",required_);
	String needGroup = "n";
	String sm_ = sm;
	if(StringUtil.isEmpty(sm_)){
		sm_="10";
		needGroup = "y";
	}
	request.setAttribute("sm_",sm_);		
%>
<c:if test="${sm_ eq '10' && needGroup eq 'y'}">
<div class="form-group">
</c:if>
	<label class="col-sm-2 control-label">${label}<c:if test="${required_}"><span class="required">*</span></c:if>:
	</label>
	<div class="col-sm-${sm_}">
		<input type="text" class="form-control" id="${name }" name="${name }"
			value="${value }" validate="${validate }">
		<c:if test="${! empty help}"><span class="help-block m-b-none">${help }</span></c:if>
	</div>
<c:if test="${sm_ eq '10' && needGroup eq 'y'}">	
</div>
</c:if>