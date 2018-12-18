<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.consumer;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.consumer;
</#if>

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.service.${class}Service;
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}Service;
</#if>
import com.${scAlias}.${scPlatform}.api.base.entity.WebAPIResult;
import com.${scAlias}.${scPlatform}.base.core.constants.StringPool;
import com.${scAlias}.${scPlatform}.base.core.exception.BaseException;
import com.${scAlias}.${scPlatform}.base.core.util.AppUtil;
import com.${scAlias}.${scPlatform}.base.core.util.JacksonUtil;
import com.${scAlias}.${scPlatform}.base.core.util.string.StringUtil;
import com.${scAlias}.${scPlatform}.base.web.context.ContextUtil;
import com.${scAlias}.${scPlatform}.components.httpclient.http.ApacheHttpClient;

/**
 * ${model.tabComment} 服务的实现类
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
@Service("${classVar}Consumer")
public class ${class}Consumer implements ${class}Service{

	<#if vars.flowKey?exists && vars.flowKey != "">
	@Override
	public void save(ActionCmd cmd) {
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("busData", cmd.getBusData()));
		nameValuePairs.add(new BasicNameValuePair("businessKey", cmd.getBusinessKey()));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/start", nameValuePairs);
		
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(!result.isSuccess()){
			throw new BaseException(result.getCause());
		}
	}
	
	/**
	 * 启动流程
	 *
	 * @param defKey
	 * @param ids 
	 */
	public void startFlow(String defKey, String destination, String[] ids) {
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("defKey", defKey));
		nameValuePairs.add(new BasicNameValuePair("destination", destination));
		nameValuePairs.add(new BasicNameValuePair("ids", StringUtil.join(ids, StringPool.COMMA)));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/startFlow", nameValuePairs);
		
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(!result.isSuccess()){
			throw new BaseException(result.getCause());
		}
	}
	</#if>

	@Override
	public void save(String jsonData) {
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("jsonData", jsonData));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/save", nameValuePairs);
		
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(!result.isSuccess()){
			throw new BaseException(result.getCause());
		}
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("ids", StringUtil.join(ids, StringPool.COMMA)));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/deleteByIds", nameValuePairs);
		
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(!result.isSuccess()){
			throw new BaseException(result.getCause());
		}
	}

	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	@Override
	public void saveCascade(String jsonData) {
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("jsonData", jsonData));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/saveCascade", nameValuePairs);
		
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(!result.isSuccess()){
			throw new BaseException(result.getCause());
		}
	}
	
	@Override
	public void deleteByIdsCascade(String[] ids){
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		nameValuePairs.add(new BasicNameValuePair("ids", StringUtil.join(ids, StringPool.COMMA)));
		nameValuePairs.add(new BasicNameValuePair(StringPool.TOKEN, ContextUtil.getCurrentAccessToken()));
		String resultData = ApacheHttpClient.doPost(AppUtil.getAppGateWayUrl() + "/${sys}/${classVar}/deleteByIdsCascade", nameValuePairs);
		
		WebAPIResult result = JacksonUtil.getDTO(resultData, WebAPIResult.class);
		if(!result.isSuccess()){
			throw new BaseException(result.getCause());
		}
	}
	</#if>
	
}
