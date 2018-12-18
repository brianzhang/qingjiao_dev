<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="bootstrap/bootstrap-tour.min.css" />
<title>学生课程列表</title>
<script type="text/javascript" src="${ctx }/js/lc/platform/form/onlineForm.js"></script>
 <script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsTchListMyStudents2.js"></script> 
</head>
<body>
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" 
							href="javascript:void(0);"><span>搜索</span></a> 
					<!--<a class="btn btn-primary fa fa-back" href="list.htm"><span>返回</span></a>  -->
					</div>
					&nbsp;
					<div class="buttons">
						<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsStd/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/gradp/course/crsStd/edit.htm" ><span>编辑</span></a>	 --%>
						
						<!-- <a class="btn btn-primary fa fa-download"
							href="javascript:void(0);"><span>导出</span></a> -->


					</div>
					
					
				
					<div class="buttons">
						
							
							<!--NOTICE: 后备功能为验证成绩正确性存在,无特殊情况不要开放 -->
					<!-- 	<a class="btn btn-primary fa  "
							href="javascript:void(0);" id="checkScore" onclick="checkErr()"><span>核算该课程成绩</span></a> -->
					</div>
					&nbsp;
					<div class="buttons">
						<a class="btn btn-primary fa fa-help" href="javascript:void(0);"><span>查看指引</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<h2 style="float: left; line-height: 1.7em">2014级毕业生列表&nbsp;</h2>
						<a href="javascript:void(0);" class="collapse"> <i
							class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form">
						<div class="form-inline p-xxs">
							<div class="form-group">
								<label class="search-label">学号</label>: <input type="text"
									name="Q^XH^SLR" class="form-control" onkeyup="cg()" />
							</div>
							<div class="form-group">
								<label class="search-label">姓名</label>: <input type="text"
									name="Q^NAME^SLR" class="form-control" onkeyup="cg()" />
							</div>
					        <div class="form-group">
								<label class="search-label">班级</label>: <input type="text"
									name="Q^CLASSR^SLR" class="form-control" onkeyup="cg()" />
							</div> 
					
							<!-- <div class="form-group">
								<label class="search-label">专业</label>: <input type="text"
									name="Q^TMDYZY^SLR" class="form-control" onkeyup="cg()" />
							</div> -->
							<div class="form-group">
							<label class="search-label">专业</label>: 
							<select  type="text" name="Q^TMDYZY^SLR" class="form-control" onchange="cg()"/>
                                   <option value="" selected>全体毕业生</option>
                                   <option value="计算机科学与技术">计算机科学与技术</option>
                                   <option value="软件工程">软件工程</option>
                                   <option value="信息安全">信息安全</option>
                                   <option value="物联网工程">物联网工程</option>
                            </select>
                            </div>
						</div>
					</form>
				</div>

				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="crsTchListMyStudentsGrid"></table>
			<div id="crsTchListMyStudentsPager"></div>
		</div>
	</div>

</body>
<script type="text/javascript">

var crsTchId = '<%=request.getParameter("crsTchId")%>';
var crsName = '${crsName}';
function pageOffice(fileId){
	POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId ,'fullscreen=yes','123');
}
</script>
<script type="text/javascript">
$(function(){
	var word=${word};
	if(word=="0"){
		document.getElementById("view").style.display = "none";
		
		}else{
			document.getElementById("show").style.display = "none";
			}
	
});
	var fo = eval( '(${filedownload})' )[0], fileName = fo.fileName , fileId = fo.id;
	function officeOnline() {
		var rights, btns, b = [ {
			'alias' : 'file',
			'css' : 'fa-file',
			'text' : '文件',
			'parentAlias' : '-1'
		}, {
			'alias' : 'save',
			'css' : 'fa-floppy-o ',
			'text' : '保存',
			'parentAlias' : 'file'
		}, {
			'alias' : 'print',
			'css' : 'fa-print',
			'text' : '打印',
			'parentAlias' : 'file'
		}, {
			'alias' : 'review',
			'css' : 'fa-file',
			'text' : '审阅',
			'parentAlias' : '-1'
		}, {
			'alias' : 'addComment',
			'css' : 'fa-file',
			'text' : '新建批注',
			'parentAlias' : 'review'
		}, {
			'alias' : 'delAllComment',
			'css' : 'fa-file',
			'text' : '删除所有批注',
			'parentAlias' : 'review'
		} ];
		if (status == '1' && role == 'std')//已经结束,教师可以编辑
			btn = [ b[0], b[2] ];
		else
			//进行中全部开放
			btn = b;
		new OfficeDialog({
		 	fileName : fileName,
			fileId : fileId,
			rights : "e",
			btns : btn,
			title : "附件预览"
		}).show();
	}
	</script>
	<script type="text/javascript" src="/pageoffice.js" id="po_js_main"></script>
	
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/gradp/course/crsTchListMyStudents2.js"></script>
	<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
