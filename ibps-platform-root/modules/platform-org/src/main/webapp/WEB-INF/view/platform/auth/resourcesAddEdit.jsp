<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/formdata.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<f:link href="iconpicker/fontawesome-iconpicker.min.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/iconpicker/fontawesome-iconpicker.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/auth/addResources.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="resourcesForm"  action="save.htm"   method="post"  >
							<div type="main">
							<div class="form-group">
                                <label class="col-sm-2 control-label">资源名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${resources.name}" data-pinyin="#alias"   validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">资源别名<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="alias" name="alias" value="${resources.alias}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>

							<div class="form-group">
                                <label class="col-sm-2 control-label">图标<span class="required">*</span>:</label>
                                <div class="col-sm-10">
									<input type="hidden" id="icon" name="icon" value="<c:choose><c:when test="${empty resources }">fa-cogs</c:when><c:otherwise>${resources.icon}</c:otherwise></c:choose>" />	
                                  	<div class="btn-group">
	                                   <button data-selected="graduation-cap" type="button" class="icp icp-dd btn btn-default dropdown-toggle iconpicker-component" data-toggle="dropdown">
	                                        <i class="fa	<c:choose><c:when test="${empty resources }">fa-cogs</c:when><c:otherwise>${resources.icon}</c:otherwise></c:choose>  fa-fw"></i>
	                                       <span class="caret"></span>
	                                   </button>
	                                   <div class="dropdown-menu"></div>
	                               </div>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">默认URL:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="defaultUrl" name="defaultUrl" value="${resources.defaultUrl}"  validate="{required:false,maxlength:765}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否目录<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                		<label class="radio-inline"><input type="radio" class="ibps" name="isFolder" value="true"  <c:if test="${empty resources ||resources.isFolder==true}">checked="checked"</c:if> /><span class="lbl">是</span></label>
										<label class="radio-inline"><input type="radio" class="ibps"  name="isFolder" value="false" <c:if test="${resources.isFolder==false}">checked="checked"</c:if>  /><span class="lbl">否</span></label>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">显示到菜单<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                              	         <label class="radio-inline"><input type="radio" class="ibps"  name="displayInMenu" value="true"  <c:if test="${resources.displayInMenu==true}">checked="checked"</c:if> /><span class="lbl">是</span></label>
										<label class="radio-inline"><input type="radio" class="ibps"  name="displayInMenu" value="false" <c:if test="${empty resources ||resources.displayInMenu==false}">checked="checked"</c:if>  /><span class="lbl">否</span></label>        	
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">是否展开<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                	    <label class="radio-inline"><input type="radio" class="ibps"  name="isOpen" value="true"  <c:if test="${resources.isOpen==true}">checked="checked"</c:if> /><span class="lbl">是</span></label>
										<label class="radio-inline"><input type="radio" class="ibps"  name="isOpen" value="false" <c:if test="${empty resources ||resources.isOpen==false}">checked="checked"</c:if>  /><span class="lbl">否</span></label>        	
                                </div>
                            </div>
                          <div class="form-group">
                                <label class="col-sm-2 control-label">同层顺序:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="sn" name="sn" value="${resources.sn}"  validate="{required:false,number:true,maxIntLen:19}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">描述:</label>
                                <div class="col-sm-10">
                                	<textarea rows="3" cols="5" class="form-control"  id="desc" name="desc"  >${resources.desc}</textarea>
                                </div>
                            </div>
                             <input type="hidden" id="parentId" name="parentId" value="${resources.parentId}"/>
                                <input type="hidden" id="path" name="path" value="${resources.path}" />
                        		<input type="hidden"  id="systemId" name="systemId" value="${resources.systemId}"  />
								<input type="hidden" name="id" value="${resources.id}" />
						</div>
					</form>
				</div>
		</div>
	</body>
</html>