<%@page import="com.lc.ibps.base.web.util.RequestUtil"%>
<%@page import="com.lc.ibps.base.core.util.string.StringUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<%@ page language="java" import="com.zhuozhengsoft.pageoffice.*"%>
<%@ taglib uri="http://java.pageoffice.cn" prefix="po"%>
<%
	String path = (String)request.getAttribute("docUrl") ;

	int readOnly = RequestUtil.getInt(request, "readOnly");

	PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
	if( StringUtil.isNotEmpty( path ) ){
		//设置服务器页面
		poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
		if(readOnly == 0)
			poCtrl.addCustomToolButton("保存", "Save()", 1);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		//poCtrl.addCustomToolButton("新建批注", "InsertComment()", 3);//效果不好
		poCtrl.addCustomToolButton("全屏/还原", "IsFullScreen()", 4);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		poCtrl.setCaption("轻教-在线批阅");
		poCtrl.setTheme(ThemeType.Office2010 );
		poCtrl.setOfficeVendor(OfficeVendorType.AutoSelect );
		//设置保存页面
		poCtrl.setSaveFilePage("/platform/office/pageOffice/save.htm?filePath="+path);
		//打开Word文档
		String[] t = path.split("\\.") ;
		String tmp = t[ t.length - 1 ];
		OpenModeType omt = null;
		if( "docx".contains( tmp ))
			/* if( readOnly == 1 ) omt = OpenModeType.docReadOnly;*/
			 omt = OpenModeType.docNormalEdit; 
		else if( "xlsx".contains( tmp ))
			omt = OpenModeType.xlsNormalEdit;
		else if( "vsdx".contains( tmp ))
			omt = OpenModeType.vsdNormalEdit;
		else if( "pptx".contains( tmp ))
			omt = OpenModeType.pptNormalEdit;
		else if( "pdf".contains( tmp ))
			omt = OpenModeType.docNormalEdit;
		poCtrl.webOpen( path ,  omt , "PageOffice");
	}
%>
<html>
<head>
	<%@include file="/commons/include/get.jsp"%>
</head>
<body>
	<script type="text/javascript" src="/pageoffice.js" id="po_js_main"></script>
	<script type="text/javascript">
		function Save() {
			document.getElementById("PageOfficeCtrl1").WebSave();

		}
		function PrintFile() {
			document.getElementById("PageOfficeCtrl1").ShowDialog(4);

		}
		function IsFullScreen() {
			document.getElementById("PageOfficeCtrl1").FullScreen = !document
					.getElementById("PageOfficeCtrl1").FullScreen;
		}
		function CloseFile() {
			POBrowser.closeWindow();
		}
		function InsertComment(){
			document.getElementById("PageOfficeCtrl1").WordInsertComment();
		}
		 function BeforeBrowserClosed(){
			 
	         <%
	         	if(StringUtil.isNotEmpty( path )){
	         		%>
		         		if (document.getElementById("PageOfficeCtrl1").IsDirty){
			                if(confirm("提示：文档已被修改，是否继续关闭放弃保存 ？"))
			                {
			                    return  true;
			                    
			                }else{
			                
			                    return  false;
			                }
			            }
	         		<%
	         	}
	         %>
	             
	        }
	</script>
	<div style="position: absolute;  width: 100%; height: 100%;">
		<%=StringUtil.isNotEmpty( path ) ? poCtrl.getHtmlCode("PageOfficeCtrl1") : "<h1>无文件</h1>"%>
	</div>
</body>
</html>