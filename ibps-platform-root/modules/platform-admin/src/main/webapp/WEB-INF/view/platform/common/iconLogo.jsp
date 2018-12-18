<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
	<title>设置图标</title>
	<%@include file="/commons/include/get.jsp" %>
	<script type="text/javascript">
		var selectedImg=null;
		$(function(){
			$("#iconList img").click(function(){
				if(selectedImg){
					$(selectedImg).removeClass('selected');
				}
				$(this).addClass('selected');
				selectedImg=this;
			});
		});
		
		function getIcon(){
			return $('.selected').attr('alias');
		}
		
	</script>
	<style type="text/css">
	body{
		background:  #e2e2e2;
	}
	.panel{
			background:  #e2e2e2;
	}
	.page-header {
	    padding-bottom: 9px;
	    margin: 10px 0 20px;
	    border-bottom: 1px solid #eeeeee;
	}
		#iconList img {
			width:30px;
			height:30px;
		}
		#iconList .selected {
			border-color:  #86a9d1; 
			background-color:#c3dcfc; 
		}
	</style>
</head>
<body>
<div class="panel">
	<div class="panel-body" id="iconList">
		<c:if test="${empty logoList}">
			<span >暂无资源图标</span>
		</c:if>
		<c:forEach items="${logoList}" var="d" >
					<img alt="logo" src="${ctx}${logoPath}${d}" width="30px"  height="30px"  alias="${d}"/>
	 </c:forEach>
	</div>
</div>
</body>
</html>
