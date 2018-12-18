
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/page/codegen.jsp"%>
<f:link  href="bootstrap/bootstrap-tour.min.css" />
<title>t_crs_job管理列表</title>
</head>
<body>
	<input type="hidden" id="crsTchid" value="${crsTchid }">
	<input type="hidden" id="xh" value="${xh }">
	
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<%-- <a href="${ctx }/gradp/course/subMain/redirect.htm"
							class="btn btn-primary fa fa-back"><span>返回</span></a> --%>
							
						<a class="btn btn-primary fa fa-search hidden" 
							href="javascript:void(0);"><span>搜索</span></a>
						<c:if test="${normalteacher }">
						<a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsJob/edit.htm?crsTchId=${crsTchId}" id="newJob"><span>新增作业</span></a>
						<a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsTch/edit.htm?id=${crsTchId}&crsName=${crsName }" id="plNewJob"><span>批量生成作业</span></a>
						<a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsTch/edit.htm?id=${crsTchId}&crsName=${crsName }&copy=1" id="copyNewJob"><span>从其他课程复制作业</span></a>
						</c:if>	
						
						<%-- <c:if test="${obj=='teacher' }"> --%>
						</div>
						<div class="buttons">
						<c:if test="${normalteacher }">
							<a class="btn btn-primary fa fa-edit" href="javascript:void(0);"
								action="${ctx}/gradp/course/crsJob/edit.htm?t=${t}" id="edit"><span>编辑</span></a>
							<a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/gradp/course/crsJob/remove.htm"><span>删除</span></a>
								<%-- <a class="btn btn-primary fa fa-export" href="zip.htm" onclick="exportIanfo('${num}')"
								><span>数据导出</span></a> --%>
							<a class="btn btn-primary fa  fa-pencil  " id="editMark" href="javascript:void(0);"><span>修改分值</span></a>
						</c:if>	
							<a class="btn btn-primary fa fa-export "
							href="javascript:void(0);" id="file"><span>导出作业文件</span></a>
							
						<%-- </c:if> --%><!-- teacher end -->
						</div>
						<div class="buttons">
						<a class="btn btn-primary fa fa-help" href="javascript:;" >查看引导</a>
						<%-- <a class="btn btn-primary fa fa-add"   href="${ctx}/gradp/course/crsJob/edit.htm" ><span>添加</span></a>
					        	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/gradp/course/crsJob/remove.htm"><span>删除</span></a> --%>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<h2 style="float:left;line-height:1.7em">${crsName }&nbsp;课程作业列表&nbsp;</h2>
						<a href="javascript:void(0);" class="collapse"> <i
							class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form">
						<div class="form-inline p-xxs">
							<div class="form-group">
								<label class="search-label">标题</label>: <input type="text"  id="search"
									name="Q^TITLE^SL" class="form-control" onkeyup="cg()" />
							</div>
							<%-- <div class="form-group">
									<label   class="search-label">类型</label>:
									<select name="Q^CATEGORY^S" class="form-control search-select" onchange="cg()">
										<option value="">all</option>	
										<c:forEach items="${categoryList }" varStatus="i" var="category">
											<option value="${i.index }">${category }</option>
										</c:forEach>
									</select>
								</div> --%>
							<c:if test="${obj=='teacher' }">
								<div class="form-group">
								<label class="search-label">授课班级</label>: <select
									name="Q^CRS_TCH_ID^S" class="form-control search-select"
									onchange="cg()">
									<option value="">all</option>
									<c:forEach items="${crsTchList }" var="crsTch">
										<option value="${crsTch.id }">${crsTch.crsName }-${crsTch.clazz }</option>
									</c:forEach>
								</select>
							</div>
							</c:if>
							<div class="form-group">
								<label class="search-label">进行状态</label>: <select
									name="Q^STATUS^S" class="form-control search-select"
									onchange="cg()">
									<option value="">all</option>
									<c:forEach items="${statusList }" varStatus="i" var="status">
										<option value="${(i.index+1)%3 }">${statusList[(i.index+1)%3] }</option>
									</c:forEach>
								</select>
							</div>
							<c:if test="${obj=='teacher'&&t!=4 }">
							<c:if test="${t!=3}">
							<div class="form-group">
									<label class="search-label">评阅完成度</label>: <select
										name="Q^TEACHER_ALL^S" class="form-control search-select"
										onchange="cg()">
										<option value="">all</option>
										<option value="0"><span style="color: red">未全部评阅</span></option>
										<option value="1"><span style="color: green">已全部评阅</span></option>
									</select>
								</div>
</c:if>								
								<div class="form-group">
									<label class="search-label">学生完成度</label>: <select
										name="Q^STUDENT_ALL^S" class="form-control search-select"
										onchange="cg()">
										<option value="">all</option>
										<option value="0"><span style="color: red">未全部完成</span></option>
										<option value="1"><span style="color: green">已全部完成</span></option>
									</select>
								</div>
							</c:if>
							<!-- 
								<div class="form-group">
									<label   class="search-label">起止时间</label>:
									<input type="text"  name="Q^START_STOP_TIME^SL"  class="form-control"  />
								</div> 
								
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^CONTENT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">分值</label>:
									<input type="text"  name="Q^SCORE_POWER^SL"  class="form-control"  />
								</div> -->
						</div>
					</form>
				</div>
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="crsJobGrid"></table>
			<div id="crsJobPager"></div>
		</div>
	</div>

</body>

<script type="text/javascript" src="${ctx}/js/lc/gradp/course/crsJobPG.js"></script>
<script src="${ctx}/js/plugins/bootstrap/bootstrap-tour.min.js"></script>
</html>
