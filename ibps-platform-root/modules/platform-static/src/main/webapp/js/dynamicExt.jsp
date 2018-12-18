<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil,com.lc.ibps.base.core.util.AppUtil, com.lc.ibps.auth.utils.SecurityUtil"%>
<%@page pageEncoding="UTF-8" contentType="text/javascript; charset=UTF-8"%>

var  __wsSupport = '<%= AppUtil.getProperty("web.socket.support", "false")%>';
var  __wsTitle = '<%= AppUtil.getProperty("web.socket.title", "即时通讯")%>';
var  __wsUrl = '<%= "ws://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/imserver/" %>';

var __rights = '<%=SecurityUtil.getRights(request)%>';
