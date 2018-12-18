
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/basicRequirements.js"></script>
		<title>t_p_jbyqb管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/pg/PGData/basicRequirements/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/pg/PGData/basicRequirements/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/pg/PGData/basicRequirements/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">难度1</label>:
									<input type="text"  name="Q^DIFFICULTY1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">分值1</label>:
									<input type="text"  name="Q^SCORE1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">难度2</label>:
									<input type="text"  name="Q^DIFFICULTY2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">分值2</label>:
									<input type="text"  name="Q^SCORE2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">测试</label>:
									<input type="text"  name="Q^TEST^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">分值3</label>:
									<input type="text"  name="Q^SCORE3^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">考勤</label>:
									<input type="text"  name="Q^ATTENDANCE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">预习</label>:
									<input type="text"  name="Q^PREPARE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">操作</label>:
									<input type="text"  name="Q^OPERATE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">实验报告</label>:
									<input type="text"  name="Q^REPORT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">分值4</label>:
									<input type="text"  name="Q^SCORE4^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">PPT</label>:
									<input type="text"  name="Q^PPT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">文件</label>:
									<input type="text"  name="Q^DOCUMENT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">答辩</label>:
									<input type="text"  name="Q^PRESENTATION^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">分值5</label>:
									<input type="text"  name="Q^SCORE5^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="basicRequirementsGrid" ></table>
				<div id="basicRequirementsPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
