<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanForJcShenhe.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/bishe/urlZhiYuant/urlZhiYuan/list2.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="urlZhiYuanForm" action="saveShenheTeam.htm?id=${id}" >
					<input type="hidden"  value="${id}"/>
				<div class="fr_response_field col-sm-12" >
				   <h2>指定立题书审核人</h2>
				</div>	
                 <br /><br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	 <div class="fr_response_field col-sm-5" >
				 	<label class="fr-control-label">选择审核人</label>	 	
				  	<div class="fr-form-block">
				          <select class="fr-form-control" name="m:urlZhiYuan:js3id"  value="${urlZhiYuan.js3id}" validate="{required:false}">
					      <option value="">请选择</option>
					      <c:forEach items="${user}" var="u">
			                        <option value="${u.id}">${u.name}</option>
			                        
			                </c:forEach>
					      </select>  
					      
				 	</div>
					
			  	</div>
			  	<%-- <div class="fr_response_field col-sm-5" >
			  	  <div class="fr_response_field col-sm-3" >
			     	<a href="javascript:void(0);" action="${ctx}/bishe/urlZhiYuant/urlZhiYuan/searchNumber.htm?js3id=${user.id}" class="btn btn-primary fa fa-search" ><span>搜索审核人审核数目</span></a></div>
			     <div class="fr_response_field col-sm-3" >
			     	<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh" disabled="true" value="${urlZhiYuan.xh}" validate="{required:false"/>
			     </div>	
			  	</div> --%>
			  	
			</div>
</form>

			</div>
		</div>
	</body>
</html>
