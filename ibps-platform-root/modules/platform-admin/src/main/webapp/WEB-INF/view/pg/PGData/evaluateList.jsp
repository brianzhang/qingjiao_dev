
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/PGData/evaluate.js"></script>
		<title>t_p_khhlxpj管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/pg/PGData/evaluate/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/pg/PGData/evaluate/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/pg/PGData/evaluate/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">课程ID</label>:
									<input type="text"  name="Q^CRS_ID^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">教师</label>:
									<input type="text"  name="Q^TEACHER^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">形式</label>:
									<input type="text"  name="Q^FORMS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">比例1</label>:
									<input type="text"  name="Q^PROPORTION1^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">比例2</label>:
									<input type="text"  name="Q^PROPORTION2^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">比例3</label>:
									<input type="text"  name="Q^PROPORTION3^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">合理性判定</label>:
									<input type="text"  name="Q^DECIDE^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">其他</label>:
									<input type="text"  name="Q^OTHER^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">判定结果</label>:
									<input type="text"  name="Q^RESULT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">弱项</label>:
									<input type="text"  name="Q^WS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">负责人</label>:
									<input type="text"  name="Q^PRINCIPLE^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="evaluateGrid" ></table>
				<div id="evaluatePager"></div>
			</div>
		</div>
	
	</body>
	
</html>
