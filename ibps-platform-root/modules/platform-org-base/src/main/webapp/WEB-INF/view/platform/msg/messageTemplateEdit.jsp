<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/ueditor.jsp" %>
	    <script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/msg/messageTemplate.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="messageTemplateForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${messageTemplate.name}"   data-pinyin="#key"  validate="{required:true,maxlength:765}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">业务主键<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="key" name="key" value="${messageTemplate.key}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">模板分类<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                		<select name="typeKey"  class="form-control"  validate="{required:true,maxlength:120}">
                                			<c:forEach items="${msgTelTypes}" var="msgTelType">
                                				<option value="${msgTelType.typeKey }"  <c:if test="${messageTemplate.typeKey == msgTelType.typeKey} "></c:if>  selected="selected"  >${msgTelType.name }</option>
                                			</c:forEach>
                                		</select>
                                 </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否默认<span class="required">*</span>:</label>
                                <div class="col-sm-10">
              							<label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="true" name="isDefault"  <c:if test="${empty  messageTemplate || messageTemplate.isDefault==true}">checked="checked"</c:if>>
                                       	 	<span class="lbl">是</span>
                                        </label>
                                        <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="false" name="isDefault"  <c:if test="${messageTemplate.isDefault==false}">checked="checked"</c:if>>
											<span class="lbl">否</span>                                       
										</label>
                                   </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">标题:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="subject" name="subject" value="${messageTemplate.subject}"  validate="{required:false,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">内容:</label>
                                <div class="col-sm-10">
                                      <textarea   id="plain" name="plain"   style="display: none;">${fn:escapeXml(messageTemplate.plain)}</textarea>
                                	<textarea rows="0" cols="0" id="html" name="html" style="display: none;">${fn:escapeXml(messageTemplate.html)}</textarea>
                                	<script id="editor" type="text/plain"  style="width:100%;height:100px;"></script>
                                </div>
                            </div>
						<input type="hidden" name="id" value="${messageTemplate.id}" />
					</form>
				</div>
		</div>
	</body>
</html>