<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/ds/dataSource.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/html"  id='paramTem'>
		    {{each list as item i}}
				<tr>								
					<th><span>{{if item.comment=="" }}  {{item.name}}:{{else}}  {{item.comment}}:   {{/if}}</span></th>
					<td>{{item.value}}</td>
				</tr>
			{{/each}}
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form" id="dataSourceDiv">
				<table class="table-form"   cellspacing="0">
						<tr>								
							<th><span>别名:</span></th>
							<td>${dataSource.alias}</td>
						</tr>
						<tr>								
							<th><span>名称:</span></th>
							<td>${dataSource.name}</td>
						</tr>
						<tr>								
							<th><span>数据库类型:</span></th>
							<td>${dataSource.driver}</td>
						</tr>
						<tr>								
							<th><span>链接地址:</span></th>
							<td>${dataSource.driverUrl}</td>
						</tr>
						<tr>								
							<th><span>用户名:</span></th>
							<td>${dataSource.user}</td>
						</tr>
						<tr>								
							<th><span>密码:</span></th>
							<td >
								 <input type="password"  value="${dataSource.password}" readOnly="true" style="border-style:none"/>
						    </td>
						</tr>
						<tr>								
							<th><span>是否默认:</span></th>
							<td>
								<c:if test="${dataSource.isDefault==false}">否</c:if>
								<c:if test="${dataSource.isDefault==true}">是</c:if>
							</td>
						</tr>
						<tr>								
							<th><span>状态:</span></th>
							<td>${dataSource.status}</td>
						</tr>
						<tr>								
							<th><span>说明:</span></th>
							<td>${dataSource.comment}</td>
						</tr>
				</table>
				<table class="table-form"   cellspacing="0"  id="paramView">
				</table>
				<textarea id="paramJson"  style="display: none;">${fn:escapeXml(paramJson)}</textarea>
				 </div>
			</div>
		</div>
	</body>
</html>