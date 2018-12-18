package com.lc.ibps.platform.rest.token;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.components.token.model.Token;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/**
 * 获取临时token的服务。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年3月16日-上午10:35:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/tokenService")
@Api(value = "/tokenService",description="获取token服务")
@Controller
public class TokenController {

	@Path("/getAnonymousToken")
	@ApiOperation(value = "获取匿名token", notes = "获取匿名token")
	@GET
	public WebAPIResult getAnonymousTokenJson(
			@QueryParam("validCode") @ApiParam(value = "validCode", required = true) String validCode) {
		WebAPIResult result = new WebAPIResult();
		result.setData(TokenUtil.getTokenResult(validCode, Token.TOKEN_ANONYMOUS));
		return result;
	}

	@Path("/getFormalToken")
	@ApiOperation(value = "获取显名token", notes = "获取显名token")
	@GET
	public WebAPIResult getFormalToken(
			@QueryParam("validCode") @ApiParam(value = "validCode", required = true) String validCode) {
		WebAPIResult result = new WebAPIResult();
		result.setData(TokenUtil.getTokenResult(validCode, Token.TOKEN_FORMAL));
		return result;
	}

}
