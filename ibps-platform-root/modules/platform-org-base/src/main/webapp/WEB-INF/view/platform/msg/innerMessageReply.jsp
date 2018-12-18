<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/ueditor.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
	   <script type="text/javascript" src="${ctx}/js/lc/platform/msg/innerMessage.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-send"  href="javascript:void(0);" ><span>回复</span></a>
					<a class="btn btn-primary fa fa-back" href="${ctx}/platform/msg/innerMessage/receive.htm" ><span>返回</span></a>	
					<input type="hidden" id=returnUrl value="${returnUrl}"/>
				</div>
			</div>
			<div class="panel-form col-sm-12">
					<form class="form-horizontal" id="innerMessageReplyForm"  action="saveReply.htm"   method="post"  >
						<input type="hidden" name="msgId" value="${innerMessage.id}"/>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">主题:</label>
							<div class="col-sm-2">
								<p class="form-control-static">${innerMessage.subject}</p>
							</div>
							
							<label class="col-sm-2 control-label">发送时间:</label>
							<div class="col-sm-2">
								<p class="form-control-static"><fmt:formatDate value="${innerMessage.createTime}"  pattern="yyyy-MM-dd HH:mm:ss"/></p>		
							</div>
							
							<label class="col-sm-2 control-label">发送人:</label>
							<div class="col-sm-2">
								<p class="form-control-static">${innerMessage.owner}</p>
							</div>
						</div>
						
						<!-- <div class="form-group col-sm-12">
                                <label class="col-sm-2 control-label">私密回复:</label>
                                <div class="col-sm-10">
                                        <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="0" name="isPrivate"  checked="checked" >
											<span class="lbl">否</span>                                       
										</label>
                                	<label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="1" name="isPrivate" >
                                       	 	<span class="lbl">是</span>
                                        </label>
                            
	                              </div>
                          </div> -->
                          
						<div class="form-group col-sm-12">
							<label class="col-sm-2 control-label">回复内容:</label>
							<div class="col-sm-10">
							        <textarea rows="0" cols="0" id="content" name="content" style="display: none;"></textarea>
	                               	<script id="editor" type="text/plain"  style="width:100%;height:200px;"></script>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">原消息内容:</label>
								<div class="col-sm-10">
									<p class="form-control-static">${innerMessage.content}</p>
								</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-2 control-label">附件:</label>
							<div class="col-sm-10">
								<div name="div_attachment_container" data-rights="r">
	                                	<div class="fr-files" ></div>
	                                	<textarea style="display: none"   data-control="attachment"  name="fileMsg" labelname="附件" >${innerMessage.fileMsg}</textarea>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<table class="table-form" cellspacing="0">
									<tr>
										<th style="text-align:left;width:4%"><span>序号</span></th>
										<th style="text-align:left;width:69%"><span>回复内容</span></th>
										<th style="text-align:left;width:12%"><span>回复人</span></th>
										<th style="text-align:left;width:25%"><span>回复时间</span></th>
									</tr>
									<c:forEach items="${replyList}" var="MsgReply" varStatus="status">
										<tr>
											<td style="text-align:left;width:4%">${status.count}</td>
											<td style="text-align:left;width:69%">${MsgReply.content}</td>
											<td style="text-align:left;width:12%">${MsgReply.reply}</td>
											<td style="text-align:left;width:25%"><fmt:formatDate value="${MsgReply.replyTime}" pattern='yyyy-MM-dd HH:mm:ss'/></td>
										</tr>
									</c:forEach>
								</table>
							</div>
						</div>
					</form>
			</div>
		</div>
	</body>
</html>