<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/mail/outMail.js"></script>
	</head>
	<body class="gray-bg">
		<div class="ui-layout-west">
				<div class="layout-header">
        				<h5>外部邮件</h5>
        				<div class="layout-tools">
        					<a herf="javascript:void(0);" class="pinBtn"><i class="fa fa-angle-double-left"></i></a>
        				</div>
         		</div>
         		<select id=setId  class="form-control">  
		              <c:forEach var="mail" items="${mailList}">  
		         			<option value="${mail.id}"  <c:if test="${mail.id== defaultMail}">selected="selected"</c:if> >${mail.userName}</option>  
		        	  </c:forEach>
		        </select>
				<div class="tree-toolbar" >
					<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
					<a class="btn btn-primary fa fa-expand" title="展开"></a> 
					<a class="btn btn-primary fa fa-compress" title="收缩"></a>
					<a class="btn btn-primary fa fa-exchange"   title="收取邮件"></a>	
				</div>
				<div id="outMailTree" class="ztree" ></div>	
		</div>
		<div class="ui-layout-center"> 
			 <div class="treeFrame">
					  <iframe id="listFrame" src="list.htm?setId=${defaultMail}&types=inbox"  frameborder="no" width="100%" height="100%"></iframe>
				</div>
		</div>
	
	      <div id="subSysMenu"   class="bootstrap-contextmenu" >
	          <ul class="dropdown-menu" role="menu">
	               <li><a data-action="node_add" tabindex="-1"  ><i class="fa fa-add"></i>&nbsp;&nbsp;增加节点</a></li>
	              <li><a data-action="node_sort" tabindex="-1"><i class="fa fa-sort"></i>&nbsp;&nbsp;节点排序</a></li>
	          </ul>
	      </div>
	</body>
</html>