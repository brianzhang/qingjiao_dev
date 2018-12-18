<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/ueditor.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/msg/innerMessageSend.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-send" ><span>发送消息</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="innerMessageForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">主题:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="subject" name="subject"  validate="{required:true,maxlength:765}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">收件人:</label>
                                <div class="col-sm-10">
                                		<div class="input-group ">
											<input type="hidden" name="receiverId"  id="receiverId" /> 
		                                 	<input type="text" class="form-control"  id="receiver" name="receiver"  readonly="readonly"/>
		                               	  	<span class="input-group-btn">
		                               	  		<button type="button" class="btn  btn-info btn-mm"  
		                               	  			 data-toggle="selector"  data-type="user" data-single="false"  data-id="#receiverId" data-name="#receiver" >
		                               	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
		                               	  		<button type="button" class="btn btn-info btn-mm" 
		                               	  			data-toggle="clear" data-id="#receiverId" data-name="#receiver">
		                               	  			<i class="fa fa-times"></i></button>
		                               	  	</span>
	                                 	</div>
                                </div>
                            </div>
                           <div class="form-group">
                                <label class="col-sm-2 control-label">收件组织:</label>
                                <div class="col-sm-10">
                                		<div class="input-group ">
											<input type="hidden" name="groupId"  id="groupId" /> 
		                                 	<input type="text" class="form-control"  id="groupName" name="groupName"    readonly="readonly"/>
		                               	  	<span class="input-group-btn">
		                               	  		<button type="button" class="btn  btn-info btn-mm"  
		                               	  			 data-toggle="selector"  	data-type="party"  data-single="false"  data-id="#groupId" data-name="#groupName" >
		                               	  			<i class="fa fa-users"></i></button> 
		                               	  		<button type="button" class="btn btn-info btn-mm" 
		                               	  			data-toggle="clear" data-id="#groupId" data-name="#groupName">
		                               	  			<i class="fa fa-times"></i></button>
		                               	  	</span>
	                                 	</div>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否回复:</label>
                                <div class="col-sm-10">
                                	<label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="1" name="canreply"  <c:if test="${empty  innerMessage || innerMessage.canreply==1}">checked="checked"</c:if>>
                                       	 	<span class="lbl">是</span>
                                        </label>
                                        <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="0" name="canreply"  <c:if test="${innerMessage.canreply==0}">checked="checked"</c:if>>
											<span class="lbl">否</span>                                       
										</label>
	                              </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">附件:</label>
                                <div class="col-sm-10">
                                	 <div name="div_attachment_container">
	                                	<div class="fr-files" ></div>
	                                	<textarea style="display: none"   data-control="attachment"  name="fileMsg" labelname="附件" >${innerMessage.fileMsg}</textarea>
	                                </div>
								</div>
                            </div>
		 					<div class="form-group">
                                <label class="col-sm-2 control-label">正文:</label>
                                <div class="col-sm-10">
                                 	<textarea rows="0" cols="0" id="content" name="content" style="display: none;">${fn:escapeXml(innerMessage.content)}</textarea>
                                	<script id="editor" type="text/plain"  style="width:100%;height:200px;"></script>
                                 </div>
                            </div>
						<input type="hidden" name="id" value="${innerMessage.id}" />
					</form>
				</div>
		</div>
	</body>
</html>