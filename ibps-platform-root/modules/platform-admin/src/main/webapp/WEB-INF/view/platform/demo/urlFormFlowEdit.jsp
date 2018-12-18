<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/demo/urlForm.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="urlFormForm" action="save.htm" >
					<input type="hidden" name="m:urlForm:id"  value="${urlForm.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">文本框</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlForm:text" value="${urlForm.text}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">文本域</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:urlForm:textarea"  validate="{required:false}">${urlForm.textarea}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数字</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:urlForm:number"  value="${urlForm.number}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" name="m:urlForm:hide"  value="${urlForm.hide}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">日期</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:urlForm:time"   value="<fmt:formatDate value="${urlForm.time}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">富文本</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:urlForm:editor" style="display: none;" validate="{required:false}">${fn:escapeXml(urlForm.editor)}</textarea>
				<script id="m:urlForm:editorEditor" data-name="m:urlForm:editor" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单选</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:urlForm:radio" class="ibps" value="1"   <c:if test="${urlForm.radio=='1'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">选项一</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:urlForm:radio" class="ibps" value="2"   <c:if test="${urlForm.radio=='2'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">选项二</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">多选</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlForm:checkBox" class="ibps" value="1" <c:if test="${fn:contains(urlForm.checkBox, '1')}">checked="checked"</c:if> validate="{required:false}"/>
					   	<span class="lbl">选项一</span>
				  </label>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlForm:checkBox" class="ibps" value="2" <c:if test="${fn:contains(urlForm.checkBox, '2')}">checked="checked"</c:if> validate="{required:false}"/>
					   	<span class="lbl">选项二</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">下拉</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:urlForm:select"  value="${urlForm.select}" validate="{required:false}">
				    <option value="1" <c:if test="${urlForm.select=='1'}">selected="selected"</c:if>>选项一</option>
				    <option value="2" <c:if test="${urlForm.select=='2'}">selected="selected"</c:if>>选项二</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据字典</label>
				  	<div class="fr-form-block">
				 <input type="hidden" id="dic" name="m:urlForm:dic"  value="${urlForm.dic}"/>
				<input type="text" readonly="readonly"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="tableSource" data-key="#dic"
		                 value="${f:getDictLabel(urlForm.dic,'tableSource', 'key', '')}"  validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自动编号</label>
				  	<div class="fr-form-block">
				<div class="input-icon">
					<i class="fa fa-list-ol"></i>
					<input type="text"  readonly="readonly" class="fr-form-control" data-toggle="autoNumber"  data-identity="cs" data-init="true"   name="m:urlForm:autoNum"  value="${urlForm.autoNum}" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">附件</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:urlForm:att"  validate="{required:false}">${urlForm.att}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">选择器</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:urlForm:selector"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlForm:selector" >${urlForm.selector}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自定义对话框</label>
				  	<div class="fr-form-block">
				<div class="input-group" data-toggle="customdialog" data-dialog="csdhkkj" data-bind="[{'fieldName': 'NAME_','name': 'customDialog'}]" data-name="m:urlForm:">
					<input type="text" readonly="readonly"  class="fr-form-control "  name="m:urlForm:customDialog"  value="${urlForm.customDialog}" validate="{required:false}"/>
					<span class="input-group-addon"><i class="fa fa-search-plus"></i></span>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地址</label>
				  	<div class="fr-form-block">
				<div style="position: relative;">
	            	 <input class="fr-form-control" readonly type="text" data-toggle="address"   name="m:urlForm:add"  value="${urlForm.add}" validate="{required:false}">
	         	</div>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:urlFormSub2" data-mode="dialog" data-required="" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">子表例子</div>
				<div class="fr-table-tools">
							<a class="btn btn-primary fa fa-add js-add-record"  data-type="add"  href="javascript:void(0);">添加</a>
							<a class="btn btn-primary fa fa-remove js-remove-record"  data-type="remove"  href="javascript:void(0);">删除</a>
				</div>
			</caption>
			<thead>
				<tr>
		     		 <th class="fr_table_col_checkbox" width="75px"><input role="checkbox" class="checkAll" name="s:urlFormSub2" type="checkbox"></th>
	       			 <th>KEY</th>
	       			 <th>NAME</th>
	       			 <th>AGE</th>
		      	<th class="fr_table_col_remove" width="75px">管理</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="urlFormSub2" items="${urlForm.urlFormSub2PoList}">	
					<tr>	
						<td><input role="checkbox" class="cbox " type="checkbox" name="s:urlFormSub2" ></td>
				 		<td>
							
							<input type="hidden" name="s:urlFormSub2:key:${stat.index+1}"  value="${urlForm.key}"/><span>${urlForm.key}</span>
						</td>	
				 		<td>
							
							<input type="hidden" name="s:urlFormSub2:name:${stat.index+1}"  value="${urlForm.name}"/><span>${urlForm.name}</span>
						</td>	
				 		<td>
							
							<input type="hidden" name="s:urlFormSub2:age:${stat.index+1}"  value="${urlForm.age}"/><span>${urlForm.age}</span>
						</td>	
						<td class="fr_table_col_remove" width="75px">
								<a title="编辑" class="btn  btn-xs btn-outline btn-row js-edit-row" href="javascript:void(0);"><i class=" fa fa-edit  fa-lg fa-font-green"></i></a>	
								<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		
	<script type="text/html" id="s:urlFormSub2:TrTemplate">
			<tr>
		  	<td><input role="checkbox" class="cbox " type="checkbox" name="s:urlFormSub2" ></td>
	 	 	 <input type="hidden" name="s:urlFormSub2:id:{{idx}}"  value="{{id}}"/>	 	 	 
	 		<td>
	 			<input type="hidden" name="s:urlFormSub2:key:{{idx}}"  value="{{key}}"/><span>{{key}}<span>
	 		</td>
	 	 	 
	 		<td>
	 			<input type="hidden" name="s:urlFormSub2:name:{{idx}}"  value="{{name}}"/><span>{{name}}<span>
	 		</td>
	 	 	 
	 		<td>
	 			<input type="hidden" name="s:urlFormSub2:age:{{idx}}"  value="{{age}}"/><span>{{age}}<span>
	 		</td>
	 	 	 <input type="hidden" name="s:urlFormSub2:parentId:{{idx}}"  value="{{parentId}}"/>		  	<td class="fr_table_col_remove" width="75px">
		  		<a title="编辑" class="btn  btn-xs btn-outline btn-row js-edit-row" href="javascript:void(0);"><i class=" fa fa-edit  fa-lg fa-font-green"></i></a>
				<a title="删除" class="btn  btn-xs btn-outline btn-row js-remove-row" href="javascript:void(0);"><i class=" fa fa-times-circle-o  fa-lg fa-font-red"></i></a>
			</td>
		</tr>
	</script>
</form>

			</div>
		</div>
		
		<script type="text/html" id="urlFormSub2PoListTrTemplate">
			<tr>
				<td>{{index}}</td>
				<td>
					<input type="text" class="form-control" name="key" value="" validate="{required:false,maxlength:192}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="name" value="" validate="{required:false,maxlength:192}"/>
				</td>
				<td>
					<input type="text" class="form-control" name="age" value="" validate="{required:false,number:true}"/>
				</td>
				<td>
					<a class="btn btn-primary fa fa-remove" href="javascript:void(0);" onclick="urlForm.removeSub('urlFormSub2PoList',this);"><span>删除</span></a>
				</td>
			</tr>
		</script>
	</body>
</html>
