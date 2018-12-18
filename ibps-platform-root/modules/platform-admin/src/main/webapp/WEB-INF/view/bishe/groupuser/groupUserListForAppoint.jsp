
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/gradGroup.js"></script>
		<title>指定答辩小组</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a onclick="groupUser.appointGroup()"class="btn btn-primary fa fa-back" ><span>确定</span></a>
					<%--<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>--%>
				</div>
			</div>
			<%-- <input type="hidden" name="groupIds" id="groupIds" value="${groupIds}"/> --%>
			
			<input type="hidden" id="userId"  value="${userId}"/>
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">小组类型</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="type" name="type" value="${type}" validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>

			<div class="fr_response_field col-sm-12" >
				<div class="jqGrid_wrapper">
					<table id="gradGroupGrid" ></table>
					<div id="gradGroupPager"></div>
				</div>
			</div>

			</div>
		</div>
	
	</body>
	<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/groupUserForDrawLots.js"></script>
<script type="text/javascript">
    //得到小组类型词典
    var makeGroupTypeMapURL = "/bishe/groupuser/groupUser/makeGroupTypeMap.htm";
    debugger
    $.ajax({
        type: "POST",
        dataType:"json",
        url:makeGroupTypeMapURL,
        async: false,
        success:function (data) {
            debugger
            if (data.status) {
                //DialogUtil.msg(data.msg);
            } else {
                DialogUtil.error(data.msg);
            }
        }
    });
</script>
</html>
