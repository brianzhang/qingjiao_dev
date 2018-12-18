<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanForChangeBatch.js"></script>
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
				<form  class="fr-form"  id="urlZhiYuanForm" action="saveBatch.htm" >
					<input type="hidden" name="m:urlZhiYuan:id"  value="${urlZhiYuan.id}"/>
				<div class="fr_response_field col-sm-12" >
				   <h2>修改答辩批次</h2>
				</div>	
                 <br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh" disabled="true" value="${urlZhiYuan.xh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name"  disabled="true"  value="${urlZhiYuan.name}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>

			<div class="fr_response_field col-sm-12" >
				<div class="fr-form-group">
					<label class="fr-control-label">批次</label>
					<div class="fr-form-block">
						<select class="fr-form-control"  id="dbBatch" name="m:urlZhiYuan:dbBatch" validate="{required:false}" >
							<option value="-1"></option>
							<c:forEach items="${batchList}" var="batch">
								<option value="${batch}">${batch}</option>
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
