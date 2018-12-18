<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil"%>
<%@page pageEncoding="UTF-8" contentType="text/javascript; charset=UTF-8"%>
//设置ContextPath	
var __ctx='<%=request.getContextPath()%>';

var __jsessionId='<%=session.getId() %>';

var __currentUserId = '<%= ContextUtil.getCurrentUserId() %>';
