<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/mail/mailConfig.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
					
					<a href="javascript:void(0);" class="btn btn-primary fa fa-bug" ><span>测试</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="mailConfigForm"  action="save.htm"   method="post"  >
					<input type="hidden" name="id" value="${mailConfig.id}" />
					 <input type="hidden" id="userId" name="userId" value="${mailConfig.userId}"  />
					 <fieldset>
                        	<legend>基本信息</legend>
                 			<p>&nbsp;</p>
							<div class="form-group">
                                <label class="col-sm-2 control-label">帐号名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="userName" name="userName" value="${mailConfig.userName}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
                				<div class="form-group">
                                <label class="col-sm-2 control-label">是否默认<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                 		<label class="radio-inline"><input type="radio" class="ibps" name="isDefault" value="true"  <c:if test="${mailConfig.isDefault==true}">checked="checked"</c:if> /><span class="lbl">是</span></label>
										<label class="radio-inline"><input type="radio" class="ibps"  name="isDefault" value="false" <c:if test="${mailConfig.isDefault==false}">checked="checked"</c:if>  /><span class="lbl">否</span></label>
              
                                </div>
                            </div>
                      </fieldset>
                      <fieldset>
                        	<legend>邮箱设置</legend>
                        	
                        	<p>&nbsp;</p>
                        	
                            <div class="form-group">
                                <label class="col-sm-2 control-label">邮件地址:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="mailAddress" name="mailAddress" value="${mailConfig.mailAddress}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">邮件密码:</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control"  id="mailPass" name="mailPass" value="${mailConfig.mailPass}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
                        	
                        	
                        	<div class="form-group">
                                <label class="col-sm-2 control-label">服务器类型:</label>
                                <div class="col-sm-10">
									<input type="text" readonly="readonly" class="form-control" id="mailType" name="mailType" value="${mailConfig.mailType}" />
									<%--<select  class="form-control"  id="mailType" name="mailType" readonly="readonly">
                                		<option value="pop3" selected="selected">pop3</option>
										<option value="imap" <c:if test="${mailConfig.mailType=='imap' }">selected="selected"</c:if>> imap</option>
                                	</select> --%>
                                </div>
                            </div>
                            
							<div class="form-group">
								<label class="col-sm-2 control-label">&nbsp; </label>
							   <div class="col-sm-10 ">
								   <div class="checkbox">
										<label class="checkbox-inline">
											<input type="checkbox" class="ibps" value="true" name="isValidate"
												 <c:if test="${mailConfig.isValidate==true}">checked="checked"</c:if> />
											<span class="lbl">是否需要身份认证</span>
										</label>
									</div>
									<div class="checkbox">
										<label class="checkbox-inline">
											<input type="checkbox" class="ibps" value="true" name="isHanDleAttach"
												<c:if test="${mailConfig.isHanDleAttach==true}">checked="checked"</c:if> />
											<span class="lbl">是否下载附件</span>
										</label>
									 </div>
									<%--<div class="checkbox">
										<label>
											<input type="checkbox" class="ibps" value="true" name="isDeleteRemote"
												<c:if test="${mailConfig.isDeleteRemote==true}">checked="checked"</c:if> />
											<span class="lbl">在本邮箱中删除邮件时，删除操作将同步到其他邮箱</span>
										</label>
									</div> --%>

						   			<div class="checkbox">
										<label class="checkbox-inline">
											<input type="checkbox" class="ibps" value="true" name="useSsl" 
												<c:if test="${mailConfig.useSsl==true}">checked="checked"</c:if> />
											<span class="lbl">开启SSL安全连接</span>
										</label>
								   </div>
								   
								   <p>&nbsp;</p>
								   
								   <span>不开启<label class="blue">SSL安全连接</label>，<label class="red">POP3</label>端口默认为<label class="red">110</label>，<label class="red">SMTP</label>默认端口为<label class="red">25</label>；如开启，请自行查询端口；</span>
								</div>
                            </div>
                            
                            <div class="form-group pop3">
                                <label class="col-sm-2 control-label">服务器(pop3):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="popHost" name="popHost" value="${mailConfig.popHost}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group pop3">
                                <label class="col-sm-2 control-label">端口(pop3):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="popPort" name="popPort" value="${mailConfig.popPort}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
<%-- 							<div class="form-group imap"  <c:if test="${mailConfig.mailType=='pop3' }">style="display: none"</c:if>>
                                <label class="col-sm-2 control-label">服务器(IMAP):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="imapHost" name="imapHost" value="${mailConfig.imapHost}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group imap"  <c:if test="${mailConfig.mailType=='pop3' }">style="display: none"</c:if>>
                                <label class="col-sm-2 control-label">端口(IMAP):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="imapPort" name="imapPort" value="${mailConfig.imapPort}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div> --%>
			
							<div class="form-group">
                                <label class="col-sm-2 control-label">服务器(SMTP):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="smtpHost" name="smtpHost" value="${mailConfig.smtpHost}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">端口(SMTP):</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="smtpPort" name="smtpPort" value="${mailConfig.smtpPort}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
                   </fieldset>
				
					</form>
				</div>
		</div>
	</body>
</html>