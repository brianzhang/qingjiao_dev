<%@tag pageEncoding="UTF-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@tag import="com.lc.ibps.base.core.util.string.StringUtil" %>
<%@ attribute name="label" required="true" type="java.lang.String" %>
<%@ attribute name="required" required="false" type="java.lang.Boolean" %>
<%@ attribute name="group" required="false" type="java.lang.Boolean" %>
<%
	Boolean required_ = required;
	if(required_==null){
		required_=false;
	}
	request.setAttribute("required_",required_);	
	
	Boolean group_ = group;
	if(group_==null){
		group_=true;
	}
	request.setAttribute("group_",group_);		
%>
<c:if test="${group_}">
<div class="form-group">
</c:if>
	<label class="col-sm-2 control-label">${label}<c:if test="${required_}"><span class="required">*</span></c:if>:
	</label>
	<div class="col-sm-10">
		<jsp:doBody/>  
	</div>
<c:if test="${group_}">	
</div>
</c:if>