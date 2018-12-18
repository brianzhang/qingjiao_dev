<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<%@include file="/commons/page/ueditor.jsp" %>
	    <script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/system/test.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/UploadDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/AttachementControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-send" ><span>发布</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>存为草稿</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			
			<div class="panel-body">
				<div class="wrapper wrapper-content col-sm-12">
					<div class="row">
						<div class="col-sm-8 animated fadeInRight">
							<div class="panel-form col-sm-12">
								<form class="form-horizontal" id="newsForm"  action="save.htm"   method="post"  >
										<div class="form-group">
			                                <label class="col-sm-2 control-label">发布选项:</label>
			                                <div class="col-sm-10">
			                                	<label class="radio-inline">
		                                       	 	<input type="radio" class="ibps" value="notices" name="publicItem"  <c:if test="${empty  news || news.publicItem=='notices'}">checked="checked"</c:if>>
		                                       	 	<span class="lbl">发布公告</span>
		                                        </label>
		                                        <label class="radio-inline">
		                                       	 	<input type="radio" class="ibps"  value="important" name="publicItem"  <c:if test="${news.publicItem=='important'}">checked="checked"</c:if>>
													<span class="lbl">重要公告,需关注</span>                                       
												</label>
			                                </div>
			                            </div>
										<div class="form-group">
			                                <label class="col-sm-2 control-label">类型:</label>
			                                <div class="col-sm-10">
			                                	<input type="hidden" id="typeId" name="typeId" value="${news.typeId}"/>
			                                    <input type="text" class="form-control comboTree"  id="type" name="type" 
			                                    	 data-toggle="comboTree"  data-type="NOTICE_TYPE" data-id="#typeId"  readonly
			                                    	 value="${news.type}"  />
			                                </div>
			                            </div>
										<div class="form-group">
			                                <label class="col-sm-2 control-label">标题<span class="required">*</span>:</label>
			                                <div class="col-sm-10">
			                                    <input type="text" class="form-control"  id="title" name="title" value="${news.title}"  validate="{required:true,maxlength:400}"/>
			                                </div>
			                            </div>
										<div class="form-group">
			                                <label class="col-sm-2 control-label">发布人:</label>
			                                <div class="col-sm-10">
			                                	<div class="input-group ">
													<input type="hidden" id="userId" name="userId" value="${news.userId}"/>
					                                  <input type="text" class="form-control"  id="userName" name="userName" value="${news.userName}"  validate="{required:false,maxlength:500}" readOnly="true"/>
					                           	  	<span class="input-group-btn">
					                           	  		<button type="button" class="btn  btn-info btn-mm"  
					                           	  			 data-toggle="selector"  data-type="user" data-single="true"  data-id="#userId" data-name="#userName" >
					                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
					                           	  		<button type="button" class="btn btn-info btn-mm" 
							                               	 data-toggle="clear" data-id="#userId" data-name="#userName">
							                               	 <i class="fa fa-times"></i></button>
					                           	  	</span>
					                            </div>
			                                </div>
			                            </div>
			                            	<div class="form-group">
			                                <label class="col-sm-2 control-label">是否公共：</label>
			                                <div class="col-sm-10">
			                                	<label class="radio-inline">
			                                       	 	<input type="radio" class="ibps" value="yes" name="isPublic"  <c:if test="${empty  news || news.isPublic=='yes'}">checked="checked"</c:if>>
			                                       	 	<span class="lbl">是</span>
			                                        </label>
			                                        <label class="radio-inline">
			                                       	 	<input type="radio" class="ibps"  value="no" name="isPublic"  <c:if test="${news.isPublic=='no'}">checked="checked"</c:if>>
														<span class="lbl">否</span>                                       
													</label>
			                                </div>
			                            </div>
									
			                            <div class="form-group" id="fbRights">
			                                <label class="col-sm-2 control-label">发布范围:</label>
			                                <div class="col-sm-10">
			                                	<div class="input-group ">
													 <input type="hidden" id="depId" name="depId" value="${news.depId}"/>
					                                 <input type="text" class="form-control"  id="depName" name="depName" value="${news.depName}"  readOnly="true"/>
					                           	  	<span class="input-group-btn">
					                           	  		<button type="button" class="btn  btn-info btn-mm"  
					                           	  			 data-toggle="selector"  data-type="org" data-single="false"  data-id="#depId" data-name="#depName" >
					                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
					                           	  		<button type="button" class="btn btn-info btn-mm" 
							                               	 data-toggle="clear" data-id="#depId" data-name="#depName">
							                               	 <i class="fa fa-times"></i></button>
					                           	  	</span>
					                            </div>
			                                </div>
			                            </div>
			                            
			                            <div class="form-group">
			                                <label class="col-sm-2 control-label">作者:</label>
			                                <div class="col-sm-10">
			                                    <input type="text" class="form-control"  id="author" name="author" value="${news.author}"  validate="{required:false,maxlength:400}"/>
			                                </div>
			                            </div>
			                            
			                            <div class="form-group">
			                                <label class="col-sm-2 control-label">关键字:</label>
			                                <div class="col-sm-10">
			                                    <input type="text" class="form-control"  id="key" name="key" value="${news.key}"  validate="{required:false,maxlength:400}"/>
			                                </div>
			                            </div>
			                            
										<div class="form-group">
			                                <label class="col-sm-2 control-label">发布时间:</label>
			                                <div class="col-sm-10">
			                                    <input type="text" class="form-control date"  id="publicDate" name="publicDate" value="<fmt:formatDate value='${news.publicDate}' />"  validate="{required:false}"/>
			                                </div>
			                            </div>
										<div class="form-group">
			                                <label class="col-sm-2 control-label">失效时间:</label>
			                                <div class="col-sm-10">
			                                    <input type="text" class="form-control date"  id="loseDate" name="loseDate" value="<fmt:formatDate value='${news.loseDate}'/>"  validate="{required:false}"/>
			                                </div>
			                            </div>
										
										<div class="form-group">
			                                <label class="col-sm-2 control-label">附件:</label>
			                                <div class="col-sm-10">
			                                	  	<div name="div_attachment_container">
					                                	<div class="fr-files" ></div>
					                                	<textarea style="display: none"   data-control="attachment"  name="fileAttach" labelname="附件" >${news.fileAttach}</textarea>
					                                </div>
			                                </div>
			                            </div>
										
										<div class="form-group">
			                                <label class="col-sm-2 control-label">内容:</label>
			                                <div class="col-sm-10">
			                                	<textarea rows="0" cols="0" id="content" name="content" style="display: none;">${fn:escapeXml(news.content)}</textarea>
                                				<script id="editor" type="text/plain"  style="width:100%;height:200px;"></script>
			                                </div>
			                            </div>
									<input type="hidden" name="id" value="${news.id}" />
									<input type="hidden" name="status" value="${news.status}" />
									<input type="hidden" id="picture" name="picture" value="${news.picture}"/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>