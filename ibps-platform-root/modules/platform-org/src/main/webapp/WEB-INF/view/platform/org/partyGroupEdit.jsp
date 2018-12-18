<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/org/partyGroup.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="partyGroupForm" action="save.htm" >
					<input type="hidden" name="m:partyGroup:id"  value="${partyGroup.id}"/>
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">组名称</label>
						  	<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:partyGroup:name" data-pinyin="#groupAlias" value="${partyGroup.name}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">组别名</label>
						  	<div class="fr-form-block">
								<input type="text" class="fr-form-control" id="groupAlias" name="m:partyGroup:groupAlias" value="${partyGroup.groupAlias}" validate="{required:true}"/>
						 	</div>
					  	</div>
					</div>
					<div class="fr_response_field col-sm-12" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">组描述</label>
						  	<div class="fr-form-block">
								<textarea class="fr-form-control fr-control-textarea"  name="m:partyGroup:groupNote"  validate="{required:false}">${partyGroup.groupNote}</textarea>
						 	</div>
					  	</div>
					</div>
					
					<table name="s:partyUserGroup" data-mode="dialog" data-required="false" class="table table-bordered table-hover table-condensed">
						<caption>
							<div class="fr-table-header-label">组成员</div>
							<div class="fr-table-tools">
								<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
								<a class="btn btn-primary fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
							</div>
						</caption>
						<thead>
							<tr>
					     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:partyUserGroup" type="checkbox"></th>
				       			 <th>成员名</th>
					      	<th class="fr_table_col_remove" width="45px">管理</th>
					    </tr>
						</thead>
						<tbody>
							<c:forEach var="partyUserGroup" items="${partyGroup.partyUserGroupPoList}">
								<tr>
									<td><input role="checkbox" class="cbox " type="checkbox" name="s:partyUserGroup" ></td>
							 		<td>
										<input type="hidden" name="s:partyUserGroup:id" value="${partyUserGroup.id}"/>
										<input type="hidden" name="s:partyUserGroup:userId" value="${partyUserGroup.userId}"/>
										<input type="hidden" name="s:partyUserGroup:groupId" value="${partyUserGroup.groupId}"/>
										<span>${partyUserGroup.userName}</span>
									</td>
									<td class="fr_table_col_remove" width="45px">
										<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);">
											<i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i>
										</a>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
							
					<script type="text/html" id="s:partyUserGroup:TrTemplate">
					<tr>
		  				<td><input role="checkbox" class="cbox " type="checkbox" name="s:partyUserGroup" ></td>
	 	 	 			<td>
							<input type="hidden" name="s:partyUserGroup:id" value="{{id}}"/>
							<input type="hidden" name="s:partyUserGroup:userId" value="{{userId}}"/>
							<input type="hidden" name="s:partyUserGroup:groupId" value="{{groupId}}"/>
							<span>{{userName}}</span>
						</td>
		  				<td class="fr_table_col_remove" width="45px">
							<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
					</script>
				</form>
			</div>
		</div>
	</body>
</html>
