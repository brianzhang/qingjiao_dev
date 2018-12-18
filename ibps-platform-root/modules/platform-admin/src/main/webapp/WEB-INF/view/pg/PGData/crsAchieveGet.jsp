<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/crsAchieve.js"></script>
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
					<form  class="fr-form"  id="crsAchieveFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${crsAchieve.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合理</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.result1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">负责人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.principle1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">规范性</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.normative}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">完整性</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.integrity}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">试卷分析</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.analyze1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程分析</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.analyze2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.remark}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管理人员</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.manager}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">判定结果</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.result2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">整改意见</label>
				  	<div class="fr-form-block">
			${crsAchieve.opinion}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">负责人</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.principle2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">覆盖</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsAchieve.cover}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
