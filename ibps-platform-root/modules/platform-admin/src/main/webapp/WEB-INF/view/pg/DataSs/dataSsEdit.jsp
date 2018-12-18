<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/DataSs/dataSs.js"></script>
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
				<form  class="fr-form"  id="dataSsForm" action="save.htm" >
					<input type="hidden" name="m:dataSs:id"  value="${dataSs.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dataSs:createTime"   value="<fmt:formatDate value="${dataSs.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dataSs:pingJieID" value="${dataSs.pingJieID}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dataSs:shuJuLeiXing" value="${dataSs.shuJuLeiXing}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据来源</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dataSs:shuoJuLaiYuan" value="${dataSs.shuoJuLaiYuan}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价内容</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:dataSs:pingJieNeiRong" style="display: none;" validate="{required:false}">${fn:escapeXml(dataSs.pingJieNeiRong)}</textarea>
				<script id="m:dataSs:pingJieNeiRongEditor" data-name="m:dataSs:pingJieNeiRong" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">评价形式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dataSs:pingJiaXingShi" value="${dataSs.pingJiaXingShi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
