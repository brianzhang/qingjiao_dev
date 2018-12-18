<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/jquery/plugins/jquery.inputmask.bundle.min.js"></script>	
		<script type="text/javascript" src="${ctx}/js/lc/platform/system/acceptIp.js"></script>
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
					<form class="form-horizontal" id="acceptIpForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">标题:<span class="required">*</span></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="title" name="title" value="${acceptIp.title}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">开始地址:<span class="required">*</span></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="startIp" name="startIp"  data-inputmask="'alias': 'ip'" value="${acceptIp.startIp}"  validate="{required:true,maxlength:60}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">结束地址:<span class="required">*</span></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="endIp" name="endIp" data-inputmask="'alias': 'ip'" value="${acceptIp.endIp}"  validate="{required:true,maxlength:60}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">备注:</label>
                                <div class="col-sm-10">
                                	<textarea   class="form-control" rows="10" cols="5"   id="remark" name="remark" >${acceptIp.remark}</textarea>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${acceptIp.id}" />
					</form>
				</div>
		</div>
	</body>
</html>