<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/type.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			 <c:if test="${param.isDialog==0}">
				<div class="panel-toolbar ">
					<div class="buttons">
						<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					</div>
				</div>
			</c:if>
			<div class="panel-form">
					<form class="form-horizontal" id="typeForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">类型:</label>
                                <div class="col-sm-10">
                               		<p class="form-control-static">
                                	<c:choose >
                                		<c:when test="${typeVo.isPrivate}"> 私有分类</c:when>
                                		<c:otherwise>普通分类</c:otherwise>
                                	</c:choose>
                                	</p>
                                </div>
                            </div>
                            <c:if test="${empty typeVo.id}">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">父节点:</label>
                                <div class="col-sm-10">
                                   <p class="form-control-static"> ${typeVo.parentName}</p>
                                </div>
                            </div>
                            </c:if>
							<div class="form-group">
                                <label class="col-sm-2 control-label">分类名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${typeVo.name}"  data-pinyin="#typeKey"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">分类Key<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="typeKey" name="typeKey" value="${typeVo.typeKey}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
                            <c:if test="${typeVo.isDict}">
							<div class="form-group">
                                <label class="col-sm-2 control-label">字典类型<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                	<label class="radio-inline">
	                                	 	<input type="radio" class="ibps" value="1" name="struType"  <c:if test="${empty typeVo || typeVo.struType==1}">checked="checked"</c:if>>
	                                	 	<span class="lbl">树型结构</span>
	                                 </label>
	                                 <label class="radio-inline">
	                                	 	<input type="radio" class="ibps"  value="0" name="struType"  <c:if test="${typeVo.struType==0}">checked="checked"</c:if>>
											<span class="lbl">平铺结构</span>                                       
									</label>
                                </div>
                            </div>
							</c:if>
					<input type="hidden" name="isRoot" value="${typeVo.isRoot}" />
					<input type="hidden" name="isPrivate" value="${typeVo.isPrivate}" />
					<input type="hidden" name="isDict" value="${typeVo.isDict}" />
					
					<input type="hidden" name="id" value="${typeVo.id}" />
					<input type="hidden" name="parentId" value="${typeVo.parentId}" />
					<input type="hidden" name="path" value="${typeVo.path}" />
					<input type="hidden" name="categoryKey" value="${typeVo.categoryKey}" />
					<c:if test="${!typeVo.isDict}">
					<input type="hidden"  name="struType" value="${typeVo.struType}"/>
					</c:if> 
					</form>
				</div>
		</div>
	</body>
</html>