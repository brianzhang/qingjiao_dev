<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<f:link href="qtip/jquery.qtip.css"/>
		<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/qtip.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/jqueryui/jquery-ui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmTrigerFlow.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="" style="margin-top:1em;">
				<form  class="fr-form"  id="bpmTrigerFlowForm" action="save.htm" >
					<input type="hidden" name="m:bpmTrigerFlow:id"/>
					<input type="hidden" name="m:bpmTrigerFlow:defId" id="procDefId" value="${procDefId}"/>
					<input type="hidden" name="m:bpmTrigerFlow:nodeId" id="nodeId" value="${nodeId}"/>
					<input type="hidden" name="m:bpmTrigerFlow:trigerType"/>
					<input type="hidden" name="m:bpmTrigerFlow:callStartPage"/>
					
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">触发流程</label>
						  	<div class="fr-form-block">
								<div class="input-group">
									<input type="hidden" name="m:bpmTrigerFlow:trigerFlowKey" id="procDefKey"/> 
	                               	<input type="text" name="m:bpmTrigerFlow:trigerFlowName" class="form-control" id="procDefName" readonly="readonly"/>
	                           	  	<span class="input-group-btn">
	                           	  		<button type="button" class="btn  btn-info btn-mm"  
	                           	  			 id="flowSelector" data-single="true" data-key="#procDefKey" data-name="#procDefName" >
	                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
	                           	  		<button type="button" class="btn btn-info btn-mm" 
			                               	 id="flowClear" data-key="#procDefKey" data-name="#procDefName">
			                               	 <i class="fa fa-times"></i></button>
	                           	  	</span>
							 	</div>
						 	</div>
					  	</div>
					</div>
				 	<div class="fr_response_field col-sm-6" >
					 	<div class="fr-form-group"> 
						 	<label class="fr-control-label">触发动作</label>
						  	<div class="fr-form-block">
						  		<select class="fr-form-control" name="m:bpmTrigerFlow:action">
						  			<c:forEach items="${actionMap}" var="action">
									<option value="${action.key}">${action.value}</option>
									</c:forEach>
						  		</select>
						 	</div>
					  	</div>
					</div>
	  
				  	<ul>
						<li style="float:left;margin-right:1em;width:28em;">
							<div class="layout-header ">
								<h5>
								源数据信息
								<a href="javascript:void(0);" style="text-decoration: none;" class="fa fa-exclamation-circle" data-tip="position:{my:'top right',at:'bottom right'}" title="目前只支持主表数据配置。"></a>
								</h5>
				        	</div>
							<div class="panel-form">
								<div class="form-inline p-xxs">
									<div class="form-group" style="margin-top:1em;">
										<label>数据源：</label>
										<p></p>
									</div>
									<div class="form-group" style="margin-top:1em;">
										<a class="btn btn-primary fa fa-link srcRead" href="javascript:void(0);" ><span>加载</span></a>
									</div>
									<div class="form-group" style="margin-top:1em;">
										<p id="srcWarnMessage" style="color:red;"></p>
									</div>
								</div>
								
								<div id="srcAttr"></div>
							</div>
						</li>
						
						<li style="float:left;width:40em;">
							<div class="layout-header ">
								<h5>目标数据信息</h5>
				        	</div>
							<div class="panel-form">
								<div class="form-inline p-xxs">
									<div class="form-group" style="margin-top:1em;">
										<label class="search-label">数据源：</label>
										<p></p>
									</div>
									<div class="form-group" style="margin-top:1em;">
										<a class="btn btn-primary fa fa-link destRead" href="javascript:void(0);" ><span>加载</span></a>
									</div>
									<div class="form-group" style="margin-top:1em;">
										<p id="destWarnMessage" style="color:red;"></p>
									</div>
								</div>
								
								<div id="destAttr"></div>
							</div>
						</li>
					</ul>
					
					<script type="text/html" id="draggableTemplate">
					{{if fields != null && fields.length > 0}}
					{{each fields as field}}
					<div class="form-group draggable" style="border:1px solid #0099FF;" id="src_{{field.code}}">
						<label class="search-label" style="width:10em;">{{field.code}}</label>
						<label class="search-label">{{field.name}}</label>
					</div>
					{{/each}}
					{{/if}}
					</script>
					
					<script type="text/html" id="droppableTemplate">
					{{if fields != null && fields.length > 0}}					
					{{each fields as field}}
					<div class="form-group droppable" id="dest_{{field.code}}">
						<label class="search-label destAttr" style="width:10em;">{{field.code}}</label>
						<label class="search-label destAttrName">{{field.name}}</label>
						<label class="search-label mapping" style="border:1px solid #996633;width:20em;">
							<label class="search-label srcAttr" style="width:10em;">&nbsp;</label>
							<label class="search-label srcAttrName">&nbsp;</label>
						</label>
					</div>
					{{/each}}
					{{/if}}
					</script>
					
					<script type="text/html" id="initDroppableTemplate">
					{{if fields != null && fields.length > 0}}					
					{{each fields as field}}
					<div class="form-group droppable" id="dest_{{field.destAttr}}">
						<label class="search-label destAttr" style="width:10em;">{{field.destAttr}}</label>
						<label class="search-label destAttrName">{{field.destAttrName}}</label>
						<label class="search-label mapping" style="border:1px solid #996633;width:20em;">
							{{if field.srcAttr!=null && field.srcAttr!=""}}
								<label class="search-label srcAttr" style="width:10em;">{{field.srcAttr}}</label>
								<label class="search-label srcAttrName">{{field.srcAttrName}}</label>
								<label class="search-label fa fa-remove" style="width:1em;color:red;" onclick="bpmTrigerFlow._delDestAttr(this)"></label>
							{{else}}
								&nbsp;
							{{/if}}
						</label>
					</div>
					{{/each}}
					{{/if}}
					</script>
	  
					<%-- <table name="s:bpmTrigerParam" data-mode="inner" data-required="" class="hidden table table-bordered table-hover table-condensed">
						<caption>
							<div class="fr-table-header-label">触发参数</div>
							<div class="fr-table-tools">
								<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
								<a class="btn btn-danger fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
							</div>
						</caption>
						<thead>
							<tr>
					     		 <th class="fr_table_col_checkbox" width="45px"><input role="checkbox" class="checkAll" name="s:bpmTrigerParam" type="checkbox"></th>
				       			 <th>源属性</th>
				       			 <th>目标属性</th>
				       			 <th>允许为空</th>
					      	<th class="fr_table_col_remove" width="45px">管理</th>
					    </tr>
						</thead>
						<tbody>	
							<c:forEach varStatus="stat" var="bpmTrigerParam" items="${bpmTrigerFlow.bpmTrigerParamPoList}">	
								<tr>	
									<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmTrigerParam" ></td>
							 		<td>
										<input type="text" class="fr-form-control" name="s:bpmTrigerParam:srcAttr:${stat.index+1}" value="${bpmTrigerParam.srcAttr}" validate="{required:false}"/>
									</td>	
							 		<td>
										<input type="text" class="fr-form-control" name="s:bpmTrigerParam:destAttr:${stat.index+1}" value="${bpmTrigerParam.destAttr}" validate="{required:false}"/>
									</td>	
							 		<td>
										<input type="text" class="fr-form-control" name="s:bpmTrigerParam:allowEmpty:${stat.index+1}" value="${bpmTrigerParam.allowEmpty}" validate="{required:false}"/>
									</td>	
									<td class="fr_table_col_remove" width="45px">
										<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
		
					<script type="text/html" id="s:bpmTrigerParam:TrTemplate">
						<tr>
						  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:bpmTrigerParam" ></td>
					 	 	 <td>
								<input type="text" class="fr-form-control" name="s:bpmTrigerParam:srcAttr:{{idx}}"  validate="{required:false}"/>
							</td>
					 	 	 <td>
								<input type="text" class="fr-form-control" name="s:bpmTrigerParam:destAttr:{{idx}}"  validate="{required:false}"/>
							</td>
					 	 	 <td>
								<input type="text" class="fr-form-control" name="s:bpmTrigerParam:allowEmpty:{{idx}}"  validate="{required:false}"/>
							</td>
						  	<td class="fr_table_col_remove" width="45px">
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
							</td>
						</tr>
					</script> --%>
				</form>
			</div>
		</div>
	</body>
</html>
