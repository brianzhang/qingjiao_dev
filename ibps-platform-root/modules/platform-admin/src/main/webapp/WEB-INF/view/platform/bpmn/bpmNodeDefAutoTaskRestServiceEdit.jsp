<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html ng-app="systemApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/bpmNodeDef/restServiceSetEdit.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<style>
			.param-div{
				border:1px dashed #fff;
				margin-bottom:5px;
				padding:5px;
			}
			.param-span{
				float:right;
				display:none;
				cursor:pointer;
				margin-right:10px;
			}
			.param-span:hover{
				color:red;
			}
			.param-div:hover{
				border-color:#3E68B2;
			}
			.param-div:hover span{
				display:inline-block;
			}
		</style>

	</head>
	<body>
	
		<textarea rows="0" cols="0" id="bpmPluginDefJson" style="display: none;">${bpmPluginDefJson}</textarea>
		<input id="returnUrl" type="hidden" value="${returnUrl}"/>
		<input id="serviceSetId" type="hidden" value="${serviceSetId}"/>
		<input id="defId" type="hidden" value="${defId}"/>
		<input id="nodeId" type="hidden" value="${nodeId}"/>
		
		<div class="wrapper wrapper-content  animated  col-sm-12">
				
			<div class="panel-form">
				<div class="form-horizontal">
				<div class="form-group">
                     <label class="col-sm-10 control-label">
						<input type="text" id="url" autocomplete="off" placeholder="输入服务地址" class="form-control">
					 </label>
                     <div class="col-sm-2">
				    	<a class="btn btn-sm btn-primary fa fa-search" href="javascript:void(0);" onclick="restServiceSet.parse()">解析</a>
                     </div>
				</div>
				
				<script type="text/html" id="serviceSetTemplate">
				{{if serviceSet!=null}}
				<div class="form-group serviceSet">
					 <table style="width:98%;margin:5px;">
					 	<tr>
							<td width="100">别名</td>
							<td colspan="3">{{serviceSet.methodName}}</td>
						</tr>
						<tr>
							<td>服务地址</td>
							<td colspan="3">{{serviceSet.url}}</td>
						</tr>
						<tr>
							<td rowspan="{{serviceSet.paramsSize}}">输入参数</td>
						</tr>
						
						{{each serviceSet.input as p}}
						{{if p!=null}}
						<tr>
						<td colspan="3">
							<div class="form-horizontal" >
								<div class="form-group">
									<label class="col-sm-2 control-label">参数名称</label>
									<div class="col-sm-2">
										<p class="form-control-static">{{p.name}}</p>
									</div>
									<label class="col-sm-2 control-label">参数类型</label>
									<div class="col-sm-2">
										<p class="form-control-static">{{p.type}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">绑定类型</label>
									<div class="col-sm-4">
										<select class="form-control" onchange="restServiceSet.bindingType(value,this)">
											<option value="0">请选择</option>
											<option value="1" <c:if test="{{p.valtype==1}}">selected="selected"</c:if>>固定值</option>
											<option value="2" <c:if test="{{p.valtype==2}}">selected="selected"</c:if>>流程变量</option>
											<option value="4" <c:if test="{{p.valtype==3}}">selected="selected"</c:if>>表单变量</option>
											<option value="3" <c:if test="{{p.valtype==4}}">selected="selected"</c:if>>脚本</option>
										</select>
									</div>
								</div>
								
								<div class="form-group bindingType fixedVal" {{if p.valtype!=1}}style="display:none"{{/if}}>
									<label class="col-sm-2 control-label">固定值</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" value="{{p.value}}" />
									</div>
								</div>
								
								<div class="form-group bindingType paramVal" {{if p.valtype!=2}}style="display:none"{{/if}}>
									<label class="col-sm-2 control-label">参数</label>
									<div class="col-sm-5">
										<select class="form-control">
											{{each params as param}}
												{{if param.fromType=='bpmConstants'}}
												<optgroup label="流程常量">
													<option value="{{param.name}}" {{if param.name==p.value}}selected="selected"{{/if}} >{{param.desc}}</option>
												</optgroup>
												{{/if}}
												{{if param.fromType=='var'}}
												<optgroup label="流程变量">
													<option value="{{param.name}}" {{if param.name==p.value}}selected="selected"{{/if}} >{{param.desc}}</option>
												</optgroup>
												{{/if}}
											{{/each}}
										</select> 
									</div>
								</div>
								
								<div class="form-group bindingType scriptVal" {{if p.valtype!=3}}style="display:none"{{/if}}>
									<label class="col-sm-2 control-label">脚本</label>
									<div class="col-sm-5">
										<textarea class="form-control" row="3">{{p.value}}</textarea>
									</div>
								</div>

								<div class="form-group bindingType formVal" {{if p.valtype!=4}}style="display:none"{{/if}}>
									<label class="col-sm-2 control-label">表单变量</label>
									<div class="col-sm-5">
										<select class="form-control"> 
											{{each boAttr as boa}}
											<option value="{{boa.name}}">{{boa.description}}</option>
											{{/each}}
										</select>
									</div>
								</div>

							</div>
						</td>
						</tr>
						{{/if}}
						{{/each}}
						
					</table>
				</div>
				{{/if}}
				</script>
				</div>
			</div>

		</div>
	</body>
</html>