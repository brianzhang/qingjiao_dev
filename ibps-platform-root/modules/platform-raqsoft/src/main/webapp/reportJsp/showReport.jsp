<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/runqianReport4.tld" prefix="report" %>
<%@	taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@	taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.runqian.report4.usermodel.Context"%>

<html>
<link type="text/css" href="${appmap }/styles/commons/css/raqsoft/style.css" rel="stylesheet"/>
<body topmargin=0 leftmargin=0 rightmargin=0 bottomMargin=0>

<jsp:include page="toolbar.jsp" flush="false" />

<table id="rpt" align="center" style="width:100%;" >
	<c:if test="${hasParamFile }==false">
	<tr><td align=center>
		<table id="param_tbl"><tr><td>
			<report:param name="form1" paramFileName="${paramFile }"
				needSubmit="no"
				params="${params }"
				
			/>
		</td>
		<td><a href="javascript:_submit( form1 )"><img src="../images/query.jpg" border=no style="vertical-align:middle"></a></td>
		</tr></table>
	</td></tr>
	</c:if>

	<tr><td align=center valign=top height=100%>
		<report:html name="report1" reportFileName="${report }" 
			funcBarLocation="top"
			needPageMark="yes"
			generateParamForm="no"
			params="${params }"
			exceptionPage="/reportJsp/myError2.jsp"
			appletJarName="runqianReport4Applet.jar,dmGraphApplet.jar"
		/>
	</td></tr>
</table>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery/jquery.min.js"></script>
<script type="text/javascript">
/**
 *修改翻页跳转地址
 */
function updateFormAction(){
	var action = $("form[name=report1_turnPageForm]").attr("action");
	if(action)
		$("form[name=report1_turnPageForm]").attr("action", "<%=request.getContextPath() %>/showReport?"+action.split("?")[1]);
}

function myResize() {
     var tab1 = document.getElementById( "report1");
     tab1.style.width="100%";
}
$(function(){
	updateFormAction();
	myResize();
});
</script>
<script language="javascript">
	//设置分页显示值
	
	document.getElementById( "t_page_span" ).innerHTML=report1_getTotalPage();
	document.getElementById( "c_page_span" ).innerHTML=report1_getCurrPage();
</script>
</body>
</html>
