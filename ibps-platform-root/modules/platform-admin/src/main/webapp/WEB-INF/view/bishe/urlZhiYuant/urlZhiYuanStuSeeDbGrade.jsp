<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanDb.js"></script>
</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	    <div class="panel-toolbar ">
			</div>
		<div class="">
			<form class="fr-form" id="urlZhiYuanForm" action="saveDbGrade.htm">
				<input type="hidden" name="m:urlZhiYuan:id"  value="${urlZhiYuan.id}"/>
				<table class="table table-bordered">
					<thead>
					<tr>
						<th>序号</th>
						<th>评分依据</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>1</td>
						<td>论文符合专业培养目标要求的情况及论文难易度(分值上限20分)</td>
					</tr>
					<tr>
						<td>2</td>
						<td>论文的工作量及完成质量(分值上限30分)</td>
					</tr>
					<tr>
						<td>3</td>
						<td>论文撰写水平及规范化程度（含图纸、图表质量）(分值上限20分)</td>
					</tr>
					<tr>
						<td>4</td>
						<td>回答问题的正确性（包括基础知识和关于论文的问题）(分值上限20分)</td>
					</tr>
					<tr>
						<td>5</td>
						<td>思维逻辑及语言表达能力(分值上限10分)</td>
					</tr>
					</tbody>
				</table>
				<div class="fr_response_field col-sm-3" >
					<div class="fr-form-group">
						<label class="fr-control-label">第一项评分:</label>
						<div class="fr-form-block">
							<%--<input type="text" class="fr-form-control" name="m:urlZhiYuan:oneDb"  disabled="true" value="${urlZhiYuan.masterComment}" validate="{required:true}"/>--%>
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:oneDb" placeholder="分值上限20分"
								   value="${urlZhiYuan.oneDb}" disabled="true"/>

						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3" >
					<div class="fr-form-group">
						<label class="fr-control-label">第二项评分:</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:twoDb" placeholder="分值上限30分"
								   value="${urlZhiYuan.twoDb}" disabled="true"/>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3" >
					<div class="fr-form-group">
						<label class="fr-control-label">第三项评分:</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:threeDb" placeholder="分值上限20分"
								   value="${urlZhiYuan.threeDb}" disabled="true"/>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3" >
					<div class="fr-form-group">
						<label class="fr-control-label">第四项评分:</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:fourDb" placeholder="分值上限20分"
								   value="${urlZhiYuan.fourDb}" disabled="true"/>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3" >
					<div class="fr-form-group">
						<label class="fr-control-label">第五项评分:</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:fiveDb" placeholder="分值上限10分"
								   value="${urlZhiYuan.fiveDb}" disabled="true"/>
						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-3" >
					<div class="fr-form-group">
						<label class="fr-control-label">总分:</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control" name="m:urlZhiYuan:totalDb"
								   value="${urlZhiYuan.totalDb}" disabled="true"/>
						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-12" id="fileCommentView" >
					<div class="fr-form-group">
						<label class="fr-control-label">
							答辩委员会评语:
						</label>
						<div class="fr-form-block">
							<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:masterComment"  disabled="true"  validate="{required:true}">${urlZhiYuan.masterComment}</textarea>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
