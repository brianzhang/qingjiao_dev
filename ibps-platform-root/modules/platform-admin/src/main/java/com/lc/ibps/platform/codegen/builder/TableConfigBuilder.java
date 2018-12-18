package com.lc.ibps.platform.codegen.builder;

import java.util.List;

import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.components.codegen.persistence.entity.TableConfigPo;

/** 
 * 构建生成类型data
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年3月3日-上午9:57:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class TableConfigBuilder {
	
	public static void build(List<TableConfigPo> list){
		if(BeanUtils.isEmpty(list)){
			return;
		}
		
		for(TableConfigPo po : list){
			build(po);
		}
	}

	public static void build(TableConfigPo po) {
		if(BeanUtils.isEmpty(po)){
			return;
		}
		
		if(StringUtil.isNotEmpty(po.getTypeId())){
			TypeRepository typeRepository = AppUtil.getBean(TypeRepository.class);
			TypePo typePo = typeRepository.get(po.getTypeId());
			if(BeanUtils.isNotEmpty(typePo)){
				po.setTypeName(typePo.getName());
			}
		}
		
		if(StringUtil.isNotEmpty(po.getBoId())){
			BoDefRepository boDefRepository = AppUtil.getBean(BoDefRepository.class);
			BoDefPo boDefPo = boDefRepository.get(po.getBoId());
			if(BeanUtils.isNotEmpty(boDefPo)){
				po.setBoName(boDefPo.getName());
			}
		}
	}
	
}
