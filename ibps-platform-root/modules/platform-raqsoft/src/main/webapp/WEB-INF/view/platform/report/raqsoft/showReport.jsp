<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/runqianReport4.tld" prefix="report" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.runqian.report4.usermodel.Context"%>

<html>
<head>
	<%@include file="/commons/include/list.jsp" %>
	<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.jqprint.js"></script>
	<f:link href="jquery/print.css" />
	<link type="text/css" href="${appmap }/styles/commons/css/raqsoft/style.css" rel="stylesheet"/>
	<link type="text/css" href="${appmap }/js/plugins/laypage/skin/laypage.css" rel="stylesheet"/>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/report/raqsoft/showReport.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/commons/control/SelectorControl.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
</head>
<body topmargin=0 leftmargin=0 rightmargin=0 bottomMargin=0>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	
		<div class="report_wrapper">
			
			<table id="rpt" align="center" width=100% height=100%>
				<c:if test="${hasParamFile }==false">
				<tr><td align=center>
					<table id="param_tbl"><tr><td>
						<report:param name="form1" paramFileName="${paramFile }"
							needSubmit="no"
							params="${params }"
							
						/>
					</td>
					<td><a href="javascript:_submit( form1 )"><img src="${appmap }/images/query.jpg" border=no style="vertical-align:middle"></a></td>
					</tr></table>
				</td></tr>
				</c:if>
				
				<tr><td align=center valign=top height=100%>
					<report:html name="report1" reportFileName="${report }"
							pageMarkLabel=""
							firstPageLabel="" 
							prevPageLabel="" 
							nextPageLabel="" 
							lastPageLabel="" 
							needPageMark="yes" 
							funcBarLocation="top" 
	 						generateParamForm="no" 
	 						displayNoLinkPageMark="yes" 
	 						params="${params }" 
	 						backAndRefresh="/platform/report/raqsoft/showReport.htm?reportId=${reportId }${params2 }"
	 						exceptionPage="/reportJsp/myError2.jsp" 
	 						appletJarName="runqianReport4Applet.jar,dmGraphApplet.jar"  
	 					/>
				</td></tr>
			</table>
			
		</div>
	
	</div>

</body>
</html>
