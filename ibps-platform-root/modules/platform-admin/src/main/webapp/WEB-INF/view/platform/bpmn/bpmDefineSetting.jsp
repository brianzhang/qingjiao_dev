<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html >
	<head>
		<%@include file="/commons/page/bpmDefineSetting.jsp" %>		
	</head>
<body  id="bpmDefinitionBuilder">
	<div class="ui-layout-center"  >
		<div class="layout-header ">
			<div class="layout-header-title">流程设置	-【${bpmDefinition.name}】</div>
			<div class="layout-tools" id="bpmTools">
				   <a class="btn  btn-primary btn-sm  js-save-setting" href="javascript:void(0)" ><i class="fa fa-save"></i>保存</a>
				   <a class="btn  btn-primary btn-sm  js-intro-bpm" href="javascript:void(0)" ><i class="fa fa-question-circle-o"></i>再看次介绍</a>

				   <a class="btn  btn-primary btn-sm js-close" href="javascript:void(0)" ><i class="fa fa-close"></i>关闭</a>
			</div>
		</div>
		<div  id="bpmImage" class="imageNiceScroll">
				<!-- 节点配置 -->
					<div class="alert alert-warning" role="alert"><i class="fa fa-lightbulb-o "></i>&nbsp;&nbsp;点击空白处进行全局配置，点击对应的节点进行节点配置&nbsp;&nbsp;&nbsp;&nbsp;
							<a class="btn  btn-info btn-xs" href="${ctx}/platform/bpmn/bpmDefine/getXml.htm?defId=${defId}&type=bpmn" target="_blank" ><i  class="fa fa-file-code-o"  ></i>&nbsp;&nbsp;BPMNXML</a>
		    				<a class="btn  btn-info btn-xs" href="${ctx}/platform/bpmn/bpmDefine/getXml.htm?defId=${defId}&type=design" target="_blank" ><i  class="fa fa-file-code-o"  ></i>&nbsp;&nbsp;DesignXML</a>		    	
					</div>
					<div style="margin:10px;position:relative;background:url('${ctx}/platform/bpmn/image/gen.htm?defId=${bpmDefinition.defId}') no-repeat;width:${bpmDefLayout.width}px;height:${bpmDefLayout.height}px;">
						<c:forEach var="layout" items="${bpmDefLayout.listLayout}">
							<c:if test="${layout.nodeType.key != subProcess}">
								<div class="flowNode"
								title="${layout.name}"
								 data-node-id="${layout.nodeId}" 
								 data-node-name="${layout.name}"
								 data-node-type="${layout.nodeType.key}"
								 layout-left="${layout.x}"
								 layout-top="${layout.y}"
								 layout-width="${layout.width}"
								 layout-height="${layout.height}"
								 style="position:absolute;left:${layout.x}px;top:${layout.y}px;width:${layout.width}px;height:${layout.height}px;" >
								</div>
							</c:if>  
						</c:forEach> 
					</div>
 		</div>	
	</div>
	<div class="ui-layout-east">
		<div class="layout-header  js-setting-header">
			<div class="layout-header-title" id="bpmSettingTitle">全局配置</div>
		</div>
		<div  id="bpmSetting" class=" niceScroll"></div>
	</div>
	
		<input type="hidden"  id="defId" value="${defId}"/>
		<input type="hidden"  id="defKey" value="${bpmDefinition.defKey}"/>
		<textarea id="boDefJson" rows="0" cols="0" style="display: none;"></textarea>
		<textarea rows="0" cols="0" style="display: none;" id="messageTypes">${messageTypes}</textarea>
		<textarea rows="0" cols="0" style="display: none;" id="data">${data}</textarea>
	</body>
</html>