
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/gradGroup.js"></script>
		<title>抽签</title>
		<script type="text/javascript">
		function getData(){
			

			
			var type = $('#type').val();
			//var curBatch = $('#batch').val(); $("#s option:selected").text();
            var curBatch = $('#batch').val();
			var typeFlag = $('#typeFlag').val();
		
			/* 得到当前批次的总人数 */
			debugger
			var curBatchTotalNumUrl = "/bishe/urlZhiYuant/urlZhiYuan/curBatchTotalNum.htm";
		    $.ajax({
		    		type: "POST",
		    		url: curBatchTotalNumUrl,
		    		async: false,
		    		data:{"typeFlag":typeFlag,"curBatch":curBatch},
		    		dataType:"json",
		    		//contentType:"application/json",
		    		success:function (data) {
		    			debugger
						if (data.status) {
							$('#curBatchTotalNum').val(data.msg);
						    var curBatchEnableNumUrl = "/bishe/groupuser/groupUser/curBatchEnableNum.htm";
						    debugger
						    $.ajax({
						    	type: "POST",
						    	dataType:"json",
						    	data:{"typeFlag":typeFlag,"curBatch":curBatch},
						    	url:curBatchEnableNumUrl,
						   		async: false,
						/*    		contentType:"application/json",
						 */		success:function (data) {
									debugger
									if (data.status) {
										$('#curBatchEnableNum').val($('#curBatchTotalNum').val() - data.msg );
                                        //预分配（根据打分情况得到系统提供的分配方案 ） xx小组可以匹配xx学生  检测小组是否合理
                                        var groupAllotStuMapForDb = "/bishe/groupuser/groupUser/groupAllotStuMapForDb.htm";
                                        debugger
                                        $.ajax({
                                            type: "POST",
                                            dataType:"json",
                                            data:{"typeFlag":typeFlag},
                                            url:groupAllotStuMapForDb,
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
									} else {
										DialogUtil.error(data.msg);
									}
						    	}
						    }); 
						    debugger
                            $('#groupUserGrid').jqGrid('setGridParam', {
                                url : __ctx+'/bishe/groupuser/groupUser/listJsonForNo.htm?flag=1&typeFlag=' + typeFlag +'&curBatch=' + curBatch,
                                page : 1
                            }).trigger("reloadGrid");
                            // groupUser._initGridList();
							
						} else {
							DialogUtil.error(data.msg);
							window.location.reload(true);
							return;
						}
		    		}
		    });
		    

		}
		</script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a onclick="groupUser.start()"class="btn btn-primary fa fa-back" ><span>开始</span></a>
					<%--<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>--%>
				</div>
			</div>
			<%-- <input type="hidden" name="groupIds" id="groupIds" value="${groupIds}"/> --%>
            <form class="fr-form" id="groupUserForm" >
			<input type="hidden" id="typeFlag"  value="${typeFlag}"/>
			
			<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">小组类型</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="type" name="type" value="${type}" validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>
			
			
<%--			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">批次</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="batch" name="batch"  validate="{required:true}" onchange="getData()"/>
				 	</div>
			  	</div>
			</div>--%>

<%--			<div class="fr_response_field col-sm-12" >
			<div class="form-group">
				<label   class="search-label">批次</label>:
				<div class="fr-form-block">
				<select id="batch" name="batch" class="form-control " onchange="getData()">
					<option value="">--所有--</option>
					<c:forEach items="${batchList}" var="batch">
						<option value="${batch}">${batch}</option>
					</c:forEach>
				</select>
				</div>
			</div>
			</div>--%>

			<div class="fr_response_field col-sm-3" >
				<div class="fr-form-group">
					<label class="fr-control-label">批次</label>
					<div class="fr-form-block">
						<select class="fr-form-control"  id="batch" name="batch" validate="{required:false}" onchange="getData()">
							<option value="-1"></option>
							<c:forEach items="${batchList}" var="batch">
								<option value="${batch}">${batch}</option>
							</c:forEach>
						</select>
					</div>
				</div>
			</div>
			
			<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">当前总人数</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="curBatchTotalNum" name="curBatchTotalNum"  validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>
			
			<div class="fr_response_field col-sm-3 hidden" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">当前可分配学生</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="curBatchEnableNum" name="curBatchEnableNum"  validate="{required:true}" readonly="true"/>
				 	</div>
			  	</div>
			</div>

			<div class="fr_response_field col-sm-3 hidden" >
				<div class="fr-form-group">
					<label class="fr-control-label">已分配学生</label>
					<div class="fr-form-block">
						<input type="text" class="fr-form-control" id="visualNum" name="visualNum"  validate="{required:false}" readonly="true"/>
					</div>
				</div>
			</div>
			
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">轮数</label>
				  	<div class="fr-form-block">
					<input type="text" class="fr-form-control" id="numBatch" name="m:groupUser:numBatch" value="${numBatch}" validate="{required:true,digits:true}" />
				 	</div>
			  	</div>
			</div>
            </form>
			<div class="fr_response_field col-sm-6" >
				<div class="jqGrid_wrapper">
					<table id="groupUserGrid" ></table>
					<div id="groupUserPager"></div>
				</div>
			</div>

			<div class="fr_response_field col-sm-6" >
				<div class="jqGrid_wrapper">
					<table id="gradGroupGrid" ></table>
					<div id="gradGroupPager"></div>
				</div>
			</div>
			<!-- 小组列表 -->
			<%--<div class="jqGrid_wrapper">--%>
			<%----%>
				<%--<table id="groupUserGrid" ></table>--%>
				<%--<div id="groupUserPager"></div>--%>
				<%----%>
				<%--<table id="gradGroupGrid" ></table>--%>
				<%--<div id="gradGroupPager"></div>--%>
				<%----%>

			<%--</div>--%>
			
			<!-- 抽取列表  -->
			<div class="jqGrid_wrapper">

			</div>
		</div>
	
	</body>
	<script type="text/javascript" src="${ctx}/js/lc/bishe/groupuser/groupUserForDrawLots.js"></script>
	<script type="text/javascript">
	
    //得到分配批次表 (中期和答辩)
    var zqBatchMapURL = "/bishe/groupuser/groupUser/zqBatchMap.htm";
    debugger
    $.ajax({
    	type: "POST",
    	dataType:"json",
    	url:zqBatchMapURL,
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
     
    //预分配（根据打分情况得到系统提供的分配方案 ） xx小组可以匹配xx学生  检测小组是否合理
    var typeFlag = $('#typeFlag').val();
    var preAllotURL = "/bishe/groupuser/groupUser/preAllot.htm";
    debugger
    $.ajax({
    	type: "POST",
    	dataType:"json",
        data:{"typeFlag":typeFlag},
    	url:preAllotURL,
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

    //预分配（根据打分情况得到系统提供的分配方案 ） xx小组可以匹配xx学生  检测小组是否合理
    var groupAllotStuMapForDb = "/bishe/groupuser/groupUser/groupAllotStuMapForDb.htm";
    debugger
    $.ajax({
        type: "POST",
        dataType:"json",
        data:{"typeFlag":typeFlag},
        url:groupAllotStuMapForDb,
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
