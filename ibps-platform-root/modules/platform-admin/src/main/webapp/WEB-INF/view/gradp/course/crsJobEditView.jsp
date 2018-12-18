
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
	            <span class="input-group-addon" style="background-color:#CCC;">分值：</span>
	            <input type="text" class="form-control"id="power" style="border:1px solid #DDD" placeholder="请输入作业分值">
	        </div>
	       
	    </form>
	</div>

	<!-- <input type="text" id="score" /> -->
</body>
<script type="text/javascript">
	function saveScore(){
		var str = document.getElementById("power");
		var str1 = str.value;
		if(parseFloat(str1)<=0){
			DialogUtil.error('亲，作业分要大于0！！');
			return;
		}
		
		var power = $('#power').val(), p = frameElement.dialog.params ,ids = p.ids;
		$.ajax({
			type:'post',
			url : __ctx + '/gradp/course/crsJob/editMarks.htm',
			async:false,
			data : {
				power,
				ids:ids.join(","),
			},
			success: function(data) {
				var json=eval(data);
				var msg="";
				$.each(json,function(index,item){
					msg+=json[index]+",";
				});
				if(msg==""){
					DialogUtil.msg('全部修改成功');
				}else{
					DialogUtil.alert(msg+'上述作业由于已经有学生交作业，不能修改，其他作业修改成功');
				}
				
				DialogUtil.closeDialog();
			}
		});
		
		
		
	}
</script>
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>

<script src="${ctx}/js/lc/dialog/form/InputDialog.js"></script>
</html>
