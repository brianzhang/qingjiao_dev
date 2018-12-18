<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/XiuDing/aimXiuDing.js"></script>
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
				<form  class="fr-form"  id="aimXiuDingForm" action="save.htm" >
					<input type="hidden" name="m:aimXiuDing:id"  value="${aimXiuDing.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:aimXiuDing:createTime"   value="<fmt:formatDate value="${aimXiuDing.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">方案ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:aimXiuDing:fangAnID" value="${aimXiuDing.fangAnID}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">方案名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:aimXiuDing:mingCheng" value="${aimXiuDing.mingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修订知道思想</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:aimXiuDing:siXiang" style="display: none;" validate="{required:false}">${fn:escapeXml(aimXiuDing.siXiang)}</textarea>
				<script id="m:aimXiuDing:siXiangEditor" data-name="m:aimXiuDing:siXiang" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修订日期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:aimXiuDing:xiuDingRiQi" value="${aimXiuDing.xiuDingRiQi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修订执行人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:aimXiuDing:zhiHangRen" value="${aimXiuDing.zhiHangRen}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">修订流程</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:aimXiuDing:liuCheng" value="${aimXiuDing.liuCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最近一次修订</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:aimXiuDing:xiuDing" value="${aimXiuDing.xiuDing}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
