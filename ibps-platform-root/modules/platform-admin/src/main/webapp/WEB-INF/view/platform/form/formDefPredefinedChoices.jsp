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

.choices-content ul{
    display: inline-block;
    vertical-align: top;
    width: 190px;
    height: 220px;
    overflow-y: auto;
    line-height: 1.6
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

.choices-content ul {
    list-style: none;
    padding: 4px 0;
    margin: 0;
    border: 1px solid #C3C9D0
}

.choices-content ul>li {
    padding: 0 6px;
    cursor: pointer
}

.choices-content ul>li:hover,.choices-content ul>li.selected {
    background-color: #F1F1F1
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
		//选项默认模版数据，以后从数据库取出
			var  choices = [{
	            name:'是/否',
	            label:['是','否'],
	            val:['Y','N'],
			},{
			    name:'性别',
			    label:['男','女'],
			    val:['M','F']
			},{
	            name:'星期',
	            label:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
	            val:['1','2','3','4','5','6','7'],
			},{
			    name:'月份',
		        label:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		        val:['1','2','3','4','5','6','7','8','9','10','11','12'],
			},{
				name:'满意度',
		        label:['非常满意','满意','一般','不满意','非常不满意','其他'],
		        val:['VerySatisfied','Satisfied','Neutral','Unsatisfied','VeryUnsatisfied','NA'],
			}];
		
		$("#choicesUl").html(template('choicesTemp', {
			list:choices
		}));

		$("#choicesUl li").click(function(){
			$(this).addClass("selected").siblings('li').removeClass('selected');
			var i =$(this).data("item");
			var choice =choices[i];
			
		    $("#fieldChoicesVal").val(choice.val.join("\n"));
		    $("#fieldChoicesLabel").val(choice.label.join("\n"));
		});
	});
	
	function getData(){
		var choices = [];
		var val =  $("#fieldChoicesVal").val(),
			valAry = $.map(val.split("\n"),function(n){
			  	return  $.trim(n);
				});
		var label =  $("#fieldChoicesLabel").val(),
			labelAry = $.map(label.split("\n"),function(n){
			  return  $.trim(n);
			});
		
		$.each(valAry,function(i, v){
			var obj = {val:v,label:labelAry[i]};
			choices.push(obj);
		});
		
		return choices
		
	}
	
	function cleanData(){
		 $("#fieldChoicesVal").val("");
		 $("#fieldChoicesLabel").val("");
	}
	
</script>
<script type="text/html"  id="choicesTemp">
 {{each list as item i}}
	<li data-item="{{i}}">{{item.name}}</li>
{{/each}}
</script>
	<body>
			<div class="wrapper wrapper-content col-sm-12">
				<div class=" choices-content  clearfix">
					  <ul id="choicesUl"></ul>
					  <textarea id="fieldChoicesVal" rows="10"></textarea>
					  <textarea id="fieldChoicesLabel" rows="10"></textarea>
			  </div>
			</div>
	</body>
</html>