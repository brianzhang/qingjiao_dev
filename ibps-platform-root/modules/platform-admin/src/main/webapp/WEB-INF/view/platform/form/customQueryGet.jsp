<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/list.jsp"%>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/UserDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/GroupDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/customquery/CustomQueryUtil.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/CustomDialogUtil.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/form/customDialogShow.js"></script>
	</head>
	<body>
	<div  class="wrapper wrapper-content"> 
	<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" 	href="javascript:void(0);"><span>搜索</span></a>
						<input id="id" 	type="hidden"/>
						<a class="btn btn-primary fa fa-help"  	href="javascript:void(0);"><span>帮助</span></a>
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
		<div id="customQuery"></div>
		<div class="jqGrid_wrapper" style="display:none">
			<table id="customQueryGrid" style="display:none"></table>
			<div id="customQueryPager" style="display:none"></div>
		</div>
		<div class="panel-form col-sm-12" id="help" >
				<div class="form-horizontal "  >
					<label class="col-sm-2 control-label">POST参数:</label>
						<div class="col-sm-10">
							<p class="form-control-static">请求地址：/platform/form/customQuery/doQuery.htm<br/>
						JSON格式的查询条件：var postData = '{"Q^USERID^SL":"",""Q^FULLNAME^SL":"",""Q^ACCOUNT^SL":"",""Q^CREATETIME^SL":""}',<br/>
						最终参数：params = {id:"id",page:1,rows:20,postData:postData};
						</div>
						<label class="col-sm-2 control-label">调用的方法:</label>
						<div class="col-sm-10">
							<p class="form-control-static">返回是一个JSON格式的PageJson(可查看PageJson类);PageJson.rows是返回的查询数据；PageJson.record查询的结果条数,PageJson.total查询结果总页数,PageJson.page查询结果第几页</p>
						</div>
						<label class="col-sm-2 control-label">其他说明:</label>
						<div class="col-sm-10">
							<p class="form-control-static">提供的调用方法，如果您不想使用这个方法，可以自己按照POST参数自己构建请求发送到指定url则可得到回调方法所说的对象<br/>
							注意！！！如果参数是日期的between条件，需要传入两个参数，暂时定了格式：“startDate|endDate”，eg:{"date":"2000-1-1|2011-1-1"}这样的方式来传值;</p>
						</div>
						
					</div>
				</div>
		<script type="text/html"  id='conditionTem'>
			<div class="form-inline p-xxs">
		 		{{each list as item i}}
					{{if item.paraCt=='1'}}
						<div class="form-group">
							<label class="search-label">{{item.comment}}</label>: 
							<input type="text"name="Q^{{item.fieldName}}^{{if item.condition=='='}}S{{else if item.condition=='like'}}SL{{else if item.condition=='>='}}DL
							{{else if item.condition=='<='}}DG{{/if}}"name="Q^{{item.fieldName}}^SL" class="form-control" />
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
		</div> 
	</body>
</html>