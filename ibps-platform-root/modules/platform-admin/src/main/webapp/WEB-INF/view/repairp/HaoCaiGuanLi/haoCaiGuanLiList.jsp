
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/HaoCaiGuanLi/haoCaiGuanLi.js"></script>
		<title>t_hcglb管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/repairp/HaoCaiGuanLi/haoCaiGuanLi/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/repairp/HaoCaiGuanLi/haoCaiGuanLi/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/repairp/HaoCaiGuanLi/haoCaiGuanLi/remove.htm"><span>删除</span></a>
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
<%-- 										<c:forEach items="${yiJiDiLeiData}" var="list3">
											<li><img alt=""
												src="${ctx}/styles/commons/images/linyeziyuan/foldericon.png"><a
												style="font-size: 18px; font-weight: bold;" href="#"
												value="${list3.diLeiMingChen}">${list3.diLeiMingChen}</a>
												<ul id="test1">
													<c:forEach items="${erJiDiLeiData}" var="list4">
														<c:if
															test="${list3.erJiDiLeiBianHao == list4.erJiDiLei1BianHao}">

															<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img alt=""
																src="${ctx}/styles/commons/images/linyeziyuan/minusbottom.gif"><a
																style="font-size: 15px; font-weight: bold;"
																value="${list4.erJiDeLeiMingChen}" href="#">&nbsp;&nbsp;&nbsp;${list4.erJiDeLeiMingChen}</a></li>

														</c:if>
													</c:forEach>
												</ul></li>
										</c:forEach> --%>
										<div class="form-group">
									         <label   class="search-label">材料分类&nbsp;</label>
									         <a id="allData" href="javascript:void(0);" role="button" class="btn btn-primary fa fa-search" >所有分类</a>
								         </div> 
								         
								 		<c:forEach items="${haoCaiZLData}" var="list">
								 		  &nbsp;&nbsp;&nbsp;
								 		<div class="form-group">
										<a id="${list.zhongLeiBianHao}" href="javascript:void(0);" role="button" class="btn btn-primary fa fa-search">${list.haoCaiMingCheng}</a></div>
										</c:forEach><br>
			<!-- 					<div class="form-group">
									<label   class="search-label">耗材图片</label>:
									<input type="text"  name="Q^HAO_CAI_TU_PIAN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">耗材编号</label>:
									<input type="text"  name="Q^HAO_CAI_BIAN_HAO_^SL"  class="form-control"  />
								</div>  -->
								<div class="form-group">
									<label   class="search-label">耗材名称:</label>
									<input type="text"  name="Q^MING_CHENG_^SL"  class="form-control"  />
								</div> 
								<!-- <div class="form-group">
									<label   class="search-label">单价</label>:
									<input type="text"  name="Q^DAN_JIA_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单位</label>:
									<input type="text"  name="Q^CHAN_WEI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">种类编号</label>:
									<input type="text"  name="Q^ZHONG_LEI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div> -->
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="haoCaiGuanLiGrid" ></table>
				<div id="haoCaiGuanLiPager"></div>
			</div>
		</div>
	<script type="text/javascript">


    </script>
		<input type="hidden" id="v_id" value="${v_id}">
	</body>
	
</html>
