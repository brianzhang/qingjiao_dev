<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTrigerFlow.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="bpmTrigerFlowForm" >
				 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">流程定义ID</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTrigerFlow.defId}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">节点ID</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTrigerFlow.nodeId}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">触发流程Key</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTrigerFlow.trigerFlowKey}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">触发动作</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTrigerFlow.action}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">触发类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTrigerFlow.trigerType}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">调用启动页面</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${bpmTrigerFlow.callStartPage}</p>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:bpmTrigerParam" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">触发参数</div>
			</caption>
			<thead>
				<tr>
	       			 <th>触发ID</th>
	       			 <th>源属性</th>
	       			 <th>目标属性</th>
	       			 <th>允许为空</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="bpmTrigerParam" items="${bpmTrigerFlow.bpmTrigerParamPoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${bpmTrigerParam.trigerId}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${bpmTrigerParam.srcAttr}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${bpmTrigerParam.destAttr}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${bpmTrigerParam.allowEmpty}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</form>

			</div>
		</div>
	</body>
</html>
