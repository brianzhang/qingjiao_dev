<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<f:link href="gxy/page.css"></f:link>
<style type="text/css">
.footer {
	position: absolute;
	bottom: 2em;
	left: 0;
	height: 20px;
	width: 100%;
}

.disabled {
	background-color: gray;
	border-color: gray;
}
</style>
</head>
<body>
	<script type="text/javascript" src="${ctx }/pageoffice.js"
		id="po_js_main"></script>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<%-- <div class="panel-toolbar ">
			<div class="buttons">
				<a class="btn btn-primary fa fa-upload" id="saveScore"
					href="javascript:;"><span>提交</span></a>
			</div>
		</div> --%>
		<div class="jqGrid_wrapper">
			<div class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons">
							<%-- <a
							class="btn btn-primary fa fa-back" href="${returnUrl}"><span>返回</span></a> --%>
							<a class="btn btn-primary fa fa-detail " id="officeOnline"
								href="javascript:void(0);"
								onclick="javascript:jobStd.officeOnline()"><span>在线office<c:if
										test="${role =='tch' }">批阅</c:if>（旧）
							</span></a> <a class="btn btn-primary fa fa-detail " id="officeOnline"
								onclick="pageOffice()"><span>在线office<c:if
										test="${role =='tch' }">批阅</c:if>（新）
							</span></a>
							<!-- <a class="btn btn-primary fa fa-detail " 
								href="/gradp/sys/user/help.htm#officeOnline"><span>在线office用前必读</span></a> -->
						</div>
						<div class="tools">
							<h2 style="line-height: 1.7em">
								<c:choose>
									<c:when test="${empty jobId }">
									${crsName }&nbsp;-&nbsp;<c:if test="${role =='tch' }">${stdNum } - ${stdName }</c:if>&nbsp;作业列表
								</c:when>
									<%--<c:when test="${empty jobId }">
										${crsName }&nbsp;-&nbsp;${stdNum } - ${stdName }&nbsp;作业列表
									</c:when>--%>
									<c:otherwise>
									${title }&nbsp;-&nbsp;作业列表
								</c:otherwise>
								</c:choose>
							</h2>
						</div>
					</div>
				</div>
			</div>
			<form class="fr-form" id="jobStdForm">
				<input type="hidden" id="jobStdId" />
				<textarea class="hidden" id="json"></textarea>
				<input type="hidden" id="power" /> <input type="hidden" id="stdNum"
					value="${stdNum }" />
				<div
					class="fr_response_field col-sm-12  <c:if test="${not empty jobId }">hidden</c:if>">
					<div class="fr-form-group">
						<label class="fr-control-label">作业标题</label>
						<div class="fr-form-block">
							<p class="form-control-static" id="title"></p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">作业要求</label>
						<div class="fr-form-block">
							<p class="form-control-static" id="content"></p>
						</div>
					</div>
				</div>
				<div
					class="fr_response_field col-sm-12  <c:if test="${empty jobId }">hidden</c:if>">
					<div class="fr-form-group">
						<label class="fr-control-label">学生姓名</label>
						<div class="fr-form-block">
							<p class="form-control-static" id="stdName"></p>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-5">
					<div class="fr-form-group">
						<label class="fr-control-label"> <c:if
								test="${role=='tch' }">文件下载</c:if> <c:if test="${role=='std' }">提交文件</c:if>
						</label>
						<div class="fr-form-block hidden" id="upFile">
							<div name="div_attachment_container"
								<c:if test="${role=='tch' }">data-rights="r"</c:if>
								data-media="" data-media_type="" data-max_file_size=""
								data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									id="file"></textarea>
								<input class="hidden" value="1" id="cost" />
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-5">
					<div class="fr-form-group">
						<label class="fr-control-label">模板文件 </label>
						<div class="fr-form-block " id="templateFile">
							<div name="div_attachment_container" data-rights="r"
								data-media="" data-media_type="" data-max_file_quantity="1">
								<div class="fr-files"></div>
								<textarea style="display: none" data-control="attachment"
									id="template-file"></textarea>
								<input class="hidden" value="2" id="cost" />
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr-form-group">
						<label class="fr-control-label">文件上传时间</label>
						<div class="fr-form-block">
							<p class="form-control-static" id="time"></p>
						</div>
					</div>
				</div>
				<c:if test="${role=='std' }">
					<div class="fr_response_field col-sm-12">
						<div class="fr-form-group">
							<label class="fr-control-label">起止时间</label>
							<div class="fr-form-block">
								<p class="form-control-static" id="startStopTime"></p>
							</div>
						</div>
					</div>
				</c:if>
				<div class="fr_response_field col-sm-9">
					<div class="fr-form-group">
						<label class="fr-control-label"> 作业内容预览 </label>
						<div class="fr-form-block">
							<textarea class="fr-form-control fr-control-textarea" rows="10"
								cols="20" id="detail"></textarea>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-9">
					<div class="fr-form-group">
						<label class="fr-control-label">评语</label>
						<div class="fr-form-block">
							<textarea class="fr-form-control fr-control-textarea" rows="3"
								id="comment" <c:if test="${role=='std' }">readonly</c:if>
								validate="{required:false}"></textarea>

						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-4">
					<div class="fr-form-group">
						<label class="fr-control-label">作业成绩 </label>
						<div class="fr-form-block">
							<input class="fr-form-control" id="score"
								<c:if test="${role=='std' }">readonly</c:if> />
							（满分100分，折合后加入总分）
						</div>
					</div>
				</div>


				<c:if test="${role=='tch' }">
					<div class="fr_response_field col-sm-3">
						<div class="fr-form-group">
							<a class="btn btn-primary fa fa-upload" onclick="saveScore()"
								href="javascript:;"><span>提交</span></a> <!-- <a
								class="btn btn-primary fa fa-info-circle hidden" id="moreScore"
								href="javascript:;"><span>更多评价</span></a> -->

						</div>
					</div>
				</c:if>
				<div class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<div class="buttons">
								<div class="footer">
									<label class="fr-control-label"></label>
									<ul class="page" id="page"></ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>

		</div>

	</div>


</body>

<script type="text/javascript"
	src="${ctx }/js/lc/platform/form/onlineForm.js"></script>



<script type="text/javascript" src="${ctx}/js/lc/gradp/course/page.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/gradp/course/jobStd.js"></script>

<%--<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>--%>

<script type="text/javascript">
	debugger
	var crsTchId = '${crsTchId}';
	var stdName = '${stdName}';
	var fileIds = '';
	var fileName = '';
	var jobStdID = '';
	var options = {
		"id" : "page",//显示页码的元素
		"data" : {},
		"maxshowpageitem" : 10,//最多显示的页码个数
		"pagelistcount" : 1,//每页显示数据个数
		"callBack" : function(result) {
			try {
				
				var res = result[0], 
					time = res.time, 
					json = typeof res.json == 'object' ? JSON.stringify(res.json) : res.json,
					detail = res.detail,
					fileId = res.fileId,
					comment = res.comment, 
					score = res.score,
					jobStdId = res.jobStdId, 
					stdNum = res.stdNum,
					power = res.power, 
					title = res.title,
					stdName = res.stdName,
					status = res.status, 
					startStopTime = res.startStopTime,
					content = res.content, 
					reUp = res.reUp , 
					parent = $("#upFile div[name='div_attachment_container']"), 
					params = parent.data(), 
					dfile = $("#upFile div.fr-file"), 
					dfiles = $("div.fr-files", parent), 
					atta = $('textarea[data-control="attachment"]', parent), 
					fileUpload = $('[data-toggle="file-upload"]', parent), 
					file = [typeof res.file=='object'?res.file: eval('(' + res.file + ')') ], 
					ac = AttachementControl, 
					files = $('#upFile .fr-files'), 
					rights = (status == 0 && '${role}' != 'tch') ? 'e' : 'r',//处理数据
						
						//模板文件
					Tparent = $("#templateFile div[name='div_attachment_container']"), 
					Tparams = Tparent.data(), 
					Tdfile = $("#templateFile div.fr-file"), 
					Tdfiles = $("div.fr-files", Tparent), 
					Tatta = $('textarea[data-control="attachment"]', Tparent), 
					TfileUpload = $('[data-toggle="file-upload"]', Tparent), 
					Tfile =[typeof res.templateFile=='object'?res.templateFile: eval('(' + res.templateFile + ')') ],  
					Tfiles = $('#templateFile .fr-files'), 
					Trights = (status == 0 && '${role}' != 'std') ? 'e': 'r';
				
				
				//模板文件不需要多处理，直接放上去就好
				ac.remove(Tdfiles,Tatta, Tparams, Tdfile, TfileUpload);
				
				fileName = stdNum+'_'+stdName;
				
				if (typeof res.templateFile != 'undefined') 
					ac.insertHtml(Tfiles, Tfile, Trights);
					
				$('#upFile').removeClass('hidden');
				
				if (!reUp)
					ac.remove(dfiles, atta, params, dfile, fileUpload);
				
				if (typeof res.file != 'undefined') {
					fileName = file[0].fileName.substring(0, file[0].fileName.lastIndexOf('.'))
					//如果有文件，则一定是开始或者结束的，那么file.size<=1去掉多余的上传按钮
					fileUpload.hide();
					
					if (!reUp) {
						ac.insertHtml(files, file, rights);
						$('#officeOnline').removeClass('disabled');
					}
					
				} else {
					//如果没有，如果进行中，那么显示上传按钮，如果结束了就隐藏(-1,0,1)
					status == '0' ? fileUpload.show() : fileUpload.hide();
				}
			} catch (e) {
				$('#upFile').addClass('hidden');
			} finally {
				try {
					if (reUp) {
						var i = DialogUtil.load();
						
						$.ajax({
							url : __ctx + '/gradp/course/jobStd/listJob.htm',
							data : {
								fileId : eval('(' + res.file + ')').id
							},
							type : 'POST',
							dataType : 'json',
							success : function(data) {
								$('#time').empty();
								$('#time').html(data.time);
								$('#detail').val(data.detail);
								DialogUtil.close(i);
							}
						});
						
						options.data[page.curPage - 1]['reUp'] = 0;
						
					} else{
						$('#detail').val(detail);
						$('#time').empty();
						$('#time').html(time);
					}
					
					fileIds = fileId;
					jobStdID = jobStdId;
					$('#jobStdId').val(jobStdId);
					$('#startStopTime').empty();
					$('#startStopTime').html(startStopTime);
					$('#title').empty();
					$('#title').html(title);
					$('#stdNum').val(stdNum);
					$('#stdName').empty();
					$('#stdName').html(stdName);
					$('#content').empty();
					$('#content').html(content);
					$('#power').val(power);
					$('#score').val(score);
					$('#comment').val(comment);
					$('#json').val( json );
				} catch (e) {}
			}
			onlineForm();
		}
	};
	
	//init
	$(function() {
		DialogUtil.msg('准备数据中，请稍候...');
		var url = __ctx + '/gradp/course/jobStd/listJob.htm', data;
		var res, time, detail, comment, score, jobStdId, stdNum, power, title;
		$.ajax({
			url : url,
			data : {
				
				<c:choose>
					<c:when test="${empty jobId &&not empty stdNum}">//有jobId就说明是在echarts界面进来的，没有的话就是正常的上传作业或者教师批阅
						stdNum : '${stdNum}',
						crsTchId : crsTchId,
						role : '${role}'
					</c:when>
					<c:when test="${not empty jobId &&not empty stdNum}">//有jobId就说明是在echarts界面进来的，没有的话就是正常的上传作业或者教师批阅
						stdNum : '${stdNum}',
						single:"1",
						jobId : '${jobId}',
						role : '${role}'
					</c:when>	
						
					<c:otherwise>
						jobId : '${jobId}'
					</c:otherwise>
				</c:choose>
			},
			type : 'POST',
			dataType : 'json',
			success : function(datas) {
				
				options['data'] = datas.data;
				
				if ('${role}' == 'tch') {
					
					var pageIndex = localStorage.getItem('${stdNum}-${crsTchId}');
					
					<c:if test="${not empty jobId}">
						pageIndex = localStorage
						.getItem('${jobId}');
					</c:if>
					
					if (typeof pageIndex != 'undefined' && pageIndex != null && pageIndex != 'null')
						DialogUtil.msg('上次评阅到第' + pageIndex + '页，请继续评阅')
					else
						pageIndex = datas.pageIndex;
				} else var pageIndex = datas.pageIndex;
				
				page.init(datas.data.length, pageIndex, options);
			}
		});

	});
	function onlineForm(){
		var pageK = '毕业设计' + $('#title').text().split("(")[0] , myJson = $('#json').val();
		if( myJson )
			OnlineForm.data = eval( '('+ myJson +')') ;
		
		OnlineForm.check( pageK , '#moreScore' , function(json){
			
			$('#json').val( JSON.stringify(json) );
			saveScore();
			
		} , true);
		
		
	}
	function pageOffice(){
		POBrowser.openWindowModeless(__ctx + '/platform/office/pageOffice/dialog.htm?fileId='+fileIds+'&save=1' ,'fullscreen=yes;docReadOnly=yes','');
	}
	
	function saveScore() {
		debugger
		DialogUtil.alert('提交中，请稍候...');
		var arr = $('#jobStdForm').find('input,textarea');
		var p = {};
		p['crsTchId'] = '${crsTchId}';   
		p['crsTchId1'] = '${crsTchId1}';   //liujia
		
		arr.each(function(i, v) {
			if (v.id != 'detail')
				p[v.id] = v.value;
		})
		
		if (isNaN(p['score'])) {
			DialogUtil.error('请输入合法数字！');
			return;
		}
		if (parseFloat(p['score']) > 100) {
			DialogUtil.error('最大分值:100！');
			return;
		} else if (parseFloat(p['score']) < 0) {
			DialogUtil.error('最小分值:0！');
			return;
		}
		p['score'] = parseFloat(p['score']).toFixed(2);
		console.log(p)
		$.ajax({
			url : __ctx + '/gradp/course/jobStd/saveScore.htm',
			data : p,
			method : 'post',
			success : function(a) {
				var curPage = $('.pageItemActive').text(), index = curPage - 1;
				
				<c:choose>
					<c:when test="${empty jobId}">
						localStorage.setItem("${stdNum}-${crsTchId}", curPage);
					</c:when>
					<c:otherwise>
						localStorage.setItem("${jobId}", curPage);
					</c:otherwise>
				</c:choose>
				
				options.data[index].score = parseFloat(p['score']);
				options.data[index].json = p['json'];
				options.data[index].comment = p['comment'];
				
				page.init(options.data.length, curPage, options);
				DialogUtil.msg(a);
			},
			error : function() {
				DialogUtil.error('ajax请求失败！');
			}
		});
	}
	var role = '${role}';
	
	
	
	
	
	
	
	
	
	
	
</script>

<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
