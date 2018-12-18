package com.lc.ibps.lyzygls.DanWeiGK.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.DanWeiGK.domain.DanWeiGK;
import com.lc.ibps.lyzygls.DanWeiGK.repository.DanWeiGKRepository;
import com.lc.ibps.lyzygls.DanWeiGK.persistence.dao.DanWeiGKQueryDao;
import com.lc.ibps.lyzygls.DanWeiGK.persistence.entity.DanWeiGKPo;

/**
 * t_dwgk 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 15:09:26
 *</pre>
 */
@Repository
public class DanWeiGKRepositoryImpl extends AbstractRepository<String, DanWeiGKPo,DanWeiGK> implements DanWeiGKRepository{
	  
	@Resource
	private  DanWeiGKQueryDao danWeiGKQueryDao;

	public DanWeiGK newInstance() {
		DanWeiGKPo po = new DanWeiGKPo();
		DanWeiGK danWeiGK = AppUtil.getBean(DanWeiGK.class);
		danWeiGK.setData(po);
		return danWeiGK;
	}

	public DanWeiGK newInstance(DanWeiGKPo po) {
		DanWeiGK danWeiGK = AppUtil.getBean(DanWeiGK.class);
		danWeiGK.setData(po);
		return danWeiGK;
	} 
	
	@Override
	protected IQueryDao<String, DanWeiGKPo> getQueryDao() {
		return danWeiGKQueryDao;
	}
	

	
}
