<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/bootstrap-tabs-x.min.js"></script>
<title>-</title>
</head>
<body>
	<div class="panel">
		<c:if test="${isSuper == true}">
		<div class="panel-toolbar">
		</c:if>
		<c:if test="${isSuper == false}">
		<div class="panel-toolbar hidden">
		</c:if>
			<!-- #查询条件-->
			<div class="toolbar-body" >
				<form role="form" class="search-form">
					<div class="form-inline p-xxs">
						<div class="form-group">
							<label class="search-label">员工 </label>:
							<div class="input-group">
								<input type="hidden" name="id"  id="id" value="${id}"/> 
                               	<input type="text" class="form-control"  id="fullName" name="fullName" value="${fullName }" readonly="readonly"/>
                           	  	<span class="input-group-btn">
                           	  		<button id="btnSelect" type="button" class="btn btn-info btn-mm">
                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
                           	  		<button id="btnClear" type="button" class="btn btn-info btn-mm">
		                               	 <i class="fa fa-times"></i></button>
                           	  	</span>
                            </div>
						</div> 
					</div>
				</form>
			</div>
			<!--/ 查询条件-->
		</div>
		<div class="tabs-container tabs-x">
			<ul class="nav nav-tabs">
				<li class="active"><a id="aunder" data-toggle="tab" href="#tab-1" data-iframe="true"
					data-url="${ctx}/platform/org/partyEmployee/underList.htm?id=${id}"
					aria-expanded="true">下属员工</a></li>
				<li class=""><a id="asuper" data-toggle="tab" href="#tab-2" data-iframe="true"
					data-url="${ctx}/platform/org/partyEmployee/superiorList.htm?id=${id}"
					aria-expanded="true">上级领导</a></li>
			</ul>
			<div class="tab-content">
				<div id="tab-1" class="tab-pane active">
					<%-- <iframe id="iunder" src="${ctx}/platform/org/partyEmployee/underList.htm?id=${id}"></iframe> --%>
				</div>
    			<div id="tab-2" class="tab-pane">
					<%-- <iframe id="isuper" src="${ctx}/platform/org/partyEmployee/superiorList.htm?id=${id}"></iframe> --%>
    			</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyEmployeeRelList.js"></script>
</body>
</html>