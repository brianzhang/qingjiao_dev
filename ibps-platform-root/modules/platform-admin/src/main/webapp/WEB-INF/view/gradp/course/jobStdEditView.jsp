
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link  href="bootstrap/bootstrap-tour.min.css" />
<title>批量修改成绩页面</title>
</head>
<body>
 		
	<div style="padding: 50px 100px 10px;">
	    <form class="bs-example bs-example-form" role="form">
	        
	        <div class="input-group">
	            <span class="input-group-addon" style="background-color:#CCC;">成绩：</span>
	            <input type="text" class="form-control"id="score" style="border:1px solid #DDD" placeholder="Score">
	        </div>
	       
	    </form>
	</div>

	<!-- <input type="text" id="score" /> -->
</body>
<script type="text/javascript">
	function saveScore(){
		var str = document.getElementById("score");
		var str1 = str.value;
		if(parseFloat(str1)>100){
			DialogUtil.error('最大分值:100！');
			return;
		}
		if(parseFloat(str1)<0){
			DialogUtil.error('最小分值:0！');
			return;
		}
		
		var score = $('#score').val(), p = frameElement.dialog.params ,ids = p.ids,power = p.power,crsTchId = p.crsTchId;
		$.ajax({
			type:'post',
			url : __ctx + '/gradp/course/jobStd/editScores.htm',
			async:false,
			data : {
				score,
				ids:ids.join(","),
				power,
				crsTchId,
			},
			success : function(msg) {
				DialogUtil.msg('保存成功');
				DialogUtil.closeDialog();
			}
		});
		
		
		
	}
</script>
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>

<script src="${ctx}/js/lc/dialog/form/InputDialog.js"></script>
</html>
