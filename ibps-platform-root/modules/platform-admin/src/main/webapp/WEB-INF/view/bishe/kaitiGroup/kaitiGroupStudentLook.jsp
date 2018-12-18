<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/kaitiGroup/kaitiGroup.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<h2>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp开题情况</h2>
		</br>
			<div class="">
				<form  class="fr-form"  id="kaitiGroupForm" action="save.htm" >
				
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianXiaoZu" disabled="disabled" value="${urlZhiYuan.xh}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianXiaoZu" disabled="disabled"value="${urlZhiYuan.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>	
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在团队</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianXiaoZu"disabled="disabled" value="${urlZhiYuan.finaltd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>	
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题小组</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianXiaoZu"disabled="disabled" value="${kaitiGroup.daBianXiaoZu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>

			 	<%--<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker"disabled="disabled" datefmt="yyyy-MM-dd"   name="m:kaitiGroup:daBianShiJian"   value="<fmt:formatDate value="${kaitiGroup.daBianShiJian}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>--%>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group">
				 	<label class="fr-control-label">开题时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:ktsj" disabled="disabled"value="${kaitiGroup.ktsj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开题地点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianDeDian" disabled="disabled"value="${kaitiGroup.daBianDeDian}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	
			 	
</form>

			</div>
		</div>
	</body>
</html>
