<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<!doctype html>
<html>
<head >
  	<title>流程建模</title>
	<%@include file="/commons/include/get.jsp" %>
	<f:link href="lc/modeler/diagram-js.css" isCommon="false"/>
	<f:link href="lc/modeler/bpmn-embedded.css" isCommon="false"/>
	<f:link href="lc/modeler/app.css" isCommon="false"/>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
</head>
<body>

	<div  class="toolbar-panel hidden">
		<div class="toolbar-box">
			<div class="toolbar-head clearfix">
				<!-- 顶部按钮 -->
				<div class="btns">
						<a class="btn btn-default  fa fa-close" href="javascript:void(0);" ><span>关闭</span></a>
					<c:if test="${defId=='0'||status=='draft'}">
						<a class="btn btn-primary fa fa-deploy fa-save" href="javascript:void(0);" ><span>发布</span></a>
						<a class="btn btn-primary fa fa-draft fa-clipboard" href="javascript:void(0);" ><span>保存草稿</span></a>
					</c:if>
					<c:if test="${defId!='0'&&status!=''}">
						<a class="btn btn-primary fa fa-updcur fa-save" href="javascript:void(0);" ><span>保存</span></a>
						<a class="btn btn-primary fa fa-deployNew fa-clipboard" href="javascript:void(0);" ><span>发布新版本</span></a>
					</c:if>
					<a id="js-import-diagram"  class="btn btn-primary fa fa-sign-in"  href="javascript:void(0)"><span>导入</span></a>
					
      				<a id="js-download-diagram" class="btn btn-primary fa fa-sign-out" href="javascript:void(0);" title="download BPMN diagram">导出BPMN</a>
      				<a id="js-download-svg" class="btn btn-primary fa fa-share-alt" href="javascript:void(0);" title="download as SVG image">导出SVG</a>
					<span class="red">点击空白处设置流程定义</span>
				</div>
			</div>
		</div>
	</div>


  <div class="content" id="js-drop-zone">
	
    <div class="message error">
      <div class="note">
        <p>糟糕,我们不能显示流程图。</p>

        <div class="details">
          <span>引起原因：</span>
          <pre></pre>
        </div>
      </div>
    </div>

    <div class="canvas" id="js-canvas"></div>
    <div id="js-properties-panel"></div>
  </div>
	
	<input id="defId" type="hidden" value="${defId}">
	<input id="defKey" type="hidden" value="${defKey}">
	<script src="${ctx}/js/plugins/modeler/index.min.js"></script>
  
</body>
</html>
