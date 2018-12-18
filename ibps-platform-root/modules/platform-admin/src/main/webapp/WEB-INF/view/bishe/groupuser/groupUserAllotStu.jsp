
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/StuDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/audit/TchDialog.js"></script>
		<title>分配学生</title>
		<script type="text/javascript">
		function allot(){
			debugger;
/* 			var ids = $('#groupIds').val();
			var aa = ids.split(','); */ 
			var stuNum = $('#addNum').val();
			var typeFlag = $('#typeFlag').val();
			var url = "/bishe/groupuser/groupUser/allot.htm";
			
		    $.ajax({
	    		type: "POST",
	    		url: url,
	    		//data:{'groupIds': aa.join(","), 'stuNum': stuNum},
	    		data:{'stuNum': stuNum,'typeFlag':typeFlag},
	    		async: false,
	    		dataType:"json",
	    		success:function (data) {
	    			debugger
					if (data.status) {
 						//allotStu._initGridList(data.msg);	
						allotStu._initGridList();
					} else {
						DialogUtil.error(data.msg);
					}
	    		}
	    })
		}
		
		function saveAllot(){
			debugger;
			var zqBatch = $('#batch').val();
			var typeFlag = $('#typeFlag').val();
			var url = "/bishe/groupuser/groupUser/saveAllot.htm";
/* 			if(allotStuId === undefined || allotStuId.length == 0){
				DialogUtil.error("未获得分配的学生");
			} */
		    $.ajax({
	    		type: "POST",
	    		url: url,
	    		data:{"zqBatch" : zqBatch, "typeFlag" : typeFlag},
	    		async: false,
	    		dataType:"json",
	    		success:function (data) {
	    			debugger
					if (data.status) {
						DialogUtil.msg(data.msg);
						window.location.reload(true);
					} else {
						DialogUtil.error(data.msg);
					}
	    		}
	    })
		}
		</script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a onclick="allot()"class="btn btn-primary fa fa-back" ><span>分配</span></a>
					<a onclick="saveAllot()"class="btn btn-primary fa fa-back" ><span>保存</span></a>
					<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
				</div>
			</div>
			<%-- <input type="hidden" name="groupIds" id="groupIds" value="${groupIds}"/> --%>
			<input type="hidden" id="typeFlag"  value="${typeFlag}"/>
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">小组类型</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="type" name="type" value="${type}" validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">总人数</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="totalNum" name="totalNum"  validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">可分配学生</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="enableNum" name="enableNum"  validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">批次</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="batch" name="batch"  validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">添加学生个数</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="addNum" name="addNum" value="${addNum}" validate="{required:true}" />
				 	</div>
			  	</div>
			</div>
			
			
			
<!-- 			<div class="jqGrid_wrapper">
				<table id="groupUserGrid" ></table>
				<div id="groupUserPager"></div>
			</div> -->
			<div class="jqGrid_wrapper">
				<table id="allotStuGrid" ></table>
				<div id="allotStuPager">
			</div>
		</div>
	
	</body>
<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/groupUser.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/allotStu.js"></script>
<script type="text/javascript">
	$(function(){

        var typeFlag = "${typeFlag}";

        debugger
        var totalNumUrl = "/bishe/urlZhiYuant/urlZhiYuan/totalNum.htm";
        $.ajax({
            type: "POST",
            url: totalNumUrl,
            async: false,
            dataType:"json",
            data:{"typeFlag":typeFlag},
            success:function (data) {
                debugger
                if (data.status) {
                        $('#totalNum').val(data.msg);
                } else {
                    DialogUtil.error(data.msg);
                }
            }
        });

        //得到已分配学生数量  同时制作一份配学生词典
        //var typeFlag = "${typeFlag}";
        var enableNumUrl = "/bishe/groupuser/groupUser/enableNum.htm";
        debugger
        $.ajax({
            type: "POST",
            dataType:"json",
            data:{"typeFlag":typeFlag},
            url:enableNumUrl,
            async: false,
            /*    		contentType:"application/json",
             */		success:function (data) {
                debugger
                if (data.status) {
                    $('#enableNum').val($('#totalNum').val() - data.msg );
                } else {
                    DialogUtil.error(data.msg);
                }
            }
        });

        //得到教师标签
        var makeOrgTchLabelUrl = "/bishe/groupuser/groupUser/makeOrgTchLabel.htm";
        debugger
        $.ajax({
            type: "POST",
            dataType:"json",
            url:makeOrgTchLabelUrl,
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

        //得到小组标签
        var makeOrgGroupLabelUrl = "/bishe/groupuser/groupUser/makeOrgGroupLabel.htm";
        debugger
        $.ajax({
            type: "POST",
            dataType:"json",
            url:makeOrgGroupLabelUrl,
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


	});

</script>
</html>
