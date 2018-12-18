<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyGroup.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="partyGroupForm" >
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">用户组名称</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${partyGroup.name}</p>
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">用户组别名</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${partyGroup.groupAlias}</p>
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">用户组描述</label>
						  	<div class="fr-form-block">
								<p class="form-control-static">${partyGroup.groupNote}</p>
						 	</div>
					  	</div>
					</div>
			
					<table name="s:partyUserGroup" data-mode="dialog" data-required="false" class="table table-bordered table-hover table-condensed">
						<caption>
							<div class="fr-table-header-label">组成员</div>
						</caption>
						<thead>
							<tr>
					     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:partyUserGroup" type="checkbox"></th>
				       			 <th>成员名</th>
					   		</tr>
						</thead>
						<tbody>
							<c:forEach var="partyUserGroup" items="${partyGroup.partyUserGroupPoList}">
								<tr>
									<td><input role="checkbox" class="cbox " type="checkbox" name="s:partyUserGroup" ></td>
							 		<td>
										<span>${partyUserGroup.userName}</span>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</form>

			</div>
		</div>
	</body>
</html>
