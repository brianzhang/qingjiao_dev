
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<title>t_label_def管理列表</title>
		<script type="text/javascript">
		function compoundLabel(){
			debugger;
			var labelName = $('#labelName').val();
			var typeId = $('#typeId').val();
			var ids = $('#labelId').val();
			var aa = ids.split(','); 
			var url = "/bishe/audit/labelDef/compound.htm";
            $.post(url, {'ids': aa.join(","), 'labelName' : labelName,"typeId":typeId}, function (responseText) {
            	var msg = new com.lc.form.ResultMessage(responseText);
            	
    			if (msg.isSuccess()) {
    				DialogUtil.msg(msg.getMessage());
/*      				window.location.href = __ctx+'/bishe/audit/labelDef/list.htm';
     				parent.location.reload() ; */
    				DialogUtil.closeAll();
    				
    				//
/*     				window.location.href="about:blank"; 
    				window.location.href = __ctx+'/bishe/audit/labelDef/list.htm';
    				window.location.reload(true); */
    			} else {
    				DialogUtil.error(msg.getMessage());
    			}
            })
		}
		</script>
	</head>
	<body>
<%-- 		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 	
							
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<label   class="search-label">标签名称</label>:
									<input type="text"  id ="labelName"name="Q^LABEL_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">标签类型</label>:
									<select id ="typeId" name="Q^TYPE_ID_^S" class="form-control " >
										<option value="">--所有--</option>	
										<c:forEach items="${labelTypeList}" var="type">
											<option value="${type.id}">${type.type}</option>
										</c:forEach>
									</select>
								</div>
<!-- 								<div class="form-group">
									<label   class="search-label">标签状态</label>:
									<input type="text"  name="Q^LABEL_STATE_^SL"  class="form-control"  />
								</div>  -->
							</div>
						</form>
					</div><!--/ 查询条件-->
					
				</div>
			</div><!--/ 操作、查询-->
		</div> --%>
	
	
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-add"   onclick="compoundLabel()" ><span>合成</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="labelDefForm" action="save.htm" >
					<input type="hidden" name="labelId"  Id="labelId" value="${ids}"/>
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
				<select class="fr-form-control" id="typeId" name="typeId"   validate="{required:false}">
					<option value="-1"></option>	
					<c:forEach items="${labelTypePoList}" var="type">
						<option value="${type.id}">${type.type}</option>
					</c:forEach>
				</select>
				 	</div>
			  	</div>
			</div>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标签状态</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:labelDef:labelState"  value="${labelDef.labelState}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="actived" <c:if test="${labelDef.labelState=='actived'}">selected="selected"</c:if>>激活</option>
				    <option value="inactive" <c:if test="${labelDef.labelState=='inactive'}">selected="selected"</c:if>>禁用</option>
				</select>
				 	</div>
			  	</div>
			</div> --%>
</form>

			</div>
		</div>
	
	</body>
	
</html>
