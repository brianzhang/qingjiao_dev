<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<%@include file="/commons/page/tree.jsp" %>
		<f:link href="codemirror/lib/codemirror.css" />
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/lib/codemirror.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/css/css.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/htmlmixed/htmlmixed.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/htmlembedded/htmlembedded.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/javascript/javascript.js"></script>
		<script type="text/javascript" src="${ctx}/js/plugins/codemirror/mode/xml/xml.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/plugins/comboTree.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopColumn.js"></script>

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
			<div class="panel-form">
					<form class="form-horizontal" id="desktopColumnForm"  action="save.htm"   method="post"  >
							<div class="form-group">
								<div  class="group">
	                                <label class="col-sm-2 control-label">栏目名称<span class="required">*</span>:</label>
	                                <div class="col-sm-4">
	                                    <input type="text" class="form-control"  id="name" name="name" value="${desktopColumn.name}"  validate="{required:true,maxlength:384}"/>
	                                </div>
                                </div>
                               <div  class="group">
                                <label class="col-sm-2 control-label">栏目别名<span class="required">*</span>:</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control"  id="alias" name="alias" value="${desktopColumn.alias}"  validate="{required:true,maxlength:60}"/>
                                </div>
                                  </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">栏目分类:</label>
                                <div class="col-sm-4">
                                         <input type="hidden"  id="typeId" name="typeId" value="${desktopColumn.typeId}" />
                                		 <input type="text" class="form-control comboTree"  id="typeName" 
                                    	 data-toggle="comboTree"  data-type="DESKTOP_TYPE" data-id="#typeId"  readonly
                                    	 value="${desktopColumn.typeName}"  validate="{required:false}"/>
                                </div>
                                <label class="col-sm-2 control-label">栏目类型<span class="required">*</span>:</label>
                                <div class="col-sm-4">
                                		<select class="form-control" id="colType" name="colType" >
												<option value="0" <c:if test="${desktopColumn == null ||desktopColumn.colType == '0'}">selected</c:if>>一般类型栏目</option>
												<option value="1" <c:if test="${desktopColumn.colType == '1'}">selected</c:if>>图表类型栏目</option>
												<option value="2" <c:if test="${desktopColumn.colType == '2'}">selected</c:if>>日历类型栏目</option>
												<option value="3" <c:if test="${desktopColumn.colType == '3'}">selected</c:if>>滚动类型栏目</option>
										</select>
                                </div>
                            </div>
                          <div class="form-group">
                                <label class="col-sm-2 control-label">更多路径:</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control"  id="colUrl" name="colUrl" value="${desktopColumn.colUrl}"  validate="{required:false,maxlength:384}"/>
                                </div>
                                <label class="col-sm-2 control-label">展示效果:</label>
                                <div class="col-sm-4">
	                                <select  class="form-control" id="showEffect" name="showEffect">
										<option value="0" <c:if test="${desktopColumn == null ||desktopColumn.showEffect == '0'}">selected</c:if>>默认效果</option>
										<option value="1" <c:if test="${desktopColumn.showEffect == '1'}">selected</c:if>>走马灯</option>
										<option value="2" <c:if test="${desktopColumn.showEffect == '2'}">selected</c:if>>幻灯片</option>
									</select>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">数据加载方式:</label>
                                <div class="col-sm-4">
                                		<label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="0" name="dataMode"  <c:if test="${desktopColumn == null ||desktopColumn.dataMode==0}">checked="checked"</c:if>>
                                       	 	<span class="lbl">Service方法</span>
                                        </label>
                                        <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="1" name="dataMode"  <c:if test="${desktopColumn.dataMode==1}">checked="checked"</c:if>>
                                       	 	<span class="lbl">自定义查询方式</span>
                                        </label>
                                </div>
                                 <label class="col-sm-2 control-label">需要分页</label>
                                <div class="col-sm-4">
										<label class="radio-inline">
                                       	 	<input type="radio"  class="ibps"  value="true" name="needPage"  <c:if test="${empty desktopColumn ||desktopColumn.needPage==true}">checked="checked"</c:if>>
                                       	 	<span class="lbl">是</span>
                                        </label>
                                        <label class="radio-inline i-checks">
                                       	 	<input type="radio"  class="ibps"   value="false" name="needPage"  <c:if test="${desktopColumn.needPage==false}">checked="checked"</c:if>>
                                       	 	<span class="lbl">否</span>
                                        </label>
                                </div>
                            </div>
							<div  id="serviceMethod"  class="form-group" <c:if test="${desktopColumn != null && desktopColumn.dataMode !=0}">style="display:none"</c:if>>
								<label class="col-sm-2 control-label">方法路径:</label>
                                <div class="col-sm-10">
                                	<div class="input-group">
	                                  <input type="text" class="form-control"  id="dataFromService" value="${desktopColumn.dataFrom}"  validate="{required:false,maxlength:765}"/>
	                                	<span class="input-group-btn"><button id="setParam" type="button" class="btn  btn-info "><i class="fa fa-cog"></i>&nbsp;&nbsp;参数设置</button> </span>
                                    </div>
                                </div>
                            </div>
                           <div  id="queryAlias"  class="form-group"   <c:if test="${desktopColumn.dataMode !=1}">style="display:none"</c:if>>
								<label class="col-sm-2 control-label">自定义查询:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="dataFromQuery"  value="${desktopColumn.dataFrom}"  validate="{required:false,maxlength:765}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">栏目高度:</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control"  id="colHeight" name="colHeight" value="${desktopColumn.colHeight}"  validate="{required:false,number:true,maxIntLen:10}"/>
                                </div>
                                <label class="col-sm-2 control-label">公共栏目:</label>
                                <div class="col-sm-4">
	                                 <label class="radio-inline">
	                               	 	<input type="radio" class="ibps"  value="true" name="isPublic"  <c:if test="${desktopColumn == null ||desktopColumn.isPublic==true}">checked="checked"</c:if>/>
	                               	 		<span class="lbl">是</span>
	                                </label>
	                                <label class="radio-inline i-checks">
	                               	 	<input type="radio" class="ibps"   value="false" name="isPublic"  <c:if test="${desktopColumn.isPublic==false}">checked="checked"</c:if>/>
	                               	 		<span class="lbl">否</span>
	                                </label>
                                 </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">支持刷新:</label>
                                <div class="col-sm-4">
                                         <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="true" name="supportRefesh"  <c:if test="${desktopColumn == null ||desktopColumn.supportRefesh==true}">checked="checked"</c:if>/>
                                        	<span class="lbl">是</span>
                                        </label>
                                        <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="false" name="supportRefesh"  <c:if test="${desktopColumn.supportRefesh==false}">checked="checked"</c:if>/>
                                        	<span class="lbl">否</span>
                                        </label>
                                </div>
                                <label class="col-sm-2 control-label">刷新时间:</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control"  id="refeshTime" name="refeshTime" value="${desktopColumn.refeshTime}"  validate="{required:false,number:true,maxIntLen:10}"/>
                                </div>
                            </div>
                            <div class="form-group">
                            	<label class="col-sm-2 control-label">是否启用:</label>
							  	<div class="col-sm-4">
									<label class="radio-inline">
									    <input type="radio" name="isEnabled" class="ibps" value="Y"   <c:if test="${empty desktopColumn || desktopColumn.isEnabled=='Y'}">checked="checked"</c:if>  validate="{required:true}"/>
									   	<span class="lbl">启用</span>
								  	</label>
									<label class="radio-inline">
									    <input type="radio" name="isEnabled" class="ibps" value="N"   <c:if test="${desktopColumn.isEnabled=='N'}">checked="checked"</c:if>  validate="{required:true}"/>
									   	<span class="lbl">禁用</span>
								  	</label>
							 	</div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">描述:</label>
                                <div class="col-sm-10">
                                	<textarea class="form-control"  rows="2" cols="10"  id="memo" name="memo">${desktopColumn.memo}</textarea>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">栏目模版:</label>
                                <div class="col-sm-10">
                                	<textarea class="form-control"  id="templateHtml" name="templateHtml" style="width: 100%;height: 220px;">${fn:escapeXml(desktopColumn.templateHtml)}</textarea>
                                </div>
                            </div>
 <%--               <input type="text" class="form-control"  id="dsAlias" name="dsAlias" value="${desktopColumn.dsAlias}"  validate="{required:false,maxlength:384}"/>
                       <input type="text" class="form-control"  id="dsName" name="dsName" value="${desktopColumn.dsName}"  validate="{required:false,maxlength:384}"/>
 --%>                         
					<textarea id="dataParam" name="dataParam" style="display: none;">${fn:escapeXml(desktopColumn.dataParam)}</textarea>
					<input type="hidden" name="dataFrom" id="dataFrom" value="${desktopColumn.dataFrom}">
                    <input type="hidden"  id="groupId" name="groupId" value="${desktopColumn.groupId}"/>
					<input type="hidden" name="id" value="${desktopColumn.id}" />
					</form>
				</div>
		</div>
	</body>
</html>