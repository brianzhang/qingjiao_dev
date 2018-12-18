<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/list.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/mail/outMail.js"></script>
		<title>外部邮件管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	<c:choose>
		<c:when test="${empty setId }">
			<div class="alert alert-warning m-t-sm" >
				请先在"<a href="${ctx }/platform/mail/mailConfig/list.htm">邮箱配置</a>"配置外部邮件！
			</div>
		</c:when>
		<c:otherwise>
			<div  class="toolbar-panel ">
					<div class="toolbar-box">
						<div class="toolbar-head clearfix">
							<!-- 顶部按钮 -->
							<div class="buttons"> 		
								<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
								<c:if test="${types!='deleted' and types!='dustbin'}">
									<a class="btn btn-primary fa fa-send"   href="${ctx}/platform/mail/outMail/edit.htm?setId=${setId}" ><span>写信</span></a>
							        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/mail/outMail/deleted.htm"><span>删除</span></a>
								</c:if>
								<a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/platform/mail/outMail/remove.htm"><span>彻底删除</span></a>
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
								<input type="hidden" id="setId"  name="setId"  value="${setId}"/>
									<input type="hidden" id="types"  name="types"  value="${types}"/>
									<div  class="form-inline p-xxs">
										<c:if test="${types eq 'inbox'}">
											<div class="form-group">
												<label   class="search-label">发件人</label>:
												<input type="text"  name="Q^sender_name_^SL"  class="form-control"  />
											</div> 
										</c:if>
										<c:if test="${types != 'inbox'}">
											<div class="form-group">
												<label   class="search-label">收件人</label>:
												<input type="text"  name="Q^receiver_names_^SL"  class="form-control"  />
											</div> 
										</c:if>
										<div class="form-group">
											<label   class="search-label">主题</label>:
											<input type="text"  name="Q^title_^SL"  class="form-control"  />
										</div> 
										<div class="form-group">
											<label class="search-label">日期 </label>:
											<input type="text" name="Q^mail_date_^DL"  class="form-control date"  />
										</div>
										<div class="form-group">
											<label class="search-label" >至</label>:
											<input type="text" name="Q^mail_date_^DG"  class="form-control date" />
										</div>
									</div>
							</form>
						</div><!--/ 查询条件-->
					</div>
				</div><!--/ 操作、查询-->
				<div class="jqGrid_wrapper">
					<table id="outMailGrid" ></table>
					<div id="outMailPager"></div>
				</div>

				</c:otherwise>
		</c:choose>
				</div>
	</body>
	
</html>