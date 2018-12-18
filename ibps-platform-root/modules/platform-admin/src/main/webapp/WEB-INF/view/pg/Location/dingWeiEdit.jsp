<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Location/dingWei.js"></script>
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
				<form  class="fr-form"  id="dingWeiForm" action="save.htm" >
					<input type="hidden" name="m:dingWei:id"  value="${dingWei.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:dingWei:createTime"   value="<fmt:formatDate value="${dingWei.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">办学定位</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:dingWei:banXueDingWei" style="display: none;" validate="{required:false}">${fn:escapeXml(dingWei.banXueDingWei)}</textarea>
				<script id="m:dingWei:banXueDingWeiEditor" data-name="m:dingWei:banXueDingWei" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业定位</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:dingWei:zhuanYeDingWei" style="display: none;" validate="{required:false}">${fn:escapeXml(dingWei.zhuanYeDingWei)}</textarea>
				<script id="m:dingWei:zhuanYeDingWeiEditor" data-name="m:dingWei:zhuanYeDingWei" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学科支撑</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:dingWei:xueKeZhiCheng" style="display: none;" validate="{required:false}">${fn:escapeXml(dingWei.xueKeZhiCheng)}</textarea>
				<script id="m:dingWei:xueKeZhiChengEditor" data-name="m:dingWei:xueKeZhiCheng" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">社会需求</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:dingWei:sheHuiXuQiu" style="display: none;" validate="{required:false}">${fn:escapeXml(dingWei.sheHuiXuQiu)}</textarea>
				<script id="m:dingWei:sheHuiXuQiuEditor" data-name="m:dingWei:sheHuiXuQiu" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">方案ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dingWei:fangAnID" value="${dingWei.fangAnID}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">方案名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:dingWei:fangMingCheng" value="${dingWei.fangMingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
