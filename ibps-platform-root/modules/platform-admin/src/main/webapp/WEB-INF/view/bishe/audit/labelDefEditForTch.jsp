<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/labelDef.js"></script>
		<script type="text/javascript">
		function tchDef() {
			var labelName = $('#labelName').val();
			var typeId = $('#typeId').val();
			debugger;
			if(labelName == "")
				return;
			$.ajax({
				type: "POST",
				url : "/bishe/audit/labelDef/tchDef.htm",
				data:{"labelName":labelName,"typeId":typeId},
				dataType:"json",
				success : function(data) {
					if (data.isSuccess) {
						DialogUtil.confirm(data.msg + ',是否继续操作',
								function(rtn) {
								if(rtn)
									window.location.reload(true);
								else
									window.location.href = __ctx+'/bishe/audit/labelDef/listForTch.htm';
								});
					} else {
						DialogUtil.error(data.msg);
					}
				}
			})
		}
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a onclick="tchDef()"class="btn btn-primary fa fa-back" ><span>保存</span></a>
					<a href="listForTch.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="labelDefForm" action="save.htm" >
					<input type="hidden" name="m:labelDef:id"  value="${labelDef.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标签名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="labelName" name="labelName" value="${labelDef.labelName}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
						<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标签类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" id="typeId" name="m:labelDef:type_id_"   validate="{required:false}">
					<option value="-1"></option>	
					<c:forEach items="${labelTypePoList}" var="type">
						<option value="${type.id}" <c:if test="${type.id == curTypeId}">selected</c:if>>${type.type}</option>
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
