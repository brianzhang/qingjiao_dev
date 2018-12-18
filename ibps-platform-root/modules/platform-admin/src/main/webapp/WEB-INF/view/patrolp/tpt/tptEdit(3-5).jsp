<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>


<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
<meta name="description" content="">
<link rel="shortcut icon" href="/favicon.ico">
<meta name="viewport" content="width=device-width">
<%@include file="/commons/include/get.jsp"%>
    <title>Hello Qunee</title>
    <link rel=stylesheet href=http://demo.qunee.com/editor/libs/bootstrap/css/bootstrap.css>
    <link rel=stylesheet href=http://demo.qunee.com/editor/libs/graph.editor/graph.editor.css>
    
   
<script src="${ctx}/js/editorT/libs/qunee-min.js"></script>
<script src="${ctx}/js/editorT/libs/qunee-module.js"></script>
<script src="${ctx}/js/editorT/src/graph.editor.js"></script> 
<!-- <script src="http://demo.qunee.com/editor/libs/graph.editor/graph.editor.js"></script> -->
<script src="${ctx}/js/editorT/scripts/graphs.js"></script>
<script src="${ctx}/js/hrbeu/platform/tpt/svg.js?"></script>
<script src="${ctx}/js/hrbeu/platform/basic/svg.js"></script>
<script src="${ctx}/js/editorT/src/common/i18n.js"></script>
<script src="${ctx}/js/editorT/src/common/DomSupport.js"></script>
<script src="${ctx}/js/editorT/src/common/DragSupport.js"></script>
<script src="${ctx}/js/editorT/src/common/FileSupport.js"></script>
<script src="${ctx}/js/editorT/src/common/JSONSerializer.js"></script> 
<script src="${ctx}/js/editorT/src/common/ExportPane.js"></script>
<script src="${ctx}/js/editorT/src/common/Toolbar.js"></script>
<script src="${ctx}/js/editorT/src/common/ToolBox.js"></script>
<script src="${ctx}/js/editorT/src/common/PopupMenu.js"></script>
<script src="${ctx}/js/editorT/src/common/CustomServerNode.js"></script>
<script src="${ctx}/js/editorT/libs/layout.border.js"></script>
<script	src="${ctx}/js/editorT/libs/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script	src="${ctx}/js/editorT/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
    
      <style>
/*强势设置画布容器大小*/
.importantEditor {
	height: 100% !important;
	width: 100% !important;
}
/*设置左边设备列表隐藏*/
.importantToolbox {
	display: none;
}
/*强势设置画布居中显示与充满整个容器*/
.importantGraph {
	height: 100% !important;
	left: 0px !important;
	top: 50px !important;
	width: 100% !important;
}
</style>
    
    <script type="text/javascript">
$(function(){
		
		alert("zhangzuolin");
		$("div.graph-editor__toolbox").css("left","0px");
        $("div.graph-editor__toolbox").css("top","40px");
        
        var input = '<input type="text" id="tptName"  name="tptName" value= ""  />';
        
        var button =  '<button type="button" class="btn btn-primary fa fa-save" 	onClick="savemap()">保存</button>';
        
        
        var div = document.createElement("div");
        div.style.display = "inline-block";
		div.style.verticalAlign = "middle";
		div.style.width = '170px';
		div.innerHTML = '<input type="text" id="tptName"  name="tptName" value= ""  />';
        
        $("div.graph-editor__toolbar").append(div);
        
        
        //$("div.graph-editor__toolbar").append(button);
        
        $('#editor').graphEditor({callback: function(editor){
            var graph = editor.graph;
            
            
            graph.moveToCenter();
        }});
	})
	
	var markid;
	//var toolbar = $("#editor > div.graph-editor__toolbar div").length;
	//alert("toolbar"+toolbar);
	//$("#editor > div.graph-editor__toolbar").css({"top":"50px"});

	
	

	
	
    $('#editor').graphEditor({callback: function(editor){
        var graph = editor.graph;
        
        
        graph.moveToCenter();
    }});
    
    function savemap(){
    	alert("savemap");
    }
	
    </script>
    
</head>
<body class="layout">
	
				<div id="editor" data-options="region:'center'"></div>
		
		 
			<div class="graph-editor__property"
				data-options="region:'east', width: '20%', right: 15, min-width: 100, max-width: '300'"
				style="position: absolute; box-sizing: border-box; top: 40px; right: 15px; width: 500px; height: 922px;border:5px solid red;"
				 id="Pane">
				<h4 style="display: inline-block;">
					<strong>属性面板</strong>
				</h4>
		
		<input type="text" value="yuda"  id="tptId"/>

		<input type="text" value="yuda"  id="markid"/>
		<input type="text" id="nodeKeyVal" value="yuda">
		
	
 <form class="form-horizontal" id="form1">
 					<%-- <input type="text" value="${rStr}" id="reg" /> --%>
 					<textarea rows="0" cols="0" id="reg"  style="">yuda</textarea>
 					<textarea rows="0" cols="0" id="imageNetwork" style="">yuda</textarea>
 					<textarea rows="0" cols="0" id="tptJson" style="">yuda</textarea>
 					<textarea rows="0" cols="0" id="loadTypeStr" style="">yuda</textarea>
 					
 					<textarea rows="0" cols="0" id="actionImages" style="display:none">${actionImages}</textarea>
 					<div id="hsvflat"></div>
					<div clss="class-group">													
						<div class="form-group">
							<label class="col-sm-3 control-label font-small">
								名称*
							</label>
							<div class="input-group input-group-sm col-sm-6 ">
								<input class="form-control col-md-offset-1" value="${tpt.tptmc}"
									name="tptmc" id="subject" onBlur="autoGetTableKey(this)">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label font-small">
								编号(key)*
							</label>
							<div class="input-group input-group-sm col-sm-6">
								<input class="form-control  col-md-offset-1" value="${tpt.tptbh}"
									name="tptbh" id="defKey"
									<c:if test="${status>'0'}"> readonly="readonly"</c:if> />
							</div>
						</div>
						<div class="form-group" >						
							<label class="col-sm-3 control-label font-small">
								类型*
							</label>
							<div class="finput-group input-group-sm col-sm-6 " style="left: +1"
								id="dialogCategory" onClick="Remove()">
								
								<input class="form-control col-md-offset-1" catKey="NETWORKMAP_TYPE"
									valueField="typeId" value="${tpt.tptlx}" name="tptlx"
									 id="typeId" style="text-align:left"/>
								
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label font-small">
								模板
							</label>
							<div class="input-group input-group-sm col-sm-6">
								<!--  
								<input class="form-control  col-md-offset-1" value="${descp}"
									name="descp" id="descp">
									-->
								<select id="istemplate"><option value="1">是</option><option value="0">否</option></select>
							</div>
						</div>						
					</div>
				</form>
			 <!-- 李广文     --  鹰眼图-->
            <div id="overview" style="width: 250px;height: 200px;position: absolute; right: 25px; bottom: 180px; background: #FFF"></div>
            <!-- 李广文  -->
			</div>
		
	
</body>
</html>