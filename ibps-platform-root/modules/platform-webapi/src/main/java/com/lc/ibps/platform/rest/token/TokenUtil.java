package com.lc.ibps.platform.rest.token;

import com.lc.ibps.components.token.model.CommonCode;
import com.lc.ibps.components.token.model.Token;
import com.lc.ibps.components.token.model.TokenResult;
import com.lc.ibps.components.token.util.ValidUtil;

/**
 * token帮助类
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年7月12日-下午4:47:09
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class TokenUtil {

	public static TokenResult getTokenResult(String validCode) {
		return getTokenResult(validCode, Token.TOKEN_ANONYMOUS);
	}

	public static TokenResult getTokenResult(String validCode, int tokenFormal) {
		CommonCode encryptCode = ValidUtil.encryptCode(validCode, CommonCode.CODE_TYPE_V);
		return com.lc.ibps.components.token.util.TokenUtil.genTokenResult(encryptCode.getAppCode(), tokenFormal,
				validCode);
	}

}
