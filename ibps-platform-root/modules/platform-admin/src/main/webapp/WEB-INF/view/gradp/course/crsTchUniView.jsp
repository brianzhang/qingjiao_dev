
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="bootstrap/bootstrap-tour.min.css" />
<title>课程院系统一管理</title>
</head>
<body>
	<h1 style="margin: 5px; text-align: center; line-height: 70px">请确保以下课程已经导入教师授课表,且此操作授课教师将失去作业发布权利,请谨慎操作!!!</h1>
	<h2 style="margin: 5px; text-align: center; line-height: 70px;color:red">
		<c:forEach items="${crsName }" var="name">
 			${name},
 		</c:forEach>
	</h2>
	<div style="margin-top:5%;margin-left:25%">
		<label style="font-size:30px" >请选择管理哪学期的课程:</label>
		<select  id="term"  style="height:35px;font-size:20px;width:30%" >
			<c:forEach items="${termList }" var="term">
				<option value="${term }" <c:if test="${term == curTerm }">selected</c:if>>${term }</option>
			</c:forEach>
		</select>
	</div>
	


</body>
<script type="text/javascript">
	function uniManage(){
		debugger;
		var term = $('#term').val(),p = frameElement.dialog.params ,ids = p.ids;
		$.ajax({
			type:'post',
			url : __ctx + '/gradp/course/crsTch/uniManage.htm',
			data : {
				term,
				ids:ids.join(",")
			},
			success: function(data) {
				var json=eval(data);
				var msg="";
				$.each(json,function(index,item){
					msg+=json[index]+",";
				});
				if(msg==""){
					DialogUtil.msg('院系管理成功');
				}else{
					DialogUtil.alert(msg+'上述课程在您选择的学期无授课关系');
				}
				
				DialogUtil.closeDialog();
			}
		});
		
		
		
	}
</script>
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>

</html>
