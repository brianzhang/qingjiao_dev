<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/dictionary.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	<%-- 		<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm?id=${dictionary.typeId}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div> --%>
			<div class="panel-form">
					<form class="form-horizontal" id="dictionaryForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">父节点名称:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="parentName" value="${dictionaryVo.parentName}"  readonly="readonly"  />
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">字典对照值:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${dictionaryVo.name}" data-pinyin="#key"   validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">字典对照码:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="key" name="key" value="${dictionaryVo.key}"  validate="{required:true,maxlength:120}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">序号:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="sn" name="sn" value="${dictionaryVo.sn}"  validate="{digits:true}"/>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${dictionaryVo.id}" />
					<input type="hidden" name="typeId" id="typeId" value="${dictionaryVo.typeId}" />
					<input type="hidden" name="parentId" value="${dictionaryVo.parentId}" />
					</form>
				</div>
		</div>
	</body>
</html>