<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/job/schedulerJob.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="jobList.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="schedulerJobForm"  action="jobSave.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务名<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="jobName" name="jobName"  validate="{required:true,maxlength:750,varirule:true}"/>
                                    <input type="hidden"  id="parameterJson" name="parameterJson" />
                                    <input type="hidden"  id="jsonNameMap"  value="${jobNameMap }"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">分组:</label>
                                <div class="col-sm-10">
                                    <select id="group" name="group" class="form-control" > 
                                    	<c:forEach var="groupVar"  items="${groupList}">
                                    		<option value="${groupVar}" >${groupVar}</option>
                                    	</c:forEach>
                                    </select>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务类:</label>
                                <div class="col-sm-10 ">
                                    	<div class="input-group">
	                                        <input type="text" class="form-control"  id="jobClass" name="jobClass" validate="{required:true,maxlength:750}"/> 
	                                        <span class="input-group-btn"> 
	                                        	<button type="button" class="btn btn-primary" id="validClass">验证</button> 
	                                        </span>
                                    </div>
                                    	
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">任务描述:</label>
                                <div class="col-sm-10">
                                    <!-- <input type="text" class="form-control"  id="description" name="description"  validate="{required:false,maxlength:3}"/> -->
                                    <textarea class="form-control" id="description" name="description"  rows="5"></textarea>
                                </div>
                            </div>
							<div class="row m-t-sm">
                               		<div class="col-sm-12">
                               			 <div class="panel blank-panel">
                               			 	 <div class="panel-heading">
		                                        <div class="panel-options">
		                                            <ul class="nav nav-tabs">
		                                                <li><a href="#paramTab" data-toggle="tab" class="btn  fa " id="addRow" >添加参数</a>
		                                                </li>
		                                            </ul>
		                                        </div>
		                                    </div>
		                                     <div class="panel-body">
	                                        	<div class="tab-content">
		                                            <div class="tab-pane active table-responsive" id="paramTab">
		                                            	 <table class="table table-striped">
				                                           <thead>
				                                               <tr>
				                                                   <th>参数名称</th>
				                                                 <!--   <th>参数类型</th> -->
				                                                   <th>参数值</th>
				                                                   <th>管理</th>
				                                               </tr>
				                                           </thead>
				                                           <tbody id="paramView">
				                                           </tbody>
				                                       </table>
		                                            </div>
	                                            </div>
                                            </div>
                               			 </div>
                               		</div>
                            </div>
					</form>
				</div>
		</div>
	</body>
</html>