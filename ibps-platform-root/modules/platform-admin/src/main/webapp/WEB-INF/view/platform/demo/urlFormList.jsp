
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/demo/urlForm.js"></script>
		<title>url表单例子管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
					        <a class="btn btn-primary fa fa-caret-square-o-right" href="javascript:void(0);"><span>启动</span></a>	 
							<a class="btn btn-primary fa fa-add"   href="${ctx}/platform/demo/urlForm/edit.htm" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/platform/demo/urlForm/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/demo/urlForm/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">文本框</label>:
									<input type="text"  name="Q^TEXT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">文本域</label>:
									<input type="text"  name="Q^TEXTAREA_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">数字</label>:
									<input type="text"  name="Q^NUMBER_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">隐藏域</label>:
									<input type="text"  name="Q^HIDE_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">日期 </label>:
									<input type="text" name="Q^TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">富文本</label>:
									<input type="text"  name="Q^EDITOR_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">单选</label>:
									<input type="text"  name="Q^RADIO_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">多选</label>:
									<input type="text"  name="Q^CHECK_BOX_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">下拉</label>:
									<input type="text"  name="Q^SELECT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">数据字典</label>:
									<input type="text"  name="Q^DIC_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">自动编号</label>:
									<input type="text"  name="Q^AUTO_NUM_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">附件</label>:
									<input type="text"  name="Q^ATT_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">选择器</label>:
									<input type="text"  name="Q^SELECTOR_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">自定义对话框</label>:
									<input type="text"  name="Q^CUSTOM_DIALOG_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">地址</label>:
									<input type="text"  name="Q^ADD_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="urlFormGrid" ></table>
				<div id="urlFormPager"></div>
			</div>
		</div>
	
	</body>
	
</html>
