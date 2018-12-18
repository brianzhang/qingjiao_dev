<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript"
	src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuan.js"></script>
</head>
<body>
<script type="text/javascript" src="${ctx}/pageoffice.js"  id="po_js_main"></script>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	
		<div class="panel-toolbar ">
			<div class="buttons">
				<a class="btn btn-primary fa fa-detail " id="officeOnline"
							onclick="pageOffice()"><span>在线word批阅（建议使用）</span></a>
				<a class="btn btn-primary fa fa-detail " id="uploadReadFile"
				   onclick="uploadReadFile()"><span>上传已批阅论文</span></a>
				<a id="view2"class="btn btn-primary fa fa-edit "  href="${ctx}/bishe/oldFile/oldFile/list.htm?id='${urlZhiYuan.id}'&type='${fileType}'"><span >查看历史审批文件</span></a>
			</div>
		</div>
		<div class="">

			<form class="fr-form" id="urlZhiYuanForm" action="save.htm">
				<input type="hidden" name="m:urlZhiYuan:id" value="${urlZhiYuan.id}" />

				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">评阅方式：</label>
						<div class="fr-form-block">
							<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在线批阅和上传评审论文选择其一即可</p>

						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-12" <c:if test="${role == 'judgeTch'}">style="display:none;"</c:if>>
					<div class="fr-form-group">
						<label class="fr-control-label">班级</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:urlZhiYuan:classr" disabled="disabled"

								value="${urlZhiYuan.classr}" validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12"  <c:if test="${role == 'judgeTch'}">style="display:none;"</c:if>>
					<div class="fr-form-group">
						<label class="fr-control-label">学号</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh"
								disabled="disabled"

								value="${urlZhiYuan.xh}"
								validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12" <c:if test="${role == 'judgeTch'}">style="display:none;"</c:if>>
					<div class="fr-form-group">
						<label class="fr-control-label">姓名</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:urlZhiYuan:name" disabled="disabled"

								value="${urlZhiYuan.name}" validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">题目</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								   name="m:urlZhiYuan:name" disabled="disabled"
								   value="${urlZhiYuan.tmmc}" validate="{required:false" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3" id="fileView">
					<div class="fr-form-group">
						<label class="fr-control-label">文件下载</label>
						<div class="fr-form-block">
							<div name="div_attachment_container" data-rights="r"
								data-media="" data-media_type="" data-max_file_size=""
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									validate="{required:false}">${filedownload}</textarea>
							</div>
						</div>
					</div>
				</div>
				<div id="view" class="fr_response_field col-sm-12" >
				<c:if test="${role == 'finalTch'}">
				   <table  class="table table-bordered">
					<thead>
					  <tr>
					    <th>序号</th>
					    <th>评价指标</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
					    <td>1</td>
					    <td>综合运用知识的能力</td>
					  </tr>
					  <tr>
					    <td>2</td>
					    <td>工作方案设计能力、实验或仿真的数据获取及对实验结果的综合分析和数据处理能力、计算机应用能力</td>
					  </tr>
					  <tr>
					    <td>3</td>
					    <td>论文撰写水平及应用文献资料的能力</td>
					  </tr>
					  <tr>
					    <td>4</td>
					    <td>工作态度及工作情况</td>
					  </tr>
					  <tr>
					    <td>5</td>
					    <td>外文应用能力</td>
					  </tr>
					</tbody>
					</table>
				</c:if>
				
				<c:if test="${role == 'judgeTch'}">
					<table class="table table-bordered">
					<thead>
						  <tr>
							<th>序号</th>
							<th>评价指标</th>
						  </tr>
					</thead>
					<tbody>
					  <tr>
					    <td>1</td>
					    <td>学位论文符合专业培养目标，体现综合训练基本要求的情况</td>
					  </tr>
					  <tr>
					    <td>2</td>
					    <td>学位论文的难度、工作量饱满程度及完成质量</td>
					  </tr>
					  <tr>
					    <td>3</td>
					    <td>文题相符、内容正确</td>
					  </tr>
					  <tr>
					    <td>4</td>
					    <td>论文撰写水平及规范化程度</td>
					  </tr>
					  <tr>
					    <td>5</td>
					    <td>实用性、科学性及创见性</td>
					  </tr>
					</tbody>
					</table>
				</c:if>
				</div>

				<div class="fr_response_field col-sm-3"  id="flagViewShow">
					<div class="fr-form-group">
						<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评审阶段为再次审核（即最后一次评审）</p>
					</div>
				</div>

			<div class="fr_response_field col-sm-12" id="fileCommentView" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">
						<c:if test="${role == 'finalTch'}">指导教师评语</c:if>
						<c:if test="${role == 'judgeTch'}">评审教师评语</c:if>
					</label>
				  	<div class="fr-form-block">
				  	<c:if test="${role == 'finalTch'}">
						<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:finalTchComment"  placeholder="请按评价指标填写"  validate="{required:true}">${urlZhiYuan.finalTchComment}</textarea>
				 	</c:if>
				 	<c:if test="${role == 'judgeTch'}">
						<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:judgeTchComment"  placeholder="请按评价指标填写"  validate="{required:true}">${urlZhiYuan.judgeTchComment}</textarea>
				 	</c:if>
				 	</div>
			  	</div>
			</div>

			<div id="file1" class="fr_response_field col-sm-12 hidden">
				<div  id="file2" class="fr-form-group">
					<label class="fr-control-label">
						上传评阅论文
					</label>
					<div id="file3" class="fr-form-block">
						<div name="div_attachment_container" id="file4" data-media=""   data-media_type=""  data-max_file_size=""   data-max_file_quantity="1">
							<div class="fr-files" ></div>
							<textarea style="display: none"   data-control="attachment" id="file5" name="m:urlZhiYuan:file"  validate="{required:true}"></textarea>
						</div>
					</div>
				</div>
			</div>

			<div class="fr_response_field col-sm-3"  id="fileViewShow">
				<div class="fr-form-group">
					<p  style="color:red; font-size:15px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<c:if test="${role == 'finalTch'}">正常论文</c:if> <c:if test="${role == 'judgeTch'}">匿名论文</c:if>还未上传，请联系管理员！</p>
				</div>
			</div>



			</form>

		</div>
	</div>
</body>
<script type="text/javascript">
    $(function(){
        var statusFlag="${statusFlag}";
        if(statusFlag=="0"){ //该论文未上传
            document.getElementById("fileCommentView").style.display = "none";
            document.getElementById("fileView").style.display = "none";
        }else{
            document.getElementById("fileViewShow").style.display = "none";
        }
        var flag="${flag}";
        if(flag=="1"){ //学生重传的审核
        }else{
            document.getElementById("flagViewShow").style.display = "none";
        }
    });
var fo = eval( '(${filedownload})' )[0], fileName = fo.fileName , fileId = fo.id;
function pageOffice(){
	POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId ,'fullscreen=yes','123');
}
function uploadReadFile() {
	debugger
    $('#file4 > div.file-select-trigger > label > div.select-text').click();
}
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
