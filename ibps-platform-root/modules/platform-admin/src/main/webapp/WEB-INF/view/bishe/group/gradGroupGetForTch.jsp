<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/group/gradGroup.js"></script>
		<script type="text/javascript">
		function saveGroupData() {
			var groupId = $('#id').val();
			var date = $('#date').val();
			var time = $('#time').val();
			var place = $('#place').val();
			debugger
			$.ajax({
				type: "POST",
				url : "/bishe/group/gradGroup/saveGroupData.htm",
				data:{"groupId":groupId, "date":date,"time":time,"place":place,},
				dataType:"json",
				success : function(data) {
					if (data.status) {
						DialogUtil.msg(data.msg);
						window.location.reload(true);
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
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
					<c:if test="${role == 'sec' }"> 
					 <a class="btn btn-primary fa fa-add" href="javascript:void(0);" onclick="saveGroupData()" ><span>保存</span></a>
					 </c:if>
					
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="gradGroupFormGet" >

				<input type="hidden" name="id" id="id"  value="${gradGroup.id}"/>

			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  disabled="disabled"value="${tchName}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>

<c:if test="${type == '中期' }">
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
			<label class="fr-control-label">${gradGroup.type}日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" <c:if test="${role != 'sec' }">  readonly="readonly"  </c:if> class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="date" id="date"  value="<fmt:formatDate value="${gradGroup.date}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}时间</label>
				  	<div class="fr-form-block">
				<input type="text" <c:if test="${role != 'sec' }">  readonly="readonly"  </c:if> class="fr-form-control" name="time" id="time" value="${gradGroup.time}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			

			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}地点</label>
				  	<div class="fr-form-block">
				<input type="text" <c:if test="${role != 'sec'}">  readonly="readonly"  </c:if> class="fr-form-control" name="place" id="place"  value="${gradGroup.place}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</c:if>

<c:if test="${type == '答辩' }">
	<div class="fr_response_field col-sm-12" >
		<div class="fr-form-group">
			<label class="fr-control-label">${gradGroup.type}时间</label>
			<div class="fr-form-block">
				<input type="text"  readonly="readonly"   class="fr-form-control" name="time" id="time1" value="${gradGroup.time}" validate="{required:false}"/>
			</div>
		</div>
	</div>
	<div class="fr_response_field col-sm-12" >
		<div class="fr-form-group">
			<label class="fr-control-label">${gradGroup.type}地点</label>
			<div class="fr-form-block">
				<input type="text"   readonly="readonly"  class="fr-form-control" name="place" id="place1"  value="${gradGroup.place}" validate="{required:false}"/>
			</div>
		</div>
	</div>
</c:if>
			
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">${gradGroup.type}小组名称</label>
				  	<div class="fr-form-block">
				<input type="text"  class="fr-form-control" name="m:kaitiGroup:daBianDeDian" disabled="disabled"value="${gradGroup.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>

			
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组长</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:kaitiGroup:daBianDeDian" disabled="disabled"value="${gradGroup.leader}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
