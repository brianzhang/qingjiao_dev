
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/patrolp/schoolboy/schoolBoy.js"></script>
		<title>t_schoolboy管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/patrolp/schoolboy/schoolBoy/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/patrolp/schoolboy/schoolBoy/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/patrolp/schoolboy/schoolBoy/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">姓名</label>:
									<input type="text"  name="Q^XING_MING_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">入学时间 </label>:
									<input type="text" name="Q^RU_XUE_SHI_JIAN_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^RU_XUE_SHI_JIAN_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label class="search-label">毕业时间 </label>:
									<input type="text" name="Q^BI_YE_SHI_JIAN_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^BI_YE_SHI_JIAN_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">班级职务</label>:
									<input type="text"  name="Q^BAN_JI_ZHI_WU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">班主任</label>:
									<input type="text"  name="Q^BAN_ZHU_REN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">高中</label>:
									<input type="text"  name="Q^GAO_ZHONG_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">大学</label>:
									<input type="text"  name="Q^DA_XUE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工作单位</label>:
									<input type="text"  name="Q^GONG_ZUO_DAN_WEI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">个人在校照片</label>:
									<input type="text"  name="Q^GE_REN_ZAI_XIAO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">近照</label>:
									<input type="text"  name="Q^JIN_ZHAO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">毕业照</label>:
									<input type="text"  name="Q^BI_YE_ZHAO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">个人荣誉</label>:
									<input type="text"  name="Q^GE_REN_RONG_YU_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="schoolBoyGrid" ></table>
				<div id="schoolBoyPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
