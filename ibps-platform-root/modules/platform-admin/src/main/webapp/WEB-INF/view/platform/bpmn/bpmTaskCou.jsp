<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTaskCou.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmOperLog.js"></script>
	</head>
	<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search"  id="search"  name="search"><span>统计</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<label   class="search-label">流程定义</label>:
									<input type="hidden" id="procDefId" name="Q^PROC_DEF_ID_^S" />
							  		<div class="input-group">
		                               	<input type="text" class="form-control"  id="procDefName"  name="procDefName" readonly="readonly"  value="${proname}"/>
		                           	  	<span class="input-group-btn">
		                           	  		<button type="button" class="btn  btn-info btn-mm"  
		                           	  			 data-toggle="selector"  data-type="flow" data-single="true"  data-id="#procDefId" data-name="#procDefName" >
		                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
		                           	  		<button type="button" class="btn btn-info btn-mm" 
				                               	 data-toggle="clear" data-id="#procDefId" data-name="#procDefName">
				                               	 <i class="fa fa-times"></i></button>
		                           	  	</span>
								 	</div>
								</div> 
<!-- 								<div class="form-group"> -->
<!-- 									<label   class="search-label">操作类型</label>: -->
<!-- 									<select class="form-control search-select" name="Q^OPER_TYPE_^S"> -->
<!-- 										<option value="">请选择</option> -->
<%-- 										<c:forEach items="operTypeList" var="operType"> --%>
<!-- 										<option value="operType.key">operType.value</option> -->
<%-- 										</c:forEach> --%>
<!-- 									</select> -->
<!-- 								</div>  -->
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="bpmOperLogGrid" ></table>
				<div id="bpmOperLogPager"></div>
			</div>
		</div>
		<!-- 顶部按钮 -->
<!-- 		<DIV CLASS="WRAPPER WRAPPER-CONTENT  ANIMATED FADEINRIGHT COL-SM-12"> -->
<!-- 			<DIV CLASS="PANEL-TOOLBAR "> -->
<!-- 				<DIV CLASS="BUTTONS"> -->
<!-- 					<A HREF="JAVASCRIPT:VOID(0);" CLASS="BTN BTN-PRIMARY FA FA-SAVE" ><SPAN>保存</SPAN></A> -->
<!-- 					<A HREF="LIST.HTM" CLASS="BTN BTN-PRIMARY FA FA-BACK" ><SPAN>返回</SPAN></A> -->
<!-- 				</DIV> -->
<!-- 			</DIV> -->
<table class="table table-striped" id="table">
  <thead>
    <tr>
         <th>序号</th>
      <th>流程名称</th>
      <th>任务数量</th>
      <th>管理</th>
    </tr>
  </thead>
  <tbody>
    
     <c:forEach var="entry" items="${res}" varStatus="status">
     <tr>
                             <td > ${ status.index + 1}</td>
                             <td > ${entry.key}</td>                   
                             <td> ${entry.value}
                              <td><a class="btn btn-primary fa fa-back"  id="detail${ status.index + 1}"  onclick="lick(this, this.id)"><span>查看明细</span></a></td> 
                              </tr>
                             </c:forEach>
  
  </tbody>
</table>
	</body>
</html>