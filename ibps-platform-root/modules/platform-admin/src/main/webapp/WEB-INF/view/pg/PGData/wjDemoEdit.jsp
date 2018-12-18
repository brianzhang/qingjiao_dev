<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/wjDemo2.js"></script> 
		
	</head>
	<body>
		<!-- 顶部按钮 -->
		<input type="hidden"  name="wjDemo.wjtype" id="wjDemo.wjtype" value="${ques_kind}"  class="form-control"  />
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<!-- <a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a> -->
					<!--<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>  -->
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list2.htm?ques_kind=${wjDemo.wjtype}"  class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="wjDemoForm" action="save.htm" >
					<input type="hidden" name="m:wjDemo:id"  value="${wjDemo.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">IP地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:ip" value="${wjDemo.ip}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:createBy" value="${wjDemo.createBy}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:wjDemo:createTime"   value="<fmt:formatDate value="${wjDemo.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:updateBy" value="${wjDemo.updateBy}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:wjDemo:updateTime"   value="<fmt:formatDate value="${wjDemo.updateTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">用户id</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:userid" value="${wjDemo.userid}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			   <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">问卷类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:wjtype" value="${wjDemo.wjtype}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div> 
			    
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">json内容</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:json" value="${wjDemo.json}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">用户姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:username" value="${wjDemo.username}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">用户身份</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:identy" value="${wjDemo.identy}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事件</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:wjDemo:event" value="${wjDemo.event}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
