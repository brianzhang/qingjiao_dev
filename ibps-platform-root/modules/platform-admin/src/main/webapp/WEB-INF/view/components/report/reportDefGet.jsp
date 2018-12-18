<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/components/report/reportDef.js"></script>
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
					<form  class="fr-form"  id="reportDefForm" >
					 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标题</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${reportDef.title}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">分类</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${reportDef.typeName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据源</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${reportDef.dsName}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否系统报表</label>
				  	<div class="fr-form-block">
						<p class="form-control-static"><c:if test="${reportDef.isSys == 'Y'}">是</c:if><c:if test="${reportDef.isSys == 'N'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">源文件</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportDef.dir}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">SQL</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${fn:escapeXml(reportDef.sql)}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">描述</label>
				  	<div class="fr-form-block">
						<p class="form-control-static">${reportDef.note}</p>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:reportParams" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">报表参数</div>
			</caption>
			<thead>
				<tr>
	       			 <th>参数名</th>
	       			 <th>参数描述</th>
	       			 <th>数据类型</th>
	       			 <th>参数类型</th>
	       			 <th>参数来源</th>
	       			 <th>参数值</th>
	       			 <th>默认值</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach var="reportParams" items="${reportDef.reportParamsPoList}">	
					<tr>	
				 		<td>
							<p class="form-control-static">${reportParams.name}</p>
						</td>	
				 		<td>
							<p class="form-control-static">${reportParams.desc}</p>
						</td>	
				 		<td>
							<p class="form-control-static">${reportParams.dataType}</p>
						</td>	
				 		<td>
							<p class="form-control-static">
								<c:if test="${reportParams.paramType=='nomal'}">普通参数</c:if>
							</p>
						</td>	
				 		<td>
							<p class="form-control-static">
								<c:if test="${reportParams.source=='fixed'}">固定值</c:if>
								<c:if test="${reportParams.source=='input'}">表单输入</c:if>
								<c:if test="${reportParams.source=='script'}">脚本</c:if>
							</p>
						</td>	
				 		<td>
							<p class="form-control-static">${reportParams.value}</p>
						</td>	
				 		<td>
							<p class="form-control-static">${reportParams.defValue}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	  
		<table name="s:reportField" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">报表字段</div>
			</caption>
			<thead>
				<tr>
	       			 <th>字段名</th>
	       			 <th>字段类型</th>
	       			 <th>字段描述</th>
		    	</tr>
			</thead>
			<tbody>	
				<c:forEach var="reportField" items="${reportDef.reportFieldPoList}">	
					<tr>	
				 		<td>
							<p class="form-control-static">${reportField.name}</p>
						</td>	
				 		<td>
							<p class="form-control-static">${reportField.dataType}</p>
						</td>	
				 		<td>
							<p class="form-control-static">${reportField.desc}</p>
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
