<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<head>
<title>轻教平台</title>
<%@include file="/commons/include/register.jsp"%>
</head>
<body class=" login scroll-animations-activated hidden" id="registerBody">
        <!-- BEGIN REGISTER -->
        <div class="content  animated bounceIn" data-animation="bounceIn">
            <!-- BEGIN REGISTER FORM -->
            <form class="login-form" method="post">
                <h3 class="form-title">注册IBPS平台账户</h3>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">中文姓名</label>
                    <div class="input-icon">
                        <i class="fa fa-user"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" 
                        	placeholder="中文姓名" id="fullName" name="fullName" tabindex="1"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">性别</label>
                    <div class="input-icon">
                        <label class="radio-inline ">
                        	<input type="radio" value="男" name="gender" checked class="ibps"><span class="lbl">先生</span>
						</label> 
						<label class="radio-inline ">
							<input type="radio" value="女" name="gender" class="ibps"><span class="lbl">女士</span>
						</label>
					</div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">公司名称</label>
                    <div class="input-icon">
                        <i class="fa fa-university"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" 
                        	placeholder="公司名称" id="company" name="company" tabindex="2" /> </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">地区</label>
                    <div class="input-icon" >
                        <div style="position: relative;">
							<input type="text"class="form-control"readonly
							id="area"name="area"
							data-toggle="city-picker"
								  data-split="-"
								  data-top="province"
								  data-topval="CN"
								  data-level="city"
								  placeholder="地区"
								  value="广东省-广州市"
							/>
						</div>
					</div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">手机号码</label>
                    <div class="input-icon">
                        <i class="fa fa-mobile"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" 
                        	placeholder="手机号码" id="mobile" name="mobile" tabindex="4" /> </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">登录密码</label>
                    <div class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" 
                        	placeholder="登录密码"  id="passWd"name="passWd" tabindex="5" /></div>
                </div>
			  	<div class="form-group hidden" id="validCodeFormGroup">
                    <div class="input-group">
                    	<label class="control-label visible-ie8 visible-ie9">验证码</label>
                        <div class="input-icon">
               				<i class="fa fa-qrcode"></i>
               				<input  class="form-control placeholder-no-fix"  style="z-index: 0;"  type="text" autocomplete="off" placeholder="验证码"  id="validCode"name="validCode" tabindex="6"  />
               			 </div>  
               			<span class="input-group-addon" style="padding: 0; border: 0; background-color:transparent;">
	                    <a id="sendSms" href="javascript:void(0);"  class="btn btn-info  pull-right">获取短信验证码</a>
               			</span>    
                    </div>
                </div>
                <div class="form-actions">
              		  <div class="pull-left">
                  		<label class="rememberme mt-checkbox mt-checkbox-outline">
                        		<input type="checkbox" id="agreement"    checked="checked"/>注册帐号即表示您同意并愿意遵守<a href="javascript:;" onclick="showAgreement()">《用户协议》</a>
                  		           <span></span>
                  		  </label>
                    </div>
                </div>
                <div> <a id="register" href="javascript:void(0);"  class="btn btn-lg  green "   style="width: 100%;" > 注&nbsp;&nbsp;册&nbsp;&nbsp;</a></div>
       		 </form>
     		<div class="create-account">
                  <p>
                      <a  id="login" href="${ctx}/login.jsp"  style="width: 80%;" >返回登录</a>
                  </p>
              </div>
       		        <!-- END REGISTER FORM -->
       </div>
         <!-- END REGISTER -->
         <div class="copyright"> 2015-2018 &copy; <a href="http://www.bpmhome.cn" target="_blank">哈尔滨工程大学</a> - All Rights Reserved. </div>
	<div id="agreementTemp" style="display: none">
		        <ol>
	                <li>遵守所有使用网站服务的网络协议、规定、程序和惯例.</li>
	                <li>不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益.</li>
	                <li>不得利用本站制作、复制和传播下列信息:
	                  <ol>
	                    <li>煽动抗拒、破坏宪法和法律、行政法规实施的;</li>
	                    <li>煽动颠覆国家政权，推翻社会主义制度的;</li>
	                    <li>煽动分裂国家、破坏国家统一的;</li>
	                    <li>煽动民族仇恨、民族歧视，破坏民族团结的;</li>
	                    <li>捏造或者歪曲事实，散布谣言，扰乱社会秩序的</li>
	                    <li>宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的;</li>
	                    <li>公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的;</li>
	                    <li>损害国家机关信誉的;</li>
	                    <li>其他违反宪法和法律行政法规的;</li>
	                  </ol>
	                </li>
	                <li>本系统帐号的所有权归<span class="red">广州流辰信息技术有限公司（以下简称广州流辰）</span>，用户完成注册申请手续后，获得系统账号使用权.</li>
	                <li>本系统为试用系统，会不定期对系统内数据进行清理，因此造成用户的数据丢失，广州流辰不承担任何责任.</li>
	                <li>广州流辰保留最终解释权.</li>
	              </ol>
	</div>
	<script type="text/javascript">
		var __ctx = '${ctx}';
		$("#registerBody").removeClass("hidden");
		$("#validCodeFormGroup").removeClass("hidden");
	</script>
	<script type="text/javascript" src="${ctx}/js/lc/platform/console/register.js"></script>
</body>
</html>
