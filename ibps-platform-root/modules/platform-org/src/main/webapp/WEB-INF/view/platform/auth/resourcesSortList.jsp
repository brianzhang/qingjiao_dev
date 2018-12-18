<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/resources.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/SelectOption.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-form " >
					<form class="form-horizontal" id="sortForm"  action="sort.htm"   method="post"  >
						<div class="form-table">
							<table class="table-detail" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="form_title" align="center" style="width: 85%;" >
										<select class="form-control" id="ids"
											name="ids" size="10" style="width: 100%;" multiple="multiple">
												<c:forEach items="${resourcesList}" var="resources">
													<option value="${resources.id }">${resources.name }</option>
												</c:forEach>
										</select>
									</td>
									<td class="form_title" style="text-align: left; width: 80px;">
										<ul style="padding-left: 5px;"><a  href="javascript:void(0);"  class="btn btn-primary btn-sm fa fa-angle-double-up" id="btn_top"><span>顶部</span></a></ul>
										<ul style="padding-left: 5px;"><a  href="javascript:void(0);"  class="btn btn-primary btn-sm fa fa-angle-up" id="btn_up"><span>向上</span></a></ul>
										<ul style="padding-left: 5px;"><a  href="javascript:void(0);"  class="btn btn-primary btn-sm fa fa-angle-down" id="btn_down"><span>向下</span></a></ul>
										<ul style="padding-left: 5px;"><a  href="javascript:void(0);"  class="btn btn-primary btn-sm fa fa-angle-double-down" id="btn_bottom"><span>底部</span></a></ul>
									</td>
								</tr>
							</table>
						</div>
						
					</form>
				</div>
		</div>
	</body>
</html>