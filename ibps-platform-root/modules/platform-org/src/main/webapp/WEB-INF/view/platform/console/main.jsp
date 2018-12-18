<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<title>轻教平台</title>
<%@include file="/commons/include/main.jsp"%>
<f:link href="main.css" isCommon="false"/>
<script type="text/javascript" src="${ctx}/js/plugins/ibps/ibps.min.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/console/main.js"></script>

<body class="skin-1" >
	<div id="navbar" class="navbar navbar-default navbar-collapse  h-navbar" >
		<div class="navbar-container" id="navbar-container">
			<!-- /section:basics/sidebar.mobile.toggle -->
			<div class="navbar-header pull-left"  id="navbar-header">
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">切换左工具条</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				
			
				<!-- #section:basics/navbar.layout.brand -->
					<a data-toggle="dropdown" class="navbar-brand dropdown-toggle dropdown-menu-center  dropdown-hover dropdown-caret">
						<c:choose>
							<c:when test="${curSubsystem.logoType == 'image'}"><img alt="子系统图标" src="${ctx }/styles/commons/images/logo/${curSubsystem.logo}" width="24px" height="24px"/>${curSubsystem.name}</c:when>
							<c:otherwise> <i class="fa ${curSubsystem.logo}"></i> &nbsp;${curSubsystem.name}</c:otherwise>
						</c:choose>
						<i class="ibps-icon fa fa-caret-down"></i>
					</a>
					<!-- #section:subsystem 子系统 -->
						<ul class="dropdown-menu-center dropdown-navbar dropdown-menu dropdown-caret dropdown-close" style="left: 10px;" >
							<li class="dropdown-content" data-size="300">
							<ul class="dropdown-menu dropdown-navbar" >
								<c:forEach var="subsystem" items="${subsystemList}">
									<c:choose>
				            			<c:when test="${subsystem.id==curSubsystem.id }">
				            				<li class="disabled   grey-bg" style="background-color: #E5E5E5;">
												<a href="javascript:void(0);" ><i class="ibps-icon fa fa-check-square-o"></i>&nbsp;&nbsp;${subsystem.name}</a>
											</li>
				            			</c:when>
				            			<c:otherwise>
			            					<li class="switchSystem"  data-id="${subsystem.id }">
			            						<a href="javascript:void(0);"  ><i class="ibps-icon fa fa-square-o"></i>&nbsp;&nbsp;${subsystem.name}</a>
			            					</li>
				            			</c:otherwise>
			            			</c:choose>
								</c:forEach>
							</ul>
						</li>
					</ul>
			
				<!-- #section:basics/navbar.toggle 缩小布局 -->
				<button class="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
						<span class="sr-only">切换用户菜单</span>
						<img src="${ctx}${pictureLoad}" style="max-height:40px;" alt="${curUser.fullname } 相片"    id="picture"  onerror="this.src='${ctx}/commons/image/default_use_image.jpg'"/>
				</button>
				<!-- /section:basics/navbar.toggle  end缩小布局 -->
			</div>
			
			<nav role="navigation" class="navbar-menu pull-left collapse navbar-collapse"  id="navbar-menu">
					<!-- #section:basics/navbar.nav -->
					<ul id="nav-menu"   class="nav navbar-nav" ></ul>
					<!-- /section:basics/navbar.nav -->
				</nav>
			
		

			<!-- #section:basics/navbar.dropdown -->
			<div class="navbar-buttons navbar-header pull-right  collapse navbar-collapse" role="navigation" id="navbar-buttons">
				<ul class="nav ibps-nav">
					<!-- #section:message 消息 -->
					<li class="purple">
						<a data-toggle="dropdown" class="dropdown-toggle"  id="innerMessage" href="javascript:void(0)">
							<i class="ibps-icon fa fa-bell icon-animated-bell"></i>
							<span class="badge badge-important"  id="readMsg">${readMsg}</span>
						</a>

						<ul class="dropdown-menu-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">
							<li class="dropdown-header">
								<i class="ibps-icon fa fa-exclamation-triangle"></i>
								<span id="readShowMsg">${readMsg }</span>消息
							</li>

							<li class="dropdown-content">
									<ul class="dropdown-menu dropdown-navbar"  id="msgList">
								</ul>
							</li>
								<li class="dropdown-footer">
									<a href="javascript:void(0);" data-id="receiveMessage" data-toggle="menuTab" data-title="收到的消息"  data-icon="fa-bell"  data-url="/platform/msg/innerMessage/receive.htm" >查看更多
										<i class="ibps-icon fa fa-arrow-right"></i>
									</a>
								</li>
						</ul>
					</li>
					<!-- #section:message 消息 -->
					<li class="green">
						<a data-toggle="dropdown" class="dropdown-toggle" href="javascript:void(0)" id="outMail">
							<i class="ibps-icon fa fa-envelope icon-animated-vertical"></i>
							<span class="badge badge-success">${outMailMsg }</span>
						</a>

						<ul class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
							<li class="dropdown-header">
								<i class="ibps-icon fa fa-envelope-o"></i>
								<span id="readShowMailMsg">${outMailMsg }</span> 邮件
							</li>

							<li class="dropdown-content">
								<ul class="dropdown-menu dropdown-navbar"  id="outMailList">
								</ul>
							</li>

							<li class="dropdown-footer">
								<a href="javascript:void();" data-id="outMail" data-toggle="menuTab" data-title="外部邮件"  data-icon="fa-mail"  data-url="/platform/mail/outMail/manage.htm">
									查看更多
									<i class="ibps-icon fa fa-arrow-right"></i>
								</a>
							</li>
						</ul>
					</li>

					<!-- #section:basics/navbar.user_menu -->
					<li class="light-blue">
						<a data-toggle="dropdown" href="javascript:void(0)" class="dropdown-toggle">
							<img class="nav-user-photo" src="${ctx}${pictureLoad}"   alt="${curUser.fullname } 相片"   style="width: 40px; height: 40px;"   id="picture"  onerror="this.src='${ctx}/commons/image/default_use_image.jpg'"/>
							<span class="user-info">
								<small>欢迎您,</small>
								${curUser.fullname }
							</span>

							<i class="ibps-icon fa fa-caret-down"></i>
						</a>

						<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
							<c:if test="${registerEnabled == 'false'}">
							<li>
								<a  href="javascript:void(0);"  class="addTab"  data-id="changePassword"    data-toggle="menuTab"  data-title="修改密码"  data-icon="fa-lock"  data-url="/platform/org/partyUser/changePasswordView.htm?userId=${curUser.userId}">
									<i class="ibps-icon fa fa-cog"></i>
									修改密码
								</a>
							</li>
							<li>
								<a href="javascript:void(0);"  class="addTab"  data-id="userInfo"    data-toggle="menuTab" data-title="	个人信息"  data-icon="fa-user"  data-url="/platform/org/partyEmployee/get.htm?id=${curUser.userId}&isDialog=true">
									<i class="ibps-icon fa fa-user"></i>
									个人信息
								</a>
							</li>
							</c:if>
							
							<li class="dropdown-hover">
								<a href="javascript:void(0);" class="clearfix">
									<span class="pull-left"><i class="ibps-icon fa fa-bookmark"></i>切换皮肤</span>
									<i class="ibps-icon fa fa-caret-left pull-right"></i>
								</a>		
									<ul class="dropdown-menu dropdown-menu-right">
			            					<li  class="skin" skin="no-skin">
			            						<a href="javascript:void(0);"  ><i class="ibps-icon fa fa-square " style="color: #438EB9"></i>&nbsp;&nbsp;默认</a>
			            					</li>
			            					<li  class="skin" skin="skin-1" >
			            						<a href="javascript:void(0);"  ><i class="ibps-icon fa fa-square " style="color: #222A2D"></i>&nbsp;&nbsp;黑色</a>
			            					</li>
			            					<li  class="skin" skin="skin-2" >
			            						<a href="javascript:void(0);" ><i class="ibps-icon fa fa-square " style="color: #C6487E"></i>&nbsp;&nbsp;粉色</a>
			            					</li>
			            					<li  class="skin" skin="skin-3" >
			            						<a href="javascript:void(0);"   ><i class="ibps-icon fa fa-square " style="color: #D0D0D0"></i>&nbsp;&nbsp;灰色</a>
			            					</li>
									</ul>
							</li>
							
			<!-- 				<li>
								<div style="padding-top: 20px;padding-left: 10px;padding-right: 10px;">
									    <input id="fontsize" type="text" data-slider-min="70" data-slider-max="130" data-slider-step="1" data-slider-value="100" data-slider-ticks="[70, 100,130]"/>
								</div>
							</li> -->
						
							<c:if test="${cookie.orig_switch_local!=null}">
							<li>
								<a href="javascript:void(0);" id="userSwitch" data-value="${cookie.orig_switch_local.value}">
									<i class="ibps-icon fa fa-reply"></i>
									退出切换用户
								</a>
							</li>
							</c:if>
							
							<li class="divider"></li>
							
							<li>
								<a href="javascript:void(0);" id="logout" >
									<i class="ibps-icon fa fa-power-off"></i>
									退出
								</a>
							</li>
						</ul>
					</li>
					<!-- /section:basics/navbar.user_menu -->
				</ul>
			</div>

			<!-- /section:basics/navbar.dropdown -->
		</div><!-- /.navbar-container -->
	</div>
	
<!-- -头部信息 end -->

<!-- 主体内容 -->
	<div class="main-container" id="main-container">
		<!-- 左侧的树 -->
		<div id="sidebar"  class="sidebar  responsive sidebar-fixed sidebar-scroll compact"  data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true" style="z-index: 1000;">
		<!-- #section:basics/sidebar.layout.minimize -->
			<div class="nav-wrap" >
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ibps-icon fa fa-angle-double-left" data-icon1="ibps-icon fa fa-angle-double-left" data-icon2="ibps-icon fa fa-angle-double-right" title="收缩"></i>
				</div>
				<ul class="nav nav-list"  id="leftMenu"></ul><!-- /.nav-list -->
			
			</div>
		</div>
		<!-- 左侧的树end -->
		<div  class="main-content"  id="mainContent">
			<div class="page-content">
				<div class="page-content-area">
					<div id="page-content-wrapper" class="rm-transition">
							<!--Tab部分开始-->
							<div class="content-tabs">
								<button class="roll-nav roll-left J_tabLeft">
									<i class="fa fa-backward"></i>
								</button>
								<nav class="page-tabs J_menuTabs">
									<div class="page-tabs-content">
										<a href="javascript:void(0);" class="active J_menuTab"
											data-id="home"><span class="fa fa-home"></span>首页</a>
									</div>
								</nav>
								<button class="roll-nav roll-right J_tabRight">
									<i class="fa fa-forward"></i>
								</button>
							</div>
							<!-- /.Tab部分结束-->
							<!--主体部分开始-->
							<div class="J_mainContent" id="content-main"></div>
							<!-- /.主体部分结束-->
				</div>

				</div><!-- /.page-content-area -->
			</div>
		</div>
	</div>
	<!--隐藏域-->
	<input type="hidden"  id="homePage" value="${curSubsystem.homePage}"/>
	<input type="hidden"  id="isLocal" value="${curSubsystem.isLocal}"/>
	<input type="hidden"  id="baseUrl" value="${curSubsystem.baseUrl}"/>
	<input type="hidden"  id="logoutUrl" value="${logout}"/>
	
     <div id="context-menu"  >
        <ul class="dropdown-menu" role="menu">
            <li><a data-action="tab-refresh" ><i class="fa fa-refresh"></i>&nbsp;&nbsp;重新加载</a></li>
            <li class="divider"></li>
            <li><a  data-action="tab-close-right"><i class="fa fa-close"></i>&nbsp;&nbsp;关闭右侧</a></li>
            <li><a data-action="tab-close-left" ><i class="fa fa-times-circle"></i>&nbsp;&nbsp;关闭左侧</a></li>
            <li class="divider"></li>
            <li><a data-action="tab-close-other"><i class="fa fa-close"></i>&nbsp;&nbsp;关闭其它</a></li>
            <li><a data-action="tab-close-all" ><i class="fa fa-times-circle"></i>&nbsp;&nbsp;关闭全部</a></li>
            <li><a data-action="tab-close"><i class="fa fa-times-circle-o"></i>&nbsp;&nbsp;关闭当前</a></li>
        </ul>
      </div>

</body>
</html>