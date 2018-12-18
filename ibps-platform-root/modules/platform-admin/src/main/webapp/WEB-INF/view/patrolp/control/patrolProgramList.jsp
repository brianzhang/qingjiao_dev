
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<title>巡课方案管理列表</title>
		<script type="text/javascript">
		 	function searchCourse(){
		 		//alert("searchCourse");
				//debugger;
				var course = $("#course").val();
				//alert("course"+course);
				patrolProgram.newInstance(1,course)
				 
			} 
		</script>
		
	</head>
	<body>
		<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					巡课节数选择
				</h4>
			</div>
			<div class="modal-body">
				<select name="course" id="course">
					《<option value="1">第1节</option>
					《<option value="2">第2节</option>
					《<option value="3">第3节</option>
					《<option value="4">第4节</option>
					《<option value="5">第5节</option>
					《<option value="6">第6节</option>
					《<option value="7">第7节</option>
					《<option value="8">第8节</option>
				</select>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="button" class="btn btn-primary" onclick="searchCourse()">
					确定
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>		
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search hidden" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-plus-square"   href="javascript:patrolProgram.newInstance()" ><span>&nbsp;开始/继续巡课</span></a>
					        <a class="btn btn-primary fa fa-start" onclick="test()"   href="javascript:void(0);"  action="${ctx}/patrolp/control/patrolProgram/edit.htm" ><span>在线表单测试</span></a>	 
					        <a class="btn btn-primary fa fa-remove hidden" href="javascript:void(0);"  action="${ctx}/patrolp/control/patrolProgram/remove.htm"><span>删除</span></a>
					         <a class="btn btn-primary fa fa-plus-square"  data-toggle="modal" data-target="#myModal"><span>巡课</span></a>
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
									<label   class="search-label">名称</label>:
									<input type="text"  name="Q^PG_NAME_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">执行人</label>:
									<input type="text"  name="Q^PATROLLER_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">巡课时间</label>:
									<input type="text"  name="Q^START_TIME_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="patrolProgramGrid" ></table>
				<div id="patrolProgramPager"></div>
			</div>
		</div>
		<!-- 信息框模板 -->
		<div id="text-modal">
						
		</div>
	</body>
<script type="text/javascript" src="${ctx}/js/lc/platform/utils/ExUtil.js"></script>

<script type="text/javascript" src="${ctx}/js/lc/patrolp/control/patrolProgram.js"></script>
<script type="text/javascript" src="${ctx }/js/lc/platform/form/onlineForm.js"></script>
<script type="text/javascript">
	function test(){
		OnlineForm.open( 'patrol_program_384881235308052480' , mySave );
		function mySave(data){
			console.log(data);
		}
	}
</script>
</html>
