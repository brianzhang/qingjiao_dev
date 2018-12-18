
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/repair/bxd.js"></script>
		<title>t_bxd管理列表</title>
		
		<script type="text/javascript">
			$(function(){
				
			})
		
		
			function getData(gdzt){
				alert("gdzt:"+gdzt);
				$("#gdzt").val(gdzt);
				var url = '${ctx}/repairp/repair/bxd/list.htm?';
				 $("#listFrame").attr("src",url);
				
			}
			
			function getGdzt(){
					alert("gdzt");
				 var $gdzt=$("#gdzt").val();
				 return $gdzt;
			 }
			
			function addBxd(){
				alert("addBxd");
				var url = '${ctx}/repairp/repair/bxd/edit.htm';
				DialogUtil.dialog({
					   content: url,
					   title: '新增报修单',
					   area: ['800px', '550px'],
					   params:{},
					   shade:0,
					   id:"",//一个节点只能弹出一个窗口
					   resizing: function(layero){//窗口拉伸监听回调
//						   console.log(layero);
						   }
						   /* btn: [
							   {
								   label:'确定',
								   action:function(dialog,index){
											   
								   }
							   },
							   {
								   label:'取消',
								   action:function(dialog,index){
									   DialogUtil.close(index);
								   }
							   }
						   ] */
					});
			}
			
		</script>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<div id="add fa"><a class="btn btn-primary fa"   href="javascript:addBxd()" ><span>添加</span></a></div>
					        <%-- <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/repairp/repair/bxd/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/repairp/repair/bxd/remove.htm"><span>删除</span></a> --%>
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
							<input id="gdzt" type="hidden" name="gdzt" value=""/>
							<div  class="form-inline p-xxs">
								<div class="form-group">
									<label class="search-label">创建时间 </label>:
									<input type="text" name="Q^CREATE_TIME_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^CREATE_TIME_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">报修区域</label>:
									<input type="text"  name="Q^BAO_XIU_QU_YU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">详细地址</label>:
									<input type="text"  name="Q^XIANG_XI_DE_ZHI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">报修项目</label>:
									<input type="text"  name="Q^BAO_XIU_XIANG_MU_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">报修详细</label>:
									<input type="text"  name="Q^BAO_XIU_XIANG_XI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label class="search-label">预约时间 </label>:
									<input type="text" name="Q^YU_YAO_SHI_JIAN_^DL"  class="form-control date"  />
								</div>
								<div class="form-group">
									<label class="search-label" >至</label>:
									<input type="text" name="Q^YU_YAO_SHI_JIAN_^DG"  class="form-control date" />
								</div>
								<div class="form-group">
									<label   class="search-label">报修人</label>:
									<input type="text"  name="Q^BAO_XIU_REN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">联系方式</label>:
									<input type="text"  name="Q^LIAN_XI_FANG_SHI_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">上传图片</label>:
									<input type="text"  name="Q^SCTP^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工单类型</label>:
									<input type="text"  name="Q^GONG_DAN_LEI_XING_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">工单状态</label>:
									<input type="text"  name="Q^GDZT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">受理人</label>:
									<input type="text"  name="Q^SHOU_LI_REN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">执行人</label>:
									<input type="text"  name="Q^ZHI_HENG_REN_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">维修工</label>:
									<input type="text"  name="Q^WEI_XIU_GONG_^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">模板ID</label>:
									<input type="text"  name="Q^MU_BAN_I_D_^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
						<div>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工单状态<a class="btn" href="javascript:getData()">所有工单</a>
							<a class="btn" href="javascript:getData('未审核')">未审核</a>
							<a class="btn" href="javascript:getData('已受理')">已受理</a>
							<a class="btn" href="javascript:getData('已派工')">已派工</a>
							<a class="btn" href="javascript:getData('已转单')">已转单</a>
							<a class="btn" href="javascript:getData('已暂停')">已暂停</a>
							<a class="btn" href="javascript:getData('完工确认')">完工确认</a>
							<a class="btn" href="javascript:getData('已完工')">已完工</a>
							<a class="btn" href="javascript:getData('取消')">退回/取消</a>
						</div>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<!-- <div class="jqGrid_wrapper">
				<table id="bxdGrid" ></table>
				<div id="bxdPager"></div>
			</div> -->
			
			<iframe id="listFrame" frameborder="0"
				src="${ctx}/repairp/repair/bxd/list.htm"
				;
							scrolling="no" marginheight="0" marginwidth="0"
				width="1790" height="660"> </iframe>
		</div>
	
	</body>
	
</html>
