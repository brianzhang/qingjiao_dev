
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/oldFile/oldFile.js"></script>
		<title>t_oldfile管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
					<input type="hidden" name="m:urlZhiYuan:id"  id="getid"value=${id} />
					<input type="hidden" name="m:urlZhiYuan:id"  id="gettype"value=${type} />
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-back" href="${ctx}/bishe/urlZhiYuant/urlZhiYuan/infoForWord.htm?id=${id}&type=1" id="view"><span>返回</span></a>
							<a class="btn btn-primary fa fa-back" href="${ctx}/bishe/urlZhiYuant/urlZhiYuan/kaitiTeacherCheck.htm?id=${id}" id="view2"><span>返回</span></a>
							<a class="btn btn-primary fa fa-back" onclick="set3href()"  id="view3"><span>返回</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="oldFileGrid" ></table>
				<div id="oldFilePager"></div>
			</div>
		</div>
	
	</body>
	<script type="text/javascript">
	$(function() {
	    debugger
		var type=${type};
		if (type == '3' || type == '4'){
            document.getElementById("view").style.display = "none";
            document.getElementById("view2").style.display = "none";
		}else {

            if(type=="1"){
                document.getElementById("view").style.display = "none";
                document.getElementById("view3").style.display = "none";
            }else {
                document.getElementById("view2").style.display = "none";
                document.getElementById("view3").style.display = "none";
            }
		}

	});
	function set3href() {
        var id =$('#getid').val();
        var url = __ctx + "/bishe/urlZhiYuant/urlZhiYuan/tchReview.htm?id="+id ;
        $('a#view3').attr('href',url);
    }
	</script>
	
</html>
