<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Pymb/pymb.js"></script>
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
				<form  class="fr-form"  id="pymbForm" action="save.htm" >
					<input type="hidden" name="m:pymb:id"  value="${pymb.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pymb:createTime"   value="<fmt:formatDate value="${pymb.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pymb:updateTime"   value="<fmt:formatDate value="${pymb.updateTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">办学定位</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:pymb:school_local" style="display: none;" validate="{required:false}">${fn:escapeXml(pymb.school_local)}</textarea>
				<script id="m:pymb:school_localEditor" data-name="m:pymb:school_local" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业定位</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:pymb:pro_local" style="display: none;" validate="{required:false}">${fn:escapeXml(pymb.pro_local)}</textarea>
				<script id="m:pymb:pro_localEditor" data-name="m:pymb:pro_local" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学科支撑</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:pymb:subject_zhi_cheng_" style="display: none;" validate="{required:false}">${fn:escapeXml(pymb.subject_zhi_cheng_)}</textarea>
				<script id="m:pymb:subject_zhi_cheng_Editor" data-name="m:pymb:subject_zhi_cheng_" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">本专业社会需求</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:pymb:social_demand" style="display: none;" validate="{required:false}">${fn:escapeXml(pymb.social_demand)}</textarea>
				<script id="m:pymb:social_demandEditor" data-name="m:pymb:social_demand" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pymb:pro_name" value="${pymb.pro_name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pymb:pro_id" value="${pymb.pro_id}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否历史版本（"0"=历史版本，"1"=最新版本）</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pymb:history" value="${pymb.history}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
