package com.lc.ibps.platform.auth.builder;

import java.util.List;

import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.auth.persistence.entity.AuthAppPo;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;

public class AuthAppBuilder {
	
	public static void build(List<AuthAppPo> poList){
		if(BeanUtils.isEmpty(poList)){
			return;
		}
		
		for(AuthAppPo po : poList){
			build(po);
		}
	}

	public static void build(AuthAppPo po){
		if(BeanUtils.isEmpty(po)){
			return;
		}
		     
		IPartyUserService service = AppUtil.getBean(IPartyUserService.class);
		if(StringUtil.isNotEmpty(po.getCreateBy())){
			String data = service.getByIdJson(po.getCreateBy());
			if(JacksonUtil.isEmpty(data)){
				po.setCreator(po.getCreateBy());
			}else{
				po.setCreator(JacksonUtil.getString(data, "fullname"));
			}
		}
		
		if(StringUtil.isNotEmpty(po.getUpdateBy())){
			String data = service.getByIdJson(po.getCreateBy());
			if(JacksonUtil.isEmpty(data)){
				po.setUpdator(po.getUpdateBy());
			}else{
				po.setUpdator(JacksonUtil.getString(data, "fullname"));
			}
		}
	}
}
