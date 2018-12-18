

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/log/log.js"></script>
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
				<form class="form-horizontal" id="logForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模块:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="module" name="module" value="${log.module}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">子模块:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="subModule" name="subModule" value="${log.subModule}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">类型:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="type" name="type" value="${log.type}"  validate="{required:false,maxlength:120}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">标题:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="title" name="title" value="${log.title}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">IP地址:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="ipAddr" name="ipAddr" value="${log.ipAddr}"  validate="{required:false,maxlength:765}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">请求URI:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="requestUri" name="requestUri" value="${log.requestUri}"  validate="{required:false,maxlength:765}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">操作方式:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="method" name="method" value="${log.method}"  validate="{required:false,maxlength:60}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">操作提交的数据:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="params" name="params" value="${log.params}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">异常数据:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="exception" name="exception" value="${log.exception}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">用户代理:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="userAgent" name="userAgent" value="${log.userAgent}"  validate="{required:false}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">操作人ID:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createBy" name="createBy" value="${log.createBy}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">操作人:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createor" name="createor" value="${log.createor}"  validate="{required:false,maxlength:192}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">创建时间:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="createTime" name="createTime" value="${log.createTime}"  validate="{required:false}"/>
	                        </div>
	                    </div>
 						<input type="hidden" name="id" value="${log.id}" />
					</div>
					
				</form>
			</div>
		</div>
		
	</body>
</html>