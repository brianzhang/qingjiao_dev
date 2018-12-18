<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!-- sidebar start -->
<div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
    <div class="am-offcanvas-bar admin-offcanvas-bar">
        <ul class="am-list admin-sidebar-list">
        	<li><a href="${ctx}/gradp/course/crsStd/room.htm"><span class="am-icon-commenting"></span> 聊天</a></li>
            <li class="admin-parent"><a href="javascript:;"><span class="am-icon-cog"></span> 个性化</a></li>
            <li><a href="${ctx}/gradp/course/crsStd/help.htm"><span class="am-icon-globe"></span> 帮助</a></li>
        </ul>
        <div class="am-panel am-panel-default admin-sidebar-panel">
            <div class="am-panel-bd">
                <p><span class="am-icon-tag"></span> Welcome</p>
                <p>欢迎使用Room聊天室~</p>
            </div>
        </div>
    </div>
</div>
<!-- sidebar end -->