<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuan.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/bishe/urlZhiYuant/urlZhiYuan/listForStudents.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="urlZhiYuanForm" action="save.htm" >
					<input type="hidden" name="m:urlZhiYuan:id"  value="${urlZhiYuan.id}"/>
				<div class="fr_response_field col-sm-12" >
				   <h2>分配导师</h2>
				</div>	
                 <br /><br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">选择教师</label>
				  	<div class="fr-form-block">
				          <select class="fr-form-control" name="m:urlZhiYuan:finalteacherId"  value="${urlZhiYuan.finalteacherId}" validate="{required:false}">
					      <option value="">请选择</option>
					      <c:forEach items="${partyEmployeePo}" var="u">
			                        <option value="${u.id}">${u.name}</option>
			                        
			                </c:forEach>
					      </select>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
