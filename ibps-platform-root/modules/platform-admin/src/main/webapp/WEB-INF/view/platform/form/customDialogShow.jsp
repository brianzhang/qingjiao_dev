<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/list.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/cusersDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
<c:if test="${customDialog.style==1}">
		<%@include file="/commons/page/tree.jsp" %>
</c:if>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/customDialog.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/utils/CustomDialogUtil.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/customDialogShow.js"></script>
<title>显示通用对话框</title>
</head>
<body>
<div  class="wrapper wrapper-content"> 
	
		<c:choose>
		<c:when test="${customDialog.style==1}">
		   
			<div class="tree-toolbar" >
					<a class="btn btn-primary fa fa-refresh" title="刷新"></a> 
					<a class="btn btn-primary fa fa-expand" title="展开"></a> 
					<a class="btn btn-primary fa fa-compress" title="收缩"></a>
				</div>
			<div id="dialogTree" class="ztree"></div>

		</c:when>
		<c:otherwise>
<!-- -------------------------------------------------- 列表展示------------------------------------ -->
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" 	href="javascript:void(0);"><span>搜索</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<a href="javascript:void(0);" class="collapse"> <i class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form"  id="searchForm">
					</form>
				</div>
			</div>
		</div>
		<div class="jqGrid_wrapper">
			<table id="customDialogShowGrid" ></table>
			<div id="customDialogShowPager"></div>
		</div>
		<script type="text/html"  id='conditionTem'>
			<div class="form-inline p-xxs">
		 		{{each list as item i}}
					{{if item.paraCt=='1'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							<input type="text" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control" />
						</div>
					{{else if item.paraCt=='2'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							<select id = "selector-type" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control search-select" value="">
										<option value="">全部</option>
										{{each item.select as val}}
											<option value="{{val.key}}">{{val.value}}</option>
										{{/each}}
								</select>
						</div>
					{{else if item.param=='posSelector'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							 <input type="text" id="groupName" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control"> 
                             <button type="button" class="btn btn-primary fa" onclick="customDialogShow._getPos(this)">选择</button> 
                             <input name="group"  id="group" type="hidden" >
                            <input name="groupId"  id="groupId" type="hidden" >
						</div>
					{{else if item.param=='roleSelector'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							 <input type="text" id="groupName" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control"> 
                             <button type="button" class="btn btn-primary fa" onclick="customDialogShow._getRole(this)">选择</button> 
                            <input name="group"  id="group" type="hidden" >
                            <input name="groupId"  id="groupId" type="hidden" >
						</div>
					{{else if item.param=='orgSelector'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							 <input type="text" id="groupName" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control"> 
                             <button type="button" class="btn btn-primary fa" onclick="customDialogShow._getGroup(this)">选择</button> 
                            <input name="group"  id="group" type="hidden" >
                            <input name="groupId"  id="groupId" type="hidden" >
						</div>
					{{else if item.param=='userSelector'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							 <input type="text" id="fullName" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control"> 
                             <button type="button" class="btn btn-primary fa" onclick="customDialogShow._getUsers(this)">选择</button> 
                            <input name="account"  id="account" type="hidden" >
                            <input name="userId"  id="userId" type="hidden" >
						</div>
					{{else if item.paraCt=='4'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							 <input type="text" id="fullName" name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}" class="form-control" param="{{item.param}}"> 
                             <button type="button" class="btn btn-primary fa" onclick="customDialogShow._getDialog('{{item.dialog}}',this)">选择</button> 
						</div>
					{{/if}}
				{{/each}}
			</div>
		</script>
	</c:otherwise>
	</c:choose>	
</div>

</body>
</html>


