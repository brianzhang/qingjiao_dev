
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/files/file.js"></script>
		<title>t_file管理列表</title>
	</head>
	<body>
		<input type="hidden" id="loanId"
		value="<%=request.getParameter("loanId")%>" />
		<input type="hidden" id="ty"
		value="<%=request.getParameter("ty")%>" />
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/demo/demoLoan/list.htm?jdid=${file.jdid}" ><span>返回</span></a>
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
									<label   class="search-label">文件名</label>:
									<input type="text"  name="Q^NAME^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="fileGrid" ></table>
				<div id="filePager"></div>
			</div>
		</div>
		<OBJECT ID="ocx" CLASSID="CLSID:49903B72-9F44-41E1-A79B-B85A8BCEB89A">
		</OBJECT>
		<script LANGUAGE=Javascript FOR="ocx"
			EVENT="PostScanEveryPage(bSuccess)" defer>
			<!-- 每扫描一张之后的事件  -->
		</script>
		<div style="display:none">
		<input id="Resolution" type="text" value="200" />
		<input id="CompressRate" type="text" value="20" /> 
		<input id="Contrast" type="text" value="0" />
		<input type="checkbox" id="SetSmooth" value="1" >
		<input type="checkbox" id="removeBG" value="1" >
		<input id="Angle" type="text" value="0" /></div>
		<!--  图标保存格式
	<select id="PicTypeEx">
		<option value="1">bmp</option>
		<option value="2">jpg</option>
		<option value="3">tif</option>
		<option value="4">multitif</option>
		<option value="5">pdf</option>
		<option value="6">multipdf</option>
		<option value="7">可检索的单页PDF</option>
	</select>  Tiff压缩
	<select id="TiffCom">
		<option value="1">NULL</option>
		<option value="2">JPG压缩</option>
		<option value="3">G4压缩</option>
	</select>
	平滑强度
	<select id="smoothStrength">
		<option value="1">默认</option>
		<option value="2">低</option>
		<option value="3">中</option>
		<option value="4">高</option>
	</select> -->
		
	</body>
	
</html>
