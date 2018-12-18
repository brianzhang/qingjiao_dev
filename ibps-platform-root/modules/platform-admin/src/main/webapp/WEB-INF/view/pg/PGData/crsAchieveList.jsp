
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx }/js/lc/platform/form/onlineForm.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/crsAchieve.js"></script>
		<title>t_p_kcdcdhlxpj管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/pg/PGData/crsAchieve/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/pg/PGData/crsAchieve/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/pg/PGData/crsAchieve/remove.htm"><span>删除</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">合理</label>:
									<input type="text"  name="Q^RESULT1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">负责人</label>:
									<input type="text"  name="Q^PRINCIPLE1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">规范性</label>:
									<input type="text"  name="Q^NORMATIVE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">完整性</label>:
									<input type="text"  name="Q^INTEGRITY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">试卷分析</label>:
									<input type="text"  name="Q^ANALYZE1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">课程分析</label>:
									<input type="text"  name="Q^ANALYZE2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">备注</label>:
									<input type="text"  name="Q^REMARK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">管理人员</label>:
									<input type="text"  name="Q^MANAGER^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">判定结果</label>:
									<input type="text"  name="Q^RESULT2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">整改意见</label>:
									<input type="text"  name="Q^OPINION^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">负责人</label>:
									<input type="text"  name="Q^PRINCIPLE2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">覆盖</label>:
									<input type="text"  name="Q^COVER^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="crsAchieveGrid" ></table>
				<div id="crsAchievePager"></div>
			</div>
		</div>
	
	</body>
	
</html>
