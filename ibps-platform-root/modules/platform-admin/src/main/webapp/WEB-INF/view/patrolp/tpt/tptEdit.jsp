<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
   
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
   <%@include file="/commons/include/get.jsp"%>
       <f:link href="qtip/jquery.qtip.css"></f:link>
        
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/tpt/tpt.js"></script>
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/basic/deviceCate.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/basic/DeviceDialog.js"></script>
			<script type="text/javascript" src="${ctx}/js/hrbeu/platform/basic/tptTemplateDialog.js"></script>
		
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/tpt/mekf.js"></script>
		<meta name="description" content="">
		<link rel="shortcut icon" href="/favicon.ico">
		<meta name="viewport" content="width=device-width">
	
		<link rel=stylesheet href="${ctx}/js/editorT/libs/bootstrap/css/bootstrap.css" />
		<link rel=stylesheet href="${ctx}/js/editorT/libs/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css" />
		<link rel="stylesheet"href="${ctx}/js/editorT/src/css/graph.editor.css" />
		<link rel="stylesheet" href="${ctx}/js/editorT/styles/main.css" />
		<script type="text/javascript" src="${ctx}/js/editorT/src/common/PropertyPane.js"></script>
		<script type="text/javascript" src="${ctx}/js/editorT/src/graph.editor.js"></script>
		<script type="text/javascript" src="${ctx}/js/lg/ligerComboBox.js"></script>
		<script type="text/javascript" src="${ctx}/js/lg/htCatCombo.js"></script>
		<script src="${ctx}/js/editorT/libs/bootstrap/js/bootstrap.min.js"></script>
		<script src="${ctx}/js/editorT/libs/layout.border.js"></script>
		<script src="${ctx}/js/editorT/libs/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
		<script src="${ctx}/js/editorT/libs/qunee-min.js"></script>
		<script src="${ctx}/js/editorT/src/common/i18n.js"></script>
		<script src="${ctx}/js/editorT/src/common/DomSupport.js"></script>
		<script src="${ctx}/js/editorT/src/common/DragSupport.js"></script>
		<script src="${ctx}/js/editorT/src/common/FileSupport.js"></script>
		<script src="${ctx}/js/editorT/src/common/JSONSerializer.js"></script>
		<script src="${ctx}/js/editorT/src/common/ExportPane.js"></script>
		<script src="${ctx}/js/editorT/src/common/Toolbar.js"></script>
		<script src="${ctx}/js/editorT/src/common/ToolBox.js"></script>
		<script src="${ctx}/js/editorT/src/common/Flowing.js"></script> 
		<script src="${ctx}/js/editorT/src/common/PopupMenu.js"></script>
		<script src="${ctx}/js/editorT/src/common/dynamicImage.js"></script>
		
		<script src="${ctx}/js/plugins/fengmap/map.js"></script>
		<script src="${ctx}/js/lc/patrolp/control/patrolProgram.js"></script>
		 
		
		
		<script src="${ctx}/js/editorT/src/graph.editor.js"></script>
		<script src="${ctx}/js/editorT/scripts/graphs.js"></script>

		<script src="${ctx}/js/editorT/src/common/ArrayList.js"></script>
		<script src="${ctx}/js/editorT/src/common/parseXML.js"></script>
		<script src="${ctx}/js/editorT/src/common/Swimlane.js"></script>
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/ism/busData.js"></script>
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/ism/busDataDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/ism/busDataTree.js"></script>
		
		
		<!-- 李广文-js -->
		<script src="${ctx}/js/hrbeu/platform/tpt/Overview.js"></script>
		<script type="text/javascript" src="${ctx}/js/hrbeu/platform/basic/BandwidthDialog.js"></script>
		<script type="text/javascript">	
	             var  bandwidth = "50";
	             
	             
	             
	    </script>
		<!-- 李广文-js -->
		

		<script src="${ctx}/js/editorT/src/common/CustomServerNode.js"></script>
		<%-- <script src="${ctx}/js/lc/platform/RoutDetail/FlowingSupport.js"></script> --%>

		
		
	<script>
	 function fRandomBy(under, over){   
        switch(arguments.length){   
            case 1: return parseInt(Math.random()*under+1);   
            case 2: return parseInt(Math.random()*(over-under+1) + under);   
            default: return 0;   
        }   
    }  
	 
	 
	</script>
	<style>
		/*强势设置画布容器大小*/
		.importantEditor{
			height: 100%  !important;
			width:100% !important;
		}
		/*设置左边设备列表隐藏*/
		.importantToolbox{
			display:none;
		}
		/*强势设置画布居中显示与充满整个容器*/
		.importantGraph{
			height: 100% !important;
			left:0px !important;
			top:50px !important;
			width:100% !important;
		}
	</style>
</head>

<body onload="tptInit()">

	<div id="dlgModelInfo" class="modal fade">
		<div class="modal-dialog top">
			<div class="modal-content">
				<div class="modal-header">
					<div class="step-2  editable">
						<a href="javascript:void(0);" class="btn btn-default green fa fa-save" name="modal-save-n"style="float: right"><span>&nbsp;保&nbsp;存</span></a>
						<a href="javascript:void(0);" class="btn btn-default red fa fa-back change"  style="float: right;margin-right:5px;"><span>&nbsp;上一步</span></a>
					</div>
					
					<h3 class="modal-title">巡课记录</h3>
				</div>
				<div class="modal-body">
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-12" id="m-title"></div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<label class="fr-control-label">班级：</label>
								<div class="fr-form-block">
									<p class="form-control-static" id="className" style="line-height: 15px;"></p>
								</div>
							</div>
							<div class="col-md-6">
								<label class="fr-control-label">节次：</label>
								<div class="fr-form-block">
									<p class="form-control-static" id="curTime" style="line-height: 15px;"></p>
								</div>
							</div>
							<div class="col-md-12">
								<label class="fr-control-label">教师：</label>
								<div class="fr-form-block">
									<p class="form-control-static" id="tch" style="line-height: 15px;"></p>
								</div>
							</div>
							
						</div>
						<div class="step-1 ">
							<div class="row disEditable hidden">
								<div class="col-md-12">
									<label class="fr-control-label">巡课情况：</label>
									<div class="fr-form-block">
										<p class="form-control-static green" style="line-height: 15px;">正常</p>
									</div>
								</div>
							</div>
							<div class="row editable">
								<div class="col-md-12">
									<label class="fr-control-label">巡课情况：</label>
									<div class="fr-form-block">
										<a href="javascript:void(0);" class="btn btn-success fa fa-ok " name="modal-save-p"  data-dismiss="modal"><span>&nbsp;正&nbsp;常</span></a>
										<a href="javascript:void(0);" class="btn btn-danger fa fa-cancel change" ><span>&nbsp;异&nbsp;常</span></a>
									</div>
								</div>
							</div>
						</div>
						<div class="step-2 hidden">
							<div class="row actTch">
								<div class="col-md-12">
									<label class="fr-control-label">实际上课教师：</label>
									<div class="fr-form-block">
										<input type="text" id="actTch" class="fr-form-control" />
									</div>
								</div>
							</div>
							<div class="row reason" >
								<div class="col-md-12">
									<label class="fr-control-label">说明原因：</label>
									<div class="fr-form-block">
										<input type="text" id="reason" class="fr-form-control" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	 
<!-- markid的作用：markid=-2为拓扑图设计；markid=-1为路由规划；markid=1为查看路由；markid=2为展现方案 ; markid=3已经被占用；markid=4为负载均衡 -->
<input type="hidden" value="${markid}"  id="markid"/>
<div class="panel-toolbar ">
	<div class="buttons">
		<c:if test = "${markid=='-2' }">
			<button type="button" class="btn btn-primary fa fa-save" onClick="savemap()">保存</button>
		</c:if>
		<c:if test = "${markid !='2' }">
			<!-- <a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a> -->
			<input type="hidden" value="${pgId} " id="pgId"/>
		</c:if>
		<c:if test = "${markid=='2' }">
			<a href="${ctx}/platform/task/task/list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
		</c:if>
		<c:if test = "${markid=='3' }">
			
			<a class="btn btn-primary fa "   href="javascript:nodeRoutingRel._calRoutNodes();"   ><span>路由关系计算</span></a>
					 <c:if test="${not empty nodeRoutingList}">
					 <a class="btn btn-primary fa fa-save"   href="javascript:nodeRoutingRel._savePath();"   ><span>保存路径</span></a>
					 </c:if>
		</c:if>
		
		
		
		 
	</div>
</div>
			
<c:if test="${markid=='-1'||markid=='1'}">
		<style>.div1{ position:absolute; right:25%; top:50px; height:0px;width:0px;}</style>
		<textarea rows="0" cols="0" id="reg"  style="display: none;">${rStr}</textarea>
 		<textarea rows="0" cols="0" id="imageNetwork" style="display: none;">${networkStr}</textarea>
 		<textarea rows="0" cols="0" id="tptJson" style="display:none">${tpt.json}</textarea>	
 		<textarea rows="0" cols="0" id="loadTypeStr" style="display:none">${loadTypeStr}</textarea>
 					
 		<textarea rows="0" cols="0" id="actionImages" style="display:none">${actionImages}</textarea>
		<div class="layout" style="float: left; width: 100%; height: 100%;position: relative;" >
			<div id="editor" data-options="region:'center'" ></div>
			 
		</div>
		<div class="graph-editor__property"
			data-options="region:'east', width: '20%', right: 15, min-width: 100, max-width: '300'"
			style="position: absolute; box-sizing: border-box; top: 100px; left: 15px; width: 400px; height: 922px"; id="Pane">
				<iframe id="listFrame" name="listFrame" frameborder="0" src="${ctx}/platform/RoutDetail/routingDetail/list.htm?markid=${markid}&lcid=${id}";
							scrolling="no" marginheight="0" marginwidth="0" width="373px" height="888px">
				</iframe>
		</div>
  
		
		<div class="graph-editor__property"
			data-options="region:'west', width: '20%', right: 15, min-width: 100, max-width: '300'"
			style="float: left; position:absolute; right:15px; top:100px ;width: 500px; height: 922px;" >
			<iframe id="defFrame"  name="defFrame" frameborder="0"
				src="${ctx}/platform/RoutDetail/routDetil/list.htm?type=view";
				scrolling="no" marginheight="0" marginwidth="0"
				width="473px" height="888px">
                </iframe>
		</div>
		
		<%-- <input type="hidden" value="${id}"  id="tptId"/> --%>
		<input type="hidden" value="${tpt.tptName}" id="tptmc"> 
</c:if>

<c:if test="${markid=='3'}">
		<style>.div1{ position:absolute; right:25%; top:50px; height:0px;width:0px;}</style>
		<textarea rows="0" cols="0" id="reg"  style="display: none;">${rStr}</textarea>
 		<textarea rows="0" cols="0" id="imageNetwork" style="display: none;">${networkStr}</textarea>
 		<input type="hidden" id="nodeKeyVal" value="">
		<div class="layout" style="float: left; width: 100%; height: 100%;position: relative;" >
			<div id="editor" data-options="region:'center'" ></div>
		</div>
		<div class="graph-editor__property"
			data-options="region:'east', width: '20%', right: 15, min-width: 100, max-width: '300'"
			style="position: absolute; box-sizing: border-box; top: 100px; left: 15px; width: 400px; height: 750px"; id="Pane">
			
				<iframe id="nodeWestFrame" frameborder="0" src="${ctx}/platform/ism/nodeRoutingRel/westEdit.htm?markid=${markid}&id=${id}";
							scrolling="no" marginheight="0" marginwidth="0" width="400px" height="700px">
				</iframe>
		</div>
		<div class="graph-editor__property" style="float: left; position:absolute; right:15px; top:100px" >
			<iframe id="nodeEastFrame" frameborder="0"
				src="${ctx}/platform/ism/nodeRoutingRel/eastEdit.htm?markid=${markid}&id=${id}&marmc=";
				scrolling="no" marginheight="0" marginwidth="0"

				width="450px" height="720px">

				</iframe>
		</div>
</c:if>

<c:if test="${markid=='4'}">
		<style>.div1{ position:absolute; right:25%; top:50px; height:0px;width:0px;}</style>
		<textarea rows="0" cols="0" id="reg"  style="display: none;">${rStr}</textarea>
 		<textarea rows="0" cols="0" id="imageNetwork" style="display: none;">${networkStr}</textarea>
 		
		<div class="layout" style="float: left; width: 100%; height: 100%;position: relative;" >
			<div id="editor" data-options="region:'center'" ></div>
		</div>
		<div class="graph-editor__property"
			data-options="region:'east', width: '20%', right: 15, min-width: 100, max-width: '300'"
			style="position: absolute; box-sizing: border-box; top: 100px; left: 15px; width: 400px; height: 922px"; id="Pane">
				<iframe id="listFrame" name="listFrame" frameborder="0" src="${ctx}/platform/loadBalancing/loadBalancing/list.htm?lcid=${id}";
							scrolling="no" marginheight="0" marginwidth="0" width="373px" height="888px">
				</iframe>
		</div>
		
		
		<div class="graph-editor__property"
			data-options="region:'west', width: '20%', right: 15, min-width: 100, max-width: '300'"
			style="float: left; position:absolute; right:15px; top:100px ;width: 500px; height: 922px;" >
			<iframe id="defFrame"  name="defFrame" frameborder="0"
				src="${ctx}/platform/loadBalancing/lBEquipment/list.htm?type=view";
				scrolling="no" marginheight="0" marginwidth="0"
				width="473px" height="888px">
				</iframe>
				
		</div>
		<%-- <input type="hidden" value="${id}"  id="tptId"/> --%>
		<input type="hidden" value="${tpt.tptName}" id="tptmc">
</c:if>

<c:if test="${markid=='2' }">
 <!-- 	<div id="testRun">
 		<textarea  id="yaoqi"  style="margin-top:100px; width: 1200px;height: 500px;'"></textarea>
		<input type="text"  id="testTime"/>
		<input type="button"  onclick="fastTime()" value="加速"/>
		<input type="button"  onclick="slowTime()" value="减速"/>
		<input type="button"  onclick="resetTime()" value="还原"/>
	</div> -->
	<textarea rows="0" cols="0" id="reg"  style="display:none;">${rStr}</textarea>
 	<textarea rows="0" cols="0" id="imageNetwork" style="display:none;">${networkStr}</textarea>
 	<textarea rows="0" cols="0" id="tptJson" style="display:none">${tpt.json}</textarea>
 	<textarea rows="0" cols="0" id="loadTypeStr" style="display:none;">${loadTypeStr}</textarea>
 	<textarea rows="0" cols="0" id="actionImages" style="display:none;">${actionImages}</textarea>
 	<input type="hidden"  id="beautifulNode"  value=""/>
 	<div class="layout" style="float: left; width: 100%; height: 100%;position: relative;" >
		<div id="editor" data-options="region:'center'" ></div></div>
	</div>
	<div style="position: absolute; box-sizing: border-box; top: 100px;  width: 100%; height: 31px;border-bottom: 1px solid #dddddd;" id="Pane">
			
		 <iframe id="listFrame" name="actionFrame" frameborder="0" src="${ctx}/platform/basic/devActPlan/detailList.htm?lcid=${id}";
							scrolling="no" marginheight="0" marginwidth="0" width="100%" height="30px">
		</iframe>
	</div>
</c:if>
       <c:if test="${markid=='-2'}">
			<div class="layout" style="float: left; width: 100%; height: 100%;position: relative;">
				<div id="editor" data-options="region:'center'"></div>
			</div>
		 
			<div class="graph-editor__property"
				data-options="region:'east', width: '20%', right: 15, min-width: 100, max-width: '300'"
				style="position: absolute; box-sizing: border-box; top: 40px; right: 15px; width: 300px; height: 922px"
				; id="Pane">
				<h4 style="display: inline-block;">
					<strong>属性面板</strong>
				</h4>
		
		<%-- <input type="hidden" value="${id}"  id="tptId"/> --%>

		<input type="hidden" value="${markid}"  id="markid"/>
		<input type="hidden" id="nodeKeyVal" value="">
		
	
 <form class="form-horizontal" id="form1">
 					<%-- <input type="text" value="${rStr}" id="reg" /> --%>
 					<textarea rows="0" cols="0" id="reg"  style="display:none">${rStr}</textarea>
 					<textarea rows="0" cols="0" id="imageNetwork" style="display:none">${networkStr}</textarea>
 					<textarea rows="0" cols="0" id="tptJson" style="display:none">${tpt.json}</textarea>
 					<textarea rows="0" cols="0" id="loadTypeStr" style="display:none">${loadTypeStr}</textarea>					
 					<textarea rows="0" cols="0" id="actionImages" style="display:none">${actionImages}</textarea>
 					<input type="hidden" name="tptId" id="tptId" value="${tptId} "/>
 					<input type="hidden" name="course" id="course" value="${course} "/>
 					<div id="hsvflat"></div>
					<div clss="class-group">													
						<div class="form-group">
							<label class="col-sm-3 control-label font-small">
								名称*
							</label>
							<div class="input-group input-group-sm col-sm-6 ">
								<input class="form-control col-md-offset-1" value="${tpt.tptName}"
									name="tptmc" id="subject" onBlur="autoGetTableKey(this)">
							</div>
						</div>
						<%-- <div class="form-group">
							<label class="col-sm-3 control-label font-small">
								编号(key)*
							</label>
							<div class="input-group input-group-sm col-sm-6">
								<input class="form-control  col-md-offset-1" value="${tpt.tptbh}"
									name="tptbh" id="defKey"
									<c:if test="${status>'0'}"> readonly="readonly"</c:if> />
							</div>
						</div> --%>
						<%-- <div class="form-group" >						
							<label class="col-sm-3 control-label font-small">
								类型*
							</label>
							<div class="finput-group input-group-sm col-sm-6 " style="left: +1"
								id="dialogCategory" onClick="Remove()">
								
								<input class="form-control col-md-offset-1" catKey="NETWORKMAP_TYPE"
									valueField="typeId" value="${tpt.tptlx}" name="tptlx"
									 id="typeId" style="text-align:left"/>
								
							</div>
						</div> --%>
						<!-- <div class="form-group">
							<label class="col-sm-3 control-label font-small">
								模板
							</label>
							<div class="input-group input-group-sm col-sm-6">
								 
								<input class="form-control  col-md-offset-1" value="${descp}"
									name="descp" id="descp">
									
								<select id="istemplate"><option value="1">是</option><option value="0">否</option></select>
							</div>
						</div>	 -->					
					</div>
				</form>
			 <!-- 李广文     --  鹰眼图-->
            <div id="overview" style="width: 250px;height: 200px;position: absolute; right: 25px; bottom: 180px; background: #FFF"></div>
            <!-- 李广文  -->
			</div>
			
		</c:if>
		
		<c:if test="${markid=='5'}">
			<div class="layout" style="float: left; width: 100%; height: 100%;position: relative;">
				<div id="editor" data-options="region:'center'"></div>
			</div>
		 
			<div class="graph-editor__property"
				data-options="region:'east', width: '20%', right: 15, min-width: 100, max-width: '300'"
				style="position: absolute; box-sizing: border-box; top: 40px; right: 15px; width: 300px; height: 922px"
				; id="Pane">
				<h4 style="display: inline-block;">
					<strong>属性面板</strong>
				</h4>
		
		<%-- <input type="hidden" value="${id}"  id="tptId"/> --%>

		<input type="hidden" value="${markid}"  id="markid"/>
		<input type="hidden" id="nodeKeyVal" value="">
		
	
 <form class="form-horizontal" id="form1">
 					<%-- <input type="text" value="${rStr}" id="reg" /> --%>
 					<textarea rows="0" cols="0" id="reg"  style="display:none">${rStr}</textarea>
 					<textarea rows="0" cols="0" id="imageNetwork" style="display:none">${networkStr}</textarea>
 					<textarea rows="0" cols="0" id="tptJson" style="display:none">${tpt.json}</textarea>
 					<textarea rows="0" cols="0" id="loadTypeStr" style="display:none">${loadTypeStr}</textarea>					
 					<textarea rows="0" cols="0" id="actionImages" style="display:none">${actionImages}</textarea>
 					<input type="hidden" name="tptId" id="tptId" value="${tptId}"/>
 					<input type="hidden" name="course" id="course" value="${course}"/>
 					<div id="hsvflat"></div>
					<div clss="class-group">													
						<div class="form-group">
							<label class="col-sm-3 control-label font-small">
								名称*
							</label>
							<div class="input-group input-group-sm col-sm-6 ">
								<input class="form-control col-md-offset-1" value="${tpt.tptName}"
									name="tptmc" id="subject" onBlur="autoGetTableKey(this)">
							</div>
						</div>
						<%-- <div class="form-group">
							<label class="col-sm-3 control-label font-small">
								编号(key)*
							</label>
							<div class="input-group input-group-sm col-sm-6">
								<input class="form-control  col-md-offset-1" value="${tpt.tptbh}"
									name="tptbh" id="defKey"
									<c:if test="${status>'0'}"> readonly="readonly"</c:if> />
							</div>
						</div> --%>
						<%-- <div class="form-group" >						
							<label class="col-sm-3 control-label font-small">
								类型*
							</label>
							<div class="finput-group input-group-sm col-sm-6 " style="left: +1"
								id="dialogCategory" onClick="Remove()">
								
								<input class="form-control col-md-offset-1" catKey="NETWORKMAP_TYPE"
									valueField="typeId" value="${tpt.tptlx}" name="tptlx"
									 id="typeId" style="text-align:left"/>
								
							</div>
						</div> --%>
						<!-- <div class="form-group">
							<label class="col-sm-3 control-label font-small">
								模板
							</label>
							<div class="input-group input-group-sm col-sm-6">
								 
								<input class="form-control  col-md-offset-1" value="${descp}"
									name="descp" id="descp">
									
								<select id="istemplate"><option value="1">是</option><option value="0">否</option></select>
							</div>
						</div>	 -->					
					</div>
				</form>
			 <!-- 李广文     --  鹰眼图-->
            <div id="overview" style="width: 250px;height: 200px;position: absolute; right: 25px; bottom: 180px; background: #FFF"></div>
            <!-- 李广文  -->
			</div>
			
		</c:if>
		
	
		<script type="text/javascript">
		 if(${markid }!="-2"){
			
			  //alert(markid);
			  $("div.graph-editor__toolbox").addClass("importantToolbox");
		 	  $("div.graph-editor__toolbar").addClass("importantToolbox"); 
		 	 $("div.graph-editor__property").addClass("importantToolbox"); 
		 	 
			
		  } 
		 Q.Edge.prototype.angle=Math.PI *0.5;
		 Q.ShapeNode.prototype.busLayout = true;
		var  markid = "${markid}";
	
	
		
		 $(function () {
			
			//左侧设备列表动态加载
			// var jsonStr = $("#reg").val();
			// var imageNetwork =$("#imageNetwork").val();
			// var jsonObj = JSON.parse(jsonStr);
			// var imagePathMap = new Map();
			 
		     /* for(var reg in jsonObj){
		    	 //图片地址注册
		    	  Q.registerImage(jsonObj[reg].cate_key,jsonObj[reg].file_ptah);
		    		
		    	  imagePathMap.put(jsonObj[reg].cate_key,jsonObj[reg].file_ptah);
		  
		     } */
		 

		    
		    //左侧设备图片信息转为json对象
			//var  networkmap = JSON.parse(imageNetwork); 
			
			//var result = new Array();
			//左侧json对象放入数组
			//result = networkmap;
			
			var lastNode = null;
			 Q.Defaults.EDGE_BUNDLE_EXPANDED = false;
	    	 Q.Defaults.GROUP_EXPANDED = false;
	    	 
	    	 if(markid==5){
	    		 
	    		 var params = frameElement.dialog.params, defaultMapOpt = {
	 	 				showMultiGroup : !0,
	 	 				showZoom : !0,
	 	 				showCompass : !0,
	 	 				clickable : !0
	 	 			},options = $.extend({}, defaultMapOpt, params.options);

	 	    	 var fm = new FengMap( options ); 
	 	    	var d = $(document);
	 	    	d.on('click' , 'a.fa-ok' , function(){
	 	    		//alert("正常");
				});
	 	    	d.on('click' , 'a[name^="modal-save"]' , function(){
	 	    		$('#dlgModelInfo').modal('hide');
	 	    		var params = frameElement.dialog.params 
	 	    			,data={
							className : $('#className').text(),
							actTch : $('#actTch').val(),
							reason :$('#reason').val(),
							course : $('#course').val()
						};
						params.modalSaveFuction( $(this).attr('name').split('-')[2] == 'p' , data);
				});
	 	    	d.on('click' , 'a.change' ,function(){
					patrolProgram.change();
				});
	 	    	 
	    	 }
	    	 
			//var result;

	    	 
            //--------------------------------editor开始-------------------------------

			 $('#editor').graphEditor({callback: function(editor){
					
	        		 graph = editor.graph;
	        			
	        		 
				
	        		if( markid==5 ){
	        		 	//graph.setStyle("")
	        		 	//** 李广文--  鹰眼图js
		   	            var overview = new Q.Overview(document.getElementById('overview'), graph);
	        		 	
		   	         	//* 李广文 
	        			graph.onclick=function(evt){//点击节点出现属性列表
		   	         		//alert("节点属性");
		        			var node = graph.getElementByMouseEvent(evt);
		        			//alert("name:"+typeof(node.name));
		        			//searchLine(node);
		        				//alert("name:"+node.name);
		        			    //change(node);	
		        			    
		        			    if(node.properties.cateKey =='SubNetwork' || typeof(node.name)=='undefined'){
		        			    	return;
		        			    }
		        			    var $pgId = $("#pgId").val();
		        		
		        			    if($pgId !=''){
		        			    	var $id =$pgId ;
		        			    }else{
		        			    	var $id = '';
		        			    }
		        			    
		        			    
		        			    
		        			    try{
		        			    	patrolProgram.showModal(node.name,$id,$('#course').val());
		        			    }catch(e){
		        			    	
		        			    }
		        			    
		        			    
		        		}
		        	}
	        		if(markid==2){
	        			graph.addCustomInteraction({
	        		        ondblclick: function (evt) {
	        		        	var type = $("#defFrame").contents().find("#type").val()
		        		        if(type != "edit"){
		        		            var element = evt.getData();
		        		            if (element instanceof CustomServerNode) {
		        		            
		        		                element.showDetail = !element.showDetail;
		        		            }
		        		        }
	        		        }
	        			})
	        		}
		        	
	        		    	        		    	        		        		    
	        		    
	        	 var timer1 = setTimeout(function A() {
        			graph.forEach(function (node) {
            			if (!(node instanceof CustomServerNode)) {
                			return
           				}
           
            			node.set("tpcc", Math.random());
            			node.set("incoming", formatNumber(Math.random() * 100, 2, "GB"));
            			node.set("outgoing", formatNumber(Math.random() * 100, 2, "GB"));
        			})
        			timer1 = setTimeout(A, 2000)
    			})
	        		
	     
	   	    	 
		    		graph.interactionDispatcher.addListener(function (evt) {

		    			  if(evt.kind == Q.InteractionEvent.ELEMENT_CREATED && evt.data instanceof Q.ShapeNode){
		    		            var interactionProperties = graph.interactionProperties;
		    		            if(interactionProperties && interactionProperties.stroke){
		    		                evt.data.setStyle(Q.Styles.SHAPE_STROKE, interactionProperties.stroke);
		    		                evt.data.name="";
		    		            }
		    			  }
		    				    			
			    		
	    				//alert("组展开");
	        			if (evt.kind == Q.InteractionEvent.GROUP_EXPANDED) {
	        				//alert("GROUP_EXPANDED");
	            			var group = evt.data;
	            			graph.callLater(function () {
	                			onGroupExpandedChange(group);
	            			})
	        			}
	        			 if(evt.kind == Q.InteractionEvent.ELEMENT_CREATED){//拖拽新节点
	        				 //alert("拖拽");
	        			 	var element = evt.data;
	        			 	element.size={width: 40,height:40};
	        			 	
	        			 	if(element._className!= "Q.Edge" && element._className!= "Q.Node"){//拖拽节点
	        			 		
	        			 		
	        			 		element.setIcon(element.image);
	        			 		if(element.parent){
		        			 		var par=element.parent;//组节点
		        			 		var iii=par.bindingUIs.get(0).ui.data;
		        			 		
		        			 		var num_i=par.childrenCount;//求组内节点个数
		        			 		if(num_i==1){
			        			 		var label = new Q.LabelUI(''+iii+"."+num_i);//生成编号
					                	label.position = Q.Position.LEFT_TOP;//位置
					                	label.anchorPosition = Q.Position.LEFT_BOTTOM;   //位置
					                	label.type = 'id';
					                	label.visible = false;
					                	element.addUI(label);
					                
					                	element.invalidate();
		        			 		}else{
		        			 			var node_i=0;
		        			 			
		        			 			
		        			 			par.forEachChild(function(node){
									    	if(node.bindingUIs){
										    	var labelUI = node.bindingUIs.get(0);
												var lable_node = labelUI.ui.data;
												var ii=lable_node.lastIndexOf(".");
												var i_i=lable_node.substring(ii+1);
												//alert(i_i);
												if(parseInt(i_i)>=node_i){
													node_i=parseInt(i_i);
												}
									    	}
										});
										node_i++;
										var label = new Q.LabelUI(''+iii+"."+node_i);//生成编号
					                	label.position = Q.Position.LEFT_TOP;//位置
					                	label.anchorPosition = Q.Position.LEFT_BOTTOM;   //位置
					                	label.type = 'id';
					                	label.visible = false;
					                	element.addUI(label);
					                	
					                	element.invalidate();
		        			 			
		        			 		}
	        			 	}else{
	        			 		var nnn=graph.graphModel.length;
	        			 		//alert(nnn);
	        			 		if(nnn==1){
	        			 			
	        			 			var label = new Q.LabelUI('' + nnn);//生成编号
				                	label.position = Q.Position.LEFT_TOP;//位置
				                	label.anchorPosition = Q.Position.LEFT_BOTTOM;   //位置
				                	label.type = 'id';
				                	label.visible = true;
				                	element.addUI(label);
				                	var labelUI = element.bindingUIs.get(0);
									var bpmId = labelUI.ui.data;
									element.set("BpmId",bpmId);
				                	
				                	
				                	element.invalidate();
	        			 		}else{
	        			 			
	        			 			var node_j=0;
	        			 			graph.graphModel.forEach(function(node){
	        			 				if(!node.parent){
	        			 					if(node.bindingUIs){
										    	var labelUI = node.bindingUIs.get(0);
												var lable_node = labelUI.ui.data;
												var ii=lable_node.lastIndexOf(".");
												var i_i=lable_node.substring(ii+1);
												//alert(i_i);
												if(parseInt(i_i)>=node_j){
													node_j=parseInt(i_i);
												}
									    	}
	        			 				}
	        			 			});
	        			 			node_j++;
										var label = new Q.LabelUI(''+node_j);//生成编号
					                	label.position = Q.Position.LEFT_TOP;//位置
					                	label.anchorPosition = Q.Position.LEFT_BOTTOM;   //位置
					                	label.type = 'id';
					                	label.visible = true;
					                	element.addUI(label);					                	
					                	var labelUI = element.bindingUIs.get(0);
										var bpmId = labelUI.ui.data;
										element.set("BpmId",bpmId);
										//alert("num:"+Q.nodeCnt[element.properties.property]);
					                	element.invalidate();
					                	
	        			 		}
	        			 		
	        			 	}
	        			 	
	        			 }else{  //拖拽线
	        	
	        			 		node_num_d();

	        			 }
	        			 
				        }
	        			
	    			})        		        		
				 		
				

				    
				    Q.nodeArray= new Array();
			        Q.edgeArray= new Array();
			        Q.nodeCnt = {};
			        Q.nodeNum = 0;
			       	Q.edgeCnt = 0;
			      
			       
			     //拖拽新的节点自动生成节点ID
	          var nameIndex = 1;  //编号
				graph.onElementCreated=function (element, evt, dragInfo) {//元素，回调函数，拖拽信息
					if(!element.parent && this.currentSubNetwork){
						element.parent = this.currentSubNetwork;
					}
				
			if(element instanceof Q.Edge){
				element.set("isFlowing",false);
				element.set("canFlowing",true);
			}
			
	   		
	   		if(element instanceof Q.Node){
	   		        
	   				Q.nodeNum++;
		        		if(element.name == 'Node'){
		        			element.properties.property = 'Node';
		        			element.properties.CateKey = 'Node';
		        		}
		        		var nodeNum = hasNode(element.properties.property);
		        		//alert("nodeNum:"+nodeNum);
		        		 if(nodeNum ==0){
			        			Q.nodeCnt[element.properties.property] = 1;
			        			//alert("fuck");
			        		}
			        		else{
			        			
			        			var currentCount = nodeNum+1
			        			//alert("currentCount:"+currentCount);
			        			Q.nodeCnt[element.properties.property] = currentCount;
			        		} 
		        		
		        		/* if(!Q.nodeCnt[element.properties.property]){
		        			Q.nodeCnt[element.properties.property] = 1;
		        			//alert("fuck");
		        		}
		        		else{
		        			
		        		
		        			Q.nodeCnt[element.properties.property] += 1;
		        		} */
		      
		        		var nodeId = element.properties.property + "_"+Q.nodeCnt[element.properties.property];
		        		var catekey = element.name;
						//element.set("BpmId",bpmId);//节点ID
						//var labelUI = element.bindingUIs.get(0);
						//var nodeKeyVal = labelUI.ui.data;
						//element.set("nodeNo",nodeKeyVal);
						element.set("cateKey",catekey);
						element.set("deviceName","");//绑定设备名称
						element.set("deviceId","");//绑定设备ID
						element.set("borderColor","");
						element.set("nodeId",nodeId);
					
						if(element._className == "Q.ShapeNode" && element.properties.cateKey == "Line" ) {
							element._className = "Q.Bus";
							element.set("bandwidth",bandwidth);
						}
							
						/**				
						for(item in result){
		        			var im = result[item];
		        			for(it in im['images']){
		        				var i = im['images'][it];
		        				if(i.properties){
		        					var ikeys = Object.keys(i.properties);
		        					if(element.name == i.properties.name){
		        					element.set("bpmNodeType",i.properties.nodetype);
		        					for(key in ikeys){
		        						if(ikeys[key] != 'name' && ikeys[key] != 'nodetype' && ikeys[key] != 'size'){
		        							
		        								element.set(ikeys[key],(i.properties)[ikeys[key]]);
		        							}
		        						}
		        					}		
		        				}
		        				
		        			}
		        		}
					**/
	   		}
				
	   		// ***  李广文 - 链路edge 属性添加 ****
	   		
	   		else if(element instanceof Q.Edge){
				//alert(element.from.properties.property  == "StartEvent");
					element.set("isFlowing",false);
					element.set("canFlowing",true);
    			if(element.from.properties.property  == "StartEvent" && element.to.properties.property  == "EndEvent"){
    				//alert("invalid edge from begin to end with no intermediate node");
    				model.remove(element);
    			}
    			else if(element.to.properties.property  == "StartEvent" || element.from.properties.property  == "EndEvent"){
    				//alert("边连接错误！");
    				model.remove(element);
    			}
    			else{
    				//Q.edgeCnt++;
        			/* bpmEdgeId = "sequenceFlow" + Q.edgeCnt;
        			element.set("bpmEdgeId",bpmEdgeId); */
        			//bandwidth = "100";
        			element.set("bandwidth",bandwidth);
        			element.setStyle('arrow.to', false);
        			element.name = null;
        			//element.setStyle('arrow.to', false);
        			//element.angle = Math.PI / 2;
        		//	alert();
    			}
    			
    		}
	   		   //将Q.ShapeNode 转变为Q.Bus ,依据catekey = line 修改
	   		  
				
	   		//*** 李广文
	   		
		}
				  
	        		//加载拓扑图的json串
	        		var model = graph.graphModel;
	        
	        		var newdata = $("#tptJson").val();
	        		//alert("json:"+newdata.toString());
	           		this.graph.parseJSON(newdata);
	   
		         	 
		   
		         	   if(${markid }=="1")
		         		{
		         	      var overview = new Q.Overview(document.getElementById('overview'), this.graph);
		         		 }
		         	//* 李广文 
		         	
	           		function change(node){
	           			//点击节点出现属性列表 
	           			$("#nodeH4").remove();
	           			$("#div3").html("");
	           			$("#form2").html("");
	           			$("#div3").remove();
	           			$("#form2").remove();
	           			var pane = $("#Pane").get()[0];
	           			
	           			nodeArray = Q.nodeArray;
	           			nodeCnt = Q.nodeCnt;
	           			
	           			if(pane.childNodes.length){
	           				var form1 = document.getElementById("form1");
	           			 	var form2 = document.createElement("form");
	           			 	var div3 = document.createElement('div');
	           			 	var h4 = document.createElement("h4");
	           			 	h4.style.fontWeight = "bold";
	           			 	h4.style.display = "inline-block";
	           			 	h4.style.marginTop = "1cm";
	           			 	h4.id = "nodeH4";
	           			 	
	           			 	pane.appendChild(h4);
	           			 	
	           			 	
	           			 	if(node instanceof Q.Node){
	           			 		//alert("what");
	           			 		h4.textContent = "节点属性";
	           			 		div3.className = 'btn-group col-md-offset-5';
	           			 		div3.Postition = "fixed";
	           			 		//var bt = document.createElement("button");
	           				 	//bt.type = "button";
	           				 	//div3.id = "div3";
	           				 	//bt.id = "bt1";
	           				 	//bt.className = "btn btn-default";
	           				 	//bt.onclick = "show()";
	           				 	//bt.textContent = "显示图表";
	           				 	//div3.appendChild(bt);
	           				 	pane.appendChild(div3);
	           				 	form2.id = "form2";
	           				 	form2.className="form-horizontal";
	           				 	pane.appendChild(form2);
	           				 	var div = document.createElement("div");
	           				 	div.className = "class-group";
	           				 	form2.appendChild(div);
	           				 //var data = ['节点名称','节点编号','节点ID','设备名称','节点颜色'];
	           				 	var data = ['节点名称'];
	           				 	for(i =0; i < data.length; i++){
	           				 		var div1 = document.createElement('div');	
	           				 		div1.className = 'form-group';
	           					 	
	           					 	var label1 = document.createElement('label');
	           					 	var div11 = document.createElement('div');
	           					 	var input1 = document.createElement('input');
	           					 	input1.className = "form-control col-md-offset-2 input-lg";
	           					 	input1.id = data[i];
	           					 	div11.appendChild(input1);
	           					 	div11.className = "input-group input-group-sm col-sm-6";
	           					 	label1.className = "col-sm-4 control-label font-small ";
	           					 	label1.textContent = data[i];
	           					 	
	           					
		           				 
	           					 	
	           					 	div1.appendChild(label1);
	           					 	div1.appendChild(div11);
	           					 	
	           						
	           						
	           					 	div.appendChild(div1);
	           					 	if(i == 0){
	           					 		div1.style.marginTop = '1cm';
	           					 		input1.value=node.name;
	           					 		input1.id = 'nodeName'
	           					 		
	           					 	}
	           					 	
	           					 	if(i == 1){
	           					 		//节点ID 对应CateKey
	           					 		input1.value=node.properties.BpmId;
	           					 		//$("#节点ID").attr("readonly","readonly");
	           					 	}
	           					 	if(i==2){
	           					 		//input1.value=node.bindingUIs.get(0).ui.data;
	           				input1.value	=	node.properties.nodeId;
	           					 	//alert(input1.value);
	           					 		$("#nodeKeyVal").val(input1.value);
	           					 
	           					 		$("#beautifulNode").val(input1.value);
	           					 		//alert($("#nodeKeyVal").val());
	           					 		$("#节点编号").attr("readonly","readonly");
	           					 	}
	           					 	if(i==3){
	           					 		input1.value=node.properties.deviceName;
	           					 		$("#设备名称").attr("readonly","readonly");
	           					 	}if(i==4){
	           					 	input1.className="jscolor";
	           						 input1.value = "ab2567";
	           					 	}
	           				 	
	           				 	}
	           				 	
	           				 
	           				 	
	           				 	var btn1Obj = document.getElementById("subDefKey");
	           				 		$('#nodeName').keyup(function(e){inputHandler(node);});
	           				 		$('#nodeName').focus(function(e){inputHandler(node);});
	           				 		$('#subDefID').focus(function(e){inputHandler1(node);});
	           				 		
	           				 	//**李广文--结点换新 --
	           				 	/*  var div13 = document.createElement('div'); 
        						    var btn2 = document.createElement('input'); 
        						    btn2.type = 'button';
        						    btn2.className = "btn btn-primary fa";
        						    btn2.style.margin="0 auto";
        						    btn2.value = '结点换新 ';
        						    div13.appendChild(btn2);
        						    div13.className = "input-group input-group-sm col-sm-4";
        						    div13.style.margin="0 auto";
        						    div13.style.marginTop = '1cm';
        						 btn2.addEventListener('click', function() {
	           						   // alert("结点换新");
	           						 graph.forEach(function (element) {
	           						    if(element  instanceof Q.Node)
	           						    	{
	           						    	 //换结点类名
	           						    	 if (element._className == "Q.Node")
	           						    	{
	           						        
	           						        element._className = "CustomServerNode"; 
	           						    	element.set("cpu",0.41006104836787016);
	           						    	element.set("memory",0.2204812701208272);
	           						    	element.set("incoming","25.05GB");
	           						    	element.set("outgoing","2.56GB");
	           						    	element.size=null;
	           						    	}
	           						     
	           						    	
	           						    	}
	           						 });
	           						 
	           						}, false); */
        						    div1.appendChild(div13);
	           					 	//div.appendChild(div1);
	           					 	//**-- 李广文--结点换新
	           				 	}
	           				 	else{                      //链路属性面板编辑-- 添加带宽属性--李广文
	           				 		h4.textContent = "Edge";
	           				 		var div = document.createElement("div");
	           					 	div.className = "class-group";
	           					 	form2.id = "form2";
	           						form2.className="form-horizontal";
	           						pane.appendChild(form2);
	           					 	
	           					 	var div = document.createElement("div");
	           					 	div.className = "class-group";
	           					 	form2.appendChild(div);
	           					 	//var data = ['Edge Width','Edge Color','BandWidth'];
	           					 	var data = ['Edge Width','Edge Color','带宽(/M)'];
	           					 	for(i = 2; i < data.length; i++){
	           					 	var div1 = document.createElement('div');	
	           					 		 div1.className = 'form-group';
	           						 	
	           						 	var label1 = document.createElement('label');
	           						 	var div11 = document.createElement('div');
	           						    var input1 = document.createElement('input');
	           						    var div12 = document.createElement('div'); 
	           						    var btn1 = document.createElement('input'); 
	           						    btn1.type = 'button';
	           						    btn1.className = "btn btn-primary fa";
	           						    btn1.style.margin="0 auto";
	           						    btn1.value = '全部取消箭头';
	           						    div12.appendChild(btn1);
	           						    div12.className = "input-group input-group-sm col-sm-4";
	           						    div12.style.margin="0 auto";
	           						    div12.style.marginTop = '0.5cm';
	           						    btn1.addEventListener('click', function() {
	           						   // alert("全部取消箭头！");
	           						 graph.forEach(function (element) {
	           						    if(element  instanceof Q.Edge)
	           						    	{
	           						    	element.setStyle('arrow.to', false);
	           						    	}
	           						 });
	           						 
	           						}, false);
	           						    
	           						    
	           						 var div13 = document.createElement('div'); 
	           						    var btn2 = document.createElement('input'); 
	           						    btn2.type = 'button';
	           						    btn2.className = "btn btn-primary fa";
	           						    btn2.style.margin="0 auto";
	           						    btn2.value = '全部设置默认带宽 ';
	           						    div13.appendChild(btn2);
	           						    div13.className = "input-group input-group-sm col-sm-4";
	           						    div13.style.margin="0 auto";
	           						    div13.style.marginTop = '0.5cm';
	           						 btn2.addEventListener('click', function() {
		           						   // alert("全部设置默认带宽 ");
		           						 graph.forEach(function (element) {
		           						    if(element  instanceof Q.Edge)
		           						    	{
		           						    	/*element.angle = null;
		           						    	element.styles = null;
		           						    	element.edgeType ="orthogonal.V.H";*/
		           						    	element.set("bandwidth",100);
		           						    	//element.angle = Math.PI / 2;
		           						    	}
		           						 });
		           						 
		           						}, false);
	           						 
	           						      
	           						 var div14 = document.createElement('div'); 
	           						    var btn3 = document.createElement('input'); 
	           						    btn3.type = 'button';
	           						    btn3.className = "btn btn-primary fa";
	           						    btn3.style.margin="0 auto";
	           						    btn3.value = '全部取消链路名称  ';
	           						    div14.appendChild(btn3);
	           						    div14.className = "input-group input-group-sm col-sm-4";
	           						    div14.style.margin="0 auto";
	           						    div14.style.marginTop = '0.5cm';  
	           						 btn3.addEventListener('click', function() {
		           						  //  alert("全部取消链路名称！");
		           						 graph.forEach(function (element) {
		           						    if(element  instanceof Q.Edge)
		           						    	{
		           						    	element.name = null;
		           						    	}
		           						 });
		           						 
		           						}, false);
	           						 	input1.className = "form-control col-md-offset-2";
	           						 	div11.appendChild(input1);
	           						 	div11.className = "input-group input-group-sm col-sm-4";
	           						 	label1.className = "col-sm-4 control-label font-small ";
	           						 	label1.textContent = data[i];
	           						 	div1.appendChild(label1);
	           						 	div1.appendChild(div11);
	           						    div1.appendChild(div12); 
	           						    div1.appendChild(div13); 
	           						    div1.appendChild(div14); 
	           						 	div.appendChild(div1);
	           						 	
	           						 	if(i == 0){
	           						 		div1.style.marginTop = '1cm';
	           						 	}
	           						 	else if(i == 1){
	           						 		input1.type = "color";
	           						 	}
	           						 	else {
	           						 	       div1.style.marginTop = '1cm';
	           						 	       input1.value=node.properties.bandwidth;
	           						 	       input1.setAttribute('readOnly',true);

	           						 	       
	           						    }  
	  
	           				 		}
	           			 		}
	           			 	
	           			}
	           		}
	    
	           		//$("#ifm").contents().find("#btnOk").click();
	    function iFrameHeight() {   
	    	//alert("onload");
	    	var ifm= document.getElementById("defFrame");   
	    	var subWeb = document.frames ? document.frames["defFrame"].document : ifm.contentDocument;   
	    	if(ifm != null && subWeb != null) {
	    	      ifm.height = document.body.clientHeight;
	    	      ifm.width = subWeb.body.scrollWidth;
	    	}   
	   } 
	    

	    		  var repeat = 0;
	    		  var node1 = 0;
	    		  var xuhao = 0;
	   //双击在路由规划表中添加信息
		graph.ondblclick = function(evt) {
				
			var node = graph.getElementByMouseEvent(evt);//zhengchongshan
			var modeId = $("#markid").val();
 			if((modeId == -1)&& defFrame.window.getType() == "edit"){
 				//alert("路由规划");
 				
            if(repeat != '0'){
                if(!node.hasEdgeWith(node1)){ 
                       DialogUtil.error("两个节点之间没有连接，请重新选择.......");
                    }else{ 
                    	var data = evt.getData();
         				var cateKey = data.properties.cateKey;
         				xuhao++;
         				defFrame.window.addroutDetil(data,xuhao);
         				node1 = node;
                        }
                }else{ 
                	var data = evt.getData();
     				var cateKey = data.properties.cateKey;
     				repeat = defFrame.window.addroutDetil(data,xuhao);
     				//repeat = 1;
     				if(repeat==1){ 
     					node1 = node;
         				}else{ 
                             node1 = 0;
             				}
     				
                    }

 			}else if(modeId == 3){
 				//alert("双击部署");
 				var data0 = evt.getData();
 				var data1=data0.bindingUIs.get(0).ui.data;
 				//alert("data1:"+data1);
 				var inputSize = $("input[value='点击节点']").size();
 				//alert("size:"+$("input[value='点击节点']").size());
 				var size=0;
 				$('#nodeEastFrame').contents().find('input[value="点击节点"]:eq(0)').val(data1);  
 				
 				'input[name="startNodeKey"]'
 			}else if((modeId == 4) && defFrame.window.getType() == "edit"){
 				//alert("负载均衡");
 				var data = evt.getData();
 				var cateKey = data.properties.cateKey;
 				defFrame.window.resetDeviceType();
 				if(listFrame.window.getDeviceType() == ""){
 	 				//alert("123456");
 					listFrame.window.setDeviceType(cateKey)

 					defFrame.window.addlBEquipment(data);
 	 			}else if(listFrame.window.getDeviceType() == cateKey){
 	 				defFrame.window.addlBEquipment(data);
 	 	 		}else{
 	 	 			DialogUtil.error("只能选择同一类型的负载均衡设备");
 	 	 	 	}
 			}
			
 			
 		
 			
 				
		}
	           graph.moveToCenter();
	          // initTreeAndTable();
	         }});
			 //----------------editor结束----------------------------------
			
			  //----------------仿真展现设置------------------------------
			  if(${markid }!="-2"){
				//----------------开始进行隐藏------------------------------
				  $("#editor").addClass("importantEditor");
				  $("div.graph-editor__toolbox").addClass("importantToolbox");
				  $("#editor > div.graph-editor__canvas.Q-Graph").addClass("importantGraph");
				//----------------隐藏结束------------------------------
			  }
			if(${markid }=="2"){
				  $("#editor > div.graph-editor__toolbar > div:nth-child(2) > div:nth-child(5) > div").css({"width":"19px","height":"19px"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(2) > div:nth-child(6) > div").css({"width":"19px","height":"19px"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(2) > div:nth-child(8) > div").css({"width":"19px","height":"19px"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(2) > div:nth-child(9) > div").css({"width":"19px","height":"19px"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(1) > div").css({"background-image":"none"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(1) > div").append("<span>当前展现时间：</span>&nbsp  <span id=\"displayNow\" style=\"font-size:13px;color:red;\">00:00:00</span>");
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(2) > div").css({"background-image":"none"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(2) > div").append("<span>步长值：</span>&nbsp <select id=\"displayStep\" style=\"border:0px;width:51px;height:19px;\"><option value=\"1\">12秒</option><option value=\"2\">24秒</option><option value=\"3\">36秒</option><option value=\"4\">48秒</option><option value=\"5\">60 秒</option></select>");
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(3) > div").css({"background-image":"none"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(3) > div").append("<span>起始时间：</span>&nbsp <input id=\"startTime\" style=\"width:90px;height:19px;\"type=\"time\" />");
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(4) > div").css({"background-image":"none"});
				  $("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(4) > div").append("<span>结束时间：</span>&nbsp <input id=\"endTime\" style=\"width:90px;height:19px;\" type=\"time\" />");


				  //---------------------获取起始时间------------
				  $.post(__ctx + "/platform/imsShowStyle/imsShowStyle2/getMinStartTime.htm",{},function(data){
					  firstTime = parseInt(data);
					  var seconds = firstTime*12;
					  var H =  parseInt(seconds/3600);
					  if(H < 10){
						  H = "0"+H;
					  }
					  var min =  parseInt(seconds/60%60);
					  $("#startTime").val(H+":"+min);
				  });
				  //---------------------获取结束时间------------
				  $.post(__ctx + "/platform/imsShowStyle/imsShowStyle2/getMaxStartTime.htm",{},function(data){
					  lastTime = parseInt(data);
					  var seconds = lastTime*12;
					  var H =  parseInt(seconds/3600);
					  if(H < 10){
						  H = "0"+H;
					  }
					  var min =  parseInt(seconds/60%60);
					  $("#endTime").val(H+":"+min);
				  });
			  }
			 
			  if(${markid }=="3"){
					//----------------开始进行隐藏------------------------------
					  $("#editor").addClass("importantEditor");
					  $("div.graph-editor__toolbox").addClass("importantToolbox");
					  $("#editor > div.graph-editor__canvas.Q-Graph").addClass("importantGraph");
					  //$("#editor > div.graph-editor__toolbar").css({"top":"50px"});
			  }
			//----------------仿真展现设置结束------------------------------
			  
	    });

	    function ensureVisible(node) {
	        var bounds = graph.getUIBounds(node);
	        var viewportBounds = graph.viewportBounds;
	        if (!viewportBounds.contains(bounds)) {
	            graph.sendToTop(node);
	            graph.centerTo(node.x, node.y);
	        }
	    }

	function getElementById(id){
	            var result;
	            graph.forEach(function(e){
	                if(getId(e) == id){
	                    result = e;
	                    return false;
	                }
	            })
	            return result;
	        }
	
	function savemap(){
		//alert("savemap");
		var graph = window.graph;
		var nodeSize=getNodeSize(graph);
		
		
		if(nodeSize==0){
			DialogUtil.alert("请拖拽节点",function(){
					
			},"信息");
			return;
		}
		
		var nodeNameArr = getEdgeCount(graph);
		
		if(nodeNameArr.length !=0 && nodeSize>1){
			DialogUtil.alert("存在为连线节点:"+nodeNameArr[0],"信息");
			return;
		}
		
		var tptName = $("#subject").val();
		if(tptName==""){
			DialogUtil.alert("请填写拓扑图名称！","信息");
			return;
		}
		
	
		
		var id  = $("#tptId").val();
		
		var $istemplate = $("#istemplate ").val();
		//alert(id);
		 var user = {
				 id : id,
		         tptlx: $("#typeId").val(),
             json:Q.graph.exportJSON(true),
             
             tptName:$("#subject").val(),
             tptbh:$("#defKey").val(),
             descp:$("#descp").val(),
             istemplate : $istemplate
            
      };
			//alert("savemap2");
		  // alert(Q.graph.exportJSON(true));
		$.ajax({
			type: "POST",
	         url: " ${ctx}/patrolp/tpt/tpt/save.htm", 
	         data:user,
	         success:function(data){
	             if(data == "success"){
	            		 window.location.href = "${ctx}/patrolp/tpt/tpt/list.htm";
	            	
	             }else{
	                //alert("error");
	             }
	         }
		});
		
	}
	        
	        function getId(element){
	        
	           // return element.get('id');
	            return element;
	        }
	    function initTreeAndTable(){
	        var treeId = "#tree";
	        var tableId = "#table";

	        var tableOptions = [
	            {field: 'id', title: 'ID', width: 100, propertyType: Q.Consts.PROPERTY_TYPE_CLIENT},
	            {field: 'index', title: '行号', width: 100, propertyType: Q.Consts.PROPERTY_TYPE_CLIENT},
	            {field: 'text', title: '标签', width: 100, name: 'name', align: 'center'},
	            {field: 'x', title: 'X', width: 100, align: 'center'},
	            {field: 'y', title: 'Y', width: 100, align: 'center'},
	        ]

	        function getTreeIcon(d) {
	            return d instanceof Q.Edge ? "edge_icon" : "node_icon";
	        }
	        function toTreeData(element){
	            var data = {iconCls: getTreeIcon(element)}
	            tableOptions.forEach(function(option){
	                var name = option.name || option.field;
	                var value;
	                if(option.propertyType == Q.Consts.PROPERTY_TYPE_CLIENT){
	                    value = element.get(name);
	                }else if(option.propertyType == Q.Consts.PROPERTY_TYPE_STYLE){
	                    value = element.getStyle(name);
	                }else{
	                    value = element[name];
	                }
	                data[option.field] = value;
	            })
	            if(!data.id){
	                data.id = Date.now();
	                element.set('id', data.id);
	            }
	            return data;
	        }

	       

	        function loadDataFromGraph(){
	        	//alert("loadDataFromGraph");
	            var datas = [];
	            var map = {};
	            graph.graphModel.forEachByBreadthFirst(function (d) {
	                var data = toTreeData(d);
	                var parent = d.parent;
	                if (!parent) {
	                    datas.push(data);
	                    return;
	                }
	                parent = map[getId(parent)];
	                var children = parent.children;
	                if (!children) {
	                    children = parent.children = [];
	                }
	                children.push(data);
	            });
	            return datas;
	        }

	        var datas = loadDataFromGraph();


	        function updateElement(element){
	            var data = $(treeId).tree('find', getId(element));
	            if(!data){
	                return;
	            }
	            var newData = toTreeData(element);
	            newData.target = data.target;
	            $(treeId).tree('update', newData);

	            var rowIndex = $(tableId).datagrid('getRowIndex', data.id);
	            if(rowIndex < 0){
	                return;
	            }
	            $(tableId).datagrid('updateRow',{
	                index: rowIndex,
	                row: newData
	            });
	        }

	        $(tableId).datagrid({
	            data: datas,
	            fitColumns: true,
	            idField: 'id',
	            columns: [tableOptions],
	            onUnselect: function(index,row){
	                if (graph.selectionAjdusting) {
	                    return;
	                }
	                var node = getElementById(row.id);
	                if(node){
	                    graph.selectionModel.remove(node);
	                }
	            },
	            onSelect: function (index,row) {
	                if (graph.selectionAjdusting) {
	                    return;
	                }
	                var node = getElementById(row.id);
	                if(node){
	                    graph.selectionModel.set(node);
	                }
	            }
	        });

	        $(treeId).tree({
	            data: datas,
	            onSelect: function () {
	                if (graph.selectionAjdusting) {
	                    return;
	                }
	                var selected = $(treeId).tree("getSelected");
	                if (selected) {
	                    var node = getElementById(selected.id);
	                    
	                    graph.selectionModel.set(node);
	                    if (node) {
	                        ensureVisible(node);
	                    }
	                }
	            }
	        });
	        graph.selectionChangeDispatcher.addListener(function (evt) {
	        
	            if (graph.selectionAjdusting) {
	                return;
	            }
	            graph.selectionAjdusting = true;
	            var selection = [];
	            $(tableId).datagrid('unselectAll');
	            graph.selectionModel.forEach(function (node) {
	                var id = getId(node);
	                var node = $(treeId).tree('find', id);
	                if (node) {
	                    selection.push(node.target);
	                    $(tableId).datagrid('selectRecord', id);
	                }
	            });
	            $(treeId).tree('select', selection);
	            graph.selectionAjdusting = false;
	        });
			
	        graph.listChangeDispatcher.addListener(function (evt) {
	            var data = evt.data;
	            switch (evt.kind) {
	                case Q.ListEvent.KIND_ADD :
	                    var treeData = toTreeData(data);
	                   
	                    $(treeId).tree('append', {data: [treeData]});
	                    $(tableId).datagrid('appendRow', treeData);
	                    break;
	                case Q.ListEvent.KIND_REMOVE :
	                    Q.forEach(data, function (node) {
	                        var node = $(treeId).tree('find', node.id);
	                        if (node) {
	                            $(treeId).tree('remove', node.target);
	                        }
	                        var node = $(tableId).datagrid('find', node.id);
	                        if (node) {
	                            $(tableId).datagrid('remove', node.target);
	                        }
	                    });
	                    break;
	                case Q.ListEvent.KIND_CLEAR :
	                    break;
	            }
	        });
	        graph.dataPropertyChangeDispatcher.on(function(evt){
	            if(evt.source){
	                updateElement(evt.source);
	            }
	        })
	    }
	   function node_num(){  //编号
	   
	   
	   
	   					var node_jj=1;
	        			var nodeMap = {}; 	
	        			 	graph.graphModel.forEachByTopoBreadthFirstSearch(function(node){
		        			 	if(nodeMap[node.id]){
					                return;
					            }else{
					            	nodeMap[node.id] = true;
								    if(!node.parent){
								    	if(node.bindingUIs){
								    
								    		node.bindingUIs.get(0).ui.data=""+node_jj++;
								    		node.invalidate();  
								    		
								    	}
								    	
								    }
							   }
							});
							
							graph.graphModel.forEach(function(node){
							    if(node.parent){
							    	var par_j=node.parent;//组节点
		        			 		var jjj=par_j.bindingUIs.get(0).ui.data;
		        			 		var node_jjj=1;
		        			 		par_j.forEachChild(function(node){
		        			 			
									    	if(node.bindingUIs){
									    		var labelUI = node.bindingUIs.get(0);
												var lable_node = labelUI.ui.data;
												var ii=lable_node.lastIndexOf(".");
												var i_i=lable_node.substring(ii+1);
										    	node.bindingUIs.get(0).ui.data=""+jjj+"."+i_i;
							    				node.invalidate();  
									    	}
										});
		        			 		
							    }
							});
	   	
	   }
	   /************************zhengchongshan***********************/
		//var graph = window.graph;
       //graph.onclick = node_num; 
       function getIDLabelUI(node){       
                 if(!node.bindingUIs){         
                  return null;
                    }

               var result;
        node.bindingUIs.forEach(function(ui){   
                   ui = ui.ui;
               if(ui.type == 'id'){
                     result = ui;
             return false;
                          }
              })
          return result;
         }

    function setUIVisible(node, visible){ 
        var labelUI = getIDLabelUI(node);
       if(!labelUI){  
      return;
               }

   labelUI.visible = visible;
   node.invalidate();} 

/************************end***********************/
	    function node_num_d(){  //删除某节点-编号
	   					var node_jj=1;
	        			var nodeMap = {}; 	
	        			 	graph.graphModel.forEachByTopoBreadthFirstSearch(function(node){
		        			 	if(nodeMap[node.id]){
					                return;
					            }else{
					            	nodeMap[node.id] = true;
								    if(!node.parent){
								    	if(node.bindingUIs){
								    
								    		node.bindingUIs.get(0).ui.data=""+node_jj++;
								    		node.invalidate();  
								    	}
								    	
								    }
							   }
							});
							
							graph.graphModel.forEach(function(node){
							    if(node.parent){
							    	var par_j=node.parent;//组节点
		        			 		var jjj=par_j.bindingUIs.get(0).ui.data;
		        			 		var no_i=1;
	        			 			var nodeMap = {}; 	
		        			 		par_j.forEachChild(function(node){
		        			 			
									    if(!node.hasInEdge()){//判断是否有连入
	        			 					if(node.hasOutEdge()){//判断该节点是否有连线出
	        			 						
	        			 						if(node.bindingUIs){
												    		var labelUI = node.bindingUIs.get(0);
															var lable_node = labelUI.ui.data;
															var ii=lable_node.lastIndexOf(".");
															var i_i=lable_node.substring(ii+1);
													    	node.bindingUIs.get(0).ui.data=""+jjj+"."+no_i++;
										    				node.invalidate();  
												    	}
		        			 					  
										    				if(node.hasOutEdge()){
										    					
										    						var b= new Object();
											    					b=xxxh(node,nodeMap,no_i,jjj);
											    					nodeMap=b.x;
											    					no_i=b.y;
										    					
										    				}
										    	
		        			 				}else{//没连入，没连出，独立节点
		        			 					if(node.bindingUIs){
										    		var labelUI = node.bindingUIs.get(0);
													var lable_node = labelUI.ui.data;
													var ii=lable_node.lastIndexOf(".");
													var i_i=lable_node.substring(ii+1);
											    	node.bindingUIs.get(0).ui.data=""+jjj+"."+no_i++;
								    				node.invalidate();  
										    	}
		        			 				}
	        			 				}else{
											var f=0;//没有组内
	        			 					node.forEachInEdge(function(node){
	        			 						if(node.from.parent!=node.to.parent){
	        			 							f=0;
	        			 						}else{
	        			 							f=1;
	        			 							return false;
	        			 						}
	        			 					});
	        			 					if(f==0){
	        			 						if(node.bindingUIs){
										    		var labelUI = node.bindingUIs.get(0);
													var lable_node = labelUI.ui.data;
													var ii=lable_node.lastIndexOf(".");
													var i_i=lable_node.substring(ii+1);
											    	node.bindingUIs.get(0).ui.data=""+jjj+"."+no_i++;
								    				node.invalidate();  
								    				if(node.hasOutEdge()){
										    			var b= new Object();
											    		b=xxxh(node,nodeMap,no_i,jjj);
											    		nodeMap=b.x;
											    		no_i=b.y;
										    					
										    		}
										    	}
	        			 					}
	        			 				}
									    	
									});
		        			 		
							    }
							});
	   	
	   }
	      function node_num_g(){  // 修改节点-编号
	   					
							graph.graphModel.forEach(function(node){
							    if(node.parent){
							    	var par_j=node.parent;//组节点
							    	//alert(par_j);
		        			 		var jjj=par_j.bindingUIs.get(0).ui.data;
		        			 		//alert(jjj);
		        			 		var node_jjj=1;
		        			 		par_j.forEachChild(function(node){
		        			 			
									    	if(node.bindingUIs){
									    		var labelUI = node.bindingUIs.get(0);
												var lable_node = labelUI.ui.data;
												var ii=lable_node.lastIndexOf(".");
												var i_i=lable_node.substring(ii+1);//原编号
										    	node.bindingUIs.get(0).ui.data=""+jjj+"."+node_jjj++;
							    				node.invalidate();  
									    	}
										});
		        			 		
							    }
							});
	   	
	   }
	    function node_num_g_z(){  // 修改节点-编号_组
	   					
							graph.graphModel.forEach(function(node){
							    if(node.parent){
							    	var par_j=node.parent;//组节点
							    	//alert(par_j);
		        			 		var jjj=par_j.bindingUIs.get(0).ui.data;
		        			 		//alert(jjj);
		        			 		var node_jjj=1;
		        			 		par_j.forEachChild(function(node){
		        			 			
									    	if(node.bindingUIs){
									    		var labelUI = node.bindingUIs.get(0);
												var lable_node = labelUI.ui.data;
												var ii=lable_node.lastIndexOf(".");
												var i_i=lable_node.substring(ii+1);//原编号
										    	node.bindingUIs.get(0).ui.data=""+jjj+"."+i_i;
							    				node.invalidate();  
									    	}
										});
		        			 		
							    }
							});
	   	
	   }
	  function isPositiveNum(s){//是否为正整数  
	    var re = /^[0-9]*[1-9][0-9]*$/ ;  
	    return re.test(s)  
	} 
	function xxxh(node,nodeMap,no_i,jjj){  //主内有向图编号
		 var   a   =   new   Object();  
		 
		node.forEachOutEdge(function(node){
			if(node.from.parent==node.to.parent){
				if(nodeMap[node.to.id]){
					return;
				}else{
										           
					nodeMap[node.to.id] = true;
					if(node.to.bindingUIs){
						var labelUI = node.to.bindingUIs.get(0);
						var lable_node = labelUI.ui.data;
						var ii=lable_node.lastIndexOf(".");
						var i_i=lable_node.substring(ii+1);
						node.to.bindingUIs.get(0).ui.data=""+jjj+"."+no_i++;
						node.to.invalidate();  
						if(node.to.hasEdge()){
							var b= new Object();
							b=xxxh(node.to,nodeMap,no_i,jjj);
							nodeMap=b.x;
							no_i=b.y;
										    					
						}
										    				
					}
				}
			}		        			 					
		});
			        			 					
		a.x=nodeMap;
		a.y=no_i;	
		node_num();		 				
		return a;  			 				
	}


	
	
	var indexLine = -1;
	function searchLine(node){
		if(node instanceof Q.Node){
		var url=__ctx+"/platform/tpt/tpt/echartsLine.htm?defId="+node.properties.BpmId;
		if(node.properties.BpmId != ""){
			if(node.properties.BpmId.startWith("Node_")){
				DialogUtil.close(indexLine);
				indexLine = DialogUtil.dialog({
					   content: url,
					   title: '查看曲线',
					   area: ['600px', '550px'],
					   params:{},
					   shade:0,
					   offset:'rb',
					   id:"",//一个节点只能弹出一个窗口
					   btn: [
						   {
							   label:'取消',
							   action:function(dialog,index){
								   DialogUtil.close(index);
							   }
						   }
					   ],
					  moveEnd: function(layero){
						  
					  }
					});
			}
		}
		}
	}

	var timer;//控制播放暂停停止快进快退
	var edgelist={};//存储所有数据，包括时间与线条和节点的对应关系
	var j;
	var startTime;//存储每次获取数据的起始时间
	var endTime;//存储每次获取数据的结束时间
	var nowTime;//存储当前秒数
	var lock = 1; //锁  用于防止播放后再次播放
	var timeOut = 1000;//展现时间间隔，通过设置它控制快放和慢放
	var firstTime;//存储数据库中的最小时间
	var lastTime;//存储数据库中的最大时间
	var start;//存储仿真开始时间
	var end;//存储仿真结束时间
	function startUp(){
		if(lock == 1){
			lock = 0;
			start = (parseInt($("#startTime").val().substring(0,2))*3600+parseInt($("#startTime").val().substring(3,5))*60)/12;
			//alert("start:"+start);
			end = (parseInt($("#endTime").val().substring(0,2))*3600+parseInt($("#endTime").val().substring(3,5))*60)/12;
			//alert("end:"+end);
			$("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(3) > div").attr("disabled","disabled");
			$("#editor > div.graph-editor__toolbar > div:nth-child(3) > div:nth-child(4) > div").attr("readonly","readonly");
			
			if(nowTime > start && nowTime < end){
				displayProgram(timeOut);
			}else{
				nowTime = start ;
				startTime = start;
				endTime = startTime + 9;
				$.post(__ctx + "/platform/imsShowStyle/imsShowStyle2/getData.htm",{"startTime":startTime,"endTime":endTime},function(data1){
					var edgelist1 = eval("("+data1+")");
					for(var i=startTime;i<=endTime;i++){
						if(edgelist1[i].length != 0){
							edgelist[i] = edgelist1[i];
						}
					}
					displayProgram(timeOut);
//					$("#yaoqi").val(JSON.stringify(edgelist))
				});	
			}
		}
	}

	function goBack(){
		clearInterval(timer);
		nowTime = nowTime -5;
		displayNow(nowTime);
		displayProgram(timeOut);
	}
	function goSlow(){
		if(timeOut < 10000){
			clearInterval(timer);
			timeOut = timeOut*2;
			displayProgram(timeOut);
		}
	}
	function goFast(){
		if(timeOut > 100){
			clearInterval(timer);
			timeOut = timeOut/2;
			displayProgram(timeOut);
		}
	}
	function goForward(){
		if(nowTime <= end){
			clearInterval(timer);
			nowTime = nowTime + 5;
			displayNow(nowTime);
			displayProgram(timeOut);
		}
	}
	function suspend(){
		clearInterval(timer);
	
    	if (nowTime != end) //没有走到最后,暂停后可以开锁播放
		{
			lock = 1;
		}
	}
	function displayProgram(timeOut){
		timer = setInterval(function(){
			displayNow(nowTime);
			
			console.log(nowTime);
			
			startTime = endTime+1;
			endTime = startTime + 9;
			if(nowTime + parseInt($("#displayStep").val()) < startTime){
				nowTime = nowTime + parseInt($("#displayStep").val())
				if(endTime < end){
					getDisplayData(startTime,endTime);
				}else if(startTime <= end){
					getDisplayData(startTime,end);
				}
			}else{
				getDisplayData(nowTime,nowTime+9);
			}
			if(nowTime > end){
				clearInterval(timer);
				displayNow(end);
			}
		},timeOut);
	}

	//修改当前展现时间
	function displayNow(now){
		var seconds = now*12;
		var H =  parseInt(seconds/3600);
		if(H < 10){
			H = "0"+H;
		}
		var min =  parseInt(seconds/60%60);
		if(min < 10){
			min = "0"+min;
		}
		var s =  parseInt(seconds%3600%60);
		if(s < 10){
			s = "0"+s;
		}
		$("#displayNow").html(H+":"+min+":"+s);
	}


	//按时间节点获取数据并存入edgelist
	function getDisplayData(startTime1,endTime1){
		$.post(__ctx + "/platform/imsShowStyle/imsShowStyle2/getData.htm",{"startTime":startTime1,"endTime":endTime1},function(data2){
			var edgelist1 = eval("("+data2+")");
			for(var i=startTime1;i<=endTime1;i++){
				if(edgelist1[i].length != 0){
					edgelist[i] = edgelist1[i];
				}
			}
		});
	}
	
	function getNodeSize(graph){
		var i= 0;
		graph.forEach(function(node){
			if(node instanceof Q.Node){
				i++;
			}

		})
		return i;
	}
	
	function getEdgeCount(graph){
		var nodeNameArr = new Array();
		var i = 0;
		graph.forEach(function(node){
			if(node instanceof CustomServerNode){
				if(node.edgeCount==0){
					var nodeName = node.name;
					nodeNameArr[i] = nodeName;
					i++;
				}
			}
		})
		return nodeNameArr;
	}
	
    function func(){
    	//alert("over");
    }
    
    function dispalyFinsh(graph,imagePathMap,id,planMap){
    	//alert("planId1");
    	graph.forEach(function(node){
    		  if (node instanceof CustomServerNode) {
    			  if(node._getPlanId()==id && node._imageChange == true){
  					//alert(node._imageChange);
  					var cateKey = node.properties.cateKey;
  					var oldImage = imagePathMap.get(cateKey);
  					node.image = oldImage;
  				  }
              }else if(node instanceof Q.Edge){
            	  if(node.properties.isFlowing ==true){
            		  var uiLen = node.bindingUIs.length;
						while(uiLen !=0){
							var ui = node.bindingUIs.get(0);
							node.removeUI(ui);
							uiLen--;
						}
						//node.properties.isFlowing =false;
						//var isFlowing = node.properties.isFlowing;
            	  }
            	  
              }
				
			})
			if(planMap.size()==0){
				changeCanFlowing(graph,false);
			}
    }
    
/*     function deleteIsFlowing(graph){
    	alert("deleteIsFlowing");
    	graph.forEach(function(node){
    		if(node instanceof Q.Edge){
    			if(node.properties.isFlowing == true){    				
    				delete node.properties.isFlowing;
    			}
    		}
    	})
    } */
    
    function changeCanFlowing(graph,canFlow){
    	graph.forEach(function(node){
    		if(node instanceof Q.Edge){
    			if(node.properties.isFlowing == true){
    				node.properties.canFlowing = canFlow;
    			}
    		}
    	})
    }
    
    function hasNode(property){
    	//alert("hasNode");
    	var nodeCount =0;
    	graph.forEach(function(node){
    		if(node instanceof CustomServerNode){
    			var cateKey = node.properties.cateKey+'Task';   			
    			if(cateKey == property){
    				nodeCount++;
    			}
    		}
    	})
    	return nodeCount;
    }
    
	
		</script>

</body>
</html>
