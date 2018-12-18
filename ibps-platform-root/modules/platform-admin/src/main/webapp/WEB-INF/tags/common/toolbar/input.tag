<%@tag pageEncoding="UTF-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@tag import="com.lc.ibps.base.core.util.string.StringUtil" %>
<%@ attribute name="type" required="true" type="java.lang.String" %>
<%@ attribute name="href" required="false" type="java.lang.String" %>
<%@ attribute name="label" required="true" type="java.lang.String" %>
<%@ attribute name="action" required="false" type="java.lang.String" %>
<%
	String href_ = href;
	if(StringUtil.isEmpty(href_)){
		href_="javascript:void(0);";
	}
	request.setAttribute("href_",href_);	
%>
<a class="btn btn-primary fa fa-${type}" href="${href_}" <c:if test="${action !=null}">action="${action}"</c:if>><span>${label}</span></a>
