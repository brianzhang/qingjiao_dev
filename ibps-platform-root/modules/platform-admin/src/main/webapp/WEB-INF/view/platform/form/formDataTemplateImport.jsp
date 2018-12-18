<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/include/get.jsp"%>
	<f:link href="qtip/jquery.qtip.css"/>
	<f:link href="wizard/fuelux.wizard.css" />
	<f:link href="lc/form/formDataTemplateImport.css"  isCommon="false"/>
 	<script type="text/javascript" src="${ctx}/js/plugins/webuploader/webuploader.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/fuelux.wizard.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/plugins/qtip/jquery.qtip.js" ></script>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
 	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDataTemplateImport.js"></script>
</head>
<body>
	<div class="wrapper">
			<div id="fuelux-wizard-container"  data-target="#step-container" >
							<!-- #section:plugins/fuelux.wizard.steps -->
							<ul class="steps wizard-steps">
								<li  data-target="#step1" data-step="1" class="active">
									<span class="step">1</span>
									<span class="title">上传Excel</span>
								</li>

								<li  data-target="#step2" data-step="2" >
									<span class="step">2</span>
									<span class="title">预览数据</span>
								</li>

								<li   data-target="#step3" data-step="3">
									<span class="step">3</span>
									<span class="title">选择字段</span>
								</li>

								<li  data-target="#step4" data-step="4">
									<span class="step">4</span>
									<span class="title">导入数据</span>
								</li>
							</ul>
				</div>
				<!-- /section:plugins/fuelux.wizard.steps -->
					<div class="wizard-actions" style="display: none;">
						<button class="btn btn-prev">
							<i class=" fa fa-arrow-left"></i>
							上一步
						</button>
						<button class="btn btn-success btn-next" data-last="完　成">
							下一步
							<i class="fa fa-arrow-right icon-on-right"></i>
						</button>
					</div>
					</br>
						<hr>
						<!-- #section:plugins/fuelux.wizard.container -->
						<div class="step-content pos-rel"   id="step-container">
										<!-- #第一个 上传Excel -->
							<div id="step1" class="step-pane active" data-step="1">
										<div>您可以便捷地将Excel中的数据导入到该表单中。</div>

								            <!-- 上传文件 -->
								            <div id="upload" class="panel focus">
								                    <div id="dndArea" class="placeholder">
								                        <div class="filePickerContainer">
								                            <div id="filePickerReady"></div>
								                        </div>
													<div class="progress" style="display: none;">
							                            <span class="text">0%</span>
							                            <span class="percentage" style="width: 0%;"></span>
							                        </div>
								                </div>
								            </div>
									        <div class="excel-precondition">
											    <div>Excel文件请符合以下标准：</div>
											    <ul class="list-style" >
												      <li>后缀名为xls或者xlsx</li>
												      <li>确保第一行为字段名，数据在第一个Sheet中，没有合并单元格</li>
												      <li>文件大小请勿超过1.0 MB</li>
												      <li>文件所含数据行数请勿超过2000</li>
												      <li>导入只做简单数据类型校验，不做数据有效性校验，请自行确保导入数据的正确性。</li>
											    </ul>
										  </div>
									
							</div>

							<div id="step2"  class="step-pane" data-step="2">
								</br>
								<table class="table table-striped  table-bordered table-hover" id="excelTable"></table>
								<hr>
									</br>
								<div>以第 <input type="text" class="form-control"  style="width: 50px;display: inline;"  value="1"  id="excelRow" />行作为表单各字段的名称</div>
							</div>

							<div id="step3"  class="step-pane" data-step="3">
								</br>
								<table class="table table-striped  table-bordered table-hover" id="importField">
									<thead>
										<tr>
											<td width="10%">导入</td>
											<td>标题</td>
											<td width="20%">数据类型</td>
										</tr>
									</thead>
									<tbody>
									</tbody>
									</table>
								<hr>
							</div>

							<div id="step4"  class="step-pane" data-step="4">
								</br>
								<div class="center">
									<h3 class="green">导入成功!</h3>
									
						
								<!-- 		成功导入条数据，失败条数据 -->
								</div>
									<div  class="pull-right">
										<a href="javascript:DialogUtil.closeDialog();" class="btn btn-sm btn-default fa fa-close"><span>关闭</span></a>
									</div>
							</div>
						</div>

						<!-- /section:plugins/fuelux.wizard.container -->
       </div>
       <script type="text/html"  id="excelTableTemp">
				<tbody>
    			{{each list as item i}}
					<tr {{if excelRow == (i+1)}}class="info"{{/if}}>
						<td> {{i+1}}</td>
						{{each item as it j}}
						{{if j<=5}}
							<td> {{it}}</td>
						{{else if (j+1)==item.length}}
							<td> {{it}}</td>
						{{/if}}

						{{if j ==6 && item.length>7}}
							<td> ...</td>
						{{/if}}
						{{/each}}
					</tr>
				{{/each}}
				</tbody>
	 </script>
  	<script type="text/html"  id="importFieldTemp">
			{{each list as item i}}
				<tr {{if !item.isExist }}class="danger"  data-tip="表单中没有该字段"{{/if}}   >
					<td> {{!item.isExist}}<input type="checkbox" data-toggle="import"  data-column="{{i}}"  name="{{item.name}}"  	{{if !item.isExist }}disabled="disabled"{{else}} checked="checked" {{/if}}  /></td>
					<td>{{item.label}}</td>
					<td>{{item.field_type}}</td>
				</tr>
			{{/each}}	
	</script>
	 
</body>
</html>