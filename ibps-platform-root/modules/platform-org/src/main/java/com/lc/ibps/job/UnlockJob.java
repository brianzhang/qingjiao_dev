package com.lc.ibps.job;

import java.util.Date;
import java.util.Iterator;

import org.quartz.JobExecutionContext;

import com.lc.ibps.api.base.cache.CacheKey;
import com.lc.ibps.api.base.cache.ICache;
import com.lc.ibps.api.base.cache.ICacheKeyGenerator;
import com.lc.ibps.api.base.constants.CacheKeyConstants;
import com.lc.ibps.api.org.constant.LockMode;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.api.org.service.IPartyUserLimitService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.components.quartz.BaseJob;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class UnlockJob extends BaseJob {

	@SuppressWarnings("unchecked")
	@Override
	public void executeJob(JobExecutionContext context) throws Exception {
		IPartyUserLimitService partyUserLimitService = AppUtil.getBean(IPartyUserLimitService.class);
		String json = partyUserLimitService.findByUnlockTime(LockMode.AUTO, new Date());
		if(JsonUtil.isJsonArray(json)){
			IPartyEmployeeMgrService partyEmployeeMgrService = AppUtil.getBean(IPartyEmployeeMgrService.class);
			JSONArray limits = JSONArray.fromObject(json);
			ICache<Integer> cache = AppUtil.getBean(ICache.class);
			ICacheKeyGenerator cacheKeyGenerator = AppUtil.getBean(ICacheKeyGenerator.class);
			CacheKey cacheKeyVo = null;
			for (Iterator<JSONObject> iterator = limits.iterator(); iterator.hasNext();) {
				JSONObject object = iterator.next();
				partyEmployeeMgrService.unlockByAccount(object.getString("account"));
				
				cacheKeyVo = cacheKeyGenerator.generate(CacheKeyConstants.LOCK_RETRY + StringPool.COLON + object.getString("account"));
				cache.delByKey(cacheKeyVo.getDefKey());
			}
		}
	}

}
