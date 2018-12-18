<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/list.jsp"%>
	<%@include file="/commons/page/layout.jsp" %>
	<%@include file="/commons/page/tree.jsp" %>
	<f:link href="codemirror/lib/codemirror.css" />
	<f:link href="codemirror/addon/hint/show-hint.css" />
	<f:link href="lc/form/formFormula.css"  isCommon="false"/>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/addon/hint/show-hint.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/formula/formula-mode.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/formula/formula-hint.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefFormula.js"></script>
	
	<body>
		<div class="ui-layout-west">
			<div class="layout-header ">
				<h5>业务对象</h5>
        	</div>
			<div class="tree-toolbar" >
				<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
				<a class="btn btn-primary fa fa-expand" title="展开"></a> 
				<a class="btn btn-primary fa fa-compress" title="收缩"></a>
			</div>
			<div  class="niceScroll">
				<div id="boTree" class="ztree" ></div>	
			</div>
		</div>
		<div class="ui-layout-center">
			<div class="wrapper wrapper-content ">
				<div class="formula-head">
				<span class="formula-name"></span><span class="formula-equal">=</span>
				</div>
				<div class="formula-content ">
						<textarea class="cm-s-default"  id="formula" ></textarea>
				</div>
				
				<div class="formula-foot">
					<ul>
					<li>请从左侧面板选择包含的字段名</li>
					<li>支持<span class="red">英文</span>运算符模式下的<a class="x-c-key">基础运算</a>(+-*/等)及部分<a target="_blank" href="#" class="x-c-key">高级函数</a>
					</li>
					<li>公式编辑样式举例:<span class="formula-key">SUM</span>(<span class="formula-field">基本工资</span>,<span class="formula-field">加班工资</span>)</li>
					</ul>
				</div>
		</div>
	</body>
</html>