<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/cat/category.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
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
					<form class="form-horizontal" id="categoryForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${category.name}"  data-pinyin="#categoryKey"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">业务主键<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="categoryKey" name="categoryKey" value="${category.categoryKey}"  validate="{required:true,maxlength:192,varirule:true}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">序号:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="sn" name="sn" value="${category.sn}"  validate="{required:false,number:true,maxIntLen:10}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">类型:</label>
                                <div class="col-sm-10">
	       							<label class="radio-inline">
	                                	 	<input type="radio" class="ibps" value="1" name="type"  <c:if test="${empty category || category.type==1}">checked="checked"</c:if>>
	                                	 	<span class="lbl">树型结构</span>
	                                 </label>
	                                 <label class="radio-inline">
	                                	 	<input type="radio" class="ibps"  value="0" name="type"  <c:if test="${category.type==0}">checked="checked"</c:if>>
											<span class="lbl">平铺结构</span>                                       
									</label>
                               </div>
                         </div>
					<input type="hidden" name="id" value="${category.id}" />
					</form>
				</div>
		</div>
	</body>
</html>