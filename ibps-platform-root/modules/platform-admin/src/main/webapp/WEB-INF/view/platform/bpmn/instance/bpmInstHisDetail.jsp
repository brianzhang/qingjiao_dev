<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
		<title>流程实例明细</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<c:if test="${ empty params.isReturn }">
					<div class="buttons">
						<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
					</div>
				</c:if>
			</div>
			<div class="tabs-container tabs-x" data-flexheight="55" >
                   <ul class="nav nav-tabs">
                       <li class="active">
                       		<a href="#flowInfo"   data-url="${ctx }/platform/bpmn/instance/bpmInstHis/get.htm?id=${id}"  data-toggle="tab"    data-iframe="true">流程信息</a>
                       </li>
                       <li class="">
                       		<a  href="#flowImage" data-url="${ctx }/platform/bpmn/instance/bpmInst/flowImage.htm?id=${id}&isEnd=1"   data-toggle="tab"  data-iframe="true" >流程图</a>
                       	</li>
                        <%--<li class="">--%>
                        	<%--<a href="#flowHistory"  data-url="${ctx }/platform/bpmn/instance/bpmInst/flowHistory.htm?instId=${id}"  data-toggle="tab" data-iframe="true" >审批历史</a>--%>
                        <%--</li>--%>
<%--                          <li class="">
                        	<a href="#flowForm"  data-url="${ctx }/platform/bpmn/instance/bpmInst/flowForm.htm?id=${id}"  data-toggle="tab" data-iframe="true" >流程表单</a>
                        </li>--%>
                   </ul>
                   <div class="tab-content">
                       <div id="flowInfo" class="tab-pane active"></div>
                       <div id="flowImage" class="tab-pane "></div>
<%--                    	<div id="flowHistory" class="tab-pane "></div>
                    	<div id="flowForm" class="tab-pane "></div>--%>
                   </div>
              </div>
		</div>
	
	</body>
	
</html>