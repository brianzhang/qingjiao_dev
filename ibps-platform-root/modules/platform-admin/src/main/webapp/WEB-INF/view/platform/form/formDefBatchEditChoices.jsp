<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	</head>
	<style type="text/css">
.choices-content{
	    padding: 15px 10px;
}
.choices-content textarea {
    display: inline-block;
    vertical-align: top;
    width: 150px;
    height: 220px;
    overflow-y: auto;
    line-height: 1.6
}

.choices-content ul+ul,.choices-content ul+textarea,.choices-content textarea+ul,.choices-content textarea+textarea {
    margin-left: 10px
}
.choices-content textarea {
    resize: none;
    padding: 4px 6px
}

.choices-content textarea:not(:focus) {
    border-color: #C3C9D0
}
	
	</style>
	
	<script type="text/javascript">

	$(function(){
		var options =  frameElement.dialog.params;
		var val = [],label=[];
		$.each(options,function(i,n){
			val.push(n.val);
			label.push(n.label);
		});
	    $("#fieldChoicesVal").val(val.join("\n"));
	    $("#fieldChoicesLabel").val(label.join("\n"));
	});
	
	function getData(){
		var choices = [];
		var val =  $("#fieldChoicesVal").val();
		var valAry = $.map(val.split("\n"),function(n){
			  return  $.trim(n);
			});
		var label =  $("#fieldChoicesLabel").val();
		var labelAry = $.map(label.split("\n"),function(n){
			  return  $.trim(n);
			});
		
		$.each(valAry,function(i, v){
			var obj = {
					val:v,
					label:labelAry[i]
			};
			choices.push(obj);
		});
		
		return choices
	}
	
	function cleanData(){
		 $("#fieldChoicesVal").val("");
		 $("#fieldChoicesLabel").val("");
	}
	
	</script>
	<body>
			<div class="wrapper wrapper-content col-sm-12">
				<div class=" choices-content  clearfix">
					  <textarea id="fieldChoicesVal" rows="10"></textarea>
					  <textarea id="fieldChoicesLabel" rows="10"></textarea>
			  	</div>
			</div>
	</body>
</html>