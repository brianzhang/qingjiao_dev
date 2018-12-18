package com.lc.ibps.platform.console.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.exception.BaseException;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringValidator;
import com.lc.ibps.base.web.controller.BaseController;
import com.lc.ibps.base.web.servlet.ValidCode;
import com.lc.ibps.base.web.util.CaptchaUtils;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.register.domain.RegData;
import com.lc.ibps.register.persistence.entity.RegDataPo;
import com.lc.ibps.register.repository.RegDataRepository;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

import net.sf.json.JSONObject;

/** 
 * 注册访问控制器。<br>
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年4月6日-下午4:29:10
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/")
public class RegisterController extends BaseController {

	private static final String MOBILE = "register_mobile";
	@Resource
	private RegDataRepository regDataRepository;
	
	@RequestMapping("register")
	public void register(HttpServletRequest request, HttpServletResponse response, RegDataPo regDataPo) throws IOException {
		ResultMessage message=null;
		try {
			HttpSession session = request.getSession();
			String code = RequestUtil.getString(request, "validCode");
			String sessionMobile = (String) session.getAttribute(MOBILE);
			String validCode = (String) session.getAttribute(ValidCode.SESSION_NAME_CAPTCHA);
			if (validCode == null || StringUtils.isEmpty(code) || !validCode.equalsIgnoreCase(code)) {
				throw new BaseException("验证码不正确");
			}
			
			if(BeanUtils.isEmpty(regDataPo)){
				throw new BaseException("注册数据为空");
			}
			if(!StringValidator.isMobile(regDataPo.getMobile())){
				throw new BaseException("手机号码为空");
			}
			if(!sessionMobile.equals(regDataPo.getMobile())){
				throw new BaseException("手机号码不一致");
			}
			
			//RegDataRepository regDataRepository = AppUtil.getBean(RegDataRepository.class);
			regDataRepository.isExist(regDataPo.getMobile());
			
			//构造领域对象和保存数据
			RegData regData =regDataRepository.newInstance(regDataPo);
			regData.create();
			message=new ResultMessage(ResultMessage.SUCCESS, "用户注册成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "用户注册失败,"+e.getMessage());
			logger.error("注册信息失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("forget")
	public void forget(HttpServletRequest request, HttpServletResponse response, RegDataPo regDataPo) throws IOException {
		ResultMessage message=null;
		try {
			HttpSession session = request.getSession();
			String code = RequestUtil.getString(request, "validCode");
			String sessionMobile = (String) session.getAttribute(MOBILE);
			String validCode = (String) session.getAttribute(ValidCode.SESSION_NAME_CAPTCHA);
			if (validCode == null || StringUtils.isEmpty(code) || !validCode.equalsIgnoreCase(code)) {
				throw new BaseException("验证码不正确");
			}
			
			String pwd = regDataPo.getPassWd();
			regDataPo = regDataRepository.getByMobile(regDataPo.getMobile());
			if(BeanUtils.isEmpty(regDataPo)){
				message=new ResultMessage(ResultMessage.FAIL, "用户数据为空");
			}else{
				if(!StringValidator.isMobile(regDataPo.getMobile())){
					throw new BaseException("手机号码为空");
				}
				if(!sessionMobile.equals(regDataPo.getMobile())){
					throw new BaseException("手机号码不一致");
				}
				
				regDataPo.setPassWd(pwd);
				//构造领域对象和保存数据
				RegData regData =regDataRepository.newInstance(regDataPo);
				regData.updatePasswd();
				message=new ResultMessage(ResultMessage.SUCCESS, "密码重置成功");
			}
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "密码重置失败,"+e.getMessage());
			logger.error("密码重置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  发送短信验证码
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("sendSms")
	public void sendSms(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String mobile=RequestUtil.getString(request, "mobile");
			boolean forget=RequestUtil.getBoolean(request, "forget", false);
			
			RegDataPo po = regDataRepository.getByMobile(mobile);
			if(forget && BeanUtils.isEmpty(po)){
				throw new OrgException("用户不存在！");
			}else if(!forget && BeanUtils.isNotEmpty(po)){
				throw new OrgException("用户已注册！");
			}
			
			String model = AppUtil.getProperty("sms.model", "enterprise");
			if("enterprise".equalsIgnoreCase(model)){
				message = enterprise(request, mobile);
			}else{
				message = personal(request, mobile);
			}
		} catch(OrgException e){ 
			message=new ResultMessage(ResultMessage.WARN,  e.getMessage());
		}catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "短信发送失败，" + e.getMessage());
			logger.error("短信发送失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	private ResultMessage personal(HttpServletRequest request, String mobile) throws ApiException {
		ResultMessage message;
		String smsApiMode = AppUtil.getProperty("sms.api.mode");
		String smsApiUrl = AppUtil.getProperty(smsApiMode);
		String smsApiAppkey = AppUtil.getProperty("sms.api.appkey");
		String smsApiSecret = AppUtil.getProperty("sms.api.secret");
		String smsApiType = AppUtil.getProperty("sms.api.type");
		String smsApiSignName = AppUtil.getProperty("sms.api.signName");
		String smsApiTemplateCode = AppUtil.getProperty("sms.api.templateCode");
		
		TaobaoClient client = new DefaultTaobaoClient(smsApiUrl, smsApiAppkey, smsApiSecret);
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		req.setSmsType(smsApiType);
		req.setSmsFreeSignName(smsApiSignName);
		String captcha = CaptchaUtils.generateNum(6);
		req.setSmsParamString("{\"number\":\""+captcha+"\"}");
		req.setRecNum(mobile);
		req.setSmsTemplateCode(smsApiTemplateCode);
		AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
		String body = rsp.getBody();
		JSONObject smsJsonObj = JSONObject.fromObject(body);
		if(smsJsonObj.containsKey("alibaba_aliqin_fc_sms_num_send_response")){
			// 存入会话session
			request.getSession(true).setAttribute(MOBILE, mobile);
			request.getSession(true).setAttribute(ValidCode.SESSION_NAME_CAPTCHA, captcha);
			logger.info(mobile+"：短信验证码："+captcha);
			message=new ResultMessage(ResultMessage.SUCCESS, "短信发送成功");
		}else{
			message=new ResultMessage(ResultMessage.SUCCESS, "短信发送失败");
		}
		return message;
	}
	
	private ResultMessage enterprise(HttpServletRequest httprequest, String mobile) throws ClientException {
		ResultMessage message;

		String smsApiAppkey = AppUtil.getProperty("enterprise.sms.api.appkey");
		String smsApiSecret = AppUtil.getProperty("enterprise.sms.api.secret");
		String smsApiSignName = AppUtil.getProperty("enterprise.sms.api.signName");
		String smsApiTemplateCode = AppUtil.getProperty("enterprise.sms.api.templateCode");

		// 设置超时时间-可自行调整
		System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
		System.setProperty("sun.net.client.defaultReadTimeout", "10000");
		// 初始化ascClient需要的几个参数
		final String product = "Dysmsapi";// 短信API产品名称（短信产品名固定，无需修改）
		final String domain = "dysmsapi.aliyuncs.com";// 短信API产品域名（接口地址固定，无需修改）
		// 替换成你的AK
		final String accessKeyId = smsApiAppkey;// 你的accessKeyId,参考本文档步骤2
		final String accessKeySecret = smsApiSecret;// 你的accessKeySecret，参考本文档步骤2
		// 初始化ascClient,暂时不支持多region（请勿修改）
		IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
		DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
		IAcsClient acsClient = new DefaultAcsClient(profile);
		// 组装请求对象
		SendSmsRequest request = new SendSmsRequest();
		// 使用post提交
		request.setMethod(MethodType.POST);
		// 必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,
		// 批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式
		request.setPhoneNumbers(mobile);
		// 必填:短信签名-可在短信控制台中找到
		request.setSignName(smsApiSignName);
		// 必填:短信模板-可在短信控制台中找到
		request.setTemplateCode(smsApiTemplateCode);
		String captcha = CaptchaUtils.generateNum(6);
		// 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
		// 友情提示:如果JSON中需要带换行符,请参照标准的JSON协议对换行符的要求,
		//比如短信内容中包含\r\n的情况在JSON中需要表示成\\r\\n,否则会导致JSON在服务端解析失败
		request.setTemplateParam("{\"number\":\"" + captcha + "\"}");
		// 请求失败这里会抛ClientException异常
		SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);
		if (sendSmsResponse.getCode() != null && sendSmsResponse.getCode().equals("OK")) {
			// 请求成功
			// 存入会话session
			httprequest.getSession(true).setAttribute(MOBILE, mobile);
			httprequest.getSession(true).setAttribute(ValidCode.SESSION_NAME_CAPTCHA, captcha);
			logger.info(mobile + "：短信验证码：" + captcha);
			message = new ResultMessage(ResultMessage.SUCCESS, "短信发送成功");
		} else {
			message = new ResultMessage(ResultMessage.SUCCESS, "短信发送失败");
		}
		return message;
	}
	
}
