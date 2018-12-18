<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/POXX/pOXX.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
<%-- 			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div> --%>
			<div class="">
					<form  class="fr-form"  id="pOXXForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.khmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.khh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">与客户关系</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.ykhgx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.sfyhjz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">家庭成员姓名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.jtcyxm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">性别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.xb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${pOXX.zjlx=='1'}">身份证</c:if><c:if test="${pOXX.zjlx=='2'}">军官证</c:if><c:if test="${pOXX.zjlx=='3'}">护照</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.zjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.lxdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.gzdw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人健康状况</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${pOXX.grjkzk=='1'}">良好</c:if><c:if test="${pOXX.grjkzk=='2'}">一般</c:if><c:if test="${pOXX.grjkzk=='3'}">较差</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.bz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开始日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${pOXX.ksrq}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在单位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.szdw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在部门</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.szbm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">结束日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${pOXX.jsrq}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担任职务</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${pOXX.drzw=='1'}">高级领导</c:if><c:if test="${pOXX.drzw=='2'}">中级领导</c:if><c:if test="${pOXX.drzw=='3'}">一般员工</c:if><c:if test="${pOXX.drzw=='4'}">其他</c:if><c:if test="${pOXX.drzw=='5'}">未知</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">从事行业描述</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.csxyms}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${pOXX.dwxz=='1'}">机关事业</c:if><c:if test="${pOXX.dwxz=='2'}">国营企业</c:if><c:if test="${pOXX.dwxz=='3'}">私营企业</c:if><c:if test="${pOXX.dwxz=='4'}">金融企业</c:if><c:if test="${pOXX.dwxz=='5'}">军队</c:if><c:if test="${pOXX.dwxz=='6'}">个体经营户</c:if><c:if test="${pOXX.dwxz=='7'}">三资企业</c:if><c:if test="${pOXX.dwxz=='8'}">邮电通讯</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位邮编</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.dwyb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.dwdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.dwdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.ysr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注（其他）</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${pOXX.bz1}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
		
			<input type="hidden"  id="sfid" value="${sfid}">
		
			<input type="hidden"  id="id" value="${id}">
	</body>
</html>
