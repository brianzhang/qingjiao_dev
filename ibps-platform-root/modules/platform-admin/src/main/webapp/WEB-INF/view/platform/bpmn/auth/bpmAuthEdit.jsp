<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmAuth.js"></script>
		<script type="text/html"  id='rightsOwnerTem'>
		{{if list.length <= 0}}
 			<tr>
				<td colspan="2"> 
					没有授权的人员
				</td>
			</tr>
		{{else}}
		    {{each list as item i}}
					{{if item.type=='all'}}
				<tr>
 					<td>{{item.label}}</td>
					<td>允许所有人访问</td>
				</tr>
				{{else}}
				<tr>
 					<td>{{item.label}}</td>
					<td>{{#item.rightsName | ower}}</td>
				</tr>
				{{/if}}
			{{/each}}
		{{/if}}
		</script>
		
		<script type="text/html"  id='rightsDefTem'>
		{{if list.length <= 0}}
		 		<tr>
					<td colspan="3"> 
							没有授权的流程
					</td>
				</tr>
		{{else}}
		    {{each list as item i}}
				<tr>
					<td >
					    <input type="checkbox" class="myDefKey" name="defKey"  value="{{item.defKey}}" defName="{{item.defName}}" >
					</td>
 					<td>{{item.defName}}</td>
					<td>
						<div name="m_right_div" >
						    定义(
							     <input type="checkbox" class="m_edit " name="m_right"      {{if (item.rights.m_edit=='Y')}}   checked="checked" {{/if}}  value="m_edit" >设计
						         <input type="checkbox" class="m_del"  name="m_right"       {{if (item.rights.m_del=='Y')}}    checked="checked"  {{/if}}  value="m_del" >删除
								<input type="checkbox" class="m_start"  name="m_right"     {{if (item.rights.m_start=='Y')}}  checked="checked"  {{/if}}  value="m_start" >启动  
							     <input type="checkbox" class="m_set" name="m_right"   	  {{if (item.rights.m_set=='Y')}}    checked="checked"   {{/if}} value="m_set" >设置
							     <input type="checkbox" class="m_clean" name="m_right"    {{if (item.rights.m_clean=='Y')}} checked="checked"   {{/if}} value="m_clean" >清除数据
 								)
					     </div>
     					<div name="i_right_div">
							实例(
							     <input type="checkbox" class="i_del" name="i_right"  {{if (item.rights.i_del=='Y')}} checked="checked"  {{/if}}  value="i_del" >删除
						     )
						</div>
					</td>
				</tr>
			{{/each}}
		{{/if}}
		</script>
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
			<textarea id="rightsTypes" style="display: none;" >${fn:escapeXml(rightsTypes)}</textarea>
			<div class="panel-form">
	   		<form class="form-horizontal" id="bpmAuthForm"  action="save.htm"   method="post"  >
	   				<input type="hidden" id="id"  name="id" value="${bpmAuth.id}"/>
      				<div class="form-group">
                         <label class="col-sm-2 control-label">授权名称<span class="required">*</span>:</label>
                         <div class="col-sm-10">
                             <input type="text" class="form-control"  id="name" name="name" value="${bpmAuth.name}"  validate="{required:true,maxlength:192}">
                         </div>
                     </div>
                     <div class="form-group">
                         <label class="col-sm-2 control-label">权限类型:</label>
                         <div class="col-sm-10">
                   				<label class="checkbox-inline">
                                 	 	<input type="checkbox" class="ibps" value="start" name="type"   <c:if test="${fn:contains(bpmAuth.type,'start')}" >checked="checked"</c:if> />
                                 	 	<span class="lbl">启动</span>
                                  </label>
                                  <label class="checkbox-inline">
 										<input type="checkbox" class="ibps" value="manage" name="type"   <c:if test="${fn:contains(bpmAuth.type,'manage')}" >checked="checked"</c:if> />
                                 	 	<span class="lbl">定义</span>                                     
									</label>
									<label class="checkbox-inline">
                                 	 	<input type="checkbox" class="ibps" value="task" name="type"   <c:if test="${fn:contains(bpmAuth.type,'task')}" >checked="checked"</c:if> />
                                 	 	<span class="lbl">任务</span>
                                  </label>
                                  <label class="checkbox-inline">
 										<input type="checkbox" class="ibps" value="instance" name="type"   <c:if test="${fn:contains(bpmAuth.type,'instance')}" >checked="checked"</c:if> />
                                 	 	<span class="lbl">实例</span>                                     
									</label>
                           </div>
                     </div>
                     <div class="form-group">
                         <label class="col-sm-2 control-label">授权人员:</label>
                         <div class="col-sm-10">
                         	<textarea style="display: none;" id="rightsOwner" name="rightsOwner">${fn:escapeXml(bpmAuth.rightsOwner)}</textarea>
                         	 <table class="table table-bordered  table-striped"  >  
								    <thead>
								    	<tr>
								    		<td colspan="2">
                                				<a href="javascript:void(0);" class="btn btn-info fa fa-add"  id="addOwner"><span>设置</span></a>
                                				<a href="javascript:void(0);" class="btn btn-danger fa fa-remove"  id="resetOwner"><span>重置</span></a>
								    		</td>
								    	</tr>
								    	<tr>
								    		<th  width="35%">权限分类</th>
								    		<th width="65%">授权给</th>
								    	</tr>
								    </thead>
								 	<tbody id="rightsOwnerItem">
								 	</tbody>
							   	</table>
                         </div>
                     </div>
                     <div class="form-group">
                         <label class="col-sm-2 control-label">授权流程</label>
                         <div class="col-sm-10">
                       		  <textarea style="display: none;" id="rightsDef" name="rightsDef">${fn:escapeXml(bpmAuth.rightsDef)}</textarea>
                         	 <table class="table  table-bordered  table-striped" >  
								    <thead>
								    	<tr>
								    		<td colspan="3">
                                				<a href="javascript:void(0);" class="btn btn-info fa fa-add"  id="addFlow"><span>新增</span></a>
                                				<a href="javascript:void(0);" class="btn btn-primary fa fa-delete"  id="delFlow"><span>删除</span></a>
                                				<a href="javascript:void(0);" class="btn btn-danger fa fa-remove"  id="resetFlow"><span>重置</span></a>
								    		</td>
								    	</tr>
								    	<tr>
								    		<td>
								    			快捷设置
								    		</td>
								    		<td colspan="2">
										<div id="am_right_div">
									     	 &nbsp;&nbsp;定义:
									     	 (
										     	<label class="checkbox-inline" style=" padding-top: 0px; "> <input class="ibps"  type="checkbox" id="m_rightEdit" name="rightsDefSet"   value="m_edit" ><span class="lbl">设计</span></label>
											    <label class="checkbox-inline" style=" padding-top: 0px; "> <input class="ibps"  type="checkbox" id="m_rightDel" name="rightsDefSet"    value="m_del" ><span class="lbl">删除</span></label>
											     <label class="checkbox-inline" style=" padding-top: 0px; "><input class="ibps"  type="checkbox" id="m_rightStart" name="rightsDefSet"  value="m_start" ><span class="lbl">启动 </span></label>
											     <label class="checkbox-inline" style=" padding-top: 0px; "><input class="ibps"  type="checkbox" id="m_rightSet"  name="rightsDefSet"  value="m_set" ><span class="lbl">设置</span></label>
											     <label class="checkbox-inline" style=" padding-top: 0px; "><input class="ibps"  type="checkbox" id="m_rightClean"  name="rightsDefSet" value="m_clean" ><span class="lbl">清除数据</span></label>
										     )
									     </div>
									     <div id="ai_right_div">
										     &nbsp;&nbsp;实例:
										     (
										    	<label class="checkbox-inline" style=" padding-top: 0px; "> <input class="ibps"  type="checkbox" id="i_rightDela" name="rightsDefSet"    value="i_del" ><span class="lbl">删除</span></label>
										     )
									     </div>
								    		</td>
								    	</tr>
								    	<tr>
								    	 	<th  width="5%"><input type="checkbox" id="all_key" /></th>
								    		<th  width="30%">流程名称</th>
								    		<th width="65%">授权给</th>
								    	</tr>
								    </thead>
								 	<tbody id="rightsDefItem">
								 	</tbody>
							   	</table>
                         </div>
                     </div>
	        	</form>
		   </div>
		</div>
	</body>
</html>