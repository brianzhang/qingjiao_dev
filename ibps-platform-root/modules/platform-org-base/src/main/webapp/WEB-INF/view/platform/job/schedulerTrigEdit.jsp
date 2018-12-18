<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/job/schedulerTrig.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${returnUrl }" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="schedulerTrigForm"  action="trigSave.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">计划名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="trigName" name="trigName"  value="${ibpsTrigger.trigName}"  validate="{required:true,maxlength:600}"/>
                                    <input type="hidden"   id="jobName" name="jobName"  value="${jobName}" />
                                    <input type="hidden"   id="group" name="group"  value="${group}" />
                                    <input type="hidden"   id="planJson" name="planJson"  />
                                    <input type="hidden"   id="allTrigName"   value="${allTrigName }" />
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">执行计划的方式: </label>
                                <div class="col-sm-10">
                                	<select  id="planType" class="form-control" >
	                                	<option value="once" >一次</option>
	                                	<option value="minute" >每天每隔分钟</option>
	                                	<option value="day" >每天</option>
	                                	<option value="week" >每周</option>
	                                	<option value="month" >每月</option>
	                                	<option value="cron" >Cron表达式</option>
                                	</select>
                            	</div>
                            </div>
							<div class="form-group"  id="onceDiv" >
                                <label class="col-sm-2 control-label">执行规则: </label>
                                <div class="col-sm-10 row"  >
                                   		<div class="col-md-2">
	                                   		<label class="control-label">执行时间: </label>  
	                                   </div>
	                                   <div class="col-md-3">
	                                   		<input type="text" id="txtOnceDate" class="form-control date"  />
	                                   </div>
	                                   <div class="col-md-2">
		                                   <select id="txtOnceHour" class="form-control " >
												<c:forEach begin="0" end="23" step="1" var="tmp">
															<option value="${tmp }" >${tmp }时</option>
												</c:forEach>
											</select>
	                                   </div>
	                                   <div class="col-md-2">
		                                   <select id="txtOnceMinute"  class="form-control " >
												<c:forEach begin="0" end="55" step="5" var="tmp">
														<option value="${tmp }">${tmp }分</option>
													</c:forEach>
												<option value="59">59分</option>
											</select>
	                                   </div>
	                                   <div class="col-md-2">
		                                   	<select id="txtOnceSecond"  class="form-control " >
												<c:forEach begin="0" end="55" step="5" var="tmp">
														<option value="${tmp }">${tmp }秒</option>
												</c:forEach>
												<option value="59">59秒</option>
											</select>
	                                   </div>
                                </div>
                            </div>
                            <div class="form-group"  id="minuteDiv" >
                                <label class="col-sm-2 control-label">执行规则: </label>
                                <div class="col-sm-10"  >
                                    	<select id="selEveryDay" class="form-control " >
											<option value="1">1分钟</option>
					               			<option value="5">5分钟</option>
					               			<option value="10">10分钟</option>
					               			<option value="15">15分钟</option>
					               			<option value="30">30分钟</option>
					               			<option value="60">1小时</option>
					               		</select>
                               </div>
                          </div>
                          <div class="form-group"  id="dayDiv" >
                              <label class="col-sm-2 control-label">执行规则: </label>
                              <div class="col-sm-10 row"  >
                                  <div class="col-md-4">
		                                  <select id="txtDayHour" class="form-control " >
											<c:forEach begin="0" end="23" step="1" var="tmp">
												<option value="${tmp }">${tmp }时</option>
											</c:forEach>
										  </select>
								 </div>
                                  <div class="col-md-4">
	                                  <select id="txtDayMinute" class="form-control " >
										<c:forEach begin="0" end="55" step="5" var="tmp">
													<option value="${tmp }">${tmp }分</option>
										</c:forEach>
										<option value="59">59分</option>
									  </select>
                                  </div>
                             </div>
                          </div>
                          <div class="form-group"  id="weekDiv" >
                              <label class="col-sm-2 control-label">执行规则: </label>
                              <div class="col-sm-10 row"   >
                              <div class="col-md-4">
                              	<label class="radio-inline i-checks">
		                                <input type="checkbox"  chkName="chkWeek" value="MON" />星期一
		                        </label>
	                        	<label class="radio-inline i-checks">
	                        			<input type="checkbox" chkName="chkWeek" value="TUE"/>星期二
	                        	</label>
	                        	<label class="radio-inline i-checks">
		                              	<input type="checkbox" chkName="chkWeek" value="WED"/>星期三
	                        	</label>
	                        	<label class="radio-inline i-checks">
					               		<input type="checkbox" chkName="chkWeek" value="THU"/>星期四
	                        	</label>
	                        	<label class="radio-inline i-checks">
					               		<input type="checkbox" chkName="chkWeek" value="FRI"/>星期五
	                        	</label>
	                        	<label class="radio-inline i-checks">
					               		<input type="checkbox" chkName="chkWeek" value="SAT"/>星期六
	                        	</label>
	                        	<label class="radio-inline i-checks">
					               		<input type="checkbox" chkName="chkWeek" value="SUN"/>星期日
	                        	</label>
	                        	</div>
	                        	<div class="col-md-4">
	                                  <select id="txtWeekHour" class="form-control " >
										<c:forEach begin="0" end="23" step="1" var="tmp">
											<option value="${tmp }">${tmp }时</option>
										</c:forEach>
									  </select>
								 </div>
                                  <div class="col-md-4">
	                                  <select id="txtWeekMinute" class="form-control " >
										<c:forEach begin="0" end="55" step="5" var="tmp">
													<option value="${tmp }">${tmp }分</option>
										</c:forEach>
										<option value="59">59分</option>
									  </select>
                                  </div>
                             </div>
                          </div>
                          <div class="form-group"  id="monthDiv" >
                              <label class="col-sm-2 control-label">执行规则: </label>
                              <div class="col-sm-10 row"  >
                               	 <div class="col-md-4">
	                               	 <c:forEach begin="1" end="31" var="mon">
	                               	 	<label class="radio-inline i-checks">
										    <input type="checkbox" chkName="chkMon" value="${mon}"/>${mon}
										 </label>
									 </c:forEach>
									 <label class="radio-inline i-checks">
										    <input type="checkbox" chkName="chkMon" value="L"/>最后一天
									 </label>
                               	 </div>
                                 <div class="col-md-4">
	                                  <select id="txtMonHour" class="form-control " >
										<c:forEach begin="0" end="23" step="1" var="tmp">
											<option value="${tmp }">${tmp }时</option>
										</c:forEach>
									  </select>
								 </div>
                                  <div class="col-md-4">
	                                  <select id="txtMonMinute" class="form-control " >
										<c:forEach begin="0" end="55" step="5" var="tmp">
													<option value="${tmp }">${tmp }分</option>
										</c:forEach>
										<option value="59">59分</option>
									  </select>
                                  </div>
                             </div>
                          </div>
                          <div class="form-group"  id="cronDiv" >
                              <label class="col-sm-2 control-label">执行规则: </label>
                              <div class="col-sm-10"  >
                                  <input type="text" id="txtCronExpression"  class="form-control " />
                             </div>
                          </div>
					</form>
				</div>
		</div>
	</body>
</html>