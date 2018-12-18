<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/gradp/course/jobStd.js"></script>
		
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="jobStdForm" action="save.htm" >
				

<table border="3" >
<td width="4%" align="center" height="30">题号</td>
<td width="4%" align="center" height="30">A选项统计</td>
<td width="4%" align="center" height="30">B选项统计</td>
<td width="4%" align="center" height="30">C选项统计</td>
<td width="4%" align="center" height="30">D选项统计</td>
<c:forEach var="list" items="${T}" varStatus="j" >
<c:forEach var="temp" items="${list}" varStatus="i" >​
<c:if test="${i.index%4==0}">
<tr >
<td width="4%" align="center" height="30">
        第${ j.index+1}题</td>
<td width="4%" align="center" height="30">
       <fmt:formatNumber  value="${temp/result}" pattern="0.00%" /> </td>
</c:if>
<c:if test="${i.index%4==1}">
<td width="4%" align="center" height="30">
        <fmt:formatNumber value="${temp/result}"  pattern="0.00%" /></td>
</c:if>
<c:if test="${i.index%4==2}">
<td width="4%" align="center" height="30">
        <fmt:formatNumber  value="${temp/result}" pattern="0.00%"  /></td>
</c:if>
<c:if test="${i.index%4==3}">
<td width="4%" align="center" height="30">
        <fmt:formatNumber value="${temp/result}" pattern="0.00%"  /></td></tr>
</c:if>
</c:forEach></c:forEach>


</table>
<br >
<br >
<table border="3" >
<td width="4%" align="center" height="30" >未提交的学生学号</td>
<td width="4%" align="center" height="30" ></td>
<td width="4%" align="center" height="30" ></td>
<td width="4%" align="center" height="30" ></td>
<c:forEach var="temp" items="${M}" varStatus="i" >
<c:if test="${i.index%4==0}">
<tr > 
<td width="4%" align="center" height="30">
  ${temp} </td> 
</c:if> 
<c:if test="${i.index%4==1}">
 
<td width="4%" align="center" height="30">
  ${temp} </td> 
</c:if>
<c:if test="${i.index%4==2}">

<td width="4%" align="center" height="30">
  ${temp} </td> 
</c:if>
<c:if test="${i.index%4==3}">

<td width="4%" align="center" height="30">
  ${temp} </td> 
</c:if>
</c:forEach>
</table>
</form>

			</div>
		</div>
	</body>
</html>
