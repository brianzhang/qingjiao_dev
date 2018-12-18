<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanCg.js"></script>
		
		
	</head>
	<body>
	<script type="text/javascript" src="${ctx}/pageoffice.js" id="po_js_main"></script>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class ="btn btn-primary fa fa-save" ><span>保存草稿</span></a>
					<a href="javascript:void(0)" class ="btn btn-primary fa fa-detail" id="anchor" onclick="pageOffice()"><span>查看审批内容</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="urlZhiYuanForm" action="saveCg2.htm" >
				<div id="anchor2" class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="color: red">审核人综合意见</label>
				  	<div class="fr-form-block">
				<textarea disabled="disabled" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:td3"  validate="{required:false}">${urlZhiYuan.td3}</textarea>
				 	</div>
			  	</div>
			</div>
			<h2 style="text-align:center">任务书</h2>
			</br>
					<input type="hidden" name="m:urlZhiYuan:id"  value="${urlZhiYuan.id}"/>
				<div class="fr_response_field col-sm-12">
				      <div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">学生姓名</label>
							<div class="fr-form-block">
								<input  type="text" class="fr-form-control"
									name="m:urlZhiYuan:name"  value="${urlZhiYuan.name}"  disabled="true"validate="{required:false" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">班级</label>
							<div class="fr-form-block">
								<input  type="text" class="fr-form-control"
									name="m:urlZhiYuan:classr"  value="${urlZhiYuan.classr}"  disabled="true"validate="{required:false" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">学号</label>
							<div class="fr-form-block">
								<input  type="text" class="fr-form-control"
									name="m:urlZhiYuan:xh"  value="${urlZhiYuan.xh}"  disabled="true"validate="{required:false" />
							</div>
						</div>
					</div>
				</div>	
				<div class="fr_response_field col-sm-12">
				<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">指导教师</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:urlZhiYuan:finalteacher"
									value="${urlZhiYuan.finalteacher}" disabled="true"  validate="{required:false" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">职称</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:urlZhiYuan:zc"
									value="${urlZhiYuan.zc}" disabled="true" validate="{required:false" />
							</div>
						</div>
					</div>
					</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作目的</label>
				  	<div class="fr-form-block">
				<textarea  style="font-size:15px; width:1200px; height:80px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:gzmd"  validate="{required:true}"
				 onfocus="if (value =='该论文研究什么？学生需要通过哪些方法、手段等获取哪些知识？需要了解、学习、掌握什么？最终解决什么问题？通过该设计（论文）提高学生哪些能力等等。（指导教师可根据实际情况填写）'){value =''}"  
				onblur="if (value ==''){value='该论文研究什么？学生需要通过哪些方法、手段等获取哪些知识？需要了解、学习、掌握什么？最终解决什么问题？通过该设计（论文）提高学生哪些能力等等。（指导教师可根据实际情况填写）'}"
				id="gzmd">${urlZhiYuan.gzmd}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作内容及具体要求</label>
				  	<div class="fr-form-block">
				<textarea style="font-size:15px; width:1200px; height:220px"  class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:gznrjjtyq"  validate="{required:true}"
				 onfocus="if (value =='请分开填写工作内容和具体要求'){value =''}"  onblur="if (value ==''){value='请分开填写工作内容和具体要求'}" id=workthings>${urlZhiYuan.gznrjjtyq}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作进度分配</label>
				  	<div class="fr-form-block">
				<textarea  style="font-size:15px; width:1200px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:gzjdfp"  validate="{required:true}"
				>${urlZhiYuan.gzjdfp}</textarea>
				 	</div>
			  	</div>
			</div>
			
			<p style="color:red">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
			工作进度分配填写要求：1-2周写开题前工作，第3-4周开始写新学期的工作</p>
					<p style="color:red">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
						工作进度提醒：共14周，本学期2周，下学期12周，请每两周一个进度填写</p>


			
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要参考资料</label>
				  	<div class="fr-form-block">
				<textarea style="font-size:15px; width:1200px; height:200px"  class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:renwushu_zyzl"  validate="{required:true}">${urlZhiYuan.renwushu_zyzl}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">指导答疑方式</label>
				  	<div class="fr-form-block">
				<textarea style="font-size:15px; width:1200px; height:130px"  class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:zddyfs"  validate="{required:true}"
				id="zhidao" onfocus="if (value =='答疑时间及地点要求详细、清楚，并且至少每周1次'){value =''}"  onblur="if (value ==''){value='答疑时间及地点要求详细、清楚，并且至少每周1次'}">${urlZhiYuan.zddyfs}</textarea>
				 	</div>
			  	</div>
			</div>
			 	
			         <input type="hidden" name="m:urlZhiYuan:td2id"  value="${urlZhiYuan.td2id}"/>
					<input type="hidden" name="m:urlZhiYuan:td2"  value="${urlZhiYuan.td2}"/>
					<input type="hidden" name="m:urlZhiYuan:td1id"  value="${urlZhiYuan.td1id}"/>
					<input type="hidden" name="m:urlZhiYuan:td1"  value="${urlZhiYuan.td1}"/>
					<input type="hidden" name="m:urlZhiYuan:classr"  value="${urlZhiYuan.classr}"/>
					<input type="hidden" name="m:urlZhiYuan:finalteacherId"  value="${urlZhiYuan.finalteacherId}"/>
					<input type="hidden" name="m:urlZhiYuan:finaltd"  value="${urlZhiYuan.finaltd}"/>
					<input type="hidden" name="m:urlZhiYuan:finaltdId"  value="${urlZhiYuan.finaltdId}"/>
					<input type="hidden" name="m:urlZhiYuan:xh"  value="${urlZhiYuan.xh}"/>
					<input type="hidden" name="m:urlZhiYuan:name"  value="${urlZhiYuan.name}"/>
					<input type="hidden" name="m:urlZhiYuan:js3"  value="${urlZhiYuan.js3}"/>
					<input type="hidden" name="m:urlZhiYuan:js3id"  value="${urlZhiYuan.js3id}"/>
					<input type="hidden" name="m:urlZhiYuan:td3id"  value="${urlZhiYuan.td3id}"/>
					<input type="hidden" name="m:urlZhiYuan:js1"  value="${urlZhiYuan.js1}"/>
					<input type="hidden" name="m:urlZhiYuan:js1"  value="${urlZhiYuan.js1id}"/>
					<input type="hidden" name="m:urlZhiYuan:litishufile"  value="${urlZhiYuan.litishufile}"/>
					<input type="hidden" name="m:urlZhiYuan:litishufile"  value="${urlZhiYuan.renwushufile}"/> 
</form>
            <input type="hidden" value="${filedownload}"/>

			</div>
		</div>
	</body>
	<script type="text/javascript">
$(function(){
	var type = ${type};
	showbutton(type);
	if(document.getElementById('workthings').value==''){
			document.getElementById('workthings').value='请分开填写工作内容和具体要求';
			}
	if(document.getElementById('gzmd').value==''){
	document.getElementById('gzmd').value='该论文研究什么？学生需要通过哪些方法、手段等获取哪些知识？需要了解、学习、掌握什么？最终解决什么问题？通过该设计（论文）提高学生哪些能力等等。（指导教师可根据实际情况填写）';
	}
	if(document.getElementById('zhidao').value==''){
		document.getElementById('zhidao').value='答疑时间及地点要求详细、清楚，并且至少每周1次';
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
	function showbutton(type){
		if(type==0){
			document.getElementById("anchor").style.display = "none";
			document.getElementById("anchor2").style.display = "none";
		}
	 }
		function pageOffice(){
			POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId +'&readOnly=1','fullscreen=yes','123');
		}
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
