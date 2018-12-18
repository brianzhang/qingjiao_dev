<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/include/list.jsp" %>
		<link type="text/css" href="${ctx }/js/plugins/laypage/skin/laypage.css" rel="stylesheet"/>
		<title>报表预览</title>
		<script type="text/javascript">
			var reportParams = ${reportParams};
			var printPosition ='${ printPosition }', from = '${from}';
		</script>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/report/raqsoft/preview.js"></script>
	</head>
	<body>
		<div id="report_preview" class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons toolbar-top"> 		
							<div class="btn-group">
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<a href="${ctx}/platform/report/reportDef/list.htm?reportType=raqsoft" class="btn btn-primary fa fa-back" ><span>返回</span></a>
							</div>
							
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
						<form role="form" class="search-form" action="${ctx}/platform/report/raqsoft/showReport.htm">
							<div  class="form-inline p-xxs">
								<input type="hidden" id="reportId" name="reportId" value="${reportId }" />
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="report_wrapper">
				<iframe id="raqsoftFrame" src="${ctx }/platform/report/raqsoft/showReport.htm?reportId=${reportId}" style="width:100%;border: 0px;"></iframe>
			</div>
			<!-- #分页条件-->
			<div class="toolbar-body" style="margin-top: 5px;">
				<div  class="page-form">
					<div  class="form-inline p-xxs">
						<div class="form-group toolbar-bottom">
						
						</div>
						<div class="pull-right">
							<div class="laypage_main laypageskin_default" >
								<a href="#" class="laypage_first glyphicon glyphicon-step-backward" title="首页"></a>
								<a href="#" class="laypage_prev glyphicon glyphicon-backward" title="上一页"></a>
								<span class="laypage_total">第<span id="c_page_span"></span>页/共<span id="t_page_span"></span>页</span>
								<a href="#" class="laypage_next glyphicon glyphicon glyphicon-forward" title="下一页"></a>
								<a href="#" class="laypage_last glyphicon glyphicon-step-forward" title="尾页"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--/ 分页条件-->
		</div>
	
                  
                  
 <script type="text/html" id="s:reportParams:formTemplate">
{{each reportParams as item i}}
	<div class="form-group">
	<label class="search-label">{{item.desc}}</label>:
	{{if item.controlType == undefined||item.controlType == 'text'||item.controlType == ''}}<input type="text"  name="{{item.name }}"  class="form-control"  value="{{item.value }}" />{{/if}}
	{{if item.controlType == 'datePicker'}}
		<input type="text"  name="{{item.name }}"  class="form-control {{if item.controlOptions.datefmt_type=='date'}}date{{/if}}{{if item.controlOptions.datefmt_type=='time'}}time{{/if}}{{if item.controlOptions.datefmt_type=='datetime'}}datetime{{/if}}"  value="{{item.value }}" />
	{{/if}}
	{{if item.controlType == 'select'}}
	<select name="{{item.name }}" class="form-control search-select">
		<option value=""></option>
		{{each item.controlOptions.option as option o}}
		<option value="{{option.val}}" {{if option.checked==true}}selected{{/if}}>{{option.label}}</option>
		{{/each}}
	</select>
	{{/if}}
	{{if item.controlType == 'user'||item.controlType == 'org'||item.controlType == 'position'||item.controlType == 'role'}}
	<div class="input-group ">
		<input type="hidden" name="{{item.name }}" id="{{item.name+'Id'}}" value="{{item.value}}" /> 
		<input type="text" class="form-control search-selector" id="{{item.name + 'Name'}}" name="{{item.name+'Name' }}" readonly="readonly" /> 
		<span class="input-group-btn">
			<button type="button" class="btn  btn-info btn-mm" data-toggle="selector" data-type="{{item.controlType}}" data-id="{{'#'+item.name + 'Id'}}" data-name="{{'#'+item.name + 'Name' }}">
				<i class="fa fa-user"></i>
			</button>&nbsp;&nbsp;
			<button type="button" class="btn  btn-info btn-mm" data-toggle="clear" data-id="{{'#'+item.name + 'Id' }}" data-name="{{'#'+item.name + 'Name'}}">
				<i class="fa fa-times"></i>
			</button>
		</span>
	</div>
	{{/if}}
	</div>
{{/each}}
</script>
<script type="text/html" id="s:showReport:print">
	<div class="btn-group">
		{{if printButton}}<a class="btn btn-primary fa fa-print" href="#"><span>打印</span></a>{{/if}}
	</div>
	<div class="btn-group">
		{{if output2PDF}}<a class="btn btn-primary fa fa-file-pdf-o fa-file-pdf-e" href="#" ><span>PDF导出</span></a>{{/if}}
		{{if output2Excel}}<a class="btn btn-primary fa fa-file-excel-o fa-file-excel-e" href="#" ><span>EXCEL导出</span></a>{{/if}}
		{{if output2Word}}<a class="btn btn-primary fa fa-file-word-o fa-file-word-e" href="#" ><span>WORD导出</span></a>{{/if}}
	</div>
</script>
	</body>
	
</html>
