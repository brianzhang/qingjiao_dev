<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/group/gradGroup.js"></script>
		<script type="text/javascript">
		function saveForZQ() {
			var name = $('#name').val();
			var type = $('#type').val();
			debugger;
			if(name == "" || type == "")
				return;
			$.ajax({
				type: "POST",
				url : "/bishe/group/gradGroup/saveForZQ.htm",
				data:{"name":name, "type":type},
				dataType:"json",
				success : function(data) {
					if (data.isSuccess) {
						DialogUtil.confirm(data.msg + ',是否继续操作',
								function(rtn) {
								if(rtn)
									window.location.reload(true);
								else
									window.location.href = __ctx+'/bishe/group/gradGroup/list.htm';
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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="gradGroupForm" action="save.htm" >
					<input type="hidden" name="m:gradGroup:id"  value="${gradGroup.id}"/>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:createBy" value="${gradGroup.createBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:gradGroup:createTime"   value="<fmt:formatDate value="${gradGroup.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div> --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:updateBy" value="${gradGroup.updateBy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">更新时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:gradGroup:updateTime"   value="<fmt:formatDate value="${gradGroup.updateTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div> --%>
 			 <div class="fr_response_field col-sm-12" >
			 		<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" <c:if test="${role != "sec" }">  readonly="readonly"  </c:if>  class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:gradGroup:date"   value="<fmt:formatDate value="${gradGroup.date}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div> 
 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:time" value="${gradGroup.time}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> 
 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}地点</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:place" value="${gradGroup.place}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> 
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}小组名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id = "name"name="m:gradGroup:name" value="${gradGroup.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="type"name="m:gradGroup:type" value="${gradGroup.type}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组长</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:leader_" value="${gradGroup.leader_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组长ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:leader_id_" value="${gradGroup.leader_id_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> --%>
<%--  			 <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:term_" value="${gradGroup.term_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>  --%>
<%-- 			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">院系ID</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gradGroup:org_id_" value="${gradGroup.org_id_}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> --%>
</form>

			</div>
		</div>
	</body>
</html>
