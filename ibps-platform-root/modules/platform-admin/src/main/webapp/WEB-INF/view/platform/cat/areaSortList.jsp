<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/type.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/SelectOption.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<form class="form-horizontal" id="sortForm"  action="sort.htm"   method="post"  >
				<div class="form-table">
					<table class="table-detail" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td class="form_title" align="center" style="width: 85%;" >
								<select class="form-control" id="typeIds"
									name="typeIds" size="10" style="width: 100%;" multiple="multiple">
										<c:forEach items="${typeList}" var="type">
											<option value="${type.id }">${type.name }</option>
										</c:forEach>
								</select>
							</td>
							<td class="form_title" style="text-align: left; width: 80px">
							<ul>
								<li  class="p-xxs">
									<input type="button" class="btn btn-primary btn-sm fa fa-angle-double-up" id="btn_top" value="顶部" />
								</li>
								<li  class="p-xxs">
									<input type="button" class="btn btn-primary btn-sm fa fa-angle-up" id="btn_up" value="向上" /><br />
								</li>
								<li class="p-xxs">
										<input type="button" class="btn btn-primary btn-sm fa fa-angle-down" id="btn_down" value="向下" /><br /> 
								</li>
								<li  class="p-xxs">
									<input type="button" class="btn btn-primary btn-sm fa fa-angle-double-down" id="btn_bottom" value="底部" /><br />
								</li>
							</ul>
							</td>
						</tr>
					</table>
				</div>
			</form>
		</div>
	</body>
</html>