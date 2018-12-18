package com.lc.ibps.platform.rest.login;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.apache.commons.lang.StringUtils;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.encrypt.EncryptUtil;
import com.lc.ibps.base.core.exception.BaseException;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.api.base.cache.ICache;
import com.lc.ibps.components.httpclient.model.HttpStatus;
import com.lc.ibps.components.token.model.Token;
import com.lc.ibps.org.party.persistence.entity.DefaultPartyUserPo;
import com.lc.ibps.org.party.repository.DefaultPartyUserRepository;
import com.lc.ibps.platform.rest.token.TokenUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

import net.sf.json.JSONObject;

/**
 * 登陆验证,带token返回
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年7月12日-下午4:27:43
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/loginService")
@Api(value = "/loginService", description = "登录服务")
@Controller("loginRest")
public class LoginController {

	@SuppressWarnings("unchecked")
	@Path("/appLogin")
	@ApiOperation(value = "获取人员", notes = "app登录")
	@POST
	public WebAPIResult appLogin(
			@FormParam(value = "account") @ApiParam(value = "ibps账号", required = true) String account,
			@FormParam(value = "pwd") @ApiParam(value = "ibps密码", required = true) String pwd) {
		WebAPIResult result = new WebAPIResult();
		if (StringUtil.isEmpty(account) || StringUtil.isEmpty(pwd)) {
			result.setResult(HttpStatus.PRECONDITION_FAILED.value());
			result.setMessage("account或者pwd为空!");
			return result;
		}

		DefaultPartyUserRepository defaultPartyUserRepository = AppUtil.getBean(DefaultPartyUserRepository.class);
		DefaultPartyUserPo user = defaultPartyUserRepository.getByAccount(account);
		if (BeanUtils.isEmpty(user)) {
			result.setResult(HttpStatus.PRECONDITION_FAILED.value());
			result.setMessage("用户不存在!");
			return result;
		}

		String encrptPassword = EncryptUtil.encryptSha256(pwd);
		if (!encrptPassword.equals(user.getPassword())) {
			result.setResult(HttpStatus.PRECONDITION_FAILED.value());
			result.setMessage("密码错误！");
			return result;
		}

		result.setResult(WebAPIResult.SUCCESS);
		result.setData(this.userJS(user));
		ICache<String> cache = AppUtil.getBean(ICache.class);
		String key = AppUtil.getAppid() + StringPool.COLON + account;
		cache.add(key, TokenUtil.getTokenResult(AppUtil.getProperty("webapi.validCode"), Token.TOKEN_FORMAL).getToken(),
				10 * 3600 * 24);

		return result;
	}

	@SuppressWarnings("unchecked")
	@Path("/wcLogin")
	@ApiOperation(value = "获取人员", notes = "微信登录,微信账号和另外三个值必选一个填写")
	@POST
	public WebAPIResult wcLogin(@FormParam("wcAccount") @ApiParam(value = "微信账号", required = false) String wcAccount,
			@FormParam("code") @ApiParam(value = "微信随机code", required = false) String code) {

		WebAPIResult result = new WebAPIResult();

		List<NameValuePair> params = null;

		String userId = "";

		CloseableHttpResponse resp = null;

		CloseableHttpClient client = HttpClients.createDefault();

		if (StringUtils.isEmpty(wcAccount)) {
			try {
				// wechat token
				String getToken = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";
				String access_token = "";
				params = new ArrayList<NameValuePair>();
				params.add(new BasicNameValuePair("corpid", AppUtil.getProperty("wechat.corpid")));
				params.add(new BasicNameValuePair("corpsecret", AppUtil.getProperty("wechat.corpsecret")));
				HttpGet get = new HttpGet(
						getToken + "?" + EntityUtils.toString(new UrlEncodedFormEntity(params, Consts.UTF_8)));
				resp = client.execute(get);
				if (resp.getStatusLine().getStatusCode() == HttpStatus.OK.value()) {
					HttpEntity entity = resp.getEntity();
					JSONObject res = JSONObject.fromObject(EntityUtils.toString(entity, "utf-8"));
					access_token = res.has("access_token") ? res.get("access_token").toString() : "";
				}

				if (StringUtil.isEmpty(access_token)) {
					result.setResult(WebAPIResult.FAIL);
					result.setMessage("获取access_token失败");
					return result;
				}
				
				// 微信登录用户信息
				String getUserInfo = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=" + access_token
						+ "&code=" + code;
				HttpPost post = new HttpPost(getUserInfo);
				resp = client.execute(post);
				if (resp.getStatusLine().getStatusCode() == HttpStatus.OK.value()) {
					HttpEntity entity = resp.getEntity();
					JSONObject res = JSONObject.fromObject(EntityUtils.toString(entity, "utf-8"));
					userId = res.has("UserId") ? res.get("UserId").toString() : "";
				}
				
				if (StringUtil.isEmpty(userId)) {
					result.setResult(WebAPIResult.FAIL);
					result.setMessage("获取userId失败");
					return result;
				}
			} catch (Exception e) {
				e.printStackTrace();
				result.setResult(WebAPIResult.ERROR);
				result.setMessage("微信请求失败！");
				return result;
			} finally {
				try {
					if (client != null) {
						client.close();
					}
					if (resp != null) {
						resp.close();
					}
				} catch (IOException e) {
					throw new BaseException("关闭操作错误！");
				}
			}
		} else {
			userId = wcAccount;
		}

		// 获取系统用户信息
		DefaultPartyUserRepository defaultPartyUserRepository = AppUtil.getBean(DefaultPartyUserRepository.class);
		DefaultPartyUserPo user = defaultPartyUserRepository.getByWcAccount(userId);
		if (!BeanUtils.isEmpty(user)) {
			result.setResult(WebAPIResult.SUCCESS);
			result.setData(this.userJS(user));
			ICache<String> cache = AppUtil.getBean(ICache.class);
			String key = AppUtil.getAppid() + StringPool.COLON + user.getAccount();
			cache.add(key,
					TokenUtil.getTokenResult(AppUtil.getProperty("webapi.validCode"), Token.TOKEN_FORMAL).getToken(),
					10 * 3600 * 24);
		} else {
			result.setResult(WebAPIResult.FAIL);
			result.setMessage("用户不存在");
			return result;
		}

		return result;

	}

	/**
	 * 人员信息
	 * 
	 * @param user
	 * @return
	 */
	private String userJS(DefaultPartyUserPo user) {
		StringBuffer bf = new StringBuffer();
		bf.append("{'").append("account").append("':'").append(user.getAccount()).append("',");
		bf.append("'").append("userId").append("':'").append(user.getUserId()).append("',");
		bf.append("'").append("fullName").append("':'").append(user.getFullname()).append("'}");
		return bf.toString();
	}

}
