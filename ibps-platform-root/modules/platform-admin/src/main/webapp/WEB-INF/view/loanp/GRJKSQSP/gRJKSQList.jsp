
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GRJKSQSP/gRJKSQ.js"></script>
		<title>t_grjksqspb管理列表</title>
	</head>
	<body>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div  class="toolbar-panel ">
				<div class="toolbar-box">
					<div class="toolbar-head clearfix">
						<!-- 顶部按钮 -->
						<div class="buttons"> 		
							<a class="btn btn-primary fa fa-search" href="javascript:void(0);" ><span>搜索</span></a>
							<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/GRJKSQSP/gRJKSQ/edit.htm?sfid=${sfid}" ><span>添加</span></a>
					        <a class="btn btn-primary fa fa-edit"   href="javascript:void(0);"  action="${ctx}/loanp/GRJKSQSP/gRJKSQ/edit.htm" ><span>编辑</span></a>	 
					        <a class="btn btn-primary fa fa-remove" href="javascript:void(0);"  action="${ctx}/loanp/GRJKSQSP/gRJKSQ/remove.htm"><span>删除</span></a>
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
									<label   class="search-label">客户类型</label>:
									<input type="text"  name="Q^KHLX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户英文名</label>:
									<input type="text"  name="Q^KHYWM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否有户籍证明</label>:
									<input type="text"  name="Q^SFYHJZM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">民族</label>:
									<input type="text"  name="Q^MZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户名称</label>:
									<input type="text"  name="Q^KHMC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户曾用名</label>:
									<input type="text"  name="Q^KHCYM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件有效期限</label>:
									<input type="text"  name="Q^ZJYXQX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">客户性别</label>:
									<input type="text"  name="Q^KHXB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件类别</label>:
									<input type="text"  name="Q^ZJLB^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">证件号码</label>:
									<input type="text"  name="Q^ZJHM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">婚姻状况</label>:
									<input type="text"  name="Q^HYZK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">最高学历</label>:
									<input type="text"  name="Q^ZGXL^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">最高学位</label>:
									<input type="text"  name="Q^ZGXW^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">个人健康状况</label>:
									<input type="text"  name="Q^GRJKZK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">政治面貌</label>:
									<input type="text"  name="Q^ZZMM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">出生日期</label>:
									<input type="text"  name="Q^CSRQ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">行政区划（客户所属地区）</label>:
									<input type="text"  name="Q^XZQH^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">户口性质</label>:
									<input type="text"  name="Q^HKXZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">户籍地址</label>:
									<input type="text"  name="Q^HJDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否户主</label>:
									<input type="text"  name="Q^SFHZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">通信地址</label>:
									<input type="text"  name="Q^TXDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否本行股东</label>:
									<input type="text"  name="Q^SFBXGD^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">通信地址邮政编码</label>:
									<input type="text"  name="Q^TXDZYZBM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">手机号码</label>:
									<input type="text"  name="Q^SJHM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">其他联系方式</label>:
									<input type="text"  name="Q^QTLXFS^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">电子邮箱</label>:
									<input type="text"  name="Q^DZYX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">专业特长</label>:
									<input type="text"  name="Q^ZYTZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">居住地址</label>:
									<input type="text"  name="Q^JZDZ^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">居住状况</label>:
									<input type="text"  name="Q^JZZK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">居住状态</label>:
									<input type="text"  name="Q^JZZT^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">居住地邮政编码</label>:
									<input type="text"  name="Q^JZDYZBM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要经营项目</label>:
									<input type="text"  name="Q^ZYJYXM^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要经济来源</label>:
									<input type="text"  name="Q^ZYJJLY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">其他经济来源</label>:
									<input type="text"  name="Q^QTJJLY^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">个人综合年收入</label>:
									<input type="text"  name="Q^GRZHNSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">家庭人均年收入</label>:
									<input type="text"  name="Q^JTRJNSR^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">家庭年均支出</label>:
									<input type="text"  name="Q^JTNJZC^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">主要供养人口</label>:
									<input type="text"  name="Q^ZYGYRK^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">与我社关系</label>:
									<input type="text"  name="Q^YWSGX^SL"  class="form-control"  />
								</div> 
								<div class="form-group">
									<label   class="search-label">是否个体工商户</label>:
									<input type="text"  name="Q^SFGTGSH^SL"  class="form-control"  />
								</div> 
							</div>
						</form>
					</div><!--/ 查询条件-->
				</div>
			</div><!--/ 操作、查询-->
			<div class="jqGrid_wrapper">
				<table id="gRJKSQGrid" ></table>
				<div id="gRJKSQPager"></div>
			</div>
		</div>
	<input type="hidden"  id="sfid" value="${sfid}">
	</body>
	
</html>
