<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/layout.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<%@include file="/commons/page/ueditor.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
		<script src="${ctx}/js/plugins/jqueryui/jquery-ui.min.js"></script>
		<script src="${ctx}/js/lc/platform/mail/mailFormat.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/mail/outMail.js"></script>
		<link href="${ctx}/styles/commons/css/mail/mail.css" type=text/css rel=stylesheet>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" id="returnUrl"><span>返回</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-send" ><span>发送</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>存为草稿</span></a>
				</div>
			</div>
			<div class="panel-form" style="float:left;margin:0px auto auto auto;width:85%">
					<form class="form-horizontal" id="outMailForm"  action="save.htm"   method="post"  >
				
							<div class="form-group">
                                <label class="col-sm-2 control-label">收件人:</label>
                                <div class="col-sm-10">
                                		<div class="email">
											<input type="hidden" name="receiverNames"  id="receiverNames" value="${outMail.receiverNames}"/> 
		                                 	<input  type="hidden" name="receiverAddresses"  id="receiverAddresses"  value="${outMail.receiverAddresses}" validate="{required:true,maxlength:765}"/>
		                                 	<div class="sendee"  id="sendee" ></div>
	                                 	</div>
                                </div>
                            </div>
                             <div class="form-group" style="display:none" id="ccDiv">
                                <label class="col-sm-2 control-label">抄送人:</label>
                                <div class="col-sm-10">
                                		<div class="email">
											<input type="hidden" name="ccNames"  id="ccNames" value="${outMail.ccNames}"/> 
		                                 	<input  type="hidden" name="ccAddresses" id="ccAddresses"  value="${outMail.ccAddresses}"/>
		                                 	<div class="cc"  id="cc" style="HEIGHT:auto"></div>
	                                 	</div>
                                </div>
                            </div>
                            <div class="form-group" style="display:none" id="blindDiv">
                                <label class="col-sm-2 control-label">密送人:</label>
                                <div class="col-sm-10">
                                		<div class="email">
											<input type="hidden" name="bccNames"  id="bccNames" value="${outMail.bccNames}"/> 
		                                 	<input  type="hidden" name="bccAddresses"  id="bccAddresses"value="${outMail.bccAddresses}"/>
		                                 	<div class="blind"  id="blind" style="HEIGHT:auto"></div>
	                                 	</div>
                                </div>
                            </div>
                            <div class="form-group" >
                                <label class="col-sm-2 control-label"></label>
                                 <div class="col-sm-10">
                                		<a id="addCc">添加抄送</a> - <a id="addBlind">添加密送</a>
                                </div>
                            </div>
                           <div class="form-group">
                                <label class="col-sm-2 control-label">主题:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="title" name="title"  value="${outMail.title}" />
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否回复:</label>
                                <div class="col-sm-10">
                                	<label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="1" name="isReply"  <c:if test="${empty  outMail || outMail.isReply==true}">checked="checked"</c:if>>
                                       	 	<span class="lbl">是</span>
                                        </label>
                                        <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="0" name="isReply"  <c:if test="${outMail.isReply==false}">checked="checked"</c:if>>
											<span class="lbl">否</span>                                       
										</label>
	                              </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">附件:</label>
                                <div class="col-sm-10">
									<div name="div_attachment_container">
	                                	<div class="fr-files" ></div>
	                                	<textarea style="display: none"   data-control="attachment"  name="fileIds" labelname="附件" >${outMail.fileIds}</textarea>
	                                </div>
								</div>
                            </div>
		 					<div class="form-group">
                                <div class="col-sm-12">
                                 	<textarea rows="0" cols="0" id="content" name="content" style="display: none;">${fn:escapeXml(outMail.content)}</textarea>
                                	<script id="editor" type="text/plain"  style="width:100%;height:200px;"></script>
                                 </div>
                            </div> 
                            
                          <input type="hidden" id="setId"  name="setId" value="${setId}" />
						  <input type="hidden" id="types"  name="types" value="${outMail.types}" />
						  <input type="hidden" name="id" value="${outMail.id}" />
					</form>
				</div>
				<div style="float:right;margin:0px auto auto auto;width:15%;">
					<div class="layout-header ">
    					<h5>最近联系人</h5>
    				</div>
					<div id="linkmanTree" class="ztree"></div>	
				</div>
		</div>
	</body>
</html>