

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsTch.js"></script>
		<title>课程分值参数配置</title>
		<script type="text/javascript">
		</script>
	</head>
	<body>
			<div class="form-group">
						<div class="col-sm-12">
							<label class="col-sm-12 text-center">分值参数</label>
							<div class="col-sm-12 panel-toolbar ">
								<div class="toolbar-panel">
									<div class="buttons">
										<a class="btn btn-primary fa fa-add" href="javascript:deviceCate.addSub('deviceParamPoList');"><span>添加</span></a>
										<a class="btn btn-primary fa fa-remove" href="javascript:deviceCate.removeSubAll('deviceParamPoList');"><span>重置</span></a>
									</div>
								</div>
							</div>
							<table name="deviceParamPoList" class="table table-bordered">
								<thead>
									<tr>
										<td>序号</td>
										<td>参数key</td>
										<td>参数名</td>
										<td>值类型</td>
										<td>单位</td>
										<td>指标参数</td>
										<td>管理</td>
									</tr>
								</thead>
								<tbody>
									<c:forEach var="deviceParamPo" varStatus="status" items="${deviceParamPoList}">
									   <tr>
											<td>${status.index + 1}</td>
										   	<td>
												<input type="text" class="form-control" name="paramKey" value="${deviceParamPo.paramKey}"  validate="{required:true,maxlength:50}"/>
											</td>
										   	<td>
												<input type="text" class="form-control" name="paramName" value="${deviceParamPo.paramName}"  validate="{required:true,maxlength:100}"/>
											</td>
										   	<td>
										   		<select name="paramType" class="form-control" validate="{required:false},number:true}">
										   			<option value="0" <c:if test="${deviceParamPo.paramType==0}">selected="selected"</c:if> >字符型</option>
										   			<option value="1" <c:if test="${deviceParamPo.paramType==1}">selected="selected"</c:if>>数值型</option>
										   			<option value="2" <c:if test="${deviceParamPo.paramType==2}">selected="selected"</c:if>>日期型</option>
										   		</select>
											</td>
										   	<td>
												<input type="text" class="form-control" name="paramUnit" value="${deviceParamPo.paramUnit}"  validate="{required:true,maxlength:50}"/>
											</td>
										   	<td>
										   		<select name="isQuota" class="form-control" validate="{required:false},number:true}">
										   			<option value="0" <c:if test="${deviceParamPo.isQuota==0}">selected="selected"</c:if> >否</option>
										   			<option value="1" <c:if test="${deviceParamPo.isQuota==1}">selected="selected"</c:if>>是</option>
										   		</select>
											</td>											
											<td>
												<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="deviceCate.removeSub('deviceParamPoList',this);"><span>删除</span></a>
											</td>
									   </tr>
									</c:forEach>
								</tbody>
								<tfoot>
									<c:if test="${empty deviceCate || empty deviceParamPoList}">
									<c:set var="subSize" scope="session" value="0"/>
									</c:if>
									<c:if test="${not empty deviceCate && not empty deviceParamPoList}">
									<c:set var="subSize" scope="session" value="${deviceParamPoList.size()}"/>
									</c:if>
									<input type="hidden" name="subSize" value="${subSize}"/>
									<tr><td colspan="8">共${subSize}条</td></tr>
								</tfoot>
							</table>
						</div>
					</div>
		</div>
		<script type="text/html" id="deviceParamPoListTrTemplate">
			<tr>
				<td>{{index}}</td>
				<td>
					<input type="text" class="form-control" name="paramKey" value="" validate="{required:true,maxlength:50}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="paramName" value="" validate="{required:true,maxlength:100}"/>
				</td>
				<td>
					<select name="paramType" class="form-control" validate="{required:false},number:true}">
										   			<option value="0"  >字符型</option>
										   			<option value="1" >数值型</option>
										   			<option value="2" >日期型</option>
										   		</select>
				</td>
				<td>
					<input type="text" class="form-control" name="paramUnit" value="" validate="{required:true,maxlength:50}"/>
				</td>
				<td>
					<select name="isQuota" class="form-control" validate="{required:false},number:true}">
										   			<option value="0"  >否</option>
										   			<option value="1" >是</option>
										   		</select>
				</td>
				<td>
					<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="deviceCate.removeSub('deviceParamPoList',this);"><span>删除</span></a>
				</td>
			</tr>
		</script>
	</body>
	
</html>