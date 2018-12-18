<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/grid.jsp" %>
		
		<f:link href="wizard/fuelux.wizard.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/bootstrap/fuelux.wizard.min.js"></script>
		
		<f:link href="lc/form/formrenderer.css"  isCommon="false"/>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/BoDefControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/ExternalTableControl.js"></script>
		
		<script type="text/javascript">
			var action = "${action}";
			var isMain = "${isMain}";
			var version = "${version}";
			var pid = "${pid}";
			var profix = "${profix}";
		</script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/bo/boDef.js"></script>
	</head>
	<body>
		<div class="wrapper wrapper-content col-sm-12">
			<c:choose>
				<c:when test="${level == 0 }">
					<div class="alert alert-warning m-t-sm">
						请选择左边树进行左键或右键操作！
					</div>
				</c:when>
				<c:otherwise>
					<!-- #section:plugins/fuelux.wizard.steps -->
					<div id="stepContent" class="panel">
						<div id="fuelux-wizard-container"  data-target="#step-container" >
							<ul class="steps wizard-steps">
								<li data-target="#step1" data-step="1" class="active">
									<span class="step">1</span>
									<span class="title">选择BO类型</span>
								</li>
	
								<li data-target="#step2" data-step="2" >
									<span class="step">2</span>
									<span class="title">选择现有BO</span>
								</li>
	
								<li data-target="#step3" data-step="3">
									<span class="step">3</span>
									<span class="title">选择外部数据</span>
								</li>
							</ul>
						</div>
						<hr>
						
						<!-- #section:plugins/fuelux.wizard.container -->
						<div class="step-content pos-rel" id="step-container">
							<!-- #第一个 选择BO类型 -->
							<div id="step1" class="step-pane active" data-step="1">
								<div class="panel-form col-sm-12">
									<div class="form-horizontal">
										<div class="form-group">
			                                <label class="col-sm-2 control-label">BO类型:</label>
			                                <div class="col-sm-10">
			                                 	<label class="radio-inline ">
			                                 		<input type="radio" class="ibps" value="new" name="boType" checked="checked"><span class="lbl">新建</span>
												</label> 
												<label class="radio-inline ">
													<input type="radio" class="ibps" value="bo" name="boType"><span class="lbl">现有BO</span>
												</label>
												<label class="radio-inline ">
													<input type="radio" class="ibps" value="out" name="boType"><span class="lbl">外部数据</span>
												</label>
			                                </div>
			                            </div>
			                            
			                            <div class="form-group">
			                            	<label class="col-sm-2 control-label">步骤说明:</label>
			                                <div class="col-sm-10">
			                                	1、新建:<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;1.1、跳转编辑页面；<br/>
			                                	2、现有BO:<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;2.1、选择现有BO；<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;2.2、跳转到编辑页面；<br/>
			                                	3、外部数据:<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;3.1、有对应BO<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1.1、选择现有BO；<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1.2、跳转到编辑页面；<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;3.2、无对应BO<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.1、选择现有BO；<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.2、选择外部数据；<br/>
			                                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.3、跳转到编辑页面；
			                                </div>
			                            </div>
		                            </div>
	                            </div>
                            </div>
	
							<div id="step2"  class="step-pane" data-step="2">
								<div class="panel-form col-sm-12">
									<div class="form-horizontal">
										<div class="form-group">
			                                <label class="col-sm-2 control-label">BO定义:</label>
			                                <div class="col-sm-10">
			                                	<div id="extDiv" class="hidden">外部数据表创建的BO不能直接添加为主对象，如需修改请直接通过编辑功能修改！</div>
			                                	<div class="fr-bodef" data-toggle="bodef" data-single="true" data-type="object" data-bind-id="boid">
													<ul class="selector-list"></ul>
													<textarea style="display: none" name="boid" ></textarea>
													<textarea style="display: none" data-control="bodef"></textarea>
												 </div>
			                                </div>
			                            </div>
			                        </div>
								</div>
							</div>
	
							<div id="step3"  class="step-pane" data-step="3">
								<div class="panel-form col-sm-12">
									<div class="form-horizontal">
										<div class="form-group">
			                                <label class="col-sm-2 control-label">外部数据表:</label>
			                                <div class="col-sm-10">
			                                	<div class="fr-exttbl" data-toggle="exttbl" data-single="true" data-bind-id="tbldata">
													<ul class="selector-list"></ul>
													<textarea style="display: none" name="tbldata"></textarea>
													<textarea style="display: none" data-control="exttbl"></textarea>
												 </div>
			                                </div>
			                            </div>
			                        </div>
								</div>
							</div>
						</div>
						
						<!-- /section:plugins/fuelux.wizard.steps -->
						<div class="wizard-actions">
							<center>
								<button class="btn btn-prev">
									<i class=" fa fa-arrow-left"></i>
									上一步
								</button>
								<button class="btn btn-success btn-next" data-last="完　成">
									下一步
									<i class="fa fa-arrow-right icon-on-right"></i>
								</button>
							</center>
						</div>
					</div>
					
					<div id="boContent" class="panel">
						<div id="boDefTabs" class="tabs-container">
		                    <ul class="nav nav-tabs">
		                        <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="false">基本信息</a></li>
		                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="true">对象属性</a></li>
		                        <li class=""><a data-toggle="tab" href="#tab-3" aria-expanded="true">其它属性</a></li>
		                    </ul>
		                    <div class="tab-content">
		                        <div id="tab-1" class="tab-pane active">
		                            <div class="panel-body">
		                            	<form class="form-horizontal" id="boDefForm">
			                            	<div class="form-group">
				                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                    <input type="text" class="form-control" id="name" name="name" 
				                                    	data-pinyin="#code" validate="{required:true,name:true,maxlength:64}"/>
				                                </div>
				                            </div>
				                           <div class="form-group">
				                                <label class="col-sm-2 control-label">编码<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                    <input type="text" class="form-control" id="code" name="code" 
				                                    	validate="{required:true,fields:true,maxlength:64}"/>
				                                </div>
				                            </div>
				                             <div class="form-group">
				                                <label class="col-sm-2 control-label">数据格式<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
			                                		<select id="dataFormat" name="dataFormat" class="form-control">
														<option value="json" >JSON</option>
														<!-- <option value="xml" >XML</option> -->
													</select>
				                                </div>
				                            </div>
				                            <div class="form-group outBo">
				                                <label class="col-sm-2 control-label">数据源<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                    <input type="text" class="form-control" disabled id="dsName" name="dsName" 
				                                    	validate="{required:true,maxlength:64}"/>
				                                </div>
				                            </div>
				                           <div class="form-group  ">
				                                <label class="col-sm-2 control-label">当前对象主键<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                              		<select id="pk" name="pk" class="form-control" validate="{required:true}">
				                              		</select>
				                                </div>
				                            </div>
				                            <div class="form-group subBo ">
				                            <div class="group">
				                                <label class="col-sm-2 control-label">当前对象外键<span class="required">*</span>:</label>
				                                <div class="col-sm-4">
				                              		<select id="fk" name="fk" class="form-control" validate="{required:true}">
				                              		</select>
				                                </div>
				                            </div>
				                            <div class="group">
				                                <label class="col-sm-2 control-label">来自主对象属性<span class="required">*</span>:</label>
				                                <div class="col-sm-4">
				                              		<select id="fromAttr" name="fromAttr" class="form-control" validate="{required:true}">
				                              		<c:forEach items="${mattrs }" var="mattr">
				                              			<option value="${mattr.code }">${mattr.name }</option>
				                              		</c:forEach>
				                              		</select>
				                                </div>
				                            </div>
				                            </div>
				                            <div class="form-group subBo ">
				                                <label class="col-sm-2 control-label">关系类型<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                              		<select id="relation" name="relation" class="form-control" validate="{required:true}">
				                              			<option value="one2one">一对一</option>
				                              			<option value="one2many" selected="selected">一对多</option>
				                              		</select>
				                                </div>
				                            </div>
				                            <div class="form-group">
				                                <label class="col-sm-2 control-label">描述:</label>
				                                <div class="col-sm-10">
				                                		<textarea rows="2" cols="5" class="form-control"  id="desc" name="desc"></textarea>
				                                </div>
				                            </div>
				                            <input type="hidden" id="id" name="id"/>
		                            		<input type="hidden" id="isMaster" name="isMaster" value="${isMaster }"/>
		                            		<input type="hidden" id="boType" name="boType" value="object"/>
		                            		<input type="hidden" id="state" name="state" value="new"/>
		                            		<input type="hidden" id="status" name="status" />
		                            		<input type="hidden" id="dsAlias" name="dsAlias" />
		                            		<input type="hidden" id="tblName" name="tblName" />
			                            </form>
		                            </div>
		                        </div>
		                     
		                        <div id="tab-2" class="tab-pane ">
		                            <div class="panel-body" style="padding: 5px;">
		                          		<c:if test="${action == 'edit' }">
		                          		<div id="boAttrToolBar" class="panel-toolbar ">
											<div class="buttons">
												<a href="javascript:void(0);" id="addAttr" class="btn btn-info fa fa-add"><span>添加</span></a>
												<a href="javascript:void(0);" id="editAttr" class="btn btn-info fa fa-edit"><span>编辑</span></a>
												<a href="javascript:void(0);" id="moveUpAttr" class="btn btn-info fa fa-arrow-circle-up"><span>上移</span></a>
												<a href="javascript:void(0);" id="moveDownAttr" class="btn btn-info fa fa-arrow-circle-down"><span>下移</span></a>
												<a href="javascript:void(0);" id="delAttr" class="btn btn-info fa fa-remove"><span>删除</span></a>
												<a href="javascript:void(0);" id="resetAttr" class="btn btn-info fa fa-undo"><span>重置</span></a>
												<label class="control-label red">主外键需要显示声明！</label>
											</div>
										</div>
		                          		</c:if>
										<div>
											<table id="boDefAttr"></table>
										</div>
		                            </div>
		                        </div>
		                        
		                        <div id="tab-3" class="tab-pane">
		                            <div class="panel-body">
		                            	<form class="form-horizontal" id="boDefOptionsForm">
			                            	<div class="form-group">
				                                <label class="col-sm-2 control-label">展示类型<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                    <select id="struType" name="struType" class="form-control">
														<option value="list" >列表</option>
														<option value="tree" >树型</option>
													</select>
				                                </div>
				                            </div>
				                            
				                           	<div name="treeOptions" class="form-group">
				                                <label class="col-sm-2 control-label">
				                                	树ID字段
				                                	<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                    <select id="idKey" name="idKey" class="form-control" validate="{required:true}">
													</select>
				                                </div>
				                            </div>
				                           	<div name="treeOptions" class="form-group">
				                                <label class="col-sm-2 control-label">
				                                	树父ID字段
				                                	<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                	<select id="pIdKey" name="pIdKey" class="form-control" validate="{required:true}">
													</select>
				                                </div>
				                            </div>
				                           	<div name="treeOptions" class="form-group">
				                                <label class="col-sm-2 control-label">
				                                	树展示字段
				                                	<span class="required">*</span>:</label>
				                                <div class="col-sm-10">
				                                    <select id="key" name="key" class="form-control" validate="{required:true}">
													</select>
				                                </div>
				                            </div>
			                            </form>
		                            </div>
		                        </div>
		                    </div>
		           		</div>
		           	</div>
		           	<input type="hidden" id="level" value="${level}">
				</c:otherwise>
			</c:choose>
		</div>
	</body>
</html>