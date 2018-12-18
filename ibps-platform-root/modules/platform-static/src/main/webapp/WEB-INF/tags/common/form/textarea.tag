<%@tag pageEncoding="UTF-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@tag import="com.lc.ibps.base.core.util.string.StringUtil" %>
<%@ attribute name="label" required="true" type="java.lang.String" %>
<%@ attribute name="name" required="true" type="java.lang.String" %>
<%@ attribute name="value" required="false" type="java.lang.String" %>
<%@ attribute name="required" required="false" type="java.lang.Boolean" %>
<%@ attribute name="rows" required="false" type="java.lang.String" %>
<%@ attribute name="cols" required="false" type="java.lang.String" %>
<%
	Boolean required_ = required;
	if(required_==null){
		required_=false;
	}
	request.setAttribute("required_",required_);	
%>
<div class="form-group">
	<label class="col-sm-2 control-label">${label}<c:if test="${required_}"><span class="required">*</span></c:if>:
	</label>
	<div class="col-sm-10">
		<textarea class="form-control"  id="${name }" name="${name }" rows="5" cols="40">${value}</textarea>
	</div>
</div>