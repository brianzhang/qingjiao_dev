<%@tag pageEncoding="UTF-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@tag import="com.lc.ibps.base.core.util.string.StringUtil" %>
<%@ attribute name="label" required="true" type="java.lang.String" %>
<%@ attribute name="type" required="true" type="java.lang.String" %>
<%@ attribute name="href" required="false" type="java.lang.String" %>
<%
	String href_ = href;
	if(StringUtil.isEmpty(href_)){
		href_="javascript:void(0);";
	}
	request.setAttribute("href_",href_);	
%>
<a href="${href_}" class="btn btn-primary fa fa-${type }"><span>${label }</span></a>