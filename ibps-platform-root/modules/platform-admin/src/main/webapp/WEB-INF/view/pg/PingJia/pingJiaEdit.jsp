<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PingJia/pingJia.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="pingJiaForm" action="save.htm" >
					<input type="hidden" name="m:pingJia:id"  value="${pingJia.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pingJia:createTime"   value="<fmt:formatDate value="${pingJia.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价周期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pingJia:zhouQi" value="${pingJia.zhouQi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要评价人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pingJia:pingJieRen" value="${pingJia.pingJieRen}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价人身份</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pingJia:juanFen" value="${pingJia.juanFen}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价机制</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:pingJia:pingJieJiZhi" style="display: none;" validate="{required:false}">${fn:escapeXml(pingJia.pingJieJiZhi)}</textarea>
				<script id="m:pingJia:pingJieJiZhiEditor" data-name="m:pingJia:pingJieJiZhi" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">方案ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pingJia:fangAnID" value="${pingJia.fangAnID}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">方案名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pingJia:mingCheng" value="${pingJia.mingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最近一次评价</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pingJia:pingJia" value="${pingJia.pingJia}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
