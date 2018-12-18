package com.lc.ibps.lyzygls.ZhuYaoTuRang.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.domain.ZhuYaoTuRang;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.repository.ZhuYaoTuRangRepository;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.dao.ZhuYaoTuRangQueryDao;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.entity.ZhuYaoTuRangPo;

/**
 * t_zytr 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 12:55:08
 *</pre>
 */
@Repository
public class ZhuYaoTuRangRepositoryImpl extends AbstractRepository<String, ZhuYaoTuRangPo,ZhuYaoTuRang> implements ZhuYaoTuRangRepository{
	  
	@Resource
	private  ZhuYaoTuRangQueryDao zhuYaoTuRangQueryDao;

	public ZhuYaoTuRang newInstance() {
		ZhuYaoTuRangPo po = new ZhuYaoTuRangPo();
		ZhuYaoTuRang zhuYaoTuRang = AppUtil.getBean(ZhuYaoTuRang.class);
		zhuYaoTuRang.setData(po);
		return zhuYaoTuRang;
	}

	public ZhuYaoTuRang newInstance(ZhuYaoTuRangPo po) {
		ZhuYaoTuRang zhuYaoTuRang = AppUtil.getBean(ZhuYaoTuRang.class);
		zhuYaoTuRang.setData(po);
		return zhuYaoTuRang;
	} 
	
	@Override
	protected IQueryDao<String, ZhuYaoTuRangPo> getQueryDao() {
		return zhuYaoTuRangQueryDao;
	}
	

	
}
