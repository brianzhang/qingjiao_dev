<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/list.jsp"%>
	<%@include file="/commons/page/layout.jsp" %>
	<%@include file="/commons/page/tree.jsp" %>
	<f:link href="codemirror/lib/codemirror.css" />
	<f:link href="lc/form/formFormula.css"  isCommon="false"/>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/javascript/javascript.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/data/dataTemplateScript.js"></script>

	<body>
	<!-- 	<div class="ui-layout-west">
			<div class="layout-header ">
				<h5>表单字段</h5>
        	</div>
			<div class="tree-toolbar" >
				<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
				<a class="btn btn-primary fa fa-expand" title="展开"></a> 
				<a class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div id="boTree" class="ztree" ></div>	
		</div> -->
		<div class="ui-layout-center">
				<div class="wrapper wrapper-content ">
					<div class="formula-head">
							模版脚本 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="insertDefaultScript">插入默认脚本</a>
					</div>
					<div class="formula-content ">
							<textarea class="cm-s-default"  id="formula" ></textarea>
					</div>
					
					<div class="formula-foot">
						<ul>
						<li>支持<span class="red">JavaScript</span>的脚本.参考编写脚本API。</li> 
						</ul>
					</div>
			</div>
		</div>
	</body>
</html>