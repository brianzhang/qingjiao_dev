
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanForChangeBatch.js"></script>
		<title>t_zyurl管理列表</title>
	</head>
	<script  type="text/javascript">
        debugger
        var index = null;
        function upload() {
            var path = $('#xlsFile').val();
            var frm = $('#importForm').form();

            frm.ajaxForm({
                dataType : 'json',
                success : function(data) {
                    data.success ? DialogUtil.alert(data.msg) : DialogUtil
                        .error(data.msg);
                    DialogUtil.close(index);
                    location.reload();
                },
                error : function(msg) {
                    DialogUtil.error(msg)
                }
            });

            if (frm.valid()) {
                index = DialogUtil.load();
                $('#importForm').submit();
            }
        }

        function in_click() {
            debugger
            $('#xlsFile').click();
        }


        var index = null;
        function upload1() {
            var path = $('#xlsFile1').val();
            var frm = $('#importForm1').form();

            frm.ajaxForm({
                dataType : 'json',
                success : function(data) {
                    data.success ? DialogUtil.alert(data.msg) : DialogUtil
                        .error(data.msg);
                    DialogUtil.close(index);
                    location.reload();
                },
                error : function(msg) {
                    DialogUtil.error(msg)
                }
            });

            if (frm.valid()) {
                index = DialogUtil.load();
                $('#importForm1').submit();
            }
        }

        function in_click1() {
            debugger
            $('#xlsFile1').click();
        }
	</script>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-upload" onclick="in_click1()" href="javascript:void(0);"><span>导入学生序号</span></a>
							<a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/bishe/urlZhiYuant/urlZhiYuan/editBatch.htm" ><span>修改批次</span></a>
						</div>
						<!-- 收缩 -->
						<div class="tools">
							<a href="javascript:void(0);" class="collapse">
								<i class="bigger-180 fa  fa-angle-double-up"></i>
							</a>
						</div>
					</div>
					<!-- #查询条件-->
					<div class="toolbar-body" >
						<form role="form" class="search-form">
							<div  class="form-inline p-xxs">
							    <div class="form-group">
									<label   class="search-label">班级</label>:
									<input type="text"  name="Q^CLASSR^SL"  class="form-control"  />
								</div>
							    <div class="form-group">
									<label   class="search-label">学号</label>:
									<input type="text"  name="Q^XH^SL"  class="form-control"  />
								</div>
								<div class="form-group">
									<label   class="search-label">姓名</label>:
									<input type="text"  name="Q^NAME^SL"  class="form-control"  />
								</div>
								<div class="form-group">
									<label   class="search-label">指导教师</label>:
									<input type="text"  name="Q^finalteacher^SL"  class="form-control"  />
								</div>
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="urlZhiYuanGrid" ></table>
				<div id="urlZhiYuanPager"></div>
			</div>
			<form id="importForm1" method="post"
				  action="/bishe/urlZhiYuant/urlZhiYuan/saveStuTodb.htm" enctype="multipart/form-data">
				<input  style="display: none" type="file" size="40" name="xlsFile1" id="xlsFile1"accept="application/vnd.ms-excel" class="inputText input-wh-9" onchange="upload1()"></input>
			</form>
		</div>
	
	</body>
	
</html>
