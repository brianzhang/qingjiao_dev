<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<%@include file="/commons/page/layout.jsp"%>
<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/nicescroll/nicescroll.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/form/customQuerySetting.js"></script>
</head>
<body id="customQuerySetting">
	<div class="ui-layout-west">
		<div class="layout-header ">
			<h5>字段列表</h5>
		</div>
		<div class="niceScroll">
		<table class="table  table-bordered  table-striped " id="tableColumn"
			cellpadding="1" cellspacing="1">
			<tr>
				<th></th>
				<th>字段</th>
				<th>注释</th>
			</tr>
			<c:forEach var="col" items="${tableModel.columnList }"
				varStatus="status">
				<tr>
					<td><c:choose>
							<c:when test="${style==0 }">
								<input type="checkbox" name="fieldName" class="pk"
									value="${col.name }" dbType="${col.columnType }">
							</c:when>
							<c:otherwise>
								<input type="checkbox" name="fieldName" class="pk"
									value="${col.name }" id="${col.name }"
									dbType="${col.columnType }">
							</c:otherwise>
						</c:choose></td>
					<td nowrap="nowrap">${col.name }</td>
					<td><input type="text" name="comment" class="form-control"
						value="${col.comment }"></td>
				</tr>
			</c:forEach>
		</table>
		</div>
	</div>
	<div class="ui-layout-center">
		<div style="padding-top: 200px;">
			<a href="javascript:void(0);" id="addColumns"
				class="btn btn-info  fa fa-arrow-right"></a>
		</div>
	</div>
	<!-- 字段设置 -->
	<div class="ui-layout-east">
		<div class="layout-header ">
			<h5>字段设置</h5>
		</div>
		<input type="hidden" id="styletemp" name="styletemp" value="${style}">
		<div class="niceScroll">
		<div id="accordion1" class="accordion-style1 panel-group">
			<div class="panel panel-default conditionContainer">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a class="accordion-toggle collapsed" data-toggle="collapse"
							data-parent="#accordion1" href="#collapse2"> <i
							class="fa fa-angle-right bigger-110"
							data-icon-hide="fa fa-angle-down"
							data-icon-show="fa fa-angle-right"></i> &nbsp; 条件字段
						</a>
					</h4>
				</div>
				<div class="panel-collapse collapse" id="collapse2">
					<div class="panel-body">
						<!-- 条件字段面板 -->
						<div class="tabs-container">
							<ul class="nav nav-tabs">
								<li class="active"><a data-toggle="tab" href="#tab-1"
									aria-expanded="true">条件选择</a></li>
								<li class=""><a data-toggle="tab" href="#tab-2"
									aria-expanded="fase">Java脚本</a></li>
								<li class=""><a data-toggle="tab" href="#tab-3"
									aria-expanded="fase">帮助</a></li>
							</ul>
							<div class="tab-content">
								<div id="tab-1" class="tab-pane active">
									<div class="panel-body">
										<table class="table" cellpadding="1" cellspacing="1">
											<tr>
												<th>字段名</th>
												<th>条件</th>
												<th>显示名</th>
												<th>管理</th>
											</tr>
											<tbody id="trConditionField">
											</tbody>
										</table>
									</div>
								</div>
								<div id="tab-2" class="tab-pane ">
									<div class="panel-body" style="overflow: auto;">
										<div class="fieldBtnDiv" name="fieldBtnDiv"></div>
										<div name="javaField">
											<textarea id="script" name="defaultValue" codemirror="true"
												mirrorheight="10%" name="script" rows="10" cols="80"></textarea>
										</div>
									</div>
								</div>
								<div id="tab-3" class="tab-pane">
									<div class="panel-body">
										<div class="panel-toolbar " name="helpField">
											<span> 例：if(map.get("ACTDEFID")!=null)<br>&nbsp;&nbsp;return
												" and ACTDEFID like '%"+map.get("ACTDEFID")+"%'" ;<br>&nbsp;<br>
												其中的map为系统所封装的一个参数；<br>&nbsp;<br>
												在脚本中使用map.get("ACTDEFID")可以获取表单提交时所携带的ACTDEFID参数值，脚本应拼接并返回任意的可执行的sql语句
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- / 条件字段面板 -->
					</div>
				</div>
			</div>

			<div class="panel panel-default returnContainer">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a class="accordion-toggle collapsed" data-toggle="collapse"
							data-parent="#accordion1" href="#collapse3"> <i
							class="fa fa-angle-right bigger-110"
							data-icon-hide="fa fa-angle-down"
							data-icon-show="fa fa-angle-right"></i> &nbsp; 返回字段
						</a>
					</h4>
				</div>
				<!--返回字段面板 -->
				<div class="panel-collapse collapse" id="collapse3">
					<div class="panel-body">
						<!--返回字段面板 -->
						<div style="overflow: auto;">
							<table cellpadding="1" class="table" cellspacing="1">
								<tr>
									<th width="30%">字段名</th>
									<th width="30%">显示名</th>
									<th width="40%">管理</th>
								</tr>
								<tbody id="trResultField">
								</tbody>
							</table>
						</div>
						<!--/返回字段面板 -->
					</div>
				</div>
			</div>

			<div class="panel panel-default sortContainer">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a class="accordion-toggle collapsed" data-toggle="collapse"
							data-parent="#accordion1" href="#collapse4"> <i
							class="fa fa-angle-right bigger-110"
							data-icon-hide="fa fa-angle-down"
							data-icon-show="fa fa-angle-right"></i> &nbsp; 排序字段
						</a>
					</h4>
				</div>
				<div class="panel-collapse collapse" id="collapse4">
					<div class="panel-body">
						<!--排序字段面板 -->
						<div style="overflow: auto;">
							<table cellpadding="1" class="table" cellspacing="1">
								<tr>
									<th>字段名</th>
									<th>升降序</th>
									<th>管理</th>
								</tr>
								<tbody id="trSortField">
								</tbody>

							</table>
						</div>
						<!--/排序字段面板 -->
					</div>
				</div>
			</div>
		</div>
		</div>
		<!-- /折叠面板 -->
	</div>


	</div>

	<script type="text/html" id='dispalyFieldTem'>
		<tr id='display{{fieldName}}' name='{{fieldName}}' comment='{{comment}}' dbtype="{{dbType}}">
			<td>{{fieldName}}</td>
			<td><input type="text" name="comment" value="{{comment}}"/></td>
			<td>
				<select  name='displayType' >
						<option value="orig" 	{{if displayType=='orig'}}selected="selected"{{/if}}>原样输出</option>
						<option value="date" {{if displayType=='date'}}selected="selected"{{/if}} >日期格式</option>
						<option value="enum"  {{if displayType=='enum'}}selected="selected"{{/if}} >枚举格式</option>
				</select>
			</td>
		    <td>
					<div style="{{if  displayType !='date'}}display: none;{{/if}}" name="dateFormatDiv">
							<select id="selDate" name="format" class="inputText" style="width:180px;">
								<option value="yyyy-MM-dd" {{if format=='yyyy-MM-dd'}}selected="selected"{{/if}} >yyyy-MM-dd</option>
								<option value="yyyy-MM-dd HH:mm:ss" {{if format=='yyyy-MM-dd HH:mm:ss'}}selected="selected"{{/if}} >yyyy-MM-dd HH:mm:ss</option>
								<option value="yyyy-MM-dd HH:mm:00" {{if format=='yyyy-MM-dd HH:mm:00'}}selected="selected"{{/if}} >yyyy-MM-dd HH:mm:00</option>
								<option value="HH:mm:ss" {{if format=='HH:mm:ss'}}selected="selected"{{/if}}>HH:mm:ss</option>
						</select>
					</div>
					<div style="{{if  displayType !='enum'}}display: none;{{/if}}" name="enumFormatDiv">
							<select id="selEnum" name="enum" class="inputText" style="width:180px;">
								<option value="mon" {{if format=='mon'}}selected="selected"{{/if}} >星期一</option>
								<option value="sun" {{if format=='sun'}}selected="selected"{{/if}} >星期日</option>
								<option value="fri" {{if format=='fri'}}selected="selected"{{/if}} >星期五</option>
						</select>
					</div>
			</td>
			<td>
					<a href='#' class='btn btn-info  fa fa-arrow-up' id='trUp' title='上移'></a>&nbsp;
					<a href='#' class='btn btn-info  fa fa-arrow-down' id='trDown' title='下移'></a>&nbsp;
					<a href='#' class='btn btn-info  fa fa-remove'  id='delRow'  title='删除'></a>
			</td>
		</tr>
		</script>

	<script type="text/html" id='resultFieldTem'>
		<tr id='result{{fieldName}}' name='{{fieldName}}' >
			<td>{{fieldName}}</td>
			<td><input type="text" name="comment" value="{{comment}}"/></td>
			<td>
					<a href='#' class='btn btn-info  fa fa-arrow-up' id='trUp' title='上移'></a>&nbsp;
					<a href='#' class='btn btn-info  fa fa-arrow-down' id='trDown' title='下移'></a>&nbsp;
					<a href='#' class='btn btn-info  fa fa-remove'  id='delRow'  title='删除'></a>
			</td>
		</tr>
		</script>

	<script type="text/html" id='sortFieldTem'>
				<tr id="sort{{fieldName}}" name="{{fieldName}}">
						<td>{{fieldName}}</td>
						<td>
								<label><input type="checkbox" name="direction"   {{if direction=='ASC'}}   checked="checked"	{{/if}} />&nbsp;升序（不勾选则为降序）</label>
						</td>
						<td>
							<a href='#' class='btn btn-info  fa fa-arrow-up' id='trUp' title='上移'></a>&nbsp;
							<a href='#' class='btn btn-info  fa fa-arrow-down' id='trDown' title='下移'></a>&nbsp;
							<a href='#' class='btn btn-info  fa fa-remove'  id='delRow'  title='删除'></a>
						</td>
				</tr>
		</script>

	<script type="text/html" id='conditionFieldTem'>
				<tr class='trCondition' id='condition{{fieldName}}'	name='{{fieldName}}' comment='{{comment}}'>
						<td>{{fieldName}}</td>
						<td>
							<select class='condition' name='{{fieldName}}' dbType='{{dbType}}' comment='{{comment}}'>
								{{if dbType=='varchar'}}
										<option value="=" 	{{if condition=='='}}selected="selected"{{/if}}>等于</option>
										<option value="like" {{if condition=='like'}}selected="selected"{{/if}} >LIKE</option>
										<option value="likeEnd"  {{if condition=='likeEnd'}}selected="selected"{{/if}} >LIKEEND</option>
										<option value="in"  {{if condition=='in'}}selected="selected"{{/if}} >in</option>
							 {{else if  dbType=='number' }}
										<option value="="	{{if condition=='='}}selected="selected"{{/if}}>等于</option>
										<option value=">=" {{if condition=='>='}}selected="selected"{{/if}} >大于等于</option>
										<option value=">" {{if condition=='>'}}selected="selected"{{/if}} >大于</option>
										<option value="<=" {{if condition=='<='}}selected="selected"{{/if}} >小于等于</option>
										<option value="<" {{if condition=='<'}}selected="selected"{{/if}} >小于</option>
							{{else if dbType=='date' }}
									<option value="=" 	{{if condition=='='}}selected="selected"{{/if}}>等于</option>
									<option value="between" 	{{if condition=='between'}}selected="selected"{{/if}}>在..之间</option>
									<option value=">=" {{if condition=='>='}}selected="selected"{{/if}} >大于等于</option>
									<option value="<=" {{if condition=='<='}}selected="selected"{{/if}} >小于等于</option>
								{{/if}}
							</select>
						</td>
						<td>{{comment}}</td>
						<td>
							<a href='#' class='btn btn-info  fa fa-arrow-up' id='moveupup' title='上移'></a>&nbsp;
							<a href='#' class='btn btn-info  fa fa-arrow-down' id='movedown' title='下移'></a>&nbsp;
							<a href='#' class='btn btn-info  fa fa-remove'  id='delConditionTr'  title='删除'></a>
						</td>
					</tr>
				<tr id='conditionVal{{field}}'  dbType='{{dbType}}'  >
						<td>默认值</td>
						<td>
							<select name='defaultType'  >
								<option value="1" {{if defaultType=='1'}}selected{{/if}}>表单输入</option>
								<option value="2" {{if defaultType=='2'}}selected{{/if}}>固定值</option>
								<option value="3" {{if defaultType=='3'}}selected{{/if}}>脚本</option>
								<option value="4" {{if defaultType=='4'}}selected{{/if}}>动态传入</option>
							</select>
						</td>
						<td colspan="2">
							<div name='btnScript'  {{if defaultType=='3'}}style='display:none;'{{/if}}></div>
							<textarea name="defaultValue" cols="40" rows="3"   {{if defaultType=='1' ||  defaultType=='4' }}style="display:none;" {{/if}}>{{defaultValue}}</textarea>

							<select name="ct" {{if defaultType=='2' || defaultType =='3' }}style='display:none;'{{/if}} >
								<option value="1" {{if paraCt=='1'}}selected{{/if}}>单行文本框</option>
								<option value="2" {{if paraCt=='2'}}selected{{/if}}>下拉框</option>
								<option value="3" {{if paraCt=='3'}}selected{{/if}}>选择器</option>
								<option value="4" {{if paraCt=='4'}}selected{{/if}}>自定义对话框</option>
								</select>
						{{if dbType== 'data'  }}
							<div style="display: none;margin-top:5px;" name="dateFormatDiv">
							<select name="format" class="inputText" style="width:180px;">
								<option value="yyyy-MM-dd">yyyy-MM-dd</option>
								<option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
								<option value="yyyy-MM-dd HH:mm:00">yyyy-MM-dd HH:mm:00</option>
								<option value="HH:mm:ss">HH:mm:ss</option>
								</select>
							</div>
						{{/if}}
						<div style="{{if paraCt !='2'}}display:none;{{/if}} margin-top: 5px;" name="comboBoxDiv">
													<div id="select">
															<div class="margin-10">
																<span
																	style="display: inline-block; width: 45%; text-align: center;">值</span>
																<span
																	style="display: inline-block; width: 45%; text-align: center;">标签</span>
																<span
																		class="fa fa-plus hover-pointer" title="添加"
																		onclick="customQuerySetting._addSelect(this)"
																		style="position: absolute; right: 5%;">
																	</span>
															</div>
															{{each select as param}}
															<div class="margin-10">
																<div style="margin: 5px 0; position: relative; height: 40px;">
																	<input type="checkbox"
																		name="opt-selected"
																		class="hover-pointer"
																		style="position: absolute; left: 5px; top: 6px;" />  <input
																		type="radio" name="opt-selected"
																		ng-value="true" class="hover-pointer"
																		style="position: absolute; left: 5px; top: 6px;" /><input
																		class="form-control  field-home"
																		type="text" name="key"
																		validate="{'required':true}"
																		style="position: absolute; left: 7%;width:40%" value="{{param.key}}"/> <input
																		class="form-control  field-home"
																		type="text" name="value"  value="{{param.value}}"
																		validate="{'required':true}" 
																		style="position: absolute; left: 50%; width:40%" /> 
																		<span class="fa fa-times-circle-o hover-pointer"
																		 title="移除" onclick="customQuerySetting._deleteSelect(this)"
																		 style="position: absolute; right: 5px; top: 10px;">
																</div>
															</div>
														{{/each}}
														</div>
						</div>
							<div style="{{if paraCt !='3'}}display:none;{{/if}} margin-top: 5px;" name="selectorDiv">
								<select id = "selector-type" name="selector-type" style="width: 100px;">
										{{each selector as val}}
											<option value="{{val.alias}}" {{if param==val.alias}}selected="selected"{{/if}}>{{val.name}}</option>
										{{/each}}
								</select>
							</div>

							<div style="{{if paraCt !='4'}}display:none;{{/if}}margin-top: 5px;" name="dialogDiv">
								<select name="dialog-type" id="dialog-type" style="width: 120px;">
									<option value="">请选择对话框……</option>
										{{each dialog as val}}
											<option value="{{val.alias}}" fields="{{val.resultfield}}" param="{{param}}" 
											 {{if dialogParam==val.alias}}selected="true"{{/if}}>{{val.name}}</option>
										{{/each}}
								</select>
							 	<select  name="dialog-param" id="dialog-param" style="width: 120px;">
									<option value="{{param}}&{{paramName}}">{{paramName}}</option>
								</select>
							</div>
						</td>
			</tr>
		
		</script>


	<div id="templateJavaDiv" style="display: none;">
		<input type="checkbox" /> <input type="text" /> <span></span>
	</div>
	<div id="templateDiv"
		style="display: none; padding: 5px; width: 45%; float: left; text-align: center;">
		<input type="checkbox" /> <input type="text" value="" name="comment" />
		<span><a href="javascript:;"
			class="btn btn-info  fa fa-remove  id="delDiv"></a></span>
	</div>

		
</body>
</html>