<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.consumer;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.consumer;
</#if>

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.service.${class}QueryService;
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}QueryService;
</#if>
import com.${scAlias}.${scPlatform}.api.base.entity.WebAPIResult;
import com.${scAlias}.${scPlatform}.api.base.query.QueryFilter;
import com.${scAlias}.${scPlatform}.base.core.constants.StringPool;
import com.${scAlias}.${scPlatform}.base.core.exception.BaseException;
import com.${scAlias}.${scPlatform}.base.core.util.AppUtil;
import com.${scAlias}.${scPlatform}.base.core.util.JacksonUtil;
import com.${scAlias}.${scPlatform}.base.web.context.ContextUtil;
import com.${scAlias}.${scPlatform}.base.web.util.QueryUtil;
import com.${scAlias}.${scPlatform}.components.httpclient.http.ApacheHttpClient;

/**
 * ${model.tabComment} 查询消费的实现类
 *
 *<pre> 
 <#if vars.company?exists>
 * 开发公司：${vars.company}
 </#if>
 <#if vars.developer?exists>
 * 开发人员：${vars.developer}
 </#if>
 <#if vars.email?exists>
 * 邮箱地址：${vars.email}
 </#if>
 * 创建时间：${date?string("yyyy-MM-dd HH:mm:ss")}
 *</pre>
 */
@Service("${classVar}QueryConsumer")
public class ${class}QueryConsumer implements ${class}QueryService{

	@Override
	public String get(String id) {
		String data = null;
		
		Map<String, String> params = new HashMap<String, String>();
		params.put(StringPool.TOKEN, ContextUtil.getCurrentAccessToken());
		String resultData = ApacheHttpClient.doGet(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/get/"+id, params);
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(result.isSuccess()){
			data = String.valueOf(result.getData());
		}else{
			throw new BaseException(result.getCause());
		}
		
		return data;
	}
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	@Override
	public String loadCascade(String id) {
		String data = null;
		
		Map<String, String> params = new HashMap<String, String>();
		params.put(StringPool.TOKEN, ContextUtil.getCurrentAccessToken());
		String resultData = ApacheHttpClient.doGet(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/loadCascade/"+id, params);
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(result.isSuccess()){
			data = String.valueOf(result.getData());
		}else{
			throw new BaseException(result.getCause());
		}
		
		return data;
	}
	</#if>

	@Override
	public String query(QueryFilter filter) {
		String data = null;
		
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("filter", QueryUtil.queryFilter2JsonString(filter)));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/query", nameValuePairs);
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(result.isSuccess()){
			data = String.valueOf(result.getData());
		}else{
			throw new BaseException(result.getCause());
		}
		
		return data;
	}
	
	@Override
	public String findAll() {
		String data = null;
		
		Map<String, String> params = new HashMap<String, String>();
		params.put(StringPool.TOKEN, ContextUtil.getCurrentAccessToken());
		String resultData = ApacheHttpClient.doGet(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/findAll", params);
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(result.isSuccess()){
			data = String.valueOf(result.getData());
		}else{
			throw new BaseException(result.getCause());
		}
		
		return data;
	}
	
}
