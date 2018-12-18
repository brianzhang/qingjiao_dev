<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
<%@include file="/commons/include/list.jsp" %>
<title>我流转出去的任务</title>
<script type="text/javascript">
	$(function (){
		//加载分类树
	});

	function revoke(id,subject){
		//去除html标签
		var tmp=$("<div>" +subject +"</div>").text();
		
		var url='${ctx}/platform/office/bpmInitiatedProcess/revokeTrans.ht?taskId=' + id;
		$.topCall.dialog({
			src :url ,
			base : {
				title : '撤销::[' +tmp +"]",
				width : 700,
				height : 400,
				modal : true,
				resizable : true
			}
		});
	}
	
</script>
</head>
<body   >
	
			<div  class="toolbar-search col-md-13 ">
				<div class="toolbar-box border">
					<div class="toolbar-head">
						<!-- 顶部按钮 -->
						<div class="buttons"> 	
					        <a href="#" class="btn btn-primary fa-search"><span>搜索</span></a>
			    		</div>
			    		<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-190 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<div class="toolbar-body" >
						<form id="searchForm" class="search-form">
							<ul>
								<li><span>请求标题:</span><input class="inputText" type="text" name="Q^subject^SL"/></li>
								<li><span>流程名称:</span><input class="inputText" type="text" name="Q^defName^SL"/></li>
							</ul>	
							<ul>
								<li><span>创建时间 从:</span><input  name="Q^transTimeStart^DL"  class="inputText date" /></li>
								<li><span>至:</span><input  name="Q^transTimeEnd^DG" class="inputText date" /></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
			<table  url="${ctx}/platform/office/bpmInitiatedProcess/myTransJson.ht">
			    <thead>
				    <tr>
						<th field="subject" sortable="true" sortName="subject_"  formatter="ht"  title="请求标题" href="${ctx}/bpmx/core/bpmProcessInstance/get.ht?id={id}"></th>
						<th field="procDefName" sortable="true" sortName="proc_def_name_"    title="流程名称"></th>
						<th field="createTime" sortable="true" sortName="a.create_time_" title="创建时间" formatter="ht" dateFormat="YYYY-MM-DD HH:mm:ss"></th>
						<th field="transDate" sortable="true" sortName="b.create_time_" title="流转时间" formatter="ht" dateFormat="YYYY-MM-DD HH:mm:ss"></th>
						<th manager="true" width="40" >
							<a class="btn btn-default fa fa-detail" href="#" onclick="revoke('{id}','{subject}')" >撤销</a>
							<a class="btn btn-default fa fa-detail" href="#"  >明细</a>
						</th>
				    </tr>
			    </thead>
		    </table>
		
	</body>
</html>