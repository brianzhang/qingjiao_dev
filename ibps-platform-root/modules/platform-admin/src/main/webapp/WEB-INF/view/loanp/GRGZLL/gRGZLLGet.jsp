<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GRGZLL/gRGZLL.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
<%-- 			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div> --%>
			<div class="">
					<form  class="fr-form"  id="gRGZLLForm" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.khh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.khmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开始日期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.ksrq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.szdw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在部门</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.szbm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">结束日期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.jsrq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRGZLL.dwxz=='1'}">机关事业</c:if><c:if test="${gRGZLL.dwxz=='2'}">国营企业</c:if><c:if test="${gRGZLL.dwxz=='3'}">金融企业</c:if><c:if test="${gRGZLL.dwxz=='4'}">军队</c:if><c:if test="${gRGZLL.dwxz=='5'}">私营企业</c:if><c:if test="${gRGZLL.dwxz=='6'}">个体经营户</c:if><c:if test="${gRGZLL.dwxz=='7'}">三资企业</c:if><c:if test="${gRGZLL.dwxz=='8'}">邮电通讯</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">从事行业描述</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.csxyms}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担任职务</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRGZLL.drzw=='1'}">高级领导</c:if><c:if test="${gRGZLL.drzw=='2'}">中级领导</c:if><c:if test="${gRGZLL.drzw=='3'}">一般员工</c:if><c:if test="${gRGZLL.drzw=='4'}">其他</c:if><c:if test="${gRGZLL.drzw=='5'}">未知</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位邮编</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.dwyb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.dwdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.dwdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.ysr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRGZLL.bzz}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
					<input type="hidden"  id="sfid" value="${sfid}">
		
			<input type="hidden"  id="id" value="${id}">
	</body>
</html>
