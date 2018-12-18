<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil,com.lc.ibps.base.core.util.AppUtil"%>
<%@page pageEncoding="UTF-8" contentType="text/javascript; charset=UTF-8"%>
//设置ContextPath
var __ctx='<%=request.getContextPath()%>';

var __auth='<%=AppUtil.getProperty("auth.framework","shiro")%>';
var __switchAllowed='<%=AppUtil.getProperty("user.switch.allowed","false")%>';

var __jsessionId='<%=session.getId() %>';

var __currentUserId = '<%= ContextUtil.getCurrentUserId() %>';

var __currentAccount = '<%= ContextUtil.getCurrentUserAccount() %>';

var __currentFullname = '<%= ContextUtil.getCurrentUserFullName() %>';

var __currentOrgId = '<%= ContextUtil.getCurrentOrgId()%>';

var __currentOrgName = '<%= ContextUtil.getCurrentOrgName() %>';

var __isSuper = <%= ContextUtil.isSuper() %>;

var __style = '<%= ContextUtil.getCurrentStyle()%>';