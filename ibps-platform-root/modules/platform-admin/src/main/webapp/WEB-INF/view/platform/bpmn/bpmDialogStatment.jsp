<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.lc.ibps.base.web.controller.*,com.lc.ibps.base.web.context.ContextUtil"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmDialogStatment.js"></script>
</head>
<body>
	<div class="panel">
		<div>
			<div name="statment_container" class="selector-container">
			</div>
		</div>
		
		<div class="panel-body">
			<div class="wrapper wrapper-content ">
				<div class="row">
					<table border="0" width="100%">
						<tr>
							<td>
								<div class="toolbar-panel ">
									<div class="toolbar-box">
										<div class="toolbar-head clearfix">
											<!-- 顶部按钮 -->
											<div class="buttons">
												<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
											</div>
											<!-- 收缩 -->
											<div class="tools">
												<a href="javascript:void(0);" class="collapse"> <i class="bigger-180 fa  fa-angle-double-up"></i></a>
											</div>
										</div>
										<!-- #查询条件-->
										<div class="toolbar-body">
											<form role="form" class="search-form">
												<div class="form-inline p-xxs">
													<div class="form-group">
														<label   class="search-label">内容</label>:
														<input type="text"  name="Q^VALUE_^SL"  class="form-control"  />
													</div> 
													<div class="form-group">
														<label   class="search-label">是否默认</label>:
														<select name="Q^IS_DEFAULT_^S"  class="form-control search-select" >
															<option value=""></option>
															<option value="Y">是</option>
															<option value="N">否</option>
														</select>
													</div>
												</div>
											</form>
										</div>
										<!--/ 查询条件-->
									</div>
									
								</div>
							</td>
						</tr>
						<tr width="100%">
							<td valign="top">
								<div class="jqGrid_wrapper">
									<table id="bpmDialogStatmentGrid" ></table>
									<div id="bpmDialogStatmentPager"></div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>