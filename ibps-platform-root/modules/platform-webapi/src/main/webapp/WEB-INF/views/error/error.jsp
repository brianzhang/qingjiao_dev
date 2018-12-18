<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true"%>
<%@taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
	<head>
		<title>系统出错了</title>
		<%@include file="/commons/include/error.jsp"%>
			<f:link href="codemirror/lib/codemirror.css"/>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/clike/clike.js"></script>
	</head>
	<body>
		<div class="col-xs-12">		
			<div class="error-container">
				<div class="well">
					<h1 class="grey lighter smaller">
						<span class="blue bigger-125">
							<i class=" fa fa-random"></i>
							505
						</span>
						系统出错了	
					</h1>
					<h4 class="smaller">错误编码:${id }</h4>
					<hr />
					<h3 class="lighter smaller">但我们正在想办法<i class=" fa fa-wrench icon-animated-wrench  bigger-125"></i>它!</h3>

					<c:if test="${!empty error}">
							<div class="space"></div>
							<h4 class="smaller">出现下列问题:</h4>
							<div  class="hidden-content" >
								<textarea id="code" name="code" style="width: 100%;height: 50px;" readonly="readonly">${fn:escapeXml(error)}</textarea>
							</div>
					</c:if>

					<hr />
					<div class="space"></div>

					<div class="center">
						<a href="javascript:history.back()" class="btn btn-grey">
							<i class="ace-icon fa fa-arrow-left"></i>
							返回
						</a>
						<a href="#" onclick="javascript:location.href='${ctx }/logout.ht';" class="btn btn-primary">
							<i class="ace-icon fa fa-share-square-o"></i>
							重新登录
						</a>
					</div>
				</div>
			</div>
		</div>
	</body>
		<script type="text/javascript">
	var editor = CodeMirror.fromTextArea(document .getElementById("code"), {
		mode: "text/x-java",
		matchBrackets: true,
		readonly:true,
	    lineNumbers: true,
        autoMatchParens: true,
		height:60
	 });
	
	</script>
</html>
